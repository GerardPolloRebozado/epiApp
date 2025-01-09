import { useEffect, useCallback, useReducer } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
    initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
    return useReducer(
        (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
        initialValue
    ) as UseStateHook<T>;
}

async function setLargeItemAsync(key: string, value: string | null) {
    const chunkSize = 2048;

    if (value === null) {
        let index = 0;
        while (await SecureStore.getItemAsync(`${key}_part_${index}`)) {
            await SecureStore.deleteItemAsync(`${key}_part_${index}`);
            index++;
        }
        await SecureStore.deleteItemAsync(`${key}_count`);
    } else {
        const chunks = Math.ceil(value.length / chunkSize);
        for (let i = 0; i < chunks; i++) {
            const chunkKey = `${key}_part_${i}`;
            const chunkData = value.slice(i * chunkSize, (i + 1) * chunkSize);
            await SecureStore.setItemAsync(chunkKey, chunkData);
        }
        await SecureStore.setItemAsync(`${key}_count`, chunks.toString());
    }
}

export async function getLargeItemAsync(key: string): Promise<string | null> {
    const countStr = await SecureStore.getItemAsync(`${key}_count`);
    if (!countStr) return null;

    const count = parseInt(countStr, 10);
    let data = '';
    for (let i = 0; i < count; i++) {
        const chunkKey = `${key}_part_${i}`;
        const chunk = await SecureStore.getItemAsync(chunkKey);
        if (chunk) data += chunk;
    }
    return data;
}

export default async function setStorageItemAsync(key: string, value: string | null) {
    if (Platform.OS === 'web') {
        try {
            if (value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, value);
            }
        } catch (e) {
            console.error('Local storage is unavailable:', e);
        }
    } else {
        await setLargeItemAsync(key, value);
    }
}

export function useStorageState(key: string): UseStateHook<string> {
    const [state, setState] = useAsyncState<string>();

    useEffect(() => {
        if (Platform.OS === 'web') {
            try {
                if (typeof localStorage !== 'undefined') {
                    setState(localStorage.getItem(key));
                }
            } catch (e) {
                console.error('Local storage is unavailable:', e);
            }
        } else {
            getLargeItemAsync(key).then((value) => {
                setState(value);
            });
        }
    }, [key]);

    const setValue = useCallback(
        (value: string | null) => {
            setState(value);
            setStorageItemAsync(key, value);
        },
        [key]
    );

    return [state, setValue];
}
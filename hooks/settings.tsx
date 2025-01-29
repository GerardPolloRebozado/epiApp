import React, { createContext, useContext } from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { AsyncStorageHook } from '@react-native-async-storage/async-storage/lib/typescript/types';

const SettingsContext = createContext<{
  theme: AsyncStorageHook;
  notificationTime: AsyncStorageHook;
}>({
  theme: useAsyncStorage('theme'),
  notificationTime: useAsyncStorage('notificationTime'),
});

export default function useSettings() {
  return useContext(SettingsContext);
}

export function SettingsProvider({ children }: React.PropsWithChildren<{}>) {
  const theme = useAsyncStorage('theme');
  const notificationTime = useAsyncStorage('notificationTime');

  theme.getItem().then((value) => {
    if (!value) {
      theme.setItem('system');
      return 'system';
    }
    return value;
  });

  return <SettingsContext.Provider value={{ theme, notificationTime }}>{children}</SettingsContext.Provider>;
}

import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Spinner } from 'tamagui';
import useSession from "@/app/ctx";
import { useEffect, useState } from "react";

export default function Profile() {
    const { signOut, session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState(true)

    async function getData() {
        if (!session) {
            console.log('No session available');
            setIsLoading(false);
            return;
        }
        try {
            console.log('Session', session)
            const response = await fetch('https://intra.epitech.eu/user/gerard.du-pre@epitech.eu/?format=json', {
                headers: {
                    'Authorization': `Bearer ${session}`,
                    'Cookie': `user=${session}`,
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [session, reload]);

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <Spinner size="large" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Button onPress={signOut}>Logout</Button>
            <Button onPress={() => setReload(!reload)}>Reload</Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

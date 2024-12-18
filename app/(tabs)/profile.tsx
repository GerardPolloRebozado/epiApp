import { SafeAreaView, StyleSheet } from 'react-native';
import { Button } from 'tamagui';
import useSession from "@/app/ctx";

export default function Profile() {
    const signOut = useSession().signOut;
    return (
        <SafeAreaView style={styles.container}>
            <Button onPress={signOut}>Logout</Button>
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

import { StyleSheet } from 'react-native';
import useSession from "@/app/ctx";
import { useEffect, useState } from "react";
import { UserType } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchImage, fetchUser } from "@/fetchData";
import { XStack, Avatar, Spinner, YStack, Button, Text } from 'tamagui';

export default function Profile() {
    const {signOut, session} = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState(true)
    const [user, setUser] = useState<UserType | null>(null);
    const [image, setImage] = useState<string>("error");

    async function getData() {
        if (!session) {
            console.log('No session available');
            setIsLoading(false);
            return;
        }
        try {
            const response = await fetchUser(session);
            const image = await fetchImage(session || "error");
            setImage(image);
            if (!response.ok) {
                console.error('Fetch error:', response);
                return;
            }

            const data = await response.json();
            setUser(data)
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, [session, reload]);

    if (isLoading || !user) {
        return (<SafeAreaView style={styles.container}>
            <Spinner size="large"/>
        </SafeAreaView>);
    }

    return (<SafeAreaView style={styles.container}>
        <XStack alignItems={"center"} gap={"$3"}>
            <Avatar radiused={true} size={"$8"}>
                <Avatar.Image src={image}/>
            </Avatar>
            <YStack>
                <Text fontSize={"$6"}>{user.title}</Text>
                <XStack justifyContent={"space-around"} gap={"$2"}>
                    <Text>{user.studentyear} year</Text>
                    <Text>{user.credits} credits</Text>
                    <Text>{user.gpa[0].gpa} GPA</Text>
                </XStack>
            </YStack>
        </XStack>
        <Button onPress={signOut}>Logout</Button>
        <Button onPress={() => setReload(!reload)}>Reload</Button>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

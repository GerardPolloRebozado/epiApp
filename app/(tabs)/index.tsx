import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { Activity, UserType } from "@/types";
import useSession from "@/app/ctx";
import { ScrollView, Separator, SizableText, Spinner, Tabs, Text, YStack } from "tamagui";
import { fetchActivities, fetchUser } from "@/fetchData";
import { StyleSheet } from "react-native";
import ActivityCard from "@/components/ActivityCard";

export default function HomeScreen() {
    const {session} = useSession();
    const [user, setUser] = useState<UserType | null>(null);
    const [activityList, setActivityList] = useState<Activity[] | null>(null);

    useEffect(() => {
        async function fetchDate() {
            if (!session) return;
            const userResponse = await fetchUser(session);
            if (!userResponse.ok) {
                console.error('Fetch error:', userResponse);
                return;
            }
            const userBody = await userResponse.json();
            setUser(userBody);
            const activityResponse = await fetchActivities(session)
            if (!activityResponse.ok) {
                console.error('Fetch error:', activityResponse);
                return;
            }
            const activityBody = await activityResponse.json();
            setActivityList(activityBody);
        }

        fetchDate();
    }, [session]);

    if (!activityList || !user) {
        return (<SafeAreaView style={styles.container}>
            <Spinner size="large"/>
        </SafeAreaView>);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text fontSize={"$6"}>Welcome, {user?.title}</Text>
            <Tabs defaultValue={"activity"} bottom={0} position={"absolute"} height={400} orientation={"horizontal"} flexDirection={"column"} alignItems={"center"} >
                <Tabs.List marginBottom={"$4"}>
                    <Tabs.Tab value={"activity"}>
                        <SizableText>Activities</SizableText>
                    </Tabs.Tab>
                    <Tabs.Tab value={"project"}>
                        <SizableText>Projects</SizableText>
                    </Tabs.Tab>
                </Tabs.List>
                <Separator vertical={true}/>
                <Tabs.Content value={"activity"}>
                    <ScrollView>
                        <YStack gap={"$4"}>
                            {activityList.map((activity) => (
                                <ActivityCard activity={activity} key={activity.codeacti + activity.begin_event} type={"activity"}/>
                            ))}
                        </YStack>
                    </ScrollView>
                </Tabs.Content>
                <Tabs.Content value={"project"}>
                    <ScrollView>
                        <YStack gap={"$4"}>
                            {activityList.map((activity) => (
                                <ActivityCard activity={activity} key={activity.codeacti + activity.begin_event} type={"project"}/>
                            ))}
                        </YStack>
                    </ScrollView>
                </Tabs.Content>
            </Tabs>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 4,
    },
});
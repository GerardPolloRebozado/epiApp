import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {Activity, UserType} from "@/types";
import useSession from "@/hooks/ctx";
import {Button, ScrollView, SizableText, Spinner, Tabs, Text, YStack} from "tamagui";
import {fetchActivities, fetchUser} from "@/utils/fetchData";
import {StyleSheet} from "react-native";
import ActivityCard from "@/components/ActivityCard";
import {registerBackgroundFetchAsync} from "@/backgroundTasks/fetchActivities";
import {fakeActivities, fakeUser} from "@/utils/fakeData";
import * as Notifications from "expo-notifications";
import {useRouter} from "expo-router";
import {ChevronLeft, ChevronRight} from "@tamagui/lucide-icons";

export default function HomeScreen() {
    const {session, signOut} = useSession();
    const [user, setUser] = useState<UserType | null>(null);
    const [week, setWeek] = useState<number>(0);
    const [activityList, setActivityList] = useState<Activity[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter()
    registerBackgroundFetchAsync()

    useEffect(() => {
        setIsLoading(true);

        async function fetchData() {
            if (!session) return;
            if (session === 'guest') {
                setActivityList(fakeActivities);
                setUser(fakeUser);
                return
            }
            const userResponse = await fetchUser(session);
            if (!userResponse.ok) {
                console.error('Fetch error:', userResponse);
            } else {
                const userBody = await userResponse.json();
                setUser(userBody);
            }
            const activityResponse = await fetchActivities(session, week)
            if (!activityResponse.ok) {
                console.error('Fetch error:', activityResponse);
            } else {
                const activityBody = await activityResponse.json();
                setActivityList(activityBody);
            }
            if (userResponse.status === 503 || activityResponse.status === 503) {
                signOut()
                router.push('/auth')
            }
            setIsLoading(false);
        }

        fetchData();
    }, [session, week])

    useEffect(() => {
        setTimeout(() => {
            (async () => {
                const {status} = await Notifications.getPermissionsAsync();
                if (status !== 'granted') {
                    await Notifications.requestPermissionsAsync();
                }
            })();
        }, 1000);
    }, []);

    if (!user || !Array.isArray(activityList)) {
        return (<SafeAreaView style={styles.container}>
            <Spinner size="large"/>
        </SafeAreaView>);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text fontSize={"$6"}>Welcome, {user?.title}</Text>
            <Tabs defaultValue={"activity"} bottom={0} position={"absolute"} height={"70%"} orientation={"horizontal"} flexDirection={"column"} alignItems={"center"} marginHorizontal={"$2"}>
                <Tabs.List marginBottom={"$4"}>
                    <Button iconAfter={<ChevronLeft/>} variant={"outlined"} marginRight={'-4'} borderBottomRightRadius={'0'} borderTopRightRadius={'0'} onPress={() => setWeek(week - 1)}/>
                    <Tabs.Tab value={"activity"}>
                        <SizableText>Activities</SizableText>
                    </Tabs.Tab>
                    <Tabs.Tab value={"project"}>
                        <SizableText>Projects</SizableText>
                    </Tabs.Tab>
                    <Button iconAfter={<ChevronRight/>} variant={"outlined"} marginRight={'-4'} borderBottomLeftRadius={'0'} borderTopLeftRadius={'0'} onPress={() => setWeek(week + 1)}/>
                </Tabs.List>
                {!isLoading ? (
                    <>
                        <Tabs.Content value={"activity"}>
                            <ScrollView>
                                <YStack gap={"$4"}>
                                    {activityList.map((activity) => (
                                        <ActivityCard activity={activity} key={activity.codeacti + activity.begin_event} type={"activity"}/>
                                    ))}
                                    {activityList.length === 0 && <Text>No activities this week</Text>}
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
                    </>
                ) : (
                    <Spinner size="large"/>
                )}
            </Tabs>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 4,
        marginTop: 10,
    },
});
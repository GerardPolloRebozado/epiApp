import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchActivity, registerActivity } from "@/utils/fetchData";
import useSession from "@/app/ctx";
import { ActivityExtendedType, ProjectType } from "@/types";
import { Button, Card, H6, Paragraph, ScrollView, Separator, Spinner, XStack, YStack } from "tamagui";
import { StyleSheet } from "react-native";
import transformHours from "@/utils/randomUtils";

export default function Activity() {
    const { session } = useSession();
    let registered = false
    if (!session) {
        return <Redirect href={"/auth"}/>
    }
    const local = useLocalSearchParams<{ activity: string, city: string, module: string, year: string }>();
    const [activity, setActivity] = useState<ActivityExtendedType | null>(null);
    const [relatedActivities, setRelatedActivities] = useState<ActivityExtendedType[] | null>(null);
    const [reload, setReload] = useState(false)
    const [registerLoad, setRegisterLoad] = useState(false)
    const [project, setProject] = useState<ProjectType | null>(null)
    const router = useRouter()

    useEffect(() => {
        async function getActivity() {
            if (!session) {
                return
            }
            const res = await fetchActivity(session, local.year, local.module, local.city, local.activity);
            if (res.ok) {
                const activityRes: ActivityExtendedType = await res.json()
                setActivity(activityRes)
                if (activityRes.is_projet) {
                    const projectRes = await fetchActivity(session, local.year, local.module, local.city, local.activity, true);
                    const projectBody: ProjectType = await projectRes.json()
                    setProject(projectBody)
                    if (projectBody.urls) {
                        let tempRelActivitiesArray: ActivityExtendedType[] = []
                        for (const item of projectBody.urls) {
                            const year = item.link.split('/')[1]
                            const module = item.link.split('/')[2]
                            const city = item.link.split('/')[3]
                            const activ = item.link.split('/')[4]
                            const activRes = await fetchActivity(session, year, module, city, activ)
                            const activBody: ActivityExtendedType = await activRes.json()
                            tempRelActivitiesArray.push(activBody)
                        }
                        setRelatedActivities(tempRelActivitiesArray)
                    }
                }
            } else {
                router.push("/")
            }
        }

        getActivity()
    }, [reload])
    if (!activity) {
        return <Spinner size={"large"}/>
    } else {
        activity.events.forEach(event => {
            if (event.already_register != null) {
                registered = true
            }
        })
    }

    function buttonRegister(eventCode: string, register: boolean) {
        if (!session) {
            return
        }
        setRegisterLoad(true)
        registerActivity(session, local.year, local.module, local.city, local.activity, eventCode, register).then((res) => {
            if (res.ok) {
                setReload(!reload)
                setRegisterLoad(false)
            }
        })
    }

    function openActivity(activ: ActivityExtendedType) {
        router.push(`/activity?year=${activ.scolaryear}&module=${activ.codemodule}&city=${activ.codeinstance}&activity=${activ.codeacti}`)
    }

    return (
        <SafeAreaView style={styles.container}>
            <YStack width={"95vw"} gap={"$2"} justifyContent={"center"} alignItems={"center"}>
                <H6>{project ? project.title : activity.title}</H6>
                {activity.description && <Card radiused padded bordered backgrounded marginVertical={"$6"} borderWidth={"$1.5"}>
                    <Card.Header>
                        <H6>Activity description</H6>
                        <Separator/>
                    </Card.Header>
                    <Card.Footer>
                        <Paragraph>{activity.description}</Paragraph>
                    </Card.Footer>
                </Card>}
                {relatedActivities && relatedActivities.length > 0 &&(
                    <ScrollView>
                        <YStack style={styles.scrollView}>
                            <Paragraph>Related activities</Paragraph>
                            {relatedActivities.map((activity) => {
                                return <Card justifyContent={"center"} padded radiused elevate marginTop={"$2"} key={activity.codeacti} onPress={() => openActivity(activity)}>
                                    <Card.Header>
                                        <H6>{activity.title}</H6>
                                        <Separator/>
                                    </Card.Header>
                                    <Card.Footer>
                                        <XStack gap={"$4"}>
                                            <Paragraph>{new Date(activity.start).toDateString()}</Paragraph>
                                            <Paragraph>{transformHours(activity.nb_hours)}</Paragraph>
                                        </XStack>
                                    </Card.Footer>
                                </Card>
                            })}
                        </YStack>
                    </ScrollView>
                )}
                {activity.events.length > 0 && (
                    <ScrollView>
                        <YStack style={styles.scrollView}>
                            <Paragraph>Events</Paragraph>
                            {activity.events.map((event) => {
                                return <Card justifyContent={"center"} padded radiused elevate marginTop={"$2"} key={event.code} bordered>
                                    <Card.Header>
                                        <H6>Event {event.num_event}</H6><Paragraph size={"$4"}>{event.begin} - {event.end.split(" ").at(-1)}</Paragraph>
                                    </Card.Header>
                                    <Card.Footer>
                                        <YStack>
                                            <XStack width={"100%"} justifyContent={"space-between"}>
                                                <Paragraph size={"$4"}>{event.location.split("/")[2]}{"->"}{event.location.split("/").at(-1)}</Paragraph>
                                                <Paragraph size={"$4"}>{event.nb_inscrits}/{event.seats}</Paragraph>
                                            </XStack>
                                            {!registered && <Button onPress={() => buttonRegister(event.code, true)}>{registerLoad ? <Spinner/> : "Register"}</Button>}
                                            {event.already_register != null && <Button onPress={() => buttonRegister(event.code, false)}>{registerLoad ? <Spinner/> : "Unregister"}</Button>}
                                        </YStack>
                                    </Card.Footer>
                                </Card>
                            })}
                        </YStack>
                    </ScrollView>
                )}
            </YStack>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    scrollView: {
        alignItems: 'center',
        gap: '$2'
    }
});
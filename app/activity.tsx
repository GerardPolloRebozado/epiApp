import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { fetchActivity, registerActivity } from "@/fetchData";
import useSession from "@/app/ctx";
import { ActivityExtendedType } from "@/types";
import { Button, Card, H6, Paragraph, ScrollView, Spinner, XStack, YStack } from "tamagui";
import { StyleSheet } from "react-native";

export default function Activity() {
    const {session} = useSession();
    let registered = false
    if (!session) {
        return <Redirect href={"/auth"}/>
    }
    const local = useLocalSearchParams<{ activity: string, city: string, module: string, year: string }>();
    const [activity, setActivity] = useState<ActivityExtendedType | null>(null);
    const [reload, setReload] = useState(false)
    const [registerLoad, setRegisterLoad] = useState(false)
    useEffect(() => {
        async function getActivity() {
            if (!session) {
                return
            }
            const res = await fetchActivity(session, local.year, local.module, local.city, local.activity);
            if (res.ok) {
                setActivity(await res.json())
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
            if (event.already_register != null){
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
    return (
        <SafeAreaView style={styles.container}>
            <H6>{activity.title}</H6>
            {activity.events.length > 0 && (
                <ScrollView position={"absolute"} bottom={0} maxHeight={"60%"} contentContainerStyle={styles.container}>
                    {activity.events.map((event) => {
                        return <Card justifyContent={"center"} padded radiused elevate marginTop={"$2"} width={"95%"} key={event.code}>
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
                </ScrollView>
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 4,
    },
});
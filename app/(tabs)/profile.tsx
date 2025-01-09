import { RefreshControl, StyleSheet } from 'react-native';
import useSession from "@/app/ctx";
import { useEffect, useState } from "react";
import { MarksType, NotesType, UserType } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchImage, fetchMarks, fetchUser } from "@/fetchData";
import { Accordion, Avatar, Button, Card, ListItem, Paragraph, ScrollView, Separator, Spinner, Text, XStack, YStack } from 'tamagui';
import { Settings } from "@tamagui/lucide-icons";

export default function Profile() {
    const {signOut, session} = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [reload, setReload] = useState(true)
    const [user, setUser] = useState<UserType | null>(null);
    const [image, setImage] = useState<string>("error");
    const [marks, setMarks] = useState<MarksType | null>(null)

    useEffect(() => {
        async function getData() {
            if (!session) {
                console.log('No session available');
                setIsLoading(false);
                return;
            }
            try {
                const responseUser = await fetchUser(session);
                const responseMarks = await fetchMarks(session);
                const image = await fetchImage(session || "error");
                setImage(image);
                if (!responseUser.ok) {
                    console.error('Fetch error:', responseUser);
                } else {
                    const data = await responseUser.json();
                    setUser(data)
                }
                if (!responseMarks.ok) {
                    console.error('Fetch error:', responseMarks);
                } else {
                    const data: MarksType = await responseMarks.json();
                    const grouped = data.notes.reduce((acc: any, note) => {
                        const key = note.codemodule;
                        if (!acc[key]) {
                            acc[key] = [];
                        }
                        acc[key].push(note);
                        return acc;
                    }, {});
                    data.modules.forEach((module) => {
                        module.notes = grouped[module.codemodule] || [];
                    });
                    setMarks(data)
                }
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setIsLoading(false);
            }
        }

        getData();
    }, [session, reload]);

    if (isLoading || !user || !marks) {
        return (<SafeAreaView style={styles.container}>
            <Spinner size="large"/>
        </SafeAreaView>);
    }

    return (<SafeAreaView style={styles.container}>
        <XStack justifyContent={"flex-end"} alignItems={"flex-end"} width={"100%"}>
            <Settings/>
        </XStack>
        <Card bordered padded>
            <Card.Footer alignItems={"center"} gap={"$3"}>
                <Avatar radiused={true} size={"$8"}>
                    <Avatar.Image src={image}/>
                </Avatar>
                <YStack>
                    <Paragraph size={"$6"}>{user.title}</Paragraph>
                    <XStack justifyContent={"space-around"} gap={"$2"}>
                        <Paragraph size={"$3.5"}>{user.studentyear} year</Paragraph>
                        <Paragraph size={"$3.5"}>{user.credits} credits</Paragraph>
                        <Paragraph size={"$3.5"}>{user.gpa[0].gpa} GPA</Paragraph>
                    </XStack>
                </YStack>
            </Card.Footer>
        </Card>
        <YStack maxHeight={"70%"} gap={"$2"}>
            <Paragraph size="$5" textAlign={"center"}>Marks</Paragraph>
            <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => setReload(!reload)}/>} gap={"$4"}>
                <Accordion type={"multiple"} collapsable marginTop={"4"}>
                    {marks.modules.map((module) => (
                        <Accordion.Item value={module.codemodule} key={module.codemodule + module.codeinstance}>
                            <Accordion.Trigger flexDirection="row" justifyContent="space-between">
                                <Paragraph>{module.title} <Text color={module.grade !== "A" && module.grade !== "B" && module.grade !== '-' ? "red" : "green"}>{module.grade !== '-' ? `- ${module.grade}` : ""}</Text></Paragraph>
                            </Accordion.Trigger>
                            <Accordion.HeightAnimator animation="slow">
                                <Accordion.Content animation="slow" exitStyle={{opacity: 0}}>
                                    <YStack>
                                        {module.notes.map((note: NotesType) => (
                                            <YStack key={note.final_note + note.title}>
                                                <ListItem><Paragraph>{note.title}</Paragraph> <Paragraph>{note.final_note.toString(10)}</Paragraph></ListItem>
                                                <Separator/>
                                            </YStack>
                                        ))}
                                    </YStack>
                                </Accordion.Content>
                            </Accordion.HeightAnimator>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </ScrollView>
            <Button onPress={signOut} bordered>Logout</Button>
        </YStack>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

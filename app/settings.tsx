import {Card, CardFooter, H6, Paragraph, Separator, Spinner, ToggleGroup, YStack} from "tamagui";
import {useNavigation} from "expo-router";
import {Computer, Moon, Sun} from "@tamagui/lucide-icons";
import useSettings from "@/hooks/settings";
import {Appearance, ColorSchemeName, useColorScheme} from "react-native";
import {useEffect, useState} from "react";

export default function SettingsPage() {
    const navigation = useNavigation()
    const settings = useSettings()
    const appliedScheme = useColorScheme()
    const [notificationTime, setNotificationTime] = useState<string | null>(null)

    function change_theme(colorScheme: ColorSchemeName) {
        if (!colorScheme) {
            settings.theme.setItem('system')
            Appearance.setColorScheme(null);
        } else {
            settings.theme.setItem(colorScheme)
            Appearance.setColorScheme(colorScheme);
        }
    }

    function change_notifications(minutes: 5 | 15 | 30) {
        settings.notificationTime.setItem(minutes.toString(10))
    }

    useEffect(() => {
        navigation.setOptions({title: 'Settings'});
    }, []);

    useEffect(() => {
        (async () => {
            let time = await settings.notificationTime.getItem()
            if (!time || !['5', '15', '30'].includes(time)) {
                time = '5'
            }
            setNotificationTime(time)
        })();
    }, []);

    return (
        <YStack justifyContent={'center'} alignItems={'center'} marginHorizontal={"$3"}>
            <H6 marginBottom={"$4"} marginTop={"$6"}>Color mode</H6>
            <ToggleGroup orientation={"horizontal"} type={"single"} disableDeactivation defaultValue={appliedScheme ? appliedScheme : 'system'}>
                <ToggleGroup.Item value={'light'} onPress={() => change_theme('light')} aria-selected={appliedScheme === 'light'}>
                    <Sun/>
                </ToggleGroup.Item>
                <ToggleGroup.Item value={'system'} onPress={() => change_theme(null)} aria-selected={!appliedScheme}>
                    <Computer/>
                </ToggleGroup.Item>
                <ToggleGroup.Item value={'dark'} onPress={() => change_theme('dark')} aria-selected={appliedScheme === 'dark'}>
                    <Moon/>
                </ToggleGroup.Item>
            </ToggleGroup>
            <Separator/>
            <H6 marginBottom={"$4"} marginTop={"$6"}>Notification settings</H6>
            <Card radiused bordered padded marginBottom={"$4"}>
                <CardFooter><Paragraph>This allows to change how many minutes before the event you want to get notified</Paragraph></CardFooter>
            </Card>
            {!notificationTime ? <Spinner/> : (
                <ToggleGroup orientation={"horizontal"} type={"single"} disableDeactivation defaultValue={notificationTime}>
                    <ToggleGroup.Item value={'5'} onPress={() => change_notifications(5)} aria-selected={appliedScheme === 'light'}>
                        <Paragraph>5</Paragraph>
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value={'15'} onPress={() => change_notifications(15)} aria-selected={!appliedScheme}>
                        <Paragraph>15</Paragraph>
                    </ToggleGroup.Item>
                    <ToggleGroup.Item value={'30'} onPress={() => change_notifications(30)} aria-selected={appliedScheme === 'dark'}>
                        <Paragraph>30</Paragraph>
                    </ToggleGroup.Item>
                </ToggleGroup>)}
        </YStack>
    );
}
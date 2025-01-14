import { Paragraph, ToggleGroup, YStack } from "tamagui";
import { useNavigation } from "expo-router";
import { Computer, Moon, Sun } from "@tamagui/lucide-icons";
import useSettings from "@/hooks/settings";
import { useEffect, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

export default function SettingsPage() {
    const navigation = useNavigation()
    const settings = useSettings()
    const [theme, setTheme] = useState<ColorSchemeName>(null)

    useEffect(() => {
        Appearance.setColorScheme(theme);
    }, [theme]);

    navigation.setOptions({ title: 'Settings' });

    function change_theme(colorScheme: ColorSchemeName) {
        if (!colorScheme) {
            settings.theme.setItem('system')
        } else {
            settings.theme.setItem(colorScheme)
        }
        setTheme(colorScheme)
    }


    return (
        <YStack justifyContent={'center'} alignItems={'center'}>
            <Paragraph>Color mode</Paragraph>
            <ToggleGroup orientation={"horizontal"} type={"single"}>
                <ToggleGroup.Item value={'light'} onPress={() => change_theme('light')}>
                    <Sun/>
                </ToggleGroup.Item>
                <ToggleGroup.Item value={'system'} onPress={() => change_theme(null)}>
                    <Computer/>
                </ToggleGroup.Item>
                <ToggleGroup.Item value={'dark'} onPress={() => change_theme('dark')}>
                    <Moon/>
                </ToggleGroup.Item>
            </ToggleGroup>
        </YStack>
    );
}
import { Paragraph, ToggleGroup, YStack } from "tamagui";
import { useNavigation } from "expo-router";
import { Computer, Moon, Sun } from "@tamagui/lucide-icons";
import useSettings from "@/hooks/settings";
import { Appearance, ColorSchemeName, useColorScheme } from "react-native";

export default function SettingsPage() {
    const navigation = useNavigation()
    const settings = useSettings()
    const appliedScheme = useColorScheme()

    navigation.setOptions({ title: 'Settings' });

    function change_theme(colorScheme: ColorSchemeName) {
        if (!colorScheme) {
            settings.theme.setItem('system')
            Appearance.setColorScheme(null);
        } else {
            settings.theme.setItem(colorScheme)
            Appearance.setColorScheme(colorScheme);
        }
    }

    return (
        <YStack justifyContent={'center'} alignItems={'center'}>
            <Paragraph marginBottom={"$2"} marginTop={"$6"}>Color mode</Paragraph>
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
        </YStack>
    );
}
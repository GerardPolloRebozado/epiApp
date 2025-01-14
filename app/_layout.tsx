import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TamaguiProvider } from "tamagui";
import { config } from "@/tamagui.config";
import 'react-native-reanimated'
import { StatusBar } from "expo-status-bar";
import { SettingsProvider } from "@/hooks/settings";
import { useColorScheme } from "react-native";
import { SessionProvider } from "@/hooks/ctx";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <TamaguiProvider config={config} defaultTheme={colorScheme!}>
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <SessionProvider>
                    <SettingsProvider>
                        <StatusBar style="auto"/>
                        <Stack>
                            <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
                            <Stack.Screen name="+not-found"/>
                        </Stack>
                    </SettingsProvider>
                </SessionProvider>
            </ThemeProvider>
        </TamaguiProvider>
    )
}

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TamaguiProvider } from "tamagui";
import { useColorScheme } from '@/hooks/useColorScheme';
import { SessionProvider } from './ctx';
import { config } from "@/tamagui.config";

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
                    <Stack>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                    <StatusBar style="auto" />
                </SessionProvider>
            </ThemeProvider>
        </TamaguiProvider>
    );
}

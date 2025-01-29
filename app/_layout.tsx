import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TamaguiProvider } from 'tamagui';
import { config } from '@/tamagui.config';
import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import useSettings, { SettingsProvider } from '@/hooks/settings';
import { Appearance, type ColorSchemeName, useColorScheme } from 'react-native';
import { SessionProvider } from '@/hooks/ctx';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const settings = useSettings();
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

  settings.theme.getItem().then((theme) => {
    if (theme && theme !== 'system' && (theme as ColorSchemeName) !== colorScheme) {
      Appearance.setColorScheme(theme as ColorSchemeName);
    }
  });
  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme ? colorScheme : 'dark'}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SessionProvider>
          <SettingsProvider>
            <StatusBar style='auto' />
            <Stack>
              <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
              <Stack.Screen name='+not-found' />
            </Stack>
          </SettingsProvider>
        </SessionProvider>
      </ThemeProvider>
    </TamaguiProvider>
  );
}

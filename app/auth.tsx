import useSession from '@/hooks/ctx';
import CookieManager from '@react-native-cookies/cookies';
import {Redirect, Stack, useLocalSearchParams, useNavigation, useRouter} from 'expo-router';
import {useEffect} from 'react';
import WebView from 'react-native-webview';

export default function Auth() {
  const { session, signIn } = useSession();
  const navigation = useNavigation();
  const router = useRouter();
  const params = useLocalSearchParams<{ cloudflare?: string }>();

  useEffect(() => {
    setTimeout(() => {
      const interval = setInterval(
        async () => {
          const cookies = await CookieManager.get('https://intra.epitech.eu');
          console.log(cookies);
          if (cookies.user) {
            clearInterval(interval);
            signIn(cookies.user.value);
          }
        },
        params.cloudflare === 'true' ? 1000 : 8000,
      );
    }, 1000);
  }, [signIn, params]);

  if (session) {
    return <Redirect href={'/'} />;
  }
  return (
    <>
      <Stack.Screen options={{ title: params.cloudflare === 'true' ? 'Wait till cloudflare protection completes' : 'Please login' }} />
      <WebView sharedCookiesEnabled={true} thirdPartyCookiesEnabled={true} source={{ uri: 'https://intra.epitech.eu' }} />
    </>
  );
}

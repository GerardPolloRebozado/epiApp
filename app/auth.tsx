import useSession from "@/hooks/ctx";
import {useLocalSearchParams, useNavigation, useRouter} from "expo-router";
import CookieManager from '@react-native-cookies/cookies';
import WebView from "react-native-webview";
import {useEffect} from "react";

export default function Auth() {
    const {session, signIn} = useSession();
    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams<{ cloudflare?: string }>();

    navigation.setOptions({title: params.cloudflare === 'true' ? 'Wait till cloudflare protection completes' : 'Please login'});
    if (session) {
        router.push('/');
    }

    useEffect(() => {
        setTimeout(() => {
            const interval = setInterval(async () => {
                const cookies = await CookieManager.get('https://intra.epitech.eu');
                console.log(cookies);
                if (cookies.user) {
                    clearInterval(interval);
                    signIn(cookies.user.value);
                }
            }, params.cloudflare === 'true' ? 1000 : 8000);
        }, 1000);
    }, []);

    return (
        <WebView
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            source={{uri: 'https://intra.epitech.eu'}}>
        </WebView>
    );
}
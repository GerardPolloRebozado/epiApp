import useSession from "@/app/ctx";
import { Redirect } from "expo-router";
import CookieManager from '@react-native-cookies/cookies';
import WebView from "react-native-webview";
import { useEffect } from "react";

export default function Auth() {
    const {session, signIn} = useSession();
    if (session) {
        return <Redirect href={'/'}/>;
    }

    useEffect(() => {
        const interval = setInterval(async () => {
            const cookies = await CookieManager.get('https://intra.epitech.eu');
            console.log(cookies);
            if (cookies.user) {
                clearInterval(interval);
                signIn(cookies.user.value);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <WebView
            sharedCookiesEnabled={true}
            thirdPartyCookiesEnabled={true}
            source={{uri: 'https://intra.epitech.eu'}}>
        </WebView>
    );
}
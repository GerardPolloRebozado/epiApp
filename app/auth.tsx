import * as WebBrowser from 'expo-web-browser';
import {
    exchangeCodeAsync,
    makeRedirectUri,
    useAuthRequest,
    useAutoDiscovery,
} from 'expo-auth-session';
import {Text, SafeAreaView} from 'react-native';
import useSession from "@/app/ctx";
import {Redirect} from "expo-router";
import {Button} from "tamagui";

WebBrowser.maybeCompleteAuthSession();

export default function Auth() {
    const discovery = useAutoDiscovery('https://login.microsoftonline.com/common');
    const redirectUri = makeRedirectUri({
        native: 'epiapp://auth',
        scheme: 'epiapp',
    });
    const clientId = '323f813d-f69d-4f22-84d0-6bcb81caa093';
    const [request, , promptAsync] = useAuthRequest(
        {
            clientId,
            scopes: ['openid', 'profile', 'email', 'offline_access'],
            redirectUri,
        },
        discovery
    );
    const {session, signIn} = useSession();
    if (session) {
        return <Redirect href={'/'}/>;
    }
    const handleSignIn = () => {
        promptAsync().then((codeResponse) => {
            if (request && codeResponse?.type === 'success' && discovery) {
                exchangeCodeAsync(
                    {
                        clientId,
                        code: codeResponse.params.code,
                        extraParams: request.codeVerifier
                            ? {code_verifier: request.codeVerifier}
                            : undefined,
                        redirectUri,
                    },
                    discovery
                ).then((res) => {
                    signIn(res.idToken as string);
                    signIn('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpbiI6ImdlcmFyZC5kdS1wcmVAZXBpdGVjaC5ldSIsInR6IjpudWxsLCJleHAiOjE3MzY3OTUxOTZ9.mmpSr8DJhYrTApyMZbMPkQkSHj1Hvkp98msIUim56fA');
                }).catch((error) => {
                    console.error("Error exchanging code:", error);
                });
            }
        }).catch((error) => {
            console.error("Error during authentication:", error);
        });
    };

    return (
        <SafeAreaView>
            <Button
                disabled={!request}
                onPress={handleSignIn}
            >
                Sign in
            </Button>
            <Button onPress={() => signIn("guest")}>Guest mode</Button>
            <Text>{session ? 'Logged in' : 'Not logged in'}</Text>
        </SafeAreaView>
    );
}

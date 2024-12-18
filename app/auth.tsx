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
    const discovery = useAutoDiscovery(
        'https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/v2.0'
    );
    const redirectUri = makeRedirectUri({
        native: 'epiapp://redirect',
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
                    console.log(res.accessToken);
                    signIn(res.accessToken);
                });
            }
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
            <Text>{session ? 'Logged in' : 'Not logged in'}</Text>
        </SafeAreaView>
    );
}

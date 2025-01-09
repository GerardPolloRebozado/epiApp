import useSession from "@/app/ctx";
import { Redirect } from "expo-router";
import CookieManager from '@react-native-cookies/cookies';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Card, Paragraph } from "tamagui";
import * as Browser from 'react-native-inappbrowser-reborn';
import { Alert } from "react-native";


export default function Auth() {
    const {session, signIn} = useSession();
    if (session) {
        return <Redirect href={'/'}/>;
    }

    async function auth() {
        const url = 'https://intra.epitech.eu';
        try {
            if (await Browser.InAppBrowser.isAvailable()) {
                await Browser.InAppBrowser.open(url);
                const tokens = await CookieManager.get(url);
                if (tokens.user) {
                    signIn(tokens.user.value);
                } else {
                    Alert.alert('Error', 'An error occurred while trying to authenticate');
                    auth();
                }
            } else {
                Alert.alert('Error', 'InAppBrowser is not available contact the developer');
            }
        } catch (e) {
            Alert.alert('Error', 'An error occurred while trying to authenticate');
        }
    }

    return (
        <SafeAreaView>
            <Card justifyContent={"center"} marginHorizontal={"$4"} marginTop={"$6"} bordered radiused>
                <Card.Header><Paragraph>After pressing signin the login page will open please close the browser when you finish the signin</Paragraph></Card.Header>
                <Card.Footer><Button width={"100%"} onPress={auth}>Signin</Button></Card.Footer>
            </Card>
        </SafeAreaView>
    );
}
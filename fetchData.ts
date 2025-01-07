import JWT from "expo-jwt";

async function fetchEpitech(url: string, session: string) {
    return await fetch(`https://intra.epitech.eu/${url}`, {
        headers: {
            'Authorization': `Bearer ${session}`, 'Cookie': `user=${session}`, 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        }, credentials: 'omit'
    });
}

export async function fetchUser(session: string) {
    return await fetchEpitech(`user/${JWT.decode(session || "error", null).login}?format=json`, session)
}

export async function fetchImage(session: string): Promise<string> {
    const response = await fetchEpitech(`file/userprofil/profilview/${JWT.decode(session || "error", null).login}.jpg`, session);
    const data = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = function () {
            const base64data = reader.result as string;
            resolve(base64data);
        };
        reader.onerror = function () {
            reject("error");
        };
    });
}
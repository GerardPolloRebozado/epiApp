import JWT from "expo-jwt";

async function fetchEpitech(url: string, session: string, method?: "GET" | "POST" | "PUT" | "DELETE") {
    return await fetch(`https://intra.epitech.eu/${url}`, {
        method: method || 'GET',
        headers: {
            'Authorization': `Bearer ${session}`, 'Cookie': `user=${session}`, 'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        }, credentials: 'omit'
    });
}

export async function fetchUser(session: string) {
    return await fetchEpitech(`user/${JWT.decode(session, null).login}?format=json`, session)
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

export async function fetchActivities(session: string) {
    let date = new Date()
    date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1))
    const start = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    date.setDate(date.getDate() + 6)
    const end = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    return await fetchEpitech(`module/board?format=json&start=${start}&end=${end}`, session)
}

export async function fetchActivity(session: string, year: string, module: string, city: string, activity: string, project?: boolean) {
    return await fetchEpitech(`module/${year}/${module}/${city}/${activity}/${project ? 'project/' : ''}?format=json`, session)
}

export async function registerActivity(session: string, year: string, module: string, city: string, activity: string, event: string, register: boolean) {
    return await fetchEpitech(`module/${year}/${module}/${city}/${activity}/${event}/${register ? "register" : "unregister"}?format=json`, session, 'POST')
}

export async function fetchMarks(session: string) {
    return await fetchEpitech(`user/${JWT.decode(session, null).login}/notes?format=json`, session)
}
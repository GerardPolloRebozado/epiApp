import * as TaskManager from 'expo-task-manager'
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';
import { fetchActivities } from "@/fetchData";
import { Activity } from "@/types";
import { getLargeItemAsync } from "@/app/useStorageState";

TaskManager.defineTask('BACKGROUND-FETCH-ACTIVITIES', async () => {
    console.log('Background fetch running')
    const session = await getLargeItemAsync('session')
    if (typeof session !== 'string')
        return
    const res = await fetchActivities(session)
    if (!res.ok){
        console.error('Fetch error:', res)
        return
    }
    const activities: Activity[] = await res.json()
    const notifications = await Notifications.getAllScheduledNotificationsAsync();
    const activitiesScheduled: Activity[] = []
    activities.forEach(activity => {
        if (!activity.begin_event) {
            return
        }
        if (new Date(activity.begin_event).getTime() - new Date().getTime() < 0) {
            return
        }
        const notif = notifications.find(n => n.content.data.activity === activity.acti_title)
        if (!notif) {
            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Activity starting soon',
                    body: activity.acti_title,
                    data: {activity: activity.acti_title}
                },
                trigger: {
                    type: SchedulableTriggerInputTypes.DATE,
                    date: new Date(new Date(activity.begin_event).getTime() - 5 * 60 * 1000)
                }
            })
            activitiesScheduled.push(activity)
        }
    })
    console.log('Scheduled notifications for activities:', activitiesScheduled)
})

export async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync('BACKGROUND-FETCH-ACTIVITIES', {
        minimumInterval: 15 * 60 , // 15 minutes
        stopOnTerminate: false,
        startOnBoot: true,
    });
}
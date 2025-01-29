import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes } from 'expo-notifications';
import { fetchActivities } from '@/utils/fetchData';
import { Activity } from '@/types';
import { getLargeItemAsync } from '@/app/useStorageState';
import AsyncStorage from '@react-native-async-storage/async-storage';

TaskManager.defineTask('BACKGROUND-FETCH-ACTIVITIES', async () => {
  const session = await getLargeItemAsync('session');
  const notificationTimeStorage = await AsyncStorage.getItem('notificationTime');
  const notificationTimeConverted = notificationTimeStorage ? parseInt(notificationTimeStorage) : 5;

  if (typeof session !== 'string') return;

  const response = await fetchActivities(session, 2);

  if (!response.ok) {
    console.error('Fetch error:', response);
    return;
  }

  const activities: Activity[] = await response.json();
  activities.forEach((activity) => {
    if (!activity.begin_event) {
      return;
    }
    const currentTime = new Date().getTime();
    const activityTime = new Date(activity.begin_event).getTime();
    if (activityTime - currentTime < 0) {
      return;
    }

    if (activity.registered === 0 && activityTime - currentTime > 24 * 60 * 60 * 1000) {
      const reminderNotifId = `register_${activity.acti_title}`;
      Notifications.cancelScheduledNotificationAsync(reminderNotifId);
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Registration Reminder',
          body: `Don't forget to register for: ${activity.acti_title}`,
          data: {
            notifId: reminderNotifId,
            type: 'registration_reminder',
            route: 'activity',
            params: {
              scolaryear: activity.scolaryear,
              codemodule: activity.codemodule,
              codeinstance: activity.codeinstance,
              codeacti: activity.codeacti,
            },
          },
        },
        trigger: {
          type: SchedulableTriggerInputTypes.DATE,
          date: new Date(activityTime - 2 * 24 * 60 * 60 * 1000),
        },
      });
    }
    if (activity.registered === 1) {
      const startNotifId = `start_${activity.acti_title}`;
      Notifications.cancelScheduledNotificationAsync(startNotifId);
      if (activity.registered === 1) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'Activity starting soon',
            body: activity.acti_title,
            data: {
              notifId: startNotifId,
              type: 'activity_start',
              route: 'activity',
              params: {
                scolaryear: activity.scolaryear,
                codemodule: activity.codemodule,
                codeinstance: activity.codeinstance,
                codeacti: activity.codeacti,
              },
            },
          },
          trigger: {
            type: SchedulableTriggerInputTypes.DATE,
            date: new Date(activityTime - notificationTimeConverted * 60 * 1000),
          },
        });
      }
    }
  });
});

export async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync('BACKGROUND-FETCH-ACTIVITIES', {
    minimumInterval: 3 * 60 * 60, // 3 hours
    stopOnTerminate: false,
    startOnBoot: true,
  });
}

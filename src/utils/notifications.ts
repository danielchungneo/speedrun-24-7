import * as Notifications from 'expo-notifications';

const NOTIFICATION_ZONES = [
  {
    name: 'morning',
    hoursMin: 8,
    hoursMax: 12,
  },
  {
    name: 'afternoon',
    hoursMin: 12,
    hoursMax: 16,
  },
  {
    name: 'evening',
    hoursMin: 16,
    hoursMax: 20,
  },
];

export const testLocalNotification = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Test Notification!',
          body: `From mc-app`,
          sound: true,
        },
        trigger: {
          seconds: 5,
        },
      });
    } catch (error) {
      //
    }
  } catch (error: any) {
    console.log('error', error.message);
  }
};

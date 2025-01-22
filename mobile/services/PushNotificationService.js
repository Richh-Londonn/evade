
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export async function registerForPushNotificationsAsync() {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
        const { status: newStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        if (newStatus !== 'granted') {
            console.log('Failed to get push token for notifications!');
            return null;
        }
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Push Notification Token:', token);
    return token;
}

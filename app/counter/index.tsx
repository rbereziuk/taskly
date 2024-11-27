import { View, StyleSheet, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '../../utils/registerForPushNotificationsAsync';

export default function CounterScreen() {
  const scheduleNotification = async () => {
    const permission = await registerForPushNotificationsAsync();

    if (permission === 'granted') {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "I'm a notification from your app! 📨",
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 10,
        },
      });
    } else {
      Alert.alert(
        'Unable to schedule notification',
        'Enable the notifications permission for Expo Go in settings',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={scheduleNotification} title="Schedule Notification" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

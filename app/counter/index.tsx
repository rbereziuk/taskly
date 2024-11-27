import { View, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';
import ConfettiCannon from 'react-native-confetti-cannon';
import { registerForPushNotificationsAsync } from '../../utils/registerForPushNotificationsAsync';
import { useEffect, useRef, useState } from 'react';
import { intervalToDuration, isBefore } from 'date-fns';
import { TimeSegment } from '../../components/TimeSegment';
import { getData, storeData } from '../../utils/storage';
import { Button } from '../../components/Button';

// 10 seconds from now
//const frequency = Date.now() + 15 * 1000;
const frequency = 10 * 1000;
const TASK_NAME = 'Meditate';

export const countdownStorageKey = 'taskly-countdown';

export type PersistedCountdownState = {
  currentNotificationId: string | undefined;
  completedAtTimestamps: number[];
};

type CountdownStatus = {
  isOverdue: boolean;
  distance: ReturnType<typeof intervalToDuration>;
};

export default function CounterScreen() {
  const [countdownState, setCountdownState] =
    useState<PersistedCountdownState>();

  const [status, setStatus] = useState<CountdownStatus>({
    isOverdue: false,
    distance: {},
  });

  const confettiRef = useRef<any>();

  useEffect(() => {
    const init = async () => {
      const value = await getData(countdownStorageKey);
      setCountdownState(value);
    };
    init();
  }, []);

  const lastCompletedAt = countdownState?.completedAtTimestamps[0];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timestamp = lastCompletedAt
        ? lastCompletedAt + frequency
        : Date.now();
      const isOverdue = isBefore(timestamp, Date.now());
      const distance = intervalToDuration(
        isOverdue
          ? { start: timestamp, end: Date.now() }
          : { start: Date.now(), end: timestamp },
      );
      setStatus({ isOverdue, distance });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [lastCompletedAt]);

  const scheduleNotification = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const permission = await registerForPushNotificationsAsync();

    let pushNotificationId;

    if (permission === 'granted') {
      pushNotificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: `${TASK_NAME} overdue!`,
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: frequency / 1000,
        },
      });
    } else {
      Alert.alert(
        'Unable to schedule notification',
        'Enable the notifications permission for Expo Go in settings',
      );
    }

    if (countdownState?.currentNotificationId) {
      await Notifications.cancelScheduledNotificationAsync(
        countdownState.currentNotificationId,
      );
    }

    const newCountdownState: PersistedCountdownState = {
      currentNotificationId: pushNotificationId,
      completedAtTimestamps: countdownState
        ? [Date.now(), ...countdownState.completedAtTimestamps]
        : [Date.now()],
    };

    setCountdownState(newCountdownState);

    await storeData(countdownStorageKey, newCountdownState);
    confettiRef?.current?.start();
  };

  return (
    <View
      style={[
        styles.container,
        status.isOverdue && { backgroundColor: 'lightcoral' },
      ]}
    >
      {!status.isOverdue ? (
        <Text style={[styles.heading]}>{TASK_NAME} due in</Text>
      ) : (
        <Text style={[styles.heading, styles.whiteText]}>
          {TASK_NAME} overdue by
        </Text>
      )}
      <View style={styles.segments}>
        <TimeSegment
          unit="Days"
          number={status.distance?.days ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Hours"
          number={status.distance.hours ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Minutes"
          number={status.distance?.minutes ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
        <TimeSegment
          unit="Seconds"
          number={status.distance?.seconds ?? 0}
          textStyle={status.isOverdue ? styles.whiteText : undefined}
        />
      </View>

      <Button title={`I've meditate`} onPress={scheduleNotification} />

      <Button
        title="Cancel notification"
        onPress={async () => {
          if (countdownState?.currentNotificationId) {
            await Notifications.cancelAllScheduledNotificationsAsync();
          }
        }}
        style={{
          marginTop: 10,
        }}
      />
      <ConfettiCannon
        ref={confettiRef}
        count={50}
        origin={{ x: Dimensions.get('window').width / 2, y: -30 }}
        autoStart={false}
        fadeOut={true}
      />
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
  segments: {
    flexDirection: 'row',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000',
  },
  whiteText: {
    color: '#fff',
  },
});

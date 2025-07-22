import { Link, Stack } from 'expo-router';
import { Pressable } from 'react-native';
import { theme } from '../../theme';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';

export default function CounterLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Counter',
          headerRight: () => (
            <Link href="/counter/history" asChild style={{ marginRight: 10 }}>
              <Pressable hitSlop={20}>
                <MaterialIcons
                  name="history"
                  size={32}
                  color={theme.colorPrimary}
                />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="history" options={{ title: 'History' }} />
    </Stack>
  );
}

import { Link, Stack } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable } from 'react-native';

export default function CounterLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Counter',
          headerRight: () => (
            <Link href="/idea">
              <Pressable hitSlop={20}>
                <MaterialIcons name="history" size={32} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Stack.Screen name="history" options={{ title: 'History' }} />
    </Stack>
  );
}

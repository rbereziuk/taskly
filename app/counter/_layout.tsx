import { Stack } from 'expo-router';

export default function CounterLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: 'Counter',
        }}
      />
      <Stack.Screen name="history" options={{ title: 'History' }} />
    </Stack>
  );
}

import { Link, Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/build/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import { theme } from '../theme';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'forestgreen',
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Shopping list',
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="counter"
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
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clockcircleo" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="idea"
        options={{
          title: 'Idea',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="lightbulb" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

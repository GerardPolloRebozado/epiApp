import { Tabs } from 'expo-router';
import 'react-native-reanimated';
import React from 'react';
import { Text} from 'react-native';
import { Redirect } from 'expo-router';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import useSession from "@/app/ctx";
import {AntDesign} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
    const { session, isLoading } = useSession();
    if (isLoading) {
        return <Text>Loading...</Text>;
    }
    if (!session) {
        return <Redirect href="/auth" />;
    }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

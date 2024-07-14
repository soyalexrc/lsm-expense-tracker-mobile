import { Tabs } from 'expo-router';
import React from 'react';

import Feather from '@expo/vector-icons/Feather';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import HomeHeader from "@/components/layout/HomeHeader";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          tabBarStyle: {
            borderTopWidth: 0,

          }
      }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: '',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
              <Feather name="inbox" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
              <Feather name="bar-chart" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
              <Feather name="settings" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

import {Tabs} from 'expo-router';
import React from 'react';

import Feather from '@expo/vector-icons/Feather';

import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {View} from "react-native";
import {BlurView} from "expo-blur";

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                tabBarStyle: {
                    position: 'absolute',
                },
                tabBarItemStyle: {
                    height: 50,
                    marginTop: 2,
                },
                tabBarBackground: () => <View style={{ flex: 1 }}>
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <BlurView
                            intensity={100}
                            tint='prominent'
                            style={{ flex: 1 }}
                        />
                    </View>
                </View>
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    headerShown: false,
                    tabBarIcon: ({color, focused}) => (
                        <Feather name="inbox" size={28} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="(reports)"
                options={{
                    headerShown: false,
                    title: '',
                    tabBarIcon: ({color, focused}) => (
                        <Feather name="bar-chart" size={28} color={color}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: '',
                    tabBarIcon: ({color, focused}) => (
                        <Feather name="settings" size={28} color={color}/>
                    ),
                }}
            />
        </Tabs>
    );
}

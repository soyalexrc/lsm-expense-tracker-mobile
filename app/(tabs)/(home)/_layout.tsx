import {Stack} from "expo-router";
import HomeHeader from "@/components/layout/HomeHeader";
import React from "react";

export default function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    // header: () => <HomeHeader />,
                    // headerTransparent: true,
                    // headerBlurEffect: 'light'

                }}
            />
            <Stack.Screen name="transactions/[id]" />
        </Stack>
    )
}

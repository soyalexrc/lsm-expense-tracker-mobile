import {useFonts} from 'expo-font';
import {Slot, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import NetInfo from '@react-native-community/netinfo';

import {GestureHandlerRootView} from "react-native-gesture-handler";
import Providers from "@/lib/components/Providers";
import {useAppDispatch} from "@/lib/store/hooks";
import {changeNetworkState} from "@/lib/store/features/network/networkSlice";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
    const dispatch = useAppDispatch();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(
            state => dispatch(changeNetworkState(state))
        )
        return () => {
            unsubscribe()
        }
    }, []);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return <Slot />;
    }
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="transactionCreateUpdate"
                          options={{presentation: 'fullScreenModal', headerShown: false}}/>
            <Stack.Screen name="+not-found"/>
        </Stack>
    )
}

export default function RootLayout() {


    return (
        <Providers>
           <InitialLayout />
        </Providers>
    );
}

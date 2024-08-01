import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import NetInfo from '@react-native-community/netinfo';
import Providers from "@/lib/components/Providers";
import {useAppDispatch} from "@/lib/store/hooks";
import {changeNetworkState} from "@/lib/store/features/network/networkSlice";
import {getAllAccounts, getAllCategories} from "@/lib/db";
import {useSQLiteContext} from "expo-sqlite";
import {Account, updateAccountsList} from "@/lib/store/features/accounts/accountsSlice";
import {Category, updateCategoriesList} from "@/lib/store/features/categories/categoriesSlice";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
    const dispatch = useAppDispatch();
    const db = useSQLiteContext();
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
            updateStore();
        }
    }, [loaded]);

    async function updateStore() {
        try {
            const accounts = getAllAccounts(db);
            const categories = getAllCategories(db);
            dispatch(updateAccountsList(accounts as Account[]))
            dispatch(updateCategoriesList(categories as Category[]))
        } catch (err) {
            console.log(err);
        }
    }

    if (!loaded) {
        return null;
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

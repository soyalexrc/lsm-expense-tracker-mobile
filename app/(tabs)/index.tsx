import ResumeDropDown from "@/lib/components/ResumeDropDown";
import React, {useState} from "react";
import {ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import HomeResumeItems from "@/lib/components/HomeResumeItems";
import {BlurView} from "expo-blur";
import HeaderDropDownMenu from "@/lib/components/layout/AccountSelectDropdown";
import {Feather} from "@expo/vector-icons";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useRouter} from "expo-router";
import {resetCurrentTransaction} from "@/lib/store/features/transactions/transactionsSlice";
import {useAppDispatch} from "@/lib/store/hooks";
import {ThemedView} from "@/lib/components/ThemedView";
import {useTheme} from "@react-navigation/native";



export default function HomeScreen() {
    const router = useRouter();
    const schemeColor = useColorScheme()
    const dispatch = useAppDispatch();
    const insets = useSafeAreaInsets()
    const colors = useTheme().colors;

    function onPressNewTransaction() {
        dispatch(resetCurrentTransaction());
        router.push('/transactionCreateUpdate');
    }

    return (
        <View style={styles.container}>
            <BlurView intensity={100} tint='prominent' style={[styles.header, { paddingTop: insets.top }]}>
                <HeaderDropDownMenu />
                <TouchableOpacity onPress={onPressNewTransaction} style={[{backgroundColor: colors.text}, styles.createButton]}>
                    <Feather name="plus" size={20} color={colors.background} />
                </TouchableOpacity>
            </BlurView>
            <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, { backgroundColor: schemeColor === 'light' ? 'white' : 'black', paddingTop: insets.top + 50  }]}>
                <ResumeDropDown />

                {/*    Lista de items por semana, mes y cada dia como separator con el total*/}
                <Text>This is from update OTA</Text>
                <HomeResumeItems />
                <View style={{ height: 200 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: 10,
    },
    createButton: {
        borderRadius: 100,
        padding: 3
    }
})


import {StyleSheet, Text, TouchableOpacity, useColorScheme, View} from "react-native";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import HeaderDropDownMenu from "@/components/layout/HeaderDropDown";
import { Feather } from '@expo/vector-icons';
import {BlurView} from "expo-blur";

export default function HomeHeader() {
    const insets = useSafeAreaInsets()
    const schemeColor = useColorScheme();

    return (
        <BlurView intensity={100} tint='light' style={[{ paddingTop: insets.top }, styles.container]}>
            <HeaderDropDownMenu />
            <TouchableOpacity style={[{backgroundColor: schemeColor === 'light' ? 'black' : 'white'}, styles.createButton]}>
                <Feather name="plus" size={18} color={schemeColor === 'light' ? 'white' : 'black'} />
            </TouchableOpacity>
        </BlurView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    createButton: {
        borderRadius: 100,
        padding: 5
    }
})

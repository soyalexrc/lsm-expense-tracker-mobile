import ResumeDropDown from "@/components/ResumeDropDown";
import React, {useState} from "react";
import {ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View} from "react-native";
import HomeResumeItems from "@/components/HomeResumeItems";
import {BlurView} from "expo-blur";
import HeaderDropDownMenu from "@/components/layout/HeaderDropDown";
import {Feather} from "@expo/vector-icons";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useHeaderHeight} from "@react-navigation/elements";
import {useRouter} from "expo-router";

const groups = [
    {
        key: 'spent',
        items: [
            {
                key: '0',
                title: 'Spent this week',
                icon: '',
                iconAndroid: ''
            },
            {
                key: '1',
                title: 'Spent this month',
                icon: '',
                iconAndroid: ''
            }
        ]
    },
    {
        key: 'revenue',
        items: [
            {
                key: '2',
                title: 'Revenue this week',
                icon: '',
                iconAndroid: ''
            },
            {
                key: '3',
                title: 'Revenue this month',
                icon: '',
                iconAndroid: ''
            }
        ]
    },
    {
        key: 'balance',
        items: [
            {
                key: '4',
                title: 'Current balance',
                icon: '',
                iconAndroid: ''
            }
        ]
    }
]


export default function HomeScreen() {
    const router = useRouter();
    const schemeColor = useColorScheme()
    const insets = useSafeAreaInsets()
    const [selectedItem, setSelectedItem] = useState<string>('0')

    function handleDropDownTriggerPress(value: 'on' | 'mixed' | 'off', keyItem: string) {
        console.log({value, keyItem});
        setSelectedItem(keyItem);
    }

    return (
        <View style={styles.container}>
            <BlurView intensity={100} tint='prominent' style={[styles.header, { paddingTop: insets.top }]}>
                <HeaderDropDownMenu />
                <TouchableOpacity onPress={() => router.push('/transactionCreateUpdate')} style={[{backgroundColor: schemeColor === 'light' ? 'black' : 'white'}, styles.createButton]}>
                    <Feather name="plus" size={20} color={schemeColor === 'light' ? 'white' : 'black'} />
                </TouchableOpacity>
            </BlurView>
            <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, { backgroundColor: schemeColor === 'light' ? 'white' : 'black', paddingTop: insets.top + 50  }]}>
                <ResumeDropDown groups={groups} selectedItem={selectedItem} onSelect={handleDropDownTriggerPress} />

                {/*    Lista de items por semana, mes y cada dia como separator con el total*/}
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


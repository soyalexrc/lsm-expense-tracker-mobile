import {FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Entypo} from "@expo/vector-icons";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {useCallback, useMemo, useRef, useState} from "react";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetView
} from "@gorhom/bottom-sheet";
import CustomBackdrop from "@/components/CustomBackdrop";
import DatePicker from 'react-native-date-picker'
import {locale} from "dayjs";
import {format} from "date-fns";


const data = [
    {id: '001', value: '7'},
    {id: '002', value: '8'},
    {id: '003', value: '9'},
    {id: '004', value: '4'},
    {id: '005', value: '5'},
    {id: '006', value: '6'},
    {id: '007', value: '1'},
    {id: '008', value: '2'},
    {id: '009', value: '3'},
    {id: '010', value: '.'},
    {id: '011', value: '0'},
    {id: '012', value: '<', isBackSpace: true},
]

export default function ItemDetailOrCreateScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [amount, setAmount] = useState<string>('0');
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [date, setDate] = useState<any>(new Date());
    const categoriesModalRef = useRef<BottomSheetModal>(null);
    const accountsModalRef = useRef<BottomSheetModal>(null);
    const snapPointsCategories = useMemo(() => ['50%', '75%'], []);
    const snapPointsAccounts = useMemo(() => ['25%'], []);

    // callbacks

    const handlePressCategoriesModal = useCallback(() => {
        categoriesModalRef.current?.present();
    }, []);

    const handlePressAccountsModal = useCallback(() => {
        accountsModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handleNumberPress = (item: { id: string, value: string, isBackSpace?: boolean }) => {
        if (item.isBackSpace) {
            let newAmount = amount.slice(0, -1);
            if (newAmount === '') {
                newAmount = '0';
            }
            setAmount(newAmount);
        } else {
            let updatedAmount = amount === '0' ? '' : amount
            if (item.value === '.') {
                // Ensure only one decimal point
                if (!updatedAmount.includes('.')) {
                    updatedAmount += item.value;
                }
            } else {
                updatedAmount += item.value;
            }
            const decimalIndex = updatedAmount.indexOf('.');
            if (decimalIndex !== -1 && updatedAmount.length - decimalIndex > 3) return;

            setAmount(updatedAmount);
        }
    };

    function formatByThousands(value: string) {
        const decimals = value.split('.')[1] ?? '';
        const rawValue = value.split('.')[0];
        const valueWithCommas = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Regex for comma separators

        return valueWithCommas + (decimals && '.' + decimals);
    }

    function removeCommas(numberString: string) {
        return Number(numberString.replace(/,/g, ''));
    }

    return (
        <>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    <View style={[styles.header, {paddingTop: insets.top}]}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={{fontSize: 18, color: 'gray'}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.calendarButton} onPress={() => setShowCalendar(true)}>
                            <Text style={{fontSize: 18, color: 'gray'}}>{format(date, 'MMM d')}</Text>
                            <Entypo name="select-arrows" size={18} color="black"/>
                        </TouchableOpacity>
                        <View style={styles.headerRightSide}>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="calendar-sync-outline" size={24} color="gray"/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Entypo name="dots-three-horizontal" size={24} color="gray"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.amount}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                                <Text style={{ color: 'gray', fontSize: 32, marginTop: 10 }}>S/</Text>
                                <Text style={{ fontSize: 64 }}>{formatByThousands(amount)}</Text>
                            </View>
                        </View>
                        <View style={styles.keyboard}>
                            <View style={{borderBottomWidth: 1, borderColor: 'lightgray'}}>
                                <TouchableOpacity style={{paddingVertical: 10, paddingHorizontal: 20}}>
                                    <Text style={{ fontSize: 16 }}>Notes</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                borderBottomWidth: 1,
                                borderColor: 'lightgray',
                                flexDirection: 'row',
                                gap: 20,
                                paddingHorizontal: 30
                            }}>
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flex: 0.4,
                                    paddingVertical: 10
                                }} onPress={handlePressAccountsModal}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                        <Text style={{ fontSize: 16 }}>💵</Text>
                                        <Text style={{ fontSize: 16 }}>Cash</Text>
                                    </View>
                                    <AntDesign name="arrowright" size={24} color="gray"/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handlePressCategoriesModal}
                                    style={{flexDirection: 'row', alignItems: 'center', flex: 0.4, paddingVertical: 10}}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                        <Text style={{ fontSize: 16 }}>🍪</Text>
                                        <Text style={{ fontSize: 16 }}>Snacks</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{flex: 0.2, justifyContent: 'center'}}>
                                    <TouchableOpacity style={{
                                        backgroundColor: 'black',
                                        borderRadius: 100,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 70,
                                        height: 30
                                    }} onPress={() => router.back()}>
                                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={data}
                                    contentContainerStyle={{ flex: 1, justifyContent: 'center', marginHorizontal: 30 }}
                                    keyExtractor={({id}) => id}
                                    numColumns={3}
                                    scrollEnabled={false}
                                    renderItem={({item}) => (
                                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 5}}>
                                            <TouchableOpacity onPress={() => handleNumberPress(item)} style={{ justifyContent: 'center', alignItems: 'center', height: 70, width: 70 }}>
                                                <Text style={{ fontSize: 30, color: 'gray' }}>{item.value}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <BottomSheetModal
                    ref={categoriesModalRef}
                    index={0}
                    snapPoints={snapPointsCategories}
                    onChange={handleSheetChanges}
                    backdropComponent={CustomBackdrop}

                >
                    <BottomSheetView style={{ flex: 1, alignItems: 'center' }}>
                        <Text>categories 🎉</Text>
                    </BottomSheetView>
                </BottomSheetModal>
                <BottomSheetModal
                    ref={accountsModalRef}
                    index={0}
                    snapPoints={snapPointsAccounts}
                    onChange={handleSheetChanges}
                    backdropComponent={CustomBackdrop}
                >
                    <BottomSheetView style={{ flex: 1, alignItems: 'center' }}>
                        <Text>accounts 🎉</Text>
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
            {/*TODO add locales*/}
            <DatePicker
                modal
                open={showCalendar}
                date={date}
                maximumDate={new Date()}
                onConfirm={(date) => {
                    console.log(date);
                    setShowCalendar(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setShowCalendar(false)
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    calendarButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3
    },
    headerRightSide: {
        flexDirection: 'row',
        gap: 20
    },
    content: {
        flex: 1,
    },
    amount: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    keyboard: {
        flex: 0.6,
    }
})

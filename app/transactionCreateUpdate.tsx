import {Button, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Entypo} from "@expo/vector-icons";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import {useCallback, useMemo, useRef, useState} from "react";
import {
    BottomSheetFlatList,
    BottomSheetModal,
    BottomSheetModalProvider, BottomSheetScrollView, BottomSheetTextInput,
    BottomSheetView
} from "@gorhom/bottom-sheet";
import CustomBackdrop from "@/components/CustomBackdrop";
import DatePicker from 'react-native-date-picker'
import {locale} from "dayjs";
import {format} from "date-fns";
import RecurringSelectorDropdown from "@/components/RecurringSelectorDropdown";

const categoriesData = [
    {
        id: 1,
        type: 'expense',
        en: {
            title: 'Groceries',
            icon: '🥑',
        }
    },
    {
        id: 2,
        type: 'expense',
        en: {
            title: 'Snacks',
            icon: '🍪',
        }
    },
    {
        id: 3,
        type: 'expense',
        en: {
            title: 'Eating Out',
            icon: '🍽️',
        }
    },
    {
        id: 4,

        type: 'expense', en: {
            title: 'Coffee',
            icon: '☕',
        }
    },
    {
        id: 5,

        type: 'expense', en: {
            title: 'Drinks',
            icon: '🍹',
        }
    },
    {
        id: 6,

        type: 'expense', en: {
            title: 'Beauty',
            icon: '💄',
        }
    },
    {
        id: 7,

        type: 'expense', en: {
            title: 'Clothing',
            icon: '👕',
        }
    },
    {
        id: 8,

        type: 'expense', en: {
            title: 'Accessories',
            icon: '💍',
        }
    },
    {
        id: 9,

        type: 'expense', en: {
            title: 'Gifts',
            icon: '🎁',
        }
    },
    {
        id: 10,
        type: 'expense',
        en: {
            title: 'Entertainment',
            icon: '🍿',
        }
    },
    {
        id: 11,
        type: 'expense',
        en: {
            title: 'House',
            icon: '🏠',
        }
    },
    {
        id: 12,
        type: 'expense',
        en: {
            title: 'Tech',
            icon: '📱',
        }
    },
    {
        id: 13,
        type: 'expense',
        en: {
            title: 'Subscriptions',
            icon: '📅',
        }
    },
    {
        id: 14,
        type: 'expense',
        en: {
            title: 'Car',
            icon: '🚗',
        }
    },
    {
        id: 15,
        type: 'expense',
        en: {
            title: 'Taxi',
            icon: '🚕',
        }
    },
    {
        id: 16,
        type: 'expense',
        en: {
            title: 'Charity',
            icon: '🎗️',
        }
    },
    {
        id: 17,
        type: 'expense',
        en: {
            title: 'Education',
            icon: '📚',
        }
    },
    {
        id: 18,
        type: 'expense',
        en: {
            title: 'Health',
            icon: '💊',
        }
    },
    {
        id: 19,
        type: 'expense',
        en: {
            title: 'Travel',
            icon: '🏝️',
        }
    },
    {
        id: 20,
        type: 'expense',
        en: {
            title: 'Pets',
            icon: '🐶',
        }
    },
    {
        id: 21,
        type: 'expense',
        en: {
            title: 'Miscellaneous',
            icon: '🤷‍♂️',
        }
    },
    {
        id: 22,
        type: 'income',
        en: {
            title: 'Paycheck',
            icon: '👔',
        }
    },
    {
        id: 23,
        type: 'income',
        en: {
            title: 'Business',
            icon: '💼',
        }
    },
    {
        id: 24,
        type: 'income',
        en: {
            title: 'Other',
            icon: '💸',
        }
    },

]

const accountsData = [
    {
        id: 1,
        title: 'Cash',
        icon: '💵'
    },
    {
        id: 2,
        title: 'Credit Card',
        icon: '💳'
    },
    {
        id: 3,
        title: 'Visa *** 9993',
        icon: '💳'
    }
]

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

export default function Screen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [amount, setAmount] = useState<string>('0');
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const [date, setDate] = useState<any>(new Date());
    const categoriesModalRef = useRef<BottomSheetModal>(null);
    const notesModalRef = useRef<BottomSheetModal>(null);
    const accountsModalRef = useRef<BottomSheetModal>(null);
    const snapPointsCategories = useMemo(() => ['60%'], []);
    const snapPointsAccounts = useMemo(() => ['40%'], []);
    const snapPointsNotes = useMemo(() => ['25%'], []);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const isEditing = false;
    // callbacks

    const handlePressNotesModal = useCallback(() => {
        setIsModalOpen(true);
        notesModalRef.current?.present();
    }, []);

    const handlePressCategoriesModal = useCallback(() => {
        setIsModalOpen(true);
        categoriesModalRef.current?.present();
    }, []);

    const handlePressAccountsModal = useCallback(() => {
        setIsModalOpen(true);
        accountsModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        if (index < 0) {
            setIsModalOpen(false);
        }
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

    function textShortener(txt: string, limit = 10) {
        return txt.length > limit ? txt.substring(0, 9).concat('...') : txt;
    }

    function closeModal() {
        categoriesModalRef.current?.close();
        notesModalRef.current?.close();
        accountsModalRef.current?.close();
        setIsModalOpen(false);
    }

    function selectCategory() {
        closeModal()
    }

    function selectAccount() {
        closeModal()
    }

    return (
        <>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    {isModalOpen && <Pressable onPress={closeModal} style={{ position: 'absolute', zIndex: 10, backgroundColor: 'black', opacity: 0.2, left: 0, top: 0, width: '100%', height: '100%' }} />}
                    <View style={[styles.header, {paddingTop: insets.top}]}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={{fontSize: 18, color: 'gray'}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.calendarButton} onPress={() => setShowCalendar(true)}>
                            <Text style={{fontSize: 18, color: 'gray'}}>{format(date, 'MMM d')}</Text>
                            <Entypo name="select-arrows" size={18} color="black"/>
                        </TouchableOpacity>
                        <View style={styles.headerRightSide}>
                            <RecurringSelectorDropdown />
                            {
                                isEditing &&
                                <TouchableOpacity>
                                    <Entypo name="dots-three-horizontal" size={24} color="gray"/>
                                </TouchableOpacity>
                            }
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
                                <TouchableOpacity onPress={handlePressNotesModal} style={{paddingVertical: 10, paddingHorizontal: 20}}>
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
                >
                    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{ textAlign: 'center', marginVertical: 15, fontSize: 16, fontWeight: 'bold', color: 'gray' }}>EXPENSES</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 20, columnGap: 10 }}>
                            {categoriesData.filter(c => c.type === 'expense')?.map(item => (
                                <TouchableOpacity onPress={selectCategory} key={item.id} style={{ justifyContent: 'center', width: '23%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 40 }}>{item.en.icon}</Text>
                                    <Text>{textShortener(item.en.title)}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <Text style={{ textAlign: 'center', marginBottom: 15, marginTop: 50, fontSize: 16, fontWeight: 'bold', color: 'gray' }}>INCOMES</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 20, columnGap: 10 }}>
                            {categoriesData.filter(c => c.type === 'income').map(item => (
                                <TouchableOpacity onPress={selectCategory} key={item.id} style={{ justifyContent: 'center', width: '23%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 40 }}>{item.en.icon}</Text>
                                    <Text>{textShortener(item.en.title)}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <Text style={{ textAlign: 'center', marginBottom: 15, marginTop: 50, fontSize: 16, fontWeight: 'bold', color: 'gray' }}>ACCOUNTS</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 20, columnGap: 10 }}>
                            {accountsData.map(item => (
                                <TouchableOpacity onPress={selectAccount} key={item.id} style={{ justifyContent: 'center', width: '23%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 40 }}>{item.icon}</Text>
                                    <Text>{textShortener(item.title, 15)}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={{ height: 100 }} />

                    </BottomSheetScrollView>
                </BottomSheetModal>
                <BottomSheetModal
                    ref={accountsModalRef}
                    index={0}
                    snapPoints={snapPointsAccounts}
                    onChange={handleSheetChanges}
                >
                    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{ textAlign: 'center', marginVertical: 15, fontSize: 16, fontWeight: 'bold', color: 'gray' }}>ACCOUNTS</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 20, columnGap: 10 }}>
                            {accountsData.map(item => (
                                <TouchableOpacity onPress={selectAccount} key={item.id} style={{ justifyContent: 'center', width: '23%', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 40 }}>{item.icon}</Text>
                                    <Text>{textShortener(item.title, 15)}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={{ height: 100 }} />

                    </BottomSheetScrollView>
                </BottomSheetModal>
                <BottomSheetModal
                    ref={notesModalRef}
                    index={0}
                    snapPoints={snapPointsNotes}
                    keyboardBehavior="fillParent"
                    onChange={handleSheetChanges}
                >
                    <BottomSheetTextInput multiline={true} numberOfLines={3} style={styles.input} />
                    <Button title="Accept" onPress={closeModal} />
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
        position: 'relative',
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
    },
    input: {
        marginTop: 8,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 16,
        lineHeight: 20,
        padding: 8,
        margin: 10,
        height: 100,
        backgroundColor: 'rgba(151, 151, 151, 0.25)',
    },
})

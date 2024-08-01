import {FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Entypo} from "@expo/vector-icons";
import {AntDesign} from '@expo/vector-icons';
import {useState} from "react";
import {
    BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import DatePicker from 'react-native-date-picker'
import {format} from "date-fns";
import RecurringSelectorDropdown from "@/lib/components/RecurringSelectorDropdown";
import {useAppDispatch, useAppSelector} from "@/lib/store/hooks";
import {selectSelectedCategory} from "@/lib/store/features/categories/categoriesSlice";
import {formatByThousands, textShortener} from "@/lib/helpers/string";
import CategoriesBottomSheet from "@/lib/components/CategoriesBottomSheet";
import {selectLayoutModalState, updateLayoutModalState} from "@/lib/store/features/ui/uiSlice";
import {keypadData} from "@/lib/utils/data/transaction";
import AccountsBottomSheet from "@/lib/components/AccountsBottomSheet";
import {selectSelectedAccountForm} from "@/lib/store/features/accounts/accountsSlice";
import NotesBottomSheet from "@/lib/components/NotesBottomSheet";
import {
    onChangeAmount,
    onChangeDate,
    selectCurrentTransaction
} from "@/lib/store/features/transactions/transactionsSlice";
import TransactionKeyboard from "@/lib/components/TransactionKeyboard";

export default function Screen() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const currentTransaction = useAppSelector(selectCurrentTransaction)
    const selectedCategory = useAppSelector(selectSelectedCategory);
    const selectedAccount = useAppSelector(selectSelectedAccountForm);
    const insets = useSafeAreaInsets();
    const [showCalendar, setShowCalendar] = useState<boolean>(false);
    const isModalOpen = useAppSelector(selectLayoutModalState)
    // callbacks

    function closeModal() {
        dispatch(updateLayoutModalState(false));
    }

    return (
        <>
            <BottomSheetModalProvider>
                <View style={styles.container}>
                    {isModalOpen && <Pressable onPress={closeModal} style={styles.backdrop} />}
                    <View style={[styles.header, {paddingTop: insets.top}]}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text style={{fontSize: 18, color: 'gray'}}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.calendarButton} onPress={() => setShowCalendar(true)}>
                            <Text style={{fontSize: 18, color: 'gray'}}>{format(new Date(currentTransaction.date), 'MMM d')}</Text>
                            <Entypo name="select-arrows" size={18} color="black"/>
                        </TouchableOpacity>
                        <View style={styles.headerRightSide}>
                            <RecurringSelectorDropdown/>
                            {
                                currentTransaction.id > 0 &&
                                <TouchableOpacity>
                                    <Entypo name="dots-three-horizontal" size={24} color="gray"/>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.amount}>
                            <View style={{flexDirection: 'row', alignItems: 'flex-start', gap: 10}}>
                                <Text style={{color: 'gray', fontSize: 32, marginTop: 10}}>S/</Text>
                                <Text style={{fontSize: 64}}>{formatByThousands(String(currentTransaction.amount))}</Text>
                            </View>
                        </View>
                        <View style={styles.keyboard}>
                            <View style={{borderBottomWidth: 1, borderColor: 'lightgray'}}>
                                <NotesBottomSheet styles={{paddingVertical: 10, paddingHorizontal: 20}}>
                                    <Text style={{fontSize: 16}}>Notes</Text>
                                </NotesBottomSheet>
                            </View>
                            <View style={{
                                borderBottomWidth: 1,
                                borderColor: 'lightgray',
                                flexDirection: 'row',
                                gap: 20,
                                paddingHorizontal: 30
                            }}>
                                <AccountsBottomSheet styles={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flex: 0.4,
                                    paddingVertical: 10
                                }}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                        <Text style={{fontSize: 16}}>{selectedAccount.icon}</Text>
                                        <Text style={{fontSize: 16}}>{textShortener(selectedAccount.title)}</Text>
                                    </View>
                                    <AntDesign name="arrowright" size={24} color="gray"/>
                                </AccountsBottomSheet>
                                <CategoriesBottomSheet styles={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flex: 0.4,
                                    paddingVertical: 10
                                }}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                        <Text style={{fontSize: 16}}>{selectedCategory.icon}</Text>
                                        <Text style={{fontSize: 16}}>{textShortener(selectedCategory.title)}</Text>
                                    </View>
                                </CategoriesBottomSheet>
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
                           <TransactionKeyboard />
                        </View>
                    </View>
                </View>
            </BottomSheetModalProvider>
            {/*TODO add locales*/}
            <DatePicker
                modal
                mode="date"
                open={showCalendar}
                date={new Date(currentTransaction.date)}
                maximumDate={new Date()}
                onConfirm={(date) => {
                    date.setHours(0);
                    setShowCalendar(false)
                    dispatch(onChangeDate(date.toISOString()))
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

    backdrop: {
        position: 'absolute',
        zIndex: 10,
        backgroundColor: 'black',
        opacity: 0.2,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
    }
})

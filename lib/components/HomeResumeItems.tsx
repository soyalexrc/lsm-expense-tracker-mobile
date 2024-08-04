import {ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View} from "react-native";
import * as ContextMenu from 'zeego/context-menu'
import {useRouter} from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {useAppDispatch, useAppSelector} from "@/lib/store/hooks";
import {
    addTransactionInHomeList,
    removeTransactionFromHomeList,
    selectHomeViewTypeFilter,
    selectTransactionsGroupedByDate,
    updateCurrentTransaction, updateTransactionsGroupedByDate
} from "@/lib/store/features/transactions/transactionsSlice";
import {FullTransaction, Transaction} from "@/lib/types/Transaction";
import {format, formatDistanceToNow, isToday, isYesterday, isSameWeek, isSameMonth} from "date-fns";
import {fromZonedTime} from 'date-fns-tz';
import {selectCategory} from "@/lib/store/features/categories/categoriesSlice";
import {selectAccountForm, selectSelectedAccountGlobal} from "@/lib/store/features/accounts/accountsSlice";
import {formatDateHomeItemGroups, getCurrentMonth, getCurrentWeek} from "@/lib/helpers/date";
import {
    createTransaction,
    deleteTransaction,
    getTransactionsGroupedAndFiltered,
    stopRecurringInTransaction
} from "@/lib/db";
import {useSQLiteContext} from "expo-sqlite";
import {useState} from "react";
import {useTheme} from "@react-navigation/native";

export default function HomeResumeItems() {
    const db = useSQLiteContext();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const colors = useTheme().colors;
    const transactions = useAppSelector(selectTransactionsGroupedByDate);
    const filterType = useAppSelector(selectHomeViewTypeFilter)
    const selectedAccount = useAppSelector(selectSelectedAccountGlobal);

    function handlePress(t: FullTransaction) {
        dispatch(updateCurrentTransaction({
            ...t,
            account_id: t.account.id,
            category_id: t.category.id
        }));
        dispatch(selectCategory(t.category));
        dispatch(selectAccountForm(t.account));
        router.push('/transactionCreateUpdate')
    }

    function handleDeleteItem(id: number, groupId: number) {
        Alert.alert('Delete entry?', 'This action cannot be undone.', [
            {style: 'default', text: 'Cancel', isPreferred: true},
            {
                style: 'destructive', text: 'Delete', isPreferred: true, onPress: async () => {
                    dispatch(removeTransactionFromHomeList({transactionId: id, groupId}));
                    await deleteTransaction(db, id)
                }
            },
        ])
    }

    async function duplicateTransaction(transaction: FullTransaction) {
        const newTransaction = await createTransaction(db, { ...transaction, category_id: transaction.category.id, account_id: transaction.account.id })
        if (newTransaction) {
            dispatch(addTransactionInHomeList(newTransaction as FullTransaction))
        }
    }

    async function stopRecurrent(transactionId: number) {
        const {start, end} = filterType.date === 'week' ? getCurrentWeek() : getCurrentMonth()
        const updatedTransaction = await stopRecurringInTransaction(db, transactionId)
        if (updatedTransaction) {
            const transactions = await getTransactionsGroupedAndFiltered(db, start.toISOString(), end.toISOString(), filterType.type, selectedAccount.id);
            dispatch(updateTransactionsGroupedByDate(transactions));
        }
    }

    return (
        <>
            {transactions?.map(group => (
                <View key={group.id}>
                    <View style={styles.container}>
                        <View style={{width: 30}}/>
                        <View style={[styles.imageWithLabel, {marginVertical: 12}]}>
                            <Text style={{color: 'gray', fontSize: 14}}>{formatDateHomeItemGroups(group.date)}</Text>
                            <Text style={{color: 'gray', fontSize: 14}}>S/ {group.total}</Text>
                        </View>
                    </View>
                    {group.items?.map((item) => (
                        <ContextMenu.Root key={item.id}>
                            <ContextMenu.Trigger>
                                <Pressable style={[styles.container, {backgroundColor: colors.background}]}
                                           onPress={() => handlePress(item)}>
                                    <Text style={{fontSize: 30}}>{item.category.icon}</Text>
                                    <View style={styles.imageWithLabel}>
                                        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                                            {
                                                item.recurrentDate !== 'none' &&
                                                <FontAwesome6 name="arrow-rotate-left" size={16} color="gray"/>
                                            }
                                            <Text style={[styles.label, { color: colors.text }]}>{item.category.title}</Text>
                                        </View>
                                        <Text style={{ color: colors.text }}>S/ {item.amount}</Text>
                                    </View>
                                </Pressable>
                            </ContextMenu.Trigger>
                            <ContextMenu.Content loop={false} alignOffset={0} collisionPadding={0}
                                                 avoidCollisions={true}>
                                {
                                    item.recurrentDate !== 'none' &&
                                    <ContextMenu.Item onSelect={() => stopRecurrent(item.id)} key='recurring'>
                                        <ContextMenu.ItemTitle>Stop Recurring</ContextMenu.ItemTitle>
                                        <ContextMenu.ItemIcon
                                            ios={{
                                                name: 'xmark'
                                            }}
                                        />
                                    </ContextMenu.Item>
                                }
                                <ContextMenu.Item key='duplicate' onSelect={() => duplicateTransaction(item)}>
                                    <ContextMenu.ItemTitle>Duplicate</ContextMenu.ItemTitle>
                                    <ContextMenu.ItemIcon
                                        ios={{
                                            name: 'doc.on.doc'
                                        }}
                                    />
                                </ContextMenu.Item>
                                <ContextMenu.Item key='delete' onSelect={() => handleDeleteItem(item.id, group.id)} destructive>
                                    <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
                                    <ContextMenu.ItemIcon
                                        ios={{
                                            name: 'trash'
                                        }}
                                    />
                                </ContextMenu.Item>
                            </ContextMenu.Content>
                        </ContextMenu.Root>
                    ))}
                </View>

            ))}
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageWithLabel: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingVertical: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
    }
})

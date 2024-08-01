import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import * as ContextMenu from 'zeego/context-menu'
import {useRouter} from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import {useAppDispatch, useAppSelector} from "@/lib/store/hooks";
import {
    selectTransactionsGroupedByDate,
    updateCurrentTransaction
} from "@/lib/store/features/transactions/transactionsSlice";
import {FullTransaction} from "@/lib/types/Transaction";
import {format, formatDistanceToNow, isToday, isYesterday, isSameWeek, isSameMonth} from "date-fns";
import { fromZonedTime } from 'date-fns-tz';
import {selectCategory} from "@/lib/store/features/categories/categoriesSlice";
import {selectAccountForm} from "@/lib/store/features/accounts/accountsSlice";

export default function HomeResumeItems() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const transactions = useAppSelector(selectTransactionsGroupedByDate);

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

    const formatDate = (date: string) => {
        const now = new Date();
        const localDate = fromZonedTime(date, Intl.DateTimeFormat().resolvedOptions().timeZone);
        if (isToday(localDate)) {
            return 'Today';
        } else if (isYesterday(localDate)) {
            return 'Yesterday';
        } else if (isSameWeek(localDate, now)) {
            return format(localDate, 'EEEE'); // e.g., Monday, Tuesday
        } else {
            // For dates beyond a week, use formatDistanceToNow
            return formatDistanceToNow(date, { addSuffix: true });
        }
    };

    return (
        <>
            {transactions?.map(group => (
                <View key={group.id}>
                    <View style={styles.container}>
                        <View style={{width: 20}}/>
                        <View style={[styles.imageWithLabel, {margin: 12}]}>
                            <Text style={{color: 'gray', fontSize: 14}}>{formatDate(group.date)}</Text>
                            <Text style={{color: 'gray', fontSize: 14}}>S/ {group.total}</Text>
                        </View>
                    </View>
                    {group.items?.map((item) => (
                        <ContextMenu.Root key={item.id}>
                            <ContextMenu.Trigger>
                                <Pressable style={[styles.container, { backgroundColor: 'white' }]} onPress={() => handlePress(item)}>
                                    <Text style={{ fontSize: 30 }}>{item.category.icon}</Text>
                                    <View style={styles.imageWithLabel}>
                                       <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                           {
                                               item.recurrentDate !== 'none' &&
                                               <FontAwesome6 name="arrow-rotate-left" size={16} color="gray" />
                                           }
                                           <Text style={styles.label}>{item.category.title}</Text>
                                       </View>
                                        <Text>S/ {item.amount}</Text>
                                    </View>
                                </Pressable>
                            </ContextMenu.Trigger>
                            <ContextMenu.Content loop={false} alignOffset={0} collisionPadding={0}
                                                 avoidCollisions={true}>
                                {
                                    item.recurrentDate !== 'none' &&
                                    <ContextMenu.Item key='recurring'>
                                        <ContextMenu.ItemTitle>Stop Recurring</ContextMenu.ItemTitle>
                                        <ContextMenu.ItemIcon
                                            ios={{
                                                name: 'xmark'
                                            }}
                                        />
                                    </ContextMenu.Item>
                                }
                                <ContextMenu.Item key='duplicate'>
                                    <ContextMenu.ItemTitle>Duplicate</ContextMenu.ItemTitle>
                                    <ContextMenu.ItemIcon
                                        ios={{
                                            name: 'doc.on.doc'
                                        }}
                                    />
                                </ContextMenu.Item>
                                <ContextMenu.Item key='delete' destructive>
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
        borderColor: 'lightgray',
        paddingVertical: 15,
    },
    label: {
        fontSize: 18,
        fontWeight: '500',
    }
})

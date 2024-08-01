import * as DropdownMenu from "zeego/dropdown-menu";
import {StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/store/hooks";
import {
    selectHomeViewTypeFilter, selectTransactionsGroupedByDate,
    updateHomeViewTypeFilter,
    updateTransactionsGroupedByDate
} from "@/lib/store/features/transactions/transactionsSlice";
import {getCurrentMonth, getCurrentWeek} from "@/lib/helpers/date";
import { getTransactionsGroupedAndFiltered} from "@/lib/db";
import {useSQLiteContext} from "expo-sqlite";
import {formatByThousands} from "@/lib/helpers/string";
import {groups} from "@/lib/utils/data/transaction";

export default function ResumeDropDown() {
    const db = useSQLiteContext();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch();
    const filterType = useAppSelector(selectHomeViewTypeFilter)
    const transactionsInView = useAppSelector(selectTransactionsGroupedByDate);

    async function handleSelectOption(type: 'Spent' | 'Revenue' | 'Balance', date: 'week' | 'month' | 'none') {
        const {start, end} =  date === 'week' ? getCurrentWeek() : getCurrentMonth();
        dispatch(updateHomeViewTypeFilter({ type, date }))
        const transactions = await getTransactionsGroupedAndFiltered(db, start.toISOString(), end.toISOString(), type);
        dispatch(updateTransactionsGroupedByDate(transactions));
    }

    function calculateTotal(): { amount: string, decimals: string } {
        const total = transactionsInView.reduce((acc, cur) => acc + cur.total, 0);
        return {
            decimals: String(total).split('.')[1],
            amount: String(total).split('.')[0],
        }
    }

    function formatTitleOption(key: string, type: string): string {
        return key + ' this ' + type
    }

    return (
        <View style={styles.container}>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={[styles.fs18, isMenuOpen && styles.opacityMedium]}>{ filterType.type === 'Balance' ? 'Current balance' : `${filterType.type} this ${filterType.date}` }</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[styles.fs32, isMenuOpen && styles.opacityMedium]}>S/ </Text>
                            <Text style={[styles.fw64, styles.fwBold, isMenuOpen && styles.opacityMedium]}>{formatByThousands(calculateTotal().amount)}</Text>
                            <Text style={[styles.fs32, styles.fwBold, isMenuOpen && styles.opacityMedium]}>.{calculateTotal().decimals}</Text>
                        </View>
                    </View>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content loop={false} side='bottom' sideOffset={0} align='center' alignOffset={0} collisionPadding={0} avoidCollisions={true}>
                    {
                        groups.map(group => (
                            <DropdownMenu.Group key={group.key}>
                                {
                                    group.items.map(item => (
                                        <DropdownMenu.CheckboxItem key={item.key}
                                                                   value={(filterType.type === group.key && filterType.date === item.type) ? 'on' : 'off'}
                                                                   onValueChange={() => handleSelectOption(group.key, item.type)}>
                                            <DropdownMenu.ItemTitle>{formatTitleOption(group.key, item.type)}</DropdownMenu.ItemTitle>
                                            <DropdownMenu.ItemIndicator/>
                                        </DropdownMenu.CheckboxItem>
                                    ))
                                }
                            </DropdownMenu.Group>
                        ))
                    }
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fs32: {
        fontSize: 32
    },
    fwBold: {
        fontWeight: 'bold'
    },
    fs18: {
        fontSize: 18
    },
    fw64: {
        fontSize: 64
    },
    fw18: {
        fontSize: 18
    },
    opacityMedium: {
        opacity: 0.5
    }
})

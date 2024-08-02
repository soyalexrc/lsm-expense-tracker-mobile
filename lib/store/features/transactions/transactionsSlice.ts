import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/lib/store";
import {FullTransaction, HomeViewTypeFilter, Transaction, TransactionsGroupedByDate} from "@/lib/types/Transaction";
import {index} from "@zxing/text-encoding/es2015/encoding/indexes";

export interface TransactionsState {
    currentTransaction: Transaction;
    transactionsGroupedByDate: TransactionsGroupedByDate[];
    homeViewTypeFilter: HomeViewTypeFilter
}

const initialState: TransactionsState = {
    currentTransaction: {
        account_id: -1,
        amount: "0",
        category_id: -1,
        date: new Date().toISOString(),
        notes: '',
        recurrentDate: 'none',
        id: -1
    },
    transactionsGroupedByDate: [],
    homeViewTypeFilter: {
        type: 'Spent',
        date: 'week'
    }
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        onChangeNotes: (state, action: PayloadAction<string>) => {
            console.log(action.payload);
        },
        onChangeDate: (state, action: PayloadAction<string>) => {
            state.currentTransaction.date = action.payload
        },
        onChangeAmount: (state, action: PayloadAction<string>) => {
            state.currentTransaction.amount = action.payload;
        },
        onRecurrentSettingChange: (state, action: PayloadAction<string>) => {
            state.currentTransaction.recurrentDate = action.payload;
        },
        updateTransactionsGroupedByDate: (state, action: PayloadAction<TransactionsGroupedByDate[]>) => {
            state.transactionsGroupedByDate = action.payload;
        },
        updateCurrentTransaction: (state, action: PayloadAction<Transaction>) => {
            state.currentTransaction = action.payload
        },
        resetCurrentTransaction: (state) => {
            state.currentTransaction = {
                account_id: -1,
                amount: "0",
                category_id: -1,
                date: new Date().toISOString(),
                notes: '',
                recurrentDate: 'none',
                id: -1
            }
        },
        updateHomeViewTypeFilter: (state, action: PayloadAction<HomeViewTypeFilter>) => {
            state.homeViewTypeFilter = action.payload;
        },
        removeTransactionFromHomeList: (state, action: PayloadAction<{ transactionId: number, groupId: number }>) => {
            const indexGroup = state.transactionsGroupedByDate.findIndex(g => g.id === action.payload.groupId);
            for (const item of state.transactionsGroupedByDate[indexGroup].items) {
                if (item.id === action.payload.transactionId) {
                    const indexItem = state.transactionsGroupedByDate[indexGroup].items.indexOf(item);

                    const totalAmountInGroup = state.transactionsGroupedByDate[indexGroup].total;
                    const amountOfItem = Number(state.transactionsGroupedByDate[indexGroup].items[indexItem].amount);
                    state.transactionsGroupedByDate[indexGroup].total = totalAmountInGroup - amountOfItem;

                    state.transactionsGroupedByDate[indexGroup].items.splice(indexItem, 1);
                    if (state.transactionsGroupedByDate[indexGroup].items.length < 1) {
                        state.transactionsGroupedByDate.splice(indexGroup, 1);
                    }
                }
            }
        },
        addTransactionInHomeList: (state, action: PayloadAction<FullTransaction>) => {
            const indexGroup = state.transactionsGroupedByDate.findIndex(g => g.date === action.payload.date);
            state.transactionsGroupedByDate[indexGroup].items.push(action.payload)
            const totalAmountInGroup = state.transactionsGroupedByDate[indexGroup].total;
            state.transactionsGroupedByDate[indexGroup].total = totalAmountInGroup + Number(action.payload.amount);
        }
    }
});

export const {
    onChangeNotes,
    updateCurrentTransaction,
    updateTransactionsGroupedByDate,
    onRecurrentSettingChange,
    onChangeAmount,
    updateHomeViewTypeFilter,
    onChangeDate,
    resetCurrentTransaction,
    removeTransactionFromHomeList,
    addTransactionInHomeList
} = transactionsSlice.actions;

export const selectCurrentTransaction = (state: RootState) => state.transactions.currentTransaction
export const selectTransactionsGroupedByDate = (state: RootState) => state.transactions.transactionsGroupedByDate
export const selectHomeViewTypeFilter = (state: RootState) => state.transactions.homeViewTypeFilter

export default transactionsSlice.reducer;

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/lib/store";
import {FullTransaction, HomeViewTypeFilter, Transaction, TransactionsGroupedByDate} from "@/lib/types/Transaction";

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
            console.log(action.payload);
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
            console.log('change', action.payload);
            state.homeViewTypeFilter = action.payload;
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
    resetCurrentTransaction
} = transactionsSlice.actions;

export const selectCurrentTransaction = (state: RootState) => state.transactions.currentTransaction
export const selectTransactionsGroupedByDate = (state: RootState) => state.transactions.transactionsGroupedByDate
export const selectHomeViewTypeFilter = (state: RootState) => state.transactions.homeViewTypeFilter

export default transactionsSlice.reducer;

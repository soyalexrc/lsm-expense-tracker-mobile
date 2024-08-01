import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/lib/store";
import {formatAmountToNumber} from "@/lib/helpers/string";

export interface TransactionsState {
    currentTransaction: Transaction;
}

export type Transaction = {
    id: number;
    recurrentDate: string;
    date: string;
    amount: string;
    notes: string;
    account_id: number;
    category_id: number;
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
        }
    }
});

export const {onChangeNotes, onRecurrentSettingChange, onChangeAmount, onChangeDate} = transactionsSlice.actions;

export const selectCurrentTransaction = (state: RootState) => state.transactions.currentTransaction

export default transactionsSlice.reducer;

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/lib/store";

export interface AccountsState {
    list: Account[];
    selectedForm: Account;
}

export type Account = {
    title: string;
    icon: string;
    id: number;
}


const initialState: AccountsState = {
    list: [],
    selectedForm: {
        id: 1,
        icon: '💵',
        title: 'Cash'
    }
}

export const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        updateAccountsList: (state, action: PayloadAction<Account[]>) => {
            state.list = action.payload;
        },
        selectAccountForm: (state, action: PayloadAction<Account>) => {
            state.selectedForm = action.payload;
        },
        addAccount: (state, action: PayloadAction<Account>) => {
            console.log(action.payload);
            state.list.push(action.payload);
        }
    }
});

export const { updateAccountsList, addAccount, selectAccountForm } = accountsSlice.actions;

export const selectAccounts = (state: RootState) => state.accounts.list
export const selectSelectedAccountForm = (state: RootState) => state.accounts.selectedForm

export default accountsSlice.reducer;

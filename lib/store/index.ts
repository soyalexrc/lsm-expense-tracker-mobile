import {configureStore} from "@reduxjs/toolkit";
import transactionsListReducer from './features/transactions/transactionsListsSlice'
import networkReducer from './features/network/networkSlice'

export const store = configureStore({
    reducer: {
        transactionsLists: transactionsListReducer,
        network: networkReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

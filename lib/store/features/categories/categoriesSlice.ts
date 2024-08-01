import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@/lib/store";

export interface CategoriesState {
    list: Category[];
    selected: Category;
}

export type Category = {
    title: string;
    icon: string;
    type: string;
    id: number;
}


const initialState: CategoriesState = {
    list: [],
    selected: {
        icon: '🥑',
        title: 'Groceries',
        id: 1,
        type: 'expense'
    }
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        updateCategoriesList: (state, action: PayloadAction<Category[]>) => {
            state.list = action.payload;
        },
        selectCategory: (state, action: PayloadAction<Category>) => {
            state.selected = action.payload;
        },
    }
});

export const { updateCategoriesList, selectCategory } = categoriesSlice.actions;

export const selectCategories = (state: RootState) => state.categories.list
export const selectSelectedCategory = (state: RootState) => state.categories.selected

export default categoriesSlice.reducer;

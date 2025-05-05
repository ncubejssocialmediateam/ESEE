import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    articles: [],
    categories: [],
    navItems: [],
};

const stateSlice = createSlice({
    name: 'myApp',
    initialState,
    reducers: {
        setArticles: (state, { payload }) => {
            state.articles = payload;
        },
        setCategories: (state, { payload }) => {
            state.categories = payload;
        },
        setNavItems: (state, { payload }) => {
            state.navItems = payload;
        },
    },
});

export const {
    setArticles,
    setCategories,
    setNavItems
} = stateSlice.actions;

export default stateSlice.reducer;

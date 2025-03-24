import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    articles: [],
    navItems: [],
};

const stateSlice = createSlice({
    name: 'myApp',
    initialState,
    reducers: {
        setArticles: (state, { payload }) => {
            state.articles = payload;
        },
        setNavItems: (state, { payload }) => {
            state.navItems = payload;
        },
    },
});

export const {
    setArticles,
    setNavItems
} = stateSlice.actions;

export default stateSlice.reducer;

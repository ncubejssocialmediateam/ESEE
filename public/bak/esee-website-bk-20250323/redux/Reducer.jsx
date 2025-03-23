import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    articles: [],
};

const stateSlice = createSlice({
    name: 'myApp',
    initialState,
    reducers: {
        setArticles: (state, { payload }) => {
            state.articles = payload;
        },
    },
});

export const {
    setArticles
} = stateSlice.actions;

export default stateSlice.reducer;

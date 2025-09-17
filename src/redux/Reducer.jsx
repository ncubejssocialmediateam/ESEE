import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    articles: [],
    categories: [],
    navItems: [],
    portalStats: null,
    memberStats: null,
    taxStats: null,
    notifications: [],
    documents: [],
    analytics: null,
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
        setPortalStats: (state, { payload }) => {
            state.portalStats = payload;
        },
        setMemberStats: (state, { payload }) => {
            state.memberStats = payload;
        },
        setTaxStats: (state, { payload }) => {
            state.taxStats = payload;
        },
        setNotifications: (state, { payload }) => {
            state.notifications = payload;
        },
        setDocuments: (state, { payload }) => {
            state.documents = payload;
        },
        setAnalytics: (state, { payload }) => {
            state.analytics = payload;
        },
    },
});

export const {
    setArticles,
    setCategories,
    setNavItems,
    setPortalStats,
    setMemberStats,
    setTaxStats,
    setNotifications,
    setDocuments,
    setAnalytics
} = stateSlice.actions;

export default stateSlice.reducer;

// store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import rootReducer from './Reducer.jsx'; // Your root reducer combining your app reducers

// Create a storage instance that falls back to memory storage if quota is exceeded
const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== 'undefined' 
    ? createWebStorage('session') // Use sessionStorage instead of localStorage
    : createNoopStorage();

// Configuration object for redux-persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['navItems'], // Only persist navigation items
    throttle: 500, // Throttle storage operations
    serialize: true, // Enable serialization
    debug: process.env.NODE_ENV === 'development', // Enable debug mode in development
};

// Create a persisted reducer using the persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
export const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Create a persistor linked to the store
export const persistor = persistStore(store);

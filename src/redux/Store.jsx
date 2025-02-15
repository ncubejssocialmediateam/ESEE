// store.js
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import rootReducer from './Reducer.jsx'; // Your root reducer combining your app reducers

// Configuration object for redux-persist
const persistConfig = {
    key: 'root', // key for the persisted data in storage
    storage,     // storage method (localStorage in this case)
    // You can also whitelist or blacklist specific reducers here:
    // whitelist: ['reducerName'],
    // blacklist: ['anotherReducer']
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

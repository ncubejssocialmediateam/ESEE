import './index.css'
import App from './App.jsx'
import {PersistGate} from "redux-persist/integration/react";
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import { persistor, store } from './redux/Store';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>,
);

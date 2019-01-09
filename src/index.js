import React from 'react';
import { render } from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import RootReducer from './reducers/RootReducer';
import Root from './Root';
import './style/index.scss';

const persistConfig = {
    key: 'protocode-root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = createStore(persistedReducer, applyMiddleware(logger));
let persistor = persistStore(store);
render(
    <Root store={store} persistor={persistor} />,
    document.getElementById('root')
);

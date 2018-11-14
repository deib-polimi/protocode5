import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import RootReducer from './reducers/RootReducer';
import Root from './Root';
import logger from 'redux-logger';
import './style/index.scss';

const store = createStore(RootReducer, applyMiddleware(logger));
render(<Root store={store} />, document.getElementById('root'));

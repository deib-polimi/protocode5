import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';

const Root = ({ store, persistor }) => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <Route path="/" component={App} />
            </Router>
        </PersistGate>
    </Provider>
);

export default Root;
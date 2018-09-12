import React, {Component} from 'react';
import {RootStack} from '../components/RootStack';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import configureStore from '../stores/configureStore';

const {store, persistor} = configureStore();

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <RootStack/>
                </PersistGate>
            </Provider>
        );
    }
}
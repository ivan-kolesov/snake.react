import React, {Component} from 'react';
import {RootStack} from './components/RootStack';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import configureStore from './store';

import SplashScreen from 'react-native-splash-screen';

const {store, persistor} = configureStore();

export default class App extends Component {
    componentDidMount() {
        SplashScreen.hide();
    }

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
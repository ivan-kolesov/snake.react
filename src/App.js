import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef, isMountedRef } from './components/RootNavigation';
import RootStack from './components/RootStack';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
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
                    <NavigationContainer ref={navigationRef}>
                        <RootStack/>
                    </NavigationContainer>
                </PersistGate>
            </Provider>
        );
    }
}

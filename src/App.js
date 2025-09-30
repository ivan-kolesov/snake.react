import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './components/RootNavigation';
import RootStack from './components/RootStack';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';

const { store, persistor } = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer ref={navigationRef}>
            <RootStack />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

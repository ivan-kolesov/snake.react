import React, {useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import configureAppStore from './store';
import {navigationRef} from './navigation/RootNavigation';
import RootStack from './navigation/RootStack';
import {loadHighScore} from './persistence';
import {setHighScore} from '../game/model/actions';

const App: React.FC = () => {
  const store = useMemo(() => configureAppStore(), []);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    loadHighScore().then(value => {
      if (value > 0) {
        store.dispatch(setHighScore(value));
      }
      setHydrated(true);
    });
  }, [store]);

  if (!hydrated) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef}>
          <RootStack />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

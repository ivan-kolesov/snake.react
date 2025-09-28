import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './services/reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['game'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
      const base = getDefaultMiddleware({
        thunk: true,
        serializableCheck: false, // можно настроить ignoredActions, но для простоты отключим
        immutableCheck: false,
      });

      if (__DEV__) {
        const { createLogger } = require('redux-logger');
        return base.concat(createLogger({ collapsed: true }));
      }

      return base;
    },
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

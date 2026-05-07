import { configureStore } from '@reduxjs/toolkit';
import type { Action, ThunkDispatch } from '@reduxjs/toolkit';
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

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as never,
) as unknown as typeof rootReducer;

const configureAppStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: true,
        serializableCheck: false,
        immutableCheck: false,
      }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureAppStore;

type AppStore = ReturnType<typeof configureAppStore>['store'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action> &
  AppStore['dispatch'];

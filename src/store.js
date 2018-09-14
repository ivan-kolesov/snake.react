import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {createLogger} from 'redux-logger';
import rootReducer from './services/reducer';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    whitelist: ['game']
};

const pReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const logger = createLogger();
    middlewares.push(logger);
}

export default () => {
    const store = createStore(
        pReducer,
        applyMiddleware(...middlewares)
    );
    const persistor = persistStore(store);
    return {store, persistor};
}
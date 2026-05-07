import {combineReducers, configureStore} from '@reduxjs/toolkit';
import type {Action, ThunkDispatch} from '@reduxjs/toolkit';
import gameReducer from '../game/model/reducer';
import {saveHighScore} from './persistence';

const rootReducer = combineReducers({
  game: gameReducer,
});

const configureAppStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({thunk: true}),
  });

  let lastHighScore = store.getState().game.highScore;
  store.subscribe(() => {
    const next = store.getState().game.highScore;
    if (next !== lastHighScore) {
      lastHighScore = next;
      saveHighScore(next);
    }
  });

  return store;
};

export default configureAppStore;

type AppStore = ReturnType<typeof configureAppStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, Action> &
  AppStore['dispatch'];

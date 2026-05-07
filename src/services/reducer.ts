import { combineReducers } from 'redux';
import gameReducer from './game/reducer';

const rootReducer = combineReducers({
  game: gameReducer,
});

export default rootReducer;

import type {GameState} from './types';
import {DIRECTION_RIGHT} from '../lib/directions';
import {segmentRate} from '../lib/board';
import * as actions from './actions';
import type {GameAction} from './actions';

export const getInitialState = (): Omit<GameState, 'highScore'> => ({
  snake: [
    {id: 1, x: 2 * segmentRate, y: 0},
    {id: 2, x: segmentRate, y: 0},
    {id: 3, x: 0, y: 0},
  ],
  intervalRate: 5,
  direction: DIRECTION_RIGHT,
  directionPan: undefined,
  lastSegment: segmentRate,
  food: {x: 5 * segmentRate, y: 5 * segmentRate},
  score: 0,
});

const initialState: GameState = {
  highScore: 0,
  ...getInitialState(),
};

const gameReducer = (
  state: GameState = initialState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    case actions.SET_SCORE:
      return {...state, score: action.payload};
    case actions.SET_HIGH_SCORE:
      return {...state, highScore: action.payload};
    case actions.SET_SNAKE:
      return {...state, snake: action.payload};
    case actions.SET_FOOD:
      return {...state, food: action.payload};
    case actions.SET_DIRECTION:
      return {...state, direction: action.payload};
    case actions.SET_DIRECTION_PAN:
      return {...state, directionPan: action.payload};
    case actions.SET_INTERVAL_RATE:
      return {...state, intervalRate: action.payload};
    case actions.SET_INITIAL_STATE:
      return {...state, ...getInitialState()};
    default:
      return state;
  }
};

export default gameReducer;

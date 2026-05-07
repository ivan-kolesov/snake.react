import type { ThunkAction } from 'redux-thunk';
import type { Action } from 'redux';
import type { Coordinate, Direction, Snake } from '../../types';
import type { RootState } from '../../store';

export const SET_SCORE = 'SET_SCORE' as const;
export const SET_HIGH_SCORE = 'SET_HIGH_SCORE' as const;
export const SET_SNAKE = 'SET_SNAKE' as const;
export const SET_FOOD = 'SET_FOOD' as const;
export const SET_DIRECTION = 'SET_DIRECTION' as const;
export const SET_DIRECTION_PAN = 'SET_DIRECTION_PAN' as const;
export const SET_INTERVAL_RATE = 'SET_INTERVAL_RATE' as const;
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE' as const;
export const SET_TIMER_ID = 'SET_TIMER_ID' as const;

export const setScore = (score: number) => ({
  type: SET_SCORE,
  payload: score,
});

export const setHighScore = (highScore: number) => ({
  type: SET_HIGH_SCORE,
  payload: highScore,
});

export const setSnake = (snake: Snake) => ({
  type: SET_SNAKE,
  payload: snake,
});

export const setFood = (food: Coordinate) => ({
  type: SET_FOOD,
  payload: food,
});

export const setDirection = (direction: Direction) => ({
  type: SET_DIRECTION,
  payload: direction,
});

export const setDirectionPan = (direction: Direction | undefined) => ({
  type: SET_DIRECTION_PAN,
  payload: direction,
});

export const setIntervalRate = (rate: number) => ({
  type: SET_INTERVAL_RATE,
  payload: rate,
});

export const setTimerId = (
  timerId: ReturnType<typeof setTimeout> | undefined,
) => ({
  type: SET_TIMER_ID,
  payload: timerId,
});

export const setInitialState =
  (): ThunkAction<Promise<void>, RootState, unknown, Action> =>
  dispatch => {
    dispatch({ type: SET_INITIAL_STATE });
    return Promise.resolve();
  };

export type GameAction =
  | ReturnType<typeof setScore>
  | ReturnType<typeof setHighScore>
  | ReturnType<typeof setSnake>
  | ReturnType<typeof setFood>
  | ReturnType<typeof setDirection>
  | ReturnType<typeof setDirectionPan>
  | ReturnType<typeof setIntervalRate>
  | ReturnType<typeof setTimerId>
  | { type: typeof SET_INITIAL_STATE };

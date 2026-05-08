import type {RootState} from '../../app/store';

export const getScore = (store: RootState) => store.game.score;

export const getHighScore = (store: RootState) => store.game.highScore;

export const getSnake = (store: RootState) => store.game.snake;

export const getFood = (store: RootState) => store.game.food;

export const getIntervalRate = (store: RootState) => store.game.intervalRate;

export const getDirection = (store: RootState) => store.game.direction;

export const getDirectionPan = (store: RootState) => store.game.directionPan;

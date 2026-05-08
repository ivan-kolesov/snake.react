import type {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from '../lib/directions';

export type Direction =
  | typeof DIRECTION_RIGHT
  | typeof DIRECTION_LEFT
  | typeof DIRECTION_UP
  | typeof DIRECTION_DOWN;

export interface Coordinate {
  x: number;
  y: number;
}

export interface SnakeSegment extends Coordinate {
  id: number;
}

export type Snake = SnakeSegment[];

export interface GameState {
  snake: Snake;
  intervalRate: number;
  direction: Direction;
  directionPan: Direction | undefined;
  lastSegment: number;
  food: Coordinate;
  score: number;
  highScore: number;
}

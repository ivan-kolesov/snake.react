import {segmentRate} from './board';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from './directions';
import type {Coordinate, Direction, Snake} from '../model/types';

export const isKnotted = (snake: Snake): boolean => {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }
  return false;
};

export const hasNoLeftSpace = (
  snake: Snake,
  frameX: number,
  frameY: number,
): boolean => snake.length === (frameX + 1) * (frameY + 1);

export const makeFood = (
  snake: Snake,
  frameX: number,
  frameY: number,
): Coordinate => {
  const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const candidate: Coordinate = {
    x: getRandomInt(0, frameX) * segmentRate,
    y: getRandomInt(0, frameY) * segmentRate,
  };

  const collides = snake.some(
    segment => candidate.x === segment.x && candidate.y === segment.y,
  );
  return collides ? makeFood(snake, frameX, frameY) : candidate;
};

export const moveSnake = (
  sourceSnake: Snake,
  dir: Direction,
  food: Coordinate,
  frameX: number,
  frameY: number,
): {snake: Snake; ate: boolean} => {
  const result: Snake = sourceSnake.map(segment => ({...segment}));
  const maxX = frameX * segmentRate;
  const maxY = frameY * segmentRate;

  for (let i = 0; i < sourceSnake.length; i++) {
    if (i === 0) {
      if (dir === DIRECTION_RIGHT) {
        result[i].x += segmentRate;
        if (result[i].x > maxX) {
          result[i].x = 0;
        }
      } else if (dir === DIRECTION_LEFT) {
        result[i].x -= segmentRate;
        if (result[i].x < 0) {
          result[i].x = maxX;
        }
      } else if (dir === DIRECTION_DOWN) {
        result[i].y += segmentRate;
        if (result[i].y > maxY) {
          result[i].y = 0;
        }
      } else if (dir === DIRECTION_UP) {
        result[i].y -= segmentRate;
        if (result[i].y < 0) {
          result[i].y = maxY;
        }
      }
    } else {
      const lastSegment = sourceSnake[i - 1];
      result[i].x = lastSegment.x;
      result[i].y = lastSegment.y;
    }
  }

  const ate = food.x === result[0].x && food.y === result[0].y;
  return {snake: result, ate};
};

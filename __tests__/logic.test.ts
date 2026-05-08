import {
  hasNoLeftSpace,
  isKnotted,
  makeFood,
  moveSnake,
} from '../src/game/lib/logic';
import {segmentRate} from '../src/game/lib/board';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from '../src/game/lib/directions';
import type {Snake} from '../src/game/model/types';

const FRAME_X = 19; // 20 columns
const FRAME_Y = 35; // 36 rows
const MAX_X = FRAME_X * segmentRate;
const MAX_Y = FRAME_Y * segmentRate;

describe('isKnotted', () => {
  it('returns false for a straight snake', () => {
    const snake: Snake = [
      {id: 1, x: 40, y: 0},
      {id: 2, x: 20, y: 0},
      {id: 3, x: 0, y: 0},
    ];
    expect(isKnotted(snake)).toBe(false);
  });

  it('returns true when head overlaps any segment', () => {
    const snake: Snake = [
      {id: 1, x: 0, y: 0},
      {id: 2, x: 20, y: 0},
      {id: 3, x: 0, y: 0},
    ];
    expect(isKnotted(snake)).toBe(true);
  });
});

describe('hasNoLeftSpace', () => {
  it('returns true when board fully filled', () => {
    const total = (FRAME_X + 1) * (FRAME_Y + 1);
    const snake: Snake = Array.from({length: total}, (_, i) => ({
      id: i,
      x: 0,
      y: 0,
    }));
    expect(hasNoLeftSpace(snake, FRAME_X, FRAME_Y)).toBe(true);
  });

  it('returns false otherwise', () => {
    const snake: Snake = [{id: 1, x: 0, y: 0}];
    expect(hasNoLeftSpace(snake, FRAME_X, FRAME_Y)).toBe(false);
  });
});

describe('makeFood', () => {
  it('produces coordinates aligned to segmentRate', () => {
    const food = makeFood([], FRAME_X, FRAME_Y);
    expect(food.x % segmentRate).toBe(0);
    expect(food.y % segmentRate).toBe(0);
  });

  it('does not collide with snake segments', () => {
    const snake: Snake = Array.from({length: 5}, (_, i) => ({
      id: i,
      x: i * segmentRate,
      y: 0,
    }));
    const food = makeFood(snake, FRAME_X, FRAME_Y);
    const collides = snake.some(s => s.x === food.x && s.y === food.y);
    expect(collides).toBe(false);
  });

  it('stays within board bounds', () => {
    const food = makeFood([], FRAME_X, FRAME_Y);
    expect(food.x).toBeGreaterThanOrEqual(0);
    expect(food.y).toBeGreaterThanOrEqual(0);
    expect(food.x).toBeLessThanOrEqual(MAX_X);
    expect(food.y).toBeLessThanOrEqual(MAX_Y);
  });
});

describe('moveSnake', () => {
  const snake: Snake = [
    {id: 1, x: 40, y: 40},
    {id: 2, x: 20, y: 40},
    {id: 3, x: 0, y: 40},
  ];
  const food = {x: 100, y: 100};

  it('shifts head right by one segment', () => {
    const {snake: next, ate} = moveSnake(
      snake,
      DIRECTION_RIGHT,
      food,
      FRAME_X,
      FRAME_Y,
    );
    expect(next[0]).toEqual({id: 1, x: 60, y: 40});
    expect(ate).toBe(false);
  });

  it('shifts head left by one segment', () => {
    const {snake: next} = moveSnake(
      snake,
      DIRECTION_LEFT,
      food,
      FRAME_X,
      FRAME_Y,
    );
    expect(next[0]).toEqual({id: 1, x: 20, y: 40});
  });

  it('shifts head down by one segment', () => {
    const {snake: next} = moveSnake(
      snake,
      DIRECTION_DOWN,
      food,
      FRAME_X,
      FRAME_Y,
    );
    expect(next[0]).toEqual({id: 1, x: 40, y: 60});
  });

  it('shifts head up by one segment', () => {
    const {snake: next} = moveSnake(
      snake,
      DIRECTION_UP,
      food,
      FRAME_X,
      FRAME_Y,
    );
    expect(next[0]).toEqual({id: 1, x: 40, y: 20});
  });

  it('drags tail behind head', () => {
    const {snake: next} = moveSnake(
      snake,
      DIRECTION_RIGHT,
      food,
      FRAME_X,
      FRAME_Y,
    );
    expect(next[1]).toMatchObject({x: 40, y: 40});
    expect(next[2]).toMatchObject({x: 20, y: 40});
  });

  it('reports ate=true when head lands on food', () => {
    const close: Snake = [
      {id: 1, x: 80, y: 100},
      {id: 2, x: 60, y: 100},
    ];
    const {ate} = moveSnake(
      close,
      DIRECTION_RIGHT,
      {x: 100, y: 100},
      FRAME_X,
      FRAME_Y,
    );
    expect(ate).toBe(true);
  });

  it('wraps around right edge', () => {
    const atEdge: Snake = [{id: 1, x: MAX_X, y: 0}];
    const {snake: next} = moveSnake(
      atEdge,
      DIRECTION_RIGHT,
      food,
      FRAME_X,
      FRAME_Y,
    );
    expect(next[0].x).toBe(0);
  });

  it('wraps around left edge', () => {
    const atEdge: Snake = [{id: 1, x: 0, y: 0}];
    const {snake: next} = moveSnake(
      atEdge,
      DIRECTION_LEFT,
      food,
      FRAME_X,
      FRAME_Y,
    );
    expect(next[0].x).toBe(MAX_X);
  });

  it('does not mutate source snake', () => {
    const before = JSON.stringify(snake);
    moveSnake(snake, DIRECTION_RIGHT, food, FRAME_X, FRAME_Y);
    expect(JSON.stringify(snake)).toBe(before);
  });
});

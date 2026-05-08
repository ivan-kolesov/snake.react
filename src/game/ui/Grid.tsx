import React, {useMemo} from 'react';
import {View} from 'react-native';
import {segmentRate} from '../lib/board';
import Cell from './Cell';
import type {SnakeSegment} from '../model/types';

interface GridProps {
  frameX: number;
  frameY: number;
}

const generateGrid = (frameX: number, frameY: number): SnakeSegment[] => {
  const cells: SnakeSegment[] = [];
  let counter = 0;
  for (let i = 0; i <= frameX; i++) {
    for (let j = 0; j <= frameY; j++) {
      cells.push({
        id: counter++,
        x: i * segmentRate,
        y: j * segmentRate,
      });
    }
  }
  return cells;
};

const Grid: React.FC<GridProps> = ({frameX, frameY}) => {
  const cells = useMemo(() => generateGrid(frameX, frameY), [frameX, frameY]);
  return (
    <View>
      {cells.map(cell => (
        <Cell key={cell.id} x={cell.x} y={cell.y} />
      ))}
    </View>
  );
};

export default React.memo(Grid);

import React, { useMemo } from 'react';
import { View } from 'react-native';
import * as boardConstants from '../../scenes/Game/board';
import Cell from '../../scenes/Game/components/Cell';
import type { SnakeSegment } from '../../types';

const generateGrid = (): SnakeSegment[] => {
  const cells: SnakeSegment[] = [];
  let counter = 0;
  for (let i = 0; i <= boardConstants.frameX; i++) {
    for (let j = 0; j <= boardConstants.frameY; j++) {
      cells.push({
        id: counter++,
        x: i * boardConstants.segmentRate,
        y: j * boardConstants.segmentRate,
      });
    }
  }
  return cells;
};

const Grid: React.FC = () => {
  const cells = useMemo(generateGrid, []);
  return (
    <View>
      {cells.map(cell => (
        <Cell key={cell.id} x={cell.x} y={cell.y} />
      ))}
    </View>
  );
};

export default React.memo(Grid);

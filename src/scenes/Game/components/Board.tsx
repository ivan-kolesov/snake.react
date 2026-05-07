import React, { useMemo, useRef, useState } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import SharedStyle from '../../../components/SharedStyles';
import Grid from '../../../components/Grid';
import Segment from './Segment';
import Food from './Food';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from '../directions';
import type { Coordinate, Direction, Snake } from '../../../types';

interface BoardProps {
  snake: Snake;
  food: Coordinate;
  direction: Direction;
  directionPan: Direction | undefined;
  setDirection: (direction: Direction) => void;
  setDirectionPan: (direction: Direction | undefined) => void;
}

const styles = StyleSheet.create({
  boardStyle: {
    width: SharedStyle.board.width,
    height: SharedStyle.board.height,
    backgroundColor: SharedStyle.color.primary,
  },
});

const Board: React.FC<BoardProps> = ({
  snake,
  food,
  direction,
  directionPan,
  setDirection,
  setDirectionPan,
}) => {
  const [allowChangeDirection, setAllowChangeDirection] = useState(true);
  const allowChangeDirectionRef = useRef(allowChangeDirection);
  allowChangeDirectionRef.current = allowChangeDirection;
  const directionRef = useRef(direction);
  directionRef.current = direction;
  const directionPanRef = useRef(directionPan);
  directionPanRef.current = directionPan;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponderCapture: () => true,
        onPanResponderMove: (_e, { vx, vy }) => {
          if (!allowChangeDirectionRef.current) {
            return false;
          }
          if (vx === 0 && vy === 0) {
            return false;
          }
          if (directionPanRef.current !== undefined) {
            return false;
          }

          const absVx = Math.abs(vx);
          const absVy = Math.abs(vy);
          const velocityThreshold = 0.2;
          const currentDirection = directionRef.current;

          const horizontal: Direction[] = [DIRECTION_RIGHT, DIRECTION_LEFT];
          const vertical: Direction[] = [DIRECTION_DOWN, DIRECTION_UP];
          let changedDirection: Direction | undefined;
          if (absVx > absVy) {
            if (
              !horizontal.includes(currentDirection) &&
              absVx > velocityThreshold
            ) {
              changedDirection = vx > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT;
            }
          } else if (
            !vertical.includes(currentDirection) &&
            absVy > velocityThreshold
          ) {
            changedDirection = vy > 0 ? DIRECTION_DOWN : DIRECTION_UP;
          }

          if (changedDirection === undefined) {
            return false;
          }

          setAllowChangeDirection(false);
          setDirectionPan(changedDirection);
          setDirection(changedDirection);
          return true;
        },
        onPanResponderRelease: () => {
          setAllowChangeDirection(true);
        },
      }),
    [setDirection, setDirectionPan],
  );

  return (
    <View style={styles.boardStyle} {...panResponder.panHandlers}>
      <Grid />
      {snake.map(segment => (
        <Segment key={segment.id} x={segment.x} y={segment.y} />
      ))}
      <Food x={food.x} y={food.y} />
    </View>
  );
};

export default Board;

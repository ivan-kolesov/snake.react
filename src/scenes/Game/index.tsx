import React, { useCallback, useEffect, useRef } from 'react';
import {
  Alert,
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NavigationProp } from '@react-navigation/native';
import _ from 'lodash';
import Board from './components/Board';
import * as boardConstants from './board';
import ScoreText from '../../components/ScoreText';
import AndroidBackButton from '../../components/AndroidBackButton';
import SharedStyle from '../../components/SharedStyles';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getDirection,
  getDirectionPan,
  getFood,
  getHighScore,
  getIntervalRate,
  getScore,
  getSnake,
  getTimerId,
} from '../../services/game/selectors';
import {
  setDirection,
  setDirectionPan,
  setFood,
  setHighScore,
  setInitialState,
  setIntervalRate,
  setScore,
  setSnake,
  setTimerId,
} from '../../services/game/actions';
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from './directions';
import type { Coordinate, Direction, Snake, RootStackParamList } from '../../types';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SharedStyle.color.primary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#30346D',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    width,
    marginBottom: 5,
    height: SharedStyle.scoreBoard.height,
    backgroundColor: SharedStyle.color.primary,
  },
});

interface GameScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Game'>;
}

const isKnotted = (snake: Snake): boolean => {
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      return true;
    }
  }
  return false;
};

const hasNoLeftSpace = (snake: Snake): boolean =>
  snake.length === (boardConstants.frameY + 1) * (boardConstants.frameY + 1);

const makeFood = (snake: Snake): Coordinate => {
  const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const candidate: Coordinate = {
    x: getRandomInt(0, boardConstants.frameX) * boardConstants.segmentRate,
    y: getRandomInt(0, boardConstants.frameY) * boardConstants.segmentRate,
  };

  const collides = _.some(snake, segment =>
    _.isEqual(candidate, { x: segment.x, y: segment.y }),
  );
  return collides ? makeFood(snake) : candidate;
};

const ScoreBoardContainer: React.FC<{ score: number; highScore: number }> = ({
  score,
  highScore,
}) => (
  <View style={styles.scoreBoard}>
    <ScoreText label="Score" score={score} />
    <ScoreText label="High score" score={highScore} />
  </View>
);

const GameScreen: React.FC<GameScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const timerID = useAppSelector(getTimerId);
  const score = useAppSelector(getScore);
  const highScore = useAppSelector(getHighScore);
  const snake = useAppSelector(getSnake);
  const food = useAppSelector(getFood);
  const intervalRate = useAppSelector(getIntervalRate);
  const direction = useAppSelector(getDirection);
  const directionPan = useAppSelector(getDirectionPan);

  const snakeRef = useRef(snake);
  snakeRef.current = snake;
  const foodRef = useRef(food);
  foodRef.current = food;
  const directionRef = useRef(direction);
  directionRef.current = direction;
  const intervalRateRef = useRef(intervalRate);
  intervalRateRef.current = intervalRate;
  const scoreRef = useRef(score);
  scoreRef.current = score;
  const highScoreRef = useRef(highScore);
  highScoreRef.current = highScore;
  const timerRef = useRef(timerID);
  timerRef.current = timerID;

  const tickRef = useRef<() => void>(() => undefined);

  const handleClearTimeout = useCallback(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
    }
    dispatch(setTimerId(undefined));
  }, [dispatch]);

  const handleGameOver = useCallback(() => {
    if (scoreRef.current > highScoreRef.current) {
      dispatch(setHighScore(scoreRef.current));
    }
    handleClearTimeout();
    navigation.navigate('GameOver');
  }, [dispatch, handleClearTimeout, navigation]);

  const eatFood = useCallback(
    (currentSnake: Snake): Snake => {
      const changedScore = scoreRef.current + 1;
      dispatch(setScore(changedScore));

      const tail = currentSnake[currentSnake.length - 1];
      currentSnake.push({ id: tail.id + 1, x: tail.x, y: tail.y });

      if (hasNoLeftSpace(currentSnake)) {
        return currentSnake;
      }

      if (changedScore % 3 === 0) {
        dispatch(setIntervalRate(intervalRateRef.current + 1));
      }

      dispatch(setFood(makeFood(currentSnake)));
      return currentSnake;
    },
    [dispatch],
  );

  const bumpFood = useCallback(
    (currentSnake: Snake): Snake => {
      if (
        _.isEqual(foodRef.current, {
          x: currentSnake[0].x,
          y: currentSnake[0].y,
        })
      ) {
        return eatFood(currentSnake);
      }
      return currentSnake;
    },
    [eatFood],
  );

  const move = useCallback(
    (sourceSnake: Snake, dir: Direction): Snake => {
      let result = _.cloneDeep(sourceSnake);

      for (let i = 0; i < sourceSnake.length; i++) {
        if (i === 0) {
          if (dir === DIRECTION_RIGHT) {
            if (
              result[i].x + boardConstants.segmentRate >=
              boardConstants.boardWidth
            ) {
              result[i].x = 0;
            } else {
              result[i].x = result[i].x + boardConstants.segmentRate;
            }
            result = bumpFood(result);
          } else if (dir === DIRECTION_LEFT) {
            result[i].x = result[i].x - boardConstants.segmentRate;
            if (result[i].x < 0) {
              result[i].x =
                boardConstants.boardWidth - boardConstants.segmentRate;
            }
            result = bumpFood(result);
          } else if (dir === DIRECTION_DOWN) {
            result[i].y = result[i].y + boardConstants.segmentRate;
            if (result[i].y > boardConstants.boardHeight) {
              result[i].y = 0;
            }
            result = bumpFood(result);
          } else if (dir === DIRECTION_UP) {
            result[i].y = result[i].y - boardConstants.segmentRate;
            if (result[i].y < 0) {
              result[i].y = boardConstants.boardHeight;
            }
            result = bumpFood(result);
          }
        } else {
          const lastSegment = sourceSnake[i - 1];
          result[i].x = lastSegment.x;
          result[i].y = lastSegment.y;
        }
      }

      return result;
    },
    [bumpFood],
  );

  tickRef.current = () => {
    const newSnake = move(snakeRef.current, directionRef.current);
    dispatch(setSnake(newSnake));
    dispatch(setDirectionPan(undefined));

    if (isKnotted(newSnake)) {
      handleGameOver();
    } else if (hasNoLeftSpace(newSnake)) {
      Alert.alert('You win');
      handleGameOver();
    } else {
      const id = setTimeout(() => {
        requestAnimationFrame(() => tickRef.current());
      }, 1000 / intervalRateRef.current);
      dispatch(setTimerId(id));
    }
  };

  useEffect(() => {
    const handleFocus = () => {
      if (timerRef.current === undefined) {
        dispatch(setInitialState()).then(() => tickRef.current());
      } else {
        tickRef.current();
      }
    };

    const unsubFocus = navigation.addListener('focus', handleFocus);
    const unsubBlur = navigation.addListener('blur', () => {
      handleClearTimeout();
    });

    return () => {
      handleClearTimeout();
      unsubFocus();
      unsubBlur();
    };
  }, [navigation, dispatch, handleClearTimeout]);

  const handleSetDirection = useCallback(
    (d: Direction) => dispatch(setDirection(d)),
    [dispatch],
  );
  const handleSetDirectionPan = useCallback(
    (d: Direction | undefined) => dispatch(setDirectionPan(d)),
    [dispatch],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <AndroidBackButton>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <ScoreBoardContainer score={score} highScore={highScore} />
          <View style={styles.boardContainer}>
            <Board
              direction={direction}
              directionPan={directionPan}
              setDirection={handleSetDirection}
              setDirectionPan={handleSetDirectionPan}
              snake={snake}
              food={food}
            />
          </View>
        </View>
      </AndroidBackButton>
    </SafeAreaView>
  );
};

export default GameScreen;

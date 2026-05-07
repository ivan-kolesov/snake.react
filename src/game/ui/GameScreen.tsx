import React, {useCallback, useEffect, useRef} from 'react';
import {Alert, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useStore} from 'react-redux';
import type {NavigationProp} from '@react-navigation/native';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import AndroidBackButton from '../../shared/ui/AndroidBackButton';
import SharedStyle from '../../shared/config/SharedStyles';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
  getDirection,
  getDirectionPan,
  getFood,
  getHighScore,
  getScore,
  getSnake,
} from '../model/selectors';
import {
  setDirection,
  setDirectionPan,
  setFood,
  setHighScore,
  setInitialState,
  setIntervalRate,
  setScore,
  setSnake,
} from '../model/actions';
import {hasNoLeftSpace, isKnotted, makeFood, moveSnake} from '../lib/logic';
import type {Direction} from '../model/types';
import type {RootStackParamList} from '../../app/navigation/types';
import type {RootState} from '../../app/store';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SharedStyle.color.primary,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: SharedStyle.color.primary,
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

interface GameScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Game'>;
}

const GameScreen: React.FC<GameScreenProps> = ({navigation}) => {
  const store = useStore<RootState>();
  const dispatch = useAppDispatch();
  const score = useAppSelector(getScore);
  const highScore = useAppSelector(getHighScore);
  const snake = useAppSelector(getSnake);
  const food = useAppSelector(getFood);
  const direction = useAppSelector(getDirection);
  const directionPan = useAppSelector(getDirectionPan);

  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const clearTick = useCallback(() => {
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const goToGameOver = useCallback(() => {
    const state = store.getState().game;
    if (state.score > state.highScore) {
      dispatch(setHighScore(state.score));
    }
    clearTick();
    navigation.navigate('GameOver');
  }, [store, dispatch, clearTick, navigation]);

  const tick = useCallback(() => {
    const state = store.getState().game;
    const {snake: currentSnake, direction: currentDirection} = state;

    const {snake: nextSnake, ate} = moveSnake(
      currentSnake,
      currentDirection,
      state.food,
    );

    let resultSnake = nextSnake;
    if (ate) {
      const tail = resultSnake[resultSnake.length - 1];
      resultSnake = [...resultSnake, {id: tail.id + 1, x: tail.x, y: tail.y}];

      const nextScore = state.score + 1;
      dispatch(setScore(nextScore));

      if (!hasNoLeftSpace(resultSnake)) {
        if (nextScore % 3 === 0) {
          dispatch(setIntervalRate(state.intervalRate + 1));
        }
        dispatch(setFood(makeFood(resultSnake)));
      }
    }

    dispatch(setSnake(resultSnake));
    dispatch(setDirectionPan(undefined));

    if (isKnotted(resultSnake)) {
      goToGameOver();
      return;
    }
    if (hasNoLeftSpace(resultSnake)) {
      Alert.alert('You win');
      goToGameOver();
      return;
    }

    const rate = store.getState().game.intervalRate;
    timerRef.current = setTimeout(tick, 1000 / rate);
  }, [store, dispatch, goToGameOver]);

  useEffect(() => {
    const startTick = () => {
      clearTick();
      dispatch(setInitialState()).then(() => tick());
    };

    const unsubFocus = navigation.addListener('focus', startTick);
    const unsubBlur = navigation.addListener('blur', clearTick);

    return () => {
      clearTick();
      unsubFocus();
      unsubBlur();
    };
  }, [navigation, dispatch, tick, clearTick]);

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
          <ScoreBoard score={score} highScore={highScore} />
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

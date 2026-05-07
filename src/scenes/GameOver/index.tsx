import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NavigationProp } from '@react-navigation/native';
import Button from '../../components/Button';
import ScoreText from '../../components/ScoreText';
import AndroidBackButton from '../../components/AndroidBackButton';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getScore } from '../../services/game/selectors';
import { setInitialState } from '../../services/game/actions';
import type { RootStackParamList } from '../../types';

interface GameOverScreenProps {
  navigation: NavigationProp<RootStackParamList, 'GameOver'>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#30346D',
  },
  topBlock: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBlock: {
    flex: 1,
    flexDirection: 'column',
  },
  scoreText: {
    justifyContent: 'center',
    marginTop: 42,
  },
  textWrapper: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 52,
    color: '#DEEED6',
  },
});

const GameOverText: React.FC = () => (
  <View style={styles.textWrapper}>
    <Text style={styles.logoText}>GAME</Text>
    <Text style={styles.logoText}>OVER</Text>
  </View>
);

const GameOverScreen: React.FC<GameOverScreenProps> = ({ navigation }) => {
  const score = useAppSelector(getScore);
  const dispatch = useAppDispatch();

  const handleRestart = useCallback(() => {
    dispatch(setInitialState()).then(() => {
      navigation.navigate('Game');
    });
  }, [dispatch, navigation]);

  return (
    <AndroidBackButton>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <View style={styles.topBlock}>
          <GameOverText />
        </View>
        <View style={styles.bottomBlock}>
          <Button text="Play again" onPress={handleRestart} />
          <ScoreText label="Score" score={score} style={styles.scoreText} />
        </View>
      </SafeAreaView>
    </AndroidBackButton>
  );
};

export default GameOverScreen;

import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NavigationProp} from '@react-navigation/native';
import Button from '../../shared/ui/Button';
import ScoreText from '../../shared/ui/ScoreText';
import AndroidBackButton from '../../shared/ui/AndroidBackButton';
import SharedStyle from '../../shared/config/SharedStyles';
const apple = require('../assets/apple.png');
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {getScore} from '../model/selectors';
import {setInitialState} from '../model/actions';
import type {RootStackParamList} from '../../app/navigation/types';

interface GameOverScreenProps {
  navigation: NavigationProp<RootStackParamList, 'GameOver'>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: SharedStyle.color.primary,
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

const GameOverScreen: React.FC<GameOverScreenProps> = ({navigation}) => {
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
          <ScoreText
            label="Score"
            score={score}
            icon={apple}
            style={styles.scoreText}
          />
        </View>
      </SafeAreaView>
    </AndroidBackButton>
  );
};

export default GameOverScreen;

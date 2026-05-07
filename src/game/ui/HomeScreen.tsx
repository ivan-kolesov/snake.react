import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import type {NavigationProp} from '@react-navigation/native';
import Button from '../../shared/ui/Button';
import ScoreText from '../../shared/ui/ScoreText';
import SharedStyle from '../../shared/config/SharedStyles';
const apple = require('../assets/apple.png');
import {useAppSelector} from '../../app/hooks';
import {getHighScore} from '../model/selectors';
import type {RootStackParamList} from '../../app/navigation/types';

interface HomeScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: SharedStyle.color.primary,
  },
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  scoreText: {
    justifyContent: 'center',
    marginTop: 22,
  },
});

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const highScore = useAppSelector(getHighScore);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ImageBackground
        source={require('../assets/mainscreen_wo_ui.webp')}
        style={styles.background}
        resizeMode="cover">
        <View style={styles.container}>
          <Button text="Play" onPress={() => navigation.navigate('Game')} />
          <ScoreText
            label="High score"
            score={highScore}
            icon={apple}
            style={styles.scoreText}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

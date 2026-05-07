import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NavigationProp } from '@react-navigation/native';
import Button from '../../components/Button';
import ScoreText from '../../components/ScoreText';
import { useAppSelector } from '../../hooks';
import { getHighScore } from '../../services/game/selectors';
import type { RootStackParamList } from '../../types';

interface HomeScreenProps {
  navigation: NavigationProp<RootStackParamList, 'Home'>;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#30346D',
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

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const highScore = useAppSelector(getHighScore);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <ImageBackground
        source={require('../../images/mainscreen_wo_ui.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Button text="Play" onPress={() => navigation.navigate('Game')} />
          <ScoreText
            label="High score"
            score={highScore}
            style={styles.scoreText}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;

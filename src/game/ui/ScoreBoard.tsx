import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SharedStyle from '../../shared/config/SharedStyles';
import ScoreText from '../../shared/ui/ScoreText';

const apple = require('../assets/apple.png');
const {width} = Dimensions.get('window');

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

const styles = StyleSheet.create({
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

const ScoreBoard: React.FC<ScoreBoardProps> = ({score, highScore}) => (
  <View style={styles.scoreBoard}>
    <ScoreText label="Score" score={score} icon={apple} />
    <ScoreText label="High score" score={highScore} icon={apple} />
  </View>
);

export default ScoreBoard;

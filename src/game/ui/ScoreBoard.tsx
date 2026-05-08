import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import SharedStyle from '../../shared/config/SharedStyles';
import ScoreText from '../../shared/ui/ScoreText';

const apple = require('../assets/apple.png');

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
    marginBottom: 5,
    height: SharedStyle.scoreBoard.height,
    backgroundColor: SharedStyle.color.primary,
  },
});

const ScoreBoard: React.FC<ScoreBoardProps> = ({score, highScore}) => {
  const insets = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  const usableWidth = width - insets.left - insets.right;

  return (
    <View style={[styles.scoreBoard, {width: usableWidth}]}>
      <ScoreText label="Score" score={score} icon={apple} />
      <ScoreText label="High score" score={highScore} icon={apple} />
    </View>
  );
};

export default ScoreBoard;

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import SharedStyle from '../SharedStyles';

interface ScoreTextProps {
  label: string;
  score: number;
  style?: StyleProp<ViewStyle>;
}

const apple = require('../../images/apple.png');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    color: SharedStyle.color.scoreColor,
    fontWeight: 'bold',
    marginRight: 5,
  },
  image: {
    width: SharedStyle.food.width,
    height: SharedStyle.food.height,
  },
});

const ScoreText: React.FC<ScoreTextProps> = ({ label, score, style }) => (
  <View style={[styles.container, style]}>
    <Text style={styles.scoreText}>
      {label} : {score}
    </Text>
    <Image source={apple} style={styles.image} />
  </View>
);

export default React.memo(ScoreText);

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import SharedStyle from '../config/SharedStyles';

interface ScoreTextProps {
  label: string;
  score: number;
  icon?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
}

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

const ScoreText: React.FC<ScoreTextProps> = ({label, score, icon, style}) => (
  <View style={[styles.container, style]}>
    <Text style={styles.scoreText}>
      {label} : {score}
    </Text>
    {icon ? <Image source={icon} style={styles.image} /> : null}
  </View>
);

export default React.memo(ScoreText);

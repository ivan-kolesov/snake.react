import React from 'react';
import { Image, StyleSheet } from 'react-native';
import SharedStyle from '../../../components/SharedStyles';
import type { Coordinate } from '../../../types';

const apple = require('../../../images/apple.png');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: SharedStyle.food.width,
    height: SharedStyle.food.height,
  },
});

const Food: React.FC<Coordinate> = ({ x, y }) => (
  <Image source={apple} style={[styles.container, { left: x, top: y }]} />
);

export default React.memo(Food);

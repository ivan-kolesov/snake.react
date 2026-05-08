import React from 'react';
import {Image, StyleSheet} from 'react-native';
import SharedStyle from '../../shared/config/SharedStyles';
import type {Coordinate} from '../model/types';

const apple = require('../assets/apple.png');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: SharedStyle.food.width,
    height: SharedStyle.food.height,
  },
});

const Food: React.FC<Coordinate> = ({x, y}) => (
  <Image source={apple} style={[styles.container, {left: x, top: y}]} />
);

export default React.memo(Food);

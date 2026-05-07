import React from 'react';
import { StyleSheet, View } from 'react-native';
import SharedStyle from '../../../components/SharedStyles';
import type { Coordinate } from '../../../types';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: SharedStyle.segment.width,
    height: SharedStyle.segment.height,
    backgroundColor: SharedStyle.color.snake,
    borderRadius: 6,
    borderWidth: SharedStyle.segment.borderWidth,
    borderColor: SharedStyle.segment.borderColor,
  },
});

const Segment: React.FC<Coordinate> = ({ x, y }) => (
  <View style={[styles.container, { left: x, top: y }]} />
);

export default React.memo(Segment);

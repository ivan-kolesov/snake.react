import React from 'react';
import { StyleSheet, View } from 'react-native';
import SharedStyle from '../../../components/SharedStyles';
import type { Coordinate } from '../../../types';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: SharedStyle.segment.width,
    height: SharedStyle.segment.height,
    borderStyle: 'dotted',
    borderWidth: 0.5,
    borderColor: '#8595A1',
  },
});

const Cell: React.FC<Coordinate> = ({ x, y }) => (
  <View style={[styles.container, { left: x, top: y }]} />
);

export default Cell;

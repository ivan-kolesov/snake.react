import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';
import SharedStyle from '../config/SharedStyles';

interface ButtonProps extends TouchableOpacityProps {
  text: string;
}

const styles = StyleSheet.create({
  container: {
    width: 240,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6DC2CA',
    backgroundColor: SharedStyle.color.buttonBackground,
    marginTop: -20,
  },
  text: {
    fontSize: 32,
    color: SharedStyle.color.scoreColor,
    fontWeight: 'bold',
  },
});

const Button: React.FC<ButtonProps> = ({text, ...rest}) => (
  <TouchableOpacity {...rest} style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default Button;

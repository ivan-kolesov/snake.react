import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GameOverScreen, GameScreen, HomeScreen} from '../../game';
import type {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Game" component={GameScreen} />
    <Stack.Screen name="GameOver" component={GameOverScreen} />
  </Stack.Navigator>
);

export default RootStack;

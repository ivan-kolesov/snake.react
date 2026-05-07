import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../scenes/Home';
import GameScreen from '../scenes/Game';
import GameOverScreen from '../scenes/GameOver';
import type { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack: React.FC = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Game" component={GameScreen} />
    <Stack.Screen name="GameOver" component={GameOverScreen} />
  </Stack.Navigator>
);

export default RootStack;

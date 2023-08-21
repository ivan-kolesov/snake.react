import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../scenes/Home';
import GameScreen from '../scenes/Game';
import GameOverScreen from '../scenes/GameOver';

const Stack = createStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            headerShown="false"
            screenOptions={{
                gestureEnabled: false,
                headerShown: false
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="Game"
                component={GameScreen}
            />
            <Stack.Screen
                name="GameOver"
                component={GameOverScreen}
            />
        </Stack.Navigator>
    );
}
export default RootStack;

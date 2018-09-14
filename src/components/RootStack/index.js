import {createStackNavigator} from 'react-navigation';

import HomeScreen from '../../scenes/Home';
import GameScreen from '../../scenes/Game';
import GameOverScreen from '../../scenes/GameOver';

export const RootStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        Game: {
            screen: GameScreen
        },
        GameOver: {
            screen: GameOverScreen
        }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false,
        },
    }
);
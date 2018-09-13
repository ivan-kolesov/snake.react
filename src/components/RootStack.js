import {createStackNavigator} from 'react-navigation';

import HomeScreen from '../containers/Home';
import GameScreen from '../containers/Game';
import GameOverScreen from '../containers/GameOver';

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
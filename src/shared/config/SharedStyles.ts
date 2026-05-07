import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const definiteWidth = (w: number): number => {
  const reminder = w % 20;
  return reminder !== 0 ? w - reminder : w;
};

const definiteHeight = (h: number): number => {
  const diffNavigationBarHeight = 20;
  const reminder = h % 20;
  if (reminder !== 0) {
    return h - reminder - 60 - diffNavigationBarHeight;
  }
  return h - 60 - diffNavigationBarHeight;
};

const SharedStyle = {
  color: {
    primary: '#30346D',
    primaryBlack: 'black',
    secondary: '#F9FF1C',
    snake: '#597DCE',
    scoreColor: '#DEEED6',
    buttonBackground: '#597DCE',
  },
  board: {
    height: definiteHeight(height),
    width: definiteWidth(width),
  },
  segment: {
    width: 20,
    height: 20,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#6DC2CA',
  },
  food: {
    width: 20,
    height: 20,
  },
  scoreBoard: {
    height: 34,
  },
};

export default SharedStyle;

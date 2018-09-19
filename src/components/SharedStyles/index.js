import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

const definiteWidth = width => {
    const reminder = width % 10;
    if (reminder !== 0) {
        return width - reminder;
    } else {
        return width;
    }
};

const definiteHeight = height => {
    const reminder = height % 10;
    if (reminder !== 0) {
        return height - reminder - 60;
    } else {
        return height;
    }
};

const SharedStyle = {
    color: {
        primary: '#30346D',
        primaryBlack: 'black',
        secondary: '#F9FF1C',
        snake: '#597DCE',
        scoreColor: 'yellow',
        buttonBackground: '#000000'
    },
    board: {
        height: definiteHeight(height),
        width: definiteWidth(width),
    },
    segment: {
        width: 10,
        height: 10,
        backgroundColor: '#4CAF50',
        borderWidth: 1,
        borderColor: '#8595A1',
    },
    food: {
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderWidth: 1,
        borderColor: 'black',
    },
    scoreBoard: {
        height: 34,
    }
};

export default SharedStyle;
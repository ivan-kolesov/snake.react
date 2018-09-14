import * as actions from "../game/actions";
import {DIRECTION_RIGHT} from "../../scenes/Game/directions";

export const getInitialState = () => ({
    snake: [
        {id: 1, x: 20, y: 0},
        {id: 2, x: 10, y: 0},
        {id: 3, x: 0, y: 0}
    ],
    intervalRate: 25,
    direction: DIRECTION_RIGHT,
    lastSegment: 10,
    food: {x: 50, y: 50},
    score: 0
});

const initialState = {
    highScore: 0,
    ...getInitialState()
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_SCORE:
            return {...state, score: action.payload};
        case actions.SET_HIGH_SCORE:
            return {...state, highScore: action.payload};
        case actions.SET_SNAKE:
            return {...state, snake: action.payload};
        case actions.SET_FOOD:
            return {...state, food: action.payload};
        case actions.SET_DIRECTION:
            return {...state, direction: action.payload};
        case actions.SET_INTERVAL_RATE:
            return {...state, intervalRate: action.payload};
        case actions.SET_INITIAL_STATE:
            return {...state, ...getInitialState()};
        default:
            return state;
    }
};
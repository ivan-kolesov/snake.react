import * as actions from "../game/actions";
import {DIRECTION_RIGHT} from "../../scenes/Game/directions";
import {segmentRate} from '../../scenes/Game/board';

export const getInitialState = () => ({
    timerID: undefined,
    snake: [
        {id: 1, x: 2 * segmentRate, y: 0},
        {id: 2, x: segmentRate, y: 0},
        {id: 3, x: 0, y: 0}
    ],
    intervalRate: 5,
    direction: DIRECTION_RIGHT,
    directionPan: undefined,
    lastSegment: segmentRate,
    food: {x: 5 * segmentRate, y: 5 * segmentRate},
    score: 0,
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
        case actions.SET_DIRECTION_PAN:
            return {...state, directionPan: action.payload};
        case actions.SET_INTERVAL_RATE:
            return {...state, intervalRate: action.payload};
        case actions.SET_TIMER_ID:
            return {...state, timerID: action.payload};
        case actions.SET_INITIAL_STATE:
            return {...state, ...getInitialState()};
        default:
            return state;
    }
};
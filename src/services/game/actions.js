export const SET_SCORE = 'SET_SCORE';
export const SET_HIGH_SCORE = 'SET_HIGH_SCORE';
export const SET_SNAKE = 'SET_SNAKE';
export const SET_FOOD = 'SET_FOOD';
export const SET_DIRECTION = 'SET_DIRECTION';
export const SET_DIRECTION_PAN = 'SET_DIRECTION_PAN';
export const SET_INTERVAL_RATE = 'SET_INTERVAL_RATE';
export const SET_INITIAL_STATE = 'SET_INITIAL_STATE';
export const SET_TIMER_ID = 'SET_TIMER_ID';

export const setScore = score => ({
    type: SET_SCORE,
    payload: score
});

export const setHighScore = highScore => ({
    type: SET_HIGH_SCORE,
    payload: highScore
});

export const setSnake = snake => ({
    type: SET_SNAKE,
    payload: snake
});

export const setFood = food => ({
    type: SET_FOOD,
    payload: food
});

export const setDirection = direction => ({
    type: SET_DIRECTION,
    payload: direction
});

export const setDirectionPan = direction => ({
    type: SET_DIRECTION_PAN,
    payload: direction
});

export const setIntervalRate = rate => ({
    type: SET_INTERVAL_RATE,
    payload: rate
});

export const setInitialState = () => dispatch => {
    dispatch({
        type: SET_INITIAL_STATE
    });

    return Promise.resolve();
};

export const setTimerId = timerId => ({
    type: SET_TIMER_ID,
    payload: timerId
});
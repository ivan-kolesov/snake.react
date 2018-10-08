import React from 'react';
import {StyleSheet, StatusBar, View, Platform, Dimensions, Alert} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Board from './components/Board';
import * as boardConstants from './board';
import ScoreText from '../../components/ScoreText';
import * as gameSelectors from "../../services/game/selectors";
import * as gameActions from "../../services/game/actions";
import connect from "react-redux/es/connect/connect";
import _ from "lodash";
import {DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN} from "./directions";
import AndroidBackButton from '../../components/AndroidBackButton';

const {width} = Dimensions.get("window");
import SharedStyle from "../../components/SharedStyles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#30346D",
        ...Platform.select({
            ios: {
                paddingTop: 20
            }
        }),
    },
    boardContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    scoreBoard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center',
        width,
        marginBottom: 5,
        height: SharedStyle.scoreBoard.height,
        backgroundColor: SharedStyle.color.primary
    }
});

class GameScreen extends React.Component {
    componentWillUnmount() {
        this.handleClearTimeout();
    }

    handleFocus = () => {
        if (this.props.timerID === undefined) {
            this.props.setInitialState(() => this.tick());
        } else {
            this.tick();
        }
    };

    tick() {
        const {snake: sourceSnake, direction, intervalRate, setTimerId, setSnake, setDirectionPan} = this.props;

        const snake = this.move(sourceSnake, direction);
        setSnake(snake);
        setDirectionPan(undefined);

        if (this.isKnotted(snake)) {
            this.handleGameOver();
        } else if (this.hasNoLeftSpace(snake)) {
            Alert.alert('You win', null);
            this.handleGameOver();
        } else {
            const timerID = setTimeout(() => {
                requestAnimationFrame(() => this.tick());
            }, 1000 / intervalRate);
            setTimerId(timerID);
        }
    }

    handleGameOver = () => {
        const {score, highScore, setHighScore} = this.props;

        if (score > highScore) {
            setHighScore(score);
        }

        this.handleClearTimeout();
        this.props.navigation.navigate('GameOver');
    };

    handleClearTimeout = () => {
        const {setTimerId, timerID} = this.props;

        cancelAnimationFrame(this.tick);
        clearTimeout(timerID);
        setTimerId(undefined);
    };

    move = (sourceSnake, direction) => {
        let snake = _.cloneDeep(sourceSnake);
        let lastSegment = snake[0];

        for (let i = 0; i < sourceSnake.length; i++) {
            if (i === 0) {
                if (direction === DIRECTION_RIGHT) {
                    if (snake[i].x + boardConstants.segmentRate >= boardConstants.boardWidth) {
                        snake[i].x = 0;
                    } else {
                        snake[i].x = snake[i].x + boardConstants.segmentRate;
                    }
                    snake = this.bumpFood(snake, this.eatFood());
                } else if (direction === DIRECTION_LEFT) {
                    snake[i].x = snake[i].x - boardConstants.segmentRate;
                    if (snake[i].x < 0) {
                        snake[i].x = boardConstants.boardWidth - boardConstants.segmentRate;
                    }
                    snake = this.bumpFood(snake, this.eatFood());
                } else if (direction === DIRECTION_DOWN) {
                    snake[i].y = snake[i].y + boardConstants.segmentRate;
                    if (snake[i].y > boardConstants.boardHeight) {
                        snake[i].y = 0;
                    }
                    snake = this.bumpFood(snake, this.eatFood());
                } else if (direction === DIRECTION_UP) {
                    snake[i].y = snake[i].y - boardConstants.segmentRate;
                    if (snake[i].y < 0) {
                        snake[i].y = boardConstants.boardHeight;
                    }
                    snake = this.bumpFood(snake, this.eatFood());
                }
            } else {
                lastSegment = sourceSnake[i - 1];

                snake[i].x = lastSegment.x;
                snake[i].y = lastSegment.y;
            }
        }

        return snake;
    };

    isKnotted = snake => {
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                return true;
            }
        }

        return false;
    };

    hasNoLeftSpace = snake => {
        return snake.length === (boardConstants.frameY + 1) * (boardConstants.frameY + 1);
    };

    makeFood = snake => {
        const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

        const food = {
            x: getRandomInt(0, boardConstants.frameX) * boardConstants.segmentRate,
            y: getRandomInt(0, boardConstants.frameY) * boardConstants.segmentRate
        };

        if (!_.some(snake, segment => _.isEqual(food, {x: segment.x, y: segment.y}))) {
            return food;
        }

        return this.makeFood(snake);
    };

    bumpFood = (snake, eat) => {
        const {food} = this.props;

        if (_.isEqual(food, {x: snake[0].x, y: snake[0].y})) {
            return eat(snake);
        } else {
            return snake;
        }
    };

    eatFood = () => snake => {
        const {score, intervalRate, setScore, setFood, setIntervalRate} = this.props;

        const changedScore = score + 1;
        setScore(changedScore);

        snake.push({
            id: snake[snake.length - 1].id + 1,
            x: snake[snake.length - 1].x,
            y: snake[snake.length - 1].y
        });

        if (this.hasNoLeftSpace(snake)) {
            return snake;
        }

        if (changedScore % 3 === 0) {
            setIntervalRate(intervalRate + 1);
        }

        setFood(this.makeFood(snake));

        return snake;
    };

    render() {
        const {snake, score, highScore, food, direction, directionPan, setDirection, setDirectionPan} = this.props;

        return (
            <AndroidBackButton>
                <View style={styles.container}>
                    <NavigationEvents onWillFocus={this.handleFocus} onDidBlur={this.handleClearTimeout}/>
                    <StatusBar barStyle="light-content"/>
                    <ScoreBoardContainer score={score} highScore={highScore}/>
                    <View style={styles.boardContainer}>
                        <Board
                            direction={direction} directionPan={directionPan}
                            setDirection={setDirection} setDirectionPan={setDirectionPan}
                            snake={snake} food={food}/>
                    </View>
                </View>
            </AndroidBackButton>
        );
    }
}

const mapStateToProps = store => ({
    timerID: gameSelectors.getTimerId(store),
    highScore: gameSelectors.getHighScore(store),
    score: gameSelectors.getScore(store),
    snake: gameSelectors.getSnake(store),
    food: gameSelectors.getFood(store),
    intervalRate: gameSelectors.getIntervalRate(store),
    direction: gameSelectors.getDirection(store),
    directionPan: gameSelectors.getDirectionPan(store),
});

const mapDispatchToProps = dispatch => ({
    setTimerId(timerId) {
        dispatch(gameActions.setTimerId(timerId));
    },
    setSnake(snake) {
        dispatch(gameActions.setSnake(snake));
    },
    setFood(food) {
        dispatch(gameActions.setFood(food));
    },
    setDirection(direction) {
        dispatch(gameActions.setDirection(direction));
    },
    setDirectionPan(direction) {
        dispatch(gameActions.setDirectionPan(direction));
    },
    setScore(score) {
        dispatch(gameActions.setScore(score));
    },
    setHighScore(score) {
        dispatch(gameActions.setHighScore(score));
    },
    setIntervalRate(rate) {
        dispatch(gameActions.setIntervalRate(rate));
    },
    setInitialState(callback) {
        dispatch(gameActions.setInitialState()).then(callback);
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameScreen);

const ScoreBoardContainer = props => {
    return (
        <View style={styles.scoreBoard}>
            <ScoreText label="Score" score={props.score}/>
            <ScoreText label="High score" score={props.highScore}/>
        </View>
    )
};
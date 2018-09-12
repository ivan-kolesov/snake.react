import React from 'react';
import {StyleSheet, StatusBar, View, Platform, Dimensions} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import Board from '../components/Board';
import ScoreText from '../components/ScoreText';
import * as gameSelectors from "../reducers/game";
import * as gameActions from '../actions';
import connect from "react-redux/es/connect/connect";
import _ from "lodash";
import {DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN} from "../constants/directions";

const {width} = Dimensions.get("window");
import SharedStyle from "../utils/sharedStyle";

const segmentRate = 10;
const boardWidth = SharedStyle.board.width;
const BoardHeight = SharedStyle.board.height - 10;

class GameScreen extends React.Component {
    componentWillUnmount() {
        this._handleClearTimeout();
    }

    tick() {
        const {snake: sourceSnake, score, highScore, direction, intervalRate, setSnake, setHighScore, navigation} = this.props;

        const snake = this._move(sourceSnake, direction);
        setSnake(snake);

        if (this._isGameOver(snake)) {
            if (score > highScore) {
                setHighScore(score);
            }
            cancelAnimationFrame(this.tick);
            this._handleClearTimeout();
            navigation.navigate('GameOver');
        } else {
            this.timerID = setTimeout(() => {
                requestAnimationFrame(() => this.tick());
            }, 1000 / intervalRate);
        }
    }

    _handleClearTimeout = () => {
        clearTimeout(this.timerID);
    };

    _move = (sourceSnake, direction) => {
        let snake = _.cloneDeep(sourceSnake);
        let lastSegment = snake[0];

        for (let i = 0; i < sourceSnake.length; i++) {
            if (i !== 0) {
                lastSegment = sourceSnake[i - 1];
            }

            if (direction === DIRECTION_RIGHT) {
                if (i === 0) {
                    if (snake[i].x + segmentRate >= boardWidth) {
                        snake[i].x = 0;
                    } else {
                        snake[i].x = snake[i].x + segmentRate;
                    }
                    snake = this._handleEatFood(snake);
                } else {
                    snake[i].x = lastSegment.x;
                    snake[i].y = lastSegment.y;
                }
            } else if (direction === DIRECTION_LEFT) {
                if (i === 0) {
                    snake[i].x = snake[i].x - segmentRate;
                    if (snake[i].x < 0) {
                        snake[i].x = boardWidth - segmentRate;
                    }
                    snake = this._handleEatFood(snake);
                } else {
                    snake[i].x = lastSegment.x;
                    snake[i].y = lastSegment.y;
                }
            } else if (direction === DIRECTION_DOWN) {
                if (i === 0) {
                    snake[i].y = snake[i].y + segmentRate;
                    if (snake[i].y > BoardHeight) {
                        snake[i].y = 0;
                    }
                    snake = this._handleEatFood(snake);
                } else {
                    snake[i].x = lastSegment.x;
                    snake[i].y = lastSegment.y;
                }
            } else if (direction === DIRECTION_UP) {
                if (i === 0) {
                    snake[i].y = snake[i].y - segmentRate;
                    if (snake[i].y < 0) {
                        snake[i].y = BoardHeight;
                    }
                    snake = this._handleEatFood(snake);
                } else {
                    snake[i].x = lastSegment.x;
                    snake[i].y = lastSegment.y;
                }
            }
        }

        return snake;
    };

    _isGameOver = snake => {
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
                return true;
            }
        }

        return false;
    };

    _getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

    _makeFood = () => {
        const frameX = (boardWidth - 10) / segmentRate;
        const frameY = BoardHeight / segmentRate;

        return {
            x: this._getRandomInt(0, frameX) * segmentRate,
            y: this._getRandomInt(0, frameY) * segmentRate
        }
    };

    _handleEatFood = snake => {
        const {score, intervalRate, food, setScore, setFood, setIntervalRate} = this.props;

        if (snake[0].x === food.x && snake[0].y === food.y) {
            const changedScore = score + 1;
            setScore(changedScore);

            snake.push({
                id: snake[snake.length - 1].id + 1,
                x: snake[snake.length - 1].x,
                y: snake[snake.length - 1].y
            });

            if (changedScore % 3 === 0) {
                setIntervalRate(intervalRate + 3);
            }

            setFood(this._makeFood());
        }

        return snake;
    };

    render() {
        const {snake, score, highScore, food, setDirection} = this.props;

        return (
            <View style={styles.container}>
                <NavigationEvents onWillFocus={() => this.tick()}/>
                <StatusBar barStyle="light-content"/>
                <ScoreBoardContainer score={score} highScore={highScore}/>
                <Board setDirection={setDirection} snake={snake} food={food}/>
            </View>
        );
    }
}

const mapStateToProps = store => ({
    highScore: gameSelectors.getHighScore(store),
    score: gameSelectors.getScore(store),
    snake: gameSelectors.getSnake(store),
    food: gameSelectors.getFood(store),
    intervalRate: gameSelectors.getIntervalRate(store),
    direction: gameSelectors.getDirection(store),
});

const mapDispatchToProps = dispatch => ({
    setSnake(snake) {
        dispatch(gameActions.setSnake(snake));
    },
    setFood(food) {
        dispatch(gameActions.setFood(food));
    },
    setDirection(direction) {
        dispatch(gameActions.setDirection(direction));
    },
    setScore(score) {
        dispatch(gameActions.setScore(score));
    },
    setHighScore(score) {
        dispatch(gameActions.setHighScore(score));
    },
    setIntervalRate(rate) {
        dispatch(gameActions.setIntervalRate(rate));
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
            <ScoreText label="High Score" score={props.highScore}/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "black",
        ...Platform.select({
            ios: {
                paddingTop: 20
            }
        })
    },
    scoreBoard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        width,
        marginBottom: 5,
        height: SharedStyle.scoreBoard.height,
        backgroundColor: SharedStyle.color.primary
    }
});
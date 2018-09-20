import React from "react";
import {PanResponder, StyleSheet, View} from "react-native";
import SharedStyle from "../../../components/SharedStyles";
import Segment from "./Segment";
import Food from './Food';
import Grid from '../../../components/Grid';
import PropTypes from "prop-types";
import {DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN} from "../directions";

const styles = StyleSheet.create({
    boardStyle: {
        flexDirection: 'row',
        position: "relative",
        width: SharedStyle.board.width,
        height: SharedStyle.board.height,
        backgroundColor: SharedStyle.color.primary,
    },
});

const Board = props => {
    const {snake, food, direction, setDirection} = props;

    const panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderMove: (e, {vx, vy}) => {
            const velocityThreshold = 0.2;
            const absVx = Math.abs(vx);
            const absVy = Math.abs(vy);

            if (absVx > absVy) {
                if ([DIRECTION_RIGHT, DIRECTION_LEFT].indexOf(direction) === -1 && absVx > velocityThreshold) {
                    setDirection(vx > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
                }
            } else {
                if ([DIRECTION_DOWN, DIRECTION_UP].indexOf(direction) === -1 && absVy > velocityThreshold) {
                    setDirection(vy > 0 ? DIRECTION_DOWN : DIRECTION_UP);
                }
            }
        },
    });

    return (
        <View style={styles.boardStyle} {...panResponder.panHandlers}>
            <Grid/>
            {snake.map((segment) => {
                return <Segment key={segment.id} id={segment.id} x={segment.x} y={segment.y}/>;
            })}
            <Food x={food.x} y={food.y}/>
        </View>
    );
};

Board.propTypes = {
    snake: PropTypes.array.isRequired,
    food: PropTypes.object.isRequired,
    direction: PropTypes.string.isRequired,
    setDirection: PropTypes.func.isRequired
};

export default Board;
import React from "react";
import {PanResponder, StyleSheet, View} from "react-native";
import SharedStyle from "../../../components/SharedStyles";
import Segment from "./Segment";
import Food from './Food';
import Cell from './Cell';
import * as boardConstants from '../board';
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

const generateCells = () => {
    let cells = [];
    let counter = 0;
    for (let i = 0; i <= boardConstants.frameX; i++) {
        for (let j = 0; j <= boardConstants.frameY; j++) {
            cells.push({id: counter++, x: i * boardConstants.segmentRate, y: j * boardConstants.segmentRate});
        }
    }

    return cells;
};

const Board = props => {
    const {snake, food, direction, setDirection} = props;

    const panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderMove: (e, {vx, vy}) => {
            if (Math.abs(vx) > Math.abs(vy)) {
                if ([DIRECTION_RIGHT, DIRECTION_LEFT].indexOf(direction) === -1) {
                    setDirection(vx > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
                }
            } else {
                if ([DIRECTION_DOWN, DIRECTION_UP].indexOf(direction) === -1) {
                    setDirection(vy > 0 ? DIRECTION_DOWN : DIRECTION_UP);
                }
            }
        },
    });

    return (
        <View style={styles.boardStyle} {...panResponder.panHandlers}>
            {snake.map((segment) => {
                return <Segment key={segment.id} id={segment.id} x={segment.x} y={segment.y}/>;
            })}
            <Food x={food.x} y={food.y}/>
            {generateCells().map((cell) => {
                return <Cell key={cell.id} x={cell.x} y={cell.y}/>;
            })}
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
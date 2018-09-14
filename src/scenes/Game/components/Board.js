import React from "react";
import {PanResponder, StyleSheet, View} from "react-native";
import SharedStyle from "../../../components/SharedStyles";
import Segment from "./Segment";
import Food from './Food';
import PropTypes from "prop-types";
import {DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN} from "../directions";

const styles = StyleSheet.create({
    boardStyle: {
        flexDirection: 'row',
        position: "relative",
        width: SharedStyle.board.width,
        height: SharedStyle.board.height,
        backgroundColor: SharedStyle.color.primary
    },
});

const Board = props => {
    const {snake, food, setDirection} = props;

    const panResponder = PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderMove: (e, {vx, vy}) => {
            if (Math.abs(vx) > Math.abs(vy)) {
                setDirection(vx > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
            } else {
                setDirection(vy > 0 ? DIRECTION_DOWN : DIRECTION_UP);
            }
        },
    });

    return (
        <View style={styles.boardStyle} {...panResponder.panHandlers}>
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
    setDirection: PropTypes.func.isRequired
};

export default Board;
import React, {Component} from "react";
import {PanResponder, StyleSheet, View} from "react-native";
import SharedStyle from "../utils/sharedStyle";
import Segment from "./Segment";
import Food from '../components/Food';
import {DIRECTION_RIGHT, DIRECTION_LEFT, DIRECTION_UP, DIRECTION_DOWN} from "../constants/directions";

export default class Board extends Component {
    constructor(props) {
        super(props);

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,

            onPanResponderMove: (e, {vx, vy}) => {
                const {setDirection} = this.props;

                if (Math.abs(vx) > Math.abs(vy)) {
                    setDirection(vx > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT);
                } else {
                    setDirection(vy > 0 ? DIRECTION_DOWN : DIRECTION_UP);
                }
            },
        });
    }

    render() {
        const {snake, food} = this.props;

        return (
            <View style={styles.boardStyle} {...this._panResponder.panHandlers}>
                {snake.map((segment) => {
                    return <Segment key={segment.id} id={segment.id} x={segment.x} y={segment.y}/>;
                })}
                <Food x={food.x} y={food.y}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    boardStyle: {
        flexDirection: 'row',
        position: "relative",
        width: SharedStyle.board.width,
        height: SharedStyle.board.height,
        backgroundColor: SharedStyle.color.primary
    },
});
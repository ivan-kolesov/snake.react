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
        width: SharedStyle.board.width,
        height: SharedStyle.board.height,
        backgroundColor: SharedStyle.color.primary,
    },
});

class Board extends React.PureComponent {
    constructor(props) {
        super(props);

        this.directionBeignChanged = undefined;
        this.panResponder = this.createPanResponder();
    }

    createPanResponder = () => PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,
        onStartShouldSetPanResponderCapture: () => true,

        onPanResponderMove: (e, {vx, vy}) => {
            if (vx === 0 && vy === 0) {
                return false;
            }

            const absVx = Math.abs(vx);
            const absVy = Math.abs(vy);
            const {direction} = this.props;

            if (absVx > absVy) {
                if ([DIRECTION_RIGHT, DIRECTION_LEFT].indexOf(direction) === -1) {
                    this.directionBeignChanged = vx > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT;
                }
            } else {
                if ([DIRECTION_DOWN, DIRECTION_UP].indexOf(direction) === -1) {
                    this.directionBeignChanged = vy > 0 ? DIRECTION_DOWN : DIRECTION_UP;
                }
            }

            return false;
        },

        onPanResponderRelease: () => {
            if (this.directionBeignChanged === undefined) {
                return;
            }

            const {setDirection} = this.props;
            setDirection(this.directionBeignChanged);

            this.directionBeignChanged = undefined;
        },
    });

    render() {
        const {snake, food} = this.props;

        return (
            <View style={styles.boardStyle} {...this.panResponder.panHandlers}>
                <Grid/>
                {snake.map((segment) => {
                    return <Segment key={segment.id} id={segment.id} x={segment.x} y={segment.y}/>;
                })}
                <Food x={food.x} y={food.y}/>
            </View>
        );
    }
}

Board.propTypes = {
    snake: PropTypes.array.isRequired,
    food: PropTypes.object.isRequired,
    direction: PropTypes.string.isRequired,
    setDirection: PropTypes.func.isRequired
};

export default Board;
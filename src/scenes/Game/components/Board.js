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

        this.panResponder = this.createPanResponder();
        this.state = {allowChangeDirection: true};
    }

    createPanResponder = () => PanResponder.create({
        onMoveShouldSetResponderCapture: () => true,
        onMoveShouldSetPanResponderCapture: () => true,

        onPanResponderMove: (e, {vx, vy}) => {
            if (!this.state.allowChangeDirection) {
                return false;
            }

            if (vx === 0 && vy === 0) {
                return false;
            }

            const {directionPan, setDirectionPan, setDirection, direction} = this.props;
            if (directionPan !== undefined) {
                return false;
            }

            const absVx = Math.abs(vx);
            const absVy = Math.abs(vy);
            const velocityThreshold = 0.2;

            let changedDirection;

            if (absVx > absVy) {
                if ([DIRECTION_RIGHT, DIRECTION_LEFT].indexOf(direction) === -1 && absVx > velocityThreshold) {
                    changedDirection = vx > 0 ? DIRECTION_RIGHT : DIRECTION_LEFT;
                }
            } else {
                if ([DIRECTION_DOWN, DIRECTION_UP].indexOf(direction) === -1 && absVy > velocityThreshold) {
                    changedDirection = vy > 0 ? DIRECTION_DOWN : DIRECTION_UP;
                }
            }

            if (changedDirection === undefined) {
                return false;
            }

            this.setState({allowChangeDirection: false});
            setDirectionPan(changedDirection);
            setDirection(changedDirection);
            return true;
        },

        onPanResponderRelease: () => {
            this.setState({allowChangeDirection: true});
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
    directionPan: PropTypes.string,
    setDirection: PropTypes.func.isRequired,
    setDirectionPan: PropTypes.func.isRequired,
};

export default Board;
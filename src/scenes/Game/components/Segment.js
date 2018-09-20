import React from "react";
import {View, StyleSheet} from "react-native";
import SharedStyle from "../../../components/SharedStyles";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: SharedStyle.segment.width,
        height: SharedStyle.segment.height,
        backgroundColor: SharedStyle.color.snake,
        borderRadius: 6,
        borderWidth: SharedStyle.segment.borderWidth,
        borderColor: SharedStyle.segment.borderColor
    }
});

const Segment = props => {
    const customStyle = {
        left: props.x,
        top: props.y
    };
    return <View style={[styles.container, customStyle]}/>;
};

Segment.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
};

export default Segment;
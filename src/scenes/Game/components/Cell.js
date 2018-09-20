import React from "react";
import {View, StyleSheet} from "react-native";
import SharedStyle from "../../../components/SharedStyles";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: SharedStyle.segment.width,
        height: SharedStyle.segment.height,
        borderStyle: 'dotted',
        borderWidth: 0.5,
        borderColor: '#8595A1'
    }
});

const Cell = props => {
    const customStyle = {
        left: props.x,
        top: props.y
    };
    return <View style={[styles.container, customStyle]}/>;
};

Cell.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
};

export default Cell;
import React, {Component} from "react";
import {View, StyleSheet} from "react-native";
import SharedStyle from "../utils/sharedStyle";

export default class Segment extends Component {
    render() {
        const customStyle = {
            left: this.props.x,
            top: this.props.y
        };
        return <View style={[styles.container, customStyle]}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: SharedStyle.segment.width,
        height: SharedStyle.segment.height,
        backgroundColor: SharedStyle.color.snake,
        borderWidth: SharedStyle.segment.borderWidth,
        borderColor: SharedStyle.segment.borderColor
    }
});
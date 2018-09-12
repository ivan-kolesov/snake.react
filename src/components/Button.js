import React, {Component} from "react";
import {Text, StyleSheet, TouchableOpacity} from "react-native";
import SharedStyle from "../utils/sharedStyle";

export default class Button extends Component {
    render() {
        const {text} = this.props;

        return (
            <TouchableOpacity {...this.props} style={styles.container}>
                <Text style={styles.text}>{text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 240,
        height: 62,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: SharedStyle.color.buttonBackground
    },
    text: {
        fontSize: 32,
        color: SharedStyle.color.scoreColor,
        fontWeight: "bold"
    }
});
import React from "react";
import {Text, StyleSheet, TouchableOpacity} from "react-native";
import SharedStyle from "../utils/sharedStyle";
import PropTypes from "prop-types";

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

const Button = props => {
    const {text} = props;

    return (
        <TouchableOpacity {...props} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired
};

export default Button;
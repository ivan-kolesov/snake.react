import React from "react";
import {Text, StyleSheet, TouchableOpacity} from "react-native";
import SharedStyle from "../SharedStyles";
import PropTypes from "prop-types";

const styles = StyleSheet.create({
    container: {
        width: 240,
        height: 62,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#6DC2CA',
        backgroundColor: SharedStyle.color.buttonBackground,
        marginTop: -20
    },
    text: {
        fontSize: 32,
        color: SharedStyle.color.scoreColor,
        fontWeight: "bold"
    }
});

const Button = props => {
    return (
        <TouchableOpacity {...props} style={styles.container}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired
};

export default Button;
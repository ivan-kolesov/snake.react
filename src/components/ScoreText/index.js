import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import SharedStyle from "../SharedStyles";
import PropTypes from "prop-types";

const apple = require("../../images/apple.png");
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    scoreText: {
        color: SharedStyle.color.scoreColor,
        fontWeight: "bold",
        marginRight: 5
    },
    image: {
        width: SharedStyle.food.width,
        height: SharedStyle.food.height
    }
});

export default class ScoreText extends React.PureComponent {
    render() {
        const {label, score, style} = this.props;

        return (
            <View style={[styles.container, style]}>
                <Text style={styles.scoreText}>{label} : {score}</Text>
                <Image source={apple} style={styles.image}/>
            </View>
        );
    }
};

ScoreText.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    style: PropTypes.object
};
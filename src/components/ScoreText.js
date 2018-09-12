import React, {Component} from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import SharedStyle from "../utils/sharedStyle";
import PropTypes from "prop-types";

const apple = require("../assets/apple.png");

export default class ScoreText extends Component {
    render() {
        const {label, score, style} = this.props;
        return (
            <View style={[styles.container, style]}>
                <Text style={styles.scoreText}>
                    {label} : {score}
                </Text>
                <Image
                    source={apple}
                    style={{
                        width: SharedStyle.food.width,
                        height: SharedStyle.food.height
                    }}
                />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    scoreText: {
        color: SharedStyle.color.scoreColor,
        fontWeight: "bold",
        marginRight: 5
    }
});

ScoreText.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    style: PropTypes.object
};
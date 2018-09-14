import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import SharedStyle from "../utils/sharedStyle";
import PropTypes from "prop-types";

const apple = require("../assets/apple.png");
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

const ScoreText = props => {
    const {label, score, style} = props;

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
};

ScoreText.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    style: PropTypes.object
};

export default ScoreText;
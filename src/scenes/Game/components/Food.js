import React from 'react';
import {StyleSheet, Image} from "react-native";
import SharedStyle from '../../../utils/sharedStyle';
import PropTypes from "prop-types";

const apple = require('../../../assets/apple.png');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: SharedStyle.food.width,
        height: SharedStyle.food.height,
    }
});

const Food = props => {
    const customStyle = {
        left: props.x,
        top: props.y
    };

    return <Image source={apple} style={[styles.container, customStyle]}/>;
};

Food.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
};

export default Food;
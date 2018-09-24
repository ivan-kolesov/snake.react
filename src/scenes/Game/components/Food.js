import React from 'react';
import {StyleSheet, Image} from "react-native";
import SharedStyle from '../../../components/SharedStyles';
import PropTypes from "prop-types";

const apple = require('../../../images/apple.png');

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: SharedStyle.food.width,
        height: SharedStyle.food.height,
    }
});

export default class Food extends React.PureComponent {
    render() {
        const customStyle = {
            left: this.props.x,
            top: this.props.y
        };

        return <Image source={apple} style={[styles.container, customStyle]}/>;
    }
};

Food.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
};
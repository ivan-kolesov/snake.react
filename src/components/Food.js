import React, {Component} from 'react';
import {StyleSheet, Image} from "react-native";
import SharedStyle from '../utils/sharedStyle';

const apple = require('../assets/apple.png');

export default class Food extends Component {
    render() {
        const customStyle = {
            left: this.props.x,
            top: this.props.y
        };

        return <Image source={apple} style={[styles.container, customStyle]}/>;
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: SharedStyle.food.width,
        height: SharedStyle.food.height,
    }
});
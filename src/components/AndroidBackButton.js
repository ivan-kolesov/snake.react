import {BackHandler} from 'react-native';
import React, {Component} from 'react';

export default class AndroidBackButton extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', () => {
        });
    }

    render() {
        return this.props.children;
    }
}
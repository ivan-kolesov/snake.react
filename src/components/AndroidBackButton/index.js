import {BackHandler} from 'react-native';
import React from 'react';

export default class AndroidBackButton extends React.PureComponent {
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
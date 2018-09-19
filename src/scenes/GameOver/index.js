import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';
import Button from '../../components/Button';
import ScoreText from '../../components/ScoreText';
import SharedStyle from "../../components/SharedStyles";

import * as gameSelectors from "../../services/game/selectors";
import * as gameActions from "../../services/game/actions";

import AndroidBackButton from '../../components/AndroidBackButton';

class GameOverScreen extends Component {
    _handleRestart = () => {
        const {navigation, setInitialState} = this.props;

        setInitialState();
        navigation.navigate('Game');
    };

    render() {
        const {score} = this.props;

        return (
            <AndroidBackButton>
                <View style={styles.container}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <GameOverText/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column',}}>
                        <Button
                            text="Играть еще"
                            onPress={this._handleRestart}
                        />
                        <ScoreText label="Счет" score={score} style={{justifyContent: 'center', marginTop: 42}}/>
                    </View>
                </View>
            </AndroidBackButton>
        );
    }
}

const GameOverText = () => {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={styles.logoText}>GAME</Text>
            <Text style={styles.logoText}>OVER</Text>
        </View>
    )
};

const mapStateToProps = store => ({
    score: gameSelectors.getScore(store)
});

const mapDispatchToProps = dispatch => ({
    setInitialState() {
        dispatch(gameActions.setInitialState());
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameOverScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    logoText: {
        fontSize: 52,
        color: SharedStyle.color.snake,
    }
});
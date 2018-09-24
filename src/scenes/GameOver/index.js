import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';
import Button from '../../components/Button';
import ScoreText from '../../components/ScoreText';

import * as gameSelectors from "../../services/game/selectors";
import * as gameActions from "../../services/game/actions";

import AndroidBackButton from '../../components/AndroidBackButton';

class GameOverScreen extends Component {
    handleRestart = () => {
        const {navigation, setInitialState} = this.props;

        setInitialState(() => {
            navigation.navigate('Game')
        });
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
                            text="Play again"
                            onPress={this.handleRestart}
                        />
                        <ScoreText label="Score" score={score} style={{justifyContent: 'center', marginTop: 42}}/>
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
    setInitialState(callback) {
        dispatch(gameActions.setInitialState()).then(callback);
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
        backgroundColor: '#30346D',
    },
    logoText: {
        fontSize: 52,
        color: '#DEEED6',
    }
});
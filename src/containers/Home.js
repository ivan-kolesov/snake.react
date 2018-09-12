import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';
import Button from '../components/Button';
import ScoreText from '../components/ScoreText';
import SharedStyle from "../utils/sharedStyle";

import * as gameSelectors from "../reducers/game";

class HomeScreen extends Component {
    render() {
        const {highScore, navigation} = this.props;

        return (
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Logo/>
                </View>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Button
                        text="PLAY"
                        onPress={() =>
                            navigation.navigate('Game')
                        }
                    />
                    <ScoreText label="High Score" score={highScore} style={{justifyContent: 'center', marginTop: 42}}/>
                </View>
            </View>
        );
    }
}

const Logo = () => {
    return (
        <View style={{alignItems: 'center'}}>
            <Text style={styles.logoText}>SNAKE</Text>
        </View>
    )
};

const mapStateToProps = store => ({
    highScore: gameSelectors.getHighScore(store)
});

export default connect(
    mapStateToProps
)(HomeScreen);

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
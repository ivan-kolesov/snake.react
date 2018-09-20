import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Text, ImageBackground} from 'react-native';
import Button from '../../components/Button';
import ScoreText from '../../components/ScoreText';

import * as gameSelectors from "../../services/game/selectors";

class HomeScreen extends Component {
    render() {
        const {highScore, navigation} = this.props;

        return (
            <ImageBackground source={require('../../images/mainscreen_wo_ui.png')} style={styles.background}>
                <View style={styles.container}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Logo/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Button text="Play"
                                onPress={() =>
                                    navigation.navigate('Game')
                                }
                        />
                        <ScoreText label="High score" score={highScore} style={styles.scoreText}/>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const Logo = () => {
    return (
        <View style={{alignItems: 'center', paddingTop: 100}}>
            <Text style={styles.logoText}>Just Snake</Text>
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
    background: {
        width: '100%',
        height: '100%'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 52,
        color: '#DEEED6'
    },
    scoreText: {
        justifyContent: 'center',
        marginTop: 22
    }
});
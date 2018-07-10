import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'

import { connect } from 'react-redux'
import { white } from '../utils/colors';

class StartQuiz extends Component {

    //TODO: we might have to add a header title here as ADD CARD 
    static navigationOptions = ({ navigation }) => {
        // console.log('navigation.state.params', navigation.state)
        const { title } = navigation.state.params.deck;
        return {
            title: `${title}'s Quiz`, //from nav params (above)
        }
    }

    state = {
        currentIndex: 0,
        isQuestion: true,
        score: 0,
    }

    toggleQuestionAnswer = () => {
        this.state.isQuestion === true ? 
        this.setState({ isQuestion: false }) : 
        this.setState({ isQuestion: true });

    }

    rightAnswer = () => {
        const { currentIndex, score } = this.state;
        this.setState({
            currentIndex: currentIndex + 1,
            score: score + 1,
        })
    }

    wrongAnswer = () => {
        const { currentIndex } = this.state;
        this.setState({
            currentIndex: currentIndex + 1,
        })
    }

    
    

    
    render(){
        const { questions } = this.props.navigation.state.params.deck;
        const { currentIndex, isQuestion, score } = this.state;

        if(questions.length === 0){
            return (
                <View>
                    <Text> There is no cards inside this deck. Please insert some card to make quiz</Text>
                </View>
            )
        }

        if(currentIndex >= questions.length){
            return (
                <View>
                    <Text> SHOW SCORE AND RESET State</Text>
                </View>
            )
        }

        return (
            <View style={styles.container} >
                <Text> Start Quiz </Text>
                <Text> Score: {score} </Text>

                {isQuestion === true ? ( //explicitly making the comparison for legibility sake
                    <View>
                        <Text> Front </Text>
                        <Text> {questions[currentIndex].question} </Text>
                    </View>
                 ) : (
                    <View>
                        <Text> Back </Text>
                        <Text> {questions[currentIndex].answer} </Text>
                    </View>
                 ) }

            
                <TouchableOpacity 
                    onPress={this.toggleQuestionAnswer} 
                    style={styles.button}
                >
                    <Text style={styles.buttonText} > Flip </Text>
                </TouchableOpacity>

                <View style={styles.buttonRow} >
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={this.rightAnswer}
                    >
                        <Text style={styles.buttonText} > Correct </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.button}
                        onPress={this.wrongAnswer}
                    >
                        <Text style={styles.buttonText} > Incorrect </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        // alignItems: 'center',
        marginTop: 25,
        padding: 10,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        backgroundColor: 'black',
    },
    buttonText: {
        fontSize: 15,
        color: white,
        padding: 5,
    }



})

// const mapStateToProps = (state) => {
//     return {
//         decks: state.deckReducer,
//     }
// }

export default StartQuiz;



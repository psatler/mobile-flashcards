import React, { Component } from 'react'
import { Text, View, StyleSheet, 
        TouchableOpacity, 
        Platform,

    } from 'react-native'

import { white, red, green, blue, gray, lightBlue, darkBlue } from '../utils/colors';

import ShowResult from './ShowResult'
import FlipCardAnimation from '../utils/flipCardAnimation'

import * as Progress from 'react-native-progress';

class StartQuiz extends Component {

    static navigationOptions = ({ navigation }) => {
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

        this.refs.child.flipCard(); // flip cards using a ref to child method
    }

    rightAnswer = () => {
        const { currentIndex, score } = this.state;

        this.setState({
            currentIndex: currentIndex + 1,
            score: score + 1,
            isQuestion: true, //switching back to question after an answer
        });

        this.refs.child.flipCard(); //flipping back
    }

    wrongAnswer = () => {
        const { currentIndex } = this.state;

        this.setState({
            currentIndex: currentIndex + 1,
            isQuestion: true, //switching back to question after an answer
        });

        this.refs.child.flipCard(); //flipping back
    }

    restartQuiz = () => {
        this.setState({
            currentIndex: 0,
            isQuestion: true,
            score: 0,
        })
    }
   
     
    render(){
        // const { questions } = this.props.navigation.state.params.deck;
        const { deck } = this.props.navigation.state.params;
        // console.log('deckdeck ', deck)
        const { questions } = deck; //destructuring again to take the questions array out
        const { currentIndex, isQuestion, score } = this.state;

        if(questions.length === 0){ //there is no cards inside deck
            return (
                // <ShowResult score={score} total={questions.length} restartFunc={this.restartQuiz} />
                <ShowResult score={score} singleDeck={deck} restartFunc={this.restartQuiz} /> 
            )
        }

        if(currentIndex >= questions.length){ //show results
            return (
                // <ShowResult score={score} total={questions.length} restartFunc={this.restartQuiz} />
                <ShowResult score={score} singleDeck={deck} restartFunc={this.restartQuiz} />
            )
        }

        return (
            <View style={styles.container} >
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText} > {currentIndex + 1} / {questions.length} </Text>

                    <View style={ {flex: 2}} >
                        <Progress.Bar 
                            style={ { marginTop: 10, }}
                            progress={ (currentIndex+1)/questions.length } 
                            width={null}
                            color={lightBlue}
                            borderWidth={1}
                        />
                    </View>
 
                </View>
                
                <View style={styles.cardContainer}>
                    <FlipCardAnimation 
                        showFront={isQuestion} 
                        ref='child' //creating a ref so I can use a child's method from parent
                        questionText={questions[currentIndex].question}
                        answerText={questions[currentIndex].answer}
                    />
                </View>

                <TouchableOpacity 
                    onPress={this.toggleQuestionAnswer} 
                    style={styles.switchButton}
                >
                    {isQuestion === true ? (
                        <Text style={styles.switchButtonText} > See Answer </Text>) : (
                        <Text style={styles.switchButtonText} > See Question </Text>)
                        }
                </TouchableOpacity>

                <View style={styles.buttonRow} >
                    <TouchableOpacity 
                        disabled={isQuestion} //if is question, disable button
                        style={[styles.button, { 
                            backgroundColor: isQuestion ? gray : red, //change background color if is question
                        } ]}
                        onPress={this.wrongAnswer}
                    >
                        <Text style={styles.buttonText} > Incorrect </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        disabled={isQuestion} //if is question, disable button
                        style={[styles.button, {
                            backgroundColor: isQuestion ? gray : green, 
                        }]}
                        onPress={this.rightAnswer}
                    >
                        <Text style={styles.buttonText} > Correct </Text>
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
    scoreContainer: {
        flexDirection: 'row',
        marginLeft: 10, 
        marginRight: 10, 
        marginTop: 5, 
    },
    scoreText: {
        flex: 0.5,
        marginTop: 5,
        fontSize: 15,
        fontWeight: 'bold',
    },
    questionAnswer: {
        textAlign: 'center',
        fontSize: 40,
    },
    cardContainer: {
        flex: 1, //to make it fill the majority of the space available
        margin: 5,
        marginBottom: 25,
    },
    switchButton: {
        alignSelf: 'center',
        backgroundColor: white,
        padding: 10,
        borderWidth: 1,
        borderColor: blue,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
    },
    switchButtonText: {
        fontSize: 15,
        color: blue,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        marginTop: 25,
        marginBottom: 25,
        padding: 10,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
    },
    buttonText: {
        fontSize: 15,
        color: white,
        padding: 3,
    }
})

export default StartQuiz;



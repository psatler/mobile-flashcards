import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native'

import { connect } from 'react-redux'
import { white, red, green, blue, gray } from '../utils/colors';

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
            isQuestion: true, //switching back to question after an answer
        })
    }

    wrongAnswer = () => {
        const { currentIndex } = this.state;
        this.setState({
            currentIndex: currentIndex + 1,
            isQuestion: true, //switching back to question after an answer
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
                <Text> Question: {currentIndex + 1} / {questions.length} </Text>

                <View style={styles.cardContainer}>
                {isQuestion === true ? ( //explicitly making the comparison for legibility sake
                    <View>
                        <Text style={styles.questionAnswer} > {questions[currentIndex].question} </Text>
                    </View>
                 ) : (
                    <View>
                        <Text style={styles.questionAnswer} > {questions[currentIndex].answer} </Text>
                    </View>
                 ) }
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
                            // borderColor: red,
                            backgroundColor: isQuestion ? gray : red,
                        } ]}
                        onPress={this.wrongAnswer}
                    >
                        <Text style={[styles.buttonText, { 
                            // color: red 
                            } ]} > Incorrect </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        disabled={isQuestion} //if is question, disable button
                        style={[styles.button, {
                            // borderColor: green, 
                            backgroundColor: isQuestion ? gray : green, 
                        }]}
                        onPress={this.rightAnswer}
                    >
                        <Text style={[styles.buttonText, {
                            // color: green,
                            }]} > Correct </Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-between'
    },
    questionAnswer: {
        textAlign: 'center',
        fontSize: 40,
    },
    cardContainer: {
        flex: 1, //to make it fill the majority of the space available
        margin: 5,
        marginBottom: 25,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        backgroundColor: white,
    },
    switchButton: {
        alignSelf: 'center',
        backgroundColor: white,
        padding: 10,
        // width: 100,
        borderWidth: 1,
        borderColor: blue,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
    },
    switchButtonText: {
        fontSize: 15,
        color: blue,
    },
    buttonRow: {
        // flex: 1, //making it fill the available content
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginTop: 25,
        // alignItems: 'flex-end',
        // backgroundColor: white,
        
    },
    button: {
        // alignSelf: 'flex-end' , //pushing it to the bottom
        marginTop: 25,
        marginBottom: 25,
        padding: 10,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        // borderWidth: 1,
        // backgroundColor: white,
    },
    buttonText: {
        fontSize: 15,
        color: white,
        padding: 3,
    }



})

// const mapStateToProps = (state) => {
//     return {
//         decks: state.deckReducer,
//     }
// }

export default StartQuiz;



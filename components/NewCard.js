import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, 
    StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import { gray, white, lightBlue, darkBlue } from '../utils/colors';
import { addCardToDeck } from '../utils/asyncDB'

//redux stuff
import { connect } from 'react-redux'
import { addCard } from '../actions'

class NewCard extends Component {

    static navigationOptions = () => {
        return {
            title: 'ADD CARD',
        }
    }

    state = {
        questionInput: '',
        answerInput: '',
    }
    
    handleQuestionTextChange = (question) => {
        this.setState({ questionInput: question})
    }

    handleAnswerTextChange = (answer) => {
        this.setState( { answerInput: answer} )
    }

    submitCard = () => {
        const { questionInput, answerInput } = this.state;
        const { title } = this.props.navigation.state.params;
        const key = title.split(' ').join(''); //taking the spaces out

        if(questionInput.trim() && answerInput.trim()){
            const questionObj = {
                question: questionInput,
                answer: answerInput,
            }
    
            //update redux
            this.props.dispatch(addCard(key, questionObj));
    
            //update DB
            addCardToDeck(key, questionObj); //passing key (which is the title without spaces) and the question and answer pair
    
            //reset state
            this.setState({
                questionInput: '',
                answerInput: '',
            })
    
            this.props.navigation.goBack();
        } else {
            alert('Do not let input fields in blank');
        }
    }

    render() {
        const { questionInput, answerInput } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <TextInput 
                    value={questionInput}
                    placeholder={'Insert a question'}
                    style={styles.textInputStyle}
                    onChangeText={this.handleQuestionTextChange}
                />

                <TextInput 
                    value={answerInput}
                    placeholder={"Insert an answer"}
                    style={styles.textInputStyle}
                    onChangeText={this.handleAnswerTextChange}
                />

                <TouchableOpacity style={styles.submitButton} onPress={this.submitCard}>
                    <Text style={styles.submitButtonText} > Submit </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        )
    }
}

const window = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
    },
    textInputStyle: {
        paddingLeft: 15,
        marginTop: 20,
        height: 50,
        borderColor: gray,
        borderColor: lightBlue ,
        borderWidth: 1,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        width: window.width - 30,
    },
    submitButton: {
        marginTop: 25,
        padding: 10,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        backgroundColor: darkBlue,
    },
    submitButtonText: {
        fontSize: 15,
        color: lightBlue,
        padding: 5,
    }
});

export default connect()(NewCard);

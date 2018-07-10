import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, 
    StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import { gray, white } from '../utils/colors';

class NewCard extends Component {

    //TODO: we might have to add a header title here as ADD CARD 

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

    submitButton = () => {
        const { questionInput, answerInput } = this.state;

        alert('Question: ' + questionInput + '\n\n' + 'Answer: ' + answerInput);
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
                    placeholder={"Insert question's answer"}
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
    //   justifyContent: 'center',
    },
    headline: {
        textAlign: 'center',
        fontSize: 40,
        // marginTop: 15,
    },
    textInputStyle: {
        // flex: 1,
        paddingLeft: 15,
        marginTop: 20,
        height: 50,
        borderColor: gray,
        borderWidth: 1,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        width: window.width - 30,
    },
    submitButton: {
        // alignItems: 'center',
        marginTop: 25,
        padding: 10,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        backgroundColor: 'black',
    },
    submitButtonText: {
        fontSize: 15,
        color: white,
        padding: 5,
    }
});

export default NewCard;

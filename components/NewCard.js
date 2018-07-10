import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, 
    StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import { gray, white } from '../utils/colors';
import { addCardToDeck } from '../utils/asyncDB'

class NewCard extends Component {

    //TODO: we might have to add a header title here as ADD CARD 
    static navigationOptions = ({ navigation }) => {
        // console.log('navigation.state.params', navigation.state)
        // const { title } = navigation.state.params;
        return {
            title: 'ADD CARD', //from nav params (above)
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

        if(questionInput.trim() && answerInput.trim()){
            const questionObj = {
                question: questionInput,
                answer: answerInput,
            }
    
            //update redux
    
            //update DB
            addCardToDeck(title, questionObj)
    
            //reset state
            this.setState({
                questionInput: '',
                answerInput: '',
            })
    
            this.props.navigation.goBack();
        } else {
            alert('Do not let input fields in blank');
        }

        

        // alert('Question: ' + questionInput + '\n\n' + 'Answer: ' + answerInput);
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

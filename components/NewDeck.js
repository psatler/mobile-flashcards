import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, 
    Platform, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native'
import { gray, white } from '../utils/colors';

// const Decks = () => {
class NewDeck extends Component {

    //local state for handling form inputs
    state = {
        input: '',
    }

    handleTextChange = (deckTitle) => {
        this.setState({
            input: deckTitle,
        })
    }

    render() {
        const { input } = this.state;

        //using keyboardAvoidingView to avoid keyboard hiding other views (buttons, textInputs, etc)
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <Text style={styles.headline}> What's is the title of your new deck? </Text>
                <TextInput 
                    value={input}
                    placeholder={'Deck Title'}
                    style={styles.textInputStyle}
                    onChangeText={this.handleTextChange}
                />

                <TouchableOpacity style={styles.submitButton} >
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
      justifyContent: 'center',
    },
    headline: {
        textAlign: 'center',
        fontSize: 40,
        // marginTop: 15,
    },
    textInputStyle: {
        // flex: 1,
        paddingLeft: 15,
        marginTop: 30,
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

export default NewDeck;


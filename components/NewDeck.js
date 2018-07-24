import React, { Component } from 'react'
import { Text, StyleSheet, TextInput, 
    Platform, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native'
import { lightBlue, darkBlue } from '../utils/colors';

import { saveDeckTitle } from '../utils/asyncDB'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

import { ImagePicker, Permissions } from 'expo'

export class NewDeck extends Component { //exporting for testing purposes

    //local state for handling form inputs
    state = {
        input: '',
        image: null, //to store image URI if the user uploads an image
    }

    handleTextChange = (deckTitle) => {
        this.setState({
            input: deckTitle,
        })
    }

    submitDeck = () => {
        const { input, image } = this.state;

        if(input){
            const deck = {
                title: input,
                image: image,
                questions: [],
                createdAt: new Date(),
            }

            const keyTitle = input.split(' ').join(''); //taking out the spaces to store key without'em

            //update redux
            this.props.dispatch(addDeck({ [keyTitle]: deck }));

            //reset state
            this.setState({
                input: '',
                image: null,
            })

            this.props.navigation.navigate('DeckDetail', { //go to details screen of the newly created deck
                deckTitle: deck.title,
                deckLength: deck.questions.length
            })

            //save to DB (async storage)
            saveDeckTitle(keyTitle, deck);
        }
    }

    askPermission = async () => {
        let res = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if(res.status === 'granted'){
            return this.pickImage()
        }
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({ //wait till it resolves
            allowsEditing: true,
            aspect: [4, 3],
        });

        if(result.cancelled){
            return
        }
        else {
            this.setState({ image: result.uri });
        }
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

                <TouchableOpacity style={styles.submitButton} onPress={this.askPermission}>
                    <Text style={styles.submitButtonText} > Open Camera Roll </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.submitButton} onPress={this.submitDeck}>
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
        color: lightBlue,
    },
    textInputStyle: {
        paddingLeft: 15,
        marginTop: 30,
        height: 50,
        borderColor: lightBlue,
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

export default connect()(NewDeck);




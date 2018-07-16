import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, 
    Platform, TouchableOpacity, KeyboardAvoidingView, Dimensions, ImageEditor } from 'react-native'
import { gray, white } from '../utils/colors';

import { saveDeckTitle } from '../utils/asyncDB'
import { connect } from 'react-redux'
import { addDeck } from '../actions'

import { ImagePicker, Permissions } from 'expo'

class NewDeck extends Component {

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

    toHome = () => {
        this.props.navigation.navigate('DeckList')
        // this.props.navigation.dispatch(NavigationActions.back({
        //     key: 'DeckList',
        // }))
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
            })

            //go back to home
            this.toHome(); //which is DeckList component

            //save to DB (async storage)
            saveDeckTitle(keyTitle, deck);
        }

        // alert('This was the input: ' + input);
    }

    askPermission = async () => {
        let res = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        // console.log("Ask Permission Result: ", res)
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
            // ImageEditor.cropImage(result.uri, {
            //     offset: { x: 0, y: 0 },
            //     size: { width: result.width, height: result.height },
            //     displaySize: { width: 200, height: 100 },
            //     resizeMode: 'contain',
            // },
            // (uri) => this.setState({ image: uri }), //passing the modified URI 
            // () => console.log("Error cropping image") 
            // )

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

export default connect()(NewDeck);




import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { purple, orange, white } from '../utils/colors';

class DeckDetail extends Component {
    //dinamically setting specific options for the Stack Navigator
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params;

        return {
            title: deckTitle, //from nav params (above)
            headerStyle: { //style object wrapping the header
                backgroundColor: purple,
            },
            headerTintColor: orange, //the back button and title both use this property
            headerTitleStyle: { //to customize the title
                fontWeight: 'bold',
                color: white,
            }
        }
    }

    render() {
        const { navigation } = this.props;
        const deckTitle = navigation.getParam('deckTitle', 'defaultTitle');

        return (
            <View style={styles.container} >
                <View style={styles.deckInfo} >
                    <Text> {JSON.stringify(deckTitle)} </Text>
                    <Text> {deckTitle} </Text>
                </View>

                <TouchableOpacity style={styles.buttons} >
                    <Text style={styles.addCardButtonText} >Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons} >
                    <Text style={styles.startQuizButtonText} > Start Quiz </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    deckInfo: {
        marginBottom: 50,
        alignItems: 'center',
    },
    buttons: {
        alignItems: 'center',
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        borderColor: 'black',
        margin: 5,
        padding: 10,
        backgroundColor: purple,
        
    },
    addCardButtonText: {
        color: white,
        fontSize: 20,
    },
    startQuizButtonText: {
        color: white,
        fontSize: 20,
    }
})

export default DeckDetail;
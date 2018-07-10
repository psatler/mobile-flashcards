import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { purple, orange, white } from '../utils/colors';

import Deck from './Deck'

import { connect } from 'react-redux'

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

    filterDeck = (deckTitle) => {
        const key = deckTitle.split(' ').join('');
        const { decks } = this.props;
        const deck = decks[key];

        return deck;
    }

    render() {
        const { navigation } = this.props;
        //getting parameters from nav
        const deckTitle = navigation.getParam('deckTitle', 'defaultTitle');
        // const deckLength = navigation.getParam('deckLength', '0');

        // console.log('this.state.deckReducer',this.props.decks)

        const singleDeck = this.filterDeck(deckTitle);

        // const { singleDeck } = this.state.singleDeck

        return (
            <View style={styles.container} >
                <Deck 
                    deckName={singleDeck.title}
                    deckSize={singleDeck.questions.length}
                />

                <TouchableOpacity 
                    style={styles.buttons} 
                    onPress={ () => this.props.navigation.navigate('NewCard', {
                        title: singleDeck.title,
                    }) }    
                >
                    <Text style={styles.addCardButtonText} >Add Card</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.buttons} 
                    onPress={ () => this.props.navigation.navigate('StartQuiz', {
                        deck: singleDeck, //passing the whole deck (title and questions/answers)
                    }) }       
                >
                    <Text style={styles.startQuizButtonText} > Start Quiz </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        decks: state.deckReducer,
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

export default connect(mapStateToProps)(DeckDetail);
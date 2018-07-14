import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Platform, Button } from 'react-native'
import { purple, orange, white, red } from '../utils/colors';
import { deleteDeck } from '../utils/asyncDB'

import Deck from './Deck'

import { connect } from 'react-redux'
import { removeDeck } from '../actions'

class DeckDetail extends Component {
    componentDidMount(){
        //setting this so we can ref the method inside the nav options, being able 
        this.props.navigation.setParams({ handleRemove: this.removeDeck })
    }

    //dinamically setting specific options for the Stack Navigator
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        const { deckTitle } = navigation.state.params;

        return {
            title: deckTitle, //from nav params (above)
            headerRight: (
                <Button
                  onPress={() => params.handleRemove(deckTitle)} //
                  title="Delete"
                  color={white}
                />
              ),
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

    //TODO: make this filter on mapStateToProps
    filterDeck = (deckTitle) => {
        const key = deckTitle.split(' ').join('');
        const { decks } = this.props;
        const deck = decks[key];

        return deck;
    }

    removeDeck = (deckTitle) => {
        const key = deckTitle.split(' ').join('');

        //update redux
        this.props.dispatch(removeDeck(key))

        //delete from DB
        deleteDeck( key )

        //go to main page
        this.props.navigation.navigate('DeckList')
        // this.props.navigation.goBack();
    }

    render() {
        const { navigation } = this.props;
        //getting parameters from nav
        const deckTitle = navigation.getParam('deckTitle', 'defaultTitle');

        const singleDeck = this.filterDeck(deckTitle);

        // console.log('singleDeck', singleDeck)
  
        if(singleDeck === undefined){ //after removing a deck, before going back to main screen, this Component was rendering again, but this time "singleDeck" object is undefined (since it was removed). Therefore, it was causing an error of "Undefined is not an object (evaluating 'singleDeck.title)"
            return (<View></View>)
        }

        return (
            <View style={styles.container} >
                {/* {console.log('BOSTA ###### GRANDE 1')} */}

                <Deck 
                    deckName={singleDeck.title}
                    deckSize={singleDeck.questions.length}
                />
                {/* {console.log('BOSTA ###### GRANDE 2')} */}
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

                {/* <TouchableOpacity 
                    style={styles.buttons} 
                    onPress={ () => this.removeDeck(deckTitle)}       
                >
                    <Text style={styles.startQuizButtonText} > Delete Deck </Text>
                </TouchableOpacity> */}
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
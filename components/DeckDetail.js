import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Platform, Button, Alert } from 'react-native'
import { purple, orange, white, red } from '../utils/colors';
import { deleteDeck } from '../utils/asyncDB'

import Deck from './Deck'

import { connect } from 'react-redux'
import { removeDeck } from '../actions'

class DeckDetail extends Component {
    componentDidMount(){
        //setting this so we can ref the method inside the nav options, being able 
        // this.props.navigation.setParams({ handleRemove: this.removeDeck })
        this.props.navigation.setParams({ handleRemove: this.showDeleteConfirmation })
    }

    //dinamically setting specific options for the Stack Navigator
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        const { deckTitle } = navigation.state.params;

        return {
            title: deckTitle, //from nav params (above)
            headerRight: (
                <Button
                  onPress={() => params.handleRemove(deckTitle)}
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

    showDeleteConfirmation = (deckTitle) => {
        Alert.alert(
            'Delete Deck',
            'Do you really want to delete this deck?',
            [
            //   {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
              {text: 'Cancel', onPress: () => {}, style: 'cancel'},
              {text: 'OK', onPress: () => this.removeDeck(deckTitle)},
            ],
            { cancelable: false }
          )
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
        
        const singleDeck = this.props.deck; //deck filtered in mapStateToProps

        // console.log('singleDeck', singleDeck)
  
        if(singleDeck === undefined){ //after removing a deck, before going back to main screen, this Component was rendering again, but this time "singleDeck" object is undefined (since it was removed). Therefore, it was causing an error of "Undefined is not an object (evaluating 'singleDeck.title)"
            return (<View></View>)
        }

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



const mapStateToProps = (state, { navigation }) => { //passing the state and the current props
    // const deckTitle = navigation.getParam('deckTitle', 'defaultTitle');
    const { deckTitle } = navigation.state.params;
    const key = deckTitle.split(' ').join('');
    return {
        deck: state.deckReducer[key],
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
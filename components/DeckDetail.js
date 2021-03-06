import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native'
import { white, lightBlue, darkBlue } from '../utils/colors';
import { deleteDeck } from '../utils/asyncDB'

import Deck from './Deck'

import { connect } from 'react-redux'
import { removeDeck } from '../actions'

export class DeckDetail extends Component {
    componentDidMount(){
        //setting this so we can ref the method inside the nav options
        this.props.navigation.setParams({ handleRemove: this.showDeleteConfirmation })
    }

    //dinamically setting specific options for the Stack Navigator
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state
        const { deckTitle } = navigation.state.params;

        return {
            title: deckTitle, //from nav params (above)
            headerRight: (
                <TouchableOpacity
                    onPress={() => params.handleRemove(deckTitle)}
                >
                   <Text style={{
                       fontSize: 15,
                       color: white,
                       marginRight: 5,
                   }}> Delete </Text> 

                </TouchableOpacity>
              ),
            headerStyle: { //style object wrapping the header
                backgroundColor: lightBlue,
            },
            headerTintColor: white, //the back button and title both use this property
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
    }

    render() {
        const singleDeck = this.props.deck; //deck filtered in mapStateToProps
  
        if(singleDeck === undefined){ //after removing a deck, before going back to main screen, this Component was rendering again, but this time "singleDeck" object is undefined (since it was removed). Therefore, it was causing an error of "Undefined is not an object (evaluating 'singleDeck.title)", so tha's why this if statement here.
            return (<View></View>)
        }

        return (
            <View style={styles.container} >
                <Deck 
                    deckName={singleDeck.title}
                    deckSize={singleDeck.questions.length}
                    imageURI={singleDeck.image}
                />

                <TouchableOpacity 
                    style={[styles.buttons, {backgroundColor: lightBlue,}]} 
                    onPress={ () => this.props.navigation.navigate('NewCard', {
                        title: singleDeck.title,
                    }) }    
                >
                    <Text style={styles.addCardButtonText} >Add Card</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[styles.buttons, {backgroundColor: darkBlue,}]} 
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

//exporting mapStateToProps to test it (testing passing the store was not working - line 48 of test file)
export const mapStateToProps = (state, { navigation }) => { //passing the state and the current props
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
        borderWidth: 1,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        borderColor: lightBlue,
        margin: 5,
        padding: 10,
        // backgroundColor: lightBlue,
    },
    addCardButtonText: {
        color: white,
        fontSize: 20,
    },
    startQuizButtonText: {
        color: lightBlue,
        fontSize: 20,
    }
})

export default connect(mapStateToProps)(DeckDetail);
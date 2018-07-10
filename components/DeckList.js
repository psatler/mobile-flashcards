import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'

import Deck from './Deck'
import { getDecks } from '../utils/asyncDB'

//redux stuff
import { connect } from 'react-redux'
import { retrieveDecks } from '../actions'

// import { data } from '../utils/mockData'


//DeckList is the main screen (initial route)
class DeckList extends Component {

    state = {
        isLoading: false, //data is not ready yet to be displayed
    }

    componentDidMount(){

        getDecks() //async function to get decks from AsyncStorage 
            .then( (decks) => this.props.dispatch(retrieveDecks(decks)))
            .then( () => {
                // console.log('test das', test);

                this.setState({ isLoading: true })
            }
        )

        // console.log('\n\n datas', data)

        //update redux

    }

    render() {
        const { isLoading } = this.state;
        const { decks } = this.props; // decks come from mapStateToProps

        // console.log('object keys ',Object.keys(decks))
        
        if(!isLoading){
            return (
                // Insert AppLoading Component from Expo here
                <View>
                    <Text>Loading</Text> 
                </View>
            )
        }

        // data is from the mockData array
        return (
            <ScrollView style={styles.container} >
                {Object.keys(decks).map( (key) => {
                    const { title, questions } = decks[key];
                    
                    return (
                        <TouchableOpacity
                            key={key} 
                            onPress={ () => this.props.navigation.navigate('DeckDetail', {
                                deckTitle: title,
                                deckLength: questions.length
                            })}
                        >
                            <Deck 
                                key={key}
                                deckName={title}
                                deckSize={questions.length}
                            />
                        </TouchableOpacity>
                        
                    )
                })}

            </ScrollView>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        decks: state.deckReducer,
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         retrieveDecks: (entries) => dispatch(retrieveDecks(entries)),
//     }
// }

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});

export default connect(mapStateToProps)(DeckList);


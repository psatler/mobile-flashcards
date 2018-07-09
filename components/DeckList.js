import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import Deck from './Deck'
import { retrieveData } from '../utils/asyncDB'
import { data } from '../utils/mockData'


//DeckList is the main screen (initial route)
class DeckList extends Component {

    state = {
        isLoading: false, //data is not ready yet to be displayed
    }

    componentDidMount(){
        //load data from AsyncStorage
        retrieveData()
            // .then( (entries) => dispatch(receiveEntries(entries))) //insert my dispatch function
            .then( (test) => {
                console.log('test das', test);

                this.setState({ isLoading: true })
            }
        )

        console.log('\n\n datas', data)

        //update redux

    }

    render() {
        const { isLoading } = this.state;
        
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
            <View style={styles.container} >
                {Object.keys(data).map( (key) => {
                    const { title, questions } = data[key];
                    
                    return (
                        <TouchableOpacity
                            key={key} 
                            onPress={ () => this.props.navigation.navigate('DeckDetail', {
                                deckTitle: title,
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

            </View>
        )
    }
}

export default DeckList;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});


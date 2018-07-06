import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import Deck from './Deck'

import { data } from '../utils/mockData'



class DeckList extends Component {
    render() {

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


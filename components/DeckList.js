import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Deck from './Deck'

import { data } from '../utils/mockData'



class DeckList extends Component {
    render() {
        // const deckData = data;
        // const deckData = Object.keys(data).map(key => data[key])
        // console.log(deckData)

        return (
            <View style={styles.container} >
                {Object.keys(data).map( (key) => {
                    const { title, questions } = data[key]
                    
                    return (
                        <Deck 
                        key={key}
                        deckName={title}
                        deckSize={questions.length}

                    />
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


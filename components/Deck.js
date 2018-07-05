import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'
import { lightPurp, white, purple } from '../utils/colors';


const Deck = (props) => {
    return (
        <View style={deckContainer}>
            <Text style={deckTitle} >{props.deckName}</Text>
            <Text style={deckSize} >{props.deckSize} cards</Text>
        </View>
    )
}

export default Deck;


const styles = StyleSheet.create({
    deckContainer: {
        // flexDirection: 'row',
        margin: 5,
        padding: 20,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        backgroundColor: purple,
        alignItems: 'center',
    },
    deckTitle: {
        color: white,
        fontWeight: 'bold',
        fontSize: 20,
    },
    deckSize: {
        marginTop: 10,
        color: white,
        fontWeight: 'bold',
        fontSize: 15,
    }
})
const { deckContainer, deckTitle, deckSize } = styles;
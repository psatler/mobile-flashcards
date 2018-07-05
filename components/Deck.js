import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'


const Deck = (props) => {
    return (
        <View >
            <Text >{props.deckName}</Text>
            <Text >{props.deckSize}</Text>
        </View>
    )
}

export default Deck;

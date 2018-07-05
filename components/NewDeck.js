import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

// const Decks = () => {
class NewDeck extends Component {
    render() {
        return (
            <View style={styles.container} >
                <Text> Cu </Text>
            </View>
        )
    }
}

export default NewDeck;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
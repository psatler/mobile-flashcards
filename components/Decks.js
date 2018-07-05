import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Decks = () => {
    return (
        <View style={styles.container} >
            <Text> List of Decks </Text>
        </View>
    ) 
}
// class Decks extends Component {
//     render() {
//         return (
//             <View style={styles.container} >
//                 <Text> List of Decks </Text>
//             </View>
//         )
//     }
// }

export default Decks;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});


import React, { Component } from 'react'
import { Text, View, StyleSheet, Platform, Image } from 'react-native'
import { lightPurp, white, purple, lightBlue, red } from '../utils/colors';
import { Entypo } from '@expo/vector-icons'

const AVATAR_IMAGE_HEIGHT = 40
// const AVATAR_IMAGE_WIDTH = 40

const Deck = (props) => {
    return (
        <View style={deckContainer}>
            <View style={ styles.avatar} >
                <Image 
                    source={ require('../assets/reactNativeWhiteBackground.png')}
                    style={styles.image}
                />
            </View>
            <View style={ styles.deckInfo} >
                <Text style={deckTitle} >{props.deckName}</Text>
                <Text style={deckSize} >{props.deckSize} cards</Text>
            </View>
            <View style={ styles.removeButton} >
                <Entypo name='dots-three-vertical' size={30}  />
            </View>
        </View>
    )
}

export default Deck;


const styles = StyleSheet.create({
    deckContainer: {
        // flex: 1, //uncomment this so in the details screen it takes the whole screen space
        flexDirection: 'row',
        margin: 5,
        padding: 5,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        borderColor: lightBlue,
        borderWidth: 1,
        minHeight: 80,
        // backgroundColor: white,
        // alignItems: 'center',
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    avatar: {
        flex: 0.5,
        // backgroundColor: purple,
        // height: AVATAR_IMAGE_HEIGHT,
        // width: AVATAR_IMAGE_HEIGHT,
        borderRadius: AVATAR_IMAGE_HEIGHT/2, 
        borderColor: lightBlue,
        borderWidth: 1,
        overflow: 'hidden'

    },
    deckInfo: {
        flex: 2,
        alignItems: 'center',
    },
    deckTitle: {
        // color: white,
        fontWeight: 'bold',
        fontSize: 20,
    },
    deckSize: {
        marginTop: 10,
        // color: white,
        fontWeight: 'bold',
        fontSize: 15,
    }, 
    removeButton: { 
        flex: 0.5, 
        // backgroundColor: purple,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
const { deckContainer, deckTitle, deckSize } = styles;
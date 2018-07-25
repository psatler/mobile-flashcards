import React from 'react'
import { Text, View, StyleSheet, Platform, Image } from 'react-native'
import { lightBlue } from '../utils/colors';
import { Entypo } from '@expo/vector-icons'

const AVATAR_IMAGE_HEIGHT = 40

const Deck = (props) => {
    return (
        <View style={deckContainer}>
            <View style={ styles.avatar} >

                <Image 
                    source={props.imageURI ? {uri: props.imageURI } : require('../assets/reactNativeWhiteBackground.png') }
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
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    avatar: {
        flex: 0.5,
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
        fontWeight: 'bold',
        fontSize: 20,
    },
    deckSize: {
        marginTop: 10,
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
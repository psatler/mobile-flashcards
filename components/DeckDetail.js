import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { purple, orange, white } from '../utils/colors';

class DeckDetail extends Component {
    //dinamically setting specific options for the Stack Navigator
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params;

        return {
            title: deckTitle, //from nav params (above)
            headerStyle: { //style object wrapping the header
                backgroundColor: purple,
            },
            headerTintColor: orange, //the back button and title both use this property
            headerTitleStyle: { //to customize the title
                fontWeight: 'bold',
                color: white,
            }
        }
    }

    render() {
        const { navigation } = this.props;
        const deckTitle = navigation.getParam('deckTitle', 'defaultTitle');

        return (
            <View>
                <Text> {JSON.stringify(deckTitle)} </Text>
                <Text> {deckTitle} </Text>
            </View>
        )
    }
}

export default DeckDetail;
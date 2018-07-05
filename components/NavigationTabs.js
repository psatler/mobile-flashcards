import React from 'react';
import { Platform } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

// screens
import DeckList from './DeckList'
import NewDeck from './NewDeck'


const Tabs = createBottomTabNavigator({
    DeckList: {
        screen: DeckList,
        navigationOptions: {
            tabBarLabel: 'Decks',
            tabBarIcon: ({ tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'Add a New Deck',
            tabBarIcon: ({ tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
        }
    }
  })

export default Tabs;
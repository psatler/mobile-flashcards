import React from 'react';
import { Platform } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

// screens
import Decks from './Decks'
import NewDeck from './NewDeck'


const Tabs = createBottomTabNavigator({
    Decks: {
        screen: Decks,
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
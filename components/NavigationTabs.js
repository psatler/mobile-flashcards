import React from 'react';
import { Platform } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

// screens
import DeckList from './DeckList'
import NewDeck from './NewDeck'
import DeckDetail from './DeckDetail'
import { white, purple } from '../utils/colors';


const Tabs = createBottomTabNavigator(
{
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
},
{
    //TODO: put some styles on navigation options
})


const MainNavigator = createStackNavigator(
{
    Home: {
        screen: Tabs, //Tabs navigator component was defined above
        navigationOptions: {
            header: null,
            // headerTintColor: white,
            // headerStyle: {
            //   backgroundColor: purple,
            // }
        }
    },
    DeckDetail: {
        screen: DeckDetail,
    }
},
{
    initialRouteName: 'Home',
    // navigationOptions: { //defining nav options here so we can share style option to more screens
    //     headerStyle: {
    //       backgroundColor: '#f4511e',
    //     },
    //     headerTintColor: '#fff',
    //     headerTitleStyle: {
    //       fontWeight: 'bold',
    //     },
    //   },
})

export default MainNavigator;
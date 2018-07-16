import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

// screens
import DeckList from './DeckList'
import NewDeck from './NewDeck'
import DeckDetail from './DeckDetail'
import NewCard from './NewCard'
import StartQuiz from './StartQuiz'

import { white, lightBlue } from '../utils/colors';


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
        }
    },
    DeckDetail: {
        screen: DeckDetail,
    },
    NewCard: {
        screen: NewCard,
    },
    StartQuiz: {
        screen: StartQuiz,
    }
},
{
    initialRouteName: 'Home',
    navigationOptions: { //defining nav options here so we can share style option to more screens
        headerStyle: {
          backgroundColor: lightBlue,
        },
        headerTintColor: white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
})

export default MainNavigator;
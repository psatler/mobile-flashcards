import React from 'react';
import { Platform } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons'

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
            tabBarIcon: ({ tintColor}) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'Add a New Deck',
            tabBarIcon: ({ tintColor}) => <Entypo name='plus' size={30} color={tintColor} />
        }
    }
},
{
    navigationOptions: {
        header: null,
      },
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? lightBlue : white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? white : lightBlue,
            shadowColor: 'rgba(0,0,0,0.24)',
            shadowOffset: {
            width: 0,
            height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 1,
        }
    }
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
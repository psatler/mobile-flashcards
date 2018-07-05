import { Platform } from 'react-native'
import { TabNavigator } from 'react-navigation'

// screens
import Decks from './Decks'
import NewDeck from './NewDeck'

const Tabs = TabNavigator({
    Decks: {
        screen: Decks,
        navigationOptions: {
            tabBarLabel: 'Decks',
        }
    },
    NewDeck: {
        screen: NewDeck,
        navigationOptions: {
            tabBarLabel: 'Add a New Deck',
        }
    }
})

export default Tabs;
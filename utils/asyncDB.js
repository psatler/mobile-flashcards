import { AsyncStorage } from 'react-native'
import { data } from './mockData'
const FLASHCARDS_DECKS_KEY = 'Flashcards:decks'

const setInitialData = async () => {
    let obj = data;

    await AsyncStorage.setItem(FLASHCARDS_DECKS_KEY, JSON.stringify(obj))
}


export const getDecks = async () => {
    try {
        let value = await AsyncStorage.getItem(FLASHCARDS_DECKS_KEY);
        if( value !== null){ //we have data
            let parsedObj = JSON.parse(value); //parsing back to object
            return parsedObj;
        } else { //if not, we set initial state
            // console.log('setting initial state');
            // setInitialData(); //defined above
            return {} 
        }
    } catch (err) {
        console.log('There was an error retrieving decks from local DB: ', err);
    }
}

export const saveDeckTitle = (keyTitle, deckObj) => {
    try {
        return AsyncStorage.mergeItem(FLASHCARDS_DECKS_KEY, JSON.stringify({
            [keyTitle]: deckObj
        }))
        
    } catch (err) {
        console.log(err);
    }
}

export const addCardToDeck = (deckTitle, card) => {
    const key = deckTitle;

    return getDecks().then( (allDecks) => { //it comes parsed to json already
        const deck = allDecks[key];
        deck.questions.push(card);

        AsyncStorage.setItem(FLASHCARDS_DECKS_KEY, JSON.stringify(allDecks)); //updating 

    })
}


//     return AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
//         .then( (results) => {
//             const allDecks = JSON.parse(results);
//             const deck = allDecks[key];
//             // console.log('addCardToDeck- BEFORE', deck.questions)
//             deck.questions.push(card)
//             // console.log('addCardToDeck', deck.questions)
//             // console.log('allDecks', allDecks)

//             AsyncStorage.setItem(FLASHCARDS_DECKS_KEY, JSON.stringify(allDecks)); //updating 

//         })
        
// }


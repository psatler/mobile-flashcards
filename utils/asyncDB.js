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
            // console.log('decks', value);
            let parsedObj = JSON.parse(value); //parsing back to object
            return parsedObj;
        } else { //if not, we set initial state
            console.log('setting initial state');
            setInitialData(); //defined above
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

    return AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
        .then( (results) => {
            const allDecks = JSON.parse(results);
            const deck = allDecks[key];
            // console.log('addCardToDeck- BEFORE', deck.questions)
            deck.questions.push(card)
            // console.log('addCardToDeck', deck.questions)
            // console.log('allDecks', allDecks)

            AsyncStorage.setItem(FLASHCARDS_DECKS_KEY, JSON.stringify(allDecks)); //updating 

        })
        // const key = deckTitle.split(' ').join('');

}

// 

// const checkIfDataExists = (results) => {
//     return results === null
//       ? setInitialData()
//       : JSON.parse(results)
//   }

// export const retrieveDataFromAsyncStorage = () => {

//     return AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
//         .then(checkIfDataExists)
// }



// _setValue = async () => {
//     try {
//       await AsyncStorage.setItem(STORAGE_KEY, 'true');
//     } catch (error) { // log the error
//     }
//   };

//   _loadInitialState = async () => {
//     try {
//       let value = await AsyncStorage.getItem(STORAGE_KEY);
//       if (value === 'true'){
//         this.setState({loaded: 'true'});
//       } else {
//         this.setState({loaded: 'false'});
//         this._setValue();
//       }
//     } catch (error) {
//       this.setState({loaded: 'false'});
//       this._setValue();
//     }
//   };
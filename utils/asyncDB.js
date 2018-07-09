import { AsyncStorage } from 'react-native'
import { data } from './mockData'
const FLASHCARDS_DECKS_KEY = 'Flashcards:decks'

const setInitialData = async () => {
    let obj = data;

    await AsyncStorage.setItem(FLASHCARDS_DECKS_KEY, JSON.stringify(obj))
}


export const retrieveData = async () => {
    try {
        let value = await AsyncStorage.getItem(FLASHCARDS_DECKS_KEY);
        if( value !== null){ //we have data
            // console.log('decks', value);
            return value;
        } else { //if not, we set initial state
            console.log('setting initial state');
            setInitialData(); //defined above
        }
    } catch (err) {
        console.log('Aconteceu um erro: ', err);
    }
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
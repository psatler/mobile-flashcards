// import { AsyncStorage } from 'react-native'
import { data } from './mockData'
const FLASHCARDS_DECKS_KEY = 'Flashcards:decks'
import { 
    getDecks,
    saveDeckTitle,
    addCardToDeck,
    deleteDeck,
    deleteAllDecks,
} from './asyncDB'


//inspired from https://stackoverflow.com/questions/40952566/how-to-test-async-storage-with-jest with some modifications
jest.mock('react-native', () => {
    const items = {};
    AsyncStorage: {
        setItem: jest.fn( (key, value) => {
            return new Promise( (resolve, reject) => {
                return (typeof key !== 'string' || typeof value !== 'string')
                ? reject(new Error('key and value must be string'))
                : resolve(items[key] = value);
            } ) 
        });

        getItem: jest.fn( (key) => {
            return new Promise( (resolve) => {
                return items.hasOwnProperty(key) ? resolve(items[key]) : resolve(null)
            })
        });

    };
    

})



// class MockStorage {
//     constructor(cache = {}) {
//       this.storageCache = cache;
//     }
  
//     setItem = jest.fn((key, value) => {
//       return new Promise((resolve, reject) => {
//         return (typeof key !== 'string' || typeof value !== 'string')
//           ? reject(new Error('key and value must be string'))
//           : resolve(this.storageCache[key] = value);
//       });
//     });
  
//     getItem = jest.fn((key) => {
//       return new Promise((resolve) => {
//         return this.storageCache.hasOwnProperty(key)
//           ? resolve(this.storageCache[key])
//           : resolve(null);
//       });
//     });
  
//     removeItem = jest.fn((key) => {
//       return new Promise((resolve, reject) => {
//         return this.storageCache.hasOwnProperty(key)
//           ? resolve(delete this.storageCache[key])
//           : reject('No such key!');
//       });
//     });
  
//     clear = jest.fn((key) => {
//       return new Promise((resolve, reject) =>  resolve(this.storageCache = {}));
//     });
  
//     getAllKeys = jest.fn((key) => {
//       return new Promise((resolve, reject) => resolve(Object.keys(this.storageCache)));
//     });
// }

// const storageCache = {};
// const AsyncStorage = new MockStorage(storageCache);

// jest.setMock('AsyncStorage', AsyncStorage)



describe('[Async Storage] Testing ', () => {
    // const { AsyncStorage } = require('react-native');

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should set initial data', async () => {
        const decks = await getDecks();
        expect(decks).toBe(data);
        // await AsyncStorage.setItem(FLASHCARDS_DECKS_KEY, JSON.stringify(data))
        // const value = await AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
        // expect(JSON.parse(value)).toEqual(data)
    })
});
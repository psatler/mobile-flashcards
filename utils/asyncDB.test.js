import { AsyncStorage } from 'react-native'
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
    const mockData = {
        React: {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            },
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event'
            }
          ]
        },
        JavaScript: {
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
          ]
        }
      }

    return {
        AsyncStorage: {
            setItem: jest.fn( (key, value) => {
                return new Promise( (resolve, reject) => {
                    return (typeof key !== 'string' || typeof value !== 'string')
                    ? reject(new Error('key and value must be string'))
                    : resolve(items[key] = value);
                } ) 
            }),
    
            getItem: jest.fn( (key) => {
                return new Promise( (resolve) => {
                    return resolve(JSON.stringify(mockData)) //directly making it return the mockData object
                    // return items.hasOwnProperty(key) ? resolve(items[key]) : resolve(null)
                })
            }),

            // mergeItem: jest.fn( (key, obj) => {
            //     return new Promise( (resolve, reject) => {
            //         resolve()
            //     })
            // })
    
        },
    }
})


describe('[Async Storage] Testing ', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should set initial data', async () => {
        const decks = await getDecks();
        expect(decks).toEqual(data);
        // await AsyncStorage.setItem(FLASHCARDS_DECKS_KEY, JSON.stringify(data))
        // const value = await AsyncStorage.getItem(FLASHCARDS_DECKS_KEY)
        // expect(JSON.parse(value)).toEqual(data)
    })

});




//inspired from https://stackoverflow.com/questions/40952566/how-to-test-async-storage-with-jest with some modifications


//## a sligthly different approach
// jest.mock('react-native', () => {
//     const reactNative = require.requireActual('react-native');
//     const items = {};

//     return {
//         AsyncStorage: {
//             setItem: jest.fn( (key, value) => {
//                 return new Promise( (resolve, reject) => {
//                     return (typeof key !== 'string' || typeof value !== 'string')
//                     ? reject(new Error('key and value must be string'))
//                     : resolve(items[key] = value);
//                 } ) 
//             }),
    
//             getItem: jest.fn( (key) => {
//                 return new Promise( (resolve) => {
//                     return items.hasOwnProperty(key) ? resolve(items[key]) : resolve(null)
//                 })
//             }),
    
//         },
//         ...reactNative,
//     }

// })















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
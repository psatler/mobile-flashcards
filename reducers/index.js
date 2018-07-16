import { combineReducers } from 'redux' //in case there is more than one reducer
import { 
    RETRIEVE_DECKS,
    ADD_DECK,
    ADD_CARD,
    REMOVE_DECK,
    REMOVE_ALL_DECKS,
} from '../actions'

const deckInit = {};
const deckReducer = (state = deckInit, action) => {
    switch(action.type){
        case RETRIEVE_DECKS:
            // console.log('RETRIEVE_DECKS', action.payload)
            return {
                ...state,
                ...action.payload,
            }

        case ADD_DECK:
            // const key = action.key;
            return {
                ...state,
                ...action.payload, //which is a single deck object
            }

        case ADD_CARD:
            const key = action.title;
            const newQuestion = action.payload;
            // console.log('state', state)
            const title = state[key].title; //title without space modification
            const deckQuestions = state[key].questions.concat(newQuestion);
            const imageURI = state[key].image;
            const dataOfCreation = state[key].createdAt;
            // deck.questions.concat(newQuestion);
            
            return {
                ...state,
                [key]: {
                    title,
                    questions: deckQuestions,
                    image: imageURI,
                    createdAt: dataOfCreation,
                }
            }
        
        case REMOVE_DECK:
            const keyToBeRemoved = action.payload;
            const newObj = Object.keys(state).filter( key => key !== keyToBeRemoved )
                .reduce( (obj, key) => {
                    return {
                        ...obj,
                        [key]: state[key],
                    }
                }, {});

            return {
                ...newObj
            }

        case REMOVE_ALL_DECKS:
            const empty = {}

            return empty;

        default:
            return state;
    }
}

export default combineReducers({
    deckReducer,
})
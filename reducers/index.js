import { combineReducers } from 'redux' //in case there is more than one reducer
import { 
    RETRIEVE_DECKS,
    ADD_DECK, } from '../actions'

const deckInit = {};
const deckReducer = (state = deckInit, action) => {
    switch(action.type){
        case RETRIEVE_DECKS:
            console.log('RETRIEVE_DECKS', action.payload)
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

        default:
            return state;
    }
}

export default combineReducers({
    deckReducer,
})
import { combineReducers } from 'redux' //in case there is more than one reducer
import { RETRIEVE_DECKS } from '../actions'

const deckInit = {};
const deckReducer = (state = deckInit, action) => {
    switch(action.type){
        case RETRIEVE_DECKS:
            console.log('RETRIEVE_DECKS', action.payload)
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}

export default combineReducers({
    deckReducer,
})
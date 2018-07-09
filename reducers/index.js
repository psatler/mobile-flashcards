import { combineReducers } from 'redux' //in case there is more than one reducer

const deckInit = [];
const deckReducer = (state = deckInit, action) => {
    switch(action.type){

        default:
            return state;
    }
}

export default combineReducers({
    deck: deckReducer,
})
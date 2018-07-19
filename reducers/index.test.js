import { 
    RETRIEVE_DECKS,
    ADD_DECK,
    ADD_CARD,
    REMOVE_DECK,
    REMOVE_ALL_DECKS,
} from '../actions'

import { deckReducer } from './'

describe('Deck Reducer', () => {
    it('should handle initial state', () => {

        expect(deckReducer(undefined, { })) //reducer receiving nothing, with an empty action
            .toEqual({ }); //to equal empty
    })
})
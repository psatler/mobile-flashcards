import { data } from '../utils/mockData'
import { 
    RETRIEVE_DECKS,
    ADD_DECK,
    ADD_CARD,
    REMOVE_DECK,
    REMOVE_ALL_DECKS,
} from '../actions'

import { deckReducer } from './'

const newDeck = {"newDeck": {"questions": [], "title": "new Deck"}}
const newCardObj = {
    question: "This is a test question",
    answer: "This is a test answer",
}

describe('Deck Reducer', () => {
    it('should handle initial state', () => {

        expect(deckReducer(undefined, { })) //reducer receiving nothing, with an empty action
            .toEqual({ }); //to equal empty
    });

    it('should handle REMOVE_ALL_DECKS action', () => {
        expect(deckReducer({}, {
            type: REMOVE_ALL_DECKS,
        })).toEqual( {} );
    });

    it('should handle RETRIEVE_DECKS action', () => {

        expect(deckReducer( {}, {
            type: RETRIEVE_DECKS,
            payload: data,
        })).toEqual( {
            ...data,
        });
    });

    it('should handle ADD_DECK action', () => {
        expect(deckReducer( {}, {
            type: ADD_DECK,
            payload: newDeck,
        })).toEqual({
            ...newDeck,
        })
    });

    it('should handle ADD_CARD action', () => {

        expect(deckReducer( { ...newDeck }, {
            type: ADD_CARD,
            payload: newCardObj,
            title: "newDeck" , //inserting in the newDeck const above to match snapshot
        }))
        .toMatchSnapshot(); //so it iniatially has no cards. Afterwards, it'll have one (newCardObj)
    });

    it('should handle REMOVE_DECK action', () => {

        expect(deckReducer( { ...data }, {
            type: REMOVE_DECK,
            payload: "React", 
        }))
        .toMatchSnapshot(); //it should remove the "React" deck from the mockData
    });
})
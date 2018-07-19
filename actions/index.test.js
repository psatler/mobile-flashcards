import { data } from '../utils/mockData'
import * as actions from './'

const singleDeck = data['JavaScript']; //getting the javascript deck from mockData file
const newCardObj = {
    question: "This is a test question",
    answer: "This is a test answer",
}


describe('Action Creators', () => {

    it('retrieveDecks should dispatch a RETRIEVE_DECKS action', () => {
        expect(actions.retrieveDecks(data))
            .toEqual({
                type: actions.RETRIEVE_DECKS,
                payload: data,
            })
    });

    it('addDeck should dispatch an ADD_DECK action', () => {
        expect(actions.addDeck(singleDeck))
            .toMatchSnapshot();
    });

    it('addCard should dispatch an ADD_CARD action', () => {
        expect(actions.addCard('ExampleKeyTitle', newCardObj))
            .toMatchSnapshot();
    });

    it('removeDeck should dispatch a REMOVE_DECK action', () => {
        expect(actions.removeDeck('KeyToBeRemoved'))
            .toEqual({
                type: actions.REMOVE_DECK,
                payload: 'KeyToBeRemoved',
            })
    });

    it('removeAllDecks should dispatch a REMOVE_ALL_DECKS action', () => {
        expect(actions.removeAllDecks())
            .toEqual({
                type: actions.REMOVE_ALL_DECKS,
            })
    })
})
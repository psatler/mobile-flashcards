//actions
export const RETRIEVE_DECKS = 'RETRIEVE_DECKS'
export const ADD_DECK = 'ADD_DECK'


//actions creators
export const retrieveDecks = (decks) => {
    return {
        type: RETRIEVE_DECKS,
        payload: decks,
    }
}

export const addDeck = (deck) => {
    return {
        type: ADD_DECK,
        payload: deck,
    }
}
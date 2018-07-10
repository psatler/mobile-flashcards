//actions
export const RETRIEVE_DECKS = 'RETRIEVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'



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

export const addCard = (title, card) => {
    return {
        type: ADD_CARD,
        payload: card,
        title,
    }
}
//actions
export const RETRIEVE_DECKS = 'RETRIEVE_DECKS'


//actions creators
export const retrieveDecks = (decks) => {
    return {
        type: RETRIEVE_DECKS,
        payload: decks,
    }
}
export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const ADD_DECK = "ADD_DECK";
export const STUDIED_TODAY = "STUDIED_TODAY";
export const ADD_QUESTION = "ADD_QUESTION";


export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck
  };
}

export function addQuestionk(question) {
  return {
    type: ADD_QUESTION,
    question
  };
}


export function setStudiedToday(studiedToday) {
  return {
    type: STUDIED_TODAY,
    studiedToday
  };
}

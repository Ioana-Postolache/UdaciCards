import {
  RECEIVE_DECKS,
  ADD_DECK,
  STUDIED_TODAY,
  ADD_QUESTION,
  REMOVE_DECK
} from "../actions";
import { combineReducers } from "redux";

export function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return action.decks;
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
      };
    case REMOVE_DECK:

      const key = action.deckId.deckId;
      console.log(REMOVE_DECK, JSON.stringify(key));
      return { ...state, [key]: null };

    case ADD_QUESTION:
      const { deckId, questionBody } = action.question;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: state[deckId].questions.concat(questionBody)
        }
      };
    default:
      return state;
  }
}

export function studiedToday(state = {}, action) {
  switch (action.type) {
    case STUDIED_TODAY:
      return action.studiedToday;
    default:
      return state;
  }
}

export default combineReducers({
  decks,
  studiedToday
});

import { RECEIVE_DECKS, ADD_DECK, STUDIED_TODAY } from "../actions";
import { combineReducers } from "redux";

export function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      console.log(
        "\n",
        RECEIVE_DECKS,
        JSON.stringify(Object.keys(action.decks).length),
        "\n"
      );
      return action.decks;
    case ADD_DECK:
      return {
        ...state,
        ...action.deck
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

import { AsyncStorage } from "react-native";
import { DECK_STORAGE_KEY, setDummyData } from "./_decks";
import { STUDIED_TODAY_KEY, setStudiedToday } from "./_studiedToday";

export function fetchDecks() {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(setDummyData());
}

export function submitDeck(title, deck) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [title]: deck
    })
  );
}

export function addQuestionToDeck(question) {
  const { deckId, questionBody } = question;
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    decks = JSON.parse(results);
    return {
      ...decks,
      [deckId]: {
        ...decks[deckId],
        questions:
          decks[deckId].questions === undefined
            ? [questionBody]
            : [...decks[deckId].questions.concat(questionBody)]
      }
    };
  });
}

export function removeDeck(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
    const data = JSON.parse(results);
    data[title] = undefined;
    delete data[title];
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
  });
}

export function submitStudiedToday(studiedToday) {
  return AsyncStorage.setItem(STUDIED_TODAY_KEY, JSON.stringify(studiedToday));
}

export function fetchStudiedToday() {
  return AsyncStorage.getItem(STUDIED_TODAY_KEY).then(setStudiedToday());
}

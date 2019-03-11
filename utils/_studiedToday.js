import { AsyncStorage } from "react-native";

export const STUDIED_TODAY_KEY = "MobileFlashcards:studiedToday";

export function setStudiedToday() {
  let studiedToday = { studiedToday: false };
  AsyncStorage.setItem(STUDIED_TODAY_KEY, JSON.stringify(studiedToday));

  return studiedToday;
}

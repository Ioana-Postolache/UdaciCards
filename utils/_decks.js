import { AsyncStorage } from "react-native";

export const DECK_STORAGE_KEY = "MobileFlashcards:decks";

export function setDummyData() {
  let dummyData = {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces"
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event"
        }
      ]
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared."
        }
      ]
    }
  };

  console.log("dummyData...", JSON.stringify(Object.keys(dummyData).length));
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(dummyData), () => {
    AsyncStorage.getItem(DECK_STORAGE_KEY, (err, result) => {
      console.log("result...", result);
    });
  });

  return dummyData;
}

# UdaciCards
 Mobile application that allows users to study collections of flashcards.

## Start Project
After adding the dependencies (by running "npm  install"), the app can be launched by running "npm start". It can be run with Expo https://docs.expo.io/versions/latest/.

## Tested Platforms
The app was created using create-react-native-app and tested on an Android emulator.

## General description
The app allows users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.
Logic for notification has been implemented. Notifications are generated at a specific time if the user hasn't completed at least one quiz for that day.

## DeckList
The primary view, seen when the app loads, is a list of created decks which includes the name of each deck and the number of cards.
Pressing on a deck in the list should generate an animation, and the app should route to an individual deck view.

## IndividualDeck
The individual deck view includes :

- The deck title
- Number of cards in the deck
- Option to start a quiz for that deck
- Option to add a new question to the deck

Pressing the 'Start Quiz' or 'Add Card' button routes to the views for those activities.

## NewDeck
The view includes a form for creating a new deck - which is an input for the title and a 'Create Deck' button.
Pressing the button creates the deck and routes the user to the Individual Deck view for the new deck.

## Quiz
The Quiz view starts with a question from the selected deck.
The question is displayed, along with a button to show the answer.
Pressing the 'Show Answer' button displays the answer.
Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'
The view displays the number of questions remaining.
When the last question is answered, a score is displayed as a percentage of correct answers.
When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
Both the 'Restart Quiz' and 'Back to Deck' buttons route to their respective views.

## NewQuestion
The New Question view includes a form with fields for a question and answer, and a submit button.
Submitting the form adds the question to the deck.

import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { deleteDeck } from "../actions";
import { removeDeck } from "../utils/api";
import { getDailyReminderValue } from "../utils/helpers";
import TextButton from "./TextButton";
import DeckViewDetails from "./DeckViewDetails";
import { gray, white, purple } from "../utils/colors";

ActionButton = ({ action, label, key }) => {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
      onPress={action}
    >
      <Text style={styles.submitBtnText}>{label}</Text>
    </TouchableOpacity>
  );
};

class IndividualDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params;

    return {
      title: deckId
    };
  };
  deleteDeck = deckId => {
    const { dispatch } = this.props;
    dispatch(
      deleteDeck({
        deckId
      })
    );
    this.goBack();
    removeDeck(deckId);
  };
  goBack = () => this.props.navigation.goBack();

  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== null;
  }

  render() {
    const { deck } = this.props;

    const key = deck.title;
    return (
      <View style={styles.container}>
        <DeckViewDetails
          deckId={deck.title}
          questionsLength={deck.questions.length}
        />
        <ActionButton
          action={() => {
            return this.props.navigation.navigate("NewQuestion", {
              deckId: key
            });
          }}
          label={"ADD CARD"}
        />
        <ActionButton
          action={() => {
            return this.props.navigation.navigate("Quiz", {
              deckId: key
            });
          }}
          label={"START QUIZ"}
        />
        <ActionButton
          action={() => this.deleteDeck(key)}
          label={"DELETE DECK"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
    justifyContent: "space-around"
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: "center"
  },
  item: {
    fontSize: 40,
    textAlign: "center"
  },
  questions: {
    fontSize: 25,
    textAlign: "center",
    color: gray
  }
});

function mapStateToProps({ decks }, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: decks[deckId]
  };
}

export default connect(mapStateToProps)(IndividualDeck);

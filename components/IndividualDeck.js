import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import { removeDeck } from "../utils/api";
import { getDailyReminderValue } from "../utils/helpers";
import TextButton from "./TextButton";
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

  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.item}>{deck.title}</Text>
        <Text style={styles.questions}>{deck.questions.length} questions</Text>
        <ActionButton action={() =>
          (this.props.navigation.navigate("NewQuestion"))} label={"ADD CARD"}/>
        <ActionButton action={this.startQuiz} label={"START QUIZ"} />
        <ActionButton action={this.deleteDeck} label={"DELETE DECK"} />
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

function mapDispatchToProps(dispatch, { navigation }) {
  const { deckId } = navigation.state.params;
  return {
    remove: () =>
      dispatch(
        addDeck({
          [deckId]: timeToString() === deckId ? getDailyReminderValue() : null
        })
      ),
    goBack: () => navigation.goBack()
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndividualDeck);

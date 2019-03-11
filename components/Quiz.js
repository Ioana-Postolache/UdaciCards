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

class Quiz extends Component {
  state = {
    questionIndex: 0,
    side: "question"
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz"
    };
  };

  goBack = () => this.props.navigation.goBack();

  render() {
    const { questions, title } = this.props.deck;
    const len = questions.length;
    const { questionIndex } = this.state;

    if (len === 0) {
      <Text style={styles.item}>
        Sorry, there are no cards in this deck. Add some cards to this deck and
        then start the quiz.
      </Text>;
    }

    return (
      <View style={styles.container}>
        {
          <Text style={styles.item}>
            {this.state.side === "question"
              ? questions[questionIndex].question
              : questions[questionIndex].answer}
          </Text>
        }
        <ActionButton
          action={() => {
            return this.setState(prevState => {
              if ((prevState.side === "question")) {
                return { side: "answer" };
              }
              return { side: "question" };
            });
          }}
          label={
            this.state.side === "question" ? "SHOW ANSWER" : "SHOW QUESTION"
          }
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

export default connect(mapStateToProps)(Quiz);

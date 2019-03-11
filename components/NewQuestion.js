import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  TextInput
} from "react-native";
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification
} from "../utils/helpers";
import { Ionicons } from "@expo/vector-icons";
import { addQuestionToDeck } from "../utils/api";
import { connect } from "react-redux";
import { addQuestion } from "../actions";
import HeaderView from "./HeaderView";
import { purple, white, gray } from "../utils/colors";
import { NavigationActions } from "react-navigation";

function SubmitBtn({ onPress, disabled }) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={
        disabled
          ? { backgroundColor: gray }
          : Platform.OS === "ios"
          ? styles.iosSubmitBtn
          : styles.AndroidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>ADD QUESTION</Text>
    </TouchableOpacity>
  );
}

class NewQuestion extends Component {
  state = {
    question: "",
    answer: ""
  };

  submit = () => {
    const { question, answer } = this.state;

    const deckId = this.props.deck.title;
    console.log("NewQuestion deckId", deckId);
    const q = {
      deckId,
      questionBody: { question, answer }
    };
    this.props.dispatch(
      addQuestion(q)
    );

    this.setState(() => ({ question: "", answer: "" }));

    this.toHome();

    addQuestionToDeck({
      deckId,
      questionBody: { question, answer }
    });
  };

  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back({ key: "NewQuestion" })
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <HeaderView headerText={"New Question"} />
        <View style={styles.stretch}>
          <TextInput
            style={styles.txtInput}
            placeholder="Question"
            placeholderTextColor={gray}
            onChangeText={question => this.setState({ question })}
            value={this.state.question}
          />
          <TextInput
            style={styles.txtInput}
            placeholder="Answer"
            placeholderTextColor={gray}
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
          />
        </View>
        <SubmitBtn
          onPress={this.submit}
          disabled={
            this.state.answer !== "" && this.state.question !== ""
              ? false
              : true
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
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
  stretch: {
    flex: 1,
    alignItems: "stretch",
    marginLeft: 30,
    marginRight: 30,
    padding: 30
  },
  txtInput: {
    margin: 5,
    padding: 5,
    borderWidth: 2,
    fontSize: 20,
    borderRadius: 5
  }
});

function mapStateToProps({ decks }, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: decks[deckId]
  };
}
export default connect(mapStateToProps)(NewQuestion);

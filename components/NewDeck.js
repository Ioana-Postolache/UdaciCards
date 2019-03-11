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
import { submitDeck } from "../utils/api";
import { connect } from "react-redux";
import { addDeck } from "../actions";
import HeaderView from "./HeaderView";
import { purple, white, gray } from "../utils/colors";
import { NavigationActions } from "react-navigation";

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={
        Platform.OS === "ios" ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>CREATE DECK</Text>
    </TouchableOpacity>
  );
}

class NewDeck extends Component {
  state = {
    title: "",
    questions: []
  };

  submit = () => {
    const deck = this.state;
    const title = this.state.title;

    this.props.dispatch(
      addDeck({
        [title]: deck
      })
    );

    this.setState(() => ({ title: "" }));

    this.toHome();

    submitDeck(title, deck);
  };

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: "NewDeck" }));
  };
  render() {
    return (
      <View style={styles.container}>
        <HeaderView headerText={"New Deck"} />
        <View style={styles.stretch}>
          <Text style={styles.question}>
            What is the title of your new deck?
          </Text>
          <TextInput
            style={styles.txtInput}
            placeholder = "Deck Name"
            placeholderTextColor = {gray}
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
        </View>
        <SubmitBtn onPress={this.submit} />
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
    alignItems: 'stretch',
    marginLeft: 30,
    marginRight: 30,
    padding: 30
  },
  question: {
    fontSize: 25,
    textAlign: "center"
  },
  txtInput: {
    margin: 5,
    padding: 5,
    borderWidth: 2,
    fontSize: 20,
    borderRadius: 5
  }
});

export default connect()(NewDeck);

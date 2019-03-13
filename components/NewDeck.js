import React, { Component } from "react";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  StyleSheet,
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
import { white, gray } from "../utils/colors";
import { NavigationActions } from "react-navigation";
import  ActionButton from "./ActionButton";


class NewDeck extends Component {
  state = {
    title: "",
    questions: []
  };

  submit = () => {
    const deck = this.state;
    const title = this.state.title;

    if(!title) {
    return alert("Please add the deck name")
   }

    this.props.dispatch(
      addDeck({
        [title]: deck
      })
    );

    this.setState(() => ({ title: "" }));

    this.toIndividualDeck(title);

    submitDeck(title, deck);
  };

  toIndividualDeck = (key) => {
    return this.props.navigation.navigate("IndividualDeck", {
      deckId: key
    })
  };
  render() {
    return (
      <KeyboardAvoidingView  style={styles.container} behavior="padding" enabled>
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
        <ActionButton label={"CREATE DECK"} onPress={this.submit} />
      </KeyboardAvoidingView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
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

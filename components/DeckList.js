import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Animated
} from "react-native";
import { connect } from "react-redux";
import { receiveDecks, addDeck, setStudiedToday } from "../actions";
import { getDailyReminderValue } from "../utils/helpers";
import { fetchDecks, fetchStudiedToday } from "../utils/api";
import { white, purple, gray, lightPurp } from "../utils/colors";
import HeaderView from "./HeaderView";
import { AppLoading } from "expo";

class DeckList extends Component {
  state = {
    ready: false,
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks()
      .then(decks => dispatch(receiveDecks(JSON.parse(decks))))
      .then(() => fetchStudiedToday())
      .then(studiedToday => dispatch(setStudiedToday(JSON.parse(studiedToday))))
      .then(studiedToday => {
        if (!studiedToday) {
          return getDailyReminderValue();
        }
      })

      .then(() => this.setState({ ready: true }));
  }

  render() {
    const { studiedToday, decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }
    return (
      <ScrollView style={styles.container}>
        <HeaderView headerText={"Deck List"} />
        <View style={styles.stretch}>
          {Object.keys(decks).length !== 0 ? (
            Object.keys(decks).map(key => {
              return decks[key] !== null ? (
                <TouchableOpacity
                  style={styles.deck}
                  key={key}
                  onPress={() =>{
                    Animated.timing(this.state.opacity, {toValue: 1, duration: 1000})
                    return this.props.navigation.navigate("IndividualDeck", {
                      deckId: key
                    })}
                  }
                >
                  <Text style={styles.item}>{key}</Text>
                  <Text style={styles.questions}>
                    {decks[key].questions.length} questions
                  </Text>
                </TouchableOpacity>
              ) : null;
            })
          ) : (
            <Text style={styles.item}>DeckList</Text>
          )}
        </View>
      </ScrollView>
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
    alignItems: "stretch",
    marginLeft: 30,
    marginRight: 30,
    padding: 30
  },
  item: {
    fontSize: 25,
    textAlign: "center"
  },
  questions: {
    fontSize: 10,
    textAlign: "center",
    color: gray
  },
  deck: {
    backgroundColor: white,
    borderRadius: Platform.OS === "ios" ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: "center",
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: "rgba(0,0,0,24)",
    shadowOffset: {
      width: 0,
      height: 1
    }
  }
});

function mapStateToProps(state) {
  const { decks, studiedToday } = state;

  return {
    decks,
    studiedToday
  };
}
export default connect(mapStateToProps)(DeckList);

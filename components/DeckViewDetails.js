import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { gray } from "../utils/colors";

export default function DeckViewDetails({ deckId, questionsLength }) {
  return (
    <View>
      <Text style={styles.item}>{deckId}</Text>
      <Text style={styles.questions}>{questionsLength} questions</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    fontSize: 25,
    textAlign: "center"
  },
  questions: {
    fontSize: 10,
    textAlign: "center",
    color: gray
  }
});

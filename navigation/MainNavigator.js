import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { purple, white } from "../utils/colors";
import DeckList from "../components/DeckList";
import IndividualDeck from "../components/IndividualDeck";
import NewQuestion from "../components/NewQuestion";
import NewDeck from "../components/NewDeck";
import Quiz from "../components/Quiz";
import { Platform } from "react-native";

const Tabs = createBottomTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "DeckList",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "NewDeck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs
  },
  IndividualDeck: {
    screen: IndividualDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  NewQuestion: {
    screen: NewQuestion,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
});

export default MainNavigator;

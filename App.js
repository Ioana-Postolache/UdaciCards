import React from "react";
import { View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { purple } from "./utils/colors";
import { Constants } from "expo";
import MainNavigator from './navigation/MainNavigator';
import { setLocalNotification } from "./utils/helpers";

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

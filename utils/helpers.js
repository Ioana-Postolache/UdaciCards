import React from "react";
import { View, AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const TEST_KEY = "MobileFashcards:notifications";

export function getDailyReminderValue() {
  return {
    today: "👋 Don't forget to study today!"
  };
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(TEST_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

function createNotification() {
  return {
    title: "Study today!",
    body: "👋 don't forget to study today!",
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true
    }
  };
}

export function setLocalNotification() {
  console.log("trying to set local notification");
  AsyncStorage.getItem(TEST_KEY)
    .then(JSON.parse)
    .then(data => {
      console.log("this is the data ", data);
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          console.log("this is the status ", status);
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(18);
            tomorrow.setMinutes(36);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: tomorrow,
              repeat: "day"
            });

            AsyncStorage.setItem(TEST_KEY, JSON.stringify(true)).then(  console.log("local notification set to true"));
          }
        });
      }
    });
}

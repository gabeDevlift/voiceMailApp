import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Welcome from '@screens/Welcome/Welcome';
import EnterPassCode from '@screens/EnterPassCode/EnterPassCode';
import Inbox from '@screens/Inbox/Inbox';
import Card from '@screens/Inbox/Card';

const AppNavigator = createStackNavigator(
  {
    Welcome,
    EnterPassCode,
    Inbox,
    Card
  },
  {
    initialRouteName: "Inbox"
  }
);

export default createAppContainer(AppNavigator);
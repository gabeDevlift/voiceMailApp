import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Welcome from '@screens/Welcome/Welcome';
import EnterPassCode from '@screens/EnterPassCode/EnterPassCode';
import Inbox from '@screens/Inbox/index';

const AppNavigator = createStackNavigator(
  {
    Welcome,
    EnterPassCode,
    Inbox
  },
  {
    initialRouteName: "Welcome"
  }
);

export default createAppContainer(AppNavigator);
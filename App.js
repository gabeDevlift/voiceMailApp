import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Welcome from '@screens/Welcome/index';
import EnterPassCode from '@screens/EnterPassCode/index';
import Inbox from '@screens/Inbox/index';

const AppNavigator = createStackNavigator(
  {
    Welcome,
    EnterPassCode,
    Inbox
  },
  {
    initialRouteName: "Inbox"
  }
);

export default createAppContainer(AppNavigator);
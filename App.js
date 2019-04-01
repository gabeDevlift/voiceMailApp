import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Welcome from '@screens/Welcome/Welcome';
import EnterPassCode from '@screens/EnterPassCode/EnterPassCode';
import MainStack from '@screens/MainStack';
import Inbox from '@screens/Inbox/index';
import Trash from '@screens/Trash/index';

const AppNavigator = createStackNavigator(
  {
    Welcome,
    EnterPassCode,
    MainStack,
    Inbox,
    Trash
  },
  {
    initialRouteName: "MainStack"
  }
);

export default createAppContainer(AppNavigator);
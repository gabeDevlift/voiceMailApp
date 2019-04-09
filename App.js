import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Welcome from '@screens/Welcome/Welcome';
import EnterPassCode from '@screens/EnterPassCode/EnterPassCode';
import MainStack from '@screens/MainStack';
import Inbox from '@screens/Inbox/index';
import Trash from '@screens/Trash/index';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducer';
const store = createStore(reducer);

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

let Navigation = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
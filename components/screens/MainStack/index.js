import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'; // Note that we use createMaterialTopTabNavigator because createTabNavigator is deprecated and createBottomTabNavigator does not support animation (screens sliding in when you switch tabs)
import stylesFile from './styles';
import { cloneDeep } from 'lodash';
import Inbox from '@screens/Inbox/index';
import Favourites from '@screens/Favourites/index';
import Archive from '@screens/Archive/index';
import Trash from '@screens/Trash/index';
import DrawerLayout from 'react-native-drawer-layout';

const styles = cloneDeep(stylesFile);

const TabNavigator = createMaterialTopTabNavigator(
    // RouteConfigs - Screens at each tab
    {
      'Inbox': { screen: Inbox },
      'Favourites': { screen: Favourites },
      'Archive': { screen: Archive },
      'Trash': { screen: Trash },
    },
    // StackNavigatorConfig - Configuration of navigator
    {
      // navigationOptions: function that takes as input an object with property 'navigation' that has property 'state' that tracks which tab is currently selected, and returns object containing all tab navigator configuration details.
      defaultNavigationOptions: ({ navigation }) => ({
        // tabBarIcon: function that returns icon for each tab
        tabBarIcon: ({ focused }) => {
          let icon;
          // For each tab, set 'icon' to be focused image if tab is selected, and unfocused otherwise
          switch (navigation.state.routeName) {
            case 'Inbox':
              icon = focused ? require('@images/phone-incoming.png') : require('@images/phone-incoming.png');
              break;
            case 'Favourites':
              icon = focused ? require('@images/star.png') : require('@images/star.png');
              break;
            case 'Archive':
              icon = focused ? require('@images/archive.png') : require('@images/archive.png');
              break;
            case 'Trash':
              icon = focused ? require('@images/trash.png') : require('@images/trash.png');
              break;
          }
          return <Image source={icon} style={ { height: 25, width: 25 } }/>
        },
      }),
      tabBarPosition: 'bottom', // Put Android tab bar to bottom
      animationEnabled: true, // Screen will animate when navigating between tabs
      swipeEnabled: false, // User cannot swipe from tab to tab; they must click icons
      tabBarOptions: {
        indicatorStyle: {
          backgroundColor: 'white' // Remove horizontal coloured line at the bottom of each tab
        },
        activeTintColor: '#636363', // Make each tab icon/label darker gray when selected
        inactiveTintColor: 'gray', // Make each tab icon/label lighter gray when not selected
        showLabel: true, // Show text label below icon
        showIcon: true, // Show icon above text label
        style: { // Style of entire tab bar
          height: 100,
          shadowColor: '#111',
          borderWidth: 1,
          backgroundColor: '#FFF',
        },
        labelStyle: { // Style of text label below icon
          fontWeight: '500',
          fontSize: 8,
        }
      }
    }
  );




















// const StackNavigator = createStackNavigator({
//         Inbox,
//         Trash
//     },
//     {
//         headerMode: 'none',
//         initialRouteName: 'Inbox'
//     }
// );
const AppContainer = createAppContainer(TabNavigator)

class MainStack extends Component {
    render() {
        return(
            <DrawerLayout
                ref={drawerLayout => {
                    this.mainMenu = drawerLayout
                    // console.log("layout: ", drawerLayout)
                    console.log("layout: ", this.drawerMenu)
                }}
                drawerWidth={282}
                renderNavigationView={() => (
                    <View style={styles.drawerMenu.root}>
                        <View style={styles.drawerMenu.idInfo.root}>
                            <View style={styles.drawerMenu.idInfo.idImage}/>
                            <Text style={styles.drawerMenu.idInfo.name}>
                                John Smith
                            </Text>
                            <Text style={styles.drawerMenu.idInfo.phoneNumber}>
                                +1 (123) 123-1234
                            </Text>
                        </View>
                        <View style={styles.drawerMenu.menuItems.root}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Inbox')}
                                style={styles.drawerMenu.menuItems.menuItem.root}
                            >
                                <Image
                                    source={require('@images/phone-incoming.png')}
                                    style={styles.drawerMenu.menuItems.menuItem.icon}
                                />
                                <Text style={styles.drawerMenu.menuItems.menuItem.text}>
                                    INBOX
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerMenu.menuItems.menuItem.root}>
                                <Image
                                    source={require('@images/star.png')}
                                    style={styles.drawerMenu.menuItems.menuItem.icon}
                                />
                                <Text style={styles.drawerMenu.menuItems.menuItem.text}>
                                    FAVOURITES
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.drawerMenu.menuItems.menuItem.root}>
                                <Image
                                    source={require('@images/archive.png')}
                                    style={styles.drawerMenu.menuItems.menuItem.icon}
                                />
                                <Text style={styles.drawerMenu.menuItems.menuItem.text}>
                                    ARCHIVE
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Trash')}
                                style={styles.drawerMenu.menuItems.menuItem.root}
                            >
                                <Image
                                    source={require('@images/trash.png')}
                                    style={styles.drawerMenu.menuItems.menuItem.icon}
                                />
                                <Text style={styles.drawerMenu.menuItems.menuItem.text}>
                                    TRASH
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                )}
                >
                <AppContainer
                    screenProps={{
                        openMainMenu: () => this.mainMenu.openDrawer()
                    }}
                />
            </DrawerLayout>
        )
    }
}

export default MainStack;
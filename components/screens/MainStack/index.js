import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Note that we use createMaterialTopTabNavigator because createTabNavigator is deprecated and createBottomTabNavigator does not support animation (screens sliding in when you switch tabs)
import stylesFile from './styles';
import { cloneDeep } from 'lodash';
import Inbox from '@screens/Inbox/index';
import Trash from '@screens/Trash/index';
import DrawerLayout from 'react-native-drawer-layout';


const styles = cloneDeep(stylesFile);
const StackNavigator = createStackNavigator({
        Inbox: {
            screen: Inbox,
        },
        Trash: {
            screen: Trash
        }
    },
    {
        headerMode: 'none',
        initialRouteName: 'Inbox'
    }
);
const AppContainer = createAppContainer(StackNavigator)

class MainStack extends Component {
    render() {
        return(
            <DrawerLayout
                ref={drawerLayout => {
                    this.drawerMenu = drawerLayout
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
                <AppContainer/>
            </DrawerLayout>
        )
    }
}

export default MainStack;
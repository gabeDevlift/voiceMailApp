import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import dataFile from './data';
import stylesFile from './styles';
import { cloneDeep } from 'lodash';
import DrawerLayout from 'react-native-drawer-layout';

const data = cloneDeep(dataFile);
const styles = cloneDeep(stylesFile);


export default class Trash extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItemsExpanded: new Array(data.dummyData.length).fill(false)
        }
    }

    render() {
        return (
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
                            <TouchableOpacity style={styles.drawerMenu.menuItems.menuItem.root}>
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
                            <TouchableOpacity style={styles.drawerMenu.menuItems.menuItem.root}>
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
                <View style={styles.body}>
                    <TouchableOpacity
                        onPress={() => {
                            this.drawerMenu.openDrawer()
                        }}
                    >
                        <Image source={require('@images/menu-open-icon.png')}
                            style={styles.drawerMenu.openIcon}
                        />
                    </TouchableOpacity>
                    <View style={styles.topHeading.root}>
                        <View style={styles.topHeading.left.root}>
                            <Image source={require('@images/trash.png')}
                                style={styles.topHeading.left.phoneImage}
                            />
                            <Text style={styles.topHeading.left.text}>
                                TRASH
                            </Text>
                        </View>
                        <View style={styles.topHeading.right.root}>
                            <Image source={require('@images/filter.png')}
                                style={styles.topHeading.right.filterImage}
                            />
                            <Text style={styles.topHeading.right.text}>
                                Filter By:{"\n"}Most Recent
                            </Text>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={styles.messages.root}>
                            {data.dummyData.map((message, index) => (
                                <View
                                    key={index}
                                    style={styles.messages.message.root}
                                >
                                    <View style={styles.messages.message.top.root}>
                                        <View style={styles.messages.message.top.left.root}>
                                            <Text>
                                            {message.name}
                                            </Text>
                                            <Text>
                                            {message.phoneNumber}
                                            </Text>
                                            <Text>
                                            {message.date}
                                            </Text>
                                            <Text>
                                            {message.duration}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.state.menuItemsExpanded[index] = !this.state.menuItemsExpanded[index];
                                                this.setState({
                                                    menuItemsExpanded: this.state.menuItemsExpanded
                                                })
                                            }}
                                        >
                                            <Image
                                                source={this.state.menuItemsExpanded[index]==true ? require('@images/up-chevron.png') : require('@images/down-chevron.png')}
                                                style={styles.messages.message.top.right.root}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {
                                        this.state.menuItemsExpanded[index]==true
                                        ?
                                        <View style={styles.messages.message.actions.root}>
                                            <View style={styles.messages.message.actions.innerView.root}>
                                                <View style={styles.messages.message.actions.innerView.restore.root}>
                                                    <Image
                                                        source={require('@images/restore.png')}
                                                        style={styles.messages.message.actions.innerView.restore.icon}
                                                    />
                                                    <Text style={styles.messages.message.actions.innerView.restore.text}>
                                                        Restore
                                                    </Text>
                                                </View>
                                                <View style={styles.messages.message.actions.innerView.delete.root}>
                                                    <Image
                                                        source={require('@images/trash.png')}
                                                        style={styles.messages.message.actions.innerView.delete.icon}
                                                    />
                                                    <Text style={styles.messages.message.actions.innerView.delete.text}>
                                                        Delete Forever
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        null
                                    }
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </DrawerLayout>
        );
    }
}

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
        super(props)
        this.state = {
            menuItemsExpanded: new Array(data.dummyData).fill(false)
        }
    }

    render() {
        return (
                <View style={styles.body}>
                    {/* <TouchableOpacity
                        onPress={this.props.screenProps.openMainMenu}
                    >
                        <Image source={require('@images/menu-open-icon.png')}
                            style={styles.drawerMenu.openIcon}
                        />
                    </TouchableOpacity> */}
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
                                                <TouchableOpacity style={styles.messages.message.actions.innerView.restore.root}>
                                                    <Image
                                                        source={require('@images/restore.png')}
                                                        style={styles.messages.message.actions.innerView.restore.icon}
                                                    />
                                                    <Text style={styles.messages.message.actions.innerView.restore.text}>
                                                        Restore
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.messages.message.actions.innerView.delete.root}>
                                                    <Image
                                                        source={require('@images/trash.png')}
                                                        style={styles.messages.message.actions.innerView.delete.icon}
                                                    />
                                                    <Text style={styles.messages.message.actions.innerView.delete.text}>
                                                        Delete Forever
                                                    </Text>
                                                </TouchableOpacity>
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
        );
    }
}

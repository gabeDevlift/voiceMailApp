import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import dataFile from './data';
import stylesFile from './styles';
import { cloneDeep } from 'lodash';
import DrawerLayout from 'react-native-drawer-layout';

const data = cloneDeep(dataFile);
const styles = cloneDeep(stylesFile);


export default class Favourites extends React.Component {

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
                            <Image source={require('@images/star.png')}
                                style={styles.topHeading.left.phoneImage}
                            />
                            <Text style={styles.topHeading.left.text}>
                                FAVOURITES
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
                                    <View style={styles.messages.message.left.root}>
                                        <TouchableOpacity style={styles.messages.message.left.star.root}>
                                            <Image
                                                source={require('@images/star.png')}
                                                style={styles.messages.message.left.star.image}
                                            />
                                        </TouchableOpacity>
                                        <View style={styles.messages.message.left.mainText.root}>
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
                                            style={styles.messages.message.right.root}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
        );
    }
}

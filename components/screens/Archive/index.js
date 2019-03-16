import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import dataFile from './data';
import stylesFile from './styles';
import { cloneDeep } from 'lodash';
import DrawerLayout from 'react-native-drawer-layout';

const data = cloneDeep(dataFile);
const styles = cloneDeep(stylesFile);


export default class Archive extends React.Component {

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
                            <Image source={require('@images/archive.png')}
                                style={styles.topHeading.left.phoneImage}
                            />
                            <Text style={styles.topHeading.left.text}>
                                ARCHIVE
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
                                        <TouchableOpacity>
                                            <Image
                                                source={require('@images/phone-outgoing.png')}
                                                style={styles.messages.message.top.right.root}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.messages.message.audioPlayer.root}>
                                        <View style={styles.messages.message.audioPlayer.line}>
                                            
                                        </View>
                                        <View style={styles.messages.message.audioPlayer.clock.root}>
                                            <Text style={styles.messages.message.audioPlayer.clock.timeElapsed}>
                                                {"0:10"}
                                            </Text>
                                            <Text style={styles.messages.message.audioPlayer.clock.timeLeft}>
                                                {"1:10"}
                                            </Text>
                                        </View>
                                        <View style={styles.messages.message.audioPlayer.playButton.root}>
                                            <TouchableOpacity>
                                                <Image
                                                    source={require('@images/play-icon.png')}
                                                    style={styles.messages.message.audioPlayer.playButton.icon}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
        );
    }
}
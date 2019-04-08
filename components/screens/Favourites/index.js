import globalStyles from 'voiceMailApp/globalStyles';
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import dataFile from './data';
import stylesFile from './styles';
import { cloneDeep } from 'lodash';
import DrawerLayout from 'react-native-drawer-layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    favourite,
    archive,
    trash,
    restore,
    deleteForever,
    markListened
} from 'voiceMailApp/store/actions';
import SoundPlayer from 'react-native-sound-player'


const data = cloneDeep(dataFile);
const styles = cloneDeep(stylesFile);


class Favourites extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            menuItemsExpanded: new Array(data.dummyData).fill(false),
            items: [],
            indicatorPosition: 0,
            playing: [],
            indexPlaying: -1,
            paused: false
        }
    }

    playSong() {
        try {
            console.log("trying")
            SoundPlayer.playSoundFile('sample1', 'mp3')
        } catch (e) {
            alert('Cannot play the file')
            console.log('cannot play the song file', e)
        }
    }

    async getInfo() { // You need the keyword `async`
        try {
            setInterval(async () => {
                console.log("hello")
                SoundPlayer.getInfo()
            }, 1000)
            const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
            console.log('getInfo', info) // {duration: 12.416, currentTime: 7.691}
        } catch (e) {
            console.log('There is no song playing', e)
        }
    }

    componentDidMount() {
        this.setState({
            playing: new Array(this.props.messages.messages.length).fill(false),
            items: this.props.messages.messages.slice()
        })
        let interval;
        // When new message starts playing
        SoundPlayer.onFinishedLoading(async (success: boolean) => {
            const info = await SoundPlayer.getInfo()
            Animated.timing(
                this.state.indicatorPosition,
                {
                    toValue: (343/info.duration)*info.currentTime,
                    duration: info.duration
                }
            )
            // interval = setInterval(async () => {
            //     const info = await SoundPlayer.getInfo() // Also, you need to await this because it is async
            //     this.setState({
            //         indicatorPosition: (343/info.duration)*info.currentTime
            //     })
            //     console.log('getInfo', info) // {duration: 12.416, currentTime: 7.691}
            // }, 1000)
        })
        SoundPlayer.onFinishedPlaying(async (success: boolean) => {
            this.setState({
                indexPlaying: -1
            })
            // console.log("done")
            // clearInterval(interval)
            // this.setState({
            //     indicatorPosition: 0
            // })
        })
    }

    render() {
        return (
            <DrawerLayout
                ref={(dashboardSettingsDrawer) => (this.dashboardSettingsDrawer = dashboardSettingsDrawer)}
                drawerWidth={282}
                drawerPosition={DrawerLayout.positions.Right}
                drawerLockMode="locked-closed"
                renderNavigationView={() => (
                <View style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white'
                }}>
                    <Text style={{
                        margin: 10,
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}>
                        Filter by:
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.filterByDate()
                        }}
                    >
                        <Text style={{
                            margin: 7,
                            marginLeft: 10,
                            color: globalStyles.grey

                        }}>
                            Sender
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.filterByDate()
                        }}
                    >
                        <Text style={{
                            margin: 7,
                            marginLeft: 10,
                            color: globalStyles.grey
                        }}>
                            Date
                        </Text>
                    </TouchableOpacity>
                </View>
                )}
            >
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
                        <TouchableOpacity
                            onPress={() => {
                                this.dashboardSettingsDrawer.openDrawer();
                            }}
                        style={styles.topHeading.right.root}>
                            <Image source={require('@images/filter.png')}
                                style={styles.topHeading.right.filterImage}
                            />
                            <Text style={styles.topHeading.right.text}>
                                Filter By:{"\n"}Most Recent
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={styles.messages.root}>
                            {this.state.items.map((message, index) => (
                                message.favourited && !message.trashed
                                ?
                                <View
                                    key={index}
                                    style={styles.messages.message.container}
                                >
                                    <View style={styles.messages.message.root}>
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
                                                {message.number}
                                                </Text>
                                                <Text>
                                                {message.date}
                                                </Text>
                                                <Text>
                                                0:29
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
                                                source={require('@images/phone-outgoing.png')}
                                                style={styles.messages.message.right.root}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.messages.message.audioPlayer.root}>
                                        <View style={{
                                            left: this.state.indicatorPosition,
                                            position: 'absolute',
                                            top: 11,
                                            width: 12,
                                            height: 12,
                                            backgroundColor: 'black',
                                            borderRadius: 6,
                                            zIndex: 1
                                        }}/>
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
                                            {
                                                this.state.indexPlaying === index
                                                ?
                                                <View style={{flexDirection: 'row'}}>
                                                    {
                                                        this.state.paused
                                                        ?
                                                        <TouchableOpacity
                                                            onPress={async () => {
                                                                this.setState({
                                                                    paused: false
                                                                })
                                                                SoundPlayer.resume()
                                                            }}
                                                        >
                                                            <Image
                                                                source={require('@images/play-icon.png')}
                                                                style={styles.messages.message.audioPlayer.playButton.icon}
                                                            />
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity
                                                            onPress={async () => {
                                                                this.setState({
                                                                    paused: true
                                                                })
                                                                SoundPlayer.pause()
                                                            }}
                                                        >
                                                            <Image
                                                                source={require('@images/pause.png')}
                                                                style={styles.messages.message.audioPlayer.playButton.icon}
                                                            />
                                                        </TouchableOpacity>

                                                    }
                                                    <TouchableOpacity
                                                        onPress={async () => {
                                                            await this.setState({
                                                                indexPlaying: -1,
                                                                paused: false
                                                            })
                                                            SoundPlayer.stop()
                                                        }}
                                                    >
                                                        <Image
                                                            source={require('@images/stop.png')}
                                                            style={[styles.messages.message.audioPlayer.playButton.icon, {marginLeft: 10}]}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <TouchableOpacity
                                                    onPress={async () => {
                                                        await this.setState({
                                                            indexPlaying: index
                                                        })
                                                        this.props.markListened(index)
                                                        this.playSong()
                                                    }}
                                                >
                                                    <Image
                                                        source={require('@images/play-icon.png')}
                                                        style={styles.messages.message.audioPlayer.playButton.icon}
                                                    />
                                                </TouchableOpacity>
                                            }
                                        </View>
                                        {
                                            message.listened
                                            ?
                                            <View
                                                style={styles.bottomSection.root}
                                            >
                                                {
                                                    !message.archived
                                                    ?
                                                    <TouchableOpacity
                                                        onPress={() => this.props.archive(index)}
                                                        style={{justifyContent: 'center'}}>
                                                        <Image
                                                            source={require('@images/archive.png')}
                                                            style={{marginRight: 30, width: 20, height: 20}}
                                                        />
                                                    </TouchableOpacity>
                                                    :
                                                    null
                                                }
                                                <TouchableOpacity
                                                    onPress={() => this.props.trash(index)}
                                                    style={{justifyContent: 'center'}}>
                                                    <Image
                                                        source={require('@images/trash.png')}
                                                        style={{width: 20, height: 20}}
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            :
                                            null
                                        }
                                    </View>
                                </View>
                                :
                                null
                            ))
                            }
                        </View>
                    </ScrollView>
                </View>
            </DrawerLayout>
        );
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        favourite,
        archive,
        trash,
        restore,
        deleteForever,
        markListened
    }, dispatch)
  );

const mapStateToProps = (state) => {
    const { messages } = state
    return { messages }
  };

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);

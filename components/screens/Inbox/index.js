import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, Animated } from 'react-native';
import dataFile from './data';
import stylesFile from './styles';
import { cloneDeep } from 'lodash';
import DrawerLayout from 'react-native-drawer-layout';
import SoundPlayer from 'react-native-sound-player'
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
import globalStyles from 'voiceMailApp/globalStyles';
import { CheckBox } from 'react-native-elements';


const data = cloneDeep(dataFile);
const styles = cloneDeep(stylesFile);


class Inbox extends React.Component {

    

    constructor(props) {
        super(props);
        this.dashboardSettingsDrawer;
        this.state = {
            indicatorPosition: 0,
            playing: [],
            indexPlaying: -1,
            items: [],
            paused: false,
            progress: new Animated.Value(0)
        }
    }

    playSong() {
        try {
            console.log("trying")
            SoundPlayer.playSoundFile('sample1', 'mp3')
            Animated.timing(
                this.state.progress,
                {
                    toValue: 335,
                    duration: 18000
                }
            ).start()
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

    componentDidUpdate(prevProps, prevState) {
        
    }

    filterBySender() {
        console.log("hello")
    }

    filterByDate() {
        let temp = this.state.items.reverse()
        this.setState({
            items: temp
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
                            <Image source={require('@images/phone-incoming.png')}
                                style={styles.topHeading.left.phoneImage}
                            />
                            <Text style={styles.topHeading.left.text}>
                                INBOX
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
                                !message.trashed
                                ?
                                <View
                                    key={index}
                                    style={styles.messages.message.root}
                                >
                                    <View style={styles.messages.message.top.root}>
                                        <View style={{marginLeft: 8}}>
                                            <Text>
                                            {message.name}
                                            </Text>
                                            <Text>
                                            {message.number}
                                            </Text>
                                            <Text>
                                            {message.date}
                                            </Text>
                                            {/* <Text>
                                            0:29
                                            </Text> */}
                                        </View>
                                        <TouchableOpacity>
                                            <Image
                                                source={require('@images/phone-outgoing.png')}
                                                style={styles.messages.message.top.right.root}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.messages.message.audioPlayer.root}>
                                        <Animated.View style={{
                                            left: this.state.indexPlaying === index ? this.state.progress : 0,
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
                                                                this.state.progress.stopAnimation()
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
                                                            this.state.progress.stopAnimation()
                                                            this.state.progress.setValue(0)

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
                                                <TouchableOpacity
                                                onPress={() => this.props.favourite(index)}
                                                style={{justifyContent: 'center'}}>
                                                <Image
                                                    source={message.favourited ? require('@images/star.png') : require('@images/star_empty.png')}
                                                    style={{width: 20, height: 20}}
                                                />
                                                </TouchableOpacity>
                                                {
                                                    !message.archived
                                                    ?
                                                    <TouchableOpacity
                                                        onPress={() => this.props.archive(index)}
                                                        style={{justifyContent: 'center'}}>
                                                        <Image
                                                            source={require('@images/archive.png')}
                                                            style={{marginLeft: 30, width: 20, height: 20}}
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
                                                        style={{marginLeft: 30, width: 20, height: 20}}
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
                            ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);

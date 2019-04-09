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


const data = cloneDeep(dataFile);
const styles = cloneDeep(stylesFile);


class Inbox extends React.Component {

    

    constructor(props) {
        super(props);
        this.dashboardSettingsDrawer;
        this.state = {
            filterBy: 0,
            indicatorPosition: 0,
            playing: [],
            indexPlaying: -1,
            items: [],
            paused: false,
            progress: new Animated.Value(0)
        }
    }

    async play(index, _this) {

        try {
            this.props.markListened(index)
            if (SoundPlayer)
                SoundPlayer.stop()
            _this.setState({
                paused: false,
                indexPlaying: index
            })
            _this.state.progress.setValue(0)
            SoundPlayer.playSoundFile(_this.state.items[index].message.split('.')[0], 'mp3')
            let info = await SoundPlayer.getInfo()
            console.log("info: ", info)
            Animated.timing(
                _this.state.progress,
                {
                    toValue: 335,
                    duration: info.duration*1000
                }
            ).start()
        } catch (e) {
            alert('Cannot play the file')
            console.log('cannot play the song file', e)
        }
    }

    pause(_this) {
        console.log("pause: ", _this.state)
        try {
            _this.state.progress.stopAnimation()
            _this.setState({
                paused: true
            })
            SoundPlayer.pause()

        } catch (e) {
            console.log('cannot pause the song file', e)
        }
    }

    async resume(_this) {
        console.log("resume")
        try {
            _this.setState({
                paused: false
            })
            let info = await SoundPlayer.getInfo()
            Animated.timing(
                _this.state.progress,
                {
                    toValue: 335,
                    duration: info.duration*1000-info.currentTime*1000
                }
            ).start()
            SoundPlayer.resume()
        } catch (e) {
            console.log('cannot resume the song file', e)
        }
    }

    stop(index, _this) {
        console.log("stop")
        try {
            SoundPlayer.stop()
            _this.state.progress.stopAnimation()
            _this.state.progress.setValue(0)
            _this.setState({
                paused: false,
                indexPlaying: -1
            })
        } catch (e) {
            console.log('cannot stop the song file', e)
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
            console.log("hihi")
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

    compareSenders(a, b) {
        if (a.id < b.id)
            return -1
        else
            return 1
    }

    compareDates(a, b) {
        if (parseInt(a.date.substring(0, 2)) < parseInt(b.date.substring(0, 2)))
            return -1
        else
            return 1
    }

    filterBySender() {
        let temp = this.state.items
        temp.sort(this.compareSenders)
        this.setState({
            items: temp
        })
    }

    filterByDate() {
        let temp = this.state.items
        temp.sort(this.compareDates)
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
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => {
                            this.filterBySender()
                            this.setState({
                                filterBy: 0
                            })
                        }}
                    >
                        <Text style={{
                            margin: 7,
                            marginLeft: 10,
                            color: globalStyles.grey

                        }}>
                            Sender
                        </Text>
                        {
                            this.state.filterBy === 0
                            ?
                            <Image source={require('@images/checkmark.png')}
                                style={styles.topHeading.right.filterImage}
                            />
                            :
                            null
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        onPress={() => {
                            this.filterByDate()
                            this.setState({
                                filterBy: 1
                            })
                        }}
                    >
                        <Text style={{
                            margin: 7,
                            marginLeft: 10,
                            color: globalStyles.grey
                        }}>
                            Date
                        </Text>
                        {
                            this.state.filterBy === 1
                            ?
                            <Image source={require('@images/checkmark.png')}
                                style={styles.topHeading.right.filterImage}
                            />
                            :
                            null
                        }
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
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={styles.messages.root}>
                            {this.state.items.map((message, index) => (
                                !message.trashed && !message.archived
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
                                            zIndex: 1,
                                        }}/>
                                        <View style={styles.messages.message.audioPlayer.line}>
                                            
                                        </View>
                                        {/* <View style={styles.messages.message.audioPlayer.clock.root}>
                                            <Text style={styles.messages.message.audioPlayer.clock.timeElapsed}>
                                                {"0:10"}
                                            </Text>
                                            <Text style={styles.messages.message.audioPlayer.clock.timeLeft}>
                                                {"1:10"}
                                            </Text>
                                        </View> */}
                                        <View style={styles.messages.message.audioPlayer.playButton.root}>
                                            {
                                                this.state.indexPlaying === index
                                                ?
                                                <View style={{flexDirection: 'row'}}>
                                                    {
                                                        this.state.paused
                                                        ?
                                                        <TouchableOpacity
                                                            onPress={() => this.resume(this)}
                                                        >
                                                            <Image
                                                                source={require('@images/play-icon.png')}
                                                                style={styles.messages.message.audioPlayer.playButton.icon}
                                                            />
                                                        </TouchableOpacity>
                                                        :
                                                        <TouchableOpacity
                                                            onPress={() => this.pause(this)}
                                                        >
                                                            <Image
                                                                source={require('@images/pause.png')}
                                                                style={styles.messages.message.audioPlayer.playButton.icon}
                                                            />
                                                        </TouchableOpacity>

                                                    }
                                                    <TouchableOpacity
                                                        onPress={() => this.stop(index, this)}
                                                    >
                                                        <Image
                                                            source={require('@images/stop.png')}
                                                            style={[styles.messages.message.audioPlayer.playButton.icon, {marginLeft: 10}]}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                <TouchableOpacity
                                                    onPress={() => this.play(index, this)}
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

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
import globalStyles from 'voiceMailApp/globalStyles';

const data = cloneDeep(dataFile);
const styles = cloneDeep(stylesFile);


class Trash extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filterBy: 0,
            menuItemsExpanded: new Array(data.dummyData).fill(false),
            items: []
        }
    }

    componentDidMount() {
        this.setState({
            items: this.props.messages.messages
        })
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
                            <Image source={require('@images/trash.png')}
                                style={styles.topHeading.left.phoneImage}
                            />
                            <Text style={styles.topHeading.left.text}>
                                TRASH
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
                                message.trashed
                                ?
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
                                            {message.number}
                                            </Text>
                                            <Text>
                                            {message.date}
                                            </Text>
                                            {/* <Text>
                                            0:29
                                            </Text> */}
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
                                                <TouchableOpacity
                                                    onPress={() => this.props.restore(index)}
                                                style={styles.messages.message.actions.innerView.restore.root}>
                                                    <Image
                                                        source={require('@images/restore.png')}
                                                        style={styles.messages.message.actions.innerView.restore.icon}
                                                    />
                                                    <Text style={styles.messages.message.actions.innerView.restore.text}>
                                                        Restore
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.messages.message.actions.innerView.delete.root}
                                                    onPress={() => {
                                                        Alert.alert(
                                                            'Delete Forever',
                                                            'Are you sure?',
                                                            [
                                                            {
                                                                text: 'Yes',
                                                                onPress: () => this.props.deleteForever(index)
                                                            },
                                                            {
                                                                text: 'Cancel',
                                                            },
                                                            ],
                                                            {cancelable: false},
                                                        );
                                                    }}
                                                >
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

export default connect(mapStateToProps, mapDispatchToProps)(Trash);

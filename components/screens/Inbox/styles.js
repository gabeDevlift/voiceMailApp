import globalStyles from 'voiceMailApp/globalStyles';

export default {
    body: {
        flex: 1
    },
    drawerMenu: {
        root: {
            height: '100%',
            alignItems: 'flex-end',
            paddingTop: 30,
            paddingRight: 40,
            backgroundColor: 'white'
        },
        idInfo: {
            root: {
                alignItems: 'center'
            },
            idImage: {
                borderWidth: 1,
                borderColor: 'black',
                width: 60,
                height: 60,
                borderRadius: 30

            }
        },
        openIcon: {
            margin: 10,
            width: 20,
            height: 20
        },
        menuItem: {
            root: {
                flexDirection: 'row'
            },
            icon: {
                width: 10,
                height: 10
            },
            text: {

            }
        }
    },
    topHeading: {
        root: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10
        },
        left: {
            root: {
                flexDirection: 'row'
            },
            phoneImage: {
                width: 35,
                height: 35
            },
            text: {
                marginLeft: 10,
                fontSize: 35,
                fontWeight: '600',
            }
        },
        right: {
            root: {
                flexDirection: 'row',
                alignItems: 'flex-start'
            },
            filterImage: {
                width: 15,
                height: 15
            },
            text: {
                marginLeft: 10,
                fontSize: 9,
                fontWeight: '100'
            }
        }
    },
    messages: {
        root: {
            margin: 5
        },
        message: {
            root: {
                padding: 10,
                borderWidth: 1,
                borderColor: globalStyles.grey
            },
            top: {
                root: {
                    flexDirection: 'row',
                    justifyContent: 'space-between'

                },
                left: {
                    root: {

                    }
                },
                right: {
                    root: {
                        width: 20,
                        height: 20
                    }
                }
            },
            audioPlayer: {
                root: {

                },
                line: {
                    marginTop: 15,
                    marginBottom: 5,
                    borderBottomWidth: 3,
                    borderBottomColor: globalStyles.grey
                },
                clock: {
                    root: {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    },
                    timeElapsed: {
                        fontSize: 10,
                        color: globalStyles.grey
                        
                    },
                    timeLeft: {
                        fontSize: 10,
                        color: globalStyles.grey

                    }
                },
                playButton: {
                    root: {
                        alignItems: 'center'
                    },
                    icon: {
                        width: 20,
                        height: 20
                    }
                }
            }
        }
    }
}
import globalStyles from 'voiceMailApp/globalStyles';

export default {
    body: {
        flex: 1
    },
    drawerMenu: {
        root: {
            height: '100%',
            padding: 30,
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

            },
            name: {
                marginTop: 7,
                color: globalStyles.grey
            },
            phoneNumber: {
                marginTop: 3,
                fontSize: 8,
                color: globalStyles.grey

            }
        },
        openIcon: {
            margin: 10,
            width: 20,
            height: 20
        },
        menuItems: {
            root: {
                marginTop: 10
            },
            menuItem: {
                root: {
                    marginTop: 25,
                    flexDirection: 'row',
                    alignItems: 'center'
                },
                icon: {
                    width: 25,
                    height: 25
                },
                text: {
                    marginLeft: 10,
                    fontSize: 20
                }
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
                marginTop: 5,
                marginBottom: 5,
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
                        flexDirection: 'row'
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
                    marginBottom: 10,
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
    },
    bottomSection: {
        root: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
            width: '100%',
            height: 30,
        }
    }
}
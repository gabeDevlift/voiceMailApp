import globalStyles from 'voiceMailApp';
export default {
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
}
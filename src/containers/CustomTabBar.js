import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { arrayIsEmpty, stringIsEmpty, objectIsNull } from '@dungdang/react-native-basic/src/Functions'
import { Sizes } from '@dungdang/react-native-basic'
import getImage from '../res/values/strings/iconStrS'
import { userProfile } from '../config/settings'
export default class CustomTabBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            // colorApp: '#FFF',
            listTab: [],

            isOnChangeTab: true,
        }
    }

    componentDidMount() {

    }
    onChangeTab(key, data) {
        const { navigation } = this.props
        let tab = data.info0.dataItem.filter((value) => {
            return value.code === key
        })

        if (!arrayIsEmpty(tab)) {
            switch (key) {
                case '1':
                    navigation.navigate('Home')
                    return true;
                case '2':
                    navigation.navigate('DashBoard')
                    return true;
                case '3':
                    navigation.navigate('ApproveApplicationContainer')
                    return true;
                case '4':
                    navigation.navigate('NotificationContainer')
                    return true;
                case '5':
                    navigation.navigate('UserInfo')
                    return true;
                default:
                    return false
            }
        } else {
            return false
        }
    }
    onChangeTabDefault(dataGetUser2) {
        const { navigation } = this.props
        // data.info0.dataItem
        if (!objectIsNull(dataGetUser2.info0)) {
            if (!arrayIsEmpty(dataGetUser2.info0.dataItem)) {
                let item = dataGetUser2.info0.dataItem.filter((value) => {
                    return value.default === true
                })
                if (!arrayIsEmpty(item)) {
                    switch (item[0].code) {
                        case '1':
                            navigation.navigate('Home')
                            return true;
                        case '2':
                            navigation.navigate('DashBoard')
                            return true;
                        case '3':
                            navigation.navigate('ApproveApplicationContainer')
                            return true;
                        case '4':
                            navigation.navigate('NotificationContainer')
                            return true;
                        case '5':
                            navigation.navigate('UserInfo')
                            return true;
                        default:
                            return false
                    }
                }
            }
        }
        return false
    }
    componentDidUpdate(prevProps) {
        const { navigation, dataGetUser2 } = this.props
        const { state } = navigation
        if(this.state.isOnChangeTab){
            if (dataGetUser2 !== prevProps.dataGetUser2) {
                if (!objectIsNull(dataGetUser2)) {
                    let isTab = this.onChangeTabDefault(dataGetUser2)
                    if (!isTab) {
                        let flag = false
                        let count = 1
                        while (!flag && count < 6) {
                            flag = this.onChangeTab(count + '', dataGetUser2)
                            count++
                        }
                    }
                    this.setState({isOnChangeTab: false})
                }
            }
        }
    }
    render() {
        // const { colorApp } = this.state
        const { navigation, dataGetUser2 } = this.props
        const { state } = navigation
        const { listTab } = this.state
        console.log('dataGetUser2CustomTabBar: ', !objectIsNull(this.props.dataGetUser2) ? this.props.dataGetUser2.info0.dataItem : null)
        return (
            <SafeAreaView style={{ width: '100%', backgroundColor: 'white', }}>
                <View style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    flex: 1,
                    backgroundColor: 'white',
                    paddingVertical: Sizes.s30,
                    backgroundColor: 'white',
                    borderTopWidth: 1,
                    borderColor: 'silver',
                    paddingVertical: Sizes.s40,
                    paddingBottom: Sizes.s60,
                }}>
                    {/* {listTab} */}
                    {
                        state.routes.map((route, index) => {
                            let isFocused = state.index === index
                            const onPress = () => {
                                if (route.routeName === route.key) {
                                    navigation.navigate(route.key)
                                }
                            }
                            switch (route.key) {
                                case 'Home':
                                    if (!objectIsNull(dataGetUser2)) {
                                        let itemHome = dataGetUser2.info0.dataItem.filter((value) => {
                                            return value.code === '1'
                                        })
                                        if (!arrayIsEmpty(itemHome)) {
                                            return (
                                                <TouchableOpacity onPress={onPress} style={{
                                                    paddingVertical: Sizes.s20,
                                                    paddingHorizontal: Sizes.s20,
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    {isFocused ?
                                                        (
                                                            <Image
                                                                source={getImage('ic_home_checked')}
                                                                style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                            />
                                                        )
                                                        :
                                                        (
                                                            <Image
                                                                source={getImage('ic_home')}
                                                                style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                            />
                                                        )
                                                    }

                                                </TouchableOpacity>
                                            )
                                        } else {
                                            return null
                                        }
                                    } else {
                                        return (
                                            <TouchableOpacity onPress={onPress} style={{
                                                paddingVertical: Sizes.s20,
                                                paddingHorizontal: Sizes.s20,
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                {isFocused ?
                                                    (
                                                        <Image
                                                            source={getImage('ic_home_checked')}
                                                            style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                        />
                                                    )
                                                    :
                                                    (
                                                        <Image
                                                            source={getImage('ic_home')}
                                                            style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                        />
                                                    )
                                                }

                                            </TouchableOpacity>
                                        )
                                    }

                                case 'DashBoard':
                                    if (!objectIsNull(dataGetUser2)) {
                                        let itemDashBoard = dataGetUser2.info0.dataItem.filter((value) => {
                                            return value.code === '2'
                                        })
                                        if (!arrayIsEmpty(itemDashBoard)) {
                                            return (
                                                <TouchableOpacity onPress={onPress} style={{
                                                    paddingVertical: Sizes.s20,
                                                    paddingHorizontal: Sizes.s20,
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    {isFocused ?
                                                        (
                                                            <Image
                                                                source={getImage('dashboard_activate')}
                                                                style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                            />
                                                        )
                                                        :
                                                        (
                                                            <Image
                                                                source={getImage('dashboard')}
                                                                style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                            />
                                                        )
                                                    }

                                                </TouchableOpacity>
                                            )
                                        } else {
                                            return null
                                        }
                                    } else {
                                        return (
                                            <TouchableOpacity onPress={onPress} style={{
                                                paddingVertical: Sizes.s20,
                                                paddingHorizontal: Sizes.s20,
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                {isFocused ?
                                                    (
                                                        <Image
                                                            source={getImage('dashboard_activate')}
                                                            style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                        />
                                                    )
                                                    :
                                                    (
                                                        <Image
                                                            source={getImage('dashboard')}
                                                            style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                        />
                                                    )
                                                }

                                            </TouchableOpacity>
                                        )
                                    }
                                case 'ApproveApplicationContainer':
                                    if (!objectIsNull(dataGetUser2)) {
                                        let itemApproveApplicationContainer = dataGetUser2.info0.dataItem.filter((value) => {
                                            return value.code === '3'
                                        })
                                        if (!arrayIsEmpty(itemApproveApplicationContainer)) {
                                            return (
                                                <TouchableOpacity onPress={onPress} style={{
                                                    paddingVertical: Sizes.s20,
                                                    paddingHorizontal: Sizes.s20,
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    {isFocused ?
                                                        (
                                                            <Image
                                                                source={getImage('ic_reg_checked')}
                                                                style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                            />
                                                        )
                                                        :
                                                        (
                                                            <Image
                                                                source={getImage('ic_reg')}
                                                                style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                            />
                                                        )
                                                    }

                                                </TouchableOpacity>
                                            )
                                        } else {
                                            return null
                                        }
                                    } else {
                                        return (
                                            <TouchableOpacity onPress={onPress} style={{
                                                paddingVertical: Sizes.s20,
                                                paddingHorizontal: Sizes.s20,
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                {isFocused ?
                                                    (
                                                        <Image
                                                            source={getImage('ic_reg_checked')}
                                                            style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                        />
                                                    )
                                                    :
                                                    (
                                                        <Image
                                                            source={getImage('ic_reg')}
                                                            style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                        />
                                                    )
                                                }

                                            </TouchableOpacity>
                                        )
                                    }
                                case 'NotificationContainer':
                                    if (!objectIsNull(dataGetUser2)) {
                                        let itemNotificationContainer = dataGetUser2.info0.dataItem.filter((value) => {
                                            return value.code === '4'
                                        })
                                        if (!arrayIsEmpty(itemNotificationContainer)) {
                                            return (
                                                <TouchableOpacity onPress={onPress} style={{
                                                    paddingVertical: Sizes.s20,
                                                    paddingHorizontal: Sizes.s20,
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    {isFocused ?
                                                        (
                                                            <Image
                                                                source={getImage('ic_notice_selected')}
                                                                style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                            />
                                                            // <Icon name='bell' size={Sizes.s50} color={'red'} />
                                                        )
                                                        :
                                                        (
                                                            <Image
                                                                source={getImage('ic_notice')}
                                                                style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                            />
                                                            // <Icon name='bell' size={Sizes.s50} color={'blue'} />
                                                        )
                                                    }

                                                </TouchableOpacity>
                                            )
                                        } else {
                                            return null
                                        }
                                    } else {
                                        return (
                                            <TouchableOpacity onPress={onPress} style={{
                                                paddingVertical: Sizes.s20,
                                                paddingHorizontal: Sizes.s20,
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                {isFocused ?
                                                    (
                                                        <Image
                                                            source={getImage('ic_notice_selected')}
                                                            style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                        />
                                                        // <Icon name='bell' size={Sizes.h52} color={'red'} />
                                                    )
                                                    :
                                                    (
                                                        <Image
                                                            source={getImage('ic_notice')}
                                                            style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                        />
                                                        // <Icon name='bell' size={Sizes.h52} color={'blue'} />
                                                    )
                                                }

                                            </TouchableOpacity>
                                        )
                                    }

                                case 'UserInfo':
                                    if (!objectIsNull(dataGetUser2)) {
                                        let itemUserInfo = dataGetUser2.info0.dataItem.filter((value) => {
                                            return value.code === '5'
                                        })
                                        if (!arrayIsEmpty(itemUserInfo)) {
                                            return (
                                                <TouchableOpacity onPress={onPress} style={{
                                                    paddingVertical: Sizes.s20,
                                                    paddingHorizontal: Sizes.s20,
                                                    flex: 1,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    {isFocused ?
                                                        (
                                                            <Image
                                                                source={getImage('ic_personal_checked')}
                                                                style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                            />
                                                        )
                                                        :
                                                        (
                                                            <Image
                                                                source={getImage('ic_personal')}
                                                                style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                            />
                                                        )
                                                    }

                                                </TouchableOpacity>
                                            )
                                        } else {
                                            return null
                                        }
                                    } else {
                                        return (
                                            <TouchableOpacity onPress={onPress} style={{
                                                paddingVertical: Sizes.s20,
                                                paddingHorizontal: Sizes.s20,
                                                flex: 1,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                {isFocused ?
                                                    (
                                                        <Image
                                                            source={getImage('ic_personal_checked')}
                                                            style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                        />
                                                    )
                                                    :
                                                    (
                                                        <Image
                                                            source={getImage('ic_personal')}
                                                            style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                        />
                                                    )
                                                }

                                            </TouchableOpacity>
                                        )
                                    }

                                default:
                                    return null
                            }
                        })
                    }

                    {/* {state.routes.map((route, index) => {
                        const isFocused = state.index === index
                        const onPress = () => {
                            if (route.routeName === route.key) {
                                navigation.navigate(route.key)
                            }
                        }
                        return (
                            <TouchableOpacity onPress={onPress} style={{
                                paddingVertical: Sizes.s10,
                                paddingHorizontal: Sizes.s10,
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                // backgroundColor: 'blue'
                            }}>
                                {
                                    route.key === 'Home' ?
                                        (
                                            isFocused ?
                                                (
                                                    <Image
                                                        source={getImage('ic_home_checked')}
                                                        style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                    />
                                                )
                                                :
                                                (
                                                    <Image
                                                        source={getImage('ic_home')}
                                                        style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                    />
                                                )
                                        )
                                        : route.key === 'DashBoard' ?
                                            (
                                                isFocused ?
                                                    (
                                                        <Image
                                                            source={getImage('dashboard_activate')}
                                                            style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                        />
                                                    )
                                                    :
                                                    (
                                                        <Image
                                                            source={getImage('dashboard')}
                                                            style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                        />
                                                    )
                                            )
                                            : route.key === 'ApproveApplicationContainer' ?
                                                (
                                                    isFocused ?
                                                        (
                                                            <Image
                                                                source={getImage('ic_reg_checked')}
                                                                style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                            />
                                                        )
                                                        :
                                                        (
                                                            <Image
                                                                source={getImage('ic_reg')}
                                                                style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                            />
                                                        )
                                                )
                                                : route.key === 'NotificationContainer' ?
                                                    (
                                                        isFocused ?
                                                            (
                                                                <Image
                                                                    source={getImage('ic_alert')}
                                                                    style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                                />
                                                            )
                                                            :
                                                            (
                                                                <Image
                                                                    source={getImage('ic_alert')}
                                                                    style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                                />
                                                            )
                                                    )
                                                    : route.key === 'UserInfo' ?
                                                        (
                                                            isFocused ?
                                                                (
                                                                    <Image
                                                                        source={getImage('ic_personal_checked')}
                                                                        style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                                    />
                                                                )
                                                                :
                                                                (
                                                                    <Image
                                                                        source={getImage('ic_personal')}
                                                                        style={{ width: Sizes.s50, height: Sizes.s50 }}
                                                                    />
                                                                )
                                                        )
                                                        :
                                                        null
                                }
                            </TouchableOpacity>
                        )
                    })} */}

                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    // title: {
    //     width: '100%',
    //     marginVertical: Sizes.s10,
    //     fontSize: Sizes.h65,
    //     fontWeight: 'bold',
    // }
})  
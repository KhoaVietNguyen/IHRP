import * as React from 'react'
import { Platform, Alert, PermissionsAndroid, } from 'react-native'
import Home from '../../components/home/Home'
import { connect } from 'react-redux'
import { NetworkInfo } from 'react-native-network-info'
import NetInfo from '@react-native-community/netinfo'
import DeviceInfo from 'react-native-device-info'
import { replaceScreenLoginAction } from '../../redux/actions/index'
import { stringIsEmpty, arrayIsEmpty, objectIsNull } from '@dungdang/react-native-basic/src/Functions'
import Geolocation from '@react-native-community/geolocation'
import {
    GET_WF_REQUESTER,
    getWFRequesterAction,




    wifiVerifyCheckInOutAction,
    getInfoCheckInOutInDayAction,
    requestCaptureCheckInOutAction,

    wfhRequestCaptureCheckInOutAction,
    wfhVerifyCheckInOutAction,
    getWFHInfoCheckInOutInDayAction,

    getUser2Action,

} from '../../redux/actions/home/homeActions'

import {
    GET_TYPES_LEAVE_APPLICATION,
    getTypesLeaveApplication

} from '../../redux/actions/application/applicationActions'
import { loginAction, showPopupPostLoginAction, hidePopupPostLoginAction } from '../../redux/actions/index'
import { userProfile, } from '../../config/settings'
import { deleteTokenNotiAction } from '../../redux/actions/index'
class HomeContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            deviceID: '',
            wifiName: '',
            wifiMacAddress: '',
            status: false,
            statusWillFocus: false,

            //verify check in/out
            typeCheckInOut: 'WIFI' // WIFI: Check in out WIFI, WFH: Check in out WFH


        }
    }
    onChangeStatusWillFocus = (status) => {
        this.setState({
            statusWillFocus: status
        })
    }
    getNowDate(type) {
        if (type === 1) {
            let d = new Date()
            let day = ('0' + d.getDate()).substr(-2)
            let month = ('0' + (d.getMonth() + 1)).substr(-2)
            let year = d.getFullYear()

            let hour = ('0' + d.getHours()).substr(-2)
            let minute = ('0' + d.getMinutes()).substr(-2)
            let second = ('0' + d.getSeconds()).substr(-2)

            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
        } else if (type === 2) {
            let d = new Date()
            let day = ('0' + d.getDate()).substr(-2)
            let month = ('0' + (d.getMonth() + 1)).substr(-2)
            let year = d.getFullYear()
            return year + '-' + month + '-' + day
        }
    }
    getInfoCheckInOutWifi() {
        this.props.getInfoCheckInOutInDayAction({
            F: 'A1',
            P: this.getNowDate(2)
        })
        this.props.wifiVerifyCheckInOutAction({
            P1: this.state.deviceID,
            P2: this.state.wifiMacAddress,
            P3: this.getNowDate(1),
            P4: this.state.wifiName
        })
    }

    getInfoCheckInOutWFH() {
        this.props.getWFHInfoCheckInOutInDayAction({
            F: 'A1',
            P: this.getNowDate(2)
        })
        this.props.wfhVerifyCheckInOutAction({
            P1: this.state.deviceID,
            P2: this.getNowDate(1),
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        const { status, deviceID, wifiName, wifiMacAddress } = this.state
        // console.log('didUPdateeeee: ', this.state)
        const { data, typeLogin, dataGetUser2, errorGetUser2 } = this.props
        if (data !== prevProps.data) {
            if (!stringIsEmpty(data)) {
                if (typeLogin === 'popup') {

                }

            }
        }

        // if (status === false) {
        //     if (!stringIsEmpty(deviceID) && !stringIsEmpty(wifiMacAddress)) {
        //         let inputWifi = {
        //             P1: deviceID,
        //             P2: wifiMacAddress,
        //             P3: this.getNowDate(1),
        //             P4: wifiName
        //         }
        //         this.setState({
        //             status: true
        //         })
        //         // this.willFocusSubscription = this.props.navigation.addListener(
        //         //     "willFocus",
        //         //     () => {
        //         //         console.log('111111111111')
        //         //         this.props.wifiVerifyCheckInOutAction(inputWifi)
        //         //     }
        //         // );
        //         // console.log('inputWifi: ', inputWifi)
        //         this.props.wifiVerifyCheckInOutAction(inputWifi)

        //     }
        // }
        if (errorGetUser2 !== prevProps.errorGetUser2) {
            if (!stringIsEmpty(errorGetUser2)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', errorGetUser2, [
                    {
                        text: userProfile.LangID === 'VN' ? 'Thử lại' : 'Reload',
                        onPress: () => { this.props.getUser2Action() },
                    }
                ]);
            }
        }

        if (!objectIsNull(dataGetUser2) && dataGetUser2 !== prevProps.dataGetUser2) {
            if (!arrayIsEmpty(dataGetUser2.info1)) {
                if (!arrayIsEmpty(dataGetUser2.info1.dataItem)) {
                    for (let item of dataGetUser2.info1.dataItem) {
                        switch (item.id) {
                            case 102:
                                //check in WIFI
                                userProfile.typeWiFiOrWFH = 'WIFI'
                                this.setState({
                                    typeCheckInOut: 'WIFI'
                                }, () => {
                                    this.willFocusSubscription = this.props.navigation.addListener(
                                        "willFocus",
                                        () => {
                                            this.getInfoCheckInOutWifi()
                                        }
                                    );
                                })
                                break
                            case 103:
                                // check in WFH
                                userProfile.typeWiFiOrWFH = 'WFH'
                                this.setState({
                                    typeCheckInOut: 'WFH'
                                }, () => {
                                    this.willFocusSubscription = this.props.navigation.addListener(
                                        "willFocus",
                                        () => {
                                            this.getInfoCheckInOutWFH()
                                        }
                                    );

                                })
                                break
                            default:
                                break
                        }
                    }
                }
            }
        }


    }
    async hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION

        const hasPermission = await PermissionsAndroid.check(permission);
        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(permission);
        // return status === 'granted';
        if (status === 'granted') {
            return true;
        }
    }
    async configApp() {
        if (Platform.OS === 'android') {
            // if (this.hasAndroidPermission()) {
            //     NetworkInfo.getSSID().then(ssid => {
            //         this.setState({
            //             wifiName: (ssid != null && ssid != undefined && ssid != "(null)" && ssid != "<unknown ssid>") ? ssid : 'Wifi'
            //         })
            //     })
            //     NetworkInfo.getBSSID().then(value => {
            //         this.setState({ wifiMacAddress: value })
            //     })
            // }
            NetworkInfo.getSSID().then(ssid => {
                this.setState({
                    wifiName: (ssid != null && ssid != undefined && ssid != "(null)" && ssid != "<unknown ssid>") ? ssid : 'Wifi'
                })
            })
            NetworkInfo.getBSSID().then(value => {
                this.setState({ wifiMacAddress: value })
            })
            DeviceInfo.getAndroidId().then(value => {
                this.setState({
                    deviceID: value
                })
            })
        } else {
            // await Geolocation.requestAuthorization()
            NetworkInfo.getSSID().then(ssid => {
                this.setState({
                    wifiName: (ssid != null && ssid != undefined && ssid != "(null)" && ssid != "<unknown ssid>") ? ssid : 'Wifi'
                })
            })
            NetworkInfo.getBSSID().then(value => {
                this.setState({ wifiMacAddress: objectIsNull(value) ? '02:00:00:00:00:00' : value })
            })
            this.setState({
                deviceID: DeviceInfo.getUniqueId()
            })
        }
    }
    async componentDidMount() {

        this.willFocusSubscription = this.props.navigation.addListener(
            "willFocus",
            () => {
                this.props.replaceScreenLoginAction({
                    replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
                })
            }
        );
        await this.configApp()
        this.props.getUser2Action()

        const unsubscribe = await NetInfo.addEventListener(async (state) => {
            if (state.type === 'cellular') {
                this.setState({
                    wifiName: stringIsEmpty(state.details.cellularGeneration) ? "" : `${state.details.carrier} ${state.details.cellularGeneration.toLocaleUpperCase()}`
                }, () => {

                })
            }
            if (state.isConnected) {

            }
        });
    }
    render() {
        return <Home
            {...this.props}
            onChangeStatusWillFocus={this.onChangeStatusWillFocus}
            typeCheckInOut={this.state.typeCheckInOut}
            getInfoCheckInOutWFH={() => {
                this.getInfoCheckInOutWFH()
            }}
            getInfoCheckInOutWifi={() => {
                this.getInfoCheckInOutWifi()
            }}
        />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getUser2Action: () => {
            dispatch(getUser2Action())
        },
        getWFRequesterAction: () => {
            dispatch(getWFRequesterAction())
        },
        wifiVerifyCheckInOutAction: (input) => {
            dispatch(wifiVerifyCheckInOutAction(input))
        },
        getInfoCheckInOutInDayAction: (input) => {
            dispatch(getInfoCheckInOutInDayAction(input))
        },
        requestCaptureCheckInOutAction: (input) => {
            dispatch(requestCaptureCheckInOutAction(input))
        },
        loginAction: (input) => {
            dispatch(loginAction(input))
        },
        showPopupPostLoginAction: () => {
            dispatch(showPopupPostLoginAction());
        },
        hidePopupPostLoginAction: () => {
            dispatch(hidePopupPostLoginAction());
        },

        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input));
        },

        wfhRequestCaptureCheckInOutAction: (input) => {
            dispatch(wfhRequestCaptureCheckInOutAction(input));
        },
        wfhVerifyCheckInOutAction: (input) => {
            dispatch(wfhVerifyCheckInOutAction(input));
        },
        getWFHInfoCheckInOutInDayAction: (input) => {
            dispatch(getWFHInfoCheckInOutInDayAction(input));
        },
        deleteTokenNotiAction: () => {
            dispatch(deleteTokenNotiAction())
        }

    }
}

const mapStateToProps = (state) => {
    // console.log('xxxxx: ', !objectIsNull(state.homeReducers.dataGetUser2) ? state.homeReducers.dataGetUser2.info1 : undefined)
    return {

        fetchingGetUser2: state.homeReducers.fetchingGetUser2,
        dataGetUser2: state.homeReducers.dataGetUser2,
        errorGetUser2: state.homeReducers.errorGetUser2,

        fetchingRequester: state.homeReducers.fetchingRequester,
        dataRequester: state.homeReducers.dataRequester,
        errorRequester: state.homeReducers.errorRequester,

        fetchingWifiVerify: state.homeReducers.fetchingWifiVerify,
        dataWifiVerify: state.homeReducers.dataWifiVerify,
        errorWifiVerify: state.homeReducers.errorWifiVerify,

        fetchingWifiInfoCheckInOutInDay: state.homeReducers.fetchingInfoCheckInOutInDay,
        dataWifiInfoCheckInOutInDay: state.homeReducers.dataWifiInfoCheckInOutInDay,
        errorWifiInfoCheckInOutInDay: state.homeReducers.errorWifiInfoCheckInOutInDay,


        fetchingRequestCaptureCheckInOut: state.homeReducers.fetchingRequestCaptureCheckInOut,
        dataRequestCaptureCheckInOut: state.homeReducers.dataRequestCaptureCheckInOut,
        errorRequestCaptureCheckInOut: state.homeReducers.errorRequestCaptureCheckInOut,


        //check in out wfh 

        fetchingWFHVerify: state.homeReducers.fetchingWFHVerify,
        dataWFHVerify: state.homeReducers.dataWFHVerify,
        errorWFHVerify: state.homeReducers.errorWFHVerify,

        fetchingWFHInfoCheckInOutInDay: state.homeReducers.fetchingWFHInfoCheckInOutInDay,
        dataWFHInfoCheckInOutInDay: state.homeReducers.dataWFHInfoCheckInOutInDay,
        errorWFHInfoCheckInOutInDay: state.homeReducers.errorWFHInfoCheckInOutInDay,

        fetchingWFHRequestCaptureCheckInOut: state.homeReducers.fetchingWFHRequestCaptureCheckInOut,
        dataWFHRequestCaptureCheckInOut: state.homeReducers.dataWFHRequestCaptureCheckInOut,
        errorWFHRequestCaptureCheckInOut: state.homeReducers.errorWFHRequestCaptureCheckInOut,

        // Login
        isFetching: state.loginReducers.isFetching,
        data: state.loginReducers.data,
        error: state.loginReducers.error,
        typeLogin: state.loginReducers.typeLogin,
        listAction: state.loginReducers.listAction,
        visiblePopupPostLogin: state.loginReducers.visiblePopupPostLogin,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
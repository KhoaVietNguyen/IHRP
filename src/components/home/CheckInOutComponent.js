import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
    Platform,
} from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { userProfile } from '../../config/settings'
import Icon from 'react-native-vector-icons/FontAwesome5'
import getImage from '../../res/values/strings/iconStrS';
import { NetworkInfo } from 'react-native-network-info'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import DeviceInfo from 'react-native-device-info'
import NetInfo from '@react-native-community/netinfo';
import Geolocation from '@react-native-community/geolocation'
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box'
export default class CheckInOutComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isConnectedWifi: false,
            wifiName: '',
            wifiMacAddress: '',
            deviceID: '',
            timeClock: '',
            dataCheckInOut: undefined,
        }
    }
    getNowDate(type) {
        let d = new Date();
        if (type === 1) {
            let t = d.getDay() + 1;
            let day = ('0' + d.getDate()).substr(-2);
            let month = ('0' + (d.getMonth() + 1)).substr(-2);
            let year = d.getFullYear();
            if (userProfile.LangID === 'VN') {
                return (t === 1 ? 'Chủ nhật' : 'Thứ ') + t + ' ' + day + '/' + month + '/' + year;
            } else {
                let nameDay = (
                    t === 2 ? 'Monday'
                        : t === 3 ? 'Tuesday'
                            : t === 4 ? 'Wednesday'
                                : t === 5 ? 'Thursday'
                                    : t === 6 ? 'Friday'
                                        : t === 7 ? 'Saturday'
                                            : t === 1 ? 'Sunday'
                                                : 'Today'
                )
                return nameDay + ' ' + day + '/' + month + '/' + year;
            }

        } else if (type === 2) {
            let hour = ('0' + d.getHours()).substr(-2);
            let minute = ('0' + d.getMinutes()).substr(-2);
            let second = ('0' + d.getSeconds()).substr(-2);

            return hour + ':' + minute + ':' + second;
        } else if (type === 3) {
            let day = ('0' + d.getDate()).substr(-2);
            let month = ('0' + (d.getMonth() + 1)).substr(-2);
            let year = d.getFullYear();

            let hour = ('0' + d.getHours()).substr(-2);
            let minute = ('0' + d.getMinutes()).substr(-2);
            let second = ('0' + d.getSeconds()).substr(-2);
            return (
                year +
                '-' +
                month +
                '-' +
                day +
                ' ' +
                hour +
                ':' +
                minute +
                ':' +
                second
            );
        } else if (type === 4) {
            let day = ('0' + d.getDate()).substr(-2);
            let month = ('0' + (d.getMonth() + 1)).substr(-2);
            let year = d.getFullYear();
            return year + '-' + month + '-' + day;
        }
    }
    checkGPS() {
        let mes = userProfile.LangID === 'VN' ?
            "<h2 style='color: #0af13e'>Sử dụng vị trí ?</h2>Ứng dụng muốn thay đổi cài đặt thiết bị của bạn:<br/><br/>Sử dụng GPS, Wi-Fi và mạng di động cho vị trí<br/><br/>"
            : "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/>"
        LocationServicesDialogBox.checkLocationServicesIsEnabled({
            message: mes,
            ok: userProfile.LangID === 'VN' ? 'Đồng ý' : 'Yes',
            cancel: userProfile.LangID === 'VN' ? 'Từ chối' : 'No',
            enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
            showDialog: true, // false => Opens the Location access page directly
            openLocationServices: true, // false => Directly catch method is called if location services are turned off
            preventOutSideTouch: false, // true => To prevent the location services window from closing when it is clicked outside
            preventBackClick: false, // true => To prevent the location services popup from closing when it is clicked back button
            providerListener: false // true ==> Trigger locationProviderStatusChange listener when the location state changes
        }).then(function (success) {
            // console.warn('Location success: ', success); // success => {alreadyEnabled: false, enabled: true, status: "enabled"}
        }).catch((error) => {
            // console.log('Location failed: ', error.message); // error.message => "disabled"
        });
    }
    componentDidMount() {
        // navigator.geolocation.getCurrentPosition((position) => {
        //     console.log('position -----------: ', position)
        // }, (err) => {

        // }, { enableHighAccuracy: false, timeout: 1000 })
        // this.willFocusSubscription = this.props.navigation.addListener(
        //     "willFocus",
        //     () => {
        //         try {
        //             Geolocation.getCurrentPosition((position) => {
        //                 console.log('getCurrentPosition - position -----------: ', position)
        //             }, (err) => {
        //                 console.log('getCurrentPosition - error -----------: ', err)
        //                 Alert.alert('123', '123456789')
        //             },
        //                 { enableHighAccuracy: true, timeout: 20000 }
        //             )

        //             // Geolocation.watchPosition()
        //             Geolocation.watchPosition((position) => {
        //                 console.log('watchPosition - position -----------: ', position)
        //             }, (err) => {
        //                 console.log('watchPosition - error -----------: ', err)
        //                 Alert.alert('zzzzzzzzzzz', 'sssssssssssssss')
        //                 // Geolocation.requestAuthorization()
        //             },
        //                 { enableHighAccuracy: true, timeout: 20000 }
        //             )
        //         } catch (error) {
        //             console.log('getCurrentPosition - catch -----------: ', error)
        //         }
        //     }
        // );

        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.type === 'cellular') {
                this.setState({
                    wifiName: stringIsEmpty(state.details.cellularGeneration)
                        ? ''
                        : `${state.details.carrier
                        } ${state.details.cellularGeneration.toLocaleUpperCase()}`,
                    isConnectedWifi: state.isConnected,
                });
            } else {
                this.setState(
                    {
                        isConnectedWifi: state.isConnected,
                    },
                    async () => {
                        // let wfname = await NetworkInfo.getSSID()
                        NetworkInfo.getBSSID().then(value => {
                            this.setState({ wifiMacAddress: value })
                        })
                        NetworkInfo.getSSID().then(ssid => {
                            console.warn('zzzzzzzz: ', ssid)
                            if (this.state.isConnectedWifi) {
                                this.setState({
                                    wifiName: (ssid !== null &&
                                        ssid !== undefined &&
                                        ssid !== '(null)' &&
                                        ssid !== '<unknown ssid>')
                                        ? ssid
                                        : userProfile.LangID === 'VN' ? 'Đang kết nối mạng' : 'Networking',
                                }, () => {
                                    if (Platform.OS === 'android') {
                                        this.checkGPS()
                                    } else {
                                        // Geolocation.requestAuthorization()
                                    }
                                });
                            } else {
                                this.setState({
                                    wifiName: userProfile.LangID === 'VN' ? 'Không kết nối mạng' : 'No network connection',
                                });
                            }
                        });
                    },
                );
            }
        });
        // NetworkInfo.getSSID().then(ssid => {
        //     this.setState({
        //         // wifiName: objectIsNull(ssid) ? 'Wifi' : ssid
        //         wifiName: (ssid !== null &&
        //             ssid !== undefined &&
        //             ssid !== '(null)' &&
        //             ssid !== '<unknown ssid>')
        //             ? ssid
        //             : 'Wifi',
        //     })
        // })
        NetworkInfo.getBSSID().then(value => {
            this.setState({ wifiMacAddress: value })
        })
        if (Platform.OS === 'android') {
            //set OS = 1 with android

            DeviceInfo.getAndroidId().then(value => {
                this.setState({
                    deviceID: value
                })
            })
        } else {
            //set OS = 2 with iOS
            this.setState({
                deviceID: DeviceInfo.getUniqueId()
            })
        }
        setInterval(() => {
            this.setState({
                timeClock: this.getNowDate(2),
            });
        }, 1000);
    }


    componentDidUpdate(prevProps) {
        const {
            dataWifiInfoCheckInOutInDay,
            dataRequestCaptureCheckInOut,
            dataWFHRequestCaptureCheckInOut,
            dataWFHInfoCheckInOutInDay,

            errorRequestCaptureCheckInOut,
            errorWFHRequestCaptureCheckInOut,

        } = this.props
        if (dataWifiInfoCheckInOutInDay !== prevProps.dataWifiInfoCheckInOutInDay) {
            if (!objectIsNull(dataWifiInfoCheckInOutInDay)) {
                this.checkDataInfoCheckInOutInDay(dataWifiInfoCheckInOutInDay);
            }
        }
        if (dataWFHInfoCheckInOutInDay !== prevProps.dataWFHInfoCheckInOutInDay) {
            if (!objectIsNull(dataWFHInfoCheckInOutInDay)) {
                this.checkDataInfoCheckInOutInDay(dataWFHInfoCheckInOutInDay);
            }
        }
        // 
        if (dataRequestCaptureCheckInOut !== prevProps.dataRequestCaptureCheckInOut) {
            if (!objectIsNull(dataRequestCaptureCheckInOut)) {
                if (!objectIsNull(dataRequestCaptureCheckInOut.info1)) {
                    if (!arrayIsEmpty(dataRequestCaptureCheckInOut.info1.dataItem)) {
                        // Thông báo giờ check in out thành công 
                        Alert.alert(
                            userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                            (userProfile.LangID === 'VN' ? 'Bạn đã điểm danh thành công vào lúc: ' : 'You have successfully check at: ') + dataRequestCaptureCheckInOut.info1.dataItem[0].checkTime,
                            [
                                {
                                    text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                                    onPress: () => { }
                                }
                            ]

                        )
                    }
                }
            }
        }
        if (dataWFHRequestCaptureCheckInOut !== prevProps.dataWFHRequestCaptureCheckInOut) {
            if (!objectIsNull(dataWFHRequestCaptureCheckInOut)) {
                if (!objectIsNull(dataWFHRequestCaptureCheckInOut.info1)) {
                    if (!arrayIsEmpty(dataWFHRequestCaptureCheckInOut.info1.dataItem)) {
                        // Thông báo giờ check in out thành công 
                        Alert.alert(
                            userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                            (userProfile.LangID === 'VN' ? 'Bạn đã điểm danh thành công vào lúc: ' : 'You have successfully check at: ') + dataWFHRequestCaptureCheckInOut.info1.dataItem[0].checkTime,
                            [
                                {
                                    text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                                    onPress: () => { }
                                }
                            ]

                        )
                    }
                }
            }
        }

        if (errorRequestCaptureCheckInOut !== prevProps.errorRequestCaptureCheckInOut) {
            if (!stringIsEmpty(errorRequestCaptureCheckInOut)) {
                Alert.alert(
                    userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                    errorRequestCaptureCheckInOut,
                    // ? '' : (userProfile.LangID === 'VN' ? 'Xảy ra sự cố khi điểm danh. Vui lòng thử lại !: ' : 'You have successfully check at: ')
                    [
                        {
                            text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                            onPress: () => { }
                        }
                    ]

                )
            }
        }

        if (errorWFHRequestCaptureCheckInOut !== prevProps.errorWFHRequestCaptureCheckInOut) {
            if (!stringIsEmpty(errorWFHRequestCaptureCheckInOut)) {
                Alert.alert(
                    userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                    errorWFHRequestCaptureCheckInOut,
                    // ? '' : (userProfile.LangID === 'VN' ? 'Xảy ra sự cố khi điểm danh. Vui lòng thử lại !: ' : 'You have successfully check at: ')
                    [
                        {
                            text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                            onPress: () => { }
                        }
                    ]

                )
            }
        }
    }
    renderItem(item, index, typeCheckInOut) {
        if (typeCheckInOut === 'WFH') {
            if (item.checkType === 'i') {
                return (
                    <View style={styles.itemCheck}>
                        <Icon name='arrow-circle-right' size={Sizes.h38} color={'#107EEE'} />
                        <Text style={styles.textTitleCheck}>  {item.time}</Text>
                    </View>
                )
            } else {
                return (
                    <View style={styles.itemCheck}>
                        <Icon name='arrow-circle-left' size={Sizes.h38} color={'#FD9F2A'} />
                        <Text style={styles.textTitleCheck}>  {item.time}</Text>
                    </View>
                )
            }
        } else {
            if (item.checkType === 'i') {
                return (
                    <View style={styles.itemCheck}>
                        <Icon name='arrow-circle-right' size={Sizes.h38} color={'#107EEE'} />
                        <View>
                            <Text style={styles.textTitleCheck}>  {item.time}</Text>
                            <Text style={styles.textTitleCheck}>  {item.wifiLocation}</Text>
                        </View>
                    </View>
                )
            } else {
                return (
                    <View style={styles.itemCheck}>
                        <Icon name='arrow-circle-left' size={Sizes.h38} color={'#FD9F2A'} />
                        <View>
                            <Text style={styles.textTitleCheck}>  {item.time}</Text>
                            <Text style={styles.textTitleCheck}>  {item.wifiLocation}</Text>
                        </View>
                    </View>
                )
            }
        }

    }
    checkDataInfoCheckInOutInDay(data) {
        if (!objectIsNull(data.info1)) {
            this.setState({
                dataCheckInOut: !arrayIsEmpty(data.info1.dataItem)
                    ? data.info1.dataItem
                    : [],
            });
        }
    }
    showListTimeCheckInOut() {
        const { dataCheckInOut, } = this.state
        const { typeCheckInOut } = this.props
        if (dataCheckInOut === undefined) {
            return null
        } else if (!arrayIsEmpty(dataCheckInOut)) {
            return (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{
                        height: Sizes.s240,
                        // flex: 1,
                        margin: Sizes.s10,
                        // backgroundColor: 'blue'
                    }}
                    data={dataCheckInOut}
                    keyExtractor={item => item.dateTime}
                    renderItem={({ item, index }) => {
                        return (
                            this.renderItem(item, index, typeCheckInOut)
                        )
                    }}
                />
            )
        } else {
            return (
                <View style={{ width: '100%', marginTop: Sizes.s10 }}>
                    <Image resizeMode="contain" style={{ width: '80%', height: Sizes.s260 }} source={getImage('not_checkinout')} />
                    {/* <Text style={{ fontSize: Sizes.h24, color: 'black', maxWidth: '75%' }}>{userProfile.LangID === 'VN' ? 'Hôm nay bạn chưa điểm danh !' : 'Today you have not taken attendance'}</Text> */}
                </View>
            )
        }
    }
    showCheckInOut() {
        const { typeCheckInOut } = this.props
        const { wifiName, timeClock, dataCheckInOut } = this.state

        return (
            <View style={styles.body}>
                {/* <Text style={styles.title}>{typeCheckInOut === 'WFH' ? 'CHECK IN OUT WFH' : 'CHECK IN OUT WIFI'}</Text> */}

                <View style={styles.checkInOut}>
                    <View style={styles.horizontalView}>
                        {this.showListTimeCheckInOut()}
                        {/* <FlatList
                            showsVerticalScrollIndicator={false}
                            style={{
                                height: Sizes.s240,
                                // flex: 1,
                                margin: Sizes.s10,
                                // backgroundColor: 'blue'
                            }}
                            data={dataCheckInOut}
                            keyExtractor={item => item.dateTime}
                            renderItem={({ item, index }) => {
                                return (
                                    this.renderItem(item, index, typeCheckInOut)
                                )
                            }}
                        /> */}
                    </View>

                    <View style={styles.horizontalView}>
                        <TouchableOpacity
                            onPress={() => {
                                this.onRequestCheckInOut('i')
                            }}
                            style={[styles.touchCheckInOut, { backgroundColor: '#107EEE' }]}>
                            <Text numberOfLines={1} style={styles.titleTouchCheckInOut}>CHECK-IN</Text>
                            <Icon name='arrow-circle-right' size={Sizes.h46} color={'white'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                this.onRequestCheckInOut('o')
                            }}
                            style={[styles.touchCheckInOut, { backgroundColor: '#FD9F2A' }]}>
                            <Text numberOfLines={1} style={styles.titleTouchCheckInOut}>CHECK-OUT</Text>
                            <Icon name='arrow-circle-left' size={Sizes.h46} color={'white'} />
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        )
    }
    showErrorVerify() {
        const { messageVerify, fetchingGetUser2, typeCheckInOut } = this.props
        return (
            <View style={styles.errorVerify}>
                <Text style={styles.textTitle}>{userProfile.LangID === 'VN' ? 'Kiểm tra dữ liệu' : 'Check the data'}</Text>
                <View style={styles.errorVerifyTitle}>
                    <Image source={getImage('ic_alert_circle')} style={styles.errorVerifyIcon} />
                    <Text style={styles.errorVerifyText}>  {messageVerify}</Text>
                </View>
                {!fetchingGetUser2 &&
                    (
                        <TouchableOpacity onPress={() => {
                            if (typeCheckInOut === 'WIFI') {
                                this.props.getInfoCheckInOutWifi()
                            } else if (typeCheckInOut === 'WFH') {
                                this.props.getInfoCheckInOutWFH()
                            }
                            // this.props.getUser2Action()
                        }} style={styles.errorVerifyTouch}>
                            <Icon name='redo-alt' size={Sizes.h38} color={'#107EEE'} />
                            <Text style={styles.errorVerifyTouchTitle}>  {userProfile.LangID === 'VN' ? 'Thử lại' : 'Reload'}</Text>
                        </TouchableOpacity>
                    )
                }

            </View>
        )
    }
    onRequestCheckInOut(statusCheckInOut) {
        const { typeCheckInOut } = this.props
        if (typeCheckInOut === 'WIFI') {
            let dateTime = this.getNowDate(3)
            this.props.requestCaptureCheckInOutAction({
                P0: this.state.wifiMacAddress + this.state.deviceID + this.getNowDate(4),
                P1: statusCheckInOut,
                P2: this.state.deviceID,
                P3: this.state.wifiMacAddress,
                // P3: '02:00:00:00:00:00',
                P4: dateTime,
                P5: this.state.wifiName,
            });
        } else {
            let dateTime = this.getNowDate(3)
            this.props.wfhRequestCaptureCheckInOutAction({
                P0: this.state.wifiMacAddress + this.state.deviceID + this.getNowDate(4),
                P1: statusCheckInOut,
                P2: this.state.deviceID,
                P3: dateTime,
            });
        }

    }
    render() {
        const {
            typeCheckInOut,
            codeVerify,
            itemCheckInOut,
        } = this.props
        // const typeCheckInOut = 'WIFI'
        const { wifiName, timeClock, isConnectedWifi, wifiMacAddress } = this.state
        // console.log('itemCheckInOut----- Props: ', itemCheckInOut)
        return (
            <View style={styles.body}>
                {/* <Text style={styles.title}>{typeCheckInOut === 'WFH' ? 'CHECK IN OUT WFH' : 'CHECK IN OUT WIFI'}</Text> */}
                <Text style={styles.title}>{!objectIsNull(itemCheckInOut) ? itemCheckInOut.name : ''}</Text>
                {typeCheckInOut === 'WIFI' &&
                    <View style={styles.wifi}>
                        <Image
                            source={isConnectedWifi ? getImage('ic_wifi_check_in') : getImage('ic_no_wifi')}
                            style={styles.sizeIcon}
                        // source={getImage(
                        //     isConnectedWifi ? 'ic_wifi_check_in' : 'ic_no_wifi',
                        // )}
                        // style={
                        //     isConnectedWifi ? styles.iconWifi : styles.iconNoWifi
                        // }
                        />
                        <Text style={styles.nameWifi}> {wifiName} </Text>
                    </View>
                }
                <View style={styles.dateTime}>
                    <View style={styles.horizontalView}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate(
                                'CalendarsContainer',
                            );
                            // NetworkInfo.getSSID().then(ssid => {
                            //     console.warn('Network Info - SSID: ', ssid)
                            // })

                        }} style={styles.touchDateTime}>
                            <Image
                                source={getImage('ic_calendar_check_in')}
                                style={styles.sizeIcon}
                            />
                            <Text numberOfLines={1} style={styles.nameWifi} > {this.getNowDate(1)} </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalView}>
                        <Text style={styles.time}>{timeClock}</Text>
                    </View>
                </View>

                {(codeVerify === '1' || codeVerify === "3" || codeVerify === "4" || codeVerify === "5" || codeVerify === "9" || codeVerify === 'error') ?
                    (
                        this.showErrorVerify()
                        // this.showCheckInOut()
                    )
                    :
                    (
                        this.showCheckInOut()
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        // backgroundColor: 'silver',
        paddingHorizontal: Sizes.s20,
        paddingVertical: Sizes.s20,
    },
    title: {
        fontSize: Sizes.h32,
        fontWeight: 'bold',
        color: '#0A79E9'
    },
    wifi: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Sizes.s5,
        paddingVertical: Sizes.s10,
        // padding: Sizes.s5
        // justifyContent: 'center'
    },
    sizeIcon: {
        width: Sizes.h40,
        height: Sizes.h40
    },
    nameWifi: {
        fontSize: Sizes.h26,
        // fontWeight: 'bold',
        color: '#000'
    },
    dateTime: {
        marginVertical: Sizes.s5,
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'yellow',
        // justifyContent: 'space-between',
        alignItems: 'center'
    },
    touchDateTime: {
        alignSelf: 'baseline',
        flexDirection: 'row',
        borderRadius: Sizes.s10,
        paddingVertical: Sizes.s10,
        // paddingHorizontal: Sizes.s5,
        backgroundColor: '#B3D7F8',
        paddingLeft: Sizes.s5,
        paddingRight: Sizes.s10,
        alignItems: 'center'
    },
    time: {
        textAlign: 'center',
        fontSize: Sizes.h42,
        fontWeight: 'bold',
        color: 'black',
        // backgroundColor: 'black',
        paddingVertical: Sizes.s10,
        borderRadius: Sizes.s10,

        // textShadowColor: '#5D5D5D',
        textShadowColor: '#F5F5F5',

        textShadowOffset: { width: 0, height: -6 },
        textShadowRadius: 2,
        // fontStyle: 'italic'
        // opacity: 0.8
        // textS
        // shadowColor: 'rgba(0, 0, 0, 0.5 )',
        // shadowOffset: { width: 0, height: 20 },
        // shadowRadius: Sizes.h10,
        // shadowOpacity: 0.8,
        // elevation: 20,
        // fontFamily: ''
    },
    checkInOut: {
        marginVertical: Sizes.s5,
        flexDirection: 'row',
        width: '100%',
        // backgroundColor: 'yellow',
        // justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: Sizes.s10,

    },
    touchCheckInOut: {
        alignSelf: 'center',
        width: '70%',
        paddingVertical: Sizes.s10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: Sizes.s40,
        marginVertical: Sizes.s15,
        flexDirection: 'row',
        paddingHorizontal: Sizes.s20,
    },
    titleTouchCheckInOut: {
        fontSize: Sizes.h24,
        color: 'white',
        textAlign: 'center',
        flex: 1,
    },
    itemCheck: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: Sizes.s5,
        // justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: Sizes.h30,
        fontWeight: 'bold',
        marginBottom: Sizes.s10,
    },
    textTitleCheck: {
        color: 'black',
        fontSize: Sizes.s28,
    },

    horizontalView: {
        width: '50%'
    },

    errorVerify: {
        width: '95%',
        margin: Sizes.s10,
        // borderRadius: Sizes.s10,
        // borderColor: 'silver',
        // borderWidth: Sizes.s2,
        alignSelf: 'center',
        paddingVertical: Sizes.s10,
        paddingHorizontal: Sizes.s20,
    },
    errorVerifyTitle: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',

        // backgroundColor: 'yellow',

    },
    errorVerifyIcon: {
        width: Sizes.h42,
        height: Sizes.h42
    },
    errorVerifyText: {
        fontSize: Sizes.h24,
        // fontWeight: '400',
        color: 'black'
    },
    errorVerifyTouch: {
        // width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: Sizes.s20,
        alignSelf: 'center',
    },
    errorVerifyTouchTitle: {
        fontSize: Sizes.h28,
        color: '#107EEE',
        fontWeight: '700'
    },

})
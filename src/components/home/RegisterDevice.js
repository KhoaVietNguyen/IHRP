import React from 'react'
import { StyleSheet, View, Text, SafeAreaView, Image, Platform, Alert } from 'react-native'
import { NetworkInfo } from 'react-native-network-info'
import NetInfo from "@react-native-community/netinfo"
import CustomHeader from '../custom/CustomHeader'
import { CustomButton } from '../custom/CustomButton'
import { Sizes } from '@dungdang/react-native-basic'
import getImage from '../../res/values/strings/iconStrS'
import DeviceInfo from 'react-native-device-info'
import { userProfile } from '../../config/settings'
import { objectIsNull, stringIsEmpty, arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions'
export default class RegisterDevice extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameWifi: '',
            isConnectedWifi: false,
            deviceName: '',
            deviceID: '',
            wifiMACAddress: '',
        }
    }
    componentDidUpdate(prevProps) {
        const { dataRegistryDevice, errorRegistryDevice } = this.props
        if (dataRegistryDevice !== prevProps.dataRegistryDevice) {
            if (!stringIsEmpty(dataRegistryDevice)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', dataRegistryDevice, [
                    {
                        text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel',
                        onPress: () => {
                            let onChangeStatusWillFocus = this.props.navigation.getParam('onChangeStatusWillFocus')
                            if (!objectIsNull(onChangeStatusWillFocus)) {
                                onChangeStatusWillFocus(true)
                            }
                            this.props.navigation.goBack()
                        }
                    }
                ])
            }
        }

        if (errorRegistryDevice !== prevProps.errorRegistryDevice) {
            if (!stringIsEmpty(errorRegistryDevice)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', errorRegistryDevice, [
                    {
                        text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel',
                        onPress: () => {

                        }
                    }
                ])
            }
        }

    }
    componentDidMount() {

        if (Platform.OS === 'android') {
            DeviceInfo.getAndroidId().then(value => {
                // console.log('getAndroidId: ', value)
                this.setState({
                    deviceID: value
                })
            })
        } else {
            // console.log('getUniqueId: ', DeviceInfo.getUniqueId())
            this.setState({
                deviceID: DeviceInfo.getUniqueId()
            })
        }


        const code = this.props.navigation.getParam('code')
        if (!stringIsEmpty(code)) {
            if (code === '1' || code === '2') {
                DeviceInfo.getDeviceName().then(value => {
                    this.setState({
                        deviceName: value
                    })
                })
            }
        }

        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.type === 'cellular') {
                this.setState({
                    nameWifi: stringIsEmpty(state.details.cellularGeneration) ? "" : `${state.details.carrier} ${state.details.cellularGeneration.toLocaleUpperCase()}`,
                    isConnectedWifi: state.isConnected
                })
            } else {
                this.setState({
                    isConnectedWifi: state.isConnected
                }, () => {
                    NetworkInfo.getSSID().then(ssid => {
                        if (this.state.isConnectedWifi) {
                            if (code === '1' || code === '2') {
                                NetworkInfo.getBSSID().then(value => {
                                    this.setState({
                                        wifiMACAddress: value,
                                        nameWifi: (ssid != null && ssid != undefined && ssid != "(null)" && ssid != "<unknown ssid>") ? ssid : 'Wifi'
                                    })
                                })
                            } else {
                                this.setState({
                                    nameWifi: (ssid != null && ssid != undefined && ssid != "(null)" && ssid != "<unknown ssid>") ? ssid : 'Wifi'
                                })
                            }
                        } else {
                            this.setState({
                                nameWifi: userProfile.LangID === 'VN' ? 'Không có kết nối mạng' : 'No network'
                            })
                        }
                    });
                })
            }
        });
    }
    render() {
        const { isConnectedWifi, nameWifi, deviceName, deviceID, wifiMACAddress } = this.state
        const code = this.props.navigation.getParam('code')
        const message = this.props.navigation.getParam('message')
        return (
            <SafeAreaView style={styles.body}>
                <CustomHeader title={userProfile.LangID === 'VN' ? 'Quản lý thiết bị' : 'Equipment management'} typeIconLeft={'back'} onPressLeft={() => { this.props.navigation.goBack() }} />
                <View style={styles.content}>
                    <View style={styles.detail}>
                        <View style={styles.title}>
                            <Text style={styles.textTitle}>{userProfile.LangID === 'VN' ? 'Kiểm tra dữ liệu' : 'Check the data'}</Text>
                            <Image source={getImage('ic_warning_round')} style={styles.iconTitle} />
                        </View>
                        <Text style={styles.textMessage}>{message}</Text>
                        <View style={styles.wifi}>
                            <Image source={getImage(isConnectedWifi ? 'ic_wifi_check_in' : 'ic_no_wifi')} style={isConnectedWifi ? styles.iconWifi : styles.iconNoWifi} />
                            <Text style={[styles.nameWifi, { color: isConnectedWifi ? '#275375' : 'red' }]}> {nameWifi}</Text>
                        </View>
                        {(code === '1' || code === '2') &&
                            (
                                <View style={styles.device}>
                                    <Image source={getImage('ic_android_device')} style={styles.iconDevice} />
                                    <Text style={styles.nameDevice}> {deviceName}</Text>
                                </View>
                            )
                        }
                    </View>
                </View>
                {(code === '1' || code === '2') &&
                    <View style={{ width: '95%', alignSelf: 'center' }}>
                        < CustomButton
                            title={userProfile.LangID === 'VN' ? 'Đăng ký thiết bị' : 'Device registration'}
                            onPress={() => {

                                this.props.registryDeviceAction({
                                    P1: deviceID,
                                    P2: deviceName,
                                    P3: wifiMACAddress
                                })
                            }} />
                    </View>
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: Sizes.s20,
        paddingVertical: Sizes.s20,
    },
    detail: {
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: Sizes.s20,
        paddingVertical: Sizes.s20,
        shadowColor: 'rgba(0, 0, 0, 0.5 )',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: Sizes.h10,
        shadowOpacity: 0.2,
        elevation: 10,
        borderRadius: Sizes.h10,

    },
    title: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    iconTitle: {
        width: Sizes.h40,
        height: Sizes.h40
    },
    textTitle: {
        fontSize: Sizes.h30,
        fontWeight: 'bold'
    },
    textMessage: {
        fontSize: Sizes.h30,
        marginVertical: Sizes.s5
    },
    wifi: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWifi: {
        width: Sizes.s45,
        height: Sizes.s45,
    },
    iconNoWifi: {
        width: Sizes.s35,
        height: Sizes.s35,
    },
    nameWifi: {
        fontSize: Sizes.h30,
    },

    device: {
        width: '100%',
        flexDirection: 'row'
    },
    iconDevice: {
        width: Sizes.s200,
        height: Sizes.s340
    },
    nameDevice: {
        fontSize: Sizes.h30,
        fontWeight: 'bold'
    }

})
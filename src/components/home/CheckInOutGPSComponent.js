import React, { useEffect, useState } from 'react'

import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
    Platform,
    ScrollView,
} from 'react-native'
import Sizes from '../custom/popup/styles/fontStyles'
import getImage from '../../res/values/strings/iconStrS'
import { userProfile } from '../../config/settings'

export default CheckInOutGPSComponent = (props) => {
    const { } = props
    const [visibleModal, setVisibleModal] = useState(false)
    const language = userProfile.LangID
    // const language = 'EN'
    const showTitlePermission = (text) => {
        return (
            <Text style={styles.titlePermission}>{text}</Text>
        )
    }
    return (
        <View style={styles.body}>
            <Image
                resizeMode='contain'
                source={getImage('img_default_map')}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={[styles.textContent, { color: '#161616' }]}>{language === 'VN' ? 'Chấm công GPS' : 'Check in/out GPS'}</Text>
                <Text style={[styles.textContent, { color: '#999999' }]}>{language === 'VN' ? 'Sử dụng vị trí của thiết bị trên bản đồ để chấm công' : "Use your device's location on the map for timekeeping"}</Text>
                <TouchableOpacity

                    onPress={() => { setVisibleModal(true) }}
                ><Text style={[styles.textContent, { color: '#2589EE', textDecorationLine: 'underline' }]}>{language === 'VN' ? 'Quyền truy cập và riêng tư' : 'Access and privacy'}</Text></TouchableOpacity>
            </View>

            <Modal
                transparent={true}
                onRequestClose={() => {
                    // setVisible(false)
                }}
                hardwareAccelerated={true}
                visible={visibleModal}
                animationType='fade'
            >
                <View style={styles.bodyModal}>
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => {

                            setVisibleModal(false)
                        }}
                    >
                        <TouchableWithoutFeedback>
                            <View style={styles.contentModal}>
                                <Text style={styles.titleModal}>{language === 'VN' ? 'Quyền truy cập và riêng tư' : 'Access and privacy'}</Text>
                                <View style={styles.lineModal}></View>

                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{
                                        flexGrow: 1,
                                    }}
                                    style={{
                                        flex: 1,
                                    }}>
                                    {/* <View style={{ height: 300, width: 70, backgroundColor: 'orange' }}></View> */}
                                    {showTitlePermission(language === 'VN' ? 'Quyền truy cập' : 'Access')}
                                    <View style={styles.contentPermission}>
                                        <View style={styles.dotPermission} />
                                        <Text style={styles.textPermission}>{language === 'VN' ? `Ứng dụng sẽ xin phép truy cập vị trí & mở định vị GPS. Nếu bạn từ chối thì Ứng dụng sẽ không truy cập và bạn không thể chấm công bằng hình thức này.` : `Application will ask for permission to access location & open GPS location. If you decline then the App will not access and you cannot time attendance this form.`}</Text>
                                    </View>

                                    <View style={[styles.contentPermission, { marginBottom: Sizes.s40 }]}>
                                        <View style={styles.dotPermission} />
                                        <Text style={styles.textPermission}>{language === 'VN' ? `Đôi khi vị trí của thiết bị sẽ bị sai lệch so với vị trí thực tế được ghi nhận trên GoogleMaps` : `Sometimes the device's location will be deviated from the actual location recorded on GoogleMaps`}</Text>
                                    </View>

                                    {showTitlePermission(language === 'VN' ? 'Quyền riêng tư' : 'privacy')}
                                    <View style={styles.contentPermission}>
                                        <View style={styles.dotPermission} />
                                        <Text style={styles.textPermission}>{language === 'VN' ? `Ứng dụng chỉ ghi nhận vị trí của bạn khi bấm nút ` : `The app only records your location at the press of a button `}<Text style={{ fontWeight: 'bold' }}>{`Check-in/out`}</Text>{language === 'VN' ? `, ngoài ra sẽ không ghi nhận hoặc theo dõi vị trí của bạn dưới bất kì hình thức nào.` : `, besides it will not record or track your location in any way`}</Text>
                                    </View>
                                    <View style={styles.contentPermission}>
                                        <View style={styles.dotPermission} />
                                        <Text style={styles.textPermission}>{language === 'VN' ? `Ứng dụng sẽ chỉ sử dụng vị trí khi bạn vào Màn hình ` : `Application will only use location when you go to Screen `}<Text style={{ fontWeight: 'bold' }}>{language === 'VN' ? `Chấm công GPS.` : `GPS timekeeping.`}</Text>{}</Text>
                                    </View>
                                    <View style={styles.contentPermission}>
                                        <View style={styles.dotPermission} />
                                        <Text style={styles.textPermission}>{language === 'VN' ? `Vị trí của bạn chỉ được sử dụng với mục đích ghi nhận vị trí Chấm công ngoài ra sẽ không được sử dụng với bất kỳ mục đích nào khác.` : `Your Location is only used for the purpose of recording Time Attendance and will not be used for any other purpose.`}</Text>
                                    </View>
                                </ScrollView>
                                <TouchableOpacity
                                    onPress={() => {
                                        setVisibleModal(false)
                                        props.navigation.navigate('RegisterDeviceGPSContainer', { code: '1', type: 'GPS' })
                                    }}
                                    style={styles.touchConfirm}
                                >
                                    <Text style={styles.textTouchConfirm}>OK</Text>

                                </TouchableOpacity>
                            </View>

                        </TouchableWithoutFeedback>

                    </TouchableOpacity>
                </View>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        marginVertical: Sizes.s20,
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        paddingHorizontal: Sizes.s20,
        borderWidth: 1,
        borderRadius: Sizes.s20,
        paddingVertical: Sizes.s20,
        backgroundColor: '#fff',
        borderColor: '#fff',

        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowRadius: 2,
        shadowOpacity: 0.25,
        shadowOffset: {
            width: 0,
            height: 4
        },
        elevation: 5,
    },
    image: {
        // width: Sizes.h52,
        // height: Sizes.h52
    },
    content: {
        flex: 1,
        paddingHorizontal: Sizes.s20,
        // paddingVertical: Sizes.s10
        // backgroundColor: 'red'
    },

    textContent: {
        fontSize: Sizes.h32,
    },

    bodyModal: {
        flex: 1,
        backgroundColor: '#00000066'
    },
    contentModal: {
        width: '90%',
        height: Dimensions.get('window').height / 7 * 6,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginVertical: Sizes.s80,
        borderRadius: Sizes.s20,
    },
    titleModal: {
        fontSize: Sizes.h46,
        fontWeight: 'bold',
        color: '#2086ED',
        marginHorizontal: Sizes.s30,
        marginVertical: Sizes.s30,
        // backgroundColor: 'red'
    },
    lineModal: {
        width: '100%',
        height: 1,
        backgroundColor: '#E9E9E9'
    },
    titlePermission: {
        marginHorizontal: Sizes.s30,
        fontSize: Sizes.h32,
        fontWeight: 'bold',
        color: '#000',
        marginTop: Sizes.s40,
        marginBottom: Sizes.s10,

    },
    contentPermission: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: Sizes.s30,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingVertical: Sizes.s20,
        // backgroundColor: 'red'
    },
    dotPermission: {
        width: Sizes.s15,
        height: Sizes.s15,
        borderRadius: Sizes.s10,
        backgroundColor: '#107DEC',
        marginTop: Sizes.s20,
        // marginRight: Sizes.s20,
    },
    textPermission: {
        fontSize: Sizes.h32,
        color: '#000',
        paddingHorizontal: Sizes.s20,

    },
    touchConfirm: {
        width: '90%',
        backgroundColor: '#0F7DEC',
        paddingVertical: Sizes.s20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: Sizes.s10,
        marginVertical: Sizes.s30,
    },
    textTouchConfirm: {
        fontSize: Sizes.h32,
        color: '#fff',
        fontWeight: 'bold'
    }
})
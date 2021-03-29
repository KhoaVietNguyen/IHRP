import React from 'react'
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Image, } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import getImage from '../../../res/values/strings/iconStrS'
import { CustomButton } from '../CustomButton'
import { userProfile } from '../../../config/settings'

// let dataAlert = {
//     visible: true, // Trạng thái ẩn/ hiện (false/true) popup
//     isClose: true, // Bấm ngoài lề để tắt popup. isClose = true => Cho phép | isClose = false => Không cho phép
//     message: 'Nội dung', // Nội dung của popup
//     typePopup: 'success', // Loại thông báo. success = Thành công = màu xanh lá | warning = Cảnh báo = màu vàng
//     typeTouch: 'single', // Loại button. single = hiển thị 1 button | double = hiển thị 2 button,
//     arrayTouch: [ // Danh sách thông tin của các nút bấm, typeTouch = single => array có 1 phần tử | typeTouch = double => array có 2 phần tử
//         {
//             title: 'Tên nút bấm',
//             onPress: () => {
//                 console.log('nút bấm 111111')
//             },
//         },
//         {
//             title: 'Tên nút bấm 2',
//             onPress: () => {
//                 console.log('nút bấm 222222')
//             },
//         }
//     ]
// }

export default class PopupAlert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        const { visibleAlert, dataAlert } = this.props
        if (objectIsNull(dataAlert)) {
            return (
                <View></View>
            )
        } else {
            return (
                <Modal
                    transparent={true}
                    onRequestClose={() => {
                        // this.onChangeVisiblePopup(false)
                    }}
                    hardwareAccelerated={true}
                    visible={visibleAlert}
                    animationType="fade">
                    <TouchableOpacity
                        activeOpacity={dataAlert.isClose ? 0 : 1}
                        onPress={() => {
                            if (dataAlert.isClose) {
                                if (!objectIsNull(this.props.popupAlertAction)) {
                                    this.props.popupAlertAction({
                                        visible: false
                                    })
                                }

                            }
                        }}
                        style={{
                            flex: 1,
                            backgroundColor: '#00000066',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: Sizes.h30,
                            paddingVertical: Sizes.h100,
                        }}>
                        <TouchableWithoutFeedback>
                            <View style={styles.content}>
                                <View style={styles.icon}>
                                    <Image source={getImage(dataAlert.typePopup === 'success' ? 'ic_succes_round'
                                        : dataAlert.typePopup === 'warning' ? 'ic_warning_round'
                                            : dataAlert.typePopup === 'update' ? 'ic_update_app' :
                                                'ic_success_round')}
                                        style={{
                                            width: Sizes.s100,
                                            height: Sizes.s100,

                                            // tintColor: 'white',
                                            // backgroundColor: 'blue',
                                            // opacity: 0.2,
                                        }}



                                    />
                                    {/* <View style={{width: 50, height: 100,}}></View> */}
                                </View>
                                <View style={styles.header}>
                                    {dataAlert.typePopup === 'update' &&
                                        (
                                            <View style={{
                                                width: '80%',
                                                // backgroundColor: 'yellow',
                                                paddingHorizontal: Sizes.s20,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignSelf: 'center'
                                            }}>
                                                {/* <Text style={styles.message}>{dataAlert.message}</Text> */}
                                                <Text style={styles.title}>{userProfile.LangID === 'VN' ? 'Yêu cầu cập nhật' : 'Request update'}</Text>
                                            </View>
                                        )
                                    }
                                    <View style={{
                                        width: '80%',
                                        // backgroundColor: 'yellow',
                                        paddingHorizontal: Sizes.s20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'center'
                                    }}>
                                        <Text style={styles.message}>{dataAlert.message}</Text>
                                    </View>
                                    {dataAlert.typePopup === 'update' ?
                                        (
                                            <TouchableOpacity onPress={() => { dataAlert.arrayTouch[0].onPress() }} style={styles.updateTouch}>
                                                <Text style={[
                                                    styles.textTouch,
                                                    { color: 'white' }
                                                ]}>{dataAlert.arrayTouch[0].title}</Text>
                                            </TouchableOpacity>
                                        )
                                        :
                                        (
                                            dataAlert.typeTouch === 'single' ?
                                                (
                                                    <TouchableOpacity onPress={() => { dataAlert.arrayTouch[0].onPress() }} style={styles.singleTouch}>
                                                        <Text style={[
                                                            styles.textTouch,
                                                            { color: dataAlert.typePopup === 'success' ? '#29CD34' : dataAlert.typePopup === 'warning' ? '#FEC303' : '#29CD34' }
                                                        ]}>{dataAlert.arrayTouch[0].title}</Text>
                                                    </TouchableOpacity>

                                                )
                                                :
                                                (
                                                    <View style={styles.doubleTouch}>
                                                        <TouchableOpacity onPress={() => { dataAlert.arrayTouch[0].onPress() }}>
                                                            <Text style={[styles.textTouch, { color: '#9197A1' }]}>{dataAlert.arrayTouch[0].title}</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity onPress={() => { dataAlert.arrayTouch[1].onPress() }}>
                                                            <Text style={[styles.textTouch, { color: dataAlert.typePopup === 'success' ? '#29CD34' : dataAlert.typePopup === 'warning' ? '#FEC303' : '#29CD34' }]}>{dataAlert.arrayTouch[1].title}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                        )
                                    }
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            )
        }

    }
}

const styles = StyleSheet.create({
    content: {
        width: '100%',
    },
    header: {
        width: '100%',
        // height: 100,
        backgroundColor: 'white',
        // paddingTop: Sizes.s140,
        marginTop: Sizes.h40,
        borderRadius: Sizes.s10,
        paddingTop: Sizes.s80
    },
    title: {
        fontSize: Sizes.h36,
        color: 'black'
    },
    icon: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: Sizes.h100,
        padding: Sizes.s10,
        alignSelf: 'center',
        zIndex: 1,
    },
    message: {
        fontSize: Sizes.h30,
        color: '#335272',
        textAlign: 'center',
        marginVertical: Sizes.s40
    },
    singleTouch: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Sizes.s40
    },
    updateTouch: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: Sizes.s15,
        alignSelf: 'center',
        backgroundColor: '#2966BF',
        borderRadius: Sizes.s200,
        marginVertical: Sizes.s20,
    },
    textTouch: {
        fontSize: Sizes.h34,
        textAlign: 'center'
    },

    doubleTouch: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        paddingVertical: Sizes.s40,
    }
})
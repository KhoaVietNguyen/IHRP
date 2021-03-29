import * as React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Sizes, Functions } from '@dungdang/react-native-basic'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { iconStr } from '../../res/values/strings/iconStr'
import getImage from '../../res/values/strings/iconStrS'
import LinearGradient from 'react-native-linear-gradient';
import { fontSizes, fontColors, fontView } from '../../res/values/styles/appStyles'
const colorButton = {
    setting: '#4F8DFF',
    remove: '#F44336',
    send: '#4F8DFF',
    reload: '#707070',
    detail: 'white',
    new: '#56db52',
    rollBack: '#FCC201',

    disabled: 'gray',
    disabledText: 'white',

    defaultBackground: 'white',
    defaultText: 'white',

}

const CustomButton = (props) => {
    const { arrayIsEmpty, stringIsEmpty, objectIsNull } = Functions
    const {
        type,
        onPress,
        title,
        disabled,
        theme,
    } = props

    return (

        <View style={{ width: '100%' }}>
            {type === 'send' ?
                (
                    <TouchableOpacity
                        disabled={disabled === undefined ? false : disabled}
                        onPress={() => {
                            if (!objectIsNull(onPress)) {
                                onPress()
                            }
                        }}
                        style={[styles.touch, { backgroundColor: disabled ? colorButton.disabled : colorButton.send }]}
                    >
                        <View style={styles.send}>
                            {/* <Icon name='paper-plane' size={Sizes.s50} color='white' /> */}
                            <Image style={styles.image} source={iconStr.ic_send} />
                            <Text style={[styles.text, { color: colorButton.defaultText }]}>{title === undefined ? 'NHẤN VÀO' : stringIsEmpty(title) ? title : title}</Text>
                            <View></View>
                        </View>
                    </TouchableOpacity>
                )
                : type === 'rollBack' ?
                    (
                        (
                            <TouchableOpacity
                                disabled={disabled === undefined ? false : disabled}
                                onPress={() => {
                                    if (!objectIsNull(onPress)) {
                                        onPress()
                                    }
                                }}
                                style={[styles.touch, { backgroundColor: 'white', borderWidth: 1, borderColor: colorButton.rollBack }]}
                            >
                                <View style={styles.send}>
                                    {/* <Icon name='paper-plane' size={Sizes.s50} color='white' /> */}
                                    <Image style={styles.image} source={getImage('ic_tralai')} />
                                    <Text style={[styles.text, { color: colorButton.rollBack }]}>{title === undefined ? 'NHẤN VÀO' : stringIsEmpty(title) ? title : title}</Text>
                                    <View></View>
                                </View>
                            </TouchableOpacity>
                        )
                    )
                    : type === 'close' ?
                        (
                            <TouchableOpacity
                                disabled={disabled === undefined ? false : disabled}
                                onPress={() => {
                                    if (!objectIsNull(onPress)) {
                                        onPress()
                                    }
                                }}
                                style={[styles.closeTouch, { backgroundColor: disabled ? colorButton.disabled : colorButton.defaultText }]}
                            >
                                <View style={styles.send}>
                                    <Image style={styles.image} source={disabled ? iconStr.ic_close_white : iconStr.ic_remove_red} />
                                    {/* <Icon name='times' size={Sizes.s50} color={disabled ? 'white' : 'red'} /> */}
                                    <Text style={[styles.text, { color: disabled ? colorButton.disabledText : colorButton.remove }]}>{title === undefined ? 'NHẤN VÀO' : stringIsEmpty(title) ? title : title}</Text>
                                    <View></View>
                                </View>
                            </TouchableOpacity>
                        )
                        : type === 'setting' ?
                            (
                                <TouchableOpacity
                                    disabled={disabled === undefined ? false : disabled}
                                    onPress={() => {
                                        if (!objectIsNull(onPress)) {
                                            onPress()
                                        }
                                    }}
                                    style={[styles.touch, {
                                        backgroundColor: disabled ? fontColors.buttonDisableViewApplication : fontColors.buttonViewApplication,
                                        paddingVertical: Sizes.h20,
                                        // marginRight: Sizes.h20,
                                    }]}
                                >
                                    <View style={styles.send}>
                                        <Image style={styles.image} source={iconStr.ic_setting_blue} />
                                        {/* <Icon name='times' size={Sizes.s50} color={disabled ? 'white' : 'red'} /> */}
                                        {/* <Text style={[styles.text, { color: colorButton.setting, }]}>{title === undefined ? 'NHẤN VÀO' : stringIsEmpty(title) ? title : title}</Text> */}
                                        <Text numberOfLines={1} style={[styles.text, { maxWidth: '80%', color: disabled ? fontColors.buttonDisableTextAppplication : fontColors.buttonTextAppplication, fontWeight: 'normal' }]}>{title === undefined ? 'NHẤN VÀO' : stringIsEmpty(title) ? title : title}</Text>
                                        <View></View>
                                    </View>
                                </TouchableOpacity>
                            )
                            : type === 'view' ?
                                (
                                    <TouchableOpacity
                                        disabled={disabled === undefined ? false : disabled}
                                        onPress={() => {
                                            if (!objectIsNull(onPress)) {
                                                onPress()
                                            }
                                        }}
                                        style={[styles.touch, {
                                            backgroundColor: disabled ? fontColors.buttonDisableViewApplication : fontColors.buttonViewApplication,
                                            paddingVertical: Sizes.h20,
                                            // marginLeft: Sizes.h20,
                                            // marginHorizontal: Sizes.s40,
                                        }]}
                                    >
                                        <View style={styles.send}>
                                            <Image style={styles.image} source={iconStr.ic_eye_blue} />
                                            {/* <Icon name='times' size={Sizes.s50} color={disabled ? 'white' : 'red'} /> */}
                                            {/* <Text style={[styles.text, { color: colorButton.setting, fontSize: Sizes.s25, maxWidth: '80%' }]}>{title === undefined ? 'NHẤN VÀO' : stringIsEmpty(title) ? title : title}</Text> */}
                                            <Text numberOfLines={1} style={[styles.text, { maxWidth: '80%', color: disabled ? fontColors.buttonDisableTextAppplication : fontColors.buttonTextAppplication, fontWeight: 'normal' }]}>{title === undefined ? 'NHẤN VÀO' : stringIsEmpty(title) ? title : title}</Text>
                                            <View></View>
                                        </View>
                                    </TouchableOpacity>
                                )
                                : type === 'search' ?
                                    (
                                        <TouchableOpacity
                                            disabled={disabled === undefined ? false : disabled}
                                            onPress={() => {
                                                if (!objectIsNull(onPress)) {
                                                    onPress()
                                                }
                                            }}
                                            style={[styles.touch, { backgroundColor: disabled ? colorButton.disabled : colorButton.send }]}
                                        >
                                            <View style={styles.send}>
                                                {/* <Icon name='paper-plane' size={Sizes.s50} color='white' /> */}
                                                <Image style={styles.image} source={iconStr.ic_search_white} />
                                                <Text style={[styles.text, { color: colorButton.defaultText }]}>{title === undefined ? 'NHẤN VÀO' : stringIsEmpty(title) ? title : title}</Text>
                                                <View></View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                    : type === 'reload' ?
                                        (
                                            <TouchableOpacity
                                                disabled={disabled === undefined ? false : disabled}
                                                onPress={() => {
                                                    if (!objectIsNull(onPress)) {
                                                        onPress()
                                                    }
                                                }}
                                                style={[styles.reloadTouch, { backgroundColor: colorButton.defaultBackground }]}
                                            >
                                                <View style={styles.send}>
                                                    <Image style={styles.imageReload} source={getImage('ic_undo_black')} />
                                                    {/* <Icon name='times' size={Sizes.s50} color={disabled ? 'white' : 'red'} /> */}
                                                    <Text style={[styles.text, { color: colorButton.reload, fontSize: Sizes.s25, maxWidth: '80%' }]}>{title === undefined ? 'NHẤN VÀO' : stringIsEmpty(title) ? title : title}</Text>
                                                    <View></View>
                                                </View>
                                            </TouchableOpacity>
                                        ) : type === 'new' ?
                                            (
                                                <TouchableOpacity
                                                    disabled={disabled === undefined ? false : disabled}
                                                    onPress={() => {
                                                        if (!objectIsNull(onPress)) {
                                                            onPress()
                                                        }
                                                    }}
                                                    style={[styles.touch, { backgroundColor: disabled ? colorButton.disabled : colorButton.send }]}
                                                >
                                                    <View style={styles.send}>
                                                        {/* <Icon name='paper-plane' size={Sizes.s50} color='white' /> */}
                                                        <Image style={[styles.image,{tintColor:'#FFFFFF'}]} source={getImage('ic_add_primary')} />
                                                        <Text style={[styles.text, { color: colorButton.defaultText }]}>{title === undefined ? 'NHẤN VÀO' : stringIsEmpty(title) ? title : title}</Text>
                                                        <View></View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                            : type === 'detail' ?
                                                (
                                                    (
                                                        <TouchableOpacity
                                                            disabled={disabled === undefined ? false : disabled}
                                                            onPress={() => {
                                                                if (!objectIsNull(onPress)) {
                                                                    onPress()
                                                                }
                                                            }}
                                                            style={[styles.touch, {
                                                                backgroundColor: disabled ? fontColors.buttonDisableViewApplication : fontColors.buttonViewApplication,
                                                                paddingVertical: Sizes.h20,
                                                            }]}
                                                        >
                                                            <Text style={[styles.text, { color: disabled ? fontColors.buttonDisableTextAppplication : fontColors.buttonTextAppplication, fontWeight: 'normal' }]}>{title === undefined ? 'NHẤN VÀO' : stringIsEmpty(title) ? title : title}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                )
                                                :
                                                (

                                                    <TouchableOpacity
                                                        disabled={disabled === undefined ? false : disabled}
                                                        onPress={() => {
                                                            if (!objectIsNull(onPress)) {
                                                                onPress()
                                                            }
                                                        }}
                                                        style={!objectIsNull(theme) ? null : [styles.touch, { backgroundColor: disabled ? colorButton.disabled : colorButton.send, paddingVertical: Sizes.h20 }]}
                                                    >
                                                        {!objectIsNull(theme) ?
                                                            (
                                                                <LinearGradient
                                                                    style={[styles.touch, { backgroundColor: disabled ? colorButton.disabled : colorButton.send, paddingVertical: Sizes.h20 }]}
                                                                    // style={{}} 
                                                                    start={{ x: 1, y: 0 }}
                                                                    end={{ x: 0, y: 0 }}
                                                                    colors={
                                                                        theme === '1' ? ['#45C9FA', '#0159FB']
                                                                            : theme === '2' ? ['#FD8401', '#FACC2E']
                                                                                : theme === '3' ? ['#33BA39', '#BAF36E']
                                                                                    : ['#45C9FA', '#0159FB']
                                                                    }>
                                                                    <Text style={[styles.text, { color: colorButton.defaultText }]}>{title === undefined ? 'NHẤN VÀO' : stringIsEmpty(title) ? title : title}</Text>
                                                                </LinearGradient>
                                                            )
                                                            :
                                                            (
                                                                <Text style={[styles.text, { color: colorButton.defaultText }]}>{title === undefined ? 'NHẤN VÀO' : stringIsEmpty(title) ? title : title}</Text>
                                                            )
                                                        }
                                                    </TouchableOpacity>
                                                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    touch: {
        width: '100%',
        paddingVertical: Sizes.s15,
        paddingHorizontal: Sizes.h28,
        // backgroundColor: '#3498db',
        alignSelf: 'center',
        borderRadius: fontView.border,
        marginVertical: Sizes.h20,
        // shadowColor: 'rgba(0, 0, 0, 0.5 )',
        // shadowOffset: { width: 0, height: 4 },
        // shadowRadius: Sizes.h10,
        // shadowOpacity: 0.2,
        // elevation: 5,
    },
    closeTouch: {
        width: '100%',
        paddingVertical: Sizes.s15,
        paddingHorizontal: Sizes.h28,
        // backgroundColor: '#3498db',
        alignSelf: 'center',
        borderRadius: fontView.border,
        marginVertical: Sizes.h20,
        borderWidth: 0.5,
        borderColor: colorButton.remove,
        // shadowColor: 'rgba(0, 0, 0, 0.5 )',
        // shadowOffset: { width: 0, height: 4 },
        // shadowRadius: Sizes.h10,
        // shadowOpacity: 0.2,
        // elevation: 10,
    },
    settingTouch: {
        width: '100%',
        paddingVertical: Sizes.s15,
        paddingHorizontal: Sizes.h28,
        // backgroundColor: '#3498db',
        alignSelf: 'center',
        borderRadius: Sizes.h48,
        marginVertical: Sizes.h20,
        // borderWidth: 1,
        // borderColor: colorButton.setting,
        shadowColor: 'rgba(0, 0, 0, 0.5 )',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: Sizes.h10,
        shadowOpacity: 0.2,
        elevation: 10,
    },
    reloadTouch: {
        width: '40%',
        paddingVertical: Sizes.s15,
        paddingHorizontal: Sizes.h28,
        // backgroundColor: '#3498db',
        alignSelf: 'center',
        borderRadius: Sizes.h48,
        marginVertical: Sizes.h20,
        // borderWidth: 1,
        // borderColor: colorButton.reload,
        shadowColor: 'rgba(0, 0, 0, 0.5 )',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: Sizes.h10,
        shadowOpacity: 0.2,
        elevation: 10,
    },

    text: {
        // color: 'white',
        fontSize: Sizes.s30,
        fontWeight: '600',
        textAlign: 'center'
    },
    send: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        width: Sizes.s50,
        height: Sizes.s50
    },
    imageReload: {
        width: Sizes.s50,
        height: Sizes.s50
    }
})

export { CustomButton }
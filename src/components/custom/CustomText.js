import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Image, Platform, TouchableOpacity } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { iconStr } from '../../res/values/strings/iconStr'
import getImage from '../../res/values/strings/iconStrS'
import { colorForm } from '../../res/values/strings/colorStr'
import { objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { fontSizes, fontColors, fontView } from '../../res/values/styles/appStyles'
const CustomText = (props) => {
    const [item, setItem] = useState(props.item)
    const [value, setValue] = useState(props.value)
    // const [error, setError] = useState(props.error)
    useEffect(() => {
        setItem(props.item)
        setValue(props.value)
        // setError(props.error)
        if (!stringIsEmpty(props.item)) {
            if (!objectIsNull(props.onResetError)) {
                props.onResetError()
            }
        }
    }, [props.item, props.value])
    // console.log('valueeeeeeeeText: ', value)
    if (item.visible !== false) {
        return (
            <View style={[styles.body, {
                paddingVertical: Sizes.s10,
                borderColor: !stringIsEmpty(props.error) ? fontColors.borderError : fontColors.border
            }]}>
                {!stringIsEmpty(value) ?
                    (
                        <View>
                            <Text
                                style={[styles.textInput, { fontSize: fontSizes.titleSmall, color: fontColors.title ,marginBottom:Sizes.s15}]}
                            >
                                {!objectIsNull(item) ? (!stringIsEmpty(item.caption) ? item.caption : (!stringIsEmpty(props.tempCaption) ? props.tempCaption : '')) : ''}
                            </Text>
                            <Text
                                style={[styles.textInput, { fontSize: fontSizes.title, color: fontColors.valueInput }]}
                            >
                                {!objectIsNull(value) ? value : ''}
                            </Text>
                        </View>
                    )
                    :
                    (
                        <Text
                            style={[styles.textInput, { fontSize: fontSizes.title, color: fontColors.title , paddingVertical:Sizes.s10}]}
                        >
                            {!objectIsNull(item) ? (!stringIsEmpty(item.caption) ? item.caption : (!stringIsEmpty(props.tempCaption) ? props.tempCaption : '')) : ''}
                        </Text>
                    )
                }

                {item.requireSubmit === '1' && stringIsEmpty(value) &&
                    (
                        <Image source={iconStr.ic_remove_red} style={styles.iconRequire} />
                    )
                }
                {item.requireSubmit === '1' && !stringIsEmpty(value) &&
                    (
                        <Image source={getImage('ic_success_sm')} style={styles.iconRequire} />
                    )
                }
                {item.requireSubmit === '3' && !stringIsEmpty(value) &&
                    (
                        <TouchableOpacity onPress={() => {
                            if (!objectIsNull(item.onPress)) {
                                item.onPress()
                            }
                        }}>
                            <Image source={getImage('ic_eye_blue')} style={styles.iconRequire} />
                        </TouchableOpacity>
                    )
                }
            </View>
        )
    } else {
        return (<View></View>)
    }
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: fontView.paddingHorizontal,
        paddingVertical: fontView.paddingVertical,
        alignItems: 'center',
        borderRadius: fontView.border,
        // marginHorizontal: Sizes.h20
        alignSelf: 'center',
        backgroundColor: colorForm.inputForm,
        borderWidth: fontSizes.border,
        
    },
    textInput: {
        flex: 1,
        // paddingVertical: Platform.OS === 'android' ? Sizes.s10 : Sizes.s15
    },
    iconRequire: {
        width: Sizes.s45,
        height: Sizes.s45
    }
})

export { CustomText }
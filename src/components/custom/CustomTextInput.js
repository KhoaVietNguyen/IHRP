import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { iconStr } from '../../res/values/strings/iconStr'
import { colorForm } from '../../res/values/strings/colorStr'
import { objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { fontColors, fontView, fontSizes } from '../../res/values/styles/appStyles'
const CustomTextInput = (props) => {
    const [item, setItem] = useState(props.item)
    const [text, setText] = useState(props.text)
    const [focused, setFocused] = useState(false)
    useEffect(() => {
        setItem(props.item)
        setText(props.text)
    }, [props.item, props.text])

    return (
        <View style={[styles.body, {
            borderColor: focused ? fontColors.borderFocused: fontColors.border,
        }]}>
            {/* <Text>{!stringIsEmpty(item.placeHolder) ? item.placeHolder : ''}</Text> */}
            <TextInput
                onBlur={() => { 
                    setFocused(false)
                }}
                onFocus={() => { 
                    setFocused(true)
                }}
                secureTextEntry={item.tag === 'InputPassword' ? true : false}
                editable={!objectIsNull(item.editable) ? item.editable : true}
                // placeHolder={!stringIsEmpty(item.placeHolder) }
                style={styles.textInput}
                value={text}
                placeholder={!stringIsEmpty(item.placeHolder) ? item.placeHolder : ''}
                placeholderTextColor={fontColors.title}
                // value={item.value}
                onChangeText={props.onChangeText}
            />
            {/* <View style={{ width: 5, height: 5, backgroundColor: 'red' }}></View> */}
            <Image
                source={(item.tag === 'Reason' || item.tag === 'reasonOfRejection') ? iconStr.ic_pen : item.tag === 'Money' ? iconStr.ic_cur_vnd : iconStr.ic_pen}
                style={styles.iconRequire}
            />
            {/* {item.require && item.value === '' &&
                (
                    <Image source={iconStr.ic_pen} style={styles.iconRequire} />
                )
            } */}
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: fontView.paddingHorizontal,
        paddingVertical: fontView.paddingVertical,
        alignItems: 'center',
        borderRadius: fontView.border,
        borderWidth: fontSizes.border,

        // marginHorizontal: Sizes.h20
        alignSelf: 'center',
        backgroundColor: colorForm.inputForm
    },
    textInput: {
        flex: 1,
        paddingVertical: Sizes.h10,
        color: 'black'
    },
    iconRequire: {
        width: Sizes.s45,
        height: Sizes.s45
    }
})

export { CustomTextInput }
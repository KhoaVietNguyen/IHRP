import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { userProfile } from '../../config/settings'
import { fontColors, fontView, fontSizes } from '../../res/values/styles/appStyles'
import getImage from '../../res/values/strings/iconStrS'
import { iconStr } from '../../res/values/strings/iconStr'
const CustomTextInputHorizontal = (props) => {
    const [text, setText] = useState('')
    const [item, setItem] = useState(undefined)

    useEffect(() => {
        setItem(props.item)
        setText(props.text)
    }, [props.item, props.text])
    console.log('CustomTextInputHorizontal: ', item)
    return (
        <View style={styles.body}>
            {!objectIsNull(item) ?
                (
                    item.editable ?
                        (
                            <View style={styles.content}>
                                <Text style={styles.title}>{!objectIsNull(item) ? item.caption : ''}</Text>
                                <TextInput
                                    value={text}
                                    multiline
                                    placeholder={
                                        !objectIsNull(item) ?
                                            (
                                                item.editable ? (userProfile.LangID === 'VN' ? 'Nhập nội dung' : 'Input content') :
                                                    ''
                                            )
                                            :
                                            ''
                                    }
                                    style={styles.textInput}
                                    onChangeText={(text) => {
                                        setText(text)
                                        if (!objectIsNull(props.onChangeTextInput)) {
                                            props.onChangeTextInput(text.trim())
                                        }
                                    }}

                                    placeholderTextColor={fontColors.title}
                                    editable={!objectIsNull(item) ? item.editable : true}
                                />
                                {!objectIsNull(item) ?
                                    (
                                        item.editable ?
                                            (
                                                <Image
                                                    source={!objectIsNull(item) ?
                                                        (
                                                            (item.tag === 'Reason' || item.tag === 'reasonOfRejection') ? iconStr.ic_pen : item.tag === 'Money' ? iconStr.ic_cur_vnd : iconStr.ic_pen
                                                        )
                                                        :
                                                        (
                                                            undefined
                                                        )
                                                    }
                                                    style={styles.iconRequire}
                                                />
                                            )
                                            :
                                            null
                                    )
                                    : null}

                            </View>
                        )
                        :
                        null
                )
                :
                null
            }

        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
    },
    content: {
        width: '100%',
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: Sizes.s5,
        // marginBottom: Sizes.s20,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        // paddingBottom: Sizes.s20,
    },
    title: {
        flex: 1,
        // fontSize: 20,
        color: fontColors.title,
        // backgroundColor: 'blue',
        fontSize: fontSizes.title

    },
    textInput: {
        flex: 1,
        // backgroundColor: 'yellow',
        textAlign: 'right',
        paddingVertical: Sizes.h20,
        fontSize: fontSizes.title,

    },
    iconRequire: {
        width: Sizes.s45,
        height: Sizes.s45,
        marginHorizontal: Sizes.s10,
    }
})
export { CustomTextInputHorizontal }
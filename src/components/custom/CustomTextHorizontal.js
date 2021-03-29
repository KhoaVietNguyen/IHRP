import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { iconStr } from '../../res/values/strings/iconStr'
import { colorForm } from '../../res/values/strings/colorStr'
import { objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { fontColors, fontView, fontSizes } from '../../res/values/styles/appStyles'
import getImage from '../../res/values/strings/iconStrS'
const CustomTextHorizontal = (props) => {
    const [item, setItem] = useState(props.item)
    const [text, setText] = useState(props.text)
    const [focused, setFocused] = useState(false)
    useEffect(() => {
        setItem(props.item)
        setText(props.text)
    }, [props.item, props.text])
    // if (item.tag === 'CashAdvance') {
    //     console.log('CashAdvance - Item: ', item)
    // }
    return (
        <View style={{ width: '100%' }}>
            <View style={styles.body}>
                <View style={styles.content}>
                    <Text style={styles.textTitle}>{item.caption}</Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        if (item.typeText === 'file') {
                            if (!objectIsNull(item.onPressViewFile)) {
                                item.onPressViewFile()
                            }
                        }
                    }}
                    activeOpacity={item.typeText === 'file' ? 0.5 : 1}
                    style={styles.content}>
                    <Text style={[styles.textContent, {
                        color: item.typeText === 'file' ? 'blue' : 'black',
                        textDecorationLine: item.typeText === 'file' ? 'underline' : 'none',
                        // textAlign: item.typeText === 'cash' ? 'right' : 'left'
                        textAlign: 'right',
                    }]}>{item.value}</Text>
                </TouchableOpacity>
                {item.typeText === 'cash' &&
                    (
                        <Image source={getImage(item.icon)} style={styles.icon} />
                    )

                }

            </View>
            <View style={styles.viewLine} />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: Sizes.s5,
        marginBottom: Sizes.s20,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        paddingBottom: Sizes.s20,
        // backgroundColor: 'orange'
    },
    content: {
        flex: 1,
    },
    textTitle: {
        color: fontColors.title,
        fontSize: fontSizes.title,
        // backgroundColor: 'red'
    },
    textContent: {
        // color: 'black',
        fontSize: fontSizes.title,
        // backgroundColor: 'blue'
    },
    icon: {
        width: Sizes.s40,
        height: Sizes.s40
    },
    viewLine: {
        // width: '100%',
        // height: 1,
        // backgroundColor: 'grey'
    },

})

export { CustomTextHorizontal }
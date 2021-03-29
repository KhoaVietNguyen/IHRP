
import * as React from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ImageBackground
} from 'react-native'
import getImage from '../../../res/values/strings/iconStrS'
import { Sizes, Colors } from '@dungdang/react-native-basic'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
export default class ItemCombobox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // item: this.props.item
        }
    }
    componentDidUpdate(prev) {

    }

    render() {
        const { value, control, onSelectedItem } = this.props
        return (
            <View style={{ width: '100%' }}>
                {(control === 'combobox') ?
                    (
                        <TouchableOpacity
                            onPress={() => {
                                if (!objectIsNull(onSelectedItem)) {
                                    onSelectedItem(value)
                                }
                            }}
                        >
                            <View style={styles.touch}>
                                <Image source={getImage('ic_dangky_phep_1')} style={styles.image} />
                                <Text style={styles.text}>{value.label}</Text>
                            </View>

                        </TouchableOpacity>
                    )
                    : value.type === 'FingerPrintRecord' ?
                        (
                            <View style={styles.fingerItem}>
                                <TouchableOpacity
                                    onPress={
                                        () => {
                                            if (!objectIsNull(onSelectedItem)) {
                                                onSelectedItem(value)
                                            }
                                        }}
                                    style={styles.touch}>
                                    <Image source={getImage(value.isSelect ? 'ic_check_success_i' : 'ic_not_check')} style={styles.image} />
                                    <Text style={styles.text}>{value.label}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                        :
                        (
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        if (!objectIsNull(onSelectedItem)) {
                                            onSelectedItem(value)
                                        }
                                    }}
                            >
                                <View style={styles.touch}>
                                    <Image source={getImage('ic_dangky_phep_1')} style={styles.image} />
                                    <Text style={styles.text}>{value.label}</Text>
                                </View>

                            </TouchableOpacity>
                        )
                }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    touch: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: Sizes.h20,
        alignItems: 'center',
        paddingHorizontal: Sizes.h10,
        justifyContent: 'space-between'
    },
    image: {
        width: Sizes.s60,
        height: Sizes.s60,
        marginHorizontal: Sizes.h10
    },
    text: {
        color: 'black',
        fontSize: Sizes.s30,
        marginHorizontal: Sizes.h20,
        textAlign: "left",
        // backgroundColor: 'red',
        flex: 1,
    },

    avatar: {
        width: Sizes.s90,
        height: Sizes.s90,
        borderRadius: Sizes.s45
    },
    avatarSelect: {
        width: Sizes.s90,
        height: Sizes.s90,
        borderRadius: Sizes.s45,
        // padding: Sizes.h10
    },
    closeAvatar: {
        width: Sizes.s45,
        height: Sizes.s45,
        position: 'absolute',
        alignSelf: 'flex-end',
        // backgroundColor: 'red'
    },
    infoUser: {
        flex: 1,
        marginHorizontal: Sizes.h20,
        textAlign: "left"
    },
    check: {
        width: Sizes.s60,
        height: Sizes.s60,
    },

    select: {
        width: 50,
        height: 50,
        backgroundColor: 'orange',
        margin: Sizes.h10
    },

    textUser1: {
        color: 'blue',
        fontSize: Sizes.s30,
    },
    textUser2: {
        color: 'black',
        fontSize: Sizes.s25,
    },
    textUser3: {
        color: 'gray',
        fontSize: Sizes.s25,
    },

    fingerItem: {
        width: '100%',
    }
})

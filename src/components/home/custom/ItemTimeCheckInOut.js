import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import getImage from '../../../res/values/strings/iconStrS'

export default class ItemTimeCheckInOut extends React.Component {
    render() {
        const { item } = this.props
        return (
            <View style={styles.body}>
                <Image source={getImage(item.checkType === 'i' ? 'ic_check_success_i' : 'ic_check_success_o')} style={styles.icon} />
                <View>
                    <Text style={styles.time}>{item.time}</Text>
                    <Text style={styles.wifiLocation}>{item.wifiLocation}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        flexDirection: 'row',
        marginVertical: Sizes.s10,
        alignItems: 'flex-start'
    },
    icon: {
        width: Sizes.h52,
        height: Sizes.h52,
        marginRight: Sizes.s20
    },
    time: {
        fontSize: Sizes.h30,
        color: 'black'
    },
    wifiLocation: {
        fontSize: Sizes.h28,
        color: 'gray'
    }
})
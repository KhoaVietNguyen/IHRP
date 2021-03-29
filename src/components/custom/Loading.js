import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Image, 
    Platform
} from 'react-native'
import { iconStr } from '../../res/values/strings/iconStr'
import { Sizes } from '@dungdang/react-native-basic'
import getImage from '../../res/values/strings/iconStrS'
const Loading = () => {
    return (
        <View
            style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                // backgroundColor: "#00000000",
                backgroundColor: 'transparent',
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1
            }}
        >
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {/* <Image source={iconStr.ic_logo} style={{ width: Sizes.s40, height: Sizes.s40 }} /> */}
                <ActivityIndicator size={Platform.OS === 'ios' ? 'large' :  Sizes.s100} color="#009BDD" style={{ position: 'absolute', zIndex: 2, backgroundColor: 'transparent' }} />
                {Platform.OS === 'android' && 
                    <Image source={getImage('logo_cafe_pnj')} style={{ width: Sizes.s60, height: Sizes.s60, }} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export default Loading
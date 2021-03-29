import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    Text,
} from 'react-native';
import { Sizes } from '@dungdang/react-native-basic';
import {
    objectIsNull,
    stringIsEmpty,
    arrayIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
const convertRender = (array) => {
    if (!arrayIsEmpty(array)) {
        let arr = array.map((value) => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        if (!objectIsNull(value.onPress)) {
                            value.onPress();
                        }
                    }}
                    style={styles.touchLeft}>
                    <Image source={!objectIsNull(value.icon) ? value.icon : null} style={styles.iconLeft} />
                </TouchableOpacity>
            )
        })
        return arr
    } else {
        return null
    }
}
const CustomMultiHeader = (props) => {
    const {
        arrayLeft,
        arrayRight,
        title,
    } = props;


    let renderLeft = convertRender(arrayLeft)
    let renderRight = convertRender(arrayRight)
    // let renderLeft = null
    // let renderRight = null
    return (
        <View style={styles.header}>
            {renderLeft}
            <Text style={styles.title}>
                {stringIsEmpty(title) ? '' : title.toUpperCase()}
            </Text>
            {renderRight}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingVertical: Sizes.h10,
        paddingHorizontal: Sizes.h20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: 'rgba(0, 0, 0, 0.5 )',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: Sizes.h10,
        shadowOpacity: 0.2,
        elevation: 10,
    },
    touchLeft: {
        paddingVertical: Sizes.s10,
        paddingHorizontal: Sizes.s10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewLeft: {
        paddingVertical: Sizes.h10,
        width: Sizes.s80,
        height: Sizes.s80,
        // backgroundColor: 'red',
    },
    touchRight: {
        paddingVertical: Sizes.h10,
        paddingHorizontal: Sizes.h20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewRight: {
        paddingVertical: Sizes.h10,
        width: Sizes.s80,
        height: Sizes.s80,
    },
    iconLeft: {
        width: Sizes.s60,
        height: Sizes.s60,
    },
    title: {
        fontSize: Sizes.h36,
        fontWeight: 'bold',
        color: 'black',
        flex: 1,
        textAlign: 'center',
        marginVertical: Sizes.s10
    },
});

export default CustomMultiHeader;

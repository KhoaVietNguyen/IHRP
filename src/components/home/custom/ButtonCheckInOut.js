import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, Animated } from 'react-native'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions'
import getImage from '../../../res/values/strings/iconStrS'

export default class ButtonCheckInOut extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            widthBorder: new Animated.Value(Sizes.s200),
            opacity: new Animated.Value(1),
        }
    }
    componentDidMount() {
        // this.zoomBorder()
        // this.changeOpacity()
        this.onAnimated()

    }
    onAnimated = () => {
        const { widthBorder, opacity } = this.state
        widthBorder.setValue(Sizes.s200)
        opacity.setValue(1)
        Animated.parallel([
            Animated.timing(this.state.widthBorder, {
                toValue: Sizes.s260,
                duration: 1300,
                useNativeDriver: false,
            }),
            Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 1300,
                useNativeDriver: false,
            })
        ]).start(this.onAnimated)
    }
    // zoomBorder = () => {
    //     const { widthBorder } = this.state
    //     widthBorder.setValue(Sizes.s200)
    //     Animated.timing(this.state.widthBorder, {
    //         toValue: Sizes.s260,
    //         duration: 2000,
    //     }).start(this.zoomBorder)

    // }
    // changeOpacity = () => {
    //     const { opacity } = this.state
    //     opacity.setValue(1)
    //     Animated.timing(this.state.opacity, {
    //         toValue: 0,
    //         duration: 2000,
    //     }).start(this.changeOpacity)
    // }

    render() {
        const { type, onPress } = this.props
        // console.log('borderWith: ', this.state.widthBorder)
        return (
            <View style={styles.content}>
                <Animated.View

                    style={{
                        backgroundColor: '#A0D5FF',
                        // backgroundColor: 'rgba(0,0,0,0.1)',
                        width: this.state.widthBorder,
                        height: this.state.widthBorder,
                        borderRadius: Sizes.s140,
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: this.state.opacity
                    }}
                >

                </Animated.View>
                <TouchableOpacity
                    onPress={() => {
                        if (!objectIsNull(onPress)) {
                            onPress()
                        }
                    }}
                    style={[styles.touch, { backgroundColor: type === 'i' ? '#3796F6' : '#FF790E', opacity: 1, position: 'absolute' }]}
                >
                    <Text style={styles.text}>{type === 'i' ? 'CHECK IN' : 'CHECK OUT'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Sizes.s40,
        // backgroundColor: 'red',
        width: Sizes.s240,
        height: Sizes.s240,
    },
    shadowTouch: {

    },
    touch: {
        width: Sizes.s200,
        height: Sizes.s200,
        borderRadius: Sizes.s100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: Sizes.h30,
        color: 'white',
    }
})
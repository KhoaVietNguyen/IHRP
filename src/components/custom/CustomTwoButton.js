import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native'
import PopupDatePicker from './popup/PopupDatePicker'
import { iconStr } from '../../res/values/strings/iconStr'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions'
import { colorForm } from '../../res/values/strings/colorStr'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CustomButton } from './CustomButton'
export default class CustomTwoButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {

    }
    render() {
        const { item } = this.props
        return (
            <View style={{ width: '100%',  }}>
                {item.editable === false ?
                    null
                    :
                    (
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignSelf: 'center', }}>
                            <View style={{ flex: 1, paddingRight: Sizes.h20,  }}>
                                <CustomButton onPress={() => {
                                    if (!objectIsNull(item.onPressButton1)) {
                                        item.onPressButton1()
                                    }
                                }} title={item.caption1} type='setting' />
                            </View>
                            <View style={{ flex: 1, paddingLeft: Sizes.h20}}>
                                <CustomButton onPress={() => {
                                    if (!objectIsNull(item.onPressButton2)) {
                                        item.onPressButton2()
                                    }
                                }} title={item.caption2} type='view' />
                            </View>
                        </View>
                    )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    touch: {
        flexDirection: 'row',
        flex: 1,
        // width: '90%',
        alignItems: 'center',
        paddingHorizontal: Sizes.h30,
        paddingVertical: Sizes.h10,
        // marginHorizontal: Sizes.h20,
    }
})
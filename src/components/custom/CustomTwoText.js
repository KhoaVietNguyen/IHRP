import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native'
import PopupDatePicker from './popup/PopupDatePicker'
import { iconStr } from '../../res/values/strings/iconStr'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { colorForm } from '../../res/values/strings/colorStr'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CustomButton } from './CustomButton'
import { CustomText } from './CustomText'
export default class CustomTwoText extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        // if (this.props.item.value1 !== prevProps.item.value1) {
        //     if (!stringIsEmpty(this.props.item.value1)) {
        //         this.props.onResetError()
        //     }
        // }
        // if (this.props.item.value2 !== prevProps.item.value2) {
        //     if (!stringIsEmpty(this.props.item.value2)) {
        //         this.props.onResetError()
        //     }
        // }

        // if(!stringIsEmpty(this.props.item.value1)){
        //     this.props.onResetError()
        // }
        // if(!stringIsEmpty(this.props.item.value1)){
        //     this.props.onResetError()
        // }
    }
    render() {
        const { item, error } = this.props
        // console.log('itemTwoText: ', item)
        return (
            <View style={{ width: '100%', alignSelf: 'center' }}>
                {/* <View style={{ flexDirection: 'row', flex: 1, }}>
                    <Text style={styles.label}>{item.caption1}</Text>
                    <Text style={styles.label}>{item.caption2}</Text>
                </View> */}
                <View style={{ width: '100%', flexDirection: 'row', flex: 1, alignSelf: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, marginVertical: Sizes.h10, marginRight: Sizes.s10 }}>
                        <CustomText error={error} item={item} tempCaption={item.caption1} value={item.value1} {...this.props} />
                    </View>
                    <View style={{ flex: 1, marginVertical: Sizes.h10, marginLeft: Sizes.s10 }}>
                        <CustomText error={error} item={item} tempCaption={item.caption2} value={item.value2} {...this.props} />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        flex: 1,
        color: colorForm.labelForm
    },
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
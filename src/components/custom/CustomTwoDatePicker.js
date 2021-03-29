import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PopupDatePicker from './popup/PopupDatePicker'
import { iconStr } from '../../res/values/strings/iconStr'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { colorForm } from '../../res/values/strings/colorStr'
import { fontSizes, fontColors, fontView } from '../../res/values/styles/appStyles'
export default class CustomTwoDatePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: this.props.valueFrom,
            toDate: this.props.valueTo,
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.valueFrom !== prevProps.valueFrom) {
            this.setState({
                fromDate: this.props.valueFrom
            })
        }
        if (this.props.valueTo !== prevProps.valueTo) {
            this.setState({
                toDate: this.props.valueTo
            })
        }
    }
    // this.onChangeVisiblePopup(true)
    onFromDateChange = (value) => {
        this.setState({
            fromDate: value
        })
        this.props.onPressFromDate(value)
    }
    onToDateChange = (value) => {
        this.setState({
            toDate: value
        })
        this.props.onPressToDate(value)
    }
    render() {
        const { item, error } = this.props
        return (
            <View style={{ width: '100%', }}>
                {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: Sizes.h10 }}>
                    <Text style={{ flex: 1, color: colorForm.labelForm, fontSize: Sizes.h30 }}>{!stringIsEmpty(item.caption1) ? item.caption1 : 'Từ ngày'}</Text>
                    <Text style={{ flex: 1, color: colorForm.labelForm, fontSize: Sizes.h30 }}>{!stringIsEmpty(item.caption2) ? item.caption2 : 'Đến ngày'}</Text>
                </View> */}
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignSelf: 'center' }}>
                    <TouchableOpacity
                        disabled={objectIsNull(item) ? false : (item.editable === false) ? true : false}
                        onPress={() => {
                            if (!objectIsNull(this.refs['datePickerFrom'].onChangeVisiblePopup)) {
                                this.refs['datePickerFrom'].onChangeVisiblePopup(true)
                            }
                        }} style={[styles.touch, { marginRight: Sizes.h20, borderWidth: fontSizes.border, borderColor: !stringIsEmpty(error) ? fontColors.borderError : fontColors.border  }]}>

                        <View>
                            <Text style={{ fontSize: fontSizes.titleSmall, color: fontColors.title }}>{!stringIsEmpty(item.caption1) ? item.caption1 : 'Từ ngày'}</Text>
                            <Text style={{ fontSize: fontSizes.title, color: fontColors.valueInput }}>{this.state.fromDate}</Text>
                        </View>
                        <PopupDatePicker ref={'datePickerFrom'} onDateChange={this.onFromDateChange} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={objectIsNull(item) ? false : (item.editable === false) ? true : false}
                        onPress={() => {
                            if (!objectIsNull(this.refs['datePickerTo'].onChangeVisiblePopup)) {
                                this.refs['datePickerTo'].onChangeVisiblePopup(true)
                            }
                        }} style={[styles.touch, { marginLeft: Sizes.h20, borderWidth: fontSizes.border, borderColor: !stringIsEmpty(error) ? fontColors.borderError : fontColors.border  }]}>
                        <View>
                            <Text style={{ fontSize: fontSizes.titleSmall, color: fontColors.title }}>{!stringIsEmpty(item.caption2) ? item.caption2 : 'Đến ngày'}</Text>
                            <Text style={{ fontSize: fontSizes.title, color: fontColors.valueInput }}>{this.state.toDate}</Text>
                        </View>
                        {/* <Text style={{ fontSize: Sizes.h30, }}>{this.state.toDate}</Text> */}
                        <PopupDatePicker ref={'datePickerTo'} onDateChange={this.onToDateChange} />
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'space-between',
        paddingHorizontal: fontView.paddingHorizontal,
        paddingVertical: fontView.paddingVertical,
        borderRadius: fontView.border,
        backgroundColor: colorForm.inputForm
    }
})
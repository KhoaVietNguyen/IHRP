import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native'
import PopupDatePicker from './popup/PopupDatePicker'
import { iconStr } from '../../res/values/strings/iconStr'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { colorForm } from '../../res/values/strings/colorStr'
const colorDefault = '#4E8DFF'
import { fontSizes, fontColors, fontView } from '../../res/values/styles/appStyles'
import { userProfile } from '../../config/settings'
export default class CustomTwoTimePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            fromTime: this.props.valueFrom,
            toTime: this.props.valueTo,
            visible: false,
            // selectedHour: new Date().getHours(),
            // selectedMinute: new Date().getMinutes(),
            selectedFromHour: 8,
            selectedFromMinute: 30,
            selectedToHour: 17,
            selectedToMinute: 30,
            hour: [],
            minute: [],
            selectedTimePicker: false, // Check xem Modal được mở để chọn "Từ giờ"(false) hay "Đến giờ"(true)

        }
        this.scrollHour = undefined
        this.scrollMinute = undefined
    }
    componentDidMount() {
        let hour = []
        let minute = []
        for (let i = 0; i < 60; i++) {
            if (i < 24) {
                hour.push(i + '')
            }
            minute.push(i + '')
        }
        this.setState({
            hour: hour,
            minute: minute
        }, () => {
            this.scrollToIndex()
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.valueFrom !== prevProps.valueFrom) {
            this.setState({
                fromTime: this.props.valueFrom
            })
        }

        if (this.props.valueTo !== prevProps.valueTo) {
            this.setState({
                toTime: this.props.valueTo
            })
        }
    }
    scrollToIndex = () => {
        if (this.scrollHour !== undefined) {
            if (this.state.selectedTimePicker) {
                this.scrollHour.scrollToIndex({ animated: true, index: this.state.selectedToHour })
            } else {
                this.scrollHour.scrollToIndex({ animated: true, index: this.state.selectedFromHour })
            }
        }
        if (this.scrollMinute !== undefined) {
            if (this.state.selectedTimePicker) {
                this.scrollMinute.scrollToIndex({ animated: true, index: this.state.selectedToMinute })
            } else {
                this.scrollMinute.scrollToIndex({ animated: true, index: this.state.selectedFromMinute })
            }
        }
    }
    onFromTimeChange = (value) => {
        this.setState({
            fromTime: value
        })
        this.props.onPressFromTime(value)
    }
    onToTimeChange = (value) => {
        this.setState({
            toTime: value
        })
        this.props.onPressToTime(value)
    }
    onChangeVisiblePopup(visible) {
        this.setState({
            visible: visible
        })
    }
    render() {
        const { item, error } = this.props
        const { fromTime, toTime } = this.state
        return (
            <View style={{ width: '100%', }}>
                {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: Sizes.h10 }}>
                    <Text style={{ flex: 1, color: colorForm.labelForm, fontSize: Sizes.h30, }}>{!stringIsEmpty(item.caption1) ? item.caption1 : 'Từ giờ'}</Text>
                    <Text style={{ flex: 1, color: colorForm.labelForm, fontSize: Sizes.h30, }}>{!stringIsEmpty(item.caption2) ? item.caption2 : 'Đến giờ'}</Text>
                </View> */}
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignSelf: 'center' }}>
                    <TouchableOpacity
                        disabled={objectIsNull(item) ? false : (item.editable === false) ? true : false}
                        onPress={() => {
                            this.setState({ selectedTimePicker: false })
                            this.onChangeVisiblePopup(true)
                        }} style={[styles.touch, { marginRight: Sizes.h20, borderWidth: fontSizes.border, borderColor: !stringIsEmpty(error) ? fontColors.borderError : fontColors.border }]}>
                        {!stringIsEmpty(this.state.fromTime) ?
                            (
                                <View>
                                    <Text style={{ fontSize: fontSizes.titleSmall, color: fontColors.title }}>{!stringIsEmpty(item.caption1) ? item.caption1 : 'Từ giờ'}</Text>
                                    <Text style={{ fontSize: fontSizes.title, color: fontColors.valueInput }}>{this.state.fromTime}</Text>
                                </View>
                            )
                            :
                            (
                                <Text style={{ fontSize: fontSizes.title, color: fontColors.title }}>{!stringIsEmpty(item.caption1) ? item.caption1 : 'Từ giờ'}</Text>
                            )
                        }

                        {/* <Text style={{ fontSize: Sizes.h30, }} >{this.state.fromTime}</Text> */}
                        <Image source={iconStr.ic_clock} style={{ width: Sizes.s60, height: Sizes.s60 }} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        disabled={objectIsNull(item) ? false : (item.editable === false) ? true : false}
                        onPress={() => {
                            this.setState({ selectedTimePicker: true })
                            this.onChangeVisiblePopup(true)
                        }} style={[styles.touch, { marginLeft: Sizes.h20, borderWidth: fontSizes.border, borderColor: !stringIsEmpty(error) ? fontColors.borderError : fontColors.border }]}>
                        {!stringIsEmpty(this.state.toTime) ?
                            (
                                <View>
                                    <Text style={{ fontSize: fontSizes.titleSmall, color: fontColors.title }}>{!stringIsEmpty(item.caption2) ? item.caption2 : 'Đến giờ'}</Text>
                                    <Text style={{ fontSize: fontSizes.title, color: fontColors.valueInput }}>{this.state.toTime}</Text>
                                </View>
                            )
                            :
                            (
                                <Text style={{ fontSize: fontSizes.title, color: fontColors.title }}>{!stringIsEmpty(item.caption2) ? item.caption2 : 'Đến giờ'}</Text>
                            )
                        }
                        {/* <Text style={{ fontSize: Sizes.h30, }}>{this.state.toTime}</Text> */}
                        <Image source={iconStr.ic_clock} style={{ width: Sizes.s60, height: Sizes.s60 }} />
                    </TouchableOpacity>
                </View>
                {/* <PopupDatePicker />
                <PopupDatePicker /> */}

                <Modal
                    transparent={true}
                    onRequestClose={() => {
                        this.onChangeVisiblePopup(false)
                    }}
                    hardwareAccelerated={true}
                    visible={this.state.visible}
                    animationType='fade'>
                    <TouchableOpacity
                        onPress={() => {
                            this.onChangeVisiblePopup(false)
                        }}
                        style={{
                            flex: 1,
                            backgroundColor: '#00000066',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TouchableWithoutFeedback style={{}}>

                            <View style={{
                                width: '95%',
                                backgroundColor: 'white',
                                borderRadius: Sizes.s10,

                            }}>
                                <View style={{
                                    width: '100%', flexDirection: 'row', justifyContent: 'space-between',
                                    backgroundColor: colorDefault,
                                    paddingVertical: Sizes.h10,
                                    borderTopRightRadius: Sizes.s10,
                                    borderTopLeftRadius: Sizes.s10,
                                    // flex: 1, 
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.onChangeVisiblePopup(false)
                                        }}
                                        style={{ paddingVertical: Sizes.s10, alignItems: 'flex-start', justifyContent: 'center', marginHorizontal: Sizes.h20, }}>
                                        <Text style={{ fontSize: Sizes.s35, color: 'white', }}>Hủy</Text>
                                    </TouchableOpacity>
                                    <View style={{ paddingVertical: Sizes.s10, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: Sizes.h40, color: 'white' }}>{
                                            this.state.selectedTimePicker ?
                                                (
                                                    `${('0' + this.state.selectedToHour).substr(-2)}:${('0' + this.state.selectedToMinute).substr(-2)}`
                                                )
                                                :
                                                (
                                                    `${('0' + this.state.selectedFromHour).substr(-2)}:${('0' + this.state.selectedFromMinute).substr(-2)}`
                                                )
                                        }</Text>
                                        {/* <Text style={{ fontSize: Sizes.s50, fontWeight: 'bold', alignSelf: 'center', color: 'white', }}>{this.getDate(selectedDay, selectedMonth, selectedYear)}</Text> */}

                                    </View>
                                    <TouchableOpacity
                                        onPress={() => {
                                            // if (onDateChange !== undefined) {
                                            //     onDateChange(this.getDate(this.state.selectedDay, this.state.selectedMonth, this.state.selectedYear))
                                            // }
                                            // let h = ('0' + this.state.selectedHour).substr(-2)
                                            // let m = ('0' + this.state.selectedMinute).substr(-2)
                                            if (this.state.selectedTimePicker) {
                                                let h = ('0' + this.state.selectedToHour).substr(-2)
                                                let m = ('0' + this.state.selectedToMinute).substr(-2)
                                                if (!objectIsNull(this.props.onPressToTime)) {
                                                    this.props.onPressToTime(h + ':' + m)
                                                }
                                                this.setState({
                                                    toTime: h + ':' + m
                                                })
                                            } else {
                                                let h = ('0' + this.state.selectedFromHour).substr(-2)
                                                let m = ('0' + this.state.selectedFromMinute).substr(-2)
                                                if (!objectIsNull(this.props.onPressFromTime)) {
                                                    this.props.onPressFromTime(h + ':' + m)
                                                }
                                                this.setState({
                                                    fromTime: h + ':' + m
                                                })
                                            }
                                            this.onChangeVisiblePopup(false)
                                        }}
                                        style={{ paddingVertical: Sizes.s10, alignItems: 'flex-end', justifyContent: 'center', marginHorizontal: Sizes.h20, }}>
                                        <Text style={{ fontSize: Sizes.s35, color: 'white' }}>{userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm'}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    paddingVertical: Sizes.h10,
                                    paddingHorizontal: Sizes.h20,
                                    alignItems: 'center'

                                }}>
                                    <View style={{ height: Dimensions.get('window').height * 1 / 3, justifyContent: 'center' }}>
                                        <Text style={{ marginVertical: Sizes.h20, fontSize: Sizes.s35, fontWeight: 'bold', color: '#335272' }}>  Giờ</Text>
                                        <FlatList
                                            ref={(ref) => {
                                                this.scrollHour = ref
                                            }}
                                            onScrollToIndexFailed={info => {
                                                // this.scrollToIndex()
                                            }}
                                            onContentSizeChange={() => {
                                                this.scrollToIndex()
                                            }}
                                            showsVerticalScrollIndicator={false}
                                            // extraData={this.state.selectedHour}
                                            // contentContainerStyle={{ marginVertical: Sizes.h20 }}
                                            data={this.state.hour}
                                            renderItem={({ item, index }) => {
                                                if (this.state.selectedTimePicker) {
                                                    if (parseInt(item) === this.state.selectedToHour) {
                                                        return (
                                                            <Text style={{
                                                                backgroundColor: colorDefault,
                                                                borderRadius: Sizes.s10,
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                width: Sizes.h90,
                                                                alignItems: 'center',
                                                                marginVertical: Sizes.h10,
                                                                paddingVertical: Sizes.h20,
                                                                paddingHorizontal: Sizes.h20,
                                                                fontWeight: 'bold'
                                                            }}>{item}</Text>
                                                        )
                                                    } else {
                                                        return (
                                                            <TouchableOpacity onPress={() => { this.setState({ selectedToHour: parseInt(item) }) }}>
                                                                <Text style={{
                                                                    textAlign: 'center',
                                                                    width: Sizes.h90,
                                                                    alignItems: 'center',
                                                                    marginVertical: Sizes.h10,
                                                                    paddingVertical: Sizes.h10
                                                                }}>{item}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    }
                                                } else {
                                                    if (parseInt(item) === this.state.selectedFromHour) {
                                                        return (
                                                            <Text style={{
                                                                backgroundColor: colorDefault,
                                                                borderRadius: Sizes.s10,
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                width: Sizes.h90,
                                                                alignItems: 'center',
                                                                marginVertical: Sizes.h10,
                                                                paddingVertical: Sizes.h20,
                                                                paddingHorizontal: Sizes.h20,
                                                                fontWeight: 'bold'
                                                            }}>{item}</Text>
                                                        )
                                                    } else {
                                                        return (
                                                            <TouchableOpacity onPress={() => { this.setState({ selectedFromHour: parseInt(item) }) }}>
                                                                <Text style={{
                                                                    textAlign: 'center',
                                                                    width: Sizes.h90,
                                                                    alignItems: 'center',
                                                                    marginVertical: Sizes.h10,
                                                                    paddingVertical: Sizes.h10
                                                                }}>{item}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    }
                                                }
                                            }}
                                        />
                                    </View>
                                    <View style={{ height: Dimensions.get('window').height * 1 / 3, justifyContent: 'center' }}>
                                        <Text style={{ marginVertical: Sizes.h20, fontSize: Sizes.s35, fontWeight: 'bold', color: '#335272' }}> Phút</Text>
                                        <FlatList
                                            ref={(ref) => {
                                                this.scrollMinute = ref
                                            }}
                                            onScrollToIndexFailed={info => {
                                                // this.scrollToIndex()
                                            }}
                                            onContentSizeChange={() => {
                                                this.scrollToIndex()
                                            }}
                                            showsVerticalScrollIndicator={false}
                                            // contentContainerStyle={{ marginVertical: Sizes.h20 }}
                                            data={this.state.minute}
                                            renderItem={({ item, index }) => {
                                                if (this.state.selectedTimePicker) {
                                                    if (parseInt(item) === this.state.selectedToMinute) {
                                                        return (
                                                            <Text style={{
                                                                backgroundColor: colorDefault,
                                                                borderRadius: Sizes.s10,
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                width: Sizes.h90,
                                                                alignItems: 'center',
                                                                marginVertical: Sizes.h10,
                                                                paddingVertical: Sizes.h20,
                                                                paddingHorizontal: Sizes.h20,
                                                                fontWeight: 'bold'
                                                            }}>{item}</Text>
                                                        )
                                                    } else {
                                                        return (
                                                            <TouchableOpacity onPress={() => { this.setState({ selectedToMinute: parseInt(item) }) }}>
                                                                <Text style={{
                                                                    textAlign: 'center',
                                                                    width: Sizes.h90,
                                                                    alignItems: 'center',
                                                                    marginVertical: Sizes.h10,
                                                                    paddingVertical: Sizes.h10
                                                                }}>{item}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    }
                                                } else {
                                                    if (parseInt(item) === this.state.selectedFromMinute) {
                                                        return (
                                                            <Text style={{
                                                                backgroundColor: colorDefault,
                                                                borderRadius: Sizes.s10,
                                                                color: 'white',
                                                                textAlign: 'center',
                                                                width: Sizes.h90,
                                                                alignItems: 'center',
                                                                marginVertical: Sizes.h10,
                                                                paddingVertical: Sizes.h20,
                                                                paddingHorizontal: Sizes.h20,
                                                                fontWeight: 'bold'
                                                            }}>{item}</Text>
                                                        )
                                                    } else {
                                                        return (
                                                            <TouchableOpacity onPress={() => { this.setState({ selectedFromMinute: parseInt(item) }) }}>
                                                                <Text style={{
                                                                    textAlign: 'center',
                                                                    width: Sizes.h90,
                                                                    alignItems: 'center',
                                                                    marginVertical: Sizes.h10,
                                                                    paddingVertical: Sizes.h10
                                                                }}>{item}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    }
                                                }
                                            }}
                                        />
                                    </View>


                                </View>

                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>


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
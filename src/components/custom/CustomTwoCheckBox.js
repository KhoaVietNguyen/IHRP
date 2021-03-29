import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native'
import PopupDatePicker from './popup/PopupDatePicker'
import { iconStr } from '../../res/values/strings/iconStr'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { colorForm } from '../../res/values/strings/colorStr'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { fontColors, fontSizes, fontView } from '../../res/values/styles/appStyles'
export default class CustomTwoCheckBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            valueFrom: !objectIsNull(this.props.value1) ? this.props.value1 + '' : '0',
            valueTo: !objectIsNull(this.props.value2) ? this.props.value2 + '' : '0',
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        const { value1, value2 } = this.props
        const { valueFrom, valueTo } = this.state
        if (value1 !== prevProps.value1) {
            if (!stringIsEmpty(value1)) {
                if (value1 !== valueFrom) {
                    this.setState({
                        valueFrom: value1
                    })
                }
            }
        }

        if (value2 !== prevProps.value2) {
            if (!stringIsEmpty(value2)) {
                if (value2 !== valueTo) {
                    this.setState({
                        valueTo: value2
                    })
                }
            }
        }
    }
    render() {
        const { onPressValueFrom, onPressValueTo, item } = this.props
        const { valueFrom, valueTo } = this.state
        return (
            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', }}>
                <TouchableOpacity
                    disabled={item.editable === false ? true : false}
                    onPress={() => {
                        if (item.type === 'single') {
                            if (this.state.valueTo === '1') {
                                this.setState({
                                    valueFrom: '1',
                                    valueTo: '0'
                                }, () => {
                                    if (!objectIsNull(onPressValueFrom)) {
                                        onPressValueFrom(this.state.valueFrom)
                                    }
                                })
                            } else {
                                this.setState({
                                    valueFrom: '1'
                                }, () => {
                                    if (!objectIsNull(onPressValueFrom)) {
                                        onPressValueFrom(this.state.valueFrom)
                                    }
                                })
                            }
                        } else if (item.type === 'multi') {
                            this.setState({
                                valueFrom: this.state.valueFrom !== '1' ? '1' : '0'
                            }, () => {
                                if (!objectIsNull(onPressValueFrom)) {
                                    onPressValueFrom(this.state.valueFrom)
                                }
                            })
                        } else if (item.type === 'singleNoRequire') {
                            this.setState({
                                valueFrom: this.state.valueFrom !== '1' ? '1' : '0',
                            }, () => {
                                this.setState({
                                    valueTo: this.state.valueFrom !== '1' ? this.state.valueTo : '0'
                                }, () => {
                                    if (!objectIsNull(onPressValueFrom)) {
                                        onPressValueFrom(this.state.valueFrom)
                                    }
                                })
                            })
                        } else {
                            this.setState({
                                valueFrom: this.state.valueFrom !== '1' ? '1' : '0'
                            }, () => {
                                if (!objectIsNull(onPressValueFrom)) {
                                    onPressValueFrom(this.state.valueFrom)
                                }
                            })
                        }


                    }}
                    style={styles.touch}>
                    <Icon name={valueFrom !== '1' ? 'square' : 'check-square'} size={Sizes.s40} color={valueFrom !== '1' ? fontColors.title : '#448FF1'} />
                    <Text style={{ marginLeft: Sizes.h10 }}>{item.caption1}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={item.editable === false ? true : false}
                    onPress={() => {
                        if (item.type === 'single') {
                            if (this.state.valueFrom === '1') {
                                this.setState({
                                    valueFrom: '0',
                                    valueTo: '1'
                                }, () => {
                                    if (!objectIsNull(onPressValueTo)) {
                                        onPressValueTo(this.state.valueTo)
                                    }
                                })
                            } else {
                                this.setState({
                                    valueTo: '1'
                                }, () => {
                                    if (!objectIsNull(onPressValueTo)) {
                                        onPressValueTo(this.state.valueTo)
                                    }
                                })
                            }
                        } else if (item.type === 'multi') {
                            this.setState({
                                valueTo: this.state.valueTo !== '1' ? '1' : '0'
                            }, () => {
                                if (!objectIsNull(onPressValueTo)) {
                                    onPressValueTo(this.state.valueTo)
                                }
                            })
                        } else if (item.type === 'singleNoRequire') {
                            this.setState({
                                valueTo: this.state.valueTo !== '1' ? '1' : '0',
                            }, () => {
                                this.setState({
                                    valueFrom: this.state.valueTo !== '1' ? this.state.valueFrom : '0'
                                }, () => {
                                    if (!objectIsNull(onPressValueFrom)) {
                                        onPressValueTo(this.state.valueTo)
                                    }
                                })
                            })
                        } else {
                            this.setState({
                                valueTo: this.state.valueTo !== '1' ? '1' : '0'
                            }, () => {
                                if (!objectIsNull(onPressValueTo)) {
                                    onPressValueTo(this.state.valueTo)
                                }
                            })
                        }
                    }}
                    style={[styles.touch, {marginLeft: Sizes.h40,}]}>
                    <Icon name={valueTo !== '1' ? 'square' : 'check-square'} size={Sizes.s40} color={valueTo !== '1' ? fontColors.title : '#448FF1'} />
                    <Text style={{ marginLeft: Sizes.h10 }}>{item.caption2}</Text>

                </TouchableOpacity>
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
        // paddingHorizontal: Sizes.h30,
        // backgroundColor: 'blue',
        paddingVertical: Sizes.h10,
        // marginHorizontal: Sizes.h20,
    }
})
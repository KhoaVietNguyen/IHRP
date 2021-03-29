import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Modal, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native'
import PopupDatePicker from './popup/PopupDatePicker'
import { iconStr } from '../../res/values/strings/iconStr'
import { Sizes } from '@dungdang/react-native-basic'
import { objectIsNull, arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { colorForm } from '../../res/values/strings/colorStr'
import ComboboxForm from '../custom/functionForm/ComboboxForm'
export default class TwoComboboxForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const { item, onPressCombobox1, onPressCombobox2 } = this.props
        return (
            <View style={{ width: '100%', }}>
                {/* <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingVertical: Sizes.h10 }}>
                    <Text style={{ flex: 1, color: colorForm.labelForm, fontSize: Sizes.h30, }}>{item.caption1}</Text>
                    <Text style={{ flex: 1, color: colorForm.labelForm, fontSize: Sizes.h30, }}>{item.caption2}</Text>
                </View> */}
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignSelf: 'center' }}>
                    <View style={{ flex: 1, paddingRight: Sizes.h20, }}>
                        <ComboboxForm
                            item={item}
                            tempCaption={item.caption1}
                            items={arrayIsEmpty(item.items1) ? [] : item.items1}
                            onSelectedItemCombobox={!objectIsNull(onPressCombobox1) ? onPressCombobox1 : () => {

                            }}
                            selectedItem={!objectIsNull(item) ? item.selectedItem1 : undefined}
                            onPress={() => {
                                item.onPress1()
                            }}
                            iconCombobox={'calendar'}
                        />
                    </View>
                    <View style={{ flex: 1, paddingLeft: Sizes.h20, }}>
                        <ComboboxForm
                            item={item}
                            tempCaption={item.caption2}
                            items={arrayIsEmpty(item.items2) ? [] : item.items2}
                            onSelectedItemCombobox={!objectIsNull(onPressCombobox2) ? onPressCombobox2 : () => {

                            }}
                            selectedItem={!objectIsNull(item) ? item.selectedItem2 : undefined}
                            onPress={() => {
                                item.onPress2()
                            }}
                            iconCombobox={'calendar'}
                        />
                    </View>
                </View>
            </View >
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
        paddingHorizontal: Sizes.h30,
        paddingVertical: Sizes.h10,
        // marginHorizontal: Sizes.h20,
        borderRadius: Sizes.h40,
        backgroundColor: colorForm.inputForm
    }
})
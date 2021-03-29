
import * as React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
    Dimensions,
    TextInput,
    FlatList,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { Sizes, Colors, } from '@dungdang/react-native-basic'
import Icon from "react-native-vector-icons/FontAwesome5";
import getImage from '../../../res/values/strings/iconStrS'
import { arrayIsEmpty, stringIsEmpty, objectIsNull } from '@dungdang/react-native-basic/src/Functions'
import ItemCombobox from './ItemCombobox'
import { colorForm } from '../../../res/values/strings/colorStr'
import { fontView, fontSizes, fontColors } from '../../../res/values/styles/appStyles'
export default class MultiComboboxForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visiblePopup: false,
            data: this.props.items
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
            if (this.props.items !== undefined) {
                if (!arrayIsEmpty(this.state.data)) {

                } else {
                    this.setState({
                        data: this.props.items
                    })
                }

            }
        }
    }
    onChangeVisiblePopup(visible) {
        this.setState({ visiblePopup: visible })
    }
    onSelectedItem = (item) => {
        let list = this.state.data.map((value) => {
            if (value.id === item.id) {
                return Object.assign(value, { isSelect: !value.isSelect })
            } else {
                return value
            }
        })
        this.setState({
            data: list
        })
    }
    showSelectedItems() {
        let str = ''
        if (!arrayIsEmpty(this.state.data)) {
            for (let item of this.state.data) {
                if (item.isSelect) {
                    str += item.label + '; '
                }
            }
        }
        return str
    }

    render() {
        const { visiblePopup, data, selectedItem } = this.state
        const { height } = Dimensions.get('window')
        const { item } = this.props
        return (
            <View style={styles.body}>
                <TouchableOpacity onPress={() => {
                    this.onChangeVisiblePopup(true)
                    if (!objectIsNull(this.props.onPress)) {
                        this.props.onPress()
                    }

                }} style={[styles.styleBox, { backgroundColor: colorForm.inputForm }]}>
                    {!stringIsEmpty(this.showSelectedItems()) ?
                        (
                            <View>
                                <Text style={{ fontSize: fontSizes.titleSmall, color: fontColors.title }}>{!stringIsEmpty(item) ? item.caption : ''}</Text>
                                <Text style={{
                                    color: fontColors.valueInput,
                                    fontSize: fontSizes.title
                                }}>{this.showSelectedItems()}</Text>
                            </View>
                        )
                        :
                        (
                            <Text style={{ fontSize: fontSizes.title, color: fontColors.title }}>{!stringIsEmpty(item) ? item.caption : ''}</Text>
                        )

                    }


                    <Image
                        style={styles.image}
                        source={getImage('ic_dropdown')}
                    />
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    onRequestClose={() => {
                        this.onChangeVisiblePopup(false)
                    }}
                    hardwareAccelerated={true}
                    visible={visiblePopup}
                    animationType='fade'>
                    <TouchableOpacity
                        onPress={() => { this.onChangeVisiblePopup(false) }}
                        style={{
                            flex: 1,
                            backgroundColor: '#00000066',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingHorizontal: Sizes.h30,
                            paddingVertical: Sizes.h100
                        }}>
                        <TouchableWithoutFeedback style={{ width: '100%', }}>
                            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{ width: '100%' }}>
                                <View style={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                    height: data.length > 8 ? height / 3 * 2 : null,
                                }}>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={data}
                                        // extraData={data}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <ItemCombobox value={item} onSelectedItem={this.onSelectedItem} {...this.props} />
                                            )
                                        }}

                                    />

                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        let dataSelect = this.state.data.filter((value) => {
                                            return value.isSelect
                                        })
                                        console.log('dataSelect: ', dataSelect)
                                        this.props.onSelectedItemCombobox(dataSelect)
                                        this.onChangeVisiblePopup(false)
                                    }}
                                    style={{
                                        width: '95%',
                                        paddingVertical: Sizes.h20,
                                        backgroundColor: 'white',
                                        marginVertical: Sizes.h10,
                                        borderRadius: Sizes.h52,
                                        alignSelf: 'center'
                                    }}>
                                    <Text style={{ textAlign: 'center', width: '100%', color: '#4F8DFF', fontWeight: 'bold', fontSize: Sizes.s30 }}>
                                        XÁC NHẬN
                                    </Text>
                                </TouchableOpacity>
                            </KeyboardAvoidingView>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    body: {
        width: '100%',
        // marginVertical: Sizes.s5,
        // marginHorizontal: Sizes.h20,
        // textAlign: 'center'
    },
    styleBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: fontView.paddingHorizontal,
        paddingVertical: fontView.paddingVertical,
        alignItems: 'center',
        borderRadius: fontView.border,
        borderWidth: fontSizes.border,
        borderColor: fontColors.border,
        alignSelf: 'center'
    },
    image: {
        width: Sizes.s45,
        height: Sizes.s45
    },

})

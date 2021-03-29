
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
    Platform
} from 'react-native'
import { Sizes, Colors, Functions } from '@dungdang/react-native-basic'
import Icon from "react-native-vector-icons/FontAwesome5";
import { iconStr } from '../../res/values/strings/iconStr'
const { arrayIsEmpty, stringIsEmpty, objectIsNull } = Functions
import { ItemPicker } from './ItemPicker'
import { colorForm } from '../../res/values/strings/colorStr'
export default class CustomPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visiblePopup: false,
            data: this.props.items !== undefined ? this.props.items : [],
            defaultData: this.props.items !== undefined ? this.props.items : [],
            inputSearch: '',
            defaultPlaceHolder: '',
            refresh: this.props.refresh,
            text: '',
        }
    }
    onChangeVisiblePopup(visible) {
        this.setState({ visiblePopup: visible })
    }
    onChangeText(text) {
        this.setState({
            inputSearch: text
        }, () => {
            if (text.trim() === '') {
                this.setState({ data: this.state.defaultData })
            } else {
                let arr = []
                const data = this.state.defaultData
                let i = 0
                for (let item of data) {
                    var position = item.label.toUpperCase().normalize().search(text.toUpperCase().normalize())
                    if (position > -1) {
                        arr.push(item)
                    }
                }
                this.setState({ data: arr })
            }
        })
    }
    onPressItem = (item) => {
        // this.props.onValueChange(item)
    }

    compareArray(arr1, arr2) {
        if (arr1.length === arr2.length) {
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i].value !== arr2[i].value) {
                    return false
                }
            }
            return true
        } else {
            return false
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
            if (this.props.items !== undefined && this.props.items !== null) {
                if (prevProps.items !== undefined && prevProps.items !== null) {
                    if (this.props.items.length > 0 && prevProps.items.length > 0) {
                        let res = this.compareArray(this.props.items, prevProps.items)
                        if (!res) {
                            this.setState({
                                data: this.props.items,
                                defaultData: this.props.items,
                                defaultPlaceHolder: ''
                            })
                        }
                    } else if (this.props.items.length > 0) {
                        this.setState({
                            data: this.props.items,
                            defaultData: this.props.items,
                            defaultPlaceHolder: ''
                        })
                    }
                }
                // this.setState({
                //     data: this.props.items,
                //     defaultData: this.props.items,
                //     defaultPlaceHolder: ''
                // })

            }
        }
    }
    onSelectItem = (item) => {
        const { onPressSelected } = this.props
        if (!objectIsNull(onPressSelected)) {
            this.setState({
                text: item.label
            }, () => {
                onPressSelected(item)
                this.onChangeVisiblePopup(false)
            })


        }
    }
    render() {
        const { visiblePopup } = this.state
        const { width, height } = Dimensions.get('window')
        const {
            theme,
            placeholder,
            onValueChange,
            disabled,
            style,

            //style truyền vào
            colorBackground,
            colorTextPlaceHolder,
            colorText,
            colorButtonDropdown,
            sizeText,
            multiSelect,
            mode,
            type

        } = this.props
        return (
            <View style={styles.body}>
                <TouchableOpacity disabled={disabled} onPress={() => {
                    this.onChangeVisiblePopup(true)
                }} style={[styles.styleBox, { backgroundColor: colorBackground === undefined ? colorForm.inputForm : colorBackground }]}>
                    <Text style={{
                        // color: this.state.defaultPlaceHolder === '' ? (colorTextPlaceHolder === undefined ? '#99A4AE' : colorTextPlaceHolder) : (colorText === undefined ? 'black' : colorText),
                        color: 'black',
                        fontSize: sizeText === undefined ? Sizes.h30 : sizeText
                    }}>{this.state.text}</Text>
                    {/* <Icon color={colorButtonDropdown === undefined ? 'black' : colorButtonDropdown} name='caret-down' /> */}
                    <Image
                        style={styles.image}
                        source={mode === 'select' ? iconStr.ic_dropdown : mode === 'alert' ? iconStr.ic_alert : mode === 'employee' ? iconStr.ic_emp : iconStr.ic_dropdown}
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
                                    height: this.state.data.length > 8 ? height / 3 * 2 : null,
                                }}>
                                    {(type === 'PICKER_SEARCH') &&
                                        (
                                            <ImageBackground source={iconStr.bg_card_gradient_blue} style={{
                                                width: '100%',
                                                flexDirection: 'row',
                                                paddingVertical: Sizes.h30,
                                                alignItems: 'center',
                                            }}>
                                                {/* <Icon name='search' color='#335272' size={Sizes.h40} /> */}

                                                <View style={{
                                                    flex: 1,
                                                    marginHorizontal: Sizes.h20,
                                                    flexDirection: 'row',
                                                    borderRadius: Sizes.h52,
                                                    paddingHorizontal: Sizes.h30,
                                                    backgroundColor: 'white',
                                                    alignItems: 'center',
                                                }}>
                                                    <TextInput
                                                        value={this.state.inputSearch}
                                                        onChangeText={(text) => { this.onChangeText(text) }}
                                                        placeholderTextColor='silver'
                                                        placeholder='Tìm kiếm'
                                                        style={{
                                                            flex: 1,
                                                            height: Sizes.h80
                                                        }}
                                                    />
                                                    <Image style={styles.image} source={iconStr.ic_search} />

                                                </View>

                                            </ImageBackground>
                                        )
                                    }
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={this.state.data}
                                        extraData={this.state.refresh}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <ItemPicker onSelectItem={this.onSelectItem} type={type} item={item} />
                                            )
                                        }}
                                    />

                                </View>
                            </KeyboardAvoidingView>
                        </TouchableWithoutFeedback>

                    </TouchableOpacity>
                </Modal>
                {/* <View style={styles.popupPicker}></View> */}


            </View>
        )
    }
}


const styles = StyleSheet.create({
    body: {
        width: '100%',
        marginVertical: Sizes.s5,
        // marginHorizontal: Sizes.h20,
        // textAlign: 'center'
    },
    styleBox: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.h28,
        paddingVertical: Sizes.h16,
        alignItems: 'center',
        borderRadius: Sizes.h52,
        // marginHorizontal: Sizes.h20
        alignSelf: 'center'
    },
    image: {
        width: Sizes.s45,
        height: Sizes.s45
    },

})

CustomPicker.defaultProps = {

}
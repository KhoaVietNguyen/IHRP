import * as React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback, Dimensions, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import Sizes from './styles/fontStyles'
import Icon from "react-native-vector-icons/FontAwesome5";
export default class PopupPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visiblePopup: false,
            data: [],
            defaultData: [],

            inputSearch: '',
            defaultPlaceHolder: '',
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
                    var position = item.toUpperCase().normalize().search(text.toUpperCase().normalize())
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
                if (arr1[i].toUpperCase().normalize() !== arr2[i].toUpperCase().normalize()) {
                    return false
                }
            }
            return true
        } else {
            return false
        }
    }
    componentDidMount() {
        this.setState({
            data: this.props.items,
            defaultData: this.props.items,
        })
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

            }
        }
    }
    render() {
        const { visiblePopup } = this.state
        const { width, height } = Dimensions.get('window')
        const {
            text,
            placeholder,
            onValueChange,
            disabled,
            style,
            visibleSearch,


            //style truyền vào

            styleContainer,
            sizeText,
            fontFamily,
            // sizePlaceHolder,
            colorTextPlaceHolder,
            colorText,
            weightText,

            visibleIcon,
            nameIcon,
            sizeIcon,
            colorIcon,

        } = this.props
        return (
            <View style={styles.body}>
                <TouchableOpacity
                    disabled={disabled}
                    onPress={() => {
                        this.onChangeVisiblePopup(true)
                    }}
                    style={styleContainer === undefined ? styles.styleBox : [styleContainer, { justifyContent: 'space-between', flexDirection: 'row' }]}>
                    <Text style={{
                        color: (text === '' || text === undefined) ?
                            (colorTextPlaceHolder === undefined ? '#99A4AE' : colorTextPlaceHolder)
                            :
                            (colorText === undefined ? 'black' : colorText),

                        fontSize: sizeText === undefined ? Sizes.h30 : sizeText,
                        fontWeight: weightText === undefined ? null : weightText,
                        fontFamily: fontFamily === undefined ? null : fontFamily
                    }}>{(text === '' || text === undefined) ? (placeholder === undefined ? 'Chọn một phần tử' : placeholder) : text}</Text>
                    {visibleIcon && <Icon size={sizeIcon === undefined ? Sizes.h30 : sizeIcon} color={colorIcon === undefined ? 'black' : colorIcon} name={nameIcon === undefined ? 'caret-down' : nameIcon} />}
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
                            paddingHorizontal: Sizes.h30
                        }}>
                        <TouchableWithoutFeedback style={{ width: '100%' }}>
                            <KeyboardAvoidingView style={{ width: '100%' }} behavior={Platform.OS === 'ios' ? 'position' : null} >
                                <View style={{
                                    width: '100%',
                                    backgroundColor: 'white',
                                    height: this.state.data.length > 8 ? height / 2 : null,
                                    paddingHorizontal: Sizes.h10,
                                    paddingVertical: Sizes.h18
                                }}>
                                    {visibleSearch &&
                                        (
                                            <View style={{
                                                width: '100%',
                                                // borderRadius: 5,
                                                // borderWidth: 1,
                                                // borderColor: Colors.black,
                                                flexDirection: 'row',
                                                padding: Sizes.h10,
                                                alignItems: 'center'
                                            }}>
                                                {/* <Icon name='search' color='#335272' size={Sizes.h40} /> */}
                                                <View style={{ flex: 1, marginHorizontal: Sizes.h10 }}>
                                                    <TextInput
                                                        value={this.state.inputSearch}
                                                        onChangeText={(text) => { this.onChangeText(text) }}
                                                        placeholderTextColor='silver'
                                                        placeholder='Tìm kiếm'
                                                        style={{
                                                            backgroundColor: '#F7F7F7',
                                                            borderRadius: 20,
                                                            paddingHorizontal: 30,
                                                            height: Sizes.h80
                                                        }}
                                                    />
                                                </View>

                                            </View>

                                        )
                                    }
                                    {visibleSearch && <View style={{ width: '100%', height: 1, backgroundColor: 'black' }}></View>}
                                    <View style={{ alignSelf: 'center', marginVertical: 10 }}>
                                        {/* <Text style={{ fontSize: Sizes.h30, color: 'orange', fontWeight: 'bold' }}>Chọn </Text> */}
                                    </View>
                                    <FlatList

                                        showsVerticalScrollIndicator={false}
                                        data={this.state.data}
                                        extraData={this.state}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item, index }) => {
                                            return (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        onValueChange(item)
                                                        this.setState({
                                                            // defaultPlaceHolder: item,
                                                            inputSearch: ''
                                                        })
                                                        this.onChangeVisiblePopup(false)
                                                    }}
                                                    style={{
                                                        width: '100%',
                                                        backgroundColor: '#E6E6E6',
                                                        // justifyContent: 'center',
                                                        // alignItems: 'center',
                                                        paddingVertical: Sizes.h18,
                                                        marginVertical: Sizes.h10,

                                                        shadowColor: "rgba(0, 0, 0, 0.5)",
                                                        shadowRadius: 2,
                                                        shadowOpacity: 0.25,
                                                        shadowOffset: {
                                                            width: 0,
                                                            height: 4
                                                        },
                                                        elevation: 5,
                                                    }}>
                                                    <Text style={{
                                                        color: '#335272',
                                                        // fontWeight: 'bold', 
                                                        textAlign: 'justify',
                                                        fontSize: Sizes.h30,
                                                        marginHorizontal: Sizes.h10
                                                    }}>{item}</Text>
                                                </TouchableOpacity>
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
        marginVertical: Sizes.s5
    },
    styleBox: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Sizes.h28,
        paddingVertical: Sizes.h28,
        alignItems: 'center',
        backgroundColor: '#DDDDDD'
    },
    popupPicker: {
        width: 120,
        height: 100,
        top: 0,
        left: 0,
        position: 'absolute',
        backgroundColor: 'red',
        zIndex: 1000,
        elevation: 100000
    }

})

PopupPicker.defaultProps = {

}
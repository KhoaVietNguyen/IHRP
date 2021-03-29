
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
    ActivityIndicator
} from 'react-native'
import { Sizes, Colors, Functions } from '@dungdang/react-native-basic'
import Icon from "react-native-vector-icons/FontAwesome5";
import { iconStr } from '../../res/values/strings/iconStr'
const { arrayIsEmpty, stringIsEmpty, objectIsNull } = Functions
import { ItemPicker } from './ItemPicker'
import { selectItemMultiSearch } from '../custom/function/functionPicker'
import { colorForm } from '../../res/values/strings/colorStr'
import getImage from '../../res/values/strings/iconStrS'
import { fontSizes, fontColors, fontView } from '../../res/values/styles/appStyles'
import { userProfile } from '../../config/settings';
import { CustomButton } from '../custom/CustomButton'
export default class CustomSearchPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visiblePopup: false,
            data: this.props.items,
            defaultData: this.props.items,
            inputSearch: '',
            defaultPlaceHolder: '',
            refresh: this.props.refresh,
            dataSelect: [],
            text: !stringIsEmpty(this.props.textData) ? this.props.textData : '',
            notiError: '',
        }
    }
    onChangeVisiblePopup(visible) {
        this.setState({ visiblePopup: visible })
    }
    mapData(data, type) {
        let arr = data.map((value) => {
            let id = value.empID
            let name = value.item1
            switch (type) {
                case 'ReplacePerson':
                    id = value.empID
                    name = value.item1
                    break
                case 'NotifyTo':
                    id = value.empID
                    name = value.item1
                    break
                default:
                    id = value.empID
                    break
            }
            return {
                id: id,
                label: name,
                value: value,
                isSelect: false,
                type: type
            }
        })
        // let list = this.state._leaveApplication
        // for (let item of list) {
        //     if (item.tag === type) {
        //         if (item.items.length > 0) {
        //             if (!arrayIsEmpty(arr)) {
        //                 let array = this.compareData(item.items, arr)
        //                 item.items = array
        //             }
        //         } else {
        //             item.items = arr
        //         }
        //     }
        // }
        return arr
    }
    onChangeText(text) {
        this.setState({
            inputSearch: text
        }, () => {
            // const { item } = this.props
            // if (!objectIsNull(item)) {
            //     if (!objectIsNull(item.getItems)) {
            //         item.getItems(text)
            //     }
            // }

            // if (text.trim() === '') {
            //     this.setState({ data: this.state.defaultData })
            // } else {
            //     let arr = []
            //     const data = this.state.defaultData
            //     let i = 0
            //     for (let item of data) {
            //         var position = item.label.toUpperCase().normalize().search(text.toUpperCase().normalize())
            //         if (position > -1) {
            //             arr.push(item)
            //         }
            //     }
            //     this.setState({ data: arr })
            // }
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
    onSelectItem = (value) => {
        const { control, item, onPressSelected } = this.props
        if (!objectIsNull(value)) {
            if (control === 'comboboxMultiSearchForm') {
                let obj = selectItemMultiSearch(value, this.state.data, this.state.dataSelect)
                if (obj !== undefined) {
                    if (obj.dataMultiSearch !== undefined) {
                        this.setState({
                            data: obj.dataMultiSearch,
                            dataSelect: obj.dataSelectMulti,
                            defaultData: obj.dataMultiSearch
                        })
                    }
                }
            } else if (control === 'comboboxSearchForm') {
                if (!objectIsNull(onPressSelected)) {
                    this.setState({
                        text: value.label
                    }, () => {
                        this.onChangeVisiblePopup(false)
                    })
                    onPressSelected(value)
                }
            }
        } else {
            if (control === 'comboboxMultiSearchForm') {
                this.setState({
                    data: [],
                    dataSelect: [],
                    defaultData: [],
                    text: ''
                }, () => {
                    onPressSelected([])
                })
            } else if (control === 'comboboxSearchForm') {
                if (!objectIsNull(onPressSelected)) {
                    this.setState({
                        text: ''
                    }, () => {
                        this.onChangeVisiblePopup(false)
                    })
                    onPressSelected(undefined)
                }
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.error !== prevProps.error) {
            this.setState({
                notiError: this.props.error
            })
        }
        if (this.props.textData !== prevProps.textData) {
            this.setState({
                text: this.props.textData
            })
        }
        if (this.props.value !== prevProps.value) {
            if (stringIsEmpty(this.props.value)) {
                this.setState({
                    data: [],
                    defaultData: [],
                    dataSelect: [],
                    text: '',
                    inputSearch: ''
                })
            }
        }
        if (this.props.dataSubstitute !== prevProps.dataSubstitute) {
            if (this.props.dataSubstitute !== undefined) {
                let list = this.mapData(this.props.dataSubstitute, this.props.item.tag)
                if (!arrayIsEmpty(list) && this.state.dataSelect.length > 0) {
                    let d = list.map((value) => {
                        for (let item of this.state.dataSelect) {
                            if (item.id === value.id) {
                                return item
                            }
                        }
                        return value
                    })
                    this.setState({
                        data: d,
                        defaultData: d,
                        defaultPlaceHolder: ''
                    })

                } else {
                    this.setState({
                        data: list,
                        defaultData: list,
                        defaultPlaceHolder: ''
                    })
                }
            }
        }

        if (this.props.dataEmployeeBusinessTrip !== prevProps.dataEmployeeBusinessTrip) {
            if (this.props.dataEmployeeBusinessTrip !== undefined) {
                let list = this.mapData(this.props.dataEmployeeBusinessTrip, this.props.item.tag)
                if (!arrayIsEmpty(list) && this.state.dataSelect.length > 0) {
                    let d = list.map((value) => {
                        for (let item of this.state.dataSelect) {
                            if (item.id === value.id) {
                                return item
                            }
                        }
                        return value
                    })
                    this.setState({
                        data: d,
                        defaultData: d,
                        defaultPlaceHolder: ''
                    })

                } else {
                    this.setState({
                        data: list,
                        defaultData: list,
                        defaultPlaceHolder: ''
                    })
                }
            }
        }
    }
    showError() {
        const { errorSubstitute, errorEmployeeBusinessTrip } = this.props
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <CustomButton onPress={() => {
                    if (!stringIsEmpty(errorSubstitute)) {
                        this.props.getSubstitute('')
                    } else if (!stringIsEmpty(errorEmployeeBusinessTrip)) {
                        this.props.getListEmployeeBusinessTripApplicationAction()
                    }
                    // if (!stringIsEmpty(errorTypesLeave)) {
                    //     this.props.getTypesLeaveApplication()
                    // }
                    // if (!stringIsEmpty(errorGetDetail)) {
                    //     let param = this.props.navigation.getParam('itemLeaveApplication')
                    //     if (!objectIsNull(param)) {
                    //         this.props.getDetailLeaveApplicationAction([{ ID: param.leaveRecordID }])
                    //     }
                    // }

                }} title={userProfile.LangID === 'VN' ? 'Thử lại' : 'Reload'} type='reload' />
            </View>
        )
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
            mode,
            control,
            item,
            // onSelectItem,
            // itemsSelect,

            //container 
            fetchingSubstitute,
            fetchingEmployeeBusinessTrip,
            dataSubstitute,
            errorSubstitute,
            errorEmployeeBusinessTrip,
            onPressSelected,

        } = this.props
        // console.log('Noti erorr: ', this.state.notiError)
        return (
            <View style={styles.body}>
                <TouchableOpacity disabled={objectIsNull(item.editable) ? false : item.editable === false ? true : false} onPress={() => {
                    if (item.display === 'leaveApplication') {
                        this.props.getSubstitute('')
                    } else if (item.display === 'businessTripApplication') {
                        this.props.getListEmployeeBusinessTripApplicationAction()
                    }
                    this.onChangeVisiblePopup(true)
                }} style={[styles.styleBox, {
                    borderColor: !stringIsEmpty(this.state.notiError) ? 'red' : fontColors.border,
                    paddingVertical: !stringIsEmpty(this.state.text) ? fontView.paddingVerticalTextInput : fontView.paddingVerticalText,
                    backgroundColor: colorBackground === undefined ? colorForm.inputForm : colorBackground
                }]}>
                    {!stringIsEmpty(this.state.text) ?
                        (
                            <View>
                                <Text style={{
                                    fontSize: fontSizes.titleSmall,
                                    color: fontColors.title
                                }}>{item.caption} </Text>
                                <Text style={{
                                    fontSize: fontSizes.title,
                                    color: fontColors.valueInput
                                }}>{this.state.text}</Text>
                            </View>
                        )
                        :
                        (
                            <Text style={{
                                fontSize: fontSizes.title,
                                color: fontColors.title
                            }}>{item.caption}<Text style={{ color: 'red' }}>{item.requireSubmit === '1' ? '*' : ""}</Text></Text>
                        )
                    }

                    {/* <Icon color={colorButtonDropdown === undefined ? 'black' : colorButtonDropdown} name='caret-down' /> */}
                    <TouchableOpacity
                        disabled={objectIsNull(item.editable) ? false : item.editable === false ? true : false}
                        onPress={() => {
                            this.onSelectItem(undefined)
                        }}>
                        <Image
                            style={styles.image}
                            source={
                                !stringIsEmpty(this.state.text) ? getImage('ic_close_black') :
                                    item.tag === 'select' ? iconStr.ic_dropdown :
                                        item.tag === 'NotifyTo' ? iconStr.ic_alert :
                                            item.tag === 'ReplacePerson' ? iconStr.ic_emp :
                                                iconStr.ic_dropdown
                            }
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
                <Modal
                    transparent={true}
                    onRequestClose={() => {
                        this.onChangeVisiblePopup(false)
                        this.setState({
                            dataSelect: []
                        })
                    }}
                    hardwareAccelerated={true}
                    visible={visiblePopup}
                    animationType='fade'>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                dataSelect: !arrayIsEmpty(item.value) ? item.value : []
                            })
                            this.onChangeVisiblePopup(false)
                        }}
                        style={{
                            flex: 1,
                            backgroundColor: '#00000066',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                            // bottom: 0,
                            // alignSelf: 'flex-end',

                            // paddingHorizontal: Sizes.h30,
                            // paddingVertical: Sizes.h65
                        }}>
                        <TouchableWithoutFeedback style={{ width: '100%', }} >
                            <KeyboardAvoidingView keyboardVerticalOffset={50} behavior={Platform.OS === 'android' ? 'height' : null} style={{ width: '100%', }}>
                                <View style={{ width: '100%', justifyContent: 'center', height: height / 4 * 3, }}>
                                    <View style={{
                                        width: '100%',
                                        backgroundColor: 'white',
                                        flex: 1,
                                        // borderRadius: Sizes.s40,
                                        borderTopRightRadius: Sizes.s40,
                                        borderTopLeftRadius: Sizes.s40,
                                        paddingBottom: Sizes.h65,
                                        paddingVertical: Sizes.h20
                                    }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Sizes.s20, }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({
                                                        dataSelect: !arrayIsEmpty(item.value) ? item.value : []
                                                    })
                                                    this.onChangeVisiblePopup(false)
                                                }}
                                                style={{ paddingHorizontal: Sizes.s20, paddingVertical: Sizes.s10 }}>
                                                <Icon name={'times'} size={Sizes.h36} color={'#2F2E37'} />
                                            </TouchableOpacity>
                                            <Text style={{ fontSize: Sizes.h30, fontWeight: '500', paddingVertical: Sizes.s10 }}>{!stringIsEmpty(item.caption) ? item.caption : ''}</Text>
                                            {control === 'comboboxMultiSearchForm' ?
                                                (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            if (item.tag === 'NotifyTo') {
                                                                if (!objectIsNull(onPressSelected)) {
                                                                    let text = ''
                                                                    for (let item of this.state.dataSelect) {
                                                                        text += item.label + ' ; '
                                                                    }
                                                                    this.setState({
                                                                        text: text
                                                                    }, () => {
                                                                        this.onChangeVisiblePopup(false)
                                                                    })
                                                                    onPressSelected(this.state.dataSelect)
                                                                }
                                                            } else {

                                                            }
                                                        }}
                                                        style={{ paddingVertical: Sizes.s10 }}
                                                    >
                                                        <Text style={{ color: '#2F6BFE', fontSize: Sizes.h30, fontWeight: '500' }}> {userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm'} </Text>
                                                    </TouchableOpacity>
                                                )
                                                :
                                                (
                                                    <View>
                                                        <Text>   </Text>
                                                    </View>
                                                )
                                            }

                                        </View>
                                        {(control === 'comboboxMultiSearchForm' || control === 'comboboxSearchForm') &&
                                            (
                                                <View style={{
                                                    width: '100%',
                                                    flexDirection: 'row',
                                                    paddingVertical: Sizes.h30,
                                                    alignItems: 'center',
                                                }}>

                                                    <View style={{
                                                        flex: 1,
                                                        marginHorizontal: Sizes.h20,
                                                        flexDirection: 'row',
                                                        borderRadius: fontView.border,
                                                        paddingHorizontal: Sizes.h10,
                                                        backgroundColor: 'white',
                                                        alignItems: 'center',
                                                        backgroundColor: '#F2F2F2',
                                                        // shadowColor: 'rgba(0, 0, 0, 0.5 )',
                                                        // shadowOffset: { width: 0, height: 4 },
                                                        // shadowRadius: Sizes.h10,
                                                        // shadowOpacity: 0.2,
                                                        // elevation: 4,
                                                    }}>

                                                        <TextInput
                                                            value={this.state.inputSearch}
                                                            onChangeText={(text) => { this.onChangeText(text) }}
                                                            placeholderTextColor='silver'
                                                            placeholder={userProfile.LangID === 'VN' ? 'Tìm kiếm' : 'Search'}
                                                            style={{
                                                                flex: 1,
                                                                height: Sizes.h80,
                                                                color: 'black'
                                                            }}
                                                        />
                                                        <TouchableOpacity

                                                            onPress={() => {

                                                                const { item } = this.props
                                                                if (item.tag === 'NotifyTo' || item.tag === 'ReplacePerson') {
                                                                    this.props.getSubstitute(this.state.inputSearch)
                                                                }
                                                            }} style={{
                                                                padding: Sizes.h10,
                                                                borderRadius: Sizes.h10,
                                                                backgroundColor: '#3498db',
                                                                // margin: Sizes.h10
                                                            }}>
                                                            <Image style={styles.image} source={getImage('ic_search_white')} />
                                                        </TouchableOpacity>
                                                    </View>

                                                </View>
                                            )
                                        }
                                        {control === 'comboboxMultiSearchForm' && this.state.dataSelect !== undefined && this.state.dataSelect.length > 0 &&
                                            <View style={{
                                                width: '90%',
                                                marginHorizontal: Sizes.s10,
                                                alignSelf: 'center',
                                                marginVertical: Sizes.h10,
                                                borderWidth: fontSizes.border,
                                                borderRadius: fontView.border,
                                                borderColor: fontColors.border,
                                                paddingVertical: Sizes.s10,
                                            }}>
                                                <Text style={{
                                                    fontSize: Sizes.h24,
                                                    color: 'red',
                                                    textAlign: 'right',
                                                    // width: '90%',
                                                    // backgroundColor: 'blue',
                                                    // flex: 1,
                                                    // marginVertical: Sizes.s10,
                                                    marginHorizontal: Sizes.s20,
                                                    fontStyle: 'italic'
                                                }}>{userProfile.LangID === 'VN' ? 'Đã chọn' : 'Selected'} ({this.state.dataSelect.length})</Text>
                                                <FlatList
                                                    styles={{ flex: 1, width: '100%' }}
                                                    // contentContainerStyle={{ flex: 1, }}
                                                    horizontal={true}

                                                    showsHorizontalScrollIndicator={false}
                                                    data={this.state.dataSelect}
                                                    extraData={this.state.dataSelect}
                                                    keyExtractor={(item) => item.id}
                                                    renderItem={({ item, index }) => {
                                                        return (
                                                            // <View style={{ width: 50, height: 50, backgroundColor: 'orange', marginHorizontal: 10 }}>
                                                            //     <Text>{item.label}</Text>
                                                            // </View>
                                                            <ItemPicker item={item} type={'SELECT'} onSelectItem={this.onSelectItem} />
                                                        )
                                                    }}
                                                />
                                            </View>
                                        }
                                        {!stringIsEmpty(errorEmployeeBusinessTrip) || !stringIsEmpty(errorSubstitute) ?
                                            (
                                                this.showError()
                                            )
                                            : (fetchingSubstitute || fetchingEmployeeBusinessTrip) ?
                                                (
                                                    <ActivityIndicator size='large' color='blue' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
                                                )
                                                :
                                                (
                                                    <FlatList
                                                        style={{ flex: 1, }}
                                                        showsVerticalScrollIndicator={false}
                                                        data={this.state.data}
                                                        extraData={this.state.data}
                                                        maxToRenderPerBatch={5}
                                                        keyExtractor={(item) => item.value}
                                                        renderItem={({ item, index }) => {
                                                            return (
                                                                <ItemPicker item={item} type={control} onSelectItem={this.onSelectItem} />
                                                            )
                                                        }}
                                                    />
                                                )


                                        }
                                        {/* {(!fetchingSubstitute && !fetchingEmployeeBusinessTrip) ?
                                            (
                                                <FlatList
                                                    style={{ flex: 1, }}
                                                    showsVerticalScrollIndicator={false}
                                                    data={this.state.data}
                                                    extraData={this.state.data}
                                                    maxToRenderPerBatch={5}
                                                    keyExtractor={(item) => item.value}
                                                    renderItem={({ item, index }) => {
                                                        return (
                                                            <ItemPicker item={item} type={control} onSelectItem={this.onSelectItem} />
                                                        )
                                                    }}
                                                />
                                            )
                                            :
                                            (
                                                <ActivityIndicator size='large' color='blue' style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
                                            )

                                        } */}

                                    </View>

                                    {/* {control === 'comboboxMultiSearchForm' &&
                                        (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (item.tag === 'NotifyTo') {
                                                        if (!objectIsNull(onPressSelected)) {
                                                            let text = ''
                                                            for (let item of this.state.dataSelect) {
                                                                text += item.label + ' ; '
                                                            }
                                                            this.setState({
                                                                text: text
                                                            }, () => {
                                                                this.onChangeVisiblePopup(false)
                                                            })
                                                            onPressSelected(this.state.dataSelect)
                                                        }
                                                    } else {

                                                    }
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
                                        )
                                    } */}
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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: fontView.paddingHorizontal,
        // paddingVertical: fontView.paddingVertical,
        alignItems: 'center',
        borderRadius: fontView.border,
        borderWidth: fontSizes.border,

        // marginHorizontal: Sizes.h20
        alignSelf: 'center'
    },
    image: {
        width: Sizes.s45,
        height: Sizes.s45
    },

})

CustomSearchPicker.defaultProps = {

}
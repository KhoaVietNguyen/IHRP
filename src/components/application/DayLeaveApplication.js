import * as React from 'react'
import {
    View,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
    Alert,
    Dimensions,
    FlatList,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native'
import Form from '../custom/form/Form'
import getImage from '../../res/values/strings/iconStrS'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { Sizes } from '@dungdang/react-native-basic'
import CustomHeader from '../custom/CustomHeader'
import { CustomButton } from '../custom/CustomButton'
import Loading from '../custom/Loading'
import RNFS from 'react-native-fs'
import { appStrS } from '../../res/values/strings/appStrS'

//testForm 
import FormDetail from '../custom/form/FormDetail'
import {
    leaveApplication,
    leaveDaysApplication,
    businessTripApplication,
    overTimeApplication,
} from '../custom/form/FormTypeDetail'
import { colorForm } from '../../res/values/strings/colorStr'
import ItemDetailLeave from '../custom/application/ItemDetailLeave'
import { userProfile, errorConnectServer } from '../../config/settings'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { fontSizes } from '../../res/values/styles/appStyles'
export default class DayLeaveApplication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _leaveApplication: leaveDaysApplication(),
            oldLeaveApplication: undefined,

            isClickShowInfoLeave: false,
            isShowDetailLeave: false,
            isShowModal: false,
            isShowErrorSaveDays: false,

            isShowKeyboard: false,
        }
    }
    compareData(oldData, newData) {
        for (let newItem of newData) {
            for (let oldItem of oldData) {
                if (newItem.id === oldItem.id) {
                    newItem = oldItem
                }
            }
        }
        return newData
    }
    onChangeDateTimePicker = (value) => {
        let form = this.state._leaveApplication
        let isDateRange = false
        if (value === 'date') {
            for (let item of form) {
                if (item.control === 'twoDatePicker') {
                    if (item.value1 !== item.value2) {
                        isDateRange = true
                        break
                    } else {
                        this.props.getTimesLeaveApplicationAction({
                            LeaveRecordID: '',
                            LeaveTypeID: '',
                            DateID: item.value1
                        })
                        break
                    }
                }
            }
            if (isDateRange) {
                for (let item of form) {
                    if (item.control === 'twoCheckBox') {
                        // item.visible = true
                        item.value1 = '0'
                        item.value2 = '0'
                        item.caption1 = userProfile.LangID === 'VN' ? 'Từ chiều' : 'From afternoon'
                        item.caption2 = userProfile.LangID === 'VN' ? 'Đến sáng' : 'To morning'
                        item.type = 'multi'
                    } else if (item.control === 'twoTimePicker') {
                        item.visible = true
                    } else if (item.control === 'buttonForm') {
                        item.visible = false
                    } else if (item.tag === 'TotalLeaveHours') {
                        item.value = ''
                        item.data = ''
                    } else if (item.tag === 'TotalLeaveDays') {
                        item.value = ''
                    } else if (item.tag === 'Approver') {
                        item.value = ''
                    }
                }
            } else {
                for (let item of form) {
                    if (item.control === 'twoCheckBox') {
                        // item.visible = false
                        item.value1 = '0'
                        item.value2 = '0'
                        item.caption1 = userProfile.LangID === 'VN' ? 'Nghỉ sáng' : 'Morning leave'
                        item.caption2 = userProfile.LangID === 'VN' ? 'Nghỉ chiều' : 'Afternoon leave'
                        item.type = 'singleNoRequire'
                    } else if (item.control === 'twoTimePicker') {
                        item.visible = false
                    } else if (item.control === 'buttonForm') {
                        item.visible = true
                    } else if (item.tag === 'TotalLeaveHours') {
                        item.value = ''
                    } else if (item.tag === 'TotalLeaveDays') {
                        item.value = ''
                    } else if (item.tag === 'Approver') {
                        item.value = ''
                    }
                }
            }
        } else {
            for (let item of form) {
                if (item.tag === 'TotalLeaveHours') {
                    item.value = ''
                    item.data = ''
                } else if (item.tag === 'TotalLeaveDays') {
                    item.value = ''
                } else if (item.tag === 'Approver') {
                    item.value = ''
                }
            }
        }
        this.setState({
            _leaveApplication: form
        }, () => {
            this.onPressAutoCalculateApplication()
        })
    }
    mapData(data, type) {
        let arr = data.map((value) => {
            let id = value.id
            let name = value.nameVN
            switch (type) {
                case 'LeaveTypeID':
                    id = value.id
                    name = value.nameVN
                    break
                case 'ReplacePerson':
                    id = value.empID
                    name = value.item1
                    break
                case 'NotifyTo':
                    id = value.empID
                    name = value.item1
                    break
                default:
                    id = value.id
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
        let list = this.state._leaveApplication
        for (let item of list) {
            if (item.tag === type) {
                if (item.items.length > 0) {
                    if (!arrayIsEmpty(arr)) {
                        let array = this.compareData(item.items, arr)
                        item.items = array
                    }
                } else {
                    item.items = arr
                }
            } else if (item.tag === 'twoButton') {
                // item.onPressButton1 = this.onPressCalculateApplication
                // item.onPressButton2 = this.onShowInfoLeave
            } else if (item.tag === 'ReplacePerson') {
                // item.getItems = this.getSubstitute
            } else if (item.tag === 'NotifyTo') {
                // item.getItems = this.getSubstitute
            }
        }
        this.setState({
            _leaveApplication: list
        })
    }
    checkDetailLeave(fromDate, toDate) {
        let fd = fromDate.split('/')
        let td = toDate.split('/')
        if (!arrayIsEmpty(fd) && !arrayIsEmpty(td)) {
            if (fd[2] > td[2]) {
                return false
            } else if (fd[2] === td[2]) {
                if (fd[1] > td[1]) {
                    return false
                } else if (fd[1] === td[1]) {
                    if (fd[0] > td[0]) {
                        return false
                    }
                }
            }
        }
        return true
    }
    showDetailLeave = () => {
        let form = this.state._leaveApplication
        let flag = true
        let leaveTypeID, fromDate, toDate = ''
        for (let item of form) {
            if (item.tag === 'LeaveTypeID') {
                if (!stringIsEmpty(item.data)) {
                    leaveTypeID = item.data
                } else {
                    flag = false
                    Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', userProfile.LangID === 'VN' ? 'Bạn chưa chọn loại nghỉ' : 'You have not selected leave type', [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => { } }])
                    break
                }
            } else if (item.control === 'twoDatePicker') {
                if (item.value1 !== item.value2) {
                    let result = this.checkDetailLeave(item.value1, item.value2)
                    if (result) {
                        fromDate = item.value1
                        toDate = item.value2
                    } else {
                        flag = false
                        Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', userProfile.LangID === 'VN' ? 'Từ ngày phải nhỏ hơn hoặc bằng đến ngày' : 'From date must be less than or equal to date', [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => { } }])
                    }
                    break
                }
            }
        }
        if (flag && !stringIsEmpty(leaveTypeID) && !stringIsEmpty(fromDate) && !stringIsEmpty(toDate)) {
            this.props.getDaysLeaveApplicationAction({
                LeaveRecordID: '',
                LeaveTypeID: leaveTypeID,
                FromDate: fromDate,
                ToDate: toDate
            })
            this.setState({
                isShowDetailLeave: true
            }, () => {
                this.onChangeVisiblePopup(true)
            })
        }
    }
    onReadFile = () => {

        const { } = this.props
        let fileName = ''
        let fileBase64 = ''
        for (let item of this.state._leaveApplication) {
            if (item.tag === 'AttachFile') {
                // console.log('2222222222222: ', item)
                fileName = item.value
                fileBase64 = item.fileBase64
                break
            }
        }

        if (!stringIsEmpty(fileBase64)) {
            this.props.navigation.navigate('FileWebView', { imageBase64: fileBase64 })
            // if (!stringIsEmpty(fileName)) {
            //     let split = fileName.split('.')
            //     let type = split[split.length - 1]
            //     if (
            //         type.toLocaleUpperCase() === 'PNG'.toLocaleUpperCase() ||
            //         type.toLocaleUpperCase() === 'JPG'.toLocaleUpperCase()
            //     ) {
            //         this.props.navigation.navigate('FileWebView', { imageBase64: fileBase64 })
            //     }
            // }
        } else if (!stringIsEmpty(fileName)) {
            this.props.workflowDownloadFileAction([{ FileName: fileName }])
        }

    }

    onViewFile = () => {

        const { } = this.props
        let fileName = ''
        let fileBase64 = ''
        for (let item of this.state._leaveApplication) {
            if (item.tag === 'AttachFile') {
                // console.log('2222222222222: ', item)
                fileName = item.value
                fileBase64 = item.fileBase64
                break
            }
        }

        // console.log('111111111111111111111: ', fileBase64.length)
        if (!stringIsEmpty(fileBase64)) {
            // this.props.navigation.navigate('ImageView', { imageBase64: fileBase64 })
            if (!stringIsEmpty(fileName)) {
                let split = fileName.split('.')
                let type = split[split.length - 1]
                if (
                    type.toLocaleUpperCase() === 'PNG'.toLocaleUpperCase() ||
                    type.toLocaleUpperCase() === 'JPG'.toLocaleUpperCase()
                ) {
                    this.props.navigation.navigate('ImageView', { imageBase64: fileBase64 })
                }
            }
        } else if (!stringIsEmpty(fileName)) {
            this.props.workflowDownloadFileAction([{ FileName: fileName }])
        }

    }
    setFunctionForm() {
        if (!arrayIsEmpty(this.state._leaveApplication)) {
            let list = this.state._leaveApplication
            for (let item of list) {
                if (item.control === 'twoButtonForm') {
                    item.onPressButton1 = this.onPressCalculateApplication
                    item.onPressButton2 = this.onShowInfoLeave
                } else if (item.control === 'combobox' && item.tag === 'LeaveTypeID') {
                    item.onSelected = this.onPressCalculateApplication
                } if (item.control === 'textedit') {
                    item.onPressFocus = this._keyboardDidShow
                    item.onPressBlur = this._keyboardDidHide
                } else if (item.control === 'twoDatePicker') {
                    item.onPress1 = this.onChangeDateTimePicker
                    item.onPress2 = this.onChangeDateTimePicker
                } else if (item.control === 'twoTimePicker') {
                    item.onPress1 = this.onChangeDateTimePicker
                    item.onPress2 = this.onChangeDateTimePicker
                } else if (item.control === 'buttonForm' && item.tag === 'ShowLeaveInfo') {
                    item.onPress = this.onShowInfoLeave
                } else if (item.tag === 'AttachFile') {
                    item.onPressViewFile = this.onViewFile
                    item.onPressReadFile = this.onReadFile
                } else if (item.control === 'twoCheckBox') {
                    item.onPressValue1 = this.onPressCalculateApplication
                    item.onPressValue2 = this.onPressCalculateApplication
                }
            }
            this.setState({
                _leaveApplication: list
            }, () => {
                this.props.getTypesLeaveApplication()
            })
        }
    }
    componentDidMount() {
        this.setFunctionForm()
        if (Platform.OS === 'android') {
            this.keyboardDidShowListener = Keyboard.addListener(
                'keyboardDidShow',
                this._keyboardDidShow,
            )
            this.keyboardDidHideListener = Keyboard.addListener(
                'keyboardDidHide',
                this._keyboardDidHide,
            )
        }
    }
    _keyboardDidShow = () => {
        this.setState({
            isShowKeyboard: true,
        });
    }

    _keyboardDidHide = () => {
        this.setState({
            isShowKeyboard: false,
        });
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
        }
    }
    componentDidUpdate(prevProps) {
        const {
            dataGetDetail,
            dataUpdateLeaveApplication,
            dataDeleteLeaveApplication,

            dataDownloadFile,


            errorDownloadFile,
            errorGetDetail,
        } = this.props
        if (errorGetDetail !== prevProps.errorGetDetail) {
            if (!stringIsEmpty(errorGetDetail)) {
                // console.log('errorGetDetail: ', errorGetDetail)
                if (errorGetDetail === errorConnectServer.errorData) {
                    Alert.alert(
                        userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                        userProfile.LangID === 'VN' ? 'Đơn đã bị xóa !' : 'The application has been deleted !',
                        [{
                            text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => {
                                this.props.navigation.goBack()
                            }
                        }])
                }
            }
        }
        if (dataDownloadFile !== prevProps.dataDownloadFile) {
            if (!objectIsNull(dataDownloadFile)) {
                //aaaa
                let fileName = ''
                let fileBase64 = ''
                for (let item of this.state._leaveApplication) {
                    if (item.tag === 'AttachFile') {
                        // console.log('2222222222222: ', item)
                        fileName = item.value
                        item.fileBase64 = dataDownloadFile
                        break
                    }
                }
                if (!stringIsEmpty(fileName)) {
                    let split = fileName.split('.')
                    let type = split[split.length - 1]
                    if (
                        type.toLocaleUpperCase() === 'PNG'.toLocaleUpperCase() ||
                        type.toLocaleUpperCase() === 'JPG'.toLocaleUpperCase()
                    ) {
                        this.props.navigation.navigate('ImageView', { imageBase64: !stringIsEmpty(dataDownloadFile.fileContent) ? dataDownloadFile.fileContent : '' })
                    } else {
                        this.props.navigation.navigate('FileWebView', { imageBase64: !stringIsEmpty(dataDownloadFile.fileContent) ? dataDownloadFile.fileContent : '' })
                    }
                }


            }
        }
        if (errorDownloadFile !== prevProps.errorDownloadFile) {
            if (!stringIsEmpty(errorDownloadFile)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', this.props.errorDownloadFile, [{
                    text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => {
                        // this.props.navigation.goBack()
                    }
                }])
            }
        }


        if (dataUpdateLeaveApplication !== prevProps.dataUpdateLeaveApplication) {
            if (!stringIsEmpty(dataUpdateLeaveApplication)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', this.props.dataUpdateLeaveApplication, [{
                    text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => {
                        this.props.navigation.goBack()
                    }
                }])
            }
        }
        if (dataDeleteLeaveApplication !== prevProps.dataDeleteLeaveApplication) {
            if (!stringIsEmpty(dataDeleteLeaveApplication)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', this.props.dataDeleteLeaveApplication, [{
                    text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => {
                        this.props.navigation.goBack()
                    }
                }])
            }
        }

        if (dataGetDetail !== prevProps.dataGetDetail) {
            if (!objectIsNull(dataGetDetail)) {
                const { statusID } = dataGetDetail
                const typeApplication = this.props.navigation.getParam('typeApplication')
                let list = this.state._leaveApplication
                for (let item of list) {
                    if (item.tag === 'LeaveTypeID') {
                        item.value = {
                            id: dataGetDetail.leaveTypeID,
                            label: dataGetDetail.leaveName,
                            value: {
                                id: dataGetDetail.leaveTypeID,
                                name: dataGetDetail.leaveName,
                            },
                            isSelect: false,
                            type: ''
                        }
                        item.data = dataGetDetail.leaveTypeID
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                        item.selectedItem = {
                            id: dataGetDetail.leaveTypeID,
                            label: dataGetDetail.leaveName,
                            value: {
                                id: dataGetDetail.leaveTypeID,
                                name: dataGetDetail.leaveName,
                            },
                            isSelect: false,
                            type: ''
                        }
                    } else if (item.tag === 'TotalLeaveHours') {
                        item.value = dataGetDetail.hour
                        item.data = dataGetDetail.hour
                    } else if (item.tag === 'TotalLeaveDays') {
                        item.value = dataGetDetail.taken
                    } else if (item.tag === 'Approver') {
                        item.value = dataGetDetail.approverName
                        item.data = dataGetDetail.approver
                    } else if (item.tag === 'ReplacePerson') {
                        item.value = dataGetDetail.replacePerson
                        item.ids = dataGetDetail.replacePerson
                        item.data = dataGetDetail.replacePersonName
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'Reason') {
                        item.value = !stringIsEmpty(dataGetDetail.reason) ? dataGetDetail.reason : ''
                        item.editable = (statusID == '3' || statusID == '2' || typeApplication === 'approveApplication') ? false : true

                        item.onPressFocus = this._keyboardDidShow
                        item.onPressBlur = this._keyboardDidHide
                    } else if (item.tag === 'NotifyTo') {
                        item.value = dataGetDetail.notificationFor
                        item.ids = dataGetDetail.notificationFor
                        item.data = dataGetDetail.notificationNameFor
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'AttachFile') {
                        item.value = !stringIsEmpty(dataGetDetail.attachedFile) ? dataGetDetail.attachedFile : ''
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'detail') {

                    } else if (item.tag === 'StatusApplication') {
                        item.value = !stringIsEmpty(dataGetDetail.statusName) ? dataGetDetail.statusName : ''
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                        // item.visible = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? true : false
                        item.visible = true
                    } else if (item.control === 'twoDatePicker') {
                        item.value1 = dataGetDetail.fromDate
                        item.value2 = dataGetDetail.toDate
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                    } else if (item.control === 'twoTimePicker') {
                        item.value1 = dataGetDetail.fromTime
                        item.value2 = dataGetDetail.toTime
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                    } else if (item.control === 'twoCheckBox') {
                        // item.value1 = dataGetDetail.isFromTom
                        // item.value2 = dataGetDetail.isToTom
                        item.value1 = dataGetDetail.aP1
                        item.value2 = dataGetDetail.aP2
                        if (dataGetDetail.fromDate !== dataGetDetail.toDate) {
                            item.type = 'multi'
                        } else {
                            item.type = 'singleNoRequire'
                        }
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                    } else if (item.control === 'twoButtonForm') {
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                    } else if (item.control === 'buttonForm') {
                        if (dataGetDetail.fromDate !== dataGetDetail.toDate) {
                            item.visible = false
                        }
                    }
                }
                this.setState({
                    _leaveApplication: list,
                    oldLeaveApplication: dataGetDetail
                }, () => {
                    // console.log('thisStateLEaveeAplication: ', this.state._leaveApplication)
                })
            }
        }

        if (this.props.dataTypesLeave !== prevProps.dataTypesLeave) {
            if (this.props.dataTypesLeave !== undefined) {
                this.mapData(this.props.dataTypesLeave, 'LeaveTypeID')
            }
        }
        if (this.props.dataSubstitute !== prevProps.dataSubstitute) {
            if (this.props.dataSubstitute !== undefined) {
                this.mapData(this.props.dataSubstitute, 'ReplacePerson')
                this.mapData(this.props.dataSubstitute, 'NotifyTo')
            }
        }
        if (this.props.dataCalculate !== prevProps.dataCalculate) {
            if (this.props.dataCalculate !== undefined) {
                if (this.state.isClickShowInfoLeave) {
                    this.onChangeVisiblePopup(true)
                } else {
                    if (!arrayIsEmpty(this.props.dataCalculate)) {
                        let dataCal = this.props.dataCalculate[0]

                        let form = this.state._leaveApplication
                        for (let item of form) {
                            if (item.tag === 'TotalLeaveHours') {
                                if (!stringIsEmpty(dataCal.gioNghi)) {
                                    let time = dataCal.gioNghi.split(':')
                                    item.value = time[0] + (userProfile.LangID === 'VN' ? ' giờ ' : ' hour ') + time[time.length - 1] + (userProfile.LangID === 'VN' ? ' phút' : ' minute')
                                    item.data = dataCal.gioNghi
                                }
                            } else if (item.tag === 'TotalLeaveDays') {
                                item.value = dataCal.soNgayNghi
                            } else if (item.tag === 'Approver') {
                                item.value = dataCal.approverName
                                // item.value = dataCal.approverID
                            }
                        }
                        this.setState({
                            _leaveApplication: form
                        })
                    }

                }
            }
        }
        if (this.props.errorCalculate !== prevProps.errorCalculate) {
            if (this.props.errorCalculate !== undefined) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', this.props.errorCalculate, [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => { } }])
                this.setState({
                    isClickShowInfoLeave: false
                })
            }
        }
        if (this.props.dataGetTimes !== prevProps.dataGetTimes) {
            if (this.props.dataGetTimes !== undefined) {

                let form = this.state._leaveApplication
                for (let item of form) {
                    if (item.control === 'twoTimePicker') {
                        if (item.tag1 === 'FromTime') {
                            item.value1 = this.props.dataGetTimes.fromTime
                        }
                        if (item.tag2 === 'ToTime') {
                            item.value2 = this.props.dataGetTimes.toTime
                        }
                    } else if (item.control === 'twoCheckBox') {
                        if (item.tag1 === 'IsFromTom') {
                            item.value1 = this.props.dataGetTimes.isFromTom
                        }
                        if (item.tag2 === 'IsToTom') {
                            item.value2 = this.props.dataGetTimes.isToTom
                        }
                    }
                }
                this.setState({
                    _leaveApplication: form
                })
            }
        }
        if (this.props.dataCreate !== prevProps.dataCreate) {
            if (this.props.dataCreate !== undefined) {
                for (let item of this.state._leaveApplication) {
                    if (item.control === 'attachFile') {
                        if (!stringIsEmpty(item.value) && !stringIsEmpty(item.fileBase64)) {
                            let obj = {
                                FileName: item.value,
                                FileContent: item.fileBase64
                            }
                            this.props.attachFileApplicationAction([obj])
                        } else {
                            Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', this.props.dataCreate, [{
                                text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => {
                                    this.setState({
                                        _leaveApplication: leaveDaysApplication()
                                    }, () => {
                                        if (!objectIsNull(this.state.oldLeaveApplication)) {
                                            this.props.navigation.goBack()
                                        } else {
                                            this.mapData(this.props.dataTypesLeave, 'LeaveTypeID')
                                            this.setFunctionForm()
                                            this.props.getTimesLeaveApplicationAction({
                                                LeaveRecordID: '',
                                                LeaveTypeID: '',
                                                DateID: this.getNowDate()
                                            })
                                        }

                                    })
                                }
                            }])
                        }
                        break

                    }
                }
            }
        }
        if (this.props.errorCreate !== prevProps.errorCreate) {
            if (this.props.errorCreate !== undefined) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', this.props.errorCreate, [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => { } }])
            }
        }

        if (this.props.dataAttachFile !== prevProps.dataAttachFile) {
            if (this.props.dataAttachFile !== undefined) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', this.props.dataCreate, [{
                    text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => {
                        this.setState({
                            _leaveApplication: leaveDaysApplication()
                        }, () => {
                            if (!objectIsNull(this.state.oldLeaveApplication)) {
                                this.props.navigation.goBack()
                            } else {
                                this.mapData(this.props.dataTypesLeave, 'LeaveTypeID')
                                this.setFunctionForm()
                                this.props.getTimesLeaveApplicationAction({
                                    LeaveRecordID: '',
                                    LeaveTypeID: '',
                                    DateID: this.getNowDate()
                                })
                            }
                        })
                    }
                }])
            }
        }
        if (this.props.errorAttachFile !== prevProps.errorAttachFile) {
            if (this.props.errorAttachFile !== undefined) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', this.props.errorAttachFile, [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => { } }])
            }
        }

        if (this.props.dataSaveDays !== prevProps.dataSaveDays) {
            if (!objectIsNull(this.props.dataSaveDays)) {
                setTimeout(() => {
                    this.props.resetSaveDaysLeaveApplicationAction()
                    this.onChangeVisiblePopup(false)
                    this.onPressCalculateApplication()
                }, 1000)
            }
        }

        if (this.props.errorSaveDays !== prevProps.errorSaveDays) {
            if (!objectIsNull(this.props.errorSaveDays)) {
                this.setState({
                    isShowErrorSaveDays: true
                })
            }
        }
        // fetchingCreate: state.leaveApplicationReducers.fetchingCreate,
        // dataCreate: state.leaveApplicationReducers.dataCreate,
        // errorCreate: state.leaveApplicationReducers.errorCreate,

        // fetchingAttachFile: state.attachFileApplicationReducers.fetchingAttachFile,
        // dataAttachFile: state.attachFileApplicationReducers.dataAttachFile,
        // errorAttachFile: state.attachFileApplicationReducers.errorAttachFile,
    }
    getNowDate() {
        let d = new Date()
        return ('0' + d.getDate()).substr(-2) + '/' + ('0' + (d.getMonth() + 1)).substr(-2) + '/' + d.getFullYear()
    }
    onPressAutoCalculateApplication = () => {
        const form = this.state._leaveApplication
        let obj = {
            FromDate: '',
            FromTime: '',
            IsFromTom: '',
            IsToTom: '',
            LeaveRecordID: !objectIsNull(this.state.oldLeaveApplication) ? this.state.oldLeaveApplication.leaveRecordID : '',
            LeaveTypeID: '',
            ToDate: '',
            ToTime: '',
            AP1: '0',
            AP2: '0'
        }
        for (let item of form) {
            if (item.control === 'twoDatePicker') {
                if (item.tag1 === 'FromDate') {
                    obj.FromDate = item.value1
                }
                if (item.tag2 === 'ToDate') {
                    obj.ToDate = item.value2
                }
            }
            else if (item.control === 'twoTimePicker') {
                if (item.tag1 === 'FromTime') {
                    obj.FromTime = item.value1
                }

                if (item.tag2 === 'ToTime') {
                    obj.ToTime = item.value2
                }
            }
            else if (item.control === 'twoCheckBox') {
                if (item.tag1 === 'MorningLeave') {
                    // obj.IsFromTom = item.value1
                    obj.AP1 = item.value1
                }

                if (item.tag2 === 'AfternoonLeave') {
                    // obj.IsToTom = item.value2
                    obj.AP2 = item.value2
                }
            }
            else if (item.tag === 'LeaveTypeID') {
                // console.log('LeaveTypeID: ', item.data)
                if (!stringIsEmpty(item.data)) {
                    obj.LeaveTypeID = item.data
                } else {
                    // Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', userProfile.LangID === 'VN' ? 'Vui lòng chọn loại nghỉ phép !' : 'Choose type leave, please !', [{ text: 'Đóng', onPress: () => { } }])
                    return
                }
            }
        }
        // console.log('CalculateOBJ: ', obj)
        this.props.calculateApplicationAction(obj)
    }


    onPressCalculateApplication = () => {
        const form = this.state._leaveApplication
        let obj = {
            FromDate: '',
            FromTime: '',
            IsFromTom: '',
            IsToTom: '',
            LeaveRecordID: !objectIsNull(this.state.oldLeaveApplication) ? this.state.oldLeaveApplication.leaveRecordID : '',
            LeaveTypeID: '',
            ToDate: '',
            ToTime: '',
            AP1: '0',
            AP2: '0'
        }
        for (let item of form) {
            if (item.control === 'twoDatePicker') {
                if (item.tag1 === 'FromDate') {
                    obj.FromDate = item.value1
                }
                if (item.tag2 === 'ToDate') {
                    obj.ToDate = item.value2
                }
            }
            else if (item.control === 'twoTimePicker') {
                if (item.tag1 === 'FromTime') {
                    obj.FromTime = item.value1
                }

                if (item.tag2 === 'ToTime') {
                    obj.ToTime = item.value2
                }
            }
            else if (item.control === 'twoCheckBox') {
                if (item.tag1 === 'MorningLeave') {
                    // obj.IsFromTom = item.value1
                    obj.AP1 = item.value1
                }

                if (item.tag2 === 'AfternoonLeave') {
                    // obj.IsToTom = item.value2
                    obj.AP2 = item.value2
                }
            }
            else if (item.tag === 'LeaveTypeID') {
                // console.log('LeaveTypeID: ', item.data)
                if (!stringIsEmpty(item.data)) {
                    obj.LeaveTypeID = item.data
                } else {
                    Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', userProfile.LangID === 'VN' ? 'Vui lòng chọn loại nghỉ phép !' : 'Choose type leave, please !', [{ text: 'Đóng', onPress: () => { } }])
                    return
                }
            }
        }
        // console.log('CalculateOBJ: ', obj)
        this.props.calculateApplicationAction(obj)
    }
    onShowInfoLeave = () => {
        this.setState({
            isClickShowInfoLeave: true
        }, () => {
            const form = this.state._leaveApplication
            let obj = {
                FromDate: '',
                FromTime: '',
                IsFromTom: '',
                IsToTom: '',
                LeaveRecordID: '',
                LeaveTypeID: '',
                ToDate: '',
                ToTime: '',
            }
            for (let item of form) {
                if (item.control === 'twoDatePicker') {
                    if (item.tag1 === 'FromDate') {
                        obj.FromDate = item.value1
                    }
                    if (item.tag2 === 'ToDate') {
                        obj.ToDate = item.value2
                    }
                }
                else if (item.control === 'twoTimePicker') {
                    if (item.tag1 === 'FromTime') {
                        obj.FromTime = item.value1
                    }

                    if (item.tag2 === 'ToTime') {
                        obj.ToTime = item.value2
                    }
                }
                else if (item.control === 'twoCheckBox') {
                    if (item.tag1 === 'IsFromTom') {
                        obj.IsFromTom = item.value1
                    }

                    if (item.tag2 === 'IsToTom') {
                        obj.IsToTom = item.value2
                    }
                }
                else if (item.tag === 'LeaveTypeID') {
                    if (!stringIsEmpty(item.data)) {
                        obj.LeaveTypeID = item.data
                    } else {
                        Alert.alert(
                            userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                            userProfile.LangID === 'VN' ? 'Vui lòng chọn loại nghỉ phép !' : 'You have not selected a leave type !',
                            [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => { } }])
                        return
                    }
                }
            }
            this.props.calculateApplicationAction(obj)
        })
    }
    setInputDataApplication() {
        let isEmpty = false
        if (!objectIsNull(this.refs.form.checkEmpty)) {
            isEmpty = this.refs.form.checkEmpty()
        }
        if (!isEmpty) {
            let i = 1
            let obj = {
                LeaveRecordID: !objectIsNull(this.state.oldLeaveApplication) ? this.state.oldLeaveApplication.leaveRecordID : '',
                LeaveTypeID: '',
                FromDate: '',
                ToDate: '',
                FromTime: '',
                IsFromTom: '',
                ToTime: '',
                IsToTom: '',
                Taken: '',
                Hour: '',
                Approver: '',
                ReplacePerson: '',
                Reason: '',
                NotificationFor: '',
                Status: '1',
                AttachFile: '',
                AP1: '',
                AP2: ''
            }
            for (let item of this.state._leaveApplication) {
                if (item.tag === 'LeaveTypeID') {
                    obj.LeaveTypeID = item.data
                    // } else if (item.tag === 'totalLeaveHours') {

                    // } else if (item.tag === 'totalLeaveDays') {

                } else if (item.tag === 'Approver') {
                    obj.Approver = item.value
                } else if (item.tag === 'ReplacePerson') {
                    obj.ReplacePerson = item.ids
                } else if (item.tag === 'Reason') {
                    obj.Reason = item.value
                } else if (item.tag === 'NotifyTo') {
                    // if (!arrayIsEmpty(item.value)) {
                    //     let str = ''
                    //     for (let val of item.value) {
                    //         if (!stringIsEmpty(str)) {
                    //             str += `|${val.id}`
                    //         } else {
                    //             str += val.id
                    //         }
                    //     }                        
                    // }
                    obj.NotificationFor = item.ids
                } else if (item.tag === 'AttachFile') {
                    obj.AttachFile = item.value
                } else if (item.control === 'twoDatePicker') {
                    obj.FromDate = item.value1
                    obj.ToDate = item.value2
                } else if (item.control === 'twoTimePicker') {
                    obj.FromTime = item.value1
                    obj.ToTime = item.value2
                } else if (item.control === 'twoCheckBox') {
                    // obj.IsFromTom = item.value1
                    // obj.IsToTom = item.value2
                    obj.AP1 = item.value1
                    obj.AP2 = item.value2
                } else if (item.tag === 'TotalLeaveHours') {
                    obj.Hour = item.data
                } else if (item.tag === 'TotalLeaveDays') {
                    obj.Taken = item.value
                }
            }

            if (!stringIsEmpty(obj.Taken)) {
                // console.log('successssssssssss !!!', obj)
                this.props.createLeaveApplicationAction([obj])
            } else {
                Alert.alert(
                    userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                    userProfile.LangID === 'VN' ? 'Bạn chưa tính phép !' : 'You have not calculate leave',
                    [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => { } }])
            }

        } else {
            // console.log('faileddddddddddd !!!')
        }
    }
    onPressSubmit = () => {

        if (!objectIsNull(this.state.oldLeaveApplication)) {
            // console.log('onPressSubmit - 2: ')
            if (this.state.oldLeaveApplication.statusID === 2) {
                let inputRollback = {
                    LeaveRecordID: this.state.oldLeaveApplication.leaveRecordID,
                    Status: '3',
                    Reason: '',
                }
                let form = this.state._leaveApplication
                for (let item of form) {
                    if (item.tag === 'Reason') {
                        inputRollback.Reason = item.value
                    }
                    break
                }
                this.props.updateLeaveApplicationAction([inputRollback])
                // let isEmpty = false
                // if (!objectIsNull(this.refs.form.checkEmpty)) {
                //     isEmpty = this.refs.form.checkEmpty()
                // }
                // if (!isEmpty) {
                //     let inputRollback = {
                //         LeaveRecordID: this.state.oldLeaveApplication.leaveRecordID,
                //         Status: '3',
                //         Reason: '',
                //     }
                //     let form = this.state._leaveApplication
                //     for (let item of form) {
                //         if (item.tag === 'Reason') {
                //             inputRollback.Reason = item.value
                //         }
                //         break
                //     }
                //     this.props.updateLeaveApplicationAction([inputRollback])
                // }
            } else if (this.state.oldLeaveApplication.statusID === 4 || this.state.oldLeaveApplication.statusID === 1) {
                this.setInputDataApplication()
            }
        } else {
            this.setInputDataApplication()
        }
    }
    onPressDelete = () => {
        if (!objectIsNull(this.state.oldLeaveApplication)) {
            this.props.deleteLeaveApplicationAction([{ ID: this.state.oldLeaveApplication.leaveRecordID }])
        }
    }
    onChangeVisiblePopup(visible) {
        this.setState({
            isShowModal: visible
        })
    }
    showView() {
        const typeApplication = this.props.navigation.getParam('typeApplication')
        const { isShowKeyboard } = this.state
        return (
            <View style={{ flex: 1, paddingHorizontal: Sizes.s20 }}>
                <FormDetail ref='form' form={this.state._leaveApplication} navigation={this.props.navigation} />
                {/* <Form
                    ref={'form'}
                    form={this.state._leaveApplication}
                    onPressButton={this.onPressSubmit}
                    {...this.props}
                /> */}

                {(typeApplication === 'approveApplication' || isShowKeyboard) ?
                    (
                        null
                    )
                    :
                    (
                        !objectIsNull(this.state.oldLeaveApplication) ?
                            (
                                (this.state.oldLeaveApplication.statusID === 2) ?
                                    <CustomButton onPress={this.onPressSubmit} type='rollBack' title={userProfile.LangID === 'VN' ? appStrS.vn.button.withDraw : appStrS.en.button.withDraw} />
                                    : this.state.oldLeaveApplication.statusID === 4 ?
                                        (
                                            <View style={{ width: '100%', flexDirection: 'row', }}>
                                                <View style={{ flex: 1, paddingRight: Sizes.h20 }}>
                                                    <CustomButton onPress={this.onPressSubmit} type='send' title={userProfile.LangID === 'VN' ? appStrS.vn.button.submit : appStrS.en.button.submit} />
                                                </View>
                                                <View style={{ flex: 1, paddingLeft: Sizes.h20 }}>
                                                    <CustomButton onPress={this.onPressDelete} type='close' title={userProfile.LangID === 'VN' ? appStrS.vn.button.delete : appStrS.en.button.delete} />
                                                </View>
                                            </View>
                                            // <CustomButton onPress={this.onPressSubmit} type='send' title="Gửi" />
                                            // <CustomButton onPress={this.onPressDelete} type='close' title='Xóa' />
                                        )
                                        : this.state.oldLeaveApplication.statusID === 1 ?
                                            (
                                                <View style={{ width: '100%', flexDirection: 'row', }}>
                                                    <View style={{ flex: 1, paddingRight: Sizes.h20 }}>
                                                        <CustomButton onPress={this.onPressSubmit} type='send' title={userProfile.LangID === 'VN' ? appStrS.vn.button.submit : appStrS.en.button.submit} />
                                                    </View>
                                                    <View style={{ flex: 1, paddingLeft: Sizes.h20 }}>
                                                        <CustomButton onPress={this.onPressDelete} type='close' title={userProfile.LangID === 'VN' ? appStrS.vn.button.delete : appStrS.en.button.delete} />
                                                    </View>
                                                </View>
                                            )
                                            :
                                            null
                            )
                            :
                            (
                                <CustomButton onPress={this.onPressSubmit} type='send' title={userProfile.LangID === 'VN' ? appStrS.vn.button.send : appStrS.en.button.send} />
                            )
                    )

                }
                {/* {!objectIsNull(this.state.oldLeaveApplication) ?
                    (
                        (this.state.oldLeaveApplication.statusID === 2) ?
                            <CustomButton onPress={this.onPressSubmit} type='rollBack' title="Lấy lại" />
                            : this.state.oldLeaveApplication.statusID === 4 ?
                                // <CustomButton onPress={this.onPressSubmit} type='send' title="Gửi" />
                                <CustomButton onPress={this.onPressDelete} type='close' title='Xóa' />
                                : this.state.oldLeaveApplication.statusID === 1 ?
                                    (
                                        <View style={{ width: '100%', flexDirection: 'row', paddingHorizontal: Sizes.s10 }}>
                                            <View style={{ flex: 1, }}>
                                                <CustomButton onPress={this.onPressSubmit} type='send' title='Chuyển đơn' />
                                            </View>
                                            <View style={{ flex: 1, }}>
                                                <CustomButton onPress={this.onPressDelete} type='close' title='Xóa' />
                                            </View>
                                        </View>
                                    )
                                    :
                                    null
                    )
                    :
                    (
                        <CustomButton onPress={this.onPressSubmit} type='send' title="Gửi" />
                    )
                } */}

            </View>
        )
    }
    showError() {
        const {
            errorTypesLeave,
            errorGetDetail
        } = this.props
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={getImage('img_empty_data')} style={{ width: Sizes.s340, height: Sizes.s340 }} />
                <Text style={{ marginVertical: Sizes.s20, fontSize: Sizes.s30, color: '#0984e3', textAlign: 'center' }}>
                    {!stringIsEmpty(errorTypesLeave)
                        ? errorTypesLeave
                        : (!stringIsEmpty(errorGetDetail) && errorGetDetail !== errorConnectServer.errorData) ? errorGetDetail :
                            (userProfile.LangID === 'VN' ? 'Không có dữ liệu để hiển thị. Vui lòng thử lại.' : 'No data found. Please reload !')
                    }
                </Text>
                <CustomButton onPress={() => {
                    if (!stringIsEmpty(errorTypesLeave)) {
                        this.props.getTypesLeaveApplication()
                    }
                    if (!stringIsEmpty(errorGetDetail)) {
                        let param = this.props.navigation.getParam('itemLeaveApplication')
                        if (!objectIsNull(param)) {
                            this.props.getDetailLeaveApplicationAction([{ ID: param.leaveRecordID }])
                        }
                    }

                }} title={userProfile.LangID === 'VN' ? 'Thử lại' : 'Reload'} type='reload' />
            </View>
        )
    }
    showLoading() {

    }
    render() {
        // const {typesLeave} = this.state
        // if(typesLeave.length > 0){
        //     let arr = this.state._leaveApplication
        // }

        const { isShowModal, isShowDetailLeave, isClickShowInfoLeave, isShowErrorSaveDays } = this.state
        const {
            fetchingTypesLeave,
            fetchingSubstitute,
            fetchingCalculate,
            fetchingDownloadFile,
            dataGetDetail,
            dataCalculate,
            dataTypesLeave,
            errorTypesLeave,
            fetchingGetDays,
            errorGetDays,
            dataGetDays,
            saveDaysLeaveApplicationAction,

            fetchingSaveDays,
            dataSaveDays,
            errorSaveDays,

            errorGetDetail,

            fetchingCreate,
            fetchingAttachFile,
            fetchingGetTimes,
            fetchingUpdateLeaveApplication,
            fetchingGetDetail,
        } = this.props
        let dataCal = !arrayIsEmpty(dataCalculate) ? dataCalculate[0] : undefined
        // console.log('dataGetDaysssss: ', dataGetDays)
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS === 'android' ? null : 'padding'}>
                    {(
                        fetchingTypesLeave ||
                        fetchingSubstitute ||
                        fetchingCalculate ||
                        fetchingCreate ||
                        fetchingAttachFile ||
                        fetchingGetTimes ||
                        fetchingDownloadFile ||
                        fetchingUpdateLeaveApplication ||
                        fetchingGetDetail
                    ) && <Loading />}
                    <View style={{ flex: 1, backgroundColor: 'white', }}>
                        <CustomHeader
                            typeIconLeft={'back'}
                            title={userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.title : appStrS.en.leaveApplication.title}
                            onPressLeft={() => { this.props.navigation.goBack() }}
                            typeIconRight={!objectIsNull(this.state.oldLeaveApplication) ? 'branch' : null}
                            onPressRight={() => {
                                if (!objectIsNull(this.state.oldLeaveApplication)) {
                                    this.props.navigation.navigate('ApplicationHistoryContainer', {
                                        idApplication: this.state.oldLeaveApplication.leaveRecordID,
                                        typeApplication: 1
                                    })
                                }
                            }}
                        />
                        {(!arrayIsEmpty(dataTypesLeave) || (!objectIsNull(this.state.oldLeaveApplication))) && this.showView()}
                        {(!objectIsNull(errorTypesLeave) || !stringIsEmpty(errorGetDetail) || (dataTypesLeave !== undefined && arrayIsEmpty(dataTypesLeave))) && this.showError()}

                    </View>
                </KeyboardAvoidingView>
                <Modal
                    transparent={true}
                    onRequestClose={() => {
                        this.setState({
                            isClickShowInfoLeave: false
                        }, () => {
                            this.onChangeVisiblePopup(false)
                        })

                    }}
                    hardwareAccelerated={true}
                    visible={isShowModal}
                    animationType='fade'>
                    {isClickShowInfoLeave ?
                        (
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        isClickShowInfoLeave: false,
                                        isShowDetailLeave: false
                                    }, () => {
                                        this.onChangeVisiblePopup(false)
                                    })
                                }}
                                style={[styles.bodyModal, {
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }]}>
                                <TouchableWithoutFeedback>
                                    <View style={styles.contentModal}>
                                        <Text style={styles.titleModal}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.leaveInfomationByHours : appStrS.en.leaveApplication.leaveInfomationByHours}</Text>
                                        <View style={styles.infoLeaveModal}>
                                            <Text style={styles.titleInfo}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.leaveEntitlement : appStrS.en.leaveApplication.leaveEntitlement} </Text>
                                            <Text style={styles.textInfo}>{dataCal !== undefined ? dataCal.tongPhepNam : 0}</Text>
                                        </View>
                                        <View style={styles.infoLeaveModal}>
                                            <Text style={styles.titleInfo}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.leaveCarriedForward : appStrS.en.leaveApplication.leaveCarriedForward}</Text>
                                            <Text style={styles.textInfo}>{dataCal !== undefined ? dataCal.phepDaNghi : 0}</Text>
                                        </View>
                                        <View style={styles.infoLeaveModal}>
                                            <Text style={styles.titleInfo}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.totalLeavesTaken : appStrS.en.leaveApplication.totalLeavesTaken} </Text>
                                            <Text style={styles.textInfo}>{dataCal !== undefined ? dataCal.phepCu : 0}</Text>
                                        </View>
                                        <View style={styles.infoLeaveModal}>
                                            <Text style={styles.titleInfo}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.leavesTakenFromCarriedForwardLeaves : appStrS.en.leaveApplication.leavesTakenFromCarriedForwardLeaves}</Text>
                                            <Text style={styles.textInfo}>{dataCal !== undefined ? dataCal.phepCuDaNghi : 0}</Text>
                                        </View>
                                        <View style={styles.infoLeaveModal}>
                                            <Text style={styles.titleInfo}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.remaining : appStrS.en.leaveApplication.remaining} </Text>
                                            <Text style={styles.textInfo}>{dataCal !== undefined ? dataCal.phepConLai : 0}</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                isClickShowInfoLeave: false,
                                            }, () => {
                                                this.onChangeVisiblePopup(false)
                                            })

                                        }} style={styles.touchModal}>
                                            <Text style={styles.textTouchModal}>{userProfile.LangID === 'VN' ? appStrS.vn.button.close : appStrS.en.button.close}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>

                            </TouchableOpacity>

                        )
                        :
                        (
                            <View style={[styles.bodyModal, {
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                            }]}>
                                <View style={styles.contentDetailLeave}>
                                    <View style={{ paddingHorizontal: Sizes.s40, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({
                                                    isShowDetailLeave: false
                                                }, () => {
                                                    this.onChangeVisiblePopup(false)
                                                })
                                            }}
                                            style={{ paddingVertical: Sizes.s10, paddingHorizontal: Sizes.s20 }}>
                                            <Icon name={'times'} size={Sizes.h36} color={'#2F2E37'} />
                                        </TouchableOpacity>
                                        <Text style={styles.titleDetailLeave}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.titleLeaveDetails : appStrS.en.leaveApplication.titleLeaveDetails}</Text>

                                        {(!fetchingGetDays &&
                                            errorGetDays === undefined &&
                                            dataSaveDays === undefined &&
                                            !fetchingSaveDays) ?
                                            (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({ isShowErrorSaveDays: false })
                                                        let data = dataGetDays.map((value) => {
                                                            return {
                                                                Date: value.dateID,
                                                                FromTime: value.fromTime,
                                                                IsFromTom: value.isFromTom,
                                                                ToTime: value.toTime,
                                                                IsToTom: value.isToTom
                                                            }
                                                        })
                                                        let DataHeader = [{
                                                            LeaveRecordID: '',
                                                            LeaveTypeID: '',
                                                            FromDate: '',
                                                            ToDate: ''
                                                        }]
                                                        for (let item of this.state._leaveApplication) {
                                                            if (item.control === 'twoDatePicker') {
                                                                DataHeader[0].FromDate = item.value1
                                                                DataHeader[0].ToDate = item.value2
                                                            } else if (item.tag === 'LeaveTypeID') {
                                                                DataHeader[0].LeaveTypeID = item.data
                                                            }
                                                        }
                                                        // console.log('inputSaveDays: ', {
                                                        //     DataHeader: DataHeader,
                                                        //     DataItem: data
                                                        // })
                                                        saveDaysLeaveApplicationAction({
                                                            DataHeader: DataHeader,
                                                            DataItem: data
                                                        })
                                                    }}
                                                    style={{ paddingVertical: Sizes.s10, paddingHorizontal: Sizes.s20, }}>
                                                    <Text style={{ fontSize: Sizes.h30, color: '#2F6BFE', fontWeight: '700' }}>{userProfile.LangID === 'VN' ? appStrS.vn.button.save : appStrS.en.button.save}</Text>
                                                </TouchableOpacity>
                                            )
                                            : fetchingSaveDays ?
                                                (
                                                    <ActivityIndicator size='large' color={colorForm.indicator} style={{ alignSelf: 'center', textAlign: 'center' }} />
                                                )
                                                : dataSaveDays !== undefined ?
                                                    (
                                                        <Image source={getImage('ic_check_success')} style={styles.imageSuccessSaveDays} />
                                                    )
                                                    :
                                                    (
                                                        <View></View>
                                                    )
                                        }

                                    </View>
                                    <View style={{ height: 1, width: '100%', backgroundColor: '#EBEDF0' }}></View>
                                    {errorSaveDays !== undefined && isShowErrorSaveDays && <Text style={styles.textErrorSaveDays}>{errorSaveDays}</Text>}
                                    {/* <Text style={styles.textErrorSaveDays}>{errorSaveDays} SSSSSSS</Text> */}
                                    {fetchingGetDays ?
                                        (
                                            <View style={styles.fetchDetailLeave}>
                                                <ActivityIndicator size='large' color={colorForm.indicator} />
                                            </View>
                                        )
                                        : errorGetDays !== undefined ?
                                            (
                                                <View style={styles.errorDetailLeave}>
                                                    <Image source={getImage('img_empty_data')} style={styles.imageErrorDetailLeave} />
                                                    <Text style={styles.textErrorDetailLeave}>{errorGetDays}</Text>
                                                    <CustomButton title={userProfile.LangID === 'VN' ? appStrS.vn.button.reload : appStrS.en.button.reload} type={'reload'} onPress={() => {
                                                        this.showDetailLeave()
                                                    }} />
                                                </View>
                                            )
                                            :
                                            (
                                                <FlatList
                                                    showsVerticalScrollIndicator={false}
                                                    style={{ flex: 1, flexGrow: 1 }}
                                                    data={dataGetDays}

                                                    renderItem={({ item, index }) => {
                                                        let statusID = undefined
                                                        if (!objectIsNull(dataGetDetail)) {
                                                            statusID = dataGetDetail.statusID
                                                        }
                                                        return (
                                                            <ItemDetailLeave item={Object.assign(item, {
                                                                caption1: 'Hôm sau',
                                                                caption2: 'Hôm sau',
                                                                editable: (statusID === 2 || statusID === 3) ? false : true
                                                            })} resetErrorSaveDays={() => { this.setState({ isShowErrorSaveDays: false }) }} />
                                                        )
                                                    }}
                                                />
                                            )
                                    }
                                </View>
                            </View>

                        )
                    }
                    {/* 
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({
                                isClickShowInfoLeave: false,
                                isShowDetailLeave: false
                            }, () => {
                                this.onChangeVisiblePopup(false)
                            })
                        }}
                        style={styles.bodyModal}>
                        <TouchableWithoutFeedback>
                            {isClickShowInfoLeave ?
                                (
                                    <View style={styles.contentModal}>
                                        <Text style={styles.titleModal}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.leaveInfomationByHours : appStrS.en.leaveApplication.leaveInfomationByHours}</Text>
                                        <View style={styles.infoLeaveModal}>
                                            <Text style={styles.titleInfo}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.leaveEntitlement : appStrS.en.leaveApplication.leaveEntitlement} </Text>
                                            <Text style={styles.textInfo}>{dataCal !== undefined ? dataCal.tongSoGioPhepNam : 0}</Text>
                                        </View>
                                        <View style={styles.infoLeaveModal}>
                                            <Text style={styles.titleInfo}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.leaveCarriedForward : appStrS.en.leaveApplication.leaveCarriedForward}</Text>
                                            <Text style={styles.textInfo}>{dataCal !== undefined ? dataCal.tongSoGioPhepDaNghi : 0}</Text>
                                        </View>
                                        <View style={styles.infoLeaveModal}>
                                            <Text style={styles.titleInfo}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.totalLeavesTaken : appStrS.en.leaveApplication.totalLeavesTaken} </Text>
                                            <Text style={styles.textInfo}>{dataCal !== undefined ? dataCal.tongSoGioPhepCu : 0}</Text>
                                        </View>
                                        <View style={styles.infoLeaveModal}>
                                            <Text style={styles.titleInfo}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.leavesTakenFromCarriedForwardLeaves : appStrS.en.leaveApplication.leavesTakenFromCarriedForwardLeaves}</Text>
                                            <Text style={styles.textInfo}>{dataCal !== undefined ? dataCal.tongSoGioPhepCuDaNghi : 0}</Text>
                                        </View>
                                        <View style={styles.infoLeaveModal}>
                                            <Text style={styles.titleInfo}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.remaining : appStrS.en.leaveApplication.remaining} </Text>
                                            <Text style={styles.textInfo}>{dataCal !== undefined ? dataCal.tongSoGioPhepConLai : 0}</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => {
                                            this.setState({
                                                isClickShowInfoLeave: false,
                                            }, () => {
                                                this.onChangeVisiblePopup(false)
                                            })

                                        }} style={styles.touchModal}>
                                            <Text style={styles.textTouchModal}>{userProfile.LangID === 'VN' ? appStrS.vn.button.close : appStrS.en.button.close}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                                : isShowDetailLeave ?
                                    (
                                        <View style={styles.contentDetailLeave}>
                                            <View style={{ paddingHorizontal: Sizes.s40, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({
                                                            isShowDetailLeave: false
                                                        }, () => {
                                                            this.onChangeVisiblePopup(false)
                                                        })
                                                    }}
                                                    style={{ paddingVertical: Sizes.s10, paddingHorizontal: Sizes.s20 }}>
                                                    <Icon name={'times'} size={Sizes.h36} color={'#2F2E37'} />
                                                </TouchableOpacity>
                                                <Text style={styles.titleDetailLeave}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.titleLeaveDetails : appStrS.en.leaveApplication.titleLeaveDetails}</Text>

                                                {(!fetchingGetDays &&
                                                    errorGetDays === undefined &&
                                                    dataSaveDays === undefined &&
                                                    !fetchingSaveDays) ?
                                                    (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                this.setState({ isShowErrorSaveDays: false })
                                                                let data = dataGetDays.map((value) => {
                                                                    return {
                                                                        Date: value.dateID,
                                                                        FromTime: value.fromTime,
                                                                        IsFromTom: value.isFromTom,
                                                                        ToTime: value.toTime,
                                                                        IsToTom: value.isToTom
                                                                    }
                                                                })
                                                                let DataHeader = [{
                                                                    LeaveRecordID: '',
                                                                    LeaveTypeID: '',
                                                                    FromDate: '',
                                                                    ToDate: ''
                                                                }]
                                                                for (let item of this.state._leaveApplication) {
                                                                    if (item.control === 'twoDatePicker') {
                                                                        DataHeader[0].FromDate = item.value1
                                                                        DataHeader[0].ToDate = item.value2
                                                                    } else if (item.tag === 'LeaveTypeID') {
                                                                        DataHeader[0].LeaveTypeID = item.data
                                                                    }
                                                                }
                                                                //console.log('inputSaveDays: ', {
                                                                    DataHeader: DataHeader,
                                                                    DataItem: data
                                                                })
                                                                saveDaysLeaveApplicationAction({
                                                                    DataHeader: DataHeader,
                                                                    DataItem: data
                                                                })
                                                            }}
                                                            style={{ paddingVertical: Sizes.s10, paddingHorizontal: Sizes.s20, }}>
                                                            <Text style={{ fontSize: Sizes.h30, color: '#2F6BFE', fontWeight: '700' }}>{userProfile.LangID === 'VN' ? appStrS.vn.button.save : appStrS.en.button.save}</Text>
                                                        </TouchableOpacity>
                                                    )
                                                    : fetchingSaveDays ?
                                                        (
                                                            <ActivityIndicator size='large' color={colorForm.indicator} style={{ alignSelf: 'center', textAlign: 'center' }} />
                                                        )
                                                        : dataSaveDays !== undefined ?
                                                            (
                                                                <Image source={getImage('ic_check_success')} style={styles.imageSuccessSaveDays} />
                                                            )
                                                            :
                                                            (
                                                                <View></View>
                                                            )
                                                }

                                            </View>
                                            <View style={{ height: 1, width: '100%', backgroundColor: '#EBEDF0' }}></View>
                                            {errorSaveDays !== undefined && isShowErrorSaveDays && <Text style={styles.textErrorSaveDays}>{errorSaveDays}</Text>}
                                            
                                            {fetchingGetDays ?
                                                (
                                                    <View style={styles.fetchDetailLeave}>
                                                        <ActivityIndicator size='large' color={colorForm.indicator} />
                                                    </View>
                                                )
                                                : errorGetDays !== undefined ?
                                                    (
                                                        <View style={styles.errorDetailLeave}>
                                                            <Image source={getImage('img_empty_data')} style={styles.imageErrorDetailLeave} />
                                                            <Text style={styles.textErrorDetailLeave}>{errorGetDays}</Text>
                                                            <CustomButton title={userProfile.LangID === 'VN' ? appStrS.vn.button.reload : appStrS.en.button.reload} type={'reload'} onPress={() => {
                                                                this.showDetailLeave()
                                                            }} />
                                                        </View>
                                                    )
                                                    :
                                                    (
                                                        <FlatList
                                                            showsVerticalScrollIndicator={false}
                                                            style={{ flex: 1, flexGrow: 1 }}
                                                            data={dataGetDays}

                                                            renderItem={({ item, index }) => {
                                                                let statusID = undefined
                                                                if (!objectIsNull(dataGetDetail)) {
                                                                    statusID = dataGetDetail.statusID
                                                                }
                                                                return (
                                                                    <ItemDetailLeave item={Object.assign(item, {
                                                                        caption1: 'Hôm sau',
                                                                        caption2: 'Hôm sau',
                                                                        editable: (statusID === 2 || statusID === 3) ? false : true
                                                                    })} resetErrorSaveDays={() => { this.setState({ isShowErrorSaveDays: false }) }} />
                                                                )
                                                            }}
                                                        />
                                                    )
                                            }
                                        </View>
                                    )
                                    :
                                    (
                                        <View></View>
                                    )
                            }
                        </TouchableWithoutFeedback>

                    </TouchableOpacity> */}

                </Modal>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    bodyModal: {
        flex: 1,
        backgroundColor: '#00000066',
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        // paddingHorizontal: Sizes.s10,
        // paddingVertical: Sizes.h65
    },
    contentModal: {
        width: '90%',
        borderRadius: Sizes.s10,
        // alignSelf: 'stretch',
        // display: "none",
        // position: 'relative',
        // borderWidth: 1,
        backgroundColor: 'white',
    },
    titleModal: {
        backgroundColor: '#0984e3',
        textAlign: 'center',
        fontSize: Sizes.h40,
        color: 'white',
        paddingVertical: Sizes.s20,
        borderTopRightRadius: Sizes.s10,
        borderTopLeftRadius: Sizes.s10
    },
    infoLeaveModal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: Sizes.s20,
        paddingHorizontal: Sizes.s20
        // flex: 1,
    },
    titleInfo: {
        fontSize: Sizes.h28,
        color: 'grey',
        flex: 1,

    },
    textInfo: {
        fontSize: Sizes.h30,
        color: 'black',
        textAlign: 'center',
        flex: 1,
    },
    touchModal: {
        backgroundColor: '#0984e3',
        paddingVertical: Sizes.s15,
        paddingHorizontal: Sizes.s40,
        borderRadius: Sizes.s30,
        alignSelf: "flex-end",
        margin: Sizes.h20
    },
    textTouchModal: {
        fontSize: Sizes.s30,
        color: 'white',

    },
    contentDetailLeave: {
        width: '100%',
        // alignSelf: 'center',
        height: Dimensions.get('window').height / 4 * 3,
        marginHorizontal: Sizes.s10,
        borderRadius: Sizes.s20,
        backgroundColor: 'white',
        paddingBottom: Sizes.s45
    },
    titleDetailLeave: {
        textAlign: 'center',
        width: '100%',
        marginVertical: Sizes.s20,
        fontSize: Sizes.h36,
        color: '#2F2E37',
        fontWeight: 'bold'
    },
    errorDetailLeave: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageErrorDetailLeave: {
        width: Sizes.s340,
        height: Sizes.s340
    },
    textErrorDetailLeave: {
        fontSize: Sizes.h30,
        marginVertical: Sizes.s10
    },
    fetchDetailLeave: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textErrorSaveDays: {
        width: '100%',
        fontSize: Sizes.h24,
        color: 'red',
        alignSelf: 'center',
        textAlign: 'center'
    },
    imageSuccessSaveDays: {
        width: Sizes.h65,
        height: Sizes.h65
    },
})
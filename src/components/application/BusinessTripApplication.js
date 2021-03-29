


import React from 'react';
import { Button, Image, View, Text, Alert, Modal, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import {
    businessTripApplication,
} from '../custom/form/FormTypeDetail'
import CustomHeader from '../custom/CustomHeader'
import { CustomButton } from '../custom/CustomButton'
import FormDetail from '../custom/form/FormDetail'
import getImage from '../../res/values/strings/iconStrS'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { Sizes } from '@dungdang/react-native-basic'
import Loading from '../custom/Loading'
import ComboboxForm from '../custom/functionForm/ComboboxForm'
import { userProfile, errorConnectServer } from '../../config/settings'
import { appStrS } from '../../res/values/strings/appStrS'
export default class BusinessTripApplication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _businessTripApplication: businessTripApplication(),
            visibleCurrency: false,
            selectedCurrency: undefined,
            dataCurrency: [],
            oldBusinessTripApplication: undefined,
            isShowKeyboard: false,
        }
    }
    onShowCurrency = () => {
        this.props.getListCurrencyBusinessTripApplicationAction()
        if (!objectIsNull(this.refs['currencyCombobox'])) {
            this.refs['currencyCombobox'].onChangeVisiblePopup(true)
        }
    }
    onViewFile = () => {
        const { } = this.props
        let fileName = ''
        let fileBase64 = ''
        for (let item of this.state._businessTripApplication) {
            if (item.tag === 'AttachFile') {
                fileName = item.value
                fileBase64 = item.fileBase64
                break
            }
        }
        if (!stringIsEmpty(fileBase64)) {
            this.props.navigation.navigate('ImageView', { imageBase64: fileBase64 })
        } else if (!stringIsEmpty(fileName)) {
            this.props.workflowDownloadFileAction([{ FileName: fileName }])
        }

    }

    setFunctionForm() {
        let form = this.state._businessTripApplication
        for (let item of form) {
            if (item.tag === 'TypeBusinessTrip') {
                item.onPressSelectedItem = this.onCalculateApp
            } else if (item.control === 'textedit') {
                item.onPressFocus = this._keyboardDidShow
                item.onPressBlur = this._keyboardDidHide
            } else if (item.control === 'twoDatePicker') {
                item.onPress1 = this.onCalculateApp
                item.onPress2 = this.onCalculateApp
            } else if (item.control === 'twoTimePicker') {
                item.onPress1 = this.onCalculateApp
                item.onPress2 = this.onCalculateApp
            } else if (item.tag === 'CashAdvance') {
                item.onPress = this.onShowCurrency
            } else if (item.tag === 'AttachFile') {
                item.onPressViewFile = this.onViewFile
            }
        }
        this.setState({
            _businessTripApplication: form
        })
    }
    componentDidMount() {
        const { dataTypeBusinessTrip } = this.props
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


    componentDidUpdate(prevProps, prevState) {
        const {
            dataGetDetailBusinessTrip,
            dataWithDrawBusinessTrip,
            dataDeleteBusinessTrip,
            dataDownloadFile,

            errorWithDrawBusinessTrip,
            errorDeleteBusinessTrip,
            errorDownloadFile,

            errorGetDetailBusinessTrip,
        } = this.props
        if (errorGetDetailBusinessTrip !== prevProps.errorGetDetailBusinessTrip) {
            if (!stringIsEmpty(errorGetDetailBusinessTrip)) {
                // console.log('errorGetDetailBusinessTrip: ', errorGetDetailBusinessTrip)
                if (errorGetDetailBusinessTrip === errorConnectServer.errorData) {
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
                this.props.navigation.navigate('ImageView', { imageBase64: !stringIsEmpty(dataDownloadFile.fileContent) ? dataDownloadFile.fileContent : '' })
            }
        }
        if (errorDownloadFile !== prevProps.errorDownloadFile) {
            if (!stringIsEmpty(errorDownloadFile)) {
                Alert.alert('Thông báo', this.props.errorDownloadFile, [{
                    text: 'Đóng', onPress: () => {
                        // this.props.navigation.goBack()
                    }
                }])
            }
        }

        if (dataWithDrawBusinessTrip !== prevProps.dataWithDrawBusinessTrip) {
            if (!stringIsEmpty(dataWithDrawBusinessTrip)) {
                Alert.alert('Thông báo', dataWithDrawBusinessTrip, [
                    {
                        text: 'Xác nhận',
                        onPress: () => {
                            this.props.navigation.goBack()
                        }
                    }
                ])
            }
        }
        if (dataDeleteBusinessTrip !== prevProps.dataDeleteBusinessTrip) {
            if (!stringIsEmpty(dataDeleteBusinessTrip)) {
                Alert.alert('Thông báo', dataDeleteBusinessTrip, [
                    {
                        text: 'Xác nhận',
                        onPress: () => {
                            this.props.navigation.goBack()
                        }
                    }
                ])
            }
        }
        if (errorWithDrawBusinessTrip !== prevProps.errorWithDrawBusinessTrip) {
            if (!stringIsEmpty(errorWithDrawBusinessTrip)) {
                Alert.alert('Thông báo', errorWithDrawBusinessTrip, [
                    {
                        text: 'Xác nhận',
                        onPress: () => { }
                    }
                ])
            }
        }
        if (errorDeleteBusinessTrip !== prevProps.errorDeleteBusinessTrip) {
            if (!stringIsEmpty(errorDeleteBusinessTrip)) {
                Alert.alert('Thông báo', errorDeleteBusinessTrip, [
                    {
                        text: 'Xác nhận',
                        onPress: () => { }
                    }
                ])
            }
        }

        if (this.props.dataTypeBusinessTrip !== prevProps.dataTypeBusinessTrip) {
            if (this.props.dataTypeBusinessTrip !== undefined) {
                this.mapData(this.props.dataTypeBusinessTrip, 'TypeBusinessTrip')
            }
        }

        if (this.props.dataCurrencyBusinessTrip !== prevProps.dataCurrencyBusinessTrip) {
            if (this.props.dataCurrencyBusinessTrip !== undefined) {
                if (!arrayIsEmpty(this.props.dataCurrencyBusinessTrip)) {
                    let data = this.props.dataCurrencyBusinessTrip.map((value) => {
                        return {
                            id: value.id,
                            label: value.name,
                            value: value,
                            isSelect: false,
                            type: 'select'
                        }
                    })
                    this.setState({
                        dataCurrency: data
                    })
                }
            }
        }

        if (!objectIsNull(this.state.selectedCurrency) && !objectIsNull(prevState.selectedCurrency)) {
            if (this.state.selectedCurrency.id !== prevState.selectedCurrency.id) {
                let form = this.state._businessTripApplication
                for (let item of form) {
                    if (item.tag === 'CashAdvance') {
                        item.icon = this.state.selectedCurrency.id !== 6 ? 'ic_cur_usd' : 'ic_cur_vnd'
                        break
                    }
                }
                this.setState({
                    _businessTripApplication: form
                })
            }
        } else if (!objectIsNull(this.state.selectedCurrency)) {
            let form = this.state._businessTripApplication
            for (let item of form) {
                if (item.tag === 'CashAdvance') {
                    item.icon = this.state.selectedCurrency.id !== 6 ? 'ic_cur_usd' : 'ic_cur_vnd'
                    break
                }
            }
            this.setState({
                _businessTripApplication: form
            })
        }

        if (this.props.dataCalculateBusinessTrip !== prevProps.dataCalculateBusinessTrip) {
            if (!objectIsNull(this.props.dataCalculateBusinessTrip)) {
                let form = this.state._businessTripApplication
                for (let item of form) {
                    if (item.tag === 'Approver') {
                        item.value = this.props.dataCalculateBusinessTrip.approverName
                        item.data = this.props.dataCalculateBusinessTrip.approver
                    } else if (item.tag === 'TotalTime') {
                        item.value = this.props.dataCalculateBusinessTrip.soNgay + ' ngày ' + this.props.dataCalculateBusinessTrip.soGio + ' giờ '
                        item.data = this.props.dataCalculateBusinessTrip.soNgay + '|' + this.props.dataCalculateBusinessTrip.soGio
                    }
                }
                this.setState({
                    _businessTripApplication: form
                })
            }
        }

        if (this.props.dataSaveBusinessTrip !== prevProps.dataSaveBusinessTrip) {
            if (!objectIsNull(this.props.dataSaveBusinessTrip)) {
                for (let item of this.state._businessTripApplication) {
                    if (item.control === 'attachFile') {
                        if (!stringIsEmpty(item.value) && !stringIsEmpty(item.fileBase64)) {
                            let obj = {
                                FileName: item.value,
                                FileContent: item.fileBase64
                            }
                            this.props.attachFileApplicationAction([obj])
                        } else {
                            Alert.alert('Thông báo', this.props.dataSaveBusinessTrip, [{
                                text: 'Đóng', onPress: () => {
                                    if (!objectIsNull(this.state.oldBusinessTripApplication)) {
                                        this.props.navigation.goBack()
                                    } else {
                                        this.setState({
                                            _businessTripApplication: businessTripApplication()
                                        }, () => {
                                            this.mapData(this.props.dataTypeBusinessTrip, 'TypeBusinessTrip')
                                            this.setFunctionForm()
                                        })
                                    }
                                }
                            }])
                        }
                        break
                    }
                }
            }
        }

        if (this.props.errorSaveBusinessTrip !== prevProps.errorSaveBusinessTrip) {
            if (!objectIsNull(this.props.errorSaveBusinessTrip)) {
                Alert.alert('Lỗi', this.props.errorSaveBusinessTrip, [{
                    text: 'Đóng', onPress: () => { }
                }])
            }
        }

        if (this.props.dataAttachFile !== prevProps.dataAttachFile) {
            if (!objectIsNull(this.props.dataAttachFile)) {
                Alert.alert('Thông báo', this.props.dataSaveBusinessTrip, [{
                    text: 'Đóng', onPress: () => {
                        this.setState({
                            _businessTripApplication: businessTripApplication()
                        }, () => {
                            // this.mapData(this.props.dataTypesLeave, 'LeaveTypeID')
                            this.mapData(this.props.dataTypeBusinessTrip, 'TypeBusinessTrip')
                            this.setFunctionForm()
                        })
                    }
                }])
            }
        }

        if (dataGetDetailBusinessTrip !== prevProps.dataGetDetailBusinessTrip) {
            if (!objectIsNull(dataGetDetailBusinessTrip)) {
                let setDataForm = this.state._businessTripApplication
                const typeApplication = this.props.navigation.getParam('typeApplication')
                for (let item of setDataForm) {
                    if (item.control === 'twoDatePicker') {
                        item.value1 = dataGetDetailBusinessTrip.fromDate
                        item.value2 = dataGetDetailBusinessTrip.toDate
                        item.editable = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? false : true
                    } else if (item.control === 'twoTimePicker') {
                        item.value1 = dataGetDetailBusinessTrip.fromTime
                        item.value2 = dataGetDetailBusinessTrip.toTime
                        item.editable = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'TotalTime') {
                        item.value = dataGetDetailBusinessTrip.soNgayCongTac + ' Ngày ' + dataGetDetailBusinessTrip.soGioCongTac + ' Giờ'
                        item.data = dataGetDetailBusinessTrip.soNgayCongTac + '|' + dataGetDetailBusinessTrip.soGioCongTac
                        item.editable = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'TypeBusinessTrip') {
                        item.value = {
                            id: dataGetDetailBusinessTrip.quyDinhCongTacID,
                            label: dataGetDetailBusinessTrip.quyDinhCongTacName,
                            value: {
                                id: dataGetDetailBusinessTrip.quyDinhCongTacID,
                                name: dataGetDetailBusinessTrip.quyDinhCongTacName,
                            },
                            isSelect: false,
                            type: ''
                        }
                        item.data = dataGetDetailBusinessTrip.quyDinhCongTacID
                        item.selectedItem = {
                            id: dataGetDetailBusinessTrip.quyDinhCongTacID,
                            label: dataGetDetailBusinessTrip.quyDinhCongTacName,
                            value: {
                                id: dataGetDetailBusinessTrip.quyDinhCongTacID,
                                name: dataGetDetailBusinessTrip.quyDinhCongTacName,
                            },
                            isSelect: false,
                            type: ''
                        }
                        item.editable = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'Approver') {

                        // item.value = dataGetDetailBusinessTrip.empName_NguoiPheDuyet + ' - ' + dataGetDetailBusinessTrip.empCode_NguoiPheDuyet
                        item.value = (!stringIsEmpty(dataGetDetailBusinessTrip.empName_NguoiPheDuyet) ? dataGetDetailBusinessTrip.empName_NguoiPheDuyet + '' : '') + (!stringIsEmpty(dataGetDetailBusinessTrip.empCode_NguoiPheDuyet) ? (' - ' + dataGetDetailBusinessTrip.empCode_NguoiPheDuyet) : '')
                        item.data = dataGetDetailBusinessTrip.account_NguoiPheDuyet
                        item.editable = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'DescriptionWork') {
                        item.value = !stringIsEmpty(dataGetDetailBusinessTrip.purpose) ? dataGetDetailBusinessTrip.purpose : ''
                        item.editable = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? false : true
                        item.onPressFocus = this._keyboardDidShow
                        item.onPressBlur = this._keyboardDidHide
                    } else if (item.tag === 'PlaceWork') {
                        item.value = !stringIsEmpty(dataGetDetailBusinessTrip.diaDiem) ? dataGetDetailBusinessTrip.diaDiem : ''
                        item.editable = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? false : true
                        item.onPressFocus = this._keyboardDidShow
                        item.onPressBlur = this._keyboardDidHide
                    } else if (item.tag === 'ReplacePerson') {
                        item.value = dataGetDetailBusinessTrip.replacePerson
                        item.data = dataGetDetailBusinessTrip.replacePersonName
                        item.editable = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'CashAdvance') {
                        item.value = dataGetDetailBusinessTrip.soTienTamUng
                        item.editable = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? false : true
                        item.onPressFocus = this._keyboardDidShow
                        item.onPressBlur = this._keyboardDidHide
                        // dataGetDetailBusinessTrip.lsCurrencyTypeID
                    } else if (item.tag === 'Explanation') {
                        item.value = !stringIsEmpty(dataGetDetailBusinessTrip.note) ? dataGetDetailBusinessTrip.note : ''
                        item.editable = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? false : true
                        item.onPressFocus = this._keyboardDidShow
                        item.onPressBlur = this._keyboardDidHide
                    } else if (item.tag === 'NotifyTo') {
                        item.ids = dataGetDetailBusinessTrip.notificationFor
                        item.data = dataGetDetailBusinessTrip.notificationNameFor
                        item.editable = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'AttachFile') {
                        item.value = !stringIsEmpty(dataGetDetailBusinessTrip.attachFile) ? dataGetDetailBusinessTrip.attachFile : ''
                        item.editable = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'StatusApplication') {
                        item.value = !stringIsEmpty(dataGetDetailBusinessTrip.status) ? dataGetDetailBusinessTrip.status : ''
                        item.editable = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? false : true
                        // item.visible = (dataGetDetailBusinessTrip.statusID === 2 || dataGetDetailBusinessTrip.statusID === 3 || typeApplication === 'approveApplication') ? true : false
                        item.visible = true
                    }
                }
                this.setState({
                    _businessTripApplication: setDataForm,
                    selectedCurrency: {
                        id: dataGetDetailBusinessTrip.lsCurrencyTypeID,
                        code: ''
                    },
                    oldBusinessTripApplication: dataGetDetailBusinessTrip
                })
            }
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
    mapData(data, type) {
        let arr = data.map((value) => {
            let id = value.id
            let name = value.name
            switch (type) {
                case 'TypeBusinessTrip':
                    id = value.id
                    break
                case 'CashAdvance':
                    id = value.id
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
        let list = this.state._businessTripApplication
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
            }
        }
        this.setState({
            _businessTripApplication: list
        })
    }
    onCheckDay(fromDate, toDate) {
        let fd = fromDate.split('/')
        let td = toDate.split('/')
        if (!arrayIsEmpty(fd) && !arrayIsEmpty(td)) {
            if (parseInt(fd[2]) > parseInt(td[2])) {
                return false
            } else if (parseInt(fd[2]) === parseInt(td[2])) {
                if (parseInt(fd[1]) > parseInt(td[1])) {
                    return false
                } else if (parseInt(fd[1]) === parseInt(td[1])) {
                    if (parseInt(fd[0]) > parseInt(td[0])) {
                        return false
                    }
                }
            }
        }
        return true
    }
    onCheckTime(fromTime, toTime) {
        if (!stringIsEmpty(fromTime) && !stringIsEmpty(toTime)) {
            let ft = fromTime.split(':')
            let tt = toTime.split(':')
            if (!arrayIsEmpty(ft) && !arrayIsEmpty(tt)) {
                if (parseInt(ft[0]) > parseInt(tt[0])) {
                    return false
                } else if (parseInt(ft[0]) === parseInt(tt[0])) {
                    if (parseInt(ft[1]) > parseInt(tt[1])) {
                        return false
                    }
                }
            } else {
                return false
            }
        } else {
            return false
        }
        return true
    }
    onCheckDateTime(fromData, toData, type) {
        if (!stringIsEmpty(fromData) && !stringIsEmpty(toData)) {
            if (type === 'date') {
                if (!this.onCheckDay(fromData, toData)) {
                    return false
                }
            } else if (type === 'time') {
                if (!this.onCheckTime(fromData, toData)) {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }
        return true

    }
    onCalculateApp = (value) => {

        let form = this.state._businessTripApplication
        let flag = true
        let obj = {
            FromDate: '',
            ToDate: '',
            FromTime: '',
            ToTime: '',
            Rule: '',
        }
        for (let item of form) {
            if (item.tag === 'TypeBusinessTrip') {
                if (stringIsEmpty(item.data)) {
                    flag = false
                } else {
                    obj.Rule = item.data
                }
            } else if (item.control === 'twoDatePicker') {
                if (!stringIsEmpty(item.value1) && !stringIsEmpty(item.value2)) {
                    if (!this.onCheckDateTime(item.value1, item.value2, 'date')) {
                        flag = false
                        Alert.alert('Thông báo', 'Thời gian công tác không hợp lệ, vui lòng kiểm tra lại !', [{ text: 'Đóng' }])
                    } else {
                        obj.FromDate = item.value1
                        obj.ToDate = item.value2
                    }
                }

            } else if (item.control === 'twoTimePicker') {
                if (!stringIsEmpty(item.value1) && !stringIsEmpty(item.value2)) {
                    if (!this.onCheckDateTime(item.value1, item.value2, 'time')) {
                        flag = false
                        Alert.alert('Thông báo', 'Thời gian công tác không hợp lệ, vui lòng kiểm tra lại !', [{ text: 'Đóng' }])
                    } else {
                        obj.FromTime = item.value1
                        obj.ToTime = item.value2
                    }
                } else {
                    flag = false
                    // Alert.alert('Thông báo', 'Thời gian công tác không hợp lệ, vui lòng kiểm tra lại !', [{ text: 'Đóng', onPress: () => { } }])
                }

            }
        }
        if (flag) {
            // console.log('calculateBusinessTripApplication: ', obj)
            this.props.calculateBusinessTripApplicationAction([obj])
        }
    }
    setInputDataApplication() {
        let isEmpty = false
        if (!objectIsNull(this.refs.form.checkEmpty)) {
            isEmpty = this.refs.form.checkEmpty()
        }
        if (!isEmpty) {
            let obj = {
                ID: !objectIsNull(this.state.oldBusinessTripApplication) ? this.state.oldBusinessTripApplication.congTacID : '',
                FromDate: '',
                FromTime: '',
                ToDate: '',
                ToTime: '',
                NumDays: '',
                NumHours: '',
                Rule: '',
                Approver: '',
                Purpose: '',
                Place: '',
                ReplacePerson: '',
                AdvanceAmount: '',
                AdvanceCurrency: '',
                Note: '',
                NotificationFor: '',
                AttachFile: '',
                Status: '1',
            }
            let flag = undefined
            for (let item of this.state._businessTripApplication) {
                if (item.control === 'twoDatePicker') {
                    obj.FromDate = item.value1
                    obj.ToDate = item.value2
                } else if (item.control === 'twoTimePicker') {
                    obj.FromTime = item.value1
                    obj.ToTime = item.value2
                } else if (item.tag === 'TotalTime') {
                    if (!stringIsEmpty(item.data)) {
                        let val = item.data.split('|')
                        if (!arrayIsEmpty(val)) {
                            if ((val[0] === '0.0') && val[val.length - 1] === '0.0') {
                                flag = 1
                            }
                            obj.NumDays = val[0]
                            obj.NumHours = val[val.length - 1]
                        }
                    }
                } else if (item.tag === 'TypeBusinessTrip') {
                    obj.Rule = item.data
                } else if (item.tag === 'Approver') {
                    obj.Approver = item.data
                    if (stringIsEmpty(item.data)) {
                        flag = 2
                    }
                } else if (item.tag === 'DescriptionWork') {
                    obj.Purpose = item.value
                } else if (item.tag === 'PlaceWork') {
                    obj.Place = item.value
                } else if (item.tag === 'ReplacePerson') {
                    obj.ReplacePerson = item.ids
                } else if (item.tag === 'CashAdvance') {
                    obj.AdvanceAmount = item.value
                    obj.AdvanceCurrency = !objectIsNull(this.state.selectedCurrency) ? this.state.selectedCurrency.id : 6
                } else if (item.tag === 'Explanation') {
                    obj.Note = item.value
                } else if (item.tag === 'NotifyTo') {
                    obj.NotificationFor = item.ids
                } else if (item.tag === 'AttachFile') {
                    obj.AttachFile = item.value
                }
            }
            if (flag === 1) {
                Alert.alert(
                    userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                    userProfile.LangID === 'VN' ? 'Thời gian công tác không hợp lệ. Vui lòng kiểm tra lại !' : 'Invalid working time. Please check again.',
                    [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel' }])
            } else if (flag === 2) {
                Alert.alert(
                    userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                    userProfile.LangID === 'VN' ? 'Chưa có người phê duyệt !' : 'No approver',
                    [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel' }]
                )
            } else {
                // console.log('successsssssssssssssssss : ', obj)
                this.props.saveBusinessTripApplicationAction([obj])
            }
        } else {

        }
    }
    onPressSubmit = () => {
        const { oldBusinessTripApplication } = this.state
        const { withDrawBusinessTripApplicationAction, } = this.props
        if (!objectIsNull(oldBusinessTripApplication)) {
            if (oldBusinessTripApplication.statusID == '2') {
                Alert.alert(
                    userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                    userProfile.LangID === 'VN' ? 'Bạn chắc chắn muốn lấy lại đơn này ? ' : 'You definitely want to get this application withdraw ?', [
                    {
                        text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                        onPress: () => {
                            withDrawBusinessTripApplicationAction([{
                                ID: oldBusinessTripApplication.congTacID,
                                Approver: oldBusinessTripApplication.account_NguoiPheDuyet
                            }])
                        }
                    },
                    {
                        text: userProfile.LangID === 'VN' ? 'Hủy' : 'Cancel',
                        onPress: () => {

                        }
                    },
                ])
            } else if (oldBusinessTripApplication.statusID == '1' || oldBusinessTripApplication.statusID == '4') {
                this.setInputDataApplication()
            }
        } else {
            this.setInputDataApplication()
        }


    }
    onPressDelete = () => {
        if (!objectIsNull(this.state.oldBusinessTripApplication)) {
            Alert.alert(
                userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', 
                userProfile.LangID === 'VN' ? 'Bạn chắc chắn muốn xóa đơn này ? ' : 'You definitely want to get this application delete ?', [
                {
                    text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                    onPress: () => {
                        this.props.deleteBusinessTripApplicationAction([{ ID: this.state.oldBusinessTripApplication.congTacID }])
                    }
                },
                {
                    text: userProfile.LangID === 'VN' ? 'Hủy' : 'Cancel',
                    onPress: () => {

                    }
                },
            ])
            // this.props.deleteLeaveApplicationAction({ ID: this.state.oldLeaveApplication.leaveRecordHourID })
        }
    }
    showView() {

    }
    showError() {
        const {
            errorTypeBusinessTrip,
            errorCurrencyBusinessTrip,
            errorEmployeeBusinessTrip,
            errorGetDetailBusinessTrip,
            // errorCalculateBusinessTrip,
        } = this.props
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Image source={getImage('img_empty_data')} style={{ width: Sizes.s340, height: Sizes.s340 }} />
                <Text style={{ marginVertical: Sizes.s20, fontSize: Sizes.s30, color: '#0984e3', textAlign: 'center' }}>
                    {!stringIsEmpty(errorTypeBusinessTrip)
                        ? errorTypeBusinessTrip
                        // : !stringIsEmpty(errorCurrencyBusinessTrip) ? errorCurrencyBusinessTrip 
                        // : !stringIsEmpty(errorEmployeeBusinessTrip) ? errorEmployeeBusinessTrip 
                        : (!stringIsEmpty(errorGetDetailBusinessTrip) && errorGetDetailBusinessTrip !== errorConnectServer.errorData) ? errorGetDetailBusinessTrip
                            : (userProfile.LangID === 'VN' ? 'Không có dữ liệu để hiển thị. Vui lòng thử lại' : 'No data found. Please reload !')
                    }
                </Text>
                <CustomButton onPress={() => {
                    if (!stringIsEmpty(errorTypeBusinessTrip)) {
                        this.props.getListTypeBusinessTripApplicationAction()
                    }
                    // if(!stringIsEmpty(errorCurrencyBusinessTrip)){
                    //     this.props.getTypesLeaveApplication()
                    // }
                    // if(!stringIsEmpty(errorEmployeeBusinessTrip)){
                    //     this.props.getTypesLeaveApplication()
                    // }

                    if (!stringIsEmpty(errorGetDetailBusinessTrip)) {
                        let param = this.props.navigation.getParam('itemBusinessTripApplication')
                        if (!objectIsNull(param)) {
                            this.props.getDetailBusinessTripApplicationAction([{ ID: param.congTacID }])
                        }
                    }

                }} title={userProfile.LangID === 'VN' ? appStrS.vn.button.reload : appStrS.en.button.reload} type='reload' />
            </View>
        )
    }
    render() {
        const {
            fetchingTypeBusinessTrip,
            dataTypeBusinessTrip,
            errorTypeBusinessTrip,

            fetchingCurrencyBusinessTrip,
            dataCurrencyBusinessTrip,
            errorCurrencyBusinessTrip,

            fetchingEmployeeBusinessTrip,
            dataEmployeeBusinessTrip,
            errorEmployeeBusinessTrip,
            errorGetDetailBusinessTrip,

            fetchingCalculateBusinessTrip,
            dataCalculateBusinessTrip,
            errorCalculateBusinessTrip,
            fetchingSaveBusinessTrip,
            fetchingAttachFile,

            fetchingDeleteBusinessTrip,
            fetchingWithDrawBusinessTrip,
            fetchingDownloadFile,
            fetchingGetDetailBusinessTrip,

        } = this.props

        const { oldBusinessTripApplication, isShowKeyboard } = this.state
        const typeApplication = this.props.navigation.getParam('typeApplication')
        return (
            <SafeAreaView style={{ flex: 1, }}>
                {(
                    fetchingTypeBusinessTrip ||
                    fetchingSaveBusinessTrip ||
                    fetchingAttachFile ||
                    fetchingDeleteBusinessTrip ||
                    fetchingWithDrawBusinessTrip ||
                    fetchingDownloadFile ||
                    fetchingGetDetailBusinessTrip
                ) && <Loading />}
                <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS === 'android' ? null : 'padding'}>
                    <CustomHeader
                        typeIconLeft={'back'}
                        title={userProfile.LangID === 'VN' ? appStrS.vn.businessTripApplication.title : appStrS.en.businessTripApplication.title}
                        onPressLeft={() => { this.props.navigation.goBack() }}
                        typeIconRight={!objectIsNull(this.state.oldBusinessTripApplication) ? 'branch' : null}
                        onPressRight={() => {
                            if (!objectIsNull(this.state.oldBusinessTripApplication)) {
                                this.props.navigation.navigate('ApplicationHistoryContainer', {
                                    idApplication: this.state.oldBusinessTripApplication.congTacID,
                                    typeApplication: 4
                                })
                            }
                        }}
                    // oldBusinessTripApplication
                    />
                    {(!stringIsEmpty(errorTypeBusinessTrip) || !stringIsEmpty(errorGetDetailBusinessTrip)) ? this.showError()
                        :
                        (
                            <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: Sizes.s20 }}>
                                <FormDetail ref='form' form={this.state._businessTripApplication} />
                                {/* <CustomButton onPress={this.onPressSubmit} type='send' title='Gửi' /> */}
                                {(typeApplication === 'approveApplication' || isShowKeyboard) ?
                                    (
                                        null
                                    )
                                    :
                                    (
                                        !objectIsNull(oldBusinessTripApplication) ?
                                            (
                                                (oldBusinessTripApplication.statusID === 2) ?
                                                    <CustomButton onPress={this.onPressSubmit} type='rollBack' title={userProfile.LangID === 'VN' ? appStrS.vn.button.withDraw : appStrS.en.button.widthDraw} />
                                                    : oldBusinessTripApplication.statusID === 4 ?
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
                                                        : oldBusinessTripApplication.statusID === 1 ?
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

                                {!this.state.visibleCurrency &&
                                    (
                                        <View style={{ width: 1, height: 1, }}>
                                            <ComboboxForm ref={'currencyCombobox'} items={arrayIsEmpty(this.state.dataCurrency) ? [] : this.state.dataCurrency} onSelectedItemCombobox={(value) => {
                                                this.setState({
                                                    selectedCurrency: value.value
                                                })
                                            }} />
                                        </View>
                                    )
                                }
                            </View>
                        )
                    }
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}
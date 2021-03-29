


import React from 'react';
import { Button, Image, View, Text, Alert, Modal, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import {
    overTimeApplication,
} from '../custom/form/FormTypeDetail'
import CustomHeader from '../custom/CustomHeader'
import { CustomButton } from '../custom/CustomButton'
import FormDetail from '../custom/form/FormDetail'
import getImage from '../../res/values/strings/iconStrS'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { Sizes } from '@dungdang/react-native-basic'
import Loading from '../custom/Loading'
import { userProfile, errorConnectServer } from '../../config/settings';
import { appStrS } from '../../res/values/strings/appStrS'
export default class OverTimeApplication extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            _overTimeApplication: overTimeApplication(),
            isShowKeyboard: false,
        }
    }
    getDateInfo = (date) => {
        this.props.getDateInfoOverTimeApplicationAction([{ DateID: date }])
    }

    showAlert(title, content, arrayButton) {
        Alert.alert(title, content, arrayButton)
    }

    calculateOverTime = () => {
        let form = this.state._overTimeApplication

        let requireArray = []
        let isEmpty = false
        for (let item of form) {
            if (item.tag === 'RegisterDate') {
                requireArray.push({
                    tag: item.tag,
                    control: item.control,
                    type: 'singleTag'
                })
            } else if (item.control === 'twoTimePicker') {
                requireArray.push({
                    tag: item.tag1,
                    control: item.control,
                    type: 'doubleControl'
                })
            }
        }
        if (!objectIsNull(this.refs.form.checkEmptyRequire)) {
            isEmpty = this.refs.form.checkEmptyRequire(requireArray)
        }
        if (!isEmpty) {
            let obj = {
                Date: '',
                FromTime: '',
                ToTime: '',
                IncreaseType: ''
            }
            for (let item of form) {
                if (item.tag === 'RegisterDate') {
                    obj.Date = item.value
                } else if (item.control === 'twoTimePicker') {
                    obj.FromTime = item.value1
                    obj.ToTime = item.value2
                } else if (item.control === 'twoCheckBox') {
                    if (item.value1 === '1') {
                        obj.IncreaseType = '1' // Tăng ca đầu giờ
                    } else {
                        obj.IncreaseType = '2' // Tăng ca cuối giờ
                    }
                }
            }
            // console.log('calculateSuccesss !!!!!!', obj)
            this.props.calculateOverTimeApplicationAction([obj])
            this.props.getApproverOverTimeApplicationAction()

        } else {
            // console.log('calculateFaielddddd !!!!!')
        }
    }
    clearCalculateOT = () => {
        let form = this.state._overTimeApplication
        for (let item of form) {
            if (item.control === 'twoTextForm') {
                if (item.tag1 === 'DayTimeOT' && item.tag2 === 'NightOT') {
                    item.value1 = ''
                    item.value2 = ''
                }
            } else if (item.tag === 'RegistrationHoursOff') {
                item.value = ''
            } else if (item.tag === 'AccumulativeMonthOT') {
                item.value = ''
                item.data = ''
            } else if (item.tag === 'AccumulativeYearOT') {
                item.value = ''
                item.data = ''
            }
        }
        this.setState({
            _overTimeApplication: form
        })
    }
    setFunctionForm() {
        let form = this.state._overTimeApplication
        for (let item of form) {
            if (item.tag === 'RegisterDate') {
                item.onPress = this.getDateInfo
                item.onPress1 = this.clearCalculateOT
            } else if (item.control === 'textedit') {
                item.onPressFocus = this._keyboardDidShow
                item.onPressBlur = this._keyboardDidHide
            } else if (item.control === 'twoTimePicker') {
                item.onPress1 = this.clearCalculateOT
                item.onPress2 = this.clearCalculateOT
            } else if (item.tag === 'calculateOT') {
                item.onPress = this.calculateOverTime
            }
        }
        this.setState({
            _overTimeApplication: form
        })
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

    componentDidUpdate(prevProps, prevState) {
        const {
            dataDateInfo,
            dataApprover,
            dataCalculate,
            dataSave,

            dataGetDetailOverTime,
            dataWithDrawOverTime,
            dataDeleteOverTime,

            errorGetDetailOverTime,
            errorWithDrawOverTime,
            errorDeleteOverTime,

            errorCalculate,
            errorSave
        } = this.props

        if (errorGetDetailOverTime !== prevProps.errorGetDetailOverTime) {
            if (!stringIsEmpty(errorGetDetailOverTime)) {
                // console.log('errorGetDetailOverTime: ', errorGetDetailOverTime)
                if (errorGetDetailOverTime === errorConnectServer.errorData) {
                    Alert.alert(
                        userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                        userProfile.LangID === 'VN' ? 'Đơn này đã bị xóa !' : 'The application has been deleted !',
                        [{
                            text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => {
                                this.props.navigation.goBack()
                            }
                        }])
                }
            }
        }

        if (dataWithDrawOverTime !== prevProps.dataWithDrawOverTime) {
            if (!objectIsNull(dataWithDrawOverTime)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', dataWithDrawOverTime, [{
                    text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm', onPress: () => {
                        this.props.navigation.goBack()
                    }
                }])
            }
        }

        if (dataDeleteOverTime !== prevProps.dataDeleteOverTime) {
            if (!objectIsNull(dataDeleteOverTime)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', dataDeleteOverTime, [{
                    text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm', onPress: () => {
                        this.props.navigation.goBack()
                    }
                }])
            }
        }
        if (errorWithDrawOverTime !== prevProps.errorWithDrawOverTime) {
            if (!objectIsNull(errorWithDrawOverTime)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', errorWithDrawOverTime, [{
                    text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => {

                    }
                }])
            }
        }
        if (errorDeleteOverTime !== prevProps.errorDeleteOverTime) {
            if (!objectIsNull(errorDeleteOverTime)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', errorDeleteOverTime, [{
                    text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => {

                    }
                }])
            }
        }

        if (dataDateInfo !== prevProps.dataDateInfo) {
            if (!objectIsNull(dataDateInfo)) {
                let form = this.state._overTimeApplication
                for (let item of form) {
                    if (item.control === 'twoTextForm') {
                        if (item.tag1 === 'TimeInOut') {
                            item.value1 = !stringIsEmpty(dataDateInfo.gioQuetThe) ? dataDateInfo.gioQuetThe : ' '
                            // item.value1 = '00:00'
                        }
                        if (item.tag2 === 'WorkingSchedule') {
                            item.value2 = !stringIsEmpty(dataDateInfo.gioTheoCa) ? dataDateInfo.gioTheoCa : ' '
                            // item.value2 = '00:00'
                        }
                    }
                }
                this.setState({
                    _overTimeApplication: form
                })
            }
        }
        if (dataCalculate !== prevProps.dataCalculate) {
            if (!objectIsNull(dataCalculate)) {
                let form = this.state._overTimeApplication
                for (let item of form) {
                    if (item.control === 'twoTextForm') {
                        if (item.tag1 === 'DayTimeOT') {
                            item.value1 = (!objectIsNull(dataCalculate.gioOTNgay) ? dataCalculate.gioOTNgay : '00') + ':' + (!objectIsNull(dataCalculate.phutOTNgay) ? dataCalculate.phutOTNgay : '00')
                        }
                        if (item.tag2 === 'NightOT') {
                            item.value2 = (!objectIsNull(dataCalculate.gioOTDem) ? dataCalculate.gioOTDem : '00') + ':' + (!objectIsNull(dataCalculate.phutOTDem) ? dataCalculate.phutOTDem : '00')
                        }
                    } else if (item.tag === 'RegistrationHoursOff') {
                        // item.value = (!objectIsNull(dataCalculate.gioNghiBu) ? dataCalculate.gioNghiBu : '00') + ':' + (!objectIsNull(dataCalculate.phutNghiBu) ? dataCalculate.phutNghiBu : '00')
                        item.value = '00:00'
                    } else if (item.tag === 'AccumulativeMonthOT') {
                        item.value = dataCalculate.soGioTichLuyThang
                    } else if (item.tag === 'AccumulativeYearOT') {
                        item.value = dataCalculate.soGioTichLuyNam
                    }
                }
                this.setState({
                    _overTimeApplication: form
                })
            }
        }
        if (dataApprover !== prevProps.dataApprover) {
            if (!objectIsNull(dataApprover)) {
                let form = this.state._overTimeApplication
                for (let item of form) {
                    if (item.tag === 'Approver') {
                        item.value = dataApprover.approverName
                        item.data = dataApprover.approverID
                    }
                }
                this.setState({
                    _overTimeApplication: form
                })
            }
        }
        if (dataSave !== prevProps.dataSave) {
            if (!objectIsNull(dataSave)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', dataSave, [{
                    text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => {
                        if (!objectIsNull(dataGetDetailOverTime)) {
                            this.props.navigation.goBack()
                        } else {
                            this.setState({
                                _overTimeApplication: overTimeApplication()
                            }, () => {
                                this.setFunctionForm()
                            })
                        }
                    }
                }])
            }
        }
        if (errorCalculate !== prevProps.errorCalculate) {
            if (!objectIsNull(errorCalculate)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', errorCalculate, [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => { } }])
            }
        }
        if (errorSave !== prevProps.errorSave) {
            if (!objectIsNull(errorSave)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', errorSave, [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel', onPress: () => { } }])
            }
        }


        if (dataGetDetailOverTime !== prevProps.dataGetDetailOverTime) {
            if (!objectIsNull(dataGetDetailOverTime)) {
                let inputForm = this.state._overTimeApplication
                const { statusID } = dataGetDetailOverTime
                const typeApplication = this.props.navigation.getParam('typeApplication')
                for (let item of inputForm) {
                    if (item.tag === 'RegisterDate') {
                        item.value = dataGetDetailOverTime.date
                        item.editable = (statusID == '2' || statusID == '3') ? false : true
                    } else if (item.tag === 'calculateOT') {
                        item.visible = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? true : false
                    } else if (item.tag === 'RegistrationHoursOff') {
                        item.value = dataGetDetailOverTime.hourReplace
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'AccumulativeMonthOT') {
                        item.value = !stringIsEmpty(dataGetDetailOverTime.soGioOTTichLuy_Thang) ? dataGetDetailOverTime.soGioOTTichLuy_Thang : ''
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'AccumulativeYearOT') {
                        item.value = !stringIsEmpty(dataGetDetailOverTime.soGioOTTichLuy_Nam) ? dataGetDetailOverTime.soGioOTTichLuy_Nam : ''
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'Approver') {
                        item.value = !stringIsEmpty(dataGetDetailOverTime.approverName) ? dataGetDetailOverTime.approverName : ''
                        item.data = dataGetDetailOverTime.approver
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                    } else if (item.tag === 'Reason') {
                        item.value = dataGetDetailOverTime.note
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                        item.onPressFocus = this._keyboardDidShow
                        item.onPressBlur = this._keyboardDidHide
                    } else if (item.tag === 'StatusApplication') {
                        item.value = !stringIsEmpty(dataGetDetailOverTime.status) ? dataGetDetailOverTime.status : ''
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                        // item.visible = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? true : false
                        item.visible = true
                    } else if (item.control === 'twoTextForm') {
                        if (item.tag1 === 'TimeInOut') {
                            item.value1 = !stringIsEmpty(dataGetDetailOverTime.gioQuetThe) ? dataGetDetailOverTime.gioQuetThe : ' '
                        } else if (item.tag1 === 'DayTimeOT') {
                            item.value1 = dataGetDetailOverTime.hourDay
                        }

                        if (item.tag2 === 'WorkingSchedule') {
                            item.value2 = !stringIsEmpty(dataGetDetailOverTime.gioTheoCa) ? dataGetDetailOverTime.gioTheoCa : ' '
                        } else if (item.tag2 === 'NightOT') {
                            item.value2 = dataGetDetailOverTime.hourNight
                        }
                    } else if (item.control === 'twoTimePicker') {
                        item.value1 = dataGetDetailOverTime.from
                        item.value2 = dataGetDetailOverTime.to
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                    } else if (item.control === 'twoCheckBox') {
                        if (dataGetDetailOverTime.increaseType == 1) {
                            item.value1 = '1'
                            item.value2 = '0'
                        } else {
                            item.value2 = '1'
                            item.value1 = '0'
                        }
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                    }
                    // datepickerForm('1', 'I', 'datepicker', null, null, 'Ngày đăng ký', '1', null, 1, '', null, true, 'RegisterDate'),
                    // twoTextForm('2', 'I', 'twoTextForm', null, null, 'Giờ vào - Giờ ra', 'Ca làm việc', false, null, 2, false, 'TimeInOut', 'WorkingSchedule'),
                    // twoTimePickerForm('3', 'I', 'twoTimePicker', null, null, 'Từ giờ', 'Đến giờ', '1', null, 3, true, 'FromTime', 'ToTime', false),
                    // twoCheckBoxForm('4', 'I', 'twoCheckBox', null, null, 'Tăng ca đầu giờ', 'Tăng ca cuối giờ', '0', null, 4, true, 'IsFromTom', 'IsToTom', false, '0', '1', 'single'),
                    // buttonForm('5', 'I', 'buttonForm', 'Tính OT', '0', 5, 'calculateOT', false, 'setting'),
                    // twoTextForm('6', 'I', 'twoTextForm', null, null, 'Số giờ OT ban ngày', 'Số giờ OT ban đêm', false, null, 6, false, 'DayTimeOT', 'NightOT'),
                    // timePickerForm('7', 'I', 'timePickerForm', null, null, 'Số giờ đăng ký nghỉ bù', '0', null, 7, '', null, true, 'RegistrationHoursOff'),
                    // textForm('8', 'I', 'textForm', null, null, 'Số giờ tích lũy trong tháng / 30 giờ', '0', null, 8, null, null, false, 'AccumulativeMonthOT'),
                    // textForm('9', 'I', 'textForm', null, null, 'Số giờ tích lũy trong năm / 200 giờ', '0', null, 9, null, null, false, 'AccumulativeYearOT'),
                    // textForm('10', 'I', 'textForm', null, null, 'Người phê duyệt', '0', null, 10, null, null, false, 'Approver'),
                    // textEditForm('11', 'I', 'textedit', null, null, 'Lý do nghỉ', '1', null, 11, null, null, true, 'Reason', 'ic_pen')
                }
                this.setState({
                    _overTimeApplication: inputForm
                })
            }
        }

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
    setInputDataApplication() {
        let isEmpty = false
        if (!objectIsNull(this.refs.form.checkEmpty)) {
            isEmpty = this.refs.form.checkEmpty()
        }
        if (!isEmpty) {
            let obj = {
                RecordID: !objectIsNull(this.props.dataGetDetailOverTime) ? this.props.dataGetDetailOverTime.recordID : '',
                Date: '',
                FromTime: '',
                ToTime: '',
                HourDay: '',
                HourNight: '',
                ApproverID: '',
                ReasonID: '',
                HourReplace: '',
                Note: '',
                Status: '2',
                IncreaseType: '',
            }
            let flag = false
            for (let item of this.state._overTimeApplication) {
                if (item.tag === 'RegisterDate') {
                    obj.Date = item.value
                } else if (item.control === 'twoTimePicker') {
                    obj.FromTime = item.value1
                    obj.ToTime = item.value2
                } else if (item.control === 'twoCheckBox') {
                    if (item.value1 === '1') {
                        obj.IncreaseType = '1' // Tăng ca đầu giờ
                    } else {
                        obj.IncreaseType = '2' // Tăng ca cuối giờ
                    }
                } else if (item.control === 'twoTextForm') {
                    if (item.value1 === '00:00' && item.value2 === '00:00') {
                        flag = true
                    }
                    if (item.tag1 === 'DayTimeOT') {
                        obj.HourDay = item.value1
                    }
                    if (item.tag2 === 'NightOT') {
                        obj.HourNight = item.value2
                    }
                } else if (item.tag === 'RegistrationHoursOff') {
                    obj.HourReplace = item.value
                } else if (item.tag === 'Approver') {
                    obj.ApproverID = item.data
                } else if (item.tag === 'Reason') {
                    obj.Note = item.value
                }
            }
            if (flag) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', 'Chưa có số giờ OT', [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel' }])
            } else {
                if (!stringIsEmpty(obj.HourDay) && !stringIsEmpty(obj.HourNight)) {
                    if (!stringIsEmpty(obj.HourReplace)) {
                        let result = this.onCheckReplaceHour(obj.HourDay, obj.HourNight, obj.HourReplace)
                        if (result) {
                            // console.log('sendddddddAplication: ', obj)
                            this.props.saveOverTimeApplicationAction([obj])
                        } else {
                            Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', userProfile.LangID === 'VN' ? 'Giờ đăng ký nghỉ bù không thể lớn hơn tổng giờ OT đăng ký. ' : 'The time to register for compensatory leave must not be greater than the total hours registered in OT.', [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel' }])
                        }
                    } else {
                        // console.log('sendddddddAplication: ', obj)
                        this.props.saveOverTimeApplicationAction([obj])
                    }
                } else {
                    // console.log('sendddddddAplication: ', obj)
                    this.props.saveOverTimeApplicationAction([obj])
                }

            }

        } else {
            Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', 'Bạn chưa điền đầy đủ thông tin cần thiết !', [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel' }])
        }
    }
    onCheckReplaceHour(hourDay, hourNight, hourReplace) {
        let hd = hourDay.split(':')
        let hn = hourNight.split(':')
        let hr = hourReplace.split(':')

        let otMinute = parseInt(hd[1]) + parseInt(hn[1])
        let otHour = parseInt(hd[0]) + parseInt(hn[0])
        if (otMinute >= 60) {
            let hour = (parseInt(otMinute / 60))
            otHour += hour
            otMinute -= hour * 60
        }
        if (otHour < parseInt(hr[0])) {
            return false
        } else if (otHour === parseInt(hr[0])) {
            if (otMinute < parseInt(hr[1])) {
                return false
            }
        }
        return true
    }
    onPressSubmit = () => {
        const { dataGetDetailOverTime } = this.props
        if (!objectIsNull(dataGetDetailOverTime)) {
            if (dataGetDetailOverTime.statusID == '2') {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', 'Bạn chắc chắn muốn lấy lại đơn này ?', [
                    {
                        text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                        onPress: () => {
                            this.props.withDrawOverTimeApplicationAction([{
                                ID: dataGetDetailOverTime.recordID,
                                Approver: dataGetDetailOverTime.approver
                            }])
                        }
                    },
                    {
                        text: 'Hủy',
                        onPress: () => {

                        }
                    },
                ])
                // withDrawOverTimeApplicationAction
            } else if (dataGetDetailOverTime.statusID == '1' || dataGetDetailOverTime.statusID == '4') {
                this.setInputDataApplication()
            }
        } else {
            this.setInputDataApplication()
        }


    }
    onPressDelete = () => {
        Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', 'Bạn chắc chắn muốn xóa đơn này ?', [
            {
                text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                onPress: () => {
                    this.props.deleteOverTimeApplicationAction([{ ID: this.props.dataGetDetailOverTime.recordID }])
                }
            },
            {
                text: 'Hủy',
                onPress: () => {

                }
            },
        ])

    }
    getNowDate = () => {
        let d = new Date()
        let t = d.getDay() + 1
        let day = ('0' + d.getDate()).substr(-2)
        let month = ('0' + (d.getMonth() + 1)).substr(-2)
        let year = d.getFullYear()

        return day + '/' + month + '/' + year

    }
    showError() {
        const {
            errorGetDetailOverTime,
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
                    {(!stringIsEmpty(errorGetDetailOverTime) && errorGetDetailOverTime !== errorConnectServer.errorData) ? errorGetDetailOverTime
                        : (userProfile.LangID === 'VN' ? 'Không có dữ liệu để hiển thị. Vui lòng thử lại' : 'There is no data to display. Please try again !')
                    }
                </Text>
                <CustomButton onPress={() => {
                    if (!stringIsEmpty(errorGetDetailOverTime)) {
                        let param = this.props.navigation.getParam('itemOverTimeApplication')
                        if (!objectIsNull(param)) {
                            this.props.getDetailOverTimeApplicationAction([{ ID: param.recordID }])
                        }
                    }

                }} title={userProfile.LangID === 'VN' ? 'Thử lại' : 'Reload'} type='reload' />
            </View>
        )
    }
    render() {
        const {
            fetchingDateInfo,
            fetchingApprover,
            fetchingCalculate,
            fetchingSave,
            fetchingGetDetailOverTime,
            fetchingWithDrawOverTime,
            fetchingDeleteOverTime,


            dataGetDetailOverTime,
            errorGetDetailOverTime
        } = this.props
        const typeApplication = this.props.navigation.getParam('typeApplication')
        const { isShowKeyboard } = this.state
        return (
            <SafeAreaView style={{ flex: 1, }}>
                {(fetchingDateInfo || fetchingApprover || fetchingCalculate || fetchingSave || fetchingDeleteOverTime || fetchingWithDrawOverTime || fetchingGetDetailOverTime) && <Loading />}
                <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS === 'android' ? null : 'padding'}>

                    <CustomHeader
                        typeIconLeft={'back'}
                        title={userProfile.LangID === 'VN' ? 'Đơn làm ngoài giờ' : 'Overtime Application'}
                        onPressLeft={() => { this.props.navigation.goBack() }}
                        typeIconRight={!objectIsNull(dataGetDetailOverTime) ? 'branch' : null}
                        onPressRight={() => {
                            if (!objectIsNull(dataGetDetailOverTime)) {
                                this.props.navigation.navigate('ApplicationHistoryContainer', {
                                    idApplication: dataGetDetailOverTime.recordID,
                                    typeApplication: 2
                                })
                            }
                        }}
                    />
                    {!stringIsEmpty(errorGetDetailOverTime) ? this.showError()
                        :
                        (
                            <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: Sizes.s20 }}>
                                <FormDetail ref='form' form={this.state._overTimeApplication} />
                                {/* <CustomButton onPress={this.onPressSubmit} type='send' title='Gửi' /> */}
                                {(typeApplication === 'approveApplication' || isShowKeyboard) ?
                                    (
                                        null
                                    )
                                    :
                                    (
                                        !objectIsNull(dataGetDetailOverTime) ?
                                            (
                                                (dataGetDetailOverTime.statusID === 2) ?
                                                    <CustomButton onPress={this.onPressSubmit} type='rollBack' title={userProfile.LangID === 'VN' ? appStrS.vn.button.withDraw : appStrS.en.button.withDraw} />
                                                    : dataGetDetailOverTime.statusID === 4 ?
                                                        (
                                                            <View style={{ width: '100%', flexDirection: 'row', }}>
                                                                <View style={{ flex: 1, paddingRight: Sizes.h20, }} >
                                                                    <CustomButton onPress={this.onPressSubmit} type='send' title={userProfile.LangID === 'VN' ? appStrS.vn.button.submit : appStrS.en.button.submit} />
                                                                </View>
                                                                <View style={{ flex: 1, paddingLeft: Sizes.h20, }}>
                                                                    <CustomButton onPress={this.onPressDelete} type='close' title={userProfile.LangID === 'VN' ? appStrS.vn.button.delete : appStrS.en.button.delete} />
                                                                </View>
                                                            </View>
                                                            // <CustomButton onPress={this.onPressSubmit} type='send' title="Gửi" />
                                                            // <CustomButton onPress={this.onPressDelete} type='close' title='Xóa' />
                                                        )
                                                        : dataGetDetailOverTime.statusID === 1 ?
                                                            (
                                                                <View style={{ width: '100%', flexDirection: 'row', }}>
                                                                    <View style={{ flex: 1, paddingRight: Sizes.h20, }}>
                                                                        <CustomButton onPress={this.onPressSubmit} type='send' title={userProfile.LangID === 'VN' ? appStrS.vn.button.submit : appStrS.en.button.submit} />
                                                                    </View>
                                                                    <View style={{ flex: 1, paddingLeft: Sizes.h20, }}>
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
                            </View>
                        )
                    }

                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}
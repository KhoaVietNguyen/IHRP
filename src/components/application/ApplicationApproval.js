


import React from 'react';
import {
    Image,
    View,
    Text,
    Alert,
    Modal,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ActivityIndicator,
    FlatList,
    Dimensions,
    ScrollView,
} from 'react-native';
import {
    leaveApplicationApprovalForm,
    overTimeApplicationApprovalForm,
    businessTripApplicationApprovalForm,
    logTMSApplicationApprovalForm,
} from '../custom/form/FormTypeDetail'
import CustomHeader from '../custom/CustomHeader'
import { CustomButton } from '../custom/CustomButton'
import FormDetail from '../custom/form/FormDetail'
import getImage from '../../res/values/strings/iconStrS'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { Sizes } from '@dungdang/react-native-basic'
import Loading from '../custom/Loading'
import ItemDetailLeave from '../custom/application/ItemDetailLeave'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { userProfile, errorConnectServer } from '../../config/settings'
import { appStrS } from '../../res/values/strings/appStrS'
import { colorForm } from '../../res/values/strings/colorStr'
export default class ApplicationApproval extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            form: [],
            textEmployee: '',
            textDepartment: '',
            isShowModal: false,
        }
    }

    calculateOverTime = () => {

    }
    componentDidMount() {

    }
    onReadFile = () => {
        const { } = this.props
        let fileName = ''
        let fileBase64 = ''
        for (let item of this.state.form) {
            if (item.tag === 'AttachFile') {
                fileName = item.value
                fileBase64 = item.fileBase64
                break
            }
        }
        if (!stringIsEmpty(fileBase64)) {
            this.props.navigation.navigate('FileWebView', { imageBase64: fileBase64 })
        } else if (!stringIsEmpty(fileName)) {
            this.props.workflowDownloadFileAction([{ FileName: fileName }])
        }

    }

    onViewFile = () => {
        const { } = this.props
        let fileName = ''
        let fileBase64 = ''
        for (let item of this.state.form) {
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
    getDetailDaysLeave = (data) => {
        this.props.getDaysLeaveApplicationAction({
            LeaveRecordID: data.leaveRecordHourID,
            LeaveTypeID: data.leaveTypeID,
            FromDate: data.fromDate,
            ToDate: data.toDate
        })
        this.onChangeVisiblePopup(true)
    }
    setDataLeaveForm(data) {
        let form = leaveApplicationApprovalForm()
        for (let item of form) {
            switch (item.tag) {
                case 'LeaveType':
                    item.value = !stringIsEmpty(data.leaveName) ? data.leaveName : ''
                    item.data = !stringIsEmpty(data.leaveTypeID) ? data.leaveTypeID : ''
                    break
                case 'TimeLeave':
                    item.value = !stringIsEmpty(data.duration) ? data.duration : ''
                    item.data = !stringIsEmpty(data.duration) ? data.duration : ''
                    break
                case 'Taken':
                    item.value = !stringIsEmpty(data.taken) ? data.taken : ''
                    item.data = !stringIsEmpty(data.taken) ? data.taken : ''
                    break
                case 'Hour':
                    item.value = !stringIsEmpty(data.hour) ? data.hour : ''
                    item.data = !stringIsEmpty(data.hour) ? data.hour : ''
                    if (data.fromDate !== data.toDate) {
                        item.requireSubmit = '3'
                    }
                    item.onPress = () => {
                        this.getDetailDaysLeave(data)
                    }
                    break
                case 'Reason':
                    item.value = !stringIsEmpty(data.reason) ? data.reason : ''
                    item.data = !stringIsEmpty(data.reason) ? data.reason : ''
                    break
                case 'ActionDate':
                    item.value = !stringIsEmpty(data.actionDate) ? data.actionDate : ''
                    item.data = !stringIsEmpty(data.actionDate) ? data.actionDate : ''
                    break
                case 'ReplacePerson':
                    item.value = !stringIsEmpty(data.replacePersonName) ? data.replacePersonName : ''
                    item.data = !stringIsEmpty(data.replacePerson) ? data.replacePerson : ''
                    break
                case 'NotifyTo':
                    item.value = !stringIsEmpty(data.notificationNameFor) ? data.notificationNameFor : ''
                    item.data = !stringIsEmpty(data.notificationFor) ? data.notificationFor : ''
                    break
                case 'AttachFile':
                    item.value = !stringIsEmpty(data.attachedFile) ? data.attachedFile : ''
                    item.onPressViewFile = this.onViewFile
                    item.onPressReadFile = this.onReadFile
                    break
                case 'ReasonReject':
                    item.editable = !objectIsNull(data.statusID) ? (data.statusID !== 3 ? true : false) : true
                    break
                default:
                    break
            }
        }
        this.setState({
            form: form,
            textEmployee: (!stringIsEmpty(data.empName) ? data.empName : ''),
            textDepartment: ''
        })
    }
    setDataOverTimeForm(data) {
        let form = overTimeApplicationApprovalForm()
        for (let item of form) {
            switch (item.tag) {
                case 'RegistryDate':
                    item.value = !stringIsEmpty(data.date) ? data.date : ''
                    item.data = !stringIsEmpty(data.date) ? data.date : ''
                    break
                case 'RegistryTime':
                    item.value = (!stringIsEmpty(data.from) ? data.from : '') + (!stringIsEmpty(data.to) ? (' - ' + data.to) : '')
                    item.data = (!stringIsEmpty(data.from) ? data.from : '') + (!stringIsEmpty(data.to) ? (' - ' + data.to) : '')
                    break
                case 'IncreaseType':
                    item.value = !stringIsEmpty(data.increaseType) ? (data.increaseType === 2 ? (userProfile.LangID === 'VN' ? 'Tăng ca cuối giờ' : 'Is from tom') : (userProfile.LangID === 'VN' ? 'Tăng ca đầu giờ' : 'Is to tom')) : ''
                    item.data = !stringIsEmpty(data.increaseType) ? data.increaseType : ''
                    break
                case 'HourDay':
                    item.value = !stringIsEmpty(data.hourDay) ? data.hourDay : ''
                    item.data = !stringIsEmpty(data.hourDay) ? data.hourDay : ''
                    break
                case 'HourNight':
                    item.value = !stringIsEmpty(data.hourNight) ? data.hourNight : ''
                    item.data = !stringIsEmpty(data.hourNight) ? data.hourNight : ''
                    break
                case 'HourReplace':
                    item.value = !stringIsEmpty(data.hourReplace) ? data.hourReplace : ''
                    item.data = !stringIsEmpty(data.hourReplace) ? data.hourReplace : ''
                    break
                case 'AccumulativeMonthOT':
                    item.value = !stringIsEmpty(data.soGioOTTichLuy_Thang) ? data.soGioOTTichLuy_Thang : ''
                    item.data = !stringIsEmpty(data.soGioOTTichLuy_Thang) ? data.soGioOTTichLuy_Thang : ''
                    break
                case 'AccumulativeYearOT':
                    item.value = !stringIsEmpty(data.soGioOTTichLuy_Nam) ? data.soGioOTTichLuy_Nam : ''
                    item.data = !stringIsEmpty(data.soGioOTTichLuy_Nam) ? data.soGioOTTichLuy_Nam : ''
                    break
                case 'Reason':
                    item.value = !stringIsEmpty(data.note) ? data.note : ''
                    break
                case 'ReasonReject':
                    item.editable = !objectIsNull(data.statusID) ? (data.statusID !== 3 ? true : false) : true
                    break
                default:
                    break
            }
        }
        this.setState({
            form: form,
            textEmployee: (!stringIsEmpty(data.empName) ? data.empName : '') + (!stringIsEmpty(data.empCode) ? (' - ') + data.empCode : ''),
            textDepartment: !stringIsEmpty(data.level2Name) ? data.level2Name : ''
        })
    }
    setDataBusinessTripForm(data) {
        let form = businessTripApplicationApprovalForm()
        for (let item of form) {
            switch (item.tag) {
                case 'RegistryTime':
                    let fd = !stringIsEmpty(data.fromDate) ? data.fromDate : ''
                    let ft = !stringIsEmpty(data.fromTime) ? data.fromTime : ''
                    let td = !stringIsEmpty(data.toDate) ? data.toDate : ''
                    let tt = !stringIsEmpty(data.toTime) ? data.toTime : ''
                    item.value = fd + ' ' + ft + ' - ' + td + ' ' + tt
                    break
                case 'Total':
                    let snct = !objectIsNull(data.soNgayCongTac) ? data.soNgayCongTac : '0.0'
                    let sgct = !objectIsNull(data.soGioCongTac) ? data.soGioCongTac : '0.0'

                    let strDay = parseInt(snct) > 1 ? ' days ' : ' day '
                    let strHour = parseInt(sgct) > 1 ? ' hours' : ' hour'
                    item.value = snct + (userProfile.LangID === 'VN' ? ' ngày ' : strDay) + sgct + (userProfile.LangID === 'VN' ? ' giờ' : strHour)
                    break
                case 'TypeBusinessTrip':
                    item.value = !stringIsEmpty(data.quyDinhCongTacName) ? data.quyDinhCongTacName : ''
                    break
                case 'AttachFile':
                    item.value = !stringIsEmpty(data.attachFile) ? data.attachFile : ''
                    break
                case 'Purpose':
                    item.value = !stringIsEmpty(data.purpose) ? data.purpose : ''
                    break
                case 'Place':
                    item.value = !stringIsEmpty(data.diaDiem) ? data.diaDiem : ''
                    break
                case 'ActionDate':
                    item.value = !stringIsEmpty(data.actionDate) ? data.actionDate : ''
                    break
                case 'ReplacePerson':
                    item.value = !stringIsEmpty(data.replacePersonName) ? data.replacePersonName : ''
                    break
                case 'CashAdvance':
                    item.value = !stringIsEmpty(data.soTienTamUng) ? data.soTienTamUng : ''
                    item.icon = !objectIsNull(data.lsCurrencyTypeID) ? (data.lsCurrencyTypeID === 6 ? 'ic_cur_vnd' : 'ic_cur_usd') : 'ic_cur_vnd'
                    break
                case 'Explanation':
                    item.value = !stringIsEmpty(data.note) ? data.note : ''
                    break
                case 'ReasonReject':
                    item.editable = !objectIsNull(data.statusID) ? (data.statusID !== 3 ? true : false) : true
                    break

                default:
                    break
            }
        }
        this.setState({
            form: form,
            textEmployee: (!stringIsEmpty(data.empName) ? data.empName : '') + (!stringIsEmpty(data.empCode) ? (' - ') + data.empCode : ''),
            textDepartment: !stringIsEmpty(data.level2Name) ? data.level2Name : ''
        })
    }

    setDataLogTMSForm(data) {
        let form = logTMSApplicationApprovalForm()
        for (let item of form) {
            switch (item.tag) {
                case 'RegistryDate':
                    item.value = !stringIsEmpty(data.ngayDK) ? data.ngayDK : ''
                    break
                case 'WorkingSchedule':
                    item.value = !stringIsEmpty(data.caLamViec) ? data.caLamViec : ''
                    break
                case 'WorkingTime':
                    item.value = !stringIsEmpty(data.gioCaLamViec) ? data.gioCaLamViec : ''
                    break
                case 'ActualWorkingTime':
                    item.value = (!stringIsEmpty(data.gioBatDauThucTe) ? data.gioBatDauThucTe : '') + (!stringIsEmpty(data.gioKetThucThucTe) ? (' - ' + data.gioKetThucThucTe) : '')
                    break
                case 'ComingLate':
                    item.value = !stringIsEmpty(data.gioDiTre) ? data.gioDiTre : ''
                    break
                case 'LeavingSoon':
                    item.value = !stringIsEmpty(data.gioVeSom) ? data.gioVeSom : ''
                    break
                case 'Note':
                    item.value = !stringIsEmpty(data.ghiChu) ? data.ghiChu : ''
                    break
                case 'RegistryTime':
                    item.value = !stringIsEmpty(data.loaiDangKy) ? data.loaiDangKy : ''
                    break
                case 'Reason':
                    item.value = !stringIsEmpty(data.lyDo) ? data.lyDo : ''
                    break
                case 'ReasonReject':
                    item.editable = !objectIsNull(data.statusID) ? (data.statusID !== 3 ? true : false) : true
                    break

                default:
                    break
            }
        }
        this.setState({
            form: form,
            textEmployee: (!stringIsEmpty(data.empName) ? data.empName : '') + (!stringIsEmpty(data.empCode) ? (' - ') + data.empCode : ''),
            textDepartment: ''
        })
    }
    componentDidUpdate(prevProps, prevState) {
        const {
            dataGetDetail,
            dataGetDetailOverTime,
            dataGetDetailBusinessTrip,
            dataDetailLogTMSApplication,
            dataApplicationApproval,
            dataDownloadFile,


            errorApplicationApproval,
            errorDownloadFile,
            //leave
            dataGetDays,

            errorGetDetail,
            errorGetDetailBusinessTrip,
            errorDetailLogTMSApplication,
            errorGetDetailOverTime,
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

        if (errorDetailLogTMSApplication !== prevProps.errorDetailLogTMSApplication) {
            if (!stringIsEmpty(errorDetailLogTMSApplication)) {
                // console.log('errorDetailLogTMSApplication: ', errorDetailLogTMSApplication)
                if (errorDetailLogTMSApplication === errorConnectServer.errorData) {
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

        if (errorGetDetailOverTime !== prevProps.errorGetDetailOverTime) {
            if (!stringIsEmpty(errorGetDetailOverTime)) {
                // console.log('errorGetDetailOverTime: ', errorGetDetailOverTime)
                if (errorGetDetailOverTime === errorConnectServer.errorData) {
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
        // console.log('dataGetsdayssssS: zz: ', dataGetDays)
        if (dataDownloadFile !== prevProps.dataDownloadFile) {
            if (!objectIsNull(dataDownloadFile)) {

                let fileName = ''
                let fileBase64 = ''
                for (let item of this.state.form) {
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

                // this.props.navigation.navigate('ImageView', { imageBase64: !stringIsEmpty(dataDownloadFile.fileContent) ? dataDownloadFile.fileContent : '' })
            }
        }

        if (dataApplicationApproval !== prevProps.dataApplicationApproval) {
            if (!stringIsEmpty(dataApplicationApproval)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', dataApplicationApproval, [{
                    text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                    onPress: () => {
                        this.props.resetApplicationApprovalAction()
                        this.props.navigation.goBack()
                    }
                }])
            }
        }

        if (errorDownloadFile !== prevProps.errorDownloadFile) {
            if (!stringIsEmpty(errorDownloadFile)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', errorDownloadFile, [{
                    text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel',
                    onPress: () => {
                        // this.props.resetApplicationApprovalAction()
                    }
                }])
            }
        }

        if (errorApplicationApproval !== prevProps.errorApplicationApproval) {
            if (!stringIsEmpty(errorApplicationApproval)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', errorApplicationApproval, [{
                    text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                    onPress: () => {
                        this.props.resetApplicationApprovalAction()
                    }
                }])
            }
        }

        if (dataGetDetail !== prevProps.dataGetDetail) {
            if (!objectIsNull(dataGetDetail)) {
                this.setDataLeaveForm(dataGetDetail)
            }
        }

        if (dataGetDetailOverTime !== prevProps.dataGetDetailOverTime) {
            if (!objectIsNull(dataGetDetailOverTime)) {
                this.setDataOverTimeForm(dataGetDetailOverTime)
            }
        }

        if (dataGetDetailBusinessTrip !== prevProps.dataGetDetailBusinessTrip) {
            if (!objectIsNull(dataGetDetailBusinessTrip)) {
                this.setDataBusinessTripForm(dataGetDetailBusinessTrip)
            }
        }
        if (dataDetailLogTMSApplication !== prevProps.dataDetailLogTMSApplication) {
            if (!objectIsNull(dataDetailLogTMSApplication)) {
                this.setDataLogTMSForm(dataDetailLogTMSApplication)
            }
        }

    }

    onPressDeleteApplication = () => {
        let idApplication = this.props.navigation.getParam('idApplication')
        let typeApplication = this.props.navigation.getParam('typeApplication')
        if (typeApplication === 1) {
            // Duyệt đơn nghỉ phép
            let inputApproveLeaveApplication = {
                ID: !stringIsEmpty(idApplication) ? idApplication : '',
                Comment: '',
                Approve: '0'
            }
            let flagAA = true
            for (let item of this.state.form) {
                if (item.tag === 'ReasonReject') {
                    if (!stringIsEmpty(item.value)) {
                        inputApproveLeaveApplication.Comment = item.value
                        break
                    } else {
                        flagAA = false
                        Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', 'Bạn chưa nhập lý do từ chối. ', [{ text: 'Đóng' }])
                        break
                    }

                }
            }
            if (flagAA) {
                // console.log('DeleteLeaveApplication : ', inputApproveLeaveApplication)
                this.props.applicationApprovalAction({
                    type: 1,
                    DataItem: [inputApproveLeaveApplication]
                })
            }

        } else if (typeApplication === 2) {
            // Duyệt đơn đi công tác
            let inputApproveBusinessTripApplication = {
                ID: !stringIsEmpty(idApplication) ? idApplication : '',
                Comment: '',
                Approve: '0'
            }
            let flagAB = true
            for (let item of this.state.form) {
                if (item.tag === 'ReasonReject') {
                    if (!stringIsEmpty(item.value)) {
                        inputApproveBusinessTripApplication.Comment = item.value
                        break
                    } else {
                        flagAB = false
                        Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', 'Bạn chưa nhập lý do từ chối. ', [{ text: 'Đóng' }])
                        break
                    }

                }
            }
            if (flagAB) {
                // console.log('DeleteBusinessTripApplication : ', inputApproveBusinessTripApplication)
                this.props.applicationApprovalAction({
                    type: 4,
                    DataItem: [inputApproveBusinessTripApplication]
                })
            }

        } else if (typeApplication === 3) {
            // Duyệt đơn làm ngoài giờ
            let inputApproveOverTimeApplication = {
                ID: !stringIsEmpty(idApplication) ? idApplication : '',
                Comment: '',
                Approve: '0'
            }
            let flagAO = true
            for (let item of this.state.form) {
                if (item.tag === 'ReasonReject') {
                    if (!stringIsEmpty(item.value)) {
                        inputApproveOverTimeApplication.Comment = item.value
                        break
                    } else {
                        flagAO = false
                        Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', 'Bạn chưa nhập lý do từ chối. ', [{ text: 'Đóng' }])
                        break
                    }

                }
            }
            if (flagAO) {
                // console.log('DeleteOverTimeApplication : ', inputApproveOverTimeApplication)
                this.props.applicationApprovalAction({
                    type: 2,
                    DataItem: [inputApproveOverTimeApplication]
                })
            }
        } else if (typeApplication === 4) {
            // Duyệt đơn xác nhận quẹt thẻ
            let inputApproveLogTMSApplication = {
                ID: !stringIsEmpty(idApplication) ? idApplication : '',
                Comment: '',
                Approve: '0'
            }
            let flagAL = true
            for (let item of this.state.form) {
                if (item.tag === 'ReasonReject') {
                    if (!stringIsEmpty(item.value)) {
                        inputApproveLogTMSApplication.Comment = item.value
                    } else {
                        flagAL = false
                        Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', 'Bạn chưa nhập lý do từ chối. ', [{ text: 'Đóng' }])
                        break
                    }

                }
            }
            if (flagAL) {
                // console.log('DeleteLogTMSApplication : ', inputApproveLogTMSApplication)
                this.props.applicationApprovalAction({
                    type: 3,
                    DataItem: [inputApproveLogTMSApplication]
                })
            }

        }
    }
    onPressSubmitApplication = () => {
        let idApplication = this.props.navigation.getParam('idApplication')
        let typeApplication = this.props.navigation.getParam('typeApplication')
        if (typeApplication === 1) {
            // Duyệt đơn nghỉ phép
            let inputApproveLeaveApplication = {
                ID: !stringIsEmpty(idApplication) ? idApplication : '',
                Comment: '',
                Approve: '1'
            }
            // console.log('SubmitApprovalLeave: ', inputApproveLeaveApplication)
            this.props.applicationApprovalAction({
                type: 1,
                DataItem: [inputApproveLeaveApplication]
            })

        } else if (typeApplication === 2) {
            // Duyệt đơn đi công tác
            let inputApproveBusinessTripApplication = {
                ID: !stringIsEmpty(idApplication) ? idApplication : '',
                Comment: '',
                Approve: '1'
            }
            // console.log('SubmitApprovalBusinessTrip: ', inputApproveBusinessTripApplication)
            this.props.applicationApprovalAction({
                type: 4,
                DataItem: [inputApproveBusinessTripApplication]
            })
        } else if (typeApplication === 3) {
            // Duyệt đơn làm ngoài giờ
            let inputApproveOverTimeApplication = {
                ID: !stringIsEmpty(idApplication) ? idApplication : '',
                Comment: '',
                Approve: '1'
            }
            // console.log('SubmitApprovalOverTime: ', inputApproveOverTimeApplication)
            this.props.applicationApprovalAction({
                type: 2,
                DataItem: [inputApproveOverTimeApplication]
            })
        } else if (typeApplication === 4) {
            // Duyệt đơn xác nhận quẹt thẻ
            let inputApproveLogTMSApplication = {
                ID: !stringIsEmpty(idApplication) ? idApplication : '',
                Comment: '',
                Approve: '1'
            }
            // console.log('SubmitApprovalLogTMS: ', inputApproveLogTMSApplication)
            this.props.applicationApprovalAction({
                type: 3,
                DataItem: [inputApproveLogTMSApplication]
            })
        }
    }
    reloadDataDetailApplication() {
        let idApplication = this.props.navigation.getParam('idApplication')
        let typeApplication = this.props.navigation.getParam('typeApplication')
        if (typeApplication === 1) {
            // Chi tiết đơn nghỉ phép cần duyệt
            if (!stringIsEmpty(idApplication))
                this.props.getDetailLeaveApplicationAction([{ ID: idApplication }])

        } else if (typeApplication === 2) {
            // Chi tiết đơn đi công tác cần duyệt
            if (!stringIsEmpty(idApplication))
                this.props.getDetailBusinessTripApplicationAction([{ ID: idApplication }])

        } else if (typeApplication === 3) {
            // Chi tiết đơn làm ngoài giờ cần duyệt
            if (!stringIsEmpty(idApplication))
                this.props.getDetailOverTimeApplicationAction([{ ID: idApplication }])

        } else if (typeApplication === 4) {
            // Chi tiết đơn xác nhân quẹt thẻ cần duyệt
            if (!stringIsEmpty(idApplication))
                this.props.getDetailLogTMSApplicationAction([{ ID: idApplication }])
        }
    }
    onChangeVisiblePopup(visible) {
        this.setState({
            isShowModal: visible
        })
    }
    showErrorView() {
        const {
            errorGetDetail,
            errorGetDetailBusinessTrip,
            errorDetailLogTMSApplication,
            errorGetDetailOverTime,
        } = this.props
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={getImage('img_empty_data')} style={{ width: Sizes.s340, height: Sizes.s340 }} />
                <Text style={{ fontSize: Sizes.h30, }}>
                    {(!stringIsEmpty(errorGetDetail) && errorGetDetail !== errorConnectServer.errorData)
                        ? errorGetDetail
                        : (!stringIsEmpty(errorGetDetailBusinessTrip) && errorGetDetailBusinessTrip !== errorConnectServer.errorData) ? errorGetDetailBusinessTrip
                            : (!stringIsEmpty(errorDetailLogTMSApplication) && errorDetailLogTMSApplication !== errorConnectServer.errorData) ? errorDetailLogTMSApplication :
                                (!stringIsEmpty(errorGetDetailOverTime) && errorGetDetailOverTime !== errorConnectServer.errorData) ? errorGetDetailOverTime : ''
                    }
                </Text>
                <CustomButton type={'reload'} title={userProfile.LangID === 'VN' ? appStrS.vn.button.reload : appStrS.en.button.reload} onPress={() => { this.reloadDataDetailApplication() }} />
            </View>
        )
    }
    onPressGoBackScreen() {
        // let idApplication = this.props.navigation.getParam('idApplication')
        let typeApplication = this.props.navigation.getParam('typeApplication')
        if (typeApplication === 1) {
            this.props.resetGetDetailLeaveApplicationAction()
        } else if (typeApplication === 2) {
            this.props.resetGetDetailBusinessTripApplicationAction()
        } else if (typeApplication === 3) {
            this.props.resetGetDetailOverTimeApplicationAction()
        } else if (typeApplication === 4) {
            this.props.resetGetDetailLogTMSApplicationAction()
        }
        this.props.navigation.goBack()
    }
    render() {
        const { form, textEmployee, textDepartment, isShowModal } = this.state
        const {
            dataGetDetail,
            dataGetDetailOverTime,
            dataGetDetailBusinessTrip,
            dataDetailLogTMSApplication,

            errorGetDetail,
            errorGetDetailBusinessTrip,
            errorDetailLogTMSApplication,
            errorGetDetailOverTime,

            fetchingApplicationApproval,
            fetchingGetDetail,
            fetchingGetDetailBusinessTrip,
            fetchingDetailLogTMSApplication,
            fetchingGetDetailOverTime,
            fetchingDownloadFile,

            //getDays
            fetchingGetDays,
            dataGetDays,
            errorGetDays
        } = this.props
        let typeApplication = this.props.navigation.getParam('typeApplication')
        // console.log('dataGetDays: ', dataGetDays)
        // console.log('dataGetDays: ', dataGetDays)
        // console.log('dataGetDays: ', dataGetDays)
        // console.log('dataGetDetailOverTime ----------: ', dataGetDetailOverTime)
        return (
            <SafeAreaView style={{ flex: 1, }}>
                {/* {(fetchingDetailLogTMSApplication || fetchingLogType) && <Loading />} */}
                <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS === 'android' ? null : 'padding'}>
                    {(
                        fetchingDownloadFile ||
                        fetchingApplicationApproval ||
                        fetchingGetDetail ||
                        fetchingGetDetailBusinessTrip ||
                        fetchingDetailLogTMSApplication ||
                        fetchingGetDetailOverTime
                    ) && <Loading />}
                    {/* <View style={{width: 50, height: 50, backgroundColor: 'red'}}></View> */}
                    <CustomHeader
                        typeIconLeft={'back'}
                        title={typeApplication === 1 ? (userProfile.LangID === 'VN' ? 'Chi tiết đơn đăng ký ngày nghỉ' : 'Detail leave application')
                            : typeApplication === 2 ? (userProfile.LangID === 'VN' ? 'Chi tiết đơn công tác' : 'Detail business trip application')
                                : typeApplication === 3 ? (userProfile.LangID === 'VN' ? 'Chi tiết đơn ngoài giờ' : 'Detail over time application')
                                    : typeApplication === 4 ? (userProfile.LangID === 'VN' ? 'Chi tiết đơn đăng ký bổ sung giờ công' : 'Detail log TMS application')
                                        : (userProfile.LangID === 'VN' ? 'Chi tiết đơn' : 'Detail application')}
                        onPressLeft={() => {
                            // this.props.navigation.goBack()
                            this.onPressGoBackScreen()
                        }}
                        typeIconRight={
                            (
                                (!objectIsNull(dataGetDetail) && dataGetDetail.statusID !== 3)
                                || (!objectIsNull(dataGetDetailOverTime) && dataGetDetailOverTime.statusID !== 3)
                                || (!objectIsNull(dataGetDetailBusinessTrip) && dataGetDetailBusinessTrip.statusID !== 3)
                                || (!objectIsNull(dataDetailLogTMSApplication) && dataDetailLogTMSApplication.statusID !== 3)
                            ) ?
                                null
                                :
                                'branch'
                        }
                        onPressRight={() => {

                            if (!objectIsNull(dataGetDetail) && dataGetDetail.statusID === 3) {
                                this.props.navigation.navigate('ApplicationHistoryContainer', {
                                    idApplication: dataGetDetail.leaveRecordHourID,
                                    typeApplication: 1
                                })
                            } else if (!objectIsNull(dataGetDetailOverTime) && dataGetDetailOverTime.statusID === 3) {
                                this.props.navigation.navigate('ApplicationHistoryContainer', {
                                    idApplication: dataGetDetailOverTime.recordID,
                                    typeApplication: 2
                                })
                            } else if (!objectIsNull(dataGetDetailBusinessTrip) && dataGetDetailBusinessTrip.statusID === 3) {
                                this.props.navigation.navigate('ApplicationHistoryContainer', {
                                    idApplication: dataGetDetailBusinessTrip.congTacID,
                                    typeApplication: 4
                                })
                            } else if (!objectIsNull(dataDetailLogTMSApplication) && dataDetailLogTMSApplication.statusID === 3) {
                                this.props.navigation.navigate('ApplicationHistoryContainer', {
                                    idApplication: dataDetailLogTMSApplication.tsdkXacNhanQTOnline2ID,
                                    typeApplication: 3
                                })
                            }
                            // (
                            //     (!objectIsNull(dataGetDetail) && dataGetDetail.statusID !== 3)
                            //     || (!objectIsNull(dataGetDetailOverTime) && dataGetDetailOverTime.statusID !== 3)
                            //     || (!objectIsNull(dataGetDetailBusinessTrip) && dataGetDetailBusinessTrip.statusID !== 3)
                            //     || (!objectIsNull(dataDetailLogTMSApplication) && dataDetailLogTMSApplication.statusID !== 3)
                            // )
                            // if (!objectIsNull(this.state.oldLeaveApplication)) {
                            //     this.props.navigation.navigate('ApplicationHistoryContainer', {
                            //         idApplication: this.state.oldLeaveApplication.leaveRecordHourID,
                            //         typeApplication: 1
                            //     })
                            // }
                        }}
                    />
                    <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: Sizes.s20 }}>
                        <View style={styles.name}>
                            <Text style={styles.textName}>
                                {/* {!objectIsNull(dataGetDetailOverTime) ? (dataGetDetailOverTime.empName + ' - ' + dataGetDetailOverTime.empCode) : ''} */}
                                {textEmployee}
                            </Text>
                            <Text style={styles.textRoom}>
                                {/* {!objectIsNull(dataGetDetailOverTime) ? (dataGetDetailOverTime.level2Name) : ''} */}
                                {textDepartment}
                            </Text>
                            {!stringIsEmpty(textEmployee) &&
                                <View style={styles.line}>
                                </View>
                            }
                        </View>
                        {(
                            !stringIsEmpty(errorGetDetail) ||
                            !stringIsEmpty(errorGetDetailBusinessTrip) ||
                            !stringIsEmpty(errorDetailLogTMSApplication) ||
                            !stringIsEmpty(errorGetDetailOverTime)) ?
                            // errorGetDetail,
                            // errorGetDetailBusinessTrip,
                            // errorDetailLogTMSApplication,
                            // errorGetDetailOverTime,
                            this.showErrorView()
                            :
                            <FormDetail ref='form' form={form} />
                        }

                        {(!arrayIsEmpty(form)
                            &&
                            (
                                stringIsEmpty(errorGetDetail) &&
                                stringIsEmpty(errorGetDetailBusinessTrip) &&
                                stringIsEmpty(errorDetailLogTMSApplication) &&
                                stringIsEmpty(errorGetDetailOverTime))
                            && (
                                (!objectIsNull(dataGetDetail) && dataGetDetail.statusID !== 3 && dataGetDetail.statusID !== 4 && typeApplication === 1)
                                || (!objectIsNull(dataGetDetailOverTime) && dataGetDetailOverTime.statusID !== 3 && dataGetDetailOverTime.statusID !== 4 && typeApplication === 3)
                                || (!objectIsNull(dataGetDetailBusinessTrip) && dataGetDetailBusinessTrip.statusID !== 3 && dataGetDetailBusinessTrip.statusID !== 4 && typeApplication === 2)
                                || (!objectIsNull(dataDetailLogTMSApplication) && dataDetailLogTMSApplication.statusID !== 3 && dataDetailLogTMSApplication.statusID !== 4 && typeApplication === 4)
                            )
                        ) ?
                            <View style={{ width: '100%', flexDirection: 'row', }}>
                                <View style={{ flex: 1, paddingRight: Sizes.h20 }}>
                                    <CustomButton onPress={this.onPressDeleteApplication} type='close' title={userProfile.LangID === 'VN' ? appStrS.vn.button.reject : appStrS.en.button.reject} />
                                </View>
                                <View style={{ flex: 1, paddingLeft: Sizes.h20 }}>
                                    <CustomButton onPress={this.onPressSubmitApplication} type='send' title={userProfile.LangID === 'VN' ? appStrS.vn.button.approve : appStrS.en.button.approve} />
                                </View>
                            </View>
                            :
                            (
                                null
                            )
                        }
                    </View>
                </KeyboardAvoidingView>
                <Modal
                    transparent={true}
                    onRequestClose={() => {
                        this.onChangeVisiblePopup(false)
                    }}
                    hardwareAccelerated={true}
                    visible={isShowModal}
                    animationType='fade'>
                    <View
                        // onPress={() => {
                        //     this.onChangeVisiblePopup(false)
                        // }}
                        style={styles.bodyModal}>
                        <View style={{}}>
                            <View style={styles.contentDetailLeave}>
                                <View style={{ paddingHorizontal: Sizes.s40, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around', }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.onChangeVisiblePopup(false)
                                        }}
                                        style={{ paddingVertical: Sizes.s10, paddingHorizontal: Sizes.s20 }}>
                                        <Icon name={'times'} size={Sizes.h36} color={'#2F2E37'} />
                                    </TouchableOpacity>
                                    <Text style={styles.titleDetailLeave}>{userProfile.LangID === 'VN' ? appStrS.vn.leaveApplication.titleLeaveDetails : appStrS.en.leaveApplication.titleLeaveDetails}</Text>

                                    {/* {(!fetchingGetDays &&
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
                                    } */}

                                </View>
                                <View style={{ height: 1, width: '100%', backgroundColor: '#EBEDF0' }}></View>
                                {/* {errorSaveDays !== undefined && isShowErrorSaveDays && <Text style={styles.textErrorSaveDays}>{errorSaveDays}</Text>} */}
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
                                                    // this.showDetailLeave()
                                                }} />
                                            </View>
                                        )
                                        :
                                        (
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                style={{ flex: 1, flexGrow: 1 }}
                                                data={dataGetDays}
                                                keyExtractor={item => item.dateID}
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
                                                        })} resetErrorSaveDays={() => {
                                                            // this.setState({ isShowErrorSaveDays: false })
                                                        }} />
                                                    )
                                                }}
                                            />
                                        )
                                }
                            </View>

                        </View>

                    </View>
                </Modal>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    name: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginVertical: Sizes.s20,
        paddingTop: Sizes.s20

    },
    textName: {
        fontSize: Sizes.h30,
        color: 'black'
    },
    textRoom: {
        fontSize: Sizes.h28,
        color: 'grey'
    },
    line: {
        width: '80%',
        alignSelf: 'center',
        height: 1,
        backgroundColor: 'silver',
        marginTop: Sizes.s20

    },


    //modal

    bodyModal: {
        flex: 1,
        backgroundColor: '#00000066',
        justifyContent: 'flex-end',
        alignItems: 'center',
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
        height: Dimensions.get('window').height / 5 * 4,
        marginHorizontal: Sizes.s10,
        borderRadius: Sizes.s20,
        backgroundColor: 'white',
        paddingBottom: Sizes.s45,
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
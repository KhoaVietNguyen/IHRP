


import React from 'react';
import { Button, Image, View, Text, Alert, Modal, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import {
    logTMSApplication
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
            _logTMSApplication: logTMSApplication(),
            statusID: undefined,
            tsdkID: undefined,
            approver: undefined,
            isShowKeyboard: false,
        }
    }

    calculateOverTime = () => {

    }
    setFunctionForm() {
        let form = this.state._logTMSApplication
        for (let item of form) {
            if (item.control === 'textedit') {
                item.onPressFocus = this._keyboardDidShow
                item.onPressBlur = this._keyboardDidHide
            }
        }
        this.setState({
            _logTMSApplication: form
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
    onReadFile = () => {
        const { } = this.props
        let fileName = ''
        let fileBase64 = ''
        for (let item of this.state._logTMSApplication) {
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
        for (let item of this.state._logTMSApplication) {
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
    componentDidUpdate(prevProps, prevState) {
        const {
            dataDetailLogTMSApplication,
            dataLogType,
            dataWithDrawLogTMSApplication,
            dataDeleteLogTMSApplication,
            dataSaveLogTMSApplication,

            dataAttachFile,
            dataDownloadFile,
            //error
            errorWithDrawLogTMSApplication,
            errorDeleteLogTMSApplication,
            errorSaveLogTMSApplication,
            errorAttachFile,
            errorDownloadFile,

            errorDetailLogTMSApplication,

        } = this.props


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

        if (dataDownloadFile !== prevProps.dataDownloadFile) {
            if (!objectIsNull(dataDownloadFile)) {
                let fileName = ''
                let fileBase64 = ''
                for (let item of this.state._logTMSApplication) {
                    if (item.tag === 'AttachFile') {
                        fileName = item.value
                        // fileBase64 = item.fileBase64
                        item.fileBase64 = dataDownloadFile.fileContent
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
                        // this.props.navigation.navigate('ImageView', { imageBase64: fileBase64 })
                    }else{
                        this.props.navigation.navigate('FileWebView', { imageBase64: !stringIsEmpty(dataDownloadFile.fileContent) ? dataDownloadFile.fileContent : '' })
                    }
                }
                // for (let val of this.state._logTMSApplication) {
                //     if (val.tag === 'AttachFile') {
                //         val.fileBase64 = dataDownloadFile.fileContent
                //     }
                // }
                
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

        if (dataAttachFile !== prevProps.dataAttachFile) {
            if (!stringIsEmpty(dataAttachFile)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', dataSaveLogTMSApplication + '', [{
                    text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                    onPress: () => {
                        this.props.navigation.goBack()
                    }
                }])
            }
        }
        if (dataSaveLogTMSApplication !== prevProps.dataSaveLogTMSApplication) {
            if (!stringIsEmpty(dataSaveLogTMSApplication)) {

                for (let item of this.state._logTMSApplication) {
                    if (item.tag === 'AttachFile') {
                        if (!stringIsEmpty(item.value) && !stringIsEmpty(item.fileBase64)) {
                            let obj = {
                                FileName: item.value,
                                FileContent: item.fileBase64
                            }
                            this.props.attachFileApplicationAction([obj])
                        } else {
                            Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', dataSaveLogTMSApplication + '', [{
                                text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                                onPress: () => {
                                    this.props.navigation.goBack()
                                }
                            }])
                        }
                        break

                    }
                }
                // this.props.attachFileApplicationAction()
                // Alert.alert('Thông báo', dataSaveLogTMSApplication, [{
                //     text: 'Xác nhận',
                //     onPress: () => {
                //         this.props.navigation.goBack()
                //     }
                // }])
            }
        }

        if (dataWithDrawLogTMSApplication !== prevProps.dataWithDrawLogTMSApplication) {
            if (!stringIsEmpty(dataWithDrawLogTMSApplication)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', dataWithDrawLogTMSApplication + '', [{
                    text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                    onPress: () => {
                        this.props.navigation.goBack()
                    }
                }])
            }
        }
        if (dataDeleteLogTMSApplication !== prevProps.dataDeleteLogTMSApplication) {
            if (!stringIsEmpty(dataDeleteLogTMSApplication)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', dataDeleteLogTMSApplication + '', [{
                    text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel',
                    onPress: () => {
                        this.props.navigation.goBack()
                    }
                }])
            }
        }

        if (errorWithDrawLogTMSApplication !== prevProps.errorWithDrawLogTMSApplication) {
            if (!stringIsEmpty(errorWithDrawLogTMSApplication)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', errorWithDrawLogTMSApplication + '', [{
                    text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel',
                    onPress: () => {

                    }
                }])
            }
        }
        if (errorDeleteLogTMSApplication !== prevProps.errorDeleteLogTMSApplication) {
            if (!stringIsEmpty(errorDeleteLogTMSApplication)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', errorDeleteLogTMSApplication + '', [{
                    text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel',
                    onPress: () => {

                    }
                }])
            }
        }
        if (errorSaveLogTMSApplication !== prevProps.errorSaveLogTMSApplication) {
            if (!stringIsEmpty(errorSaveLogTMSApplication)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', errorSaveLogTMSApplication + '', [{
                    text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel',
                    onPress: () => {

                    }
                }])
            }
        }
        if (errorAttachFile !== prevProps.errorAttachFile) {
            if (!stringIsEmpty(errorAttachFile)) {
                Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', errorAttachFile + '', [{
                    text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel',
                    onPress: () => {

                    }
                }])
            }
        }
        if (dataLogType !== prevProps.dataLogType) {
            if (!arrayIsEmpty(dataLogType)) {
                let data = dataLogType.map((value) => {
                    return {
                        id: value.id,
                        label: value.name,
                        value: value,
                        type: '',
                        isSelect: false
                    }
                })
                let form = this.state._logTMSApplication
                for (let item of form) {
                    if (item.tag === 'ApplicationType') {
                        item.items = data
                        break
                    }
                }

                this.setState({
                    _logTMSApplication: form
                })

            }
        }


        if (dataDetailLogTMSApplication !== prevProps.dataDetailLogTMSApplication) {
            if (!objectIsNull(dataDetailLogTMSApplication)) {
                let form = this.state._logTMSApplication
                let statusID = dataDetailLogTMSApplication.statusID
                const typeApplication = this.props.navigation.getParam('typeApplication')
                for (let item of form) {
                    if (item.tag === 'Date') {
                        item.value = dataDetailLogTMSApplication.ngayDK
                    } else if (item.tag === 'Note') {
                        item.value = !stringIsEmpty(dataDetailLogTMSApplication.ghiChu) ? dataDetailLogTMSApplication.ghiChu : ''
                        item.editable = ((statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true)
                    } else if (item.tag === 'ApplicationType') {
                        item.value = !stringIsEmpty(dataDetailLogTMSApplication.loaiDangKy) ? dataDetailLogTMSApplication.loaiDangKy : ''
                        item.data = dataDetailLogTMSApplication.loaiDangKyID
                        item.editable = (statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true
                        item.selectedItem = {
                            id: dataDetailLogTMSApplication.loaiDangKyID,
                            label: dataDetailLogTMSApplication.loaiDangKy,
                            value: {
                                id: dataDetailLogTMSApplication.loaiDangKyID,
                                name: dataDetailLogTMSApplication.loaiDangKy,
                            },
                            type: '',
                            isSelect: false
                        }
                    } else if (item.tag === 'Reason') {
                        item.value = !stringIsEmpty(dataDetailLogTMSApplication.lyDo) ? dataDetailLogTMSApplication.lyDo : ''
                        item.editable = ((statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true)
                        item.onPressFocus = this._keyboardDidShow
                        item.onPressBlur = this._keyboardDidHide
                    } else if (item.tag === 'AttachFile') {
                        item.value = !stringIsEmpty(dataDetailLogTMSApplication.attachFile) ? dataDetailLogTMSApplication.attachFile : ''
                        item.editable = ((statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true)
                        item.onPressViewFile = this.onViewFile
                        item.onPressReadFile = this.onReadFile
                    } else if (item.tag === 'StatusApplication') {
                        item.value = !stringIsEmpty(dataDetailLogTMSApplication.status) ? dataDetailLogTMSApplication.status : ''
                        item.editable = ((statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true)
                        // item.visible = ((statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? true : false)
                        item.visible = true
                    } else if (item.tag === 'Approver') {
                        item.value =
                            (!stringIsEmpty(dataDetailLogTMSApplication.empName_NguoiPheDuyet) ? dataDetailLogTMSApplication.empName_NguoiPheDuyet : '') +
                            (!stringIsEmpty(dataDetailLogTMSApplication.empCode_NguoiPheDuyet) ? ' - ' + dataDetailLogTMSApplication.empCode_NguoiPheDuyet : '')
                        item.data = dataDetailLogTMSApplication.account_NguoiPheDuyet
                        item.editable = ((statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true)
                    } else if (item.control === 'twoTimePicker') {
                        item.value1 = dataDetailLogTMSApplication.tuGio
                        item.value2 = dataDetailLogTMSApplication.denGio
                        item.editable = ((statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true)
                    } else if (item.control === 'twoTextForm') {
                        if (item.tag1 === 'WorkingSchedule') {
                            item.value1 = !stringIsEmpty(dataDetailLogTMSApplication.caLamViec) ? dataDetailLogTMSApplication.caLamViec : ''
                        } else if (item.tag1 === 'ActualStartingTime') {
                            item.value1 = !stringIsEmpty(dataDetailLogTMSApplication.gioBatDauThucTe) ? dataDetailLogTMSApplication.gioBatDauThucTe : ''
                        } else if (item.tag1 === 'ComingLate') {
                            item.value1 = !stringIsEmpty(dataDetailLogTMSApplication.gioDiTre) ? dataDetailLogTMSApplication.gioDiTre : ''
                        }

                        if (item.tag2 === 'WorkingTime') {
                            item.value2 = !stringIsEmpty(dataDetailLogTMSApplication.gioCaLamViec) ? dataDetailLogTMSApplication.gioCaLamViec : ''
                        } else if (item.tag2 === 'ActualEndingTime') {
                            item.value2 = !stringIsEmpty(dataDetailLogTMSApplication.gioKetThucThucTe) ? dataDetailLogTMSApplication.gioKetThucThucTe : ''
                        } else if (item.tag2 === 'LeavingSoon') {
                            item.value2 = !stringIsEmpty(dataDetailLogTMSApplication.gioVeSom) ? dataDetailLogTMSApplication.gioVeSom : ''
                        }
                        item.editable = ((statusID == '2' || statusID == '3' || typeApplication === 'approveApplication') ? false : true)
                    }
                }
                // console.log('newFormmmmmm: ', form)
                this.setState({
                    _logTMSApplication: form,
                    statusID: statusID,
                    tsdkID: dataDetailLogTMSApplication.tsdkXacNhanQTOnline2ID,
                    approver: dataDetailLogTMSApplication.account_NguoiPheDuyet,
                })

            }
        }
    }

    onPressSubmitApplication = () => {
        let isEmpty = false
        if (!objectIsNull(this.refs.form.checkEmpty)) {
            isEmpty = this.refs.form.checkEmpty()
        }
        if (!isEmpty) {
            let obj = {
                ID: !objectIsNull(this.state.tsdkID) ? this.state.tsdkID : '',
                SourceID: '',
                DateID: '',
                FromTime: '',
                ToTime: '',
                Approver: '',
                AttachFile: '',
                Reason: '',
                Note: '',
                Status: '1',
            }
            for (let item of this.state._logTMSApplication) {
                if (item.tag === 'Date') {
                    obj.DateID = item.value
                } else if (item.tag === 'Note') {
                    obj.Note = item.value
                } else if (item.tag === 'ApplicationType') {
                    obj.SourceID = item.data
                } else if (item.tag === 'Reason') {
                    obj.Reason = item.value
                } else if (item.tag === 'AttachFile') {
                    obj.AttachFile = item.value
                } else if (item.tag === 'Approver') {
                    obj.Approver = item.data
                }

                else if (item.control === 'twoTimePicker') {
                    obj.FromTime = item.value1
                    obj.ToTime = item.value2
                }
            }
            // console.log('sendddddddAplication: ', obj)
            this.props.saveLogTMSApplicationAction([obj])
        } else {

        }

    }
    onPressRollBackApplication = () => {
        Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', userProfile.LangID === 'VN' ? 'Bạn chắc chắn muốn lấy lại đơn này ? ' : 'You definitely want to get this application back', [
            {
                text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                onPress: () => {
                    this.props.withDrawLogTMSApplicationAction([{ ID: this.state.tsdkID, Approver: this.state.approver }])
                }
            },
            {
                text: userProfile.LangID === 'VN' ? 'Hủy' : 'Cancel',
                onPress: () => {

                }
            }
        ])
    }
    onPressDeleteApplication = () => {
        Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', userProfile.LangID === 'VN' ? 'Bạn chắc chắn muốn xóa đơn này ? ' : 'You definitely want to delete this application ?', [
            {
                text: userProfile.LangID === 'VN' ? 'Xác nhận' : 'Confirm',
                onPress: () => {
                    this.props.deleteLogTMSApplicationAction([{ ID: this.state.tsdkID }])
                }
            },
            {
                text: userProfile.LangID === 'VN' ? 'Hủy' : 'Cancel',
                onPress: () => {

                }
            }
        ])

    }
    showError() {
        const {
            errorDetailLogTMSApplication,
            // errorLogType
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
                    {(!stringIsEmpty(errorDetailLogTMSApplication) && errorDetailLogTMSApplication !== errorConnectServer.errorData) ? errorDetailLogTMSApplication
                        // : !stringIsEmpty(errorLogType) ? errorLogType 
                        : (userProfile.LangID === 'VN' ? 'Không có dữ liệu để hiển thị. Vui lòng thử lại' : 'There is no data to display. Please try again !')
                    }
                </Text>
                <CustomButton onPress={() => {
                    if (!stringIsEmpty(errorDetailLogTMSApplication)) {
                        let param = this.props.navigation.getParam('item')
                        if (!objectIsNull(param)) {
                            let obj = {
                                ID: param.empID,
                                DateID: param.dateID,
                            }
                            this.props.getDetailLogTMSApplicationAction([obj])
                        }
                    }
                    // if(!stringIsEmpty(errorLogType)){
                    //     this.props.getLogTypeLogTMSApplicationAction()
                    // }

                }} title={userProfile.LangID === 'VN' ? 'Thử lại' : 'Reload'} type='reload' />
            </View>
        )
    }
    render() {
        const {
            fetchingDetailLogTMSApplication,
            fetchingLogType,
            fetchingWithDrawLogTMSApplication,
            fetchingSaveLogTMSApplication,
            fetchingDownloadFile,

            errorDetailLogTMSApplication,

        } = this.props
        const { statusID, isShowKeyboard } = this.state
        const typeApplication = this.props.navigation.getParam('typeApplication')
        return (
            <SafeAreaView style={{ flex: 1, }}>
                {(fetchingDownloadFile || fetchingSaveLogTMSApplication || fetchingDetailLogTMSApplication || fetchingLogType || fetchingWithDrawLogTMSApplication) && <Loading />}
                <KeyboardAvoidingView style={{ flex: 1, }} behavior={Platform.OS === 'android' ? null : 'padding'}>
                    <CustomHeader
                        typeIconLeft={'back'}
                        title={userProfile.LangID === 'VN' ? 'Đăng ký bổ sung giờ công' : 'Log TMS Application'}
                        typeIconRight={'branch'}
                        onPressLeft={() => { this.props.navigation.goBack() }}
                        onPressRight={() => {
                            if (!stringIsEmpty(this.state.tsdkID)) {
                                this.props.navigation.navigate('ApplicationHistoryContainer', {
                                    idApplication: this.state.tsdkID,
                                    typeApplication: 3
                                })
                            }
                        }}
                    />
                    {!stringIsEmpty(errorDetailLogTMSApplication) ? this.showError()
                        :
                        (
                            <View style={{ flex: 1, backgroundColor: "white", paddingHorizontal: Sizes.s20 }}>

                                <FormDetail ref='form' form={this.state._logTMSApplication} />
                                {(typeApplication === 'approveApplication' || isShowKeyboard) ?
                                    (null)
                                    :
                                    (
                                        statusID !== undefined ?
                                            (
                                                statusID === 3 ?
                                                    (
                                                        // <CustomButton onPress={this.onPressSubmit} type='send' title='Gửi' />
                                                        null
                                                    )
                                                    : (statusID === 4 || statusID === 1) ?
                                                        (
                                                            <View style={{ width: '100%', flexDirection: 'row', }}>
                                                                <View style={{ flex: 1, paddingRight: Sizes.h20, }}>
                                                                    <CustomButton onPress={this.onPressSubmitApplication} type='send' title={userProfile.LangID === 'VN' ? appStrS.vn.button.submit : appStrS.en.button.submit} />
                                                                </View>
                                                                <View style={{ flex: 1, paddingLeft: Sizes.h20, }}>
                                                                    <CustomButton onPress={this.onPressDeleteApplication} type='close' title={userProfile.LangID === 'VN' ? appStrS.vn.button.delete : appStrS.en.button.delete} />
                                                                </View>
                                                            </View>
                                                        )
                                                        : statusID === 2 ?
                                                            (
                                                                <CustomButton onPress={this.onPressRollBackApplication} type='rollBack' title={userProfile.LangID === 'VN' ? appStrS.vn.button.withDraw : appStrS.en.button.widthDraw} />
                                                            )
                                                            :
                                                            (
                                                                <CustomButton onPress={this.onPressSubmitApplication} type='send' title={userProfile.LangID === 'VN' ? appStrS.vn.button.send : appStrS.en.button.send} />
                                                            )

                                            )
                                            :
                                            (null)
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
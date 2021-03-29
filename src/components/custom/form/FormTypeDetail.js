import { userProfile } from '../../../config/settings'
import { objectIsNull, stringIsEmpty, arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions'
const getNowDate = (type) => {
    let d = new Date()
    if (type === 1) {
        let t = d.getDay() + 1
        let day = ('0' + d.getDate()).substr(-2)
        let month = ('0' + (d.getMonth() + 1)).substr(-2)
        let year = d.getFullYear()

        return 'Thứ ' + t + ' ' + day + '/' + month + '/' + year
    } else if (type === 2) {
        let t = d.getDay() + 1
        let day = ('0' + d.getDate()).substr(-2)
        let month = ('0' + (d.getMonth() + 1)).substr(-2)
        let year = d.getFullYear()

        return day + '/' + month + '/' + year
    } else if (type === 3) {
        let hour = ('0' + d.getHours()).substr(-2)
        let minute = ('0' + d.getMinutes()).substr(-2)
        return hour + ':' + minute
    }
    else if (type === 4) {
        let hour = ('0' + d.getHours()).substr(-2)
        let minute = ('0' + d.getMinutes()).substr(-2)
        let second = ('0' + d.getSeconds()).substr(-2)

        return hour + ':' + minute + ':' + second
    } else {
        return ''
    }
}

export const textEditForm = (id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag, icon) => {
    return {
        id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag, icon,
        onPressFocus: () => { },
        onPressBlur: () => { },
    }
}


export const comboboxForm = (id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag) => {
    return {
        id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, items: [], tag,
        selectedItem: undefined,
        onPress: () => { },
        onPressSelectedItem: () => { },
        data: undefined
    }
}
export const multiComboboxForm = (id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag) => {
    return {
        id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, items: [], tag,
        onPress: () => { }
    }
}


export const twoComboboxForm = (id, team, control, dataType, dataSource, caption1, caption2, requireSubmit, parent, sort, value1, value2, display, editable1, editable2, tag1, tag2) => {
    return {
        id, team, control, dataType, dataSource, caption1, caption2, requireSubmit, parent, sort, value1, value2, display, editable1, editable2, items1: [], items2: [], tag1, tag2,
        selectedItem1: undefined,
        selectedItem2: undefined,
        onPress1: () => { },
        onPress2: () => { }
    }
}


export const datepickerForm = (id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag) => {
    return {
        id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag,
        onPress: () => { },
        onPress1: () => { },
    }
}


// const datePickerForm = (id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, editable, tag) => {
//     return {
//         id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, editable,
//         value: getNowDate(2),
//         value2: getNowDate(2),
//         tag
//     }
// }

const twoDatePickerForm = (id, team, control, dataType, dataSource, caption1, caption2, requireSubmit, parent, sort, editable, tag1, tag2, value1, value2) => {
    return {
        id, team, control, dataType, dataSource, caption1, caption2, requireSubmit, parent, sort, editable,
        value1: !stringIsEmpty(value1) ? value1 : getNowDate(2),
        value2: !stringIsEmpty(value2) ? value2 : getNowDate(2),
        tag1,
        tag2,
        onPress1: () => { },
        onPress2: () => { }
    }
}

const timePickerForm = (id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag) => {
    return {
        id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag
    }
}
const twoTimePickerForm = (id, team, control, dataType, dataSource, caption1, caption2, requireSubmit, parent, sort, editable, tag1, tag2, visible) => {
    return {
        id, team, control, dataType, dataSource, caption1, caption2, requireSubmit, parent, sort, editable,
        value1: '',
        value2: '',
        tag1,
        tag2,
        visible,
        onPress1: () => { },
        onPress2: () => { }
    }
}


const twoCheckBoxForm = (id, team, control, dataType, dataSource, caption1, caption2, requireSubmit, parent, sort, editable, tag1, tag2, visible, value1, value2, type) => {
    return {
        id, team, control, dataType, dataSource, caption1, caption2, requireSubmit, parent, sort, editable,
        value1,
        value2,
        type,
        tag1,
        tag2,
        visible,
        onPressValue1: () => {},
        onPressValue2: () => {},

    }
}

const buttonForm = (id, team, control, title, requireSubmit, sort, tag, visible, type) => {
    return {
        id,
        team,
        control,
        title,
        requireSubmit,
        sort,
        tag,
        visible,
        type,
        onPress: () => { }
    }
}


const twoButtonForm = (id, team, control, dataType, dataSource, caption1, caption2, requireSubmit, parent, sort, editable, tag1, tag2) => {
    return {
        id, team, control, dataType, dataSource, caption1, caption2, requireSubmit, parent, sort, editable, tag1, tag2,
        onPressButton1: () => { },
        onPressButton2: () => { },
    }
}

export const textForm = (id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag) => {
    return {
        id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag, data: '',
        visible: display,
        icon: 'ic_cur_vnd',
        onPress: () => {
            // console.log('@2222222')
        }
    }
}
export const textHorizontalForm = (id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag, typeText) => {
    return {
        id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag, data: '',
        typeText,
        fileBase64: '',
        filePath: '',
        onPress: () => {
            // console.log('@2222222')
        }
    }
}

const twoTextForm = (id, team, control, dataType, dataSource, caption1, caption2, requireSubmit, parent, sort, editable, tag1, tag2) => {
    return {
        id, team, control, dataType, dataSource, caption1, caption2, requireSubmit, parent, sort, editable, tag1, tag2,
        value1: ' ',
        value2: ' '
    }
}


const comboboxSearchForm = (id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag) => {
    return {
        id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, items: [], tag,
        data: undefined,
        ids: undefined,
    }
}


const comboboxMultiSearchForm = (id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag) => {
    return {
        id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, items: [], tag,
        data: undefined,
        ids: undefined,
    }
}

const attachFileForm = (id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag) => {
    return {
        id, team, control, dataType, dataSource, caption, requireSubmit, parent, sort, value, display, editable, tag,
        fileBase64: '',
        filePath: '',
        onPressChooseFile: () => { },
        onPressViewFile: () => { }
    }
}



export const leaveApplication = () => {
    let langID = userProfile.LangID
    return [
        comboboxForm('1', 'I', 'combobox', null, null, langID === 'VN' ? 'Chọn loại nghỉ' : 'Leave type', '1', null, 1, '', null, true, 'LeaveTypeID'),
        twoDatePickerForm('2', 'I', 'twoDatePicker', null, null, langID === 'VN' ? 'Từ ngày' : 'From date', langID === 'VN' ? 'Đến ngày' : 'To date', '0', null, 2, true, 'FromDate', 'ToDate', '', ''),
        twoTimePickerForm('3', 'I', 'twoTimePicker', null, null, langID === 'VN' ? 'Từ giờ' : 'From time', langID === 'VN' ? 'Đến giờ' : 'To time', '0', null, 3, true, 'FromTime', 'ToTime', false),
        twoCheckBoxForm('4', 'I', 'twoCheckBox', null, null, langID === 'VN' ? 'Hôm sau' : 'Next day', langID === 'VN' ? 'Hôm sau' : 'Next day', '0', null, 4, true, 'IsFromTom', 'IsToTom', false, '0', '0', 'multi'),
        buttonForm('5', 'I', 'buttonForm', langID === 'VN' ? 'Chi tiết' : 'Details', '0', 5, 'showDetail', true, 'detail'),
        twoButtonForm('6', 'I', 'twoButtonForm', null, null, langID === 'VN' ? 'Tính phép' : 'Calculate', langID === 'VN' ? 'Thông tin phép' : 'Leave info', '0', null, 6, true, 'CalculateLeave', 'ShowLeaveInfo'),
        textForm('7', 'I', 'textForm', null, null, langID === 'VN' ? 'Tổng số giờ nghỉ' : 'Total leave hours', '1', null, 7, null, null, false, 'TotalLeaveHours'),
        textForm('8', 'I', 'textForm', null, null, langID === 'VN' ? 'Tổng số ngày nghỉ' : 'Total leave days', '1', null, 8, null, null, false, 'TotalLeaveDays'),
        textForm('9', 'I', 'textForm', null, null, langID === 'VN' ? 'Người phê duyệt' : 'Approver', '0', null, 9, null, null, false, 'Approver'),
        comboboxSearchForm('10', 'I', 'comboboxSearchForm', null, null, langID === 'VN' ? 'Người nhận bàn giao' : 'Substitute', '1', null, 10, null, 'leaveApplication', true, 'ReplacePerson'),
        textEditForm('11', 'I', 'textedit', null, null, langID === 'VN' ? 'Lý do nghỉ' : 'Reason', '1', null, 11, '', null, true, 'Reason', 'ic_pen'),
        comboboxMultiSearchForm('12', 'I', 'comboboxMultiSearchForm', null, null, langID === 'VN' ? 'Thông báo cho' : 'Notify to', '0', null, 12, '', 'leaveApplication', true, 'NotifyTo'),
        attachFileForm('13', 'I', 'attachFile', null, null, langID === 'VN' ? 'Đính kèm file' : 'Attach file', '0', null, 13, null, null, true, 'AttachFile'),
        textForm('14', 'I', 'textForm', null, null, langID === 'VN' ? 'Tình trạng' : 'Status', '0', null, 14, null, false, false, 'StatusApplication')
    ]
}


export const leaveDaysApplication = () => {
    let langID = userProfile.LangID
    return [
        comboboxForm('1', 'I', 'combobox', null, null, langID === 'VN' ? 'Chọn loại nghỉ' : 'Leave type', '1', null, 1, '', null, true, 'LeaveTypeID'),
        twoDatePickerForm('2', 'I', 'twoDatePicker', null, null, langID === 'VN' ? 'Từ ngày' : 'From date', langID === 'VN' ? 'Đến ngày' : 'To date', '0', null, 2, true, 'FromDate', 'ToDate', '', ''),
        // twoTimePickerForm('3', 'I', 'twoTimePicker', null, null, langID === 'VN' ? 'Từ giờ' : 'From time', langID === 'VN' ? 'Đến giờ' : 'To time', '0', null, 3, true, 'FromTime', 'ToTime', false),
        twoCheckBoxForm('3', 'I', 'twoCheckBox', null, null, langID === 'VN' ? 'Nghỉ sáng' : 'Morning leave', langID === 'VN' ? 'Nghỉ chiều' : 'Afternoon leave', '0', null, 3, true, 'MorningLeave', 'AfternoonLeave', false, '0', '0', 'singleNoRequire'),
        // buttonForm('5', 'I', 'buttonForm', langID === 'VN' ? 'Chi tiết' : 'Details', '0', 5, 'showDetail', true, 'detail'),
        // twoButtonForm('4', 'I', 'twoButtonForm', null, null, langID === 'VN' ? 'Tính phép' : 'Calculate', langID === 'VN' ? 'Thông tin phép' : 'Leave info', '0', null, 4, true, 'CalculateLeave', 'ShowLeaveInfo'),
        buttonForm('4', 'I', 'buttonForm', langID === 'VN' ? 'Thông tin phép' : 'Leave info', '0', 4, 'ShowLeaveInfo', false, 'view'),
        // textForm('5', 'I', 'textForm', null, null, langID === 'VN' ? 'Tổng số giờ nghỉ' : 'Total leave hours', '1', null, 5, null, null, false, 'TotalLeaveHours'),
        textForm('5', 'I', 'textForm', null, null, langID === 'VN' ? 'Tổng số ngày nghỉ' : 'Total leave days', '1', null, 5, null, null, false, 'TotalLeaveDays'),
        textForm('6', 'I', 'textForm', null, null, langID === 'VN' ? 'Người phê duyệt' : 'Approver', '0', null, 6, null, null, false, 'Approver'),
        comboboxSearchForm('7', 'I', 'comboboxSearchForm', null, null, langID === 'VN' ? 'Người nhận bàn giao' : 'Substitute', '1', null, 7, null, 'leaveApplication', true, 'ReplacePerson'),
        textEditForm('8', 'I', 'textedit', null, null, langID === 'VN' ? 'Lý do nghỉ' : 'Reason', '1', null, 8, '', null, true, 'Reason', 'ic_pen'),
        // comboboxMultiSearchForm('9', 'I', 'comboboxMultiSearchForm', null, null, langID === 'VN' ? 'Thông báo cho' : 'Notify to', '0', null, 9, '', 'leaveApplication', true, 'NotifyTo'),
        attachFileForm('10', 'I', 'attachFile', null, null, langID === 'VN' ? 'Đính kèm file' : 'Attach file', '0', null, 10, null, null, true, 'AttachFile'),
        textForm('11', 'I', 'textForm', null, null, langID === 'VN' ? 'Tình trạng' : 'Status', '0', null, 11, null, false, false, 'StatusApplication')
    ]
}

export const businessTripApplication = () => {
    let langID = userProfile.LangID
    return [
        twoDatePickerForm('1', 'I', 'twoDatePicker', null, null, langID === 'VN' ? 'Từ ngày' : 'From date', langID === 'VN' ? 'Đến ngày' : 'To date', '1', null, 1, true, 'FromDate', 'ToDate', '', ''),
        twoTimePickerForm('2', 'I', 'twoTimePicker', null, null, langID === 'VN' ? 'Từ giờ' : 'From time', langID === 'VN' ? 'Đến giờ' : 'To time', '1', null, 2, true, 'FromTime', 'ToTime', false),
        textForm('3', 'I', 'textForm', null, null, langID === 'VN' ? 'Tổng cộng' : 'Total', '0', null, 3, null, null, false, 'TotalTime'),
        comboboxForm('4', 'I', 'combobox', null, null, langID === 'VN' ? 'Loại công tác' : 'Type business trip', '1', null, 4, null, null, true, 'TypeBusinessTrip'),
        textForm('5', 'I', 'textForm', null, null, langID === 'VN' ? 'Người phê duyệt' : 'Approver', '0', null, 5, null, null, false, 'Approver'),
        textEditForm('6', 'I', 'textedit', null, null, langID === 'VN' ? 'Nội dung công tác' : 'Description work', '1', null, 6, null, null, true, 'DescriptionWork', 'ic_pen'),
        textEditForm('7', 'I', 'textedit', null, null, langID === 'VN' ? 'Địa điểm' : 'Place work', '1', null, 6, null, null, true, 'PlaceWork', 'ic_pen'),
        comboboxSearchForm('8', 'I', 'comboboxSearchForm', null, null, langID === 'VN' ? 'Người thay thế' : 'Substitute', '0', null, 8, null, 'businessTripApplication', true, 'ReplacePerson'),
        textEditForm('9', 'I', 'textedit', null, null, langID === 'VN' ? 'Số tiền tạm ứng' : 'Cash advance', '0', null, 9, null, null, true, 'CashAdvance', 'ic_cur_vnd'),
        textEditForm('11', 'I', 'textedit', null, null, langID === 'VN' ? 'Giải trình (nếu có)' : 'Explanation (if any)', '0', null, 11, null, null, true, 'Explanation', 'ic_pen'),
        comboboxMultiSearchForm('12', 'I', 'comboboxMultiSearchForm', null, null, langID === 'VN' ? 'Thông báo cho' : 'Notify to', '0', null, 12, '', 'businessTripApplication', true, 'NotifyTo'),
        attachFileForm('13', 'I', 'attachFile', null, null, langID === 'VN' ? 'Đính kèm file' : 'Attach file', '0', null, 13, null, null, true, 'AttachFile'),
        textForm('14', 'I', 'textForm', null, null, langID === 'VN' ? 'Tình trạng' : 'Status', '0', null, 14, null, false, false, 'StatusApplication')
    ]
}

export const overTimeApplication = () => {
    let langID = userProfile.LangID
    return [
        datepickerForm('1', 'I', 'datepicker', null, null, langID === 'VN' ? 'Ngày đăng ký' : 'Register date', '1', null, 1, getNowDate(2), null, true, 'RegisterDate'),
        twoTextForm('2', 'I', 'twoTextForm', null, null, langID === 'VN' ? 'Giờ vào - Giờ ra' : 'Time in - Time out', langID === 'VN' ? 'Ca làm việc' : 'Working schedule', false, null, 2, false, 'TimeInOut', 'WorkingSchedule'),
        twoTimePickerForm('3', 'I', 'twoTimePicker', null, null, langID === 'VN' ? 'Từ giờ' : 'From time', langID === 'VN' ? 'Đến giờ' : 'To time', '1', null, 3, true, 'FromTime', 'ToTime', false),
        twoCheckBoxForm('4', 'I', 'twoCheckBox', null, null, langID === 'VN' ? 'Tăng ca đầu giờ' : 'Is from tom', langID === 'VN' ? 'Tăng ca cuối giờ' : 'Is to tom', '0', null, 4, true, 'IsFromTom', 'IsToTom', false, '0', '1', 'single'),
        buttonForm('5', 'I', 'buttonForm', langID === 'VN' ? 'Tính OT' : 'Calculate OT', '0', 5, 'calculateOT', false, 'setting'),
        twoTextForm('6', 'I', 'twoTextForm', null, null, langID === 'VN' ? 'Số giờ OT ban ngày' : 'Day time OT', langID === 'VN' ? 'Số giờ OT ban đêm' : 'Night OT', '1', null, 6, false, 'DayTimeOT', 'NightOT'),
        timePickerForm('7', 'I', 'timePickerForm', null, null, langID === 'VN' ? 'Số giờ đăng ký nghỉ bù' : 'Registration hours off', '0', null, 7, '', null, true, 'RegistrationHoursOff'),
        textForm('8', 'I', 'textForm', null, null, langID === 'VN' ? 'Số giờ tích lũy trong tháng / 30 giờ' : 'Accumulative month OT', '0', null, 8, null, null, false, 'AccumulativeMonthOT'),
        textForm('9', 'I', 'textForm', null, null, langID === 'VN' ? 'Số giờ tích lũy trong năm / 200 giờ' : 'Accumulative year OT', '0', null, 9, null, null, false, 'AccumulativeYearOT'),
        textForm('10', 'I', 'textForm', null, null, langID === 'VN' ? 'Người phê duyệt' : 'Approver', '0', null, 10, null, null, false, 'Approver'),
        textEditForm('11', 'I', 'textedit', null, null, langID === 'VN' ? 'Lý do' : 'Reason', '0', null, 11, null, null, true, 'Reason', 'ic_pen'),
        textForm('12', 'I', 'textForm', null, null, langID === 'VN' ? 'Tình trạng' : 'Status', '0', null, 12, null, false, false, 'StatusApplication')
        // comboboxSearchForm('11', 'I', 'comboboxSearchForm', null, null, 'Người thay thế', '1', null, 11, null, null, true, 'ReplacePerson'),
        // comboboxMultiSearchForm('12', 'I', 'comboboxMultiSearchForm', null, null, 'Thông báo cho', '0', null, 12, [], null, true, 'NotifyTo'),
        // attachFileForm('13', 'I', 'attachFile', null, null, 'Đính kèm file', '0', null, 13, null, null, true, 'AttachFile')
    ]
}

export const logTMSApplication = () => {
    let langID = userProfile.LangID
    return [
        textForm('1', 'I', 'textForm', null, null, langID === 'VN' ? 'Ngày' : 'Date', '0', null, 1, '', true, false, 'Date'),
        twoTextForm('2', 'I', 'twoTextForm', null, null, langID === 'VN' ? 'Ca làm việc' : 'Working schedule', langID === 'VN' ? 'Giờ làm việc' : 'Working time', '0', null, 2, false, 'WorkingSchedule', 'WorkingTime'),
        twoTextForm('3', 'I', 'twoTextForm', null, null, langID === 'VN' ? 'Giờ bắt đầu thực tế' : 'Actual starting time', langID === 'VN' ? 'Giờ kết thúc thực tế' : 'Actual ending time', '0', null, 3, false, 'ActualStartingTime', 'ActualEndingTime'),
        twoTextForm('4', 'I', 'twoTextForm', null, null, langID === 'VN' ? 'Số giờ đi trễ' : 'Coming late', langID === 'VN' ? 'Số giờ về sớm' : 'Leaving soon', '0', null, 4, false, 'ComingLate', 'LeavingSoon'),
        textForm('5', 'I', 'textForm', null, null, langID === 'VN' ? 'Ghi chú' : 'Note', '0', null, 5, '', true, false, 'Note'),
        comboboxForm('6', 'I', 'combobox', null, null, langID === 'VN' ? 'Loại đăng ký' : 'Application type', '1', null, 6, '', true, true, 'ApplicationType'),
        twoTimePickerForm('7', 'I', 'twoTimePicker', null, null, langID === 'VN' ? 'Từ giờ' : 'From time', langID === 'VN' ? 'Đến giờ' : 'To time', '0', null, 7, true, 'FromTime', 'ToTime', false),
        textEditForm('8', 'I', 'textedit', null, null, langID === 'VN' ? 'Lý do' : 'Reason', '0', null, 8, '', true, true, 'Reason', 'ic_pen'),
        attachFileForm('9', 'I', 'attachFile', null, null, langID === 'VN' ? 'Đính kèm file' : 'Attach file', '0', null, 9, '', true, true, 'AttachFile'),
        textForm('10', 'I', 'textForm', null, null, langID === 'VN' ? 'Người phê duyệt' : 'Approver', '0', null, 10, '', true, false, 'Approver'),
        textForm('11', 'I', 'textForm', null, null, langID === 'VN' ? 'Tình trạng' : 'Status', '0', null, 11, null, false, false, 'StatusApplication')
    ]
}

export const searchMyLeaveApplication = () => {
    let langID = userProfile.LangID
    return [
        comboboxForm('1', 'I', 'combobox', null, null, langID === 'VN' ? 'Loại nghỉ' : 'Leave type', '0', null, 1, '', null, true, 'LeaveTypeID'),
        twoDatePickerForm('2', 'I', 'twoDatePicker', null, null, langID === 'VN' ? 'Từ ngày' : 'From date', langID === 'VN' ? 'Đến ngày' : 'To date', '1', null, 2, true, 'FromDate', 'ToDate', ('01/01/' + new Date().getFullYear()), '31/12/' + new Date().getFullYear())
    ]
}

export const searchMyBusinessTripApplication = () => {
    let langID = userProfile.LangID
    return [
        twoDatePickerForm('1', 'I', 'twoDatePicker', null, null, langID === 'VN' ? 'Từ ngày' : 'From date', langID === 'VN' ? 'Đến ngày' : 'To date', '1', null, 1, true, 'FromDate', 'ToDate', ('01/01/' + new Date().getFullYear()), '31/12/' + new Date().getFullYear())
    ]
}


export const searchMyOverTimeApplication = () => {
    let langID = userProfile.LangID
    return [
        twoDatePickerForm('1', 'I', 'twoDatePicker', null, null, langID === 'VN' ? 'Từ ngày' : 'From date', langID === 'VN' ? 'Đến ngày' : 'To date', '1', null, 1, true, 'FromDate', 'ToDate', ('01/01/' + new Date().getFullYear()), '31/12/' + new Date().getFullYear()),
        comboboxForm('2', 'I', 'combobox', null, null, langID === 'VN' ? 'Tình trạng' : 'Status', '0', null, 2, '', null, true, 'StatusOverTime'),
    ]
}

export const searchMyLogTMSApplication = () => {
    let langID = userProfile.LangID
    return [
        twoComboboxForm('1', 'I', 'twoComboboxForm', null, null, langID === 'VN' ? 'Tháng' : 'Month', langID === 'VN' ? 'Năm' : 'Year', true, null, 1, '', '', true, true, true, 'ChooseMonth', 'ChooseYear'),
        comboboxForm('2', 'I', 'combobox', null, null, langID === 'VN' ? 'Trạng thái' : 'Status', false, null, '2', '', true, true, 'AdjustmentStatus'),
        comboboxForm('3', 'I', 'multiCombobox', null, null, langID === 'VN' ? 'Dữ liệu' : 'Record', false, null, '3', '', true, true, 'FingerPrintRecord'),
        comboboxForm('4', 'I', 'combobox', null, null, langID === 'VN' ? 'Tình trạng phê duyệt' : 'Approval status', false, null, '4', '', true, true, 'ApprovalStatus')
    ]
}

export const searchApproverLeaveApplication = () => {
    let langID = userProfile.LangID
    return [
        textEditForm('1', 'I', 'textedit', null, null, langID === 'VN' ? 'Họ tên' : 'Name', '0', null, 1, '', true, true, 'Name', 'ic_pen'),
        comboboxForm('2', 'I', 'combobox', null, null, langID === 'VN' ? 'Loại nghỉ' : 'Leave type', '0', null, 2, '', null, true, 'LeaveTypeID'),
        comboboxForm('3', 'I', 'combobox', null, null, langID === 'VN' ? 'Tình trạng' : 'Status', '0', null, 3, '', true, true, 'Status'),
        twoDatePickerForm('4', 'I', 'twoDatePicker', null, null, langID === 'VN' ? 'Từ ngày' : 'From date', langID === 'VN' ? 'Đến ngày' : 'To date', '1', null, 4, true, 'FromDate', 'ToDate', ('01/01/' + new Date().getFullYear()), '31/12/' + new Date().getFullYear())
    ]
}


export const searchApproverBusinessApplicationForm = () => {
    let langID = userProfile.LangID
    return [
        textEditForm('1', 'I', 'textedit', null, null, langID === 'VN' ? 'Họ tên' : 'Name', '0', null, 1, '', true, true, 'Name', 'ic_pen'),
        comboboxForm('2', 'I', 'combobox', null, null, langID === 'VN' ? 'Loại công tác' : 'Type business trip', '0', null, 2, '', null, true, 'BusinessTripType'),
        comboboxForm('3', 'I', 'combobox', null, null, langID === 'VN' ? 'Tình trạng' : 'Status', '0', null, 3, '', true, true, 'Status'),
        twoDatePickerForm('4', 'I', 'twoDatePicker', null, null, langID === 'VN' ? 'Từ ngày' : 'From date', langID === 'VN' ? 'Đến ngày' : 'To date', '1', null, 4, true, 'FromDate', 'ToDate', ('01/01/' + new Date().getFullYear()), '31/12/' + new Date().getFullYear())
    ]
}


export const searchApproverOverTimeApplicationForm = () => {
    let langID = userProfile.LangID
    return [
        textEditForm('1', 'I', 'textedit', null, null, langID === 'VN' ? 'Họ tên' : 'Name', '0', null, 1, '', true, true, 'Name', 'ic_pen'),
        comboboxForm('2', 'I', 'combobox', null, null, langID === 'VN' ? 'Tình trạng' : 'Status', '0', null, 2, '', true, true, 'StatusOverTime'),
        twoDatePickerForm('3', 'I', 'twoDatePicker', null, null, langID === 'VN' ? 'Từ ngày' : 'From date', langID === 'VN' ? 'Đến ngày' : 'To date', '1', null, 3, true, 'FromDate', 'ToDate', ('01/01/' + new Date().getFullYear()), '31/12/' + new Date().getFullYear())
    ]
}


export const searchApproverLogTMSApplicationForm = () => {
    let langID = userProfile.LangID
    return [
        textEditForm('1', 'I', 'textedit', null, null, langID === 'VN' ? 'Họ tên' : 'Name', '0', null, 1, '', true, true, 'Name', 'ic_pen'),
        comboboxForm('2', 'I', 'combobox', null, null, langID === 'VN' ? 'Tình trạng điều chỉnh' : 'Adjustment status', '0', null, '2', '', true, true, 'AdjustmentStatus'),
        comboboxForm('3', 'I', 'multiCombobox', null, null, langID === 'VN' ? 'Dữ liệu vân tay' : 'Finger print record', '0', null, '3', '', true, true, 'FingerPrintRecord'),
        comboboxForm('4', 'I', 'combobox', null, null, langID === 'VN' ? 'Tình trạng phê duyệt' : 'Approval status', '0', null, '4', '', true, true, 'ApprovalStatus'),
        twoDatePickerForm('5', 'I', 'twoDatePicker', null, null, langID === 'VN' ? 'Từ ngày' : 'From date', langID === 'VN' ? 'Đến ngày' : 'To date', '1', null, 5, true, 'FromDate', 'ToDate', ('01/01/' + new Date().getFullYear()), '31/12/' + new Date().getFullYear())
    ]
}

export const leaveApplicationApprovalForm = () => {
    let langID = userProfile.LangID
    return [
        // textHorizontalForm
        textHorizontalForm('1', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Loại nghỉ' : 'Leave type', '0', null, 1, '', true, false, 'LeaveType', 'text'),
        textHorizontalForm('2', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Thời gian nghỉ' : 'Time leave', '0', null, 2, '', true, false, 'TimeLeave', 'text'),
        textHorizontalForm('3', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Tổng số ngày nghỉ' : 'Taken', '0', null, 3, '', true, false, 'Taken', 'text'),
        // textHorizontalForm('4', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Tổng số giờ nghỉ' : 'Hour', '0', null, 4, '', true, false, 'Hour', 'text'),
        textHorizontalForm('5', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Lý do nghỉ' : 'Reason', '0', null, 5, '', true, false, 'Reason', 'text'),
        textHorizontalForm('6', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Ngày thao tác' : 'Action date', '0', null, 6, '', true, false, 'ActionDate', 'text'),
        textHorizontalForm('7', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Người thay thế' : 'Substitute', '0', null, 7, '', true, false, 'ReplacePerson', 'text'),
        textHorizontalForm('8', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Thông báo cho' : 'Notify to', '0', null, 8, '', true, false, 'NotifyTo', 'text'),
        textHorizontalForm('9', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Đính kèm file' : 'Attach File', '0', null, 9, '', true, false, 'AttachFile', 'file'),
        textEditForm('10', 'I', 'textInputHorizontalForm', null, null, langID === 'VN' ? 'Lý do từ chối' : 'Reason reject', '0', null, 10, '', true, true, 'ReasonReject', 'ic_pen'),
        //

        // textForm('1', 'I', 'textForm', null, null, langID === 'VN' ? 'Loại nghỉ' : 'Leave type', '0', null, 1, '', true, false, 'LeaveType'),
        // textForm('2', 'I', 'textForm', null, null, langID === 'VN' ? 'Thời gian nghỉ' : 'Time leave', '0', null, 2, '', true, false, 'TimeLeave'),
        // textForm('3', 'I', 'textForm', null, null, langID === 'VN' ? 'Tổng số ngày nghỉ' : 'Taken', '0', null, 3, '', true, false, 'Taken'),
        // textForm('4', 'I', 'textForm', null, null, langID === 'VN' ? 'Tổng số giờ nghỉ' : 'Hour', '0', null, 4, '', true, false, 'Hour'),
        // textForm('5', 'I', 'textForm', null, null, langID === 'VN' ? 'Lý do nghỉ' : 'Reason', '0', null, 5, '', true, false, 'Reason'),
        // textForm('6', 'I', 'textForm', null, null, langID === 'VN' ? 'Ngày thao tác' : 'Action date', '0', null, 6, '', true, false, 'ActionDate'),
        // textForm('7', 'I', 'textForm', null, null, langID === 'VN' ? 'Người thay thế' : 'Substitute', '0', null, 7, '', true, false, 'ReplacePerson'),
        // comboboxMultiSearchForm('8', 'I', 'comboboxMultiSearchForm', null, null, langID === 'VN' ? 'Thông báo cho' : 'Notify to', '0', null, 8, '', '', false, 'NotifyTo'),
        // attachFileForm('9', 'I', 'attachFile', null, null, langID === 'VN' ? 'Đính kèm file' : 'Attach File', '0', null, 9, '', true, false, 'AttachFile'),
        // textEditForm('10', 'I', 'textedit', null, null, langID === 'VN' ? 'Lý do từ chối' : 'Reason reject', '0', null, 10, '', true, true, 'ReasonReject', 'ic_pen'),

        //

        // textForm('1', 'I', 'textForm', null, null, langID === 'VN' ? 'Loại nghỉ' : 'Leave type', '0', null, 1, '', true, false, 'LeaveType'),
        // textForm('2', 'I', 'textForm', null, null, langID === 'VN' ? 'Thời gian nghỉ' : 'Time leave', '0', null, 2, '', true, false, 'TimeLeave'),
        // textForm('3', 'I', 'textForm', null, null, langID === 'VN' ? 'Tổng số ngày nghỉ' : 'Taken', '0', null, 3, '', true, false, 'Taken'),
        // textForm('4', 'I', 'textForm', null, null, langID === 'VN' ? 'Tổng số giờ nghỉ' : 'Hour', '0', null, 4, '', true, false, 'Hour'),
        // textForm('5', 'I', 'textForm', null, null, langID === 'VN' ? 'Lý do nghỉ' : 'Reason', '0', null, 5, '', true, false, 'Reason'),
        // textForm('6', 'I', 'textForm', null, null, langID === 'VN' ? 'Ngày thao tác' : 'Action date', '0', null, 6, '', true, false, 'ActionDate'),
        // textForm('7', 'I', 'textForm', null, null, langID === 'VN' ? 'Người thay thế' : 'Substitute', '0', null, 7, '', true, false, 'ReplacePerson'),
        // // textForm('8', 'I', 'textForm', null, null, 'Thông báo cho', '0', null, 8, '', true, false, 'NotificationFor'),
        // comboboxMultiSearchForm('8', 'I', 'comboboxMultiSearchForm', null, null, langID === 'VN' ? 'Thông báo cho' : 'Notify to', '0', null, 8, '', '', false, 'NotifyTo'),
        // // textForm('9', 'I', 'textForm', null, null, 'Đính kèm file', '0', null, 9, '', true, false, 'AttachFile'),
        // attachFileForm('9', 'I', 'attachFile', null, null, langID === 'VN' ? 'Đính kèm file' : 'Attach File', '0', null, 9, '', true, false, 'AttachFile'),
        // textEditForm('10', 'I', 'textedit', null, null, langID === 'VN' ? 'Lý do từ chối' : 'Reason reject', '0', null, 10, '', true, true, 'ReasonReject', 'ic_pen'),
    ]
}


export const businessTripApplicationApprovalForm = () => {
    let langID = userProfile.LangID
    return [
        textHorizontalForm('1', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Thời gian đăng ký' : 'Registry time', '0', null, 1, '', true, false, 'RegistryTime', 'text'),
        textHorizontalForm('2', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Tổng cộng' : 'Total', '0', null, 2, '', true, false, 'Total', 'text'),
        textHorizontalForm('3', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Loại công tác' : 'Type business trip', '0', null, 3, '', true, false, 'TypeBusinessTrip', 'text'),
        textHorizontalForm('4', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Nội dung công tác' : 'Purpose', '0', null, 4, '', true, false, 'Purpose', 'text'),
        textHorizontalForm('5', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Địa điểm' : 'Place', '0', null, 5, '', true, false, 'Place', 'text'),
        textHorizontalForm('6', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Ngày thao tác' : 'Action date', '0', null, 6, '', true, false, 'ActionDate', 'text'),
        textHorizontalForm('7', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Người thay thế' : 'Substitute', '0', null, 7, '', true, false, 'ReplacePerson', 'text'),
        textHorizontalForm('8', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Số tiền xin tạm ứng' : 'Cash advance', '0', null, 8, '', true, false, 'CashAdvance', 'cash'),
        // textEditForm('8', 'I', 'textedit', null, null, langID === 'VN' ? 'Số tiền xin tạm ứng' : 'Cash advance', '0', null, 8, null, null, false, 'CashAdvance', 'ic_cur_vnd'),
        textHorizontalForm('9', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Giải trình' : 'Explanation', '0', null, 9, '', true, false, 'Explanation', 'text'),
        textHorizontalForm('10', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Đính kèm file' : 'Attach File', '0', null, 10, '', true, false, 'AttachFile', 'file'),
        // attachFileForm('10', 'I', 'attachFile', null, null, langID === 'VN' ? 'Đính kèm file' : 'Attach File', '0', null, 10, '', true, false, 'AttachFile'),
        textEditForm('11', 'I', 'textInputHorizontalForm', null, null, langID === 'VN' ? 'Lý do từ chối' : 'Reason reject', '0', null, 11, '', true, false, 'ReasonReject', 'ic_pen'),

        //

        // textForm('1', 'I', 'textForm', null, null, langID === 'VN' ? 'Thời gian đăng ký' : 'Registry time', '0', null, 1, '', true, false, 'RegistryTime'),
        // textForm('2', 'I', 'textForm', null, null, langID === 'VN' ? 'Tổng cộng' : 'Total', '0', null, 2, '', true, false, 'Total'),
        // textForm('3', 'I', 'textForm', null, null, langID === 'VN' ? 'Loại công tác' : 'Type business trip', '0', null, 3, '', true, false, 'TypeBusinessTrip'),
        // textForm('4', 'I', 'textForm', null, null, langID === 'VN' ? 'Nội dung công tác' : 'Purpose', '0', null, 4, '', true, false, 'Purpose'),
        // textForm('5', 'I', 'textForm', null, null, langID === 'VN' ? 'Địa điểm' : 'Place', '0', null, 5, '', true, false, 'Place'),
        // textForm('6', 'I', 'textForm', null, null, langID === 'VN' ? 'Ngày thao tác' : 'Action date', '0', null, 6, '', true, false, 'ActionDate'),
        // textForm('7', 'I', 'textForm', null, null, langID === 'VN' ? 'Người thay thế' : 'Substitute', '0', null, 7, '', true, false, 'ReplacePerson'),
        // textEditForm('8', 'I', 'textedit', null, null, langID === 'VN' ? 'Số tiền xin tạm ứng' : 'Cash advance', '0', null, 8, null, null, false, 'CashAdvance', 'ic_cur_vnd'),
        // textForm('9', 'I', 'textForm', null, null, langID === 'VN' ? 'Giải trình' : 'Explanation', '0', null, 9, '', true, false, 'Explanation'),
        // attachFileForm('10', 'I', 'attachFile', null, null, langID === 'VN' ? 'Đính kèm file' : 'Attach File', '0', null, 10, '', true, false, 'AttachFile'),
        // textEditForm('11', 'I', 'textedit', null, null, langID === 'VN' ? 'Lý do từ chối' : 'Reason reject', '0', null, 11, '', true, true, 'ReasonReject', 'ic_pen'),
    ]
}

export const overTimeApplicationApprovalForm = () => {
    let langID = userProfile.LangID
    return [
        textHorizontalForm('1', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Ngày đăng ký' : 'Registry date', '0', null, 1, '', true, false, 'RegistryDate', 'text'),
        textHorizontalForm('2', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Thời gian đăng ký' : 'Registry time', '0', null, 2, '', true, false, 'RegistryTime', 'text'),
        textHorizontalForm('3', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Loại OT' : 'Increase type', '0', null, 3, '', true, false, 'IncreaseType', 'text'),
        textHorizontalForm('4', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Số giờ OT ban ngày' : 'Hour day', '0', null, 4, '', true, false, 'HourDay', 'text'),
        textHorizontalForm('5', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Số giờ OT ban đêm' : 'Hour night', '0', null, 5, '', true, false, 'HourNight', 'text'),
        textHorizontalForm('6', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Số giờ đăng ký nghỉ bù' : 'Hour replace', '0', null, 6, '', true, false, 'HourReplace', 'text'),
        textHorizontalForm('7', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Số giờ tích lũy trong tháng / 30 giờ' : 'Accumulative month OT', '0', null, 7, '', true, false, 'AccumulativeMonthOT', 'text'),
        textHorizontalForm('8', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Số giờ tích lũy trong năm / 200 giờ' : 'Accumulative year OT', '0', null, 8, '', true, false, 'AccumulativeYearOT', 'text'),
        textHorizontalForm('9', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Lý do' : 'Reason', '0', null, 9, '', true, false, 'Reason', 'text'),
        textEditForm('10', 'I', 'textInputHorizontalForm', null, null, langID === 'VN' ? 'Lý do từ chối' : 'Reason reject', '0', null, 10, '', true, true, 'ReasonReject', 'ic_pen'),


        // textForm('1', 'I', 'textForm', null, null, langID === 'VN' ? 'Ngày đăng ký' : 'Registry date', '0', null, 1, '', true, false, 'RegistryDate'),
        // textForm('2', 'I', 'textForm', null, null, langID === 'VN' ? 'Thời gian đăng ký' : 'Registry time', '0', null, 2, '', true, false, 'RegistryTime'),
        // textForm('3', 'I', 'textForm', null, null, langID === 'VN' ? 'Loại OT' : 'Increase type', '0', null, 3, '', true, false, 'IncreaseType'),
        // textForm('4', 'I', 'textForm', null, null, langID === 'VN' ? 'Số giờ OT ban ngày' : 'Hour day', '0', null, 4, '', true, false, 'HourDay'),
        // textForm('5', 'I', 'textForm', null, null, langID === 'VN' ? 'Số giờ OT ban đêm' : 'Hour night', '0', null, 5, '', true, false, 'HourNight'),
        // textForm('6', 'I', 'textForm', null, null, langID === 'VN' ? 'Số giờ đăng ký nghỉ bù' : 'Hour replace', '0', null, 6, '', true, false, 'HourReplace'),
        // textForm('7', 'I', 'textForm', null, null, langID === 'VN' ? 'Số giờ tích lũy trong tháng / 30 giờ' : 'Accumulative month OT', '0', null, 7, '', true, false, 'AccumulativeMonthOT'),
        // textForm('8', 'I', 'textForm', null, null, langID === 'VN' ? 'Số giờ tích lũy trong năm / 200 giờ' : 'Accumulative year OT', '0', null, 8, '', true, false, 'AccumulativeYearOT'),
        // textForm('9', 'I', 'textForm', null, null, langID === 'VN' ? 'Lý do' : 'Reason', '0', null, 9, '', true, false, 'Reason'),
        // textEditForm('10', 'I', 'textedit', null, null, langID === 'VN' ? 'Lý do từ chối' : 'Reason reject', '0', null, 10, '', true, true, 'ReasonReject', 'ic_pen'),
    ]
}


export const logTMSApplicationApprovalForm = () => {
    let langID = userProfile.LangID
    return [

        textHorizontalForm('1', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Ngày' : 'Date', '0', null, 1, '', true, false, 'RegistryDate', 'text'),
        textHorizontalForm('2', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Ca làm việc' : 'Working schedule', '0', null, 2, '', true, false, 'WorkingSchedule', 'text'),
        textHorizontalForm('3', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Giờ làm việc' : 'Working time', '0', null, 3, '', true, false, 'WorkingTime', 'text'),
        textHorizontalForm('4', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Giờ làm viêc thực tế' : 'Actual working time', '0', null, 4, '', true, false, 'ActualWorkingTime', 'text'),
        textHorizontalForm('5', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Số giờ đi trễ' : 'Coming late', '0', null, 5, '', true, false, 'ComingLate', 'text'),
        textHorizontalForm('6', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Số giờ về sớm' : 'Leaving soon', '0', null, 6, '', true, false, 'LeavingSoon', 'text'),
        textHorizontalForm('7', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Ghi chú' : 'Note', '0', null, 7, '', true, false, 'Note', 'text'),
        textHorizontalForm('8', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Loại đăng ký' : 'Registry time', '0', null, 8, '', true, false, 'RegistryTime', 'text'),
        textHorizontalForm('9', 'I', 'textHorizontalForm', null, null, langID === 'VN' ? 'Lý do' : 'Reason', '0', null, 9, '', true, false, 'Reason', 'text'),
        textEditForm('10', 'I', 'textInputHorizontalForm', null, null, langID === 'VN' ? 'Lý do từ chối' : 'Reason reject', '0', null, 10, '', true, true, 'ReasonReject', 'ic_pen'),

        // textForm('1', 'I', 'textForm', null, null, langID === 'VN' ? 'Ngày' : 'Date', '0', null, 1, '', true, false, 'RegistryDate'),
        // textForm('2', 'I', 'textForm', null, null, langID === 'VN' ? 'Ca làm việc' : 'Working schedule', '0', null, 2, '', true, false, 'WorkingSchedule'),
        // textForm('3', 'I', 'textForm', null, null, langID === 'VN' ? 'Giờ làm việc' : 'Working time', '0', null, 3, '', true, false, 'WorkingTime'),
        // textForm('4', 'I', 'textForm', null, null, langID === 'VN' ? 'Giờ làm viêc thực tế' : 'Actual working time', '0', null, 4, '', true, false, 'ActualWorkingTime'),
        // textForm('5', 'I', 'textForm', null, null, langID === 'VN' ? 'Số giờ đi trễ' : 'Coming late', '0', null, 5, '', true, false, 'ComingLate'),
        // textForm('6', 'I', 'textForm', null, null, langID === 'VN' ? 'Số giờ về sớm' : 'Leaving soon', '0', null, 6, '', true, false, 'LeavingSoon'),
        // textForm('7', 'I', 'textForm', null, null, langID === 'VN' ? 'Ghi chú' : 'Note', '0', null, 7, '', true, false, 'Note'),
        // textForm('8', 'I', 'textForm', null, null, langID === 'VN' ? 'Loại đăng ký' : 'Registry time', '0', null, 8, '', true, false, 'RegistryTime'),
        // textForm('9', 'I', 'textForm', null, null, langID === 'VN' ? 'Lý do' : 'Reason', '0', null, 9, '', true, false, 'Reason'),
        // textEditForm('10', 'I', 'textedit', null, null, langID === 'VN' ? 'Lý do từ chối' : 'Reason reject', '0', null, 10, '', true, true, 'ReasonReject', 'ic_pen'),
    ]
}

export const searchReportWorkingHours = () => {
    let langID = userProfile.LangID
    return [
        twoDatePickerForm('1', 'I', 'twoDatePicker', null, null, langID === 'VN' ? 'Từ ngày' : 'From date', langID === 'VN' ? 'Đến ngày' : 'To date', '1', null, 1, true, 'FromDate', 'ToDate', ('01/01/' + new Date().getFullYear()), '31/12/' + new Date().getFullYear()),
    ]
}


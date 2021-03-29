import { userProfile } from '../../../config/settings'
const getNowDate = (type) => {
    let d = new Date()
    if (type === 1) {
        let t = d.getDay() + 1
        let day = ('0' + d.getDate()).substr(-2)
        let month = ('0' + (d.getMonth() + 1)).substr(-2)
        let year = d.getFullYear()

        return 'Thứ ' + t + ' ' + day + '/' + month + '/' + year
    } else if (type === 3) {
        let t = d.getDay() + 1
        let day = ('0' + d.getDate()).substr(-2)
        let month = ('0' + (d.getMonth() + 1)).substr(-2)
        let year = d.getFullYear()

        return day + '/' + month + '/' + year
    } else if (type === 4) {
        let hour = ('0' + d.getHours()).substr(-2)
        let minute = ('0' + d.getMinutes()).substr(-2)
        return hour + ':' + minute
    }
    else {
        let hour = ('0' + d.getHours()).substr(-2)
        let minute = ('0' + d.getMinutes()).substr(-2)
        let second = ('0' + d.getSeconds()).substr(-2)

        return hour + ':' + minute + ':' + second
    }
}

// Form chung
const textForm = (id, editable, require, LangID, label, tag, placeHolder) => {
    return {
        id: id,
        label: label,
        placeHolder: placeHolder,
        type: 'TEXT',
        value: '',
        editable: editable,
        tag: tag,
        require: require,
    }
}

const twoTextForm = (id, editable, require, LangID, labelFrom, labelTo, tagFrom, tagTo) => {
    return {
        id: id,
        labelFrom: labelFrom,
        labelTo: labelTo,
        type: 'TWO_TEXT',
        valueFrom: '',
        valueTo: '',
        editable: editable,
        require: require,
        tagFrom: tagFrom,
        tagTo: tagTo,
    }
}

const textInputForm = (id, editable, require, LangID, label, tag, placeHolder) => {
    return {
        id: id,
        label: label,
        placeHolder: placeHolder,
        type: 'TEXT_INPUT',
        value: '',
        editable: editable,
        tag: tag,
        require: require,
    }
}


const pickerForm = (id, editable, require, LangID, label, placeHolder, tag, mode) => {
    return {
        id: id,
        label: label,
        placeHolder: placeHolder,
        type: 'PICKER',
        value: '',
        defaultValue: '',
        items: [],
        editable: editable,
        tag: tag,
        mode: mode,
        require: require
    }
}


const datePickerForm = (id, editable, require, LangID, label, placeHolder, tag, mode) => {
    return {
        id: id,
        label: label,
        placeHolder: placeHolder,
        type: 'DATE_PICKER',
        value: '',
        defaultValue: '',
        items: [],
        editable: editable,
        tag: tag,
        mode: mode,
        require: require
    }
}

const toggleForm =(id, editable,require, langID,label,tag,mode)=>{
    return{
        id:id,
        label:label,
        type:'TOGGLE_PICKER',
        value:false,
        defaultValue:false,
        editable:editable,
        tag:tag, 
        mode:mode,
        require:require
    }
}


// id: id,
// label: langID === 'VN' ? 'Ngày đăng ký' : 'Register Date',
// placeHolder: langID === 'VN' ? 'Chọn ngày đăng ký' : 'Choose register date',
// type: 'DATE_PICKER',
// value: '',
// items: [],
// editable: editable,
// tag: 'registerDate',
// // mode: 'select',
// require: require






// Form thường
const leaveType = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Loại nghỉ' : 'Leave Type',
        placeHolder: LangID === 'VN' ? 'Chọn loại nghỉ' : 'Choose leave type',
        type: 'PICKER',
        value: '',
        defaultValue: '',
        items: [],
        editable: editable,
        tag: 'LeaveTypeID',
        mode: 'select',
        require: require
    }
}

const fromToDate = (id, editable, require, LangID) => {
    return {
        id: id,
        labelFrom: LangID === 'VN' ? 'Từ ngày' : 'From date',
        labelTo: LangID === 'VN' ? 'Đến ngày' : 'To date',
        type: 'TWO_DATEPICKER',
        valueFrom: getNowDate(3),
        valueTo: getNowDate(3),
        editable: editable,
        require: require,
        tagFrom: 'FromDate',
        tagTo: 'ToDate'
    }
}

const fromToTime = (id, editable, require, LangID) => {
    return {
        id: id,
        labelFrom: LangID === 'VN' ? 'Từ giờ' : 'From hour',
        labelTo: LangID === 'VN' ? 'Đến giờ' : 'To hour',
        type: 'TWO_TIMEPICKER',
        valueFrom: '08:30',
        valueTo: '17:30',
        editable: editable,
        require: require,
        tagFrom: 'FromTime',
        tagTo: 'ToTime'
    }
}

const fromToCheck = (id, editable, require, LangID) => {
    return {
        id: id,
        labelFrom: LangID === 'VN' ? 'Hôm sau' : 'Next day',
        labelTo: LangID === 'VN' ? 'Hôm sau' : 'Next day',
        type: 'TWO_CHECKBOX',
        valueFrom: '0',
        valueTo: '0',
        editable: editable,
        require: require,
        tagFrom: 'IsFromTom',
        tagTo: 'IsToTom'
    }
}

const twoButton = (id, editable, require, LangID) => {
    return {
        id: id,
        labelButton1: LangID === 'VN' ? 'Tính phép' : 'Calculate',
        labelButton2: LangID === 'VN' ? 'Xem thông tin phép' : 'Leave info',
        type: 'TWO_BUTTON',
        onPressButton1: undefined,
        onPressButton2: undefined,
        editable: editable,
        require: require,
        tag: 'twoButton'
    }
}

const totalLeaveHours = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Tổng số giờ nghỉ' : 'Total leave hours',
        type: 'TEXT',
        value: '',
        editable: editable,
        require: require,
        tag: 'totalLeaveHours'
    }
}
const totalLeaveDays = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Tổng số ngày nghỉ' : 'Total leave days',
        type: 'TEXT',
        value: '',
        editable: editable,
        require: require,
        tag: 'totalLeaveDays'
    }
}


const approver = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Người phê duyệt' : 'Approver',
        type: 'TEXT',
        value: '',
        editable: editable,
        require: require,
        tag: 'Approver'
    }
}

const substitute = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Người thay thế' : 'Substitute',
        type: 'PICKER_SEARCH',
        items: [],
        value: '',
        getItems: undefined,
        editable: editable,
        require: require,
        mode: 'employee',
        tag: 'ReplacePerson'
    }
}

const reason = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Lý do nghỉ' : 'Reason',
        type: 'TEXT_INPUT',
        value: '',
        editable: editable,
        require: require,
        tag: 'Reason'
    }
}

const notifyTo = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Thông báo cho' : 'Notify to',
        type: 'PICKER_SEARCH_MULTI',
        items: [],
        value: '',
        getItems: undefined,
        editable: editable,
        require: require,
        mode: 'alert',
        tag: 'notifyTo'
    }
}

const attachFile = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'File đính kèm' : 'Attach file',
        type: 'INPUT_FILE',
        value: '',
        editable: editable,
        require: require,
        tag: 'attachFile'
    }
}

const calBusinessTrip = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Tổng thời gian công tác' : 'Total',
        type: 'TEXT',
        value: '',
        editable: editable,
        require: require,
        tag: 'calBusinessTrip'
    }
}

const businessTripType = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Loại công tác' : 'Type of business trip',
        placeHolder: LangID === 'VN' ? 'Chọn loại nghỉ' : 'Choose leave type',
        type: 'PICKER',
        value: '',
        defaultValue: '',
        items: [],
        editable: editable,
        tag: 'businessTripType',
        mode: 'select',
        require: require
    }
}

const descriptionWork = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Nội dung công tác' : 'Description of work',
        type: 'TEXT_INPUT',
        value: '',
        editable: editable,
        require: require,
        tag: 'descriptionWork'
    }
}
const placeWork = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Địa điểm' : 'Place of work',
        type: 'TEXT',
        value: '',
        editable: editable,
        require: require,
        tag: 'descriptionWork'
    }
}

const cashAdvance = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Số tiền xin tạm ứng' : 'Cash advance',
        type: 'TEXT_INPUT',
        value: '',
        editable: editable,
        require: require,
        tag: 'Money'
    }
}

const explanation = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Giải trình (Nếu có)' : 'Explanation (If any)',
        type: 'TEXT_INPUT',
        value: '',
        editable: editable,
        require: require,
        tag: 'explanation'
    }
}
const registerDate = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Ngày đăng ký' : 'Register Date',
        placeHolder: LangID === 'VN' ? 'Chọn ngày đăng ký' : 'Choose register date',
        type: 'DATE_PICKER',
        value: '',
        items: [],
        editable: editable,
        tag: 'registerDate',
        // mode: 'select',
        require: require
    }
}


const workingSchedule = (id, editable, require, LangID) => {
    return {
        id: id,
        labelFrom: LangID === 'VN' ? 'Giờ vào - giờ ra' : 'Time in - Time out',
        labelTo: LangID === 'VN' ? 'Ca làm việc' : 'Working schedule',
        type: 'TWO_TEXT',
        valueFrom: '',
        valueTo: '',
        editable: editable,
        require: require,
        tagFrom: 'timeInOut',
        tagTo: 'workingSchedule'
    }
}

const calculateOT = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Tính OT' : 'Calculate',
        type: 'BUTTON',
        value: '',
        editable: editable,
        require: require,
        tag: 'calculateOT'
    }
}
const hoursOT = (id, editable, require, LangID) => {
    return {
        id: id,
        labelFrom: LangID === 'VN' ? 'Số giờ OT ban ngày' : 'OT hours at daytime',
        labelTo: LangID === 'VN' ? 'Số giờ OT ban đêm' : 'OT hours at night',
        type: 'TWO_TEXT',
        valueFrom: '',
        valueTo: '',
        editable: editable,
        require: require,
        tagFrom: 'daytimeOT',
        tagTo: 'nightOT'
    }
}


const registrationHoursOff = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Số giờ đăng ký nghỉ bù' : 'Hours off-in-lieu registration',
        type: 'TIME_PICKER',
        value: '',
        editable: editable,
        require: require,
        tag: 'registrationHoursOff'
    }
}


const accumulativeMonthOT = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Số giờ tích lũy trong tháng / 30 giờ' : 'Accumulative OT hour in month / 30 hours',
        type: 'TEXT',
        value: '',
        editable: editable,
        require: require,
        tag: 'accumulativeMonthOT'
    }
}
const accumulativeYearOT = (id, editable, require, LangID) => {
    return {
        id: id,
        label: LangID === 'VN' ? 'Số giờ tích lũy trong năm / 200 giờ' : 'Accumulative OT hour in month / 200 hours',
        type: 'TEXT',
        value: '',
        editable: editable,
        require: require,
        tag: 'accumulativeMonthOT'
    }
}

// Màn hình tạo đơn nghỉ phép
export const leaveApplication = () => {
    const { LangID } = userProfile
    return [
        leaveType('1', true, true, LangID),
        fromToDate('2', true, true, LangID),
        fromToTime('3', true, true, LangID),
        fromToCheck('4', true, false, LangID),
        twoButton('5', true, false, LangID),
        totalLeaveHours('6', true, true, LangID),
        totalLeaveDays('7', true, true, LangID),
        approver('8', true, true, LangID),
        substitute('9', true, true, LangID),
        reason('10', true, true, LangID),
        notifyTo('11', true, false, LangID),
        attachFile('12', true, false, LangID)
    ]
}

// Màn hình tạo đơn đi công tác
export const businessTripApplication = () => {
    const { LangID } = userProfile
    return [
        fromToDate('1', true, true, LangID),
        fromToTime('2', true, true, LangID),
        calBusinessTrip('3', true, true, LangID),
        businessTripType('4', true, false, LangID),
        approver('5', true, true, LangID),
        descriptionWork('6', true, true, LangID),
        placeWork('7', true, true, LangID),
        cashAdvance('8', true, true, LangID),
        explanation('9', true, false, LangID),
        notifyTo('10', true, false, LangID),
        attachFile('11', true, false, LangID)
    ]
}

// Màn hình tạo đơn làm ngoài giờ
export const overTimepApplication = () => {
    const { LangID } = userProfile
    return [
        registerDate('1', true, true, LangID),
        workingSchedule('2', true, false, LangID),
        fromToTime('3', true, true, LangID),
        fromToCheck('4', true, false, LangID),
        calculateOT('5', true, false, LangID),
        hoursOT('6', true, false, LangID),
        registrationHoursOff('7', true, true, LangID),
        accumulativeMonthOT('8', true, false, LangID),
        accumulativeYearOT('9', true, false, LangID),
        approver('10', true, true, LangID),
        reason('11', true, true, LangID)

    ]
}

// Màn hình duyệt đơn - Chi tiết đơn nghỉ phép
export const approveDetailLeaveApplication = () => {
    const { LangID } = userProfile
    return [
        textForm(
            '1',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Loại nghỉ' : 'Leave type',
            'leaveType',
            LangID === 'VN' ? 'Loại nghỉ' : 'Leave type',
        ),
        textForm(
            '2',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Thời gian nghỉ' : 'Duration',
            'duration',
            LangID === 'VN' ? 'Thời gian nghỉ' : 'Duration',
        ),
        textForm(
            '3',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Tổng số ngày nghỉ' : 'Total leave days',
            'totalLeaveDays',
            LangID === 'VN' ? 'Tổng số ngày nghỉ' : 'Total leave days',
        ),
        textForm(
            '4',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Tổng số giờ nghỉ' : 'Total leave hours',
            'totalLeaveHours',
            LangID === 'VN' ? 'Tổng số giờ nghỉ' : 'Total leave hours',
        ),
        textForm(
            '5',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Lý do nghỉ' : 'Reason',
            'reason',
            LangID === 'VN' ? 'Lý do nghỉ' : 'Reason',
        ),
        textForm(
            '6',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Ngày thao tác' : 'Action date',
            'actionDate',
            LangID === 'VN' ? 'Ngày thao tác' : 'Action date',
        ),
        textForm(
            '7',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Người thay thế' : 'Substitute',
            'substitute',
            LangID === 'VN' ? 'Người thay thế' : 'Substitute',
        ),
        notifyTo('8', false, false, LangID),
        attachFile('9', false, false, LangID),
        textInputForm(
            '10',
            true,
            true,
            LangID,
            LangID === 'VN' ? 'Lý do từ chối' : 'Reason of rejection',
            'reasonOfRejection',
            LangID === 'VN' ? 'Lý do từ chối' : 'Reason of rejection'
        )
    ]
}


// Màn hình duyệt đơn - Chi tiết đơn đi công tác
export const approveDetailBusinessTripApplication = () => {
    const { LangID } = userProfile
    return [
        textForm(
            '1',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Thời gian đăng ký' : 'Registration time',
            'registrationTime',
            LangID === 'VN' ? 'Thời gian đăng ký' : 'Registration time'
        ),
        textForm(
            '2',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Tổng cộng' : 'Total',
            'total',
            LangID === 'VN' ? 'Tổng cộng' : 'Total'
        ),
        textForm(
            '3',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Loại công tác' : 'Type of business trip',
            'typeOfBusinessTrip',
            LangID === 'VN' ? 'Loại công tác' : 'Type of business trip'
        ),
        textForm(
            '4',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Nội dung công tác' : 'Description of work',
            'descriptionOfWork',
            LangID === 'VN' ? 'Nội dung công tác' : 'Description of work'
        ),
        textForm(
            '5',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Địa điểm' : 'Place of work',
            'placeOfWork',
            LangID === 'VN' ? 'Địa điểm' : 'Place of work'
        ),
        textForm(
            '6',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Ngày thao tác' : 'Action date',
            'actionDate',
            LangID === 'VN' ? 'Ngày thao tác' : 'Action date'
        ),
        textForm(
            '7',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Người thay thế' : 'Assignee',
            'assignee',
            LangID === 'VN' ? 'Người thay thế' : 'Assignee'
        ),
        cashAdvance('8', false, false, LangID),
        textForm(
            '9',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Giải trình(nếu có)' : 'Explanation(if any)',
            'explanation',
            LangID === 'VN' ? 'Giải trình(nếu có)' : 'Explanation(if any)'
        ),
        attachFile('10', true, true, LangID),
        textInputForm(
            '11',
            true,
            true,
            LangID,
            LangID === 'VN' ? 'Lý do từ chối' : 'Reason of rejection',
            'reasonOfRejection',
            LangID === 'VN' ? 'Lý do từ chối' : 'Reason of rejection'
        )

    ]
}


// Màn hình duyệt đơn - Chi tiết đơn làm ngoài giờ
export const approveDetailOverTimeApplication = () => {
    const { LangID } = userProfile
    return [
        textForm(
            '1',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Ngày đăng ký' : 'Register date',
            'registerDate',
            LangID === 'VN' ? 'Ngày đăng ký' : 'Register date'
        ),
        textForm(
            '2',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Thời gian đăng ký' : 'Time OT',
            'timeOT',
            LangID === 'VN' ? 'Thời gian đăng ký' : 'Time OT'
        ),
        textForm(
            '3',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Loại OT' : 'Type of OT',
            'typeOfOT',
            LangID === 'VN' ? 'Loại OT' : 'Type of OT',
        ),
        textForm(
            '4',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Số giờ OT ban ngày' : 'OT hours at daytime',
            'OThoursAtDaytime',
            LangID === 'VN' ? 'Số giờ OT ban ngày' : 'OT hours at daytime'
        ),
        textForm(
            '5',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Số giờ OT ban đêm' : 'OT hours at night',
            'OThoursAtNight',
            LangID === 'VN' ? 'Số giờ OT ban đêm' : 'OT hours at night'
        ),
        textForm(
            '6',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Số giờ đăng ký nghỉ bù' : 'Hours off-in-lieu registration',
            'hoursOffInLieu ',
            LangID === 'VN' ? 'Số giờ đăng ký nghỉ bù' : 'Hours off-in-lieu registration'
        ),
        textForm(
            '7',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Số giờ tích lũy trong tháng / 30 giờ' : 'Accumulative OT hour in month / 30 hours',
            'accumulativeHourInMonth',
            LangID === 'VN' ? 'Số giờ tích lũy trong tháng / 30 giờ' : 'Accumulative OT hour in month / 30 hours'
        ),
        textForm(
            '8',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Số giờ tích lũy trong năm / 200 giờ' : 'Accumulative OT hour in year / 200 hours',
            'accumulativeHourInYear',
            LangID === 'VN' ? 'Số giờ tích lũy trong năm / 200 giờ' : 'Accumulative OT hour in year / 200 hours'
        ),
        textForm(
            '9',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Lý do' : 'Reason',
            'reason',
            LangID === 'VN' ? 'Lý do' : 'Reason'
        ),
        textForm(
            '10',
            true,
            true,
            LangID,
            LangID === 'VN' ? 'Lý do từ chối' : 'Reason of rejection',
            'reasonOfRejection',
            LangID === 'VN' ? 'Lý do từ chối' : 'Reason of rejection',
        ),

    ]
}


// Màn hình duyệt đơn - Chi tiết đơn làm ngoài giờ
export const approveDetailLogTMSApplication = () => {
    const { LangID } = userProfile
    return [
        textForm(
            '1',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Ngày' : 'Date',
            'date',
            LangID === 'VN' ? 'Ngày' : 'Date'
        ),
        textForm(
            '2',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Ca làm việc' : 'Shift',
            'shift',
            LangID === 'VN' ? 'Ca làm việc' : 'Shift'
        ),
        textForm(
            '3',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Giờ làm việc' : 'Working time',
            'workingTime',
            LangID === 'VN' ? 'Giờ làm việc' : 'Working time'
        ),
        textForm(
            '4',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Giờ làm thực tế' : 'Actual working time',
            'actualWorkingTime',
            LangID === 'VN' ? 'Giờ làm thực tế' : 'Actual working time'
        ),
        textForm(
            '5',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Số giờ đi trễ' : 'Coming late',
            'comingLate',
            LangID === 'VN' ? 'Số giờ đi trễ' : 'Coming late'
        ),
        textForm(
            '6',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Số giờ về sớm' : 'Leaving soon',
            'leavingSoon',
            LangID === 'VN' ? 'Số giờ về sớm' : 'Leaving soon'
        ),
        textForm(
            '7',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Ghi chú' : 'Note',
            'note',
            LangID === 'VN' ? 'Ghi chú' : 'Note'
        ),
        textForm(
            '8',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Loại đăng ký' : 'Application type',
            'applicationType',
            LangID === 'VN' ? 'Loại đăng ký' : 'Application type'
        ),
        textForm(
            '9',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Giờ đăng ký' : 'Applied time',
            'appliedTime',
            LangID === 'VN' ? 'Giờ đăng ký' : 'Applied time'
        ),
        textForm(
            '10',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Lý do' : 'Reason',
            'reason',
            LangID === 'VN' ? 'Lý do' : 'Reason'
        ),
        textForm(
            '11',
            true,
            true,
            LangID,
            LangID === 'VN' ? 'Lý do từ chối' : 'Reason of rejection',
            'reasonOfRejection',
            LangID === 'VN' ? 'Lý do từ chối' : 'Reason of rejection',
        ),
    ]
}

// Màn hình tạo đơn log TMS
export const logTMSApplication = () => {
    const { LangID } = userProfile
    return [
        textForm(
            '1',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Ngày' : 'Date',
            'date',
            LangID === 'VN' ? 'Ngày' : 'Date',
        ),
        twoTextForm(
            '2',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Ca làm việc' : 'Shift',
            LangID === 'VN' ? 'Giờ làm viêc' : 'Working time',
            'shift',
            'workingTime'
        ),
        twoTextForm(
            '3',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Giờ bắt đầu thực tế' : 'Actual starting time',
            LangID === 'VN' ? 'Giờ kết thúc thực tế' : 'Actual ending time',
            'actualStarting',
            'actualEnding'
        ),
        twoTextForm(
            '4',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Số giờ đi trễ' : 'Coming late',
            LangID === 'VN' ? 'Số giờ về sớm' : 'Leaving soon',
            'comingLate',
            'leavingSoon'
        ),
        textForm(
            '5',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Ghi chú' : 'Note',
            'note',
            LangID === 'VN' ? 'Ghi chú' : 'Note',
        ),
        pickerForm(
            '6',
            true,
            true,
            LangID,
            LangID === 'VN' ? 'Loại đăng ký' : 'Application type',
            LangID === 'VN' ? 'Chọn loại đăng ký' : 'Choose application type',
            'applicationType',
            'select'
        ),
        fromToTime('7', true, true, LangID),
        reason('8', true, false, LangID),
        attachFile('9', true, false, LangID),
        approver('10', false, true, LangID)

    ]
}


// Màn hình Thông tin cá nhân - Lý lịch - Tab thông tin cá nhân (EI - Employee Info)
export const privateInfoEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Họ và tên đệm' : 'Last name', 'lastName', LangID === 'VN' ? 'Họ và tên đệm' : 'Last name'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Tên khai sinh' : 'First name', 'firstName', LangID === 'VN' ? 'Tên khai sinh' : 'First name'),
        twoTextForm(
            '3',
            false,
            false,
            LangID,
            LangID === 'VN' ? 'Ngày sinh' : 'Date of birth',
            LangID === 'VN' ? 'Tuổi' : 'Age',
            'dayOfBirth',
            'age'
        ),
        textForm('4', false, false, LangID, LangID === 'VN' ? 'Giới tính' : 'Gender', 'gender', LangID === 'VN' ? 'Giới tính' : 'Gender'),
        textForm('5', false, false, LangID, LangID === 'VN' ? 'Nơi sinh' : 'Place of birth', 'placeOfBirth', LangID === 'VN' ? 'Nơi sinh' : 'Place of birth'),
        textForm('6', false, false, LangID, LangID === 'VN' ? 'Quê quán' : 'Native place', 'nativePlace', LangID === 'VN' ? 'Quê quán' : 'Native place'),
        textForm('7', false, false, LangID, LangID === 'VN' ? 'Quốc tịch' : 'Nationality', 'nationality', LangID === 'VN' ? 'Quốc tịch' : 'Nationality'),
        textForm('8', false, false, LangID, LangID === 'VN' ? 'Dân tộc' : 'Ethnic', 'ethnic', LangID === 'VN' ? 'Dân tộc' : 'Ethnic', 'ethnic'),
        textForm('9', false, false, LangID, LangID === 'VN' ? 'Tôn giáo' : 'Religion', 'religion', LangID === 'VN' ? 'Tôn giáo' : 'Religion')

    ]
}

// Màn hình Thông tin cá nhân - Lý lịch - Tab thuế (EI - Employee Info)

export const taxEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Mã số thuế' : 'Tax code', 'taxCode', LangID === 'VN' ? 'Mã số thuế' : 'Tax code'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Ngày cấp' : 'Tax issued date', 'taxIssuedDate', LangID === 'VN' ? 'Ngày cấp' : 'Tax issued date'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Nơi cấp' : 'Tax issued place', 'taxIssuedPlace', LangID === 'VN' ? 'Nơi cấp' : 'Tax issued place')
    ]
}

// Màn hình Thông tin cá nhân - Lý lịch - Tab Số CMND (EI - Employee Info)

export const identityNumberEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Số CMND' : 'ID No.', 'identityNumber', LangID === 'VN' ? 'Số CMND' : 'ID No.'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Ngày cấp' : 'ID issued date', 'idIssuedDate', LangID === 'VN' ? 'Ngày cấp' : 'ID issued date'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Nơi cấp' : 'ID issued place', 'idIssuedPlace', LangID === 'VN' ? 'Nơi cấp' : 'ID issued place')
    ]
}

// Màn hình Thông tin cá nhân - Lý lịch - Tab Thông tin liên hệ (EI - Employee Info)

export const contactInfoEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Email cá nhân' : 'Personal email', 'personalEmail', LangID === 'VN' ? 'Email cá nhân' : 'Personal email'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Email công ty' : 'Company email', 'companyEmail', LangID === 'VN' ? 'Email công ty' : 'companyEmail'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Số di động' : 'Mobile phone', 'mobilePhone', LangID === 'VN' ? 'Số di động' : 'Mobile phone'),
        textForm('4', false, false, LangID, LangID === 'VN' ? 'Điện thoại cơ quan' : 'Company phone', 'companyPhone', LangID === 'VN' ? 'Điện thoại cơ quan' : 'Company phone'),
        textForm('5', false, false, LangID, LangID === 'VN' ? 'Số máy lẻ' : 'Ext', 'ext', LangID === 'VN' ? 'Số máy lẻ' : 'Ext')
    ]
}


// Màn hình Thông tin cá nhân - Lý lịch - Sửa lý lịch (EI - Employee Info)
// Sửa thông tin cá nhân
export const editPrivateInfoEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Họ và tên đệm' : 'Last name', 'lastName', LangID === 'VN' ? 'Họ và tên đệm' : 'Last name'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Tên' : 'First name', 'firstName', LangID === 'VN' ? 'Tên' : 'First name'),
        datePickerForm('3', true, false, LangID, LangID === 'VN' ? 'Ngày sinh' : 'Day of birth', 'dayOfBirth', LangID === 'VN' ? 'Ngày sinh' : 'Day of birth'),
        textForm('4', false, false, LangID, LangID === 'VN' ? 'Giới tính' : 'Gender', 'gender', LangID === 'VN' ? 'Giới tính' : 'Gender'),
        textForm('5', false, false, LangID, LangID === 'VN' ? 'Quốc tịch' : 'Nationality', 'nationality', LangID === 'VN' ? 'Quốc tịch' : 'Nationality'),
        textForm('6', false, false, LangID, LangID === 'VN' ? 'Tôn giáo' : 'Religion', 'religion', LangID === 'VN' ? 'Tôn giáo' : 'Religion')
    ]
}

// Sửa thông tin thuế
export const editTaxEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Mã số thuế' : 'Tax code', 'taxCode', LangID === 'VN' ? 'Mã số thuế' : 'Tax code'),
        datePickerForm('2', true, false, LangID, LangID === 'VN' ? 'Ngày sinh' : 'Day of birth', LangID === 'VN' ? 'Ngày sinh' : 'Day of birth', 'dayOfBirth', 'select'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Nơi cấp' : 'Tax issued place', 'taxIssuedPlace', LangID === 'VN' ? 'Nơi cấp' : 'Tax issued place')
    ]
}


// Sửa số CMND
export const editIdentityNumberEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Số CMND' : 'Identity number', 'identityNumber', LangID === 'VN' ? 'Số CMND' : 'Identity number'),
        datePickerForm('2', true, false, LangID, LangID === 'VN' ? 'Ngày cấp' : 'ID issued date', LangID === 'VN' ? 'Ngày cấp' : 'ID issued date', 'idIssuedDate', 'select'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Nơi cấp' : 'ID issued place', 'idIssuedPlace', LangID === 'VN' ? 'Nơi cấp' : 'ID issued place')
    ]
}

// Sửa email cá nhân
export const editContactInfoEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Email cá nhân' : 'Personal email', 'personalEmail', LangID === 'VN' ? 'Email cá nhân' : 'Personal email')
    ]
}

// Màn hình Thông tin cá nhân - Trình độ học vấn
export const educationLevelEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Trình độ học vấn' : 'Educational level', 'educationalLevel', LangID === 'VN' ? 'Trình độ học vấn' : 'Educational level'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Trình độ chuyên môn' : 'Expertise Level', 'educationalLevel', LangID === 'VN' ? 'Trình độ chuyên môn' : 'Expertise level')
    ]
}

// Màn hình Thông tin cá nhân - Thông tin ngân hàng
export const bankPaymentEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Trả lương qua ngân hàng' : 'Pay via bank', 'payViaBank', LangID === 'VN' ? 'Trả lương qua ngân hàng' : 'Pay via bank'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Số tài khoản' : 'Account No', 'accountNo', LangID === 'VN' ? 'Số tài khoản' : 'Account No'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Ngân hàng' : 'Bank', 'bank', LangID === 'VN' ? 'Ngân hàng' : 'Bank'),
        textForm('4', false, false, LangID, LangID === 'VN' ? 'Chi nhánh' : 'Branch', 'branch', LangID === 'VN' ? 'Chi nhánh' : 'Branch')
    ]
}

// Màn hình Thông tin cá nhân - Địa chỉ - Tab Thường trú
export const addressPermanentEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Địa chỉ' : 'Address', 'address', LangID === 'VN' ? 'Địa chỉ' : 'Address'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Phường/ Xã' : 'Ward', 'ward', LangID === 'VN' ? 'Phường/ Xã' : 'Ward'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Quận/ Huyện' : 'District', 'district', LangID === 'VN' ? 'Quận/ Huyện' : 'District'),
        textForm('4', false, false, LangID, LangID === 'VN' ? 'Thành phố' : 'Province', 'province', LangID === 'VN' ? 'Thành phố' : 'Province')
    ]
}

// Màn hình Thông tin cá nhân - Địa chỉ - Tab Tạm trú
export const addressTemporaryEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Địa chỉ' : 'Address', 'address', LangID === 'VN' ? 'Địa chỉ' : 'Address'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Phường/ Xã' : 'Ward', 'ward', LangID === 'VN' ? 'Phường/ Xã' : 'Ward'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Quận/ Huyện' : 'District', 'district', LangID === 'VN' ? 'Quận/ Huyện' : 'District'),
        textForm('4', false, false, LangID, LangID === 'VN' ? 'Tỉnh/ Thành phố' : 'Province', 'province', LangID === 'VN' ? 'Thành phố' : 'Province')
    ]
}

// Màn hình Thông tin cá nhân - Địa chỉ - Sửa địa chỉ Thường trú
export const editAddressPermanentEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Địa chỉ' : 'Address', 'address', LangID === 'VN' ? 'Địa chỉ' : 'Address'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Phường/ Xã' : 'Ward', 'ward', LangID === 'VN' ? 'Phường/ Xã' : 'Ward'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Quận/ Huyện' : 'District', 'district', LangID === 'VN' ? 'Quận/ Huyện' : 'District'),
        textForm('4', false, false, LangID, LangID === 'VN' ? 'Thành phố' : 'Province', 'province', LangID === 'VN' ? 'Thành phố' : 'Province')
    ]
}

// Màn hình Thông tin cá nhân - Địa chỉ - Sửa địa chỉ Tạm trú
export const editAddressTemporaryEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Địa chỉ' : 'Address', 'address', LangID === 'VN' ? 'Địa chỉ' : 'Address'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Phường/ Xã' : 'Ward', 'ward', LangID === 'VN' ? 'Phường/ Xã' : 'Ward'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Quận/ Huyện' : 'District', 'district', LangID === 'VN' ? 'Quận/ Huyện' : 'District'),
        textForm('4', false, false, LangID, LangID === 'VN' ? 'Tỉnh/ Thành phố' : 'Province', 'province', LangID === 'VN' ? 'Thành phố' : 'Province')
    ]
}

// Màn hình Thông tin cá nhân - Liên hệ khẩn - Tab Liên hệ khẩn 1
export const emergencyContactFirstEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Tên' : 'Name', 'name', LangID === 'VN' ? 'Tên' : 'Name'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Điện thoại' : 'Phone', 'phone', LangID === 'VN' ? 'Điện thoại' : 'Phone'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Quan hệ' : 'Relationship', 'relationship', LangID === 'VN' ? 'Quan hệ' : 'Relationship'),
        textForm('4', false, false, LangID, LangID === 'VN' ? 'Địa chỉ' : 'Address', 'address', LangID === 'VN' ? 'Địa chỉ' : 'Address')
    ]
}

// Màn hình Thông tin cá nhân - Liên hệ khẩn - Tab Liên hệ khẩn 2
export const emergencyContactSecondEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Tên' : 'Name', 'name', LangID === 'VN' ? 'Tên' : 'Name'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Điện thoại' : 'Phone', 'phone', LangID === 'VN' ? 'Điện thoại' : 'Phone'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Quan hệ' : 'Relationship', 'relationship', LangID === 'VN' ? 'Quan hệ' : 'Relationship'),
        textForm('4', false, false, LangID, LangID === 'VN' ? 'Địa chỉ' : 'Address', 'address', LangID === 'VN' ? 'Địa chỉ' : 'Address')
    ]
}

// Màn hình Thông tin cá nhân - Liên hệ khẩn - Sửa thông tin Liên hệ khẩn 1
export const editEmergencyContactFirstEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Tên' : 'Name', 'name', LangID === 'VN' ? 'Tên' : 'Name'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Điện thoại' : 'Phone', 'phone', LangID === 'VN' ? 'Điện thoại' : 'Phone'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Quan hệ' : 'Relationship', 'relationship', LangID === 'VN' ? 'Quan hệ' : 'Relationship'),
        textForm('4', false, false, LangID, LangID === 'VN' ? 'Địa chỉ' : 'Address', 'address', LangID === 'VN' ? 'Địa chỉ' : 'Address')
    ]
}

// Màn hình Thông tin cá nhân - Liên hệ khẩn - Sửa thông tin Liên hệ khẩn 2
export const editEmergencyContactSecondEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Tên' : 'Name', 'name', LangID === 'VN' ? 'Tên' : 'Name'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Điện thoại' : 'Phone', 'phone', LangID === 'VN' ? 'Điện thoại' : 'Phone'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Quan hệ' : 'Relationship', 'relationship', LangID === 'VN' ? 'Quan hệ' : 'Relationship'),
        textForm('4', false, false, LangID, LangID === 'VN' ? 'Địa chỉ' : 'Address', 'address', LangID === 'VN' ? 'Địa chỉ' : 'Address')
    ]
}


// Màn hình Thông tin cá nhân - Thông tin khác
export const otherInfoEI = () => {
    const { LangID } = userProfile
    return [
        textForm('1', false, false, LangID, LangID === 'VN' ? 'Tham gia BHXH' : 'Join SI', 'joinSI', LangID === 'VN' ? 'Tham gia BHXH' : 'Join SI'),
        textForm('2', false, false, LangID, LangID === 'VN' ? 'Số sổ BHXH' : 'SI No.', 'siNO', LangID === 'VN' ? 'Số xổ BHXH' : 'SI No.'),
        textForm('3', false, false, LangID, LangID === 'VN' ? 'Ngày vào làm' : 'Start date', 'startDate', LangID === 'VN' ? 'Ngày vào làm' : 'Start date')
    ]
}

// Màn hình Thông tin cá nhân - Kinh nghiệm làm việc (Thêm / Sửa)
export const workingExperienceEI = () => {
    const { LangID } = userProfile
    return [
        textInputForm('1', true, true, LangID, 'Chức danh', 'chucDanh', 'Chức danh'),
        datePickerForm('2', true, true, LangID, 'Từ tháng', 'Chọn tháng', 'tuThang', 'select'),
        datePickerForm('3', true, true, LangID, 'Đến tháng', 'Chọn tháng', 'fromThang', 'select'),
        textInputForm('4', true, true, LangID, 'Thâm niên', 'thamNien', 'Thâm niên'),
        textInputForm('5', true, true, LangID, 'Công ty', 'congTy', 'Công ty'),
        textInputForm('4', true, true, LangID, 'Ghi chú', 'ghiChu', 'Ghi chú')
    ]
}

// Màn hình Thông tin cá nhân - Bằng cấp (Thêm / Sửa)
export const degreeEI = () => {
    const { LangID } = userProfile
    return [
        pickerForm('1', true, true, LangID, 'Bằng cấp', 'Bằng cấp', 'bangCap', 'select'),
        textInputForm('2', true, true, LangID, 'Là bằng cấp chính', 'loaiBangCap', 'Loại bằng cấp'),
        pickerForm('3', true, true, LangID, 'Chuyên ngành', 'Chuyên ngành', 'chuyenNganh', 'select'),
        pickerForm('4', true, true, LangID, 'Trường/ Nơi cấp', 'Trường/ Nơi cấp', 'truongNoiCap', 'select'),
        pickerForm('5', true, true, LangID, 'Xếp loại', 'Xếp loại', 'xepLoai', 'select'),
        textInputForm('6', true, true, LangID, 'Năm tốt nghiệp', 'namTotNghiep', 'Năm tốt nghiệp'),
        datePickerForm('7', true, true, LangID, 'Ngày cấp', 'Ngày cấp', 'ngayCap', 'select'),
        pickerForm('8', true, true, LangID, 'Hình thức đào tạo', 'Hình thức đào tạo', 'hinhThucDaoTao', 'select'),
        pickerForm('9', true, true, LangID, 'Nơi đào tạo', 'Nơi đào tạo', 'noiDaoTao', 'select')
    ]
}

export const certificateEI = () => {
    const { langID } = userProfile
    return [
        pickerForm('1', true, true, langID, "Chứng chỉ", "Chứng chỉ", 'chungChi', 'select'),
        toggleForm('2', true, true, langID, 'Tên chứng chỉ', 'tenChungChi', 'Tên chứng chỉ'),
        pickerForm('3', true, true, langID, "Xếp loại", "Xếp loại", 'xepLoai', 'select'),
        pickerForm('4', true, true, langID, 'Trường/ Nơi cấp', 'Trường/ Nơi cấp', 'truongNoiCap', 'select'),
        pickerForm('5', true, true, langID, 'Chuyên ngành', 'Chuyên ngành', 'chuyenNganh', 'select'),
        pickerForm('6', true, true, langID, 'Hình thức đào tạo', 'Hình thức đào tạo', 'hinhThucDaoTao', 'select'),
        datePickerForm('7', true, true, langID, 'Ngày cấp bằng', 'Ngày cấp bằng', 'ngayCapBang', 'select'),
        datePickerForm('8', true, true, langID, 'Hiệu lực từ', 'Hiệu lực từ', 'hieuLucTu', 'select'),
        datePickerForm('9', true, true, langID, 'Hiệu lực đến', 'Hiệu lực đến', 'hieuLucDen', 'select'),
    ]
}

export const relativeEI = () => {
    const { langID } = userProfile
    return [
        pickerForm('1', true, true, langID, "Quan hệ", "Quan hệ", 'quanHe', 'select'),
        textInputForm('2', true, true, langID, 'Họ', 'ho', 'Họ'),
        textInputForm('3', true, true, langID, 'Tên', 'ten', 'Tên'),
        datePickerForm('4', true, true, langID, 'Ngày sinh', 'Ngày sinh', 'ngaySinh', 'select'),
        toggleForm('5', true, true, langID, 'Là người phụ thuộc', 'laNguoiPhuThuoc', 'Là người phụ thuộc'),
        textInputForm('6', true, true, langID, 'Mã số thuế', 'maSoThue', 'Mã số thuế'),
    ]
}

export const visaEI = () => {
    const { langID } = userProfile
    return [
        textInputForm('1', true, true, langID, 'Số Visa', 'soVisa', 'Số Visa'),
        datePickerForm('2', true, true, langID, 'Ngày hiệu lục', 'Ngày hiệu lực', 'ngayHieuLuc', 'select'),
        textInputForm('3', true, true, langID, 'Nơi đăng ký', 'noiDangKy', 'Nơi đăng ký'),
        datePickerForm('4', true, true, langID, 'Từ ngày', 'Từ ngày', 'tuNgay', 'select'),
        datePickerForm('5', true, true, langID, 'Đến ngày', 'Đến ngày', 'denNgay', 'select'),
    ]
}
export const passPortEI = () => {
    const { langID } = userProfile
    return [
        textInputForm('1', true, true, langID, 'Số Passport', 'soPassport', 'Số Passport'),
        datePickerForm('2', true, true, langID, 'Ngày hiệu lục', 'Ngày hiệu lực', 'ngayHieuLuc', 'select'),
        textInputForm('3', true, true, langID, 'Nơi đăng ký', 'noiDangKy', 'Nơi đăng ký'),
        datePickerForm('4', true, true, langID, 'Từ ngày', 'Từ ngày', 'tuNgay', 'select'),
        datePickerForm('5', true, true, langID, 'Đến ngày', 'Đến ngày', 'denNgay', 'select'),
    ]
}


// Màn hình Thông tin cá nhân - Hộ chiếu (Thêm / Sửa)
// export const degreeEI = () => {
//     const { langID } = userProfile
//     return [
//         pickerForm('1', true, true, langID, 'Bằng cấp', 'Bằng cấp', 'bangCap', 'select'),
//         textInputForm('2', true, true, langID, 'Là bằng cấp chính', 'loaiBangCap', 'Loại bằng cấp'),
//         pickerForm('3', true, true, langID, 'Chuyên ngành', 'Chuyên ngành', 'chuyenNganh', 'select'),
//         pickerForm('4', true, true, langID, 'Trường/ Nơi cấp', 'Trường/ Nơi cấp', 'truongNoiCap', 'select'),
//         pickerForm('5', true, true, langID, 'Xếp loại', 'Xếp loại', 'xepLoai', 'select'),
//         textInputForm('6', true, true, langID, 'Năm tốt nghiệp', 'namTotNghiep', 'Năm tốt nghiệp'),
//         datePickerForm('7', true, true, langID, 'Ngày cấp', 'Ngày cấp', 'ngayCap', 'select'),
//         pickerForm('8', true, true, langID, 'Hình thức đào tạo', 'Hình thức đào tạo', 'hinhThucDaoTao', 'select'),
//         pickerForm('9', true, true, langID, 'Nơi đào tạo', 'Nơi đào tạo', 'noiDaoTao', 'select')
//     ]
// }



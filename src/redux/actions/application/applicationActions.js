// -----> Attach File Application

export const ATTACH_FILE_APPLICATION = 'ATTACH_FILE_APPLICATION'
export const ATTACH_FILE_APPLICATION_SUCCESS = 'ATTACH_FILE_APPLICATION_SUCCESS'
export const ATTACH_FILE_APPLICATION_FAILED = 'ATTACH_FILE_APPLICATION_FAILED'


export const WORKFLOW_DOWNLOAD_FILE = 'WORKFLOW_DOWNLOAD_FILE'
export const WORKFLOW_DOWNLOAD_FILE_SUCCESS = 'WORKFLOW_DOWNLOAD_FILE_SUCCESS'
export const WORKFLOW_DOWNLOAD_FILE_FAILED = 'WORKFLOW_DOWNLOAD_FILE_FAILED'

export const attachFileApplicationAction = (input) => {
    return {
        type: ATTACH_FILE_APPLICATION,
        input
    }
}


export const workflowDownloadFileAction = (input) => {
    return {
        type: WORKFLOW_DOWNLOAD_FILE,
        input
    }
}



// ----> LeaveApplication
export const GET_TYPES_LEAVE_APPLICATION = 'GET_TYPES_LEAVE_APPLICATION'
export const GET_TYPES_LEAVE_APPLICATION_SUCCESS = 'GET_TYPES_LEAVE_APPLICATION_SUCCESS'
export const GET_TYPES_LEAVE_APPLICATION_FAILED = 'GET_TYPES_LEAVE_APPLICATION_FAILED'

export const GET_SUBSTITUTE = 'GET_SUBSTITUTE'
export const GET_SUBSTITUTE_SUCCESS = 'GET_SUBSTITUTE_SUCCESS'
export const GET_SUBSTITUTE_FAILED = 'GET_SUBSTITUTE_FAILED'

export const CALCULATE_APPLICATION = 'CALCULATE_APPLICATION'
export const CALCULATE_APPLICATION_SUCCESS = 'CALCULATE_APPLICATION_SUCCESS'
export const CALCULATE_APPLICATION_FAILED = 'CALCULATE_APPLICATION_FAILED'

export const GET_TIMES_LEAVE_APPLICATION = 'GET_TIMES_LEAVE_APPLICATION'
export const GET_TIMES_LEAVE_APPLICATION_SUCCESS = 'GET_TIMES_LEAVE_APPLICATION_SUCCESS'
export const GET_TIMES_LEAVE_APPLICATION_FAILED = 'GET_TIMES_LEAVE_APPLICATION_FAILED'


export const GET_DAYS_LEAVE_APPLICATION = 'GET_DAYS_LEAVE_APPLICATION'
export const GET_DAYS_LEAVE_APPLICATION_SUCCESS = 'GET_DAYS_LEAVE_APPLICATION_SUCCESS'
export const GET_DAYS_LEAVE_APPLICATION_FAILED = 'GET_DAYS_LEAVE_APPLICATION_FAILED'


export const SAVE_DAYS_LEAVE_APPLICATION = 'SAVE_DAYS_LEAVE_APPLICATION'
export const SAVE_DAYS_LEAVE_APPLICATION_SUCCESS = 'SAVE_DAYS_LEAVE_APPLICATION_SUCCESS'
export const SAVE_DAYS_LEAVE_APPLICATION_FAILED = 'SAVE_DAYS_LEAVE_APPLICATION_FAILED'


export const RESET_SAVE_DAYS_LEAVE_APPLICATION = 'RESET_SAVE_DAYS_LEAVE_APPLICATION'


export const CREATE_LEAVE_APPLICATION = 'CREATE_LEAVE_APPLICATION'
export const CREATE_LEAVE_APPLICATION_SUCCESS = 'CREATE_LEAVE_APPLICATION_SUCCESS'
export const CREATE_LEAVE_APPLICATION_FAILED = 'CREATE_LEAVE_APPLICATION_FAILED'


export const SEARCH_LEAVE_APPLICATION = 'SEARCH_LEAVE_APPLICATION'
export const SEARCH_LEAVE_APPLICATION_SUCCESS = 'SEARCH_LEAVE_APPLICATION_SUCCESS'
export const SEARCH_LEAVE_APPLICATION_FAILED = 'SEARCH_LEAVE_APPLICATION_FAILED'

export const GET_DETAIL_LEAVE_APPLICATION = 'GET_DETAIL_LEAVE_APPLICATION'
export const GET_DETAIL_LEAVE_APPLICATION_SUCCESS = 'GET_DETAIL_LEAVE_APPLICATION_SUCCESS'
export const GET_DETAIL_LEAVE_APPLICATION_FAILED = 'GET_DETAIL_LEAVE_APPLICATION_FAILED'
export const RESET_GET_DETAIL_LEAVE_APPLICATION = 'RESET_GET_DETAIL_LEAVE_APPLICATION'

export const UPDATE_LEAVE_APPLICATION = 'UPDATE_LEAVE_APPLICATION'
export const UPDATE_LEAVE_APPLICATION_SUCCESS = 'UPDATE_LEAVE_APPLICATION_SUCCESS'
export const UPDATE_LEAVE_APPLICATION_FAILED = 'UPDATE_LEAVE_APPLICATION_FAILED'


export const DELETE_LEAVE_APPLICATION = 'DELETE_LEAVE_APPLICATION'
export const DELETE_LEAVE_APPLICATION_SUCCESS = 'DELETE_LEAVE_APPLICATION_SUCCESS'
export const DELETE_LEAVE_APPLICATION_FAILED = 'DELETE_LEAVE_APPLICATION_FAILED'


export const SEARCH_APPROVED_LEAVE_APPLICATION = 'SEARCH_APPROVED_LEAVE_APPLICATION'
export const SEARCH_APPROVED_LEAVE_APPLICATION_SUCCESS = 'SEARCH_APPROVED_LEAVE_APPLICATION_SUCCESS'
export const SEARCH_APPROVED_LEAVE_APPLICATION_FAILED = 'SEARCH_APPROVED_LEAVE_APPLICATION_FAILED'

export const GET_LIST_STATUS_APPLICATION = 'GET_LIST_STATUS_APPLICATION'
export const GET_LIST_STATUS_APPLICATION_SUCCESS = 'GET_LIST_STATUS_APPLICATION_SUCCESS'
export const GET_LIST_STATUS_APPLICATION_FAILED = 'GET_LIST_STATUS_APPLICATION_FAILED'

export const getTypesLeaveApplication = () => {
    return {
        type: GET_TYPES_LEAVE_APPLICATION
    }
}

export const getSubstitute = (input) => {
    return {
        type: GET_SUBSTITUTE,
        input: input
    }
}


export const calculateApplicationAction = (input) => {
    return {
        type: CALCULATE_APPLICATION,
        input: input
    }
}


export const getTimesLeaveApplicationAction = (input) => {
    return {
        type: GET_TIMES_LEAVE_APPLICATION,
        input: input
    }
}


export const getDaysLeaveApplicationAction = (input) => {
    return {
        type: GET_DAYS_LEAVE_APPLICATION,
        input: input
    }
}


export const saveDaysLeaveApplicationAction = (input) => {
    return {
        type: SAVE_DAYS_LEAVE_APPLICATION,
        input: input
    }
}


export const resetSaveDaysLeaveApplicationAction = () => {
    return {
        type: RESET_SAVE_DAYS_LEAVE_APPLICATION,
    }
}


export const createLeaveApplicationAction = (input) => {
    return {
        type: CREATE_LEAVE_APPLICATION,
        input
    }
}


export const searchLeaveApplicationAction = (input) => {
    return {
        type: SEARCH_LEAVE_APPLICATION,
        input
    }
}

export const getDetailLeaveApplicationAction = (input) => {
    return {
        type: GET_DETAIL_LEAVE_APPLICATION,
        input
    }
}

export const resetGetDetailLeaveApplicationAction = () => {
    return {
        type: RESET_GET_DETAIL_LEAVE_APPLICATION
    }
}


export const updateLeaveApplicationAction = (input) => {
    return {
        type: UPDATE_LEAVE_APPLICATION,
        input
    }
}


export const deleteLeaveApplicationAction = (input) => {
    return {
        type: DELETE_LEAVE_APPLICATION,
        input
    }
}

export const searchApprovedLeaveApplicationAction = (input) => {
    return {
        type: SEARCH_APPROVED_LEAVE_APPLICATION,
        input
    }
}

export const getListStatusApplicationAction = () => {
    return {
        type: GET_LIST_STATUS_APPLICATION
    }
}




// ------> Business Trip Application


export const GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION = 'GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION'
export const GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_SUCCESS = 'GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_SUCCESS'
export const GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_FAILED = 'GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_FAILED'

export const GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION = 'GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION'
export const GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_SUCCESS = 'GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_SUCCESS'
export const GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_FAILED = 'GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_FAILED'

export const GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION = 'GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION'
export const GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_SUCCESS = 'GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_SUCCESS'
export const GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_FAILED = 'GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_FAILED'

export const CALCULATE_BUSINESS_TRIP_APPLICATION = 'CALCULATE_BUSINESS_TRIP_APPLICATION'
export const CALCULATE_BUSINESS_TRIP_APPLICATION_SUCCESS = 'CALCULATE_BUSINESS_TRIP_APPLICATION_SUCCESS'
export const CALCULATE_BUSINESS_TRIP_APPLICATION_FAILED = 'CALCULATE_BUSINESS_TRIP_APPLICATION_FAILED'


export const SAVE_BUSINESS_TRIP_APPLICATION = 'SAVE_BUSINESS_TRIP_APPLICATION'
export const SAVE_BUSINESS_TRIP_APPLICATION_SUCCESS = 'SAVE_BUSINESS_TRIP_APPLICATION_SUCCESS'
export const SAVE_BUSINESS_TRIP_APPLICATION_FAILED = 'SAVE_BUSINESS_TRIP_APPLICATION_FAILED'


export const SEARCH_BUSINESS_TRIP_APPLICATION = 'SEARCH_BUSINESS_TRIP_APPLICATION'
export const SEARCH_BUSINESS_TRIP_APPLICATION_SUCCESS = 'SEARCH_BUSINESS_TRIP_APPLICATION_SUCCESS'
export const SEARCH_BUSINESS_TRIP_APPLICATION_FAILED = 'SEARCH_BUSINESS_TRIP_APPLICATION_FAILED'

export const GET_DETAIL_BUSINESS_TRIP_APPLICATION = 'GET_DETAIL_BUSINESS_TRIP_APPLICATION'
export const GET_DETAIL_BUSINESS_TRIP_APPLICATION_SUCCESS = 'GET_DETAIL_BUSINESS_TRIP_APPLICATION_SUCCESS'
export const GET_DETAIL_BUSINESS_TRIP_APPLICATION_FAILED = 'GET_DETAIL_BUSINESS_TRIP_APPLICATION_FAILED'
export const RESET_GET_DETAIL_BUSINESS_TRIP_APPLICATION = 'RESET_GET_DETAIL_BUSINESS_TRIP_APPLICATION'

export const WITH_DRAW_BUSINESS_TRIP_APPLICATION = 'WITH_DRAW_BUSINESS_TRIP_APPLICATION'
export const WITH_DRAW_BUSINESS_TRIP_APPLICATION_SUCCESS = 'WITH_DRAW_BUSINESS_TRIP_APPLICATION_SUCCESS'
export const WITH_DRAW_BUSINESS_TRIP_APPLICATION_FAILED = 'WITH_DRAW_BUSINESS_TRIP_APPLICATION_FAILED'

export const DELETE_BUSINESS_TRIP_APPLICATION = 'DELETE_BUSINESS_TRIP_APPLICATION'
export const DELETE_BUSINESS_TRIP_APPLICATION_SUCCESS = 'DELETE_BUSINESS_TRIP_APPLICATION_SUCCESS'
export const DELETE_BUSINESS_TRIP_APPLICATION_FAILED = 'DELETE_BUSINESS_TRIP_APPLICATION_FAILED'

export const SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION = 'SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION'
export const SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_SUCCESS = 'SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_SUCCESS'
export const SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_FAILED = 'SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_FAILED'


export const getListTypeBusinessTripApplicationAction = () => {
    return {
        type: GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION
    }
}

export const getListCurrencyBusinessTripApplicationAction = () => {
    return {
        type: GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION
    }
}

export const getListEmployeeBusinessTripApplicationAction = () => {
    return {
        type: GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION
    }
}

export const calculateBusinessTripApplicationAction = (input) => {
    return {
        type: CALCULATE_BUSINESS_TRIP_APPLICATION,
        input: input
    }
}


export const saveBusinessTripApplicationAction = (input) => {
    return {
        type: SAVE_BUSINESS_TRIP_APPLICATION,
        input: input
    }
}


export const searchBusinessTripApplicationAction = (input) => {
    return {
        type: SEARCH_BUSINESS_TRIP_APPLICATION,
        input: input
    }
}


export const getDetailBusinessTripApplicationAction = (input) => {
    return {
        type: GET_DETAIL_BUSINESS_TRIP_APPLICATION,
        input: input
    }
}

export const resetGetDetailBusinessTripApplicationAction = () => {
    return {
        type: RESET_GET_DETAIL_BUSINESS_TRIP_APPLICATION
    }
}

export const withDrawBusinessTripApplicationAction = (input) => {
    return {
        type: WITH_DRAW_BUSINESS_TRIP_APPLICATION,
        input: input
    }
}


export const deleteBusinessTripApplicationAction = (input) => {
    return {
        type: DELETE_BUSINESS_TRIP_APPLICATION,
        input: input
    }
}


export const searchApprovedBusinessTripApplicationAction = (input) => {
    return {
        type: SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION,
        input: input
    }
}


// --------------> Over Time Application


export const GET_DATE_INFO_OVERTIME_APPLICATION = 'GET_DATE_INFO_OVERTIME_APPLICATION'
export const GET_DATE_INFO_OVERTIME_APPLICATION_SUCCESS = 'GET_DATE_INFO_OVERTIME_APPLICATION_SUCCESS'
export const GET_DATE_INFO_OVERTIME_APPLICATION_FAILED = 'GET_DATE_INFO_OVERTIME_APPLICATION_FAILED'

export const CALCULATE_OVERTIME_APPLICATION = 'CALCULATE_OVERTIME_APPLICATION'
export const CALCULATE_OVERTIME_APPLICATION_SUCCESS = 'CALCULATE_OVERTIME_APPLICATION_SUCCESS'
export const CALCULATE_OVERTIME_APPLICATION_FAILED = 'CALCULATE_OVERTIME_APPLICATION_FAILED'


export const GET_APPROVER_OVERTIME_APPLICATION = 'GET_APPROVER_OVERTIME_APPLICATION'
export const GET_APPROVER_OVERTIME_APPLICATION_SUCCESS = 'GET_APPROVER_OVERTIME_APPLICATION_SUCCESS'
export const GET_APPROVER_OVERTIME_APPLICATION_FAILED = 'GET_APPROVER_OVERTIME_APPLICATION_FAILED'


export const SAVE_OVERTIME_APPLICATION = 'SAVE_OVERTIME_APPLICATION'
export const SAVE_OVERTIME_APPLICATION_SUCCESS = 'SAVE_OVERTIME_APPLICATION_SUCCESS'
export const SAVE_OVERTIME_APPLICATION_FAILED = 'SAVE_OVERTIME_APPLICATION_FAILED'


export const GET_LIST_STATUS_OVERTIME_APPLICATION = 'GET_LIST_STATUS_OVERTIME_APPLICATION'
export const GET_LIST_STATUS_OVERTIME_APPLICATION_SUCCESS = 'GET_LIST_STATUS_OVERTIME_APPLICATION_SUCCESS'
export const GET_LIST_STATUS_OVERTIME_APPLICATION_FAILED = 'GET_LIST_STATUS_OVERTIME_APPLICATION_FAILED'


export const SEARCH_OVERTIME_APPLICATION = 'SEARCH_OVERTIME_APPLICATION'
export const SEARCH_OVERTIME_APPLICATION_SUCCESS = 'SEARCH_OVERTIME_APPLICATION_SUCCESS'
export const SEARCH_OVERTIME_APPLICATION_FAILED = 'SEARCH_OVERTIME_APPLICATION_FAILED'

export const GET_DETAIL_OVERTIME_APPLICATION = 'GET_DETAIL_OVERTIME_APPLICATION'
export const GET_DETAIL_OVERTIME_APPLICATION_SUCCESS = 'GET_DETAIL_OVERTIME_APPLICATION_SUCCESS'
export const GET_DETAIL_OVERTIME_APPLICATION_FAILED = 'GET_DETAIL_OVERTIME_APPLICATION_FAILED'
export const RESET_GET_DETAIL_OVERTIME_APPLICATION = 'RESET_GET_DETAIL_OVERTIME_APPLICATION'

export const WITH_DRAW_OVERTIME_APPLICATION = 'WITH_DRAW_OVERTIME_APPLICATION'
export const WITH_DRAW_OVERTIME_APPLICATION_SUCCESS = 'WITH_DRAW_OVERTIME_APPLICATION_SUCCESS'
export const WITH_DRAW_OVERTIME_APPLICATION_FAILED = 'WITH_DRAW_OVERTIME_APPLICATION_FAILED'

export const DELETE_OVERTIME_APPLICATION = 'DELETE_OVERTIME_APPLICATION'
export const DELETE_OVERTIME_APPLICATION_SUCCESS = 'DELETE_OVERTIME_APPLICATION_SUCCESS'
export const DELETE_OVERTIME_APPLICATION_FAILED = 'DELETE_OVERTIME_APPLICATION_FAILED'

export const SEARCH_APPROVED_OVERTIME_APPLICATION = 'SEARCH_APPROVED_OVERTIME_APPLICATION'
export const SEARCH_APPROVED_OVERTIME_APPLICATION_SUCCESS = 'SEARCH_APPROVED_OVERTIME_APPLICATION_SUCCESS'
export const SEARCH_APPROVED_OVERTIME_APPLICATION_FAILED = 'SEARCH_APPROVED_OVERTIME_APPLICATION_FAILED'

export const getDateInfoOverTimeApplicationAction = (input) => {
    return {
        type: GET_DATE_INFO_OVERTIME_APPLICATION,
        input: input
    }
}


export const calculateOverTimeApplicationAction = (input) => {
    return {
        type: CALCULATE_OVERTIME_APPLICATION,
        input: input
    }
}

export const getApproverOverTimeApplicationAction = () => {
    return {
        type: GET_APPROVER_OVERTIME_APPLICATION
    }
}


export const saveOverTimeApplicationAction = (input) => {
    return {
        type: SAVE_OVERTIME_APPLICATION,
        input: input
    }
}


export const searchOverTimeApplicationAction = (input) => {
    return {
        type: SEARCH_OVERTIME_APPLICATION,
        input: input
    }
}

export const getListStatusOverTimeApplicationAction = (input) => {
    return {
        type: GET_LIST_STATUS_OVERTIME_APPLICATION,
        input: input
    }
}


export const getDetailOverTimeApplicationAction = (input) => {
    return {
        type: GET_DETAIL_OVERTIME_APPLICATION,
        input: input
    }
}

export const resetGetDetailOverTimeApplicationAction = () => {
    return {
        type: RESET_GET_DETAIL_OVERTIME_APPLICATION
    }
}
// 

export const withDrawOverTimeApplicationAction = (input) => {
    return {
        type: WITH_DRAW_OVERTIME_APPLICATION,
        input: input
    }
}

export const deleteOverTimeApplicationAction = (input) => {
    return {
        type: DELETE_OVERTIME_APPLICATION,
        input: input
    }
}

export const searchApprovedOverTimeApplicationAction = (input) => {
    return {
        type: SEARCH_APPROVED_OVERTIME_APPLICATION,
        input: input
    }
}

// --------------> Log TMS Application


export const GET_ADJUSTMENT_STATUS_LOG_TMS = 'GET_ADJUSTMENT_STATUS_LOG_TMS'
export const GET_ADJUSTMENT_STATUS_LOG_TMS_SUCCESS = 'GET_ADJUSTMENT_STATUS_LOG_TMS_SUCCESS'
export const GET_ADJUSTMENT_STATUS_LOG_TMS_FAILED = 'GET_ADJUSTMENT_STATUS_LOG_TMS_FAILED'


export const GET_FINGER_PRINT_RECORD_LOG_TMS = 'GET_FINGER_PRINT_RECORD_LOG_TMS'
export const GET_FINGER_PRINT_RECORD_LOG_TMS_SUCCESS = 'GET_FINGER_PRINT_RECORD_LOG_TMS_SUCCESS'
export const GET_FINGER_PRINT_RECORD_LOG_TMS_FAILED = 'GET_FINGER_PRINT_RECORD_LOG_TMS_FAILED'


export const GET_APPROVAL_STATUS_LOG_TMS = 'GET_APPROVAL_STATUS_LOG_TMS'
export const GET_APPROVAL_STATUS_LOG_TMS_SUCCESS = 'GET_APPROVAL_STATUS_LOG_TMS_SUCCESS'
export const GET_APPROVAL_STATUS_LOG_TMS_FAILED = 'GET_APPROVAL_STATUS_LOG_TMS_FAILED'


export const SEARCH_LOG_TMS_APPLICATION = 'SEARCH_LOG_TMS_APPLICATION'
export const SEARCH_LOG_TMS_APPLICATION_SUCCESS = 'SEARCH_LOG_TMS_APPLICATION_SUCCESS'
export const SEARCH_LOG_TMS_APPLICATION_FAILED = 'SEARCH_LOG_TMS_APPLICATION_FAILED'


export const GET_DETAIL_LOG_TMS_APPLICATION = 'GET_DETAIL_LOG_TMS_APPLICATION'
export const GET_DETAIL_LOG_TMS_APPLICATION_SUCCESS = 'GET_DETAIL_LOG_TMS_APPLICATION_SUCCESS'
export const GET_DETAIL_LOG_TMS_APPLICATION_FAILED = 'GET_DETAIL_LOG_TMS_APPLICATION_FAILED'
export const RESET_GET_DETAIL_LOG_TMS_APPLICATION = 'RESET_GET_DETAIL_LOG_TMS_APPLICATION'

export const GET_LOG_TYPE_LOG_TMS_APPLICATION = 'GET_LOG_TYPE_LOG_TMS_APPLICATION'
export const GET_LOG_TYPE_LOG_TMS_APPLICATION_SUCCESS = 'GET_LOG_TYPE_LOG_TMS_APPLICATION_SUCCESS'
export const GET_LOG_TYPE_LOG_TMS_APPLICATION_FAILED = 'GET_LOG_TYPE_LOG_TMS_APPLICATION_FAILED'


export const WITH_DRAW_LOG_TMS_APPLICATION = 'WITH_DRAW_LOG_TMS_APPLICATION'
export const WITH_DRAW_LOG_TMS_APPLICATION_SUCCESS = 'WITH_DRAW_LOG_TMS_APPLICATION_SUCCESS'
export const WITH_DRAW_LOG_TMS_APPLICATION_FAILED = 'WITH_DRAW_LOG_TMS_APPLICATION_FAILED'

export const DELETE_LOG_TMS_APPLICATION = 'DELETE_LOG_TMS_APPLICATION'
export const DELETE_LOG_TMS_APPLICATION_SUCCESS = 'DELETE_LOG_TMS_APPLICATION_SUCCESS'
export const DELETE_LOG_TMS_APPLICATION_FAILED = 'DELETE_LOG_TMS_APPLICATION_FAILED'

export const SAVE_LOG_TMS_APPLICATION = 'SAVE_LOG_TMS_APPLICATION'
export const SAVE_LOG_TMS_APPLICATION_SUCCESS = 'SAVE_LOG_TMS_APPLICATION_SUCCESS'
export const SAVE_LOG_TMS_APPLICATION_FAILED = 'SAVE_LOG_TMS_APPLICATION_FAILED'


export const SEARCH_APPROVED_LOG_TMS_APPLICATION = 'SEARCH_APPROVED_LOG_TMS_APPLICATION'
export const SEARCH_APPROVED_LOG_TMS_APPLICATION_SUCCESS = 'SEARCH_APPROVED_LOG_TMS_APPLICATION_SUCCESS'
export const SEARCH_APPROVED_LOG_TMS_APPLICATION_FAILED = 'SEARCH_APPROVED_LOG_TMS_APPLICATION_FAILED'


export const getAdjustmentStatusLogTMSApplicationAction = () => {
    return {
        type: GET_ADJUSTMENT_STATUS_LOG_TMS
    }
}
export const getFingerPrintRecordLogTMSApplicationAction = () => {
    return {
        type: GET_FINGER_PRINT_RECORD_LOG_TMS
    }
}
export const getApprovalStatusLogTMSApplicationAction = () => {
    return {
        type: GET_APPROVAL_STATUS_LOG_TMS
    }
}


export const searchLogTMSApplicationAction = (input) => {
    return {
        type: SEARCH_LOG_TMS_APPLICATION,
        input
    }
}


export const getDetailLogTMSApplicationAction = (input) => {
    return {
        type: GET_DETAIL_LOG_TMS_APPLICATION,
        input
    }
}

export const resetGetDetailLogTMSApplicationAction = () => {
    return {
        type: RESET_GET_DETAIL_LOG_TMS_APPLICATION
    }
}
// 

export const getLogTypeLogTMSApplicationAction = () => {
    return {
        type: GET_LOG_TYPE_LOG_TMS_APPLICATION,
    }
}


export const withDrawLogTMSApplicationAction = (input) => {
    return {
        type: WITH_DRAW_LOG_TMS_APPLICATION,
        input
    }
}

export const deleteLogTMSApplicationAction = (input) => {
    return {
        type: DELETE_LOG_TMS_APPLICATION,
        input
    }
}

export const saveLogTMSApplicationAction = (input) => {
    return {
        type: SAVE_LOG_TMS_APPLICATION,
        input
    }
}


export const searchApprovedLogTMSApplicationAction = (input) => {
    return {
        type: SEARCH_APPROVED_LOG_TMS_APPLICATION,
        input
    }
}

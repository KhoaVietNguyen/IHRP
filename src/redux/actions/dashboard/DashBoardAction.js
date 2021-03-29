export const GET_DASH_BOARD_APPROVAL = 'GET_DASH_BOARD_APPROVAL'
export const GET_DASH_BOARD_APPROVAL_SUCCESS = 'GET_DASH_BOARD_APPROVAL_SUCCESS'
export const GET_DASH_BOARD_APPROVAL_ERROR = 'GET_DASH_BOARD_APPROVAL_ERROR'

export const GET_DASH_BOARD_CURRENT_SHIFT = 'GET_DASH_BOARD_CURRENT_SHIFT'
export const GET_DASH_BOARD_CURRENT_SHIFT_SUCCESS = 'GET_DASH_BOARD_CURRENT_SHIFT_SUCCESS'
export const GET_DASH_BOARD_CURRENT_SHIFT_ERROR = 'GET_DASH_BOARD_CURRENT_SHIFT_ERROR'

export const GET_DASH_BOARD_NEXT_SHIFT = 'GET_DASH_BOARD_NEXT_SHIFT'
export const GET_DASH_BOARD_NEXT_SHIFT_SUCCESS = 'GET_DASH_BOARD_NEXT_SHIFT_SUCCESS'
export const GET_DASH_BOARD_NEXT_SHIFT_ERROR = 'GET_DASH_BOARD_NEXT_SHIFT_ERROR'

export const GET_DASH_BOARD_WORKING_HOUR = 'GET_DASH_BOARD_WORKING_HOUR'
export const GET_DASH_BOARD_WORKING_HOUR_SUCCESS = 'GET_DASH_BOARD_WORKING_HOUR_SUCCESS'
export const GET_DASH_BOARD_WORKING_HOUR_ERROR = 'GET_DASH_BOARD_WORKING_HOUR_ERROR'

export const GET_DASH_BOARD_LEAVE_INFO = 'GET_DASH_BOARD_LEAVE_INFO'
export const GET_DASH_BOARD_LEAVE_INFO_SUCCESS = 'GET_DASH_BOARD_LEAVE_INFO_SUCCESS'
export const GET_DASH_BOARD_LEAVE_INFO_ERROR = 'GET_DASH_BOARD_LEAVE_INFO_ERROR'

export const GET_DASH_BOARD_FORM = 'GET_DASH_BOARD_FORM'
export const GET_DASH_BOARD_FORM_SUCCESS = 'GET_DASH_BOARD_FORM_SUCCESS'
export const GET_DASH_BOARD_FORM_ERROR = 'GET_DASH_BOARD_FORM_ERROR'

export const getDashBoardFormAction = (data) => {
    return {
        type: GET_DASH_BOARD_FORM,
        data:data
    }
}

export const getDashBoardApprovalAction = (data) => {
    return {
        type: GET_DASH_BOARD_APPROVAL,
        data:data
    }
}
export const getDashBoardCurrentShiftAction = (data) => {
    return {
        type: GET_DASH_BOARD_CURRENT_SHIFT,
        data:data
    }
}
export const getDashBoardNextShiftAction = (data) => {
    return {
        type: GET_DASH_BOARD_NEXT_SHIFT,
        data:data
    }
}
export const getDashBoardWorkingHourAction = (data) => {
    return {
        type: GET_DASH_BOARD_WORKING_HOUR,
        data:data
    }
}
export const getDashBoardLeaveInfoAction = (data) => {
    return {
        type: GET_DASH_BOARD_LEAVE_INFO,
        data:data
    }
}

import {
    APPLICATION_APPROVAL_ACTION,
    APPLICATION_APPROVAL_ACTION_SUCCESS,
    APPLICATION_APPROVAL_ACTION_FAILED,
    RESET_APPLICATION_APPROVAL_ACTION,

    GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION,
    GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION_SUCCESS,
    GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION_ERROR,

} from '../../actions/application/applicationApprovalActions';
import { POPUP_CALL_RESET_ALL_REDUCERS } from '../../actions/actionTypes'
const initialState = {
    fetchingApplicationApproval: false,
    dataApplicationApproval: undefined,
    errorApplicationApproval: undefined,

    fetchingListCheckInOutGPSApplication: false,
    dataListCheckInOutGPSApplication: undefined,
    errorListCheckInOutGPSApplication: undefined,
}

const applicationApprovalReducers = (state = initialState, action) => {

    switch (action.type) {

        case GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION:
            return Object.assign({}, state, {
                fetchingListCheckInOutGPSApplication: true,
                dataListCheckInOutGPSApplication: undefined,
                errorListCheckInOutGPSApplication: undefined,
            })

        case GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION_SUCCESS:
            return Object.assign({}, state, {
                fetchingListCheckInOutGPSApplication: false,
                dataListCheckInOutGPSApplication: action.data,
                errorListCheckInOutGPSApplication: undefined,
            })

        case GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION_ERROR:
            return Object.assign({}, state, {

                fetchingListCheckInOutGPSApplication: false,
                dataListCheckInOutGPSApplication: undefined,
                errorListCheckInOutGPSApplication: action.error,

            })

        //



        case APPLICATION_APPROVAL_ACTION:
            return Object.assign({}, state, {
                fetchingApplicationApproval: true,
                dataApplicationApproval: undefined,
                errorApplicationApproval: undefined,
            })

        case APPLICATION_APPROVAL_ACTION_SUCCESS:
            return Object.assign({}, state, {
                fetchingApplicationApproval: false,
                dataApplicationApproval: action.data,
                errorApplicationApproval: undefined,
            })

        case APPLICATION_APPROVAL_ACTION_FAILED:
            return Object.assign({}, state, {
                fetchingApplicationApproval: false,
                dataApplicationApproval: undefined,
                errorApplicationApproval: action.error,
            })
        case RESET_APPLICATION_APPROVAL_ACTION:
            return Object.assign({}, state, {
                fetchingApplicationApproval: false,
                dataApplicationApproval: undefined,
                errorApplicationApproval: undefined,
            })
        case POPUP_CALL_RESET_ALL_REDUCERS:
            return Object.assign({}, state, {
                fetchingApplicationApproval: false,
                dataApplicationApproval: undefined,
                errorApplicationApproval: undefined,

                fetchingListCheckInOutGPSApplication: false,
                dataListCheckInOutGPSApplication: undefined,
                errorListCheckInOutGPSApplication: undefined,
            })
        default:
            return state;
    }
}

export default applicationApprovalReducers;
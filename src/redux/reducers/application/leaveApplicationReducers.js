
import {
    GET_LIST_STATUS_APPLICATION_FAILED,
    GET_LIST_STATUS_APPLICATION,
    GET_LIST_STATUS_APPLICATION_SUCCESS,

    GET_SUBSTITUTE,
    GET_SUBSTITUTE_FAILED,
    GET_SUBSTITUTE_SUCCESS,

    GET_TYPES_LEAVE_APPLICATION,
    GET_TYPES_LEAVE_APPLICATION_FAILED,
    GET_TYPES_LEAVE_APPLICATION_SUCCESS,

    CALCULATE_APPLICATION,
    CALCULATE_APPLICATION_FAILED,
    CALCULATE_APPLICATION_SUCCESS,

    GET_TIMES_LEAVE_APPLICATION,
    GET_TIMES_LEAVE_APPLICATION_FAILED,
    GET_TIMES_LEAVE_APPLICATION_SUCCESS,

    GET_DAYS_LEAVE_APPLICATION_SUCCESS,
    GET_DAYS_LEAVE_APPLICATION_FAILED,
    GET_DAYS_LEAVE_APPLICATION,

    SAVE_DAYS_LEAVE_APPLICATION,
    SAVE_DAYS_LEAVE_APPLICATION_FAILED,
    SAVE_DAYS_LEAVE_APPLICATION_SUCCESS,
    RESET_SAVE_DAYS_LEAVE_APPLICATION,

    CREATE_LEAVE_APPLICATION,
    CREATE_LEAVE_APPLICATION_FAILED,
    CREATE_LEAVE_APPLICATION_SUCCESS,

    SEARCH_LEAVE_APPLICATION,
    SEARCH_LEAVE_APPLICATION_FAILED,
    SEARCH_LEAVE_APPLICATION_SUCCESS,

    GET_DETAIL_LEAVE_APPLICATION,
    GET_DETAIL_LEAVE_APPLICATION_FAILED,
    GET_DETAIL_LEAVE_APPLICATION_SUCCESS,

    UPDATE_LEAVE_APPLICATION,
    UPDATE_LEAVE_APPLICATION_FAILED,
    UPDATE_LEAVE_APPLICATION_SUCCESS,

    DELETE_LEAVE_APPLICATION,
    DELETE_LEAVE_APPLICATION_FAILED,
    DELETE_LEAVE_APPLICATION_SUCCESS,

    SEARCH_APPROVED_LEAVE_APPLICATION,
    SEARCH_APPROVED_LEAVE_APPLICATION_SUCCESS,
    SEARCH_APPROVED_LEAVE_APPLICATION_FAILED,

    RESET_GET_DETAIL_LEAVE_APPLICATION,


} from '../../actions/application/applicationActions';
import { POPUP_CALL_RESET_ALL_REDUCERS } from '../../actions/actionTypes'

const initialState = {
    fetchingListStatusApplication: false,
    dataListStatusApplication: undefined,
    errorListStatusApplication: undefined,

    fetchingTypesLeave: false,
    dataTypesLeave: undefined,
    errorTypesLeave: undefined,

    fetchingSubstitute: false,
    dataSubstitute: undefined,
    errorSubstitute: undefined,

    fetchingCalculate: false,
    dataCalculate: undefined,
    errorCalculate: undefined,

    fetchingGetTimes: false,
    dataGetTimes: undefined,
    errorGetTimes: undefined,

    fetchingGetDays: false,
    dataGetDays: undefined,
    errorGetDays: undefined,

    fetchingSaveDays: false,
    dataSaveDays: undefined,
    errorSaveDays: undefined,

    fetchingCreate: false,
    dataCreate: undefined,
    errorCreate: undefined,

    fetchingSearch: false,
    dataSearch: undefined,
    errorSearch: undefined,

    fetchingGetDetail: false,
    dataGetDetail: undefined,
    errorGetDetail: undefined,

    fetchingUpdateLeaveApplication: false,
    dataUpdateLeaveApplication: undefined,
    errorUpdateLeaveApplication: undefined,

    fetchingDeleteLeaveApplication: false,
    dataDeleteLeaveApplication: undefined,
    errorDeleteLeaveApplication: undefined,

    fetchingSearchApprovedLeave: false,
    dataSearchApprovedLeave: undefined,
    errorSearchApprovedLeave: undefined,

}

const leaveApplicationReducers = (state = initialState, action) => {

    switch (action.type) {
        case GET_LIST_STATUS_APPLICATION:
            return Object.assign({}, state, {
                fetchingListStatusApplication: true,
                dataListStatusApplication: undefined,
                errorListStatusApplication: undefined,
            })

        case GET_LIST_STATUS_APPLICATION_SUCCESS:
            return Object.assign({}, state, {

                fetchingListStatusApplication: false,
                dataListStatusApplication: action.data,
                errorListStatusApplication: undefined,
            })

        case GET_LIST_STATUS_APPLICATION_FAILED:
            return Object.assign({}, state, {
                fetchingListStatusApplication: false,
                dataListStatusApplication: undefined,
                errorListStatusApplication: action.error,
            })

        case GET_SUBSTITUTE:
            return Object.assign({}, state, {
                fetchingSubstitute: true,
                dataSubstitute: undefined,
                errorSubstitute: undefined
            })

        case GET_SUBSTITUTE_SUCCESS:
            return Object.assign({}, state, {
                fetchingSubstitute: false,
                dataSubstitute: action.data,
                errorSubstitute: undefined
            })

        case GET_SUBSTITUTE_FAILED:
            return Object.assign({}, state, {
                fetchingSubstitute: false,
                dataSubstitute: undefined,
                errorSubstitute: action.error
            })


        case GET_TYPES_LEAVE_APPLICATION:
            return Object.assign({}, state, {
                fetchingTypesLeave: true,
                dataTypesLeave: undefined,
                errorTypesLeave: undefined
            })

        case GET_TYPES_LEAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                fetchingTypesLeave: false,
                dataTypesLeave: action.data,
                errorTypesLeave: undefined
            })

        case GET_TYPES_LEAVE_APPLICATION_FAILED:
            return Object.assign({}, state, {
                fetchingTypesLeave: false,
                dataTypesLeave: undefined,
                errorTypesLeave: action.error
            })

        //
        case CALCULATE_APPLICATION:
            return Object.assign({}, state, {
                fetchingCalculate: true,
                dataCalculate: undefined,
                errorCalculate: undefined,
            })

        case CALCULATE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                fetchingCalculate: false,
                dataCalculate: action.data,
                errorCalculate: undefined,
            })

        case CALCULATE_APPLICATION_FAILED:
            return Object.assign({}, state, {
                fetchingCalculate: false,
                dataCalculate: undefined,
                errorCalculate: action.error,
            })


        //
        case GET_TIMES_LEAVE_APPLICATION:
            return Object.assign({}, state, {
                fetchingGetTimes: true,
                dataGetTimes: undefined,
                errorGetTimes: undefined,
            })

        case GET_TIMES_LEAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                fetchingGetTimes: false,
                dataGetTimes: action.data,
                errorGetTimes: undefined,
            })

        case GET_TIMES_LEAVE_APPLICATION_FAILED:
            return Object.assign({}, state, {
                fetchingGetTimes: false,
                dataGetTimes: undefined,
                errorGetTimes: action.error,
            })

        //
        case GET_DAYS_LEAVE_APPLICATION:
            return Object.assign({}, state, {
                fetchingGetDays: true,
                dataGetDays: undefined,
                errorGetDays: undefined,
            })

        case GET_DAYS_LEAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                fetchingGetDays: false,
                dataGetDays: action.data,
                errorGetDays: undefined,
            })

        case GET_DAYS_LEAVE_APPLICATION_FAILED:
            return Object.assign({}, state, {
                fetchingGetDays: false,
                dataGetDays: undefined,
                errorGetDays: action.error,
            })

        //
        case SAVE_DAYS_LEAVE_APPLICATION:
            return Object.assign({}, state, {
                fetchingSaveDays: true,
                dataSaveDays: undefined,
                errorSaveDays: undefined
            })

        case SAVE_DAYS_LEAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                fetchingSaveDays: false,
                dataSaveDays: action.data,
                errorSaveDays: undefined
            })

        case SAVE_DAYS_LEAVE_APPLICATION_FAILED:
            return Object.assign({}, state, {
                fetchingSaveDays: false,
                dataSaveDays: undefined,
                errorSaveDays: action.error
            })
        case RESET_SAVE_DAYS_LEAVE_APPLICATION:
            return Object.assign({}, state, {
                fetchingSaveDays: false,
                dataSaveDays: undefined,
                errorSaveDays: undefined
            })

        //
        case CREATE_LEAVE_APPLICATION:
            return Object.assign({}, state, {
                fetchingCreate: true,
                dataCreate: undefined,
                errorCreate: undefined
            })

        case CREATE_LEAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                fetchingCreate: false,
                dataCreate: action.data,
                errorCreate: undefined
            })

        case CREATE_LEAVE_APPLICATION_FAILED:
            return Object.assign({}, state, {
                fetchingCreate: false,
                dataCreate: undefined,
                errorCreate: action.error
            })

        //
        case SEARCH_LEAVE_APPLICATION:
            return Object.assign({}, state, {
                fetchingSearch: true,
                dataSearch: undefined,
                errorSearch: undefined
            })

        case SEARCH_LEAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                fetchingSearch: false,
                dataSearch: action.data,
                errorSearch: undefined
            })

        case SEARCH_LEAVE_APPLICATION_FAILED:
            return Object.assign({}, state, {
                fetchingSearch: false,
                dataSearch: undefined,
                errorSearch: action.error
            })



        //
        case GET_DETAIL_LEAVE_APPLICATION:
            return Object.assign({}, state, {
                fetchingGetDetail: true,
                dataGetDetail: undefined,
                errorGetDetail: undefined
            })

        case GET_DETAIL_LEAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                fetchingGetDetail: false,
                dataGetDetail: action.data,
                errorGetDetail: undefined
            })

        case GET_DETAIL_LEAVE_APPLICATION_FAILED:
            return Object.assign({}, state, {
                fetchingGetDetail: false,
                dataGetDetail: undefined,
                errorGetDetail: action.error
            })
        case RESET_GET_DETAIL_LEAVE_APPLICATION:
            return Object.assign({}, state, {
                fetchingGetDetail: false,
                dataGetDetail: undefined,
                errorGetDetail: undefined
            })

        //
        case UPDATE_LEAVE_APPLICATION:
            return Object.assign({}, state, {
                fetchingUpdateLeaveApplication: true,
                dataUpdateLeaveApplication: undefined,
                errorUpdateLeaveApplication: undefined
            })

        case UPDATE_LEAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                fetchingUpdateLeaveApplication: false,
                dataUpdateLeaveApplication: action.data,
                errorUpdateLeaveApplication: undefined
            })

        case UPDATE_LEAVE_APPLICATION_FAILED:
            return Object.assign({}, state, {
                fetchingUpdateLeaveApplication: false,
                dataUpdateLeaveApplication: undefined,
                errorUpdateLeaveApplication: action.error
            })


        //
        case DELETE_LEAVE_APPLICATION:
            return Object.assign({}, state, {
                fetchingDeleteLeaveApplication: true,
                dataDeleteLeaveApplication: undefined,
                errorDeleteLeaveApplication: undefined
            })

        case DELETE_LEAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                fetchingDeleteLeaveApplication: false,
                dataDeleteLeaveApplication: action.data,
                errorDeleteLeaveApplication: undefined
            })

        case DELETE_LEAVE_APPLICATION_FAILED:
            return Object.assign({}, state, {
                fetchingDeleteLeaveApplication: false,
                dataDeleteLeaveApplication: undefined,
                errorDeleteLeaveApplication: action.error
            })

        //
        case SEARCH_APPROVED_LEAVE_APPLICATION:
            return Object.assign({}, state, {
                fetchingSearchApprovedLeave: true,
                dataSearchApprovedLeave: undefined,
                errorSearchApprovedLeave: undefined
            })

        case SEARCH_APPROVED_LEAVE_APPLICATION_SUCCESS:
            return Object.assign({}, state, {
                fetchingSearchApprovedLeave: false,
                dataSearchApprovedLeave: action.data,
                errorSearchApprovedLeave: undefined
            })

        case SEARCH_APPROVED_LEAVE_APPLICATION_FAILED:
            return Object.assign({}, state, {
                fetchingSearchApprovedLeave: false,
                dataSearchApprovedLeave: undefined,
                errorSearchApprovedLeave: action.error
            })

        case POPUP_CALL_RESET_ALL_REDUCERS:
            return Object.assign({}, state, {
                fetchingTypesLeave: false,
                dataTypesLeave: undefined,
                errorTypesLeave: undefined,

                fetchingSubstitute: false,
                dataSubstitute: undefined,
                errorSubstitute: undefined,

                fetchingCalculate: false,
                dataCalculate: undefined,
                errorCalculate: undefined,

                fetchingGetTimes: false,
                dataGetTimes: undefined,
                errorGetTimes: undefined,

                fetchingGetDays: false,
                dataGetDays: undefined,
                errorGetDays: undefined,

                fetchingSaveDays: false,
                dataSaveDays: undefined,
                errorSaveDays: undefined,

                fetchingCreate: false,
                dataCreate: undefined,
                errorCreate: undefined,

                fetchingSearch: false,
                dataSearch: undefined,
                errorSearch: undefined,

                fetchingGetDetail: false,
                dataGetDetail: undefined,
                errorGetDetail: undefined,

                fetchingUpdateLeaveApplication: false,
                dataUpdateLeaveApplication: undefined,
                errorUpdateLeaveApplication: undefined,

                fetchingDeleteLeaveApplication: false,
                dataDeleteLeaveApplication: undefined,
                errorDeleteLeaveApplication: undefined,

                fetchingSearchApprovedLeave: false,
                dataSearchApprovedLeave: undefined,
                errorSearchApprovedLeave: undefined,
            })


        default:
            return state;
    }
}

export default leaveApplicationReducers;
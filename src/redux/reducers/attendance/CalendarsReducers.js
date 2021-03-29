//PhucNT34
import {
    GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH,
    GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_SUCCESS,
    GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_ERROR,

    WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH,
    WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_SUCCESS,
    WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_FAILED,
} from '../../actions/attendance';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes'; 
const initialState = {
    dataWifiInfoCheckInOutInMonth: undefined,
    errorWifiInfoCheckInOutInMonth: undefined,
    loadingWifiInfoCheckInOutInMonth: false,

    fetchingWFHInfoCheckInOutInMonth: false,
    dataWFHInfoCheckInOutInMonth: undefined,
    errorWFHInfoCheckInOutInMonth: undefined,
};
  
const getHistoryCalendarsCheckInOutInMonthReducers = (state = initialState, action) => {
    console.log('actionTypeEe: ', action.type)
    switch (action.type) {
        case GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH:
            // console.warn('GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH 3', action.input);
            return Object.assign({}, state, {
                loadingWifiInfoCheckInOutInMonth: true,
                dataWifiInfoCheckInOutInMonth: undefined,
                errorWifiInfoCheckInOutInMonth: undefined
            })

        case GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_SUCCESS:
            // console.warn('GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_SUCCESS 3', action.data);
            return Object.assign({}, state, {
                loadingWifiInfoCheckInOutInMonth: false,
                dataWifiInfoCheckInOutInMonth: action.data,
                errorWifiInfoCheckInOutInMonth: undefined
            })

        case GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_ERROR:
            // console.warn('GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_ERROR 3', action.error);
            return Object.assign({}, state, {
                loadingWifiInfoCheckInOutInMonth: false,
                dataWifiInfoCheckInOutInMonth: undefined,
                errorWifiInfoCheckInOutInMonth: action.error
            })
        case POPUP_CALL_RESET_ALL_REDUCERS:
            // console.warn('GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_ERROR 3', action.error);
            return Object.assign({}, state, {
                dataWifiInfoCheckInOutInMonth: undefined,
                errorWifiInfoCheckInOutInMonth: undefined,
                loadingWifiInfoCheckInOutInMonth: false,

                fetchingWFHInfoCheckInOutInMonth: false,
                dataWFHInfoCheckInOutInMonth: action.data,
                errorWFHInfoCheckInOutInMonth: undefined,
            })
                //Check in out WFH in month
        case WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH:
            return Object.assign({}, state, {
                fetchingWFHInfoCheckInOutInMonth: true,
                dataWFHInfoCheckInOutInMonth: undefined,
                errorWFHInfoCheckInOutInMonth: undefined,
            })

        case WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_SUCCESS:
            return Object.assign({}, state, {
                fetchingWFHInfoCheckInOutInMonth: false,
                dataWFHInfoCheckInOutInMonth: action.data,
                errorWFHInfoCheckInOutInMonth: undefined,
            })

        case WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_FAILED:
            return Object.assign({}, state, {
                fetchingWFHInfoCheckInOutInMonth: false,
                dataWFHInfoCheckInOutInMonth: undefined,
                errorWFHInfoCheckInOutInMonth: action.error,
            })
        default:
            return state;
    }
};
  
export default getHistoryCalendarsCheckInOutInMonthReducers;
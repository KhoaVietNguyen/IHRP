import {
  GET_REPORT_WORKING_HOUR,
  GET_REPORT_WORKING_HOUR_ERROR,
  GET_REPORT_WORKING_HOUR_SUCCESS,
} from '../../actions/report/ReportAction';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
var initalState = {
  error: null,
  loading: false,
  data: null,
};

export const reportWorkingHourReducers = (state = initalState, action) => {
  switch (action.type) {
    case GET_REPORT_WORKING_HOUR_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        loading: false,
        data: action.response,
      });
    case GET_REPORT_WORKING_HOUR_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        loading: false,
        data: null,
      });
    case GET_REPORT_WORKING_HOUR:
      return Object.assign({}, state, {
        error: null,
        loading: true,
        data: null,
      });
    case POPUP_CALL_RESET_ALL_REDUCERS:
      return Object.assign({}, state, {
        error: null,
        loading: false,
        data: null,
      });
    default:
      return state;
  }
};

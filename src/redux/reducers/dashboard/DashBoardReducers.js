import {
  GET_DASH_BOARD_APPROVAL,
  GET_DASH_BOARD_APPROVAL_ERROR,
  GET_DASH_BOARD_APPROVAL_SUCCESS,
  GET_DASH_BOARD_CURRENT_SHIFT,
  GET_DASH_BOARD_CURRENT_SHIFT_ERROR,
  GET_DASH_BOARD_CURRENT_SHIFT_SUCCESS,
  GET_DASH_BOARD_LEAVE_INFO,
  GET_DASH_BOARD_LEAVE_INFO_ERROR,
  GET_DASH_BOARD_LEAVE_INFO_SUCCESS,
  GET_DASH_BOARD_NEXT_SHIFT,
  GET_DASH_BOARD_NEXT_SHIFT_ERROR,
  GET_DASH_BOARD_NEXT_SHIFT_SUCCESS,
  GET_DASH_BOARD_WORKING_HOUR,
  GET_DASH_BOARD_WORKING_HOUR_ERROR,
  GET_DASH_BOARD_WORKING_HOUR_SUCCESS,
  GET_DASH_BOARD_FORM,
  GET_DASH_BOARD_FORM_ERROR,
  GET_DASH_BOARD_FORM_SUCCESS,
} from '../../actions/dashboard/DashBoardAction';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
const initialState = {
  fetchingApproval: false,
  dataApproval: null,
  errorApproval: null,

  fetchingCurrentShift: false,
  dataCurrentShift: null,
  errorCurrentShift: null,

  fetchingNextShift: false,
  dataNextShift: null,
  errorNextShift: null,

  fetchingWorkingHour: false,
  dataWorkingHour: null,
  errorWorkingHour: null,

  fetchingLeaveInfo: false,
  dataLeaveInfo: null,
  errorLeaveInfo: null,
};

export const dashBoardReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASH_BOARD_APPROVAL:
      return Object.assign({}, state, {
        fetchingApproval: true,
        dataApproval: null,
        errorApproval: null,
      });

    case GET_DASH_BOARD_APPROVAL_SUCCESS:
      return Object.assign({}, state, {
        fetchingApproval: false,
        dataApproval: action.response.dataItem,
        errorApproval: null,
      });
    case GET_DASH_BOARD_APPROVAL_ERROR:
      return Object.assign({}, state, {
        fetchingApproval: false,
        dataApproval: null,
        errorApproval: action.error,
      });

    case GET_DASH_BOARD_CURRENT_SHIFT:
      return Object.assign({}, state, {
        fetchingCurrentShift: true,
        dataCurrentShift: null,
        errorCurrentShift: null,
      });

    case GET_DASH_BOARD_CURRENT_SHIFT_SUCCESS:
      return Object.assign({}, state, {
        fetchingCurrentShift: false,
        dataCurrentShift: action.response.dataItem,
        errorCurrentShift: null,
      });
    case GET_DASH_BOARD_CURRENT_SHIFT_ERROR:
      return Object.assign({}, state, {
        fetchingCurrentShift: false,
        dataCurrentShift: null,
        errorCurrentShift: action.error,
      });

    case GET_DASH_BOARD_NEXT_SHIFT:
      return Object.assign({}, state, {
        fetchingNextShift: true,
        dataNextShift: null,
        errorNextShift: null,
      });

    case GET_DASH_BOARD_NEXT_SHIFT_SUCCESS:
      return Object.assign({}, state, {
        fetchingNextShift: false,
        dataNextShift: action.response.dataItem,
        errorNextShift: null,
      });
    case GET_DASH_BOARD_NEXT_SHIFT_ERROR:
      return Object.assign({}, state, {
        fetchingNextShift: false,
        dataNextShift: null,
        errorNextShift: action.error,
      });

    case GET_DASH_BOARD_WORKING_HOUR:
      return Object.assign({}, state, {
        fetchingWorkingHour: true,
        dataWorkingHour: null,
        errorWorkingHour: null,
      });

    case GET_DASH_BOARD_WORKING_HOUR_SUCCESS:
      return Object.assign({}, state, {
        fetchingWorkingHour: false,
        dataWorkingHour: action.response.dataItem,
        errorWorkingHour: null,
      });
    case GET_DASH_BOARD_WORKING_HOUR_ERROR:
      return Object.assign({}, state, {
        fetchingWorkingHour: false,
        dataWorkingHour: null,
        errorWorkingHour: action.error,
      });

    case GET_DASH_BOARD_LEAVE_INFO:
      return Object.assign({}, state, {
        fetchingLeaveInfo: true,
        dataLeaveInfo: null,
        errorLeaveInfo: null,
      });

    case GET_DASH_BOARD_LEAVE_INFO_SUCCESS:
      return Object.assign({}, state, {
        fetchingLeaveInfo: false,
        dataLeaveInfo: action.response.dataItem,
        errorLeaveInfo: null,
      });
    case GET_DASH_BOARD_LEAVE_INFO_ERROR:
      return Object.assign({}, state, {
        fetchingLeaveInfo: false,
        dataLeaveInfo: null,
        errorLeaveInfo: action.error,
      });
      case POPUP_CALL_RESET_ALL_REDUCERS:
        return Object.assign({}, state, {
          fetchingApproval: false,
          dataApproval: null,
          errorApproval: null,
        
          fetchingCurrentShift: false,
          dataCurrentShift: null,
          errorCurrentShift: null,
        
          fetchingNextShift: false,
          dataNextShift: null,
          errorNextShift: null,
        
          fetchingWorkingHour: false,
          dataWorkingHour: null,
          errorWorkingHour: null,
        
          fetchingLeaveInfo: false,
          dataLeaveInfo: null,
          errorLeaveInfo: null,
        });
  
    default:
      return state;
  }
};

const initialStateForm = {
  fetchingForm: false,
  dataForm: null,
  errorForm: null,
};
export const dashBoardFormReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_DASH_BOARD_FORM:
      return Object.assign({}, state, {
        fetchingForm: true,
        dataForm: null,
        errorForm: null,
      });
    case GET_DASH_BOARD_FORM_SUCCESS:
      return Object.assign({}, state, {
        fetchingForm: false,
        dataForm: action.response.dataItem,
        errorForm: null,
      });
    case GET_DASH_BOARD_FORM_ERROR:
      return Object.assign({}, state, {
        fetchingForm: false,
        dataForm: null,
        errorForm: action.response,
      });
      case POPUP_CALL_RESET_ALL_REDUCERS:
      return Object.assign({}, state, {
        fetchingForm: false,
        dataForm: null,
        errorForm: null,
      });
    default:
      return state;
  }
};

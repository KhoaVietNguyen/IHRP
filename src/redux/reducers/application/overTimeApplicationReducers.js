import {
  GET_DATE_INFO_OVERTIME_APPLICATION,
  GET_DATE_INFO_OVERTIME_APPLICATION_FAILED,
  GET_DATE_INFO_OVERTIME_APPLICATION_SUCCESS,
  GET_APPROVER_OVERTIME_APPLICATION,
  GET_APPROVER_OVERTIME_APPLICATION_FAILED,
  GET_APPROVER_OVERTIME_APPLICATION_SUCCESS,
  CALCULATE_OVERTIME_APPLICATION,
  CALCULATE_OVERTIME_APPLICATION_FAILED,
  CALCULATE_OVERTIME_APPLICATION_SUCCESS,
  SAVE_OVERTIME_APPLICATION,
  SAVE_OVERTIME_APPLICATION_SUCCESS,
  SAVE_OVERTIME_APPLICATION_FAILED,
  SEARCH_OVERTIME_APPLICATION,
  SEARCH_OVERTIME_APPLICATION_FAILED,
  SEARCH_OVERTIME_APPLICATION_SUCCESS,
  GET_LIST_STATUS_OVERTIME_APPLICATION,
  GET_LIST_STATUS_OVERTIME_APPLICATION_FAILED,
  GET_LIST_STATUS_OVERTIME_APPLICATION_SUCCESS,
  GET_DETAIL_OVERTIME_APPLICATION_SUCCESS,
  GET_DETAIL_OVERTIME_APPLICATION_FAILED,
  GET_DETAIL_OVERTIME_APPLICATION,
  RESET_GET_DETAIL_OVERTIME_APPLICATION,
  WITH_DRAW_OVERTIME_APPLICATION_SUCCESS,
  WITH_DRAW_OVERTIME_APPLICATION_FAILED,
  WITH_DRAW_OVERTIME_APPLICATION,
  DELETE_OVERTIME_APPLICATION_SUCCESS,
  DELETE_OVERTIME_APPLICATION_FAILED,
  DELETE_OVERTIME_APPLICATION,
  SEARCH_APPROVED_OVERTIME_APPLICATION,
  SEARCH_APPROVED_OVERTIME_APPLICATION_FAILED,
  SEARCH_APPROVED_OVERTIME_APPLICATION_SUCCESS,
} from '../../actions/application/applicationActions';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
const initialState = {
  fetchingDateInfo: false,
  dataDateInfo: undefined,
  errorDateInfo: undefined,

  fetchingApprover: false,
  dataApprover: undefined,
  errorApprover: undefined,

  fetchingCalculate: false,
  dataCalculate: undefined,
  errorCalculate: undefined,

  fetchingSave: false,
  dataSave: undefined,
  errorSave: undefined,

  fetchingSearchOverTimeApplication: false,
  dataSearchOverTimeApplication: undefined,
  errorSearchOverTimeApplication: undefined,

  fetchingStatusOverTime: false,
  dataStatusOverTime: undefined,
  errorStatusOverTime: undefined,

  fetchingGetDetailOverTime: false,
  dataGetDetailOverTime: undefined,
  errorGetDetailOverTime: undefined,

  fetchingWithDrawOverTime: false,
  dataWithDrawOverTime: undefined,
  errorWithDrawOverTime: undefined,

  fetchingDeleteOverTime: false,
  dataDeleteOverTime: undefined,
  errorDeleteOverTime: undefined,

  fetchingSearchApprovedOverTimeApplication: false,
  dataSearchApprovedOverTimeApplication: undefined,
  errorSearchApprovedOverTimeApplication: undefined,
};

const overTimeApplicationReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATE_INFO_OVERTIME_APPLICATION:
      return Object.assign({}, state, {
        fetchingDateInfo: true,
        dataDateInfo: undefined,
        errorDateInfo: undefined,
      });

    case GET_DATE_INFO_OVERTIME_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingDateInfo: false,
        dataDateInfo: action.data,
        errorDateInfo: undefined,
      });

    case GET_DATE_INFO_OVERTIME_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingDateInfo: false,
        dataDateInfo: undefined,
        errorDateInfo: action.error,
      });

    //
    case GET_APPROVER_OVERTIME_APPLICATION:
      return Object.assign({}, state, {
        fetchingApprover: true,
        dataApprover: undefined,
        errorApprover: undefined,
      });

    case GET_APPROVER_OVERTIME_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingApprover: false,
        dataApprover: action.data,
        errorApprover: undefined,
      });

    case GET_APPROVER_OVERTIME_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingApprover: false,
        dataApprover: undefined,
        errorApprover: action.error,
      });

    //
    case CALCULATE_OVERTIME_APPLICATION:
      return Object.assign({}, state, {
        fetchingCalculate: true,
        dataCalculate: undefined,
        errorCalculate: undefined,
      });

    case CALCULATE_OVERTIME_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingCalculate: false,
        dataCalculate: action.data,
        errorCalculate: undefined,
      });

    case CALCULATE_OVERTIME_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingCalculate: false,
        dataCalculate: undefined,
        errorCalculate: action.error,
      });

    //
    case SAVE_OVERTIME_APPLICATION:
      return Object.assign({}, state, {
        fetchingSave: true,
        dataSave: undefined,
        errorSave: undefined,
      });

    case SAVE_OVERTIME_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingSave: false,
        dataSave: action.data,
        errorSave: undefined,
      });

    case SAVE_OVERTIME_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingSave: false,
        dataSave: undefined,
        errorSave: action.error,
      });

    //
    case SEARCH_OVERTIME_APPLICATION:
      return Object.assign({}, state, {
        fetchingSearchOverTimeApplication: true,
        dataSearchOverTimeApplication: undefined,
        errorSearchOverTimeApplication: undefined,
      });

    case SEARCH_OVERTIME_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingSearchOverTimeApplication: false,
        dataSearchOverTimeApplication: action.data,
        errorSearchOverTimeApplication: undefined,
      });

    case SEARCH_OVERTIME_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingSearchOverTimeApplication: false,
        dataSearchOverTimeApplication: undefined,
        errorSearchOverTimeApplication: action.error,
      });

    //
    case GET_LIST_STATUS_OVERTIME_APPLICATION:
      return Object.assign({}, state, {
        fetchingStatusOverTime: true,
        dataStatusOverTime: undefined,
        errorStatusOverTime: undefined,
      });

    case GET_LIST_STATUS_OVERTIME_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingStatusOverTime: false,
        dataStatusOverTime: action.data,
        errorStatusOverTime: undefined,
      });

    case GET_LIST_STATUS_OVERTIME_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingStatusOverTime: false,
        dataStatusOverTime: undefined,
        errorStatusOverTime: action.error,
      });

    //
    case GET_DETAIL_OVERTIME_APPLICATION:
      return Object.assign({}, state, {
        fetchingGetDetailOverTime: true,
        dataGetDetailOverTime: undefined,
        errorGetDetailOverTime: undefined,
      });

    case GET_DETAIL_OVERTIME_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingGetDetailOverTime: false,
        dataGetDetailOverTime: action.data,
        errorGetDetailOverTime: undefined,
      });

    case GET_DETAIL_OVERTIME_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingGetDetailOverTime: false,
        dataGetDetailOverTime: undefined,
        errorGetDetailOverTime: action.error,
      });
    case RESET_GET_DETAIL_OVERTIME_APPLICATION:
      return Object.assign({}, state, {
        fetchingGetDetailOverTime: false,
        dataGetDetailOverTime: undefined,
        errorGetDetailOverTime: undefined,
      });
    //
    case WITH_DRAW_OVERTIME_APPLICATION:
      return Object.assign({}, state, {
        fetchingWithDrawOverTime: true,
        dataWithDrawOverTime: undefined,
        errorWithDrawOverTime: undefined,
      });

    case WITH_DRAW_OVERTIME_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingWithDrawOverTime: false,
        dataWithDrawOverTime: action.data,
        errorWithDrawOverTime: undefined,
      });

    case WITH_DRAW_OVERTIME_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingWithDrawOverTime: false,
        dataWithDrawOverTime: undefined,
        errorWithDrawOverTime: action.error,
      });

    //
    case DELETE_OVERTIME_APPLICATION:
      return Object.assign({}, state, {
        fetchingDeleteOverTime: true,
        dataDeleteOverTime: undefined,
        errorDeleteOverTime: undefined,
      });

    case DELETE_OVERTIME_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingDeleteOverTime: false,
        dataDeleteOverTime: action.data,
        errorDeleteOverTime: undefined,
      });

    case DELETE_OVERTIME_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingDeleteOverTime: false,
        dataDeleteOverTime: undefined,
        errorDeleteOverTime: action.error,
      });

    //
    case SEARCH_APPROVED_OVERTIME_APPLICATION:
      return Object.assign({}, state, {
        fetchingSearchApprovedOverTimeApplication: true,
        dataSearchApprovedOverTimeApplication: undefined,
        errorSearchApprovedOverTimeApplication: undefined,
      });

    case SEARCH_APPROVED_OVERTIME_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingSearchApprovedOverTimeApplication: false,
        dataSearchApprovedOverTimeApplication: action.data,
        errorSearchApprovedOverTimeApplication: undefined,
      });

    case SEARCH_APPROVED_OVERTIME_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingSearchApprovedOverTimeApplication: false,
        dataSearchApprovedOverTimeApplication: undefined,
        errorSearchApprovedOverTimeApplication: action.error,
      });
    case GET_DATE_INFO_OVERTIME_APPLICATION:
      return Object.assign({}, state, {
        fetchingDateInfo: false,
        dataDateInfo: undefined,
        errorDateInfo: undefined,

        fetchingApprover: false,
        dataApprover: undefined,
        errorApprover: undefined,

        fetchingCalculate: false,
        dataCalculate: undefined,
        errorCalculate: undefined,

        fetchingSave: false,
        dataSave: undefined,
        errorSave: undefined,

        fetchingSearchOverTimeApplication: false,
        dataSearchOverTimeApplication: undefined,
        errorSearchOverTimeApplication: undefined,

        fetchingStatusOverTime: false,
        dataStatusOverTime: undefined,
        errorStatusOverTime: undefined,

        fetchingGetDetailOverTime: false,
        dataGetDetailOverTime: undefined,
        errorGetDetailOverTime: undefined,

        fetchingWithDrawOverTime: false,
        dataWithDrawOverTime: undefined,
        errorWithDrawOverTime: undefined,

        fetchingDeleteOverTime: false,
        dataDeleteOverTime: undefined,
        errorDeleteOverTime: undefined,

        fetchingSearchApprovedOverTimeApplication: false,
        dataSearchApprovedOverTimeApplication: undefined,
        errorSearchApprovedOverTimeApplication: undefined,
      });
    default:
      return state;
  }
};

export default overTimeApplicationReducers;

import {
  GET_ADJUSTMENT_STATUS_LOG_TMS,
  GET_ADJUSTMENT_STATUS_LOG_TMS_FAILED,
  GET_ADJUSTMENT_STATUS_LOG_TMS_SUCCESS,
  GET_FINGER_PRINT_RECORD_LOG_TMS,
  GET_FINGER_PRINT_RECORD_LOG_TMS_FAILED,
  GET_FINGER_PRINT_RECORD_LOG_TMS_SUCCESS,
  GET_APPROVAL_STATUS_LOG_TMS_SUCCESS,
  GET_APPROVAL_STATUS_LOG_TMS_FAILED,
  GET_APPROVAL_STATUS_LOG_TMS,
  SEARCH_LOG_TMS_APPLICATION,
  SEARCH_LOG_TMS_APPLICATION_FAILED,
  SEARCH_LOG_TMS_APPLICATION_SUCCESS,
  GET_DETAIL_LOG_TMS_APPLICATION,
  GET_DETAIL_LOG_TMS_APPLICATION_FAILED,
  GET_DETAIL_LOG_TMS_APPLICATION_SUCCESS,
  RESET_GET_DETAIL_LOG_TMS_APPLICATION,
  GET_LOG_TYPE_LOG_TMS_APPLICATION,
  GET_LOG_TYPE_LOG_TMS_APPLICATION_FAILED,
  GET_LOG_TYPE_LOG_TMS_APPLICATION_SUCCESS,
  WITH_DRAW_LOG_TMS_APPLICATION,
  WITH_DRAW_LOG_TMS_APPLICATION_FAILED,
  WITH_DRAW_LOG_TMS_APPLICATION_SUCCESS,
  DELETE_LOG_TMS_APPLICATION_SUCCESS,
  DELETE_LOG_TMS_APPLICATION_FAILED,
  DELETE_LOG_TMS_APPLICATION,
  SAVE_LOG_TMS_APPLICATION_SUCCESS,
  SAVE_LOG_TMS_APPLICATION_FAILED,
  SAVE_LOG_TMS_APPLICATION,
  SEARCH_APPROVED_LOG_TMS_APPLICATION,
  SEARCH_APPROVED_LOG_TMS_APPLICATION_FAILED,
  SEARCH_APPROVED_LOG_TMS_APPLICATION_SUCCESS,
} from '../../actions/application/applicationActions';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
const initialState = {
  fetchingAdjustmentStatus: false,
  dataAdjustmentStatus: undefined,
  errorAdjustmentStatus: undefined,

  fetchingFingerPrintRecord: false,
  dataFingerPrintRecord: undefined,
  errorFingerPrintRecord: undefined,

  fetchingApprovalStatus: false,
  dataApprovalStatus: undefined,
  errorApprovalStatus: undefined,

  fetchingSearchLogTMSApplication: false,
  dataSearchLogTMSApplication: undefined,
  errorSearchLogTMSApplication: undefined,

  fetchingDetailLogTMSApplication: false,
  dataDetailLogTMSApplication: undefined,
  errorDetailLogTMSApplication: undefined,

  fetchingLogType: false,
  dataLogType: undefined,
  errorLogType: undefined,

  fetchingWithDrawLogTMSApplication: false,
  dataWithDrawLogTMSApplication: undefined,
  errorWithDrawLogTMSApplication: undefined,

  fetchingDeleteLogTMSApplication: false,
  dataDeleteLogTMSApplication: undefined,
  errorDeleteLogTMSApplication: undefined,

  fetchingSaveLogTMSApplication: false,
  dataSaveLogTMSApplication: undefined,
  errorSaveLogTMSApplication: undefined,

  fetchingSearchApprovedLogTMSApplication: false,
  dataSearchApprovedLogTMSApplication: undefined,
  errorSearchApprovedLogTMSApplication: undefined,
};

const logTMSApplicationReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADJUSTMENT_STATUS_LOG_TMS:
      return Object.assign({}, state, {
        fetchingAdjustmentStatus: true,
        dataAdjustmentStatus: undefined,
        errorAdjustmentStatus: undefined,
      });

    case GET_ADJUSTMENT_STATUS_LOG_TMS_SUCCESS:
      return Object.assign({}, state, {
        fetchingAdjustmentStatus: false,
        dataAdjustmentStatus: action.data,
        errorAdjustmentStatus: undefined,
      });

    case GET_ADJUSTMENT_STATUS_LOG_TMS_FAILED:
      return Object.assign({}, state, {
        fetchingAdjustmentStatus: false,
        dataAdjustmentStatus: undefined,
        errorAdjustmentStatus: action.error,
      });

    //
    case GET_FINGER_PRINT_RECORD_LOG_TMS:
      return Object.assign({}, state, {
        fetchingFingerPrintRecord: true,
        dataFingerPrintRecord: undefined,
        errorFingerPrintRecord: undefined,
      });

    case GET_FINGER_PRINT_RECORD_LOG_TMS_SUCCESS:
      return Object.assign({}, state, {
        fetchingFingerPrintRecord: false,
        dataFingerPrintRecord: action.data,
        errorFingerPrintRecord: undefined,
      });

    case GET_FINGER_PRINT_RECORD_LOG_TMS_FAILED:
      return Object.assign({}, state, {
        fetchingFingerPrintRecord: false,
        dataFingerPrintRecord: undefined,
        errorFingerPrintRecord: action.error,
      });

    //
    case GET_APPROVAL_STATUS_LOG_TMS:
      return Object.assign({}, state, {
        fetchingApprovalStatus: true,
        dataApprovalStatus: undefined,
        errorApprovalStatus: undefined,
      });

    case GET_APPROVAL_STATUS_LOG_TMS_SUCCESS:
      return Object.assign({}, state, {
        fetchingApprovalStatus: false,
        dataApprovalStatus: action.data,
        errorApprovalStatus: undefined,
      });

    case GET_APPROVAL_STATUS_LOG_TMS_FAILED:
      return Object.assign({}, state, {
        fetchingApprovalStatus: false,
        dataApprovalStatus: undefined,
        errorApprovalStatus: action.error,
      });

    //
    case SEARCH_LOG_TMS_APPLICATION:
      return Object.assign({}, state, {
        fetchingSearchLogTMSApplication: true,
        dataSearchLogTMSApplication: undefined,
        errorSearchLogTMSApplication: undefined,
      });

    case SEARCH_LOG_TMS_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingSearchLogTMSApplication: false,
        dataSearchLogTMSApplication: action.data,
        errorSearchLogTMSApplication: undefined,
      });

    case SEARCH_LOG_TMS_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingSearchLogTMSApplication: false,
        dataSearchLogTMSApplication: undefined,
        errorSearchLogTMSApplication: action.error,
      });

    //
    case GET_LOG_TYPE_LOG_TMS_APPLICATION:
      return Object.assign({}, state, {
        fetchingLogType: true,
        dataLogType: undefined,
        errorLogType: undefined,
      });

    case GET_LOG_TYPE_LOG_TMS_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingLogType: false,
        dataLogType: action.data,
        errorLogType: undefined,
      });

    case GET_LOG_TYPE_LOG_TMS_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingLogType: false,
        dataLogType: undefined,
        errorLogType: action.error,
      });

    //
    case GET_DETAIL_LOG_TMS_APPLICATION:
      return Object.assign({}, state, {
        fetchingDetailLogTMSApplication: true,
        dataDetailLogTMSApplication: undefined,
        errorDetailLogTMSApplication: undefined,
      });

    case GET_DETAIL_LOG_TMS_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingDetailLogTMSApplication: false,
        dataDetailLogTMSApplication: action.data,
        errorDetailLogTMSApplication: undefined,
      });

    case GET_DETAIL_LOG_TMS_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingDetailLogTMSApplication: false,
        dataDetailLogTMSApplication: undefined,
        errorDetailLogTMSApplication: action.error,
      });
    case RESET_GET_DETAIL_LOG_TMS_APPLICATION:
      return Object.assign({}, state, {
        fetchingDetailLogTMSApplication: false,
        dataDetailLogTMSApplication: undefined,
        errorDetailLogTMSApplication: undefined,
      });
    //
    case WITH_DRAW_LOG_TMS_APPLICATION:
      return Object.assign({}, state, {
        fetchingWithDrawLogTMSApplication: true,
        dataWithDrawLogTMSApplication: undefined,
        errorWithDrawLogTMSApplication: undefined,
      });

    case WITH_DRAW_LOG_TMS_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingWithDrawLogTMSApplication: false,
        dataWithDrawLogTMSApplication: action.data,
        errorWithDrawLogTMSApplication: undefined,
      });

    case WITH_DRAW_LOG_TMS_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingWithDrawLogTMSApplication: false,
        dataWithDrawLogTMSApplication: undefined,
        errorWithDrawLogTMSApplication: action.error,
      });

    //
    case DELETE_LOG_TMS_APPLICATION:
      return Object.assign({}, state, {
        fetchingDeleteLogTMSApplication: true,
        dataDeleteLogTMSApplication: undefined,
        errorDeleteLogTMSApplication: undefined,
      });

    case DELETE_LOG_TMS_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingDeleteLogTMSApplication: false,
        dataDeleteLogTMSApplication: action.data,
        errorDeleteLogTMSApplication: undefined,
      });

    case DELETE_LOG_TMS_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingDeleteLogTMSApplication: false,
        dataDeleteLogTMSApplication: undefined,
        errorDeleteLogTMSApplication: action.error,
      });
    //
    case SAVE_LOG_TMS_APPLICATION:
      return Object.assign({}, state, {
        fetchingSaveLogTMSApplication: true,
        dataSaveLogTMSApplication: undefined,
        errorSaveLogTMSApplication: undefined,
      });

    case SAVE_LOG_TMS_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingSaveLogTMSApplication: false,
        dataSaveLogTMSApplication: action.data,
        errorSaveLogTMSApplication: undefined,
      });

    case SAVE_LOG_TMS_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingSaveLogTMSApplication: false,
        dataSaveLogTMSApplication: undefined,
        errorSaveLogTMSApplication: action.error,
      });

    //
    case SEARCH_APPROVED_LOG_TMS_APPLICATION:
      return Object.assign({}, state, {
        fetchingSearchApprovedLogTMSApplication: true,
        dataSearchApprovedLogTMSApplication: undefined,
        errorSearchApprovedLogTMSApplication: undefined,
      });

    case SEARCH_APPROVED_LOG_TMS_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingSearchApprovedLogTMSApplication: false,
        dataSearchApprovedLogTMSApplication: action.data,
        errorSearchApprovedLogTMSApplication: undefined,
      });

    case SEARCH_APPROVED_LOG_TMS_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingSearchApprovedLogTMSApplication: false,
        dataSearchApprovedLogTMSApplication: undefined,
        errorSearchApprovedLogTMSApplication: action.error,
      });
    case POPUP_CALL_RESET_ALL_REDUCERS:
      return Object.assign({}, state, {
        fetchingAdjustmentStatus: false,
        dataAdjustmentStatus: undefined,
        errorAdjustmentStatus: undefined,

        fetchingFingerPrintRecord: false,
        dataFingerPrintRecord: undefined,
        errorFingerPrintRecord: undefined,

        fetchingApprovalStatus: false,
        dataApprovalStatus: undefined,
        errorApprovalStatus: undefined,

        fetchingSearchLogTMSApplication: false,
        dataSearchLogTMSApplication: undefined,
        errorSearchLogTMSApplication: undefined,

        fetchingDetailLogTMSApplication: false,
        dataDetailLogTMSApplication: undefined,
        errorDetailLogTMSApplication: undefined,

        fetchingLogType: false,
        dataLogType: undefined,
        errorLogType: undefined,

        fetchingWithDrawLogTMSApplication: false,
        dataWithDrawLogTMSApplication: undefined,
        errorWithDrawLogTMSApplication: undefined,

        fetchingDeleteLogTMSApplication: false,
        dataDeleteLogTMSApplication: undefined,
        errorDeleteLogTMSApplication: undefined,

        fetchingSaveLogTMSApplication: false,
        dataSaveLogTMSApplication: undefined,
        errorSaveLogTMSApplication: undefined,

        fetchingSearchApprovedLogTMSApplication: false,
        dataSearchApprovedLogTMSApplication: undefined,
        errorSearchApprovedLogTMSApplication: undefined,
      });

    default:
      return state;
  }
};

export default logTMSApplicationReducers;

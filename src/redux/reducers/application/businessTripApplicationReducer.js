import {
  GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION,
  GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_FAILED,
  GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_SUCCESS,
  GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION,
  GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_FAILED,
  GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_SUCCESS,
  GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_SUCCESS,
  GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_FAILED,
  GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION,
  CALCULATE_BUSINESS_TRIP_APPLICATION,
  CALCULATE_BUSINESS_TRIP_APPLICATION_SUCCESS,
  CALCULATE_BUSINESS_TRIP_APPLICATION_FAILED,
  SAVE_BUSINESS_TRIP_APPLICATION,
  SAVE_BUSINESS_TRIP_APPLICATION_FAILED,
  SAVE_BUSINESS_TRIP_APPLICATION_SUCCESS,
  SEARCH_BUSINESS_TRIP_APPLICATION,
  SEARCH_BUSINESS_TRIP_APPLICATION_FAILED,
  SEARCH_BUSINESS_TRIP_APPLICATION_SUCCESS,
  GET_DETAIL_BUSINESS_TRIP_APPLICATION_SUCCESS,
  GET_DETAIL_BUSINESS_TRIP_APPLICATION_FAILED,
  GET_DETAIL_BUSINESS_TRIP_APPLICATION,
  RESET_GET_DETAIL_BUSINESS_TRIP_APPLICATION,
  WITH_DRAW_BUSINESS_TRIP_APPLICATION_FAILED,
  WITH_DRAW_BUSINESS_TRIP_APPLICATION_SUCCESS,
  WITH_DRAW_BUSINESS_TRIP_APPLICATION,
  DELETE_BUSINESS_TRIP_APPLICATION_SUCCESS,
  DELETE_BUSINESS_TRIP_APPLICATION_FAILED,
  DELETE_BUSINESS_TRIP_APPLICATION,
  SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION,
  SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_FAILED,
  SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_SUCCESS,
} from '../../actions/application/applicationActions';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
const initialState = {
  fetchingTypeBusinessTrip: false,
  dataTypeBusinessTrip: undefined,
  errorTypeBusinessTrip: undefined,

  fetchingCurrencyBusinessTrip: false,
  dataCurrencyBusinessTrip: undefined,
  errorCurrencyBusinessTrip: undefined,

  fetchingEmployeeBusinessTrip: false,
  dataEmployeeBusinessTrip: undefined,
  errorEmployeeBusinessTrip: undefined,

  fetchingCalculateBusinessTrip: false,
  dataCalculateBusinessTrip: undefined,
  errorCalculateBusinessTrip: undefined,

  fetchingSaveBusinessTrip: false,
  dataSaveBusinessTrip: undefined,
  errorSaveBusinessTrip: undefined,

  fetchingSearchBusinessTrip: false,
  dataSearchBusinessTrip: undefined,
  errorSearchBusinessTrip: undefined,

  fetchingGetDetailBusinessTrip: false,
  dataGetDetailBusinessTrip: undefined,
  errorGetDetailBusinessTrip: undefined,

  fetchingWithDrawBusinessTrip: false,
  dataWithDrawBusinessTrip: undefined,
  errorWithDrawBusinessTrip: undefined,

  fetchingDeleteBusinessTrip: false,
  dataDeleteBusinessTrip: undefined,
  errorDeleteBusinessTrip: undefined,

  fetchingSearchApprovedBusinessTrip: false,
  dataSearchApprovedBusinessTrip: undefined,
  errorSearchApprovedBusinessTrip: undefined,
};

const businessTripApplicationReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION:
      return Object.assign({}, state, {
        fetchingTypeBusinessTrip: true,
        dataTypeBusinessTrip: undefined,
        errorTypeBusinessTrip: undefined,
      });

    case GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingTypeBusinessTrip: false,
        dataTypeBusinessTrip: action.data,
        errorTypeBusinessTrip: undefined,
      });

    case GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingTypeBusinessTrip: false,
        dataTypeBusinessTrip: undefined,
        errorTypeBusinessTrip: action.error,
      });

    case GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION:
      return Object.assign({}, state, {
        fetchingCurrencyBusinessTrip: true,
        dataCurrencyBusinessTrip: undefined,
        errorCurrencyBusinessTrip: undefined,
      });

    case GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingCurrencyBusinessTrip: false,
        dataCurrencyBusinessTrip: action.data,
        errorCurrencyBusinessTrip: undefined,
      });

    case GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingCurrencyBusinessTrip: false,
        dataCurrencyBusinessTrip: undefined,
        errorCurrencyBusinessTrip: action.error,
      });

    case GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION:
      return Object.assign({}, state, {
        fetchingEmployeeBusinessTrip: true,
        dataEmployeeBusinessTrip: undefined,
        errorEmployeeBusinessTrip: undefined,
      });

    case GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingEmployeeBusinessTrip: false,
        dataEmployeeBusinessTrip: action.data,
        errorEmployeeBusinessTrip: undefined,
      });

    case GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingEmployeeBusinessTrip: false,
        dataEmployeeBusinessTrip: undefined,
        errorEmployeeBusinessTrip: action.error,
      });

    case CALCULATE_BUSINESS_TRIP_APPLICATION:
      return Object.assign({}, state, {
        fetchingCalculateBusinessTrip: true,
        dataCalculateBusinessTrip: undefined,
        errorCalculateBusinessTrip: undefined,
      });

    case CALCULATE_BUSINESS_TRIP_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingCalculateBusinessTrip: false,
        dataCalculateBusinessTrip: action.data,
        errorCalculateBusinessTrip: undefined,
      });

    case CALCULATE_BUSINESS_TRIP_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingCalculateBusinessTrip: false,
        dataCalculateBusinessTrip: undefined,
        errorCalculateBusinessTrip: action.error,
      });

    case SAVE_BUSINESS_TRIP_APPLICATION:
      return Object.assign({}, state, {
        fetchingSaveBusinessTrip: true,
        dataSaveBusinessTrip: undefined,
        errorSaveBusinessTrip: undefined,
      });

    case SAVE_BUSINESS_TRIP_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingSaveBusinessTrip: false,
        dataSaveBusinessTrip: action.data,
        errorSaveBusinessTrip: undefined,
      });

    case SAVE_BUSINESS_TRIP_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingSaveBusinessTrip: false,
        dataSaveBusinessTrip: undefined,
        errorSaveBusinessTrip: action.error,
      });

    case SEARCH_BUSINESS_TRIP_APPLICATION:
      return Object.assign({}, state, {
        fetchingSearchBusinessTrip: true,
        dataSearchBusinessTrip: undefined,
        errorSearchBusinessTrip: undefined,
      });

    case SEARCH_BUSINESS_TRIP_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingSearchBusinessTrip: false,
        dataSearchBusinessTrip: action.data,
        errorSearchBusinessTrip: undefined,
      });

    case SEARCH_BUSINESS_TRIP_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingSearchBusinessTrip: false,
        dataSearchBusinessTrip: undefined,
        errorSearchBusinessTrip: action.error,
      });

    //
    case GET_DETAIL_BUSINESS_TRIP_APPLICATION:
      return Object.assign({}, state, {
        fetchingGetDetailBusinessTrip: true,
        dataGetDetailBusinessTrip: undefined,
        errorGetDetailBusinessTrip: undefined,
      });

    case GET_DETAIL_BUSINESS_TRIP_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingGetDetailBusinessTrip: false,
        dataGetDetailBusinessTrip: action.data,
        errorGetDetailBusinessTrip: undefined,
      });

    case GET_DETAIL_BUSINESS_TRIP_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingGetDetailBusinessTrip: false,
        dataGetDetailBusinessTrip: undefined,
        errorGetDetailBusinessTrip: action.error,
      });
    case RESET_GET_DETAIL_BUSINESS_TRIP_APPLICATION:
      return Object.assign({}, state, {
        fetchingGetDetailBusinessTrip: false,
        dataGetDetailBusinessTrip: undefined,
        errorGetDetailBusinessTrip: undefined,
      });
    //
    case WITH_DRAW_BUSINESS_TRIP_APPLICATION:
      return Object.assign({}, state, {
        fetchingWithDrawBusinessTrip: true,
        dataWithDrawBusinessTrip: undefined,
        errorWithDrawBusinessTrip: undefined,
      });

    case WITH_DRAW_BUSINESS_TRIP_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingWithDrawBusinessTrip: false,
        dataWithDrawBusinessTrip: action.data,
        errorWithDrawBusinessTrip: undefined,
      });

    case WITH_DRAW_BUSINESS_TRIP_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingWithDrawBusinessTrip: false,
        dataWithDrawBusinessTrip: undefined,
        errorWithDrawBusinessTrip: action.error,
      });

    //
    case DELETE_BUSINESS_TRIP_APPLICATION:
      return Object.assign({}, state, {
        fetchingDeleteBusinessTrip: true,
        dataDeleteBusinessTrip: undefined,
        errorDeleteBusinessTrip: undefined,
      });

    case DELETE_BUSINESS_TRIP_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingDeleteBusinessTrip: false,
        dataDeleteBusinessTrip: action.data,
        errorDeleteBusinessTrip: undefined,
      });

    case DELETE_BUSINESS_TRIP_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingDeleteBusinessTrip: false,
        dataDeleteBusinessTrip: undefined,
        errorDeleteBusinessTrip: action.error,
      });

    //
    case SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION:
      return Object.assign({}, state, {
        fetchingSearchApprovedBusinessTrip: true,
        dataSearchApprovedBusinessTrip: undefined,
        errorSearchApprovedBusinessTrip: undefined,
      });

    case SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_SUCCESS:
      return Object.assign({}, state, {
        fetchingSearchApprovedBusinessTrip: false,
        dataSearchApprovedBusinessTrip: action.data,
        errorSearchApprovedBusinessTrip: undefined,
      });

    case SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_FAILED:
      return Object.assign({}, state, {
        fetchingSearchApprovedBusinessTrip: false,
        dataSearchApprovedBusinessTrip: undefined,
        errorSearchApprovedBusinessTrip: action.error,
      });
    case POPUP_CALL_RESET_ALL_REDUCERS:
      return Object.assign({}, state, {
        fetchingTypeBusinessTrip: false,
        dataTypeBusinessTrip: undefined,
        errorTypeBusinessTrip: undefined,

        fetchingCurrencyBusinessTrip: false,
        dataCurrencyBusinessTrip: undefined,
        errorCurrencyBusinessTrip: undefined,

        fetchingEmployeeBusinessTrip: false,
        dataEmployeeBusinessTrip: undefined,
        errorEmployeeBusinessTrip: undefined,

        fetchingCalculateBusinessTrip: false,
        dataCalculateBusinessTrip: undefined,
        errorCalculateBusinessTrip: undefined,

        fetchingSaveBusinessTrip: false,
        dataSaveBusinessTrip: undefined,
        errorSaveBusinessTrip: undefined,

        fetchingSearchBusinessTrip: false,
        dataSearchBusinessTrip: undefined,
        errorSearchBusinessTrip: undefined,

        fetchingGetDetailBusinessTrip: false,
        dataGetDetailBusinessTrip: undefined,
        errorGetDetailBusinessTrip: undefined,

        fetchingWithDrawBusinessTrip: false,
        dataWithDrawBusinessTrip: undefined,
        errorWithDrawBusinessTrip: undefined,

        fetchingDeleteBusinessTrip: false,
        dataDeleteBusinessTrip: undefined,
        errorDeleteBusinessTrip: undefined,

        fetchingSearchApprovedBusinessTrip: false,
        dataSearchApprovedBusinessTrip: undefined,
        errorSearchApprovedBusinessTrip: undefined, 
      });
    default:
      return state;
  }
};

export default businessTripApplicationReducers;

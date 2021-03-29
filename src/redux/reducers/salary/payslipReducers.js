//MinhNC15

import {
  GET_PAYSLIP,
  GET_PAYSLIP_SUCCESS,
  GET_PAYSLIP_ERROR,
} from '../../actions/salary/payslipAction';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
const initialState = {
  fetchingRequester: null,
  dataRequester: undefined,
  errorRequester: undefined,
};

const payslipReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYSLIP:
      // console.log('reducerAction: ', action)
      return Object.assign({}, state, {
        fetchingRequester: true,
        dataRequester: undefined,
        errorRequester: undefined,
      });

    case GET_PAYSLIP_SUCCESS:
      // console.log('reducerActionSuccess: ', action)
      return Object.assign({}, state, {
        fetchingRequester: false,
        dataRequester: action.data,
        errorRequester: undefined,
      });

    case GET_PAYSLIP_ERROR:
      return Object.assign({}, state, {
        fetchingRequester: false,
        dataRequester: undefined,
        errorRequester: action.error,
      });
    case POPUP_CALL_RESET_ALL_REDUCERS:
      return Object.assign({}, state, {
        fetchingRequester: null,
        dataRequester: undefined,
        errorRequester: undefined,
      });
    default:
      return state;
  }
};

export default payslipReducers;

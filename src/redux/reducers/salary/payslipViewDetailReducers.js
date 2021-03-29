//MinhNC15

import {
  GET_PAYSLIPVIEW_DETAIL,
  GET_PAYSLIPVIEW_DETAIL_SUCCESS,
  GET_PAYSLIPVIEW_DETAIL_ERROR,
} from '../../actions/salary/payslipViewDetailAction';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
const initialState = {
  fetchingPayslipViewDetail: false,
  dataPayslipViewDetail: [],
  errorPayslipViewDetail: undefined,
};

const payslipViewDetailReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYSLIPVIEW_DETAIL:
      // console.log('reducerAction: ', action)
      return Object.assign({}, state, {
        fetchingPayslipViewDetail: true,
        dataPayslipViewDetail: [],
        errorPayslipViewDetail: undefined,
      });

    case GET_PAYSLIPVIEW_DETAIL_SUCCESS:
      // console.log('reducerActionSuccess: ', action)
      return Object.assign({}, state, {
        fetchingPayslipViewDetail: false,
        dataPayslipViewDetail: action.data,
        errorPayslipViewDetail: undefined,
      });

    case GET_PAYSLIPVIEW_DETAIL_ERROR:
      return Object.assign({}, state, {
        fetchingPayslipViewDetail: false,
        dataPayslipViewDetail: undefined,
        errorPayslipViewDetail: action.error,
      });
    case POPUP_CALL_RESET_ALL_REDUCERS:
      return Object.assign({}, state, {
        fetchingPayslipViewDetail: false,
        dataPayslipViewDetail: [],
        errorPayslipViewDetail: undefined,
      });

    default:
      return state;
  }
};

export default payslipViewDetailReducers;

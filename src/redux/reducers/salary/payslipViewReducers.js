//MinhNC15

import {
  GET_PAYSLIPVIEW,
  GET_PAYSLIPVIEW_SUCCESS,
  GET_PAYSLIPVIEW_ERROR,
} from '../../actions/salary/payslipViewAction';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
const initialState = {
  fetchingPayslipView: false,
  dataPayslipView: [],
  errorPayslipView: undefined,
};

const payslipViewReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYSLIPVIEW:
      // console.log('reducerAction: ', action)
      return Object.assign({}, state, {
        fetchingPayslipView: true,
        dataPayslipView: [],
        errorPayslipView: undefined,
      });

    case GET_PAYSLIPVIEW_SUCCESS:
      // console.log('reducerActionSuccess: ', action)
      return Object.assign({}, state, {
        fetchingPayslipView: false,
        dataPayslipView: action.data,
        errorPayslipView: undefined,
      });

    case GET_PAYSLIPVIEW_ERROR:
      return Object.assign({}, state, {
        fetchingPayslipView: false,
        dataPayslipView: undefined,
        errorPayslipView: action.error,
      });
    case POPUP_CALL_RESET_ALL_REDUCERS:
      return Object.assign({}, state, {
        fetchingPayslipView: false,
        dataPayslipView: [],
        errorPayslipView: undefined,
      });

    default:
      return state;
  }
};

export default payslipViewReducers;

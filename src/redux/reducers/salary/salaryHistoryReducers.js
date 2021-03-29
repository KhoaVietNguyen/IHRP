//MinhNC15

import {
  GET_SALARYHISTORY,
  GET_SALARYHISTORY_SUCCESS,
  GET_SALARYHISTORY_ERROR,
} from '../../actions/salary/salaryHistoryAction';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
const initialState = {
  fetchingSalaryHistory: false,
  dataSalaryHistory: [],
  errorSalaryHistory: undefined,
};

const salaryHistoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALARYHISTORY:
      return Object.assign({}, state, {
        fetchingSalaryHistory: true,
        dataSalaryHistory: [],
        errorSalaryHistory: undefined,
      });

    case GET_SALARYHISTORY_SUCCESS:
      return Object.assign({}, state, {
        fetchingSalaryHistory: false,
        dataSalaryHistory: action.data,
        errorSalaryHistory: undefined,
      });

    case GET_SALARYHISTORY_ERROR:
      return Object.assign({}, state, {
        fetchingSalaryHistory: false,
        dataSalaryHistory: undefined,
        errorSalaryHistory: action.error,
      });
    case POPUP_CALL_RESET_ALL_REDUCERS:
      return Object.assign({}, state, {
        fetchingSalaryHistory: false,
        dataSalaryHistory: [],
        errorSalaryHistory: undefined,
      });

    default:
      return state;
  }
};

export default salaryHistoryReducers;

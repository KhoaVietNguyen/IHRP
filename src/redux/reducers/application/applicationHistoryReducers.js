import {
  GET_APPLICATION_HISTORY,
  GET_APPLICATION_HISTORY_FAILED,
  GET_APPLICATION_HISTORY_SUCCESS,
} from '../../actions/application/applicationHistory';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
const initialState = {
  fetchingApplicationHistory: false,
  dataApplicationHistory: undefined,
  errorApplicationHistory: undefined,
};

const applicationHistoryReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_APPLICATION_HISTORY:
      return Object.assign({}, state, {
        fetchingApplicationHistory: true,
        dataApplicationHistory: undefined,
        errorApplicationHistory: undefined,
      });

    case GET_APPLICATION_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        fetchingApplicationHistory: false,
        dataApplicationHistory: action.data,
        errorApplicationHistory: undefined,
      });

    case GET_APPLICATION_HISTORY_FAILED:
      return Object.assign({}, state, {
        fetchingApplicationHistory: false,
        dataApplicationHistory: undefined,
        errorApplicationHistory: action.error,
      });
    case POPUP_CALL_RESET_ALL_REDUCERS:
      return Object.assign({}, state, {
        fetchingApplicationHistory: true,
        dataApplicationHistory: undefined,
        errorApplicationHistory: undefined,
      });
    default:
      return state;
  }
};

export default applicationHistoryReducers;

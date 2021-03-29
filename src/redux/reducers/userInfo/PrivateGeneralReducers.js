import {
  GET_PRIVATE_GENERAL,
  GET_PRIVATE_GENERAL_SUCCESS,
  GET_PRIVATE_GENERAL_ERROR,
  SUBMIT_PRIVATE_GENERAL,
  SUBMIT_PRIVATE_GENERAL_SUCCESS,
  SUBMIT_PRIVATE_GENERAL_ERROR,
} from '../../actions/actionTypes';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
var initalState = {
  error: null,
  message: null,
  loading: false,
  data: null,
  resultCode: null,
  countItem: null,
  langID: null,
  commit: false,
};

export const getPrivateGeneralReducers = (state = initalState, action) => {
  switch (action.type) {
    case GET_PRIVATE_GENERAL_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        message: action.response.message,
        loading: false,
        data: action.response.dataItem,
        resultCode: action.response.code,
        countItem: action.response.countItem,
        langID: action.response.langID,
        commit: action.response.commit,
      });
    case GET_PRIVATE_GENERAL_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        message: action.error,
        loading: false,
        data: null,
        resultCode: action.response.code,
        countItem: action.response.countItem,
        langID: action.response.langID,
        commit: false,
      });
    case GET_PRIVATE_GENERAL:
      return Object.assign({}, state, {
        error: null,
        message: null,
        loading: true,
        data: null,
        resultCode: null,
        countItem: null,
        langID: null,
        commit: false,
      });
      case POPUP_CALL_RESET_ALL_REDUCERS:
        return Object.assign({}, state, {
          error: null,
          message: null,
          loading: false,
          data: null,
          resultCode: null,
          countItem: null,
          langID: null,
          commit: false,
        });
    default:
      return state;
  }
};


export const submitPrivateGeneralReducers = (state = initalState, action) => {
  switch (action.type) {
    case SUBMIT_PRIVATE_GENERAL_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        message: action.response.message,
        loading: false,
        data: action.response.dataItem,
        resultCode: action.response.code,
        countItem: action.response.countItem,
        langID: action.response.langID,
        commit: action.response.commit,
      });
    case SUBMIT_PRIVATE_GENERAL_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        message: action.error,
        loading: false,
        data: null,
        resultCode: action.response.code,
        countItem: action.response.countItem,
        langID: action.response.langID,
        commit: false,
      });
    case SUBMIT_PRIVATE_GENERAL:
      return Object.assign({}, state, {
        error: null,
        message: null,
        loading: true,
        data: null,
        resultCode: null,
        countItem: null,
        langID: null,
        commit: false,
      });
      case POPUP_CALL_RESET_ALL_REDUCERS:
        return Object.assign({}, state, {
          error: null,
          message: null,
          loading: false,
          data: null,
          resultCode: null,
          countItem: null,
          langID: null,
          commit: false,
        });
    default:
      return state;
  }
};
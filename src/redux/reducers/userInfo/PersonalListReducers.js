import {
  GET_PRIVATE_ALLOW,
  GET_PRIVATE_ALLOW_SUCCESS,
  GET_PRIVATE_ALLOW_ERROR,
  GET_PRIVATE_PROFILE,
  GET_PRIVATE_PROFILE_ERROR,
  GET_PRIVATE_PROFILE_SUCCESS,
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

export const getPersonalListReducers = (state = initalState, action) => {
  switch (action.type) {
    case GET_PRIVATE_ALLOW_SUCCESS:
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
    case GET_PRIVATE_ALLOW_ERROR:
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
    case GET_PRIVATE_ALLOW:
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

export const getPersonalProfileReducers = (state = initalState, action) => {
  switch (action.type) {
    case GET_PRIVATE_PROFILE_SUCCESS:
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
    case GET_PRIVATE_PROFILE_ERROR:
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
    case GET_PRIVATE_PROFILE:
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

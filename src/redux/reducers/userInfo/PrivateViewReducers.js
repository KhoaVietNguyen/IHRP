import {
  GET_PRIVATE_VIEW,
  GET_PRIVATE_VIEW_SUCCESS,
  GET_PRIVATE_VIEW_ERROR,
  GET_PERSONAL_FORM_LIST,
  GET_PERSONAL_FORM_LIST_SUCCESS,
  GET_PERSONAL_FORM_LIST_ERROR,
  GET_PRIVATE_FORM,
  GET_PRIVATE_FORM_ERROR,
  GET_PRIVATE_FORM_SUCCESS,
  GET_PRIVATE_LIST,
  GET_PRIVATE_LIST_SUCCESS,
  GET_PRIVATE_LIST_ERROR,
  SAVE_PRIVATE_FORM,
  SAVE_PRIVATE_FORM_SUCCESS,
  SAVE_PRIVATE_FORM_ERROR,
  DELETE_PRIVATE_FORM,
  DELETE_PRIVATE_FORM_ERROR,
  DELETE_PRIVATE_FORM_SUCCESS,
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
  commit: null,
};

export const getPrivateViewReducers = (state = initalState, action) => {
  switch (action.type) {
    case GET_PRIVATE_VIEW_SUCCESS:
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
    case GET_PRIVATE_VIEW_ERROR:
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
    case GET_PRIVATE_VIEW:
      return Object.assign({}, state, {
        error: null,
        message: null,
        loading: true,
        data: null,
        resultCode: null,
        countItem: null,
        langID: null,
        commit: null,
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
        commit: null,
      });
    default:
      return state;
  }
};

export const getPersonalFormListReducers = (state = initalState, action) => {
  switch (action.type) {
    case GET_PERSONAL_FORM_LIST_SUCCESS:
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
    case GET_PERSONAL_FORM_LIST_ERROR:
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
    case GET_PERSONAL_FORM_LIST:
      return Object.assign({}, state, {
        error: null,
        message: null,
        loading: true,
        data: null,
        resultCode: null,
        countItem: null,
        langID: null,
        commit: null,
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
        commit: null,
      });
    default:
      return state;
  }
};

export const getPrivateFormReducers = (state = initalState, action) => {
  switch (action.type) {
    case GET_PRIVATE_FORM_SUCCESS:
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
    case GET_PRIVATE_FORM_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        message: action.error,
        loading: false,
        data: null,
        resultCode: action.response.code,
        countItem: action.response.countItem,
        langID: action.response.langID,
        commit: action.response.commit,
      });
    case GET_PRIVATE_FORM:
      return Object.assign({}, state, {
        error: null,
        message: null,
        loading: true,
        data: null,
        resultCode: null,
        countItem: null,
        langID: null,
        commit: null,
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
        commit: null,
      });
    default:
      return state;
  }
};

export const getPrivateListReducers = (state = initalState, action) => {
  switch (action.type) {
    case GET_PRIVATE_LIST_SUCCESS:
      return Object.assign({}, state, {
        error: null,
        message: action.response.message,
        loading: false,
        data: action.response.dataItem,
        resultCode: action.response.code,
        countItem: action.response.countItem,
        langID: action.response.langID,
        commit: action.response.commit,
        dataSource: action.dataSource,
      });
    case GET_PRIVATE_LIST_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        message: action.error,
        loading: false,
        data: null,
        resultCode: action.response.code,
        countItem: action.response.countItem,
        langID: action.response.langID,
        commit: false,
        dataSource: null,
      });
    case GET_PRIVATE_LIST:
      return Object.assign({}, state, {
        error: null,
        message: null,
        loading: true,
        data: null,
        resultCode: null,
        countItem: null,
        langID: null,
        commit: false,
        dataSource: null,
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
        commit: null,
      });
    default:
      return state;
  }
};

export const savePrivateFormReducers = (state = initalState, action) => {
  switch (action.type) {
    case SAVE_PRIVATE_FORM_SUCCESS:
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
    case SAVE_PRIVATE_FORM_ERROR:
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
    case SAVE_PRIVATE_FORM:
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
        commit: null,
      });
    default:
      return state;
  }
};

export const deletePrivateFormReducers = (state = initalState, action) => {
  switch (action.type) {
    case DELETE_PRIVATE_FORM_SUCCESS:
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
    case DELETE_PRIVATE_FORM_ERROR:
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
    case DELETE_PRIVATE_FORM:
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
        commit: null,
      });
    default:
      return state;
  }
};

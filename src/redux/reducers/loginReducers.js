//Linhtn23

import {
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  DID_LOGIN_ACTION,
  POST_LOGIN,
  POPUP_POST_LOGIN_SHOW,
  POPUP_POST_LOGIN_HIDE,
  POPUP_POST_LOGIN_FAILED,
  POPUP_POST_LOGIN_SUCCESS,
  POPUP_POST_LOGIN,

  POPUP_ALERT,
  POPUP_ALERT_HIDE,
  POPUP_ALERT_SHOW,
  REPLACE_SCREEN_LOGIN,
  REPLACE_SCREEN_LOGIN_ACTION,

  POPUP_UPDATE_APP_SHOW,
} from '../actions/actionTypes';
import {
  arrayIsEmpty,
  objectIsNull,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import { GET_WF_REQUESTER } from '../actions/home/homeActions';
const initialState = {
  isFetching: false,
  data: undefined,
  error: undefined,
  typeLogin: undefined,

  dataPopupLogin: undefined,
  errorPopupLogin: undefined,
  fetchingPopupLogin: false,
  visiblePopupPostLogin: false,
  listAction: [],

  fetchingAlert: false,
  visibleAlert: false,
  dataAlert: undefined,

  actionReplaceScreen: undefined,

  messagePopupUpdateApp: '',
};

const loginReducers = (login = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN:
      return Object.assign({}, login, {
        isFetching: true,
        data: undefined,
        error: undefined,
        typeLogin: undefined,
      });

    case SIGNIN_SUCCESS:
      return Object.assign({}, login, {
        isFetching: false,
        data: action.data,
        error: undefined,
        typeLogin: action.typeLogin,
      });

    case SIGNIN_ERROR:
      return Object.assign({}, login, {
        isFetching: false,
        data: undefined,
        error: action.error,
        typeLogin: undefined,
      });
    case DID_LOGIN_ACTION:
      return 0;

    case POPUP_POST_LOGIN_SHOW:
      console.log('loginReducers - ActionType: ', action.type)
      login.listAction.push(action.action)
      let list = login.listAction
      return Object.assign({}, login, {
        visiblePopupPostLogin: true,
        listAction: list,
      });

    case POPUP_POST_LOGIN_HIDE:
      return Object.assign({}, login, {
        visiblePopupPostLogin: false,
        listAction: [],
        typeLogin: undefined,
      });
    case POPUP_POST_LOGIN:
      return Object.assign({}, login, {
        dataPopupLogin: undefined,
        errorPopupLogin: undefined,
        fetchingPopupLogin: true,
      });

    case POPUP_POST_LOGIN_SUCCESS:
      return Object.assign({}, login, {
        dataPopupLogin: action.data,
        errorPopupLogin: undefined,
        fetchingPopupLogin: false,
      });

    case POPUP_POST_LOGIN_FAILED:
      return Object.assign({}, login, {
        dataPopupLogin: undefined,
        errorPopupLogin: action.error,
        fetchingPopupLogin: false,
      });

    case POPUP_ALERT:
      return Object.assign({}, login, {
        fetchingAlert: true,
        visibleAlert: false,
        dataAlert: undefined,
      });

    case POPUP_ALERT_SHOW:
      return Object.assign({}, login, {
        fetchingAlert: false,
        visibleAlert: true,
        dataAlert: action.data
      });
    case POPUP_ALERT_HIDE:
      return Object.assign({}, login, {
        fetchingAlert: false,
        visibleAlert: false,
        dataAlert: undefined
      });
    case REPLACE_SCREEN_LOGIN_ACTION:
      return Object.assign({}, login, {
        actionReplaceScreen: action.input
      });
    case POPUP_UPDATE_APP_SHOW:
      return Object.assign({}, login, {
        messagePopupUpdateApp: action.message
      });
    default:
      return login;
  }
};

export default loginReducers;

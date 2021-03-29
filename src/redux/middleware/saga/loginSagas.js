import {
  POST_LOGIN,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  POPUP_POST_LOGIN_SHOW,
  POPUP_POST_LOGIN_HIDE,
  POPUP_POST_LOGIN_SUCCESS,
  POPUP_POST_LOGIN_FAILED,
  POPUP_POST_LOGIN,
  POPUP_CALL_RESET_ALL_REDUCERS,
  POPUP_ALERT,
  POPUP_ALERT_HIDE,
  POPUP_ALERT_SHOW,
  REPLACE_SCREEN_LOGIN,
  REPLACE_SCREEN_LOGIN_ACTION,
  POPUP_UPDATE_APP_SHOW,

} from '../../actions/actionTypes';
import { errorConnectServer, userProfile } from '../../../config/settings';

import { call, takeEvery, put } from 'redux-saga/effects';

import { postLogin, postPopupLogin } from '../api/loginApi';
import { stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
function* signInFlow(action) {
  try {
    const response = yield postLogin(action.data);
    console.log('responseSignInLogin: ', response);
    if (response !== undefined) {
      if (response.code) {
        yield put({ type: SIGNIN_SUCCESS, data: response.message, typeLogin: action.data.type });
      } else if (!response.code) {
        yield put({ type: SIGNIN_ERROR, error: response.message });
      } else if (response.code === '4') {
        yield put({
          type: POPUP_UPDATE_APP_SHOW,
          message: response.message !== undefined ? response.message : ''
        });
      } else {
        yield put({
          type: SIGNIN_ERROR,
          error: userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
        });
      }
    } else {
      yield put({
        type: SIGNIN_ERROR,
        error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
      });
    }
  } catch (error) {
    console.log('errorCatchSagasLogin: ', error);
    yield put({
      type: SIGNIN_ERROR,
      error:
        userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
    });
  }
}

export function* watchLogin() {
  yield takeEvery(POST_LOGIN, signInFlow);
}

function* showPopupPostLoginFlow() {
  try {
    // yield put({ type: POPUP_POST_LOGIN_SHOW });
  } catch (error) {
    // yield put({ type: POPUP_POST_LOGIN_SHOW });
  }
}

export function* watchShowPopupPostLogin() {
  yield takeEvery(POPUP_POST_LOGIN_SHOW, showPopupPostLoginFlow);
}

function* hidePopupPostLoginFlow() {
  try {
    // yield put({ type: POPUP_POST_LOGIN_HIDE });
  } catch (error) {
    // yield put({ type: POPUP_POST_LOGIN_HIDE });
  }
}

export function* watchHidePopupPostLogin() {
  yield takeEvery(POPUP_POST_LOGIN_HIDE, hidePopupPostLoginFlow);
}

function* popupPostLoginFlow(action) {
  try {
    const response = yield postPopupLogin(action.input);
    console.log('responsePopupPostLogin: ', response);
    if (response !== undefined) {
      if (response.code) {
        yield put({ type: POPUP_POST_LOGIN_SUCCESS, data: response.message });
      } else if (!response.code) {
        yield put({ type: POPUP_POST_LOGIN_FAILED, error: response.message });
      } else {
        yield put({
          type: POPUP_POST_LOGIN_FAILED,
          error:
            userProfile.LangID === 'VN'
              ? errorConnectServer.vn
              : errorConnectServer.en,
        });
      }
    } else {
      yield put({
        type: POPUP_POST_LOGIN_FAILED,
        error:
          userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
      });
    }
  } catch (error) {
    console.log('errorCatchSagasPopupPostLogin: ', error);
    yield put({
      type: POPUP_POST_LOGIN_FAILED,
      error:
        userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
    });
  }
}

export function* watchPopupPostLogin() {
  yield takeEvery(POPUP_POST_LOGIN, popupPostLoginFlow);
}



function* onResetAllReducersFlow() {
  try {
  } catch (error) { }
}

export function* watchOnResetAllReducers() {
  yield takeEvery(POPUP_CALL_RESET_ALL_REDUCERS, onResetAllReducersFlow);
}




function* popupAlertFlow(action) {
  try {
    if (action.input.visible === 'show') {
      yield put({ type: POPUP_ALERT_SHOW, data: action.input });
    } else {
      yield put({ type: POPUP_ALERT_HIDE });
    }
  } catch (error) {
    yield put({ type: POPUP_ALERT_HIDE });
  }
}

export function* watchPopupAlert() {
  yield takeEvery(POPUP_ALERT, popupAlertFlow);
}



function* replaceScreenLoginFlow(action) {
  try {
    yield put({ type: REPLACE_SCREEN_LOGIN_ACTION, input: action.input });
  } catch (error) {
    yield put({ type: REPLACE_SCREEN_LOGIN_ACTION, input: undefined });
  }
}

export function* watchReplaceScreenLogin() {
  yield takeEvery(REPLACE_SCREEN_LOGIN, replaceScreenLoginFlow);
}



function* showPopupUpdateAppFlow() {
  try {
    // yield put({ type: POPUP_POST_LOGIN_SHOW });
  } catch (error) {
    // yield put({ type: POPUP_POST_LOGIN_SHOW });
  }
}

export function* watchShowPopupUpdateApp() {
  yield takeEvery(POPUP_UPDATE_APP_SHOW, showPopupUpdateAppFlow);
}


import {
  SEND_ACCOUNT_FORGOT_PASSWORD,
  SEND_ACCOUNT_FORGOT_PASSWORD_FAILED,
  SEND_ACCOUNT_FORGOT_PASSWORD_SUCCESS,
  SEND_CODE_VERIFY_FORGOT_PASSWORD,
  SEND_CODE_VERIFY_FORGOT_PASSWORD_FAILED,
  SEND_CODE_VERIFY_FORGOT_PASSWORD_SUCCESS,
} from '../../../actions/forgotPassword/forgotPasswordActions';
import { errorConnectServer, userProfile } from '../../../../config/settings';

import { call, takeEvery, put } from 'redux-saga/effects';

import {
  sendAccountForgotPasswordApi,
  sendCodeVerifyForgotPasswordApi,
} from '../../api/forgotPassword/forgotPasswordApi';
import { POPUP_POST_LOGIN_SHOW, POPUP_UPDATE_APP_SHOW } from '../../../actions/actionTypes';
import { stringIsEmpty } from '@dungdang/react-native-basic/src/Functions';

function* sendAccountForgotPasswordFlow(action) {
  try {
    const response = yield sendAccountForgotPasswordApi(action.input);
    console.log('responseSendAccountForgotPassword: ', response);
    if (response !== undefined) {
      if (response.code === '0') {
        yield put({
          type: SEND_ACCOUNT_FORGOT_PASSWORD_SUCCESS,
          data: response.message,
        });
      } else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: { type: SEND_ACCOUNT_FORGOT_PASSWORD, input: action.input },
        });
      } else if (response.code === '4') {
        yield put({
          type: POPUP_UPDATE_APP_SHOW,
          message: response.message !== undefined ? response.message : ''
        });
      } else {
        const message = response.message;
        yield put({
          type: SEND_ACCOUNT_FORGOT_PASSWORD_FAILED,
          error: !stringIsEmpty(message)
            ? message
            : userProfile.LangID === 'VN'
              ? errorConnectServer.vn
              : errorConnectServer.en,
        });
      }
    } else {
      yield put({
        type: SEND_ACCOUNT_FORGOT_PASSWORD_FAILED,
        error:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      });
    }
  } catch (error) {
    console.log('errorCatchSagasSendAccountForgotPassword: ', error);
    yield put({
      type: SEND_ACCOUNT_FORGOT_PASSWORD_FAILED,
      error:
        userProfile.LangID === 'VN'
          ? errorConnectServer.vn
          : errorConnectServer.en,
    });
  }
}

export function* watchSendAccountForgotPassword() {
  yield takeEvery(SEND_ACCOUNT_FORGOT_PASSWORD, sendAccountForgotPasswordFlow);
}


function* sendCodeVerifyForgotPasswordFlow(action) {
  try {
    const response = yield sendCodeVerifyForgotPasswordApi(action.input);
    console.log('responseSendCodeVerifyForgotPassword: ', response);
    if (response !== undefined) {
      if (response.code === '0') {
        yield put({
          type: SEND_CODE_VERIFY_FORGOT_PASSWORD_SUCCESS,
          data: response.message,
        });
      } else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: { type: SEND_ACCOUNT_FORGOT_PASSWORD, input: action.input },
        });
      } else if (response.code === '4') {
        yield put({
          type: POPUP_UPDATE_APP_SHOW,
          message: response.message !== undefined ? response.message : ''
        });
      } else {
        const message = response.message;
        yield put({
          type: SEND_CODE_VERIFY_FORGOT_PASSWORD_FAILED,
          error: !stringIsEmpty(message)
            ? message
            : userProfile.LangID === 'VN'
              ? errorConnectServer.vn
              : errorConnectServer.en,
        });
      }
    } else {
      yield put({
        type: SEND_CODE_VERIFY_FORGOT_PASSWORD_FAILED,
        error:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      });
    }
  } catch (error) {
    console.log('errorCatchSagasSendCodeVerifyForgotPassword: ', error);
    yield put({
      type: SEND_CODE_VERIFY_FORGOT_PASSWORD_FAILED,
      error:
        userProfile.LangID === 'VN'
          ? errorConnectServer.vn
          : errorConnectServer.en,
    });
  }
}

export function* watchSendCodeVerifyForgotPassword() {
  yield takeEvery(SEND_CODE_VERIFY_FORGOT_PASSWORD, sendCodeVerifyForgotPasswordFlow);
}
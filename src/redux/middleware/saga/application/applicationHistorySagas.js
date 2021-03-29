import {
  GET_APPLICATION_HISTORY,
  GET_APPLICATION_HISTORY_SUCCESS,
  GET_APPLICATION_HISTORY_FAILED,
} from '../../../actions/application/applicationHistory';
import {
  POPUP_POST_LOGIN_SHOW,
  POPUP_UPDATE_APP_SHOW,
} from '../../../actions/actionTypes';

import { getApplicationHistoryApi } from '../../api/applicationHistoryApi'
import { errorConnectServer, userProfile } from '../../../../config/settings';

import { call, takeEvery, put } from 'redux-saga/effects';
import {
  objectIsNull,
  arrayIsEmpty,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';

function* ApplicationHistoryFlow(action) {
  try {
    console.log("responseApplicationHistoryFlow")
    const response = yield getApplicationHistoryApi(action.input);
    console.log('responseApplicationHistoryFlow : ', response);
    if (response !== undefined) {
      if (response.code === '0') {
        yield put({
          type: GET_APPLICATION_HISTORY_SUCCESS,
          data: response.dataItem,
        });
      } else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: { type: GET_APPLICATION_HISTORY, input: undefined },
        });
      } else if (response.code === '4') {
        yield put({
          type: POPUP_UPDATE_APP_SHOW,
          message: response.message !== undefined ? response.message : ''
        });
      } else {
        let message = response.message;
        yield put({
          type: GET_APPLICATION_HISTORY_FAILED,
          error:
            message !== undefined
              ? message
              : userProfile.LangID === 'VN'
                ? errorConnectServer.vn
                : errorConnectServer.en,
        });
      }
    } else {
      yield put({
        type: GET_APPLICATION_HISTORY_FAILED,
        error:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      });
    }
  } catch (error) {
    console.log('errorCatchSagasGetApplicationHistoryFlow: ', error);
    yield put({
      type: GET_APPLICATION_HISTORY_FAILED,
      error:
        userProfile.LangID === 'VN'
          ? errorConnectServer.vn
          : errorConnectServer.en,
    });
  }
}

export function* watchGetApplicationHistory() {
  yield takeEvery(GET_APPLICATION_HISTORY, ApplicationHistoryFlow);
}

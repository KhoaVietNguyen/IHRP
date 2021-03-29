import {
  GET_PRIVATE_GEN_VIEW,
  GET_PRIVATE_GEN_VIEW_SUCCESS,
  GET_PRIVATE_GEN_VIEW_ERROR,
  GET_PERSONAL_FORM,
  GET_PERSONAL_FORM_SUCCESS,
  GET_PERSONAL_FORM_ERROR,
  GET_PERSONAL_FORM_SOURCE,
  GET_PERSONAL_FORM_SOURCE_ERROR,
  GET_PERSONAL_FORM_SOURCE_SUCCESS,
  SAVE_PERSONAL_FORM_SUCCESS,
  SAVE_PERSONAL_FORM_ERROR,
  SAVE_PERSONAL_FORM,
  REMOVE_PRIVATE_GEN_VIEW,
} from '../../../actions/personalPage/PersonalPageAction';
import { POPUP_POST_LOGIN_SHOW, POPUP_UPDATE_APP_SHOW } from '../../../actions/actionTypes';
import {
  getPrivateGenViewApi,
  getPersonalFormApi,
  getPersonalFormSourceApi,
  SavePersonalFormApi,
} from '../../api/personalPage/PersonalPageApi';
import { takeEvery, put } from 'redux-saga/effects';

//PhucNT34
function* watchGetPrivateGenViewFlow(action) {
  try {
    const response = yield getPrivateGenViewApi(action.input);
    console.log('response - getPrivateGenViewApi: ', response)
    if (response.code === '0') {
      const dataItem = response.dataItem;

      // console.warn('success saga', dataItem)
      yield put({
        type: GET_PRIVATE_GEN_VIEW_SUCCESS,
        dataItem,
      });
    } else if (response.code === '1') {
      yield put({
        type: POPUP_POST_LOGIN_SHOW,
        action: { type: GET_PRIVATE_GEN_VIEW, input: action.input },
      });
    } else if (response.code === '4') {
      yield put({
        type: POPUP_UPDATE_APP_SHOW,
        message: response.message !== undefined ? response.message : ''
      });
    } else {
      const error = response.message;
      // console.warn('error saga', error)
      yield put({
        type: GET_PRIVATE_GEN_VIEW_ERROR,
        error,
      });
    }
  } catch (error) {
    // console.log('getPrivateGenViewSaga: ', error);
    yield put({
      type: GET_PRIVATE_GEN_VIEW_ERROR,
      error: userProfile === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
    });
  }
}
export function* watchGetPrivateGenViewSaga() {
  yield takeEvery(GET_PRIVATE_GEN_VIEW, watchGetPrivateGenViewFlow);
}

function* watchGetPersonalFormFlow(action) {
  try {
    const response = yield getPersonalFormApi(action.input);

    if (response.code === '0') {
      const dataItem = response.dataItem;

      // console.warn('success watchGetPersonalFormFlow', dataItem);
      yield put({
        type: GET_PERSONAL_FORM_SUCCESS,
        dataItem,
      });
    } else if (response.code === '1') {
      yield put({
        type: POPUP_POST_LOGIN_SHOW,
        action: { type: GET_PERSONAL_FORM, input: action.input },
      });
    } else if (response.code === '4') {
      yield put({
        type: POPUP_UPDATE_APP_SHOW,
        message: response.message !== undefined ? response.message : ''
      });
    }
    else {
      const error = response.message;
      // console.warn('error watchGetPersonalFormFlow', error);
      yield put({
        type: GET_PERSONAL_FORM_ERROR,
        error,
      });
    }
  } catch (error) {
    // console.log('watchGetPersonalFormFlow: ', error);
    yield put({
      type: GET_PERSONAL_FORM_ERROR,
      error: userProfile === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
    });
  }
}
export function* watchGetPersonalFormSaga() {
  yield takeEvery(GET_PERSONAL_FORM, watchGetPersonalFormFlow);
}

function* watchGetPersonalFormSourceFlow(action) {
  try {
    const response = yield getPersonalFormSourceApi(action.input);
    console.log('response', response);
    if (response.code === '0') {
      const dataItem = response.dataItem;
      const dataSource = action.input.ID;
      // console.warn('success watchGetPersonalFormFlow', dataItem);
      yield put({
        type: GET_PERSONAL_FORM_SOURCE_SUCCESS,
        dataItem,
        dataSource,
      });
    } else if (response.code === '1') {
      yield put({
        type: POPUP_POST_LOGIN_SHOW,
        action: { type: GET_PERSONAL_FORM_SOURCE, input: action.input },
      });
    } else if (response.code === '4') {
      yield put({
        type: POPUP_UPDATE_APP_SHOW,
        message: response.message !== undefined ? response.message : ''
      });
    } else {
      const error = response.message;
      // console.warn('error watchGetPersonalFormFlow', error);
      yield put({
        type: GET_PERSONAL_FORM_SOURCE_ERROR,
        error,
      });
    }
  } catch (error) {
    // console.log('watchGetPersonalFormFlow: ', error);
    yield put({
      type: GET_PERSONAL_FORM_SOURCE_ERROR,
      error: userProfile === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
    });
  }
}
export function* watchGetPersonalFormSourceSaga() {
  yield takeEvery(GET_PERSONAL_FORM_SOURCE, watchGetPersonalFormSourceFlow);
}

function* watchSavePersonalFormFlow(action) {
  try {
    const response = yield SavePersonalFormApi(action.input);
    console.log('responese', response);
    if (response.code === '0') {
      // const commit = response.commit;
      // console.warn('success watchGetPersonalFormFlow', dataItem);
      yield put({
        type: SAVE_PERSONAL_FORM_SUCCESS,
        response,
      });
    } else if (response.code === '1') {
      yield put({
        type: POPUP_POST_LOGIN_SHOW,
        action: { type: SAVE_PERSONAL_FORM, input: action.input },
      });
    } else if (response.code === '4') {
      yield put({
        type: POPUP_UPDATE_APP_SHOW,
        message: response.message !== undefined ? response.message : ''
      });
    } else {
      const error = response.message;
      // console.warn('error watchGetPersonalFormFlow', error);
      yield put({
        type: SAVE_PERSONAL_FORM_ERROR,
        error,
      });
    }
  } catch (error) {
    // console.log('watchGetPersonalFormFlow: ', error);
    yield put({
      type: SAVE_PERSONAL_FORM_ERROR,
      error: userProfile === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
    });
  }
}
export function* watchSavePersonalFormSaga() {
  yield takeEvery(SAVE_PERSONAL_FORM, watchSavePersonalFormFlow);
}


function* removePrivateGenViewFlow() {
  try {
    yield put({
      type: SAVE_PERSONAL_FORM_ERROR
    });
  } catch (error) {
    // console.log('watchGetPersonalFormFlow: ', error);
    yield put({
      type: SAVE_PERSONAL_FORM_ERROR
    });
  }
}

export function* watchRemovePrivateGenView() {
  yield takeEvery(REMOVE_PRIVATE_GEN_VIEW, removePrivateGenViewFlow);
}

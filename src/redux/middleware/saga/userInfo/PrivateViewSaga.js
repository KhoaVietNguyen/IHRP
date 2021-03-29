import {
  getPrivateView,
  getPersonalFormList,
  getPrivateForm,
  getPrivateList,
  savePrivateForm,
  deletePrivateForm
} from './../../api/userInfo/PrivateViewAPI';
import {
  GET_PRIVATE_VIEW,
  GET_PRIVATE_VIEW_ERROR,
  GET_PRIVATE_VIEW_SUCCESS,
  GET_PERSONAL_FORM_LIST,
  GET_PERSONAL_FORM_LIST_ERROR,
  GET_PERSONAL_FORM_LIST_SUCCESS,
  GET_PRIVATE_FORM,
  GET_PRIVATE_FORM_ERROR,
  GET_PRIVATE_FORM_SUCCESS,
  GET_PRIVATE_LIST,
  GET_PRIVATE_LIST_ERROR,
  GET_PRIVATE_LIST_SUCCESS,
  SAVE_PRIVATE_FORM,
  SAVE_PRIVATE_FORM_ERROR,
  SAVE_PRIVATE_FORM_SUCCESS,
  DELETE_PRIVATE_FORM,
  DELETE_PRIVATE_FORM_ERROR,
  DELETE_PRIVATE_FORM_SUCCESS,POPUP_POST_LOGIN_SHOW
} from '../../../actions/actionTypes';
import {call, put, takeEvery} from 'redux-saga/effects';

function* GetPersonalPrivateView(action) {
  try {
    // console.log('PersonalPrivateView Saga', action.data);
    const response = yield getPrivateView(action.data);
    // console.log('PersonalPrivateView Saga Response', response);
    if (response !== undefined) {
      // console.log(response.code);
      if (response.code == 0) {
        // console.log('Get Data Success', response.dataItem);
        yield put({type: GET_PRIVATE_VIEW_SUCCESS, response});
      }else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: {type: GET_PRIVATE_VIEW, input: action.data},
        });
      }  else {
        // console.log('Get Data Fail', response.dataItem);
        const error = response.message;
        yield put({type: GET_PRIVATE_VIEW_ERROR, error, response});
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_VIEW_ERROR, error, response});
    }
  } catch (error) {
    if (error === undefined) {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_VIEW_ERROR, error, response});
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_VIEW_ERROR, error, response});
    }
  }
}

export function* watchGetPersonalPrivateView() {
  yield takeEvery(GET_PRIVATE_VIEW, GetPersonalPrivateView);
}

function* GetPersonalFormList(action) {
  try {
    // console.log('PersonalFormList Saga', action.data);
    const response = yield getPersonalFormList(action.data);
    // console.log('PersonalFormList Saga Response', response);
    if (response !== undefined) {
      // console.log(response.code);
      if (response.code == 0) {
        // console.log('Get Data Success', response.dataItem);
        yield put({type: GET_PERSONAL_FORM_LIST_SUCCESS, response});
      } else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: {type: GET_PERSONAL_FORM_LIST, input: action.data},
        });
      } else {
        // console.log('Get Data Fail', response.dataItem);
        const error = response.message;
        yield put({type: GET_PERSONAL_FORM_LIST_ERROR, error, response});
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PERSONAL_FORM_LIST_ERROR, error, response});
    }
  } catch (error) {
    if (error === undefined) {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PERSONAL_FORM_LIST_ERROR, error, response});
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PERSONAL_FORM_LIST_ERROR, error, response});
    }
  }
}

export function* watchGetPersonalFormList() {
  yield takeEvery(GET_PERSONAL_FORM_LIST, GetPersonalFormList);
}

function* GetPrivateForm(action) {
  try {
    // console.log('PrivateForm Saga', action.data);
    const response = yield getPrivateForm(action.data);
    // console.log('PrivateForm Saga Response', response);
    if (response !== undefined) {
      // console.log(response.code);
      if (response.code == 0) {
        // console.log('Get Data Success', response.dataItem);
        yield put({type: GET_PRIVATE_FORM_SUCCESS, response});
      } else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: {type: GET_PRIVATE_FORM, input: action.data},
        });
      } else {
        // console.log('Get Data Fail', response.dataItem);
        const error = response.message;
        yield put({type: GET_PRIVATE_FORM_ERROR, error, response});
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_FORM_ERROR, error, response});
    }
  } catch (error) {
    if (error === undefined) {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_FORM_ERROR, error, response});
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_FORM_ERROR, error, response});
    }
  }
}

export function* watchGetPrivateForm() {
  yield takeEvery(GET_PRIVATE_FORM, GetPrivateForm);
}

function* GetPrivateList(action) {
  try {
    // console.log('PrivateList Saga', action.data);
    const response = yield getPrivateList(action.data);
    // console.log('PrivateList Saga Response', response);
    if (response !== undefined) {
      // console.log(response.code);
      if (response.code == 0) {
        // console.log('Get Data Success', response.dataItem);
        let dataSource = action.data;
        yield put({type: GET_PRIVATE_LIST_SUCCESS, response, dataSource});
      }else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: {type: SUBMIT_PRIVATE_GENERAL, input: action.data},
        });
      }  else {
        // console.log('Get Data Fail', response.dataItem);
        const error = response.message;
        yield put({type: GET_PRIVATE_LIST_ERROR, error, response});
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_LIST_ERROR, error, response});
    }
  } catch (error) {
    if (error === undefined) {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_LIST_ERROR, error, response});
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_LIST_ERROR, error, response});
    }
  }
}

export function* watchGetPrivateList() {
  yield takeEvery(GET_PRIVATE_LIST, GetPrivateList);
}

function* SavePrivateForm(action) {
  try {
    // console.log('SavePrivateForm Saga', action.data);
    const response = yield savePrivateForm(action.data);
    // console.log('SavePrivateForm Saga Response', response);
    if (response !== undefined) {
      // console.log(response.code);
      if (response.code == 0) {
        // console.log('Get Data Success', response.dataItem);
        let dataSource = action.data;
        yield put({type: SAVE_PRIVATE_FORM_SUCCESS, response, dataSource});
      } else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: {type: SAVE_PRIVATE_FORM, input: action.data},
        });
      } else {
        // console.log('Get Data Fail', response.dataItem);
        const error = response.message;
        yield put({type: SAVE_PRIVATE_FORM_ERROR, error, response});
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: SAVE_PRIVATE_FORM_ERROR, error, response});
    }
  } catch (error) {
    if (error === undefined) {
      const error = 'Khong lay duoc ket qua';
      yield put({type: SAVE_PRIVATE_FORM_ERROR, error, response});
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: SAVE_PRIVATE_FORM_ERROR, error, response});
    }
  }
}

export function* watchSavePrivateForm() {
  yield takeEvery(SAVE_PRIVATE_FORM, SavePrivateForm);
}

function* DeletePrivateForm(action) {
  try {
    // console.log('SavePrivateForm Saga', action.data);
    const response = yield deletePrivateForm(action.data);
    // console.log('SavePrivateForm Saga Response', response);
    if (response !== undefined) {
      // console.log(response.code);
      if (response.code == 0) {
        // console.log('Get Data Success', response.dataItem);
        let dataSource = action.data;
        yield put({type:DELETE_PRIVATE_FORM_SUCCESS, response, dataSource});
      }else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: {type: DELETE_PRIVATE_FORM, input: action.data},
        });
      }  else {
        // console.log('Get Data Fail', response.dataItem);
        const error = response.message;
        yield put({type: DELETE_PRIVATE_FORM_ERROR, error, response});
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: DELETE_PRIVATE_FORM_ERROR, error, response});
    }
  } catch (error) {
    if (error === undefined) {
      const error = 'Khong lay duoc ket qua';
      yield put({type: DELETE_PRIVATE_FORM_ERROR, error, response});
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: DELETE_PRIVATE_FORM_ERROR, error, response});
    }
  }
}

export function* watchDeletePrivateForm() {
  yield takeEvery(DELETE_PRIVATE_FORM, DeletePrivateForm);
}

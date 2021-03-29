import {
  getPrivateGeneral,
  submitPrivateGeneralAPI,
} from './../../api/userInfo/PrivateGeneralAPI';
import {
  GET_PRIVATE_GENERAL,
  GET_PRIVATE_GENERAL_ERROR,
  GET_PRIVATE_GENERAL_SUCCESS,
  SUBMIT_PRIVATE_GENERAL,
  SUBMIT_PRIVATE_GENERAL_SUCCESS,
  SUBMIT_PRIVATE_GENERAL_ERROR,
  POPUP_POST_LOGIN_SHOW
} from '../../../actions/actionTypes';
import {call, put, takeEvery} from 'redux-saga/effects';
function* GetPersonalPrivateGeneral(action) {
  try {
    // console.log("PersonalPrivateGENERAL Saga", action.data)
    const response = yield getPrivateGeneral(action.data);
    // console.log("PersonalPrivateGENERAL Saga Response", response)
    if (response !== undefined) {
      // console.log(response.code)
      if (response.code == 0) {
        // console.log("Get Data Success", response.dataItem)
        yield put({type: GET_PRIVATE_GENERAL_SUCCESS, response});
      } else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: {type: GET_PRIVATE_GENERAL, input: action.data},
        });
      } else {
        // console.log("Get Data Fail", response.dataItem)
        const error = response.message;
        yield put({type: GET_PRIVATE_GENERAL_ERROR, error, response});
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_GENERAL_ERROR, error, response});
    }
  } catch (error) {
    if (error === undefined) {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_GENERAL_ERROR, error, response});
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_GENERAL_ERROR, error, response});
    }
  }
}

export function* watchGetPersonalPrivateGeneral() {
  yield takeEvery(GET_PRIVATE_GENERAL, GetPersonalPrivateGeneral);
}

function* SubmitPersonalPrivateGeneralFlow(action) {
  try {
    const response = yield submitPrivateGeneralAPI(action.data);
    if (response !== undefined) {
      if (response.code == 0) {
        yield put({type: SUBMIT_PRIVATE_GENERAL_SUCCESS, response});
      } else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: {type: SUBMIT_PRIVATE_GENERAL, input: action.data},
        });
      } else {
        const error = response.message;
        yield put({type: SUBMIT_PRIVATE_GENERAL_ERROR, error, response});
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: SUBMIT_PRIVATE_GENERAL_ERROR, error, response});
    }
  } catch (error) {
    if (error === undefined) {
      const error = 'Khong lay duoc ket qua';
      yield put({type: SUBMIT_PRIVATE_GENERAL_ERROR, error, response});
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: SUBMIT_PRIVATE_GENERAL_ERROR, error, response});
    }
  }
}

export function* watchSubmitPersonalPrivateGeneral() {
  yield takeEvery(SUBMIT_PRIVATE_GENERAL, SubmitPersonalPrivateGeneralFlow);
}

import {
  getPersonalList,
  getPersonalProfile,
} from './../../api/userInfo/PersonalListAPI';
import {
  GET_PRIVATE_ALLOW,
  GET_PRIVATE_ALLOW_ERROR,
  GET_PRIVATE_ALLOW_SUCCESS,
  GET_PRIVATE_PROFILE,
  GET_PRIVATE_PROFILE_ERROR,
  GET_PRIVATE_PROFILE_SUCCESS, 
  POPUP_POST_LOGIN_SHOW
} from '../../../actions/actionTypes';
import {call, put, takeEvery} from 'redux-saga/effects';

function* GetPersonalList(action) {
  try {
    // console.log('PersonalList Saga', action.data);
    const response = yield getPersonalList(action.data);
    // console.log('PersonalList Saga Response', response);
    if (response !== undefined) {
      console.log(response.code);
      if (response.code == 0) {
        // console.log('Get Data Success', response.dataItem);
        yield put({type: GET_PRIVATE_ALLOW_SUCCESS, response});
      } else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: {type: GET_PRIVATE_ALLOW, input: action.data},
        });
      } else {
        // console.log('Get Data Fail', response.dataItem);
        const error = response.message;
        yield put({type: GET_PRIVATE_ALLOW_ERROR, error, response});
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_ALLOW_ERROR, error, response});
    }
  } catch (error) {
    if (error === undefined) {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_ALLOW_ERROR, error, response});
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_ALLOW_ERROR, error, response});
    }
  }
}

function* GetPersonalProfile(action) {
  try {
    // console.log('Personalprofile Saga', action.data);
    const response = yield getPersonalProfile(action.data);
    // console.log('Personalprofile Saga Response', response);
    if (response !== undefined) {
      console.log(response.code);
      if (response.code == 0) {
        // console.log('Get Data Success', response.dataItem);
        yield put({type: GET_PRIVATE_PROFILE_SUCCESS, response});
      } else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: {type: GET_PRIVATE_PROFILE, input: action.data},
        });
      } 
      else {
        // console.log('Get Data Fail', response.dataItem);
        const error = response.message;
        yield put({type: GET_PRIVATE_PROFILE_ERROR, error, response});
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_PROFILE_ERROR, error, response});
    }
  } catch (error) {
    if (error === undefined) {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_PROFILE_ERROR, error, response});
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({type: GET_PRIVATE_PROFILE_ERROR, error, response});
    }
  }
}
export function* watchGetPersonalProfile() {
  yield takeEvery(GET_PRIVATE_PROFILE, GetPersonalProfile);
}

export function* watchGetPersonalList() {
  yield takeEvery(GET_PRIVATE_ALLOW, GetPersonalList);
}

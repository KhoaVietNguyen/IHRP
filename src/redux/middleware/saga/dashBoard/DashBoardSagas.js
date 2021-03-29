import {
  GET_DASH_BOARD_APPROVAL,
  GET_DASH_BOARD_APPROVAL_ERROR,
  GET_DASH_BOARD_APPROVAL_SUCCESS,
  GET_DASH_BOARD_CURRENT_SHIFT,
  GET_DASH_BOARD_CURRENT_SHIFT_ERROR,
  GET_DASH_BOARD_CURRENT_SHIFT_SUCCESS,
  GET_DASH_BOARD_LEAVE_INFO,
  GET_DASH_BOARD_LEAVE_INFO_ERROR,
  GET_DASH_BOARD_LEAVE_INFO_SUCCESS,
  GET_DASH_BOARD_NEXT_SHIFT,
  GET_DASH_BOARD_NEXT_SHIFT_ERROR,
  GET_DASH_BOARD_NEXT_SHIFT_SUCCESS,
  GET_DASH_BOARD_WORKING_HOUR,
  GET_DASH_BOARD_WORKING_HOUR_ERROR,
  GET_DASH_BOARD_WORKING_HOUR_SUCCESS,
  GET_DASH_BOARD_FORM,
  GET_DASH_BOARD_FORM_ERROR,
  GET_DASH_BOARD_FORM_SUCCESS,
} from '../../../actions/dashboard/DashBoardAction';
import { POPUP_POST_LOGIN_SHOW, POPUP_UPDATE_APP_SHOW } from '../../../actions/actionTypes'
import {
  getDashBoardView1Api,
  getDashBoardView2Api,
  getDashBoardFormApi,
} from '../../api/dashboard/dashBoardApi';
import { call, takeEvery, put } from 'redux-saga/effects';

function* DashBoardListSaga(action) {
  try {
    // console.log("data", action.data)
    let response;
    if (action.data != 10) {
      // console.log("View1")
      response = yield getDashBoardView1Api(action.data);
    } else {
      // console.log("View2")
      response = yield getDashBoardView2Api(action.data);
    }
    if (response !== undefined) {
      console.log(response.code);
      if (response.code === '0') {
        switch (action.data) {
          case 3: {
            yield put({ type: GET_DASH_BOARD_APPROVAL_SUCCESS, response });
            break;
          }
          case 7: {
            yield put({ type: GET_DASH_BOARD_CURRENT_SHIFT_SUCCESS, response });
            break;
          }
          case 8: {
            yield put({ type: GET_DASH_BOARD_NEXT_SHIFT_SUCCESS, response });
            break;
          }
          case 9: {
            yield put({ type: GET_DASH_BOARD_WORKING_HOUR_SUCCESS, response });
            break;
          }
          case 10: {
            yield put({ type: GET_DASH_BOARD_LEAVE_INFO_SUCCESS, response });
            break;
          }
        }
      } else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: { type: SUBMIT_PRIVATE_GENERAL, input: action.data },
        });
        switch (action.data) {
          case 3: {
            // yield put({type: GET_DASH_BOARD_APPROVAL_SUCCESS, response});
            yield put({
              type: POPUP_POST_LOGIN_SHOW,
              action: { type: GET_DASH_BOARD_APPROVAL, input: action.data },
            });
            break;
          }
          case 7: {
            // yield put({type: GET_DASH_BOARD_CURRENT_SHIFT_SUCCESS, response});
            yield put({
              type: POPUP_POST_LOGIN_SHOW,
              action: { type: GET_DASH_BOARD_CURRENT_SHIFT, input: action.data },
            });
            break;
          }
          case 8: {
            // yield put({type: GET_DASH_BOARD_NEXT_SHIFT_SUCCESS, response});
            yield put({
              type: POPUP_POST_LOGIN_SHOW,
              action: { type: GET_DASH_BOARD_NEXT_SHIFT, input: action.data },
            });
            break;
          }
          case 9: {
            // yield put({type: GET_DASH_BOARD_WORKING_HOUR, response});
            yield put({
              type: POPUP_POST_LOGIN_SHOW,
              action: { type: GET_DASH_BOARD_WORKING_HOUR, input: action.data },
            });
            break;
          }
          case 10: {
            // yield put({type: GET_DASH_BOARD_LEAVE_INFO_SUCCESS, response});
            yield put({
              type: POPUP_POST_LOGIN_SHOW,
              action: { type: GET_DASH_BOARD_LEAVE_INFO, input: action.data },
            });
            break;
          }
        }
      } else if (response.code === '4') {
        yield put({
          type: POPUP_UPDATE_APP_SHOW,
          message: response.message !== undefined ? response.message : ''
        });
      } else {
        // console.log('Get Data Fail', response.dataItem);
        const error = response.message;
        switch (action.data) {
          case 3: {
            yield put({ type: GET_DASH_BOARD_APPROVAL_ERROR, error, response });
            break;
          }
          case 7: {
            yield put({
              type: GET_DASH_BOARD_CURRENT_SHIFT_ERROR,
              error,
              response,
            });
            break;
          }
          case 8: {
            yield put({ type: GET_DASH_BOARD_NEXT_SHIFT_ERROR, error, response });
            break;
          }
          case 9: {
            yield put({
              type: GET_DASH_BOARD_WORKING_HOUR_ERROR,
              error,
              response,
            });
            break;
          }
          case 10: {
            yield put({ type: GET_DASH_BOARD_LEAVE_INFO_ERROR, error, response });
            break;
          }
        }
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      switch (action.data) {
        case 3: {
          yield put({ type: GET_DASH_BOARD_APPROVAL_ERROR, error, response });
          break;
        }
        case 7: {
          yield put({
            type: GET_DASH_BOARD_CURRENT_SHIFT_ERROR,
            error,
            response,
          });
          break;
        }
        case 8: {
          yield put({ type: GET_DASH_BOARD_NEXT_SHIFT_ERROR, error, response });
          break;
        }
        case 9: {
          yield put({
            type: GET_DASH_BOARD_WORKING_HOUR_ERROR,
            error,
            response,
          });
          break;
        }
        case 10: {
          yield put({ type: GET_DASH_BOARD_LEAVE_INFO_ERROR, error, response });
          break;
        }
      }
    }
  } catch (error) {
    if (error === undefined) {
      const error = 'Khong lay duoc ket qua';
      switch (action.data) {
        case 3: {
          yield put({ type: GET_DASH_BOARD_APPROVAL_ERROR, error, response });
          break;
        }
        case 7: {
          yield put({
            type: GET_DASH_BOARD_CURRENT_SHIFT_ERROR,
            error,
            response,
          });
          break;
        }
        case 8: {
          yield put({ type: GET_DASH_BOARD_NEXT_SHIFT_ERROR, error, response });
          break;
        }
        case 9: {
          yield put({
            type: GET_DASH_BOARD_WORKING_HOUR_ERROR,
            error,
            response,
          });
          break;
        }
        case 10: {
          yield put({ type: GET_DASH_BOARD_LEAVE_INFO_ERROR, error, response });
          break;
        }
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      switch (action.data) {
        case 3: {
          yield put({ type: GET_DASH_BOARD_APPROVAL_ERROR, error, response });
          break;
        }
        case 7: {
          yield put({
            type: GET_DASH_BOARD_CURRENT_SHIFT_ERROR,
            error,
            response,
          });
          break;
        }
        case 8: {
          yield put({ type: GET_DASH_BOARD_NEXT_SHIFT_ERROR, error, response });
          break;
        }
        case 9: {
          yield put({
            type: GET_DASH_BOARD_WORKING_HOUR_ERROR,
            error,
            response,
          });
          break;
        }
        case 10: {
          yield put({ type: GET_DASH_BOARD_LEAVE_INFO_ERROR, error, response });
          break;
        }
      }
    }
  }
}

export function* watchDashBoardListApproval() {
  yield takeEvery(GET_DASH_BOARD_APPROVAL, DashBoardListSaga);
}

export function* watchDashBoardListCurrentShift() {
  yield takeEvery(GET_DASH_BOARD_CURRENT_SHIFT, DashBoardListSaga);
}

export function* watchDashBoardListNextShift() {
  yield takeEvery(GET_DASH_BOARD_NEXT_SHIFT, DashBoardListSaga);
}

export function* watchDashBoardListWorkingHour() {
  yield takeEvery(GET_DASH_BOARD_WORKING_HOUR, DashBoardListSaga);
}

export function* watchDashBoardListLeaveInfo() {
  yield takeEvery(GET_DASH_BOARD_LEAVE_INFO, DashBoardListSaga);
}

function* GetDashBoardForm(action) {
  try {
    // console.log('PersonalList Saga', action.data);
    const response = yield getDashBoardFormApi(action.data);
    // console.log('PersonalList Saga Response', response);
    if (response !== undefined) {
      console.log(response.code);
      if (response.code === '0') {
        // console.log('Get Data Success', response.dataItem);
        yield put({ type: GET_DASH_BOARD_FORM_SUCCESS, response });
      } else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: { type: GET_DASH_BOARD_FORM, input: action.data },
        });
      } else if (response.code === '4') {
        yield put({
          type: POPUP_UPDATE_APP_SHOW,
          message: response.message !== undefined ? response.message : ''
        });
      } else {
        // console.log('Get Data Fail', response.dataItem);
        const error = response.message;
        yield put({ type: GET_DASH_BOARD_FORM_ERROR, error, response });
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({ type: GET_DASH_BOARD_FORM_ERROR, error, response });
    }
  } catch (error) {
    if (error === undefined) {
      const error = 'Khong lay duoc ket qua';
      yield put({ type: GET_DASH_BOARD_FORM_ERROR, error, response });
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({ type: GET_DASH_BOARD_FORM_ERROR, error, response });
    }
  }
}

export function* watchDashBoardForm() {
  yield takeEvery(GET_DASH_BOARD_FORM, GetDashBoardForm);
}

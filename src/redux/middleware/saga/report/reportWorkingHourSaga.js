import { reportWorkingHourApi } from './../../api/report/reportWorkingHourApi';
import {
  GET_REPORT_WORKING_HOUR,
  GET_REPORT_WORKING_HOUR_ERROR,
  GET_REPORT_WORKING_HOUR_SUCCESS,
} from '../../../actions/report/ReportAction';
import {
  POPUP_POST_LOGIN_SHOW,
  POPUP_UPDATE_APP_SHOW,
} from '../../../actions/actionTypes';
import { call, put, takeEvery } from 'redux-saga/effects';
function* reportWorkingHoursFlow(action) {
  try {
    // console.log("PersonalPrivateGENERAL Saga", action.data)
    const response = yield reportWorkingHourApi(action.data);
    // console.log("PersonalPrivateGENERAL Saga Response", response)
    if (response !== undefined) {
      // console.log(response.code)
      if (response.code == 0) {
        // console.log("Get Data Success", response.dataItem)
        yield put({ type: GET_REPORT_WORKING_HOUR_SUCCESS, response });
      } else if (response.code === '1') {
        yield put({
          type: POPUP_POST_LOGIN_SHOW,
          action: { type: GET_REPORT_WORKING_HOUR, input: action.data },
        });
      } else if (response.code === '4') {
        yield put({
          type: POPUP_UPDATE_APP_SHOW,
          message: response.message !== undefined ? response.message : ''
        });
      } else {
        // console.log("Get Data Fail", response.dataItem)
        const error = response.message;
        yield put({ type: GET_REPORT_WORKING_HOUR_ERROR, error, response });
      }
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({ type: GET_REPORT_WORKING_HOUR_ERROR, error, response });
    }
  } catch (error) {
    if (error === undefined) {
      const error = 'Khong lay duoc ket qua';
      yield put({ type: GET_REPORT_WORKING_HOUR_ERROR, error, response });
    } else {
      const error = 'Khong lay duoc ket qua';
      yield put({ type: GET_REPORT_WORKING_HOUR_ERROR, error, response });
    }
  }
}

export function* watchReportWorkingHour() {
  yield takeEvery(GET_REPORT_WORKING_HOUR, reportWorkingHoursFlow);
}

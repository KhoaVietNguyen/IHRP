import {
  NOTIFICATION,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_ERROR,
  NOTIFICATION_DETAIL,
  NOTIFICATION_DETAIL_ERROR,
  NOTIFICATION_DETAIL_SUCCESS,

  GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH,
  GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_SUCCESS,
  GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_ERROR,

  WAITING_LIST_FOR_APPROVAL,
  WAITING_LIST_FOR_APPROVAL_SUCCESS,
  WAITING_LIST_FOR_APPROVAL_ERROR,

  GET_HISTORY_OF_APPROVAL_MENU_LISTS,
  GET_HISTORY_OF_APPROVAL_MENU_LISTS_SUCCESS,
  GET_HISTORY_OF_APPROVAL_MENU_LISTS_ERROR,

  NOTIFICATION_MARK,
  NOTIFICATION_MARK_SUCCESS,
  NOTIFICATION_MARK_ERROR,

  WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH,
  WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_SUCCESS,
  WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_FAILED,
} from '../../actions/attendance'
import { POPUP_POST_LOGIN_SHOW, POPUP_UPDATE_APP_SHOW } from '../../actions/actionTypes'
import {
  notificationApi,
  getHistoryCalendarsCheckInOutInMonthApi,
  waitingListForApprovalApi,
  getHistoryOfApprovalMenuListApi,
  notificationDetailApi,
  notificationMarkApi,
  getWFHInfoCheckInOutInMonthApi,
} from '../api/attendanceApi'
import { takeEvery, put } from 'redux-saga/effects'
import { arrayIsEmpty, stringIsEmpty, objectIsNull } from '@dungdang/react-native-basic/src/Functions';
import { userProfile, errorConnectServer } from '../../../config/settings'

//------------------------Notification--------------------------------//

function* notificationMarkFlow(action) {
  try {
    const response = yield notificationMarkApi(action.input);
    if (response.code === '0') {
      const data = response.message;
      // console.warn('success saga', dataItem)
      yield put({
        type: NOTIFICATION_MARK_SUCCESS,
        data,
      });
    } else if (response.code === '1') {
      yield put({
        type: POPUP_POST_LOGIN_SHOW,
        action: { type: NOTIFICATION_MARK, input: action.input },
      });
    } else if (response.code === '4') {
      yield put({
        type: POPUP_UPDATE_APP_SHOW,
        message: response.message !== undefined ? response.message : ''
      });
    } else {
      const error = response.message;
      yield put({
        type: NOTIFICATION_MARK_ERROR,
        error: !stringIsEmpty(error) ? error : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en),
      });
    }
  } catch (error) {
    // console.log('errorCatchSagasAttendance: ', error)
    yield put({
      type: NOTIFICATION_MARK_ERROR,
      error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
    });
  }
}
export function* watchNotificationMark() {
  yield takeEvery(NOTIFICATION_MARK, notificationMarkFlow);
}

function* notificationFlow(action) {
  try {
    const response = yield notificationApi(action.input);
    if (response.code === '0') {
      const dataItem = response.dataItem;
      // console.warn('success saga', dataItem)
      yield put({
        type: NOTIFICATION_SUCCESS,
        dataItem,
      });
    } else if (response.code === '1') {
      yield put({
        type: POPUP_POST_LOGIN_SHOW,
        action: { type: NOTIFICATION, input: action.input },
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
        type: NOTIFICATION_ERROR,
        error,
      });
    }
  } catch (error) {
    // console.log('errorCatchSagasAttendance: ', error)
    yield put({
      type: NOTIFICATION_ERROR,
      error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
    });
  }
}
export function* notificationSaga() {
  yield takeEvery(NOTIFICATION, notificationFlow);
}

function* notificationDetailFlow(action) {
  try {
    const response = yield notificationDetailApi(action.input);
    console.log('responseNotificationDetail: ', response)
    if (response.code === '0') {
      const dataItem = response.dataItem;
      if (!arrayIsEmpty(dataItem)) {
        yield put({
          type: NOTIFICATION_DETAIL_SUCCESS,
          data: dataItem[0],
        });
      } else {
        yield put({
          type: NOTIFICATION_DETAIL_ERROR,
          error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData,
        });
      }
    } else if (response.code === '1') {
      yield put({
        type: POPUP_POST_LOGIN_SHOW,
        action: { type: NOTIFICATION_DETAIL, input: action.input },
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
        type: NOTIFICATION_DETAIL_ERROR,
        error: !stringIsEmpty(error) ? error : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en),
      });
    }
  } catch (error) {
    console.log('errorCatchSagasNotificationDetail: ', error)
    yield put({
      type: NOTIFICATION_DETAIL_ERROR,
      error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
    });
  }
}
export function* watchNotificationDetailSaga() {
  yield takeEvery(NOTIFICATION_DETAIL, notificationDetailFlow);
}


//------------------------Calendars--------------------------------//
function* getHistoryCalendarsCheckInOutInMonthFlow(action) {
  try {
    const response = yield getHistoryCalendarsCheckInOutInMonthApi(
      action.input,
    );
    if (response.code === '0') {
      const data = response.info;
      // console.log('getHistoryCalendarsCheckInOutInMonthFlow', data)
      yield put({
        type: GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_SUCCESS,
        data,
      });
    } else if (response.code === '1') {
      yield put({
        type: POPUP_POST_LOGIN_SHOW,
        action: { type: GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH, input: action.input },
      });
    } else if (response.code === '4') {
      yield put({
        type: POPUP_UPDATE_APP_SHOW,
        message: response.message !== undefined ? response.message : ''
      });
    } else {
      const error = response.message;
      yield put({
        type: GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_ERROR,
        error,
      });
    }
  } catch (error) {
    yield put({
      type: GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_ERROR,
      error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
    });
  }
}
export function* watchGetHistoryCalendarsCheckInOutInMonthSaga() {
  yield takeEvery(
    GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH,
    getHistoryCalendarsCheckInOutInMonthFlow,
  );
}

function* getWFHInfoCheckInOutInMonthFlow(action) {
  try {
    const response = yield getWFHInfoCheckInOutInMonthApi(action.input)
    console.warn('responseGetWFHInfoCheckInOutInMonth: ', response)
    if (response !== undefined) {
      if (response.code === '0') {
        yield put({ type: WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_SUCCESS, data: response.info })
      } else if (response.code === '1') {
        yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH, input: action.input } })
      } else if (response.code === '4') {
        yield put({
          type: POPUP_UPDATE_APP_SHOW,
          message: response.message !== undefined ? response.message : ''
        });
      } else {
        let message = response.message
        yield put({
          type: WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_FAILED,
          error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
        })
      }
    } else {
      yield put({ type: WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }

  } catch (error) {
    console.log('errorCatchSagasGetWFHInfoCheckInOutInDay: ', error)
    yield put({ type: WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
  }
}

export function* watchGetWFHInfoCheckInOutInMonth() {
  yield takeEvery(WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH, getWFHInfoCheckInOutInMonthFlow);
}

//------------------------ApproveApplication--------------------------------//
function* waitingListForApprovalFlow(action) {
  try {
    const response = yield waitingListForApprovalApi(
      action.input,
    );
    // console.log('response waitingListForApprovalFlow', response)
    if (response.code === '0') {
      const data = response.info
      // console.log('data waitingListForApprovalFlow', data)
      yield put({
        type: WAITING_LIST_FOR_APPROVAL_SUCCESS,
        data,
      });
    } else if (response.code === '1') {
      yield put({
        type: POPUP_POST_LOGIN_SHOW,
        action: { type: WAITING_LIST_FOR_APPROVAL, input: action.input },
      });
    } else if (response.code === '4') {
      yield put({
        type: POPUP_UPDATE_APP_SHOW,
        message: response.message !== undefined ? response.message : ''
      });
    } else {
      const error = response.message
      // console.log('error waitingListForApprovalFlow', error)
      yield put({
        type: WAITING_LIST_FOR_APPROVAL_ERROR,
        error,
      });
    }
  } catch (error) {
    // console.log('error waitingListForApprovalFlow 2222', error)
    yield put({
      type: WAITING_LIST_FOR_APPROVAL_ERROR,
      error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
    });
  }
}
export function* waitingListForApprovalSaga() {
  yield takeEvery(
    WAITING_LIST_FOR_APPROVAL,
    waitingListForApprovalFlow,
  );
}

function* getHistoryOfApprovalMenuListFlow(action) {
  try {
    const response = yield getHistoryOfApprovalMenuListApi(
      action.input,
    );
    // console.log('response getHistoryOfApprovalMenuListFlow', response)
    if (response.code === '0') {
      const data = response.info
      // console.log('data getHistoryOfApprovalMenuListFlow', data)
      yield put({
        type: GET_HISTORY_OF_APPROVAL_MENU_LISTS_SUCCESS,
        data,
      });
    } else if (response.code === '1') {
      yield put({
        type: POPUP_POST_LOGIN_SHOW,
        action: { type: GET_HISTORY_OF_APPROVAL_MENU_LISTS, input: action.input },
      });
    } else if (response.code === '4') {
      yield put({
        type: POPUP_UPDATE_APP_SHOW,
        message: response.message !== undefined ? response.message : ''
      });
    } else {
      const error = response.message
      // console.log('error getHistoryOfApprovalMenuListFlow', error)
      yield put({
        type: GET_HISTORY_OF_APPROVAL_MENU_LISTS_ERROR,
        error,
      });
    }
  } catch (error) {
    // console.log('error getHistoryOfApprovalMenuListFlow 2222', error)
    yield put({
      type: GET_HISTORY_OF_APPROVAL_MENU_LISTS_ERROR,
      error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
    });
  }
}
export function* watchHistoryOfApprovalMenuListSaga() {
  yield takeEvery(
    GET_HISTORY_OF_APPROVAL_MENU_LISTS,
    getHistoryOfApprovalMenuListFlow,
  );
}

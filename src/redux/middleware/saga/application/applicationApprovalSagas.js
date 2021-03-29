import {
    APPLICATION_APPROVAL_ACTION,
    APPLICATION_APPROVAL_ACTION_FAILED,
    APPLICATION_APPROVAL_ACTION_SUCCESS,
    RESET_APPLICATION_APPROVAL_ACTION,

    GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION,
    GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION_ERROR,
    GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION_SUCCESS,


} from '../../../actions/application/applicationApprovalActions';
import {
    POPUP_POST_LOGIN_SHOW,
    POPUP_UPDATE_APP_SHOW,

} from '../../../actions/actionTypes';

import { applicationApprovalApi, getListCheckInOutGPSApplication, } from '../../api/applicationApprovalApi'
import { errorConnectServer, userProfile } from '../../../../config/settings';

import { call, takeEvery, put } from 'redux-saga/effects';
import {
    objectIsNull,
    arrayIsEmpty,
    stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';


function* getListCheckInOutGPSApplicationFlow(action) {
    try {
        const response = yield getListCheckInOutGPSApplication(action.input);
        console.log('response -  applicationApprovalApi: ', response);
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({
                    type: GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION_SUCCESS,
                    data: response.message,
                });
            } else {
                let message = response.message;
                yield put({
                    type: GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION_ERROR,
                    error: message !== undefined ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en),
                });
            }
        } else if (response.code === '1') {
            yield put({
                type: POPUP_POST_LOGIN_SHOW,
                action: { type: GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION, input: action.input },
            });
        } else if (response.code === '4') {
            yield put({
                type: POPUP_UPDATE_APP_SHOW,
                message: response.message !== undefined ? response.message : ''
            });
        } else {
            yield put({
                type: GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION_ERROR,
                error:
                    userProfile.LangID === 'VN'
                        ? errorConnectServer.vn
                        : errorConnectServer.en,
            });
        }
    } catch (error) {
        console.log('catch - getListCheckInOutGPSApplicationFlow - error : ', error);
        yield put({
            type: GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION_ERROR,
            error:
                userProfile.LangID === 'VN'
                    ? errorConnectServer.vn
                    : errorConnectServer.en,
        });
    }
}

export function* watchGetListCheckInOutGPSApplication() {
    yield takeEvery(GET_LIST_CHECK_INOUT_GPS_APPLICATION_ACTION, getListCheckInOutGPSApplicationFlow);
}

//
function* applicationApprovalFlow(action) {
    try {
        // console.log('startApplicationApproval: ', action.input)
        const response = yield applicationApprovalApi(action.input);
        // console.log('responseApplicationApproval 111: ', response);
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({
                    type: APPLICATION_APPROVAL_ACTION_SUCCESS,
                    data: response.message,
                });
            } else {
                let message = response.message;
                yield put({
                    type: APPLICATION_APPROVAL_ACTION_FAILED,
                    error: message !== undefined ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en),
                });
            }
        } else if (response.code === '1') {
            yield put({
                type: POPUP_POST_LOGIN_SHOW,
                action: { type: APPLICATION_APPROVAL_ACTION, input: action.input },
            });
        } else if (response.code === '4') {
            yield put({
                type: POPUP_UPDATE_APP_SHOW,
                message: response.message !== undefined ? response.message : ''
            });
        } else {
            yield put({
                type: APPLICATION_APPROVAL_ACTION_FAILED,
                error:
                    userProfile.LangID === 'VN'
                        ? errorConnectServer.vn
                        : errorConnectServer.en,
            });
        }
    } catch (error) {
        console.log('errorCatchSagasApplicationApprovalFlow: ', error);
        yield put({
            type: APPLICATION_APPROVAL_ACTION_FAILED,
            error:
                userProfile.LangID === 'VN'
                    ? errorConnectServer.vn
                    : errorConnectServer.en,
        });
    }
}

export function* watchApplicationApproval() {
    yield takeEvery(APPLICATION_APPROVAL_ACTION, applicationApprovalFlow);
}


function* resetApplicationApprovalFlow() {
    try {
        // yield put({ type: RESET_APPLICATION_APPROVAL_ACTION })
    } catch (error) {
        console.log('errorCatchSagasResetApplicationApprovalFlow: ', error);
        // yield put({ type: RESET_APPLICATION_APPROVAL_ACTION })
    }
}

export function* watchResetApplicationApproval() {
    yield takeEvery(RESET_APPLICATION_APPROVAL_ACTION, resetApplicationApprovalFlow);
}

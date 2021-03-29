import {
    DELETE_TOKEN_NOTI_ACTION,
    DELETE_TOKEN_NOTI_ACTION_SUCCESS,
    DELETE_TOKEN_NOTI_ACTION_FAILED,

} from '../../actions/actionTypes';
import { errorConnectServer, userProfile } from '../../../config/settings';

import { call, takeEvery, put } from 'redux-saga/effects';

import { deleteTokenNotiApi } from '../api/configApi';
import { stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
function* deleteTokenNotiFlow() {
    try {
        const response = yield deleteTokenNotiApi();
        console.log('response - deleteTokenNoti: ', response);
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: DELETE_TOKEN_NOTI_ACTION_SUCCESS, data: response.message });
                // } else if (!response.code) {
                //     yield put({ type: DELETE_TOKEN_NOTI_ACTION_FAILED, error: response.message });
                // } else if (response.code === '4') {
                //     yield put({
                //         type: POPUP_UPDATE_APP_SHOW,
                //         message: response.message !== undefined ? response.message : ''
                //     });
            } else {
                yield put({
                    type: DELETE_TOKEN_NOTI_ACTION_FAILED,
                    error: response.message !== undefined ? response.message :
                        userProfile.LangID === 'VN'
                            ? errorConnectServer.vn
                            : errorConnectServer.en,
                });
            }
        } else {
            yield put({
                type: DELETE_TOKEN_NOTI_ACTION_FAILED,
                error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
            });
        }
    } catch (error) {
        console.log('errorCatchSagasDeleteTokenNoti: ', error);
        yield put({
            type: DELETE_TOKEN_NOTI_ACTION_FAILED,
            error:
                userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en,
        });
    }
}

export function* watchDeleteTokenNoti() {
    yield takeEvery(DELETE_TOKEN_NOTI_ACTION, deleteTokenNotiFlow);
}


//MinhNC15

import { GET_APP, GET_APP_SUCCESS, GET_APP_ERROR } from '../../../actions/getApp/GetAppActions';

import { errorConnectServer, userProfile } from '../../../../config/settings'

import { call, takeEvery, put } from 'redux-saga/effects';

import { postGetApp } from '../../api/getApp/GetAppApi'

import { POPUP_UPDATE_APP_SHOW } from '../../../actions/actionTypes'

function* getAppFlow(action) {

    try {
        const response = yield postGetApp(action.data)
        
        if (response !== undefined) {
            console.log("[DEBUG-GetAppSagas-response---]", response.code)
            console.log("[DEBUG-GetAppSagas-response - codeeeeê  ---]", response.commit)
            if (response.commit) {
                if (response.code === '4') {
                    yield put({
                        type: POPUP_UPDATE_APP_SHOW,
                        message: response.message !== undefined ? response.message : ''
                    });
                } else {
                    yield put({ type: GET_APP_SUCCESS, response })
                }
                // console.log('[DEBUG-getAppSagas-GET-APP-SUCCESS-commit----]', response.commit)
            } else if (!response.commit) {
                yield put({ type: GET_APP_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
                // console.log('[DEBUG-getAppSagas-GET-APP-ERROR111-commit----]', response.commit)
            } else {
                yield put({ type: GET_APP_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
                // console.log('[DEBUG-getAppSagas-GET-APP-ERROR222-commit----]', response.commit)
            }
        } else {
            yield put({ type: GET_APP_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
            // console.log('[DEBUG-getAppSagas-GET-APP-ERROR333----]')
        }

    } catch (error) {
        // console.log('errorCatchSagasGetApp: ', error)
        yield put({ type: GET_APP_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        // console.log('[DEBUG-getAppSagas-GET-APP-ERROR444----]')
    }
}

export function* watchGetApp() {
    yield takeEvery(GET_APP, getAppFlow);
}
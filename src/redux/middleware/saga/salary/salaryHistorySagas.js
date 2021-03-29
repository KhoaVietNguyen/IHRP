// MinhNC15

import { getSalaryHistoryApi } from '../../api/salary/salaryHistoryApi'
import { GET_SALARYHISTORY, GET_SALARYHISTORY_SUCCESS, GET_SALARYHISTORY_ERROR } from '../../../actions/salary/salaryHistoryAction'
import { call, takeEvery, put } from 'redux-saga/effects'
import { userProfile, errorConnectServer } from '../../../../config/settings'
import { arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { POPUP_POST_LOGIN_SHOW, POPUP_UPDATE_APP_SHOW } from '../../../actions/actionTypes'


function* getSalaryHistoryFlow(action) {

    try {
        const response = yield getSalaryHistoryApi(action.data)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_SALARYHISTORY_SUCCESS, data: response.dataItem })
                } else {
                    yield put({ type: GET_SALARYHISTORY_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData })
                }
            } else if (!response.code) {
                yield put({ type: GET_SALARYHISTORY_ERROR, error: response.message })
            } else if (response.code === '1') {
                yield put({
                    type: POPUP_POST_LOGIN_SHOW,
                    action: { type: GET_SALARYHISTORY, input: action.data },
                });
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            }
            else {
                yield put({ type: GET_SALARYHISTORY_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
            }
        } else {
            yield put({ type: GET_SALARYHISTORY_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasSalaryHistory: ', error)
        yield put({ type: GET_SALARYHISTORY_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSalaryHistory() {
    yield takeEvery(GET_SALARYHISTORY, getSalaryHistoryFlow);
}
// MinhNC15

import { getPayslipApi } from '../../api/salary/payslipApi'
import { GET_PAYSLIP, GET_PAYSLIP_SUCCESS, GET_PAYSLIP_ERROR } from '../../../actions/salary/payslipAction'
import { call, takeEvery, put } from 'redux-saga/effects'
import { userProfile, errorConnectServer } from '../../../../config/settings'
import { arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { POPUP_POST_LOGIN_SHOW, POPUP_UPDATE_APP_SHOW, } from '../../../actions/actionTypes'

function* getPayslipFlow() {

    try {
        const response = yield getPayslipApi()
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_PAYSLIP_SUCCESS, data: response.dataItem })
                } else {
                    yield put({ type: GET_PAYSLIP_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData })
                }
            } else if (!response.code) {
                yield put({ type: GET_PAYSLIP_ERROR, error: response.message })
            } else if (response.code === '1') {
                yield put({
                    type: POPUP_POST_LOGIN_SHOW,
                    action: { type: GET_PAYSLIP, input: undefined },
                });
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            }
            else {
                yield put({ type: GET_PAYSLIP_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
            }
        } else {
            yield put({ type: GET_PAYSLIP_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasPayslip: ', error)
        yield put({ type: GET_PAYSLIP_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchPayslip() {
    yield takeEvery(GET_PAYSLIP, getPayslipFlow);
}
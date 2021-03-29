// MinhNC15

import { getPayslipViewApi } from '../../api/salary/payslipViewApi'
import { GET_PAYSLIPVIEW, GET_PAYSLIPVIEW_SUCCESS, GET_PAYSLIPVIEW_ERROR } from '../../../actions/salary/payslipViewAction'
import { call, takeEvery, put } from 'redux-saga/effects'
import { userProfile, errorConnectServer } from '../../../../config/settings'
import { arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { POPUP_POST_LOGIN_SHOW } from '../../../actions/actionTypes'


function* getPayslipViewFlow(action) {

    try {
        const response = yield getPayslipViewApi(action.data)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_PAYSLIPVIEW_SUCCESS, data: response.dataItem })
                } else {
                    yield put({ type: GET_PAYSLIPVIEW_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData })
                }
            } else if (!response.code) {
                yield put({ type: GET_PAYSLIPVIEW_ERROR, error: response.message })
            } else if (response.code === '1') {
                yield put({
                    type: POPUP_POST_LOGIN_SHOW,
                    action: { type: GET_PAYSLIPVIEW, input: action.data },
                });
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            }
            else {
                yield put({ type: GET_PAYSLIPVIEW_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
            }
        } else {
            yield put({ type: GET_PAYSLIPVIEW_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasPayslipView: ', error)
        yield put({ type: GET_PAYSLIPVIEW_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchPayslipView() {
    yield takeEvery(GET_PAYSLIPVIEW, getPayslipViewFlow);
}
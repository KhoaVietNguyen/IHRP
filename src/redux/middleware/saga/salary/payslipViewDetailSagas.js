// MinhNC15

import { getPayslipViewDetailApi } from '../../api/salary/payslipViewDetailApi'
import { GET_PAYSLIPVIEW_DETAIL, GET_PAYSLIPVIEW_DETAIL_SUCCESS, GET_PAYSLIPVIEW_DETAIL_ERROR } from '../../../actions/salary/payslipViewDetailAction'
import { call, takeEvery, put } from 'redux-saga/effects'
import { userProfile, errorConnectServer } from '../../../../config/settings'
import { arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { POPUP_POST_LOGIN_SHOW, POPUP_UPDATE_APP_SHOW } from '../../../actions/actionTypes'


function* getPayslipViewDetailFlow(action) {

    try {
        const response = yield getPayslipViewDetailApi(action.data)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_PAYSLIPVIEW_DETAIL_SUCCESS, data: response.dataItem })
                } else {
                    yield put({ type: GET_PAYSLIPVIEW_DETAIL_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData })
                }
            } else if (!response.code) {
                yield put({ type: GET_PAYSLIPVIEW_DETAIL_ERROR, error: response.message })
            } else if (response.code === '1') {
                yield put({
                    type: POPUP_POST_LOGIN_SHOW,
                    action: { type: GET_PAYSLIPVIEW_DETAIL, input: action.data },
                });
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            }
            else {
                yield put({ type: GET_PAYSLIPVIEW_DETAIL_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
            }
        } else {
            yield put({ type: GET_PAYSLIPVIEW_DETAIL_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasPayslipView: ', error)
        yield put({ type: GET_PAYSLIPVIEW_DETAIL_ERROR, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchPayslipViewDetail() {
    yield takeEvery(GET_PAYSLIPVIEW_DETAIL, getPayslipViewDetailFlow);
}
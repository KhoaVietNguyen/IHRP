import {

    //Attach File Application
    ATTACH_FILE_APPLICATION,
    ATTACH_FILE_APPLICATION_FAILED,
    ATTACH_FILE_APPLICATION_SUCCESS,

    WORKFLOW_DOWNLOAD_FILE,
    WORKFLOW_DOWNLOAD_FILE_FAILED,
    WORKFLOW_DOWNLOAD_FILE_SUCCESS,


    // Leave Application
    GET_TYPES_LEAVE_APPLICATION_SUCCESS,
    GET_TYPES_LEAVE_APPLICATION_FAILED,
    GET_TYPES_LEAVE_APPLICATION,

    GET_LIST_STATUS_APPLICATION,
    GET_LIST_STATUS_APPLICATION_FAILED,
    GET_LIST_STATUS_APPLICATION_SUCCESS,

    GET_SUBSTITUTE,
    GET_SUBSTITUTE_FAILED,
    GET_SUBSTITUTE_SUCCESS,
    CALCULATE_APPLICATION,
    CALCULATE_APPLICATION_FAILED,
    CALCULATE_APPLICATION_SUCCESS,

    GET_TIMES_LEAVE_APPLICATION,
    GET_TIMES_LEAVE_APPLICATION_FAILED,
    GET_TIMES_LEAVE_APPLICATION_SUCCESS,

    GET_DAYS_LEAVE_APPLICATION,
    GET_DAYS_LEAVE_APPLICATION_FAILED,
    GET_DAYS_LEAVE_APPLICATION_SUCCESS,

    SAVE_DAYS_LEAVE_APPLICATION,
    SAVE_DAYS_LEAVE_APPLICATION_FAILED,
    SAVE_DAYS_LEAVE_APPLICATION_SUCCESS,
    RESET_SAVE_DAYS_LEAVE_APPLICATION,

    CREATE_LEAVE_APPLICATION,
    CREATE_LEAVE_APPLICATION_FAILED,
    CREATE_LEAVE_APPLICATION_SUCCESS,

    SEARCH_LEAVE_APPLICATION,
    SEARCH_LEAVE_APPLICATION_FAILED,
    SEARCH_LEAVE_APPLICATION_SUCCESS,

    GET_DETAIL_LEAVE_APPLICATION,
    GET_DETAIL_LEAVE_APPLICATION_FAILED,
    GET_DETAIL_LEAVE_APPLICATION_SUCCESS,
    RESET_GET_DETAIL_LEAVE_APPLICATION,

    UPDATE_LEAVE_APPLICATION,
    UPDATE_LEAVE_APPLICATION_FAILED,
    UPDATE_LEAVE_APPLICATION_SUCCESS,

    DELETE_LEAVE_APPLICATION,
    DELETE_LEAVE_APPLICATION_FAILED,
    DELETE_LEAVE_APPLICATION_SUCCESS,

    SEARCH_APPROVED_LEAVE_APPLICATION,
    SEARCH_APPROVED_LEAVE_APPLICATION_FAILED,
    SEARCH_APPROVED_LEAVE_APPLICATION_SUCCESS,

    // Business Trip Application

    GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION,
    GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_FAILED,
    GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_SUCCESS,

    GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION,
    GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_FAILED,
    GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_SUCCESS,

    GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION,
    GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_FAILED,
    GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_SUCCESS,

    CALCULATE_BUSINESS_TRIP_APPLICATION,
    CALCULATE_BUSINESS_TRIP_APPLICATION_FAILED,
    CALCULATE_BUSINESS_TRIP_APPLICATION_SUCCESS,

    SAVE_BUSINESS_TRIP_APPLICATION,
    SAVE_BUSINESS_TRIP_APPLICATION_FAILED,
    SAVE_BUSINESS_TRIP_APPLICATION_SUCCESS,

    SEARCH_BUSINESS_TRIP_APPLICATION,
    SEARCH_BUSINESS_TRIP_APPLICATION_FAILED,
    SEARCH_BUSINESS_TRIP_APPLICATION_SUCCESS,

    SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION,
    SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_FAILED,
    SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_SUCCESS,

    GET_DETAIL_BUSINESS_TRIP_APPLICATION,
    GET_DETAIL_BUSINESS_TRIP_APPLICATION_FAILED,
    GET_DETAIL_BUSINESS_TRIP_APPLICATION_SUCCESS,
    RESET_GET_DETAIL_BUSINESS_TRIP_APPLICATION,

    WITH_DRAW_BUSINESS_TRIP_APPLICATION,
    WITH_DRAW_BUSINESS_TRIP_APPLICATION_FAILED,
    WITH_DRAW_BUSINESS_TRIP_APPLICATION_SUCCESS,

    DELETE_BUSINESS_TRIP_APPLICATION,
    DELETE_BUSINESS_TRIP_APPLICATION_FAILED,
    DELETE_BUSINESS_TRIP_APPLICATION_SUCCESS,
    // Over Time Application

    GET_DATE_INFO_OVERTIME_APPLICATION,
    GET_DATE_INFO_OVERTIME_APPLICATION_SUCCESS,
    GET_DATE_INFO_OVERTIME_APPLICATION_FAILED,

    GET_APPROVER_OVERTIME_APPLICATION,
    GET_APPROVER_OVERTIME_APPLICATION_FAILED,
    GET_APPROVER_OVERTIME_APPLICATION_SUCCESS,

    CALCULATE_OVERTIME_APPLICATION,
    CALCULATE_OVERTIME_APPLICATION_FAILED,
    CALCULATE_OVERTIME_APPLICATION_SUCCESS,

    SAVE_OVERTIME_APPLICATION,
    SAVE_OVERTIME_APPLICATION_FAILED,
    SAVE_OVERTIME_APPLICATION_SUCCESS,

    SEARCH_OVERTIME_APPLICATION,
    SEARCH_OVERTIME_APPLICATION_FAILED,
    SEARCH_OVERTIME_APPLICATION_SUCCESS,

    SEARCH_APPROVED_OVERTIME_APPLICATION,
    SEARCH_APPROVED_OVERTIME_APPLICATION_FAILED,
    SEARCH_APPROVED_OVERTIME_APPLICATION_SUCCESS,

    GET_LIST_STATUS_OVERTIME_APPLICATION,
    GET_LIST_STATUS_OVERTIME_APPLICATION_FAILED,
    GET_LIST_STATUS_OVERTIME_APPLICATION_SUCCESS,

    GET_DETAIL_OVERTIME_APPLICATION,
    GET_DETAIL_OVERTIME_APPLICATION_FAILED,
    GET_DETAIL_OVERTIME_APPLICATION_SUCCESS,
    RESET_GET_DETAIL_OVERTIME_APPLICATION,

    WITH_DRAW_OVERTIME_APPLICATION,
    WITH_DRAW_OVERTIME_APPLICATION_FAILED,
    WITH_DRAW_OVERTIME_APPLICATION_SUCCESS,

    DELETE_OVERTIME_APPLICATION,
    DELETE_OVERTIME_APPLICATION_FAILED,
    DELETE_OVERTIME_APPLICATION_SUCCESS,

    // Log TMS Application

    GET_ADJUSTMENT_STATUS_LOG_TMS,
    GET_ADJUSTMENT_STATUS_LOG_TMS_FAILED,
    GET_ADJUSTMENT_STATUS_LOG_TMS_SUCCESS,

    GET_APPROVAL_STATUS_LOG_TMS,
    GET_APPROVAL_STATUS_LOG_TMS_FAILED,
    GET_APPROVAL_STATUS_LOG_TMS_SUCCESS,

    GET_FINGER_PRINT_RECORD_LOG_TMS,
    GET_FINGER_PRINT_RECORD_LOG_TMS_FAILED,
    GET_FINGER_PRINT_RECORD_LOG_TMS_SUCCESS,

    GET_DETAIL_LOG_TMS_APPLICATION,
    GET_DETAIL_LOG_TMS_APPLICATION_FAILED,
    GET_DETAIL_LOG_TMS_APPLICATION_SUCCESS,
    RESET_GET_DETAIL_LOG_TMS_APPLICATION,

    GET_LOG_TYPE_LOG_TMS_APPLICATION,
    GET_LOG_TYPE_LOG_TMS_APPLICATION_FAILED,
    GET_LOG_TYPE_LOG_TMS_APPLICATION_SUCCESS,

    SEARCH_LOG_TMS_APPLICATION,
    SEARCH_LOG_TMS_APPLICATION_FAILED,
    SEARCH_LOG_TMS_APPLICATION_SUCCESS,

    SEARCH_APPROVED_LOG_TMS_APPLICATION,
    SEARCH_APPROVED_LOG_TMS_APPLICATION_FAILED,
    SEARCH_APPROVED_LOG_TMS_APPLICATION_SUCCESS,

    WITH_DRAW_LOG_TMS_APPLICATION,
    WITH_DRAW_LOG_TMS_APPLICATION_FAILED,
    WITH_DRAW_LOG_TMS_APPLICATION_SUCCESS,

    DELETE_LOG_TMS_APPLICATION,
    DELETE_LOG_TMS_APPLICATION_FAILED,
    DELETE_LOG_TMS_APPLICATION_SUCCESS,

    SAVE_LOG_TMS_APPLICATION,
    SAVE_LOG_TMS_APPLICATION_FAILED,
    SAVE_LOG_TMS_APPLICATION_SUCCESS,

} from '../../../actions/application/applicationActions';
import { errorConnectServer, userProfile } from '../../../../config/settings'
import { POPUP_POST_LOGIN_SHOW, POPUP_UPDATE_APP_SHOW, } from '../../../actions/actionTypes'
import { call, takeEvery, put } from 'redux-saga/effects';

import {
    // Attach File

    attachFileApplicationApi,
    workflowDowloadFileApi,

    // Leave Application
    getWorkflow1ListApi,
    calculateApplicationApi,
    getTimesLeaveApplicationApi,
    getDaysLeaveApplicationApi,
    saveDaysLeaveApplicationApi,
    createLeaveApplicationApi,
    searchLeaveApplicationApi,
    getDetailLeaveApplicationApi,
    updateLeaveApplicationApi,
    deleteLeaveApplicationApi,
    searchApprovedLeaveApplicationApi,

    // Business Trip Application

    getWF4ListBusinessTripApi,
    calculateBusinessTripApi,
    saveBusinessTripApi,
    searchBusinessTripApi,
    getDetailBusinessTripApplicationApi,
    withDrawBusinessTripApplicationApi,
    deleteBusinessTripApplicationApi,
    searchApprovedBusinessTripApi,

    // Over Time Application
    getDateInfoOverTimeApplicationApi,
    getApproverOverTimeApplicationApi,
    calculateOverTimeApplicationApi,
    saveOverTimeApplicationApi,
    searchOverTimeApplicationApi,
    getWorkflow2ListApi,
    getDetailOverTimeApplicationApi,
    withDrawOverTimeApplicationApi,
    deleteOverTimeApplicationApi,
    searchApprovedOverTimeApplicationApi,

    // Log TMS Application
    getWorkflow3ListApi,
    searchLogTMSApplicationApi,
    getDetailLogTMSApplicationApi,
    withDrawLogTMSApplicationApi,
    deleteLogTMSApplicationApi,
    saveLogTMSApplicationApi,
    searchApprovedLogTMSApplicationApi,

} from '../../api/applicationApi'

import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'

// ---------> Attach File

function* AttachFileApplicationFlow(action) {
    try {
        const response = yield attachFileApplicationApi(action.input)
        console.log('responseAttachFileApplication : ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: ATTACH_FILE_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: ATTACH_FILE_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: ATTACH_FILE_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: ATTACH_FILE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasGetTypesLeaveApplication: ', error)
        yield put({ type: ATTACH_FILE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}


export function* watchAttachFileApplication() {
    yield takeEvery(ATTACH_FILE_APPLICATION, AttachFileApplicationFlow);
}



function* workflowDownloadFileFlow(action) {
    try {
        const response = yield workflowDowloadFileApi(action.input)
        console.log('responseWorkflowDownloadFile : ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: WORKFLOW_DOWNLOAD_FILE_SUCCESS, data: response.dataItem[0] })
                } else {
                    yield put({ type: WORKFLOW_DOWNLOAD_FILE_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: WORKFLOW_DOWNLOAD_FILE, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: WORKFLOW_DOWNLOAD_FILE_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: WORKFLOW_DOWNLOAD_FILE_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasWorkflowDownloadFile: ', error)
        yield put({ type: WORKFLOW_DOWNLOAD_FILE_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}


export function* watchWorkflowDownloadApplication() {
    yield takeEvery(WORKFLOW_DOWNLOAD_FILE, workflowDownloadFileFlow);
}

// ---------> Leave Application
function* getTypesLeaveApplicationFlow() {
    try {
        const response = yield getWorkflow1ListApi('1', "")
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: GET_TYPES_LEAVE_APPLICATION_SUCCESS, data: response.dataItem })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_TYPES_LEAVE_APPLICATION, input: undefined } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_TYPES_LEAVE_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_TYPES_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasGetTypesLeaveApplication: ', error)
        yield put({ type: GET_TYPES_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchTypesLeaveApplication() {
    yield takeEvery(GET_TYPES_LEAVE_APPLICATION, getTypesLeaveApplicationFlow);
}

function* getListStatusApplicationFlow() {
    try {
        const response = yield getWorkflow1ListApi('3', "")
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: GET_LIST_STATUS_APPLICATION_SUCCESS, data: response.dataItem })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_LIST_STATUS_APPLICATION, input: undefined } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_LIST_STATUS_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_LIST_STATUS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasGetListStatusApplication: ', error)
        yield put({ type: GET_LIST_STATUS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetListStatusApplication() {
    yield takeEvery(GET_LIST_STATUS_APPLICATION, getListStatusApplicationFlow);
}

function* getSubstituteFlow(action) {
    try {
        const response = yield getWorkflow1ListApi('2', action.input)
        console.log('response - getWorkflow1ListApi: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: GET_SUBSTITUTE_SUCCESS, data: response.dataItem })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_SUBSTITUTE, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_SUBSTITUTE_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_SUBSTITUTE_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasGetSubstitute: ', error)
        yield put({ type: GET_SUBSTITUTE_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSubstitute() {
    yield takeEvery(GET_SUBSTITUTE, getSubstituteFlow);
}



function* calculateApplicationFlow(action) {
    try {
        const response = yield calculateApplicationApi(action.input)
        console.log('responseCalculateeeeeee: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: CALCULATE_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    let message = response.message
                    yield put({
                        type: CALCULATE_APPLICATION_FAILED,
                        error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: CALCULATE_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: CALCULATE_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: CALCULATE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetSubstitute: ', error)
        yield put({ type: CALCULATE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchCalculateApplication() {
    yield takeEvery(CALCULATE_APPLICATION, calculateApplicationFlow);
}


function* getTimesLeaveApplicationFlow(action) {
    try {
        const response = yield getTimesLeaveApplicationApi(action.input)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_TIMES_LEAVE_APPLICATION_SUCCESS, data: response.dataItem[0] })
                } else {
                    let message = response.message
                    yield put({
                        type: GET_TIMES_LEAVE_APPLICATION_FAILED,
                        error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                    })
                }

            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_TIMES_LEAVE_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_TIMES_LEAVE_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_TIMES_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetTimesLeaveApplication: ', error)
        yield put({ type: GET_TIMES_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetTimesLeaveApplication() {
    yield takeEvery(GET_TIMES_LEAVE_APPLICATION, getTimesLeaveApplicationFlow);
}


function* getDaysLeaveApplicationFlow(action) {
    try {
        const response = yield getDaysLeaveApplicationApi(action.input)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_DAYS_LEAVE_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    let message = response.message
                    yield put({
                        type: GET_DAYS_LEAVE_APPLICATION_FAILED,
                        error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                    })
                }

            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_DAYS_LEAVE_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_DAYS_LEAVE_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_DAYS_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetDaysLeaveApplication: ', error)
        yield put({ type: GET_DAYS_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetDaysLeaveApplication() {
    yield takeEvery(GET_DAYS_LEAVE_APPLICATION, getDaysLeaveApplicationFlow);
}

function* saveDaysLeaveApplicationFlow(action) {
    try {
        const response = yield saveDaysLeaveApplicationApi(action.input)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: SAVE_DAYS_LEAVE_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: SAVE_DAYS_LEAVE_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: SAVE_DAYS_LEAVE_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: SAVE_DAYS_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasSaveDaysLeaveApplication: ', error)
        yield put({ type: SAVE_DAYS_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSaveDaysLeaveApplication() {
    yield takeEvery(SAVE_DAYS_LEAVE_APPLICATION, saveDaysLeaveApplicationFlow);
}



function* resetSaveDaysLeaveApplicationFlow() {
    try {
        // yield put({ type: RESET_SAVE_DAYS_LEAVE_APPLICATION })
    } catch (error) {
        console.log('errorCatchSagasResetSaveDaysLeaveApplication: ', error)
        // yield put({ type: RESET_SAVE_DAYS_LEAVE_APPLICATION })
    }
}

export function* watchResetSaveDaysLeaveApplication() {
    yield takeEvery(RESET_SAVE_DAYS_LEAVE_APPLICATION, resetSaveDaysLeaveApplicationFlow);
}



function* createLeaveApplicationFlow(action) {
    try {
        const response = yield createLeaveApplicationApi(action.input)
        console.log('responseCreateLeaveApplication : ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: CREATE_LEAVE_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: CREATE_LEAVE_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: CREATE_LEAVE_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: CREATE_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasCreateLeaveApplication: ', error)
        yield put({ type: CREATE_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchCreateLeaveApplication() {
    yield takeEvery(CREATE_LEAVE_APPLICATION, createLeaveApplicationFlow);
}



function* searchLeaveApplicationFlow(action) {
    try {
        const response = yield searchLeaveApplicationApi(action.input)
        console.log('responseSearchLeaveApplication : ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: SEARCH_LEAVE_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    yield put({
                        type: SEARCH_LEAVE_APPLICATION_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: SEARCH_LEAVE_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: SEARCH_LEAVE_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: SEARCH_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasSearchLeaveApplication: ', error)
        yield put({ type: SEARCH_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSearchLeaveApplication() {
    yield takeEvery(SEARCH_LEAVE_APPLICATION, searchLeaveApplicationFlow);
}


function* getDetailLeaveApplicationFlow(action) {
    try {
        const response = yield getDetailLeaveApplicationApi(action.input)
        console.log('responseGetDetailLeaveApplication : ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_DETAIL_LEAVE_APPLICATION_SUCCESS, data: response.dataItem[0] })
                } else {
                    yield put({
                        type: GET_DETAIL_LEAVE_APPLICATION_FAILED,
                        // error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                        error: errorConnectServer.errorData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_DETAIL_LEAVE_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_DETAIL_LEAVE_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_DETAIL_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasGetDetailLeaveApplication: ', error)
        yield put({ type: GET_DETAIL_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetDetailLeaveApplication() {
    yield takeEvery(GET_DETAIL_LEAVE_APPLICATION, getDetailLeaveApplicationFlow);
}


function* resetGetDetailLeaveApplicationFlow() {
    try {
        // yield put({ type: RESET_GET_DETAIL_LEAVE_APPLICATION })

    } catch (error) {
        console.log('errorCatchSagasResetGetDetailLeaveApplication: ', error)
        // yield put({ type: RESET_GET_DETAIL_LEAVE_APPLICATION })
    }
}

export function* watchResetGetDetailLeaveApplication() {
    yield takeEvery(RESET_GET_DETAIL_LEAVE_APPLICATION, resetGetDetailLeaveApplicationFlow);
}



function* updateLeaveApplicationFlow(action) {
    try {
        const response = yield updateLeaveApplicationApi(action.input)
        console.log('responseUpdateLeaveApplication : ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: UPDATE_LEAVE_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: UPDATE_LEAVE_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: UPDATE_LEAVE_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: UPDATE_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasUpdateLeaveApplication: ', error)
        yield put({ type: UPDATE_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchUpdateLeaveApplication() {
    yield takeEvery(UPDATE_LEAVE_APPLICATION, updateLeaveApplicationFlow);
}



function* deleteLeaveApplicationFlow(action) {
    try {
        const response = yield deleteLeaveApplicationApi(action.input)
        console.log('responseDeleteLeaveApplication : ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: DELETE_LEAVE_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: DELETE_LEAVE_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: DELETE_LEAVE_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: DELETE_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasDeleteLeaveApplication: ', error)
        yield put({ type: DELETE_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchDeleteLeaveApplication() {
    yield takeEvery(DELETE_LEAVE_APPLICATION, deleteLeaveApplicationFlow);
}


function* searchApprovedLeaveApplicationFlow(action) {
    try {
        const response = yield searchApprovedLeaveApplicationApi(action.input)
        console.log('responseSearchApprovedLeaveApplication : ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: SEARCH_APPROVED_LEAVE_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    yield put({
                        type: SEARCH_APPROVED_LEAVE_APPLICATION_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: SEARCH_APPROVED_LEAVE_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: SEARCH_APPROVED_LEAVE_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: SEARCH_APPROVED_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasSearchApprovedLeaveApplication: ', error)
        yield put({ type: SEARCH_APPROVED_LEAVE_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSearchApprovedLeaveApplication() {
    yield takeEvery(SEARCH_APPROVED_LEAVE_APPLICATION, searchApprovedLeaveApplicationFlow);
}


// -----> Business Trip

function* getListTypeBusinessTripApplicationFlow() {
    try {
        const response = yield getWF4ListBusinessTripApi([{ F: '1' }])
        console.log('Sagas - getListTypeBusinessTripApplicationFlow - Response: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    let message = response.message
                    yield put({
                        type: GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION, input: undefined } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasListTypeBusinessTripApplication: ', error)
        yield put({ type: GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetListTypeBusinessTripApplication() {
    yield takeEvery(GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION, getListTypeBusinessTripApplicationFlow);
}



function* getListCurrencyBusinessTripApplicationFlow() {
    try {
        const response = yield getWF4ListBusinessTripApi([{ F: '2' }])
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    let message = response.message
                    yield put({
                        type: GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_FAILED,
                        error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION, input: undefined } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasListCurrencyBusinessTripApplication: ', error)
        yield put({ type: GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetListCurrencyBusinessTripApplication() {
    yield takeEvery(GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION, getListCurrencyBusinessTripApplicationFlow);
}


function* getListEmployeeBusinessTripApplicationFlow() {
    try {
        const response = yield getWF4ListBusinessTripApi([{ F: '3' }])
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    let message = response.message
                    yield put({
                        type: GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_FAILED,
                        error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION, input: undefined } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasListEmployeeBusinessTripApplication: ', error)
        yield put({ type: GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetListEmployeeBusinessTripApplication() {
    yield takeEvery(GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION, getListEmployeeBusinessTripApplicationFlow);
}

function* calculateBusinessTripApplicationFlow(action) {
    try {
        const response = yield calculateBusinessTripApi(action.input)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: CALCULATE_BUSINESS_TRIP_APPLICATION_SUCCESS, data: response.dataItem[0] })
                } else {
                    let message = response.message
                    yield put({
                        type: CALCULATE_BUSINESS_TRIP_APPLICATION_FAILED,
                        error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: CALCULATE_BUSINESS_TRIP_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: CALCULATE_BUSINESS_TRIP_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: CALCULATE_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasCalculateBusinessTripApplication: ', error)
        yield put({ type: CALCULATE_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchCalculateBusinessTripApplication() {
    yield takeEvery(CALCULATE_BUSINESS_TRIP_APPLICATION, calculateBusinessTripApplicationFlow);
}


function* saveBusinessTripApplicationFlow(action) {
    try {
        const response = yield saveBusinessTripApi(action.input)
        console.log('responseSaveBusinessTripApplicationFlow: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: SAVE_BUSINESS_TRIP_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: SAVE_BUSINESS_TRIP_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: SAVE_BUSINESS_TRIP_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: SAVE_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasSaveBusinessTripApplication: ', error)
        yield put({ type: SAVE_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSaveBusinessTripApplication() {
    yield takeEvery(SAVE_BUSINESS_TRIP_APPLICATION, saveBusinessTripApplicationFlow);
}


function* searchBusinessTripApplicationFlow(action) {
    try {
        const response = yield searchBusinessTripApi(action.input)
        console.log('responseSearchBusinessTrip: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: SEARCH_BUSINESS_TRIP_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    yield put({
                        type: SEARCH_BUSINESS_TRIP_APPLICATION_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: SEARCH_BUSINESS_TRIP_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: SEARCH_BUSINESS_TRIP_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: SEARCH_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasSearchBusinessTripApplication: ', error)
        yield put({ type: SEARCH_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSearchBusinessTripApplication() {
    yield takeEvery(SEARCH_BUSINESS_TRIP_APPLICATION, searchBusinessTripApplicationFlow);
}



function* getDetailBusinessTripApplicationFlow(action) {
    try {
        const response = yield getDetailBusinessTripApplicationApi(action.input)
        console.log('responseGetDetailBusinessTrip: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_DETAIL_BUSINESS_TRIP_APPLICATION_SUCCESS, data: response.dataItem[0] })
                } else {
                    yield put({
                        type: GET_DETAIL_BUSINESS_TRIP_APPLICATION_FAILED,
                        // error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                        error: errorConnectServer.errorData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_DETAIL_BUSINESS_TRIP_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_DETAIL_BUSINESS_TRIP_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_DETAIL_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetDetailBusinessTripApplication: ', error)
        yield put({ type: GET_DETAIL_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetDetailBusinessTripApplication() {
    yield takeEvery(GET_DETAIL_BUSINESS_TRIP_APPLICATION, getDetailBusinessTripApplicationFlow);
}



function* resetGetDetailBusinessTripApplicationFlow() {
    try {
        // yield put({ type: RESET_GET_DETAIL_BUSINESS_TRIP_APPLICATION })
    } catch (error) {
        console.log('errorCatchSagasResetGetDetailBusinessTripApplication: ', error)
        // yield put({ type: RESET_GET_DETAIL_BUSINESS_TRIP_APPLICATION })
    }
}

export function* watchResetGetDetailBusinessTripApplication() {
    yield takeEvery(RESET_GET_DETAIL_BUSINESS_TRIP_APPLICATION, resetGetDetailBusinessTripApplicationFlow);
}


function* withDrawBusinessTripApplicationFlow(action) {
    try {
        const response = yield withDrawBusinessTripApplicationApi(action.input)
        console.log('responseWithDrawlBusinessTrip: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: WITH_DRAW_BUSINESS_TRIP_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: WITH_DRAW_BUSINESS_TRIP_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: WITH_DRAW_BUSINESS_TRIP_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: WITH_DRAW_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasWithDrawlBusinessTripApplication: ', error)
        yield put({ type: WITH_DRAW_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchWithDrawBusinessTripApplication() {
    yield takeEvery(WITH_DRAW_BUSINESS_TRIP_APPLICATION, withDrawBusinessTripApplicationFlow);
}


function* deleteBusinessTripApplicationFlow(action) {
    try {
        const response = yield deleteBusinessTripApplicationApi(action.input)
        console.log('responseDeletelBusinessTrip: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: DELETE_BUSINESS_TRIP_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: DELETE_BUSINESS_TRIP_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: DELETE_BUSINESS_TRIP_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: DELETE_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasDeletelBusinessTripApplication: ', error)
        yield put({ type: DELETE_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchDeleteBusinessTripApplication() {
    yield takeEvery(DELETE_BUSINESS_TRIP_APPLICATION, deleteBusinessTripApplicationFlow);
}


function* searchApprovedBusinessTripApplicationFlow(action) {
    try {
        const response = yield searchApprovedBusinessTripApi(action.input)
        console.log('responseSearchApprovedBusinessTrip: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    yield put({
                        type: SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasSearchApprovedBusinessTripApplication: ', error)
        yield put({ type: SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSearchApprovedBusinessTripApplication() {
    yield takeEvery(SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION, searchApprovedBusinessTripApplicationFlow);
}



// ------------------------> Over Time Application


function* getDateInfoOverTimeApplicationFlow(action) {
    try {
        const response = yield getDateInfoOverTimeApplicationApi(action.input)
        console.log('responseDateInfoOverTime: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_DATE_INFO_OVERTIME_APPLICATION_SUCCESS, data: response.dataItem[0] })
                } else {
                    let message = response.message
                    yield put({
                        type: GET_DATE_INFO_OVERTIME_APPLICATION_FAILED,
                        error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                    })
                }
                // yield put({ type: GET_DATE_INFO_OVERTIME_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_DATE_INFO_OVERTIME_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_DATE_INFO_OVERTIME_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_DATE_INFO_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetDateInfoOverTimeApplication: ', error)
        yield put({ type: GET_DATE_INFO_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetDateInfoOverTimeApplication() {
    yield takeEvery(GET_DATE_INFO_OVERTIME_APPLICATION, getDateInfoOverTimeApplicationFlow);
}


function* getApproverOverTimeApplicationFlow() {
    try {
        const response = yield getApproverOverTimeApplicationApi()
        console.log('responseGetApproverOverTime: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_APPROVER_OVERTIME_APPLICATION_SUCCESS, data: response.dataItem[0] })
                } else {
                    let message = response.message
                    yield put({
                        type: GET_APPROVER_OVERTIME_APPLICATION_FAILED,
                        error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                    })
                }
                // yield put({ type: GET_DATE_INFO_OVERTIME_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_APPROVER_OVERTIME_APPLICATION, input: undefined } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_APPROVER_OVERTIME_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_APPROVER_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetApproverOverTimeApplication: ', error)
        yield put({ type: GET_APPROVER_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetApproverOverTimeApplication() {
    yield takeEvery(GET_APPROVER_OVERTIME_APPLICATION, getApproverOverTimeApplicationFlow);
}



function* calculateOverTimeApplicationFlow(action) {
    try {
        const response = yield calculateOverTimeApplicationApi(action.input)
        console.log('responseCalculateOverTime: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: CALCULATE_OVERTIME_APPLICATION_SUCCESS, data: response.dataItem[0] })
                } else {
                    let message = response.message
                    yield put({
                        type: CALCULATE_OVERTIME_APPLICATION_FAILED,
                        error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: CALCULATE_OVERTIME_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: CALCULATE_OVERTIME_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: CALCULATE_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetDateInfoOverTimeApplication: ', error)
        yield put({ type: CALCULATE_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchCalculateOverTimeApplication() {
    yield takeEvery(CALCULATE_OVERTIME_APPLICATION, calculateOverTimeApplicationFlow);
}

function* saveOverTimeApplicationFlow(action) {
    try {
        const response = yield saveOverTimeApplicationApi(action.input)
        console.log('responseSaveOverTime: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: SAVE_OVERTIME_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: SAVE_OVERTIME_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: SAVE_OVERTIME_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: SAVE_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasSaveOverTimeApplication: ', error)
        yield put({ type: SAVE_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSaveOverTimeApplication() {
    yield takeEvery(SAVE_OVERTIME_APPLICATION, saveOverTimeApplicationFlow);
}


function* searchOverTimeApplicationFlow(action) {
    try {
        const response = yield searchOverTimeApplicationApi(action.input)
        console.log('responseSearchOverTime: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: SEARCH_OVERTIME_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    yield put({
                        type: SEARCH_OVERTIME_APPLICATION_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: SEARCH_OVERTIME_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: SEARCH_OVERTIME_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: SEARCH_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasSearchOverTimeApplication: ', error)
        yield put({ type: SEARCH_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSearchOverTimeApplication() {
    yield takeEvery(SEARCH_OVERTIME_APPLICATION, searchOverTimeApplicationFlow);
}


function* getListStatusOverTimeApplicationFlow(action) {
    try {
        const response = yield getWorkflow2ListApi(action.input)
        console.log('responseGetListStatusOverTime: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_LIST_STATUS_OVERTIME_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    yield put({
                        type: GET_LIST_STATUS_OVERTIME_APPLICATION_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_LIST_STATUS_OVERTIME_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_LIST_STATUS_OVERTIME_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_LIST_STATUS_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetListStatusOverTimeApplication: ', error)
        yield put({ type: GET_LIST_STATUS_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetListStatusOverTimeApplication() {
    yield takeEvery(GET_LIST_STATUS_OVERTIME_APPLICATION, getListStatusOverTimeApplicationFlow);
}


function* getDetailOverTimeApplicationFlow(action) {
    try {
        const response = yield getDetailOverTimeApplicationApi(action.input)
        console.log('responseGetDetailOverTime: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_DETAIL_OVERTIME_APPLICATION_SUCCESS, data: response.dataItem[0] })
                } else {
                    yield put({
                        type: GET_DETAIL_OVERTIME_APPLICATION_FAILED,
                        // error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                        error: errorConnectServer.errorData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_DETAIL_OVERTIME_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_DETAIL_OVERTIME_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_DETAIL_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetDetailOverTimeApplication: ', error)
        yield put({ type: GET_DETAIL_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetDetailOverTimeApplication() {
    yield takeEvery(GET_DETAIL_OVERTIME_APPLICATION, getDetailOverTimeApplicationFlow);
}


function* resetGetDetailOverTimeApplicationFlow() {
    try {
        // yield put({ type: RESET_GET_DETAIL_OVERTIME_APPLICATION })
    } catch (error) {
        console.log('errorCatchSagasResetGetDetailOverTimeApplication: ', error)
        // yield put({ type: RESET_GET_DETAIL_OVERTIME_APPLICATION })
    }
}

export function* watchResetGetDetailOverTimeApplication() {
    yield takeEvery(RESET_GET_DETAIL_OVERTIME_APPLICATION, resetGetDetailOverTimeApplicationFlow);
}



function* withDrawOverTimeApplicationFlow(action) {
    try {
        const response = yield withDrawOverTimeApplicationApi(action.input)
        console.log('responseWithDrawOverTime: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: WITH_DRAW_OVERTIME_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: WITH_DRAW_OVERTIME_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: WITH_DRAW_OVERTIME_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: WITH_DRAW_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasWithDrawOverTimeApplication: ', error)
        yield put({ type: WITH_DRAW_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchWithDrawOverTimeApplication() {
    yield takeEvery(WITH_DRAW_OVERTIME_APPLICATION, withDrawOverTimeApplicationFlow);
}


function* deleteOverTimeApplicationFlow(action) {
    try {
        const response = yield deleteOverTimeApplicationApi(action.input)
        console.log('responseDeleteDrawOverTime: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: DELETE_OVERTIME_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: DELETE_OVERTIME_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: DELETE_OVERTIME_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: DELETE_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasDeleteOverTimeApplication: ', error)
        yield put({ type: DELETE_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchDeleteOverTimeApplication() {
    yield takeEvery(DELETE_OVERTIME_APPLICATION, deleteOverTimeApplicationFlow);
}


function* searchApprovedOverTimeApplicationFlow(action) {
    try {
        const response = yield searchApprovedOverTimeApplicationApi(action.input)
        console.log('responseSearchApprovedOverTime: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: SEARCH_APPROVED_OVERTIME_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    yield put({
                        type: SEARCH_APPROVED_OVERTIME_APPLICATION_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: SEARCH_APPROVED_OVERTIME_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: SEARCH_APPROVED_OVERTIME_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: SEARCH_APPROVED_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasSearchApprovedOverTimeApplication: ', error)
        yield put({ type: SEARCH_APPROVED_OVERTIME_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSearchApprovedOverTimeApplication() {
    yield takeEvery(SEARCH_APPROVED_OVERTIME_APPLICATION, searchApprovedOverTimeApplicationFlow);
}

// -----------------------------------> Log TMS Application


function* getAdjustmentStatusLogTMSApplicationFlow() {
    try {
        const response = yield getWorkflow3ListApi([{ F: '1' }])
        console.log('responseGetAdjustmentStatusLogTMS: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_ADJUSTMENT_STATUS_LOG_TMS_SUCCESS, data: response.dataItem })
                } else {
                    yield put({
                        type: GET_ADJUSTMENT_STATUS_LOG_TMS_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_ADJUSTMENT_STATUS_LOG_TMS, input: undefined } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_ADJUSTMENT_STATUS_LOG_TMS_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_ADJUSTMENT_STATUS_LOG_TMS_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetAdjustmentStatusLogTMSApplication: ', error)
        yield put({ type: GET_ADJUSTMENT_STATUS_LOG_TMS_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetAdjustmentStatusLogTMSApplication() {
    yield takeEvery(GET_ADJUSTMENT_STATUS_LOG_TMS, getAdjustmentStatusLogTMSApplicationFlow);
}


function* getFingerPrintRecordLogTMSApplicationFlow() {
    try {
        const response = yield getWorkflow3ListApi([{ F: '2' }])
        console.log('responseGetFingerPrintRecordLogTMS: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_FINGER_PRINT_RECORD_LOG_TMS_SUCCESS, data: response.dataItem })
                } else {
                    yield put({
                        type: GET_FINGER_PRINT_RECORD_LOG_TMS_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_FINGER_PRINT_RECORD_LOG_TMS, input: undefined } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_FINGER_PRINT_RECORD_LOG_TMS_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_FINGER_PRINT_RECORD_LOG_TMS_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetFingerPrintRecordLogTMSApplication: ', error)
        yield put({ type: GET_FINGER_PRINT_RECORD_LOG_TMS_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetFingerPrintRecordLogTMSApplication() {
    yield takeEvery(GET_FINGER_PRINT_RECORD_LOG_TMS, getFingerPrintRecordLogTMSApplicationFlow);
}


function* getApprovalStatusLogTMSApplicationFlow() {
    try {
        const response = yield getWorkflow3ListApi([{ F: '3' }])
        console.log('responseGetApprovalStatusLogTMS: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_APPROVAL_STATUS_LOG_TMS_SUCCESS, data: response.dataItem })
                } else {
                    yield put({
                        type: GET_APPROVAL_STATUS_LOG_TMS_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_APPROVAL_STATUS_LOG_TMS, input: undefined } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_APPROVAL_STATUS_LOG_TMS_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_APPROVAL_STATUS_LOG_TMS_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetApprovalStatusLogTMSApplication: ', error)
        yield put({ type: GET_APPROVAL_STATUS_LOG_TMS_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetApprovalStatusLogTMSApplication() {
    yield takeEvery(GET_APPROVAL_STATUS_LOG_TMS, getApprovalStatusLogTMSApplicationFlow);
}


function* searchLogTMSApplicationFlow(action) {
    try {
        const response = yield searchLogTMSApplicationApi(action.input)
        console.log('responseSearchLogTMSApplicationApi: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: SEARCH_LOG_TMS_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    yield put({
                        type: SEARCH_LOG_TMS_APPLICATION_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: SEARCH_LOG_TMS_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: SEARCH_LOG_TMS_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: SEARCH_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasSearchStatusLogTMSApplication: ', error)
        yield put({ type: SEARCH_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSearchLogTMSApplication() {
    yield takeEvery(SEARCH_LOG_TMS_APPLICATION, searchLogTMSApplicationFlow);
}


function* getDetailLogTMSApplicationFlow(action) {
    try {
        const response = yield getDetailLogTMSApplicationApi(action.input)
        console.log('responseGetDetailLogTMSApplicationApi: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_DETAIL_LOG_TMS_APPLICATION_SUCCESS, data: response.dataItem[0] })
                } else {
                    yield put({
                        type: GET_DETAIL_LOG_TMS_APPLICATION_FAILED,
                        // error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                        error: errorConnectServer.errorData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_DETAIL_LOG_TMS_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_DETAIL_LOG_TMS_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_DETAIL_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetDetailLogTMSApplication: ', error)
        yield put({ type: GET_DETAIL_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetDetailLogTMSApplication() {
    yield takeEvery(GET_DETAIL_LOG_TMS_APPLICATION, getDetailLogTMSApplicationFlow);
}



function* resetGetDetailLogTMSApplicationFlow() {
    try {
        // yield put({ type: RESET_GET_DETAIL_LOG_TMS_APPLICATION })
    } catch (error) {
        console.log('errorCatchSagasResetGetDetailLogTMSApplication: ', error)
        // yield put({ type: RESET_GET_DETAIL_LOG_TMS_APPLICATION })
    }
}

export function* watchResetGetDetailLogTMSApplication() {
    yield takeEvery(RESET_GET_DETAIL_LOG_TMS_APPLICATION, resetGetDetailLogTMSApplicationFlow);
}



function* getLogTypeLogTMSApplicationFlow() {
    try {
        const response = yield getWorkflow3ListApi([{ F: '4' }])
        console.log('responseGetLogTypeLogTMS: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: GET_LOG_TYPE_LOG_TMS_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    yield put({
                        type: GET_APPROVAL_STATUS_LOG_TMS_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_LOG_TYPE_LOG_TMS_APPLICATION, input: undefined } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_LOG_TYPE_LOG_TMS_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: GET_LOG_TYPE_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasGetLogTypeLogTMSApplication: ', error)
        yield put({ type: GET_LOG_TYPE_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetLogTypeLogTMSApplication() {
    yield takeEvery(GET_LOG_TYPE_LOG_TMS_APPLICATION, getLogTypeLogTMSApplicationFlow);
}



function* withDrawLogTMSApplicationFlow(action) {
    try {
        const response = yield withDrawLogTMSApplicationApi(action.input)
        console.log('responseWithDrawLogTMS: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: WITH_DRAW_LOG_TMS_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: WITH_DRAW_LOG_TMS_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: WITH_DRAW_LOG_TMS_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: WITH_DRAW_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasWithDrawTypeLogTMSApplication: ', error)
        yield put({ type: WITH_DRAW_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchWithDrawTypeLogTMSApplication() {
    yield takeEvery(WITH_DRAW_LOG_TMS_APPLICATION, withDrawLogTMSApplicationFlow);
}

function* deleteLogTMSApplicationFlow(action) {
    try {
        const response = yield deleteLogTMSApplicationApi(action.input)
        console.log('responseDeleteLogTMS: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: DELETE_LOG_TMS_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: DELETE_LOG_TMS_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: DELETE_LOG_TMS_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: DELETE_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasDeleteLogTMSApplication: ', error)
        yield put({ type: DELETE_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchDeleteLogTMSApplication() {
    yield takeEvery(DELETE_LOG_TMS_APPLICATION, deleteLogTMSApplicationFlow);
}


function* saveLogTMSApplicationFlow(action) {
    try {
        const response = yield saveLogTMSApplicationApi(action.input)
        console.log('responseSaveLogTMS: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: SAVE_LOG_TMS_APPLICATION_SUCCESS, data: response.message })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: SAVE_LOG_TMS_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: SAVE_LOG_TMS_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: SAVE_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasSaveTypeLogTMSApplication: ', error)
        yield put({ type: SAVE_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSaveLogTMSApplication() {
    yield takeEvery(SAVE_LOG_TMS_APPLICATION, saveLogTMSApplicationFlow);
}


function* searchApprovedLogTMSApplicationFlow(action) {
    try {
        const response = yield searchApprovedLogTMSApplicationApi(action.input)
        console.log('responseSearchApprovedLogTMSApplicationApi: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                if (!arrayIsEmpty(response.dataItem)) {
                    yield put({ type: SEARCH_APPROVED_LOG_TMS_APPLICATION_SUCCESS, data: response.dataItem })
                } else {
                    yield put({
                        type: SEARCH_APPROVED_LOG_TMS_APPLICATION_FAILED,
                        error: userProfile.LangID === 'VN' ? errorConnectServer.vnData : errorConnectServer.enData
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: SEARCH_APPROVED_LOG_TMS_APPLICATION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: SEARCH_APPROVED_LOG_TMS_APPLICATION_FAILED,
                    error: message !== undefined ? message : userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
                })
            }
        } else {
            yield put({ type: SEARCH_APPROVED_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }
    } catch (error) {
        console.log('errorCatchSagasSearchApprovedLogTMSApplication: ', error)
        yield put({ type: SEARCH_APPROVED_LOG_TMS_APPLICATION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchSearchApprovedLogTMSApplication() {
    yield takeEvery(SEARCH_APPROVED_LOG_TMS_APPLICATION, searchApprovedLogTMSApplicationFlow);
}

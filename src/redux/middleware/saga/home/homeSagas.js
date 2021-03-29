import {
    getWFRequesterApi,
    wifiVerifyCheckInOutApi,
    getInfoCheckInOutInDayApi,
    requestCaptureCheckInOutApi,
    registryDeviceApi,
    getUser2Api,
    registryDeviceGPSApi,

    //check in out WFH
    wfhVerifyCheckInOutApi,
    getWFHInfoCheckInOutInDayApi,
    wfhRequestCaptureCheckInOutApi,
} from '../../api/home/homeApi'
import {
    GET_WF_REQUESTER,
    GET_WF_REQUESTER_SUCCESS,
    GET_WF_REQUESTER_FAILED,

    WIFI_VERIFY_CHECK_IN_OUT,
    WIFI_VERIFY_CHECK_IN_OUT_FAILED,
    WIFI_VERIFY_CHECK_IN_OUT_SUCCESS,

    GET_INFO_CHECK_IN_OUT_IN_DAY,
    GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED,
    GET_INFO_CHECK_IN_OUT_IN_DAY_SUCCESS,

    REQUEST_CAPTURE_CHECK_IN_OUT_ACTION,
    REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED,
    REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_SUCCESS,

    REGISTRY_DEVICE_ACTION,
    REGISTRY_DEVICE_ACTION_FAILED,
    REGISTRY_DEVICE_ACTION_SUCCESS,

    REGISTRY_DEVICE_GPS_ACTION,
    REGISTRY_DEVICE_GPS_ACTION_FAILED,
    REGISTRY_DEVICE_GPS_ACTION_SUCCESS,
    RESET_REGISTRY_DEVICE_GPS_ACTION,

    GET_USER_2_ACTION,
    GET_USER_2_ACTION_FAILED,
    GET_USER_2_ACTION_SUCCESS,

    //Check in out WFH
    WFH_GET_INFO_CHECK_IN_OUT_IN_DAY,
    WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED,
    WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_SUCCESS,

    WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION,
    WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED,
    WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_SUCCESS,

    WFH_VERIFY_CHECK_IN_OUT,
    WFH_VERIFY_CHECK_IN_OUT_FAILED,
    WFH_VERIFY_CHECK_IN_OUT_SUCCESS,


} from '../../../actions/home/homeActions'

import { POPUP_POST_LOGIN_SHOW, POPUP_UPDATE_APP_SHOW } from '../../../actions/actionTypes'
import { call, takeEvery, put } from 'redux-saga/effects'
import { userProfile, errorConnectServer } from '../../../../config/settings'
import { objectIsNull, stringIsEmpty, arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions'


function* getUser2Flow() {
    try {
        const response = yield getUser2Api()
        console.log('responseGetUser2Api: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: GET_USER_2_ACTION_SUCCESS, data: response.info })
            }
            else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_USER_2_ACTION, input: undefined } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                yield put({
                    type: GET_USER_2_ACTION_FAILED,
                    error: !objectIsNull(response.message) ? response.message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                })
            }
        } else {
            yield put({ type: GET_USER_2_ACTION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasGetUser2: ', error)
        yield put({ type: GET_USER_2_ACTION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetUser2() {
    yield takeEvery(GET_USER_2_ACTION, getUser2Flow);
}

function* getWFRequesterFlow() {
    try {
        const response = yield getWFRequesterApi()
        console.log('responseWFRequester: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: GET_WF_REQUESTER_SUCCESS, data: response.dataItem })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_WF_REQUESTER, input: undefined } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            }
            else if (response.code !== '0') {
                yield put({ type: GET_WF_REQUESTER_FAILED, error: response.message })
            } else {
                yield put({ type: GET_WF_REQUESTER_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
            }
        } else {
            yield put({ type: GET_WF_REQUESTER_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasLogin: ', error)
        yield put({ type: GET_WF_REQUESTER_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetWFRequester() {
    yield takeEvery(GET_WF_REQUESTER, getWFRequesterFlow);
}

function* wifiVerifyCheckInOutFlow(action) {
    try {
        const response = yield wifiVerifyCheckInOutApi(action.input)
        // console.log('responseWifiVerifyCheckInOut: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: WIFI_VERIFY_CHECK_IN_OUT_SUCCESS, data: response.info })
                // yield put({
                //     type: WIFI_VERIFY_CHECK_IN_OUT_SUCCESS, data: {
                //         info1: {
                //             dataItem: [
                //                 {
                //                     code: '1',
                //                     message: 'Thiết bị chưa đăng ký nè !!!!!!!!!'
                //                 }
                //             ]
                //         }
                //     }
                // })

            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: WIFI_VERIFY_CHECK_IN_OUT, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: WIFI_VERIFY_CHECK_IN_OUT_FAILED,
                    error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                })
            }
        } else {
            yield put({ type: WIFI_VERIFY_CHECK_IN_OUT_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasVerifyCheckInOut: ', error)
        yield put({ type: WIFI_VERIFY_CHECK_IN_OUT_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchWifiVerifyCheckInOut() {
    yield takeEvery(WIFI_VERIFY_CHECK_IN_OUT, wifiVerifyCheckInOutFlow);
}


function* getInfoCheckInOutInDayFlow(action) {
    try {
        const response = yield getInfoCheckInOutInDayApi(action.input)
        // console.warn('responseGetInfoCheckInOutInDay: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: GET_INFO_CHECK_IN_OUT_IN_DAY_SUCCESS, data: response.info })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: GET_INFO_CHECK_IN_OUT_IN_DAY, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED,
                    error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                })
            }
        } else {
            yield put({ type: GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasGetInfoCheckInOutInDay: ', error)
        yield put({ type: GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetInfoCheckInOutInDay() {
    yield takeEvery(GET_INFO_CHECK_IN_OUT_IN_DAY, getInfoCheckInOutInDayFlow);
}


function* requestCaptureCheckInOutFlow(action) {
    try {
        const response = yield requestCaptureCheckInOutApi(action.input)
        // console.log('responseRequestCaptureCheckInOut: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_SUCCESS, data: response.info })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: REQUEST_CAPTURE_CHECK_IN_OUT_ACTION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED,
                    error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                })
            }
        } else {
            yield put({ type: REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasRequestCaptureCheckInOut: ', error)
        yield put({ type: REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchRequestCaptureCheckInOut() {
    yield takeEvery(REQUEST_CAPTURE_CHECK_IN_OUT_ACTION, requestCaptureCheckInOutFlow);
}



function* registryDeviceFlow(action) {
    try {
        const response = yield registryDeviceApi(action.input)
        // console.log('responseRegistryDevice: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                const message = response.message
                if (!objectIsNull(response.info)) {
                    if (!objectIsNull(response.info.info1)) {
                        if (!arrayIsEmpty(response.info.info1.dataItem)) {
                            console.log('resultRegistryDevice: ', response.info.info1.dataItem[0])
                            if (response.info.info1.dataItem[0].code === '0') {
                                yield put({ type: REGISTRY_DEVICE_ACTION_SUCCESS, data: response.info.info1.dataItem[0].message })
                            } else {
                                let mes = response.info.info1.dataItem[0].message
                                yield put({
                                    type: REGISTRY_DEVICE_ACTION_FAILED,
                                    error: !stringIsEmpty(mes) ? mes : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                                })
                            }
                        } else {
                            yield put({
                                type: REGISTRY_DEVICE_ACTION_FAILED,
                                error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                            })
                        }
                    } else {
                        yield put({
                            type: REGISTRY_DEVICE_ACTION_FAILED,
                            error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                        })
                    }
                } else {
                    yield put({
                        type: REGISTRY_DEVICE_ACTION_FAILED,
                        error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                    })
                }

            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: REGISTRY_DEVICE_ACTION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: REGISTRY_DEVICE_ACTION_FAILED,
                    error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                })
            }
        } else {
            yield put({ type: REGISTRY_DEVICE_ACTION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasRegistryDevice: ', error)
        yield put({ type: REGISTRY_DEVICE_ACTION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchRegistryDevice() {
    yield takeEvery(REGISTRY_DEVICE_ACTION, registryDeviceFlow);
}


function* registryDeviceGPSFlow(action) {
    try {
        const response = yield registryDeviceGPSApi(action.input)
        console.log('response - registryDeviceGPSFlow: ', response)
        if (!objectIsNull(response)) {
            if (response.code === '0') {
                const message = response.message
                console.log('response info: ', response.info.info1.dataItem)
                if (!objectIsNull(response.info)) {
                    if (!objectIsNull(response.info.info1)) {
                        if (!arrayIsEmpty(response.info.info1.dataItem)) {
                            console.log('resultRegistryDevice: ', response.info.info1.dataItem[0])
                            if (response.info.info1.dataItem[0].code === '0') {
                                yield put({ type: REGISTRY_DEVICE_GPS_ACTION_SUCCESS, data: response.info.info1.dataItem[0].message })
                            } else {
                                let mes = response.info.info1.dataItem[0].message
                                yield put({
                                    type: REGISTRY_DEVICE_GPS_ACTION_FAILED,
                                    error: !stringIsEmpty(mes) ? mes : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                                })
                            }
                        } else {
                            yield put({
                                type: REGISTRY_DEVICE_GPS_ACTION_FAILED,
                                error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                            })
                        }
                    } else {
                        yield put({
                            type: REGISTRY_DEVICE_GPS_ACTION_FAILED,
                            error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                        })
                    }
                } else {
                    yield put({
                        type: REGISTRY_DEVICE_GPS_ACTION_FAILED,
                        error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                    })
                }
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: REGISTRY_DEVICE_GPS_ACTION_FAILED, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                yield put({
                    type: REGISTRY_DEVICE_GPS_ACTION_FAILED,
                    error: !stringIsEmpty(response.message) ? response.message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                })
            }

            // const response = yield registryDeviceApi(action.input)
            // // console.log('responseRegistryDevice: ', response)
            // if (response !== undefined) {
            //     if (response.code === '0') {
            //         const message = response.message
            //         if (!objectIsNull(response.info)) {
            //             if (!objectIsNull(response.info.info1)) {
            //                 if (!arrayIsEmpty(response.info.info1.dataItem)) {
            //                     console.log('resultRegistryDevice: ', response.info.info1.dataItem[0])
            //                     if (response.info.info1.dataItem[0].code === '0') {
            //                         yield put({ type: REGISTRY_DEVICE_ACTION_SUCCESS, data: response.info.info1.dataItem[0].message })
            //                     } else {
            //                         let mes = response.info.info1.dataItem[0].message
            //                         yield put({
            //                             type: REGISTRY_DEVICE_ACTION_FAILED,
            //                             error: !stringIsEmpty(mes) ? mes : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
            //                         })
            //                     }
            //                 } else {
            //                     yield put({
            //                         type: REGISTRY_DEVICE_ACTION_FAILED,
            //                         error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
            //                     })
            //                 }
            //             } else {
            //                 yield put({
            //                     type: REGISTRY_DEVICE_ACTION_FAILED,
            //                     error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
            //                 })
            //             }
            //         } else {
            //             yield put({
            //                 type: REGISTRY_DEVICE_ACTION_FAILED,
            //                 error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
            //             })
            //         }

            //     } else if (response.code === '1') {
            //         yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: REGISTRY_DEVICE_ACTION, input: action.input } })
            //     } else if (response.code === '4') {
            //         yield put({
            //             type: POPUP_UPDATE_APP_SHOW,
            //             message: response.message !== undefined ? response.message : ''
            //         });
            //     } else {
            //         let message = response.message
            //         yield put({
            //             type: REGISTRY_DEVICE_ACTION_FAILED,
            //             error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
            //         })
            //     }
        } else {
            yield put({ type: REGISTRY_DEVICE_GPS_ACTION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasRegistryDeviceGPS: ', error)
        yield put({ type: REGISTRY_DEVICE_GPS_ACTION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchRegistryDeviceGPS() {
    yield takeEvery(REGISTRY_DEVICE_GPS_ACTION, registryDeviceGPSFlow);
}


//Check in out WFH 


function* wfhVerifyCheckInOutFlow(action) {
    try {
        const response = yield wfhVerifyCheckInOutApi(action.input)
        console.log('responseWifiVerifyCheckInOut: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: WFH_VERIFY_CHECK_IN_OUT_SUCCESS, data: response.info })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: WFH_VERIFY_CHECK_IN_OUT, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: WFH_VERIFY_CHECK_IN_OUT_FAILED,
                    error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                })
            }
        } else {
            yield put({ type: WFH_VERIFY_CHECK_IN_OUT_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasWFHVerifyCheckInOut: ', error)
        yield put({ type: WFH_VERIFY_CHECK_IN_OUT_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchWFHVerifyCheckInOut() {
    yield takeEvery(WFH_VERIFY_CHECK_IN_OUT, wfhVerifyCheckInOutFlow);
}




function* wfhRequestCaptureCheckInOutFlow(action) {
    try {
        const response = yield wfhRequestCaptureCheckInOutApi(action.input)
        console.log('responseWFHRequestCaptureCheckInOut: ', response.info.info1.dataItem)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_SUCCESS, data: response.info })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED,
                    error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                })
            }
        } else {
            yield put({ type: WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasWFHRequestCaptureCheckInOut: ', error)
        yield put({ type: WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchWFHRequestCaptureCheckInOut() {
    yield takeEvery(WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION, wfhRequestCaptureCheckInOutFlow);
}




function* getWFHInfoCheckInOutInDayFlow(action) {
    try {
        const response = yield getWFHInfoCheckInOutInDayApi(action.input)
        console.warn('responseGetWFHInfoCheckInOutInDay: ', response)
        if (response !== undefined) {
            if (response.code === '0') {
                yield put({ type: WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_SUCCESS, data: response.info })
            } else if (response.code === '1') {
                yield put({ type: POPUP_POST_LOGIN_SHOW, action: { type: WFH_GET_INFO_CHECK_IN_OUT_IN_DAY, input: action.input } })
            } else if (response.code === '4') {
                yield put({
                    type: POPUP_UPDATE_APP_SHOW,
                    message: response.message !== undefined ? response.message : ''
                });
            } else {
                let message = response.message
                yield put({
                    type: WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED,
                    error: !stringIsEmpty(message) ? message : (userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en)
                })
            }
        } else {
            yield put({ type: WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
        }

    } catch (error) {
        console.log('errorCatchSagasGetWFHInfoCheckInOutInDay: ', error)
        yield put({ type: WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED, error: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en })
    }
}

export function* watchGetWFHInfoCheckInOutInDay() {
    yield takeEvery(WFH_GET_INFO_CHECK_IN_OUT_IN_DAY, getWFHInfoCheckInOutInDayFlow);
}

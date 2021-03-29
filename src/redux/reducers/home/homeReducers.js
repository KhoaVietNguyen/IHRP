
import {
    GET_WF_REQUESTER,
    GET_WF_REQUESTER_FAILED,
    GET_WF_REQUESTER_SUCCESS,

    WIFI_VERIFY_CHECK_IN_OUT_SUCCESS,
    WIFI_VERIFY_CHECK_IN_OUT_FAILED,
    WIFI_VERIFY_CHECK_IN_OUT,

    GET_INFO_CHECK_IN_OUT_IN_DAY,
    GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED,
    GET_INFO_CHECK_IN_OUT_IN_DAY_SUCCESS,

    REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_SUCCESS,
    REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED,
    REQUEST_CAPTURE_CHECK_IN_OUT_ACTION,

    REGISTRY_DEVICE_ACTION_SUCCESS,
    REGISTRY_DEVICE_ACTION_FAILED,
    REGISTRY_DEVICE_ACTION,

    REGISTRY_DEVICE_GPS_ACTION,
    REGISTRY_DEVICE_GPS_ACTION_FAILED,
    REGISTRY_DEVICE_GPS_ACTION_SUCCESS,


    GET_USER_2_ACTION,
    GET_USER_2_ACTION_SUCCESS,
    GET_USER_2_ACTION_FAILED,

    //check in out WFH 

    WFH_GET_INFO_CHECK_IN_OUT_IN_DAY,
    WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED,
    WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_SUCCESS,

    WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION,
    WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED,
    WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_SUCCESS,

    WFH_VERIFY_CHECK_IN_OUT,
    WFH_VERIFY_CHECK_IN_OUT_FAILED,
    WFH_VERIFY_CHECK_IN_OUT_SUCCESS,


} from '../../actions/home/homeActions';

import { POPUP_CALL_RESET_ALL_REDUCERS } from '../../actions/actionTypes'
const initialState = {
    fetchingRegistryDeviceGPS: false,
    dataRegistryDeviceGPS: undefined,
    errorRegistryDeviceGPS: undefined,


    fetchingRequester: false,
    dataRequester: undefined,
    errorRequester: undefined,

    fetchingWifiVerify: false,
    dataWifiVerify: undefined,
    errorWifiVerify: undefined,

    fetchingWifiInfoCheckInOutInDay: false,
    dataWifiInfoCheckInOutInDay: undefined,
    errorWifiInfoCheckInOutInDay: undefined,

    fetchingRequestCaptureCheckInOut: false,
    dataRequestCaptureCheckInOut: undefined,
    errorRequestCaptureCheckInOut: undefined,


    fetchingRegistryDevice: false,
    dataRegistryDevice: undefined,
    errorRegistryDevice: undefined,

    fetchingGetUser2: false,
    dataGetUser2: undefined,
    errorGetUser2: undefined,


    //check in out wfh 

    fetchingWFHVerify: false,
    dataWFHVerify: undefined,
    errorWFHVerify: undefined,

    fetchingWFHInfoCheckInOutInDay: false,
    dataWFHInfoCheckInOutInDay: undefined,
    errorWFHInfoCheckInOutInDay: undefined,

    fetchingWFHRequestCaptureCheckInOut: false,
    dataWFHRequestCaptureCheckInOut: undefined,
    errorWFHRequestCaptureCheckInOut: undefined,

}

const homeReducers = (state = initialState, action) => {

    switch (action.type) {
        case GET_USER_2_ACTION:
            return Object.assign({}, state, {
                fetchingGetUser2: true,
                dataGetUser2: undefined,
                errorGetUser2: undefined
            })

        case GET_USER_2_ACTION_SUCCESS:
            return Object.assign({}, state, {
                fetchingGetUser2: false,
                dataGetUser2: action.data,
                errorGetUser2: undefined
            })

        case GET_USER_2_ACTION_FAILED:
            return Object.assign({}, state, {
                fetchingGetUser2: false,
                dataGetUser2: undefined,
                errorGetUser2: action.error
            })

        // 

        case GET_WF_REQUESTER:
            return Object.assign({}, state, {
                fetchingRequester: true,
                dataRequester: undefined,
                errorRequester: undefined
            })

        case GET_WF_REQUESTER_SUCCESS:
            return Object.assign({}, state, {
                fetchingRequester: false,
                dataRequester: action.data,
                errorRequester: undefined
            })

        case GET_WF_REQUESTER_FAILED:
            return Object.assign({}, state, {
                fetchingRequester: false,
                dataRequester: undefined,
                errorRequester: action.error
            })

        // 
        case WIFI_VERIFY_CHECK_IN_OUT:
            return Object.assign({}, state, {
                fetchingWifiVerify: true,
                dataWifiVerify: undefined,
                errorWifiVerify: undefined
            })

        case WIFI_VERIFY_CHECK_IN_OUT_SUCCESS:
            return Object.assign({}, state, {
                fetchingWifiVerify: false,
                dataWifiVerify: action.data,
                errorWifiVerify: undefined
            })

        case WIFI_VERIFY_CHECK_IN_OUT_FAILED:
            return Object.assign({}, state, {
                fetchingWifiVerify: false,
                dataWifiVerify: undefined,
                errorWifiVerify: action.error
            })

        // 
        case GET_INFO_CHECK_IN_OUT_IN_DAY:
            return Object.assign({}, state, {
                fetchingWifiInfoCheckInOutInDay: true,
                dataWifiInfoCheckInOutInDay: undefined,
                errorWifiInfoCheckInOutInDay: undefined
            })

        case GET_INFO_CHECK_IN_OUT_IN_DAY_SUCCESS:
            return Object.assign({}, state, {
                fetchingWifiInfoCheckInOutInDay: false,
                dataWifiInfoCheckInOutInDay: action.data,
                errorWifiInfoCheckInOutInDay: undefined
            })

        case GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED:
            return Object.assign({}, state, {
                fetchingWifiInfoCheckInOutInDay: false,
                dataWifiInfoCheckInOutInDay: undefined,
                errorWifiInfoCheckInOutInDay: action.error
            })


        // 
        case REQUEST_CAPTURE_CHECK_IN_OUT_ACTION:
            return Object.assign({}, state, {
                fetchingRequestCaptureCheckInOut: true,
                dataRequestCaptureCheckInOut: undefined,
                errorRequestCaptureCheckInOut: undefined
            })

        case REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_SUCCESS:
            return Object.assign({}, state, {
                fetchingRequestCaptureCheckInOut: false,
                dataRequestCaptureCheckInOut: action.data,
                errorRequestCaptureCheckInOut: undefined
            })

        case REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED:
            return Object.assign({}, state, {
                fetchingRequestCaptureCheckInOut: false,
                dataRequestCaptureCheckInOut: undefined,
                errorRequestCaptureCheckInOut: action.error
            })
        // 
        case REGISTRY_DEVICE_ACTION:
            return Object.assign({}, state, {
                fetchingRegistryDevice: true,
                dataRegistryDevice: undefined,
                errorRegistryDevice: undefined
            })

        case REGISTRY_DEVICE_ACTION_SUCCESS:
            return Object.assign({}, state, {
                fetchingRegistryDevice: false,
                dataRegistryDevice: action.data,
                errorRegistryDevice: undefined
            })

        case REGISTRY_DEVICE_ACTION_FAILED:
            return Object.assign({}, state, {
                fetchingRegistryDevice: false,
                dataRegistryDevice: undefined,
                errorRegistryDevice: action.error
            })

        //

        case REGISTRY_DEVICE_GPS_ACTION:
            return Object.assign({}, state, {
                fetchingRegistryDeviceGPS: true,
                dataRegistryDeviceGPS: undefined,
                errorRegistryDeviceGPS: undefined
            })

        case REGISTRY_DEVICE_GPS_ACTION_SUCCESS:
            return Object.assign({}, state, {
                fetchingRegistryDeviceGPS: false,
                dataRegistryDeviceGPS: action.data,
                errorRegistryDeviceGPS: undefined
            })

        case REGISTRY_DEVICE_GPS_ACTION_FAILED:
            return Object.assign({}, state, {
                fetchingRegistryDeviceGPS: false,
                dataRegistryDeviceGPS: undefined,
                errorRegistryDeviceGPS: action.error
            })


        //Check in out WFH
        case WFH_GET_INFO_CHECK_IN_OUT_IN_DAY:
            return Object.assign({}, state, {
                fetchingWFHInfoCheckInOutInDay: true,
                dataWFHInfoCheckInOutInDay: undefined,
                errorWFHInfoCheckInOutInDay: undefined,
            })

        case WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_SUCCESS:
            return Object.assign({}, state, {

                fetchingWFHInfoCheckInOutInDay: false,
                dataWFHInfoCheckInOutInDay: action.data,
                errorWFHInfoCheckInOutInDay: undefined,
            })

        case WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED:
            return Object.assign({}, state, {

                fetchingWFHInfoCheckInOutInDay: false,
                dataWFHInfoCheckInOutInDay: undefined,
                errorWFHInfoCheckInOutInDay: action.error,
            })

        case WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION:
            return Object.assign({}, state, {
                fetchingWFHRequestCaptureCheckInOut: true,
                dataWFHRequestCaptureCheckInOut: undefined,
                errorWFHRequestCaptureCheckInOut: undefined,
            })

        case WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_SUCCESS:
            return Object.assign({}, state, {
                fetchingWFHRequestCaptureCheckInOut: false,
                dataWFHRequestCaptureCheckInOut: action.data,
                errorWFHRequestCaptureCheckInOut: undefined,
            })

        case WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED:
            return Object.assign({}, state, {
                fetchingWFHRequestCaptureCheckInOut: false,
                dataWFHRequestCaptureCheckInOut: undefined,
                errorWFHRequestCaptureCheckInOut: action.error,
            })
        case WFH_VERIFY_CHECK_IN_OUT:
            return Object.assign({}, state, {
                fetchingWFHVerify: true,
                dataWFHVerify: undefined,
                errorWFHVerify: undefined,
            })

        case WFH_VERIFY_CHECK_IN_OUT_SUCCESS:
            return Object.assign({}, state, {
                fetchingWFHVerify: false,
                dataWFHVerify: action.data,
                errorWFHVerify: undefined,
            })

        case WFH_VERIFY_CHECK_IN_OUT_FAILED:
            return Object.assign({}, state, {
                fetchingWFHVerify: false,
                dataWFHVerify: undefined,
                errorWFHVerify: action.error,
            })

        case POPUP_CALL_RESET_ALL_REDUCERS:
            return Object.assign({}, state, {
                fetchingRequester: false,
                dataRequester: undefined,
                errorRequester: undefined,

                fetchingWifiVerify: false,
                dataWifiVerify: undefined,
                errorWifiVerify: undefined,

                fetchingWifiInfoCheckInOutInDay: false,
                dataWifiInfoCheckInOutInDay: undefined,
                errorWifiInfoCheckInOutInDay: undefined,

                fetchingRequestCaptureCheckInOut: false,
                dataRequestCaptureCheckInOut: undefined,
                errorRequestCaptureCheckInOut: undefined,


                fetchingRegistryDevice: false,
                dataRegistryDevice: undefined,
                errorRegistryDevice: undefined,

                fetchingGetUser2: false,
                dataGetUser2: undefined,
                errorGetUser2: undefined,


                fetchingWFHVerify: false,
                dataWFHVerify: undefined,
                errorWFHVerify: undefined,

                fetchingWFHInfoCheckInOutInDay: false,
                dataWFHInfoCheckInOutInDay: undefined,
                errorWFHInfoCheckInOutInDay: undefined,

                fetchingWFHRequestCaptureCheckInOut: false,
                dataWFHRequestCaptureCheckInOut: undefined,
                errorWFHRequestCaptureCheckInOut: undefined,
            })

        default:
            return state;
    }
}

export default homeReducers;
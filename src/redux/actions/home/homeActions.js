
export const GET_WF_REQUESTER = 'GET_WF_REQUESTER'
export const GET_WF_REQUESTER_SUCCESS = 'GET_WF_REQUESTER_SUCCESS'
export const GET_WF_REQUESTER_FAILED = 'GET_WF_REQUESTER_FAILED'

// Check in out WIFI
export const WIFI_VERIFY_CHECK_IN_OUT = 'WIFI_VERIFY_CHECK_IN_OUT'
export const WIFI_VERIFY_CHECK_IN_OUT_SUCCESS = 'WIFI_VERIFY_CHECK_IN_OUT_SUCCESS'
export const WIFI_VERIFY_CHECK_IN_OUT_FAILED = 'WIFI_VERIFY_CHECK_IN_OUT_FAILED'

export const GET_INFO_CHECK_IN_OUT_IN_DAY = 'GET_INFO_CHECK_IN_OUT_IN_DAY'
export const GET_INFO_CHECK_IN_OUT_IN_DAY_SUCCESS = 'GET_INFO_CHECK_IN_OUT_IN_DAY_SUCCESS'
export const GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED = 'GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED'

export const REQUEST_CAPTURE_CHECK_IN_OUT_ACTION = 'REQUEST_CAPTURE_CHECK_IN_OUT_ACTION'
export const REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_SUCCESS = 'REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_SUCCESS'
export const REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED = 'REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED'

export const REGISTRY_DEVICE_ACTION = 'REGISTRY_DEVICE_ACTION'
export const REGISTRY_DEVICE_ACTION_SUCCESS = 'REGISTRY_DEVICE_ACTION_SUCCESS'
export const REGISTRY_DEVICE_ACTION_FAILED = 'REGISTRY_DEVICE_ACTION_FAILED'

// Check in out WFH

export const WFH_VERIFY_CHECK_IN_OUT = 'WFH_VERIFY_CHECK_IN_OUT'
export const WFH_VERIFY_CHECK_IN_OUT_SUCCESS = 'WFH_VERIFY_CHECK_IN_OUT_SUCCESS'
export const WFH_VERIFY_CHECK_IN_OUT_FAILED = 'WFH_VERIFY_CHECK_IN_OUT_FAILED'


export const WFH_GET_INFO_CHECK_IN_OUT_IN_DAY = 'WFH_GET_INFO_CHECK_IN_OUT_IN_DAY'
export const WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_SUCCESS = 'WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_SUCCESS'
export const WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED = 'WFH_GET_INFO_CHECK_IN_OUT_IN_DAY_FAILED'


export const WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION = 'WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION'
export const WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_SUCCESS = 'WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_SUCCESS'
export const WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED = 'WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION_FAILED'



export const REGISTRY_DEVICE_GPS_ACTION = 'REGISTRY_DEVICE_GPS_ACTION'
export const REGISTRY_DEVICE_GPS_ACTION_SUCCESS = 'REGISTRY_DEVICE_GPS_ACTION_SUCCESS'
export const REGISTRY_DEVICE_GPS_ACTION_FAILED = 'REGISTRY_DEVICE_GPS_ACTION_FAILED'
export const RESET_REGISTRY_DEVICE_GPS_ACTION = 'RESET_REGISTRY_DEVICE_GPS_ACTION'



// Get Home Infomation



export const GET_USER_2_ACTION = 'GET_USER_2_ACTION'
export const GET_USER_2_ACTION_SUCCESS = 'GET_USER_2_ACTION_SUCCESS'
export const GET_USER_2_ACTION_FAILED = 'GET_USER_2_ACTION_FAILED'


export const registryDeviceGPSAction = (input) => {
    return {
        type: REGISTRY_DEVICE_GPS_ACTION,
        input
    }
}

export const resetRegistryDeviceGPSAction = () => {
    return {
        type: RESET_REGISTRY_DEVICE_GPS_ACTION,
    }
}



export const getUser2Action = () => {
    return {
        type: GET_USER_2_ACTION
    }
}

export const getWFRequesterAction = () => {
    return {
        type: GET_WF_REQUESTER
    }
}

export const getInfoCheckInOutInDayAction = (input) => {
    return {
        type: GET_INFO_CHECK_IN_OUT_IN_DAY,
        input
    }
}


export const requestCaptureCheckInOutAction = (input) => {
    return {
        type: REQUEST_CAPTURE_CHECK_IN_OUT_ACTION,
        input
    }
}

export const wifiVerifyCheckInOutAction = (input) => {
    return {
        type: WIFI_VERIFY_CHECK_IN_OUT,
        input
    }
}

export const registryDeviceAction = (input) => {
    return {
        type: REGISTRY_DEVICE_ACTION,
        input
    }
}

// Check in out WFH
export const wfhVerifyCheckInOutAction = (input) => {
    return {
        type: WFH_VERIFY_CHECK_IN_OUT,
        input
    }
}


export const getWFHInfoCheckInOutInDayAction = (input) => {
    return {
        type: WFH_GET_INFO_CHECK_IN_OUT_IN_DAY,
        input
    }
}


export const wfhRequestCaptureCheckInOutAction = (input) => {
    return {
        type: WFH_REQUEST_CAPTURE_CHECK_IN_OUT_ACTION,
        input
    }
}
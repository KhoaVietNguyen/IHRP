
import { API_IHRP_DEV, errorConnectServer, userProfile } from '../../../../config/settings'

export function getUser2Api() {

    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        OS: userProfile.OS
    }
    return fetch(API_IHRP_DEV + "custom/getuser2", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchGetUser2Api: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}


export function getWFRequesterApi() {

    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion
    }
    return fetch(API_IHRP_DEV + "workflow/requester/list", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchApiWFRequester: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}


export function wifiVerifyCheckInOutApi(input) {

    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        DataHeader: input,
        OS: userProfile.OS,
    }
    return fetch(API_IHRP_DEV + "ioapp2/verify", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchWifiVerifyCheckInOutApi: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}



export function getInfoCheckInOutInDayApi(input) {
    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        DataHeader: input
    }

    return fetch(API_IHRP_DEV + "ioapp2/view", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchGetInfoCheckInOutInDayApi: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}


export function requestCaptureCheckInOutApi(input) {

    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        OS: userProfile.OS,
        DataHeader: input
    }
    console.warn('requestCaptureCheckInOutApi - input: ', input)
    return fetch(API_IHRP_DEV + "ioapp2/capture", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchRequestCaptureCheckInOutApiApi: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}


export function registryDeviceApi(input) {

    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        OS: userProfile.OS,
        DataHeader: input
    }
    return fetch(API_IHRP_DEV + "ioapp2/registry", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchRegisterDeviceApi: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}


export function registryDeviceGPSApi(input) {
    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        OS: userProfile.OS,
        DataHeader: input
    }
    return fetch(API_IHRP_DEV + "gps/registry", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchRegistryDeviceGPSApi: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}


// Check in out WFH



export function wfhVerifyCheckInOutApi(input) {

    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        DataHeader: input,
        OS: userProfile.OS,
    }
    return fetch(API_IHRP_DEV + "ioapp1/verify", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchWFHVerifyCheckInOutApi: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}



export function getWFHInfoCheckInOutInDayApi(input) {
    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        DataHeader: input
    }

    return fetch(API_IHRP_DEV + "ioapp1/view", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchGetWFHInfoCheckInOutInDayApi: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}


export function wfhRequestCaptureCheckInOutApi(input) {

    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        OS: userProfile.OS,
        DataHeader: input
    }
    // console.warn('requestCaptureCheckInOutApi - input: ', input)
    return fetch(API_IHRP_DEV + "ioapp1/capture", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchWFHRequestCaptureCheckInOutApi: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}

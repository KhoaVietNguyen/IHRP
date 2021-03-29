import { userProfile, errorConnectServer, API_IHRP_DEV } from '../../../config/settings'
export function applicationApprovalApi(input) {
    // input.type có 4 trường hợp 
    // 1 : Gọi api duyệt đơn nghỉ phép    
    // 2 : Gọi api duyệt đơn làm ngoài giờ (OT)
    // 3 : Gọi api duyệt đơn xác nhận quẹt thẻ (Log TMS)
    // 4 : Gọi api duyệt đơn đi công tác
    // 5 : Gọi api duyệt đơn check in/out GPS
    console.log('input - applicationApprovalApi: ', input)
    let type = input.type
    let api = ''
    if (type === 1) {
        api = 'workflow1/approver/update'
    } else if (type === 2) {
        api = 'workflow2/approver/update'
    } else if (type === 3) {
        api = 'workflow3/approver/update'
    } else if (type === 4) {
        api = 'workflow4/approver/update'
    } else if (type === 5) {
        api = 'ioapp/confirm/update'
    } else {
        return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
    }
    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        DataItem: input.DataItem
    }
    return fetch(API_IHRP_DEV + api, {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchApplicationApprovalApi: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}


export function getListCheckInOutGPSApplication(input) {
    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        DataHeader: input.DataHeader,
        OS: userProfile.OS,
    }
    return fetch(API_IHRP_DEV + 'gps/confirm/find', {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('catch - getListCheckInOutGPSApplication - error: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}
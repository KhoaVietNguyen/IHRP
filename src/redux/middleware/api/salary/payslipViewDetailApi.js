//MinhNC15

import { API_IHRP_DEV, errorConnectServer, userProfile } from '../../../../config/settings'


export function getPayslipViewDetailApi(data) {
    // console.log("Data", data)
    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        DataHeader: [{F: data.F, F1: data.F1}]
    }
    return fetch(API_IHRP_DEV + "private/property/payslip/view", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchApiPayslipViewDetail: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}

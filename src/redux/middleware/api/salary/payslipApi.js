//MinhNC15

import { API_IHRP_DEV, errorConnectServer, userProfile } from '../../../../config/settings'


export function getPayslipApi(data) {

    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion
    }
    return fetch(API_IHRP_DEV + "private/property/payslip/list", {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchApiPayslip: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}

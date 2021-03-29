//MinhNC15

import { API_IHRP_DEV, errorConnectServer, userProfile } from '../../../../config/settings'


export function getSalaryHistoryApi(data) {
    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        DataHeader: [{F: data.F}]
    }
    return fetch(API_IHRP_DEV + "private/property/view", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchApiSalaryHistory: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}

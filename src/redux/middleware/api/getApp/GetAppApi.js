//MinhNC15

import { API_IHRP_DEV, errorConnectServer, userProfile, getAppData } from '../../../../config/settings'

export function postGetApp(data) {
    const { LangID, OS, AppVersion } = data
    const bodyJson = {
        LangID: LangID,
        OS: OS,
        AppVersion: AppVersion
    }
    return fetch(API_IHRP_DEV + "custom/getapp", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchApiGetApp: ', error)
            return { commit: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}

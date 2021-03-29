
import { API_IHRP_DEV, errorConnectServer, userProfile } from '../../../config/settings'

export function deleteTokenNotiApi() {
    console.log('deleteTokenNoti - userProfile: ', userProfile)
    const bodyJson = {
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        DataHeader: [{
            DeviceID: userProfile.deviceID,
            DeviceNoti: userProfile.tokenNoti
        }]
    }
    console.log('deleteTokenNoti - bodyJSON: ', bodyJson)
    return fetch(API_IHRP_DEV + "notification/disable", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchDeleteTokenNotiApi: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}

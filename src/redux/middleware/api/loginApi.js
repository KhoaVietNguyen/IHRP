
import { API_IHRP_DEV, errorConnectServer, userProfile } from '../../../config/settings'

export function postLogin(data) {
    const { username, Password, OS, DeviceID, Version, LangID, DeviceNoti, DeviceName } = data
    const bodyJson = {
        username: username,
        Password: Password,
        OS: OS,
        DeviceID: DeviceID,
        Version: Version,
        LangID: LangID,
        DeviceNoti: DeviceNoti,
        DeviceName: DeviceName
    }
    return fetch(API_IHRP_DEV + "login", {
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify(bodyJson)
    })
        .then((response) => response.json())
        .catch((error) => {
            console.log('errorCatchApiLogin: ', error)
            return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
        })
}

import {
    API_IHRP_DEV,
    errorConnectServer,
    userProfile,
} from '../../../../config/settings';

export function uploadAvatarApi(input) {
    return fetch(API_IHRP_DEV + '/private/uploadAvatar', {
        method: 'POST',
        headers:userProfile.configApp,
        body: JSON.stringify({
            Stoken: userProfile.Stoken,
            AppVersion: userProfile.AppVersion,
            LangID: userProfile.LangID,
            DataHeader: input,
        }),
    })
        .then((response) => {
            return response.json();
        })
        .catch((error) => {
            console.log('CatchUploadAvatarApi', error);
            return {
                code: -1,
                message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en
            };
        });
}
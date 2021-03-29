import {
    API_IHRP_DEV,
    errorConnectServer,
    userProfile,
  } from '../../../../config/settings';
  
  
  
  export function sendAccountForgotPasswordApi(input) {
    const bodyJson = {
      Stoken: userProfile.Stoken,
      LangID: userProfile.LangID,
      AppVersion: userProfile.AppVersion,
      DataHeader: input,
    };
    return fetch(API_IHRP_DEV + 'employee/account/send', {
      method: 'POST',
      headers: userProfile.configApp,
      body: JSON.stringify(bodyJson),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log('errorCatchAttachFileApi: ', error);
        return {
          code: false,
          message:
            userProfile.LangID === 'VN'
              ? errorConnectServer.vn
              : errorConnectServer.en,
        };
      });
  }
  
  export function sendCodeVerifyForgotPasswordApi(input) {
    const bodyJson = {
      Stoken: userProfile.Stoken,
      LangID: userProfile.LangID,
      AppVersion: userProfile.AppVersion,
      DataHeader: input,
    };
    return fetch(API_IHRP_DEV + 'employee/account/verify', {
      method: 'POST',
      headers: userProfile.configApp,
      body: JSON.stringify(bodyJson),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log('errorCatchAttachFileApi: ', error);
        return {
          code: false,
          message:
            userProfile.LangID === 'VN'
              ? errorConnectServer.vn
              : errorConnectServer.en,
        };
      });
  }
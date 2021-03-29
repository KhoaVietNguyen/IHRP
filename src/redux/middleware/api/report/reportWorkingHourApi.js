import {
  API_IHRP_DEV,
  errorConnectServer,
  userProfile,
} from '../../../../config/settings';

export function reportWorkingHourApi(data) {
    const{FromDate,ToDate}=data
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: [
      {
        FromDate: FromDate,
        ToDate:ToDate,
      },
    ],
  };
  return fetch(API_IHRP_DEV + 'topic/report/WorkingHours', {
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

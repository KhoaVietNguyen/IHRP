import {
  API_IHRP_DEV,
  errorConnectServer,
  userProfile,
} from '../../../config/settings';
const WORKFLOW1 = 'workflow1/view/history';
const WORKFLOW2 = 'workflow2/view/history';
const WORKFLOW3 = 'workflow3/view/history';
const WORKFLOW4 = 'workflow4/view/history';

function getTypeApi(type) {
  switch (type) {
    case 1:
      return WORKFLOW1;
    case 2:
      return WORKFLOW2;
    case 3:
      return WORKFLOW3;
    case 4:
      return WORKFLOW4;
  }
}

export function getApplicationHistoryApi(input) {
  const {id, type} = input;
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: [{ID: id}],
  };
  console.log("getApplicationHistoryApi", id, type)
  return fetch(API_IHRP_DEV + getTypeApi(type), {
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

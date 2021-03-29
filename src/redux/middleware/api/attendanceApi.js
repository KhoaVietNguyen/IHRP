//PhucNT34
import {
  API_IHRP_DEV,
  errorConnectServer,
  userProfile,
} from '../../../config/settings';

//------------------------Notification--------------------------------//


export function notificationMarkApi(input) {

  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input
  }
  return fetch(API_IHRP_DEV + "notification/log/mark", {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson)
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchNotificationMarkApi: ', error)
      return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
    })
}

export function notificationApi(input) {
  return fetch(API_IHRP_DEV + 'notification/log/list', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify({
      Stoken: userProfile.Stoken,
      LangID: userProfile.LangID,
      AppVersion: userProfile.AppVersion
    }),
  })
    .then((responese) => responese.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}
export function notificationDetailApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'notification/log/view', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('ErrorCatchNotificationDetailApi: ', error)
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

//------------------------Calendars--------------------------------//
export function getHistoryCalendarsCheckInOutInMonthApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'wifi/list', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function getWFHInfoCheckInOutInMonthApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input
  }

  return fetch(API_IHRP_DEV + "ioapp1/list", {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson)
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetWFHInfoCheckInOutInMonthApi: ', error)
      return { code: false, message: userProfile.LangID === 'VN' ? errorConnectServer.vn : errorConnectServer.en }
    })
}


//------------------------ApproveApplication--------------------------------//
export function waitingListForApprovalApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataItem: input,
  };
  console.log('body', bodyJson)
  return fetch(API_IHRP_DEV + 'workflow/approver/wait', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => {
      console.log('response API WAIT', response)
      return response.json()
    })
    .then((result) => {
      console.log('result API WAIT', result)
      return result
    })
    .catch((error) => {
      console.log('error api: ', error)
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function getHistoryOfApprovalMenuListApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataItem: input,
  };
  console.log('body', bodyJson)
  return fetch(API_IHRP_DEV + 'workflow/approver/history', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => {
      console.log('response API HISTORY', response)
      return response.json()
    })
    .then((result) => {
      console.log('result API HISTORY', result)
      return result
    })
    .catch((error) => {
      console.log('error API HISTORY: ', error)
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}
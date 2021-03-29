import {
  API_IHRP_DEV,
  errorConnectServer,
  userProfile,
} from '../../../config/settings';




// ----------> Attach File Application

export function attachFileApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  // console.log('attachFileApplicationApi  : ', bodyJson)
  return fetch(API_IHRP_DEV + 'file/workflow/upload', {
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

export function workflowDowloadFileApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  // console.log('bodyJsonDownloadFile: ', bodyJson);
  return fetch(API_IHRP_DEV + 'file/workflow/download', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchWorkflowDowloadFileApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

// ----------> Leave Application
export function getWorkflow1ListApi(F, F1) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: [
      {
        F: F,
        F1: F1,
      },
    ],
  };
  return fetch(API_IHRP_DEV + 'workflow1/list', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchApiLogin: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function calculateApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: [input],
  };
  return fetch(API_IHRP_DEV + 'workflow1/calculate', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchApiLogin: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function getTimesLeaveApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: [input],
  };
  return fetch(API_IHRP_DEV + 'workflow1/requester/getTimes', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetTimesApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function getDaysLeaveApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: [input],
  };
  return fetch(API_IHRP_DEV + 'workflow1/requester/getDays', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetDaysApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function saveDaysLeaveApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input.DataHeader,
    DataItem: input.DataItem,
  };
  return fetch(API_IHRP_DEV + 'workflow1/requester/saveDays', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchSaveDaysApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function createLeaveApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow1/requester/create', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchCreateLeaveApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function searchLeaveApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow1/requester/find', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchSearchLeaveApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function getDetailLeaveApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow1/view/application', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetDetailLeaveApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function updateLeaveApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow1/requester/update', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchUpdateLeaveApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function deleteLeaveApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataItem: input,
  };
  return fetch(API_IHRP_DEV + 'workflow1/requester/delete', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchDeleteLeaveApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function searchApprovedLeaveApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow1/man/find', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchSearchApprovedLeaveApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

// ----------> Business Trip Application

export function getWF4ListBusinessTripApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow4/list', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchWF4ListBusinessTripApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function calculateBusinessTripApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow4/view/calculate', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchCalculateBusinessTripApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function saveBusinessTripApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow4/requester/save', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchSaveBusinessTripApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function searchBusinessTripApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow4/requester/find', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchFindBusinessTripApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function getDetailBusinessTripApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow4/view/application', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetDetailBusinessTripApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function withDrawBusinessTripApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow4/requester/withdraw', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchWithDrawBusinessTripApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function deleteBusinessTripApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow4/requester/delete', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchDeleteBusinessTripApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function searchApprovedBusinessTripApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow4/man/find', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchSearchApprovedBusinessTripApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

// --------------> Over Time Application

export function getDateInfoOverTimeApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow2/view/info', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetDateInfoOverTimeApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function getApproverOverTimeApplicationApi() {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
  };
  return fetch(API_IHRP_DEV + 'workflow2/view/approver', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetApproverOverTimeApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function calculateOverTimeApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow2/view/calculate', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetCalculateOverTimeApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function saveOverTimeApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow2/requester/save', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetSaveOverTimeApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function searchOverTimeApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow2/requester/find', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetSearchOverTimeApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function getWorkflow2ListApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow2/list', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetWorkflow2ListOverTimeApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function getDetailOverTimeApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow2/view/application', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetDetailOverTimeApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function withDrawOverTimeApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow2/requester/withdraw', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchWithDrawOverTimeApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function deleteOverTimeApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow2/requester/delete', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchDeleteOverTimeApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function searchApprovedOverTimeApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow2/man/find', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetSearchApprovedOverTimeApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

// --------------> Log TMS Application

export function getWorkflow3ListApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow3/list', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetGetWorkflow3ListLogTMSApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function searchLogTMSApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow3/requester/find', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetSearchLogTMSApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function getDetailLogTMSApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow3/view/application', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetDetailLogTMSApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function withDrawLogTMSApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow3/requester/withdraw', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchWithDrawLogTMSApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function deleteLogTMSApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow3/requester/delete', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchDeleteLogTMSApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function saveLogTMSApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow3/requester/save', {
    method: 'POST',
    headers:userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchSaveLogTMSApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

export function searchApprovedLogTMSApplicationApi(input) {
  const bodyJson = {
    Stoken: userProfile.Stoken,
    LangID: userProfile.LangID,
    AppVersion: userProfile.AppVersion,
    DataHeader: input,
  };
  return fetch(API_IHRP_DEV + 'workflow3/man/find', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify(bodyJson),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log('errorCatchGetSearchApprovedLogTMSApplicationApi: ', error);
      return {
        code: false,
        message:
          userProfile.LangID === 'VN'
            ? errorConnectServer.vn
            : errorConnectServer.en,
      };
    });
}

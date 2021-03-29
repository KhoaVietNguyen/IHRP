import {
  API_IHRP_DEV,
  errorConnectServer,
  userProfile,
} from '../../../../config/settings';

export function getDashBoardFormApi(data) {
  // console.log("DashBoardView1 API", data)
  return fetch(API_IHRP_DEV + 'topic/find', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify({
      Stoken: userProfile.Stoken,
      LangID: userProfile.LangID,
      AppVersion: userProfile.AppVersion,
      "DataHeader": [{"F": 1}]
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.warn('--->', error);
      return {code: -1, message: 'Khong ket noi duoc server!'};
    });
}

export function getDashBoardView1Api(data) {
  // console.log("DashBoardView1 API", data)
  return fetch(API_IHRP_DEV + 'topic/view1', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify({
      Stoken: userProfile.Stoken,
      LangID: userProfile.LangID,
      AppVersion: userProfile.AppVersion,
      "DataHeader": [{"ID": data}]
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.warn('--->', error);
      return {code: -1, message: 'Khong ket noi duoc server!'};
    });
}

export function getDashBoardView2Api(data) {
    //  console.log("DashBoardView2 API AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaa", data)
    return fetch(API_IHRP_DEV + 'topic/view2', {
      method: 'POST',
      headers: userProfile.configApp,
      body: JSON.stringify({
        Stoken: userProfile.Stoken,
        LangID: userProfile.LangID,
        AppVersion: userProfile.AppVersion,
        "DataHeader": [{"ID":data}]
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.warn('--->', error);
        return {code: -1, message: 'Khong ket noi duoc server!'};
      });
  }
import {
  API_IHRP_DEV,
  errorConnectServer,
  userProfile,
} from '../../../../config/settings';
let count=0

export function getPersonalList(data) {
  
  // console.log("PersonList API", data)
  return fetch(API_IHRP_DEV + 'private/property/allow', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify({
      Stoken: userProfile.Stoken,
      LangID: userProfile.LangID,
      AppVersion: userProfile.AppVersion,
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

export function getPersonalProfile(data) {
  
  // console.log("PersonProfile API", data)
  return fetch(API_IHRP_DEV + 'private/profile', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify({
      Stoken: userProfile.Stoken,
      LangID:userProfile.LangID,
      AppVersion: userProfile.AppVersion,
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

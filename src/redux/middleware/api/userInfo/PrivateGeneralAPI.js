import { API_IHRP_DEV, errorConnectServer, userProfile } from '../../../../config/settings'


export function getPrivateGeneral(data) {

  // console.log("PrivateGeneral API", data)
  return fetch(API_IHRP_DEV + 'private/property/general', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify({
      "Stoken": userProfile.Stoken,
      LangID: userProfile.LangID,
      "AppVersion": userProfile.AppVersion
    })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.warn('--->', error);
      return { code: -1, message: 'Khong ket noi duoc server!' };
    });
}

export function submitPrivateGeneralAPI(data) {
  // console.log("PrivateGeneral API", data)
  return fetch(API_IHRP_DEV + 'private/edit/submit', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify({
      "Stoken": userProfile.Stoken,
      LangID: userProfile.LangID,
      "AppVersion": userProfile.AppVersion
    })
  })
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.warn('--->', error);
      return { code: -1, message: 'Khong ket noi duoc server!' };
    });
}


import {
  API_IHRP_DEV,
  errorConnectServer,
  userProfile,
} from '../../../../config/settings';

export function getPrivateView(data) {

  // console.log('PersonList API', data);
  return fetch(API_IHRP_DEV + '/private/property/view', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify({
      Stoken: userProfile.Stoken,
      AppVersion: userProfile.AppVersion,
      LangID: userProfile.LangID,
      DataHeader: [{F: data}],
    }),
  })
    .then((response) => {
      // console.log("Get Course"+response.json())
      //console.log(response.json());
      return response.json();
    })
    .catch((error) => {
      console.warn('--->', error);
      return {code: -1, message: 'Khong ket noi duoc server!'};
    });
}

export function getPersonalFormList(data) {
  // console.log('PersonalFormList API', data);
  return fetch(API_IHRP_DEV + 'private/edit2/formlist', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify({
      Stoken: userProfile.Stoken,
      AppVersion: userProfile.AppVersion,
      LangID: userProfile.LangID,
      DataHeader: [{"InfoID": data}],
    }),
  })
    .then((response) => {
      // console.log("Get Course"+response.json())
      //console.log(response.json());
      return response.json();
    })
    .catch((error) => {
      console.warn('--->', error);
      return {code: 1, message: 'Khong lay duoc du lieu!'};
    });
}

export function getPrivateForm(data) {
  // console.log('PrivateForm', data);
  return fetch(API_IHRP_DEV + 'private/edit2/formdetail', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify({
      Stoken: userProfile.Stoken,
      AppVersion: userProfile.AppVersion,
      LangID: userProfile.LangID,
      "DataHeader": [{
        "InfoID": data.infoID,
        "RecordID": data.recordID
     }]
    }),
  })
    .then((response) => {
      // console.log("Get Course"+response.json())
      //console.log(response.json());
      return response.json();
    })
    .catch((error) => {
      console.warn('--->', error);
      return {code: 1, message: 'Khong lay duoc du lieu!'};
    });
}


export function getPrivateList(data) {
  // console.log('PrivateList', data);
  return fetch(API_IHRP_DEV + 'private/list', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify({
      Stoken: userProfile.Stoken,
      AppVersion: userProfile.AppVersion,
      LangID: userProfile.LangID,
      "DataHeader": [{"ID": data}]
    }),
  })
    .then((response) => {
      // console.log("Get Course"+response.json())
      //console.log(response.json());
      return response.json();
    })
    .catch((error) => {
      console.warn('--->', error);
      return {code: 1, message: 'Khong lay duoc du lieu!'};
    });
}

export function savePrivateForm(data) {
  // console.log('savePrivateForm', data);
  const {infoID, recordID,dataItem}= data
  return fetch(API_IHRP_DEV + 'private/edit2/save', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify({
      "DataHeader" : [
        {
          "infoID" : infoID,
          "recordID" : recordID,
        }
      ],
      "AppVersion" : userProfile.AppVersion,
      "OS" : "2",
      "DataItem" : dataItem,
      "Stoken" : userProfile.Stoken,
      "LangID" : userProfile.LangID
    }),
  })
    .then((response) => {
      // console.log("Get Course"+response.json())
      //console.log(response.json());
      return response.json();
    })
    .catch((error) => {
      console.warn('--->', error);
      return {code: 1, message: 'Khong lay duoc du lieu!'};
    });
}

export function deletePrivateForm(data) {
 
  const {infoID, recordID}= data
  return fetch(API_IHRP_DEV + 'private/edit2/delete', {
    method: 'POST',
    headers: userProfile.configApp,
    body: JSON.stringify({
      "DataHeader" : [
        {
          "infoID" : infoID,
          "recordID" : recordID,
        }
      ],
      "AppVersion" : userProfile.AppVersion,
      "OS" : "2",
      "Stoken" : userProfile.Stoken,
      "LangID" : userProfile.LangID
    }),
  })
    .then((response) => {
      // console.log("Get Course"+response.json())
      //console.log(response.json());
      return response.json();
    })
    .catch((error) => {
      console.warn('--->', error);
      return {code: 1, message: 'Khong lay duoc du lieu!'};
    });
}
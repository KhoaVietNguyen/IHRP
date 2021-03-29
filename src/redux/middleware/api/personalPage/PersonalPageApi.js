//PhucNT34
import { API_IHRP_DEV, errorConnectServer, userProfile } from '../../../../config/settings'

export function getPrivateGenViewApi(input){
    console.log(input)
    return fetch(API_IHRP_DEV + 'private/property/general/view',{
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify({
            "Stoken": userProfile.Stoken,
            "LangID": userProfile.LangID,
            "AppVersion": userProfile.AppVersion,
            "DataHeader": [{"F": input}]
        }),
    })
    .then(responese => responese.json())
    .then(responseJson => {
        // console.warn("getPrivateGenViewApi success",responseJson)
        return responseJson;
    })
    .catch(error => {
        // console.warn("notificationApi Error",error)
        return {
            commit: false,
            code: "-999",
            langID: userProfile.LangID,
            message: errorConnectServer.vn,
            countItem: 0,
            dataItem: null
        }
    })
}


export function getPersonalFormApi(input){
    return fetch(API_IHRP_DEV + 'private/edit/form',{
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify({
            "Stoken": userProfile.Stoken,
            "LangID": userProfile.LangID,
            "AppVersion": userProfile.AppVersion,
            "DataHeader": [{"ID": input}]
        }),
    })
    .then(responese => responese.json())
    .then(responseJson => {
        // console.warn("getPrivateGenViewApi success",responseJson)
        return responseJson;
    })
    .catch(error => {
        // console.warn("notificationApi Error",error)
        return {
            commit: false,
            code: "-999",
            langID: userProfile.LangID,
            message: errorConnectServer.vn,
            countItem: 0,
            dataItem: null
        }
    })
}

export function getPersonalFormSourceApi(input){
    console.log("Input",input)
    return fetch(API_IHRP_DEV + 'private/list',{
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify({
            "Stoken": userProfile.Stoken,
            "LangID": userProfile.LangID,
            "AppVersion": userProfile.AppVersion,
            "DataHeader": [{"ID": input.ID,"ParentID":input.ParentID}]
        }),
    })
    .then(responese => responese.json())
    .then(responseJson => {
        // console.warn("getPrivateGenViewApi success",responseJson)
        return responseJson;
    })
    .catch(error => {
        // console.warn("notificationApi Error",error)
        return {
            commit: false,
            code: "-999",
            langID: userProfile.LangID,
            message: errorConnectServer.vn,
            countItem: 0,
            dataItem: null
        }
    })
}


export function SavePersonalFormApi(input){
    console.log("Input",input)
    const {ID,ITEM}= input
    return fetch(API_IHRP_DEV + 'private/edit/save',{
        method: 'POST',
        headers: userProfile.configApp,
        body: JSON.stringify({
            "Stoken": userProfile.Stoken,
            "LangID": userProfile.LangID,
            "AppVersion": userProfile.AppVersion,
            "DataHeader": [{"ID": ID}],
            "DataItem":ITEM
        }),
    })
    .then(responese => responese.json())
    .then(responseJson => {
        // console.warn("getPrivateGenViewApi success",responseJson)
        return responseJson;
    })
    .catch(error => {
        // console.warn("notificationApi Error",error)
        return {
            commit: false,
            code: "-999",
            langID: userProfile.LangID,
            message: errorConnectServer.vn,
            countItem: 0,
            dataItem: null
        }
    })
}
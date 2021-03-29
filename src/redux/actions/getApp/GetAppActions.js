//MinhNC15

export const GET_APP = 'GET_APP';
export const GET_APP_SUCCESS = 'GET_APP_SUCCESS';
export const GET_APP_ERROR = 'GET_APP_ERROR';

export const getAppAction = data => {
    return {
        type: GET_APP,
        data
    }
}
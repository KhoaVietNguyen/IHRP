//MinhNC15

import {
  GET_APP,
  GET_APP_SUCCESS,
  GET_APP_ERROR,
} from '../../actions/getApp/GetAppActions';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
const initialState = {
  // commit: false,
  fetchingRequester: false,
  // dataRequester: {
  // //gia tri commit: false de khi run app dataRequester.commit trong Login.js co gia tri, tranh loi dataRequester.commit khong ton tai
  //     commit: false
  // },
  dataRequester: undefined,
  errorRequester: undefined,
};

const getAppReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_APP:
      // console.log('reducerAction: ', action)
      return Object.assign({}, state, {
        // commit: false,
        fetchingRequester: true,
        dataRequester: undefined,
        errorRequester: undefined,
      });

    case GET_APP_SUCCESS:
      // console.log('reducerActionSuccess: ', action)
      return Object.assign({}, state, {
        // commit: action.response.commit,
        fetchingRequester: false,
        dataRequester: action.response,
        errorRequester: undefined,
      });

    case GET_APP_ERROR:
      return Object.assign({}, state, {
        // commit: action.response.commit,
        fetchingRequester: false,
        dataRequester: undefined,
        errorRequester: action.error,
      });
    case POPUP_CALL_RESET_ALL_REDUCERS:
      return Object.assign({}, state, {
        fetchingRequester: false,
        dataRequester: undefined,
        errorRequester: undefined,
      });
    default:
      return state;
  }
};

export default getAppReducers;

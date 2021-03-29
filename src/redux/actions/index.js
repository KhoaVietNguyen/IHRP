//Linhtn23

import {
  INCREMENT,
  DECREMENT,
  POST_LOGIN,
  DID_LOGIN_ACTION,
  POPUP_POST_LOGIN_HIDE,
  POPUP_POST_LOGIN_SHOW,
  POPUP_POST_LOGIN,
  POPUP_CALL_RESET_ALL_REDUCERS,

  POPUP_ALERT,
  POPUP_ALERT_HIDE,
  POPUP_ALERT_SHOW,
  REPLACE_SCREEN_LOGIN,
  POPUP_UPDATE_APP_HIDE,
  POPUP_UPDATE_APP_SHOW,

  DELETE_TOKEN_NOTI_ACTION,
  DELETE_TOKEN_NOTI_ACTION_FAILED,
  DELETE_TOKEN_NOTI_ACTION_SUCCESS,
} from './actionTypes';
import { slateblue } from 'color-name';

export const increaseAction = (step) => {
  return {
    type: INCREMENT,
    step: step,
  };
};

export const onDidLogin = () => {
  return {
    type: DID_LOGIN_ACTION,
  };
};

export const decreaseAction = (step) => {
  return {
    type: DECREMENT,
    step: step,
  };
};

export const loginAction = (data) => {
  return {
    type: POST_LOGIN,
    data,
    // data: { username, Password, OS, DeviceID, Version, LangID }
  };
};

export const showPopupPostLoginAction = () => {
  return {
    type: POPUP_POST_LOGIN_SHOW,
  };
};

export const hidePopupPostLoginAction = () => {
  return {
    type: POPUP_POST_LOGIN_HIDE,
  };
};

export const popupPostLoginAction = (input) => {
  return {
    type: POPUP_POST_LOGIN,
    input,
    // data: { username, Password, OS, DeviceID, Version, LangID }
  };
};


export const onResetAllReducers = () => {
  return {
    type: POPUP_CALL_RESET_ALL_REDUCERS,
  };
};


export const popupAlertAction = (input) => {
  return {
    type: POPUP_ALERT,
    input
  };
};

export const onShowUpdateAppAction = () => {
  return {
    type: POPUP_UPDATE_APP_SHOW,
  };
};


export const replaceScreenLoginAction = (input) => {
  return {
    type: REPLACE_SCREEN_LOGIN,
    input
  };
};

export const deleteTokenNotiAction = () => {
  return {
    type: DELETE_TOKEN_NOTI_ACTION
  };
};







// let input = {
//   visible: true, // Trạng thái ẩn/ hiện (false/true) popup
//   message: 'Nội dung', // Nội dung của popup
//   typePopup: 'success', // Loại thông báo. success = Thành công = màu xanh lá | warning = Cảnh báo = màu vàng
//   typeTouch: 'single', // Loại button. single = hiển thị 1 button | double = hiển thị 2 button,
//   arrayTouch: [ // Danh sách thông tin của các nút bấm, typeTouch = single => array có 1 phần tử | typeTouch = double => array có 2 phần tử
//     {
//       title: 'Tên nút bấm',
//       onPress: () => {}
//     }
//   ]
// }



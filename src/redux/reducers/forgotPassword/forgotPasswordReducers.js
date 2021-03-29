import {
  SEND_CODE_VERIFY_FORGOT_PASSWORD_SUCCESS,
  SEND_CODE_VERIFY_FORGOT_PASSWORD_FAILED,
  SEND_CODE_VERIFY_FORGOT_PASSWORD,
  SEND_ACCOUNT_FORGOT_PASSWORD_SUCCESS,
  SEND_ACCOUNT_FORGOT_PASSWORD_FAILED,
  SEND_ACCOUNT_FORGOT_PASSWORD,
} from '../../actions/forgotPassword/forgotPasswordActions';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
const initialState = {
  fetchingSendAccount: false,
  dataSendAccount: undefined,
  errorSendAccount: undefined,

  fetchingSendCode: false,
  dataSendCode: undefined,
  errorSendCode: undefined,
};

const forgotPasswordReducers = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ACCOUNT_FORGOT_PASSWORD:
      return Object.assign({}, state, {
        fetchingSendAccount: true,
        dataSendAccount: undefined,
        errorSendAccount: undefined,
      });

    case SEND_ACCOUNT_FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        fetchingSendAccount: false,
        dataSendAccount: action.data,
        errorSendAccount: undefined,
      });

    case SEND_ACCOUNT_FORGOT_PASSWORD_FAILED:
      return Object.assign({}, state, {
        fetchingSendAccount: false,
        dataSendAccount: undefined,
        errorSendAccount: action.error,
      });

    case SEND_CODE_VERIFY_FORGOT_PASSWORD:
      return Object.assign({}, state, {
        fetchingSendCode: true,
        dataSendCode: undefined,
        errorSendCode: undefined,
      });

    case SEND_CODE_VERIFY_FORGOT_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        fetchingSendCode: false,
        dataSendCode: action.data,
        errorSendCode: undefined,
      });

    case SEND_CODE_VERIFY_FORGOT_PASSWORD_FAILED:
      return Object.assign({}, state, {
        fetchingSendCode: false,
        dataSendCode: undefined,
        errorSendCode: action.error,
      });

    case POPUP_CALL_RESET_ALL_REDUCERS:
      return Object.assign({}, state, {
        fetchingSendAccount: false,
        dataSendAccount: undefined,
        errorSendAccount: undefined,

        fetchingSendCode: false,
        dataSendCode: undefined,
        errorSendCode: undefined,
      });
    default:
      return state;
  }
};

export default forgotPasswordReducers;

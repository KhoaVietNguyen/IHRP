//PhucNT34
import {
  GET_PERSONAL_FORM,
  GET_PERSONAL_FORM_SUCCESS,
  GET_PERSONAL_FORM_ERROR,
  GET_PERSONAL_FORM_SOURCE,
  GET_PERSONAL_FORM_SOURCE_ERROR,
  GET_PERSONAL_FORM_SOURCE_SUCCESS,
  SAVE_PERSONAL_FORM,
  SAVE_PERSONAL_FORM_ERROR,
  SAVE_PERSONAL_FORM_SUCCESS,
} from '../../actions/personalPage/PersonalPageAction';
import {POPUP_CALL_RESET_ALL_REDUCERS} from '../../actions/actionTypes';
const initialState = {
  dataItem: null,
  error: null,
  loading: false,
};

export const getPersonalFormReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERSONAL_FORM:
      // console.warn('reducer 3', action.input);
      return {...state, loading: true};
    case GET_PERSONAL_FORM_SUCCESS:
      // console.warn('reducer 7', action.dataItem);
      return {...state, dataItem: action.dataItem, loading: false};
    case GET_PERSONAL_FORM_ERROR:
      // console.log('reducer 7', action.error);
      return {...state, error: action.error, loading: false};
      case POPUP_CALL_RESET_ALL_REDUCERS:
        // console.log('reducer 7', action.error);
        return {...state};
    default:
      return state;
  }
};

export const getPersonalFormSourceReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERSONAL_FORM_SOURCE:
      // console.warn('reducer 3', action.input);
      return {...state, loading: true, dataSource: null};
    case GET_PERSONAL_FORM_SOURCE_SUCCESS:
      // console.warn('reducer 7', action.dataItem);
      return {
        ...state,
        dataItem: action.dataItem,
        loading: false,
        dataSource: action.dataSource,
      };
    case GET_PERSONAL_FORM_SOURCE_ERROR:
      // console.log('reducer 7', action.error);
      return {...state, error: action.error, loading: false, dataSource: null};
      case POPUP_CALL_RESET_ALL_REDUCERS:
        // console.log('reducer 7', action.error);
        return {...state};
    default:
      return state;
  }
};

export const savePersonalFormReducers = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PERSONAL_FORM:
      // console.warn('reducer 3', action.input);
      return {...state, loading: true};
    case SAVE_PERSONAL_FORM_SUCCESS:
      return {
        ...state,
        dataItem: action.dataItem,
        loading: false,
        commit: action.response.commit,
        message: action.response.message,
      };
    case SAVE_PERSONAL_FORM_ERROR:
      // console.log('reducer 7', action.error);
      return {
        ...state,
        error: action.error,
        loading: false,
        // commit: ,
        // message: action.response.message,
      };
      case POPUP_CALL_RESET_ALL_REDUCERS:
        return {...state};
    default:
      return {
        ...state,
        error: null,
        loading: false,
        commit:null,
        message:null,
      };;
  }
};

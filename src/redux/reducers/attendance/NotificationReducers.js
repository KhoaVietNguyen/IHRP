//PhucNT34
import {
  NOTIFICATION,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_ERROR,
  NOTIFICATION_DETAIL,
  NOTIFICATION_DETAIL_ERROR,
  NOTIFICATION_DETAIL_SUCCESS,

  NOTIFICATION_MARK,
  NOTIFICATION_MARK_ERROR,
  NOTIFICATION_MARK_SUCCESS,
} from '../../actions/attendance';
import { POPUP_CALL_RESET_ALL_REDUCERS } from '../../actions/actionTypes';
const initialState = {
  dataItem: null,
  error: null,
  loading: false,

  fetchingNotificationDetail: false,
  dataNotificationDetail: undefined,
  errorNotificationDetail: undefined,

  fetchingNotificationMark: false,
  dataNotificationMark: undefined,
  errorNotificationMark: undefined,
};

const notificationReducers = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION:
      return { ...state, loading: true };
    case NOTIFICATION_SUCCESS:
      return { ...state, dataItem: action.dataItem, loading: false };
    case NOTIFICATION_ERROR:
      return { ...state, error: action.error, loading: false };
    case POPUP_CALL_RESET_ALL_REDUCERS:
      return Object.assign({}, state, {
        dataItem: null,
        error: null,
        loading: false,
      })

    case NOTIFICATION_DETAIL:
      return Object.assign({}, state, {
        fetchingNotificationDetail: true,
        dataNotificationDetail: undefined,
        errorNotificationDetail: undefined,
      })
    case NOTIFICATION_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        fetchingNotificationDetail: false,
        dataNotificationDetail: action.data,
        errorNotificationDetail: undefined,
      })
    case NOTIFICATION_DETAIL_ERROR:
      return Object.assign({}, state, {
        fetchingNotificationDetail: false,
        dataNotificationDetail: undefined,
        errorNotificationDetail: action.error,
      })
    //
    case NOTIFICATION_MARK:
      return Object.assign({}, state, {
        fetchingNotificationMark: true,
        dataNotificationMark: undefined,
        errorNotificationMark: undefined,
      })
    case NOTIFICATION_MARK_SUCCESS:
      return Object.assign({}, state, {
        fetchingNotificationMark: false,
        dataNotificationMark: action.data,
        errorNotificationMark: undefined,
      })
    case NOTIFICATION_MARK_ERROR:
      return Object.assign({}, state, {
        fetchingNotificationMark: false,
        dataNotificationMark: undefined,
        errorNotificationMark: action.error,
      })


    default:
      return state;
  }
};

export default notificationReducers;

//------------------------Notification--------------------------------//
export const NOTIFICATION = 'NOTIFICATION';
export const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS';
export const NOTIFICATION_ERROR = 'NOTIFICATION_ERROR';

export const NOTIFICATION_DETAIL = 'NOTIFICATION_DETAIL';
export const NOTIFICATION_DETAIL_SUCCESS = 'NOTIFICATION_DETAIL_SUCCESS';
export const NOTIFICATION_DETAIL_ERROR = 'NOTIFICATION_DETAIL_ERROR';


export const NOTIFICATION_MARK = 'NOTIFICATION_MARK';
export const NOTIFICATION_MARK_SUCCESS = 'NOTIFICATION_MARK_SUCCESS';
export const NOTIFICATION_MARK_ERROR = 'NOTIFICATION_MARK_ERROR';

export const notificationMarkAction = (input) => {
  return {
    type: NOTIFICATION_MARK,
    input: input,
  };
};

export const notificationAction = (input) => {
  return {
    type: NOTIFICATION,
    input: input,
  };
};

export const notificationDetailAction = (input) => {
  return {
    type: NOTIFICATION_DETAIL,
    input: input,
  };
};
//------------------------Calendars--------------------------------//
export const GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH =
  'GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH';
export const GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_SUCCESS =
  'GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_SUCCESS';
export const GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_ERROR =
  'GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH_ERROR';

export const getHistoryCalendarsCheckInOutInMonthAction = (input) => {
  return {
    type: GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH,
    input: input,
  };
};

// Dữ liệu thông tin check in out WFH trong tháng
export const WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH = 'WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH'
export const WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_SUCCESS = 'WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_SUCCESS'
export const WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_FAILED = 'WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH_FAILED'

export const getWFHInfoCheckInOutInMonthAction = (input) => {
  return {
    type: WFH_GET_INFO_CHECK_IN_OUT_IN_MONTH,
    input: input,
  };
};

//------------------------ApproveApplication--------------------------------//
export const WAITING_LIST_FOR_APPROVAL = 'WAITING_LIST_FOR_APPROVAL'
export const WAITING_LIST_FOR_APPROVAL_SUCCESS =
  'WAITING_LIST_FOR_APPROVAL_SUCCESS'
export const WAITING_LIST_FOR_APPROVAL_ERROR =
  'WAITING_LIST_FOR_APPROVAL_ERROR'

export const GET_HISTORY_OF_APPROVAL_MENU_LISTS = 'GET_HISTORY_OF_APPROVAL_MENU_LISTS'
export const GET_HISTORY_OF_APPROVAL_MENU_LISTS_SUCCESS =
  'GET_HISTORY_OF_APPROVAL_MENU_LISTS_SUCCESS'
export const GET_HISTORY_OF_APPROVAL_MENU_LISTS_ERROR =
  'GET_HISTORY_OF_APPROVAL_MENU_LISTS_ERROR'

export const waitingListForApprovalAction = (input) => {
  return {
    type: WAITING_LIST_FOR_APPROVAL,
    input
  };
};

export const getHistoryOfApprovalMenuListAction = (input) => {
  return {
    type: GET_HISTORY_OF_APPROVAL_MENU_LISTS,
    input
  };
};



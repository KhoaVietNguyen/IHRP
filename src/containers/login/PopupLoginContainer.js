import * as React from 'react';
import PopupLogin from '../../components/login/PopupLogin';
import { connect } from 'react-redux';

import {
  loginAction,
  showPopupPostLoginAction,
  hidePopupPostLoginAction,
  popupPostLoginAction,
  onResetAllReducers,
} from '../../redux/actions/index';

import {
  GET_WF_REQUESTER,
  getWFRequesterAction,
  GET_INFO_CHECK_IN_OUT_IN_DAY,
  getInfoCheckInOutInDayAction,
  WIFI_VERIFY_CHECK_IN_OUT,
  wifiVerifyCheckInOutAction,
  REQUEST_CAPTURE_CHECK_IN_OUT_ACTION,
  requestCaptureCheckInOutAction,
  REGISTRY_DEVICE_ACTION,
  registryDeviceAction,
  REGISTRY_DEVICE_GPS_ACTION,
  registryDeviceGPSAction,

  GET_USER_2_ACTION,
  getUser2Action,
} from '../../redux/actions/home/homeActions';

import {
  ATTACH_FILE_APPLICATION,
  attachFileApplicationAction,

  WORKFLOW_DOWNLOAD_FILE,
  workflowDownloadFileAction,
  //LEAVE APPLICATION
  GET_TYPES_LEAVE_APPLICATION,
  getTypesLeaveApplication,
  GET_DAYS_LEAVE_APPLICATION,
  getDaysLeaveApplicationAction,
  GET_TIMES_LEAVE_APPLICATION,
  getTimesLeaveApplicationAction,
  CALCULATE_APPLICATION,
  calculateApplicationAction,
  GET_DETAIL_LEAVE_APPLICATION,
  getDetailLeaveApplicationAction,
  CREATE_LEAVE_APPLICATION,
  createLeaveApplicationAction,
  DELETE_LEAVE_APPLICATION,
  deleteLeaveApplicationAction,
  GET_SUBSTITUTE,
  getSubstitute,
  SEARCH_LEAVE_APPLICATION,
  searchLeaveApplicationAction,
  UPDATE_LEAVE_APPLICATION,
  updateLeaveApplicationAction,
  SEARCH_APPROVED_LEAVE_APPLICATION,
  searchApprovedLeaveApplicationAction,

  //BUSINESS TRIP APPLICATION
  GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION,
  getListTypeBusinessTripApplicationAction,
  GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION,
  getListCurrencyBusinessTripApplicationAction,
  GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION,
  getListEmployeeBusinessTripApplicationAction,
  CALCULATE_BUSINESS_TRIP_APPLICATION,
  calculateBusinessTripApplicationAction,
  SAVE_BUSINESS_TRIP_APPLICATION,
  saveBusinessTripApplicationAction,
  SEARCH_BUSINESS_TRIP_APPLICATION,
  searchBusinessTripApplicationAction,
  GET_DETAIL_BUSINESS_TRIP_APPLICATION,
  getDetailBusinessTripApplicationAction,
  WITH_DRAW_BUSINESS_TRIP_APPLICATION,
  withDrawBusinessTripApplicationAction,
  DELETE_BUSINESS_TRIP_APPLICATION,
  deleteBusinessTripApplicationAction,
  SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION,
  searchApprovedBusinessTripApplicationAction,

  //OVERTIME APPLICATION
  GET_DATE_INFO_OVERTIME_APPLICATION,
  getDateInfoOverTimeApplicationAction,
  CALCULATE_OVERTIME_APPLICATION,
  calculateOverTimeApplicationAction,
  GET_APPROVER_OVERTIME_APPLICATION,
  getApproverOverTimeApplicationAction,
  SAVE_OVERTIME_APPLICATION,
  saveOverTimeApplicationAction,
  GET_LIST_STATUS_OVERTIME_APPLICATION,
  getListStatusOverTimeApplicationAction,
  SEARCH_OVERTIME_APPLICATION,
  searchOverTimeApplicationAction,
  GET_DETAIL_OVERTIME_APPLICATION,
  getDetailOverTimeApplicationAction,
  WITH_DRAW_OVERTIME_APPLICATION,
  withDrawOverTimeApplicationAction,
  DELETE_OVERTIME_APPLICATION,
  deleteOverTimeApplicationAction,
  SEARCH_APPROVED_OVERTIME_APPLICATION,
  searchApprovedOverTimeApplicationAction,

  //LOG TMS APPLICATION
  GET_ADJUSTMENT_STATUS_LOG_TMS,
  getAdjustmentStatusLogTMSApplicationAction,
  GET_FINGER_PRINT_RECORD_LOG_TMS,
  getFingerPrintRecordLogTMSApplicationAction,
  GET_APPROVAL_STATUS_LOG_TMS,
  getApprovalStatusLogTMSApplicationAction,
  SEARCH_LOG_TMS_APPLICATION,
  searchLogTMSApplicationAction,
  GET_DETAIL_LOG_TMS_APPLICATION,
  getDetailLogTMSApplicationAction,
  GET_LOG_TYPE_LOG_TMS_APPLICATION,
  getLogTypeLogTMSApplicationAction,
  WITH_DRAW_LOG_TMS_APPLICATION,
  withDrawLogTMSApplicationAction,
  DELETE_LOG_TMS_APPLICATION,
  deleteLogTMSApplicationAction,
  SAVE_LOG_TMS_APPLICATION,
  saveLogTMSApplicationAction,
  SEARCH_APPROVED_LOG_TMS_APPLICATION,
  searchApprovedLogTMSApplicationAction,
} from '../../redux/actions/application/applicationActions';
import {
  APPLICATION_APPROVAL_ACTION,
  applicationApprovalAction,
} from '../../redux/actions/application/applicationApprovalActions';

//NganTT97
import {
  GET_PRIVATE_ALLOW,
  GET_PRIVATE_PROFILE,
  GET_PRIVATE_GENERAL,
  SUBMIT_PRIVATE_GENERAL,
  GET_PERSONAL_FORM_LIST,
  GET_PRIVATE_FORM,
  GET_PRIVATE_LIST,
  GET_PRIVATE_VIEW,
  SAVE_PRIVATE_FORM,
  DELETE_PRIVATE_FORM,
} from '../../redux/actions/actionTypes';
import {
  GET_DASH_BOARD_APPROVAL,
  GET_DASH_BOARD_CURRENT_SHIFT,
  GET_DASH_BOARD_LEAVE_INFO,
  GET_DASH_BOARD_NEXT_SHIFT,
  GET_DASH_BOARD_WORKING_HOUR,
  GET_DASH_BOARD_FORM,
} from '../../redux/actions/dashboard/DashBoardAction';
import {
  GET_APPLICATION_HISTORY,
  getApplicationHistoryAction,
} from '../../redux/actions/application/applicationHistory';
import {
  GET_PERSONAL_FORM,
  GET_PERSONAL_FORM_SOURCE,
  GET_PRIVATE_GEN_VIEW,
  SAVE_PERSONAL_FORM,
  getPersonalFormAction,
  getPersonalFormSourceAction,
  getPrivateGenViewAction,
  savePersonalFormAction,
} from '../../redux/actions/personalPage/PersonalPageAction';
import {
  Get_PersonalListAction,
  Get_PersonalProfileAction,
} from '../../redux/actions/userInfo/PersonalListAction';
import {
  Get_PrivateGeneralAction,
  Submit_PrivateGeneralAction,
} from '../../redux/actions/userInfo/PrivateGeneralAction';
import {
  Delete_PrivateFormAction,
  Get_PersonalFormListAction,
  Get_PrivateForm,
  Get_PrivateListAction,
  Get_PrivateViewAction,
  Save_PrivateFormAction,
} from '../../redux/actions/userInfo/PrivateViewAction';
import {
  getDashBoardApprovalAction,
  getDashBoardCurrentShiftAction,
  getDashBoardFormAction,
  getDashBoardLeaveInfoAction,
  getDashBoardNextShiftAction,
  getDashBoardWorkingHourAction,
} from '../../redux/actions/dashboard/DashBoardAction';

import {
  GET_REPORT_WORKING_HOUR,
  Get_ReportWorkingHour,
} from '../../redux/actions/report/ReportAction';
//NganTT97

//MinhNC15-->
import {
  GET_PAYSLIP,
  getPayslipAction,
} from '../../redux/actions/salary/payslipAction'
import {
  GET_PAYSLIPVIEW,
  getPayslipViewAction,
} from '../../redux/actions/salary/payslipViewAction'
import {
  GET_PAYSLIPVIEW_DETAIL,
  getPayslipViewDetailAction,
} from '../../redux/actions/salary/payslipViewDetailAction'
import {
  GET_SALARYHISTORY,
  getSalaryHistoryAction,
} from '../../redux/actions/salary/salaryHistoryAction'
//<--MinhNC15

//PhucNT34
import {
  NOTIFICATION,
  notificationAction,
  GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH,
  getHistoryCalendarsCheckInOutInMonthAction,
  WAITING_LIST_FOR_APPROVAL,
  waitingListForApprovalAction,
  GET_HISTORY_OF_APPROVAL_MENU_LISTS,
  getHistoryOfApprovalMenuListAction,

  NOTIFICATION_MARK,
  notificationMarkAction
} from '../../redux/actions/attendance'
//PhucNT34

import {
  arrayIsEmpty,
  objectIsNull,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import { userProfile } from '../../config/settings';
class PopupLoginContainer extends React.Component {
  reCallAction() {
    const { listAction, hidePopupPostLoginAction } = this.props;
    if (!arrayIsEmpty(listAction)) {
      // console.log('reCallAction: ', listAction);
      for (let item of listAction) {
        switch (item.type) {
          // HOME

          //
          case WORKFLOW_DOWNLOAD_FILE:
            if (!objectIsNull(item.input)) {
              this.props.workflowDownloadFileAction(item.input);
            } else {
              this.props.workflowDownloadFileAction();
            }
            break;
          case ATTACH_FILE_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.attachFileApplicationAction(item.input);
            } else {
              this.props.attachFileApplicationAction();
            }
            break;
          case GET_USER_2_ACTION:
            if (!objectIsNull(item.input)) {
              this.props.getUser2Action(item.input);
            } else {
              this.props.getUser2Action();
            }
            break;
          case GET_WF_REQUESTER:
            if (!objectIsNull(item.input)) {
              this.props.getWFRequesterAction(item.input);
            } else {
              this.props.getWFRequesterAction();
            }
            break;

          case GET_INFO_CHECK_IN_OUT_IN_DAY:
            if (!objectIsNull(item.input)) {
              this.props.getInfoCheckInOutInDayAction(item.input);
            } else {
              this.props.getInfoCheckInOutInDayAction();
            }
            break;

          case WIFI_VERIFY_CHECK_IN_OUT:
            if (!objectIsNull(item.input)) {
              this.props.wifiVerifyCheckInOutAction(item.input);
            } else {
              this.props.wifiVerifyCheckInOutAction();
            }
            break;

          case REQUEST_CAPTURE_CHECK_IN_OUT_ACTION:
            if (!objectIsNull(item.input)) {
              this.props.requestCaptureCheckInOutAction(item.input);
            } else {
              this.props.requestCaptureCheckInOutAction();
            }
            break;
          case REGISTRY_DEVICE_ACTION:
            if (!objectIsNull(item.input)) {
              this.props.registryDeviceAction(item.input);
            } else {
              this.props.registryDeviceAction();
            }
            break;

          case REGISTRY_DEVICE_GPS_ACTION:
            if (!objectIsNull(item.input)) {
              this.props.registryDeviceGPSAction(item.input);
            } else {
              this.props.registryDeviceGPSAction();
            }
            break;

          //CREATE APPLICATION

          //LEAVE APPLICATION
          case GET_TYPES_LEAVE_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getTypesLeaveApplication(item.input);
            } else {
              this.props.getTypesLeaveApplication();
            }
            break;

          case GET_DAYS_LEAVE_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getDaysLeaveApplicationAction(item.input);
            } else {
              this.props.getDaysLeaveApplicationAction();
            }
            break;

          case GET_TIMES_LEAVE_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getTimesLeaveApplicationAction(item.input);
            } else {
              this.props.getTimesLeaveApplicationAction();
            }
            break;

          case CALCULATE_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.calculateApplicationAction(item.input);
            } else {
              this.props.calculateApplicationAction();
            }
            break;

          case GET_DETAIL_LEAVE_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getDetailLeaveApplicationAction(item.input);
            } else {
              this.props.getDetailLeaveApplicationAction();
            }
            break;

          case CREATE_LEAVE_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.createLeaveApplicationAction(item.input);
            } else {
              this.props.createLeaveApplicationAction();
            }
            break;

          case DELETE_LEAVE_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.deleteLeaveApplicationAction(item.input);
            } else {
              this.props.deleteLeaveApplicationAction();
            }
            break;

          case GET_SUBSTITUTE:
            if (!objectIsNull(item.input)) {
              this.props.getSubstitute(item.input);
            } else {
              this.props.getSubstitute();
            }
            break;

          case SEARCH_LEAVE_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.searchLeaveApplicationAction(item.input);
            } else {
              this.props.searchLeaveApplicationAction();
            }
            break;

          case UPDATE_LEAVE_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.updateLeaveApplicationAction(item.input);
            } else {
              this.props.updateLeaveApplicationAction();
            }
            break;
          case SEARCH_APPROVED_LEAVE_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.searchApprovedLeaveApplicationAction(item.input);
            } else {
              this.props.searchApprovedLeaveApplicationAction();
            }
            break;

          case GET_LIST_TYPE_BUSINESS_TRIP_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getListTypeBusinessTripApplicationAction(item.input);
            } else {
              this.props.getListTypeBusinessTripApplicationAction();
            }
            break;

          case GET_LIST_CURRENCY_BUSINESS_TRIP_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getListCurrencyBusinessTripApplicationAction(
                item.input,
              );
            } else {
              this.props.getListCurrencyBusinessTripApplicationAction();
            }
            break;

          case GET_LIST_EMPLOYEE_BUSINESS_TRIP_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getListEmployeeBusinessTripApplicationAction(
                item.input,
              );
            } else {
              this.props.getListEmployeeBusinessTripApplicationAction();
            }
            break;

          case CALCULATE_BUSINESS_TRIP_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.calculateBusinessTripApplicationAction(item.input);
            } else {
              this.props.calculateBusinessTripApplicationAction();
            }
            break;

          case SAVE_BUSINESS_TRIP_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.saveBusinessTripApplicationAction(item.input);
            } else {
              this.props.saveBusinessTripApplicationAction();
            }
            break;

          case SEARCH_BUSINESS_TRIP_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.searchBusinessTripApplicationAction(item.input);
            } else {
              this.props.searchBusinessTripApplicationAction();
            }
            break;

          case GET_DETAIL_BUSINESS_TRIP_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getDetailBusinessTripApplicationAction(item.input);
            } else {
              this.props.getDetailBusinessTripApplicationAction();
            }
            break;

          case WITH_DRAW_BUSINESS_TRIP_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.withDrawBusinessTripApplicationAction(item.input);
            } else {
              this.props.withDrawBusinessTripApplicationAction();
            }
            break;

          case DELETE_BUSINESS_TRIP_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.deleteBusinessTripApplicationAction(item.input);
            } else {
              this.props.deleteBusinessTripApplicationAction();
            }
            break;
          case SEARCH_APPROVED_BUSINESS_TRIP_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.searchApprovedBusinessTripApplicationAction(
                item.input,
              );
            } else {
              this.props.searchApprovedBusinessTripApplicationAction();
            }
            break;

          case GET_DATE_INFO_OVERTIME_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getDateInfoOverTimeApplicationAction(item.input);
            } else {
              this.props.getDateInfoOverTimeApplicationAction();
            }
            break;

          case CALCULATE_OVERTIME_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.calculateOverTimeApplicationAction(item.input);
            } else {
              this.props.calculateOverTimeApplicationAction();
            }
            break;

          case GET_APPROVER_OVERTIME_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getApproverOverTimeApplicationAction(item.input);
            } else {
              this.props.getApproverOverTimeApplicationAction();
            }
            break;

          case SAVE_OVERTIME_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.saveOverTimeApplicationAction(item.input);
            } else {
              this.props.saveOverTimeApplicationAction();
            }
            break;

          case GET_LIST_STATUS_OVERTIME_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getListStatusOverTimeApplicationAction(item.input);
            } else {
              this.props.getListStatusOverTimeApplicationAction();
            }
            break;

          case SEARCH_OVERTIME_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.searchOverTimeApplicationAction(item.input);
            } else {
              this.props.searchOverTimeApplicationAction();
            }
            break;

          case GET_DETAIL_OVERTIME_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getDetailOverTimeApplicationAction(item.input);
            } else {
              this.props.getDetailOverTimeApplicationAction();
            }
            break;

          case WITH_DRAW_OVERTIME_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.withDrawOverTimeApplicationAction(item.input);
            } else {
              this.props.withDrawOverTimeApplicationAction();
            }
            break;

          case DELETE_OVERTIME_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.deleteOverTimeApplicationAction(item.input);
            } else {
              this.props.deleteOverTimeApplicationAction();
            }
            break;

          case SEARCH_APPROVED_OVERTIME_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.searchApprovedOverTimeApplicationAction(item.input);
            } else {
              this.props.searchApprovedOverTimeApplicationAction();
            }
            break;

          case GET_ADJUSTMENT_STATUS_LOG_TMS:
            if (!objectIsNull(item.input)) {
              this.props.getAdjustmentStatusLogTMSApplicationAction(item.input);
            } else {
              this.props.getAdjustmentStatusLogTMSApplicationAction();
            }
            break;

          case GET_FINGER_PRINT_RECORD_LOG_TMS:
            if (!objectIsNull(item.input)) {
              this.props.getFingerPrintRecordLogTMSApplicationAction(
                item.input,
              );
            } else {
              this.props.getFingerPrintRecordLogTMSApplicationAction();
            }
            break;

          case GET_APPROVAL_STATUS_LOG_TMS:
            if (!objectIsNull(item.input)) {
              this.props.getApprovalStatusLogTMSApplicationAction(item.input);
            } else {
              this.props.getApprovalStatusLogTMSApplicationAction();
            }
            break;

          case SEARCH_LOG_TMS_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.searchLogTMSApplicationAction(item.input);
            } else {
              this.props.searchLogTMSApplicationAction();
            }
            break;

          case GET_DETAIL_LOG_TMS_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getDetailLogTMSApplicationAction(item.input);
            } else {
              this.props.getDetailLogTMSApplicationAction();
            }
            break;

          case GET_LOG_TYPE_LOG_TMS_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.getLogTypeLogTMSApplicationAction(item.input);
            } else {
              this.props.getLogTypeLogTMSApplicationAction();
            }
            break;

          case WITH_DRAW_LOG_TMS_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.withDrawLogTMSApplicationAction(item.input);
            } else {
              this.props.withDrawLogTMSApplicationAction();
            }
            break;

          case DELETE_LOG_TMS_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.deleteLogTMSApplicationAction(item.input);
            } else {
              this.props.deleteLogTMSApplicationAction();
            }
            break;

          case SAVE_LOG_TMS_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.saveLogTMSApplicationAction(item.input);
            } else {
              this.props.saveLogTMSApplicationAction();
            }
            break;

          case SEARCH_APPROVED_LOG_TMS_APPLICATION:
            if (!objectIsNull(item.input)) {
              this.props.searchApprovedLogTMSApplicationAction(item.input);
            } else {
              this.props.searchApprovedLogTMSApplicationAction();
            }
            break;

          case APPLICATION_APPROVAL_ACTION:
            if (!objectIsNull(item.input)) {
              this.props.applicationApprovalAction(item.input);
            } else {
              this.props.applicationApprovalAction();
            }
            break;

          //NganTT97
          //PersonalList Allow
          case GET_PRIVATE_ALLOW:
            if (!objectIsNull(item.input)) {
              this.props.Get_PersonalListAction(item.input);
            } else {
              this.props.Get_PersonalListAction();
            }
            break;
          case GET_PRIVATE_PROFILE:
            if (!objectIsNull(item.input)) {
              this.props.Get_PersonalProfileAction(item.input);
            } else {
              this.props.Get_PersonalProfileAction();
            }
            break;
          //Private General
          case SUBMIT_PRIVATE_GENERAL:
            if (!objectIsNull(item.input)) {
              this.props.Submit_PrivateGeneralAction(item.input);
            } else {
              this.props.Submit_PrivateGeneralAction();
            }
            break;
          case GET_PRIVATE_GENERAL:
            // console.log('11111111111111')
            if (!objectIsNull(item.input)) {
              // console.log('2222222222222')
              this.props.Get_PrivateGeneralAction(item.input);
            } else {
              // console.log('333333333333')
              this.props.Get_PrivateGeneralAction();
            }
            break;
          //Private View
          case GET_PRIVATE_VIEW:
            if (!objectIsNull(item.input)) {
              this.props.Get_PrivateViewAction(item.input);
            } else {
              this.props.Get_PrivateViewAction();
            }
            break;
          case GET_PERSONAL_FORM_LIST:
            if (!objectIsNull(item.input)) {
              this.props.Get_PersonalFormListAction(item.input);
            } else {
              this.props.Get_PersonalFormListAction();
            }
            break;
          case GET_PRIVATE_FORM:
            if (!objectIsNull(item.input)) {
              this.props.Get_PrivateForm(item.input);
            } else {
              this.props.Get_PrivateForm();
            }
            break;
          case GET_PRIVATE_LIST:
            if (!objectIsNull(item.input)) {
              this.props.Get_PrivateListAction(item.input);
            } else {
              this.props.Get_PrivateListAction();
            }
            break;
          case SAVE_PRIVATE_FORM:
            if (!objectIsNull(item.input)) {
              this.props.Save_PrivateFormAction(item.input);
            } else {
              this.props.Save_PrivateFormAction();
            }
            break;
          case DELETE_PRIVATE_FORM:
            if (!objectIsNull(item.input)) {
              this.props.Delete_PrivateFormAction(item.input);
            } else {
              this.props.Delete_PrivateFormAction();
            }
            break;
          //Dash Board
          case GET_DASH_BOARD_APPROVAL:
            if (!objectIsNull(item.input)) {
              this.props.getDashBoardApprovalAction(item.input);
            } else {
              this.props.getDashBoardApprovalAction();
            }
            break;
          case GET_DASH_BOARD_CURRENT_SHIFT:
            if (!objectIsNull(item.input)) {
              this.props.getDashBoardCurrentShiftAction(item.input);
            } else {
              this.props.getDashBoardCurrentShiftAction();
            }
            break;
          case GET_DASH_BOARD_LEAVE_INFO:
            if (!objectIsNull(item.input)) {
              this.props.getDashBoardLeaveInfoAction(item.input);
            } else {
              this.props.getDashBoardLeaveInfoAction();
            }
            break;
          case GET_DASH_BOARD_NEXT_SHIFT:
            if (!objectIsNull(item.input)) {
              this.props.getDashBoardNextShiftAction(item.input);
            } else {
              this.props.getDashBoardNextShiftAction();
            }
            break;
          case GET_DASH_BOARD_WORKING_HOUR:
            if (!objectIsNull(item.input)) {
              this.props.getDashBoardWorkingHourAction(item.input);
            } else {
              this.props.getDashBoardWorkingHourAction();
            }
            break;
          case GET_DASH_BOARD_FORM:
            if (!objectIsNull(item.input)) {
              this.props.getDashBoardFormAction(item.input);
            } else {
              this.props.getDashBoardFormAction();
            }
            break;
          //Application History
          case GET_APPLICATION_HISTORY:
            if (!objectIsNull(item.input)) {
              this.props.getApplicationHistoryAction(item.input);
            } else {
              this.props.getApplicationHistoryAction();
            }
            break;
          //PersonalPage
          case GET_PERSONAL_FORM:
            if (!objectIsNull(item.input)) {
              this.props.getPersonalFormAction(item.input);
            } else {
              this.props.getPersonalFormAction();
            }
            break;
          case GET_PERSONAL_FORM_SOURCE:
            if (!objectIsNull(item.input)) {
              this.props.getPersonalFormSourceAction(item.input);
            } else {
              this.props.getPersonalFormSourceAction();
            }
            break;
          case GET_PRIVATE_GEN_VIEW:
            if (!objectIsNull(item.input)) {
              this.props.getPrivateGenViewAction(item.input);
            } else {
              this.props.getPrivateGenViewAction();
            }
            break;
          case SAVE_PERSONAL_FORM:
            if (!objectIsNull(item.input)) {
              this.props.savePersonalFormAction(item.input);
            } else {
              this.props.savePersonalFormAction();
            }
            break;

          //Report Working Hour
          case GET_REPORT_WORKING_HOUR:
            if (!objectIsNull(item.input)) {
              this.props.Get_ReportWorkingHour(item.input);
            } else {
              this.props.Get_ReportWorkingHour();
            }
            break;
          //NganTT97

          //MinhNC15-->
          case GET_PAYSLIP:
            if (!objectIsNull(item.input)) {
              this.props.getPayslipAction(item.input);
            } else {
              this.props.getPayslipAction();
            }
            break;

          case GET_PAYSLIPVIEW:
            if (!objectIsNull(item.input)) {
              this.props.getPayslipViewAction(item.input);
            } else {
              this.props.getPayslipViewAction();
            }
            break;

          case GET_PAYSLIPVIEW_DETAIL:
            if (!objectIsNull(item.input)) {
              this.props.getPayslipViewDetailAction(item.input);
            } else {
              this.props.getPayslipViewDetailAction();
            }
            break;

          case GET_SALARYHISTORY:
            if (!objectIsNull(item.input)) {
              this.props.getSalaryHistoryAction(item.input);
            } else {
              this.props.getSalaryHistoryAction();
            }
            break;
          //<--MinhNC15
          //PhucNT34
          //Notification
          case NOTIFICATION:
            if (!objectIsNull(item.input)) {
              this.props.notificationAction(item.input);
            } else {
              this.props.notificationAction();
            }
            break;

          //Calendars
          case GET_HISTORY_CALENDARS_CHECK_IN_OUT_IN_MONTH:
            if (!objectIsNull(item.input)) {
              this.props.getHistoryCalendarsCheckInOutInMonthAction(item.input);
            } else {
              this.props.getHistoryCalendarsCheckInOutInMonthAction();
            }
            break;

          //ApplicationApproval
          case WAITING_LIST_FOR_APPROVAL:
            if (!objectIsNull(item.input)) {
              this.props.waitingListForApprovalAction(item.input);
            } else {
              this.props.waitingListForApprovalAction();
            }
            break;

          case GET_HISTORY_OF_APPROVAL_MENU_LISTS:
            if (!objectIsNull(item.input)) {
              this.props.getHistoryOfApprovalMenuListAction(item.input);
            } else {
              this.props.getHistoryOfApprovalMenuListAction();
            }
            break;
          //PhucNT34
          case NOTIFICATION_MARK:
            if (!objectIsNull(item.input)) {
              this.props.notificationMarkAction(item.input);
            } else {
              this.props.notificationMarkAction();
            }
            break;
          default:
            break;
        }
      }
      hidePopupPostLoginAction();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      if (!stringIsEmpty(this.props.data)) {
        // console.log('DidUPdatePopupLoginContainer');
        if (this.props.typeLogin === 'popup') {
          userProfile.Stoken = this.props.data;
          this.reCallAction();
        }
      }
    }

  }
  render() {
    return (
      <PopupLogin
        {...this.props}
      //  reCallAction={this.reCallAction}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // loginAction
    getUser2Action: () => {
      dispatch(getUser2Action());
    },
    loginAction: (data) => {
      dispatch(loginAction(data));
    },
    popupPostLoginAction: (input) => {
      dispatch(popupPostLoginAction(input));
    },
    showPopupPostLoginAction: () => {
      dispatch(showPopupPostLoginAction());
    },
    hidePopupPostLoginAction: () => {
      dispatch(hidePopupPostLoginAction());
    },
    getWFRequesterAction: () => {
      dispatch(getWFRequesterAction());
    },
    getTypesLeaveApplication: () => {
      dispatch(getTypesLeaveApplication());
    },
    getInfoCheckInOutInDayAction: (input) => {
      dispatch(getInfoCheckInOutInDayAction(input));
    },
    wifiVerifyCheckInOutAction: (input) => {
      dispatch(wifiVerifyCheckInOutAction(input));
    },

    requestCaptureCheckInOutAction: (input) => {
      dispatch(requestCaptureCheckInOutAction(input));
    },

    registryDeviceAction: (input) => {
      dispatch(registryDeviceAction(input));
    },
    registryDeviceGPSAction: (input) => {
      dispatch(registryDeviceGPSAction(input))
    },
    getDaysLeaveApplicationAction: (input) => {
      dispatch(getDaysLeaveApplicationAction(input));
    },

    getTimesLeaveApplicationAction: (input) => {
      dispatch(getTimesLeaveApplicationAction(input));
    },
    calculateApplicationAction: (input) => {
      dispatch(calculateApplicationAction(input));
    },
    getDetailLeaveApplicationAction: (input) => {
      dispatch(getDetailLeaveApplicationAction(input));
    },
    createLeaveApplicationAction: (input) => {
      dispatch(createLeaveApplicationAction(input));
    },

    deleteLeaveApplicationAction: (input) => {
      dispatch(deleteLeaveApplicationAction(input));
    },
    getSubstitute: (input) => {
      dispatch(getSubstitute(input));
    },
    searchLeaveApplicationAction: (input) => {
      dispatch(searchLeaveApplicationAction(input));
    },

    updateLeaveApplicationAction: (input) => {
      dispatch(updateLeaveApplicationAction(input));
    },
    searchApprovedLeaveApplicationAction: (input) => {
      dispatch(searchApprovedLeaveApplicationAction(input));
    },

    getListTypeBusinessTripApplicationAction: () => {
      dispatch(getListTypeBusinessTripApplicationAction());
    },
    getListCurrencyBusinessTripApplicationAction: () => {
      dispatch(getListCurrencyBusinessTripApplicationAction());
    },
    getListEmployeeBusinessTripApplicationAction: () => {
      dispatch(getListEmployeeBusinessTripApplicationAction());
    },
    calculateBusinessTripApplicationAction: (input) => {
      dispatch(calculateBusinessTripApplicationAction(input));
    },

    saveBusinessTripApplicationAction: (input) => {
      dispatch(saveBusinessTripApplicationAction(input));
    },
    searchBusinessTripApplicationAction: (input) => {
      dispatch(searchBusinessTripApplicationAction(input));
    },
    getDetailBusinessTripApplicationAction: (input) => {
      dispatch(getDetailBusinessTripApplicationAction(input));
    },
    withDrawBusinessTripApplicationAction: (input) => {
      dispatch(withDrawBusinessTripApplicationAction(input));
    },
    deleteBusinessTripApplicationAction: (input) => {
      dispatch(deleteBusinessTripApplicationAction(input));
    },
    searchApprovedBusinessTripApplicationAction: (input) => {
      dispatch(searchApprovedBusinessTripApplicationAction(input));
    },
    getDateInfoOverTimeApplicationAction: (input) => {
      dispatch(getDateInfoOverTimeApplicationAction(input));
    },
    calculateOverTimeApplicationAction: (input) => {
      dispatch(calculateOverTimeApplicationAction(input));
    },
    getApproverOverTimeApplicationAction: () => {
      dispatch(getApproverOverTimeApplicationAction());
    },

    saveOverTimeApplicationAction: (input) => {
      dispatch(saveOverTimeApplicationAction(input));
    },

    getListStatusOverTimeApplicationAction: (input) => {
      dispatch(getListStatusOverTimeApplicationAction(input));
    },

    searchOverTimeApplicationAction: (input) => {
      dispatch(searchOverTimeApplicationAction(input));
    },
    getDetailOverTimeApplicationAction: (input) => {
      dispatch(getDetailOverTimeApplicationAction(input));
    },
    withDrawOverTimeApplicationAction: (input) => {
      dispatch(withDrawOverTimeApplicationAction(input));
    },
    deleteOverTimeApplicationAction: (input) => {
      dispatch(deleteOverTimeApplicationAction(input));
    },

    searchApprovedOverTimeApplicationAction: (input) => {
      dispatch(searchApprovedOverTimeApplicationAction(input));
    },

    getAdjustmentStatusLogTMSApplicationAction: () => {
      dispatch(getAdjustmentStatusLogTMSApplicationAction());
    },
    getFingerPrintRecordLogTMSApplicationAction: () => {
      dispatch(getFingerPrintRecordLogTMSApplicationAction());
    },
    getApprovalStatusLogTMSApplicationAction: () => {
      dispatch(getApprovalStatusLogTMSApplicationAction());
    },

    searchLogTMSApplicationAction: (input) => {
      dispatch(searchLogTMSApplicationAction(input));
    },

    getDetailLogTMSApplicationAction: (input) => {
      dispatch(getDetailLogTMSApplicationAction(input));
    },

    getLogTypeLogTMSApplicationAction: () => {
      dispatch(getLogTypeLogTMSApplicationAction());
    },

    withDrawLogTMSApplicationAction: (input) => {
      dispatch(withDrawLogTMSApplicationAction(input));
    },

    deleteLogTMSApplicationAction: (input) => {
      dispatch(deleteLogTMSApplicationAction(input));
    },
    saveLogTMSApplicationAction: (input) => {
      dispatch(saveLogTMSApplicationAction(input));
    },
    searchApprovedLogTMSApplicationAction: (input) => {
      dispatch(searchApprovedLogTMSApplicationAction(input));
    },

    applicationApprovalAction: (input) => {
      dispatch(applicationApprovalAction(input));
    },

    //NganTT97
    Get_PersonalListAction: (input) => {
      dispatch(Get_PersonalListAction(input));
    },
    Get_PersonalProfileAction: (input) => {
      dispatch(Get_PersonalProfileAction(input));
    },
    Get_PrivateGeneralAction: (input) => {
      dispatch(Get_PrivateGeneralAction(input));
    },
    Submit_PrivateGeneralAction: (input) => {
      dispatch(Submit_PrivateGeneralAction(input));
    },

    Get_PrivateViewAction: (input) => {
      dispatch(Get_PrivateViewAction(input));
    },
    Get_PersonalFormListAction: (input) => {
      dispatch(Get_PersonalFormListAction(input));
    },
    Get_PrivateForm: (input) => {
      dispatch(Get_PrivateForm(input));
    },
    Get_PrivateListAction: (input) => {
      dispatch(Get_PrivateListAction(input));
    },
    Save_PrivateFormAction: (input) => {
      dispatch(Save_PrivateFormAction(input));
    },
    Delete_PrivateFormAction: (input) => {
      dispatch(Delete_PrivateFormAction(input));
    },

    getDashBoardApprovalAction: (input) => {
      dispatch(getDashBoardApprovalAction(input));
    },
    getDashBoardCurrentShiftAction: (input) => {
      dispatch(getDashBoardCurrentShiftAction(input));
    },
    getDashBoardFormAction: (input) => {
      dispatch(getDashBoardFormAction(input));
    },
    getDashBoardLeaveInfoAction: (input) => {
      dispatch(getDashBoardLeaveInfoAction(input));
    },
    getDashBoardNextShiftAction: (input) => {
      dispatch(getDashBoardNextShiftAction(input));
    },
    getDashBoardWorkingHourAction: (input) => {
      dispatch(getDashBoardWorkingHourAction(input));
    },
    getApplicationHistoryAction: (input) => {
      dispatch(getApplicationHistoryAction(input));
    },

    getPersonalFormAction: (input) => {
      dispatch(getPersonalFormAction(input));
    },
    getPersonalFormSourceAction: (input) => {
      dispatch(getPersonalFormSourceAction(input));
    },
    getPrivateGenViewAction: (input) => {
      dispatch(getPrivateGenViewAction(input));
    },
    savePersonalFormAction: (input) => {
      dispatch(savePersonalFormAction(input));
    },

    Get_ReportWorkingHour: (input) => {
      dispatch(Get_ReportWorkingHour(input));
    },
    //NganTT97

    //MinhNC15-->
    getPayslipAction: (input) => {
      dispatch(getPayslipAction(input))
    },
    getPayslipViewAction: (input) => {
      dispatch(getPayslipViewAction(input))
    },
    getSalaryHistoryAction: (input) => {
      dispatch(getSalaryHistoryAction(input))
    },
    getPayslipViewDetailAction: (input) => {
      dispatch(getPayslipViewDetailAction(input))
    },
    //<--MinhNC15

    //PhucNT34
    notificationAction: (input) => {
      dispatch(notificationAction(input))
    },
    getHistoryCalendarsCheckInOutInMonthAction: (input) => {
      dispatch(getHistoryCalendarsCheckInOutInMonthAction(input))
    },
    waitingListForApprovalAction: (input) => {
      dispatch(waitingListForApprovalAction(input))
    },
    getHistoryOfApprovalMenuListAction: (input) => {
      dispatch(getHistoryOfApprovalMenuListAction(input))
    },
    //PhucNT34

    // reset All Reducers
    onResetAllReducers: (input) => {
      dispatch(onResetAllReducers(input));
    },

    attachFileApplicationAction: (input) => {
      dispatch(attachFileApplicationAction(input));
    },
    workflowDownloadFileAction: (input) => {
      dispatch(workflowDownloadFileAction(input));
    },

  };
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.loginReducers.isFetching,
    data: state.loginReducers.data,
    error: state.loginReducers.error,
    typeLogin: state.loginReducers.typeLogin,
    actionReplaceScreen: state.loginReducers.actionReplaceScreen,

    dataPopupLogin: state.loginReducers.dataPopupLogin,
    errorPopupLogin: state.loginReducers.errorPopupLogin,
    fetchingPopupLogin: state.loginReducers.fetchingPopupLogin,
    listAction: state.loginReducers.listAction,
    visiblePopupPostLogin: state.loginReducers.visiblePopupPostLogin,

    messagePopupUpdateApp: state.loginReducers.messagePopupUpdateApp,
    // isFetchingGetApp: state.getAppReducers.isFetchingGetApp,
    // dataGetApp: state.getAppReducers.dataGetApp,
    // errorGetApp: state.getAppReducers.errorGetApp,

    // commit: state.getAppReducers.commit,
    fetchingRequester: state.getAppReducers.fetchingRequester,
    dataRequester: state.getAppReducers.dataRequester,
    errorRequester: state.getAppReducers.errorRequester,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopupLoginContainer);

import { all } from 'redux-saga/effects';
import { watchDeleteTokenNoti } from './configSagas'
import {
  watchLogin,
  watchHidePopupPostLogin,
  watchShowPopupPostLogin,
  watchPopupPostLogin,
  watchOnResetAllReducers,
  watchPopupAlert,
  watchReplaceScreenLogin,
  watchShowPopupUpdateApp,
} from './loginSagas';
import {
  notificationSaga,
  watchGetHistoryCalendarsCheckInOutInMonthSaga,
  waitingListForApprovalSaga,
  watchHistoryOfApprovalMenuListSaga,
  watchNotificationDetailSaga,
  watchNotificationMark,
  watchGetWFHInfoCheckInOutInMonth,
} from './attendanceSagas';
import {
  watchGetPrivateGenViewSaga,
  watchGetPersonalFormSaga,
  watchGetPersonalFormSourceSaga,
  watchSavePersonalFormSaga,
  watchRemovePrivateGenView,
} from './personalPage/PersonalPageSaga';
import {
  // Attach File Application

  watchAttachFileApplication,
  watchWorkflowDownloadApplication,
  // Leave Application
  watchSubstitute,
  watchTypesLeaveApplication,
  watchCalculateApplication,
  watchGetTimesLeaveApplication,
  watchGetDaysLeaveApplication,
  watchSaveDaysLeaveApplication,
  watchCreateLeaveApplication,
  watchSearchLeaveApplication,
  watchGetDetailLeaveApplication,
  watchDeleteLeaveApplication,
  watchUpdateLeaveApplication,
  watchResetSaveDaysLeaveApplication,
  watchSearchApprovedLeaveApplication,
  watchResetGetDetailLeaveApplication,
  watchGetListStatusApplication,
  // Business Trip Application
  watchGetListTypeBusinessTripApplication,
  watchGetListCurrencyBusinessTripApplication,
  watchGetListEmployeeBusinessTripApplication,
  watchCalculateBusinessTripApplication,
  watchSaveBusinessTripApplication,
  watchSearchBusinessTripApplication,
  watchGetDetailBusinessTripApplication,
  watchDeleteBusinessTripApplication,
  watchWithDrawBusinessTripApplication,
  watchSearchApprovedBusinessTripApplication,
  watchResetGetDetailBusinessTripApplication,
  // Over Time Application
  watchGetDateInfoOverTimeApplication,
  watchGetApproverOverTimeApplication,
  watchCalculateOverTimeApplication,
  watchSaveOverTimeApplication,
  watchSearchOverTimeApplication,
  watchGetListStatusOverTimeApplication,
  watchDeleteOverTimeApplication,
  watchGetDetailOverTimeApplication,
  watchWithDrawOverTimeApplication,
  watchSearchApprovedOverTimeApplication,
  watchResetGetDetailOverTimeApplication,
  // Log TMS Application
  watchGetAdjustmentStatusLogTMSApplication,
  watchGetApprovalStatusLogTMSApplication,
  watchGetFingerPrintRecordLogTMSApplication,
  watchSearchLogTMSApplication,
  watchGetDetailLogTMSApplication,
  watchGetLogTypeLogTMSApplication,
  watchDeleteLogTMSApplication,
  watchWithDrawTypeLogTMSApplication,
  watchSaveLogTMSApplication,
  watchSearchApprovedLogTMSApplication,
  watchResetGetDetailLogTMSApplication,
} from './application/applicationSagas';

import {
  watchGetPersonalList,
  watchGetPersonalProfile,
} from './userInfo/PersonalListSaga';

import {
  watchUploadAvatar
} from './userInfo/uploadAvatarSagas';

import {
  watchGetPersonalPrivateView,
  watchGetPersonalFormList,
  watchGetPrivateForm,
  watchGetPrivateList,
  watchSavePrivateForm,
  watchDeletePrivateForm,
} from './userInfo/PrivateViewSaga';
import { watchGetPersonalPrivateGeneral, watchSubmitPersonalPrivateGeneral } from './userInfo/PrivateGeneralSaga';

import {
  watchGetWFRequester,
  watchWifiVerifyCheckInOut,
  watchGetInfoCheckInOutInDay,
  watchRequestCaptureCheckInOut,
  watchRegistryDevice,
  watchRegistryDeviceGPS,
  watchGetUser2,

  //check in out WFH
  watchGetWFHInfoCheckInOutInDay,
  watchWFHRequestCaptureCheckInOut,
  watchWFHVerifyCheckInOut,
} from './home/homeSagas';

// MinhNC15
import { watchGetApp } from './getApp/GetAppSagas';
import { watchPayslip } from './salary/payslipSagas';
import { watchPayslipView } from './salary/payslipViewSagas';
import { watchSalaryHistory } from './salary/salaryHistorySagas';
import { watchPayslipViewDetail } from './salary/payslipViewDetailSagas';

import { watchGetApplicationHistory } from './application/applicationHistorySagas';
// Ngantt97- DashBoard
import {
  watchDashBoardListApproval,
  watchDashBoardListCurrentShift,
  watchDashBoardListLeaveInfo,
  watchDashBoardListNextShift,
  watchDashBoardListWorkingHour, watchDashBoardForm
} from './dashBoard/DashBoardSagas';


// application approval

import {
  watchApplicationApproval,
  watchResetApplicationApproval,
  watchGetListCheckInOutGPSApplication,
} from './application/applicationApprovalSagas'

import { watchReportWorkingHour } from './report/reportWorkingHourSaga'
import { watchSendAccountForgotPassword, watchSendCodeVerifyForgotPassword } from './forgotPassword/forgotPasswordSagas'


export default function* rootSaga() {
  yield all([
    // UserInfo
    watchDeleteTokenNoti(),
    watchPopupAlert(),
    watchOnResetAllReducers(),
    watchPopupPostLogin(),
    watchShowPopupPostLogin(),
    watchHidePopupPostLogin(),
    watchLogin(),
    watchGetPersonalList(),
    watchGetPersonalPrivateView(),
    watchGetPersonalProfile(),
    watchGetPersonalFormList(),
    watchGetPrivateForm(),
    watchGetPrivateList(),
    watchGetPersonalPrivateGeneral(),
    watchSavePrivateForm(),
    watchDeletePrivateForm(),
    watchSubmitPersonalPrivateGeneral(),
    watchUploadAvatar(),

    notificationSaga(),
    watchNotificationDetailSaga(),
    //Calendar
    watchGetHistoryCalendarsCheckInOutInMonthSaga(),
    waitingListForApprovalSaga(),
    watchHistoryOfApprovalMenuListSaga(),
    watchGetWFHInfoCheckInOutInMonth(),

    // Attach File Application
    watchAttachFileApplication(),
    watchWorkflowDownloadApplication(),
    // Leave Application
    watchGetListStatusApplication(),
    watchGetWFRequester(),
    watchSubstitute(),
    watchTypesLeaveApplication(),
    watchCalculateApplication(),
    watchGetTimesLeaveApplication(),
    watchGetDaysLeaveApplication(),

    watchGetPersonalFormList(),
    watchGetPrivateForm(),
    watchGetDetailLeaveApplication(),
    watchDeleteLeaveApplication(),
    watchUpdateLeaveApplication(),
    watchResetSaveDaysLeaveApplication(),
    watchSearchApprovedLeaveApplication(),
    watchResetGetDetailLeaveApplication(),
    //MinhNC15
    watchGetApp(),
    watchPayslip(),
    watchPayslipView(),
    watchSalaryHistory(),
    watchPayslipViewDetail(),

    watchSaveDaysLeaveApplication(),
    watchCreateLeaveApplication(),
    watchSearchLeaveApplication(),

    //Business Trip Application
    watchGetListTypeBusinessTripApplication(),
    watchGetListCurrencyBusinessTripApplication(),
    watchGetListEmployeeBusinessTripApplication(),
    watchCalculateBusinessTripApplication(),
    watchSaveBusinessTripApplication(),
    watchSearchBusinessTripApplication(),
    watchGetDetailBusinessTripApplication(),
    watchDeleteBusinessTripApplication(),
    watchWithDrawBusinessTripApplication(),
    watchSearchApprovedBusinessTripApplication(),
    watchResetGetDetailBusinessTripApplication(),
    //Over Time Application
    watchGetDateInfoOverTimeApplication(),
    watchGetApproverOverTimeApplication(),
    watchCalculateOverTimeApplication(),
    watchSaveOverTimeApplication(),
    watchSearchOverTimeApplication(),
    watchGetListStatusOverTimeApplication(),
    watchDeleteOverTimeApplication(),
    watchGetDetailOverTimeApplication(),
    watchWithDrawOverTimeApplication(),
    watchSearchApprovedOverTimeApplication(),
    watchResetGetDetailOverTimeApplication(),
    //Log TMS Application

    watchGetAdjustmentStatusLogTMSApplication(),
    watchGetApprovalStatusLogTMSApplication(),
    watchGetFingerPrintRecordLogTMSApplication(),
    watchSearchLogTMSApplication(),
    watchGetDetailLogTMSApplication(),
    watchGetLogTypeLogTMSApplication(),
    watchDeleteLogTMSApplication(),
    watchWithDrawTypeLogTMSApplication(),
    watchSaveLogTMSApplication(),

    watchGetPrivateGenViewSaga(),
    watchGetPersonalFormSaga(),
    watchSearchApprovedLogTMSApplication(),
    watchGetPersonalFormSourceSaga(),
    watchSavePersonalFormSaga(),

    watchGetApplicationHistory(),
    watchResetGetDetailLogTMSApplication(),

    //Home
    watchWifiVerifyCheckInOut(),
    watchGetInfoCheckInOutInDay(),
    watchRequestCaptureCheckInOut(),
    watchRegistryDevice(),
    watchRegistryDeviceGPS(),
    watchGetUser2(),

    watchGetWFHInfoCheckInOutInDay(),
    watchWFHRequestCaptureCheckInOut(),
    watchWFHVerifyCheckInOut(),

    // Application Approval
    watchApplicationApproval(),
    watchResetApplicationApproval(),
    watchGetListCheckInOutGPSApplication(),
    
    //DashBoard
    watchDashBoardListApproval(),
    watchDashBoardListCurrentShift(),
    watchDashBoardListLeaveInfo(),
    watchDashBoardListNextShift(),
    watchDashBoardListWorkingHour(),
    watchDashBoardForm(),

    watchReportWorkingHour(),


    //Forgot Password
    watchSendAccountForgotPassword(),
    watchSendCodeVerifyForgotPassword(),

    watchNotificationMark(),

    watchRemovePrivateGenView(),
    watchReplaceScreenLogin(),

    watchShowPopupUpdateApp(),
  ]);
}

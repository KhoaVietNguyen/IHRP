import {combineReducers} from 'redux';
import loginReducers from './loginReducers';
import notificationReducers from './attendance/NotificationReducers'
import getHistoryCalendarsCheckInOutInMonthReducers from './attendance/CalendarsReducers'
import listForApprovalReducers from './attendance/ApproveApplicationReducers'
import leaveApplicationReducers from './application/leaveApplicationReducers'
import businessTripApplicationReducers from './application/businessTripApplicationReducer'
import homeReducers from './home/homeReducers'
import configReducers from './configReducers'

//MinhNC15
import getAppReducers from './getApp/GetAppReducers';
import payslipReducers from './salary/payslipReducers';
import payslipViewReducers from './salary/payslipViewReducers';
import salaryHistoryReducers from './salary/salaryHistoryReducers';
import payslipViewDetailReducers from './salary/payslipViewDetailReducers';
//MinhNC15
//
import applicationApprovalReducers from './application/applicationApprovalReducers'
import getPrivateGenViewReducers from './personalPage/PrivateGenViewReducers';
import {
  getPersonalFormReducers,
  getPersonalFormSourceReducers,
  savePersonalFormReducers,
} from './personalPage/PersonalFormReducers';
import {
  getPersonalListReducers,
  getPersonalProfileReducers,
} from './userInfo/PersonalListReducers';
import {
  getPrivateViewReducers,
  getPersonalFormListReducers,
  getPrivateFormReducers,
  getPrivateListReducers,
  savePrivateFormReducers,
  deletePrivateFormReducers,
} from './userInfo/PrivateViewReducers';
import {getPrivateGeneralReducers,submitPrivateGeneralReducers} from './userInfo/PrivateGeneralReducers';
import uploadAvatarReducers from './userInfo/uploadAvatarReducers'
import attachFileApplicationReducers from './application/attachFileApplicationReducers';
import overTimeApplicationReducers from './application/overTimeApplicationReducers';
import logTMSApplicationReducers from './application/logTMSApplicationReducers';
import applicationHistoryReducers from './application/applicationHistoryReducers';

import {
  dashBoardReducers,
  dashBoardFormReducers,
} from './dashboard/DashBoardReducers';

import {reportWorkingHourReducers} from './report/reportReducers'
//
import forgotPasswordReducers from '../reducers/forgotPassword/forgotPasswordReducers'
const allReducers = combineReducers({
  configReducers,
  loginReducers,
  getPersonalListReducers,
  getPrivateViewReducers,
  getPersonalProfileReducers,
  leaveApplicationReducers,
  getPrivateGeneralReducers,
  submitPrivateGeneralReducers,
  //PhucNT34
  notificationReducers,
  getHistoryCalendarsCheckInOutInMonthReducers,
  listForApprovalReducers,
  
  getPrivateGenViewReducers,
  getPersonalFormReducers,
  homeReducers,
  getPersonalFormListReducers,
  getPrivateFormReducers,
  getPrivateListReducers,
  savePersonalFormReducers,
  //MinhNC15
  getAppReducers,
  payslipReducers,
  payslipViewReducers,
  salaryHistoryReducers,
  payslipViewDetailReducers,

  businessTripApplicationReducers,
  overTimeApplicationReducers,
  attachFileApplicationReducers,
  savePrivateFormReducers,
  logTMSApplicationReducers,
  deletePrivateFormReducers,
  applicationHistoryReducers,
  getPersonalFormSourceReducers,
  applicationApprovalReducers,

  dashBoardReducers,
  dashBoardFormReducers,
  reportWorkingHourReducers,
  forgotPasswordReducers,
  uploadAvatarReducers,
});

export default allReducers;

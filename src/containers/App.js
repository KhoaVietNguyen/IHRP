import React from 'react';
import { Button, Image, View, Text } from 'react-native';
import { Sizes } from '@dungdang/react-native-basic';
import getImage from '../res/values/strings/iconStrS';
import { createAppContainer } from 'react-navigation'; // 1.0.0-beta.27
import { createStackNavigator } from 'react-navigation-stack';

import { createBottomTabNavigator } from 'react-navigation-tabs';

import Login from '../components/login/Login';
import LoginContainer from '../containers/login/LoginContainer';
import TestForm from '../components/login/TestForm';
import WelcomeScreen from '../components/welcomeScreen/WelcomeScreen';

//PhucNT34
import CalendarsContainer from '../containers/attendance/CalendarsContainer';
import PrivateGenViewContainer from '../containers/personalPage/PrivateGenViewContainer';
import PersonalFormContainer from '../containers/personalPage/PersonalFormContainer'

import Home from '../components/home/Home';
import Home2 from '../components/home/Home';
import HomeContainer from '../containers/home/HomeContainer';
import ApproveApplicationContainer from '../containers/attendance/ApproveApplicationContainer';
import NotificationContainer from '../containers/attendance/NotificationContainer';
import UserInfo from './userInfo/UserInfo';
import Notification from '../components/notification/Notification';
import PrivateViewContainer from './userInfo/PrivateViewContainer';
import LeaveApplicationContainer from '../containers/application/LeaveApplicationContainer'
import BusinessTripApplicationContainer from '../containers/application/BusinessTripApplicationContainer'
import PrivateGeneralContainer from '../containers/userInfo/PrivateGeneralContainer';


import PrivateViewFormContainer from '../containers/userInfo/PrivateViewFormContainer'
import PrivateViewFormListContainer from '../containers/userInfo/PrivateViewFormListContainer'
import ForgotPasswordContainer from '../containers/forgotPassword/ForgotPasswordContainer'
import OverTimeApplicationContainer from '../containers/application/OverTimeApplicationContainer'

import MyApplicationSearchContainer from '../containers/application/MyApplicationSearchContainer'
import LogTMSApplicationContainer from '../containers/application/LogTMSApplicationContainer'
import ApproverApplicationSearchContainer from './application/ApproverApplicationSearchContainer'
// MinhNC15
import SalaryContainer from '../containers/salary/SalaryContainer'
// MinhNC15
import RegisterDeviceContainer from '../containers/home/RegisterDeviceContainer'
import ApplicationHistoryContainer from '../containers/application/ApplicationHistoryContainer'
import MyApplicationContainer from '../containers/application/MyApplicationContainer'

import ApplicationApprovalContainer from './application/ApplicationApprovalContainer'
import DashBoardContainer from './dashboard/DashBoardContainer'
import ReportWorkingHourContainer from './report/ReportWorkingHourContainer'
import ImageView from '../components/application/ImageView'
import FileWebView from '../components/application/FileWebView'
import NotificationDetailContainer from '../containers/attendance/NotificationDetailContainer'
import DayLeaveApplicationContainer from '../containers/application/DayLeaveApplicationContainer'
import CustomTabBarContainer from './CustomTabBarContainer'
import ShowGalleryContainer from '../containers/userInfo/ShowGalleryContainer';
import RegisterDeviceGPS from '../components/home/RegisterDeviceGPS'

import RegisterDeviceGPSContainer from '../containers/home/RegisterDeviceGPSContainer'

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeContainer,
      // navigationOptions: {
      //   tabBarLabel: 'Trang chủ',
      //   tabBarIcon: ({ focused }) => (
      //     <>
      //       {focused ? (
      //         <Image
      //           source={getImage('ic_home_checked')}
      //           style={{ width: Sizes.s50, height: Sizes.s50 }}
      //         />
      //       ) : (
      //           <Image
      //             source={getImage('ic_home')}
      //             style={{ width: Sizes.s50, height: Sizes.s50 }}
      //           />
      //         )}
      //     </>
      //   ),
      // },
    },
    DashBoard: {
      screen: DashBoardContainer,
      // navigationOptions: {
      //   tabBarLabel: 'Dash Board',
      //   tabBarIcon: ({ focused }) => (
      //     <>
      //       {focused ? (
      //         <Image
      //           source={getImage('dashboard_activate')}
      //           style={{ width: Sizes.s50, height: Sizes.s50 }}
      //         />
      //       ) : (
      //           <Image
      //             source={getImage('dashboard')}
      //             style={{ width: Sizes.s50, height: Sizes.s50 }}
      //           />
      //         )}
      //     </>
      //   ),
      // },
    },
    ApproveApplicationContainer: {
      screen: ApproveApplicationContainer,
      // navigationOptions: {
      //   tabBarLabel: 'Duyệt đơn',
      //   tabBarIcon: ({ focused }) => (
      //     <>
      //       {focused ? (
      //         <Image
      //           source={getImage('ic_reg_checked')}
      //           style={{ width: Sizes.s50, height: Sizes.s50 }}
      //         />
      //       ) : (
      //           <Image
      //             source={getImage('ic_reg')}
      //             style={{ width: Sizes.s50, height: Sizes.s50 }}
      //           />
      //         )}
      //     </>
      //   ),
      // },
    },
    //PhucNT34
    NotificationContainer: {
      screen: NotificationContainer,
      // navigationOptions: {
      //   tabBarLabel: 'Thông báo',
      //   tabBarIcon: ({ focused }) => (
      //     <>
      //       {focused ? (
      //         <Image
      //           source={getImage('ic_alert')}
      //           style={{ width: Sizes.s50, height: Sizes.s50 }}
      //         />
      //       ) : (
      //           <Image
      //             source={getImage('ic_alert')}
      //             style={{ width: Sizes.s50, height: Sizes.s50 }}
      //           />
      //         )}
      //     </>
      //   ),
      // },
    },
    UserInfo: {
      screen: UserInfo,
      // navigationOptions: {
      //   tabBarLabel: 'Cá nhân',
      //   tabBarIcon: ({ focused }) => (
      //     <>
      //       {focused ? (
      //         <Image
      //           source={getImage('ic_personal_checked')}
      //           style={{ width: Sizes.s50, height: Sizes.s50 }}
      //         />
      //       ) : (
      //           <Image
      //             source={getImage('ic_personal')}
      //             style={{ width: Sizes.s50, height: Sizes.s50 }}
      //           />
      //         )}
      //     </>
      //   ),
      // },
    },
  },
  {
    tabBarComponent: props => <CustomTabBarContainer {...props} />
    // tabBarOptions: {
    //   activeTintColor: '#4390DF',
    //   inactiveTintColor: '#707070',
    // },
  },
);

const TAB = createAppContainer(TabNavigator);

const RootStack = createStackNavigator(
  {
    Init: {
      screen: LoginContainer,
    },
    // MinhNC15
    LoginContainer: {
      screen: LoginContainer,
    },
    ForgotPasswordContainer: {
      screen: ForgotPasswordContainer,
    },
    SalaryContainer: {
      screen: SalaryContainer,
    },
    // MinhNC15
    MyModal: {
      screen: TAB,
    },
    //PhucNT34
    CalendarsContainer: {
      screen: CalendarsContainer,
    },
    PrivateGenViewContainer: {
      screen: PrivateGenViewContainer
    },
    PersonalFormContainer: {
      screen: PersonalFormContainer
    },
    LeaveApplicationContainer: {
      screen: LeaveApplicationContainer,
    },

    PrivateView: {
      screen: PrivateViewContainer,
    },

    GeneralList: {
      screen: PrivateGeneralContainer,
    },
    PrivateViewApplication: {
      screen: PrivateViewFormContainer,
    },
    BusinessTripApplicationContainer: {
      screen: BusinessTripApplicationContainer
    },
    OverTimeApplicationContainer: {
      screen: OverTimeApplicationContainer
    },

    PrivateViewFormListContainer: {
      screen: PrivateViewFormListContainer
    },
    MyApplicationSearchContainer: {
      screen: MyApplicationSearchContainer
    },
    LogTMSApplicationContainer: {
      screen: LogTMSApplicationContainer
    },
    ApproverApplicationSearchContainer: {
      screen: ApproverApplicationSearchContainer
    },
    ApplicationHistoryContainer: {
      screen: ApplicationHistoryContainer
    },
    RegisterDeviceContainer: {
      screen: RegisterDeviceContainer
    },
    MyApplicationContainer: {
      screen: MyApplicationContainer
    },
    ApplicationApprovalContainer: {
      screen: ApplicationApprovalContainer
    },
    ReportWorkingHourContainer: {
      screen: ReportWorkingHourContainer
    },
    ImageView: {
      screen: ImageView
    },
    FileWebView: {
      screen: FileWebView
    },
    NotificationDetailContainer: {
      screen: NotificationDetailContainer
    },
    DayLeaveApplicationContainer: {
      screen: DayLeaveApplicationContainer
    },
    ShowGalleryContainer: {
      screen: ShowGalleryContainer
    },
    RegisterDeviceGPSContainer: {
      screen: RegisterDeviceGPSContainer
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(RootStack);

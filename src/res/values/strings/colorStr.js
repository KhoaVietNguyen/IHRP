const colorForm = {
  // inputForm: '#FAFAFA'
  inputForm: '#FFF',
  labelForm: '#538BF5',
  indicator: '#538BF5',
};

const colorHome = {
  textDefault: '#275375',
  textClock: '#0080FF',
  colorTitle: '#3796F6',
  textWhite: '#FFF',
};

const colorApprove = {
  name: '#330099',
  leaveName: '#717171',
  time1: '#717171',
  time2: '#0066FF',
  taken: '#FFCC00',
  bgAllow: '#0066FF',
  bgDeny: '#FF0000',
  textSend: '#FFF',
  buttonSend: '#3333FF',
  buttonCancel: '#999',
  placeholderTextColor: '#717171',
  styleContainer: '#FFF',
  styleBottom: '#DDD',
  bg_left: '#FFFFFF',
  bg_right: '#E1E1E1',
  cl_left: '#0000FF',
  cl_right: '#717171',
};

const colorPersonal = {
  error: '#FF6600',
  tabBar: '#FFF',
  indicatorStyle: '#0000FF',
  tabBarTextLine:"#4F8DFF"
};

const colorNotification = {
  container: '#FFF',
  ItemSeparator: '#808080',
  ago: '#717171',
};

const colorCalendar = {
  warn: '#F54B5B',
  renderArrow: '#E0E2E7',
};

const colorPersonalForm = {
  bg_container: '#FFF',
};
export {
  colorForm,
  colorHome,
  colorPersonal,
  colorApprove,
  colorNotification,
  colorCalendar,
  colorApplication,
  colorPersonalForm,
  colorApplicationHistory,
  colorReportOT,
};
const colorApplication = {
  waitingApplication: '#FCC201',
  newApplication: '#01AAF0',
  finishApplication: '#28CE34',
  rejectApplication: '#FA3C3F',

  empNameApplication: '#538BF5',

  dayStatusOT: '#FF9118',
  nightStatusOT: '#1265FF',
  replaceStatusOT: '#FF4545',

  // Log TMS

  colorStatus1: '#03A9F4',
  colorStatus2: '#FFA200',
  colorStatus3: '#36BE3A',
  colorStatus4: '#F93A3A',

  // colorBranch

  colorBranch: '#03A9F4',
};

const colorApplicationHistory = {
  colorStatus1: '#03A9F4',
  colorStatus2: '#FFA200',
  colorStatus3: '#36BE3A',
  colorStatus4: '#F93A3A',
};

const colorReportOT = {
  colorStatus1: '#1067fa',
  colorStatus2: '#FF9118',
  colorStatus3: '#7745FF',
  colorStatus4: '#0fc50e',
  colorStatus5: '#F93A3A',
};

const colorTitlePrivate = {
  colorStatus1: '#1067fa',
  colorStatus2: '#FF9118',
  colorStatus3: '#0fc50e',
  colorStatus4: '#F93A3A',
};

export function getTitlePrivate(src) {
  switch (src) {
    case 'private_list_ic12':
        return colorTitlePrivate.colorStatus2;
    case 'private_list_ic13':
        return colorTitlePrivate.colorStatus3;
    case 'private_list_ic14':
        return colorTitlePrivate.colorStatus3;
    case 'private_list_ic15':
        return colorTitlePrivate.colorStatus1;
    case 'private_list_ic16':
        return colorTitlePrivate.colorStatus3;
    case 'private_list_ic17':
        return colorTitlePrivate.colorStatus2;
    case 'private_list_ic18':
        return colorTitlePrivate.colorStatus4;
    case 'private_list_ic19':
        return colorTitlePrivate.colorStatus1;
    case 'private_list_ic20':
        return colorTitlePrivate.colorStatus2;
    case 'private_list_ic21':
        return colorTitlePrivate.colorStatus2;
    case 'private_list_ic22':
        return colorTitlePrivate.colorStatus4;
    case 'private_list_ic23':
        return colorTitlePrivate.colorStatus1;
    case 'private_list_ic24':
        return colorTitlePrivate.colorStatus4;
    case 'private_list_ic25':
        return colorTitlePrivate.colorStatus1;
    case 'private_list_ic26':
        return colorTitlePrivate.colorStatus3;
    case 'private_list_ic27':
        return colorTitlePrivate.colorStatus1;
    case 'private_list_ic28':
        return colorTitlePrivate.colorStatus1;
    case 'private_list_ic29':
        return colorTitlePrivate.colorStatus1;
    case 'private_ic20':
        return colorTitlePrivate.colorStatus3;
    default:
        return "black"


  }
}

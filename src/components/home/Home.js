import React from 'react';
import {
  Button,
  Image,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
  FlatList,
  Alert,
  Modal,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  BackHandler
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { userProfile } from '../../config/settings';
import { iconStr } from '../../res/values/strings/iconStr';
import { colorHome } from '../../res/values/strings/colorStr';
import getImage from '../../res/values/strings/iconStrS';
import { Sizes } from '@dungdang/react-native-basic';
import {
  arrayIsEmpty,
  objectIsNull,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import { appStrS } from '../../res/values/strings/appStrS';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Loading from '../custom/Loading';
import NetInfo from '@react-native-community/netinfo';
import { NetworkInfo } from 'react-native-network-info';
import ItemTimeCheckInOut from './custom/ItemTimeCheckInOut';
import ButtonCheckInOut from './custom/ButtonCheckInOut';
import PopupLoginContainer from '../../containers/login/PopupLoginContainer';
import { CustomTextInput } from '../custom/CustomTextInput';

import { colorForm, colorApplication } from '../../res/values/strings/colorStr';
import CheckInOutComponent from './CheckInOutComponent'
import CheckInOutGPSComponent from './CheckInOutGPSComponent'
import DeviceInfo from 'react-native-device-info'
let flagsss = false
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeClock: this.getNowDate(2),
      checkInOut: 'i',

      dataRequester: [],
      dataInfo: [],
      codeVerify: undefined,
      messageVerify: '',
      timeCheckIn: '',
      timeCheckOut: '',
      dataCheckInOut: undefined,
      nameWifi: '',
      isConnectedWifi: false,
      colorTitleWifi: colorHome.textDefault,


      wifiMacAddress: '',
      deviceID: '',

      //popup
      // visiblePopupLogin: true,
      password: '',
      errorPassword: '',

      // status
    };
  }
  async checkWifi() {
    // let ssss = await NetInfo.fetch()
    // let zzzz = ssss.details.ssid ? ssss.details.ssid : 'error';

    // console.warn('vvvvv: ', ssss)
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.type === 'cellular') {
        this.setState({
          nameWifi: stringIsEmpty(state.details.cellularGeneration)
            ? ''
            : `${state.details.carrier
            } ${state.details.cellularGeneration.toLocaleUpperCase()}`,
          isConnectedWifi: state.isConnected,
        });
      } else {
        this.setState(
          {
            isConnectedWifi: state.isConnected,
          },
          async () => {
            // let wfname = await NetworkInfo.getSSID()
            NetworkInfo.getBSSID().then(value => {
              this.setState({ wifiMacAddress: value })
            })
            NetworkInfo.getSSID().then(ssid => {
              if (this.state.isConnectedWifi) {

                this.setState({
                  nameWifi:
                    (ssid !== null &&
                      ssid !== undefined &&
                      ssid !== '(null)' &&
                      ssid !== '<unknown ssid>')
                      ? ssid
                      : userProfile.LangID === 'VN' ? 'Đang kết nối mạng' : 'Networking',
                });
              } else {
                this.setState({
                  nameWifi: userProfile.LangID === 'VN' ? 'Không kết nối mạng' : 'No network connection',
                });
              }
            });
          },
        );
      }
    });

    // unsubscribe();

    // console.log('----------------- ');
  }
  logOutAlert() {
    Alert.alert(
      userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
      userProfile.LangID === 'VN' ? 'Bạn có chắc muốn đăng xuất không?' : 'Are you sure you want to log out?',
      [
        {
          text: userProfile.LangID === "VN" ? 'Đóng' : 'Cancel',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
        {
          text: userProfile.LangID === "VN" ? 'Xác nhận' : 'Confirm',
          onPress: () => {
            // userProfile.Stoken = ""
            // userProfile.username = "VN"
            // userProfile.LangID = ""
            // userProfile.AppVersion = userProfile.AppVersion
            this.props.deleteTokenNotiAction()
            this.props.navigation.replace("LoginContainer")
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  backAction = () => {
    if (this.props.navigation.isFocused()) {
      // Alert.alert(userProfile.LangID === 'VN' ? 'sdsd' : '', '12314634', [{ text: '123456' }])
      this.logOutAlert()
      return true
    } else {
      return false
    }
  }
  componentWillUnmount() {
    this.BackHandler.remove()
  }
  async componentDidMount() {
    // console.log('PropsNavigation: ', this.props.navigation)
    this.BackHandler = BackHandler.addEventListener('hardwareBackPress', this.backAction)
    await this.checkWifi();
    // this.willFocusSubscription = this.props.navigation.addListener(
    //   "willFocus",
    //   () => {
    //     console.log('nameWifi: ', this.state.nameWifi)
    //     let inputWifi = {
    //       P1: "7c1689b3fc66e03f",
    //       P2: "fc:ec:da:a2:f5:73",
    //       P3: this.getNowDate(3),
    //       P4: "FIS.HCM"
    //     }
    //     this.props.wifiVerifyCheckInOutAction(inputWifi)
    //   }
    // );
    if (Platform.OS === 'android') {
      DeviceInfo.getAndroidId().then(value => {
        this.setState({
          deviceID: value
        })
      })
    } else {
      this.setState({
        deviceID: DeviceInfo.getUniqueId()
      })
    }
    // setInterval(() => {
    //   this.setState({
    //     timeClock: this.getNowDate(2),
    //   });
    // }, 1000);

  }
  checkDataWifiVerify(data) {

    if (!objectIsNull(data.info1)) {
      if (!arrayIsEmpty(data.info1.dataItem)) {
        let { code, message } = data.info1.dataItem[0];
        // let code = '1'
        // if (flagsss) {
        //   code = data.info1.dataItem[0];
        // } else {
        //   code = '1'
        //   flagsss = true
        // }

        if (code === '0') {
          this.setState({
            codeVerify: code,
            messageVerify: '',
          });
        } else if (
          code === '1'
          // || code === '2'
        ) {
          Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice', message, [
            {
              text: userProfile.LangID === 'VN' ? 'Đăng ký' : 'Registry',
              onPress: () => {
                this.setState(
                  {
                    codeVerify: code,
                    messageVerify: message,
                  },
                  () => {
                    this.props.navigation.navigate('RegisterDeviceContainer', {
                      code: code,
                      message,
                      onChangeStatusWillFocus: this.props.onChangeStatusWillFocus,
                    });
                  },
                );
              },
            },
            {
              text: userProfile.LangID === 'VN' ? 'Hủy' : 'Cancel',
              onPress: () => {
                this.setState({
                  codeVerify: code,
                  messageVerify: message,
                });
              },
            },
          ]);
        } else {
          this.setState({
            codeVerify: code,
            messageVerify: message
          })
        }
        // else if (code === '3' || code === '4' || code === '5') {
        //   this.setState(
        //     {
        //       codeVerify: code,
        //       messageVerify: message,
        //     },
        //     () => {
        //       this.props.navigation.navigate('RegisterDeviceContainer', {
        //         code: code,
        //         message,
        //         onChangeStatusWillFocus: this.props.onChangeStatusWillFocus,
        //       });
        //     },
        //   );
        // }
      }
    }
  }
  checkDataWifiInfoCheckInOutInDay(data) {
    if (!objectIsNull(data.info1)) {
      this.setState({
        dataCheckInOut: !arrayIsEmpty(data.info1.dataItem)
          ? data.info1.dataItem
          : [],
        checkInOut: !arrayIsEmpty(data.info1.dataItem)
          ? data.info1.dataItem[0].checkType === 'i'
            ? 'o'
            : 'i'
          : 'i',
      });
    }
  }
  componentDidUpdate(prevProps) {
    const {
      dataWifiVerify,
      dataWFHVerify,

      dataWifiInfoCheckInOutInDay,
      dataRequestCaptureCheckInOut,
      dataWFHRequestCaptureCheckInOut,

      data,
      typeLogin,
      dataGetUser2,


      errorWifiVerify,
      errorWFHVerify,

    } = this.props;

    // LoginPopup
    if (data !== prevProps.data) {
      if (!stringIsEmpty(data)) {
        if (typeLogin === 'popup') {
          // userProfile.Stoken = data
          // let response = await this.fetApi()
          // console.log("responseeHomeContainer: ", response)
        }
      }
    }
    // end
    if (
      dataRequestCaptureCheckInOut !== prevProps.dataRequestCaptureCheckInOut
    ) {
      if (!objectIsNull(dataRequestCaptureCheckInOut)) {
        this.props.getInfoCheckInOutInDayAction({
          F: 'A2',
          P: this.getNowDate(4),
        });
      }
    }
    if (dataWFHRequestCaptureCheckInOut !== prevProps.dataWFHRequestCaptureCheckInOut) {
      if (!objectIsNull(dataWFHRequestCaptureCheckInOut)) {
        this.props.getWFHInfoCheckInOutInDayAction({
          F: 'A2',
          P: this.getNowDate(4)
        })
      }
    }


    if (dataWifiVerify !== prevProps.dataWifiVerify) {
      if (!objectIsNull(dataWifiVerify)) {
        this.checkDataWifiVerify(dataWifiVerify);
      }
    }
    if (dataWFHVerify !== prevProps.dataWFHVerify) {
      if (!objectIsNull(dataWFHVerify)) {
        this.checkDataWifiVerify(dataWFHVerify);
      }
    }

    if (errorWifiVerify !== prevProps.errorWifiVerify) {
      if (!stringIsEmpty(errorWifiVerify)) {
        this.setState({
          codeVerify: 'error',
          messageVerify: errorWifiVerify
        })
      } else {
        // this.setState({
        //   codeVerify: 'error',
        //   messageVerify: errorWifiVerify
        // })
      }
    }
    if (errorWFHVerify !== prevProps.errorWFHVerify) {
      if (!stringIsEmpty(errorWFHVerify)) {
        this.setState({
          codeVerify: 'error',
          messageVerify: errorWFHVerify
        })
      } else {
        // this.setState({
        //   codeVerify: 'error',
        //   messageVerify: errorWifiVerify
        // })
      }
    }


    // if (dataWifiInfoCheckInOutInDay !== prevProps.dataWifiInfoCheckInOutInDay) {
    //   if (!objectIsNull(dataWifiInfoCheckInOutInDay)) {
    //     this.checkDataWifiInfoCheckInOutInDay(dataWifiInfoCheckInOutInDay);
    //   }
    // }

    if (dataGetUser2 !== prevProps.dataGetUser2) {
      if (!objectIsNull(dataGetUser2)) {
        userProfile.typeLeaveApplication = '1'
        // console.log('vbbbbbbbbbbbvvvvvvvvvvvvvvvvv: ', dataGetUser2.info1)
        this.props.getWFRequesterAction()
        if (!arrayIsEmpty(dataGetUser2.info1)) {
          let data = []
          let listRequester = []
          if (!arrayIsEmpty(dataGetUser2.info1.dataItem)) {
            // console.log('DataGetUser: ', dataGetUser2.info1)
            for (let item of dataGetUser2.info1.dataItem) {
              switch (item.id) {
                case 152:
                  listRequester.push(
                    {
                      imageSrc: '',
                      workflowID: '1',
                      workflowType: '2',
                      workflowCode: '1',
                      workflowName: item.name,
                      description: '',
                      color: 'A',
                    },
                  )
                  break
                case 153:
                  listRequester.push(
                    {
                      imageSrc: '',
                      workflowID: '11',
                      workflowType: '',
                      workflowCode: '11',
                      workflowName: item.name,
                      description: '',
                      color: 'A',
                    },
                  )
                  break

                case 154:
                  listRequester.push(
                    {
                      imageSrc: '',
                      workflowID: '3',
                      workflowType: '',
                      workflowCode: '3',
                      workflowName: item.name,
                      description: '',
                      color: 'A',
                    },
                  )
                  break

                case 155:
                  listRequester.push(
                    {
                      imageSrc: '',
                      workflowID: '75',
                      workflowType: '',
                      workflowCode: '75',
                      workflowName: item.name,
                      description: '',
                      color: 'A',
                    },
                  )
                  break

                case 202:
                  data.push(
                    {
                      imageSrc: '',
                      workflowID: '-98',
                      workflowType: '2',
                      workflowCode: '1',
                      workflowName: item.name,
                      description: '',
                      color: 'A',
                    },
                  )
                  break
                case 203:
                  data.push(
                    {
                      imageSrc: '',
                      workflowID: '-97',
                      workflowType: '2',
                      workflowCode: '1',
                      workflowName: item.name,
                      description: '',
                      color: 'A',
                    },
                  )
                  break
                case 204:
                  data.push(
                    {
                      imageSrc: '',
                      workflowID: '-96',
                      workflowType: '2',
                      workflowCode: '1',
                      workflowName: item.name,
                      description: '',
                      color: 'A',
                    },
                  )
                  break
                default:
                  break
              }
            }
            this.setState({
              dataInfo: data,
              dataRequester: listRequester
            })
          }
        }
      }
    }

    // if (this.props.dataRequester !== prevProps.dataRequester) {
    //   if (!arrayIsEmpty(this.props.dataRequester)) {
    //     let data = this.props.dataRequester

    //     let workflowLeaveType = this.props.dataRequester.filter((val) => {
    //       return val.workflowID === '1'
    //     })
    //     if (!arrayIsEmpty(workflowLeaveType)) {
    //       userProfile.typeLeaveApplication = workflowLeaveType[0].workflowType
    //     }
    //     if (!objectIsNull(dataGetUser2)) {
    //       if (!arrayIsEmpty(dataGetUser2.info1)) {
    //         if (!arrayIsEmpty(dataGetUser2.info1.dataItem)) {
    //           let arr = []
    //           for (let item of dataGetUser2.info1.dataItem) {
    //             switch (item.id) {
    //               case 152:
    //                 for (let value of data) {
    //                   if (value.workflowID === 1 || value.workflowID === '1') {
    //                     value.workflowName = item.name
    //                     arr.push(value)
    //                   }
    //                 }
    //                 break
    //               case 153:
    //                 for (let value of data) {
    //                   if (value.workflowID === 3 || value.workflowID === '3') {
    //                     value.workflowName = item.name
    //                     arr.push(value)
    //                   }
    //                 }
    //                 break
    //               case 154:
    //                 for (let value of data) {
    //                   if (value.workflowID === 75 || value.workflowID === '75') {
    //                     value.workflowName = item.name
    //                     arr.push(value)
    //                   }
    //                 }
    //                 break
    //               case 155:
    //                 for (let value of data) {
    //                   if (value.workflowID === 11 || value.workflowID === '11') {
    //                     value.workflowName = item.name
    //                     arr.push(value)
    //                   }
    //                 }
    //                 break
    //               default:
    //                 break
    //             }
    //           }
    //           this.setState({
    //             dataRequester: arr,
    //           });
    //         }
    //       }

    //     }
    //   }
    // }


  }
  getNowDate(type) {
    let d = new Date();
    if (type === 1) {
      let t = d.getDay() + 1;
      let day = ('0' + d.getDate()).substr(-2);
      let month = ('0' + (d.getMonth() + 1)).substr(-2);
      let year = d.getFullYear();
      if (userProfile.LangID === 'VN') {
        return (t === 1 ? 'Chủ nhật' : 'Thứ ') + t + ' ' + day + '/' + month + '/' + year;
      } else {
        let nameDay = (
          t === 2 ? 'Monday'
            : t === 3 ? 'Tuesday'
              : t === 4 ? 'Wednesday'
                : t === 5 ? 'Thursday'
                  : t === 6 ? 'Friday'
                    : t === 7 ? 'Saturday'
                      : t === 1 ? 'Sunday'
                        : 'Today'
        )
        return nameDay + ' ' + day + '/' + month + '/' + year;
      }

    } else if (type === 2) {
      let hour = ('0' + d.getHours()).substr(-2);
      let minute = ('0' + d.getMinutes()).substr(-2);
      let second = ('0' + d.getSeconds()).substr(-2);

      return hour + ':' + minute + ':' + second;
    } else if (type === 3) {
      let day = ('0' + d.getDate()).substr(-2);
      let month = ('0' + (d.getMonth() + 1)).substr(-2);
      let year = d.getFullYear();

      let hour = ('0' + d.getHours()).substr(-2);
      let minute = ('0' + d.getMinutes()).substr(-2);
      let second = ('0' + d.getSeconds()).substr(-2);
      return (
        year +
        '-' +
        month +
        '-' +
        day +
        ' ' +
        hour +
        ':' +
        minute +
        ':' +
        second
      );
    } else if (type === 4) {
      let day = ('0' + d.getDate()).substr(-2);
      let month = ('0' + (d.getMonth() + 1)).substr(-2);
      let year = d.getFullYear();
      return year + '-' + month + '-' + day;
    }
  }
  touchRequesterItem(id, type) {
    // console.log('idScreen----------- : ', id);
    // console.log('typeScreen----------- : ', type);
    if (id === '1') {
      this.props.navigation.navigate('DayLeaveApplicationContainer');
      if (type === '1') {
        // this.props.navigation.navigate('DayLeaveApplicationContainer');
      } else if (type === '2') {
        // this.props.navigation.navigate('LeaveApplicationContainer');
      }

    } else if (id === '11') {
      this.props.navigation.navigate('BusinessTripApplicationContainer');
    } else if (id === '3') {
      this.props.navigation.navigate('OverTimeApplicationContainer');
    } else if (id === '75') {
      // màn hình logTMS
      this.props.navigation.navigate('MyApplicationSearchContainer', {
        idScreen: '75',
      });
    } else if (id === '-97') {
      // MinhNC15 - man hinh Thong tin Luong
      this.props.navigation.navigate('SalaryContainer');
    } else if (id === '-96') {
      this.props.navigation.navigate('MyApplicationSearchContainer')
    } else if (id === '-98') {
      this.props.navigation.navigate('UserInfo');
    }
  }
  requesterItem(item, index) {
    if (item.workflowID === '-99') {
      return (
        <TouchableOpacity
          onPress={() => {
            this.touchRequesterItem(item.workflowID, item.workflowType);
          }}
          style={styles.touchRequesterItem}>
          {/* <Image source={getImage('dangky_card_' + item.workflowID)} style={styles.iconRequesterItem} /> */}
          <View style={styles.iconSeemore}>
            <Icon
              name="ellipsis-h"
              color={colorHome.colorTitle}
              size={Sizes.s40}
            />
          </View>
          <Text numberOfLines={1}>{item.workflowName}</Text>
        </TouchableOpacity>
      );
    } else {
      let image = 'ic_home_function_' + item.workflowID;

      if (item.workflowID === '-98') {
        image = 'ic_home_function_2';
      } else if (item.workflowID === '-97') {
        image = 'ic_home_function_4';
      } else if (item.workflowID === '-96') {
        image = 'ic_home_function_5';
      }
      return (
        <TouchableOpacity
          onPress={() => {
            this.touchRequesterItem(item.workflowID, item.workflowType);
          }}
          style={styles.touchRequesterItem}>
          <View style={{
            width: Sizes.s100,
            height: Sizes.s100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image
              source={getImage(image)}
              style={[
                styles.iconRequesterItem,
                {
                  width:
                    item.workflowID === '-98' ||
                      item.workflowID === '-97' ||
                      item.workflowID === '-96'
                      ? Sizes.s70
                      : Sizes.s70,
                  height:
                    item.workflowID === '-98' ||
                      item.workflowID === '-97' ||
                      item.workflowID === '-96'
                      ? Sizes.s70
                      : Sizes.s70,
                },
              ]}
            />
          </View>
          <Text numberOfLines={1}>{item.workflowName}</Text>
        </TouchableOpacity>
      );
    }
  }
  requestCheckInOut() {
    // requestCaptureCheckInOutAction
    let dateTime = this.getNowDate(3);
    this.props.requestCaptureCheckInOutAction({
      P0: '',
      P1: this.state.checkInOut,
      P2: this.state.deviceID,
      P3: this.state.wifiMacAddress,
      P4: dateTime,
      P5: this.state.nameWifi,
    });
  }
  onPressSubmit() {
    const { password } = this.state;
    if (stringIsEmpty(password.trim())) {
      this.setState({
        errorPassword: 'Vui lòng nhập mật khẩu',
      });
    } else {
      this.props.loginAction({
        username: userProfile.username,
        // username: 'thuongphan',
        Password: password,
        OS: userProfile.OS,
        DeviceID: this.state.deviceID,
        Version: userProfile.AppVersion,
        LangID: userProfile.LangID,
        type: 'popup',
      });

      // this.props.loginAction({
      //         username: 'thuongphan',
      //         Password: '12345',
      //         OS: '1',
      //         DeviceID: 'otiur08lf89756fdifdifjdf[dufd',
      //         Version: 25,
      //         LangID: 'VN',
      //         type: 'popup',
      //       })
    }
  }
  renderRequesterItem() {
    const { dataRequester } = this.state
    if (!arrayIsEmpty(dataRequester)) {

    } else {
      return null
    }
  }
  onPressCancel() { }

  itemFilterRender(id) {
    const { dataGetUser2 } = this.props
    if (!objectIsNull(dataGetUser2)) {
      if (!objectIsNull(dataGetUser2.info1)) {
        let item = dataGetUser2.info1.dataItem.filter((value) => {
          return value.id === id
        })
        if (!arrayIsEmpty(item)) {
          return item[0]
        } else {
          return undefined
        }
      } else {
        return undefined
      }
    } else {
      return undefined
    }
  }

  filterRender(id) {
    const { dataGetUser2 } = this.props
    if (!objectIsNull(dataGetUser2)) {
      if (!objectIsNull(dataGetUser2.info1)) {
        let item = dataGetUser2.info1.dataItem.filter((value) => {
          return value.id === id
        })
        if (!arrayIsEmpty(item)) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }
  }
  // showItemRequester(dataRequester) {
  //   let arr = []
  //   if (!arrayIsEmpty(dataRequester)) {

  //   }
  // }
  render() {
    const {
      dataRequester,
      timeCheckIn,
      timeCheckOut,
      checkInOut,
      nameWifi,
      isConnectedWifi,
      dataCheckInOut,
      visiblePopupLogin,
      wifiMacAddress,
    } = this.state;
    const {
      fetchingWifiVerify,
      fetchingWifiInfoCheckInOutInDay,
      fetchingRequester,
      fetchingRequestCaptureCheckInOut,
      visiblePopupPostLogin,

      fetchingGetUser2,
      dataGetUser2,
    } = this.props;
    // let info1 = undefined
    // if(!objectIsNull(dataGetUser2))    
    // console.log('Home - Render - Userprofile: ', userProfile)
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {/* <ImageBackground

          source={getImage('bg_header_2')}
          style={{ flex: 1, }}
          imageStyle={{
            // borderRadius: 28,
          }}
        > */}
        <View style={[styles.body, {
          // marginTop: Platform.OS === 'ios' ? Sizes.s80 : Sizes.s20,
        }]}>
          {/* <PopupLoginContainer {...this.props} /> */}
          {/* <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('LeaveApplicationContainer');
            }} style={{ width: 100, height: 50, backgroundColor: 'yellow', margin: 40 }}></TouchableOpacity> */}

          <View style={styles.body}>
            {(fetchingWifiVerify ||
              fetchingWifiInfoCheckInOutInDay ||
              fetchingRequester ||
              fetchingGetUser2 ||
              fetchingRequestCaptureCheckInOut) && <Loading />}
            <View style={styles.body}>
              <View style={styles.content}>
                <View style={styles.top}>
                  <ImageBackground
                    source={getImage('bg_header_2')}
                    style={{
                      width: '100%',
                      paddingTop: Platform.OS === 'ios' ? Sizes.s80 : Sizes.s40,
                      paddingBottom: Sizes.s40,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Sizes.h40,
                        fontWeight: 'bold',
                        // marginTop: Sizes.s60,
                        // marginVertical: Sizes.s100,
                        marginHorizontal: Sizes.s20,
                        color: 'white'
                      }}>{userProfile.LangID === 'VN' ? 'Trang chủ' : 'Home'}
                    </Text>
                  </ImageBackground>
                  {(this.filterRender(102) || this.filterRender(103)) &&
                    (
                      <CheckInOutComponent
                        itemCheckInOut={
                          !objectIsNull(this.itemFilterRender(102)) ? this.itemFilterRender(102) :
                            !objectIsNull(this.itemFilterRender(103)) ? this.itemFilterRender(103) :
                              undefined
                        }
                        {...this.props}
                        codeVerify={this.state.codeVerify}
                        messageVerify={this.state.messageVerify}
                      />
                    )
                  }

                  {/* {(this.filterRender(101)) &&
                    (
                      <View style={styles.header}>
                        <View style={styles.infoCheck}>
                          <View style={styles.wifi}>
                            <Image
                              source={getImage(
                                isConnectedWifi ? 'ic_wifi_check_in' : 'ic_no_wifi',
                              )}
                              style={
                                isConnectedWifi ? styles.iconWifi : styles.iconNoWifi
                              }
                            />
                            <Text
                              style={[
                                styles.titleWifi,
                                { color: isConnectedWifi ? '#275375' : 'red' },
                              ]}>
                              {nameWifi}
                            </Text>
                          </View>
                          <View style={styles.wifi}>
                            <Image
                              source={getImage('ic_calendar_check_in')}
                              style={styles.iconWifi}
                            />
                            <Text
                              style={[styles.date, { color: colorHome.textDefault }]}>
                              {this.getNowDate(1)}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.clock}>
                          <Text style={styles.time}>{this.state.timeClock}</Text>
                        </View>
                      </View>
                    )
                  } */}

                  {/* {this.filterRender(101) &&
                    (
                      <View style={styles.attendance}>
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            marginVertical: Sizes.s10,
                          }}>
                          <View
                            style={{
                              marginVertical: Sizes.s10,
                              borderRadius: Sizes.s10,
                              paddingTop: Sizes.s10,
                              paddingBottom: Sizes.s10,
                              height: Sizes.s340,
                              borderWidth: Sizes.s2,
                              borderColor: '#EBEDF0',
                              marginHorizontal: Sizes.s10,
                              // paddingHorizontal: Sizes.s40,
                              // backgroundColor: 'white',
                              // shadowColor: 'rgba(0, 0, 0, 0.5 )',
                              // shadowOffset: { width: 0, height: 4 },
                              // shadowRadius: Sizes.h10,
                              // shadowOpacity: 0.2,
                              // elevation: 3,
                              flex: 0.8,
                              alignItems: 'center'
                              // justifyContent: 'center'
                            }}>
                            <Text
                              style={{
                                color: colorHome.colorTitle,
                                // textAlign: 'center',
                                fontWeight: '500',
                                fontSize: Sizes.h30,
                              }}>{userProfile.LangID === 'VN' ? 'Thông tin' : 'Infomation'}</Text>
                            <View style={{ height: Sizes.s2, width: '80%', backgroundColor: '#EBEDF0', alignItems: 'center', marginTop: Sizes.s10, }}></View>
                            {!arrayIsEmpty(dataCheckInOut) ? (
                              <FlatList
                                showsVerticalScrollIndicator={false}
                                data={dataCheckInOut}
                                renderItem={({ item, index }) => {
                                  return <ItemTimeCheckInOut item={item} />;
                                }}
                              />
                            ) : null}
                          </View>
                          <View style={{ margin: Sizes.s10 }}>
                            <ButtonCheckInOut
                              type={checkInOut}
                              onPress={() => {
                                this.requestCheckInOut();
                              }}
                            />
                            <View style={styles.touchCheck}>
                              <TouchableOpacity
                                onPress={() => {
                                  Alert.alert(
                                    (userProfile.LangID === 'VN' ? 'Thông báo' : 'Notification'),
                                    userProfile.LangID === 'VN' ? 'Chức năng này tạm thời chưa hoạt động. Vui lòng quay lại sau !' : 'Function is close',
                                    [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Close', onPress: () => { } }],
                                  );
                                  // this.props.navigation.navigate('ApplicationApprovalContainer', {
                                  //   idApplication: '11', typeApplication: 2,
                                  // })
                                  // this.props.getWFRequesterAction()
                                }}
                                style={styles.touchHistoryCheck}>
                                <Image
                                  source={getImage('ic_location')}
                                  style={styles.historyCheck}
                                />
                              </TouchableOpacity>

                              <TouchableOpacity
                                onPress={() => {
                                  this.props.navigation.navigate(
                                    'CalendarsContainer',
                                  );
                                }}
                                style={styles.touchHistoryCheck}>
                                <Image
                                  source={getImage('ic_calendar_check_in')}
                                  style={styles.historyCheck}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    )
                  } */}
                </View>
                <View style={{
                  width: '100%',
                  backgroundColor: '#EBEDF0',
                  height: Sizes.s10,
                  marginBottom: Sizes.s10,
                  marginTop: this.filterRender(101) ? Sizes.s10 : Sizes.s10,
                }}>
                </View>

                {this.filterRender(104) &&
                  (
                    <CheckInOutGPSComponent
                      {...this.props}
                    />
                  )
                }


                {this.filterRender(151) &&
                  (
                    <View style={styles.bottom}>
                      <View style={styles.headerApplication}>
                        <Text style={styles.titleCreateApplication}>{userProfile.LangID === 'VN' ? appStrS.vn.home.createApplication : appStrS.en.home.createApplication}</Text>
                      </View>
                      <View
                        style={{
                          height: 1,
                          width: '90%',
                          backgroundColor: '#EFEFEF',
                          alignSelf: 'center',
                        }}></View>
                      <FlatList
                        style={{
                          // flex: 1,
                          // flexGrow: 1,
                          // backgroundColor: 'red'
                        }}
                        contentContainerStyle={{}}
                        numColumns={3}
                        data={this.state.dataRequester}
                        keyExtractor={(item) => item.workflowID}
                        renderItem={({ item, index }) => {
                          return this.requesterItem(item, index);
                        }}
                      />
                    </View>
                  )
                }
                {this.filterRender(201) &&
                  (
                    <View style={styles.bottom}>
                      <View style={styles.application}>
                        <View style={styles.headerApplication}>
                          <Text style={styles.titleCreateApplication}>{userProfile.LangID === 'VN' ? appStrS.vn.home.infomation : appStrS.en.home.infomation}</Text>
                        </View>
                        <View
                          style={{
                            height: 1,
                            width: '90%',
                            backgroundColor: '#EFEFEF',
                            alignSelf: 'center',
                          }}></View>
                        {/* {!arrayIsEmpty(this.state.dataRequester) &&
                          <FlatList
                            contentContainerStyle={{}}
                            numColumns={3}
                            data={this.state.dataInfo}
                            keyExtractor={(item) => item.workflowID}
                            renderItem={({ item, index }) => {
                              return this.requesterItem(item, index);
                            }}
                          />
                        } */}
                        <FlatList
                          contentContainerStyle={{}}
                          numColumns={3}
                          data={this.state.dataInfo}
                          keyExtractor={(item) => item.workflowID}
                          renderItem={({ item, index }) => {
                            return this.requesterItem(item, index);
                          }}
                        />
                      </View>
                    </View>
                  )
                }

              </View>
            </View>
          </View>
        </View>
        {/* </ImageBackground> */}
      </View>

    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // backgroundColor: 'white',
    // paddingHorizontal: Sizes.s5,
  },
  content: {
    flex: 1,
    // backgroundColor: 'white',
    // paddingHorizontal: Sizes.h10,
    // paddingVertical: Sizes.h10
  },
  top: {
    width: '100%',
    // shadowColor: 'rgba(0, 0, 0, 0.5 )',
    // shadowOffset: { width: 0, height: 4 },
    // shadowRadius: Sizes.h10,
    // shadowOpacity: 0.2,
    // elevation: 10,
    // backgroundColor: 'white',
    // paddingHorizontal: Sizes.h10,
    // paddingVertical: Sizes.h10,
  },
  bottom: {
    width: '100%',
    paddingHorizontal: Sizes.s20,
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    marginVertical: Sizes.s10,
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: Sizes.s10,
    padding: Sizes.s10,
    shadowColor: 'rgba(0, 0, 0, 0.5 )',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: Sizes.h10,
    shadowOpacity: 0.4,
    elevation: 10,

    // marginHorizontal: Sizes.s50,
  },
  infoCheck: {
    // alignItems: 'center'
    flex: 1,
  },
  clock: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    // borderRadius: Sizes.h10,
    // borderWidth: Sizes.s2,
    paddingHorizontal: Sizes.h20,
    paddingVertical: Sizes.h10,
  },
  wifi: {
    flexDirection: 'row',
    // width: '40%',
  },
  iconWifi: {
    width: Sizes.s45,
    height: Sizes.s45,
  },
  iconNoWifi: {
    width: Sizes.s35,
    height: Sizes.s35,
    marginLeft: Sizes.s5,
  },

  titleWifi: {
    fontSize: Sizes.s30,
    // fontWeight: 'bold',
    marginLeft: Sizes.h10,
  },
  date: {
    fontSize: Sizes.s30,
    // fontWeight: 'bold',
    marginLeft: Sizes.h10,
  },
  time: {
    fontSize: Sizes.s50,
    fontWeight: 'bold',
    color: colorHome.textClock,
  },
  titleButton: {
    fontSize: Sizes.s35,
    // fontWeight: 'bold',
    color: colorHome.textWhite,
    // borderRadius: Sizes.h30
  },

  attendance: {
    width: '100%',
  },
  funcitonAttendance: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // alignItems: 'center',
  },

  touchFunction: {
    // flex: 1,
    width: '70%',
    marginVertical: Sizes.h20,
    marginHorizontal: Sizes.h20,
    borderRadius: Sizes.h20,
    // borderWidth: 1,
  },
  imgBgFunction: {
    width: '100%',
    paddingVertical: Sizes.h30,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: Sizes.h65
  },

  infoCheckInOut: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Sizes.s10,
    alignItems: 'center',
    flex: 1,
  },
  timeCheckInOut: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Sizes.h10,
  },
  iconCheck: {
    width: Sizes.s40,
    height: Sizes.s40,
  },
  titleCheck: {
    fontSize: Sizes.s30,
    // fontWeight: 'bold',
    marginLeft: Sizes.h10,
  },
  timeCheck: {
    // color: colorHome.colorTitle
    flex: 1,
    height: Sizes.s200,
    // width: '100%',
    // backgroundColor: 'silver',
    borderRadius: Sizes.s10,
    paddingHorizontal: Sizes.s20,
    borderWidth: 1,
    borderColor: 'gray',
    // paddingVertical: Sizes.s10
  },
  historyCheck: {
    width: Sizes.s60,
    height: Sizes.s60,
  },
  touchCheck: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Sizes.s20,
  },
  touchHistoryCheck: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Sizes.h20,
    borderRadius: Sizes.h10,
    borderWidth: 1,
    borderColor: 'silver',
    marginVertical: Sizes.s10,
    paddingHorizontal: Sizes.s10,
    paddingVertical: Sizes.s10,
  },
  application: {
    width: '100%',
  },
  headerApplication: {
    width: '100%',
    marginVertical: Sizes.h10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleCreateApplication: {
    fontSize: Sizes.s40,
    fontWeight: 'bold',
    color: colorHome.colorTitle,
  },

  functionApplication: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  touchFunctionApplication: {
    flex: 1,
    borderRadius: Sizes.h10,
    borderWidth: 1,
    paddingVertical: Sizes.h30,
    paddingHorizontal: Sizes.h20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Sizes.h10,
    marginHorizontal: Sizes.h20,
  },

  touchRequesterItem: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Sizes.h10,
    // borderWidth: 1
  },
  iconRequesterItem: {
    // width: Sizes.s100,
    // height: Sizes.s100,
    // paddingVertical: Sizes.h10,
    // paddingHorizontal: Sizes.h10,
    borderRadius: Sizes.h20,
    // borderWidth: 3,
    shadowColor: 'rgba(0, 0, 0, 0.5 )',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: Sizes.h10,
    shadowOpacity: 0.2,
    elevation: 10,
    backgroundColor: 'white',
  },
  iconSeemore: {
    width: Sizes.s100,
    height: Sizes.s100,
    borderRadius: Sizes.h20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const stylesPopup = StyleSheet.create({
  textInput: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: Sizes.s10,
  },
  title: {
    fontSize: Sizes.h46,
    color: colorForm.labelForm,
    textAlign: 'center',
    // fontWeight: 'bold'
  },
  textNote: {
    fontSize: Sizes.h28,
    color: '#999',
    textAlign: 'center',
  },
  textTitlePassword: {
    fontSize: Sizes.h28,
    color: '#999',
    marginVertical: Sizes.s10,
  },
  textErrorPassWord: {
    fontSize: Sizes.h28,
    color: 'red',
    marginVertical: Sizes.s5,
  },
  line: {
    height: 1,
    marginHorizontal: Sizes.s20,
    backgroundColor: '#999',
    marginVertical: Sizes.s20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Sizes.s30,
    // justifyContent: 'space-around'
  },
  cancelTouch: {
    paddingVertical: Sizes.s15,
    paddingHorizontal: Sizes.s50,
    backgroundColor: '#FFF',
    marginHorizontal: Sizes.s10,
  },
  cancelText: {
    fontSize: Sizes.h30,
    color: colorForm.labelForm,
  },
  confirmText: {
    fontSize: Sizes.h30,
    color: 'white',
  },
  confirmTouch: {
    paddingVertical: Sizes.s15,
    paddingHorizontal: Sizes.s50,
    backgroundColor: colorForm.labelForm,
    marginHorizontal: Sizes.s10,
    borderRadius: Sizes.s100,
  },
});

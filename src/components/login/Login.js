//minhnc15

import React from 'react';
import {
  ImageBackground,
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Alert,
  TouchableHighlight,
  Keyboard,
  BackHandler
} from 'react-native';
import { Sizes } from '@dungdang/react-native-basic'
import { SafeAreaView } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { CustomButton } from '../custom/CustomButton'
import CustomPicker from '../custom/CustomPicker'
import CustomSearchPicker from '../custom/CustomSearchPicker'
import Loading from '../custom/Loading'
import { selectItemMultiSearch, mapDataToArrayPicker } from '../custom/function/functionPicker'
import { userProfile, getAppData, API_IHRP_DEV } from '../../config/settings'
import DeviceInfo from 'react-native-device-info'
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions';
import getImage from '../../res/values/strings/iconStrS'
import AsyncStorage from '@react-native-community/async-storage';
import { check, request, PERMISSIONS, openSettings, RESULTS } from 'react-native-permissions'
import {
  getDeviceToken,
  handleBackground,
  handleForeground,
  handleInitApp, requestUserPermission
} from '../firebase';
import Geolocation from '@react-native-community/geolocation'
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      // username: 'an.ndh01',
      // password: '123',
      // username: 'thuongphan',
      // password: '123456',
      showPassword: false,
      LangID: 'VN',
      isShowBottom: true,
      deviceID: '',
      systemVersion: '',
      OS: '',
      appVersion: '',
      versionName: '',

      token: '',

      isOnPressLogin: false,
    }
  }
  async checkLocationPermission() {
    // console.log('Start - checkLocationPermission - App: ')
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then((result) => {
        switch (result) {
          // case RESULTS.UNAVAILABLE:
          //   console.log(
          //     'LOCATION_WHEN_IN_USE - This feature is not available (on this device / in this context)',
          //   );
          //   break;
          // case RESULTS.DENIED:
          //   console.log(
          //     'LOCATION_WHEN_IN_USE - The permission has not been requested / is denied but requestable',
          //   );
          //   break;
          case RESULTS.GRANTED:
            if (this.state.isOnPressLogin) {
              this.onPressLogin()
            } else {

            }
            // this.setDefaultApp()
            break
          // case RESULTS.BLOCKED:
          //   console.log('LOCATION_WHEN_IN_USE - The permission is denied and not requestable anymore');
          //   break;
          default:
            this.setState({
              isOnPressLogin: false
            })
            Alert.alert(
              userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
              userProfile.LangID === 'VN' ? 'Ứng dụng cần được cấp quyền truy cập vị trí để có thể xác định chính xác loại mạng mà bạn đang sử dụng !' : "The app needs to be given location permission in order to be able to pinpoint the exact network you're using",
              [
                {
                  text: userProfile.LangID === 'VN' ? 'Chuyển đến cài đặt' : 'Open settings',
                  onPress: () => {
                    // console.log('0000000000000000')
                    openSettings().then((value) => {
                      // console.log('value - Open Settings: ', value)

                    })
                      .catch(err => {
                        // console.log('error - catch - Open Settings: ', err)

                      })
                  }
                },
              ],
              {
                cancelable: false,
              }

            )
            break;
        }
      })
      .catch((error) => {
        // …
      });
  }

  requestLocationPermission() {

  }
  async setDefaultApp() {
    await requestUserPermission()
    let token = undefined
    try {
      token = await getDeviceToken()
      console.log('token - noti - firebase: ', token)
      this.setState({ token: token }, () => { userProfile.tokenNoti = token })
    } catch (error) {

    }
    await handleForeground()
    await handleBackground()
    await handleInitApp()

    this.props.getAppAction({
      LangID: this.state.LangID,
      OS: Platform.OS === 'android' ? '1' : '2',
      AppVersion: userProfile.AppVersion,
    })

    //check deviceInfo
    if (Platform.OS === 'android') {
      //set OS = 1 with android
      this.setState({
        OS: '1'
      })
      DeviceInfo.getAndroidId().then(value => {
        // console.log('getAndroidId: ', value)
        this.setState({
          deviceID: value
        }, () => {
          userProfile.deviceID = value
        })
      })
    } else {
      //set OS = 2 with iOS
      this.setState({
        OS: '2'
      })
      // console.log('getUniqueId: ', DeviceInfo.getUniqueId())
      this.setState({
        deviceID: DeviceInfo.getUniqueId()
      }, () => {
        userProfile.deviceID = this.state.deviceID
      })
    }

    //check device OS version
    this.setState({
      systemVersion: DeviceInfo.getSystemVersion()
    })

    //check app version
    // console.log('[DEBUG-Login-getBuildNumber----]', DeviceInfo.getBuildNumber())
    this.setState({
      appVersion: DeviceInfo.getBuildNumber()
    })

    //check version name
    // console.log('[DEBUG-Login-getVersion----]', DeviceInfo.getVersion())
    this.setState({
      versionName: DeviceInfo.getVersion()
    })

    //check username last login
    // console.log('[DEBUG-Login-usernameLastLogin----]', userProfile.username)

    //check AsyncStorage to store and read username with 'account'
    let account = undefined
    try {
      account = await AsyncStorage.getItem('account')
      // console.log('[DEBUG-Login-account----]', account)
      if (account !== undefined) {
        this.setState({
          username: account
        })
      }
      if (account === null || account === '' || account === undefined) {
        await AsyncStorage.setItem('account', '')
      }
    } catch (error) {
      // error reading value
    }

    // check keyboard show or hide with android
    if (Platform.OS === 'android') {
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
      )
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide,
      )
    }
  }
  async componentDidMount() {
    // console.log('Login - Didmount - Check Location ssssss :  ', await this.checkLocationPermission())
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.setDefaultApp()
        if (Platform.OS === 'ios') {
          // Geolocation.requestAuthorization()
          // this.checkLocationPermission()
        } else {

        }
      }
    );


  }
  // WillUnmount dùng để check sự kiện với keyboard dùng cho việc ẩn hiện bottom text
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }
  }
  // when keyboard is showing, hide bottom text (Khi keyboard đang show, ẩn bottom text)
  _keyboardDidShow = () => {
    this.setState({
      isShowBottom: false,
    });
  }
  // when keyboard is hiding, show bottom text (Khi keyboard đang tắt, hiện bottom text)
  _keyboardDidHide = () => {
    this.setState({
      isShowBottom: true,
    });
  }

  onLongPressLogo() {
    // Alert.alert('Thông báo',
    //   `ID: ${this.state.deviceID}\nAppVersion: ${this.state.appVersion}\nVersionName: ${this.state.versionName}\nLinkAPI: ${API_IHRP_DEV}`,
    //   [{ text: 'Đóng', onPress: () => { } }])


    Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
      `ID: ${this.state.deviceID}\nAppVersion: ${this.state.versionName}\nVersionName: ${userProfile.AppVersion}\nLinkAPI: ${API_IHRP_DEV}`,
      [{ text: userProfile.LangID === 'VN' ? 'Đóng' : 'Confirm', onPress: () => { } }])
  }
  async onPressLogin() {
    let deviceName = await DeviceInfo.getModel()
    try {
      if (this.state.username !== null) {
        await AsyncStorage.setItem('account', this.state.username)
      }
    } catch (error) {
      // saving error
    }
    if (this.state.username === null || this.state.username === '' || this.state.password === null || this.state.password === '') {
      Alert.alert(
        `${this.state.LangID === 'VN' ? 'Thông báo' : 'Notice'}`,
        `${this.state.LangID === 'VN' ? 'Chưa nhập tên đăng nhập hoặc mật khẩu.' : 'No username or password entered.'}`,
        [
          {
            text: `${this.state.LangID === 'VN' ? 'Đóng' : 'Close'}`,
            onPress: () => { },
          },
        ],
      );
    } else {
      this.props.loginAction({
        username: this.state.username,
        Password: this.state.password,
        OS: this.state.OS,
        DeviceID: this.state.deviceID,
        // DeviceID: 'otiur08ljfdifdifjdf[dufd',
        Version: this.state.systemVersion,
        LangID: this.state.LangID,
        DeviceNoti: this.state.token,
        DeviceName: deviceName
      });
    }

  }
  onPressChangeLanguage() {
    this.setState((prevState) => ({
      LangID: prevState.LangID === 'VN' ? 'EN' : 'VN',
    }));
  }
  async componentDidUpdate(prevProps, prevState) {
    const { LangID } = this.state;
    if (this.props.data !== prevProps.data) {
      if (this.props.data !== undefined) {
        // userProfile.Stoken = this.props.data;
        // userProfile.username = this.state.username;
        // userProfile.LangID = this.state.LangID;
        // this.props.navigation.replace('MyModal');
        if (this.props.typeLogin !== 'popup') {
          userProfile.Stoken = this.props.data;
          userProfile.username = this.state.username;
          userProfile.LangID = this.state.LangID;
          userProfile.configApp.DeviceID = this.state.deviceID;
          userProfile.configApp['Version-App-Redirect'] = this.state.versionName;
          // userProfile.configApp["VERSION-APP"] = this.state.appVersion;
          userProfile.OS = this.state.OS;
          userProfile.Version = this.state.systemVersion;
          this.props.navigation.replace('MyModal');
        }
      }
    }
    if (this.props.dataRequester !== prevProps.dataRequester && this.props.dataRequester !== null) {
      userProfile.background = this.props.dataRequester.general.Gen_Theme
    }
    // check error API Login
    if (this.props.error !== prevProps.error) {
      if (this.props.error !== undefined) {
        // alert(this.props.error)
        Alert.alert(
          `${LangID === 'VN' ? 'Thông báo' : 'Notice'}`,
          this.props.error + '',
          [
            {
              text: `${LangID === 'VN' ? 'Đóng' : 'Close'}`,
              onPress: () => { },
            },
          ],
        );
      }
    }
    // check error API getApp
    if (this.props.errorRequester !== prevProps.errorRequester) {
      if (this.props.errorRequester !== undefined) {
        // alert(this.props.error)
        Alert.alert(
          `${LangID === 'VN' ? 'Thông báo' : 'Notice'}`,
          this.props.errorRequester + '',
          [
            // {
            //   text: `${LangID === 'VN' ? 'Đóng' : 'Close'}`,
            //   onPress: () => { },
            // },
            {
              text: `${LangID === 'VN' ? 'Thử lại' : 'Retry'}`,
              onPress: () => {
                this.props.getAppAction({
                  LangID: this.state.LangID,
                  OS: Platform.OS === 'android' ? '1' : '2',
                  AppVersion: userProfile.AppVersion,
                })
              },
            },
          ],
        );
      }
    }
  }
  render() {
    const { showPassword, username, password, LangID } = this.state;
    const { dataRequester } = this.props
    let general = undefined
    if (!objectIsNull(dataRequester)) {
      // console.log('dataRequesterzzzz: ', dataRequester.general)
      general = dataRequester.general
    }
    // tùy theo dữ liệu trả về của các trường general.Gen_Theme, general.Gen_Logo, general.Allow_F1 mà thay đổi giao diện của màn hình Login
    // let general = {
    //   Gen_Theme: '1', // dùng để thay đổi background
    //   Gen_Logo: '3',  // dùng để thay đổi Logo của màn hình Login
    //   Allow_F1: "0",  // dùng để bật, tắt chức năng quên mật khẩu
    // }
    return (
      <View style={{ flex: 1, justifyContent: "flex-start", backgroundColor: 'white', }}>
        {/* <Loading /> */}
        {(this.props.isFetching || this.props.fetchingRequester) && <Loading />}
        <ImageBackground style={styles.body} source={
          !objectIsNull(general) ? (
            general.Gen_Theme === '1' ? getImage('bg_login_00')
              : general.Gen_Theme === '2' ? getImage('bg_login_22')
                : general.Gen_Theme === '3' ? getImage('bg_login_33')
                  // : general.Gen_Theme === '4' ? getImage('bg_login')
                  : getImage('bg_login_00')
          )
            :
            getImage('bg_login_00')}
        >
          {/* <ImageBackground
            style={{ marginBottom: Sizes.s20, justifyContent: 'center', alignItems: 'center', paddingVertical: Sizes.s160 }}
            source={ null
              // !objectIsNull(general) ? (
              //   general.Gen_Theme === '1' ? getImage('bg_login_00')
              //     : general.Gen_Theme === '2' ? getImage('bg_login_22')
              //       : general.Gen_Theme === '3' ? getImage('bg_login_23')
              //         : getImage('bg_login_00')
              // )
              //   :
              //   getImage('bg_login_00')
            }
          >
            <TouchableHighlight
              activeOpacity={1}
              style={[styles.logo]}
              underlayColor='white'
              onLongPress={() => { this.onLongPressLogo() }}
            >
              <Image
                source={
                  !objectIsNull(general) ?
                    general.Gen_Logo === '1' ? getImage('ic_logo_4')
                      : general.Gen_Logo === '2' ? getImage('ic_logo_2')
                        : general.Gen_Logo === '3' ? getImage('ic_logo_3')
                          : getImage('ic_logo')
                    :
                    (getImage('ic_logo'))
                }
                style={styles.logo}
              />
            </TouchableHighlight>
            <Text style={[
              styles.title,
              {
                color: !objectIsNull(general) ? (
                  (general.Gen_Theme === '1' || general.Gen_Theme === '2' || general.Gen_Theme === '3') ? 'white'
                    : '#4F8DFF'
                )
                  : '#4F8DFF'
              }
            ]}>{
                // !objectIsNull(general) ?
                //   general.Gen_Logo === '1' ? 'DMS Heineken'
                //     : general.Gen_Logo === '2' ? 'IHRP.PNJ'
                //       : general.Gen_Logo === '3' ? 'IHRP.PHUCLONG'
                //         : 'IHRP Mobility'
                //   : 'IHRP Mobility'
                'IHRP.PNJ'
              }</Text>
          </ImageBackground> */}
          {/* 
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {
                this.onPressChangeLanguage();
              }}
              style={styles.flag_touchOpa}
            >
              <View style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderRadius: Sizes.s40,
                backgroundColor: 'transparent',
                borderColor: 'white',
              }}>
                <View style={{
                  padding: Sizes.s5,
                  borderTopLeftRadius: Sizes.s40,
                  borderBottomLeftRadius: Sizes.s40,
                  backgroundColor: LangID === 'EN' ? 'transparent' : 'white',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      paddingHorizontal: Sizes.s20,
                      color: LangID === 'EN' ? 'white'
                        : !objectIsNull(general) ? (
                          general.Gen_Theme === '1' ? '#3CB3FC'
                            : general.Gen_Theme === '2' ? 'orange'
                              : general.Gen_Theme === '3' ? '#3dc354'
                                : '#3CB3FC'
                        )
                          : '#3CB3FC',
                    }}>Vi</Text>
                </View>
                <View style={{
                  padding: Sizes.s5,
                  borderTopRightRadius: Sizes.s40,
                  borderBottomRightRadius: Sizes.s40,
                  backgroundColor: LangID === 'VN' ? 'transparent' : 'white',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      paddingHorizontal: Sizes.s20,
                      color: LangID === 'EN'
                        ? !objectIsNull(general) ? (
                          general.Gen_Theme === '1' ? '#3CB3FC'
                            : general.Gen_Theme === '2' ? 'orange'
                              : general.Gen_Theme === '3' ? '#3dc354'
                                : '#3CB3FC'
                        )
                          : '#3CB3FC'
                        : 'white',
                    }}>En</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View> */}

          <KeyboardAvoidingView behavior={Platform.OS === 'android' ? null : 'padding'} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps={'handled'}>

              <TouchableHighlight
                activeOpacity={1}
                style={styles.logo}
                underlayColor='white'
                onLongPress={() => { this.onLongPressLogo() }}
              >
                <Image
                  source={getImage('logo_cafe_pnj')
                    // !objectIsNull(general) ?
                    //   general.Gen_Logo === '1' ? getImage('ic_logo_2')
                    //     : general.Gen_Logo === '2' ? getImage('ic_logo_2')
                    //       : general.Gen_Logo === '3' ? getImage('ic_logo_2')
                    //         : getImage('ic_logo')
                    //   :
                    //   (getImage('ic_logo'))
                  }
                  style={styles.logo}
                />
              </TouchableHighlight>
              <Text style={[
                styles.title,
                {
                  color: !objectIsNull(general) ? (
                    (general.Gen_Theme === '1' || general.Gen_Theme === '2' || general.Gen_Theme === '3') ? 'white'
                      : 'white'
                  )
                    : 'white'
                }
              ]}>{LangID === 'VN' ? 'HỆ THỐNG QUẢN TRỊ NHÂN SỰ' : 'HUMAN MANAGEMENT SYSTEM'
                  // !objectIsNull(general) ?
                  //   general.Gen_Logo === '1' ? 'DMS Heineken'
                  //     : general.Gen_Logo === '2' ? 'IHRP.PNJ'
                  //       : general.Gen_Logo === '3' ? 'IHRP.PHUCLONG'
                  //         : 'IHRP Mobility'
                  //   : 'IHRP Mobility'
                }</Text>
              {/* <TextInput
                value={this.state.token}
                multiline={true}
                style={{
                  paddingHorizontal: Sizes.s50
                }}
              >

              </TextInput> */}
              <View style={[styles.username,
              {
                borderWidth: 1,
                borderColor:
                  // !objectIsNull(general) ? (
                  //   (general.Gen_Theme === '1' || general.Gen_Theme === '2' || general.Gen_Theme === '3') ? 'transparent'
                  //     : 'transparent'
                  // )
                  //   : 'black'
                  "#E5E7E8"
              }]}>
                {/* <Icon name='user-circle' size={Sizes.s45} color='gray' /> */}
                {/* <Image
                  source={getImage('ic_username')}
                  style={{
                    width: Sizes.s50,
                    height: Sizes.s50,
                    // tintColor: 'gray',
                  }}
                /> */}
                <TextInput
                  onFocus={() => {
                    // this.setState({
                    //   isShowBottom: false,
                    // });
                    if (Platform.OS === 'ios') {
                      this._keyboardDidShow()
                    }
                  }}
                  onBlur={() => {
                    // this.setState({
                    //   isShowBottom: true,
                    // });
                    if (Platform.OS === 'ios') {
                      this._keyboardDidHide()
                    }
                  }}
                  value={username}
                  placeholder={LangID === 'EN' ? 'Username (Not including @pnj.com.vn)' : 'Tài khoản (Không bao gồm @pnj.com.vn)'}
                  placeholderTextColor='#7F8890'
                  style={[styles.textInput,
                  {
                    color: "#7F8890"
                    // !objectIsNull(general) ? (
                    //   (general.Gen_Theme === '1' || general.Gen_Theme === '2' || general.Gen_Theme === '3') ? 'white'
                    //     : 'white'
                    // )
                    //   : 'black'
                  }]}
                  onChangeText={(text) => {
                    this.setState({ username: text });
                  }}
                />
              </View>
              <View style={[styles.password,
              {
                borderWidth: 1,
                borderColor:
                  // !objectIsNull(general) ? (
                  //   (general.Gen_Theme === '1' || general.Gen_Theme === '2' || general.Gen_Theme === '3') ? 'transparent'
                  //     : 'transparent'
                  // )
                  //   : 'black'
                  "#E5E7E8"
              }]}>
                {/* <Image
                  source={getImage('ic_password')}
                  style={{
                    width: Sizes.s50,
                    height: Sizes.s50,
                    // tintColor: 'gray',
                  }}
                /> */}
                <TextInput
                  onFocus={() => {
                    // this.setState({
                    //   isShowBottom: false,
                    // });
                    if (Platform.OS === 'ios') {
                      this._keyboardDidShow()
                    }
                  }}
                  onBlur={() => {
                    // this.setState({
                    //   isShowBottom: true,
                    // });
                    if (Platform.OS === 'ios') {
                      this._keyboardDidHide()
                    }
                  }}
                  value={password}
                  placeholder={LangID === 'EN' ? 'Password' : 'Mật khẩu'}
                  placeholderTextColor='#7F8890'
                  style={[styles.textInput,
                  {
                    color: "#7F8890"
                    // !objectIsNull(general) ? (
                    //   (general.Gen_Theme === '1' || general.Gen_Theme === '2' || general.Gen_Theme === '3') ? 'white'
                    //     : 'black'
                    // )
                    //   : 'black'
                  }]}
                  secureTextEntry={!showPassword}
                  onChangeText={(text) => {
                    this.setState({ password: text });
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showPassword: !this.state.showPassword });
                  }}>
                  {/* <Icon
                    name={!showPassword ? 'eye-slash' : 'eye'}
                    size={Sizes.s50}
                    color={!showPassword ? 'white' : 'white'}
                  /> */}
                  <Image
                    source={!showPassword ? getImage('ic_eye_close') : getImage('ic_eye_open')}
                    style={{
                      width: Sizes.s35,
                      height: Sizes.s35,
                      tintColor: '#7F8890',
                      // tintColor: !objectIsNull(general) ? (
                      //   (general.Gen_Theme === '1' || general.Gen_Theme === '2' || general.Gen_Theme === '3') ? 'white'
                      //     : 'white'
                      // )
                      //   : 'black'
                    }}
                  />
                </TouchableOpacity>
              </View>
              {/* <View style={styles.function}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ showPassword: !this.state.showPassword });
                  }}>
                  <View style={styles.showPassword}>
                    <Icon
                      name={!showPassword ? 'square' : 'check-square'}
                      size={Sizes.s50}
                      color={!showPassword ? 'gray' : 'white'}
                    />
                    <Text numberOfLines={1} style={styles.textShowPassword}>
                      {LangID === 'EN' ? 'Show password' : 'Hiện mật khẩu'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View> */}
              <View style={{ width: '90%', alignSelf: 'center', marginVertical: Sizes.s30 }}>
                <CustomButton
                  onPress={() => {
                    if (Platform.OS === 'ios') {
                      this.setState({
                        isOnPressLogin: true
                      }, () => {
                        // this.checkLocationPermission()
                        this.onPressLogin();
                      })
                    } else {
                      this.onPressLogin();
                    }


                  }}
                  title={LangID === 'EN' ? 'LOGIN' : 'Đăng nhập'}
                  theme={!objectIsNull(general) ?
                    general.Gen_Theme
                    :
                    undefined
                  }
                />
              </View>
              {objectIsNull(general) ? null : (
                general.Allow_F1 === "1" ? (
                  <View style={styles.forgotPassword}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('ForgotPasswordContainer');
                      }}>
                      <Text numberOfLines={1} style={styles.textForgotPassword}>
                        {LangID === 'EN' ? 'Forgot password' : 'Quên mật khẩu'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null
              )}
              {this.state.isShowBottom && (
                <View style={styles.bottom}>
                  <Text style={styles.textBottom}>
                    {LangID === 'EN'
                      ? '© 2020 Developed by FPT Information System'
                      : '© 2020 Phát triển bởi FPT Information System'}
                  </Text>
                  <Text style={styles.textBottom}>Version Mobile App {this.state.versionName}</Text>
                </View>
              )}
            </ScrollView>
          </KeyboardAvoidingView>
          {/* <CustomPicker items={this.state.dataMultiSearch} mode={'PICKER_SEARCH'} /> */}
          {/*           
          <CustomSearchPicker
            mode={'PICKER_SEARCH_MULTI'}
            items={this.state.dataMultiSearch}
          // itemsSelect={this.state.dataSelect}
          // onSelectItem={this.onSelectItem}
          /> */}

          {/* <View style={styles.bottom}>
            <Text style = {styles.textBottom}>{LangID === 'EN' ? "© 2020 Developed by FPT Information System" : "© 2020 Phát triển bởi FPT Information System"}</Text>
          </View> */}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: Sizes.h14,
    width: '100%',
    top: 30,
    position: 'absolute',
    zIndex: 1,
  },
  changeLanguage: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: Sizes.s40,
    borderColor: 'white',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // zIndex: 1,
  },
  flag_touchOpa: {
    alignSelf: 'flex-end',
    // width: Sizes.s80,
    // backgroundColor: 'blue',
    padding: Sizes.s20,
    margin: Sizes.s20,
    // marginBottom: Sizes.s50,
  },
  country_flag: {
    width: Sizes.s80,
    height: Sizes.s80,
  },
  logo: {
    width: Sizes.s160,
    height: Sizes.s160,
  },
  title: {
    fontSize: Sizes.h46,
    // color: '#4F8DFF',
    fontWeight: 'bold',
    marginVertical: Sizes.h20,
    marginBottom: Sizes.s120,
  },
  username: {
    paddingVertical: Platform.OS === 'android' ? 0 : Sizes.h24,
    paddingHorizontal: Sizes.h30,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Sizes.h10,
    // borderWidth: 1,
    borderRadius: Sizes.h10,
    width: '90%',
    // backgroundColor: 'rgba(0,0,0,0.1)',
    // backgroundColor: 'rgba(224, 231, 255, 0.20)', // '#E0E7FF' 20%
    backgroundColor: 'white',
    // shadowColor: 'rgba(0, 0, 0, 0.8 )',
    // shadowOffset: { width: 0, height: 1 },
    // shadowRadius: Sizes.h10,
    // shadowOpacity: 0.1,
    // elevation: 1,
  },
  password: {
    paddingVertical: Platform.OS === 'android' ? 0 : Sizes.h24,
    paddingHorizontal: Sizes.h30,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: Sizes.h10,
    // borderWidth: 1,
    borderRadius: Sizes.h10,
    width: '90%',
    // shadowColor: 'rgba(0, 0, 0, 0.5 )',
    // shadowOffset: { width: 0, height: 4 },
    // shadowRadius: Sizes.h10,
    // shadowOpacity: 0.2,
    // elevation: 5,
    // backgroundColor: 'rgba(0,0,0,0.1)',
    // backgroundColor: 'rgba(224, 231, 255, 0.20)', // '#E0E7FF' 20%
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    // marginHorizontal: Sizes.h20,
    fontSize: Sizes.h32,
    // paddingHorizontal: Sizes.s20,
    color: 'white'
  },
  function: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginVertical: Sizes.h20,
    alignItems: 'center',
  },

  showPassword: {
    flexDirection: 'row',
    marginHorizontal: Sizes.h20,
    alignItems: 'center',
  },
  textShowPassword: {
    marginHorizontal: Sizes.h20,
    fontSize: Sizes.h30,
    color: 'white'
  },
  forgotPassword: {

  },
  textForgotPassword: {
    marginHorizontal: Sizes.h20,
    fontSize: Sizes.h30,
    color: '#7F8890',
    fontWeight: 'bold',
  },
  bottom: {
    padding: Sizes.h20,
    // backgroundColor: 'orange',
    width: '100%',
    position: 'absolute',
    bottom: 10,
  },
  textBottom: {
    fontSize: Sizes.h24,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

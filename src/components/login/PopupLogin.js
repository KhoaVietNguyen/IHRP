import React from 'react';
import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  BackHandler,
  Alert
} from 'react-native';
import { Sizes } from '@dungdang/react-native-basic';
import { colorForm } from '../../res/values/strings/colorStr';
import { CustomTextInput } from '../custom/CustomTextInput';
import { userProfile } from '../../config/settings';
import {
  stringIsEmpty,
  objectIsNull,
  arrayIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import { GET_WF_REQUESTER } from '../../redux/actions/home/homeActions';
import {
  GET_TYPES_LEAVE_APPLICATION,
  getTypesLeaveApplication,
} from '../../redux/actions/application/applicationActions';
import { StackActions, NavigationActions } from 'react-navigation'
import { fontColors, fontSizes, fontView } from '../../res/values/styles/appStyles'
import PopupAlert from '../custom/popup/PopupAlert'
export default class PopupLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      errorPassword: '',
      countConfirm: 0,
      visibleModal: false,
      messagePopupUpdateApp: '',
    };
  }
  backAction = () => {
    return false
  }
  componentWillUnmount() {
    // this.backHandler.remove()
  }
  componentDidUpdate(prevProps) {
    const {
      dataPopupLogin,
      errorPopupLogin,
      data,
      error,
      reCallAction,
      visiblePopupPostLogin,
      messagePopupUpdateApp,
    } = this.props;
    // console.log('0000000000000000: ', data)
    // if (data !== prevProps.data) {
    //   if (!objectIsNull(data)) {
    //     console.log('aaaaa: ', userProfile.Stoken + ' ---- ' + data);
    //     // userProfile.Stoken = data;
    //     console.log('ssssss: ', userProfile.Stoken + ' ---- ' + data);
    //     // this.props.hidePopupPostLoginAction();
    //     // this.props.reCallAction();
    //     if(!objectIsNull(reCallAction)){
    //       this.props.reCallAction();
    //     }
    //     // userProfile.Sto = this.props.data
    //     // userProfile.username = this.state.username
    //     // userProfile.LangID = this.state.LangID
    //   }
    // }
    if (messagePopupUpdateApp !== prevProps.messagePopupUpdateApp) {
      if (!stringIsEmpty(messagePopupUpdateApp)) {
        this.setState({
          messagePopupUpdateApp: messagePopupUpdateApp
        }, () => {
          this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backAction)
        })
      }
    }

    if (visiblePopupPostLogin !== prevProps.visiblePopupPostLogin) {
      if (visiblePopupPostLogin === false) {
        this.setState({
          password: '',
          errorPassword: '',
          countConfirm: 0,
          visibleModal: false
        })
      } else if (visiblePopupPostLogin === true) {
        this.setState({
          visibleModal: true
        })
      }
    }
    if (error !== prevProps.error) {
      if (!objectIsNull(error)) {
        if (this.state.countConfirm + 1 === 3) {
          this.setState({
            errorPassword: '',
            countConfirm: 0
          }, () => {
            this.props.hidePopupPostLoginAction();
            // this.props.navigation.replace('LoginContainer')
            // this.props.navigation.push('LoginContainer')
            this.props.onResetAllReducers()
            if (this.props.actionReplaceScreen !== undefined) {
              this.props.actionReplaceScreen.replaceScreen()
            }
            // const resetAction = StackActions.reset({
            //   index: 0,
            //   actions: [NavigationActions.navigate({ routeName: 'LoginContainer' })]
            // })
            // this.props.navigation.dispatch(resetAction)

          });
        } else {
          this.setState({
            errorPassword: error,
            countConfirm: this.state.countConfirm + 1
          });
        }
      }
    }
  }
  onPressSubmit() {
    // console.log('state - password', this.state.password.trim())
    if (stringIsEmpty(this.state.password.trim())) {
      this.setState({
        errorPassword: userProfile.LangID === 'VN' ? 'Vui lòng nhập mật khẩu !' : 'Please input password !',
      });
    } else {
      this.props.loginAction({
        username: userProfile.username,
        // username: 'thuongphan',
        Password: this.state.password,
        OS: userProfile.OS,
        DeviceID: userProfile.configApp.DeviceID,
        Version: userProfile.Version,
        LangID: userProfile.LangID,
        type: 'popup',
      });
    }
    // username: this.state.username,
    // Password: this.state.password,
    // OS: '1',
    // DeviceID: 'otiur08lf89756fdifdifjdf[dufd',
    // Version: 25,
    // LangID: this.state.LangID
  }

  onPressCancel() {
    this.props.hidePopupPostLoginAction();
    if (this.props.actionReplaceScreen !== undefined) {
      this.props.actionReplaceScreen.replaceScreen()
    }
    // this.props.navigation.replace('LoginContainer')
  }
  async onLinkingApp(url) {
    const isSupported = await Linking.canOpenURL(url)
    if (isSupported) {
      await Linking.openURL(url)
    } else {
      Alert.alert(
        userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
        userProfile.LangID === 'VN' ? 'Không thể chuyển tới địa chỉ cập nhật ứng dụng. ' : 'Cannot go to app update address',
        [
          {
            text: userProfile.LangID === 'VN' ? 'Thử lại' : 'Again',
            onPress: () => {
              this.onLinkingApp(url)
            }
          }
        ]
      )

    }

  }
  render() {
    const { visiblePopupPostLogin, isFetching } = this.props;
    const { visibleModal, messagePopupUpdateApp } = this.state
    // let updateDialog = true
    // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx: ', messagePopupUpdateApp)
    if (visiblePopupPostLogin) {
      return (
        <View style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 20, }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View
              // onPress={() => {
              //   this.onChangeVisiblePopup(false);
              // }}
              style={{
                flex: 1,
                backgroundColor: '#00000066',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: Sizes.h30,
                paddingVertical: Sizes.h100,
              }}>
              <View
                style={{
                  // width: '80%',
                  backgroundColor: 'white',
                  // height: 100,
                  borderRadius: Sizes.s10,
                  paddingVertical: Sizes.s20,
                  paddingHorizontal: Sizes.s30,
                }}>
                <Text style={styles.title}>{userProfile.LangID === 'VN' ? 'Xác thực tài khoản' : 'Account verification'}</Text>

                <Text style={styles.textNote}>
                  {userProfile.LangID === 'VN' ? 'Vui lòng xác thực lại mật khẩu' : 'Please verify your password'}
                </Text>
                <View style={styles.line}></View>
                {/* <Text style={styles.textTitlePassword}>Mật khẩu</Text> */}

                <CustomTextInput
                  item={{ tag: 'InputPassword', editable: true, placeHolder: userProfile.LangID === 'VN' ? 'Nhập mật khẩu' : 'Enter password' }}
                  text={this.state.password}
                  onChangeText={(text) => {
                    // console.log('texxttt: ', text)
                    this.setState({
                      password: text,
                      errorPassword: '',
                    });
                  }}
                />
                {/* {!stringIsEmpty(this.state.errorPassword) && (
                  <Text style={styles.textErrorPassWord}>
                    {this.state.errorPassword}
                  </Text>
                )} */}
                <Text style={styles.textErrorPassWord}> {this.state.errorPassword}</Text>
                {isFetching ?
                  (
                    <ActivityIndicator style={{ marginVertical: Sizes.s10 }} size="large" color={colorForm.labelForm} />
                  )
                  :
                  (
                    <View style={styles.button}>
                      <TouchableOpacity
                        onPress={() => {
                          this.onPressCancel();
                          // this.props.navigation.replace('LoginContainer');
                        }}
                        style={styles.cancelTouch}>
                        <Text style={styles.cancelText}>{userProfile.LangID === 'VN' ? 'HỦY BỎ' : 'Cancel'}</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            errorPassword: '',
                          });
                          this.onPressSubmit();
                        }}
                        style={styles.confirmTouch}>
                        <Text style={styles.confirmText}>{userProfile.LangID === 'VN' ? 'XÁC NHẬN' : 'Confirm'}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>







        // <Modal
        //   transparent={true}
        //   onRequestClose={() => {
        //     // this.onChangeVisiblePopup(false)
        //   }}
        //   hardwareAccelerated={true}
        //   visible={visiblePopupPostLogin}
        //   animationType="fade">
        //   <KeyboardAvoidingView
        //     style={{ flex: 1 }}
        //     behavior={Platform.OS === 'ios' ? 'padding' : null}>
        //     <View
        //       // onPress={() => {
        //       //   this.onChangeVisiblePopup(false);
        //       // }}
        //       style={{
        //         flex: 1,
        //         backgroundColor: '#00000066',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         paddingHorizontal: Sizes.h30,
        //         paddingVertical: Sizes.h100,
        //       }}>
        //       <View
        //         style={{
        //           // width: '80%',
        //           backgroundColor: 'white',
        //           // height: 100,
        //           borderRadius: Sizes.s10,
        //           paddingVertical: Sizes.s20,
        //           paddingHorizontal: Sizes.s30,
        //         }}>
        //         <Text style={styles.title}>{userProfile.LangID === 'VN' ? 'Xác thực tài khoản' : 'Account verification'}</Text>

        //         <Text style={styles.textNote}>
        //           {userProfile.LangID === 'VN' ? 'Vui lòng xác thực lại mật khẩu' : 'Please verify your password'}
        //         </Text>
        //         <View style={styles.line}></View>
        //         {/* <Text style={styles.textTitlePassword}>Mật khẩu</Text> */}

        //         <CustomTextInput
        //           item={{ tag: 'InputPassword', editable: true, placeHolder: userProfile.LangID === 'VN' ? 'Nhập mật khẩu' : 'Enter password' }}
        //           text={this.state.password}
        //           onChangeText={(text) => {
        //             // console.log('texxttt: ', text)
        //             this.setState({
        //               password: text,
        //               errorPassword: '',
        //             });
        //           }}
        //         />
        //         {/* {!stringIsEmpty(this.state.errorPassword) && (
        //           <Text style={styles.textErrorPassWord}>
        //             {this.state.errorPassword}
        //           </Text>
        //         )} */}
        //         <Text style={styles.textErrorPassWord}> {this.state.errorPassword}</Text>
        //         {isFetching ?
        //           (
        //             <ActivityIndicator style={{ marginVertical: Sizes.s10 }} size="large" color={colorForm.labelForm} />
        //           )
        //           :
        //           (
        //             <View style={styles.button}>
        //               <TouchableOpacity
        //                 onPress={() => {
        //                   this.onPressCancel();
        //                   // this.props.navigation.replace('LoginContainer');
        //                 }}
        //                 style={styles.cancelTouch}>
        //                 <Text style={styles.cancelText}>{userProfile.LangID === 'VN' ? 'HỦY BỎ' : 'Cancel'}</Text>
        //               </TouchableOpacity>

        //               <TouchableOpacity
        //                 onPress={() => {
        //                   this.setState({
        //                     errorPassword: '',
        //                   });
        //                   this.onPressSubmit();
        //                 }}
        //                 style={styles.confirmTouch}>
        //                 <Text style={styles.confirmText}>{userProfile.LangID === 'VN' ? 'XÁC NHẬN' : 'Confirm'}</Text>
        //               </TouchableOpacity>
        //             </View>
        //           )
        //         }
        //       </View>
        //     </View>
        //   </KeyboardAvoidingView>
        // </Modal>
      );
    } else if (!stringIsEmpty(messagePopupUpdateApp)) {
      return (
        <PopupAlert
          visibleAlert={true}
          dataAlert={{
            isClose: false,
            typePopup: 'update',
            typeTouch: 'single',
            message: userProfile.LangID === 'VN' ? 'Vui lòng cập nhật phiên bản mới nhất để tiếp tục sử dụng ứng dụng này.' : 'Please update to the latest version to continue using this app. ',
            arrayTouch: [{
              id: '0',
              title: userProfile.LangID === 'VN' ? 'Cập nhật' : 'Update',
              onPress: async () => {
                if (!stringIsEmpty(messagePopupUpdateApp)) {
                  this.onLinkingApp(messagePopupUpdateApp)
                  // console.log('Linking - messagePopupUpdateApp:  ', messagePopupUpdateApp)
                  // const isSupported = await Linking.canOpenURL(messagePopupUpdateApp)
                  // if (isSupported) {
                  //   await Linking.openURL(messagePopupUpdateApp)
                  // } else {
                  //   Alert.alert(
                  //     userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
                  //     userProfile.LangID === 'VN' ? 'Không thể chuyển tới địa chỉ cập nhật ứng dụng. ' : 'Cannot go to app update address',
                  //     [
                  //       {
                  //         text: 'Thử lại',
                  //         onPress: () => {

                  //         }
                  //       }
                  //     ]
                  //   )

                  // }


                } else {
                  // console.log('222222222222')
                }
              }
            }]
          }}
        />
      )
    }

    else {
      return (
        <View></View>
      )
    }

  }
}

const styles = StyleSheet.create({
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
    fontSize: Sizes.h22,
    color: 'red',
    marginVertical: Sizes.s10,
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
    borderRadius: fontView.border,
  },
});

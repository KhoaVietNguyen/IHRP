// minhnc15

import React from 'react';
import {
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
  Alert,
  Keyboard,
} from 'react-native';
import { Sizes } from '@dungdang/react-native-basic';
import { SafeAreaView } from 'react-navigation';
import { CustomButton } from '../custom/CustomButton';
import CustomHeader from '../custom/CustomHeader';
import { userProfile } from '../../config/settings';
import {
  objectIsNull,
  arrayIsEmpty,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import Loading from '../custom/Loading'
export default class ForgotPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusScreen: false,
      textInput: '',
      borderInput: '#E5E7E8',
      userName: '',
      codeOTP: '',
      placeHolder:
        userProfile.LangID === 'VN' ? 'Tên đăng nhập' : 'Username',
      titleScreen:
        userProfile.LangID === 'VN' ? 'Quên mật khẩu' : 'Forgot password',
      titleButton:
        userProfile.LangID === 'VN' ? 'Gửi mật khẩu' : 'Send password',
    };
  }
  componentDidUpdate(prevProps) {
    const {
      dataSendAccount,
      dataSendCode,

      errorSendAccount,
      errorSendCode,
    } = this.props;

    if (dataSendAccount !== prevProps.dataSendAccount) {
      if (!stringIsEmpty(dataSendAccount)) {
        Alert.alert(userProfile.LangID === 'VN' ? "Thông báo" : 'Notice', dataSendAccount, [
          {
            text: userProfile.LangID === 'VN' ? "Xác nhận" : 'Confirm',
            onPress: () => {
              this.setState(
                {
                  statusScreen: true,
                  userName: this.state.textInput.trim(),
                  placeHolder:
                    userProfile.LangID === 'VN' ? 'Nhập mã OTP' : 'Input OTP code',
                  titleScreen:
                    userProfile.LangID === 'VN' ? 'Nhập mã OTP' : 'OTP',
                  titleButton:
                    userProfile.LangID === 'VN' ? 'XÁC NHẬN' : 'CONFIRM',
                },
                () => {
                  this.setState({
                    textInput: '',
                  });
                },
              );
            },
          },
        ]);
      }
    }

    if (dataSendCode !== prevProps.dataSendCode) {
      if (!stringIsEmpty(dataSendCode)) {
        Alert.alert(userProfile.LangID === 'VN' ? 'Thông báo' : 'Confirm', dataSendCode, [
          {
            text: userProfile.LangID === 'VN' ? "Xác nhận" : 'Confirm',
            onPress: () => {
              this.props.navigation.goBack();
            },
          },
        ]);
      }
    }

    if (errorSendAccount !== prevProps.errorSendAccount) {
      if (!stringIsEmpty(errorSendAccount)) {
        Alert.alert(userProfile.LangID === 'VN' ? "Thông báo" : 'Notice', errorSendAccount, [
          {
            text: userProfile.LangID === 'VN' ? "Đóng" : 'Cancel',
            onPress: () => {
            },
          },
        ]);
      }
    }

    if (errorSendCode !== prevProps.errorSendCode) {
      if (!stringIsEmpty(errorSendCode)) {
        Alert.alert(userProfile.LangID === 'VN' ? "Thông báo" : 'Notice', errorSendCode, [
          {
            text: userProfile.LangID === 'VN' ? "Đóng" : 'Cancel',
            onPress: () => {
            },
          },
        ]);
      }
    }
  }
  onPressForgotPassword() {
    const {
      textInput,
      statusScreen,
      placeHolder,
      titleScreen,
      titleButton,
      userName,
    } = this.state;
    if (!statusScreen) {
      if (textInput.trim() === '') {
        Alert.alert(
          userProfile.LangID === 'VN' ? "Thông báo" : 'Notice',
          userProfile.LangID === 'VN' ? 'Bạn chưa nhập tên tài khoản cần lấy lại mật khẩu. ' : 'You have not entered an account name to retrieve your password.',
          [
            {
              text: userProfile.LangID === 'VN' ? "Đóng" : 'Cancel',
              onPress: () => {
                this.setState({
                  textInput: textInput.trim(),
                  borderInput: 'red',
                });
              },
            },
          ],
        );
      } else {
        this.props.sendAccountForgotPasswordActions([
          {
            P1: textInput,
          },
        ]);
      }
    } else {
      if (textInput.trim() === '') {
        Alert.alert(
          userProfile.LangID === 'VN' ? "Thông báo" : 'Notice',
          userProfile.LangID === 'VN' ? 'Bạn chưa nhập mã OTP. ' : 'You have not entered the OTP code', [
          {
            text: userProfile.LangID === 'VN' ? "Đóng" : 'Cancel',
            onPress: () => {
              this.setState({
                textInput: textInput.trim(),
                borderInput: 'red',
              });
            },
          },
        ]);
      } else {
        this.props.sendCodeVerifyForgotPasswordActions([
          {
            P1: userName,
            P2: textInput,
          },
        ]);
      }
    }
  }
  render() {
    const {
      textInput,
      statusScreen,
      placeHolder,
      titleScreen,
      titleButton,
      userName,
      borderInput,
    } = this.state;
    const {
      fetchingSendAccount,
      fetchingSendCode,
    } = this.props


    return (
      <SafeAreaView style={{ flex: 1 }}>
        {(fetchingSendAccount || fetchingSendCode) && <Loading />}
        <View style={styles.body}>
          <CustomHeader
            typeIconLeft={'back'}
            title={titleScreen}
            onPressLeft={() => {
              this.props.navigation.goBack();
            }}
          />
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps={'handled'}>
            {statusScreen &&
              (
                <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: Sizes.s30, marginBottom: Sizes.s40, }}>
                  <Text style={styles.notice}>{userProfile.LangID === 'VN' ? 'Mã xác thực đã được gửi về email của bạn.' : 'A verification code has been sent to your email.'}</Text>
                  <Text style={styles.notice}>{userProfile.LangID === 'VN' ? 'Hãy nhập mã xác thực để khôi phục mật khẩu.' : 'Please enter the verification code to recover the password.'}</Text>
                </View>
              )
            }
            {statusScreen && <Text style={styles.title}>{userProfile.LangID === 'VN' ? 'Tên tài khoản' : 'Username'}</Text>}
            {statusScreen &&
              (
                <View style={styles.confirmUsername}>
                  <TextInput
                    editable={statusScreen ? false : true}
                    onPress={() => {
                    }}
                    onBlur={() => {
                    }}
                    value={userName}
                    placeholder={userProfile.LangID === 'VN' ? 'Tên tài khoản' : 'Username'}
                    placeholderTextColor={'grey'}
                    style={styles.textInput}
                    onChangeText={(text) => {
                      this.setState({
                        textInput: text,
                        borderInput: '#4F8DFF',
                      });
                    }}
                  />
                </View>
              )
            }
            {statusScreen && <Text style={styles.title}>{userProfile.LangID === 'VN' ? 'Mã OTP' : 'OTP code'}</Text>}
            <View style={[styles.inputData, { marginTop: statusScreen ? Sizes.s10 : Sizes.s80, borderColor: borderInput }]}>
              <TextInput
                onPress={() => {
                }}
                onBlur={() => {
                  this.setState({
                    borderInput: '#E5E7E8'
                  })
                }}
                onFocus={() => {
                  this.setState({
                    borderInput: '#4F8DFF'
                  })
                }}
                value={textInput}
                placeholder={placeHolder}
                placeholderTextColor={'grey'}
                style={styles.textInput}
                onChangeText={(text) => {
                  this.setState({
                    textInput: text,
                    borderInput: '#4F8DFF',
                  });
                }}
              />
            </View>


            <View style={{ width: '90%', alignSelf: 'center' }}>
              <CustomButton
                title={titleButton}
                onPress={() => {
                  this.onPressForgotPassword();
                }}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: Sizes.h20,
    width: '100%',
    alignItems: 'center',
    // backgroundColor: 'cyan',
  },
  headerText: {
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: Sizes.s30,
    // alignItems: 'center',
  },
  title: {
    fontSize: Sizes.h28,
    fontWeight: '700',
    color: 'black',
    // textAlign: 'left',
    // backgroundColor: 'orange',
    // alignSelf: 'flex-start'
  },
  textInput: {
    color: '#7F8890',
    flex: 1,
    fontSize: Sizes.h30,
    paddingHorizontal: Sizes.s20,
    color: 'black'
  },
  inputData: {
    paddingVertical: Platform.OS === 'android' ? 0 : Sizes.h24,
    paddingHorizontal: Sizes.h30,
    alignItems: 'center',
    flexDirection: 'row',
    // marginVertical: Sizes.s10,
    // marginTop: Sizes.s10,
    marginBottom: Sizes.s20,
    borderWidth: 1,
    borderRadius: Sizes.h10,
    // borderColor: '#E5E7E8',
    width: '100%',
    backgroundColor: 'white',
  },
  confirmUsername: {
    paddingVertical: Platform.OS === 'android' ? 0 : Sizes.h24,
    paddingHorizontal: Sizes.h30,
    alignItems: 'center',
    flexDirection: 'row',
    // marginVertical: Sizes.s10,
    marginTop: Sizes.s10,
    marginBottom: Sizes.s40,
    borderWidth: 1,
    borderRadius: Sizes.h10,
    borderColor: '#E5E7E8',
    width: '100%',
    backgroundColor: 'white',
  },

  notice: {
    fontSize: Sizes.h32,
    color: 'black'
  }
});

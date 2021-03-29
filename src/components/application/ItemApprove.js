import React from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  Alert,
  Picker,
} from "react-native";
import { Sizes } from "@dungdang/react-native-basic";
import getImage from "../../res/values/strings/iconStrS";
import { CustomButton } from "../custom/CustomButton";
import {
  colorApprove,
  colorForm,
  colorPersonal,
} from "../../res/values/strings/colorStr";
import Swipeout from "react-native-swipeout";
import {
  arrayIsEmpty,
  objectIsNull,
  stringIsEmpty,
} from "@dungdang/react-native-basic/src/Functions";
import { userProfile } from "../../config/settings";
import { appStrS } from "../../res/values/strings/appStrS";
import CustomPickerApproval from "../custom/CustomPickerApproval";
import LinearGradient from "react-native-linear-gradient";
import Loading from '../custom/Loading'
const idCheckGPSApplication = '87'

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: "",
      approve: 0,
      refuse: false,
      error:
        userProfile.LangID === "VN"
          ? appStrS.vn.approveApplication.error_refuse
          : appStrS.en.approveApplication.error_refuse,
      isModalVisible: false,
      selected: false,
      statusComment: false,
      activeRowKey: null,
    };
  }

  getCountTimeout = () => {
    setTimeout(() => {
      this.setState({ isModalVisible: false });
    }, 1000);
  };

  componentDidUpdate(prevProps, prevState) {
    const { dataApplicationApproval, errorApplicationApproval } = this.props;
    if (dataApplicationApproval !== prevProps.dataApplicationApproval) {
      if (!objectIsNull(dataApplicationApproval)) {
        this.setState(
          {
            statusComment: false,
            refuse: true,
          },
          () => {
            if (this.state.refuse === true) {
              this.getCountTimeout();
            }
          }
        );
      }
    }
    if (errorApplicationApproval !== prevProps.errorApplicationApproval) {
      if (!objectIsNull(errorApplicationApproval)) {
        this.setState(
          {
            statusComment: true,
            refuse: false,
          },
          () => {
            if (
              this.state.statusComment === true &&
              this.state.refuse === false
            ) {
              this.setState({
                error: errorApplicationApproval,
              });
            }
          }
        );
      }
    }
  }

  send_Rejection() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[styles.send, { backgroundColor: colorApprove.buttonSend }]}
          onPress={() => {
            this.onPressRefuse();
          }}
        >
          <Text style={styles.styleModalSend}>
            {userProfile.LangID === "VN"
              ? appStrS.vn.approveApplication.send
              : appStrS.en.approveApplication.send}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.send, { backgroundColor: colorApprove.buttonCancel }]}
          onPress={() => {
            this.setState({
              isModalVisible: !this.state.isModalVisible,
              reason: (this.state.reason = ""),
              statusComment: false,
            });
          }}
        >
          <Text style={styles.styleModalSend}>
            {userProfile.LangID === "VN"
              ? appStrS.vn.approveApplication.cancel
              : appStrS.en.approveApplication.cancel}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderItem() {
    const {
      item,
      onSelectedItems
    } = this.props;
    // let item = { type: 'info87' }
    // console.log('itemmmmmmmmmmmmmmmmmmmmmmmmmmmm : ', item)
    if (item.type === "info1") {
      //Đơn nghỉ phép
      return (
        <TouchableOpacity
          onPress={() => {
            // console.log('Touch ITEMMMMMMMMMMM: ', item)
            // console.log('Touch typeLeaveApplication: ', userProfile.typeLeaveApplication)
            if (this.state.isModalVisible === false) {
              if (this.props.allow === false) {
                this.props.navigation.navigate("ApplicationApprovalContainer", {
                  idApplication:
                    userProfile.typeLeaveApplication === "1"
                      ? !stringIsEmpty(item.leaveRecordID)
                        ? item.leaveRecordID
                        : ""
                      : userProfile.typeLeaveApplication === "2"
                        ? !stringIsEmpty(item.leaveRecordHourID)
                          ? item.leaveRecordHourID
                          : ""
                        : "",
                  typeApplication: 1,
                });
              } else {
                onSelectedItems(item);
              }
            }
          }}
          style={{
            flexDirection: "row",
            width: "100%",
            paddingVertical: Sizes.s10,
          }}
        >
          <View style={{ width: Sizes.s100, alignItems: "center" }}>
            <Image
              source={
                this.props.allow === false || item.status
                  ? getImage("dangky_card_1")
                  : item.selected
                    ? getImage("ic_check_success_i")
                    : getImage("ic_check_unsuccess")
              }
              style={{
                width:
                  this.props.select === false
                    ? this.props.allow === false
                      ? Sizes.s100
                      : Sizes.s70
                    : Sizes.s100,
                height:
                  this.props.select === false
                    ? this.props.allow === false
                      ? Sizes.s100
                      : Sizes.s70
                    : Sizes.s100,
              }}
            />
          </View>
          <View
            style={{
              width: this.state.isModalVisible === false ? "50%" : "80%",
              paddingHorizontal: Sizes.s20,
            }}
          >
            <Text style={{ color: colorApprove.name, fontSize: Sizes.h32 }}>
              {item.empName}
            </Text>
            <Text
              style={{ color: colorApprove.leaveName, fontSize: Sizes.h28 }}
            >
              {item.leaveName}
            </Text>
            <Text style={{ fontSize: Sizes.h28, color: colorApprove.time2 }}>
              {item.fromDate} - {item.toDate}
            </Text>
          </View>
          {this.state.isModalVisible === false ? (
            <View style={{ width: "35%", alignItems: "flex-end" }}>
              <Text style={{ fontSize: Sizes.h30, fontWeight: "bold" }}>
                {userProfile.LangID === "VN"
                  ? appStrS.vn.approveApplication.leaveRecordHour
                  : appStrS.en.approveApplication.leaveRecordHour}
              </Text>
              <Text
                style={{
                  color: colorApprove.time1,
                  fontSize: Sizes.h26,
                  textAlign: "right",
                }}
              >
                {item.actionDate}
              </Text>
              <Text style={{ color: colorApprove.time2, fontSize: Sizes.h30 }}>
                {item.taken.toFixed(1)}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      );
    } else if (item.type === "info3") {
      // Làm ngoài giờ
      return (
        <TouchableOpacity
          onPress={() => {
            if (this.state.isModalVisible === false) {
              if (this.props.allow === false) {
                this.props.navigation.navigate("ApplicationApprovalContainer", {
                  idApplication: item.recordID,
                  typeApplication: 3,
                });
              } else {
                onSelectedItems(item);
              }
            }
          }}
          style={{
            flexDirection: "row",
            width: "100%",
            paddingVertical: Sizes.s10,
          }}
        >
          <View style={{ width: Sizes.s100, alignItems: "center" }}>
            <Image
              source={
                this.props.allow === false || item.status
                  ? getImage("dangky_card_3")
                  : item.selected
                    ? getImage("ic_check_success_i")
                    : getImage("ic_check_unsuccess")
              }
              style={{
                width:
                  this.props.select === false
                    ? this.props.allow === false
                      ? Sizes.s100
                      : Sizes.s70
                    : Sizes.s100,
                height:
                  this.props.select === false
                    ? this.props.allow === false
                      ? Sizes.s100
                      : Sizes.s70
                    : Sizes.s100,
              }}
            />
          </View>
          <View
            style={{
              width: this.state.isModalVisible === false ? "45%" : "80%",
              paddingHorizontal: Sizes.s20,
            }}
          >
            <Text style={{ color: colorApprove.name, fontSize: Sizes.h32 }}>
              {item.empName}
            </Text>
            <Text style={{ fontSize: Sizes.s30 }}>{item.date}</Text>
            <Text style={{ color: colorApprove.time2, fontSize: Sizes.h30 }}>
              {`${item.from} - ${item.to}`}
            </Text>
          </View>
          {this.state.isModalVisible === false ? (
            <View style={{ width: "40%" }}>
              <Text
                style={{
                  fontSize: Sizes.h34,
                  fontWeight: "bold",
                  textAlign: "right",
                }}
              >
                {userProfile.LangID === "VN"
                  ? appStrS.vn.approveApplication.record
                  : appStrS.en.approveApplication.record}
              </Text>
              <Text style={{ color: colorApprove.time1, textAlign: 'right' }}>
                {item.lastUpdate}
              </Text>
              <View
                style={{
                  flex: 1,
                  
                  flexDirection: "row",
                  paddingTop: Sizes.s5,
                  // backgroundColor: 'red',
                  // alignItems: 'flex-end', 
                  justifyContent: 'flex-end',
                }}
              >
                {/* <LinearGradient
                  colors={["#ffff", "#ffff"]}
                  style={{
                    flex: 1,
                    borderRadius: Sizes.s20,
                    justifyContent: "center",
                    marginHorizontal: Sizes.s5,
                    height: Sizes.s45,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      color: "#ffff",
                      fontSize: Sizes.s30,
                      paddingVertical: Sizes.s5,
                      paddingHorizontal: Sizes.s10,
                      textAlign: "center",
                    }}
                  >
                    {""}
                  </Text>
                </LinearGradient> */}
                {!objectIsNull(item.hourDay) && item.hourDay !== 0 &&
                  (
                    <LinearGradient
                      colors={
                        item.hourDay === 0
                          ? ["#ffff", "#ffff"]
                          : ["#E98614", "#FBD643"]
                      }
                      style={{
                        // flex: 1,
                        // alignSelf: 'baseline',
                        borderRadius: Sizes.s20,
                        marginHorizontal: Sizes.s5,
                        paddingHorizontal: Sizes.s20,
                        justifyContent: "center",
                        height: Sizes.s45,
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          color: "#ffff",
                          fontSize: Sizes.s30,
                          paddingVertical: Sizes.s5,
                          paddingHorizontal: Sizes.s10,
                          textAlign: "center",
                        }}
                      >
                        {item.hourDay === 0 ? "" : item.hourDay.toFixed(1)}
                      </Text>
                    </LinearGradient>
                  )
                }
                {!objectIsNull(item.hourNight) && item.hourNight !== 0 &&
                  (
                    <LinearGradient
                      colors={
                        item.hourNight === 0
                          ? ["#ffff", "#ffff"]
                          : ["#447CFF", "#57C1FF"]
                      }
                      style={{
                        // flex: 1,
                        // alignSelf: 'baseline',
                        paddingHorizontal: Sizes.s20,
                        borderRadius: Sizes.s20,
                        justifyContent: "center",
                        marginHorizontal: Sizes.s5,
                        height: Sizes.s45,
                      }}
                    >
                      <Text
                        numberOfLines={1}
                        style={{
                          color: "#ffff",
                          fontSize: Sizes.s30,
                          paddingVertical: Sizes.s5,
                          paddingHorizontal: Sizes.s10,
                          textAlign: "center",
                        }}
                      >
                        {item.hourNight === 0 ? "" : item.hourNight.toFixed(1)}
                      </Text>
                    </LinearGradient>
                  )
                }
              </View>
            </View>
          ) : null}
        </TouchableOpacity>
      );
    } else if (item.type === "info11") {
      return (
        <TouchableOpacity
          onPress={() => {
            if (this.state.isModalVisible === false) {
              if (this.props.allow === false) {
                this.props.navigation.navigate("ApplicationApprovalContainer", {
                  idApplication: item.congTacID,
                  typeApplication: 2,
                });
              } else {
                onSelectedItems(item);
              }
            }
          }}
          style={{
            flexDirection: "row",
            width: "100%",
            paddingVertical: Sizes.s10,
          }}
        >
          <View style={{ width: Sizes.s100, alignItems: "center" }}>
            <Image
              source={
                this.props.allow === false || item.status
                  ? getImage("dangky_card_11")
                  : item.selected
                    ? getImage("ic_check_success_i")
                    : getImage("ic_check_unsuccess")
              }
              style={{
                width:
                  this.props.select === false
                    ? this.props.allow === false
                      ? Sizes.s100
                      : Sizes.s70
                    : Sizes.s100,
                height:
                  this.props.select === false
                    ? this.props.allow === false
                      ? Sizes.s100
                      : Sizes.s70
                    : Sizes.s100,
              }}
            />
          </View>
          <View
            style={{
              width: this.state.isModalVisible === false ? "45%" : "80%",
              paddingHorizontal: Sizes.s20,
            }}
          >
            <Text style={{ color: colorApprove.name, fontSize: Sizes.h32 }}>
              {item.empName}
            </Text>
            <Text style={{ color: colorApprove.time2, fontSize: Sizes.h30 }}>
              {item.fromDateTime}
            </Text>
            <Text style={{ color: colorApprove.time2, fontSize: Sizes.h30 }}>
              {item.toDateTime}
            </Text>
          </View>
          {this.state.isModalVisible === false ? (
            <View style={{ width: "40%", alignItems: "flex-end" }}>
              <Text style={{ fontSize: Sizes.h34, fontWeight: "bold" }}>
                {userProfile.LangID === "VN"
                  ? appStrS.vn.approveApplication.congTac
                  : appStrS.en.approveApplication.congTac}
              </Text>
              <Text style={{ color: colorApprove.time1 }}>
                {item.actionDate}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: Sizes.h30, color: colorApprove.time2 }}
                >
                  {`${item.soNgayCongTac} ngày `}
                </Text>
                <Text
                  style={{ fontSize: Sizes.h30, color: colorApprove.time1 }}
                >
                  {`${item.soGioCongTac} giờ`}
                </Text>
              </View>
            </View>
          ) : null}
        </TouchableOpacity>
      );
    } else if (item.type === "info75") {
      return (
        <TouchableOpacity
          onPress={() => {
            if (this.state.isModalVisible === false) {
              if (this.props.allow === false) {
                this.props.navigation.navigate("ApplicationApprovalContainer", {
                  idApplication: item.tsdkXacNhanQTOnline2ID,
                  typeApplication: 4,
                });
              } else {
                onSelectedItems(item);
              }
            }
          }}
          style={{
            flexDirection: "row",
            width: "100%",
            paddingVertical: Sizes.s10,
          }}
        >
          <View style={{ width: Sizes.s100, alignItems: "center" }}>
            <Image
              source={
                this.props.allow === false || item.status
                  ? getImage("dangky_card_75")
                  : item.selected
                    ? getImage("ic_check_success_i")
                    : getImage("ic_check_unsuccess")
              }
              style={{
                width:
                  this.props.select === false
                    ? this.props.allow === false
                      ? Sizes.s100
                      : Sizes.s70
                    : Sizes.s100,
                height:
                  this.props.select === false
                    ? this.props.allow === false
                      ? Sizes.s100
                      : Sizes.s70
                    : Sizes.s100,
              }}
            />
          </View>
          <View
            style={{
              width: this.state.isModalVisible === false ? "55%" : "80%",
              paddingHorizontal: Sizes.s20,
            }}
          >
            <Text style={{ color: colorApprove.name, fontSize: Sizes.h30 }}>
              {item.content1}
            </Text>
            <Text style={{ fontSize: Sizes.h30 }}>{item.content2}</Text>
            <Text style={{ fontSize: Sizes.h30 }}>{item.content3}</Text>
            <Text style={{ fontSize: Sizes.h30 }}>{item.content4}</Text>
          </View>
          {this.state.isModalVisible === false ? (
            <View style={{ width: "30%", alignItems: "flex-end" }}>
              <Text style={{ fontSize: Sizes.h34, fontWeight: "bold" }}>
                {userProfile.LangID === "VN"
                  ? appStrS.vn.approveApplication.logTMS
                  : appStrS.en.approveApplication.logTMS}
              </Text>
              <Text style={{ color: colorApprove.time2, fontSize: Sizes.h30 }}>
                {item.content5}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      );
    } else if (item.type === 'info87') {
      return (
        <TouchableOpacity style={{
          width: '100%',
          flexDirection: 'row',
          paddingVertical: Sizes.s10,
          paddingHorizontal: Sizes.s20,
          // height: 50,
          // backgroundColor: 'orange'

        }}>

          <View style={{
            width: Sizes.s100,
            alignItems: "center",

          }}>
            <Image
              source={
                this.props.allow === false || item.status
                  ? !stringIsEmpty(item.avatar) ? { uri: item.avatar } : getImage(item.gender === '0' ? 'img_female' : 'img_male')
                  : item.selected
                    ? getImage("ic_check_success_i")
                    : getImage("ic_check_unsuccess")
              }
              defaultSource={getImage(item.gender === '0' ? 'img_female' : 'img_male')}
              style={
                (this.props.allow === false || item.status) ?
                  {
                    width: Sizes.s120,
                    height: Sizes.s120,
                    borderRadius: Sizes.s100,
                  }
                  : this.props.select ?
                    {
                      width: Sizes.s70,
                      height: Sizes.s70,
                    }
                    :
                    {
                      width: Sizes.s70,
                      height: Sizes.s70,
                    }
                // {
                //   width:
                //     this.props.select === false
                //       ? this.props.allow === false
                //         ? Sizes.s100
                //         : Sizes.s70
                //       : Sizes.s100,
                //   height:
                //     this.props.select === false
                //       ? this.props.allow === false
                //         ? Sizes.s100
                //         : Sizes.s70
                //       : Sizes.s100,
                // }

              }
            />
          </View>
          <View
            style={{
              width: this.state.isModalVisible === false ? "45%" : "80%",
              paddingHorizontal: Sizes.s40,
              flex: 1,
            }}
          >
            <Text style={{
              // color: colorApprove.name,
              color: '#242424',
              fontSize: Sizes.h30,
              fontWeight: 'bold'
            }}>
              {/* {item.empName} */}
              {item.name ? item.name : ''}
            </Text>
            <Text style={{
              color: '#242424',
              // color: colorApprove.time2,
              fontSize: Sizes.h28,
              marginTop: Sizes.s10,
            }}>
              {!stringIsEmpty(item.shiftCode) ? item.shiftCode : ''}
              {/* {item.fromDateTime} */}
            </Text>
            <Text style={{
              // color: colorApprove.time2,
              color: '#242424',
              fontSize: Sizes.h28,
              marginTop: Sizes.s10,
            }}>
              {/* {item.toDateTime} */}
              {item.checkInOutApp === '0' ? (userProfile.LangID === 'VN' ? 'Giờ vào ' : 'Time in ') : (userProfile.LangID === 'VN' ? 'Giờ ra ' : 'Time out ')}<Text style={{
                color: item.checkInOutApp === '0' ? '#4788FF' : '#FFB047',
                fontSize: Sizes.h32,
              }}>{!stringIsEmpty(item.checkInOut) ? item.checkInOut.substr(0, 5) : ''}</Text>
            </Text>
          </View>
          {this.state.isModalVisible === false ? (
            <View style={{
              width: "35%",
              // alignItems: "flex-end",
              // backgroundColor: 'red' 
              justifyContent: 'center',
              // alignItems: 'center',
            }}>
              <View style={{
                // flex: 1,
                // alignSelf: 'stretch',
                width: '100%',

                backgroundColor: item.typeCheck === 0 ? '#FFF6EB' :
                  item.typeCheck === 1 ? '#DEFFE0' :
                    item.typeCheck === 2 ? '#EBF3FF' :
                      '',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: Sizes.s10,
                borderRadius: Sizes.s10,
                paddingHorizontal: Sizes.s20,
              }}>
                <Text
                  numberOfLines={1}
                  style={{
                    color: item.typeCheck === 0 ? '#FF9720' :
                      item.typeCheck === 1 ? '#30B938' :
                        item.typeCheck === 2 ? '#2063FF' :
                          '',
                    fontSize: Sizes.h28,
                    fontWeight: 'bold',
                  }}>{
                    !stringIsEmpty(item.typeName) ? item.typeName : ''
                    // item.typeCheck === 0 ? 'In Office' :
                    //   item.typeCheck === 1 ? 'Out of Office' :
                    //     item.typeCheck === 2 ? 'GPS' :
                    //       ''
                  }</Text>

              </View>
              <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: Sizes.h28,
                    color: '#000',
                    marginTop: Sizes.s10,
                    textAlign: 'center',
                  }}
                >{!stringIsEmpty(item.shiftTime) ? item.shiftTime : ''}</Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: Sizes.h28,
                    marginTop: Sizes.s10,
                    color: '#000',
                    textAlign: 'center',
                  }}
                >{!stringIsEmpty(item.date) ? item.date : ''}</Text>
              </View>
              {/* <Text style={{ fontSize: Sizes.h34, fontWeight: "bold" }}>
                {userProfile.LangID === "VN"
                  ? appStrS.vn.approveApplication.congTac
                  : appStrS.en.approveApplication.congTac}
              </Text>
              <Text style={{ color: colorApprove.time1 }}>
                {item.actionDate}
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{ fontSize: Sizes.h30, color: colorApprove.time2 }}
                >
                  {`${item.soNgayCongTac} ngày `}
                </Text>
                <Text
                  style={{ fontSize: Sizes.h30, color: colorApprove.time1 }}
                >
                  {`${item.soGioCongTac} giờ`}
                </Text>
              </View> */}
            </View>
          ) : null}

        </TouchableOpacity>
      )
    }
  }

  onPressSingleApproval = () => {
    const { item } = this.props;
    // console.log("item1111111", item);
    if (!arrayIsEmpty(item)) {
      if (item.type === "info1") {
        // console.log("item typeLeaveApplication wwww", item);
        let inputLeaveRecordHour = {
          ID:
            userProfile.typeLeaveApplication === "1"
              ? !stringIsEmpty(item.leaveRecordID)
                ? item.leaveRecordID
                : ""
              : userProfile.typeLeaveApplication === "2"
                ? !stringIsEmpty(item.leaveRecordHourID)
                  ? item.leaveRecordHourID
                  : ""
                : "",
          Comment: "OK",
          Approve: "1",
        };
        if (!objectIsNull(inputLeaveRecordHour)) {
          this.props.applicationApprovalAction({
            type: 1,
            DataItem: [inputLeaveRecordHour],
          });
        }
      } else if (item.type === "info3") {
        let inputRecord = {
          ID: item.recordID,
          Comment: "OK",
          Approve: "1",
        };
        if (!objectIsNull(inputRecord)) {
          this.props.applicationApprovalAction({
            type: 2,
            DataItem: [inputRecord],
          });
        }
      } else if (item.type === "info11") {
        let inputCongTac = {
          ID: item.congTacID,
          Comment: "OK",
          Approve: "1",
        };
        if (!objectIsNull(inputCongTac)) {
          this.props.applicationApprovalAction({
            type: 4,
            DataItem: [inputCongTac],
          });
        }
      } else if (item.type === "info75") {
        let inputTsdkXacNhanQTOnline2 = {
          ID: item.tsdkXacNhanQTOnline2ID,
          Comment: "OK",
          Approve: "1",
        };
        if (!objectIsNull(inputTsdkXacNhanQTOnline2)) {
          this.props.applicationApprovalAction({
            type: 3,
            DataItem: [inputTsdkXacNhanQTOnline2],
          });
        }
      } else if (item.type === "info87") {
        let inputCheckInOutGPS = {
          ID: item.id,
          Comment: "OK",
          Approve: "1",
        };
        if (!objectIsNull(inputCheckInOutGPS)) {
          this.props.applicationApprovalAction({
            type: 5,
            DataItem: [inputCheckInOutGPS],
          });
        }
      }
    }
  };

  onPressRefuse = () => {
    const { item } = this.props;
    if (!arrayIsEmpty(item)) {
      if (item.type === "info1") {
        let inputLeaveRecordHour = {
          ID:
            userProfile.typeLeaveApplication === "1"
              ? !stringIsEmpty(item.leaveRecordID)
                ? item.leaveRecordID
                : ""
              : userProfile.typeLeaveApplication === "2"
                ? !stringIsEmpty(item.leaveRecordHourID)
                  ? item.leaveRecordHourID
                  : ""
                : "",
          Comment: this.state.reason,
          Approve: "0",
        };
        if (this.state.reason !== "" && this.state.reason.length >= 0) {
          this.setState(
            {
              statusComment: false,
              // refuse: true,
            },
            () => {
              if (
                !objectIsNull(inputLeaveRecordHour)
                // &&
                // this.state.refuse === true
              ) {
                this.props.applicationApprovalAction({
                  type: 1,
                  DataItem: [inputLeaveRecordHour],
                });
              } else {
                this.setState({
                  statusComment: true,
                  refuse: false,
                });
              }
            }
          );
        } else {
          this.setState({
            statusComment: true,
            refuse: false,
          });
        }
      } else if (item.type === "info3") {
        let inputRecord = {
          ID: item.recordID,
          Comment: this.state.reason,
          Approve: "0",
        };
        if (this.state.reason !== "" && this.state.reason.length >= 0) {
          this.setState(
            {
              statusComment: false,
              // refuse: true,
            },
            () => {
              if (
                !objectIsNull(inputRecord)
                // && this.state.refuse === true
              ) {
                this.props.applicationApprovalAction({
                  type: 2,
                  DataItem: [inputRecord],
                });
              } else {
                this.setState({
                  statusComment: true,
                  refuse: false,
                });
              }
            }
          );
        } else {
          this.setState({
            statusComment: true,
            refuse: false,
          });
        }
      } else if (item.type === "info11") {
        let inputCongTac = {
          ID: item.congTacID,
          Comment: this.state.reason,
          Approve: "0",
        };
        if (this.state.reason !== "" && this.state.reason.length >= 0) {
          this.setState(
            {
              statusComment: false,
              // refuse: true,
            },
            () => {
              if (
                !objectIsNull(inputCongTac)
                // && this.state.refuse === true
              ) {
                this.props.applicationApprovalAction({
                  type: 4,
                  DataItem: [inputCongTac],
                });
              } else {
                this.setState({
                  statusComment: true,
                  refuse: false,
                });
              }
            }
          );
        } else {
          this.setState({
            statusComment: true,
            refuse: false,
          });
        }
      } else if (item.type === "info75") {
        let inputTsdkXacNhanQTOnline2 = {
          ID: item.tsdkXacNhanQTOnline2ID,
          Comment: this.state.reason,
          Approve: "0",
        };
        if (this.state.reason !== "" && this.state.reason.length >= 0) {
          this.setState(
            {
              statusComment: false,
              // refuse: true,
            },
            () => {
              if (
                !objectIsNull(inputTsdkXacNhanQTOnline2)
                // &&
                // this.state.refuse === true
              ) {
                this.props.applicationApprovalAction({
                  type: 3,
                  DataItem: [inputTsdkXacNhanQTOnline2],
                });
              } else {
                this.setState({
                  statusComment: true,
                  refuse: false,
                });
              }
            }
          );
        } else {
          this.setState({
            statusComment: true,
            refuse: false,
          });
        }
      }
      else if (item.type === "info87") {
        let inputCheckInOutGPS = {
          ID: item.id,
          Comment: this.state.reason,
          Approve: "0",
        };
        if (this.state.reason !== "" && this.state.reason.length >= 0) {
          this.setState(
            {
              statusComment: false,
              // refuse: true,
            },
            () => {
              if (
                !objectIsNull(inputCheckInOutGPS)
                // &&
                // this.state.refuse === true
              ) {
                this.props.applicationApprovalAction({
                  type: 5,
                  DataItem: [inputCheckInOutGPS],
                });
              } else {
                this.setState({
                  statusComment: true,
                  refuse: false,
                });
              }
            }
          );
        } else {
          this.setState({
            statusComment: true,
            refuse: false,
          });
        }
      }
    }
  };
  onCheckVisibleModal() {
    return this.state.isModalVisible
  }

  render() {
    const { item, index, fetchingApplicationApproval, } = this.props;
    const swipeSetting = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({
          activeRowKey: item.id,
        });
      },
      right: item.status
        ? []
        : this.props.allow === true
          ? []
          : [
            {
              onPress: () => {
                this.onPressSingleApproval();
                this.setState({ approve: 1 });
              },
              text:
                userProfile.LangID === "VN"
                  ? appStrS.vn.approveApplication.allow
                  : appStrS.en.approveApplication.allow,
              backgroundColor: colorApprove.bgAllow,
            },
            {
              onPress: () => {
                this.setState({
                  approve: 0,
                  isModalVisible: !this.state.isModalVisible,
                });
              },
              text:
                userProfile.LangID === "VN"
                  ? appStrS.vn.approveApplication.refuse
                  : appStrS.en.approveApplication.refuse,
              backgroundColor: colorApprove.bgDeny,
            },
          ],
      rowId: index,
      sectionId: 2,
    };

    // console.log('State - refuse: ', this.state.refuse)
    return (
      <Swipeout {...swipeSetting}>
        <View style={styles.container}>
          {this.renderItem()}

          <Modal
            animationType="fade"
            transparent={true}
            hardwareAccelerated={true}
            visible={this.state.isModalVisible}
          >
            <View style={styles.modalBackground} />
            <View style={styles.centeredView}>
              <View style={styles.styleTitle}>
                <Text style={styles.textTitle}>
                  {userProfile.LangID === "VN"
                    ? appStrS.vn.approveApplication.title_refuse
                    : appStrS.en.approveApplication.title_refuse}
                </Text>
              </View>
              <View style={styles.modalView}>
                <View style={{ padding: Sizes.s15, width: "95%" }}>
                  {this.renderItem()}
                </View>
                <View style={styles.styleInput}>
                  <TextInput
                    placeholder={
                      userProfile.LangID === "VN"
                        ? appStrS.vn.approveApplication.content
                        : appStrS.en.approveApplication.content
                    }
                    placeholderTextColor={colorApprove.placeholderTextColor}
                    value={this.state.reason}
                    style={{
                      flex: 1,
                      paddingVertical: Sizes.h10,
                      fontSize: Sizes.s30,
                    }}
                    onChangeText={(text) => {
                      this.setState(
                        {
                          reason: text,
                        },
                        () => {
                          if (
                            this.state.reason === "" &&
                            this.state.reason.length < 0
                          ) {
                            this.setState({
                              statusComment: true,
                            });
                          } else {
                            this.setState({
                              statusComment: false,
                            });
                          }
                        }
                      );
                    }}
                  />
                </View>
                {this.state.statusComment === false ? (
                  <View style={{ paddingVertical: Sizes.s25 }} />
                ) : (
                    <View
                      style={{
                        paddingVertical: Sizes.s10,
                        marginLeft: Sizes.s30,
                        alignSelf: "flex-start",
                      }}
                    >
                      <Text style={{ color: "#FF0000" }}>{this.state.error}</Text>
                    </View>
                  )}
                {
                  fetchingApplicationApproval ? (
                    <ActivityIndicator
                      size='large'
                      color='blue'
                    />
                  )
                    :
                    this.state.refuse === true ? (
                      <Image
                        source={getImage("ic_check_success_i")}
                        style={{ height: Sizes.s70, width: Sizes.s70 }}
                      />
                    ) : (
                        this.send_Rejection()
                      )}
              </View>
            </View>
          </Modal>
        </View>
      </Swipeout>
    );
  }
}

class ItemApprove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataWaitingList: [],
      dataHistoryList: [],
      refresh: false,
      reload: false,
      flag: false,
      selectedItemWaitingList: undefined,
      selectedItemHistoryList: undefined,
      checkWaitingList: false,
      checkHistoryList: false,
      countWaitingList: 0,
      countHistoryList: 0,
      dataTypeApplication: [],
      dataPickerWaitingList: [],
      dataPickerHistoryList: [],
      dataFilters: [],
      isCheckData: 2,
    };
  }

  onRefresh() {
    if (this.props.allow === true) {
      this.props.changeAllow();
      this.setState({
        flag: true,
      });
    }
    this.onPressWaitingListForApproval();
    this.onPressHistoryOfApprovalMenuList();
  }

  onReload() {
    if (this.props.allow === true) {
      this.props.changeAllow();
      this.setState({
        refresh: true,
        flag: false,
      });
    }
    this.onPressWaitingListForApproval();
    this.onPressHistoryOfApprovalMenuList();
  }

  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.onPressWaitingListForApproval();
        this.onPressHistoryOfApprovalMenuList();
      }
    );

    var arr = [
      {
        id: "0",
        label:
          userProfile.LangID === "VN"
            ? appStrS.vn.approveApplication.allApplicationTypes
            : appStrS.en.approveApplication.allApplicationTypes,
        value: "",
        isSelect: false,
        type: "",
      },
      {
        id: "1",
        label:
          userProfile.LangID === "VN"
            ? appStrS.vn.approveApplication.takeLeave
            : appStrS.en.approveApplication.takeLeave,
        value: "",
        isSelect: false,
        type: "",
      },
      // Hiện tại PNJ k dùng loại đơn này
      // {
      //   id: "11",
      //   label:
      //     userProfile.LangID === "VN"
      //       ? appStrS.vn.approveApplication.workDiary
      //       : appStrS.en.approveApplication.workDiary,
      //   value: "",
      //   isSelect: false,
      //   type: "",
      // },
      {
        id: "3",
        label:
          userProfile.LangID === "VN"
            ? appStrS.vn.approveApplication.Overtime
            : appStrS.en.approveApplication.Overtime,
        value: "",
        isSelect: false,
        type: "",
      },
      {
        id: "75",
        label:
          userProfile.LangID === "VN"
            ? appStrS.vn.approveApplication.AcceptSwipes
            : appStrS.en.approveApplication.AcceptSwipes,
        value: "",
        isSelect: false,
        type: "",
      },
      {
        id: idCheckGPSApplication,
        label:
          userProfile.LangID === "VN"
            ? appStrS.vn.approveApplication.confirmTimekeeping
            : appStrS.en.approveApplication.confirmTimekeeping,
        value: "",
        isSelect: false,
        type: "",
      },
    ];
    let selectedItemWaitingList = undefined;
    let selectedItemHistoryList = undefined;
    let items = arr.filter((value) => {
      return value.id;
    });
    if (!arrayIsEmpty(items)) {
      selectedItemWaitingList = items[0];
      selectedItemHistoryList = items[0];
    }
    this.setState({
      dataTypeApplication: arr,
      selectedItemWaitingList,
      selectedItemHistoryList,
    });
  }

  onPressWaitingListForApproval = () => {
    let input = [{ ID: "1" }, { ID: "3" }, { ID: "11" }, { ID: "75" }, { ID: "87" }];
    // let input = [{ ID: "1" }, { ID: "3" }, { ID: "11" }, { ID: "75" }];
    this.props.waitingListForApprovalAction(input);
  };

  onPressHistoryOfApprovalMenuList = () => {
    let input = [{ ID: "1" }, { ID: "3" }, { ID: "11" }, { ID: "75" }, { ID: "87" }];
    // let input = [{ ID: "1" }, { ID: "3" }, { ID: "11" }, { ID: "75" }];
    this.props.getHistoryOfApprovalMenuListAction(input);
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      dataWaitingListForApproval,
      dataHistoryOfApprovalMenuLists,
      dataApplicationApproval,
      errorApplicationApproval,
    } = this.props;
    // console.log('componentDidUpdate dataWaitingListForApproval 111111111111', dataWaitingListForApproval)
    if (prevProps.dataWaitingListForApproval !== dataWaitingListForApproval) {
      if (!objectIsNull(dataWaitingListForApproval)) {
        // console.log('componentDidUpdate dataWaitingListForApproval 111111111111', dataWaitingListForApproval)
        let mang1 = [];
        let ind = 0;
        for (let [key, value] of Object.entries(dataWaitingListForApproval)) {
          if (!objectIsNull(value)) {
            if (!arrayIsEmpty(value.dataItem)) {
              for (let item of value.dataItem) {
                var date = new Date(
                  !stringIsEmpty(item.lastUpdate) ? item.lastUpdate.replace(" ", "T") : new Date()
                ).getTime();
                let i = Object.assign(item, {
                  type: key,
                  time: date,
                  selected: false,
                  ind: ind,
                });
                ind++;
                mang1.push(i);
              }
            }
          }
        }
        mang1.sort(function (a, b) {
          return b.time - a.time;
        });
        this.setState(
          {
            dataWaitingList: mang1,
            flag: false,
          },
          () => {
            if (!arrayIsEmpty(this.state.dataTypeApplication)) {
              if (this.state.selectedItemWaitingList.id === "0") {
                let data = this.state.dataWaitingList;
                // console.log("dataWaitingList", data);
                this.setState(
                  {
                    dataPickerWaitingList: data,
                    countWaitingList: data.length,
                  },
                  () => {
                    console.log('componentDidUpdate dataPickerWaitingList 22222222222', this.state.dataPickerWaitingList)
                  }
                );
              }
            }
          }
        );
      }
    }
    if (
      prevProps.dataHistoryOfApprovalMenuLists !==
      dataHistoryOfApprovalMenuLists
    ) {
      if (!objectIsNull(dataHistoryOfApprovalMenuLists)) {
        let mang2 = [];
        for (let [key, value] of Object.entries(
          dataHistoryOfApprovalMenuLists
        )) {
          // console.log('componentDidUpdate dataHistoryOfApprovalMenuLists 3333333333333333333', dataHistoryOfApprovalMenuLists)
          if (!objectIsNull(value)) {
            if (!arrayIsEmpty(value.dataItem)) {
              for (let item of value.dataItem) {
                var date = new Date(
                  !stringIsEmpty(item.lastUpdate) ? item.lastUpdate.replace(" ", "T") : new Date()
                ).getTime();
                let i = Object.assign(item, { type: key, time: date });
                mang2.push(i);
              }
            }
          }
        }
        mang2.sort(function (a, b) {
          return b.time - a.time;
        });
        // console.log("kakakakakak",mang2)
        this.setState(
          {
            dataHistoryList: mang2,
          },
          () => {
            if (!arrayIsEmpty(this.state.dataTypeApplication)) {
              if (this.state.selectedItemHistoryList.id === "0") {
                let data = this.state.dataHistoryList;
                // console.log("dataHistoryList", data);
                this.setState(
                  {
                    dataPickerHistoryList: data,
                    countHistoryList: data.length,
                  },
                  () => {
                    // console.log('componentDidUpdate dataPickerHistoryList 4444444444444444', this.state.dataPickerHistoryList)
                  }
                );
              }
            }
          }
        );
      }
    }
    if (dataApplicationApproval !== prevProps.dataApplicationApproval) {
      if (!objectIsNull(dataApplicationApproval)) {
        if (!arrayIsEmpty(dataApplicationApproval)) {
          // console.log('componentDidUpdate dataApplicationApproval 5555555555555555555', dataApplicationApproval)
          if (!this.checkVisibleModalItem()) {
            Alert.alert(
              userProfile.LangID === "VN" ? "Thông báo" : "Notice",
              dataApplicationApproval.message ? dataApplicationApproval.message : (userProfile.LangID === "VN" ? "Xử lý thành công !" : "Success !"),
              [
                {
                  text: userProfile.LangID === "VN" ? "Xác nhận" : "Confirm",
                  onPress: () => {
                    // this.props.navigation.goBack();
                    if (!objectIsNull(this.props.changeAllow)) {
                      if (this.props.allow) {
                        this.props.changeAllow();
                      }
                      this.onPressWaitingListForApproval();
                    }
                  },
                },
              ]
            );
          }

        }
      }
    }
    if (errorApplicationApproval !== prevProps.errorApplicationApproval) {
      if (!objectIsNull(errorApplicationApproval)) {
        // console.log('thisssssssssssssssssssssssssss: ', this.props.allow)
        if (!this.checkVisibleModalItem()) {
          Alert.alert(
            userProfile.LangID === "VN" ? "Thông báo" : "Notice",
            errorApplicationApproval,
            [
              {
                text: userProfile.LangID === "VN" ? "Đóng" : "Close",
                onPress: () => {
                  // this.props.navigation.goBack();
                },
              },
            ]
          );
        }
      }
    }
  }
  onSelectedItems = (item) => {
    let data = this.state.dataWaitingList.map((value) => {
      if (value.ind === item.ind) {
        return Object.assign(item, { selected: !item.selected });
      } else {
        return value;
      }
    });
    this.setState({
      dataWaitingList: data,
    });
  };

  onPressAllow = () => {
    if (this.props.allow === true) {
      //duyệt nhiều đơn
      let data = this.state.dataWaitingList.filter((value) => {
        return value.selected;
      });
      let listLeaveRecordHour = data.filter((value) => {
        return value.type === "info1";
      });
      let listRecord = data.filter((value) => {
        return value.type === "info3";
      });
      let listCongTac = data.filter((value) => {
        return value.type === "info11";
      });
      let listTsdkXacNhanQTOnline2 = data.filter((value) => {
        return value.type === "info75";
      });
      let listCheckInOutGPS = data.filter((value) => {
        return value.type === "info87";
      });
      if (
        !arrayIsEmpty(listLeaveRecordHour) ||
        !arrayIsEmpty(listRecord) ||
        !arrayIsEmpty(listCongTac) ||
        !arrayIsEmpty(listTsdkXacNhanQTOnline2) ||
        !arrayIsEmpty(listCheckInOutGPS)
      ) {
        let inputLeaveRecordHour = listLeaveRecordHour.map((value) => {
          return {
            ID:
              userProfile.typeLeaveApplication === "1"
                ? !stringIsEmpty(value.leaveRecordID)
                  ? value.leaveRecordID
                  : ""
                : userProfile.typeLeaveApplication === "2"
                  ? !stringIsEmpty(value.leaveRecordHourID)
                    ? value.leaveRecordHourID
                    : ""
                  : "",
            Comment: "OK",
            Approve: "1",
          };
        });
        let inputRecord = listRecord.map((value) => {
          return {
            ID: !stringIsEmpty(value.recordID) ? value.recordID : "",
            Comment: "OK",
            Approve: "1",
          };
        });
        let inputLeaveRecordHour1 = listCongTac.map((value) => {
          return {
            ID: !stringIsEmpty(value.congTacID) ? value.congTacID : "",
            Comment: "OK",
            Approve: "1",
          };
        });
        let inputTsdkXacNhanQTOnline2 = listTsdkXacNhanQTOnline2.map(
          (value) => {
            return {
              ID: !stringIsEmpty(value.tsdkXacNhanQTOnline2ID)
                ? value.tsdkXacNhanQTOnline2ID
                : "",
              Comment: "OK",
              Approve: "1",
            };
          }
        );

        let inputCheckInOutGPS = listCheckInOutGPS.map(
          (value) => {
            return {
              ID: !stringIsEmpty(value.id)
                ? value.id
                : "",
              Comment: "OK",
              Approve: "1",
            };
          }
        );
        if (!arrayIsEmpty(inputLeaveRecordHour)) {
          this.props.applicationApprovalAction({
            type: 1,
            DataItem: inputLeaveRecordHour,
          });
        }
        if (!arrayIsEmpty(inputRecord)) {
          this.props.applicationApprovalAction({
            type: 2,
            DataItem: inputRecord,
          });
        }
        if (!arrayIsEmpty(inputLeaveRecordHour1)) {
          this.props.applicationApprovalAction({
            type: 4,
            DataItem: inputLeaveRecordHour1,
          });
        }
        if (!arrayIsEmpty(inputTsdkXacNhanQTOnline2)) {
          this.props.applicationApprovalAction({
            type: 3,
            DataItem: inputTsdkXacNhanQTOnline2,
          });
        }
        if (!arrayIsEmpty(inputCheckInOutGPS)) {
          this.props.applicationApprovalAction({
            type: 5,
            DataItem: inputCheckInOutGPS,
          });
        }
      }
    } else {
      //duyệt tất cả
      let listLeaveRecordHour = this.state.dataWaitingList.filter((value) => {
        return value.type === "info1";
      });
      let listRecord = this.state.dataWaitingList.filter((value) => {
        return value.type === "info3";
      });
      let listCongTac = this.state.dataWaitingList.filter((value) => {
        return value.type === "info11";
      });
      let listTsdkXacNhanQTOnline2 = this.state.dataWaitingList.filter(
        (value) => {
          return value.type === "info75";
        }
      );
      let listCheckInOutGPS = this.state.dataWaitingList.filter(
        (value) => {
          return value.type === "info87";
        }
      );
      // console.log('listLeaveRecodrd Hour: ', listLeaveRecordHour)

      if (
        !arrayIsEmpty(listLeaveRecordHour) ||
        !arrayIsEmpty(listRecord) ||
        !arrayIsEmpty(listCongTac) ||
        !arrayIsEmpty(listTsdkXacNhanQTOnline2) ||
        !arrayIsEmpty(listCheckInOutGPS)
      ) {
        let inputLeaveRecordHour = listLeaveRecordHour.map((value) => {
          // console.log('value REEEEEEEEEEE: ', value)
          // console.log('value typeLeaveApplication: ', userProfile.typeLeaveApplication)
          return {
            ID:
              userProfile.typeLeaveApplication === "1"
                ? !stringIsEmpty(value.leaveRecordID)
                  ? value.leaveRecordID
                  : ""
                : userProfile.typeLeaveApplication === "2"
                  ? !stringIsEmpty(value.leaveRecordHourID)
                    ? value.leaveRecordHourID
                    : ""
                  : "",
            Comment: "OK",
            Approve: "1",
          };
        });
        let inputRecord = listRecord.map((value) => {
          return {
            ID: !stringIsEmpty(value.recordID) ? value.recordID : "",
            Comment: "OK",
            Approve: "1",
          };
        });
        let inputLeaveRecordHour1 = listCongTac.map((value) => {
          return {
            ID: !stringIsEmpty(value.congTacID) ? value.congTacID : "",
            Comment: "OK",
            Approve: "1",
          };
        });
        let inputTsdkXacNhanQTOnline2 = listTsdkXacNhanQTOnline2.map(
          (value) => {
            return {
              ID: !stringIsEmpty(value.tsdkXacNhanQTOnline2ID)
                ? value.tsdkXacNhanQTOnline2ID
                : "",
              Comment: "OK",
              Approve: "1",
            };
          }
        );
        let inputCheckInOutGPS = listCheckInOutGPS.map(
          (value) => {
            return {
              ID: !stringIsEmpty(value.id)
                ? value.id
                : "",
              Comment: "OK",
              Approve: "1",
            };
          }
        );
        if (!arrayIsEmpty(inputLeaveRecordHour)) {
          this.props.applicationApprovalAction({
            type: 1,
            DataItem: inputLeaveRecordHour,
          });
        }
        if (!arrayIsEmpty(inputRecord)) {
          this.props.applicationApprovalAction({
            type: 2,
            DataItem: inputRecord,
          });
        }
        if (!arrayIsEmpty(inputLeaveRecordHour1)) {
          this.props.applicationApprovalAction({
            type: 4,
            DataItem: inputLeaveRecordHour1,
          });
        }
        if (!arrayIsEmpty(inputTsdkXacNhanQTOnline2)) {
          this.props.applicationApprovalAction({
            type: 3,
            DataItem: inputTsdkXacNhanQTOnline2,
          });
        }
        if (!arrayIsEmpty(inputCheckInOutGPS)) {
          this.props.applicationApprovalAction({
            type: 5,
            DataItem: inputCheckInOutGPS,
          });
        }
      }
    }
  };

  dataWaitingList = (value) => {
    let listLeaveRecordHour = this.state.dataWaitingList.filter((value) => {
      return value.type === "info1";
    });
    let listRecord = this.state.dataWaitingList.filter((value) => {
      return value.type === "info3";
    });
    let listCongTac = this.state.dataWaitingList.filter((value) => {
      return value.type === "info11";
    });
    let listTsdkXacNhanQTOnline2 = this.state.dataWaitingList.filter(
      (value) => {
        return value.type === "info75";
      }
    );
    if (
      !arrayIsEmpty(listLeaveRecordHour) ||
      !arrayIsEmpty(listRecord) ||
      !arrayIsEmpty(listCongTac) ||
      !arrayIsEmpty(listTsdkXacNhanQTOnline2)
    ) {
      if (value.id === "0") {
        return this.setState({
          dataPickerWaitingList: this.state.dataWaitingList,
          selectedItemWaitingList: value,
          countWaitingList: (this.state.countWaitingList = this.state.dataWaitingList.length),
        });
      } else if (value.id === "1") {
        return this.setState({
          dataPickerWaitingList: listLeaveRecordHour,
          selectedItemWaitingList: value,
          countWaitingList: (this.state.countWaitingList =
            listLeaveRecordHour.length),
        });
      } else if (value.id === "3") {
        return this.setState({
          dataPickerWaitingList: listRecord,
          selectedItemWaitingList: value,
          countWaitingList: (this.state.countWaitingList = listRecord.length),
        });
      } else if (value.id === "11") {
        return this.setState({
          dataPickerWaitingList: listCongTac,
          selectedItemWaitingList: value,
          countWaitingList: (this.state.countWaitingList = listCongTac.length),
        });
      } else if (value.id === "75") {
        return this.setState({
          dataPickerWaitingList: listTsdkXacNhanQTOnline2,
          selectedItemWaitingList: value,
          countWaitingList: (this.state.countWaitingList =
            listTsdkXacNhanQTOnline2.length),
        });
      }
    }
  };

  dataHistoryList = (value) => {
    let listLeaveRecordHour = this.state.dataHistoryList.filter((value) => {
      return value.type === "info1";
    });
    let listRecord = this.state.dataHistoryList.filter((value) => {
      return value.type === "info3";
    });
    let listCongTac = this.state.dataHistoryList.filter((value) => {
      return value.type === "info11";
    });
    let listTsdkXacNhanQTOnline2 = this.state.dataHistoryList.filter(
      (value) => {
        return value.type === "info75";
      }
    );
    if (
      !arrayIsEmpty(listLeaveRecordHour) ||
      !arrayIsEmpty(listRecord) ||
      !arrayIsEmpty(listCongTac) ||
      !arrayIsEmpty(listTsdkXacNhanQTOnline2)
    ) {
      if (value.id === "0") {
        return this.setState({
          dataPickerHistoryList: this.state.dataHistoryList,
          selectedItemHistoryList: value,
          countHistoryList: (this.state.countHistoryList = this.state.dataHistoryList.length),
        });
      } else if (value.id === "1") {
        return this.setState({
          dataPickerHistoryList: listLeaveRecordHour,
          selectedItemHistoryList: value,
          countHistoryList: (this.state.countHistoryList =
            listLeaveRecordHour.length),
        });
      } else if (value.id === "3") {
        return this.setState({
          dataPickerHistoryList: listRecord,
          selectedItemHistoryList: value,
          countHistoryList: (this.state.countHistoryList = listRecord.length),
        });
      } else if (value.id === "11") {
        return this.setState({
          dataPickerHistoryList: listCongTac,
          selectedItemHistoryList: value,
          countHistoryList: (this.state.countHistoryList = listCongTac.length),
        });
      } else if (value.id === "75") {
        return this.setState({
          dataPickerHistoryList: listTsdkXacNhanQTOnline2,
          selectedItemHistoryList: value,
          countHistoryList: (this.state.countHistoryList =
            listTsdkXacNhanQTOnline2.length),
        });
      }
    }
  };

  exportData() {
    let _dataTypeApplication = this.state.dataTypeApplication;
    // console.log('itemApprove - exportData: ', _dataTypeApplication)
    let listData = [];
    // if (
    //   !arrayIsEmpty(this.state.dataWaitingList) &&
    //   !arrayIsEmpty(this.state.dataHistoryList)
    // ) {
    //   listData =
    //     this.props.select === false
    //       ? this.state.dataWaitingList
    //       : this.state.dataHistoryList;
    // }
    if (this.props.select === false) {
      if (!arrayIsEmpty(this.state.dataWaitingList)) {
        listData = this.state.dataWaitingList;
      } else {
        for (let i = 0; i < _dataTypeApplication.length; i++) {
          const index = i;
          _dataTypeApplication[index] = {
            ..._dataTypeApplication[index],
            size: 0,
          };
        }
      }
    } else {
      if (!arrayIsEmpty(this.state.dataHistoryList)) {
        listData = this.state.dataHistoryList;
      } else {
        for (let i = 0; i < _dataTypeApplication.length; i++) {
          const index = i;
          _dataTypeApplication[index] = {
            ..._dataTypeApplication[index],
            size: 0,
          };
        }
      }
    }
    if (!arrayIsEmpty(listData) && !arrayIsEmpty(_dataTypeApplication)) {
      const listLeaveRecordHour = listData.filter((value) => {
        return value.type === "info1";
      });
      const listRecord = listData.filter((value) => {
        return value.type === "info3";
      });
      const listCongTac = listData.filter((value) => {
        return value.type === "info11";
      });
      const listTsdkXacNhanQTOnline2 = listData.filter((value) => {
        return value.type === "info75";
      });
      // console.log("_dataTypeApplication", _dataTypeApplication);
      // console.log("listLeaveRecordHour", listLeaveRecordHour);
      // console.log("listRecord", listRecord);
      // console.log("listCongTac", listCongTac);
      // console.log("listTsdkXacNhanQTOnline2", listTsdkXacNhanQTOnline2);
      for (let i = 0; i < _dataTypeApplication.length; i++) {
        const index = i;
        if (!objectIsNull(_dataTypeApplication)) {
          switch (_dataTypeApplication[i].id) {
            case "0":
              _dataTypeApplication[index] = {
                ..._dataTypeApplication[index],
                size: !arrayIsEmpty(listData.length) ? listData.length : 0,
              };
              break;
            case "1":
              _dataTypeApplication[index] = {
                ..._dataTypeApplication[index],
                size: !arrayIsEmpty(listLeaveRecordHour.length)
                  ? listLeaveRecordHour.length
                  : 0,
              };
              break;
            case "3":
              _dataTypeApplication[index] = {
                ..._dataTypeApplication[index],
                size: !arrayIsEmpty(listRecord.length) ? listRecord.length : 0,
              };
              break;

            case "11":
              _dataTypeApplication[index] = {
                ..._dataTypeApplication[index],
                size: !arrayIsEmpty(listCongTac.length)
                  ? listCongTac.length
                  : 0,
              };
              break;

            case "75":
              _dataTypeApplication[index] = {
                ..._dataTypeApplication[index],
                size: !arrayIsEmpty(listTsdkXacNhanQTOnline2.length)
                  ? listTsdkXacNhanQTOnline2.length
                  : 0,
              };
              break;
          }
        }
      }
    }

    return _dataTypeApplication;
  }
  checkVisibleModalItem() {
    // for(let i = 0; i <)
    if (!arrayIsEmpty(this.state.dataPickerWaitingList)) {
      for (let i = 0; i < this.state.dataPickerWaitingList.length; i++) {
        if (!objectIsNull(this.refs[`item${i}`])) {
          if (!objectIsNull(this.refs[`item${i}`].onCheckVisibleModal)) {
            if (!objectIsNull(this.refs[`item${i}`].onCheckVisibleModal())) {
              return true
            }
          }
        }
      }
    }
    return false
  }
  render() {
    const {
      loadingWaitingListForApproval,
      loadingHistoryOfApprovalMenuLists,
      errorWaitingListForApproval,
      fetchingApplicationApproval,
    } = this.props;

    // console.log("111111",this.state.dataTypeApplication)
    // console.log("2222222", this.state.dataPickerHistoryList)
    // console.log("33333",this.state.dataPickerHistoryList)

    const _dataTypeApplication = this.exportData();
    // console.log(
    //   "render dataPickerWaitingList",
    //   this.state.dataPickerWaitingList
    // );
    // console.log(
    //   "render dataPickerHistoryList",
    //   this.state.dataPickerHistoryList
    // );

    return (
      <View
        style={{
          flex: 1,
          width: "100%",
          backgroundColor: colorApprove.styleContainer,
        }}
      >
        {fetchingApplicationApproval && !this.checkVisibleModalItem() && <Loading />}
        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            paddingHorizontal: Sizes.s20,
            alignItems: "center",
          }}
        >

          <CustomPickerApproval
            items={
              _dataTypeApplication
              // arrayIsEmpty(this.state.dataTypeApplication)
              //   ? []
              //   : this.state.dataTypeApplication
            }
            count={
              this.props.select === false
                ? this.state.countWaitingList
                : this.state.countHistoryList
            }
            selectedItem={
              this.props.select === false
                ? this.state.selectedItemWaitingList
                : this.state.selectedItemHistoryList
            }
            check={
              this.props.select === false
                ? this.state.checkWaitingList
                : this.state.checkHistoryList
            }
            onSelectedItemCombobox={
              this.props.select === false
                ? this.dataWaitingList
                : this.dataHistoryList
            }
          />
        </View>
        {(
          this.props.select === false
            ? loadingWaitingListForApproval
            : loadingHistoryOfApprovalMenuLists
        ) ? (
            <Loading />
            // <ActivityIndicator
            //   size="large"
            //   color="#0491ce"
            //   style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            // />
          ) : (
            this.props.select === false
              ? !arrayIsEmpty(this.state.dataPickerWaitingList)
              : !arrayIsEmpty(this.state.dataPickerHistoryList)
          ) ? (
              <View style={{ flex: 1 }}>
                <FlatList
                  ref="flatList"
                  showsVerticalScrollIndicator={false}
                  data={
                    this.props.select === false
                      ? this.state.dataPickerWaitingList
                      : this.state.dataPickerHistoryList
                  }
                  renderItem={({ item, index }) => {
                    return (
                      <Items
                        ref={"item" + index}
                        onSelectedItems={this.onSelectedItems}
                        item={item}
                        index={index}
                        {...this.props}
                      />
                    );
                  }}
                  refreshControl={
                    <RefreshControl
                      refreshing={this.state.refresh}
                      onRefresh={this.onRefresh.bind(this)}
                    />
                  }
                  keyExtractor={(item) => item.id}
                />
                {this.props.select ? (
                  []
                ) : arrayIsEmpty(this.state.dataWaitingList) ? (
                  []
                ) : (
                      <View
                        style={{
                          paddingVertical: Sizes.s10,
                          width: "95%",
                          alignSelf: "center",
                        }}
                      >
                        <CustomButton
                          onPress={() => {
                            Alert.alert(
                              userProfile.LangID === "VN"
                                ? appStrS.vn.approveApplication.alert
                                : appStrS.en.approveApplication.alert,
                              userProfile.LangID === "VN"
                                ? appStrS.vn.approveApplication.content_alert
                                : appStrS.en.approveApplication.content_alert,
                              [
                                {
                                  text:
                                    userProfile.LangID === "VN"
                                      ? appStrS.vn.approveApplication.refuse
                                      : appStrS.en.approveApplication.refuse,
                                  onPress: () => { },
                                },
                                {
                                  text:
                                    userProfile.LangID === "VN"
                                      ? appStrS.vn.approveApplication.allow
                                      : appStrS.en.approveApplication.allow,
                                  onPress: () => {
                                    this.onPressAllow();
                                  },
                                },
                              ]
                            );
                          }}
                          title={
                            this.props.allow
                              ? userProfile.LangID === "VN"
                                ? appStrS.vn.approveApplication.allow
                                : appStrS.en.approveApplication.allow
                              : userProfile.LangID === "VN"
                                ? appStrS.vn.approveApplication.all_allow
                                : appStrS.en.approveApplication.all_allow
                          }
                        />
                      </View>
                    )}
              </View>
            ) : (
              <ScrollView
                contentContainerStyle={{ flex: 1 }}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.reload}
                    onRefresh={this.onReload.bind(this)}
                  />
                }
              >
                <View style={styles.styleError}>
                  <Image
                    source={getImage(
                      this.state.isCheckData === 1
                        ? "image_empty_data"
                        : this.state.isCheckData === 2
                          ? "image_empty_data_2"
                          : "image_empty_data_3"
                    )}
                    style={{
                      resizeMode: "contain",
                      height: Sizes.s260 * 2,
                      width: Sizes.s260 * 2,
                    }}
                  />
                  {/* <Text style={{ fontSize: Sizes.h32 }}>
                {userProfile.LangID === "VN"
                  ? appStrS.vn.approveApplication.not_application
                  : appStrS.en.approveApplication.not_application}
              </Text> */}
                </View>
              </ScrollView>
            )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: Sizes.s20,
    paddingVertical: Sizes.s10,
    backgroundColor: colorApprove.styleContainer,
    flexDirection: "row",
  },
  styleTitle: {
    width: "90%",
    backgroundColor: colorApprove.name,
    borderTopLeftRadius: Sizes.s20,
    borderTopRightRadius: Sizes.s20,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  textTitle: {
    color: colorApprove.styleContainer,
    padding: Sizes.s20,
    fontSize: Sizes.h36,
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#FFF",
    padding: Sizes.s20,
    width: "90%",
    alignItems: "center",
    borderBottomLeftRadius: Sizes.s20,
    borderBottomRightRadius: Sizes.s20,
  },
  send: {
    padding: Sizes.s15,
    width: Sizes.s160,
    borderRadius: Sizes.s10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Sizes.s20,
  },
  reason: {
    borderRadius: Sizes.s20,
    backgroundColor: "#E2E5E7",
    marginBottom: Sizes.s20,
    width: "100%",
    padding: Sizes.s10,
    fontSize: Sizes.s30,
  },
  textTime: {
    color: colorApprove.textTime,
  },
  styleModalSend: {
    fontWeight: "bold",
    color: colorApprove.textSend,
    fontSize: Sizes.s30,
  },
  modalBackground: {
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
    opacity: 0.6,
    position: "absolute",
  },
  styleInput: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.h28,
    paddingVertical: Sizes.s2,
    alignItems: "center",
    borderRadius: Sizes.h52,
    alignSelf: "center",
    backgroundColor: colorForm.inputForm,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  styleError: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },


});
export default ItemApprove;

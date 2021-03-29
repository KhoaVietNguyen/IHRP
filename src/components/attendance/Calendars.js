import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome5";
import CustomHeader from "../custom/CustomHeader";
import getImage from "../../res/values/strings/iconStrS";
import { Sizes } from "@dungdang/react-native-basic";
import {
  arrayIsEmpty,
  objectIsNull,
} from "@dungdang/react-native-basic/src/Functions";
import {
  colorCalendar,
  colorPersonal,
} from "../../res/values/strings/colorStr";
import { appStrS } from "../../res/values/strings/appStrS";
import { userProfile } from "../../config/settings";

class Calendars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: this.formatCurrentDate(),
      selectedDate: this.formatDate(this.formatNewDate()),
      markedDates: {},
      dataTimeCheckInOut: [],
      dataWFHCheckInOut: [],
    };
  }
  componentDidMount() {
    if (userProfile.typeWiFiOrWFH === 'WIFI') {
      // console.log('componentDidMount 11111111111111')
      // Dữ liệu check Wifi
      this.checkDataWifiInfoCheckInOutInMonth();
      this.checkDataWifiInfoCheckInOutInDay();
      this.getSelectedDayEvents(this.state.selectedDate);
    } else {
      // console.log('componentDidMount 22222222222222222222222')
      //Dữ liệu WFH trong tháng
      this.checkDataWFHInfoCheckInOutInMonth();
      this.checkDataWFHInfoCheckInOutInDay();
      this.getSelectCheckWFHInDay(this.state.selectedDate);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      dataWifiInfoCheckInOutInDay,
      dataWifiInfoCheckInOutInMonth,
      dataWFHInfoCheckInOutInMonth,
      dataWFHInfoCheckInOutInDay,
    } = this.props;
    if (userProfile.typeWiFiOrWFH === 'WIFI') {
      if (
        prevProps.dataWifiInfoCheckInOutInDay !== dataWifiInfoCheckInOutInDay
      ) {
        if (!objectIsNull(dataWifiInfoCheckInOutInDay)) {
          if (!objectIsNull(dataWifiInfoCheckInOutInDay.info1)) {
            if (!arrayIsEmpty(dataWifiInfoCheckInOutInDay.info1.dataItem)) {
              // console.log('componentDidUpdate 33333333333333333')
              this.setState(
                {
                  dataTimeCheckInOut:
                    dataWifiInfoCheckInOutInDay.info1.dataItem,
                },
                () => {
                  this.getSelectedDayEvents(this.state.selectedDate);
                }
              );
            } else if (dataWifiInfoCheckInOutInDay.info1.countItem <= 0) {
              this.setState(
                {
                  dataTimeCheckInOut: [],
                },
                () => {
                  this.getSelectedDayEvents(this.state.selectedDate);
                }
              );
            }
          }
        }
      }
      if (
        prevProps.dataWifiInfoCheckInOutInMonth !==
        dataWifiInfoCheckInOutInMonth
      ) {
        if (!objectIsNull(dataWifiInfoCheckInOutInMonth)) {
          if (!objectIsNull(dataWifiInfoCheckInOutInMonth.info1)) {
            if (!arrayIsEmpty(dataWifiInfoCheckInOutInMonth.info1.dataItem)) {
              for (let item of dataWifiInfoCheckInOutInMonth.info1.dataItem) {
                // console.log('componentDidUpdate 444444444444444')
                if (item.dateID) {
                  this.state.markedDates[item.dateID] = {
                    marked: true,
                    dotColor: item.color,
                  };
                  this.setState(
                    {
                      markedDates: Object.assign({}, this.state.markedDates),
                    },
                    () => {
                      this.getSelectedDayEvents(this.state.selectedDate);
                    }
                  );
                }
              }
            } else if (dataWifiInfoCheckInOutInMonth.info1.countItem <= 0) {
              dataWifiInfoCheckInOutInMonth.info1.dataItem = [];
              this.getSelectedDayEvents(this.state.selectedDate);
            }
          }
        }
      }
    } else {
      //Dữ liệu WFH trong tháng
      if (
        prevProps.dataWFHInfoCheckInOutInMonth !== dataWFHInfoCheckInOutInMonth
      ) {
        if (!objectIsNull(dataWFHInfoCheckInOutInMonth)) {
          if (!objectIsNull(dataWFHInfoCheckInOutInMonth.info1)) {
            if (!arrayIsEmpty(dataWFHInfoCheckInOutInMonth.info1.dataItem)) {
              for (let item of dataWFHInfoCheckInOutInMonth.info1.dataItem) {
                // console.log('componentDidUpdate 5555555555555')
                if (item.dateID) {
                  this.state.markedDates[item.dateID] = {
                    marked: true,
                    dotColor: item.color,
                  };
                  this.setState(
                    {
                      markedDates: Object.assign({}, this.state.markedDates),
                    },
                    () => {
                      this.getSelectCheckWFHInDay(this.state.selectedDate);
                    }
                  );
                }
              }
            } else if (dataWFHInfoCheckInOutInMonth.info1.countItem <= 0) {
              dataWFHInfoCheckInOutInMonth.info1.dataItem = [];
              this.getSelectCheckWFHInDay(this.state.selectedDate);
            }
          }
        }
      }
      // Dữ liệu thông tin check in out WFH trong ngày
      if (prevProps.dataWFHInfoCheckInOutInDay !== dataWFHInfoCheckInOutInDay) {
        if (!objectIsNull(dataWFHInfoCheckInOutInDay)) {
          if (!objectIsNull(dataWFHInfoCheckInOutInDay.info1)) {
            if (!arrayIsEmpty(dataWFHInfoCheckInOutInDay.info1.dataItem)) {
              // console.log('componentDidUpdate 66666666666666')
              this.setState(
                {
                  dataWFHCheckInOut: dataWFHInfoCheckInOutInDay.info1.dataItem,
                },
                () => {
                  this.getSelectCheckWFHInDay(this.state.selectedDate);
                }
              );
            } else if (dataWFHInfoCheckInOutInDay.info1.countItem <= 0) {
              this.setState(
                {
                  dataWFHCheckInOut: [],
                },
                () => {
                  this.getSelectCheckWFHInDay(this.state.selectedDate);
                }
              );
            }
          }
        }
      }
    }
  }

  formatCurrentDate() {
    let d = new Date();
    let month = ("0" + (d.getMonth() + 1)).substr(-2);
    let year = d.getFullYear();
    return year + "-" + month + "-01";
  }

  formatDate(date) {
    let d = date.split("/");
    let month = ("0" + d[0]).substr(-2);
    let day = ("0" + d[1]).substr(-2);

    return d[2] + "-" + month + "-" + day;
  }

  formatNewDate() {
    let nowDate = new Date();
    let day = nowDate.getDate();
    let month = nowDate.getMonth() + 1;
    let year = nowDate.getFullYear();
    return month + "/" + day + "/" + year;
  }

  formatMonth() {
    var monthTime = [
      { type: appStrS.en.calendars.month.January, index: 0 },
      { type: appStrS.en.calendars.month.February, index: 1 },
      { type: appStrS.en.calendars.month.March, index: 2 },
      { type: appStrS.en.calendars.month.April, index: 3 },
      { type: appStrS.en.calendars.month.May, index: 4 },
      { type: appStrS.en.calendars.month.June, index: 5 },
      { type: appStrS.en.calendars.month.July, index: 6 },
      { type: appStrS.en.calendars.month.August, index: 7 },
      { type: appStrS.en.calendars.month.September, index: 8 },
      { type: appStrS.en.calendars.month.October, index: 9 },
      { type: appStrS.en.calendars.month.November, index: 10 },
      { type: appStrS.en.calendars.month.December, index: 11 },
    ];
    for (var i = 0; i < monthTime.length; i++) {
      if ("M" === monthTime[i].index) {
        return monthTime[i].type + ", " + "yyyy";
      }
    }
  }

  formatDateRender(date) {
    let d = date.split("-");
    let df = new Date(date);
    if (userProfile.LangID === "VN") {
      if (df.getDay() === 0) {
        return "Chủ nhật, ngày " + d[2] + "/" + d[1] + "/" + d[0];
      } else {
        return (
          "Thứ " +
          (df.getDay() + 1) +
          ", ngày " +
          d[2] +
          "/" +
          d[1] +
          "/" +
          d[0]
        );
      }
    } else {
      var monthTime = [
        { type: appStrS.en.calendars.month.January, index: 0 },
        { type: appStrS.en.calendars.month.February, index: 1 },
        { type: appStrS.en.calendars.month.March, index: 2 },
        { type: appStrS.en.calendars.month.April, index: 3 },
        { type: appStrS.en.calendars.month.May, index: 4 },
        { type: appStrS.en.calendars.month.June, index: 5 },
        { type: appStrS.en.calendars.month.July, index: 6 },
        { type: appStrS.en.calendars.month.August, index: 7 },
        { type: appStrS.en.calendars.month.September, index: 8 },
        { type: appStrS.en.calendars.month.October, index: 9 },
        { type: appStrS.en.calendars.month.November, index: 10 },
        { type: appStrS.en.calendars.month.December, index: 11 },
      ];
      for (var i = 0; i < monthTime.length; i++) {
        if (df.getMonth() === monthTime[i].index)
          if (df.getDay() === 0) {
            return (
              appStrS.en.calendars.day.Sunday +
              ", " +
              monthTime[i].type +
              " " +
              d[2] +
              ", " +
              d[0]
            );
          } else if (df.getDay() === 1) {
            return (
              appStrS.en.calendars.day.Monday +
              ", " +
              monthTime[i].type +
              " " +
              d[2] +
              ", " +
              d[0]
            );
          } else if (df.getDay() === 2) {
            return (
              appStrS.en.calendars.day.Tuesday +
              ", " +
              monthTime[i].type +
              " " +
              d[2] +
              ", " +
              d[0]
            );
          } else if (df.getDay() === 3) {
            return (
              appStrS.en.calendars.day.Wednesday +
              ", " +
              monthTime[i].type +
              " " +
              d[2] +
              ", " +
              d[0]
            );
          } else if (df.getDay() === 4) {
            return (
              appStrS.en.calendars.day.Thursday +
              ", " +
              monthTime[i].type +
              " " +
              d[2] +
              ", " +
              d[0]
            );
          } else if (df.getDay() === 5) {
            return (
              appStrS.en.calendars.day.Friday +
              ", " +
              monthTime[i].type +
              " " +
              d[2] +
              ", " +
              d[0]
            );
          } else if (df.getDay() === 6) {
            return (
              appStrS.en.calendars.day.Saturday +
              ", " +
              monthTime[i].type +
              " " +
              d[2] +
              ", " +
              d[0]
            );
          }
      }
    }
  }

  showDateCheckInOutInMonth(date) {
    let d = date.split("-");
    let df = new Date(date);
    return d[1] + "/" + d[0];
  }

  getSelectedDayEvents = (date, currentDate) => {
    let mar = this.state.markedDates;
    let markedDates = {};
    if (date === this.state.selectedDate) {
      markedDates[date] = { selected: true, marked: false };
    }
    if (!objectIsNull(currentDate)) {
      if (!objectIsNull(this.props.dataWifiInfoCheckInOutInMonth)) {
        for (let item of this.props.dataWifiInfoCheckInOutInMonth.info1
          .dataItem) {
          if (item.dateID === currentDate) {
            markedDates[currentDate] = {
              selected: false,
              marked: true,
              dotColor: item.color,
            };
            break;
          }
        }
      }
    }
    let obj = Object.assign({}, mar, markedDates);
    this.setState({
      markedDates: obj,
    });
  };

  getSelectCheckWFHInDay = (date, currentDate) => {
    let mar = this.state.markedDates;
    let markedDates = {};
    if (date === this.state.selectedDate) {
      markedDates[date] = { selected: true, marked: false };
    }
    if (!objectIsNull(currentDate)) {
      if (!objectIsNull(this.props.dataWFHInfoCheckInOutInMonth)) {
        for (let item of this.props.dataWFHInfoCheckInOutInMonth.info1
          .dataItem) {
          if (item.dateID === currentDate) {
            markedDates[currentDate] = {
              selected: false,
              marked: true,
              dotColor: item.color,
            };

            break;
          }
        }
      }
    }
    let obj = Object.assign({}, mar, markedDates);
    this.setState({
      markedDates: obj,
    });
  };

  checkDataWifiInfoCheckInOutInDay = () => {
    const input = {
      F: "A1",
      P: this.state.selectedDate,
    };
    this.props.getInfoCheckInOutInDayAction(input);
  };

  checkDataWifiInfoCheckInOutInMonth() {
    const input = {
      F: "A3",
      P: this.showDateCheckInOutInMonth(this.state.currentDate),
    };
    this.props.getHistoryCalendarsCheckInOutInMonthAction(input);
  }

  checkDataWFHInfoCheckInOutInMonth() {
    const input = {
      F: "A3",
      P: this.showDateCheckInOutInMonth(this.state.currentDate),
    };
    this.props.getWFHInfoCheckInOutInMonthAction(input);
  }

  checkDataWFHInfoCheckInOutInDay = () => {
    const input = {
      F: "A2",
      P: this.state.selectedDate,
    };
    this.props.getWFHInfoCheckInOutInDayAction(input);
  };

  render() {
    const {
      fetchingWifiInfoCheckInOutInDay,
      errorWifiInfoCheckInOutInDay,
      dataWifiInfoCheckInOutInDay,

      // Dữ liệu thông tin check in out WFH trong ngày
      fetchingWFHInfoCheckInOutInDay,
      dataWFHInfoCheckInOutInDay,
      errorWFHInfoCheckInOutInDay,
    } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: "#FFF" }}>
          <CustomHeader
            typeIconLeft={"back"}
            title={
              userProfile.LangID === "VN"
                ? appStrS.vn.calendars.title
                : appStrS.en.calendars.title
            }
            onPressLeft={() => {
              this.props.navigation.goBack();
            }}
          />
          <Calendar
            markedDates={this.state.markedDates}
            current={this.state.currentDate}
            onDayPress={(day) => {
              if (day.dateString === this.state.selectedDate) {
              } else {
                const currentDate = this.state.selectedDate;
                this.setState({ selectedDate: day.dateString }, () => {
                  if (userProfile.typeWiFiOrWFH === 'WIFI') {
                    // console.log('render 11111111111111')
                    this.checkDataWifiInfoCheckInOutInDay();
                    this.getSelectedDayEvents(day.dateString, currentDate);
                  } else {
                    // console.log('render 222222222222')
                    this.checkDataWFHInfoCheckInOutInDay();
                    this.getSelectCheckWFHInDay(day.dateString, currentDate);
                  }
                });
              }
            }}
            monthFormat={
              userProfile.LangID === "VN"
                ? "'Tháng' M',' yyyy"
                : this.formatMonth()
            }
            onMonthChange={(month) => {
              this.setState(
                {
                  currentDate: month.dateString,
                },
                () => {
                  if (userProfile.typeWiFiOrWFH === 'WIFI') {
                    // console.log('render 33333333333')
                    this.checkDataWifiInfoCheckInOutInMonth();
                  } else {
                    // console.log('render 4444444444444')
                    this.checkDataWFHInfoCheckInOutInMonth();
                  }
                }
              );
            }}
            hideArrows={false}
            renderArrow={(direction) => (
              <View style={styles.renderArrow}>
                <Icon
                  name={"chevron-" + direction}
                  size={Sizes.s35}
                  color="grey"
                />
              </View>
            )}
            hideExtraDays={true}
            disableMonthChange={true}
            firstDay={0}
            hideDayNames={false}
            showWeekNumbers={false}
            onPressArrowLeft={(substractMonth) => substractMonth()}
            onPressArrowRight={(addMonth) => addMonth()}
            theme={{
              textSectionTitleColor: "#335272",
              textDayHeaderFontWeight: "bold",
              textMonthFontWeight: "bold",
              monthTextColor: "#2674B7",
              textMonthFontSize: Sizes.s40,
              textDayFontSize: Sizes.h32,
              calendarBackground: "#FFF",
              todayTextColor: "#FF6600",
              dotColor: "#CCE5FF",
              todayBackgroundColor: "#CCE5FF",
            }}
            style={{
              shadowColor: "rgba(0, 0, 0, 0.5)",
              shadowRadius: 2,
              shadowOpacity: 0.25,
              shadowOffset: {
                width: 0,
                height: 4,
              },
              elevation: 4,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#335272",
                fontSize: Sizes.s35,
                fontWeight: "bold",
                margin: Sizes.s15,
              }}
            >
              {this.formatDateRender(this.state.selectedDate)}
            </Text>
            {(fetchingWifiInfoCheckInOutInDay ||
              fetchingWFHInfoCheckInOutInDay) &&
            !this.state.flag ? (
              <ActivityIndicator
                size="large"
                color="#0491ce"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            ) : !arrayIsEmpty(this.state.dataTimeCheckInOut) ||
              !arrayIsEmpty(this.state.dataWFHCheckInOut) ? (
              <FlatList
                data={
                  userProfile.typeWiFiOrWFH === 'WIFI'
                    ? this.state.dataTimeCheckInOut
                    : this.state.dataWFHCheckInOut
                }
                renderItem={({ item, index }) => {
                  return (
                    <View style={{ flexDirection: "row", padding: Sizes.s20 }}>
                      <View style={{ width: "16%", alignItems: "center" }}>
                        {item.checkType === "i" ? (
                          <Image
                            source={getImage("ic_check_success_i")}
                            style={{ height: Sizes.s60, width: Sizes.s60 }}
                          />
                        ) : (
                          <Image
                            source={getImage("ic_check_success_o")}
                            style={{ height: Sizes.s60, width: Sizes.s60 }}
                          />
                        )}
                      </View>
                      <View>
                        <Text style={{ fontSize: Sizes.s30 }}>{item.time}</Text>
                        <Text style={{ fontSize: Sizes.s30, color: "#818487" }}>
                          {item.wifiLocation}
                        </Text>
                      </View>
                    </View>
                  );
                }}
                key={(item) => item.key}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={getImage("img_empty_data_2")}
                  style={{ height: Sizes.s340, width: Sizes.s340 }}
                />
                <Text
                  style={{
                    fontSize: Sizes.s40,
                    fontWeight: "bold",
                    color: colorPersonal.error,
                  }}
                >
                  {!arrayIsEmpty(dataWifiInfoCheckInOutInDay) ||
                  !arrayIsEmpty(dataWFHInfoCheckInOutInDay)
                    ? `${
                        userProfile.LangID === "VN"
                          ? appStrS.vn.calendars.error_data
                          : appStrS.en.calendars.error_data
                      }`
                    : userProfile.typeWiFiOrWFH === 'WIFI'
                    ? errorWifiInfoCheckInOutInDay
                    : errorWFHInfoCheckInOutInDay}
                </Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  renderArrow: {
    padding: Sizes.s10,
    width: Sizes.s70,
    borderWidth: Sizes.s2,
    borderRadius: Sizes.s10,
    borderColor: colorCalendar.renderArrow,
    alignItems: "center",
  },
});

export default Calendars;

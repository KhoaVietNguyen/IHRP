import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  arrayIsEmpty,
  objectIsNull,
  stringIsEmpty,
} from "@dungdang/react-native-basic/src/Functions";
import { Sizes } from "@dungdang/react-native-basic";
import CustomHeader from "../custom/CustomHeader";
import Loading from "../custom/Loading";
import getImage from "../../res/values/strings/iconStrS";
import {
  colorPersonal,
  colorNotification,
} from "../../res/values/strings/colorStr";
import { userProfile } from "../../config/settings";
import { appStrS } from "../../res/values/strings/appStrS";
class Items extends Component {
  onSelectImage = () => {
    switch (this.props.item.workflowID) {
      case 1:
        return (
          <Image
            source={getImage("ic_noti_1")}
            style={{ height: Sizes.s90, width: Sizes.s90 }}
          />
        );
      case 3:
        return (
          <Image
            source={getImage("ic_noti_2")}
            style={{ height: Sizes.s90, width: Sizes.s90 }}
          />
        );
      case 11:
        return (
          <Image
            source={getImage("ic_noti_3")}
            style={{ height: Sizes.s90, width: Sizes.s90 }}
          />
        );
      case 75:
        return (
          <Image
            source={getImage("ic_noti_4")}
            style={{ height: Sizes.s90, width: Sizes.s90 }}
          />
        );
      case 28:
        return (
          <Image
            source={getImage("ic_noti_5")}
            style={{ height: Sizes.s90, width: Sizes.s90 }}
          />
        );
      default:
        null;
    }
  };
  onPressItem(item) {
    if (!objectIsNull(item)) {
      this.props.notificationMarkAction([{ ID: item.id }]);
      // console.log('item - Notification: ', item)
      if (!stringIsEmpty(item.actionType)) {
        let value = item.actionType.split("|");
        if (!arrayIsEmpty(value)) {
          // Nếu screen = 1 thì sẽ chuyển đến màn hình thông báo
          switch (value[0]) {
            case "p1":
              if (userProfile.typeLeaveApplication === "1") {
                this.props.navigation.navigate("DayLeaveApplicationContainer", {
                  idLeaveApplication: value[1],
                  screen: 1,
                });
              } else if (userProfile.typeLeaveApplication === "2") {
                this.props.navigation.navigate("LeaveApplicationContainer", {
                  idLeaveApplication: value[1],
                  screen: 1,
                });
              }

              break;
            case "p2":
              this.props.navigation.navigate("ApplicationApprovalContainer", {
                idApplication: value[1],
                typeApplication: 1,
                screen: 1,
              });
              break;
            case "p3":
              //Chú ý
              this.props.navigation.navigate("DayLeaveApplicationContainer", {
                idLeaveApplication: value[1],
                typeApplication: 1,
                screen: 1,
              });
              break;
            case "p4":
              //Chú ý
              this.props.navigation.navigate("ApplicationApprovalContainer", {
                idApplication: value[1],
                typeApplication: 1,
                screen: 1,
              });
              break;
            case "p11":
              // LogTMSApplicationContainer
              this.props.navigation.navigate("LogTMSApplicationContainer", {
                item: {
                  empID: value[1],
                  dateID: "",
                  screen: 1,
                },
              });
              break;
            case "p12":
              this.props.navigation.navigate("ApplicationApprovalContainer", {
                idApplication: value[1],
                typeApplication: 4,
                screen: 1,
              });
              break;
            case "p21":
              this.props.navigation.navigate("OverTimeApplicationContainer", {
                itemOverTimeApplication: { recordID: value[1] },
                screen: 1,
              });
              break;
            case "p22":
              this.props.navigation.navigate("ApplicationApprovalContainer", {
                idApplication: value[1],
                typeApplication: 3,
                screen: 1,
              });
              break;
            case "p31":
              this.props.navigation.navigate(
                "BusinessTripApplicationContainer",
                { idBusinessTripApplication: value[1], screen: 1 }
              );
              break;
            case "p32":
              this.props.navigation.navigate("ApplicationApprovalContainer", {
                idApplication: value[1],
                typeApplication: 2,
                screen: 1,
              });
              break;

            default:
              break;
          }
        }
      } else {
        this.props.navigation.navigate("NotificationDetailContainer", {
          itemNotification: item,
          screen: 1,
        });
      }
    }
  }
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.onPressItem(this.props.item);
        }}
        style={{ flex: 1, flexDirection: "row", padding: Sizes.s20 }}
      >
        <View style={{ width: "16%", alignItems: "center" }}>
          {this.onSelectImage()}
        </View>
        <View
          style={{
            width: "84%",
            paddingHorizontal: Sizes.s20,
            opacity: this.props.item.viewed ? 0.4 : 1,
          }}
        >
          <Text style={{ fontSize: Sizes.h32 }}>{this.props.item.messVN}</Text>
          <Text style={{ color: colorNotification.ago }}>
            {this.props.item.ago}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      reload: false,
      flag: false,
    };
  }
  onRefresh() {
    this.setState({
      flag: true,
    });
    this.props.notificationAction({});
  }
  onReload() {
    this.setState({
      flag: false,
      refreshing: true,
    });
    this.props.notificationAction({});
  }
  render() {
    const { dataItem, error } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: colorNotification.container }}>
          <CustomHeader
            title={
              userProfile.LangID === "VN"
                ? appStrS.vn.notification.title
                : appStrS.en.notification.title
            }
          />
          {this.props.loading && !this.state.flag && <Loading />}
          {!arrayIsEmpty(dataItem) ? (
            <FlatList
              data={dataItem}
              renderItem={({ item, index }) => {
                return (
                  <Items
                    item={item}
                    index={index}
                    parentFlatList={this}
                    {...this.props}
                  />
                );
              }}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh.bind(this)}
                />
              }
              keyExtractor={(item) => item.id}
            />
          ) : (
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.reload}
                    onRefresh={this.onReload.bind(this)}
                  />
                }
              >
                <View style={styles.styleError}>
                  <Image
                    source={getImage("img_empty_data_2")}
                    style={{
                      resizeMode: "contain",
                      height: Sizes.s340,
                      width: Sizes.s340,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: Sizes.s40,
                      fontWeight: "bold",
                      color: colorPersonal.error,
                    }}
                  >
                    {error}
                  </Text>
                </View>
              </ScrollView>
            )}
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  styleSuccess: {
    padding: Sizes.s20,
    paddingHorizontal: Sizes.s30,
    flexDirection: "row",
    flex: 1,
  },
  styleError: {
    flex: 1,
    marginTop: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Notification;

import React, { Component } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableHighlightBase, Text, ClippingRectangle,
  RefreshControl,
  Alert,
} from "react-native";
import PersonalHeader from "./PersonalList/PersonalHeader";
import PersonalController from "./PersonalList/PersonalController";
import UserProfile from "./PersonalList/UserProfile";
import Loading from "../custom/Loading";
import {
  objectIsNull,
  arrayIsEmpty,
} from "@dungdang/react-native-basic/src/Functions";
import getImage from "../../res/values/strings/iconStrS";
import { Sizes } from "@dungdang/react-native-basic";
import CustomHeader from "../../components/custom/CustomHeader"
import { userProfile } from '../../config/settings'

export default class PersonalList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.dataGetUser2.info5.dataItem !== null ? this.props.dataGetUser2.info5.dataItem : [],
      refreshing: false,
    };
    // this.props.getUser2Action()
  }
  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.props.Get_PersonalProfile({});
      }
    );
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
  getHeaderList() {
    let tempList = [];
    for (var item of this.state.data) {
      if (item.parentID === null) {
        var object = { id: item.id, functionName: item.functionName };
        tempList.push(object);
      }
    }
    return tempList
  }

  getItemList(headerListID) {
    let tempList = [];
    // console.log("Data", this.state.data)
    for (var item of this.state.data) {
      if (item.parentID === headerListID) {
        tempList.push(item);
      }
    }
    return tempList;
  }

  componentDidUpdate(prePros) {
    if (this.props.dataGetUser2 !== prePros.dataGetUser2 && !objectIsNull(this.props.dataGetUser2)) {
      this.setState({
        data: this.props.dataGetUser2.info5.dataItem
      })
    }
  }

  componentWillMount() {

  }
  onRefresh() {
    this.props.Get_PersonalList({})
    this.props.Get_PersonalProfile({})
    this.props.getUser2Action({})
  }
  render() {
    return (
      <ScrollView style={styles.MainContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }
      >
        <CustomHeader
          typeIconRight={'logOut'}
          onPressRight={() => {
            this.logOutAlert()
            // this.props.navigation.navigate("ApplicationHistoryContainer")
          }}></CustomHeader>
        <UserProfile navigation={this.props.navigation} data={this.props.data_profile}></UserProfile>
        {<FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.getHeaderList()}
          renderItem={({ item }) => {
            return (
              <>
                <PersonalHeader text={item.functionName}></PersonalHeader>
                <FlatList
                  style={{ backgroundColor: "white" }}
                  data={this.getItemList(item.id)}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <View style={{ flexDirection: "column" }}>
                      <PersonalController
                        item={item}
                        index={index}
                        parentFlatList={this}
                      ></PersonalController>
                    </View>
                  )}
                  numColumns={3}
                />
              </>
            );
          }}
        ></FlatList>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: "#FFF"
  },
});

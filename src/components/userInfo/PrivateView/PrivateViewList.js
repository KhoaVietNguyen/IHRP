import React, { Component } from "react";
import {
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
// import PropertyCard from './PropertyCard'
// import Data from './PropertyViewData'
import PrivateViewCard from "./PrivateViewCard";
import getImage from "../../../res/values/strings/iconStrS";
import { Sizes } from "@dungdang/react-native-basic";
import {
  arrayIsEmpty,
  objectIsNull,
} from "@dungdang/react-native-basic/src/Functions";
import { userProfile } from "../../../config/settings";
export default class PrivateViewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataIsEmpty: false,
    };
    this.checkForm();
  }

  checkIsEmptyData() {
    if (this.props.AllowEdit == true) {
      if (!objectIsNull(this.props.dataFormList)) {
        if (this.props.dataFormList.length == 0) {
          this.setState({ dataIsEmpty: true });
        }
      }
    } else {
      if (!objectIsNull(this.props.data)) {
        if (this.props.data.length == 0) {
          this.setState({ dataIsEmpty: true });
        }
      }
    }
  }

  componentDidUpdate(prePros) {
    if (
      (this.props.data !== prePros.data && this.props.data !== null) ||
      (this.props.dataFormList !== prePros.dataFormList &&
        this.props.dataFormList !== null)
    ) {
      this.checkIsEmptyData();
    }

    if (this.props.commit !== prePros.commit && this.props.commit !== null) {
      if (this.props.commit == false) {
        this.ErrorAlert(this.props.message_FormList);
      }
    }
  }

  checkForm() {
    // console.log(this.props.AllowEdit);
    this.props.AllowEdit == true
      ? this.props.Get_PersonalFormListAction(this.props.IdFunction)
      : this.props.Get_PrivateView(this.props.IdFunction);
  }

  checkData = () => {
    if (this.props.AllowEdit == true) {
      return this.props.dataFormList;
    }
    return this.props.data;
  };
  ErrorAlert = (message) => {
    Alert.alert(
      userProfile.LangID === 'VN' ? "Thông báo " : 'Notice',
      `${message}`,
      [
        {
          text: userProfile.LangID === 'VN' ? "Đóng" : 'Cancel',
          onPress: () => {
            return false;
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  render() {
    return this.state.dataIsEmpty === true ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'white' }}>
        <Image
          style={{ width: Sizes.s340 * 1.5, height: Sizes.s340 * 1.5 }}
          source={getImage("img_empty_data")}
        ></Image>
        <Text style={{ fontSize: Sizes.h40 }}>{userProfile.LangID === 'VN' ? 'Không có thông tin' : 'Empty data'}</Text>
        <TouchableOpacity
          onPress={() => {
            this.checkForm();
          }}
        >
          <View
            style={{
              backgroundColor: "#03A9F4",
              padding: Sizes.h30,
              borderRadius: 10,
              margin: Sizes.h40,
            }}
          >
            <Image
              style={{ width: Sizes.s50, height: Sizes.s50 }}
              source={getImage("ic_undo")}
            ></Image>
          </View>
        </TouchableOpacity>
      </View>
    ) : (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <FlatList
            ref={"detailList"}
            data={this.checkData()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: "white",
                    marginBottom: 4,
                    marginTop: 6,
                  }}
                >
                  <PrivateViewCard
                    {...this.props}
                    AllowEdit={this.props.AllowEdit}
                    data={item}
                  ></PrivateViewCard>
                </View>
              );
            }}
          ></FlatList>
        </View>
      );
  }
}

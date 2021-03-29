import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { Sizes } from "@dungdang/react-native-basic";
import {
  arrayIsEmpty,
  stringIsEmpty,
  objectIsNull,
} from "@dungdang/react-native-basic/src/Functions";
import getImage from "../../res/values/strings/iconStrS";
import { colorForm } from "../../res/values/strings/colorStr";
import {
  fontSizes,
  fontColors,
  fontView,
} from "../../res/values/styles/appStyles";
import { userProfile } from "../../config/settings";
import { appStrS } from "../../res/values/strings/appStrS";

export default class CustomPickerApproval extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      dataSearch: [],
      visiblePopup: false,
      data: this.props.items,
      selectItem: !objectIsNull(this.props.selectedItem)
        ? this.props.selectedItem
        : undefined,
    };
  }
  componentDidMount(){
    this.onSelectedItem
  }
  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      if (this.props.items !== undefined) {
        this.setState({
          data: this.props.items,
        });
      }
    }
    if (this.props.item !== prevProps.item) {
      if (!objectIsNull(this.props.item) && !objectIsNull(prevProps.item)) {
        if (this.props.item.tag !== prevProps.item.tag) {
          this.setState({
            selectItem: undefined,
          });
        }
      }
    }

    if (this.props.selectedItem !== prevProps.selectedItem) {
      if (!objectIsNull(this.props.selectedItem)) {
        this.setState({
          selectItem: this.props.selectedItem,
        },() => {
          this.onSelectedItem
        });
      } else {
        this.setState({});
      }
    }
  }
  onChangeVisiblePopup(visible) {
    this.setState({
      visiblePopup: visible,
    });
  }
  onSelectedItem = (item) => {
    // console.log('item', item)
    const { onSelectedItemCombobox } = this.props;
    let mar = this.props.items;
    let markedDates = {};
    if (item === this.state.selectItem) {
      // console.log('item', item)
      // console.log('this.state.selectItem', this.state.selectItem)
      markedDates[item] = Object.assign( item, {isSelect: item.isSelect})
    }
    if (!objectIsNull(this.state.selectItem)) {
      if (!objectIsNull(this.props.items)) {
        for (let item of this.props.items) {
          if (item.label === this.state.selectItem.label) {
            // console.log('2')
            markedDates[this.state.selectItem] = Object.assign( item, {isSelect: !item.isSelect})
            break;
          }
        }
      }
    }
    let obj = Object.assign( mar, markedDates);
    this.setState({
      markedDates: obj,
    },() => {
      onSelectedItemCombobox(item);
      this.onChangeVisiblePopup(false);
    });
  };
  onSearch = (search) => {
    this.setState({ search }, () => {
      if ("" === search) {
        this.setState({
          data: this.props.items,
        });
      }
      this.state.data = this.props.items
        .filter(function (item) {
          return item.label.includes(search);
        })
        .map(function (item) {
          return item;
        });
    });
  };
  render() {
    const { visiblePopup, data, selectItem, search } = this.state;
    const { height } = Dimensions.get("window");
    const { error } = this.props;
    return (
      <View style={{ width: "100%", marginVertical: Sizes.s5 }}>
        <TouchableOpacity
          disabled={
            objectIsNull(this.props.item)
              ? false
              : this.props.item.editable === false
              ? true
              : false
          }
          onPress={() => {
            this.onChangeVisiblePopup(true);
            if (!objectIsNull(this.props.onPress)) {
              this.props.onPress();
            }
          }}
          style={[
            styles.styleBox,
            {
              paddingVertical: !objectIsNull(selectItem)
                ? fontView.paddingVertical
                : fontView.paddingVerticalTextInput,
              backgroundColor: colorForm.inputForm,
              borderWidth: fontSizes.border,
              borderColor: !stringIsEmpty(error)
                ? fontColors.borderError
                : fontColors.border,
            },
          ]}
        >
          {!objectIsNull(selectItem) ? (
            <Text
              style={{
                paddingVertical: Sizes.s10,
                fontSize: fontSizes.title,
              }}
            >
              {!objectIsNull(selectItem)
                ? selectItem.label + " (" + this.props.count + ")"
                : ""}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: fontSizes.title,
              }}
            >
              {!objectIsNull(this.props.item)
                ? !stringIsEmpty(
                    this.props.item.caption ||
                      !stringIsEmpty(this.props.tempCaption)
                  )
                  ? !stringIsEmpty(this.props.item.caption)
                    ? this.props.item.caption
                    : this.props.tempCaption + " (" + this.props.count + ")"
                  : ""
                : !stringIsEmpty(this.props.tempCaption)
                ? this.props.tempCaption + " (" + this.props.count + ")"
                : ""}
            </Text>
          )}
          <Image style={styles.image} source={getImage("ic_dropdown")} />
        </TouchableOpacity>
        <Modal
          transparent={true}
          onRequestClose={() => {
            this.onChangeVisiblePopup(false);
          }}
          hardwareAccelerated={true}
          visible={visiblePopup}
          animationType="fade"
        >
          <TouchableOpacity
            onPress={() => {
              this.onChangeVisiblePopup(false);
            }}
            style={{
              flex: 1,
              backgroundColor: "#00000066",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback style={{ width: "100%" }}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "height" : "padding"}
                style={{ width: "100%" }}
              >
                <View
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    borderTopRightRadius: Sizes.s40,
                    borderTopLeftRadius: Sizes.s40,
                    paddingBottom: Sizes.s100,
                    height: data.length > 8 ? (height / 3) * 2 : null,
                  }}
                >
                  <View style={styles.header}>
                    <View
                      style={{
                        paddingVertical: Sizes.s20,
                        borderBottomWidth: Sizes.s2,
                        borderBottomColor: "#DDD",
                        marginBottom: Sizes.s20,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: Sizes.h34,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        {userProfile.LangID === "VN"
                          ? appStrS.vn.approveApplication.chooseApplicationTypes
                          : appStrS.en.approveApplication
                              .chooseApplicationTypes}
                      </Text>
                    </View>
                    {/* <View style={styles.viewSearch}>
                      <Image
                        style={{
                          width: Sizes.s70,
                          height: Sizes.s70,
                          marginHorizontal: Sizes.s10,
                        }}
                        source={getImage("ic_search")}
                      />
                      <TextInput
                        value={search}
                        placeholder={
                          userProfile.LangID === "VN"
                            ? appStrS.vn.approveApplication.search
                            : appStrS.en.approveApplication.search
                        }
                        placeholderTextColor="#515253"
                        onChangeText={this.onSearch}
                        style={styles.search}
                      />
                    </View> */}
                  </View>
                  {!arrayIsEmpty(data) ? (
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      data={data}
                      keyExtractor={(item) => item.id}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              this.onSelectedItem(item);
                              this.setState({
                                selectItem:item
                              })
                            }}
                            style={styles.touch}
                          >
                            <Text
                              style={[
                                styles.text,
                                {
                                  color: selectItem.id === item.id? "#2674B7" : "black",
                                },
                              ]}
                            >
                              {item.label}
                            </Text>
                            <Text
                              style={{
                                fontSize: Sizes.h30,
                                color:  selectItem.id === item.id ? "#2674B7" : "black",
                              }}
                            >{`(${item.size})`}</Text>
                            <View
                              style={{
                                alignItems: "flex-end",
                                flex: 1,
                              }}
                            >
                              <Image
                                source={getImage(
                                  selectItem.id === item.id? "ic_check_success_i" : ""
                                )}
                                style={styles.image}
                              />
                            </View>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        fontSize: Sizes.h30,
                        textAlign: "center",
                        marginTop: Sizes.s20,
                      }}
                    >
                      {userProfile.LangID === "VN"
                        ? appStrS.vn.approveApplication.errorSearch
                        : appStrS.en.approveApplication.errorSearch}
                    </Text>
                  )}
                </View>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: Sizes.h30,
    paddingRight: Sizes.s20,
  },
  touch: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: Sizes.s20,
    paddingHorizontal: Sizes.s30,
    alignItems: "center",
  },
  image: {
    height: Sizes.s50,
    width: Sizes.s50,
  },
  styleBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: fontView.paddingHorizontal,
    alignItems: "center",
    borderRadius: fontView.border,
    alignSelf: "center",
  },
  header: {},
  viewSearch: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#DDD",
    marginHorizontal: Sizes.s30,
    borderRadius: Sizes.s10,
    alignItems: "center",
  },
  search: {
    width: "80%",
    fontSize: Sizes.h30,
    paddingVertical: Sizes.s20,
  },
});
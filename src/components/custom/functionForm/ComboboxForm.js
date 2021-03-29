import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
  FlatList,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Sizes, Colors } from "@dungdang/react-native-basic";
import Icon from "react-native-vector-icons/FontAwesome5";
import getImage from "../../../res/values/strings/iconStrS";
import {
  arrayIsEmpty,
  stringIsEmpty,
  objectIsNull,
} from "@dungdang/react-native-basic/src/Functions";
import ItemCombobox from "./ItemCombobox";
import { colorForm } from "../../../res/values/strings/colorStr";
import {
  fontSizes,
  fontColors,
  fontView,
} from "../../../res/values/styles/appStyles";
import { iconStr } from "../../../res/values/strings/iconStr";
import { userProfile } from "../../../config/settings";
export default class ComboboxForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePopup: false,
      data: this.props.items,
      selectItem: !objectIsNull(this.props.selectedItem)
        ? this.props.selectedItem
        : undefined,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      if (this.props.items !== undefined) {
        this.setState({
          data: this.props.items,
          // selectItem: undefined,
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
        // if (this.props.item.selectedItem !== prevProps.item.selectedItem) {
        //   if (!objectIsNull(this.props.item.selectedItem)) {
        //     this.setState({
        //       selectedItem: this.props.selectedItem,
        //     });
        //   } else {
        //     this.setState({
        //       selectedItem: undefined,
        //     });
        //   }
        // }
      }
    }

    if (this.props.selectedItem !== prevProps.selectedItem) {
      if (!objectIsNull(this.props.selectedItem)) {
        this.setState(
          {
            selectItem: this.props.selectedItem,
          },
          () => {
            // console.log('sssssssssssss: ', this.state.selectedItem)
          }
        );
      } else {
        this.setState({
          // selectedItem: undefined,
        });
      }
    }
  }
  onChangeVisiblePopup(visible) {
    this.setState({ visiblePopup: visible });
  }
  onSelectedItem = (item) => {
    const { onSelectedItemCombobox } = this.props;
    if (!objectIsNull(onSelectedItemCombobox)) {
      this.setState(
        {
          selectItem: item,
        },
        () => {
          onSelectedItemCombobox(item);
          this.onChangeVisiblePopup(false);
        }
      );
    }
  };

  filter = (itemList, text) => {
    var list = [];
    for (var item of itemList) {
      var label = item.label.toUpperCase().normalize();
      if (label.includes(text.toUpperCase().normalize())) {
        list.push(item);
      }
    }
    return list;
  };

  render() {
    const { visiblePopup, data, selectItem } = this.state;
    const { typeCombobox, error, iconCombobox } = this.props;
    // const { item } = this.props
    const { height } = Dimensions.get("window");

    // console.log('tempCaptionsss: ', this.props.item)
    return (
      <View style={styles.body}>
        {typeCombobox === "simple" ? (
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
            style={{ flexDirection: "row" }}
          >
            <Text
              style={{
                color: "white",
                fontSize: Sizes.h30
              }}
            >
              {!objectIsNull(selectItem) ? selectItem.label : ""}
            </Text>

            <Image style={styles.image} source={getImage("ic_dropdownwhite")} />
          </TouchableOpacity>
        ) : (
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
                    ? fontView.paddingVerticalTextInput
                    : fontView.paddingVerticalText,
                  backgroundColor: colorForm.inputForm,
                  borderWidth: fontSizes.border,
                  borderColor: !stringIsEmpty(error)
                    ? fontColors.borderError
                    : fontColors.border,
                },
              ]}
            >
              {!objectIsNull(selectItem) ? (
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: fontColors.title,
                        fontSize: fontSizes.titleSmall, 
                        marginBottom: Sizes.s5
                      }}
                    >
                      {!objectIsNull(this.props.item)
                        ? !stringIsEmpty(
                          this.props.item.caption ||
                          !stringIsEmpty(this.props.tempCaption)
                        )
                          ? !stringIsEmpty(this.props.item.caption)
                            ? this.props.item.caption
                            : this.props.tempCaption
                          : ""
                        : !stringIsEmpty(this.props.tempCaption)
                          ? this.props.tempCaption
                          : ""}
                    </Text>
                    {!objectIsNull(this.props.requireSubmit) &&
                      this.props.requireSubmit == 1 ? (
                        <Text style={{ color: fontColors.requireSubmit }}>*</Text>
                      ) : null}
                  </View>
                  <Text
                    style={{
                      color: fontColors.valueInput,
                      fontSize: fontSizes.title,
                    }}
                  >
                    {!objectIsNull(selectItem) ? selectItem.label : ""}
                  </Text>
                </View>
              ) : (
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        color: fontColors.title,
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
                            : this.props.tempCaption
                          : ""
                        : !stringIsEmpty(this.props.tempCaption)
                          ? this.props.tempCaption
                          : ""}
                    </Text>
                    {!objectIsNull(this.props.requireSubmit) &&
                      this.props.requireSubmit == 1 ? (
                        <Text style={{ color: fontColors.requireSubmit }}>*</Text>
                      ) : null}
                  </View>
                )}

              <Image style={styles.image} source={getImage(iconCombobox === 'calendar' ? 'ic_calendar' : "ic_dropdown")} />
            </TouchableOpacity>
          )}
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
              // paddingHorizontal: Sizes.h30,
              // paddingVertical: Sizes.h100,
              // paddingTop: Sizes.s20,
            }}
          >
            <TouchableWithoutFeedback style={{ width: "100%" }}>
              <KeyboardAvoidingView
                behavior={Platform.OS === "android" ? "height" : "padding"}
                style={{ width: "100%" }}
              >
                <View
                  style={{
                    borderTopLeftRadius: Sizes.s40,
                    borderTopRightRadius: Sizes.s40,
                    paddingVertical: Sizes.s40,
                    width: "100%",
                    backgroundColor: "white",
                    height:
                      !objectIsNull(this.props.item) &&
                        this.props.item.tag === "comboboxForm"
                        ? this.props.items.length > 20
                          ? (height / 3) * 2
                          : null
                        : data.length > 8
                          ? (height / 3) * 2
                          : null,
                  }}
                >
                  {!objectIsNull(this.props.item)
                    ? this.props.items.length > 20 &&
                    this.props.item.tag === "comboboxForm" && (
                      <View
                        style={{
                          width: "100%",
                          // height: height / 10,
                          height: Sizes.h80,
                          // backgroundColor: "green",
                        }}
                      >

                        {/* <Icon name='search' color='#335272' size={Sizes.h40} /> */}

                        <View
                          style={{
                            flex: 1,
                            marginHorizontal: Sizes.h20,
                            flexDirection: "row",
                            borderRadius: Sizes.h10,
                            paddingHorizontal: Sizes.h30,
                            // backgroundColor: "white",
                            backgroundColor: '#F2F2F2',
                            // borderColor: 'silver',
                            // borderWidth: 1,

                            alignItems: "center",
                          }}
                        >
                          <TextInput
                            value={this.state.inputSearch}
                            onChangeText={(text) => {
                              // this.onChangeText(text);
                              // console.log("Object Data", this.props.item.tag)
                              this.setState(
                                {
                                  data: this.props.items,
                                },
                                () => {
                                  this.setState({
                                    data: this.filter(
                                      this.props.items,
                                      text
                                    ),
                                  });
                                }
                              );
                            }}
                            placeholderTextColor="silver"
                            placeholder={userProfile.LangID === 'VN' ? "Tìm kiếm" : 'Search'}
                            style={{
                              flex: 1,
                              height: Sizes.h80,
                              color: fontColors.blackDefault,
                            }}
                          />
                          <Image
                            style={styles.image}
                            source={iconStr.ic_search}
                          />
                        </View>
                      </View>
                    )
                    : null}
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={data}
                    // extraData={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => {
                      return (
                        <ItemCombobox
                          value={item}
                          onSelectedItem={this.onSelectedItem}
                          {...this.props}
                        />
                      );
                    }}
                  />
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
  body: {
    width: "100%",
    marginVertical: Sizes.s5,
    // marginHorizontal: Sizes.h20,
    // textAlign: 'center'
  },
  styleBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: fontView.paddingHorizontal,
    // paddingVertical: fontView.paddingVertical,
    alignItems: "center",
    borderRadius: fontView.border,
    // marginHorizontal: Sizes.h20
    alignSelf: "center",
  },
  image: {
    width: Sizes.s45,
    height: Sizes.s45,
  },
});

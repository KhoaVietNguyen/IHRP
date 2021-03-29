import * as React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Sizes } from "@dungdang/react-native-basic";
import {
  arrayIsEmpty,
  stringIsEmpty,
  objectIsNull,
} from "@dungdang/react-native-basic/src/Functions";
import { colorForm } from "../../../res/values/strings/colorStr";
// import CustomSearchPickerContainer from '../../../containers/custom/CustomSearchPickerContainer'
import CustomSwitchButton from "../CustomSwitchButton";

import { TextInputForm } from "../functionForm/TextInputForm";
import ComboboxForm from "../functionForm/ComboboxForm";
import CustomDatePicker from "../CustomDatePicker";
import CustomTwoDatePicker from "../CustomTwoDatePicker";
import CustomTwoTimePicker from "../CustomTwoTimePicker";
import { CustomButton } from "../CustomButton";
import CustomTwoButton from "../CustomTwoButton";
import { CustomText } from "../CustomText";
import CustomSearchPickerContainer from "../../../containers/custom/CustomSearchPickerContainer";
import CustomTwoCheckBox from "../CustomTwoCheckBox";
import CustomTwoText from "../CustomTwoText";
import CustomTimePicker from "../CustomTimePicker";
import CustomAttachFile from "../CustomAttachFile";
import RNFS from "react-native-fs";
import TwoComboboxForm from "../TwoComboboxForm";
import MultiComboboxForm from "../functionForm/MultiComboboxForm";
import { TextInputFormPersonal } from "../functionForm/TextInputFormPersonal";
import { CustomTextHorizontal } from '../CustomTextHorizontal'
import {
  fontSizes,
  fontColors,
  fontView,
} from "../../../res/values/styles/appStyles";
import { CustomTextInputHorizontal } from '../CustomTextInputHorizontal'
export default class FormDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkEmpty() {
    const { form } = this.props;
    let isEmpty = false;
    for (let item of form) {
      if (!objectIsNull(this.refs[`item${item.id}`])) {
        if (this.refs[`item${item.id}`].checkEmpty()) {
          isEmpty = true;
        }
      }
    }
    return isEmpty;
  }
  checkEmptyRequire(requireArray) {
    const { form } = this.props;
    let isEmpty = false;
    for (let item of form) {
      if (!objectIsNull(this.refs[`item${item.id}`])) {
        if (this.refs[`item${item.id}`].checkEmptyRequire(requireArray)) {
          isEmpty = true;
        }
      }
    }
    return isEmpty;
  }

  renderForm = () => {
    const { form } = this.props;
    const list = [];
    for (let item of form) {
      list.push(<Item item={item} {...this.props} ref={`item${item.id}`} />);
    }
    return <View style={{ flex: 1 }}>{list}</View>;
  };

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          flexGrow: 1,
        }}
      >
        {this.renderForm()}
      </ScrollView>
    );
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      error: "",
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.onResetError();
    }
  }
  checkEmptyRequire(requireArray) {
    // requireArray = {
    //     control: '',
    //     tag: '',
    //     type: '',
    // }
    // Type có 4 loại:
    // + singleControl: Kiểm tra value của item có control = control của requireArray
    // + singleTag: Kiểm tra value của item có tag = tag của requireArray
    // + doubleControl: Kiểm tra value1, value2 của item có control = controlRequireArray
    // + doubleTag: Kiểm tra value1, value2 của item có tag1 hoặc tag2 = tag của requireArray
    const { item } = this.props;
    if (!arrayIsEmpty(requireArray)) {
      for (let value of requireArray) {
        if (value.type === "singleControl") {
          if (item.control === value.control) {
            if (stringIsEmpty(item.value)) {
              this.setState({
                error: "*Trường này không được để trống",
              });
              return true;
            }
          }
        } else if (value.type === "singleTag") {
          if (item.tag === value.tag) {
            if (stringIsEmpty(item.value)) {
              this.setState({
                error: "*Trường này không được để trống",
              });
              return true;
            }
          }
        } else if (value.type === "doubleControl") {
          if (item.control === value.control) {
            if (stringIsEmpty(item.value1) || stringIsEmpty(item.value2)) {
              this.setState({
                error: "*Trường này không được để trống",
              });
              return true;
            }
          }
        } else if (value.type === "doubleTag") {
          if (item.tag1 === value.tag || item.tag2 === value.tag) {
            if (stringIsEmpty(item.value1) || stringIsEmpty(item.value2)) {
              this.setState({
                error: "*Trường này không được để trống",
              });
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  checkEmpty() {
    const { item } = this.props;
    if (item.requireSubmit === "1") {
      if (item.control === "twoDatePicker") {
        if (stringIsEmpty(item.value1) || stringIsEmpty(item.value2)) {
          this.setState({
            error: "*Trường này không được để trống !",
          });
          return true;
        }
      } else if (item.control === "twoTimePicker") {
        if (stringIsEmpty(item.value1) || stringIsEmpty(item.value2)) {
          this.setState({
            error: "*Trường này không được để trống !",
          });
          return true;
        }
      } else if (item.tag === "TotalLeaveDays") {
        if (item.value === "0.0" || item.value === 0.0) {
          this.setState({
            error: "*Số ngày nghỉ không hợp lệ !",
          });
          return true;
        }
      } else if (item.control === "twoTextForm") {
        if (stringIsEmpty(item.value1) || stringIsEmpty(item.value2)) {
          this.setState({
            error: "*Trường này không được để trống !",
          });
          return true;
        }
      } else if (stringIsEmpty(item.value)) {
        this.setState({
          error: "*Trường này không được để trống !",
        });
        return true;
      }
    } else {
    }
    return false;
  }
  onResetError = () => {
    this.setState({
      error: "",
    });
  };
  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  render() {
    const { onPressButton, item } = this.props;
    const { error } = this.state;
    let itemView = null;
    switch (item.control) {
      case "combobox":
        itemView = (
          // <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.control}</Text>
          <ComboboxForm
            item={item}
            error={error}
            requireSubmit={objectIsNull(item.requireSubmit) ? null : item.requireSubmit}
            items={arrayIsEmpty(item.items) ? [] : item.items}
            selectedItem={item.selectedItem}
            onSelectedItemCombobox={(value) => {
              item.value = value.id;
              item.data = value.id;
              item.display = value.label;
              this.onResetError();
              if (!objectIsNull(item.onPressSelectedItem)) {
                item.onPressSelectedItem();
              }
              if (!objectIsNull(item.onCheckParent)) {
                item.onCheckParent();
              }
              if (!objectIsNull(item.onSelected)) {
                item.onSelected()
              }
            }}
            onPress={() => {
              item.onPress();
            }}
          />
        );
        break;

      case "multiCombobox":
        itemView = (
          // <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.control}</Text>
          <MultiComboboxForm
            item={item}
            items={arrayIsEmpty(item.items) ? [] : item.items}
            onSelectedItemCombobox={(value) => {
              // console.log(value)
              if (!arrayIsEmpty(value)) {
                let str = "";
                for (let val of value) {
                  str += val.id + "|";
                }
                item.value = str;
              }
            }}
            onPress={() => {
              item.onPress();
            }}
          />
        );
        break;
      case "twoComboboxForm":
        itemView = (
          <TwoComboboxForm
            item={item}
            onPressCombobox1={(value) => {
              item.value1 = value.id;
              this.onResetError();
            }}
            onPressCombobox2={(value) => {
              item.value2 = value.id;
              this.onResetError();
            }}
          />
        );
        break;
      case "switch":
        itemView = (
          <View style={styles.itemSwitchStyle}>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: fontSizes.title,
                  color: fontColors.title,
                }}
              >
                {item.caption}
              </Text>
              {!objectIsNull(item.requireSubmit) && item.requireSubmit == 1 ? <Text>*</Text> : null}
            </View>

            <CustomSwitchButton
              isOn={item.value === 0 ? false : true}
              onColor={"blue"}
              offColor={"grey"}
              size={"small"}
              onClick={(isOn) => {
                if (isOn === false) {
                  item.value = 0;
                } else {
                  item.value = 1;
                }
              }}
            ></CustomSwitchButton>
          </View>
        );
        break;
      case "textedit":
        itemView = (
          // <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.control}</Text>
          <TextInputForm
            error={error}
            item={item}
            value={item.value}
            onChangeTextInput={(text) => {
              item.value = text;
              this.onResetError();
            }}
          />
        );
        break;
      case "datepicker":
        itemView = (
          // <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.control}</Text>
          <CustomDatePicker
            item={item}
            value={item.value}
            onPressDate={(date) => {
              item.value = date;
              if (!objectIsNull(item.onPress)) {
                item.onPress(date);
              }
              if (!objectIsNull(item.onPress1)) {
                item.onPress1();
              }
            }}
          />
        );
        break;
      case "twoDatePicker":
        itemView = (
          // <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.control}</Text>
          // <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.control}</Text>
          <CustomTwoDatePicker
            item={item}
            error={error}
            valueFrom={item.value1}
            valueTo={item.value2}
            onPressFromDate={(value) => {
              item.value1 = value;
              this.onResetError();
              if (!objectIsNull(item.onPress1)) {
                item.onPress1("date");
              }
            }}
            onPressToDate={(value) => {
              item.value2 = value;
              this.onResetError();
              if (!objectIsNull(item.onPress2)) {
                item.onPress2("date");
              }
            }}
          />
        );
        break;

      case "twoTimePicker":
        itemView = (
          <>
            {item.visible === false ? (
              <CustomTwoTimePicker
                item={item}
                error={error}
                valueFrom={item.value1}
                valueTo={item.value2}
                onPressFromTime={(value) => {
                  item.value1 = value;
                  this.onResetError();
                  if (!objectIsNull(item.onPress1)) {
                    item.onPress1("time");
                  }
                }}
                onPressToTime={(value) => {
                  item.value2 = value;
                  this.onResetError();
                  if (!objectIsNull(item.onPress2)) {
                    item.onPress2("time");
                  }
                }}
              />
            ) : null}
          </>
        );
        break;
      case "buttonForm":
        itemView = (
          <>
            {!item.visible && (
              <CustomButton
                onPress={item.onPress}
                title={item.title}
                type={item.type}
              />
            )}
          </>
        );
        break;

      case "twoButtonForm":
        itemView = <CustomTwoButton item={item} />;
        break;
      case "textForm":
        itemView = (
          <CustomText
            error={error}
            item={item}
            value={item.value}
            onResetError={() => {
              this.onResetError();
            }}
          />
        );
        break;
      case "comboboxSearchForm":
        itemView = (
          <CustomSearchPickerContainer
            items={item.items !== undefined ? item.items : []}
            control={item.control}
            item={item}
            value={item.value}
            textData={item.data}
            error={this.state.error}
            onPressSelected={(data) => {
              this.onResetError();
              item.value = data;
              if (!objectIsNull(data)) {
                item.data = data.label;
                item.ids = data.id;
              } else {
                item.data = "";
                item.ids = "";
              }
            }}
          />
        );
        break;
      case "comboboxMultiSearchForm":
        itemView = (
          <CustomSearchPickerContainer
            items={item.items !== undefined ? item.items : []}
            control={item.control}
            item={item}
            value={item.value}
            textData={item.data}
            onPressSelected={(data) => {
              this.onResetError();
              item.value = data;
              if (!arrayIsEmpty(data)) {
                let str = "";
                let strID = "";
                for (let val of data) {
                  str += val.label + "; ";
                  strID += val.id + "|";
                }
                item.data = str;
                item.ids = strID;
              } else {
                item.data = "";
                item.ids = "";
              }
            }}
          />
        );
        break;
      case "twoCheckBox":
        itemView = (
          <>
            {item.visible === false ? (
              <CustomTwoCheckBox
                item={item}
                value1={item.value1}
                value2={item.value2}
                onPressValueFrom={(value) => {
                  if (item.type === "multi") {
                    item.value1 = value;
                  } else if (item.type === "single") {
                    item.value1 = "1";
                    item.value2 = "0";
                  } else if (item.type === 'singleNoRequire') {
                    item.value1 = value
                    item.value2 = (value !== '1' ? item.value2 : '0')
                  } else if (item.type === 'multiNoRequire') {

                  }
                  if (!objectIsNull(item.onPressValue1)) {
                    item.onPressValue1()
                  }
                  this.onResetError();
                }}
                onPressValueTo={(value) => {
                  if (item.type === "multi") {
                    item.value2 = value;
                  } else if (item.type === "single") {
                    item.value1 = "0";
                    item.value2 = "1";
                  } else if (item.type === 'singleNoRequire') {
                    item.value2 = value
                    item.value1 = (value !== '1' ? item.value1 : '0')
                  } else if (item.type === 'multiNoRequire') {

                  }
                  if (!objectIsNull(item.onPressValue2)) {
                    item.onPressValue2()
                  }
                  this.onResetError();
                }}
              />
            ) : null}
          </>
        );
        break;
      case "twoTextForm":
        itemView = (
          <CustomTwoText
            error={error}
            item={item}
            onResetError={() => {
              this.onResetError();
            }}
          />
        );
        break;
      //
      case "attachFile":
        itemView = (
          <CustomAttachFile
            item={item}
            value={item.value}
            onPress={async (value) => {
              console.log('333333333333333: ', value)
              if (!objectIsNull(value)) {
                // console.log('logAttachFileURI: ', res.uri)
                // console.log('logAttachFileTYPE: ', res.type)
                // console.log('logAttachFileNAME: ', res.name)
                // console.log('logAttachFileSIZE: ', res.size)

                // let image = await RNFS.readFile(value.uri, "base64");
                // let index = value.name.indexOf(".");
                // if (index > -1) {
                //   let split = value.name.split(".");
                //   let nameUUID = this.uuidv4();
                //   let name = nameUUID;
                //   for (let i = 0; i < 4; i++) {
                //     name = name.replace("-", "");
                //   }
                //   let fileName = `${name}.${split[split.length - 1]}`;
                //   console.log("fileNameeeee: ", name);
                //   console.log("formatName: ", fileName);
                //   item.value = fileName;
                //   item.fileBase64 = image;
                //   item.filePath = value.uri;
                // }
                // if(value.size / 1048576 > 4 ){
                //   Alert.alert('Thông báo', 'Kích thước file không được vượt quá 4MB', [{text: 'Đóng'}])
                // }else{

                // }

                item.value = value.name;
                item.fileBase64 = value.file;
                item.filePath = value.uri;
              }
            }}
            {...this.props}
            onPressDeleteValue={() => {
              item.value = "";
              item.fileBase64 = "";
              item.filePath = "";
            }}
          />
        );
        break;
      case "timePickerForm":
        itemView = (
          <CustomTimePicker
            error={error}
            valueFrom={item.value}
            item={item}
            onPressTime={(time) => {
              item.value = time;
            }}
          />
        );
        break;
      case "label":
        itemView = (
          <View style={{ width: "100%", flexDirection: "row" }}>
            <Text style={styles.itemTitle}>{item.caption}</Text>
            <View
              style={{
                height: Sizes.s2,
                width: "100%",
                alignSelf: "flex-end",
                backgroundColor: "#919592",
                marginBottom: Sizes.s30,
                marginLeft: Sizes.s10,
              }}
            />
          </View>
        );
        break;
      case "label":
        itemView = (
          <View style={{ width: "100%", flexDirection: "row" }}>
            <Text style={styles.itemTitle}>{item.caption}</Text>
            <View
              style={{
                height: Sizes.s2,
                width: "100%",
                alignSelf: "flex-end",
                backgroundColor: "#919592",
                marginBottom: Sizes.s30,
                marginLeft: Sizes.s10,
              }}
            />
          </View>
        );
        break;
      case "textFormPersonal":
        itemView = (
          <TextInputFormPersonal
            error={error}
            item={item}
            value={item.value}
            onResetError={() => {
              this.onResetError();
            }}
          />
        );
        break;
      case "textHorizontalForm":
        itemView = (
          <CustomTextHorizontal item={item} />
        );
        break;
      case "textInputHorizontalForm":
        itemView = (
          <CustomTextInputHorizontal
            item={item}
            text={item.value}
            onChangeTextInput={(text) => {
              item.value = text;
              this.onResetError();
            }}
          />
        )

        // <TextInputForm
        //     error={error}
        //     item={item}
        //     value={item.value}
        //     onChangeTextInput={(text) => {
        //       item.value = text;
        //       this.onResetError();
        //     }}
        //   />


        break;
      default:
        itemView = (
          <Text
            style={{
              fontWeight: "bold",
              fontSize: Sizes.s40,
              margin: Sizes.h10,
              color: "blue",
            }}
          >
            {" "}
            {item.control}{" "}
          </Text>
        );
        break;
    }
    return (
      <View style={styles.itemView}>
        {/* {!stringIsEmpty(item.caption) &&
          item.visible !== false &&
          (item.control === 'label' ? null : (
            <Text style={styles.itemTitle}>{`${item.caption} `}</Text>
          ))} */}
        {itemView}
        {!stringIsEmpty(this.state.error) && (
          <Text style={styles.itemError}>{this.state.error}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemView: {
    marginVertical: Sizes.h10,
  },
  itemTitle: {
    color: colorForm.labelForm,
    fontSize: Sizes.h30,
    marginBottom: Sizes.h10,
    fontWeight: "600",
  },
  itemRequire: {
    color: "red",
    fontSize: Sizes.s30,
  },
  itemError: {
    color: "red",
    fontSize: Sizes.s25,
    fontStyle: "italic",
  },
  itemSwitchStyle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: fontView.paddingHorizontal,
    paddingVertical: Sizes.s30,
    alignItems: "flex-start",
    // marginHorizontal: Sizes.h20
    alignSelf: "flex-start",
    backgroundColor: colorForm.inputForm,
    borderWidth: fontSizes.border,
    borderColor: fontColors.border,

  },
});

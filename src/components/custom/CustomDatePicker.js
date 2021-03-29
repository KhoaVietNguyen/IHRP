import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import PopupDatePicker from "./popup/PopupDatePicker";
import { iconStr } from "../../res/values/strings/iconStr";
import { Sizes } from "@dungdang/react-native-basic";
import {
  objectIsNull,
  stringIsEmpty,
} from "@dungdang/react-native-basic/src/Functions";
import { colorForm } from "../../res/values/strings/colorStr";
import {
  fontSizes,
  fontColors,
  fontView,
} from "../../res/values/styles/appStyles";
export default class CustomDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.value,
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        date: this.props.value,
      });
    }
  }
  onDateChange = (value) => {
    this.setState({
      date: value,
    });
    this.props.onPressDate(value);
  };
  render() {
    const { item } = this.props;
    return (
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          disabled={
            objectIsNull(item) ? false : item.editable === false ? true : false
          }
          onPress={() => {
            if (!objectIsNull(this.refs["datePicker"].onChangeVisiblePopup)) {
              this.refs["datePicker"].onChangeVisiblePopup(true);
            }
          }}
          style={[styles.touch]}
        >
          {!stringIsEmpty(this.state.date) ? (
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[styles.title, { fontSize: fontSizes.titleSmall,marginBottom:Sizes.s15}]}
                >
                  {item.caption}
                </Text>
                {!objectIsNull(item.requireSubmit) &&
                item.requireSubmit == 1 ? (
                  <Text style={{color:fontColors.requireSubmit}}>*</Text>
                ) : null}
              </View>

              <Text style={styles.date}>{this.state.date}</Text>
            </View>
          ) : (
              <View style={{flexDirection:"row",paddingVertical:Sizes.s30}}>
                <Text style={styles.title}>{item.caption}</Text>
                {!objectIsNull(item.requireSubmit) &&
                item.requireSubmit == 1 ? (
                  <Text style={{color:fontColors.requireSubmit}}>*</Text>
                ) : null}
              </View>
            
          )}

          <PopupDatePicker
            ref={"datePicker"}
            onDateChange={this.onDateChange}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  touch: {
    flexDirection: "row",
    flex: 1,
    // width: '90%',
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: fontView.paddingHorizontal,
    paddingVertical: fontView.paddingVertical,
    // marginHorizontal: Sizes.h20,
    borderRadius: fontView.border,
    borderWidth: fontSizes.border,
    borderColor: fontColors.border,
    backgroundColor: colorForm.inputForm,
  },
  title: {
    color: fontColors.title,
  },
  date: {
    fontSize: fontSizes.title,
    color: fontColors.valueInput,
  },
});

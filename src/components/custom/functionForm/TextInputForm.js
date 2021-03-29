import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Sizes } from "@dungdang/react-native-basic";
import getImage from "../../../res/values/strings/iconStrS";
import { colorForm } from "../../../res/values/strings/colorStr";
import {
  objectIsNull,
  stringIsEmpty,
} from "@dungdang/react-native-basic/src/Functions";
import {
  fontSizes,
  fontColors,
  fontView,
} from "../../../res/values/styles/appStyles";
import { splitStr, checkContain } from "../../../res/values/strings/appFunct";

const checkNumber = (dataType) => {
  return dataType.includes("number") || dataType.includes("text")
    ? parseInt(splitStr(splitStr(dataType, 0, ")"), 1, "("))
    : null;
};

const checkHaveNumber = (dataType) => {
  if (dataType.includes("(")) {
    return true;
  }
  return false;
};
const TextInputForm = (props) => {
  const [item, setItem] = useState(props.item);
  const [text, setText] = useState("");
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    setItem(props.item);
    if (stringIsEmpty(props.value)) {
      setText("");
    } else {
      setText(props.value);
    }
  }, [props.item, props.value]);

  return (
    <View
      style={[
        styles.body,
        {
          borderColor: focused
            ? fontColors.borderFocused
            : !stringIsEmpty(props.error)
              ? fontColors.borderError
              : fontColors.border,
          paddingVertical:
            Platform.OS === "android"
              ? Sizes.s2
              : focused || !stringIsEmpty(text)
                ? fontView.paddingVertical
                : fontView.paddingVerticalTextInput,
        },
      ]}
    >
      {objectIsNull(item.dataType) ? (
        <View style={{ width: "90%", }}>
          {focused || !stringIsEmpty(text) ? (
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.title, { marginBottom: Sizes.s10 }]}>
                {!stringIsEmpty(item) ? item.caption : ""}
              </Text>
              {!objectIsNull(item.requireSubmit) && item.requireSubmit == 1 ? (
                <Text style={{ color: fontColors.requireSubmit }}>*</Text>
              ) : null}
            </View>
          ) : null}
          {!focused && stringIsEmpty(text) ? <View style={styles.behind}>
            <Text style={styles.placeHolder}>
              {!stringIsEmpty(item) ? item.caption : ""}
            </Text>
            {!objectIsNull(item.requireSubmit) && item.requireSubmit == 1 ? (
              <Text style={{ color: fontColors.requireSubmit }}>*</Text>
            ) : null}
          </View> : null}
          <TextInput
            keyboardType={item.tag === "CashAdvance" ? "numeric" : "default"}
            onFocus={() => {
              setFocused(true);

              if (!objectIsNull(item.onPressFocus)) {
                item.onPressFocus()
              }
            }}
            onBlur={() => {
              setFocused(false);
              if (!objectIsNull(item.onPressBlur)) {
                item.onPressBlur()
              }
            }}
            multiline={true}
            scrollEnabled={false}
            // placeholder={
            //   !stringIsEmpty(item)
            //     ? item.caption +
            //       (!objectIsNull(item.requireSubmit) && item.requireSubmit == 1
            //         ? "*"
            //         : null)
            //     : ""
            // }
            placeholderTextColor={fontColors.title}
            editable={item.editable}
            style={[styles.textInput, { paddingVertical: Platform.OS === 'android' ? (!stringIsEmpty(text) ? Sizes.s5 : Sizes.s15) : 0 }]}
            onChangeText={(text) => {
              props.onChangeTextInput(text);
              setText(text);
            }}
            value={text}
          />
        </View>
      ) : (
          <View style={{ width: "90%", paddingVertical: (focused || !stringIsEmpty(text)) ? 0 : Sizes.s10, justifyContent: (focused || !stringIsEmpty(text)) ? null : 'center' }}>
            {focused || !stringIsEmpty(text) ? (
              <View style={{ flexDirection: "row" }}>
                <Text style={[styles.title, { marginBottom: Sizes.s10 }]}>
                  {!stringIsEmpty(item) ? item.caption : ""}
                </Text>
                {!objectIsNull(item.requireSubmit) && item.requireSubmit == 1 ? (
                  <Text style={{ color: fontColors.requireSubmit }}>*</Text>
                ) : null}
              </View>
            ) : null}
            {!focused && stringIsEmpty(text) ? <View style={[styles.behind, { zIndex: -2 }]}>
              <Text style={styles.placeHolder}>
                {!stringIsEmpty(item) ? item.caption : ""}
              </Text>
              {!objectIsNull(item.requireSubmit) && item.requireSubmit == 1 ? (
                <Text style={{ color: fontColors.requireSubmit }}>*</Text>
              ) : null}
            </View> : null}
            <TextInput
              scrollEnabled={false}
              keyboardType={
                item.dataType.includes("number") ? "numeric" : "default"
              }
              onFocus={() => {
                setFocused(true);
                if (!objectIsNull(item.onPressFocus)) {
                  item.onPressFocus()
                }
              }}
              onBlur={() => {
                setFocused(false);
                if (!objectIsNull(item.onPressBlur)) {
                  item.onPressBlur()
                }
              }}
              multiline={true}
              // placeholder={
              //   !stringIsEmpty(item)
              //     ? item.caption +
              //       (!objectIsNull(item.requireSubmit) && item.requireSubmit == 1
              //         ? "*"
              //         : null)
              //     : ""
              // }
              editable={item.editable}
              // style={styles.textInput}
              style={[styles.textInput, { paddingVertical: Platform.OS === 'android' ? (!stringIsEmpty(text) ? Sizes.s5 : Sizes.s15) : 0 }]}
              onChangeText={(text) => {
                props.onChangeTextInput(text);
                setText(text);
              }}
              value={text}
              maxLength={
                checkHaveNumber(item.dataType) ? checkNumber(item.dataType) : null
              }
            />
          </View>
        )}
      <TouchableOpacity
        disabled={item.editable === false ? true : false}
        onPress={() => {
          if (!objectIsNull(item.onPress)) {
            item.onPress();
          }
        }}
      >
        {item.editable ?
          (
            <Image
              source={getImage(!objectIsNull(item.icon) ? item.icon : "ic_pen")}
              style={styles.iconRequire}
            />
          )
          :
          (
            null
          )
        }
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: fontView.paddingHorizontal,
    // paddingVertical: Platform.OS === 'android' ? Sizes.s2 : fontView.paddingVertical,
    alignItems: "center",
    borderRadius: fontView.border,
    borderWidth: fontSizes.border,
    // marginHorizontal: Sizes.h20
    alignSelf: "center",
    backgroundColor: colorForm.inputForm,
  },
  textInput: {
    width: "100%",
    maxWidth: "95%",
    // flex: 1,
    // paddingVertical: Sizes.s15,
    fontSize: fontSizes.title,

  },
  iconRequire: {
    width: Sizes.s45,
    height: Sizes.s45,
  },
  title: {
    fontSize: fontSizes.titleSmall,
    color: fontColors.title,
  },
  placeHolder: {
    fontSize: fontSizes.title,
    color: fontColors.title,
  },
  behind: {
    alignItems: "center",
    position: "absolute",
    // left: 0,
    // top: 0,
    width: "100%",
    height: "100%",
    flexDirection: "row",
  },

});

export { TextInputForm };

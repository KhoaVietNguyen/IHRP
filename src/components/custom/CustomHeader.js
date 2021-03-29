import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { iconStr } from '../../res/values/strings/iconStr';
import { Sizes } from '@dungdang/react-native-basic';
import {
  objectIsNull,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import getImage from '../../res/values/strings/iconStrS';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colorApplication } from '../../res/values/strings/colorStr';
import {
  fontSizes,
  fontColors,
  fontView,
} from '../../res/values/styles/appStyles';
import { userProfile } from '../../config/settings';
const CustomHeader = (props) => {
  const {
    onPressLeft,
    onPressRight,

    iconRight,
    typeIconRight,
    showIconRight,

    iconLeft,
    typeIconLeft,
    title,
  } = props;
  return (
    <View style={styles.header}>
      {typeIconLeft === 'back' ? (
        <TouchableOpacity
          onPress={() => {
            if (!objectIsNull(onPressLeft)) {
              onPressLeft();
            }
          }}
          style={styles.touchLeft}>
          <Image source={iconStr.ic_back_black} style={styles.iconLeft} />
        </TouchableOpacity>
      ) : (
          <View style={styles.viewLeft}></View>
        )}
      <Text numberOfLines={1} style={styles.title}>{stringIsEmpty(title) ? '' : title}</Text>
      {typeIconRight === 'addNew' ? (
        <TouchableOpacity
          onPress={() => {
            if (!objectIsNull(onPressRight)) {
              onPressRight();
            }
          }}
          style={styles.touchRight}>
          <Image source={getImage('ic_add_primary')} style={styles.iconLeft} />
        </TouchableOpacity>
      ) : typeIconRight === 'edit' ? (
        <TouchableOpacity
          onPress={() => {
            if (!objectIsNull(onPressLeft)) {
              onPressRight();
            }
          }}
          style={styles.touchLeft}>
          {/* <Image source={getImage('ic_pen')} style={styles.iconLeft} /> */}
          <Text style={styles.buttonTextTitle}>{userProfile.LangID === 'VN' ? 'Sửa' : 'Edit'}</Text>
        </TouchableOpacity>
      ) : typeIconRight === 'logOut' ? (
        <TouchableOpacity
          onPress={() => {
            if (!objectIsNull(onPressRight)) {
              onPressRight();
            }
          }}
          style={styles.touchRight}>
          <Image
            source={getImage('ic_logout')}
            style={[styles.iconLeft, { tintColor: '#03A9F4' }]}
          />
        </TouchableOpacity>
      ) : typeIconRight === 'branch' ? (
        <TouchableOpacity
          onPress={() => {
            if (!objectIsNull(onPressRight)) {
              onPressRight();
            }
          }}
          style={styles.touchRight}>
          <Icon
            name="code-branch"
            size={Sizes.s50}
            color={colorApplication.colorBranch}
          />
        </TouchableOpacity>
      ) : typeIconRight === 'branch' ? (
        <TouchableOpacity
          onPress={() => {
            if (!objectIsNull(onPressRight)) {
              onPressRight();
            }
          }}
          style={styles.touchRight}>
          <Icon
            name="code-branch"
            size={Sizes.s50}
            color={colorApplication.colorBranch}
          />
        </TouchableOpacity>
      ) : typeIconRight === 'save' ? (
        <TouchableOpacity
          onPress={() => {
            if (!objectIsNull(onPressLeft)) {
              onPressRight();
            }
          }}
          style={styles.touchLeft}>
          <Text style={styles.buttonTextTitle}>{userProfile.LangID === 'VN' ? 'Lưu' : 'Save'}</Text>
        </TouchableOpacity>
      ) : typeIconRight === 'choose' ? (
        showIconRight ? (
          <TouchableOpacity
            onPress={() => {
              if (!objectIsNull(onPressLeft)) {
                onPressRight();
              }
            }} ƒ
            style={styles.touchLeft}>
            <Text style={styles.buttonTextTitle}>{userProfile.LangID === 'VN' ? 'Chọn' : 'Choose'}</Text>
          </TouchableOpacity>
        )
          :
          null

      ) : typeIconRight === 'search' ? (
        <TouchableOpacity
          onPress={() => {
            if (!objectIsNull(onPressLeft)) {
              onPressRight();
            }
          }}
          style={styles.touchLeft}>
          <Image source={getImage('ic_search')} style={styles.iconLeft} />
        </TouchableOpacity>
      ) : (
                        <View style={styles.viewRight}></View>
                      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingVertical: Sizes.h10,
    paddingHorizontal: Sizes.h20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: fontSizes.border,
    borderColor: fontColors.border,
    // shadowColor: 'rgba(0, 0, 0, 0.5 )',
    // shadowOffset: {width: 0, height: 4},
    // shadowRadius: Sizes.h10,
    // shadowOpacity: 0.2,
    // elevation: 10,
  },
  touchLeft: {
    paddingVertical: Sizes.h10,
    paddingHorizontal: Sizes.h20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLeft: {
    paddingVertical: Sizes.h10,
    width: Sizes.s80,
    height: Sizes.s80,
    // backgroundColor: 'red',
  },
  touchRight: {
    paddingVertical: Sizes.h10,
    paddingHorizontal: Sizes.h20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    paddingVertical: Sizes.h10,
    width: Sizes.s80,
    height: Sizes.s80,
  },
  iconLeft: {
    width: Sizes.s50,
    height: Sizes.s50,
    resizeMode: "contain"
  },
  title: {
    fontSize: fontSizes.header,
    fontWeight: 'bold',
    color: 'black',
    flex: 1,
    textAlign: 'center',
  },
  buttonTextTitle: {
    fontSize: fontSizes.title,
    color: fontColors.buttonTextAppplication,
  },
});

export default CustomHeader;

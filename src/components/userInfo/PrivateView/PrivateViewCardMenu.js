import React, { Component } from 'react';
import { View, TouchableHighlight, Image, Text, Alert } from 'react-native';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import getImage from '../../../res/values/strings/iconStrS';
import { Sizes } from '@dungdang/react-native-basic';
import { userProfile } from '../../../config/settings'

export default class PrivateViewCardMenu extends Component {
  _menu = null;
  constructor(props) {
    super(props);
    this.state = {};
  }
  setMenuRef = (ref) => {
    this._menu = ref;
  };
  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  componentDidUpdate(preProps) {
    if (
      this.props.deleteCode !== preProps.deleteCode &&
      this.props.deleteCode !== null
    ) {
      this.props.Get_PersonalFormListAction(this.props.IdFunction);
    }
  }

  DeleteAlert = () => {
    Alert.alert(
      'Thông báo ',
      'Bạn có muốn xóa dữ liệu không?',
      [
        {
          text: 'Hủy',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: () => {
            this.props.Delete_PrivateFormAction({
              infoID: this.props.IdFunction,
              recordID: this.props.id,
            });
            return true;
          },
        },
      ],
      { cancelable: false },
    );
  };

  Delete = () => {
    this.hideMenu();
    this.DeleteAlert();
  };

  Edit = () => {
    // console.log(this.props.IdFunction, this.props.Title, this.props.id);
    this.props.navigation.navigate('PrivateViewApplication', {
      IdFunction: this.props.IdFunction,
      title: this.props.Title,
      RecordID: this.props.id,
    });
    this.hideMenu();
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Menu
          ref={this.setMenuRef}
          button={
            <TouchableHighlight
              style={{ width: Sizes.h80, height: Sizes.h80 }}
              activeOpacity={0.6}
              underlayColor="#ededed"
              onPress={this.showMenu}>
              <Image
                style={{ width: Sizes.h80, height: Sizes.h80 }}
                resizeMode={'contain'}
                source={getImage('ic_private_edit')}></Image>
            </TouchableHighlight>
          }>
          <MenuItem onPress={this.Delete}>{userProfile.LangID === 'VN' ? 'Xóa' : 'Delete'}</MenuItem>
          <MenuItem onPress={this.Edit}>{userProfile.LangID === 'VN' ? 'Chỉnh sửa' : 'Edit'}</MenuItem>
        </Menu>
      </View>
    );
  }
}

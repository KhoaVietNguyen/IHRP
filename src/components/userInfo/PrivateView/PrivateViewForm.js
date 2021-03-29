import React, { Component } from 'react';
import { View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import FormDetail from '../../custom/form/FormDetail';
import Data from './Data';
import {
  objectIsNull,
  arrayIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import CustomHeader from '../../custom/CustomHeader';
import { CustomButton } from '../../custom/CustomButton';
import { mapDataToArrayPicker } from '../../custom/function/functionPicker';
import { Sizes } from '@dungdang/react-native-basic';
import { userProfile } from '../../../config/settings';

export default class PrivateViewForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.props.Get_PrivateForm({
      infoID: this.props.infoID,
      recordID: this.props.recordID,
    });
  }

  mapPicker(dataItems) {
    let data = dataItems.map((value) => {
      return {
        id: value.id,
        label: value.name,
        value: value,
        isSelect: false,
        type: '',
      };
    });
    return data;
  }
  mapData = (data) => {
    let dataList = [];
    if (this.props.dataSource !== null) {
      for (let item of data) {
        if (item.control === 'combobox') {
          if (this.props.itemDataSource === item.dataSource) {
            dataList.push(
              Object.assign({}, item, {
                tag: "comboboxForm",
                onPress: () => {
                  if (item.parent != null) {
                    let Parent = this.onFindParent(item);
                    const input = {
                      ID: item.dataSource,
                      ParentID: Parent.value,
                    };
                    if (
                      Parent.value === '' ||
                      Parent.value == null ||
                      Parent.value == undefined
                    ) {
                      this.ErrorAlertCB(Parent);
                    } else {
                      this.props.Get_PrivateListAction(item.dataSource);
                    }
                  } else {
                    const input = { ID: item.dataSource, ParentID: '' };
                    this.props.Get_PrivateListAction(item.dataSource);
                  }
                },
                items: this.mapPicker(this.props.dataSource),
                selectedItem: {
                  id: item.value,
                  label: item.display,
                  value: {},
                  isSelect: false,
                  type: '',
                },
                onCheckParent: () => {
                  this.onCheckParent(item.id);
                },
              }),
            );
          } else {
            dataList.push(
              Object.assign({}, item, {
                tag: "comboboxForm",
                onPress: () => {
                  if (item.parent != null) {
                    let Parent = this.onFindParent(item);
                    const input = {
                      ID: item.dataSource,
                      ParentID: Parent.value,
                    };
                    if (
                      Parent.value === '' ||
                      Parent.value == null ||
                      Parent.value == undefined
                    ) {
                      this.ErrorAlertCB(Parent);
                    } else {
                      this.props.Get_PrivateListAction(item.dataSource);
                    }
                  } else {
                    const input = { ID: item.dataSource, ParentID: '' };
                    this.props.Get_PrivateListAction(item.dataSource);
                  }
                },
                items: [],
                selectedItem: {
                  id: item.value,
                  label: item.display,
                  value: {},
                  isSelect: false,
                  type: '',
                },
                onCheckParent: () => {
                  this.onCheckParent(item.id);
                },
              }),
            );
          }
        } else {
          dataList.push(item);
        }
      }
    } else {
      for (let item of data) {
        if (item.control === 'combobox') {
          dataList.push(
            Object.assign({}, item, {
              tag: "comboboxForm",
              onPress: () => {
                if (item.parent != null) {
                  let Parent = this.onFindParent(item);
                  const input = {
                    ID: item.dataSource,
                    ParentID: Parent.value,
                  };
                  if (
                    Parent.value === '' ||
                    Parent.value == null ||
                    Parent.value == undefined
                  ) {
                    this.ErrorAlertCB(Parent);
                  } else {
                    this.props.Get_PrivateListAction(item.dataSource);
                  }
                } else {
                  const input = { ID: item.dataSource, ParentID: '' };
                  this.props.Get_PrivateListAction(item.dataSource);
                }
              },
              items: [],
              selectedItem: {
                id: item.value,
                label: item.display,
                value: {},
                isSelect: false,
                type: '',
              },
              onCheckParent: () => {
                this.onCheckParent(item.id);
              },
            }),
          );
        } else {
          dataList.push(item);
        }
      }
    }
    // console.log("dataList", dataList)
    return dataList;
  };

  onCheckParent = (id) => {
    for (let item of this.state.data) {
      if (id === item.parent) {
        Object.assign(item, {
          value: '',
          display: '',
          selectedItem: {
            id: '',
            label: '',
            value: {},
            isSelect: false,
            type: '',
          },
        });
        this.onCheckParent(item.id);
      }
    }
  };

  onFindParent = (item) => {
    let parent = {};
    for (let item2 of this.state.data) {
      if (item.parent === item2.id) {
        parent = item2;
      }
    }
    return parent;
  };
  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data && this.props.data !== null) {
      this.setState({ data: this.mapData(this.props.data) });
    }
    if (
      prevProps.dataSource !== this.props.dataSource &&
      this.props.dataSource !== null
    ) {
      this.setState({ data: this.mapData(this.state.data) });
    }
    if (
      prevProps.resultCode_Save !== this.props.resultCode_Save &&
      this.props.resultCode_Save !== null
    ) {
      // console.log('Save');
      this.SaveSuccessAlert();
      this.props.Get_PersonalFormListAction(this.props.infoID);
    }

    if (
      prevProps.commit !== this.props.commit &&
      this.props.commit !== null
    ) {
      // console.log("AAAAAAAAAA", this.props.commit)
      if (this.props.commit == false) {
        this.ErrorAlertGetForm()
      }
    }
  }

  onPressSubmit = () => {
    let isEmpty = false;
    if (!objectIsNull(this.refs.form.checkEmpty)) {
      isEmpty = this.refs.form.checkEmpty();
    }
    if (!isEmpty) {
      let DataItem = [];
      for (let item of this.state.data) {
        if (item.control === 'datepicker') {
          // console.log('itemDatePicker: ', item)
          DataItem.push({
            ControlID: item.id,
            ControlValue: this.formatDate(item.value),
          });
        } else {
          DataItem.push({ ControlID: item.id, ControlValue: item.value });
        }
      }
      let data = {
        infoID: this.props.infoID,
        recordID: this.props.recordID,
        dataItem: DataItem,
      };
      // console.log('DataItem', data);
      this.props.Save_PrivateFormAction(data);
    } else {
      this.ErrorAlert();
    }
  };

  formatDate(date) {

    if (date !== null && date !== undefined && date !== "") {
      var dateformat = date.split('/');
      return dateformat[2] + '-' + dateformat[1] + '-' + dateformat[0];
    }
    return null;
  }

  // onConfirmButton = () => {
  //   let DataItem = [];
  //   for (let item of this.state.data) {
  //     if (item.control === 'datepicker') {
  //       DataItem.push({
  //         ControlID: item.id,
  //         ControlValue: this.formatDate(item.value),
  //       });
  //     } else {
  //       DataItem.push({ControlID: item.id, ControlValue: item.value});
  //     }
  //   }
  //   let data = {
  //     infoID: this.props.infoID,
  //     recordID: this.props.recordID,
  //     dataItem: DataItem,
  //   };
  //   this.props.Save_PrivateFormAction(data);
  //   //  console.log(DataItem)
  // };
  ErrorAlertGetForm = () => {
    Alert.alert(
      userProfile.LangID === 'VN' ? 'Thông báo ' : 'Notice',
      `${this.props.message}`,
      [
        {
          text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };


  ErrorAlertCB = (object) => {
    Alert.alert(
      userProfile.LangID === 'VN' ? 'Thông báo ' : 'Notice',
      `${userProfile.LangID === 'VN' ? 'Không tìm thấy dữ liệu' : 'Data not found'} "${object.caption}"`,
      [
        {
          text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };
  ErrorAlert = () => {
    Alert.alert(
      userProfile.LangID === 'VN' ? 'Thông báo ' : 'Notice',
      userProfile.LangID === 'VN' ? 'Dữ liệu không được để trống' : 'Data not empty',
      [
        {
          text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  SaveSuccessAlert = () => {
    Alert.alert(
      userProfile.LangID === 'VN' ? 'Thông báo ' : 'Notice',
      this.props.resultCode_Save == 0
        ? this.props.recordID === ''
          ? (userProfile.LangID === 'VN' ? 'Thêm mới thành công !' : 'Add new success !')
          : (userProfile.LangID === 'VN' ? 'Thay đổi thành công !' : 'Update success !')
        : this.props.message_save,
      [
        {
          text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel',
          onPress: () => {
            this.props.navigation.goBack();
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: Sizes.s20, }}>
        <FormDetail
          ref={'form'}
          form={this.state.data}
          onPressButton={this.onPressSubmit}
          {...this.props}
        />
        <CustomButton
          type={'send'}
          title={userProfile.LangID === 'VN' ? 'Chuyển' : 'Send'}
          onPress={() => {
            this.onPressSubmit();
          }}></CustomButton>
      </SafeAreaView>
    );
  }
}

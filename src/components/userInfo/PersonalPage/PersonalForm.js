import * as React from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView, Alert, KeyboardAvoidingView, Platform, TextInput} from 'react-native';
import {
  objectIsNull,
  arrayIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import {Sizes} from '@dungdang/react-native-basic';
import getImage from '../../../res/values/strings/iconStrS';
import {
  colorPersonalForm,
  colorPersonal,
} from '../../../res/values/strings/colorStr';

import CustomHeader from '../../custom/CustomHeader';
import Loading from '../../custom/Loading';
import FormDetail from '../../../components/custom/form/FormDetail';

class PersonalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
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
                tag:"comboboxForm",
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
                      this.props.getPersonalFormSourceAction(input);
                    }
                  } else {
                    const input = {ID: item.dataSource, ParentID: ''};
                    this.props.getPersonalFormSourceAction(input);
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
                editable: !this.props.status,
              }),
            );
          } else {
            dataList.push(
              Object.assign({}, item, {
                tag:"comboboxForm",
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
                      this.props.getPersonalFormSourceAction(input);
                    }
                  } else {
                    const input = {ID: item.dataSource, ParentID: ''};
                    this.props.getPersonalFormSourceAction(input);
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
                editable: !this.props.status,
              }),
            );
          }
        } else {
          dataList.push(
            Object.assign({}, item, {editable: !this.props.status}),
          );
        }
      }
    } else {
      for (let item of data) {
        if (item.control === 'combobox') {
          dataList.push(
            Object.assign({}, item, {
              tag:"comboboxForm",
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
                    this.props.getPersonalFormSourceAction(input);
                  }
                } else {
                  const input = {ID: item.dataSource, ParentID: ''};
                  this.props.getPersonalFormSourceAction(input);
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
              editable: !this.props.status,
            }),
          );
        } else {
          dataList.push(
            Object.assign({}, item, {editable: !this.props.status}),
          );
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
    this.setState({data: this.mapData(this.state.data)});
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
    if (
      prevProps.dataItem !== this.props.dataItem &&
      this.props.dataItem !== null
    ) {
      // console.log("yes")
      this.setState({
        data: this.mapData(this.props.dataItem),
      });
    }
    if (
      prevProps.dataSource !== this.props.dataSource &&
      this.props.dataSource !== null
    ) {
      this.setState({data: this.mapData(this.state.data)});
    }
    if (
      prevProps.saveCommit !== this.props.saveCommit &&
      this.props.saveCommit !== null
    ) {
      this.SaveSuccessAlert();
      this.props.getPersonalFormAction(
        this.props.navigation.getParam('id', 'No id'),
      );
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
          DataItem.push({
            ControlID: item.id,
            ControlValue: this.formatDate(item.value),
          });
        } else if (item.control !== 'label') {
          DataItem.push({ControlID: item.id, ControlValue: item.value});
        }
      }
      let data = {
        ID: this.props.navigation.getParam('id', 'No id'),
        ITEM: DataItem,
      };
      this.props.savePersonalFormAction(data);
    } else {
      this.ErrorAlert();
    }
  };

  ErrorAlert = () => {
    Alert.alert(
      'Thông báo ',
      'Dữ liệu không được để trống?',
      [
        {
          text: 'Đóng',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  ErrorAlertCB = (object) => {
    Alert.alert(
      'Thông báo ',
      `Không tìm thấy dữ liệu "${object.caption}"`,
      [
        {
          text: 'Đóng',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  SaveSuccessAlert = () => {
    Alert.alert(
      'Thông báo ',
      this.props.saveMessage,
      [
        {
          text: 'Đóng',
          onPress: () => {
            this.props.navigation.goBack();
          },
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };
  formatDate(date) {
    if (date !== null && date !== undefined && date !== '') {
      var dateformat = date.split('/');
      return dateformat[2] + '-' + dateformat[1] + '-' + dateformat[0];
    }
    return null;
  }

  render() {
    const {dataItem, loading, error, loading_DataSource, loading_Save} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{flex: 1, backgroundColor: colorPersonalForm.bg_container}}>
          {this.props.status ? (
            <CustomHeader
              typeIconLeft={'back'}
              onPressLeft={() => {
                this.props.navigation.goBack();
                //  console.log(this.props.status)
              }}
              title={this.props.desc}
            />
          ) : (
            <CustomHeader
              typeIconLeft={'back'}
              onPressLeft={() => {
                this.props.navigation.goBack();
                // console.log(this.props.status)
              }}
              typeIconRight={'save'}
              onPressRight={() => {
                this.onPressSubmit();
              }}
              title={this.props.desc}
            />
          )}

          {(loading || loading_DataSource ||loading_Save) && <Loading />}
          {!arrayIsEmpty(dataItem) ? (
            <KeyboardAvoidingView
            keyboardVerticalOffset={Sizes.s100}
            behavior={Platform.OS==="ios"?"padding":null}
              style={{
                flex: 1,
                backgroundColor: colorPersonalForm.bg_container,
                padding: Sizes.s30,
              }}>
              <FormDetail
                ref={'form'}
                form={this.state.data}
                // onPressButton={}
                {...this.props}
              />
              
            </KeyboardAvoidingView>
          ) : (
            <View style={styles.styleError}>
              <Image
                source={getImage('img_empty_data_2')}
                style={{resizeMode: 'contain'}}
              />
              <Text
                style={{
                  fontSize: Sizes.s40,
                  fontWeight: 'bold',
                  color: colorPersonal.error,
                }}>
                {error}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  styleError: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PersonalForm;

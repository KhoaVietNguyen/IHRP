import React from 'react';
import {
  Button,
  Image,
  View,
  Text,
  Alert,
  Modal,
  ScrollView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {searchReportWorkingHours} from '../custom/form/FormTypeDetail';
import CustomHeader from '../custom/CustomHeader';
import {CustomButton} from '../custom/CustomButton';
import FormDetail from '../custom/form/FormDetail';
import getImage from '../../res/values/strings/iconStrS';
import {
  objectIsNull,
  arrayIsEmpty,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import {Sizes} from '@dungdang/react-native-basic';
import Loading from '../custom/Loading';
import {colorReportOT} from '../../res/values/strings/colorStr';
import {userProfile} from '../../config/settings'
import {appStrS} from '../../res/values/strings/appStrS'


export default class ReportWorkingHours extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: searchReportWorkingHours(),
      data: [],
    };
  }

  formatTime(time) {
    let hour = parseInt(this.splitStr(time, 0, ':'));
    let min = parseInt(this.splitStr(time, 1, ':'));
    if (hour == 0 && min == 0) {
      return '0';
    } else if (hour != 0 && min == 0) {
      return this.splitStr(time, 0, ':') + `${userProfile.LangID === 'VN' ? 'g' : 'h'}`;
    } else if (hour == 0 && min != 0) {
      return this.splitStr(time, 1, ':') + `${userProfile.LangID === 'VN' ? 'p' : 'm'}`;
    } else {
      return (
        this.splitStr(time, 0, ':') + `${userProfile.LangID === 'VN' ? 'g' : 'h'}` + this.splitStr(time, 1, ':') + `${userProfile.LangID === 'VN' ? 'p' : 'm'}`
      );
    }
  }

  splitStr(str, positionGet, char) {
    if (str === undefined || str === null) {
      return '';
    }
    return str.split(char)[positionGet];
  }

  onPressSubmit = () => {
    let inputOverTime = {
      FromDate: '',
      ToDate: '',
    };
    for (let item of this.state.form) {
      if (item.control === 'twoDatePicker') {
        inputOverTime.FromDate = item.value1;
        inputOverTime.ToDate = item.value2;
      }
    }
    this.props.Get_ReportWorkingHour(inputOverTime);
  };
  componentDidUpdate(preProps) {
    if (preProps.data !== this.props.data && this.props.data !== null) {
      this.setState({
        data: this.props.data.dataItem,
      });
    }
  }
  noteStatusOT() {
    return (
      <View
        style={{
          width: '100%',
          marginVertical: Sizes.s10,
          marginBottom: Sizes.s20,
        }}>
        <View style={{flex: 1, flexDirection: 'row',}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '50%',}}>
            <View
              style={{
                width: Sizes.s30,
                height: Sizes.s30,
                borderRadius: Sizes.s15,
                backgroundColor: colorReportOT.colorStatus1,
              }}></View>
            <Text> {userProfile.LangID === 'VN' ? appStrS.vn.WorkingHouse.caption1 : appStrS.en.WorkingHouse.caption1}</Text>
          </View>

          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '50%'}}>
            <View
              style={{
                width: Sizes.s30,
                height: Sizes.s30,
                borderRadius: Sizes.s15,
                backgroundColor: colorReportOT.colorStatus2,
              }}></View>
            <Text> {userProfile.LangID === 'VN' ? appStrS.vn.WorkingHouse.caption2 : appStrS.en.WorkingHouse.caption2}</Text>
          </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '50%'}}>
            <View
              style={{
                width: Sizes.s30,
                height: Sizes.s30,
                borderRadius: Sizes.s15,
                backgroundColor: colorReportOT.colorStatus3,
              }}></View>
            <Text> {userProfile.LangID === 'VN' ? appStrS.vn.WorkingHouse.caption3 : appStrS.en.WorkingHouse.caption3}</Text>
          </View>
          <View
            style={{flexDirection: 'row', alignItems: 'center', width: '50%'}}>
            <View
              style={{
                width: Sizes.s30,
                height: Sizes.s30,
                borderRadius: Sizes.s15,
                backgroundColor: colorReportOT.colorStatus4,
              }}></View>
            <Text> {userProfile.LangID === 'VN' ? appStrS.vn.WorkingHouse.caption4 : appStrS.en.WorkingHouse.caption4}</Text>
          </View>
        </View>
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeader
          typeIconLeft={'back'}
          title= {userProfile.LangID === 'VN' ? appStrS.vn.WorkingHouse.title : appStrS.en.WorkingHouse.title}
          onPressLeft={() => {
            this.props.navigation.goBack();
          }}
        />
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: 'white',
            paddingHorizontal:Sizes.s7
          }}>
          <FormDetail ref="form" form={this.state.form} />
          <CustomButton
            onPress={this.onPressSubmit}
            type="search"
            title={userProfile.LangID === 'VN' ? appStrS.vn.WorkingHouse.search : appStrS.en.WorkingHouse.search}
          />
          {this.noteStatusOT()}
          
          <View style={{flex: 1}}>
          {this.props.fetching && <Loading></Loading>}
            <FlatList
              data={this.state.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingVertical: Sizes.s20,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: '30%',

                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: Sizes.h30, color: '#01AAF0'}}>
                        {item.text1}
                      </Text>
                      <Text style={{fontSize: Sizes.h26, color: 'grey'}}>
                        {item.text2}
                      </Text>
                    </View>
                    <View
                      style={{
                        width: '70%',

                        alignItems: 'center',
                      }}>
                      <View style={styles.hourOT}>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.hourDetailOT,
                            {
                              backgroundColor:
                                item.warning1 == 0
                                  ? colorReportOT.colorStatus1
                                  : colorReportOT.colorStatus5,
                            },
                          ]}>
                          {this.formatTime(item.content1)}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.hourDetailOT,
                            {backgroundColor: colorReportOT.colorStatus2},
                          ]}>
                          {this.formatTime(item.content2)}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.hourDetailOT,
                            {backgroundColor: colorReportOT.colorStatus3},
                          ]}>
                          {this.formatTime(item.content3)}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[
                            styles.hourDetailOT,
                            {backgroundColor: colorReportOT.colorStatus4},
                          ]}>
                          {this.formatTime(item.content4)}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  noteContainer: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 2,
  },
  hourOT: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  hourDetailOT: {
    // paddingHorizontal: Sizes.s10,
    paddingVertical: Sizes.s10,
    borderRadius: Sizes.s20,
    textAlign: 'center',
    marginHorizontal: Sizes.s5,
    color: '#fff',
    flex: 1,
    fontSize: Sizes.h26,
  },
});

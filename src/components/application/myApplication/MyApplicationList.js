import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { colorApplicationHistory } from '../../../res/values/strings/colorStr';
import getImage from '../../../res/values/strings/iconStrS';
import { Data } from './Data';
import { Sizes } from '@dungdang/react-native-basic';
import { userProfile } from '../../../config/settings';

export default class MyApplicationList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <FlatList
          ref={'detailList'}
          data={Data}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: 'white',
                }}>
                <MyApplicationListItem
                  item={item}
                  type={item.type}></MyApplicationListItem>
              </View>
            );
          }}></FlatList>
      </View>
    );
  }
}

class MyApplicationListItem extends Component {
  constructor(props) {
    super(props);
  }
  renderItem(type) {
    switch (type) {
      case 1:
        return (
          <View style={styles.cardContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={getImage('dangky_card_1')}
                style={styles.iconStyle}></Image>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.nameStyle}>{userProfile.LangID === 'VN' ? 'Đơn nghỉ phép' : 'Leave application'}</Text>
              <Text style={styles.contentStyle}>
                {this.props.item.fromDate}-{this.props.item.toDate}
              </Text>
            </View>
            <View style={styles.statusContainer}>
              <Text
                style={[
                  styles.statuStyle,
                  { color: getStatusColor(this.props.item.statusID) },
                ]}>
                {this.props.item.status}
              </Text>
            </View>
          </View>
        );
      case 2:
        return (
          <View style={styles.cardContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={getImage('dangky_card_3')}
                style={styles.iconStyle}></Image>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.nameStyle}>{userProfile.LangID === 'VN' ? 'Làm ngoài giờ' : 'Overtime application'}</Text>
              <Text style={styles.contentStyle}>{this.props.item.date}</Text>
              <Text style={styles.contentStyle}>
                {this.props.item.from}-{this.props.item.to}
              </Text>
            </View>
            <View style={styles.statusContainer}>
              <Text
                style={[
                  styles.statuStyle,
                  { color: getStatusColor(this.props.item.statusID) },
                ]}>
                {this.props.item.status}
              </Text>
            </View>
          </View>
        );
      case 3:
        return (
          <View style={styles.cardContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={getImage('dangky_card_75')}
                style={styles.iconStyle}></Image>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.nameStyle}>{userProfile.LangID === 'VN' ? 'Quẹt thẻ' : 'Log TMS Application'}</Text>
              <Text style={styles.contentStyle}>
                {this.props.item.content1}
              </Text>
              <Text style={styles.contentStyle}>
                {this.props.item.dateID} {this.props.item.content2}
              </Text>
            </View>
            <View style={styles.statusContainer}>
              <Text
                style={[
                  styles.statuStyle,
                  { color: getStatusColor(this.props.item.content3ID) },
                ]}>
                {this.props.item.content3}
              </Text>
              <Text style={styles.contentStyle}>
                {this.props.item.content4}
              </Text>
              <Text
                style={[
                  styles.contentStyle,
                  { color: getStatusColor(this.props.item.content5ID) },
                ]}>
                {this.props.item.content5}
              </Text>
            </View>
          </View>
        );
      case 4:
        return (
          <View style={styles.cardContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={getImage('dangky_card_11')}
                style={styles.iconStyle}></Image>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.nameStyle}>{userProfile.LangID === 'VN' ? 'Đi công tác' : 'Business trip application'}</Text>
              <Text style={styles.contentStyle}>
                {this.props.item.fromDateTime}
              </Text>
              <Text style={styles.contentStyle}>
                {this.props.item.toDateTime}
              </Text>
            </View>
            <View style={styles.statusContainer}>
              <Text
                style={[
                  styles.statuStyle,
                  { color: getStatusColor(this.props.item.statusID) },
                ]}>
                {this.props.item.status}
              </Text>
            </View>
          </View>
        );
    }
  }

  render() {
    const { type } = this.props;
    return (
      <TouchableOpacity onPress={() => { }}>
        {this.renderItem(type)}
      </TouchableOpacity>
    );
  }
}

const getStatusColor = (statusID) => {
  switch (statusID) {
    case 1:
      return colorApplicationHistory.colorStatus1;
    case 2:
      return colorApplicationHistory.colorStatus2;
    case 3:
      return colorApplicationHistory.colorStatus3;
    case 4:
      return colorApplicationHistory.colorStatus4;
    default:
      return colorApplicationHistory.colorStatus1;
  }
};

let phoneWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  cardContainer: {
    width: phoneWidth - 10,
    height: Sizes.s160,

    // borderRadius: 5,
    // shadowColor: 'rgba(0, 0, 0, 0.5 )',
    // shadowOffset: {width: 0, height: 4},
    // shadowRadius: Sizes.h10,
    // shadowOpacity: 0.2,
    // elevation: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  iconContainer: {
    width: Sizes.s120,
    height: Sizes.s160,
  },
  contentContainer: {
    width: Sizes.s340,
    height: Sizes.s200,
  },
  statusContainer: {
    width: Sizes.s340,
    height: Sizes.s200,
    alignItems: 'flex-end',
  },
  iconStyle: {
    width: Sizes.s120,
    height: Sizes.s120,
  },
  nameStyle: {
    marginLeft: Sizes.s10,
    fontSize: 18,
  },
  statuStyle: {
    marginRight: Sizes.s10,
    fontSize: 17,
  },
  contentStyle: {
    marginLeft: Sizes.s10,
    fontSize: 12,
    color: 'grey',
    marginRight: Sizes.s10,
  },
});

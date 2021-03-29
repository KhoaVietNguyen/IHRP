import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';

import { Sizes } from '@dungdang/react-native-basic';
import getImage from '../../res/values/strings/iconStrS';

export default class DashBoardCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataItem: {},
    };
  }

  componentDidMount() {
    switch (this.props.item.subscribeID) {
      case 3:
        this.props.getDashBoardApprovalAction(this.props.item.subscribeID);
        return;
      case 7:
        this.props.getDashBoardCurrentShiftAction(this.props.item.subscribeID);
        return;
      case 8:
        this.props.getDashBoardNextShiftAction(this.props.item.subscribeID);
        return;
      case 9:
        this.props.getDashBoardWorkingHourAction(this.props.item.subscribeID);
        return;
      case 10:
        this.props.getDashBoardLeaveInfoAction(this.props.item.subscribeID);
        return;
    }
  }

  componentDidUpdate(preProps) {
    switch (this.props.item.subscribeID) {
      case 3:
        if (
          preProps.dataApproval !== this.props.dataApproval &&
          this.props.dataApproval !== null
        ) {
          this.setState({
            dataItem: this.props.dataApproval[0],
          });
        }
        return;
      case 7:
        if (
          preProps.dataCurrentShift !== this.props.dataCurrentShift &&
          this.props.dataCurrentShift !== null
        ) {
          this.setState({
            dataItem: this.props.dataCurrentShift[0],
          });
        }
        return;
      case 8:
        if (
          preProps.dataNextShift !== this.props.dataNextShift &&
          this.props.dataNextShift !== null
        ) {
          this.setState({
            dataItem: this.props.dataNextShift[0],
          });
        }
        return;
      case 9:
        if (
          preProps.dataWorkingHour !== this.props.dataWorkingHour &&
          this.props.dataWorkingHour !== null
        ) {
          this.setState({
            dataItem: this.props.dataWorkingHour[0],
          });
        }
        return;
      case 10:
        if (
          preProps.dataLeaveInfo !== this.props.dataLeaveInfo &&
          this.props.dataLeaveInfo !== null
        ) {
          this.setState({
            dataItem: this.props.dataLeaveInfo[0],
          });
        }
        return;
    }
  }

  renderCard() {
    switch (this.props.item.subscribeID) {
      case 3:
        return (
          <TouchableOpacity onPress={() => { }}>
            <ImageBackground
              imageStyle={styles.bgImgContainer}
              style={styles.cardContainer}
              source={getImage('bg_card_gradient_red')}>
              <View style={styles.titleContainer}>
                <Text
                  numberOfLines={1}
                  style={styles.titleStyle}>
                  {this.props.item.subscribeName.toUpperCase()}
                </Text>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.numberContainer}>
                  <Text style={styles.content1}>
                    {this.state.dataItem.content1}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.content2}>
                    {this.state.dataItem.content2}
                  </Text>
                </View>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.iconStyle}
                    source={getImage('ic_don_cho_duyet')}></Image>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      case 7:
        return (
          <TouchableOpacity onPress={() => { }}>
            <ImageBackground
              imageStyle={styles.bgImgContainer}
              style={styles.cardContainer}
              source={getImage('bg_card_gradient_green')}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleStyle}>
                  {this.props.item.subscribeName.toUpperCase()}
                </Text>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.numberContainer}>
                  <Text
                    numberOfLines={1}
                    style={styles.content1}>
                    {this.state.dataItem.content1}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.content2}>
                    {this.splitStr(this.state.dataItem.content2, 0, '|')}
                    {/* {this.state.dataItem.content1} */}
                  </Text>
                  <Text style={styles.content2}>
                    {this.splitStr(this.state.dataItem.content2, 1, '|')}
                  </Text>
                  <Text style={styles.content2}>
                    {this.splitStr(this.state.dataItem.content2, 2, '|')}
                  </Text>
                  <Text style={styles.content2}>
                    {this.splitStr(
                      this.splitStr(this.state.dataItem.content2, 3, '|'),
                      0,
                      '[',
                    )}
                  </Text>
                </View>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.iconStyle}
                    source={getImage('ic_current_shift')}></Image>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      case 8:
        return (
          <TouchableOpacity onPress={() => { }}>
            <ImageBackground
              imageStyle={styles.bgImgContainer}
              style={styles.cardContainer}
              source={getImage('bg_card_gradient_orange')}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleStyle}>
                  {this.props.item.subscribeName.toUpperCase()}
                </Text>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.numberContainer}>
                  <Text
                    numberOfLines={1}
                    style={styles.content1}>
                    {this.state.dataItem.content1}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.content2}>
                    {this.splitStr(this.state.dataItem.content2, 0, '|')}
                  </Text>
                  <Text style={styles.content2}>
                    {this.splitStr(this.state.dataItem.content2, 1, '|')}
                  </Text>
                  <Text style={styles.content2}>
                    {this.splitStr(this.state.dataItem.content2, 2, '|')}
                  </Text>
                  <Text style={styles.content2}>
                    {this.splitStr(
                      this.splitStr(this.state.dataItem.content2, 3, '|'),
                      0,
                      '[',
                    )}
                  </Text>
                </View>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.iconStyle}
                    source={getImage('ic_next_shift')}></Image>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
      case 9:
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ReportWorkingHourContainer');
            }}>
            <ImageBackground
              imageStyle={styles.bgImgContainer}
              style={styles.cardContainer}
              source={getImage('bg_card_gradient_blue')}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleStyle}>
                  {this.splitStr(
                    this.props.item.subscribeName.toUpperCase(),
                    0,
                    '|',
                  )}
                </Text>
                <Text style={styles.titleStyle}>
                  {this.splitStr(this.props.item.subscribeName, 1, '|')}
                </Text>
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.numberContainer}>
                  <Text
                    numberOfLines={1}
                    style={styles.content1}>
                    {this.state.dataItem.content1}
                  </Text>
                </View>
                <View style={styles.detailContainer}>
                  <Text style={styles.content2}>
                    {this.state.dataItem.content2}
                  </Text>
                </View>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.iconStyle}
                    source={getImage('ic_ot_cho_duyet')}></Image>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity >
        );
      case 10:
        return (
          <TouchableOpacity onPress={() => { }}>
            <ImageBackground
              imageStyle={styles.bgImgContainer}
              style={styles.cardContainer}
              source={getImage('bg_card_gradient_purple')}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleStyle}>
                  {this.props.item.subscribeName.toUpperCase()}
                </Text>
              </View>
              <View style={styles.contentContainer}>
                <FlatList
                  ref={'detailList'}
                  data={this.convertList(this.state.dataItem)}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    return (
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          paddingTop: Sizes.s15,
                          paddingBottom: Sizes.s15,
                        }}>
                        <View style={{ width: '50%' }}>
                          <Text style={[styles.content2, { marginLeft: 10 }]}>
                            {item.key}
                          </Text>
                        </View>
                        <View style={{ width: '50%', alignItems: 'flex-start' }}>
                          <Text
                            style={[styles.content2, { fontSize: Sizes.h24 }]}>
                            {item.value}
                          </Text>
                        </View>
                      </View>
                    );
                  }}></FlatList>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        );
    }
  }

  splitStr(str, positionGet, char) {
    // console.log("str", str)
    if (str === undefined) {
      return '';
    }
    return str.split(char)[positionGet];
  }

  convertList(list) {
    let temp = [];
    for (var [key, value] of Object.entries(list)) {
      var title = this.splitStr(key, 1, '_');
      temp.push({ key: title, value: value });
    }
    return temp;
  }

  render() {
    return <>{this.renderCard(this.props.item.subscribeID)}</>;
  }
}

let phoneWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  bgImgContainer: {
    borderRadius: 10,
  },
  cardContainer: {
    width: phoneWidth - 40,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  titleContainer: {
    width: '95%',
    paddingTop: Sizes.s10,
    paddingLeft: Sizes.s2,
  },

  iconContainer: {
    width: '5%',
    height: Sizes.s80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '97%',
    flexDirection: 'row',
  },
  numberContainer: {
    width: Sizes.s200,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Sizes.s50,
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: Sizes.s30,
  },
  logoContainer: {
    width: Sizes.s140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    width: Sizes.s80,
    height: Sizes.s80,
  },
  titleStyle: {
    marginLeft: Sizes.s10,
    fontSize: Sizes.h34,
    color: 'white',
  },
  statuStyle: {
    marginRight: Sizes.s10,
    fontSize: Sizes.h30,
  },
  content1: {
    fontSize: Sizes.h65,
    color: 'white',
  },
  content2: {
    fontSize: Sizes.h30,
    color: 'white',
  },
});

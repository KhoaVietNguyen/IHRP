import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {Sizes} from '@dungdang/react-native-basic';

import getImage from '../../../res/values/strings/iconStrS';
import PrivateViewCardMenu from './PrivateViewCardMenu';

import {getTitlePrivate} from '../../../res/values/strings/colorStr';
import {
  fontSizes,
  fontColors,
  fontView,
} from '../../../res/values/styles/appStyles';
export default class PrivateViewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden_info: true,
      info_array: [],
      hidden_info_array: [],
      status: null,
    };
  }

  getTitle = (data) => {
    var t = '';
    for (const [key, value] of Object.entries(data)) {
      if (key.includes('#')) {
        t = value;
      }
    }
    // console.log(t);
    return t;
  };

  getLogoFileName = (data) => {
    var str = '';
    for (const [key, value] of Object.entries(data)) {
      if (key.includes('#')) {
        str = key;
      }
    }
    var file = str.split('#')[1];

    return file.split('^')[0];
  };

  getDetailList = (data) => {
    // console.log(data)
    var temp_array = [];
    if (this.state.hidden_info === true) {
      for (var [key, value] of Object.entries(data)) {
        if (
          !key.includes('#') &&
          key.includes('^0') &&
          value != '' &&
          value != null
        ) {
          var item = {key, value};
          temp_array.push(item);
        }
      }
    } else {
      for (var [key, value] of Object.entries(data)) {
        if (key.includes('^0')) {
          if (
            !key.includes('#') &&
            key.includes('_') &&
            value != '' &&
            value != null
          ) {
            var item = {key, value};
            temp_array.push(item);
          }
        }
      }
      for (var [key, value] of Object.entries(data)) {
        if (key.includes('^2')) {
          if (
            !key.includes('#') &&
            key.includes('_') &&
            value != '' &&
            value != null
          ) {
            var item = {key, value};
            temp_array.push(item);
          }
        }
      }
    }
    // console.log(temp_array);
    return temp_array;
  };

  splitString = (text) => {
    var str = text.split('_')[1];
    return str.split('^')[0];
  };

  componentDidUpdate(prevProps, prevState) {}
  render() {
    return (
      <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          //console.log(this.props.data.status);
          this.setState({hidden_info: !this.state.hidden_info});
        }}>
        <View style={styles.headerContaienr}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode={'contain'}
              source={getImage(this.getLogoFileName(this.props.data))}
              style={styles.logoStyle}></Image>
          </View>
          <View style={styles.titleContainer}>
            <Text style={[styles.titleStyle,{color:getTitlePrivate(this.getLogoFileName(this.props.data))}]}>
              {this.getTitle(this.props.data)}
            </Text>
          </View>
          {this.props.AllowEdit == true ? (
            this.props.data.status === 'C' ? (
              <View style={styles.logoContainer}>
                <Image
                  source={getImage('ic_private_add_pending')}
                  style={{width: '60%', height: '60%'}}></Image>
              </View>
            ) : this.props.data.status === 'D' ? (
              <View style={styles.logoContainer}>
                <Image
                  source={getImage('ic_private_delete_pending')}
                  style={{width: '60%', height: '60%'}}></Image>
              </View>
            ) : this.props.data.status === 'U' ? (
              <View style={styles.logoContainer}>
                <Image
                  source={getImage('ic_private_edit_pending')}
                  style={{width: '60%', height: '60%'}}></Image>
              </View>
            ) : (
              <View style={styles.logoContainer}>
                <PrivateViewCardMenu
                  {...this.props}
                  id={this.props.data.id}></PrivateViewCardMenu>
              </View>
            )
          ) : (
            <View style={styles.logoContainer}>
              <Image
                source={this.state.hidden_info? getImage('ic_arrow_down'):getImage('ic_arrow_up')}
                style={{width: '30%', height: '30%', resizeMode:"contain"}} ></Image>
            </View>
          )}
        </View>
        <View style={styles.contentContainer}>
          <FlatList
            ref={'detailList'}
            data={this.getDetailList(this.props.data)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{flex: 1, alignItems: 'center', marginBottom:Sizes.s20}}>
                  <View style={styles.detailContainer}>
                    <Text style={styles.detailTitleStyle}>
                      {this.splitString(item.key)}
                    </Text>
                    <Text style={{fontSize: Sizes.h34,}}>{item.value}</Text>
                  </View>
                </View>
              );
            }}></FlatList>
        </View>
      </TouchableOpacity>
      </View>
    );
  }
}
let phoneWidth = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  mainContainer: {
    width: phoneWidth - 10,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor:fontColors.border,
    borderWidth:fontSizes.border
  },
  headerContaienr: {
    width: '100%',
    height: phoneWidth / 8,
    flexDirection: 'row',
  },
  contentContainer: {
    width: '100%',
    paddingBottom:Sizes.s30
  },
  logoContainer: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBorder: {
    width: '60%',
    height: '60%',
    backgroundColor: '#ffa14f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  logoStyle: {
    width: '60%',
    height: '60%',
    // backgroundColor:'green',
  },
  titleContainer: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  detailContainer: {
    width: '90%',
  },
  detailTitleStyle: {
    fontSize: fontSizes.title,
    color: 'grey', marginBottom:Sizes.s10
  },
  titleStyle: {
    fontSize: fontSizes.title,
  },
});

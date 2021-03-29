import React, {Component} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import CustomHeader from '../../custom/CustomHeader';

import {Sizes} from '@dungdang/react-native-basic';
import getImage from '../../../res/values/strings/iconStrS';
import {colorApplicationHistory} from '../../../res/values/strings/colorStr';
import {appStrS} from '../../../res/values/strings/appStrS';
import {userProfile} from '../../../config/settings'
export default class HistoryList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <CustomHeader
          typeIconLeft={'back'}
          title={userProfile.LangID === 'VN' ? appStrS.vn.ApplicationHistory.title : appStrS.en.ApplicationHistory.title}
          onPressLeft={() => {
            this.props.navigation.goBack();
          }}></CustomHeader>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <FlatList
            ref={'detailList'}
            data={this.props.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{flex: 1, alignItems: 'center', marginVertical: 8}}>
                  <HistoryCard {...this.props} data={item}></HistoryCard>
                  {/* <Text>ABC</Text> */}
                </View>
              );
            }}></FlatList>
        </View>
      </SafeAreaView>
    );
  }
}

class HistoryCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.iconContainer}>
            <Image source={getImage('ic_emp')} style={styles.iconStyle}></Image>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameStyle}>{this.props.data.empName}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.statuStyle,
                {color: getStatusColor(this.props.data.statusID)},
              ]}>
              {this.props.data.status}
            </Text>
          </View>
        </View>
        <View style={styles.actionDate}>
          <View style={{}}>
            <Text style={{color: 'grey'}}>Ngày thao tác</Text>
          </View>
          <View style={{}}>
            <Text style={{fontSize: 17}}>{this.props.data.actionDate}</Text>
          </View>
        </View>
      </View>
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
  }
};

let phoneWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  cardContainer: {
    width: phoneWidth - 10,
    height: Sizes.s200,
    borderRadius: 5,
    borderWidth:1,
    borderColor:"grey",
    elevation: 5,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  infoContainer: {
    width: '95%',
    height: Sizes.s80,

    flexDirection: 'row',
  },
  actionDate: {
    width: '95%',
    height: Sizes.s80,
  },
  iconContainer: {
    width: '5%',
    height: Sizes.s80,

    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    width: '55%',
    height: Sizes.s80,

    justifyContent: 'center',
  },
  statusContainer: {
    width: '40%',
    height: Sizes.s80,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconStyle: {
    width: Sizes.s40,
    height: Sizes.s40,
  },
  nameStyle: {
    marginLeft: Sizes.s10,
    fontSize: 18,
  },
  statuStyle: {
    marginRight: Sizes.s10,
    fontSize: 18,
  },
});

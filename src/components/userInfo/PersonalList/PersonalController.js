import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import getImage from '../../../res/values/strings/iconStrS';
export default class PersonalController extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: 'private_ic02',
    };
  }

  componentDidUpdate(prev) {
    if (this.props.item !== prev.item) {
      if (this.props.item !== undefined) {
        this.setState({});
      }
    }
  }

  render() {
    return (
      <View style={styles.controlContainer}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            if (this.props.item.id == 11) {
              this.props.parentFlatList.props.navigation.navigate(
                'GeneralList',
                {functionName: this.props.item.functionName},
              );
            } else {
              this.props.parentFlatList.props.navigation.navigate(
                'PrivateView',
                {
                  IdFunction: this.props.item.id,
                  functionName: this.props.item.functionName,
                  allowEdit: this.props.item.allowEdit,
                },
              );
            }
          }}>
          <View style={styles.logoContainer}>
            <Image
              resizeMode={'contain'}
              style={styles.logoStyle}
              defaultSource={require('../../../res/icon/private_ic01.png')}
              source={getImage(this.props.item.src)}></Image>
          </View>
          <View style={styles.captionContainer}>
            <Text style={styles.captionStyle}>
              {this.props.item.functionName}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
let item_width_height = Dimensions.get('screen').width / 3;
const styles = StyleSheet.create({
  controlContainer: {
    width: item_width_height,
    height: item_width_height,
  },
  logoContainer: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: '40%',
    height: '66.67%',
  },
  captionStyle: {
    alignItems: 'center',
    height: '100%',
    fontSize: 14,
    textAlign: 'center',
  },
});

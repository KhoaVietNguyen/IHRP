import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import getImage from '../../../res/values/strings/iconStrS';
import { CustomButton } from '../../custom/CustomButton';
import Loading from '../../custom/Loading'
import { fontSizes, fontColors, fontView } from '../../../res/values/styles/appStyles'
import { colorForm } from '../../../res/values/strings/colorStr'
import { userProfile } from '../../../config/settings';
export default class GeneralList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      allStatus: false
    };

  }
  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.props.Get_PrivateGeneral({});
      }
    );

  }

  componentDidUpdate(PreProps) {
    if (this.props.data !== PreProps.data && this.props.data != null) {
      this.checkAllStatus();
      this.setState({ data: this.props.data });

    }

    if (this.props.commit_submit !== PreProps.commit_submit && this.props.commit_submit !== null) {
      this.props.Get_PrivateGeneral({});
      this.AlertSubmit();
    }
  }

  checkAllStatus() {
    for (let item of this.props.data) {
      if (item.status === 'U') {
        console.log("true")
        this.setState({ allStatus: true })
        break;
      }
    }

  }

  CheckStatus() {
    for (let item of this.state.data) {
      if (item.status === 'C') {
        return true;
      }
    }
    return false;
  }

  AlertSubmit = () => {
    Alert.alert(
      userProfile.LangID === 'VN' ? 'Thông báo ' : 'Notice',
      `${this.props.message_submit}`,
      [
        {
          text: userProfile.LangID === 'VN' ? 'Đóng' : 'Cancel',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.loading === true && <Loading></Loading>}
        <FlatList
          style={{ flex: 1 }}
          data={this.state.data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.columnContainer}
              onPress={() => {
                console.log("M<NN<", this.state.data)
                this.props.navigation.navigate('PrivateGenViewContainer', {
                  id: item.id,
                  allowEdit: item.allowEdit,
                  desc: item.desc,
                  status: this.state.allStatus
                });
              }}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logoStyle}
                  source={getImage(item.src)}
                  resizeMode="contain"></Image>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.textStyle}>{item.desc}</Text>
              </View>
              <View style={styles.logoContainer}>
                {item.status === 'U' ? (
                  <Image
                    style={{ width: '40%', height: '40%' }}
                    source={getImage('ic_peding_reg')}
                    resizeMode="contain"></Image>
                ) : (
                    <Image
                      style={{ width: '40%', height: '40%' }}
                      source={getImage('ic_arrow_right')}
                      resizeMode="contain"></Image>
                  )}
              </View>
            </TouchableOpacity>
          )}></FlatList>
        {this.CheckStatus() == true ? (
          <View style={{ width: '95%', alignSelf: 'center' }}>
            <CustomButton
              onPress={() => {
                this.props.Submit_PrivateGeneralAction({});
              }}
              type="send"
              title={userProfile.LangID === 'VN' ? "Chuyển phê duyệt" : 'Transfer approval'}
            />
          </View>
        ) : (
            <View></View>
          )}
      </View>
    );
  }
}
let phoneWidth = Dimensions.get('screen').width;
let phoneHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  columnContainer: {
    flexDirection: 'row',
    flex: 1,
    height: phoneHeight / 12,
    backgroundColor: colorForm.inputForm,
    borderBottomWidth: fontSizes.border,
    borderColor: fontColors.border
  },
  logoContainer: {
    width: '15%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoStyle: {
    width: '60%',
    height: '60%',
  },
  textContainer: {
    width: '70%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textStyle: {
    marginLeft: 10,
    fontSize: fontSizes.title
  },
});

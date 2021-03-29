import React, { Component } from 'react';
import { connect } from 'react-redux';
import PersonalList from '../../components/userInfo/PersonalList';
import {
  Get_PersonalListAction,
  Get_PersonalProfileAction,
} from './../../redux/actions/userInfo/PersonalListAction';
import {
  getUser2Action
} from './../../redux/actions/home/homeActions'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { SafeAreaView } from 'react-native'
import CustomHeader from '../../components/custom/CustomHeader';
import Loading from '../../components/custom/Loading'
import { Alert } from 'react-native'

import { userProfile } from '../../config/settings'
import { replaceScreenLoginAction } from '../../redux/actions/index'
import UserProfile from '../../components/userInfo/PersonalList/UserProfile';
import { deleteTokenNotiAction } from '../../redux/actions/index'
class PersonalListContainer extends Component {
  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.props.replaceScreenLoginAction({
          replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
        })
      }
    );
  }

  logOutAlert() {
    Alert.alert(
      userProfile.LangID === 'VN' ? 'Thông báo' : 'Notice',
      userProfile.LangID === 'VN' ? 'Bạn có chắc muốn đăng xuất không?' : 'Are you sure you want to log out?',
      [
        {
          text: userProfile.LangID === "VN" ? 'Đóng' : 'Cancel',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
        {
          text: userProfile.LangID === "VN" ? 'Xác nhận' : 'Confirm',
          onPress: () => {
            userProfile.Stoken = ""
            // userProfile.username = "VN"
            // userProfile.LangID = ""
            // userProfile.AppVersion = userProfile.AppVersion
            this.props.navigation.replace("LoginContainer")
          },
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
        {/* <CustomHeader
          typeIconRight={'logOut'}
          onPressRight={() => {
            this.logOutAlert()
            // this.props.navigation.navigate("ApplicationHistoryContainer")
          }}></CustomHeader> */}
        {this.props.loading === true && <Loading ></Loading>}
        <PersonalList style={{ flex: 1 }} {...this.props}></PersonalList>
      </SafeAreaView>
    );
  }
}

const DeleteData = [2, 3, 31, 33, 34, 36];

function mapData(datalist) {
  // console.log('Map Data', datalist);
  let tempList = [];
  try {
    for (var item of datalist) {
      flag = 0;
      for (var index of DeleteData) {
        if (item.id == index) {
          flag = 1;
          break;
        }
      }
      if (flag == 0) {
        tempList.push(item);
      }
    }
    // console.log('tempList', tempList);
  } catch (error) { }
  return tempList;
}

const mapStateToProps = (state) => {
  return {
    error: state.getPersonalListReducers.error,
    message: state.getPersonalListReducers.message,
    loading: state.getPersonalListReducers.loading,
    loading_profile: state.getPersonalProfileReducers.loading,
    // data: mapData(state.getPersonalListReducers.data),
    resultCode: state.getPersonalListReducers.resultCode,
    countItem: state.getPersonalListReducers.countItem,
    langID: state.getPersonalListReducers.langID,
    commit: state.getPersonalListReducers.commit,
    data_profile: state.getPersonalProfileReducers.data,
    //  data: !objectIsNull(state.homeReducers.dataGetUser2) ? state.homeReducers.dataGetUser2.info5.dataItem : [],
    dataGetUser2: state.homeReducers.dataGetUser2
    // data:state.homeReducers.dataGetUser2
    //data:[]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Get_PersonalList: (data) => {
      dispatch(Get_PersonalListAction(data));
    },
    Get_PersonalProfile: (data) => {
      dispatch(Get_PersonalProfileAction(data));
    },
    getUser2Action: () => {
      dispatch(getUser2Action())
    },
    replaceScreenLoginAction: (input) => {
      dispatch(replaceScreenLoginAction(input));
    },
    deleteTokenNotiAction: () => {
      dispatch(deleteTokenNotiAction())
    }

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalListContainer);

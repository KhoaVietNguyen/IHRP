import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrivateViewList from '../../components/userInfo/PrivateView/PrivateViewList';
import { Get_PersonalFormListAction, Delete_PrivateFormAction } from './../../redux/actions/userInfo/PrivateViewAction';
import { SafeAreaView, View } from 'react-native';
import CustomHeader from '../../components/custom/CustomHeader';
import { CustomButton } from '../../components/custom/CustomButton';
import Loading from '../../components/custom/Loading';
import { appStrS } from '../../res/values/strings/appStrS'
import { userProfile } from '../../config/settings'
import { replaceScreenLoginAction } from '../../redux/actions/index'
class PrivateViewFormListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IdFunction: this.props.navigation.getParam('IdFunction', 'NO-ID'),
      title: this.props.navigation.getParam('title', 'No-Function Name'),
      allowEdit: this.props.navigation.getParam('allowEdit'),
    };
  }
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
  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
        {this.props.loading === true && <Loading></Loading>}
        <CustomHeader
          typeIconLeft={'back'}
          title={this.state.title}
          onPressLeft={() => {
            this.props.navigation.goBack();
          }}></CustomHeader>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <PrivateViewList
            {...this.props}
            IdFunction={this.state.IdFunction}
            AllowEdit={this.state.allowEdit}
            Title={this.state.title}></PrivateViewList>
        </View>
        <View style={{width: '95%', alignSelf: 'center'}}>
          <CustomButton
            type="new"
            title={userProfile.LangID === 'VN' ? appStrS.vn.button.new : appStrS.en.button.new}
            onPress={() => {
              this.props.navigation.navigate('PrivateViewApplication', {
                IdFunction: this.state.IdFunction,
                title: this.state.title,
                recordId: '',
              });
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  // console.log('State Reducers', state.getPersonalFormListReducers);
  return {
    loading: state.getPersonalFormListReducers.loading,
    data: state.getPrivateViewReducers.data,
    dataFormList: state.getPersonalFormListReducers.data,
    countItem: state.getPersonalFormListReducers.countItem,
    deleteCode: state.deletePrivateFormReducers.resultCode,
    commit: state.getPersonalFormListReducers.commit,
    message_FormList: state.getPersonalFormListReducers.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Get_PersonalFormListAction: (data) => {
      dispatch(Get_PersonalFormListAction(data));
    },
    Delete_PrivateFormAction: (data) => {
      dispatch(Delete_PrivateFormAction(data))
    },
    replaceScreenLoginAction: (data) => {
      dispatch(replaceScreenLoginAction(data))
    },

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateViewFormListContainer);

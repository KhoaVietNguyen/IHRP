import React, { Component } from 'react';
import { connect } from 'react-redux';
import GeneralList from '../../components/userInfo/PrivateGeneral/GeneralList';
import {
  Get_PrivateGeneralAction,
  Submit_PrivateGeneralAction,
} from './../../redux/actions/userInfo/PrivateGeneralAction';
import CustomHeader from '../../components/custom/CustomHeader';
import { SafeAreaView } from 'react-native';
import Loading from '../../components/custom/Loading';
import { replaceScreenLoginAction } from '../../redux/actions/index'
class PrivateGeneralContainer extends Component {
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
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <CustomHeader
          typeIconLeft={'back'}
          title={this.props.navigation.getParam("functionName", "No-Title")}
          onPressLeft={() => {
            this.props.navigation.goBack();
          }}></CustomHeader>

        <GeneralList {...this.props}></GeneralList>

      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("General Container Reducers AAAAAA", state)
  return {
    error: state.getPrivateGeneralReducers.error,
    message: state.getPrivateGeneralReducers.message,
    loading: state.getPrivateGeneralReducers.loading,
    loading_profile: state.getPersonalProfileReducers.loading,
    data: state.getPrivateGeneralReducers.data,
    resultCode: state.getPrivateGeneralReducers.resultCode,
    countItem: state.getPrivateGeneralReducers.countItem,
    langID: state.getPrivateGeneralReducers.langID,
    commit: state.getPrivateGeneralReducers.commit,

    commit_submit: state.submitPrivateGeneralReducers.commit,
    error_submit: state.submitPrivateGeneralReducers.error,
    message_submit: state.submitPrivateGeneralReducers.message,
    loading_submit: state.submitPrivateGeneralReducers.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Get_PrivateGeneral: (data) => {
      dispatch(Get_PrivateGeneralAction(data));
    },
    Submit_PrivateGeneralAction: (data) => {
      dispatch(Submit_PrivateGeneralAction(data));
    },
    replaceScreenLoginAction: (input) => {
      dispatch(replaceScreenLoginAction(input));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateGeneralContainer);

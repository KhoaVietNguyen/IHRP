import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrivateViewForm from '../../components/userInfo/PrivateView/PrivateViewForm';
import {
  Get_PrivateForm,
  Get_PrivateListAction,
  Save_PrivateFormAction,
} from './../../redux/actions/userInfo/PrivateViewAction';
import CustomHeader from '../../components/custom/CustomHeader';
import { SafeAreaView, View } from 'react-native'
import Loading from '../../components/custom/Loading'
import { Get_PersonalFormListAction } from './../../redux/actions/userInfo/PrivateViewAction';
import {replaceScreenLoginAction} from '../../redux/actions/index'
class PrivateViewFormContainer extends Component {
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
        <CustomHeader
          typeIconLeft={'back'}
          title={this.props.navigation.getParam('title', 'NO-ID')}
          onPressLeft={() => { this.props.navigation.goBack(); }}></CustomHeader>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {(this.props.loading === true || this.props.loading_dataSource === true) && <Loading></Loading>}
          <PrivateViewForm
            infoID={this.props.navigation.getParam('IdFunction', 'NO-ID')}
            recordID={this.props.navigation.getParam('RecordID', '')}
            {...this.props}></PrivateViewForm>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('PrivateViewFormContainer', state.savePrivateFormReducers);
  return {
    commit: state.getPrivateFormReducers.commit,
    error: state.getPrivateFormReducers.error,
    message: state.getPrivateFormReducers.message,
    loading: state.getPrivateFormReducers.loading,
    loading_dataSource: state.getPrivateListReducers.loading,
    data: state.getPrivateFormReducers.data,
    resultCode: state.getPrivateFormReducers.resultCode,
    dataSource: state.getPrivateListReducers.data,
    itemDataSource: state.getPrivateListReducers.dataSource,
    resultCode_Save: state.savePrivateFormReducers.resultCode,
    message_save: state.savePrivateFormReducers.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Get_PrivateForm: (data) => {
      dispatch(Get_PrivateForm(data));
    },
    Get_PrivateListAction: (data) => {
      dispatch(Get_PrivateListAction(data));
    },
    Save_PrivateFormAction: (data) => {
      dispatch(Save_PrivateFormAction(data));
    },
    Get_PersonalFormListAction: (data) => {
      dispatch(Get_PersonalFormListAction(data))
    },
    replaceScreenLoginAction: (input) => {
      dispatch(replaceScreenLoginAction(input))
    },
    
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateViewFormContainer);

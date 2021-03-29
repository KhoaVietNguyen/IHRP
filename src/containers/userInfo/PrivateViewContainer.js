import React, { Component } from 'react';
import { connect } from 'react-redux';
import PrivateViewList from '../../components/userInfo/PrivateView/PrivateViewList';
import { Get_PrivateViewAction, Get_PersonalFormListAction } from './../../redux/actions/userInfo/PrivateViewAction';
import { View, SafeAreaView } from 'react-native';
import CustomHeader from '../../components/custom/CustomHeader';
import Loading from '../../components/custom/Loading'
import { replaceScreenLoginAction } from '../../redux/actions/index'
class PrivateViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      IdFunction: this.props.navigation.getParam('IdFunction', 'NO-ID'),
      title: this.props.navigation.getParam('functionName', 'No-Function Name'),
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
        {this.props.navigation.getParam('allowEdit') ? (
          <CustomHeader
            typeIconLeft={'back'}
            title={this.state.title}
            onPressLeft={() => {
              this.props.navigation.goBack();
            }}
            typeIconRight={'edit'}
            onPressRight={() => {
              this.props.navigation.navigate('PrivateViewFormListContainer', {
                IdFunction: this.state.IdFunction,
                title: this.state.title,
                allowEdit: this.state.allowEdit
              });
            }}></CustomHeader>
        ) : (
            <CustomHeader
              typeIconLeft={'back'}
              title={this.state.title}
              onPressLeft={() => {
                this.props.navigation.goBack();
              }}></CustomHeader>
          )}
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {this.props.loading === true && <Loading ></Loading>}
          <PrivateViewList
            {...this.props}
            IdFunction={this.state.IdFunction}
            AllowEdit={false}></PrivateViewList>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('State Reducers', state);
  return {
    error: state.getPrivateViewReducers.error,
    message: state.getPrivateViewReducers.message,
    loading: state.getPrivateViewReducers.loading,
    data: state.getPrivateViewReducers.data,
    dataFormList: state.getPersonalFormListReducers.data,
    resultCode: state.getPrivateViewReducers.resultCode,
    countItem: state.getPrivateViewReducers.countItem,
    langID: state.getPrivateViewReducers.langID,
    commit: state.getPrivateViewReducers.commit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Get_PrivateView: (data) => {
      dispatch(Get_PrivateViewAction(data));
    },
    Get_PersonalFormListAction: (data) => {
      dispatch(Get_PersonalFormListAction(data))
    },
    replaceScreenLoginAction: (input) => {
      dispatch(replaceScreenLoginAction(input));
    },

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateViewContainer);

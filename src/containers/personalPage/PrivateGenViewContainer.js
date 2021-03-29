//PhucNT34
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PersonalPage from '../../components/userInfo/PersonalPage/PersonalPage';
import {
  getPrivateGenViewAction,
  RemovePrivateGenViewAction,
} from '../../redux/actions/personalPage/PersonalPageAction';
import { Get_PrivateGeneralAction } from './../../redux/actions/userInfo/PrivateGeneralAction';
import { replaceScreenLoginAction } from '../../redux/actions/index'
class PersonalPageContainer extends Component {
  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.props.replaceScreenLoginAction({
          replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
        })
      }
    );
    this.props.getPrivateGenViewAction(
      this.props.navigation.getParam('id', 'No id'),
    );
  }

  render() {
    return (
      <PersonalPage
        {...this.props}
        id={this.props.navigation.getParam('id', 'No id')}
        desc={this.props.navigation.getParam('desc', 'No desc')}
        allowEdit={this.props.navigation.getParam('allowEdit', 'No allowEdit')}
        status={this.props.navigation.getParam('status', false)}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPrivateGenViewAction: (input) => {
      dispatch(getPrivateGenViewAction(input));
    },
    RemovePrivateGenViewAction: (input) => {
      dispatch(RemovePrivateGenViewAction(input));
    },
    Get_PrivateGeneral: (data) => {
      dispatch(Get_PrivateGeneralAction(data));
    },
    replaceScreenLoginAction: (input) => {
      dispatch(replaceScreenLoginAction(input));
    },

  };
};

const mapStateToProps = (state) => {
  // console.log('state', state.getPrivateGenViewReducers);
  return {
    error: state.getPrivateGenViewReducers.error,
    loading: state.getPrivateGenViewReducers.loading,
    dataItem: state.getPrivateGenViewReducers.dataItem,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalPageContainer);

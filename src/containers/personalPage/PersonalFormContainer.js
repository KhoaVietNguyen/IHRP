//PhucNT34
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PersonalForm from '../../components/userInfo/PersonalPage/PersonalForm';
import {
  getPersonalFormAction,
  getPersonalFormSourceAction,
  savePersonalFormAction,
} from '../../redux/actions/personalPage/PersonalPageAction';
import { replaceScreenLoginAction } from '../../redux/actions/index'
class PersonalFormContainer extends Component {
  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.props.replaceScreenLoginAction({
          replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
        })
      }
    );
    this.props.getPersonalFormAction(
      this.props.navigation.getParam('id', 'No id'),
    );
  }

  render() {
    return (
      <PersonalForm
        {...this.props}
        desc={this.props.navigation.getParam('desc', 'No desc')}
        status={this.props.navigation.getParam('status', false)}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonalFormAction: (input) => {
      // console.warn('getPrivateGenViewAction 1', input);
      dispatch(getPersonalFormAction(input));
    },
    getPersonalFormSourceAction: (input) => {
      dispatch(getPersonalFormSourceAction(input));
    },
    savePersonalFormAction: (input) => {
      dispatch(savePersonalFormAction(input));
    },
    replaceScreenLoginAction: (input) => {
      dispatch(replaceScreenLoginAction(input));
    },

  };
};

const mapStateToProps = (state) => {
  return {
    error: state.getPersonalFormReducers.error,
    loading: state.getPersonalFormReducers.loading,
    dataItem: state.getPersonalFormReducers.dataItem,
    dataSource: state.getPersonalFormSourceReducers.dataItem,
    loading_DataSource: state.getPersonalFormSourceReducers.loading,
    itemDataSource: state.getPersonalFormSourceReducers.dataSource,
    saveCommit: state.savePersonalFormReducers.commit,
    saveMessage: state.savePersonalFormReducers.message,
    loading_Save: state.savePersonalFormReducers.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalFormContainer);

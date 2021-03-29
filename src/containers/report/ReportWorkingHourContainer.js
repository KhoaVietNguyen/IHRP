import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReportWorkingHours from '../../components/report/ReportWorkingHours';
import {
  Get_ReportWorkingHour
} from './../../redux/actions/report/ReportAction';
import { SafeAreaView } from 'react-native'
import CustomHeader from '../../components/custom/CustomHeader';
import Loading from '../../components/custom/Loading'
import { Alert } from 'react-native'
import { userProfile } from '../../config/settings'
import { replaceScreenLoginAction } from '../../redux/actions/index'
class ReportWorkingHourContainer extends Component {
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
      <SafeAreaView style={{ flex: 1 }} >
        <ReportWorkingHours {...this.props}></ReportWorkingHours>
      </SafeAreaView>
    );
  }
}



const mapStateToProps = (state) => {
  // console.log('State Reducers', state);
  return {
    fetching: state.reportWorkingHourReducers.loading,
    data: state.reportWorkingHourReducers.data,
    error: state.reportWorkingHourReducers.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Get_ReportWorkingHour: (data) => {
      dispatch(Get_ReportWorkingHour(data));
    },
    replaceScreenLoginAction: (input) => {
      dispatch(replaceScreenLoginAction(input));
    },


  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReportWorkingHourContainer);

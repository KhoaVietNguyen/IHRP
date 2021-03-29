import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getDashBoardApprovalAction,
  getDashBoardCurrentShiftAction,
  getDashBoardLeaveInfoAction,
  getDashBoardNextShiftAction,
  getDashBoardWorkingHourAction, getDashBoardFormAction
} from './../../redux/actions/dashboard/DashBoardAction';
import { SafeAreaView } from 'react-native';

import Loading from '../../components/custom/Loading';
import DashBoardList from '../../components/dashboard/DashBoardList';
import {replaceScreenLoginAction} from '../../redux/actions/index'
class DashBoardContainer extends Component {
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
      <SafeAreaView style={{ flex: 1 }}>
        <DashBoardList style={{ flex: 1 }} {...this.props}></DashBoardList>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("object", state.dashBoardFormReducers)
  return {
    fetchingApproval: state.dashBoardReducers.fetchingApproval,
    dataApproval: state.dashBoardReducers.dataApproval,
    errorApproval: state.dashBoardReducers.errorApproval,

    fetchingCurrentShift: state.dashBoardReducers.fetchingCurrentShift,
    dataCurrentShift: state.dashBoardReducers.dataCurrentShift,
    errorCurrentShift: state.dashBoardReducers.errorCurrentShift,

    fetchingNextShift: state.dashBoardReducers.fetchingNextShift,
    dataNextShift: state.dashBoardReducers.dataNextShift,
    errorNextShift: state.dashBoardReducers.errorNextShift,

    fetchingWorkingHour: state.dashBoardReducers.fetchingWorkingHour,
    dataWorkingHour: state.dashBoardReducers.dataWorkingHour,
    errorWorkingHour: state.dashBoardReducers.errorWorkingHour,

    fetchingLeaveInfo: state.dashBoardReducers.fetchingLeaveInfo,
    dataLeaveInfo: state.dashBoardReducers.dataLeaveInfo,
    errorLeaveInfo: state.dashBoardReducers.errorLeaveInfo,

    fetchingForm: state.dashBoardFormReducers.fetchingForm,
    dataForm: state.dashBoardFormReducers.dataForm,
    errorForm: state.dashBoardFormReducers.errorForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDashBoardApprovalAction: (data) => {
      dispatch(getDashBoardApprovalAction(data))
    },
    getDashBoardCurrentShiftAction: (data) => {
      dispatch(getDashBoardCurrentShiftAction(data))
    },
    getDashBoardNextShiftAction: (data) => {
      dispatch(getDashBoardNextShiftAction(data))
    },
    getDashBoardWorkingHourAction: (data) => {
      dispatch(getDashBoardWorkingHourAction(data))
    },
    getDashBoardLeaveInfoAction: (data) => {
      dispatch(getDashBoardLeaveInfoAction(data))
    },
    getDashBoardFormAction: (data) => {
      dispatch(getDashBoardFormAction(data))
    },
    replaceScreenLoginAction: (input) => {
      dispatch(replaceScreenLoginAction(input))
    },
    
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DashBoardContainer);

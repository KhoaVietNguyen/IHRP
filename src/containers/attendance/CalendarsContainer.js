//PhucNT34
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Calendars from '../../components/attendance/Calendars'
import {
    getInfoCheckInOutInDayAction,

    // action lấy thông tin check in out WFH trong ngày
    getWFHInfoCheckInOutInDayAction,
} from '../../redux/actions/home/homeActions'
import { getHistoryCalendarsCheckInOutInMonthAction, getWFHInfoCheckInOutInMonthAction } from '../../redux/actions/attendance'
import { replaceScreenLoginAction } from '../../redux/actions/index'
class CalendarsContainer extends Component {
    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            "willFocus",
            () => {
                this.props.replaceScreenLoginAction({
                    replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
                })
            }
        );

        this.props.getInfoCheckInOutInDayAction({})
        // this.props.getHistoryCalendarsCheckInOutInMonthAction({})
    }

    render() {
        return <Calendars {...this.props} />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getInfoCheckInOutInDayAction: input => {
            dispatch(getInfoCheckInOutInDayAction(input));
        },
        getHistoryCalendarsCheckInOutInMonthAction: input => {
            // console.warn('getHistoryCalendarsCheckInOutInMonthAction 1', input);
            dispatch(getHistoryCalendarsCheckInOutInMonthAction(input));
        },
        replaceScreenLoginAction: input => {
            dispatch(replaceScreenLoginAction(input));
        },

        // action lấy thông tin check in out WFH trong ngày
        getWFHInfoCheckInOutInDayAction: input => {
            dispatch(getWFHInfoCheckInOutInDayAction(input));
        },

        // action lấy thông tin check in out WFH theo tháng
        getWFHInfoCheckInOutInMonthAction: input => {
            dispatch(getWFHInfoCheckInOutInMonthAction(input));
        },
    };
};

const mapStateToProps = state => {
    // console.log('state.homeReducers.dataWFHInfoCheckInOutInDay: ', state.homeReducers.dataWFHInfoCheckInOutInDay)
    return {
        errorWifiInfoCheckInOutInDay: state.homeReducers.errorWifiInfoCheckInOutInDay,
        fetchingWifiInfoCheckInOutInDay: state.homeReducers.fetchingWifiInfoCheckInOutInDay,
        dataWifiInfoCheckInOutInDay: state.homeReducers.dataWifiInfoCheckInOutInDay,

        errorWifiInfoCheckInOutInMonth: state.getHistoryCalendarsCheckInOutInMonthReducers.errorWifiInfoCheckInOutInMonth,
        loadingWifiInfoCheckInOutInMonth: state.getHistoryCalendarsCheckInOutInMonthReducers.loadingWifiInfoCheckInOutInMonth,
        dataWifiInfoCheckInOutInMonth: state.getHistoryCalendarsCheckInOutInMonthReducers.dataWifiInfoCheckInOutInMonth,

        // Dữ liệu thông tin check in out WFH trong ngày
        fetchingWFHInfoCheckInOutInDay: state.homeReducers.fetchingWFHInfoCheckInOutInDay,
        dataWFHInfoCheckInOutInDay: state.homeReducers.dataWFHInfoCheckInOutInDay,
        errorWFHInfoCheckInOutInDay: state.homeReducers.errorWFHInfoCheckInOutInDay,
    
        // Dữ liệu thông tin check in out WFH theo tháng
        errorWFHInfoCheckInOutInMonth: state.getHistoryCalendarsCheckInOutInMonthReducers.errorWFHInfoCheckInOutInMonth,
        fetchingWFHInfoCheckInOutInMonth: state.getHistoryCalendarsCheckInOutInMonthReducers.fetchingWFHInfoCheckInOutInMonth,
        dataWFHInfoCheckInOutInMonth: state.getHistoryCalendarsCheckInOutInMonthReducers.dataWFHInfoCheckInOutInMonth,
    }; 
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarsContainer);
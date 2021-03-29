import * as React from 'react'
import MyApplicationSearch from '../../components/application/MyApplicationSearch'
import { connect } from 'react-redux'
import {
    getTypesLeaveApplication,
    searchLeaveApplicationAction,
    searchBusinessTripApplicationAction,
    searchOverTimeApplicationAction,
    getListStatusOverTimeApplicationAction,

    getAdjustmentStatusLogTMSApplicationAction,
    getApprovalStatusLogTMSApplicationAction,
    getFingerPrintRecordLogTMSApplicationAction,
    searchLogTMSApplicationAction,
} from '../../redux/actions/application/applicationActions'
import {replaceScreenLoginAction} from '../../redux/actions/index'
class MyApplicationSearchContainer extends React.Component {
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
        return <MyApplicationSearch {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getTypesLeaveApplication: () => {
            dispatch(getTypesLeaveApplication())
        },
        searchLeaveApplicationAction: (input) => {
            dispatch(searchLeaveApplicationAction(input))
        },
        searchBusinessTripApplicationAction: (input) => {
            dispatch(searchBusinessTripApplicationAction(input))
        },


        searchOverTimeApplicationAction: (input) => {
            dispatch(searchOverTimeApplicationAction(input))
        },

        getListStatusOverTimeApplicationAction: (input) => {
            dispatch(getListStatusOverTimeApplicationAction(input))
        },

        getAdjustmentStatusLogTMSApplicationAction: () => {
            dispatch(getAdjustmentStatusLogTMSApplicationAction())
        },

        getApprovalStatusLogTMSApplicationAction: () => {
            dispatch(getApprovalStatusLogTMSApplicationAction())
        },

        getFingerPrintRecordLogTMSApplicationAction: () => {
            dispatch(getFingerPrintRecordLogTMSApplicationAction())
        },
        searchLogTMSApplicationAction: (input) => {
            dispatch(searchLogTMSApplicationAction(input))
        },
        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input))
        },
        
    }
}

const mapStateToProps = (state) => {
    return {
        // leave
        fetchingTypesLeave: state.leaveApplicationReducers.fetchingTypesLeave,
        dataTypesLeave: state.leaveApplicationReducers.dataTypesLeave,
        errorTypesLeave: state.leaveApplicationReducers.errorTypesLeave,

        fetchingSearch: state.leaveApplicationReducers.fetchingSearch,
        dataSearch: state.leaveApplicationReducers.dataSearch,
        errorSearch: state.leaveApplicationReducers.errorSearch,


        // business Trip
        fetchingSearchBusinessTrip: state.businessTripApplicationReducers.fetchingSearchBusinessTrip,
        dataSearchBusinessTrip: state.businessTripApplicationReducers.dataSearchBusinessTrip,
        errorSearchBusinessTrip: state.businessTripApplicationReducers.errorSearchBusinessTrip,


        // over Time
        fetchingSearchOverTimeApplication: state.overTimeApplicationReducers.fetchingSearchOverTimeApplication,
        dataSearchOverTimeApplication: state.overTimeApplicationReducers.dataSearchOverTimeApplication,
        errorSearchOverTimeApplication: state.overTimeApplicationReducers.errorSearchOverTimeApplication,

        fetchingStatusOverTime: state.overTimeApplicationReducers.fetchingStatusOverTime,
        dataStatusOverTime: state.overTimeApplicationReducers.dataStatusOverTime,
        errorStatusOverTime: state.overTimeApplicationReducers.errorStatusOverTime,


        // log TMS

        fetchingAdjustmentStatus: state.logTMSApplicationReducers.fetchingAdjustmentStatus,
        dataAdjustmentStatus: state.logTMSApplicationReducers.dataAdjustmentStatus,
        errorAdjustmentStatus: state.logTMSApplicationReducers.errorAdjustmentStatus,

        fetchingFingerPrintRecord: state.logTMSApplicationReducers.fetchingFingerPrintRecord,
        dataFingerPrintRecord: state.logTMSApplicationReducers.dataFingerPrintRecord,
        errorFingerPrintRecord: state.logTMSApplicationReducers.errorFingerPrintRecord,

        fetchingApprovalStatus: state.logTMSApplicationReducers.fetchingApprovalStatus,
        dataApprovalStatus: state.logTMSApplicationReducers.dataApprovalStatus,
        errorApprovalStatus: state.logTMSApplicationReducers.errorApprovalStatus,

        fetchingSearchLogTMSApplication: state.logTMSApplicationReducers.fetchingSearchLogTMSApplication,
        dataSearchLogTMSApplication: state.logTMSApplicationReducers.dataSearchLogTMSApplication,
        errorSearchLogTMSApplication: state.logTMSApplicationReducers.errorSearchLogTMSApplication,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyApplicationSearchContainer)
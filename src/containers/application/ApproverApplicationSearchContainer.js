import * as React from 'react'
import ApproverApplicationSearch from '../../components/application/ApproverApplicationSearch'
import { connect } from 'react-redux'
import {
    getTypesLeaveApplication,
    getListTypeBusinessTripApplicationAction,
    getListStatusOverTimeApplicationAction,

    getAdjustmentStatusLogTMSApplicationAction,
    getApprovalStatusLogTMSApplicationAction,
    getFingerPrintRecordLogTMSApplicationAction,

    searchApprovedBusinessTripApplicationAction,
    searchApprovedLeaveApplicationAction,
    searchApprovedLogTMSApplicationAction,
    searchApprovedOverTimeApplicationAction,

    getListStatusApplicationAction,

} from '../../redux/actions/application/applicationActions'
import { replaceScreenLoginAction } from '../../redux/actions/index'
class ApproverApplicationSearchContainer extends React.Component {
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
        return <ApproverApplicationSearch {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getTypesLeaveApplication: () => {
            dispatch(getTypesLeaveApplication())
        },

        getListTypeBusinessTripApplicationAction: () => {
            dispatch(getListTypeBusinessTripApplicationAction())
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

        //search approved application
        searchApprovedBusinessTripApplicationAction: (input) => {
            dispatch(searchApprovedBusinessTripApplicationAction(input))
        },
        searchApprovedLeaveApplicationAction: (input) => {
            dispatch(searchApprovedLeaveApplicationAction(input))
        },
        searchApprovedLogTMSApplicationAction: (input) => {
            dispatch(searchApprovedLogTMSApplicationAction(input))
        },
        searchApprovedOverTimeApplicationAction: (input) => {
            dispatch(searchApprovedOverTimeApplicationAction(input))
        },
        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input))
        },
        getListStatusApplicationAction: () => {
            dispatch(getListStatusApplicationAction())
        }

    }
}

const mapStateToProps = (state) => {
    // console.log('stateApproverSearchContainer: ', state.leaveApplicationReducers.dataTypesLeave)
    return {
        // leave
        fetchingTypesLeave: state.leaveApplicationReducers.fetchingTypesLeave,
        dataTypesLeave: state.leaveApplicationReducers.dataTypesLeave,
        errorTypesLeave: state.leaveApplicationReducers.errorTypesLeave,

        fetchingSearchApprovedLeave: state.leaveApplicationReducers.fetchingSearchApprovedLeave,
        dataSearchApprovedLeave: state.leaveApplicationReducers.dataSearchApprovedLeave,
        errorSearchApprovedLeave: state.leaveApplicationReducers.errorSearchApprovedLeave,

        fetchingListStatusApplication: state.leaveApplicationReducers.fetchingListStatusApplication,
        dataListStatusApplication: state.leaveApplicationReducers.dataListStatusApplication,
        errorListStatusApplication: state.leaveApplicationReducers.errorListStatusApplication,
        // business Trip

        fetchingSearchApprovedBusinessTrip: state.businessTripApplicationReducers.fetchingSearchApprovedBusinessTrip,
        dataSearchApprovedBusinessTrip: state.businessTripApplicationReducers.dataSearchApprovedBusinessTrip,
        errorSearchApprovedBusinessTrip: state.businessTripApplicationReducers.errorSearchApprovedBusinessTrip,

        fetchingTypeBusinessTrip: state.businessTripApplicationReducers.fetchingTypeBusinessTrip,
        dataTypeBusinessTrip: state.businessTripApplicationReducers.dataTypeBusinessTrip,
        errorTypeBusinessTrip: state.businessTripApplicationReducers.errorTypeBusinessTrip,


        // over Time

        fetchingStatusOverTime: state.overTimeApplicationReducers.fetchingStatusOverTime,
        dataStatusOverTime: state.overTimeApplicationReducers.dataStatusOverTime,
        errorStatusOverTime: state.overTimeApplicationReducers.errorStatusOverTime,

        fetchingSearchApprovedOverTimeApplication: state.overTimeApplicationReducers.fetchingSearchApprovedOverTimeApplication,
        dataSearchApprovedOverTimeApplication: state.overTimeApplicationReducers.dataSearchApprovedOverTimeApplication,
        errorSearchApprovedOverTimeApplication: state.overTimeApplicationReducers.errorSearchApprovedOverTimeApplication,

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

        fetchingSearchApprovedLogTMSApplication: state.logTMSApplicationReducers.fetchingSearchApprovedLogTMSApplication,
        dataSearchApprovedLogTMSApplication: state.logTMSApplicationReducers.dataSearchApprovedLogTMSApplication,
        errorSearchApprovedLogTMSApplication: state.logTMSApplicationReducers.errorSearchApprovedLogTMSApplication,


        //

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApproverApplicationSearchContainer)
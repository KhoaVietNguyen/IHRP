import * as React from 'react'
import ApplicationApproval from '../../components/application/ApplicationApproval'
import { connect } from 'react-redux'
import {
    applicationApprovalAction,
    resetApplicationApprovalAction

} from '../../redux/actions/application/applicationApprovalActions'
import {
    getDetailLeaveApplicationAction,
    resetGetDetailLeaveApplicationAction,
    getDaysLeaveApplicationAction,

    getDetailBusinessTripApplicationAction,
    resetGetDetailBusinessTripApplicationAction,

    getDetailLogTMSApplicationAction,
    resetGetDetailLogTMSApplicationAction,

    getDetailOverTimeApplicationAction,
    resetGetDetailOverTimeApplicationAction,
    workflowDownloadFileAction,

} from '../../redux/actions/application/applicationActions'
import { replaceScreenLoginAction } from '../../redux/actions/index'
// import { objectIsNull, stringIsEmpty, arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions'

import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
class ApplicationApprovalContainer extends React.Component {
    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            "willFocus",
            () => {
                this.props.replaceScreenLoginAction({
                    replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
                })
            }
        );
        let idApplication = this.props.navigation.getParam('idApplication')
        let typeApplication = this.props.navigation.getParam('typeApplication')
        // console.log('idApplication nnnn : ', idApplication)
        // console.log('typeApplication nnnn : ', typeApplication)
        if (typeApplication === 1) {
            // Chi tiết đơn nghỉ phép cần duyệt
            if (!stringIsEmpty(idApplication))
                this.props.getDetailLeaveApplicationAction([{ ID: idApplication }])

        } else if (typeApplication === 2) {
            // Chi tiết đơn đi công tác cần duyệt
            if (!stringIsEmpty(idApplication))
                this.props.getDetailBusinessTripApplicationAction([{ ID: idApplication }])

        } else if (typeApplication === 3) {
            // Chi tiết đơn làm ngoài giờ cần duyệt
            if (!stringIsEmpty(idApplication))
                this.props.getDetailOverTimeApplicationAction([{ ID: idApplication }])

        } else if (typeApplication === 4) {
            // Chi tiết đơn xác nhân quẹt thẻ cần duyệt
            if (!stringIsEmpty(idApplication))
                this.props.getDetailLogTMSApplicationAction([{ ID: idApplication }])
        }
    }
    render() {
        return <ApplicationApproval {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        applicationApprovalAction: (input) => {
            dispatch(applicationApprovalAction(input))
        },
        resetApplicationApprovalAction: () => {
            dispatch(resetApplicationApprovalAction())
        },

        getDetailLeaveApplicationAction: (input) => {
            dispatch(getDetailLeaveApplicationAction(input))
        },
        resetGetDetailLeaveApplicationAction: () => {
            dispatch(resetGetDetailLeaveApplicationAction())
        },
        getDaysLeaveApplicationAction: (input) => {
            dispatch(getDaysLeaveApplicationAction(input))
        },

        getDetailBusinessTripApplicationAction: (input) => {
            dispatch(getDetailBusinessTripApplicationAction(input))
        },
        resetGetDetailBusinessTripApplicationAction: () => {
            dispatch(resetGetDetailBusinessTripApplicationAction())
        },

        getDetailLogTMSApplicationAction: (input) => {
            dispatch(getDetailLogTMSApplicationAction(input))
        },
        resetGetDetailLogTMSApplicationAction: () => {
            dispatch(resetGetDetailLogTMSApplicationAction())
        },

        getDetailOverTimeApplicationAction: (input) => {
            dispatch(getDetailOverTimeApplicationAction(input))
        },
        resetGetDetailOverTimeApplicationAction: () => {
            dispatch(resetGetDetailOverTimeApplicationAction())
        },
        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input))
        },
        workflowDownloadFileAction: (input) => {
            dispatch(workflowDownloadFileAction(input))
        },
        

    }
}

const mapStateToProps = (state) => {
    return {
        fetchingApplicationApproval: state.applicationApprovalReducers.fetchingApplicationApproval,
        dataApplicationApproval: state.applicationApprovalReducers.dataApplicationApproval,
        errorApplicationApproval: state.applicationApprovalReducers.errorApplicationApproval,

        //Leave Applicaiton
        fetchingGetDetail: state.leaveApplicationReducers.fetchingGetDetail,
        dataGetDetail: state.leaveApplicationReducers.dataGetDetail,
        errorGetDetail: state.leaveApplicationReducers.errorGetDetail,

        fetchingGetDays: state.leaveApplicationReducers.fetchingGetDays,
        dataGetDays: state.leaveApplicationReducers.dataGetDays,
        errorGetDays: state.leaveApplicationReducers.errorGetDays,

        //Business Trip Application
        fetchingGetDetailBusinessTrip: state.businessTripApplicationReducers.fetchingGetDetailBusinessTrip,
        dataGetDetailBusinessTrip: state.businessTripApplicationReducers.dataGetDetailBusinessTrip,
        errorGetDetailBusinessTrip: state.businessTripApplicationReducers.errorGetDetailBusinessTrip,

        //Log TMS Application

        fetchingDetailLogTMSApplication: state.logTMSApplicationReducers.fetchingDetailLogTMSApplication,
        dataDetailLogTMSApplication: state.logTMSApplicationReducers.dataDetailLogTMSApplication,
        errorDetailLogTMSApplication: state.logTMSApplicationReducers.errorDetailLogTMSApplication,


        //OverTime Application

        fetchingGetDetailOverTime: state.overTimeApplicationReducers.fetchingGetDetailOverTime,
        dataGetDetailOverTime: state.overTimeApplicationReducers.dataGetDetailOverTime,
        errorGetDetailOverTime: state.overTimeApplicationReducers.errorGetDetailOverTime,

        fetchingDownloadFile: state.attachFileApplicationReducers.fetchingDownloadFile,
        dataDownloadFile: state.attachFileApplicationReducers.dataDownloadFile,
        errorDownloadFile: state.attachFileApplicationReducers.errorDownloadFile,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationApprovalContainer)
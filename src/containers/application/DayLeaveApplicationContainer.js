import * as React from 'react'
import DayLeaveApplication from '../../components/application/DayLeaveApplication'
import { connect } from 'react-redux'
import { objectIsNull, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import {
    getSubstitute,
    getTypesLeaveApplication,
    calculateApplicationAction,
    getTimesLeaveApplicationAction,
    getDaysLeaveApplicationAction,
    saveDaysLeaveApplicationAction,
    resetSaveDaysLeaveApplicationAction,
    attachFileApplicationAction,
    workflowDownloadFileAction,
    createLeaveApplicationAction,
    getDetailLeaveApplicationAction,

    updateLeaveApplicationAction,
    deleteLeaveApplicationAction,
    resetGetDetailLeaveApplicationAction,
} from '../../redux/actions/application/applicationActions'
import { replaceScreenLoginAction } from '../../redux/actions/index'
import { userProfile } from '../../config/settings'
class DayLeaveApplicationContainer extends React.Component {
    componentWillMount() {

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
        let param = this.props.navigation.getParam('itemLeaveApplication')
        // console.log('DLAC - ComponentDidMount - Navigation Param : ', param)
        if (!objectIsNull(param)) {
            if (!stringIsEmpty(param.statusID)) {
                if (param.statusID == '2' || param.statusID == '3') {

                } else {
                    this.props.getTypesLeaveApplication()
                    if (param.fromDate === param.toDate) {
                        if (userProfile.typeLeaveApplication !== '2') {
                            this.props.getTimesLeaveApplicationAction({
                                LeaveRecordID: '',
                                LeaveTypeID: '',
                                DateID: param.fromDate
                            })
                        }
                    }
                }
            } else {
                this.props.getTypesLeaveApplication()
                if (userProfile.typeLeaveApplication !== '2') {
                    this.props.getTimesLeaveApplicationAction({
                        LeaveRecordID: '',
                        LeaveTypeID: '',
                        DateID: this.getNowDate()
                    })
                }
            }
            if (!stringIsEmpty(param.leaveRecordID)) {
                this.props.getDetailLeaveApplicationAction([{ ID: param.leaveRecordID }])
            }
        } else {
            const idLeaveApplication = this.props.navigation.getParam('idLeaveApplication')
            if (!objectIsNull(idLeaveApplication)) {
                this.props.getDetailLeaveApplicationAction([{ ID: idLeaveApplication }])
                this.props.getTypesLeaveApplication()
            } else {
                this.props.resetGetDetailLeaveApplicationAction()
                this.props.getTypesLeaveApplication()
                if (userProfile.typeLeaveApplication !== '2') {
                    this.props.getTimesLeaveApplicationAction({
                        LeaveRecordID: '',
                        LeaveTypeID: '',
                        DateID: this.getNowDate()
                    })
                }
            }

        }

        // this.props.getSubstitute('')
    }
    getNowDate() {
        let d = new Date()
        return ('0' + d.getDate()).substr(-2) + '/' + ('0' + (d.getMonth() + 1)).substr(-2) + '/' + d.getFullYear()
    }
    render() {
        return <DayLeaveApplication {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getTimesLeaveApplicationAction: (input) => {
            dispatch(getTimesLeaveApplicationAction(input))
        },
        getDaysLeaveApplicationAction: (input) => {
            dispatch(getDaysLeaveApplicationAction(input))
        },
        getTypesLeaveApplication: () => {
            dispatch(getTypesLeaveApplication())
        },
        calculateApplicationAction: (input) => {
            dispatch(calculateApplicationAction(input))
        },
        saveDaysLeaveApplicationAction: (input) => {
            dispatch(saveDaysLeaveApplicationAction(input))
        },
        resetSaveDaysLeaveApplicationAction: () => {
            dispatch(resetSaveDaysLeaveApplicationAction())
        },

        createLeaveApplicationAction: (input) => {
            dispatch(createLeaveApplicationAction(input))
        },
        attachFileApplicationAction: (input) => {
            dispatch(attachFileApplicationAction(input))
        },
        workflowDownloadFileAction: (input) => {
            dispatch(workflowDownloadFileAction(input))
        },
        getDetailLeaveApplicationAction: (input) => {
            dispatch(getDetailLeaveApplicationAction(input))
        },
        updateLeaveApplicationAction: (input) => {
            dispatch(updateLeaveApplicationAction(input))
        },
        deleteLeaveApplicationAction: (input) => {
            dispatch(deleteLeaveApplicationAction(input))
        },
        resetGetDetailLeaveApplicationAction: () => {
            dispatch(resetGetDetailLeaveApplicationAction())
        },
        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input))
        },

    }
}

const mapStateToProps = (state) => {
    // console.log('DayLeaveApplicationContainer - State To Props - State Data: ', state.leaveApplicationReducers.dataGetDetail)
    return {
        fetchingTypesLeave: state.leaveApplicationReducers.fetchingTypesLeave,
        dataTypesLeave: state.leaveApplicationReducers.dataTypesLeave,
        errorTypesLeave: state.leaveApplicationReducers.errorTypesLeave,

        // fetchingSubstitute: state.leaveApplicationReducers.fetchingSubstitute,
        // dataSubstitute: state.leaveApplicationReducers.dataSubstitute,
        // errorSubstitute: state.leaveApplicationReducers.errorSubstitute,

        fetchingCalculate: state.leaveApplicationReducers.fetchingCalculate,
        dataCalculate: state.leaveApplicationReducers.dataCalculate,
        errorCalculate: state.leaveApplicationReducers.errorCalculate,

        fetchingGetTimes: state.leaveApplicationReducers.fetchingGetTimes,
        dataGetTimes: state.leaveApplicationReducers.dataGetTimes,
        errorGetTimes: state.leaveApplicationReducers.errorGetTimes,


        fetchingGetDays: state.leaveApplicationReducers.fetchingGetDays,
        dataGetDays: state.leaveApplicationReducers.dataGetDays,
        errorGetDays: state.leaveApplicationReducers.errorGetDays,

        fetchingSaveDays: state.leaveApplicationReducers.fetchingSaveDays,
        dataSaveDays: state.leaveApplicationReducers.dataSaveDays,
        errorSaveDays: state.leaveApplicationReducers.errorSaveDays,

        fetchingCreate: state.leaveApplicationReducers.fetchingCreate,
        dataCreate: state.leaveApplicationReducers.dataCreate,
        errorCreate: state.leaveApplicationReducers.errorCreate,

        fetchingGetDetail: state.leaveApplicationReducers.fetchingGetDetail,
        dataGetDetail: state.leaveApplicationReducers.dataGetDetail,
        errorGetDetail: state.leaveApplicationReducers.errorGetDetail,


        fetchingUpdateLeaveApplication: state.leaveApplicationReducers.fetchingUpdateLeaveApplication,
        dataUpdateLeaveApplication: state.leaveApplicationReducers.dataUpdateLeaveApplication,
        errorUpdateLeaveApplication: state.leaveApplicationReducers.errorUpdateLeaveApplication,

        fetchingDeleteLeaveApplication: state.leaveApplicationReducers.fetchingDeleteLeaveApplication,
        dataDeleteLeaveApplication: state.leaveApplicationReducers.dataDeleteLeaveApplication,
        errorDeleteLeaveApplication: state.leaveApplicationReducers.errorDeleteLeaveApplication,


        fetchingAttachFile: state.attachFileApplicationReducers.fetchingAttachFile,
        dataAttachFile: state.attachFileApplicationReducers.dataAttachFile,
        errorAttachFile: state.attachFileApplicationReducers.errorAttachFile,

        fetchingDownloadFile: state.attachFileApplicationReducers.fetchingDownloadFile,
        dataDownloadFile: state.attachFileApplicationReducers.dataDownloadFile,
        errorDownloadFile: state.attachFileApplicationReducers.errorDownloadFile,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DayLeaveApplicationContainer)
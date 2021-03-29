import * as React from 'react'
import LogTMSApplication from '../../components/application/LogTMSApplication'
import { connect } from 'react-redux'
import {
    getDetailLogTMSApplicationAction,
    getLogTypeLogTMSApplicationAction,
    withDrawLogTMSApplicationAction,
    deleteLogTMSApplicationAction,
    saveLogTMSApplicationAction,

    resetGetDetailLogTMSApplicationAction,
    attachFileApplicationAction,

    workflowDownloadFileAction,
} from '../../redux/actions/application/applicationActions'
import { objectIsNull, arrayIsEmpty, stringIsEmpty } from '@dungdang/react-native-basic/src/Functions'
import { replaceScreenLoginAction } from '../../redux/actions/index'
class LogTMSApplicationContainer extends React.Component {
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

        let param = this.props.navigation.getParam('item')
        if (!objectIsNull(param)) {
            let obj = {
                ID: param.empID,
                DateID: param.dateID,
            }
            // console.log('parammmmmmm: ', param)
            // console.log('objjjjjjj: ', obj)
            this.props.getDetailLogTMSApplicationAction([obj])
            this.props.getLogTypeLogTMSApplicationAction()
        } else {
            this.props.resetGetDetailLogTMSApplicationAction()
        }


    }
    render() {
        return <LogTMSApplication {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getDetailLogTMSApplicationAction: (input) => {
            dispatch(getDetailLogTMSApplicationAction(input))
        },
        getLogTypeLogTMSApplicationAction: () => {
            dispatch(getLogTypeLogTMSApplicationAction())
        },
        withDrawLogTMSApplicationAction: (input) => {
            dispatch(withDrawLogTMSApplicationAction(input))
        },
        deleteLogTMSApplicationAction: (input) => {
            dispatch(deleteLogTMSApplicationAction(input))
        },
        saveLogTMSApplicationAction: (input) => {
            dispatch(saveLogTMSApplicationAction(input))
        },
        resetGetDetailLogTMSApplicationAction: () => {
            dispatch(resetGetDetailLogTMSApplicationAction())
        },

        attachFileApplicationAction: (input) => {
            dispatch(attachFileApplicationAction(input))
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

        fetchingDetailLogTMSApplication: state.logTMSApplicationReducers.fetchingDetailLogTMSApplication,
        dataDetailLogTMSApplication: state.logTMSApplicationReducers.dataDetailLogTMSApplication,
        errorDetailLogTMSApplication: state.logTMSApplicationReducers.errorDetailLogTMSApplication,

        fetchingLogType: state.logTMSApplicationReducers.fetchingLogType,
        dataLogType: state.logTMSApplicationReducers.dataLogType,
        errorLogType: state.logTMSApplicationReducers.errorLogType,


        fetchingWithDrawLogTMSApplication: state.logTMSApplicationReducers.fetchingWithDrawLogTMSApplication,
        dataWithDrawLogTMSApplication: state.logTMSApplicationReducers.dataWithDrawLogTMSApplication,
        errorWithDrawLogTMSApplication: state.logTMSApplicationReducers.errorWithDrawLogTMSApplication,

        fetchingDeleteLogTMSApplication: state.logTMSApplicationReducers.fetchingDeleteLogTMSApplication,
        dataDeleteLogTMSApplication: state.logTMSApplicationReducers.dataDeleteLogTMSApplication,
        errorDeleteLogTMSApplication: state.logTMSApplicationReducers.errorDeleteLogTMSApplication,


        fetchingSaveLogTMSApplication: state.logTMSApplicationReducers.fetchingSaveLogTMSApplication,
        dataSaveLogTMSApplication: state.logTMSApplicationReducers.dataSaveLogTMSApplication,
        errorSaveLogTMSApplication: state.logTMSApplicationReducers.errorSaveLogTMSApplication,


        fetchingAttachFile: state.attachFileApplicationReducers.fetchingAttachFile,
        dataAttachFile: state.attachFileApplicationReducers.dataAttachFile,
        errorAttachFile: state.attachFileApplicationReducers.errorAttachFile,

        fetchingDownloadFile: state.attachFileApplicationReducers.fetchingDownloadFile,
        dataDownloadFile: state.attachFileApplicationReducers.dataDownloadFile,
        errorDownloadFile: state.attachFileApplicationReducers.errorDownloadFile,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogTMSApplicationContainer)
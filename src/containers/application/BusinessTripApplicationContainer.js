import * as React from 'react'
import BusinessTripApplication from '../../components/application/BusinessTripApplication'
import { connect } from 'react-redux'
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions'
import {
    getListTypeBusinessTripApplicationAction,
    getListCurrencyBusinessTripApplicationAction,
    getListEmployeeBusinessTripApplicationAction,
    calculateBusinessTripApplicationAction,
    saveBusinessTripApplicationAction,
    attachFileApplicationAction,
    workflowDownloadFileAction,
    getDetailBusinessTripApplicationAction,
    withDrawBusinessTripApplicationAction,
    deleteBusinessTripApplicationAction,
    resetGetDetailBusinessTripApplicationAction,
} from '../../redux/actions/application/applicationActions'
import {replaceScreenLoginAction} from '../../redux/actions/index'
class BusinessTripApplicationContainer extends React.Component {
    componentWillMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            "willFocus",
            () => {
                this.props.replaceScreenLoginAction({
                    replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
                })
            }
        );
    }
    componentDidMount() {
        let param = this.props.navigation.getParam('itemBusinessTripApplication')
        if (!objectIsNull(param)) {
            if (param.statusID === '2' || param.statusID === '4') {
                this.props.getDetailBusinessTripApplicationAction([{ ID: param.congTacID }])
            } else {
                this.props.getDetailBusinessTripApplicationAction([{ ID: param.congTacID }])
                this.props.getListTypeBusinessTripApplicationAction()
            }
        } else {
            let idBusinessTripApplication = this.props.navigation.getParam('idBusinessTripApplication')
            if (!objectIsNull(idBusinessTripApplication)) {
                this.props.getDetailBusinessTripApplicationAction([{ ID: idBusinessTripApplication }])
                this.props.getListTypeBusinessTripApplicationAction()
            } else {
                this.props.resetGetDetailBusinessTripApplicationAction()
                this.props.getListTypeBusinessTripApplicationAction()
            }

        }
    }
    render() {
        return <BusinessTripApplication {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getListTypeBusinessTripApplicationAction: () => {
            dispatch(getListTypeBusinessTripApplicationAction())
        },
        getListCurrencyBusinessTripApplicationAction: () => {
            dispatch(getListCurrencyBusinessTripApplicationAction())
        },
        getListEmployeeBusinessTripApplicationAction: () => {
            dispatch(getListEmployeeBusinessTripApplicationAction())
        },
        calculateBusinessTripApplicationAction: (input) => {
            dispatch(calculateBusinessTripApplicationAction(input))
        },

        saveBusinessTripApplicationAction: (input) => {
            dispatch(saveBusinessTripApplicationAction(input))
        },

        attachFileApplicationAction: (input) => {
            dispatch(attachFileApplicationAction(input))
        },
        getDetailBusinessTripApplicationAction: (input) => {
            dispatch(getDetailBusinessTripApplicationAction(input))
        },

        withDrawBusinessTripApplicationAction: (input) => {
            dispatch(withDrawBusinessTripApplicationAction(input))
        },
        deleteBusinessTripApplicationAction: (input) => {
            dispatch(deleteBusinessTripApplicationAction(input))
        },
        resetGetDetailBusinessTripApplicationAction: () => {
            dispatch(resetGetDetailBusinessTripApplicationAction())
        },

        workflowDownloadFileAction: (input) => {
            dispatch(workflowDownloadFileAction(input))
        },
        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input))
        },
        
        // 
        // 
    }
}

const mapStateToProps = (state) => {
    return {
        fetchingTypeBusinessTrip: state.businessTripApplicationReducers.fetchingTypeBusinessTrip,
        dataTypeBusinessTrip: state.businessTripApplicationReducers.dataTypeBusinessTrip,
        errorTypeBusinessTrip: state.businessTripApplicationReducers.errorTypeBusinessTrip,

        fetchingCurrencyBusinessTrip: state.businessTripApplicationReducers.fetchingCurrencyBusinessTrip,
        dataCurrencyBusinessTrip: state.businessTripApplicationReducers.dataCurrencyBusinessTrip,
        errorCurrencyBusinessTrip: state.businessTripApplicationReducers.errorCurrencyBusinessTrip,

        fetchingEmployeeBusinessTrip: state.businessTripApplicationReducers.fetchingEmployeeBusinessTrip,
        dataEmployeeBusinessTrip: state.businessTripApplicationReducers.dataEmployeeBusinessTrip,
        errorEmployeeBusinessTrip: state.businessTripApplicationReducers.errorEmployeeBusinessTrip,


        fetchingCalculateBusinessTrip: state.businessTripApplicationReducers.fetchingCalculateBusinessTrip,
        dataCalculateBusinessTrip: state.businessTripApplicationReducers.dataCalculateBusinessTrip,
        errorCalculateBusinessTrip: state.businessTripApplicationReducers.errorCalculateBusinessTrip,

        fetchingSaveBusinessTrip: state.businessTripApplicationReducers.fetchingSaveBusinessTrip,
        dataSaveBusinessTrip: state.businessTripApplicationReducers.dataSaveBusinessTrip,
        errorSaveBusinessTrip: state.businessTripApplicationReducers.errorSaveBusinessTrip,

        fetchingGetDetailBusinessTrip: state.businessTripApplicationReducers.fetchingGetDetailBusinessTrip,
        dataGetDetailBusinessTrip: state.businessTripApplicationReducers.dataGetDetailBusinessTrip,
        errorGetDetailBusinessTrip: state.businessTripApplicationReducers.errorGetDetailBusinessTrip,

        fetchingWithDrawBusinessTrip: state.businessTripApplicationReducers.fetchingWithDrawBusinessTrip,
        dataWithDrawBusinessTrip: state.businessTripApplicationReducers.dataWithDrawBusinessTrip,
        errorWithDrawBusinessTrip: state.businessTripApplicationReducers.errorWithDrawBusinessTrip,

        fetchingDeleteBusinessTrip: state.businessTripApplicationReducers.fetchingDeleteBusinessTrip,
        dataDeleteBusinessTrip: state.businessTripApplicationReducers.dataDeleteBusinessTrip,
        errorDeleteBusinessTrip: state.businessTripApplicationReducers.errorDeleteBusinessTrip,

        fetchingAttachFile: state.attachFileApplicationReducers.fetchingAttachFile,
        dataAttachFile: state.attachFileApplicationReducers.dataAttachFile,
        errorAttachFile: state.attachFileApplicationReducers.errorAttachFile,

        fetchingDownloadFile: state.attachFileApplicationReducers.fetchingDownloadFile,
        dataDownloadFile: state.attachFileApplicationReducers.dataDownloadFile,
        errorDownloadFile: state.attachFileApplicationReducers.errorDownloadFile,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessTripApplicationContainer)
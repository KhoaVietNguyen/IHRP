import * as React from 'react'
import OverTimeApplication from '../../components/application/OverTimeApplication'
import { connect } from 'react-redux'
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions'
import {
    getDateInfoOverTimeApplicationAction,
    getApproverOverTimeApplicationAction,
    calculateOverTimeApplicationAction,
    saveOverTimeApplicationAction,
    getDetailOverTimeApplicationAction,
    withDrawOverTimeApplicationAction,
    deleteOverTimeApplicationAction,
    resetGetDetailOverTimeApplicationAction,
} from '../../redux/actions/application/applicationActions'
import {replaceScreenLoginAction } from '../../redux/actions/index'
class OverTimeApplicationContainer extends React.Component {
    getNowDate = () => {
        let d = new Date()
        let t = d.getDay() + 1
        let day = ('0' + d.getDate()).substr(-2)
        let month = ('0' + (d.getMonth() + 1)).substr(-2)
        let year = d.getFullYear()

        return day + '/' + month + '/' + year

    }
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

        let param = this.props.navigation.getParam('itemOverTimeApplication')
        if (!objectIsNull(param)) {
            this.props.getDetailOverTimeApplicationAction([{ ID: param.recordID }])
        } else {
            this.props.resetGetDetailOverTimeApplicationAction()
            this.props.getDateInfoOverTimeApplicationAction([{ DateID: this.getNowDate() }])
        }
    }
    render() {
        return <OverTimeApplication {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getDateInfoOverTimeApplicationAction: (input) => {
            dispatch(getDateInfoOverTimeApplicationAction(input))
        },
        getApproverOverTimeApplicationAction: () => {
            dispatch(getApproverOverTimeApplicationAction())
        },
        calculateOverTimeApplicationAction: (input) => {
            dispatch(calculateOverTimeApplicationAction(input))
        },
        saveOverTimeApplicationAction: (input) => {
            dispatch(saveOverTimeApplicationAction(input))
        },
        getDetailOverTimeApplicationAction: (input) => {
            dispatch(getDetailOverTimeApplicationAction(input))
        },
        withDrawOverTimeApplicationAction: (input) => {
            dispatch(withDrawOverTimeApplicationAction(input))
        },
        deleteOverTimeApplicationAction: (input) => {
            dispatch(deleteOverTimeApplicationAction(input))
        },
        resetGetDetailOverTimeApplicationAction: () => {
            dispatch(resetGetDetailOverTimeApplicationAction())
        },
        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input))
        },
        
    }
}

const mapStateToProps = (state) => {
    return {
        fetchingDateInfo: state.overTimeApplicationReducers.fetchingDateInfo,
        dataDateInfo: state.overTimeApplicationReducers.dataDateInfo,
        errorDateInfo: state.overTimeApplicationReducers.errorDateInfo,

        fetchingApprover: state.overTimeApplicationReducers.fetchingApprover,
        dataApprover: state.overTimeApplicationReducers.dataApprover,
        errorApprover: state.overTimeApplicationReducers.errorApprover,

        fetchingCalculate: state.overTimeApplicationReducers.fetchingCalculate,
        dataCalculate: state.overTimeApplicationReducers.dataCalculate,
        errorCalculate: state.overTimeApplicationReducers.errorCalculate,


        fetchingSave: state.overTimeApplicationReducers.fetchingSave,
        dataSave: state.overTimeApplicationReducers.dataSave,
        errorSave: state.overTimeApplicationReducers.errorSave,


        fetchingGetDetailOverTime: state.overTimeApplicationReducers.fetchingGetDetailOverTime,
        dataGetDetailOverTime: state.overTimeApplicationReducers.dataGetDetailOverTime,
        errorGetDetailOverTime: state.overTimeApplicationReducers.errorGetDetailOverTime,


        fetchingWithDrawOverTime: state.overTimeApplicationReducers.fetchingWithDrawOverTime,
        dataWithDrawOverTime: state.overTimeApplicationReducers.dataWithDrawOverTime,
        errorWithDrawOverTime: state.overTimeApplicationReducers.errorWithDrawOverTime,

        fetchingDeleteOverTime: state.overTimeApplicationReducers.fetchingDeleteOverTime,
        dataDeleteOverTime: state.overTimeApplicationReducers.dataDeleteOverTime,
        errorDeleteOverTime: state.overTimeApplicationReducers.errorDeleteOverTime,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverTimeApplicationContainer)
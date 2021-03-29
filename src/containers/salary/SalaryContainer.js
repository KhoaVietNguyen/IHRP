// MinhNC15

import * as React from 'react'
import SalaryScreen from '../../components/salary/SalaryScreen'
import { connect } from 'react-redux'

import { getPayslipAction } from '../../redux/actions/salary/payslipAction'
import { getPayslipViewAction } from '../../redux/actions/salary/payslipViewAction'
import { getSalaryHistoryAction } from '../../redux/actions/salary/salaryHistoryAction'
import { getPayslipViewDetailAction } from '../../redux/actions/salary/payslipViewDetailAction'
import { replaceScreenLoginAction } from '../../redux/actions/index'
import { userProfile } from '../../config/settings'
class SalaryContainer extends React.Component {
    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            "willFocus",
            () => {
                this.props.replaceScreenLoginAction({
                    replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
                })
            }
        );
        this.props.getPayslipAction({
            LangID: this.props.LangID,
            Stoken: this.props.Stoken,
            AppVersion: userProfile.AppVersion,
        })
        this.props.getSalaryHistoryAction({
            F: "31"
        })
    }
    render() {
        return <SalaryScreen {...this.props} />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPayslipAction: (data) => {
            dispatch(getPayslipAction(data))
        },
        getPayslipViewAction: (data) => {
            dispatch(getPayslipViewAction(data))
        },
        getSalaryHistoryAction: (data) => {
            dispatch(getSalaryHistoryAction(data))
        },
        getPayslipViewDetailAction: (data) => {
            dispatch(getPayslipViewDetailAction(data))
        },
        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input))
        },

    }
}

const mapStateToProps = (state) => {
    return {
        fetchingRequester: state.payslipReducers.fetchingRequester,
        dataRequester: state.payslipReducers.dataRequester,
        errorRequester: state.payslipReducers.errorRequester,

        fetchingPayslipView: state.payslipViewReducers.fetchingPayslipView,
        dataPayslipView: state.payslipViewReducers.dataPayslipView,
        errorPayslipView: state.payslipViewReducers.errorPayslipView,

        fetchingSalaryHistory: state.salaryHistoryReducers.fetchingSalaryHistory,
        dataSalaryHistory: state.salaryHistoryReducers.dataSalaryHistory,
        errorSalaryHistory: state.salaryHistoryReducers.errorSalaryHistory,

        fetchingPayslipViewDetail: state.payslipViewDetailReducers.fetchingPayslipViewDetail,
        dataPayslipViewDetail: state.payslipViewDetailReducers.dataPayslipViewDetail,
        errorPayslipViewDetail: state.payslipViewDetailReducers.errorPayslipViewDetail,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SalaryContainer)
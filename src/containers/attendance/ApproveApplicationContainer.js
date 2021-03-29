import React, { Component } from 'react'
import { connect } from 'react-redux'
import ApproveApplication from '../../components/application/ApproveApplication'
import { applicationApprovalAction, resetApplicationApprovalAction } from '../../redux/actions/application/applicationApprovalActions'
import { waitingListForApprovalAction, getHistoryOfApprovalMenuListAction } from '../../redux/actions/attendance'
import { replaceScreenLoginAction } from '../../redux/actions/index'
class ApproveApplicationContainer extends Component {
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
        return <ApproveApplication {...this.props} />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        applicationApprovalAction: input => {
            dispatch(applicationApprovalAction(input))
        },
        resetApplicationApprovalAction: () => {
            dispatch(resetApplicationApprovalAction())
        },
        waitingListForApprovalAction: input => {
            // console.log('input container', input)
            dispatch(waitingListForApprovalAction(input))
        },
        getHistoryOfApprovalMenuListAction: input => {
            // console.log('input container', input)
            dispatch(getHistoryOfApprovalMenuListAction(input))
        },
        replaceScreenLoginAction: input => {
            // console.log('input container', input)
            dispatch(replaceScreenLoginAction(input))
        },

    }
}

const mapStateToProps = state => {
    // console.log("state.applicationApprovalReducers.dataApplicationApproval", state.applicationApprovalReducers.dataApplicationApproval)

    // console.log("state.listForApprovalReducers.dataWaitingListForApproval", state.listForApprovalReducers.dataWaitingListForApproval)
    // console.log("state.listForApprovalReducers.dataHistoryOfApprovalMenuLists", state.listForApprovalReducers.dataHistoryOfApprovalMenuLists)

    return {
        fetchingApplicationApproval: state.applicationApprovalReducers.fetchingApplicationApproval,
        dataApplicationApproval: state.applicationApprovalReducers.dataApplicationApproval,
        errorApplicationApproval: state.applicationApprovalReducers.errorApplicationApproval,

        loadingWaitingListForApproval: state.listForApprovalReducers.loadingWaitingListForApproval,
        dataWaitingListForApproval: state.listForApprovalReducers.dataWaitingListForApproval,
        errorWaitingListForApproval: state.listForApprovalReducers.errorWaitingListForApproval,

        loadingHistoryOfApprovalMenuLists: state.listForApprovalReducers.loadingHistoryOfApprovalMenuLists,
        dataHistoryOfApprovalMenuLists: state.listForApprovalReducers.dataHistoryOfApprovalMenuLists,
        errorHistoryOfApprovalMenuLists: state.listForApprovalReducers.errorHistoryOfApprovalMenuLists,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApproveApplicationContainer);
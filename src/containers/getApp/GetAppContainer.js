// MinhNC15
import * as React from 'react'
import Login from '../../components/login/Login'
import { connect } from 'react-redux'

import { getAppAction } from '../../redux/actions/getApp/GetAppActions'
import { replaceScreenLoginAction } from '../../redux/actions/index'
class GetAppContainer extends React.Component {
    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            "willFocus",
            () => {
                this.props.replaceScreenLoginAction({
                    replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
                })
            }
        );
        this.props.getAppAction()
    }
    render() {
        return <Login {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getAppAction: () => {
            dispatch(getAppAction())
        },
        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input))
        },

    }
}

const mapStateToProps = (state) => {
    return {
        // commit: state.getAppReducers.commit,
        fetchingRequester: state.getAppReducers.fetchingRequester,
        dataRequester: state.getAppReducers.dataRequester,
        errorRequester: state.getAppReducers.errorRequester,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetAppContainer)
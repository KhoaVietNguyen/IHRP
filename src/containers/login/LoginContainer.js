import * as React from 'react'
import Login from '../../components/login/Login'
import { connect } from 'react-redux'

import { loginAction } from '../../redux/actions/index'
import { getAppAction } from '../../redux/actions/getApp/GetAppActions'
import { PermissionsAndroid, Platform } from 'react-native'
class LoginContainer extends React.Component {
    async hasAndroidPermission() {
        const permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        const hasPermission = await PermissionsAndroid.check(permission)
        if (hasPermission) {
            return true
        }
        const status = await PermissionsAndroid.request(permission)
        if (status === 'granted') {
            return true
        }
    }
    componentDidMount() {
        if (Platform.OS === 'android') {
            this.hasAndroidPermission()
        } else {

        }

    }
    render() {
        return <Login {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        loginAction: (data) => {
            dispatch(loginAction(data))
        },
        getAppAction: (data) => {
            dispatch(getAppAction(data))
        }
    }
}

const mapStateToProps = (state) => {
    // console.log('zzzzzzzz: ', state.getAppReducers.dataRequester)
    return {
        isFetching: state.loginReducers.isFetching,
        data: state.loginReducers.data,
        error: state.loginReducers.error,
        typeLogin: state.loginReducers.typeLogin,
        // isFetchingGetApp: state.getAppReducers.isFetchingGetApp,
        // dataGetApp: state.getAppReducers.dataGetApp,
        // errorGetApp: state.getAppReducers.errorGetApp,

        // commit: state.getAppReducers.commit,
        fetchingRequester: state.getAppReducers.fetchingRequester,
        dataRequester: state.getAppReducers.dataRequester,
        errorRequester: state.getAppReducers.errorRequester,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
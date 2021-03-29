import * as React from 'react'
import { View } from 'react-native'
import Home from '../../components/home/Home'
import { connect } from 'react-redux'

import RegisterDevice from '../../components/home/RegisterDevice'
import {
    registryDeviceAction,
} from '../../redux/actions/home/homeActions'
import {replaceScreenLoginAction} from '../../redux/actions/index'
class RegisterDeviceContainer extends React.Component {
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
        return <RegisterDevice {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        registryDeviceAction: (input) => {
            dispatch(registryDeviceAction(input))
        },
        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input))
        },
        
    }
}

const mapStateToProps = (state) => {
    return {
        fetchingRegistryDevice: state.homeReducers.fetchingRegistryDevice,
        dataRegistryDevice: state.homeReducers.dataRegistryDevice,
        errorRegistryDevice: state.homeReducers.errorRegistryDevice,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDeviceContainer)
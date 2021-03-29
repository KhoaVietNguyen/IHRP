import * as React from 'react'
import { View } from 'react-native'
import Home from '../../components/home/Home'
import { connect } from 'react-redux'

import RegisterDeviceGPS from '../../components/home/RegisterDeviceGPS'
import {

    registryDeviceGPSAction,
} from '../../redux/actions/home/homeActions'
import { replaceScreenLoginAction } from '../../redux/actions/index'
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
        return <RegisterDeviceGPS {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        registryDeviceGPSAction: (input) => {
            dispatch(registryDeviceGPSAction(input))
        },
        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input))
        },

    }
}

const mapStateToProps = (state) => {
    return {
        // fetchingRegistryDevice: state.homeReducers.fetchingRegistryDevice,
        // dataRegistryDevice: state.homeReducers.dataRegistryDevice,
        // errorRegistryDevice: state.homeReducers.errorRegistryDevice,
        fetchingRegistryDeviceGPS: state.homeReducers.fetchingRegistryDeviceGPS,
        dataRegistryDeviceGPS: state.homeReducers.dataRegistryDeviceGPS,
        errorRegistryDeviceGPS: state.homeReducers.errorRegistryDeviceGPS,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterDeviceContainer)
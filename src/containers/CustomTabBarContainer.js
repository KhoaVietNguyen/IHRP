import * as React from 'react'
import { Platform, Alert } from 'react-native'
import { connect } from 'react-redux'
import { stringIsEmpty, arrayIsEmpty, objectIsNull } from '@dungdang/react-native-basic/src/Functions'

import { userProfile, } from '../config/settings'
import CustomTabBar from './CustomTabBar'
import { replaceScreenLoginAction } from '../redux/actions/index'
class CustomTabBarContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
        // this.willFocusSubscription = this.props.navigation.addListener(
        //     "willFocus",
        //     () => {
        //         this.props.replaceScreenLoginAction({
        //             replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
        //         })
        //     }
        // );
    }

    render() {

        return <CustomTabBar {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        // getUser2Action: () => {
        //     dispatch(getUser2Action())
        // },
        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input));
        },


    }
}

const mapStateToProps = (state) => {
    // console.log('TabBarContainer - state - dataGetUser: ', state.homeReducers.dataGetUser2)
    return {
        fetchingGetUser2: state.homeReducers.fetchingGetUser2,
        dataGetUser2: state.homeReducers.dataGetUser2,
        errorGetUser2: state.homeReducers.errorGetUser2,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTabBarContainer)
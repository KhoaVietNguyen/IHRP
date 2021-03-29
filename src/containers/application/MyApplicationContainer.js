import * as React from 'react'
import MyApplication from '../../components/application/MyApplication'
import { connect } from 'react-redux'
import {

} from '../../redux/actions/application/applicationActions'
import {replaceScreenLoginAction} from '../../redux/actions/index'
class MyApplicationContainer extends React.Component {
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
        return <MyApplication {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        // getTypesLeaveApplication: () => {
        //     dispatch(getTypesLeaveApplication())
        // },

        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input))
        },
        
    }
}

const mapStateToProps = (state) => {
    return {

        // fetchingTypesLeave: state.leaveApplicationReducers.fetchingTypesLeave,
        // dataTypesLeave: state.leaveApplicationReducers.dataTypesLeave,
        // errorTypesLeave: state.leaveApplicationReducers.errorTypesLeave
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyApplicationContainer)
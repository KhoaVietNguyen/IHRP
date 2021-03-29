import * as React from 'react'

import { connect } from 'react-redux'
import PopupAlert from '../../components/custom/popup/PopupAlert'
import { popupAlertAction } from '../../redux/actions/index'
class PopupAlertContainer extends React.Component {
    render() {
        return <PopupAlert {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        popupAlertAction: (input) => {
            dispatch(popupAlertAction(input))
        },
    }
}

const mapStateToProps = (state) => {
    return {
        fetchingAlert: state.loginReducers.fetchingAlert,
        visibleAlert: state.loginReducers.visibleAlert,
        dataAlert: state.loginReducers.dataAlert
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopupAlertContainer)
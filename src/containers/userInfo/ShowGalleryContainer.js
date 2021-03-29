// MinhNC15

import * as React from 'react'
import ShowGallery from '../../components/userInfo/ShowGallery/ShowGallery'
import { connect } from 'react-redux'
import { uploadAvatarAction } from '../../redux/actions/userInfo/uploadAvatarActions'
import { replaceScreenLoginAction } from '../../redux/actions/index'

class ShowGalleryContainer extends React.Component {
    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            "willFocus",
            () => {
                this.props.replaceScreenLoginAction({
                    replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
                })
            }
        );
        // this.props.uploadAvatarAction([{
        //     FileName: 'ngocld.jpg',
        //     FileContent: 'String base 64'
        // }])
    }
    render() {
        return <ShowGallery {...this.props} />
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        uploadAvatarAction: (input) => {
            dispatch(uploadAvatarAction(input))
        },
        replaceScreenLoginAction: (input) => {
            dispatch(replaceScreenLoginAction(input))
        },
    }
}

const mapStateToProps = (state) => {
    // console.log('State - uploadAvatarReducers - Props: ', state.uploadAvatarReducers)
    return {
        loadingUploadAvatar: state.uploadAvatarReducers.loadingUploadAvatar,
        dataUploadAvatar: state.uploadAvatarReducers.dataUploadAvatar,
        errorUploadAvatar: state.uploadAvatarReducers.errorUploadAvatar,

        // fetchingPayslipView: state.payslipViewReducers.fetchingPayslipView,
        // dataPayslipView: state.payslipViewReducers.dataPayslipView,
        // errorPayslipView: state.payslipViewReducers.errorPayslipView,

        // fetchingSalaryHistory: state.salaryHistoryReducers.fetchingSalaryHistory,
        // dataSalaryHistory: state.salaryHistoryReducers.dataSalaryHistory,
        // errorSalaryHistory: state.salaryHistoryReducers.errorSalaryHistory,

        // fetchingPayslipViewDetail: state.payslipViewDetailReducers.fetchingPayslipViewDetail,
        // dataPayslipViewDetail: state.payslipViewDetailReducers.dataPayslipViewDetail,
        // errorPayslipViewDetail: state.payslipViewDetailReducers.errorPayslipViewDetail,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowGalleryContainer)
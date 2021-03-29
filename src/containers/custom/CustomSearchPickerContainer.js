import * as React from 'react'
import LeaveApplication from '../../components/application/LeaveApplication'
import CustomSearchPicker from '../../components/custom/CustomSearchPicker'
import { connect } from 'react-redux'
import { getSubstitute, getListEmployeeBusinessTripApplicationAction } from '../../redux/actions/application/applicationActions'

class CustomSearchPickerContainer extends React.Component {
    componentDidMount() {

    }
    render() {
        return <CustomSearchPicker {...this.props} />
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        getSubstitute: (input) => {
            dispatch(getSubstitute(input))
        },
        getListEmployeeBusinessTripApplicationAction: () => {
            dispatch(getListEmployeeBusinessTripApplicationAction())
        },
    }
}

const mapStateToProps = (state) => {
    return {
        fetchingSubstitute: state.leaveApplicationReducers.fetchingSubstitute,
        dataSubstitute: state.leaveApplicationReducers.dataSubstitute,
        errorSubstitute: state.leaveApplicationReducers.errorSubstitute,


        fetchingEmployeeBusinessTrip: state.businessTripApplicationReducers.fetchingEmployeeBusinessTrip,
        dataEmployeeBusinessTrip: state.businessTripApplicationReducers.dataEmployeeBusinessTrip,
        errorEmployeeBusinessTrip: state.businessTripApplicationReducers.errorEmployeeBusinessTrip,

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomSearchPickerContainer)
//PhucNT34
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from '../../components/notification/Notification';
import { notificationAction, notificationMarkAction } from '../../redux/actions/attendance';
import { arrayIsEmpty } from '@dungdang/react-native-basic/src/Functions';
import { replaceScreenLoginAction } from '../../redux/actions/index'
class NotificationContainer extends Component {
    componentDidMount() {
        this.willFocusSubscription = this.props.navigation.addListener(
            "willFocus",
            () => {
                this.props.notificationAction({})
                this.props.replaceScreenLoginAction({
                    replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
                })
            }
        );


    }

    render() {
        return <Notification {...this.props} />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        notificationAction: input => {
            dispatch(notificationAction(input));
        },
        notificationMarkAction: input => {
            dispatch(notificationMarkAction(input));
        },
        replaceScreenLoginAction: input => {
            dispatch(replaceScreenLoginAction(input));
        },

    };
};

const mapStateToProps = state => {
    return {
        error: state.notificationReducers.error,
        loading: state.notificationReducers.loading,
        dataItem: state.notificationReducers.dataItem,


        fetchingNotificationMark: state.notificationReducers.fetchingNotificationMark,
        dataNotificationMark: state.notificationReducers.dataNotificationMark,
        errorNotificationMark: state.notificationReducers.errorNotificationMark,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);
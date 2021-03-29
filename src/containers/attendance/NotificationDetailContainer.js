//PhucNT34
import React, { Component } from 'react';
import { connect } from 'react-redux';
import NotificationDetail from '../../components/notification/NotificationDetail'
import { notificationDetailAction } from '../../redux/actions/attendance';
import { objectIsNull } from '@dungdang/react-native-basic/src/Functions';
import { replaceScreenLoginAction } from '../../redux/actions/index'
class NotificationDetailContainer extends Component {
    componentDidMount() {
        // this.props.notificationAction({})
        this.willFocusSubscription = this.props.navigation.addListener(
            "willFocus",
            () => {
                this.props.replaceScreenLoginAction({
                    replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
                })
            }
        );
        const item = this.props.navigation.getParam('itemNotification')
        const screen = this.props.navigation.getParam('screen')
        if (!objectIsNull(item)) {
            this.props.notificationDetailAction([{ ID: item.recordID, workflowID: item.workflowID }])
        }
        // this.props.notificationDetailAction()
    }

    render() {
        return <NotificationDetail {...this.props} />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        notificationDetailAction: input => {
            dispatch(notificationDetailAction(input));
        },
        replaceScreenLoginAction: input => {
            dispatch(replaceScreenLoginAction(input));
        },


    };
};

const mapStateToProps = state => {
    // console.log('stateContainer: ', state.notificationReducers)
    return {
        fetchingNotificationDetail: state.notificationReducers.fetchingNotificationDetail,
        dataNotificationDetail: state.notificationReducers.dataNotificationDetail,
        errorNotificationDetail: state.notificationReducers.errorNotificationDetail,

        // fetchingNotificationDetail: false,
        // dataNotificationDetail: undefined,
        // errorNotificationDetail: undefined,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDetailContainer);
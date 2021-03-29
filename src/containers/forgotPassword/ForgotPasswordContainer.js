import * as React from 'react';
import ForgotPasswordScreen from '../../components/forgotPassword/ForgotPasswordScreen';
import { connect } from 'react-redux';
import {
  sendCodeVerifyForgotPasswordActions,
  sendAccountForgotPasswordActions,
} from '../../redux/actions/forgotPassword/forgotPasswordActions';
// import { loginAction } from '../../redux/actions/index'
import { replaceScreenLoginAction } from '../../redux/actions/index'
class ForgotPasswordContainer extends React.Component {
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
    return <ForgotPasswordScreen {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendCodeVerifyForgotPasswordActions: (input) => {
      dispatch(sendCodeVerifyForgotPasswordActions(input))
    },
    sendAccountForgotPasswordActions: (input) => {
      dispatch(sendAccountForgotPasswordActions(input))
    },
    replaceScreenLoginAction: (input) => {
      dispatch(replaceScreenLoginAction(input))
    },

  };
};

const mapStateToProps = (state) => {
  return {
    fetchingSendAccount: state.forgotPasswordReducers.fetchingSendAccount,
    dataSendAccount: state.forgotPasswordReducers.dataSendAccount,
    errorSendAccount: state.forgotPasswordReducers.errorSendAccount,

    fetchingSendCode: state.forgotPasswordReducers.fetchingSendCode,
    dataSendCode: state.forgotPasswordReducers.dataSendCode,
    errorSendCode: state.forgotPasswordReducers.errorSendCode,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPasswordContainer);

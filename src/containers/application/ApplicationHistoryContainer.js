import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import HistoryList from '../../components/application/history/HistoryList';
import { getApplicationHistoryAction } from '../../redux/actions/application/applicationHistory'
import { connect } from 'react-redux';
import { replaceScreenLoginAction } from '../../redux/actions/index'
class ApplicationHistoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.props.replaceScreenLoginAction({
          replaceScreen: () => { this.props.navigation.replace('LoginContainer') }
        })
      }
    );

    // console.log('sssss: ', this.props.navigation.getParam("idApplication", "No_ID") + ' --- ' + this.props.navigation.getParam("typeApplication", "No_ID"))
    this.props.getApplicationHistoryAction({
      id: this.props.navigation.getParam("idApplication", "No_ID"),
      type: this.props.navigation.getParam("typeApplication", "No_ID")
    })
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <HistoryList {...this.props}></HistoryList>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('stateHisAppContainer: ', state.applicationHistoryReducers.dataApplicationHistory)
  return {
    fetching: state.applicationHistoryReducers.fetchingApplicationHistory,
    data: state.applicationHistoryReducers.dataApplicationHistory,
    error: state.applicationHistoryReducers.errorApplicationHistory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getApplicationHistoryAction: (input) => {
      dispatch(getApplicationHistoryAction(input))
    },
    replaceScreenLoginAction: (input) => {
      dispatch(replaceScreenLoginAction(input))
    },


  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplicationHistoryContainer);

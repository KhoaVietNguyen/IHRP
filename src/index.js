//Linhtn23

import React from "react";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import allReducers from './redux/reducers';
import rootSaga from './redux/middleware/saga/rootSaga';
const sagaMiddleware = createSagaMiddleware();
let store = createStore(allReducers, applyMiddleware(sagaMiddleware));
import PopupLoginContainer from './containers/login/PopupLoginContainer'
import AppContainer from "./containers/App"
import PopupAlertContainer from './containers/login/PopupAlertContainer'
export default class Root extends React.Component {
  render() {
    return <Provider store={store}>
      <AppContainer />
      <PopupLoginContainer {...this.props}/>
      {/* <PopupAlertContainer /> */}
    </Provider>;

  }
}

sagaMiddleware.run(rootSaga);

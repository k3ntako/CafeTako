import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import store from '../redux/store/store';
import sessionReducer from '../redux/reducers/sessionReducer';
import User from './models/User';

import Routes from './Routes';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    User.currentUser().then(user => {
      sessionReducer.Methods.setCurrentUser(store.dispatch)(user);
    });
  }

  render(){
    return <Provider store={store}>
      <Routes />
    </Provider>
  }
}

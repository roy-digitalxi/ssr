import React, { Component } from 'react';
import Helmet from 'react-helmet';

// Components
import Login from './components/layout/Login';

export class LoginPage extends Component {
  render() {
    return (
      <div>
        <Helmet title="Login" />
        <Login />
      </div>
    );
  }
}

export default LoginPage;

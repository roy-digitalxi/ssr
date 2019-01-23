import React, { Component } from 'react';
import Helmet from 'react-helmet';

// Components
import AdminLogin from './components/layout/AdminLogin';

export class AdminLoginPage extends Component {
  render() {
    return (
      <div>
        <Helmet title="Admin Login" />
        <AdminLogin />
      </div>
    );
  }
}

export default AdminLoginPage;

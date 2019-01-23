import React, { Component } from 'react';
import Helmet from 'react-helmet';

// Components
import AdminDashboard from './components/layout/AdminDashboard';

export class LoginPage extends Component {
  render() {
    return (
      <div>
        <Helmet title="Admin Dashboard" />
        <AdminDashboard />
      </div>
    );
  }
}

export default LoginPage;

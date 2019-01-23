import React, { Component } from 'react';

// component
import AdminNavBar from '../../../components/adminNavBar/AdminNavBar';

// redux
import { connect } from 'react-redux';
import {} from '../../actions';
import {
  dxAlert as dxAlertAction,
  dxKeycloakAdminLogout as dxKeycloakAdminLogoutAction
} from '../../../actions';

class AdminDashboardContainer extends Component {
  handleLogoutClick = () => {
    const { keycloak } = this.props;
    localStorage.removeItem('isAdminAuthenticated');
    keycloak.logout();
    this.props.dxKeycloakAdminLogoutAction();
  };

  render() {
    return <AdminNavBar handleLogoutClick={this.handleLogoutClick} />;
  }
}

const stateToProps = state => {
  return {
    keycloak: state.root.keycloak
  };
};

const dispatchToProps = {
  dxAlertAction,
  dxKeycloakAdminLogoutAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(AdminDashboardContainer);

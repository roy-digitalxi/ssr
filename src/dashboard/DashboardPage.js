import React, { Component } from 'react';
import Helmet from 'react-helmet';

// component
import Dashboard from './components/layout/Dashboard';

// redux
import { connect } from 'react-redux';
import { dxNavigateHistory as dxNavigateHistoryAction } from '../actions';
import {
  dxDashboardNavi as dxDashboardNaviAction,
  dxToggleSearchBar as dxToggleSearchBarAction,
  dxToggleStreamSearchBar as dxToggleStreamSearchBarAction
} from './actions';

export class DashboardPage extends Component {
  componentDidMount() {
    const { history } = this.props;
    const param = this.props.match.params.param;
    this.props.dxNavigateHistoryAction(history);

    if (param) this.props.dxDashboardNaviAction(param);
  }

  handleDeactiveSearchBar = () => {
    this.props.dxToggleSearchBarAction(false);
    this.props.dxToggleStreamSearchBarAction(false);
  };

  render() {
    return (
      <div
        onClick={() => this.handleDeactiveSearchBar()}
        style={{ minHeight: '100vh' }}
      >
        <Helmet title="Dashboard" />
        <Dashboard />
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = {
  dxNavigateHistoryAction,
  dxDashboardNaviAction,
  dxToggleSearchBarAction,
  dxToggleStreamSearchBarAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(DashboardPage);

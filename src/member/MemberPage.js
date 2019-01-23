import React, { Component } from 'react';
import Helmet from 'react-helmet';

// component
import Member from './components/layout/Member';

// redux
import { connect } from 'react-redux';
import { dxNavigateHistory as dxNavigateHistoryAction } from '../actions';
import {} from './actions';

export class MemberPage extends Component {
  componentDidMount() {
    const history = this.props.history;
    this.props.dxNavigateHistoryAction(history);
  }

  render() {
    return (
      <div>
        <Helmet title="Members" />
        <Member />
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = {
  dxNavigateHistoryAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(MemberPage);

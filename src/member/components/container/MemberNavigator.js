import React, { Component } from 'react';

// components
import NavBar from '../../../components/navBar/NavBar';

// redux
import { connect } from 'react-redux';
import {} from '../../actions';
import { dxAlert as dxAlertAction } from '../../../actions';

class MemberNavigator extends Component {
  handleGoback = () => {
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <NavBar
        isRoute={false}
        navType="MEMBER"
        handleGoback={() => this.handleGoback()}
      />
    );
  }
}

const stateToProps = state => {
  return {
    history: state.root.history
  };
};

const dispatchToProps = {
  dxAlertAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(MemberNavigator);

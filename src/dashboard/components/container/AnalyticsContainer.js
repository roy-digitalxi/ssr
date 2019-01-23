import React, { Component } from 'react';

// libraries
import Button from '@material-ui/core/Button';

// redux
import { connect } from 'react-redux';
import {} from '../../actions';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';
import sizes from '../../../styles/sizes';

// components

class AnalyticsContainer extends Component {
  render() {
    const { mainContainerStyle } = styles;

    return <div style={mainContainerStyle}>AnalyticsContainer here</div>;
  }
}

const styles = {
  mainContainerStyle: {
    display: 'flex',
    flexDirection: 'row'
  }
};

const stateToProps = state => {
  return {
    history: state.root.history
  };
};

const dispatchToProps = {};

export default connect(
  stateToProps,
  dispatchToProps
)(AnalyticsContainer);

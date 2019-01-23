import React, { Component } from 'react';
import Helmet from 'react-helmet';

// Redux
import { connect } from 'react-redux';
import actions from '../../actions';

// Constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import sizes from '../../../styles/sizes';

export class ErrorPage extends Component {
  render() {
    return <div>error page</div>;
  }
}

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({});

const styles = {
  mainContainerStyle: {
    minHeight: `100vh`,
    width: '100%',
    maxWidth: 1260,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'scroll',
    marginBottom: 48
  },
  buttonContainer: {
    position: 'absolute',
    top: 30,
    right: 30,
    display: 'flex',
    flexDirection: 'row'
  },
  btnStyle: {
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    marginRight: 20
  },
  btnStyle1: {
    backgroundColor: colors.blueColor,
    color: colors.whiteColor
  }
};

export default connect(
  stateToProps,
  dispatchToProps
)(ErrorPage);

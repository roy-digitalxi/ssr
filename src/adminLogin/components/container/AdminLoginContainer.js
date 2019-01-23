import React, { Component } from 'react';

// Libraries
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Keycloak from '../../../keycloak-js';

// colors
import colors from '../../../styles/colors';

// redux
import { connect } from 'react-redux';
import {} from '../../actions';
import { dxAlert as dxAlertAction } from '../../../actions';

// constants
import fonts from '../../../styles/fonts';
import config from '../../../config';

const themeStyles = () => ({
  input: {}
});

class AdminLoginContainer extends Component {
  handleLoginClick = () => {
    // 1. remove org auth
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('isAdminAuthenticated');
    // 2. admin auth
    const keycloak = Keycloak({
      url: config.keycloakHost,
      realm: 'digitalxi',
      clientId: config.keycloakClientID
    });
    keycloak.init({ onLoad: 'login-required' });
  };

  render() {
    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      loginContainerStyle,
      imgContainerStyle,
      imgStyle,
      inputContainerStyle,
      inputStyle,
      btnContainerStyle,
      loginBtnStyle
    } = styles;

    return (
      <div style={mainContainerStyle}>
        <div style={tableContainerStyle}>
          <div style={tableWrapperStyle}>
            <div style={loginContainerStyle} className="dx_fade_in_div_2">
              <div style={imgContainerStyle}>
                <img
                  style={imgStyle}
                  src={require('../../../../../assets/images/ImageTextBg.png')}
                />
              </div>
              <div style={btnContainerStyle}>
                <Button
                  style={loginBtnStyle}
                  fullWidth
                  variant="text"
                  onClick={() => this.handleLoginClick()}
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = {
  dxAlertAction
};

const styles = {
  tableContainerStyle: {
    position: 'relative',
    display: 'table',
    height: '100%',
    width: '100%'
  },
  tableWrapperStyle: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  mainContainerStyle: {
    width: '100%',
    height: '100%'
  },
  loginContainerStyle: {
    width: 330,
    margin: '0 auto'
  },
  imgContainerStyle: {
    marginBottom: 48
  },
  imgStyle: {
    display: 'block',
    width: 250,
    height: 64,
    margin: '0 auto'
  },
  inputContainerStyle: {
    marginBottom: 18,
    fontSize: fonts.h2
  },
  inputStyle: {
    width: '100%'
  },
  btnContainerStyle: {
    marginTop: 36
  },
  loginBtnStyle: {
    fontSize: fonts.h1,
    height: 42,
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'capitalize'
  }
};

export default connect(
  stateToProps,
  dispatchToProps
)(withStyles(themeStyles)(AdminLoginContainer));

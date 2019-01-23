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

// helpers
import * as apiManager from '../../../helpers/apiManager';
import * as helpers from '../../../helpers';

const themeStyles = () => ({
  input: {}
});

class LoginContainer extends Component {
  handleLoginClick = async () => {
    const formattedParams = {
      OrgUrl: helpers.getOrgUrl()
    };
    try {
      const response = await apiManager.dxApi(
        `/org/route`,
        formattedParams,
        true
      );
      const { Confirmation, Response } = response.data;
      if (Confirmation == 'SUCCESS') {
        // 1. remove admin auth
        localStorage.removeItem('isAdminAuthenticated');
        // 2. org auth start
        const keycloak = Keycloak({
          url: config.keycloakHost,
          realm: Response.Org.Realm,
          clientId: config.keycloakClientID
        });
        keycloak.init({ onLoad: 'login-required' });
      } else {
        localStorage.removeItem('isAuthenticated');
        this.props.history.push('/error');
      }
    } catch (error) {
      this.props.dxAlertAction(true, true, 'Login error');
    }
  };

  render() {
    const { classes } = this.props;

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
                  src={require('../../../../../assets/images/publishXi.png')}
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
)(withStyles(themeStyles)(LoginContainer));

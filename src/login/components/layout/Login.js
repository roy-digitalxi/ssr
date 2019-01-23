import React, { Component } from 'react';

// Components
import LoginContainer from '../container/LoginContainer';

// constants
import sizes from '../../../styles/sizes';
import colors from '../../../styles/colors';

class Login extends Component {
  render() {
    const { mainContainerStyle } = styles;

    return (
      <div style={mainContainerStyle}>
        <LoginContainer />
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    height: `100vh`,
    width: '100%',
    backgroundColor: colors.whiteColor
  }
};

export default Login;

import React, { Component } from 'react';

// Components
import AdminLoginContainer from '../container/AdminLoginContainer';

// constants
import sizes from '../../../styles/sizes';
import colors from '../../../styles/colors';

class AdminLogin extends Component {
  render() {
    const { mainContainerStyle } = styles;

    return (
      <div style={mainContainerStyle}>
        <AdminLoginContainer />
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

export default AdminLogin;

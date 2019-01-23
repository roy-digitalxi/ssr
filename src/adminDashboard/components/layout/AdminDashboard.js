import React, { Component } from 'react';

// Components
import AdminDashboardContainer from '../container/AdminDashboardContainer';
import AdminNavigator from '../container/AdminNavigator';

// constants
import sizes from '../../../styles/sizes';
import colors from '../../../styles/colors';

class AdminDashboard extends Component {
  render() {
    const { mainContainerStyle } = styles;

    return (
      <div>
        <AdminNavigator />
        <div style={mainContainerStyle}>
          <AdminDashboardContainer />
        </div>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    height: `calc(100vh - ${sizes.headerHeight})`,
    width: sizes.dxWidth,
    margin: '0 auto'
  }
};

export default AdminDashboard;

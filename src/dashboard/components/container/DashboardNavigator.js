import React, { Component } from 'react';

// components
import NavBar from '../../../components/navBar/NavBar';
import Experience from '../layout/Experience';
import Stream from '../layout/Stream';
import User from '../layout/User';
import Language from '../layout/Language';
import Analytics from '../layout/Analytics';

// constants
import sizes from '../../../styles/sizes';

// styles
import '../../../../../assets/css/react-reveal/index.css';

// redux
import { connect } from 'react-redux';
import { dxDashboardNavi as dxDashboardNaviAction } from '../../actions';
import { dxKeycloakLogout as dxKeycloakLogoutAction } from '../../../actions';

class DashboardNavigator extends Component {
  handleNaviMember = () => {
    this.props.history.push('/members');
  };

  handleLogoutClick = () => {
    const { keycloak } = this.props;
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    this.props.dxKeycloakLogoutAction();
  };

  handleChange = index => {
    this.props.dxDashboardNaviAction(index);
  };

  renderNav = nav => {
    let { navArr, NaviIndex } = this.props;

    // safety guard
    if (NaviIndex >= navArr.length) {
      NaviIndex = 0;
    }

    let tab;
    if (nav.type == 'EXPERIENCES') {
      tab = <Experience active={navArr[NaviIndex].type == 'EXPERIENCES'} />;
    } else if (nav.type == 'STREAMS') {
      tab = <Stream active={navArr[NaviIndex].type == 'STREAMS'} />;
    } else if (nav.type == 'USER') {
      tab = <User active={navArr[NaviIndex].type == 'USER'} />;
    } else if (nav.type == 'LANGUAGES') {
      tab = <Language active={navArr[NaviIndex].type == 'LANGUAGES'} />;
    } else if (nav.type == 'ANALYTICS') {
      tab = <Analytics active={navArr[NaviIndex].type == 'ANALYTICS'} />;
    }
    return tab;
  };

  render() {
    const { conentWrapperStyle } = styles;

    const { navArr, NaviIndex } = this.props;

    return (
      <div>
        <NavBar
          isRoute={true}
          navArr={navArr}
          index={NaviIndex}
          handleChange={index => this.handleChange(index)}
          handleNaviMember={() => this.handleNaviMember()}
          handleLogoutClick={() => this.handleLogoutClick()}
        />
        <div style={conentWrapperStyle}>
          {navArr.map((nav, index) => this.renderNav(nav))}
        </div>
      </div>
    );
  }
}

const styles = {
  conentWrapperStyle: {
    width: sizes.dxWidth,
    margin: '0 auto'
  }
};

const stateToProps = state => {
  return {
    history: state.root.history,
    navArr: state.root.navArr,
    keycloak: state.root.keycloak,
    access: state.root.access,
    NaviIndex: state.dashboard.NaviIndex
  };
};

const dispatchToProps = {
  dxDashboardNaviAction,
  dxKeycloakLogoutAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(DashboardNavigator);

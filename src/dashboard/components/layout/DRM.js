import React, { Component } from 'react';

// styles
import '../../../../../assets/css/dd-menu/dd_menu.css';

// libraries
import SearchBar from 'material-ui-search-bar';
import Button from '@material-ui/core/Button';

// constants
import sizes from '../../../styles/sizes';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

// component
import RestrictSessionPage from '../presentation/drm/RestrictSessionPage';
import RestrictDomainPage from '../presentation/drm/RestrictDomainPage';
import PrivateInvitePage from '../presentation/drm/PrivateInvitePage';
import SpecificAccessPage from '../presentation/drm/SpecificAccessPage';
import RemoveUserPage from '../presentation/drm/RemoveUserPage';

class DRM extends Component {
  state = {
    viewSafeguard: 0
  };

  handleSessionOption = () => {
    this.setState({
      viewSafeguard: 0
    });
  };

  handleDomainSignup = () => {
    this.setState({
      viewSafeguard: 1
    });
  };

  handlePrivateChannel = () => {
    this.setState({
      viewSafeguard: 2
    });
  };

  handleSpecificAccess = () => {
    this.setState({
      viewSafeguard: 3
    });
  };

  handleRemoveUser = () => {
    this.setState({
      viewSafeguard: 4
    });
  };

  render() {
    var renderSection;

    if (this.state.viewSafeguard == 0) {
      renderSection = <RestrictSessionPage />;
    } else if (this.state.viewSafeguard == 1) {
      renderSection = <RestrictDomainPage />;
    } else if (this.state.viewSafeguard == 2) {
      renderSection = <PrivateInvitePage />;
    } else if (this.state.viewSafeguard == 3) {
      renderSection = <SpecificAccessPage />;
    } else {
      renderSection = <RemoveUserPage />;
    }

    const {
      mainContainerStyle,
      mainWrapperStyle,

      topContainerStyle,
      topLeftContainerStyle,

      channelContainerStyle,
      channelLabelStyle,
      totalLabelstyle,

      bodyContainerStyle,
      channelSearchContainerStyle,
      searchBarWrapperStyle,
      searchBarStyle,

      channelInfoContainerStyle,
      safeguardInfoStyle,
      safeguardInfoLabelStyle,

      streamContainerStyle
    } = styles;

    return (
      <div style={mainContainerStyle}>
        <div style={mainWrapperStyle}>
          <div style={topContainerStyle}>
            <div style={topLeftContainerStyle}>
              <div style={channelContainerStyle}>
                <p style={channelLabelStyle}>Safeguard(s)</p>
                <p style={totalLabelstyle}>1 Total</p>
              </div>
            </div>
          </div>
          <div style={bodyContainerStyle}>
            <div style={channelSearchContainerStyle}>
              <div style={searchBarWrapperStyle}>
                <SearchBar
                  style={searchBarStyle}
                  placeholder={'Type for search'}
                />
              </div>
              <div style={channelInfoContainerStyle}>
                <div
                  style={safeguardInfoStyle}
                  onClick={() => this.handleSessionOption()}
                >
                  <p style={safeguardInfoLabelStyle}>
                    Restrict users to have a maximum number of sessions
                  </p>
                </div>
                <div
                  style={safeguardInfoStyle}
                  onClick={() => this.handleDomainSignup()}
                >
                  <p style={safeguardInfoLabelStyle}>
                    Allow specific email domains to signup
                  </p>
                </div>
                <div
                  style={safeguardInfoStyle}
                  onClick={() => this.handlePrivateChannel()}
                >
                  <p style={safeguardInfoLabelStyle}>
                    Enable Invite codes for private channels
                  </p>
                </div>
                <div
                  style={safeguardInfoStyle}
                  onClick={() => this.handleSpecificAccess()}
                >
                  <p style={safeguardInfoLabelStyle}>
                    Manage users from accessing specific channel
                  </p>
                </div>
                <div
                  style={safeguardInfoStyle}
                  onClick={() => this.handleRemoveUser()}
                >
                  <p style={safeguardInfoLabelStyle}>
                    Remove users & wipe downloaded content
                  </p>
                </div>
              </div>
            </div>
            <div style={streamContainerStyle}>{renderSection}</div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    width: sizes.dxWidth,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row'
  },
  mainWrapperStyle: {
    height: `calc(100vh - ${sizes.headerHeight})`,
    flex: 1,
    width: '100%'
  },
  clickHereLinkStyle: {
    color: colors.blueColor
  },
  channelContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: 308,
    justifyContent: 'space-between',
    marginLeft: 100,
    alignItems: 'flex-end',
    paddingBottom: 18,
    flex: 1
  },
  channelLabelStyle: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: fonts.h1
  },
  totalLabelstyle: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: fonts.h3,
    color: colors.lightGreyColor
  },
  bodyContainerStyle: {
    height: 'calc(100% - 114px)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  channelSearchContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: 308,
    background: 'white',
    height: 'calc(100% - 60px)',
    justifyContent: 'flex-start',
    marginBottom: 0,
    boxShadow: '0 1px 1px 0 #CED5DB'
  },
  channelInfoContainerStyle: {
    height: 'calc(100% - 48px)',
    flexDirection: 'column',
    overflowY: 'scroll'
  },
  searchBarWrapperStyle: {
    background: '#F1F7FE',
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderStyle: 'solid',
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0,
    height: 48
  },
  searchBarStyle: {
    width: '100%',
    boxShadow: 'none',
    paddingLeft: 6,
    height: '100%'
  },
  streamContainerStyle: {
    height: '100%',
    width: 692
  },
  topContainerStyle: {
    height: 96,
    display: 'flex',
    flexDirection: 'row'
  },
  topLeftContainerStyle: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  safeguardInfoStyle: {
    background: 'white',
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0.25,
    borderColor: colors.borderColor,
    borderStyle: 'solid',
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0,
    flex: 1,
    fontSize: fonts.h3,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 27,
    cursor: 'pointer',
    height: 36,
    alignItems: 'center'
  },
  safeguardInfoLabelStyle: {
    margin: 0,
    fontSize: fonts.h3,
    fontWeight: '500',
    color: colors.blackColor,
    fontFamily: 'avenir'
  }
};

export default DRM;

import React, { Component } from 'react';

// Libraries
import DropdownMenu from 'react-dd-menu';
import Language from '@material-ui/icons/Language';
import Lock from '@material-ui/icons/Lock';
import Fingerprint from '@material-ui/icons/Fingerprint';
import Edit from '@material-ui/icons/Edit';
import FlashOn from '@material-ui/icons/FlashOn';
import FlashOff from '@material-ui/icons/FlashOff';
import Button from '@material-ui/core/Button';

// constants
import fonts from '../../../../styles/fonts';
import colors from '../../../../styles/colors';

class ChannelListInfo extends Component {
  state = {
    isMenuOpen: false
  };

  handleMenuToggle = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  };

  handleMenuClose = () => {
    this.setState({
      isMenuOpen: false
    });
  };

  handleEditChannel = () => {
    this.setState({
      isMenuOpen: false
    });
    this.props.handleEditChannel();
  };

  handleToggleChannel = toggle => {
    this.setState({
      isMenuOpen: false
    });
    if (toggle) {
      this.props.handleActiveChannel();
    } else {
      this.props.handleDeactiveChannel();
    }
  };

  renderChannelIcon = channelType => {
    const { channelIconStyle } = styles;
    let icon;
    switch (channelType) {
      case '0':
      case '3':
        icon = <Language style={channelIconStyle} />;
        break;
      case '1':
        icon = <Lock style={channelIconStyle} />;
        break;
      case '2':
        icon = <Fingerprint style={channelIconStyle} />;
        break;
      default:
        break;
    }
    return icon;
  };

  render() {
    const {
      tableContainerStyle,
      tableWrapperStyle,
      channelInfoContainerStyle,
      channelStatusContainerStyle,
      channelInfoWrapperStyle,
      channelIconContainerStyle,
      channelInfo,
      channelInfoWrapper,
      channelTextStyle,
      channelColorIconStyle,
      flashonIconStyle,
      flashoffIconStyle,
      editIconStyle,
      optionBtnLabelStyle
    } = styles;

    const { channelLabel, backgroundColor, isLive } = this.props;

    return (
      <div style={channelInfoContainerStyle}>
        <DropdownMenu
          className="dx_channel_drop_menu"
          isOpen={this.state.isMenuOpen}
          close={() => this.handleMenuClose()}
          size={'md'}
          align="right"
          toggle={
            <div style={channelInfoWrapperStyle}>
              <div style={channelIconContainerStyle}>
                {this.renderChannelIcon(this.props.channelType)}
              </div>
              <div style={channelInfo} onClick={() => this.handleMenuToggle()}>
                <div style={channelInfoWrapper}>
                  <div style={tableContainerStyle}>
                    <div style={tableWrapperStyle}>
                      <span
                        style={Object.assign({}, channelColorIconStyle, {
                          backgroundColor
                        })}
                      />
                      <p style={channelTextStyle}>{channelLabel}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          closeOnInsideClick={false}
          closeOnOutsideClick={true}
        >
          {isLive ? (
            <Button onClick={() => this.handleToggleChannel(false)}>
              <FlashOff style={flashoffIconStyle} />
              <span style={optionBtnLabelStyle}>Draft</span>
            </Button>
          ) : (
            <Button onClick={() => this.handleToggleChannel(true)}>
              <FlashOn style={flashonIconStyle} />
              <span style={optionBtnLabelStyle}>Live</span>
            </Button>
          )}
          <Button onClick={() => this.handleEditChannel()}>
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <Edit style={editIconStyle} />
                <span style={optionBtnLabelStyle}>Edit</span>
              </div>
            </div>
          </Button>
        </DropdownMenu>

        <div style={channelStatusContainerStyle}>
          {isLive ? (
            <FlashOn style={flashonIconStyle} />
          ) : (
            <Edit style={editIconStyle} />
          )}
        </div>
      </div>
    );
  }
}

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
  channelInfoContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingBottom: 60,
    width: 240,
    marginRight: 48
  },
  channelInfoWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: 240,
    position: 'relative'
  },
  channelIconContainerStyle: {
    flex: '18px 0 0',
    position: 'relative'
  },
  channelIconStyle: {
    position: 'absolute',
    top: 21,
    left: 0,
    width: 18,
    height: 18
  },
  channelInfo: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: 6
  },
  channelInfoWrapper: {
    display: 'flex',
    height: 60,
    background: colors.whiteColor,
    cursor: 'pointer'
  },
  channelColorIconStyle: {
    position: 'absolute',
    top: 22,
    left: 7,
    display: 'block',
    width: 12,
    height: 12,
    borderRadius: '50%'
  },
  channelTextStyle: {
    paddingLeft: 36,
    margin: 0,
    fontSize: fonts.h3
  },
  channelStatusContainerStyle: {
    width: 24,
    height: 18,
    backgroundColor: colors.whiteColor,
    marginTop: 12,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flashonIconStyle: {
    color: colors.greenColor,
    fontSize: '14px'
  },
  flashoffIconStyle: {
    color: colors.greyLabelColor,
    fontSize: '14px'
  },
  editIconStyle: {
    color: colors.greyLabelColor,
    fontSize: '14px'
  },
  optionBtnLabelStyle: {
    paddingLeft: 6,
    fontSize: fonts.h3,
    margin: 0,
    color: colors.blackColor
  }
};

export default ChannelListInfo;

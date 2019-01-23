import React, { Component } from 'react';

// Libraries
import IconButton from '@material-ui/core/IconButton';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Language from '@material-ui/icons/Language';
import Lock from '@material-ui/icons/Lock';
import Fingerprint from '@material-ui/icons/Fingerprint';
import Warning from '@material-ui/icons/Warning';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import FlashOn from '@material-ui/icons/FlashOn';
import FlashOff from '@material-ui/icons/FlashOff';

import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Popover from '@material-ui/core/Popover';

// constants
import fonts from '../../../../styles/fonts';
import colors from '../../../../styles/colors';

class ChannelStream extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();

    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleEditChannel = e => {
    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    this.handleClose();
    this.props.handleEditChannel();
  };

  handleDeleteChannel = e => {
    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    this.handleClose();
    this.props.handleDeleteChannel();
  };

  handleToggleChannel = (e, toggle) => {
    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    this.handleClose();
    if (toggle) {
      this.props.handleActiveChannel();
    } else {
      this.props.handleDeactiveChannel();
    }
  };

  renderChannelIcon = channel => {
    const { channelIconStyle } = styles;
    let icon;
    switch (channel.ChannelType) {
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

  renderBottomChannelIcon = channel => {
    const { bottomChannelIconStyle } = styles;
    let icon;
    switch (channel.ChannelStatus) {
      case 'DRAFT':
        icon = (
          <div className="dx_stream_channel dx_tool_tip">
            <Warning style={bottomChannelIconStyle} />
            <span class="dx_tool_tip_text">Draft</span>
          </div>
        );
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
      channelInfoStyle,
      channelInfoWrapperStyle,
      channelIconContainerStyle,
      channelBottomIconContainerStyle,
      channelInfoLeftStyle,
      channelTitleStyle,
      streamLabelStyle,
      channelInfoRightStyle,
      channelInfoIconStyle,

      flashonIconStyle,
      flashoffIconStyle,
      editIconStyle,
      optionBtnLabelStyle
    } = styles;

    const { channel, active } = this.props;

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div
        className="dx_tab"
        style={Object.assign({}, channelInfoStyle, {
          backgroundColor: active ? colors.lightBlueColor : colors.whiteColor
        })}
        onClick={() => this.props.handleSelectChannel()}
      >
        <div style={channelInfoWrapperStyle}>
          <div style={channelIconContainerStyle}>
            {this.renderChannelIcon(channel)}
          </div>
          <div style={channelBottomIconContainerStyle}>
            {this.renderBottomChannelIcon(channel)}
          </div>
          <div style={channelInfoLeftStyle}>
            <p
              style={Object.assign({}, channelTitleStyle, {
                color: channel.ChannelColor
              })}
            >
              {channel.ChannelName}
            </p>
            <p style={streamLabelStyle}>
              {channel.ExperienceStreams.length} live streams
            </p>
          </div>
          <div style={channelInfoRightStyle}>
            <IconButton
              style={channelInfoIconStyle}
              aria-owns={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              onClick={e => this.handleClick(e)}
            >
              <MoreHoriz />
            </IconButton>
            <Popover
              style={{ marginTop: 12 }}
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <div>
                {channel.ChannelType != 3 ? (
                  channel.ChannelStatus == 'LIVE' ? (
                    <Button
                      onClick={e => this.handleToggleChannel(e, false)}
                      style={{ width: 110 }}
                    >
                      <FlashOff style={flashoffIconStyle} />
                      <span style={optionBtnLabelStyle}>Draft</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={e => this.handleToggleChannel(e, true)}
                      style={{ width: 110 }}
                    >
                      <FlashOn style={flashonIconStyle} />
                      <span style={optionBtnLabelStyle}>Live</span>
                    </Button>
                  )
                ) : null}
              </div>
              <div>
                <Button
                  onClick={e => this.handleEditChannel(e)}
                  style={{ width: 110 }}
                >
                  <div style={tableContainerStyle}>
                    <div style={tableWrapperStyle}>
                      <Edit style={editIconStyle} />
                      <span style={optionBtnLabelStyle}>Edit</span>
                    </div>
                  </div>
                </Button>
              </div>
              <div>
                {channel.ChannelType != 3 ? (
                  <Button
                    onClick={e => this.handleDeleteChannel(e)}
                    style={{ width: 110 }}
                  >
                    <div style={tableContainerStyle}>
                      <div style={tableWrapperStyle}>
                        <Delete style={editIconStyle} />
                        <span style={optionBtnLabelStyle}>Remove</span>
                      </div>
                    </div>
                  </Button>
                ) : null}
              </div>
            </Popover>
          </div>
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
  channelInfoStyle: {
    display: 'flex',
    paddingLeft: 18,
    paddingRight: 18,
    cursor: 'pointer'
  },
  channelInfoWrapperStyle: {
    position: 'relative',
    borderBottom: '1px solid',
    borderColor: colors.borderColor,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 24
  },
  channelIconContainerStyle: {
    position: 'absolute',
    top: 12,
    left: 0,
    height: 18,
    width: 18
  },
  channelBottomIconContainerStyle: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    height: 18,
    width: 18
  },
  channelIconStyle: {
    width: 18,
    height: 18
  },
  bottomChannelIconStyle: {
    width: 18,
    height: 18,
    color: colors.redColor
  },
  channelInfoLeftStyle: {
    flex: 1,
    fontSize: fonts.h5,
    paddingTop: 12,
    paddingBottom: 12
  },
  channelTitleStyle: {
    fontSize: fonts.h3,
    margin: 0,
    marginBottom: 14
  },
  streamLabelStyle: {
    fontSize: fonts.h5,
    color: colors.lightGreyColor,
    margin: 0
  },
  channelInfoRightStyle: {
    flex: '24px 0 0',
    alignSelf: 'center',
    margin: 0
  },
  channelInfoIconStyle: {
    height: 20,
    width: 20
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
export default ChannelStream;

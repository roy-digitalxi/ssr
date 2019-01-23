import React, { Component } from 'react';

// Libraries
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Fade from '@material-ui/core/Fade';
import Popover from '@material-ui/core/Popover';
import Edit from '@material-ui/icons/Edit';
import FlashOn from '@material-ui/icons/FlashOn';

// colors
import colors from '../../../styles/colors';

// constants
import fonts from '../../../styles/fonts';
import config from '../../../config';

class OrgInfo extends Component {
  state = {
    anchorEl: null
  };

  preventParent = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  };

  handleClick = event => {
    this.preventParent(event);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    this.preventParent(event);
    this.setState({ anchorEl: null });
  };

  handleUpdateOrg = event => {
    this.preventParent(event);
    this.setState({ anchorEl: null });
    this.props.handleUpdateOrg();
  };

  handleToggleStatus = event => {
    this.preventParent(event);
    this.setState({ anchorEl: null });
    this.props.handleToggleStatus();
  };

  render() {
    const { org } = this.props;

    const {
      mainContainerStyle,
      infoContainerStyle,
      infoWrapperStyle,
      actionContainerStyle,
      btnContainerStyle,
      optionBtnLabelStyle,
      moreIconStyle,
      editIconStyle
    } = styles;

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div style={mainContainerStyle}>
        <div style={infoContainerStyle}>
          <div style={infoWrapperStyle}>{org.OrgName}</div>
        </div>
        <div style={infoContainerStyle}>
          <div style={infoWrapperStyle}>{org.OrgUrl}.publishxi.com</div>
        </div>
        <div style={infoContainerStyle}>
          <div style={infoWrapperStyle}>{org.Realm}</div>
        </div>
        <div style={infoContainerStyle}>
          <div style={infoWrapperStyle}>
            {org.IsActive == '1' ? 'active' : 'inactive'}
          </div>
        </div>
        <div style={actionContainerStyle}>
          <div style={btnContainerStyle}>
            <IconButton
              style={moreIconStyle}
              aria-owns={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
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
                <Button
                  onClick={e => this.handleUpdateOrg(e)}
                  style={{ width: '100%' }}
                >
                  <Edit style={editIconStyle} />
                  <span style={optionBtnLabelStyle}>Edit</span>
                </Button>
              </div>
              <div>
                <Button
                  onClick={e => this.handleToggleStatus(e)}
                  style={{ width: '100%' }}
                >
                  <FlashOn style={editIconStyle} />
                  <span style={optionBtnLabelStyle}>
                    {org.IsActive == '1' ? 'Deactive' : 'Active'}
                  </span>
                </Button>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    backgroundColor: colors.whiteColor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottom: '1px solid #d2d8de',
    height: 72
  },
  infoContainerStyle: {
    flex: 1
  },
  infoWrapperStyle: {
    paddingLeft: 12,
    paddingRight: 12
  },
  actionContainerStyle: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  btnContainerStyle: {
    paddingRight: 24
  },
  optionBtnLabelStyle: {
    paddingLeft: 6,
    fontSize: fonts.h3,
    margin: 0,
    color: colors.blackColor,
    textTransform: 'capitalize'
  },
  moreIconStyle: {
    height: 20,
    width: 20
  },
  editIconStyle: {
    color: colors.greyLabelColor,
    fontSize: '14px'
  }
};

export default OrgInfo;

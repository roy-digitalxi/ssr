import React, { Component } from 'react';

// Libraries
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Edit from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Popover from '@material-ui/core/Popover';
import Delete from '@material-ui/icons/Delete';
import Lock from '@material-ui/icons/Lock';

// constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

import * as tools from '../../../helpers/tools';

import '../../../../../assets/css/index.css';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.id = tools.uuid();
  }

  state = {
    anchorEl: null
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isSelected && nextProps.isSelected) {
      console.log('updated');
    }
  }

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

  handleUpdateUser = event => {
    this.preventParent(event);
    this.setState({ anchorEl: null });
    this.props.handleUpdateUser();
  };

  handleResetUserPassword = event => {
    this.preventParent(event);
    this.setState({ anchorEl: null });
    this.props.handleResetUserPassword();
  };

  handleDeleteUser = event => {
    this.preventParent(event);
    this.setState({ anchorEl: null });
    this.props.handleDeleteUser();
  };

  handleSelectMode = event => {
    this.preventParent(event);
    this.props.handleSelectMode();
  };

  render() {
    const { selectMode, isSelected } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,

      memberInfoWrapperStyle,
      avatarWrapperStyle,
      userAvatarStyle,

      userNameWrapperStyle,
      userNameStyle,
      userEmailStyle,

      userRegisterWrapperStyle,
      userRegisterDateStyle,
      userRegisterStatusStyle,

      moreBtnContainerStyle,
      moreIconStyle,
      optionBtnLabelStyle,
      editIconStyle
    } = styles;

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const id = this.id;

    let formattedRoles = this.props.roles.replace(/-admin/g, '');
    formattedRoles = formattedRoles.replace(/,/g, ' / ');

    return (
      <div style={memberInfoWrapperStyle}>
        <div style={avatarWrapperStyle}>
          {selectMode ? (
            <div className="dx_checkbox">
              <input
                type="checkbox"
                id={id}
                checked={isSelected}
                onChange={() => this.props.handleToggleSelect(!isSelected)}
              />
              <label htmlFor={id} />
            </div>
          ) : (
            <Avatar
              style={userAvatarStyle}
              src={this.props.userPicture}
              style={{ cursor: 'pointer' }}
              onClick={e => this.handleSelectMode(e)}
            />
          )}
        </div>
        <div style={userNameWrapperStyle}>
          <p style={userNameStyle}>{this.props.userName}</p>
          <p style={userEmailStyle}>{this.props.userEmail}</p>
        </div>
        <div style={userRegisterWrapperStyle}>
          <p style={userRegisterDateStyle}>{this.props.userRegistrationDate}</p>
          <p style={userRegisterStatusStyle}>{formattedRoles}</p>
        </div>
        <div style={moreBtnContainerStyle}>
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
                onClick={e => this.handleUpdateUser(e)}
                style={{ width: 110, padding: 0 }}
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
              <Button
                onClick={e => this.handleResetUserPassword(e)}
                style={{ width: 110, padding: 0 }}
              >
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <Lock style={editIconStyle} />
                    <span style={optionBtnLabelStyle}>Password</span>
                  </div>
                </div>
              </Button>
            </div>
            <div>
              <Button
                onClick={e => this.handleDeleteUser(e)}
                style={{ width: 110, padding: 0 }}
              >
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <Delete style={editIconStyle} />
                    <span style={optionBtnLabelStyle}>Delete</span>
                  </div>
                </div>
              </Button>
            </div>
          </Popover>
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
    verticalAlign: 'middle',
    textAlign: 'center'
  },

  memberInfoWrapperStyle: {
    backgroundColor: colors.whiteColor,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottom: '1px solid #d2d8de',
    height: 72
  },

  // 1
  avatarWrapperStyle: {
    flex: '48px 0 0',
    paddingRight: 12
  },
  userAvatarStyle: {
    width: 48
  },

  // 2
  userNameWrapperStyle: {
    flex: '240px 0 0'
  },
  userNameStyle: {
    margin: 0,
    fontSize: fonts.h3
  },
  userEmailStyle: {
    marginTop: 3,
    marginBottom: 0,
    color: colors.lightGreyColor,
    fontSize: fonts.h4
  },

  // 3
  userRegisterWrapperStyle: {
    flex: 1
  },
  userRegisterDateStyle: {
    margin: 0,
    fontSize: fonts.h3
  },
  userRegisterStatusStyle: {
    marginTop: 3,
    marginBottom: 0,
    color: colors.lightGreyColor,
    fontSize: fonts.h4
  },

  // 4
  moreBtnContainerStyle: {
    flex: '60px 0 0'
  },
  moreIconStyle: {
    height: 20,
    width: 20
  },
  optionBtnLabelStyle: {
    paddingLeft: 6,
    fontSize: fonts.h3,
    margin: 0,
    color: colors.blackColor,
    textTransform: 'capitalize'
  },
  editIconStyle: {
    color: colors.greyLabelColor,
    fontSize: '14px'
  }
};
export default UserInfo;

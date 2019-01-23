import React, { Component } from 'react';

// Libraries
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

// constants
import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';

// styles
import '../../../../../../assets/css/modal/rrm.css';

const themeStyles = theme => ({
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#52d869'
      }
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp
    })
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none'
    }
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border'])
  },
  iOSIcon: {
    width: 24,
    height: 24
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1]
  }
});

class UserModal extends Component {
  state = {
    isConfirmModalOpen: false
  };

  preventParent = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  };

  handleCloseModal = event => {
    this.preventParent(event);
    this.props.handleCloseModal();
  };

  handleBlurUserEmail = event => {
    this.preventParent(event);
    this.props.handleBlurUserEmail();
  };

  handleChangeUserEnabled = (event, value) => {
    this.preventParent(event);
    this.props.handleChangeUserEnabled(value);
  };

  handleUpdateClick = event => {
    this.preventParent(event);
    this.props.handleUpdateClick();
  };

  handleDelteClick = event => {
    this.preventParent(event);
    this.setState({
      isConfirmModalOpen: true
    });
  };

  handleConfirmDeleteClick = event => {
    this.preventParent(event);
    this.setState({
      isConfirmModalOpen: false
    });
    this.props.handleDelteClick();
  };

  handleCloseConfirmModal = () => {
    this.setState({
      isConfirmModalOpen: false
    });
  };

  render() {
    const {
      open,
      isSearching,
      user,
      userChannels,
      userSelectedOptions
    } = this.props;

    const { isConfirmModalOpen } = this.state;

    const {
      mainContainerStyle,
      titleContainerStyle,
      iconContainerStyle,
      iconStyle,
      titleWrapperStyle,
      titleStyle,

      userFormContainerStyle,
      formLabelContainerStyle,
      formInputContainerStyle,
      inputStyle,
      loaderContainerStyle,
      loaderStyle,

      channelFilterContainerStyle,
      filterTitleContainerStyle,
      filterTitleStyle,
      filterSubTitleStyle,
      channelSearchWrapperStyle,

      actionBtnContainerStyle,
      btnContainerStyle,
      confirmBtnStyle,
      deleteBtnStyle,

      errorMsgStyle,

      confirmContainerStyle,
      confirmTitleContainerStyle,
      confirmTitleWrapperStyle,
      confirmTitleStyle,

      confirmDescContainerStyle,
      confirmDescWrapperStyle,
      confirmDescStyle,

      confirmActionContainerStyle,
      cannelBtnStyle,
      confirmDelteBtnStyle
    } = styles;

    const { classes } = this.props;

    const customStyles = {
      control: (base, state) => ({
        ...base,
        height: '36px',
        'min-height': '36px',
        border: '1px solid #B2B2B2',
        paddingLeft: 12,
        whiteSpace: 'nowrap',
        overflowX: 'scroll',
        cursor: 'auto'
      })
    };

    userChannels.forEach(uc => {
      uc.value = uc.ExperienceChannelGUID;
      uc.label = uc.ChannelName;
    });

    userSelectedOptions.forEach(uso => {
      if (!uso.label) {
        uso.label = uso.ChannelName;
      }
      if (!uso.value) {
        uso.value = uso.ExperienceChannelGUID;
      }
    });

    return (
      <Modal
        open={open}
        onClose={e => this.handleCloseModal(e)}
        center
        closeOnOverlayClick={false}
        classNames={{
          overlay: 'dx_overlay',
          modal: 'dx_user_invite_modal'
        }}
      >
        <div style={mainContainerStyle} onClick={e => this.preventParent(e)}>
          <div style={titleContainerStyle}>
            <div style={iconContainerStyle}>
              <Edit style={iconStyle} />
            </div>
            <div style={titleWrapperStyle}>
              <p style={titleStyle}>Update user</p>
            </div>
          </div>
          <div style={userFormContainerStyle}>
            <div style={formLabelContainerStyle}>Email</div>
            <div style={formInputContainerStyle}>
              <input
                className="dx_user_edit_input"
                type="text"
                value={user.Email}
                placeholder="name@example.com"
                onBlur={e => this.handleBlurUserEmail(e)}
                onChange={e =>
                  this.props.handleUpdateUser('EMAIL', e.target.value)
                }
                style={inputStyle}
              />
              {isSearching ? (
                <div style={loaderContainerStyle}>
                  <ClipLoader
                    style={loaderStyle}
                    color={colors.blueColor}
                    sizeUnit={'px'}
                    size={18}
                  />
                </div>
              ) : null}
            </div>
            {user.IsValidate ? null : (
              <p style={errorMsgStyle}>{user.ErrorMsg}</p>
            )}
          </div>
          <div style={userFormContainerStyle}>
            <div style={formLabelContainerStyle}>First name</div>
            <div style={formInputContainerStyle}>
              <input
                className="dx_user_edit_input"
                type="text"
                value={user.FirstName}
                placeholder="Optional"
                onChange={e =>
                  this.props.handleUpdateUser('FIRST_NAME', e.target.value)
                }
                style={inputStyle}
              />
            </div>
          </div>
          <div style={userFormContainerStyle}>
            <div style={formLabelContainerStyle}>Last name</div>
            <div style={formInputContainerStyle}>
              <input
                className="dx_user_edit_input"
                type="text"
                value={user.LastName}
                placeholder="Optional"
                onChange={e =>
                  this.props.handleUpdateUser('LAST_NAME', e.target.value)
                }
                style={inputStyle}
              />
            </div>
          </div>
          <div style={userFormContainerStyle}>
            <div style={formLabelContainerStyle}>Enable</div>
            <div style={formInputContainerStyle}>
              <FormControlLabel
                control={
                  <Switch
                    classes={{
                      switchBase: classes.iOSSwitchBase,
                      bar: classes.iOSBar,
                      icon: classes.iOSIcon,
                      iconChecked: classes.iOSIconChecked,
                      checked: classes.iOSChecked
                    }}
                    disableRipple
                    checked={user.Enabled}
                    onChange={this.handleChangeUserEnabled}
                    value="1"
                  />
                }
              />
            </div>
          </div>
          <div style={channelFilterContainerStyle}>
            <div style={filterTitleContainerStyle}>
              <p style={filterTitleStyle}>Private Channels</p>
              <p style={filterSubTitleStyle}>
                New users will automatically join general and selected channels
              </p>
              <div style={channelSearchWrapperStyle}>
                <Select
                  styles={customStyles}
                  isMulti
                  options={userChannels}
                  value={userSelectedOptions}
                  isSearchable
                  placeholder="Search channel.."
                  onInputChange={this.props.handleSearchChannel}
                  onChange={this.props.handleSelectOption}
                />
              </div>
            </div>
          </div>
          <div style={actionBtnContainerStyle}>
            <div style={btnContainerStyle}>
              <Button
                disabled={isSearching}
                style={confirmBtnStyle}
                fullWidth
                variant="text"
                onClick={e => this.handleUpdateClick(e)}
              >
                Update
              </Button>
            </div>
            <div style={btnContainerStyle}>
              <Button
                disabled={isSearching}
                style={deleteBtnStyle}
                fullWidth
                variant="text"
                onClick={e => this.handleDelteClick(e)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
        {isConfirmModalOpen && (
          <Modal
            open={open}
            onClose={e => this.handleCloseConfirmModal(e)}
            center
            closeOnOverlayClick={false}
            showCloseIcon={false}
            classNames={{
              overlay: 'dx_overlay',
              modal: 'dx_user_inner_modal'
            }}
          >
            <div
              style={confirmContainerStyle}
              onClick={e => this.preventParent(e)}
            >
              <div style={confirmTitleContainerStyle}>
                <div style={confirmTitleWrapperStyle}>
                  <p style={confirmTitleStyle}>Confirm Delete User</p>
                </div>
              </div>
              <div style={confirmDescContainerStyle}>
                <div style={confirmDescWrapperStyle}>
                  <p style={confirmDescStyle}>Do you want to proceed?</p>
                </div>
              </div>
              <div style={confirmActionContainerStyle}>
                <div
                  style={Object.assign(
                    {},
                    { paddingRight: 24 },
                    btnContainerStyle
                  )}
                >
                  <Button
                    style={cannelBtnStyle}
                    fullWidth
                    variant="text"
                    onClick={e => this.handleCloseConfirmModal(e)}
                  >
                    Cannel
                  </Button>
                </div>
                <div style={btnContainerStyle}>
                  <Button
                    style={confirmDelteBtnStyle}
                    fullWidth
                    variant="text"
                    onClick={e => this.handleConfirmDeleteClick(e)}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </Modal>
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
  mainContainerStyle: {
    height: '100%',
    backgroundColor: colors.whiteColor,
    padding: 36
  },
  titleContainerStyle: {
    paddingTop: 30,
    paddingBottom: 30
  },
  iconContainerStyle: {
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    fontSize: 24
  },
  titleWrapperStyle: {
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: fonts.h1,
    margin: 0
  },
  userFormContainerStyle: {
    marginBottom: 12
  },
  formLabelContainerStyle: {
    fontSize: fonts.h2,
    margin: 0,
    marginBottom: 6
  },
  formInputContainerStyle: {
    flex: 2,
    height: 30,
    alignItems: 'center',
    paddingBottom: 18,
    position: 'relative'
  },
  inputStyle: {
    width: 'calc(100% - 12px)',
    height: 30,
    border: '1px solid #B2B2B2',
    borderRadius: '3px',
    outline: 'none',
    fontSize: fonts.h3,
    paddingLeft: 6,
    paddingRight: 6
  },
  loaderContainerStyle: {
    position: 'absolute',
    right: 0,
    top: 4,
    height: 30,
    width: 30
  },
  loaderStyle: {
    fontSize: 12
  },
  channelFilterContainerStyle: {
    paddingBottom: 24
  },
  filterTitleContainerStyle: {
    paddingTop: 6,
    paddingBottom: 6
  },
  filterTitleStyle: {
    margin: 0,
    fontSize: fonts.h2,
    marginBottom: 3
  },
  filterSubTitleStyle: {
    margin: 0,
    fontSize: fonts.h4,
    color: colors.greyLabelColor
  },
  channelSearchWrapperStyle: {
    paddingTop: 12,
    paddingBottom: 12,
    height: 36
  },
  actionBtnContainerStyle: {
    height: 42,
    width: 240,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnContainerStyle: {
    height: 42
  },
  confirmBtnStyle: {
    fontSize: fonts.h1,
    height: 42,
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'capitalize'
  },
  deleteBtnStyle: {
    fontSize: fonts.h1,
    height: 42,
    backgroundColor: colors.redColor,
    color: colors.whiteColor,
    textTransform: 'capitalize'
  },
  errorMsgStyle: {
    margin: 0,
    marginTop: 6,
    color: '#C43C44',
    fontSize: fonts.h4
  },

  confirmContainerStyle: {},
  confirmTitleContainerStyle: {
    borderBottom: '1px solid #DADDE1'
  },
  confirmTitleWrapperStyle: {
    paddingLeft: 18,
    paddingRight: 18,
    height: 54,
    display: 'flex',
    alignItems: 'center'
  },
  confirmTitleStyle: {
    fontSize: fonts.h1,
    fontWeight: 'bold',
    margin: 0
  },

  confirmDescContainerStyle: {
    borderBottom: '1px solid #DADDE1'
  },
  confirmDescWrapperStyle: {
    paddingLeft: 18,
    paddingRight: 18,
    height: 60,
    display: 'flex',
    alignItems: 'center'
  },
  confirmDescStyle: {
    fontSize: fonts.h1,
    margin: 0
  },
  confirmActionContainerStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
    height: 72
  },
  cannelBtnStyle: {
    fontSize: fonts.h2,
    height: 36,
    backgroundColor: colors.whiteColor,
    color: colors.blackColor,
    border: '1px solid #DADDE1',
    textTransform: 'capitalize'
  },
  confirmDelteBtnStyle: {
    fontSize: fonts.h3,
    height: 36,
    backgroundColor: colors.redColor,
    color: colors.whiteColor,
    textTransform: 'capitalize'
  }
};

export default withStyles(themeStyles)(UserModal);

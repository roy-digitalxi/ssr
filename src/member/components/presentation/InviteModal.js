import React, { Component } from 'react';

// Libraries
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Send from '@material-ui/icons/Send';
import Close from '@material-ui/icons/Close';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

// styles
import '../../../../../assets/css/modal/rrm.css';

class InviteModal extends Component {
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

  handleBlurNewUserEmail = (event, index) => {
    this.preventParent(event);
    this.props.handleBlurNewUserEmail(index);
  };

  handleAddUserForm = event => {
    this.preventParent(event);
    this.props.handleAddUserForm();
  };

  handleDeleteUserForm = (event, index) => {
    this.preventParent(event);
    this.props.handleDeleteUserForm(index);
  };

  handleConfirmClick = event => {
    this.preventParent(event);
    this.props.handleConfirmClick();
  };

  render() {
    const {
      open,
      isSearching,
      newUsers,
      userRoles,
      userSelectedOptions
    } = this.props;

    const {
      mainContainerStyle,
      titleContainerStyle,
      iconContainerStyle,
      iconStyle,
      titleWrapperStyle,
      titleStyle,

      formContainerStyle,
      formTitleContainerStyle,
      formEmailTitleWrapperStyle,
      formTitleWrapperStyle,
      formTitleStyle,

      formItemContainerStyle,
      formEmailInputContainerStyle,
      formEmailInputWrapperStyle,
      loaderContainerStyle,
      loaderStyle,
      formInputContainerStyle,
      inputStyle,
      errorMsgStyle,
      formItemDeleteContainerStyle,
      formItemDeleteStyle,
      deleteIconStyle,

      addFormContainerStyle,
      addFormWrapperStyle,
      addFormIconWrapperStyle,
      addFormIconStyle,
      addFormLabelWrapperStyle,
      addFormLabel,

      channelFilterContainerStyle,
      filterTitleContainerStyle,
      filterTitleStyle,
      filterSubTitleStyle,
      channelSearchWrapperStyle,

      actionBtnContainerStyle,
      confirmBtnContainerStyle,
      confirmBtnStyle
    } = styles;

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

    return (
      <Modal
        open={open}
        onClose={e => this.handleCloseModal(e)}
        center
        classNames={{
          overlay: 'dx_overlay',
          modal: 'dx_user_invite_modal'
        }}
      >
        <div style={mainContainerStyle} onClick={e => this.preventParent(e)}>
          <div style={titleContainerStyle}>
            <div style={iconContainerStyle}>
              <Send style={iconStyle} />
            </div>
            <div style={titleWrapperStyle}>
              <p style={titleStyle}>Invite users</p>
            </div>
          </div>
          <div style={formContainerStyle}>
            <div style={formTitleContainerStyle}>
              <div style={formEmailTitleWrapperStyle}>
                <p style={formTitleStyle}>Email Address</p>
              </div>
              <div style={formTitleWrapperStyle}>
                <p style={formTitleStyle}>First Name (optional)</p>
              </div>
              <div style={formTitleWrapperStyle}>
                <p style={formTitleStyle}>Last Name (optional)</p>
              </div>
            </div>
            {newUsers.map((newUser, index) => (
              <div style={formItemContainerStyle}>
                <div style={formEmailInputContainerStyle}>
                  <div style={formEmailInputWrapperStyle}>
                    <input
                      className="dx_user_invite_input"
                      type="text"
                      value={newUser.Email}
                      placeholder="name@example.com"
                      onBlur={e => this.handleBlurNewUserEmail(e, index)}
                      onChange={e =>
                        this.props.handleUpdateNewUser(
                          index,
                          'EMAIL',
                          e.target.value
                        )
                      }
                      style={Object.assign(
                        {},
                        inputStyle,
                        newUser.IsValidate
                          ? null
                          : {
                              border: '1px solid #C43C44',
                              backgroundColor: '#F8EAEC'
                            }
                      )}
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
                  {newUser.IsValidate ? null : (
                    <p style={errorMsgStyle}>{newUser.ErrorMsg}</p>
                  )}
                </div>
                <div style={formInputContainerStyle}>
                  <input
                    className="dx_user_invite_input"
                    type="text"
                    value={newUser.FirstName}
                    placeholder="Optional"
                    onChange={e =>
                      this.props.handleUpdateNewUser(
                        index,
                        'FIRST_NAME',
                        e.target.value
                      )
                    }
                    style={inputStyle}
                  />
                </div>
                <div style={formInputContainerStyle}>
                  <input
                    className="dx_user_invite_input"
                    type="text"
                    value={newUser.LastName}
                    placeholder="Optional"
                    onChange={e =>
                      this.props.handleUpdateNewUser(
                        index,
                        'LAST_NAME',
                        e.target.value
                      )
                    }
                    style={inputStyle}
                  />
                </div>
                <div style={formItemDeleteContainerStyle}>
                  <IconButton
                    style={formItemDeleteStyle}
                    onClick={e => this.handleDeleteUserForm(e, index)}
                  >
                    <Close style={deleteIconStyle} />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
          <div style={addFormContainerStyle}>
            <div
              style={addFormWrapperStyle}
              onClick={e => this.handleAddUserForm(e)}
            >
              <div style={addFormIconWrapperStyle}>
                <AddCircleOutline style={addFormIconStyle} />
              </div>
              <div style={addFormLabelWrapperStyle}>
                <p className="dx_hover_underline_a" style={addFormLabel}>
                  Add another
                </p>
              </div>
            </div>
          </div>
          <div style={channelFilterContainerStyle}>
            <div style={filterTitleContainerStyle}>
              <p style={filterTitleStyle}>Roles</p>
              <p style={filterSubTitleStyle}>
                New users will automatically assigned with selected roles
              </p>
              <div style={channelSearchWrapperStyle}>
                <Select
                  styles={customStyles}
                  isMulti
                  options={userRoles}
                  value={userSelectedOptions}
                  isSearchable
                  placeholder="Search roles.."
                  onChange={this.props.handleSelectOption}
                />
              </div>
            </div>
          </div>
          <div style={actionBtnContainerStyle}>
            <div style={confirmBtnContainerStyle}>
              <Button
                disabled={isSearching}
                style={confirmBtnStyle}
                fullWidth
                variant="text"
                onClick={e => this.handleConfirmClick(e)}
              >
                Send Invitations
              </Button>
            </div>
          </div>
        </div>
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
  formContainerStyle: {},
  formTitleContainerStyle: {
    display: 'flex',
    height: 36,
    alignItems: 'center',
    paddingRight: 30
  },
  formEmailTitleWrapperStyle: {
    flex: 3
  },
  formTitleWrapperStyle: {
    flex: 2
  },
  formTitleStyle: {
    fontSize: fonts.h2,
    margin: 0
  },
  formItemContainerStyle: {
    height: 60,
    display: 'flex',
    position: 'relative',
    paddingRight: 30
  },
  formEmailInputContainerStyle: {
    flex: 3,
    paddingRight: 12,
    height: 30,
    alignItems: 'center',
    paddingBottom: 18
  },
  formEmailInputWrapperStyle: {
    position: 'relative'
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
  formInputContainerStyle: {
    flex: 2,
    paddingRight: 12,
    height: 30,
    alignItems: 'center',
    paddingBottom: 18
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
  errorMsgStyle: {
    margin: 0,
    marginTop: 6,
    color: '#C43C44',
    fontSize: fonts.h4
  },
  formItemDeleteContainerStyle: {
    height: 30,
    width: 30,
    position: 'absolute',
    right: 0,
    top: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  formItemDeleteStyle: {
    width: 24,
    height: 24
  },
  deleteIconStyle: {
    fontSize: 18
  },
  addFormContainerStyle: {
    height: 36,
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 24
  },
  addFormWrapperStyle: {
    height: 30,
    width: 150,
    display: 'flex',
    cursor: 'pointer'
  },
  addFormIconWrapperStyle: {
    flex: '30px 0 0',
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addFormIconStyle: {},
  addFormLabelWrapperStyle: {
    height: 30,
    fontSize: fonts.h3,
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  addFormLabel: {
    margin: 0,
    paddingLeft: 3
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  confirmBtnContainerStyle: {
    height: 42
  },
  confirmBtnStyle: {
    fontSize: fonts.h1,
    height: 42,
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'capitalize'
  }
};

export default InviteModal;

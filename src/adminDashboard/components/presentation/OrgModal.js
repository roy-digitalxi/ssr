import React, { Component } from 'react';

// Libraries
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

// styles
import '../../../../../assets/css/modal/rrm.css';

class OrgModal extends Component {
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

  handleCreateClick = event => {
    this.preventParent(event);
    this.props.handleCreateClick();
  };

  handleUpdateClick = event => {
    this.preventParent(event);
    this.props.handleUpdateClick();
  };

  render() {
    const { open, isFetching, type, org } = this.props;

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

      actionBtnContainerStyle,
      btnContainerStyle,
      confirmBtnStyle
    } = styles;

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
              <Send style={iconStyle} />
            </div>
            <div style={titleWrapperStyle}>
              <p style={titleStyle}>
                {type == 'CREATE' ? 'Create' : 'Update'} organization
              </p>
            </div>
          </div>
          <div style={userFormContainerStyle}>
            <div style={formLabelContainerStyle}>Org Name</div>
            <div style={formInputContainerStyle}>
              <input
                className="dx_user_edit_input"
                type="text"
                value={org.OrgName}
                placeholder="Organization name"
                onChange={e =>
                  this.props.handleUpdateOrgInput('ORG_NAME', e.target.value)
                }
                style={inputStyle}
              />
            </div>
          </div>
          {type == 'CREATE' && (
            <React.Fragment>
              <div style={userFormContainerStyle}>
                <div style={formLabelContainerStyle}>Email</div>
                <div style={formInputContainerStyle}>
                  <input
                    className="dx_user_edit_input"
                    type="text"
                    value={org.Email}
                    placeholder="name@example.com"
                    onChange={e =>
                      this.props.handleUpdateOrgInput('EMAIL', e.target.value)
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={userFormContainerStyle}>
                <div style={formLabelContainerStyle}>First name</div>
                <div style={formInputContainerStyle}>
                  <input
                    className="dx_user_edit_input"
                    type="text"
                    value={org.FirstName}
                    placeholder="First name"
                    onChange={e =>
                      this.props.handleUpdateOrgInput(
                        'FIRST_NAME',
                        e.target.value
                      )
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
                    value={org.LastName}
                    placeholder="Last name"
                    onChange={e =>
                      this.props.handleUpdateOrgInput(
                        'LAST_NAME',
                        e.target.value
                      )
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={userFormContainerStyle}>
                <div style={formLabelContainerStyle}>Password</div>
                <div style={formInputContainerStyle}>
                  <input
                    className="dx_user_edit_input"
                    type="password"
                    value={org.Password}
                    placeholder="Password"
                    onChange={e =>
                      this.props.handleUpdateOrgInput(
                        'PASSWORD',
                        e.target.value
                      )
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
              <div style={userFormContainerStyle}>
                <div style={formLabelContainerStyle}>Confirm password</div>
                <div style={formInputContainerStyle}>
                  <input
                    className="dx_user_edit_input"
                    type="password"
                    value={org.ConfirmPassword}
                    placeholder="Confirm password"
                    onChange={e =>
                      this.props.handleUpdateOrgInput(
                        'CONFIRM_PASSWORD',
                        e.target.value
                      )
                    }
                    style={inputStyle}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
          {type == 'UPDATE' && (
            <div style={userFormContainerStyle}>
              <div style={formLabelContainerStyle}>Org Url</div>
              <div style={formInputContainerStyle}>
                <input
                  disabled
                  className="dx_user_edit_input"
                  type="test"
                  value={org.OrgUrl}
                  placeholder="Org url"
                  style={Object.assign({}, inputStyle, {
                    backgroundColor: colors.greyColor
                  })}
                />
              </div>
            </div>
          )}
          {type == 'CREATE' && (
            <div style={actionBtnContainerStyle}>
              <div style={btnContainerStyle}>
                <Button
                  disabled={isFetching}
                  style={confirmBtnStyle}
                  fullWidth
                  variant="text"
                  onClick={e => this.handleCreateClick(e)}
                >
                  Create
                </Button>
              </div>
            </div>
          )}
          {type == 'UPDATE' && (
            <div style={actionBtnContainerStyle}>
              <div style={btnContainerStyle}>
                <Button
                  disabled={isFetching}
                  style={confirmBtnStyle}
                  fullWidth
                  variant="text"
                  onClick={e => this.handleUpdateClick(e)}
                >
                  Update
                </Button>
              </div>
            </div>
          )}
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

  actionBtnContainerStyle: {
    height: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  }
};

export default OrgModal;

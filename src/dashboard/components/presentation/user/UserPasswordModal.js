import React, { Component } from 'react';

// Libraries
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';

// constants
import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';

// styles
import '../../../../../../assets/css/modal/rrm.css';

class UserPasswordModal extends Component {
  state = {
    password: null,
    passwordMsg: null,
    confirmPassword: null,
    confirmPasswordMsg: null
  };

  handleUpdate = (type, val) => {
    if (type == 'PASSWORD') {
      this.setState({
        password: val
      });
    } else {
      this.setState({
        confirmPassword: val
      });
    }
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

  handleBlur = (event, type) => {
    this.preventParent(event);
    const { password, confirmPassword } = this.state;
    if (type == 'PASSWORD') {
      if (password && password.length < 6) {
        this.setState({
          passwordMsg: 'Passwords must consist of at least 6 characters.'
        });
      } else {
        this.setState({
          passwordMsg: null
        });
      }
    } else if (type == 'CONFIRM_PASSWORD') {
      if (confirmPassword && confirmPassword != password) {
        this.setState({
          confirmPasswordMsg: 'Passwords do not match'
        });
      } else {
        this.setState({
          confirmPasswordMsg: null
        });
      }
    }
  };

  handleUpdateClick = event => {
    this.preventParent(event);
    const {
      password,
      passwordMsg,
      confirmPassword,
      confirmPasswordMsg
    } = this.state;

    let msg;
    let isValidate = true;
    if (!password) {
      msg = 'Password is required';
      isValidate = false;
    } else if (!confirmPassword) {
      msg = 'Confirm password is required';
      isValidate = false;
    } else if (passwordMsg) {
      msg = passwordMsg;
      isValidate = false;
    } else if (confirmPasswordMsg) {
      msg = confirmPasswordMsg;
      isValidate = false;
    }
    if (!isValidate) {
      this.props.handleErrorMsg(msg);
      return;
    }
    this.props.handleConfirmResetPassword(password);
  };

  render() {
    const { open, isFetching } = this.props;

    const {
      password,
      passwordMsg,
      confirmPassword,
      confirmPasswordMsg
    } = this.state;

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
      confirmBtnStyle,
      errorMsgStyle
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
              <Edit style={iconStyle} />
            </div>
            <div style={titleWrapperStyle}>
              <p style={titleStyle}>Update user password</p>
            </div>
          </div>
          <div style={userFormContainerStyle}>
            <div style={formLabelContainerStyle}>Password</div>
            <div style={formInputContainerStyle}>
              <input
                className="dx_user_edit_input"
                type="password"
                value={password}
                placeholder="password"
                onBlur={e => this.handleBlur(e, 'PASSWORD')}
                onChange={e => this.handleUpdate('PASSWORD', e.target.value)}
                style={inputStyle}
              />
            </div>
            {passwordMsg && <p style={errorMsgStyle}>{passwordMsg}</p>}
          </div>
          <div style={userFormContainerStyle}>
            <div style={formLabelContainerStyle}>Confirm password</div>
            <div style={formInputContainerStyle}>
              <input
                className="dx_user_edit_input"
                type="password"
                value={confirmPassword}
                placeholder="confirm password"
                onBlur={e => this.handleBlur(e, 'CONFIRM_PASSWORD')}
                onChange={e =>
                  this.handleUpdate('CONFIRM_PASSWORD', e.target.value)
                }
                style={inputStyle}
              />
            </div>
            {confirmPasswordMsg && (
              <p style={errorMsgStyle}>{confirmPasswordMsg}</p>
            )}
          </div>
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
    paddingTop: 24,
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
  },
  errorMsgStyle: {
    margin: 0,
    marginTop: 6,
    color: '#C43C44',
    fontSize: fonts.h4
  }
};

export default UserPasswordModal;

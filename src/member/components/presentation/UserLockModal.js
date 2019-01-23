import React, { Component } from 'react';

// Libraries
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

// styles
import '../../../../../assets/css/modal/rrm.css';

class UserLockModal extends Component {
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

  handleConfirmClick = event => {
    this.preventParent(event);
    this.props.handleConfirm();
  };

  render() {
    const { open, isLock } = this.props;

    const {
      confirmContainerStyle,
      confirmTitleContainerStyle,
      confirmTitleWrapperStyle,
      confirmTitleStyle,

      confirmDescContainerStyle,
      confirmDescWrapperStyle,
      confirmDescStyle,

      confirmActionContainerStyle,
      btnContainerStyle,
      cannelBtnStyle,
      confirmDelteBtnStyle
    } = styles;

    return (
      <Modal
        open={open}
        onClose={e => this.handleCloseModal(e)}
        center
        classNames={{
          overlay: 'dx_overlay',
          modal: 'dx_user_inner_modal'
        }}
      >
        <div style={confirmContainerStyle} onClick={e => this.preventParent(e)}>
          <div style={confirmTitleContainerStyle}>
            <div style={confirmTitleWrapperStyle}>
              <p style={confirmTitleStyle}>
                Confirm {isLock ? 'disable' : 'enable'} users
              </p>
            </div>
          </div>
          <div style={confirmDescContainerStyle}>
            <div style={confirmDescWrapperStyle}>
              <p style={confirmDescStyle}>Do you want to proceed?</p>
            </div>
          </div>
          <div style={confirmActionContainerStyle}>
            <div
              style={Object.assign({}, { paddingRight: 24 }, btnContainerStyle)}
            >
              <Button
                style={cannelBtnStyle}
                fullWidth
                variant="text"
                onClick={e => this.handleCloseModal(e)}
              >
                Cannel
              </Button>
            </div>
            <div style={btnContainerStyle}>
              <Button
                style={confirmDelteBtnStyle}
                fullWidth
                variant="text"
                onClick={e => this.handleConfirmClick(e)}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const styles = {
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
  btnContainerStyle: {
    height: 42
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

export default UserLockModal;

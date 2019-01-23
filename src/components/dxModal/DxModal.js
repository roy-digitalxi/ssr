import React, { Component } from 'react';

// Libraries
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';

// constants
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

// styles
import '../../../../assets/css/modal/rrm.css';

class DxModal extends Component {
  handleCloseModal = () => {
    this.props.onCloseModal();
  };

  preventParent = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  };

  render() {
    const {
      open,
      userCustomTitle,
      title,
      customTitle,
      hasBottomDiv,
      description,
      cancel,
      confirm,
      isContent,
      content,
      isDanger
    } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      titleContainerStyle,
      titleStyle,
      contentContainerStyle,
      contentStyle,
      btnContainerStyle,
      controlContainerStyle,
      btnWrapperStyle,
      cancelBtnStyle,
      confirmBtnStyle,

      mainContentContainerStyle
    } = styles;

    return (
      <Modal
        open={open}
        onClose={() => this.handleCloseModal()}
        center
        classNames={{
          overlay: 'dx_overlay',
          modal: 'dx_modal'
        }}
      >
        <div style={mainContainerStyle} onClick={e => this.preventParent(e)}>
          <div
            style={Object.assign(
              {},
              titleContainerStyle,
              hasBottomDiv
                ? { borderBottom: '1px solid', borderColor: colors.borderColor }
                : null
            )}
          >
            {userCustomTitle ? customTitle : <p style={titleStyle}>{title}</p>}
          </div>
          <div style={contentContainerStyle}>
            <p style={contentStyle}>{description}</p>
            {isContent ? (
              <div style={mainContentContainerStyle}>{content}</div>
            ) : null}
          </div>
          <div style={btnContainerStyle}>
            <div style={controlContainerStyle}>
              {cancel ? (
                <div style={btnWrapperStyle}>
                  <div style={tableContainerStyle}>
                    <div style={tableWrapperStyle}>
                      <Button
                        style={cancelBtnStyle}
                        variant="cancel modal"
                        onClick={() => this.handleCloseModal()}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}
              {confirm ? (
                <div style={btnWrapperStyle}>
                  <div style={tableContainerStyle}>
                    <div style={tableWrapperStyle}>
                      <Button
                        style={Object.assign(
                          {},
                          {
                            backgroundColor: isDanger
                              ? colors.redColor
                              : colors.blueColor
                          },
                          confirmBtnStyle
                        )}
                        variant="confirm modal"
                        onClick={() => this.props.handleConfirm()}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}
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
    height: '100%'
  },
  titleContainerStyle: {
    height: 54,
    paddingLeft: 18,
    paddingRight: 18
  },
  titleStyle: {
    fontSize: fonts.h1,
    fontWeight: 'bold',
    margin: 0,
    paddingTop: 15,
    width: 360,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  contentContainerStyle: {
    height: 'calc(100% - 126px)',
    padding: 18
  },
  contentStyle: {
    fontSize: fonts.h1,
    margin: 0
  },
  btnContainerStyle: {
    borderTop: '1px solid',
    borderColor: colors.borderColor,
    height: 72
  },
  controlContainerStyle: {
    float: 'right',
    height: '100%',
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 12,
    paddingRight: 12
  },
  btnWrapperStyle: {
    marginLeft: 6,
    marginRight: 6,
    height: '100%'
  },
  cancelBtnStyle: {
    border: '1px solid',
    borderColor: colors.borderColor,
    color: colors.blackColor,
    textTransform: 'capitalize'
  },
  confirmBtnStyle: {
    color: colors.whiteColor,
    textTransform: 'capitalize'
  },

  mainContentContainerStyle: {
    marginTop: 12,
    marginBottom: 12
  }
};

export default DxModal;

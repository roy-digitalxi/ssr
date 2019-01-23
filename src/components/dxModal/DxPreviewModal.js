import React, { Component } from 'react';

// Libraries
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import PhoneIphone from '@material-ui/icons/PhoneIphone';
import Tablet from '@material-ui/icons/Tablet';
import Laptop from '@material-ui/icons/Laptop';
import DesktopMac from '@material-ui/icons/DesktopMac';
import Close from '@material-ui/icons/Close';

// constants
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

// styles
import '../../../../assets/css/modal/rrm.css';

// constants
import config from '../../config';

// helpers
import * as helpers from '../../helpers';

class DxPreviewModal extends Component {
  state = {
    activeIndex: 0
  };

  handleCloseModal = () => {
    this.props.onCloseModal();
  };

  handleChangeTab = activeIndex => {
    this.setState({
      activeIndex
    });
  };

  render() {
    const { open, experienceGUID } = this.props;

    const { activeIndex } = this.state;

    const {
      mainContainerStyle,
      closeBtnContainerStyle,
      closeBtnStyle,
      closeIconStyle,
      controlPanelContainerStyle,
      controlPanelWrapperStyle,
      controlPanelStyle,
      controlStyle,
      mainContentContainerStyle,
      titleContainerStyle,
      titleStyle,
      mainContentWrapperStyle,
      previewStyle
    } = styles;

    let lable;
    let height, width;
    switch (activeIndex) {
      case 0:
        lable = 'Mobile';
        height = phoneHeight;
        width = phoneWidth;
        break;
      case 1:
        lable = 'Tablet';
        height = tabletHeight;
        width = tabletWidth;
        break;
      case 2:
        lable = 'Laptop';
        height = laptopHeight;
        width = laptopWidth;
        break;
      case 3:
        lable = 'Desktop';
        height = desktopHeight;
        width = desktopWidth;
        break;
    }

    return (
      <Modal
        open={open}
        onClose={() => this.handleCloseModal()}
        classNames={{
          overlay: 'dx_preview_overlay',
          modal: 'dx_preview_modal'
        }}
        style={{
          backgroundColor: 'transparent',
          height: '100vh',
          width: '100vw',
          overflow: 'auto'
        }}
        showCloseIcon={false}
      >
        <div style={mainContainerStyle}>
          <div style={closeBtnContainerStyle}>
            <Button
              style={closeBtnStyle}
              onClick={() => this.props.onCloseModal()}
            >
              <Close style={closeIconStyle} />
            </Button>
          </div>
          <div style={controlPanelContainerStyle}>
            <div style={controlPanelWrapperStyle}>
              <div
                style={Object.assign({}, controlPanelStyle, {
                  borderTopLeftRadius: '18px',
                  borderBottomLeftRadius: '18px'
                })}
              >
                <Button
                  style={Object.assign(
                    {},
                    controlStyle,
                    {
                      borderTopLeftRadius: '18px',
                      borderBottomLeftRadius: '18px'
                    },
                    activeIndex == 0
                      ? { backgroundColor: colors.greenColor }
                      : null
                  )}
                  onClick={() => this.handleChangeTab(0)}
                >
                  <PhoneIphone />
                </Button>
              </div>
              <div style={controlPanelStyle}>
                <Button
                  style={Object.assign(
                    {},
                    controlStyle,
                    activeIndex == 1
                      ? { backgroundColor: colors.greenColor }
                      : null
                  )}
                  onClick={() => this.handleChangeTab(1)}
                >
                  <Tablet />
                </Button>
              </div>
              <div style={controlPanelStyle}>
                <Button
                  style={Object.assign(
                    {},
                    controlStyle,
                    activeIndex == 2
                      ? { backgroundColor: colors.greenColor }
                      : null
                  )}
                  onClick={() => this.handleChangeTab(2)}
                >
                  <Laptop />
                </Button>
              </div>
              <div
                style={Object.assign({}, controlPanelStyle, {
                  borderTopRightRadius: '18px',
                  borderBottomRightRadius: '18px'
                })}
              >
                <Button
                  style={Object.assign(
                    {},
                    controlStyle,
                    {
                      borderTopRightRadius: '18px',
                      borderBottomRightRadius: '18px'
                    },
                    activeIndex == 3
                      ? { backgroundColor: colors.greenColor }
                      : null
                  )}
                  onClick={() => this.handleChangeTab(3)}
                >
                  <DesktopMac />
                </Button>
              </div>
            </div>
          </div>
          <div style={mainContentContainerStyle}>
            <div style={titleContainerStyle}>
              <p style={titleStyle}>{lable} preview</p>
            </div>
            <div style={mainContentWrapperStyle}>
              <iframe
                style={Object.assign({}, previewStyle, { height, width })}
                src={`${
                  config.appHost
                }/preview/${helpers.getOrgUrl()}/${experienceGUID}`}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const padding = 120;

// const phoneWidth = 375;
// const phoneHeight = 667;

// const tabletWidth = 768 - padding;
// const tabletHeight = 1024 - padding;

// const laptopWidth = 1024 - padding;
// const laptopHeight = 1366 - padding;

// const desktopWidth = `calc(100vw - ${padding}px)`;
// const desktopHeight = `calc(100vh - ${padding}px)`;

const phoneWidth = 375;
const phoneHeight = 667;

const tabletWidth = 575;
const tabletHeight = 867;

const laptopWidth = 775;
const laptopHeight = 1067;

const desktopWidth = 975;
const desktopHeight = 1267;

const styles = {
  mainContainerStyle: {
    paddingTop: 24,
    paddingBottom: 24,
    overflowY: 'auto',
    position: 'relative'
  },
  closeBtnContainerStyle: {
    position: 'absolute',
    height: 60,
    width: 60,
    top: 0,
    right: 0,
    backgroundColor: colors.whiteColor
  },
  closeBtnStyle: {
    minWidth: 0,
    width: 60,
    height: 60,
    padding: 0,
    borderRadius: 0
  },
  closeIconStyle: {
    fontSize: 30
  },
  controlPanelContainerStyle: {
    marginBottom: 24
  },
  controlPanelWrapperStyle: {
    margin: '0 auto',
    width: 72 * 4,
    height: 60,
    display: 'flex',
    flexDirection: 'row'
  },
  controlPanelStyle: {
    height: 60,
    width: 72,
    backgroundColor: colors.whiteColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  controlStyle: {
    minWidth: 0,
    width: 72,
    height: 60,
    padding: 0,
    borderRadius: 0
  },
  mainContentContainerStyle: {},
  titleContainerStyle: {
    marginBottom: 24
  },
  titleStyle: {
    color: colors.whiteColor,
    textAlign: 'center'
  },
  mainContentWrapperStyle: {},
  previewStyle: {
    display: 'block',
    margin: '0 auto',
    border: 'none',
    outline: 'none'
  }
};

export default DxPreviewModal;

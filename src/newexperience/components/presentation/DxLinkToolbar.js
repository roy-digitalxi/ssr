import React, { Component } from 'react';

// Libraries
import ColorPicker from 'rc-color-picker';
import '../../../../../assets/css/rc-color-picker/rc-color-picker.css';
import Button from '@material-ui/core/Button';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';

// components
import DxInput from '../../../components/dxInput/DxInput';
import DxTextEditorToolbar from './DxTextEditorToolbar';

// constants
import colors from '../../../styles/colors';

class DxLinkToolbar extends Component {
  state = {
    isOpen: false
  };

  handleLinkInsertClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.props.handleLinkInsertClick();
  };

  handlePreviewLink = () => {
    let { link } = this.props;

    if (link) {
      const regex = /(http(s?))\:\/\//gi;
      if (!regex.test(link)) {
        link = `http://${link}`;
      }
      window.open(link, '_blank');
    }
  };

  render() {
    const {
      activeElemType,
      sectionGUID,
      linkInput,
      link,
      linkBgColor
    } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      optionContainerStyle,
      displayImgStyle,
      linkInputContainerStyle,
      linkInputWrapperStyle,
      linkInputBtnStyle,
      iconStyle
    } = styles;

    return (
      <div className={activeElemType ? 'dx_show_toolbar' : 'dx_hidden_toolbar'}>
        <div style={tableContainerStyle}>
          <div style={tableWrapperStyle}>
            {/* TEXT */}
            {activeElemType == 'TEXT' ? (
              <div
                className={activeElemType == 'TEXT' ? 'dx_show' : 'dx_hidden'}
              >
                <DxTextEditorToolbar sectionGUID={sectionGUID} />
              </div>
            ) : null}
            {/* LINK */}
            <div className={activeElemType == 'LINK' ? 'dx_show' : 'dx_hidden'}>
              {this.state.isOpen ? (
                <div style={linkInputContainerStyle}>
                  <div style={linkInputWrapperStyle}>
                    <DxInput
                      enableEnter={true}
                      placeholder="Embed hyperlink"
                      handleValChange={e => this.props.handleLinkInputChange(e)}
                      isDark={true}
                      width="144px"
                      disabled={false}
                      value={linkInput == null ? link : linkInput}
                      handleKeyPress={() => this.handleLinkInsertClick()}
                      isRounded={true}
                    />
                  </div>
                  <Button
                    style={linkInputBtnStyle}
                    onClick={() => this.handleLinkInsertClick()}
                    variant="Enter video url"
                  >
                    Confirm
                  </Button>
                </div>
              ) : (
                <div style={mainContainerStyle}>
                  <div
                    style={optionContainerStyle}
                    onClick={() =>
                      this.setState({ isOpen: !this.state.isOpen })
                    }
                  >
                    <img
                      style={displayImgStyle}
                      src={require('../../../../../assets/images/link_icon.png')}
                    />
                  </div>
                  <div
                    style={optionContainerStyle}
                    onClick={() => this.handlePreviewLink()}
                  >
                    <RemoveRedEye style={iconStyle} />
                  </div>
                  <div style={optionContainerStyle}>
                    <ColorPicker
                      animation="slide-up"
                      color={linkBgColor}
                      onChange={colors =>
                        this.props.handleBgColorChange(colors)
                      }
                    />
                  </div>
                </div>
              )}
            </div>
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
  mainContainerStyle: {
    height: 36,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 6
  },
  optionContainerStyle: {
    width: 36,
    height: 36,
    marginLeft: 6,
    marginRight: 6,
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  displayImgStyle: {
    display: 'block',
    width: 36,
    height: 36,
    cursor: 'pointer'
  },
  linkInputContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 6,
    width: 260
  },
  linkInputWrapperStyle: {
    flex: 4,
    marginTop: 3
  },
  linkInputBtnStyle: {
    flex: 1,
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'capitalize',
    marginLeft: 6
  },
  iconStyle: {
    marginTop: 3,
    color: colors.lightGreyColor,
    fontSize: 30,
    cursor: 'pointer'
  }
};

export default DxLinkToolbar;

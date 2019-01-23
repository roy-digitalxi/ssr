import React, { Component } from 'react';

// Libraries
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import '../../../../../assets/css/react-widget/index.css';
import hexRgb from '../../../helpers/hex2Rgb';

// components
import DxInput from '../../../components/dxInput/DxInput';
import DxTextEditor from './DxTextEditor';

// config
import config from '../../../config';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

class DxAdButtonConnector extends Component {
  handleBtnConnectPageChange = page => {
    this.props.handleBtnConnectPageChange(page.PageGUID);
  };

  handleElemSelect = (e, elemType) => {
    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    this.props.handleElemSelect(e, elemType);
  };

  handleAvailableCount = (limitWord, htmlContent) => {
    let tempHtmlContent = htmlContent;
    if (!tempHtmlContent) {
      return limitWord;
    }
    tempHtmlContent = tempHtmlContent.replace(/<(.|\n)*?>/g, '');
    if (!tempHtmlContent) {
      return limitWord;
    }
    let current = tempHtmlContent.length;
    return limitWord - current;
  };

  render() {
    let {
      isActive,
      activeElemType,
      adBtnImg,
      adBtnImgOpacityColor,
      adBtnImgOpacity,
      adBtnColor,
      dropdownOptionArr,
      defaultConnectorPage
    } = this.props;

    const {
      mainContainerStyle,
      overlayImgStyle,
      mainWrapperStyle,
      tableContainerStyle,
      tableWrapperStyle,
      contentContainerStyle,
      leftContentContainerStyle,
      rightIconContainerStyle,
      expandIconStyle,

      connectorListContainerStyle,
      connectorListWrapperStyle,
      connectorLabelContainerStyle,
      connectorLabelStyle,
      connectorDropdownContainerStyle,
      connectorDropdownStyle,
      overlayWrapperStyle,
      wordCounterContainerStyle,
      wordCounterStyle
    } = styles;

    adBtnImgOpacityColor = hexRgb(adBtnImgOpacityColor);
    adBtnImgOpacity = (adBtnImgOpacity / 100).toFixed(2);
    const overLayColor = `rgba(${adBtnImgOpacityColor.red}, ${
      adBtnImgOpacityColor.green
    }, ${adBtnImgOpacityColor.blue}, ${adBtnImgOpacity})`;

    const limitWord = config.textEditorWordLimit;
    const availableWord = this.handleAvailableCount(
      limitWord,
      this.props.btnContent
    );

    return (
      <div style={mainContainerStyle}>
        <img
          style={overlayImgStyle}
          src={
            adBtnImg
              ? `${config.picHost}${adBtnImg}`
              : require('../../../../../assets/images/demo.jpg')
          }
        />
        <div
          style={Object.assign({}, overlayWrapperStyle, {
            backgroundColor: overLayColor
          })}
          onClick={e => this.handleElemSelect(e, 'IMAGE')}
        />
        <div
          style={mainWrapperStyle}
          onClick={e => this.handleElemSelect(e, 'IMAGE')}
        >
          <div style={contentContainerStyle}>
            <div style={leftContentContainerStyle}>
              <div style={tableContainerStyle}>
                <div style={tableWrapperStyle}>
                  <DxTextEditor
                    sectionGUID={this.props.sectionGUID}
                    placeholder="Text for a button"
                    largeEditor={true}
                    editorHeight={360}
                    editorWidth={270}
                    limitWord={limitWord}
                    htmlContent={this.props.btnContent}
                    handleUpdateHtmlContent={html =>
                      this.props.handleBtnInputChange(html)
                    }
                    handleElemSelect={e => this.handleElemSelect(e, 'TEXT')}
                  />
                </div>
              </div>
            </div>
            <div
              style={rightIconContainerStyle}
              onClick={e => this.handleElemSelect(e, 'TOOL')}
            >
              <div style={tableContainerStyle}>
                <div style={tableWrapperStyle}>
                  <KeyboardArrowRight
                    style={Object.assign({}, expandIconStyle, {
                      color: adBtnColor
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={connectorListContainerStyle}>
          <div style={tableContainerStyle}>
            <div style={tableWrapperStyle}>
              <div style={connectorListWrapperStyle}>
                <div style={connectorLabelContainerStyle}>
                  <p style={connectorLabelStyle}>Connect another page</p>
                </div>
                <div style={connectorDropdownContainerStyle}>
                  <DropdownList
                    placeholder="select a page"
                    style={connectorDropdownStyle}
                    data={dropdownOptionArr}
                    value={defaultConnectorPage ? defaultConnectorPage : null}
                    textField="Title"
                    onChange={page => this.handleBtnConnectPageChange(page)}
                  />
                </div>
              </div>
              {isActive && activeElemType == 'TEXT' ? (
                <div
                  style={wordCounterContainerStyle}
                  className="dx_fade_in_div"
                >
                  {availableWord == 0 ? (
                    <p style={wordCounterStyle}>Max. characters reached</p>
                  ) : (
                    <p style={wordCounterStyle}>
                      {availableWord} character(s) left
                    </p>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    position: 'relative',
    minHeight: 90,
    maxHeight: 360,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.greyColor,
    cursor: 'default',
    width: 320,
    boxSizing: 'border-box',
    margin: '0 auto'
  },
  overlayImgStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1
  },
  mainWrapperStyle: {
    flex: 1
  },
  tableContainerStyle: {
    position: 'relative',
    display: 'table',
    height: '100%',
    width: '100%',
    zIndex: 3
  },
  tableWrapperStyle: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%'
  },
  leftContentContainerStyle: {
    flex: 1,
    overflow: 'auto',
    marginTop: 30,
    marginBottom: 30,
    paddingTop: 9,
    paddingBottom: 9
  },
  rightIconContainerStyle: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-15px)',
    right: 0,
    zIndex: 4
  },
  expandIconStyle: {
    paddingRight: 6,
    fontSize: 24,
    float: 'right'
  },
  connectorListContainerStyle: {
    position: 'absolute',
    top: 0,
    right: -204,
    width: 180,
    height: '100%'
  },
  connectorListWrapperStyle: {
    height: 54,
    backgroundColor: colors.lightBlueColor
  },
  connectorLabelContainerStyle: {
    padding: '3px 6px'
  },
  connectorLabelStyle: {
    margin: 0,
    fontSize: fonts.h3,
    textAlign: 'center'
  },
  connectorDropdownContainerStyle: {
    paddingLeft: 18,
    paddingRight: 18
  },
  connectorDropdownStyle: {
    height: 24
  },
  overlayWrapperStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'block',
    zIndex: 2
  },
  wordCounterContainerStyle: {
    marginTop: 12
  },
  wordCounterStyle: {
    textAlign: 'center',
    margin: 0,
    fontSize: fonts.h4,
    color: colors.greyLabelColor
  }
};

export default DxAdButtonConnector;

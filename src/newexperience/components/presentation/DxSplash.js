import React, { Component } from 'react';

// config
import config from '../../../config';

// Libraries
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import SignalCellular0Bar from '@material-ui/icons/SignalCellular0Bar';
import Wifi from '@material-ui/icons/Wifi';
import Bluetooth from '@material-ui/icons/Bluetooth';
import BatteryFull from '@material-ui/icons/BatteryFull';
import MoreVert from '@material-ui/icons/MoreVert';
import Search from '@material-ui/icons/Search';
import hexRgb from '../../../helpers/hex2Rgb';

// components
import DxInput from '../../../components/dxInput/DxInput';
import DxTextEditor from './DxTextEditor';

// constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

// helpers
import * as helpers from '../../../helpers';

class DxSplash extends Component {
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
      splashOpacityColor,
      splashOpacity
    } = this.props;

    const {
      txtCenterStyle,
      marginLeftStyle,
      marginRightStyle,
      tableContainerStyle,
      tableWrapperStyle,
      splashContainerStyle,
      statusbarContainerStyle,
      leftStatusContainerStyle,
      leftStatusWrapperStyle,
      midStatusContainerStyle,
      rightStatusContainerStyle,
      rightStatusWrapperStyle,
      iconContainerStyle,
      statusbarIconStyle,
      statusbarLabelStyle,
      toolbarContainerStyle,
      leftToolbarContainerStyle,
      leftToolbarWrapperStyle,
      middleToolbarContainerStyle,
      pageTitleStyle,
      rightToolbarContainerStyle,
      rightToolbarWrapperStyle,
      splashContentContainerStyle,
      overlayContainerStyle,
      overlayWrapperStyle,
      overlayImgStyle,
      descContainerStyle,

      wordCounterContainerStyle,
      wordCounterStyle
    } = styles;

    splashOpacityColor = hexRgb(splashOpacityColor);
    splashOpacity = (splashOpacity / 100).toFixed(2);
    const overLayColor = `rgba(${splashOpacityColor.red}, ${
      splashOpacityColor.green
    }, ${splashOpacityColor.blue}, ${splashOpacity})`;

    const limitWord = config.textEditorWordLimit;
    const availableWord = this.handleAvailableCount(
      limitWord,
      this.props.splashContent
    );

    return (
      <div style={Object.assign({}, overlayContainerStyle)}>
        {isActive && activeElemType == 'TEXT' ? (
          <div className="dx_fade_in_div" style={wordCounterContainerStyle}>
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                {availableWord == 0 ? (
                  <p style={wordCounterStyle}>Max. characters reached</p>
                ) : (
                  <p style={wordCounterStyle}>
                    {availableWord} character(s) left
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}
        <img
          style={overlayImgStyle}
          src={
            this.props.splashImg
              ? `${config.picHost}${
                  this.props.splashImg
                }&OrgUrl=${helpers.getOrgUrl()}`
              : require('../../../../../assets/images/splashBg.png')
          }
        />
        <div
          style={Object.assign({}, overlayWrapperStyle, {
            backgroundColor: overLayColor
          })}
          onClick={e => this.handleElemSelect(e, 'IMAGE')}
        >
          <div style={splashContainerStyle}>
            <div
              style={Object.assign({}, statusbarContainerStyle, {
                color: this.props.splashColor
              })}
              onClick={e => this.handleElemSelect(e, 'TOOL')}
            >
              <div style={leftStatusContainerStyle}>
                <div style={leftStatusWrapperStyle}>
                  <div
                    style={Object.assign(
                      {},
                      marginLeftStyle,
                      iconContainerStyle
                    )}
                  >
                    <SignalCellular0Bar style={statusbarIconStyle} />
                  </div>
                  <div
                    style={Object.assign(
                      {},
                      marginLeftStyle,
                      iconContainerStyle
                    )}
                  >
                    <span style={statusbarLabelStyle}>Sketch</span>
                  </div>
                  <div
                    style={Object.assign(
                      {},
                      marginLeftStyle,
                      iconContainerStyle
                    )}
                  >
                    <Wifi style={statusbarIconStyle} />
                  </div>
                </div>
              </div>
              <div style={midStatusContainerStyle}>
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <p
                      style={Object.assign(
                        {},
                        txtCenterStyle,
                        statusbarLabelStyle,
                        { width: '100%' }
                      )}
                    >
                      9:41 AM
                    </p>
                  </div>
                </div>
              </div>
              <div style={rightStatusContainerStyle}>
                <div style={rightStatusWrapperStyle}>
                  <div
                    style={Object.assign(
                      {},
                      marginRightStyle,
                      iconContainerStyle
                    )}
                  >
                    <Bluetooth style={statusbarIconStyle} />
                  </div>
                  <div
                    style={Object.assign(
                      {},
                      marginRightStyle,
                      iconContainerStyle
                    )}
                  >
                    <span style={statusbarLabelStyle}>100%</span>
                  </div>
                  <div
                    style={Object.assign(
                      {},
                      marginRightStyle,
                      iconContainerStyle
                    )}
                  >
                    <BatteryFull
                      className="dx_battery_icon"
                      style={statusbarIconStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={Object.assign({}, toolbarContainerStyle, {
                color: this.props.splashColor
              })}
              onClick={e => this.handleElemSelect(e, 'TOOL')}
            >
              <div style={leftToolbarContainerStyle}>
                <div style={leftToolbarWrapperStyle}>
                  <div style={tableContainerStyle}>
                    <div style={tableWrapperStyle}>
                      <KeyboardArrowLeft />
                    </div>
                  </div>
                </div>
              </div>
              <div style={middleToolbarContainerStyle}>
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <p style={pageTitleStyle}>{this.props.currentPageTitle}</p>
                  </div>
                </div>
              </div>
              <div style={rightToolbarContainerStyle}>
                <div style={rightToolbarWrapperStyle}>
                  <div style={tableContainerStyle}>
                    <div style={tableWrapperStyle}>
                      <Search />
                      <MoreVert />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={Object.assign({}, splashContentContainerStyle, {
                maxHeight: 84,
                overflowY: 'scroll'
              })}
            >
              <div style={tableContainerStyle}>
                <div style={tableWrapperStyle}>
                  <div style={descContainerStyle}>
                    {isActive && activeElemType == 'TEXT' ? (
                      <DxTextEditor
                        sectionGUID={this.props.sectionGUID}
                        placeholder="Splash image with page title"
                        largeEditor={true}
                        editorHeight={82}
                        editorWidth={262}
                        limitWord={limitWord}
                        htmlContent={this.props.splashContent}
                        handleUpdateHtmlContent={html =>
                          this.props.handleDescInputChange(html)
                        }
                        handleElemSelect={e => this.handleElemSelect(e, 'TEXT')}
                      />
                    ) : (
                      <div
                        className="dx_section_placeholder_container"
                        style={Object.assign(
                          {},
                          { maxHeight: 84, width: 262 },
                          styles.sectionPlaceholderStyle
                        )}
                        dangerouslySetInnerHTML={{
                          __html: this.props.splashContent
                        }}
                        onClick={e => this.handleElemSelect(e, 'TEXT')}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const splashHeight = 180;
const descContainerWidth = 264;

const styles = {
  txtCenterStyle: {
    textAlign: 'center'
  },
  marginLeftStyle: {
    marginLeft: 3
  },
  marginRightStyle: {
    marginRight: 3
  },
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
  imgStyle: {
    display: 'block',
    width: 42,
    height: 48,
    margin: '0 auto'
  },
  splashContainerStyle: {
    height: splashHeight
  },
  statusbarContainerStyle: {
    height: 24,
    display: 'flex',
    flexDirection: 'row'
  },
  leftStatusContainerStyle: {
    flex: 1
  },
  leftStatusWrapperStyle: {
    float: 'left',
    height: 24,
    display: 'flex'
  },
  midStatusContainerStyle: {
    flex: 1
  },
  rightStatusContainerStyle: {
    flex: 1
  },
  rightStatusWrapperStyle: {
    float: 'right',
    height: 24,
    display: 'flex',
    flexDirection: 'row'
  },
  iconContainerStyle: {
    flex: 1
  },
  statusbarIconStyle: {
    fontSize: 14,
    display: 'inline-block',
    marginTop: 6
  },
  statusbarLabelStyle: {
    fontSize: fonts.h5,
    display: 'inline-block',
    margin: 0
  },
  toolbarContainerStyle: {
    height: 24,
    display: 'flex',
    flexDirection: 'row'
  },
  leftToolbarContainerStyle: {
    flex: 1
  },
  leftToolbarWrapperStyle: {
    float: 'left'
  },
  middleToolbarContainerStyle: {
    flex: 1
  },
  pageTitleStyle: {
    width: 120,
    textAlign: 'center',
    margin: 0,
    fontSize: fonts.h5,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  rightToolbarContainerStyle: {
    flex: 1
  },
  rightToolbarWrapperStyle: {
    float: 'right'
  },
  splashContentContainerStyle: {
    marginTop: 36
  },
  overlayContainerStyle: {
    position: 'relative',
    height: splashHeight,
    width: '100%',
    cursor: 'default'
  },
  overlayWrapperStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'block',
    zIndex: 1
  },
  overlayImgStyle: {
    height: splashHeight,
    width: '100%'
  },
  descContainerStyle: {
    minHeight: 34,
    width: descContainerWidth,
    margin: '0 auto',
    overflow: 'auto'
  },

  wordCounterContainerStyle: {
    position: 'absolute',
    top: 80,
    right: -150 - 12,
    width: 150,
    height: 30
  },
  wordCounterStyle: {
    textAlign: 'center',
    margin: 0,
    fontSize: fonts.h4,
    color: colors.greyLabelColor
  },
  sectionPlaceholderStyle: {
    lineHeight: 1.42,
    cursor: 'pointer',
    fontSize: 12,
    fontFamily: 'Open Sans',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    overflowY: 'scroll',
    border: '1px solid transparent'
  }
};

export default DxSplash;

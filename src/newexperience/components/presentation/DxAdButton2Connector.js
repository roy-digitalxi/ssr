import React, { Component } from 'react';

// Libraries
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import '../../../../../assets/css/react-widget/index.css';

// components
import DxInput from '../../../components/dxInput/DxInput';
import DxTextEditor from './DxTextEditor';

// config
import config from '../../../config';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

class DxAdButton2Connector extends Component {
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
    const {
      isActive,
      activeElemType,
      adBtnBgColor,
      adBtnColor,
      dropdownOptionArr,
      defaultConnectorPage
    } = this.props;

    const {
      mainContainerStyle,
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

      wordCounterContainerStyle,
      wordCounterStyle
    } = styles;

    const limitWord = config.textEditorWordLimit;
    const availableWord = this.handleAvailableCount(
      limitWord,
      this.props.btnContent
    );

    return (
      <div style={mainContainerStyle}>
        <div
          style={mainWrapperStyle}
          onClick={e => this.handleElemSelect(e, 'BACKGROUND_COLOR')}
        >
          <div
            style={Object.assign({}, contentContainerStyle, {
              backgroundColor: adBtnBgColor
            })}
          >
            <div style={leftContentContainerStyle}>
              <div style={tableContainerStyle}>
                <div style={tableWrapperStyle}>
                  {isActive && activeElemType == 'TEXT' ? (
                    <DxTextEditor
                      sectionGUID={this.props.sectionGUID}
                      placeholder="Text for a button"
                      largeEditor={true}
                      editorWidth={270}
                      editorHeight={360}
                      limitWord={limitWord}
                      htmlContent={this.props.btnContent}
                      handleUpdateHtmlContent={html =>
                        this.props.handleBtnInputChange(html)
                      }
                      handleElemSelect={e => this.handleElemSelect(e, 'TEXT')}
                    />
                  ) : (
                    <div
                      className="dx_section_placeholder_container"
                      style={Object.assign(
                        {},
                        { width: 270 },
                        styles.sectionPlaceholderStyle
                      )}
                      dangerouslySetInnerHTML={{
                        __html: this.props.btnContent
                      }}
                      onClick={e => this.handleElemSelect(e, 'TEXT')}
                    />
                  )}
                </div>
              </div>
            </div>
            <div style={rightIconContainerStyle}>
              <div style={tableContainerStyle}>
                <div style={tableWrapperStyle}>
                  <KeyboardArrowRight
                    style={Object.assign({}, expandIconStyle, {
                      color: adBtnColor
                    })}
                    onClick={e => this.handleElemSelect(e, 'TOOL')}
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
                  className="dx_fade_in_div"
                  style={wordCounterContainerStyle}
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
    minHeight: 72,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'default',
    width: 320,
    boxSizing: 'border-box',
    margin: '0 auto'
  },
  mainWrapperStyle: {
    flex: 1,
    cursor: 'pointer',
    minHeight: 72
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
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    padding: config.defaultElementPadding
  },
  leftContentContainerStyle: {
    flex: 1,
    minHeight: 72
  },
  rightIconContainerStyle: {
    flex: '30px 0 0',
    minHeight: 72
  },
  expandIconStyle: {
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
    paddingLeft: 9,
    paddingRight: 18
  },
  connectorDropdownStyle: {
    height: 24
  },

  wordCounterContainerStyle: {
    marginTop: 12
  },
  wordCounterStyle: {
    textAlign: 'center',
    margin: 0,
    fontSize: fonts.h4,
    color: colors.greyLabelColor
  },
  sectionPlaceholderStyle: {
    lineHeight: 1.42,
    fontSize: 12,
    fontFamily: 'Open Sans',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    border: '1px solid transparent'
  }
};

export default DxAdButton2Connector;

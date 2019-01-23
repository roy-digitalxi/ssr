import React, { Component } from 'react';

// Libraries
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

// Components
import DxTextEditor from './DxTextEditor';

// constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import config from '../../../config';

class DxPdfViewer extends Component {
  handleElemSelect = (e, elemType) => {
    let { pdf } = this.props;

    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    if (!pdf) {
      this.props.handleElemSelect(e, 'PDF');
    } else {
      this.props.handleElemSelect(e, elemType);
    }
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
    let { isActive, activeElemType, pdfLabel, pdfBgColor } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      mainWrapperStyle,
      wordCounterContainerStyle,
      wordCounterStyle,
      rightIconContainerStyle,
      expandIconStyle
    } = styles;

    let tempPdfContent = pdfLabel;
    if (tempPdfContent)
      tempPdfContent = tempPdfContent.replace(/<(.|\n)*?>/g, '').trim();

    const limitWord = config.textEditorWordLimit;
    const availableWord = this.handleAvailableCount(
      limitWord,
      tempPdfContent ? pdfLabel : ''
    );

    return (
      <div
        style={Object.assign({}, mainContainerStyle, {
          backgroundColor: pdfBgColor
        })}
        onClick={e => this.handleElemSelect(e, 'PDF')}
      >
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
        <div style={mainWrapperStyle}>
          <div style={tableContainerStyle}>
            <div style={Object.assign({}, tableWrapperStyle)}>
              {isActive && activeElemType == 'TEXT' ? (
                <DxTextEditor
                  sectionGUID={this.props.sectionGUID}
                  placeholder="PDF title.."
                  largeEditor={true}
                  editorWidth={294}
                  editorHeight={118}
                  limitWord={limitWord}
                  htmlContent={tempPdfContent ? pdfLabel : ''}
                  handleUpdateHtmlContent={html =>
                    this.props.handlePdfLabelInputChange(html)
                  }
                  handleElemSelect={e => this.handleElemSelect(e, 'TEXT')}
                />
              ) : (
                <div
                  className="dx_section_placeholder_container"
                  style={Object.assign(
                    {},
                    { width: 294 },
                    styles.sectionPlaceholderStyle
                  )}
                  dangerouslySetInnerHTML={{
                    __html: tempPdfContent ? pdfLabel : ''
                  }}
                  onClick={e => this.handleElemSelect(e, 'TEXT')}
                />
              )}
            </div>
          </div>
          {/* <div style={rightIconContainerStyle}>
                        <div style={tableContainerStyle}>
                            <div style={tableWrapperStyle}>
                                <KeyboardArrowRight
                                    style={Object.assign({}, expandIconStyle, { color: colors.blackColor })}
                                />
                            </div>
                        </div>
                    </div> */}
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
    margin: '0 auto',
    cursor: 'default'
  },
  mainWrapperStyle: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: 72,
    padding: config.defaultElementPadding,
    cursor: 'pointer'
  },
  rightIconContainerStyle: {
    position: 'absolute',
    height: 36,
    width: 36,
    right: 0,
    top: '50%',
    transform: 'translateY(-18px)'
  },
  expandIconStyle: {
    fontSize: 24,
    float: 'right'
  },
  wordCounterContainerStyle: {
    position: 'absolute',
    top: 24,
    right: -150 - 12,
    width: 150,
    height: 30,
    zIndex: 999
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

export default DxPdfViewer;

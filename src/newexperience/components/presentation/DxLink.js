import React, { Component } from 'react';

// components
import DxInput from '../../../components/dxInput/DxInput';
import DxTextEditor from './DxTextEditor';

// constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import config from '../../../config';

class DxLink extends Component {
  handleElemSelect = (e, elemType) => {
    let { link } = this.props;

    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    if (!link) {
      this.props.handleElemSelect(e, 'LINK');
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
    let { isActive, activeElemType, link, linkLabel, linkBgColor } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      mainWrapperStyle,
      wordCounterContainerStyle,
      wordCounterStyle
    } = styles;

    let tempLinkLabel = linkLabel;
    if (tempLinkLabel)
      tempLinkLabel = tempLinkLabel.replace(/<(.|\n)*?>/g, '').trim();

    const limitWord = config.textEditorWordLimit;
    const availableWord = this.handleAvailableCount(
      limitWord,
      tempLinkLabel ? linkLabel : link
    );

    return (
      <div
        style={Object.assign({}, mainContainerStyle, {
          backgroundColor: linkBgColor
        })}
        onClick={e => this.handleElemSelect(e, 'LINK')}
      >
        {isActive && (activeElemType == 'TEXT' || activeElemType == 'LINK') ? (
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
                  placeholder="Hyperlink label.."
                  largeEditor={true}
                  editorHeight={118}
                  editorWidth={294}
                  limitWord={limitWord}
                  htmlContent={tempLinkLabel ? linkLabel : link}
                  handleUpdateHtmlContent={html =>
                    this.props.handleLinkLabelInputChange(html)
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
                    __html: tempLinkLabel ? linkLabel : link
                  }}
                  onClick={e => this.handleElemSelect(e, 'TEXT')}
                />
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

export default DxLink;

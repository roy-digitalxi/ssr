import React, { Component } from 'react';

// components
import DxInput from '../../../components/dxInput/DxInput';
import DxTextEditor from './DxTextEditor';

// constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import config from '../../../config';

class DxH5p extends Component {
  handleElemSelect = (e, elemType) => {
    let { h5p } = this.props;

    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    if (!h5p) {
      this.props.handleElemSelect(e, 'H5P');
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
    let { isActive, activeElemType, h5p, h5pLabel, h5pBgColor } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      mainWrapperStyle,
      wordCounterContainerStyle,
      wordCounterStyle
    } = styles;

    let tempH5pLabel = h5pLabel;
    if (tempH5pLabel)
      tempH5pLabel = tempH5pLabel.replace(/<(.|\n)*?>/g, '').trim();

    const limitWord = config.textEditorWordLimit;
    const availableWord = this.handleAvailableCount(
      limitWord,
      tempH5pLabel ? h5pLabel : h5p
    );

    return (
      <div
        style={Object.assign({}, mainContainerStyle, {
          backgroundColor: h5pBgColor
        })}
        onClick={e => this.handleElemSelect(e, 'H5P')}
      >
        {isActive && (activeElemType == 'TEXT' || activeElemType == 'H5P') ? (
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
                  placeholder="H5P label.."
                  largeEditor={true}
                  editorHeight={118}
                  editorWidth={294}
                  limitWord={limitWord}
                  htmlContent={tempH5pLabel ? h5pLabel : h5p}
                  handleUpdateHtmlContent={html =>
                    this.props.handleH5pLabelInputChange(html)
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
                    __html: tempH5pLabel ? h5pLabel : h5p
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
    cursor: 'default',
    display: 'flex',
    alignItems: 'center',
    minHeight: 72
  },
  mainWrapperStyle: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
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

export default DxH5p;

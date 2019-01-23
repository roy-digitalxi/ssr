import React, { Component } from 'react';

// Libraries
import ColorPicker from 'rc-color-picker';
import '../../../../../assets/css/rc-color-picker/rc-color-picker.css';

// components
import DxTextEditorToolbar from './DxTextEditorToolbar';

// Constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

class DxPdfViewerToolbar extends Component {
  handlePdfChange = event => {
    let file = event.target.files[0];
    if (!file.type.match('pdf.*')) {
      this.props.handlePdfError('The supported file type is .pdf');
      return;
    }
    this.props.handlePdfChange(file);
  };

  render() {
    const { activeElemType, sectionGUID, pdfFileName, pdfBgColor } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      optionContainerStyle,
      pdfInputStyle,
      displayPdfContainerStyle,
      displayPdfStyle,
      fileNameContainerStyle,
      fileNameStyle
    } = styles;

    return (
      <div
        className={
          activeElemType == 'PDF' || activeElemType == 'TEXT'
            ? 'dx_show_toolbar'
            : 'dx_hidden_toolbar'
        }
      >
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
            <div className={activeElemType == 'PDF' ? 'dx_show' : 'dx_hidden'}>
              <div style={mainContainerStyle}>
                {/* PDF */}
                <div style={optionContainerStyle}>
                  <div>
                    <label for="pdf-file-input">
                      <img
                        style={displayPdfStyle}
                        src={require('../../../../../assets/images/pdf_icon.png')}
                      />
                    </label>
                    <input
                      style={pdfInputStyle}
                      id="pdf-file-input"
                      type="file"
                      onChange={e => this.handlePdfChange(event)}
                    />
                  </div>
                </div>
                <div style={optionContainerStyle}>
                  <ColorPicker
                    animation="slide-up"
                    color={pdfBgColor}
                    onChange={colors => this.props.handleBgColorChange(colors)}
                  />
                </div>
                {pdfFileName ? (
                  <div style={fileNameContainerStyle}>
                    <div style={tableContainerStyle}>
                      <div style={tableWrapperStyle}>
                        <span style={fileNameStyle}>{pdfFileName}</span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
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
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    cursor: 'pointer'
  },
  pdfInputStyle: {
    visibility: 'hidden',
    width: 0,
    height: 0
  },
  displayPdfContainerStyle: {
    width: 30,
    height: 36
  },
  displayPdfStyle: {
    display: 'block',
    width: 30,
    height: 36,
    margin: '0 auto',
    cursor: 'pointer'
  },
  fileNameContainerStyle: {
    display: 'inline-block',
    float: 'left',
    height: 36,
    marginLeft: 18
  },
  fileNameStyle: {
    fontSize: fonts.h3,
    color: colors.blackColor
  }
};

export default DxPdfViewerToolbar;

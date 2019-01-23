import React, { Component } from 'react';

// Libraries
import ColorPicker from 'rc-color-picker';
import '../../../../../assets/css/rc-color-picker/rc-color-picker.css';
import Button from '@material-ui/core/Button';
import CloudUpload from '@material-ui/icons/CloudUpload';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';

// components
import DxInput from '../../../components/dxInput/DxInput';
import DxTextEditorToolbar from './DxTextEditorToolbar';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';
import config from '../../../config';

class DxH5pToolbar extends Component {
  handleChangeFile = files => {
    let file = files[0];
    if (file) {
      const filename = file.name;
      const regex = /\.[0-9a-z]+$/i;
      const matches = filename.match(regex);
      const suffix = matches[0];
      if (matches.length && suffix) {
        if (suffix != '.h5p') {
          this.props.handleH5pError('The supported file type is .h5p');
          return;
        }
        this.props.handleH5pChange(file);
      }
    }
  };

  handlePreviewLink = () => {
    let { h5p } = this.props;

    if (h5p) {
      let link = `${config.h5pHost}?h5p=${h5p}`;
      window.open(link, '_blank');
    }
  };

  render() {
    const { activeElemType, sectionGUID, h5pFileName, h5pBgColor } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      optionContainerStyle,
      iconStyle,
      fileInputStyle,
      fileNameContainerStyle,
      fileNameStyle
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
            {/* H5P */}
            <div className={activeElemType == 'H5P' ? 'dx_show' : 'dx_hidden'}>
              <div style={mainContainerStyle}>
                <div style={optionContainerStyle}>
                  <div>
                    <label for="h5p-file-input">
                      <CloudUpload style={iconStyle} />
                    </label>
                    <input
                      style={fileInputStyle}
                      id="h5p-file-input"
                      type="file"
                      onChange={e => this.handleChangeFile(e.target.files)}
                    />
                  </div>
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
                    color={h5pBgColor}
                    onChange={colors => this.props.handleBgColorChange(colors)}
                  />
                </div>
                {h5pFileName ? (
                  <div style={fileNameContainerStyle}>
                    <div style={tableContainerStyle}>
                      <div style={tableWrapperStyle}>
                        <span style={fileNameStyle}>{h5pFileName}</span>
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
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  iconStyle: {
    marginTop: 3,
    color: colors.lightGreyColor,
    fontSize: 30,
    cursor: 'pointer'
  },
  fileInputStyle: {
    visibility: 'hidden',
    width: 0,
    height: 0
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

export default DxH5pToolbar;

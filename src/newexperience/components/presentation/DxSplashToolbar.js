import React, { Component } from 'react';

// config
import config from '../../../config';

// Components
import DxTextEditorToolbar from './DxTextEditorToolbar';

// Libraries
import Slider from '@material-ui/lab/Slider';
import ColorPicker from 'rc-color-picker';
import '../../../../../assets/css/rc-color-picker/rc-color-picker.css';

// helpers
import * as helpers from '../../../helpers';

class DxSplashToolbar extends Component {
  handleImgChange = event => {
    let file = event.target.files[0];
    if (!file.type.match('image.*')) {
      this.props.handleImgError('We only accept JPG & PNG for images');
      return;
    }
    let numb = file.size / 1024 / 1024;
    numb = numb.toFixed(2);
    if (numb > 5) {
      this.props.handleImgError(
        'Maximum upload size is 5MB. Reduce the file size and upload  again'
      );
      return;
    }
    this.props.handleImgChange(file);
  };

  render() {
    const { sectionGUID, activeElemType, imgFile, color } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      optionContainerStyle,
      sliderOptionContainerStyle,
      imgInputContainerStyle,
      imgInputStyle,
      displayImgContainerStyle,
      displayImgStyle
    } = styles;

    return (
      <div className={activeElemType ? 'dx_show_toolbar' : 'dx_hidden_toolbar'}>
        <div style={tableContainerStyle}>
          <div style={tableWrapperStyle}>
            <div style={mainContainerStyle}>
              {/* IMAGE */}
              <div
                className={activeElemType == 'IMAGE' ? 'dx_show' : 'dx_hidden'}
              >
                <div style={{ display: 'flex' }}>
                  <div
                    style={Object.assign(
                      {},
                      optionContainerStyle,
                      imgInputContainerStyle
                    )}
                  >
                    <input
                      style={imgInputStyle}
                      type="file"
                      onChange={event => this.handleImgChange(event)}
                    />
                    <label style={displayImgContainerStyle}>
                      <img
                        style={displayImgStyle}
                        src={
                          imgFile
                            ? `${
                                config.picHost
                              }${imgFile}&OrgUrl=${helpers.getOrgUrl()}`
                            : require('../../../../../assets/images/splashBg.png')
                        }
                      />
                    </label>
                  </div>

                  <div style={optionContainerStyle}>
                    <ColorPicker
                      animation="slide-up"
                      enableAlpha={false}
                      color={this.props.splashOpacityColor}
                      onChange={colors =>
                        this.props.handleOpacityColorChange(colors)
                      }
                    />
                  </div>
                  <div style={sliderOptionContainerStyle}>
                    <Slider
                      className="dx_opacity_slider"
                      value={this.props.splashOpacity}
                      onChange={(e, val) => this.props.handleOpacityChange(val)}
                    />
                  </div>
                </div>
              </div>

              {/* TOOL */}
              <div
                className={activeElemType == 'TOOL' ? 'dx_show' : 'dx_hidden'}
              >
                <div style={optionContainerStyle}>
                  <ColorPicker
                    animation="slide-up"
                    color={color}
                    onChange={colors => this.props.handleColorChange(colors)}
                  />
                </div>
              </div>

              {/* TEXT */}
              {activeElemType == 'TEXT' ? (
                <div
                  className={activeElemType == 'TEXT' ? 'dx_show' : 'dx_hidden'}
                >
                  <DxTextEditorToolbar sectionGUID={sectionGUID} />
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
    display: 'flex'
  },
  optionContainerStyle: {
    width: 36,
    height: 36,
    marginLeft: 6,
    marginRight: 6,
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  sliderOptionContainerStyle: {
    width: 120,
    marginLeft: 6,
    marginRight: 6
  },
  imgInputContainerStyle: {
    position: 'relative'
  },
  imgInputStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 36,
    height: 36,
    opacity: 0,
    overflow: 'hidden',
    cursor: 'pointer'
  },
  displayImgContainerStyle: {
    width: 36,
    height: 36
  },
  displayImgStyle: {
    display: 'block',
    width: 36,
    height: 36
  }
};

export default DxSplashToolbar;

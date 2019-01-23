import React, { Component } from 'react';

// config
import config from '../../../config';

// constants
import colors from '../../../styles/colors';

// Components
import DxInput from '../../../components/dxInput/DxInput';
import DxTextEditorToolbar from './DxTextEditorToolbar';

// Libraries
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import ColorPicker from 'rc-color-picker';
import '../../../../../assets/css/rc-color-picker/rc-color-picker.css';

// helpers
import * as helpers from '../../../helpers';

class CardOption extends Component {
  constructor(props) {
    super(props);
  }

  handleImageChange = event => {
    let file = event.target.files[0];
    if (!file.type.match('image.*')) {
      this.props.handleImageError('We only accept JPG & PNG for images');
      return;
    }
    let numb = file.size / 1024 / 1024;
    numb = numb.toFixed(2);
    if (numb > 5) {
      this.props.handleImageError(
        'Maximum upload size is 5MB. Reduce the file size and upload  again'
      );
      return;
    }
    this.props.handleImageChange(file);
    let img_input = this.refs.img_input;
    img_input.value = '';
  };

  handleColorChange = (colors, type) => {
    this.props.handleColorChange(colors, type);
  };

  handleVideoInputChange = e => {
    this.props.handleContentChange(e.target.value);
  };

  handleVideoInsertClick = (toggle, isVideoInsertClickable) => {
    if (!isVideoInsertClickable) return;
    this.props.handleVideoInsertClick(toggle);
  };

  handleOptionClick = e => {
    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  };

  handleChangeOpacity = val => {
    this.props.handleOpacityChange(val);
  };

  renderBar = (activeCardTemplate, activeElemType) => {
    if (!activeElemType) {
      return null;
    }
    const activeElemSetting = activeCardTemplate.Settings.filter(
      item => item.Type === activeElemType
    );
    if (!activeElemSetting.length) {
      return null;
    }

    return this.renderOption(activeElemSetting[0], activeCardTemplate.CardGUID);
  };

  renderOption = (setting, cardGUID) => {
    const {
      tableContainerStyle,
      tableWrapperStyle,
      optionContainerStyle,
      sliderOptionContainerStyle,
      videoOptionContainerStyle,
      imgInputContainerStyle,
      imgInputStyle,
      displayImgContainerStyle,
      displayImgStyle,

      videoInputContainerStyle,
      videoInputWrapperStyle,
      videoInputBtnStyle,
      iconStyle
    } = styles;

    let option;
    if (setting.Type == 'IMAGE') {
      option = (
        <div className="dx_show_toolbar">
          <div style={tableContainerStyle}>
            <div style={tableWrapperStyle}>
              <div style={{ display: 'flex' }}>
                <div style={optionContainerStyle}>
                  <div style={imgInputContainerStyle}>
                    <input
                      ref="img_input"
                      name="dx_img_upload"
                      style={imgInputStyle}
                      type="file"
                      onChange={event => this.handleImageChange(event)}
                    />
                    <label
                      style={displayImgContainerStyle}
                      htmlFor="dx_img_upload"
                    >
                      <img
                        style={displayImgStyle}
                        src={
                          this.props.imgFile
                            ? `${config.picHost}${
                                this.props.imgFile
                              }&OrgUrl=${helpers.getOrgUrl()}`
                            : require('../../../../../assets/images/imageleftRightBg.png')
                        }
                      />
                    </label>
                  </div>
                </div>
                <div style={optionContainerStyle}>
                  <ColorPicker
                    animation="slide-up"
                    enableAlpha={false}
                    color={this.props.opacityColor}
                    onChange={colors =>
                      this.handleColorChange(colors, 'OPACITY_COLOR')
                    }
                  />
                </div>
                <div style={sliderOptionContainerStyle}>
                  <Slider
                    className="dx_opacity_slider"
                    value={this.props.opacity}
                    onChange={(e, val) => this.handleChangeOpacity(val)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (setting.Type == 'BACKGROUND_COLOR') {
      option = (
        <div className="dx_show_toolbar">
          <div style={tableContainerStyle}>
            <div style={tableWrapperStyle}>
              <div style={optionContainerStyle}>
                <ColorPicker
                  animation="slide-up"
                  color={setting.Default}
                  onChange={colors =>
                    this.handleColorChange(colors, 'BACKGROUND_COLOR')
                  }
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (setting.Type == 'TEXT') {
      option = (
        <div className="dx_show_toolbar">
          <div style={tableContainerStyle}>
            <div style={tableWrapperStyle}>
              <div style={{ marginLeft: 6 }}>
                <DxTextEditorToolbar isActive={true} sectionGUID={cardGUID} />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (setting.Type == 'VIDEO') {
      option = (
        <div className="dx_show_toolbar">
          {this.props.videoInsert ? (
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <div style={videoInputContainerStyle}>
                  <div style={videoInputWrapperStyle}>
                    <DxInput
                      enableEnter={true}
                      placeholder="Embed video url"
                      handleValChange={e => this.handleVideoInputChange(e)}
                      isDark={true}
                      width="144px"
                      disabled={false}
                      value={this.props.videoUrl}
                      handleKeyPress={() =>
                        this.handleVideoInsertClick(
                          false,
                          this.props.isVideoInsertClickable
                        )
                      }
                      isRounded={true}
                    />
                  </div>
                  <Button
                    style={videoInputBtnStyle}
                    onClick={() =>
                      this.handleVideoInsertClick(
                        false,
                        this.props.isVideoInsertClickable
                      )
                    }
                    variant="Enter video url"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <div
                  style={videoOptionContainerStyle}
                  onClick={() =>
                    this.handleVideoInsertClick(
                      true,
                      this.props.isVideoInsertClickable
                    )
                  }
                >
                  <VideoLibrary style={iconStyle} />
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    return option;
  };

  render() {
    const {
      cardGUID,
      settings,
      activeElemType,
      activeCardTemplate
    } = this.props;

    const { mainContainerStyle } = styles;

    return (
      <div style={mainContainerStyle} onClick={e => this.handleOptionClick(e)}>
        {this.renderBar(activeCardTemplate, activeElemType)}
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  optionContainerStyle: {
    height: 36,
    width: 36,
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
  videoOptionContainerStyle: {
    height: 36,
    width: 36,
    marginLeft: 6,
    marginRight: 6,
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  },
  imgInputContainerStyle: {
    position: 'relative'
  },
  imgInputStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
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
  },

  videoInputContainerStyle: {
    marginLeft: 6,
    display: 'flex',
    flexDirection: 'row',
    width: 300
  },
  videoInputWrapperStyle: {
    flex: 4,
    marginTop: 4
  },
  videoInputBtnStyle: {
    flex: 1,
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'capitalize',
    marginLeft: 6,
    marginRight: 6
  },
  iconStyle: {
    color: colors.lightGreyColor,
    fontSize: 30,
    display: 'block',
    margin: '0 auto'
  }
};

export default CardOption;

import React, { Component } from 'react';

// redux
import { connect } from 'react-redux';
import {
  dxChannelValueUpdate as dxChannelValueUpdateAction,
  dxChannelCodeValueUpdate as dxChannelCodeValueUpdateAction,
  dxChannelSelectLanguage as dxChannelSelectLanguageAction
} from '../../actions';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';
import sizes from '../../../styles/sizes';

// Libraries
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import CheckCircle from '@material-ui/icons/CheckCircle';
import NotInterested from '@material-ui/icons/NotInterested';
import { ClipLoader } from 'react-spinners';
import Select from 'react-select';

// components
import ChannelOptionBar from '../presentation/ChannelOptionBar';
import ChannelColorOptionBar from '../presentation/ChannelColorOptionBar';
import ChannelTitleInput from '../presentation/ChannelTitleInput';
import ChannelDescInput from '../presentation/ChannelDescInput';

class ChannelPanel extends Component {
  handleChangeLanguage = selectedLanguage => {
    this.props.dxChannelSelectLanguageAction(selectedLanguage);
  };

  handleValueUpdate = (type, val) => {
    const { Channel } = this.props;
    if (type == 'CHANNEL_CODE') {
      if (!val) {
        this.props.dxChannelCodeValueUpdateAction(
          val,
          Channel.ExperienceChannelGUID
        );
      }
      if (val && val.length <= 255) {
        this.props.dxChannelCodeValueUpdateAction(
          val,
          Channel.ExperienceChannelGUID
        );
      }
    } else {
      if (type == 'CHANNEL_NAME' && val && val.length > 255) {
        return;
      }
      this.props.dxChannelValueUpdateAction(type, val);
    }
  };

  renderAdornment = channel => {
    let adornment;
    if (channel.ChannelSyncing) {
      adornment = (
        <div style={{ paddingRight: 6, height: 12 }}>
          <ClipLoader size={12} color={colors.greenColor} loading={true} />
        </div>
      );
    } else {
      if (channel.ChannelCodeAvailable) {
        adornment = <CheckCircle style={{ color: colors.greenColor }} />;
      } else {
        adornment = (
          <a className="dx_promo_code_view dx_tool_tip">
            <NotInterested style={{ color: colors.redColor }} />
            <span class="dx_tool_tip_text">Already taken</span>
          </a>
        );
      }
    }
    return adornment;
  };

  render() {
    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      mainWrapperStyle,
      optionContainerStyle,
      leftContainerStyle,
      labelStyle,
      descLabelStyle,
      promoInputStyle,
      rightContainerStyle
    } = styles;

    const { Channel, ChannelLanguages, SelectedChannelLanguage } = this.props;

    SelectedChannelLanguage.label = SelectedChannelLanguage.Language
      ? SelectedChannelLanguage.Language
      : '';
    const formattedChannelLanguages = ChannelLanguages.map(item => {
      item.label = item.Language;
      return item;
    });

    return (
      <div style={mainContainerStyle}>
        <div style={tableContainerStyle}>
          <div style={tableWrapperStyle}>
            <div style={mainWrapperStyle}>
              {Channel.ChannelType == '3' ? null : (
                <div style={optionContainerStyle}>
                  <div style={leftContainerStyle}>
                    <p style={labelStyle}>Visibility</p>
                  </div>
                  <div style={rightContainerStyle}>
                    <p style={descLabelStyle}>
                      What kind of channel visibility you would like your end
                      user to experience?
                    </p>
                    <ChannelOptionBar
                      channelType={Channel.ChannelType}
                      handleClickOption={val =>
                        this.handleValueUpdate('CHANNEL_TYPE', val)
                      }
                    />
                  </div>
                </div>
              )}
              {Channel.ChannelType == '2' ? (
                <div style={optionContainerStyle}>
                  <div style={leftContainerStyle}>
                    <p style={labelStyle}>Promo Code</p>
                  </div>
                  <div style={rightContainerStyle}>
                    <p style={descLabelStyle}>Enter your promo code.</p>
                    <Input
                      style={promoInputStyle}
                      value={Channel.ChannelCode}
                      fullWidth
                      disableUnderline={true}
                      placeholder={'Enter your promo code..'}
                      inputProps={{ 'aria-label': 'Search' }}
                      onChange={e =>
                        this.handleValueUpdate('CHANNEL_CODE', e.target.value)
                      }
                      endAdornment={
                        Channel.ChannelCode ? (
                          <InputAdornment position="end">
                            {this.renderAdornment(Channel)}
                          </InputAdornment>
                        ) : null
                      }
                    />
                  </div>
                </div>
              ) : null}
              <div style={optionContainerStyle}>
                <div style={leftContainerStyle}>
                  <p style={labelStyle}>Color</p>
                </div>
                <div style={rightContainerStyle}>
                  <p style={descLabelStyle}>
                    Choose a color for your channel. We recommend using one
                    color for each channel you own.
                  </p>
                  <ChannelColorOptionBar
                    color={Channel.ChannelColor}
                    handleColorPicker={color =>
                      this.handleValueUpdate('CHANNEL_COLOR', color)
                    }
                  />
                </div>
              </div>
              <div style={optionContainerStyle}>
                <div style={leftContainerStyle}>
                  <p style={labelStyle}>Title</p>
                </div>
                <div style={rightContainerStyle}>
                  <p style={descLabelStyle}>
                    Choose a channel title relevant to your audience’s interest.
                    Ex. Diabetes, Radiology, News etc.
                  </p>
                  <ChannelTitleInput
                    isDisabled={false}
                    channelName={Channel.ChannelName}
                    color={Channel.ChannelColor}
                    handleTitleCharacterChange={val =>
                      this.handleValueUpdate('CHANNEL_NAME', val)
                    }
                  />
                </div>
              </div>
              <div style={optionContainerStyle}>
                <div style={leftContainerStyle}>
                  <p style={labelStyle}>Description</p>
                </div>
                <div style={rightContainerStyle}>
                  <p style={descLabelStyle}>
                    Write an amazing description for your channel. Your audience
                    will read this before joining the channel
                  </p>
                  <ChannelDescInput
                    description={Channel.ChannelDescription}
                    handleDescriptionCharacterChange={val =>
                      this.handleValueUpdate('CHANNEL_DESCRIPTION', val)
                    }
                  />
                </div>
              </div>
              <div style={optionContainerStyle}>
                <div style={leftContainerStyle}>
                  <p style={labelStyle}>Language</p>
                </div>
                <div style={rightContainerStyle}>
                  <p style={descLabelStyle}>Select a language</p>
                  <Select
                    value={SelectedChannelLanguage}
                    onChange={this.handleChangeLanguage}
                    options={formattedChannelLanguages}
                    isDisabled={Channel.ChannelType == '3'}
                  />
                </div>
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
    height: `calc(100vh - ${sizes.headerHeight})`,
    width: '100%'
  },
  mainWrapperStyle: {
    width: 600,
    margin: '0 auto'
  },
  optionContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 36
  },
  leftContainerStyle: {
    flex: '120px 0 0',
    display: 'flex',
    flexDirection: 'row'
  },
  rightContainerStyle: {
    flex: 1
  },
  labelStyle: {
    margin: 0,
    fontSize: fonts.h3,
    color: colors.blackColor
  },
  descLabelStyle: {
    margin: 0,
    color: colors.labelColor,
    fontSize: fonts.h4,
    marginBottom: 24
  },
  promoInputStyle: {
    height: 28,
    width: 225,
    paddingLeft: 12,
    backgroundColor: colors.whiteColor,
    borderRadius: '18px',
    border: 'none',
    fontSize: fonts.h3
  },
  defaultColorOptionIconContainerStyle: {
    height: 36
  },
  colorOptionIconContainerStyle: {
    height: 42,
    width: 42,
    marginLeft: 3,
    marginRight: 3
  },
  colorOptionIconWrapperStyle: {
    height: 30,
    width: 30
  },
  colorOptionIconStyle: {
    height: 4,
    width: 4
  },
  textAreaStyle: {
    backgroundColor: colors.whiteColor
  },
  colorOptionContainerStyle: {
    display: 'flex',
    flexDirection: 'row'
  },
  characterCounterStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 0
  },
  colorPickerContainerStyle: {
    textAlign: 'Left',
    height: 42,
    width: 60
  },
  hexColorPickerStyle: {
    backgroundColor: colors.lightBlueColor,
    color: colors.labelColor
  },
  titleInputStyle: {
    height: 36,
    width: '100%',
    fontSize: fonts.h3,
    border: 'none',
    outlineStyle: 'none',
    marginBottom: 6
  }
};

const stateToProps = state => {
  return {
    Channel: state.newchannel.Channel,
    ChannelLanguages: state.newchannel.ChannelLanguages,
    SelectedChannelLanguage: state.newchannel.SelectedChannelLanguage
  };
};

const dispatchToProps = {
  dxChannelValueUpdateAction,
  dxChannelCodeValueUpdateAction,
  dxChannelSelectLanguageAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(ChannelPanel);

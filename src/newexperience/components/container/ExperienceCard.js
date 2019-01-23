import React, { Component } from 'react';

// data
import ExperienceCardData from '../../../../../data/ExperienceCardData';

// components
import DxCard from '../../../components/dxCard/DxCard';
import SearchBar from '../../../components/searchBar/SearchBar';
import CardTemplate from '../presentation/CardTemplate';
import CardOption from '../presentation/CardOption';

// Libraries
import Button from '@material-ui/core/Button';
import DropdownMenu from 'react-dd-menu';

// redux
import { connect } from 'react-redux';
import {
  dxExperienceCardTemplateFetch as dxExperienceCardTemplateFetchAction,
  dxExperienceCardTemplateSelect as dxExperienceCardTemplateSelectAction,
  dxExperienceCardTemplateElemSelect as dxExperienceCardTemplateElemSelectAction,
  dxExperienceCardTemplateUpdateImage as dxExperienceCardTemplateUpdateImageAction,
  dxExperienceCardTemplateUpdateColor as dxExperienceCardTemplateUpdateColorAction,
  dxExperienceCardTemplateUpdateOpacity as dxExperienceCardTemplateUpdateOpacityAction,
  dxExperienceCardTemplateUpdateContent as dxExperienceCardTemplateUpdateContentAction
} from '../../actions';
import { dxAlert as dxAlertAction } from '../../../actions';

// constants
import sizes from '../../../styles/sizes';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

class ExperienceCard extends Component {
  state = {
    activeTab: 0,
    videoInsert: false
  };

  componentDidMount() {
    this.props.dxExperienceCardTemplateFetchAction(
      ExperienceCardData.CardTemplates
    );
  }

  handleErrorMsg = msg => {
    this.props.dxAlertAction(true, true, msg);
  };

  handleClickCate = activeTab => {
    this.setState({
      activeTab
    });
  };

  handleSelectCardTemplate = template => {
    this.props.dxExperienceCardTemplateSelectAction(template);
  };

  handleImageChange = imgFile => {
    this.props.dxExperienceCardTemplateUpdateImageAction(imgFile);
  };

  handleColorChange = (colors, type) => {
    this.props.dxExperienceCardTemplateUpdateColorAction(colors.color, type);
  };

  handleCardTemplateContentChange = val => {
    this.props.dxExperienceCardTemplateUpdateContentAction(val);
  };

  handleVideoInsertClick = toggle => {
    this.setState({
      videoInsert: toggle
    });
  };

  handleElemSelect = elemType => {
    this.props.dxExperienceCardTemplateElemSelectAction(elemType);
  };

  handleBlurActiveElem = () => {
    this.props.dxExperienceCardTemplateElemSelectAction(null);
  };

  handleOpacityChange = val => {
    this.props.dxExperienceCardTemplateUpdateOpacityAction(val);
  };

  render() {
    const { activeTab } = this.state;

    const {
      mainContainerStyle,
      hiddenLeftContainerStyle,
      leftContainerStyle,
      leftWrapperStyle,
      cateContainerStyle,
      optionBtnContainerStyle,
      btnStyle,
      itemContainerStyle,
      searchBarContainerStyle,
      templateContainerStyle,
      rightContainerStyle,
      optionBarWrapperStyle,
      tableContainerStyle,
      tableWrapperStyle,
      demoCardContainerStyle,

      propertyBarContainerStyle
    } = styles;

    const activeOptionBtnStyle = { backgroundColor: colors.lightBlueColor };

    return (
      <div style={mainContainerStyle}>
        {/* <a onClick={() => console.log('check: ', this.props.Experience)}>click me</a> */}
        <div
          className={
            this.props.Experience.IsCardTemplateMenuOpen
              ? 'dx_scale_container active_expand'
              : 'dx_scale_container'
          }
          style={
            this.props.Experience.IsCardTemplateMenuOpen
              ? leftContainerStyle
              : hiddenLeftContainerStyle
          }
        >
          <DropdownMenu
            isOpen={this.props.Experience.IsCardTemplateMenuOpen}
            close={() => {}}
            align="center"
            className="dx-layout-menu"
            closeOnInsideClick={false}
          >
            <div style={leftWrapperStyle}>
              <div style={cateContainerStyle}>
                <div>
                  <Button
                    className="dx-cat-btn"
                    style={Object.assign(
                      {},
                      btnStyle,
                      activeTab == 0 ? activeOptionBtnStyle : {}
                    )}
                    variant="Popular"
                    onClick={() => this.handleClickCate(0)}
                  >
                    Popular
                  </Button>
                </div>
                <div style={optionBtnContainerStyle}>
                  <Button
                    className="dx-cat-btn"
                    style={Object.assign(
                      {},
                      btnStyle,
                      activeTab == 1 ? activeOptionBtnStyle : {}
                    )}
                    variant="Image"
                    onClick={() => this.handleClickCate(1)}
                  >
                    Image
                  </Button>
                </div>
                <div style={optionBtnContainerStyle}>
                  <Button
                    className="dx-cat-btn"
                    style={Object.assign(
                      {},
                      btnStyle,
                      activeTab == 2 ? activeOptionBtnStyle : {}
                    )}
                    variant="Text"
                    onClick={() => this.handleClickCate(2)}
                  >
                    Text
                  </Button>
                </div>
                <div style={optionBtnContainerStyle}>
                  <Button
                    className="dx-cat-btn"
                    style={Object.assign(
                      {},
                      btnStyle,
                      activeTab == 3 ? activeOptionBtnStyle : {}
                    )}
                    variant="Video"
                    onClick={() => this.handleClickCate(3)}
                  >
                    Video
                  </Button>
                </div>
                <div style={optionBtnContainerStyle}>
                  <Button
                    className="dx-cat-btn"
                    style={Object.assign(
                      {},
                      btnStyle,
                      activeTab == 4 ? activeOptionBtnStyle : {}
                    )}
                    variant="Stacked"
                    onClick={() => this.handleClickCate(4)}
                  >
                    Stacked
                  </Button>
                </div>
                <div style={optionBtnContainerStyle}>
                  <Button
                    className="dx-cat-btn"
                    style={Object.assign(
                      {},
                      btnStyle,
                      activeTab == 5 ? activeOptionBtnStyle : {}
                    )}
                    variant="Examples"
                    onClick={() => this.handleClickCate(5)}
                  >
                    Examples
                  </Button>
                </div>
              </div>
              <div style={itemContainerStyle}>
                <div style={searchBarContainerStyle}>
                  <SearchBar placeholder="search for layout" />
                </div>
                <div style={templateContainerStyle}>
                  {this.props.CardTemplates.map((template, index) => (
                    <CardTemplate
                      key={index}
                      isWithTitle={true}
                      isCenterCard={true}
                      isEditable={false}
                      isClickable={true}
                      isVideoInsertClickable={false}
                      template={template}
                      handleSelectCardTemplate={template =>
                        this.handleSelectCardTemplate(template)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </DropdownMenu>
        </div>

        <div
          className={
            this.props.Experience.IsCardTemplateMenuOpen
              ? 'dx_scale_container'
              : 'dx_scale_container active_expand'
          }
          style={rightContainerStyle}
          onClick={() => this.handleBlurActiveElem()}
        >
          <div style={propertyBarContainerStyle}>
            <div
              className={
                this.props.ActiveElemType ? 'dx_fade_in_div' : 'dx_fade_out_div'
              }
            >
              <div style={optionBarWrapperStyle}>
                {this.props.Experience.CardTemplate ? (
                  <CardOption
                    cardGUID={this.props.Experience.CardTemplate.CardGUID}
                    settings={this.props.Experience.CardTemplate.Settings}
                    activeElemType={this.props.ActiveElemType}
                    isVideoInsertClickable={true}
                    imgFile={
                      this.props.Experience.CardTemplate.Settings[0]
                        ? this.props.Experience.CardTemplate.Settings[0].Default
                        : null
                    }
                    opacityColor={
                      this.props.Experience.CardTemplate.Settings[
                        this.props.Experience.CardTemplate.Settings.length - 2
                      ]
                        ? this.props.Experience.CardTemplate.Settings[
                            this.props.Experience.CardTemplate.Settings.length -
                              2
                          ].Default
                        : '#000000'
                    }
                    opacity={
                      this.props.Experience.CardTemplate.Settings[
                        this.props.Experience.CardTemplate.Settings.length - 1
                      ]
                        ? this.props.Experience.CardTemplate.Settings[
                            this.props.Experience.CardTemplate.Settings.length -
                              1
                          ].Default
                        : 40
                    }
                    videoInsert={this.state.videoInsert}
                    videoUrl={this.props.Experience.CardTemplate.Content}
                    activeCardTemplate={this.props.ActiveCardTemplate}
                    handleImageChange={file => this.handleImageChange(file)}
                    handleImageError={msg => this.handleErrorMsg(msg)}
                    handleColorChange={(colors, type) =>
                      this.handleColorChange(colors, type)
                    }
                    handleContentChange={val =>
                      this.handleCardTemplateContentChange(val)
                    }
                    handleVideoInsertClick={toggle =>
                      this.handleVideoInsertClick(toggle)
                    }
                    handleOpacityChange={val => this.handleOpacityChange(val)}
                  />
                ) : null}
              </div>
            </div>
          </div>

          <div style={tableContainerStyle}>
            <div style={tableWrapperStyle}>
              <div style={demoCardContainerStyle}>
                {this.props.Experience.CardTemplate ? (
                  <DxCard
                    enableShadow={true}
                    isCenterCard={true}
                    isEditable={true}
                    activeElemType={this.props.ActiveElemType}
                    isClickable={false}
                    isVideoInsertClickable={true}
                    videoInsert={this.state.videoInsert}
                    template={this.props.Experience.CardTemplate}
                    opacityColor={
                      this.props.Experience.CardTemplate.Settings[
                        this.props.Experience.CardTemplate.Settings.length - 2
                      ]
                        ? this.props.Experience.CardTemplate.Settings[
                            this.props.Experience.CardTemplate.Settings.length -
                              2
                          ].Default
                        : '#000000'
                    }
                    opacity={
                      this.props.Experience.CardTemplate.Settings[
                        this.props.Experience.CardTemplate.Settings.length - 1
                      ]
                        ? this.props.Experience.CardTemplate.Settings[
                            this.props.Experience.CardTemplate.Settings.length -
                              1
                          ].Default
                        : 40
                    }
                    videoWidth={300}
                    activeCardTemplate={this.props.ActiveCardTemplate}
                    handleContentChange={val =>
                      this.handleCardTemplateContentChange(val)
                    }
                    handleElemSelect={elemType =>
                      this.handleElemSelect(elemType)
                    }
                    handleVideoError={msg => this.handleErrorMsg(msg)}
                  />
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
  mainContainerStyle: {
    width: sizes.dxWidth,
    height: `calc(100vh - ${sizes.headerHeight})`,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  hiddenLeftContainerStyle: {
    width: 0
  },
  leftContainerStyle: {
    flex: 1
  },
  leftWrapperStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  cateContainerStyle: {
    flex: 1
  },
  optionBtnContainerStyle: {
    borderTop: '1px solid',
    borderColor: colors.borderColor
  },
  btnStyle: {
    width: 100,
    height: 48,
    fontSize: fonts.h3,
    borderRadius: 0,
    textTransform: 'capitalize'
  },
  itemContainerStyle: {
    flex: 3
  },
  searchBarContainerStyle: {
    padding: 12,
    height: 42
  },
  templateContainerStyle: {
    overflowY: 'auto',
    height: `calc(100vh - ${sizes.headerHeight} - 66px)`
  },
  rightContainerStyle: {
    flex: 2,
    position: 'relative'
  },
  optionBarWrapperStyle: {
    height: 60,
    width: '100%'
  },
  tableContainerStyle: {
    position: 'relative',
    display: 'table',
    height: '100%',
    width: '100%'
  },
  tableWrapperStyle: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center'
  },
  demoCardContainerStyle: {
    margin: '0 auto',
    height: 90,
    width: 300
  },

  propertyBarContainerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 60,
    width: '100%',
    zIndex: 999
  }
};

const stateToProps = state => {
  return {
    CardTemplates: state.newexperience.CardTemplates,
    Experience: state.newexperience.Experience,

    ActiveCardTemplate: state.newexperience.ActiveCardTemplate,
    ActiveElemType: state.newexperience.ActiveElemType
  };
};

const dispatchToProps = {
  dxExperienceCardTemplateFetchAction,
  dxExperienceCardTemplateSelectAction,
  dxExperienceCardTemplateElemSelectAction,
  dxExperienceCardTemplateUpdateImageAction,
  dxExperienceCardTemplateUpdateColorAction,
  dxExperienceCardTemplateUpdateOpacityAction,
  dxExperienceCardTemplateUpdateContentAction,

  dxAlertAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(ExperienceCard);

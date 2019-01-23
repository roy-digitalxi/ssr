import React, { Component } from 'react';

// Libraries
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Fade from '@material-ui/core/Fade';
import Popover from '@material-ui/core/Popover';

// constatnt
import fonts from '../../../../styles/fonts';
import colors from '../../../../styles/colors';

// components
import DxCard from '../../../../components/dxCard/DxCard';
import DxPage from '../../../../components/dxPage/DxPage';

class ExperienceCase extends Component {
  state = {
    anchorEl: null
  };

  preventParent = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  };

  handleClick = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();

    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleEditExperience = () => {
    this.setState({ anchorEl: null });
    this.props.handleEditExperience();
  };

  handleRemoveExperience = () => {
    this.setState({ anchorEl: null });
    this.props.handleRemoveExperience();
  };

  renderBottomToolBar = () => {
    const { experience } = this.props;

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const {
      tableContainerStyle,
      tableWrapperStyle,
      bottomControlContainerStyle,
      labelContainerStyle,
      controlContainerStyle,
      controlWrapperStyle,
      bottomLabelStyle,
      editBurgerStyle
    } = styles;

    return (
      <div style={bottomControlContainerStyle}>
        <div style={labelContainerStyle}>
          <div style={tableContainerStyle}>
            <div
              style={Object.assign({}, tableWrapperStyle, {
                paddingLeft: 6,
                paddingRight: 6
              })}
            >
              <p style={bottomLabelStyle}>{experience.ExperienceTitle}</p>
            </div>
          </div>
        </div>
        <div style={controlContainerStyle}>
          <div style={controlWrapperStyle}>
            <IconButton
              style={editBurgerStyle}
              aria-owns={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreHoriz />
            </IconButton>
            <Popover
              style={{ marginTop: 12 }}
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <div>
                <Button onClick={() => this.handleEditExperience()}>
                  Edit
                </Button>
              </div>
              <div>
                <Button onClick={() => this.handleRemoveExperience()}>
                  Remove
                </Button>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { experience } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      dxCardContainerStyle,
      leftIconContainerStyle,
      leftIconWrapperStyle,
      rightContentContainerStyle,
      dxPageContainerStyle
    } = styles;

    return (
      <div style={mainContainerStyle} onClick={e => this.preventParent(e)}>
        <div style={dxCardContainerStyle}>
          {/* <div style={leftIconContainerStyle}>
                        <div
                            style={leftIconWrapperStyle}
                            className="dx_card"
                        >
                            <div style={tableContainerStyle}>
                                <div style={tableWrapperStyle}>
                                    <img src={require('../../../../../../assets/images/card_indicator.png')} />
                                </div>
                            </div>
                        </div>
                    </div> */}
          <div style={rightContentContainerStyle} className="dx_card">
            <DxCard
              enableShadow={false}
              isWithTitle={false}
              isWithBottomBar={false}
              isCenterCard={false}
              isEditable={false}
              isClickable={false}
              isVideoInsertClickable={false}
              videoWidth={275}
              cardTitle={experience.ExperienceTitle}
              activeCardTemplate={experience.ExperienceCard}
              opacityColor={
                experience.ExperienceCard.Settings[
                  experience.ExperienceCard.Settings.length - 2
                ]
                  ? experience.ExperienceCard.Settings[
                      experience.ExperienceCard.Settings.length - 2
                    ].Default
                  : '#000000'
              }
              opacity={
                experience.ExperienceCard.Settings[
                  experience.ExperienceCard.Settings.length - 1
                ]
                  ? experience.ExperienceCard.Settings[
                      experience.ExperienceCard.Settings.length - 1
                    ].Default
                  : 40
              }
              hidenVideoIcon={true}
              handleElemSelect={() => {}}
              handleVideoError={msg => this.props.handleErrorMsg(msg)}
            />
            {/* version 2.0 */}
            {this.renderBottomToolBar()}
          </div>
        </div>
        {/* {
                    experience.ExperienceType == 1 ?
                        <div style={dxPageContainerStyle}>
                            <div style={leftIconContainerStyle}>
                                <div
                                    style={leftIconWrapperStyle}
                                    className="dx_card"
                                >
                                    <div style={tableContainerStyle}>
                                        <div style={tableWrapperStyle}>
                                            <img src={require('../../../../../../assets/images/page_indicator.png')} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={rightContentContainerStyle}
                                className="dx_card"
                            >
                                <DxPage
                                    pdfWidth={264}
                                    pages={experience.ExperiencePages}
                                    displayPageNumber={false}
                                    isWithBottomBar={false}
                                    isLoadHtml={true}
                                    handleLoadHtml={(pageGUID, sectionGUID, guid) => this.props.handleLoadHtml(pageGUID, sectionGUID, guid)}
                                />
                                {
                                    this.renderBottomToolBar()
                                }
                            </div>
                        </div>
                        :
                        null
                } */}
      </div>
    );
  }
}

const styles = {
  tableContainerStyle: {
    position: 'relative',
    display: 'table',
    width: '100%',
    height: '100%'
  },
  tableWrapperStyle: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center'
  },
  mainContainerStyle: {
    backgroundColor: 'transparent'
  },
  dxCardContainerStyle: {
    display: 'flex',
    flexDirection: 'row'
  },
  leftIconContainerStyle: {
    flex: '48px 0 0',
    position: 'relative'
  },
  leftIconWrapperStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 48,
    width: 48,
    backgroundColor: colors.lightBlueColor
  },
  rightContentContainerStyle: {
    flex: 1
  },
  dxPageContainerStyle: {
    marginTop: 36,
    display: 'flex',
    flexDirection: 'row'
  },
  bottomControlContainerStyle: {
    height: 36,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.whiteColor,
    borderTop: '1px solid',
    borderColor: colors.borderColor
  },
  labelContainerStyle: {
    flex: 1,
    maxWidth: 244,
    overflow: 'hidden'
  },
  bottomLabelStyle: {
    margin: 0,
    fontSize: fonts.h3,
    height: 18,
    width: '100%',
    maxWidth: 210,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'left'
  },
  controlContainerStyle: {
    flex: '30px 0 0',
    position: 'relative'
  },
  controlWrapperStyle: {
    position: 'absolute',
    top: 3,
    zIndex: 100
  },
  editBurgerStyle: {
    fontSize: 12,
    cursor: 'pointer',
    width: 30,
    height: 30
  }
};

export default ExperienceCase;

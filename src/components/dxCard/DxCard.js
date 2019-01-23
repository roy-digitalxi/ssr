import React, { Component } from 'react';

// config
import config from '../../config';

// constants
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

// components
import DxModal from '../dxModal/DxModal';
import DxTextEditor from '../../newexperience/components/presentation/DxTextEditor';

// Libraries
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import ReactPlayer from 'react-player';
import hexRgb from '../../helpers/hex2Rgb';
import Fade from '@material-ui/core/Fade';
import Popover from '@material-ui/core/Popover';

// helpers
import * as helpers from '../../helpers';

class DxCard extends Component {
  state = {
    videoInsert: false,
    anchorEl: null,
    isModalOpen: false
  };

  handleSelectCardTemplate = template => {
    if (this.props.isClickable) this.props.handleSelectCardTemplate(template);
  };

  handleContentChange = textContent => {
    this.props.handleContentChange(textContent);
  };

  handleVideoError = e => {
    this.props.handleVideoError('The supported link: youtube, vimeo');
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

  handleRemoveCardTemplateClick = () => {
    this.setState({ isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleElemSelect = (e, elemType) => {
    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    this.props.handleElemSelect(elemType);
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

  renderCard = (activeCardTemplate, isEditable) => {
    if (!activeCardTemplate) {
      return null;
    }
    return this.renderActiveCard(activeCardTemplate, isEditable);
  };

  renderActiveCard = (template, isEditable) => {
    let { activeElemType, opacityColor, opacity, hidenVideoIcon } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,

      cardWrapperStyle,

      leftImageContainerStyle,
      rightTextContainerStyle,
      leftTextContainerStyle,
      rightImageContainerStyle,
      imgStyle,
      txtStyle,
      overlayContainerStyle,
      overlayWrapperStyle,
      overlayImgStyle,
      videoOverlayImgStyle,
      iconStyle,
      videoContainerStyle,
      previewHtmlContainerStyle,

      wordCounterContainerStyle,
      wordCounterStyle
    } = styles;

    opacityColor = hexRgb(opacityColor);
    opacity = (opacity / 100).toFixed(2);
    const overLayColor = `rgba(${opacityColor.red}, ${opacityColor.green}, ${
      opacityColor.blue
    }, ${opacity})`;

    const limitWord = config.textEditorWordLimit;
    let card;
    let availableWord;
    if (template.Type == 'LEFT_IMAGE_TEXT') {
      availableWord = this.handleAvailableCount(limitWord, template.Content);
      card = (
        <div>
          <div style={cardWrapperStyle}>
            {isEditable && activeElemType == 'TEXT' ? (
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
            <div style={leftImageContainerStyle}>
              <img
                style={imgStyle}
                src={
                  template.Settings[0].Default
                    ? `${config.picHost}${
                        template.Settings[0].Default
                      }&OrgUrl=${helpers.getOrgUrl()}`
                    : require('../../../../assets/images/imageleftRightBg.png')
                }
              />
              <div
                style={Object.assign({}, overlayWrapperStyle, {
                  background: overLayColor
                })}
                onClick={e => this.handleElemSelect(e, 'IMAGE')}
              />
            </div>
            <div
              style={Object.assign(
                {},
                rightTextContainerStyle,
                { backgroundColor: template.Settings[1].Default },
                { padding: config.defaultCardPadding }
              )}
              onClick={e => this.handleElemSelect(e, 'BACKGROUND_COLOR')}
            >
              <div style={tableContainerStyle}>
                <div style={Object.assign({}, tableWrapperStyle)}>
                  {!isEditable ? (
                    <div
                      className="dx_preview_html_container"
                      style={Object.assign(
                        {},
                        { width: 174 },
                        previewHtmlContainerStyle
                      )}
                      dangerouslySetInnerHTML={{ __html: template.Content }}
                    />
                  ) : activeElemType == 'TEXT' ? (
                    <DxTextEditor
                      sectionGUID={template.CardGUID}
                      placeholder="Card desc.."
                      largeEditor={false}
                      editorHeight={72}
                      editorWidth={198}
                      limitWord={limitWord}
                      htmlContent={template.Content}
                      handleUpdateHtmlContent={html =>
                        this.handleContentChange(html)
                      }
                      handleElemSelect={e => this.handleElemSelect(e, 'TEXT')}
                    />
                  ) : (
                    <div
                      className="dx_preview_html_container"
                      style={Object.assign(
                        {},
                        { width: 198 },
                        previewHtmlContainerStyle
                      )}
                      dangerouslySetInnerHTML={{ __html: template.Content }}
                      onClick={e => this.handleElemSelect(e, 'TEXT')}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (template.Type == 'RIGHT_IMAGE_TEXT') {
      availableWord = this.handleAvailableCount(limitWord, template.Content);
      card = (
        <div>
          <div style={cardWrapperStyle}>
            {isEditable && activeElemType == 'TEXT' ? (
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
            <div
              style={Object.assign(
                {},
                leftTextContainerStyle,
                { backgroundColor: template.Settings[1].Default },
                { padding: config.defaultCardPadding }
              )}
            >
              <div
                style={tableContainerStyle}
                onClick={e => this.handleElemSelect(e, 'BACKGROUND_COLOR')}
              >
                <div style={Object.assign({}, tableWrapperStyle)}>
                  {!isEditable ? (
                    <div
                      className="dx_preview_html_container"
                      style={Object.assign(
                        {},
                        { width: 174 },
                        previewHtmlContainerStyle
                      )}
                      dangerouslySetInnerHTML={{ __html: template.Content }}
                    />
                  ) : activeElemType == 'TEXT' ? (
                    <DxTextEditor
                      sectionGUID={template.CardGUID}
                      placeholder="Card desc.."
                      largeEditor={false}
                      editorHeight={72}
                      editorWidth={198}
                      limitWord={limitWord}
                      htmlContent={template.Content}
                      handleUpdateHtmlContent={html =>
                        this.handleContentChange(html)
                      }
                      handleElemSelect={e => this.handleElemSelect(e, 'TEXT')}
                    />
                  ) : (
                    <div
                      className="dx_preview_html_container"
                      style={Object.assign(
                        {},
                        { width: 198 },
                        previewHtmlContainerStyle
                      )}
                      dangerouslySetInnerHTML={{ __html: template.Content }}
                      onClick={e => this.handleElemSelect(e, 'TEXT')}
                    />
                  )}
                </div>
              </div>
            </div>
            <div style={rightImageContainerStyle}>
              <img
                style={imgStyle}
                src={
                  template.Settings[0].Default
                    ? `${config.picHost}${
                        template.Settings[0].Default
                      }&OrgUrl=${helpers.getOrgUrl()}`
                    : require('../../../../assets/images/imageleftRightBg.png')
                }
              />
              <div
                style={Object.assign({}, overlayWrapperStyle, {
                  background: overLayColor
                })}
                onClick={e => this.handleElemSelect(e, 'IMAGE')}
              />
            </div>
          </div>
        </div>
      );
    } else if (template.Type == 'BACKGROUND_TEXT') {
      availableWord = this.handleAvailableCount(limitWord, template.Content);
      card = (
        <div>
          <div style={cardWrapperStyle}>
            {isEditable && activeElemType == 'TEXT' ? (
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
            <div
              style={Object.assign(
                {},
                tableContainerStyle,
                {
                  backgroundColor: template.Settings[0].Default,
                  width: 'calc(100% - 12px)',
                  height: 78
                },
                { padding: config.defaultCardPadding }
              )}
              onClick={e => this.handleElemSelect(e, 'BACKGROUND_COLOR')}
            >
              <div style={Object.assign({}, tableWrapperStyle)}>
                {!isEditable ? (
                  <div
                    className="dx_preview_html_container"
                    style={Object.assign(
                      {},
                      { width: 264 },
                      previewHtmlContainerStyle
                    )}
                    dangerouslySetInnerHTML={{ __html: template.Content }}
                  />
                ) : activeElemType == 'TEXT' ? (
                  <DxTextEditor
                    sectionGUID={template.CardGUID}
                    placeholder="Card desc.."
                    largeEditor={false}
                    editorHeight={72}
                    editorWidth={288}
                    limitWord={limitWord}
                    htmlContent={template.Content}
                    handleUpdateHtmlContent={html =>
                      this.handleContentChange(html)
                    }
                    handleElemSelect={e => this.handleElemSelect(e, 'TEXT')}
                  />
                ) : (
                  <div
                    className="dx_preview_html_container"
                    style={Object.assign(
                      {},
                      { width: 288 },
                      previewHtmlContainerStyle
                    )}
                    dangerouslySetInnerHTML={{ __html: template.Content }}
                    onClick={e => this.handleElemSelect(e, 'TEXT')}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    } else if (template.Type == 'BACKGROUND_IMAGE_TEXT') {
      availableWord = this.handleAvailableCount(limitWord, template.Content);
      card = (
        <div style={overlayContainerStyle}>
          <div style={cardWrapperStyle}>
            {isEditable && activeElemType == 'TEXT' ? (
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
            <img
              style={overlayImgStyle}
              src={
                template.Settings[0].Default
                  ? `${config.picHost}${
                      template.Settings[0].Default
                    }&OrgUrl=${helpers.getOrgUrl()}`
                  : require('../../../../assets/images/ImageTextBg.png')
              }
            />
            <div
              style={Object.assign(
                {},
                overlayWrapperStyle,
                { background: overLayColor },
                {
                  width: 'calc(100% - 12px)',
                  height: 78,
                  padding: config.defaultCardPadding
                }
              )}
              onClick={e => this.handleElemSelect(e, 'IMAGE')}
            >
              <div style={Object.assign({}, tableContainerStyle)}>
                <div style={Object.assign({}, tableWrapperStyle)}>
                  {!isEditable ? (
                    <div
                      className="dx_preview_html_container"
                      style={Object.assign(
                        {},
                        { width: 264 },
                        previewHtmlContainerStyle
                      )}
                      dangerouslySetInnerHTML={{ __html: template.Content }}
                    />
                  ) : activeElemType == 'TEXT' ? (
                    <DxTextEditor
                      sectionGUID={template.CardGUID}
                      placeholder="Card desc.."
                      largeEditor={false}
                      editorHeight={72}
                      editorWidth={288}
                      limitWord={limitWord}
                      htmlContent={template.Content}
                      handleUpdateHtmlContent={html =>
                        this.handleContentChange(html)
                      }
                      handleElemSelect={e => this.handleElemSelect(e, 'TEXT')}
                    />
                  ) : (
                    <div
                      className="dx_preview_html_container"
                      style={Object.assign(
                        {},
                        { width: 288 },
                        previewHtmlContainerStyle
                      )}
                      dangerouslySetInnerHTML={{ __html: template.Content }}
                      onClick={e => this.handleElemSelect(e, 'TEXT')}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (template.Type == 'VIDEO') {
      card = (
        <div style={overlayContainerStyle}>
          <div style={cardWrapperStyle}>
            <img
              style={
                this.state.videoInsert ? videoOverlayImgStyle : overlayImgStyle
              }
              src={
                template.Settings[0].Default
                  ? `${config.picHost}${
                      template.Settings[0].Default
                    }&OrgUrl=${helpers.getOrgUrl()}`
                  : require('../../../../assets/images/videoBg.png')
              }
            />
            <div
              style={Object.assign({}, overlayWrapperStyle, {
                background: 'rgba(0, 0, 0, 0)'
              })}
            >
              <div style={Object.assign({}, tableContainerStyle)}>
                <div
                  style={Object.assign({}, tableWrapperStyle, {
                    textAlign: 'center'
                  })}
                >
                  <div style={videoContainerStyle}>
                    {hidenVideoIcon ? null : (
                      <PlayCircleOutline
                        style={Object.assign({}, iconStyle, {
                          color: colors.whiteColor
                        })}
                        onClick={e => this.handleElemSelect(e, 'VIDEO')}
                      />
                    )}
                    {template.Content && !this.props.videoInsert ? (
                      <ReactPlayer
                        config={{
                          facebook: {
                            appId: '868742783317382'
                          },
                          file: {
                            attributes: {
                              poster: require('../../../../assets/images/videoBg.png')
                            }
                          }
                        }}
                        width={this.props.videoWidth}
                        height={90}
                        url={template.Content}
                        controls={true}
                        onError={e => this.handleVideoError(e)}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (template.Type == 'IMAGE') {
      card = (
        <div style={overlayContainerStyle}>
          <div style={cardWrapperStyle}>
            <img
              style={overlayImgStyle}
              src={
                template.Settings[0].Default
                  ? `${config.picHost}${
                      template.Settings[0].Default
                    }&OrgUrl=${helpers.getOrgUrl()}`
                  : require('../../../../assets/images/imageBg.png')
              }
            />
            <div
              style={Object.assign({}, overlayWrapperStyle, {
                background: overLayColor
              })}
              onClick={e => this.handleElemSelect(e, 'IMAGE')}
            />
          </div>
        </div>
      );
    }

    return card;
  };

  render() {
    const {
      enableShadow,
      isWithBottomBar,
      isEditable,
      isCenterCard,
      template,
      cardTitle,
      activeCardTemplate
    } = this.props;

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const {
      mainContainerStyle,
      tableContainerStyle,
      tableWrapperStyle,
      cardContainerStyle,
      bottomEditContainerStyle,
      cardTemplateNameContainerStyle,
      cardTemplateEditContainerStyle,
      cardTemplateTitleContainerStyle,
      cardTemplateTitleStyle,
      cardTemplateEditBurgerContainerStyle,
      editBurgerStyle
    } = styles;

    return (
      <div style={mainContainerStyle}>
        <div
          style={Object.assign(
            {},
            cardContainerStyle,
            isCenterCard ? { margin: '0 auto' } : {}
          )}
          className={enableShadow ? 'dx_card' : ''}
          onClick={() => this.handleSelectCardTemplate(template)}
        >
          {this.renderCard(activeCardTemplate, isEditable)}
        </div>
        {isWithBottomBar ? (
          <div
            style={Object.assign(
              {},
              bottomEditContainerStyle,
              isCenterCard ? { margin: '0 auto' } : {}
            )}
            className="dx_card_bottom_bar"
          >
            <div style={cardTemplateNameContainerStyle}>
              <div style={tableContainerStyle}>
                <div style={tableWrapperStyle}>
                  <div style={cardTemplateTitleContainerStyle}>
                    <p style={cardTemplateTitleStyle}>{cardTitle}</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={cardTemplateEditContainerStyle}>
              <div style={cardTemplateEditBurgerContainerStyle}>
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
                    <Button
                      onClick={() => this.props.handleEditCardTemplateClick()}
                    >
                      Edit
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => this.handleRemoveCardTemplateClick()}
                    >
                      Remove
                    </Button>
                  </div>
                </Popover>
              </div>
            </div>
          </div>
        ) : null}
        <DxModal
          open={this.state.isModalOpen}
          title="Confirm Delete Card"
          hasBottomDiv={true}
          description="Do you want to proceed?"
          cancel={true}
          confirm={true}
          isDanger={true}
          handleConfirm={() => this.props.handleConfirmDeleteCard()}
          onCloseModal={() => this.handleCloseModal()}
        />
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {},
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
  cardContainerStyle: {
    height: 90,
    cursor: 'pointer'
  },
  cardWrapperStyle: {
    position: 'relative',
    height: 90,
    width: '100%'
  },
  leftImageContainerStyle: {
    display: 'inline-block',
    float: 'left',
    width: 90,
    height: 90,
    position: 'relative'
  },
  rightTextContainerStyle: {
    display: 'inline-block',
    float: 'left',
    width: 'calc(100% - 90px - 12px)',
    height: 78
  },
  leftTextContainerStyle: {
    display: 'inline-block',
    float: 'left',
    width: 'calc(100% - 90px - 12px)',
    height: 78
  },
  rightImageContainerStyle: {
    display: 'inline-block',
    float: 'left',
    width: 90,
    height: 90,
    position: 'relative'
  },
  imgStyle: {
    display: 'block',
    width: 90,
    height: 90
  },
  txtStyle: {
    fontSize: fonts.h5,
    paddingLeft: 6,
    paddingRight: 6
  },
  overlayContainerStyle: {
    position: 'relative',
    height: 90,
    width: '100%'
  },
  overlayWrapperStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'block',
    zIndex: 99
  },
  overlayImgStyle: {
    height: 90,
    width: '100%'
  },
  videoOverlayImgStyle: {
    height: 90,
    width: 90,
    margin: '0 auto',
    display: 'block'
  },
  iconStyle: {
    fontSize: '42px',
    position: 'absolute',
    zIndex: 99,
    top: 24,
    left: '50%',
    transform: 'translateX(-50%)'
  },
  videoContainerStyle: {
    position: 'relative',
    height: 90,
    width: '100%'
  },

  bottomEditContainerStyle: {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.whiteColor
  },
  cardTemplateNameContainerStyle: {
    flex: 1
  },
  cardTemplateEditContainerStyle: {
    flex: '30px 0 0',
    position: 'relative'
  },
  cardTemplateTitleContainerStyle: {
    marginLeft: 6
  },
  cardTemplateTitleStyle: {
    margin: 0,
    fontSize: fonts.h3,
    width: 180,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  cardTemplateEditBurgerContainerStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 30,
    width: 30
  },
  editBurgerStyle: {
    fontSize: 12,
    cursor: 'pointer',
    width: 30,
    height: 30
  },
  previewHtmlContainerStyle: {
    maxHeight: 78,
    overflow: 'hidden',
    textAlign: 'left',
    fontSize: 12,
    boxSizing: 'border-box',
    minHeight: 0,
    lineHeight: 1.42,
    fontFamily: 'Open Sans',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    border: '1px solid transparent'
  },

  wordCounterContainerStyle: {
    position: 'absolute',
    top: 32,
    right: -150 - 12,
    width: 150,
    height: 30
  },
  wordCounterStyle: {
    textAlign: 'center',
    margin: 0,
    fontSize: fonts.h4,
    color: colors.greyLabelColor
  }
};

export default DxCard;

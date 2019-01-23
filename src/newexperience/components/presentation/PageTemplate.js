import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

// Libraries
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SignalCellular0Bar from '@material-ui/icons/SignalCellular0Bar';
import Wifi from '@material-ui/icons/Wifi';
import Bluetooth from '@material-ui/icons/Bluetooth';
import BatteryFull from '@material-ui/icons/BatteryFull';
import MoreVert from '@material-ui/icons/MoreVert';
import Search from '@material-ui/icons/Search';
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

const itemSource = {
  beginDrag(props) {
    return props.template;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    return props.handleDrop(props.template);
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

class PageTemplate extends Component {
  renderPage = template => {
    const {
      pageContainerStyle,
      txtCenterStyle,
      marginLeftStyle,
      marginRightStyle,
      tableContainerStyle,
      tableWrapperStyle,
      leftImageContainerStyle,
      rightTextContainerStyle,
      imgStyle,
      txtStyle,
      btnPageContainerStyle,
      topBtnContainerStyle,
      btnLabelContainerStyle,
      btnLabelWrapperStyle,
      btnLabelStyle,
      expandIconContainerStyle,
      expandIconStyle,
      bottomDescContainerStyle,
      splashContainerStyle,
      statusbarContainerStyle,
      leftStatusContainerStyle,
      leftStatusWrapperStyle,
      midStatusContainerStyle,
      rightStatusContainerStyle,
      rightStatusWrapperStyle,
      iconContainerStyle,
      statusbarIconStyle,
      statusbarLabelStyle,
      toolbarContainerStyle,
      leftToolbarContainerStyle,
      leftToolbarWrapperStyle,
      rightToolbarContainerStyle,
      rightToolbarWrapperStyle,
      splashContentContainerStyle,
      overlayContainerStyle,
      overlayWrapperStyle,
      overlayImgStyle,
      playIconStyle,
      videoOverlayContainerStyle,
      videoOverlayImgStyle
    } = styles;

    let card;
    if (template.Type == 'EDITOR') {
      card = (
        <div
          style={pageContainerStyle}
          onClick={() => this.props.handleTemplateClick(template)}
        >
          <div style={leftImageContainerStyle}>
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <img
                  style={imgStyle}
                  src={require('../../../../../assets/images/edit_icon.png')}
                />
              </div>
            </div>
          </div>
          <div style={rightTextContainerStyle}>
            <div style={tableContainerStyle}>
              <div
                style={Object.assign({}, tableWrapperStyle, {
                  textAlign: 'left'
                })}
              >
                <p style={txtStyle}>
                  Embed a full featured responsive publishXi editor directly in
                  the page
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (template.Type == 'BUTTON') {
      card = (
        <div
          style={Object.assign({}, pageContainerStyle, btnPageContainerStyle)}
          onClick={() => this.props.handleTemplateClick(template)}
        >
          <div style={tableContainerStyle}>
            <div style={tableWrapperStyle}>
              <div style={topBtnContainerStyle}>
                <div style={btnLabelContainerStyle}>
                  <div style={btnLabelWrapperStyle}>
                    <div style={tableContainerStyle}>
                      <div style={tableWrapperStyle}>
                        <p style={btnLabelStyle}>Text for a button</p>
                      </div>
                    </div>
                  </div>
                  <div style={expandIconContainerStyle}>
                    <div style={tableContainerStyle}>
                      <div style={tableWrapperStyle}>
                        <KeyboardArrowRight style={expandIconStyle} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={bottomDescContainerStyle}>
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <p style={txtStyle}>
                      Connect another page with this button
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (template.Type == 'EMBED_PDF') {
      card = (
        <div
          style={Object.assign({}, pageContainerStyle)}
          onClick={() => this.props.handleTemplateClick(template)}
        >
          <div style={leftImageContainerStyle}>
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <img
                  style={imgStyle}
                  src={require('../../../../../assets/images/pdf_icon.png')}
                />
              </div>
            </div>
          </div>
          <div style={rightTextContainerStyle}>
            <div style={tableContainerStyle}>
              <div
                style={Object.assign({}, tableWrapperStyle, {
                  textAlign: 'left'
                })}
              >
                <p style={txtStyle}>
                  Choose this page element to embed and show a PDF file on the
                  page directly to the user
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (template.Type == 'SPLASH') {
      card = (
        <div
          style={overlayContainerStyle}
          onClick={() => this.props.handleTemplateClick(template)}
        >
          <img
            style={overlayImgStyle}
            src={require('../../../../../assets/images/splashBg.png')}
          />
          <div
            style={Object.assign({}, overlayWrapperStyle, {
              background: 'rgba(0, 0, 0, .3)'
            })}
          >
            <div style={splashContainerStyle}>
              <div style={statusbarContainerStyle}>
                <div style={leftStatusContainerStyle}>
                  <div style={leftStatusWrapperStyle}>
                    <div
                      style={Object.assign(
                        {},
                        marginLeftStyle,
                        iconContainerStyle
                      )}
                    >
                      <SignalCellular0Bar style={statusbarIconStyle} />
                    </div>
                    <div
                      style={Object.assign(
                        {},
                        marginLeftStyle,
                        iconContainerStyle
                      )}
                    >
                      <span
                        style={Object.assign({}, statusbarLabelStyle, {
                          marginTop: 8
                        })}
                      >
                        Sketch
                      </span>
                    </div>
                    <div
                      style={Object.assign(
                        {},
                        marginLeftStyle,
                        iconContainerStyle
                      )}
                    >
                      <Wifi style={statusbarIconStyle} />
                    </div>
                  </div>
                </div>
                <div style={midStatusContainerStyle}>
                  <div style={tableContainerStyle}>
                    <div style={tableWrapperStyle}>
                      <p
                        style={Object.assign(
                          {},
                          txtCenterStyle,
                          statusbarLabelStyle,
                          { width: '100%' }
                        )}
                      >
                        9:41 AM
                      </p>
                    </div>
                  </div>
                </div>
                <div style={rightStatusContainerStyle}>
                  <div style={rightStatusWrapperStyle}>
                    <div
                      style={Object.assign(
                        {},
                        marginRightStyle,
                        iconContainerStyle
                      )}
                    >
                      <Bluetooth style={statusbarIconStyle} />
                    </div>
                    <div
                      style={Object.assign(
                        {},
                        marginRightStyle,
                        iconContainerStyle
                      )}
                    >
                      <span
                        style={Object.assign({}, statusbarLabelStyle, {
                          marginTop: 8
                        })}
                      >
                        100%
                      </span>
                    </div>
                    <div
                      style={Object.assign(
                        {},
                        marginRightStyle,
                        iconContainerStyle
                      )}
                    >
                      <BatteryFull
                        className="dx_battery_icon"
                        style={statusbarIconStyle}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div style={toolbarContainerStyle}>
                <div style={leftToolbarContainerStyle}>
                  <div style={leftToolbarWrapperStyle}>
                    <div style={tableContainerStyle}>
                      <div style={tableWrapperStyle}>
                        <KeyboardArrowLeft />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={rightToolbarContainerStyle}>
                  <div style={rightToolbarWrapperStyle}>
                    <div style={tableContainerStyle}>
                      <div style={tableWrapperStyle}>
                        <Search />
                        <MoreVert />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={splashContentContainerStyle}>
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <p style={Object.assign({}, txtStyle, txtCenterStyle)}>
                      Splash image with page title
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (template.Type == 'VIDEO') {
      card = (
        <div
          style={videoOverlayContainerStyle}
          onClick={() => this.props.handleTemplateClick(template)}
        >
          <img
            style={videoOverlayImgStyle}
            src={require('../../../../../assets/images/videoBg.png')}
          />
          <div style={overlayWrapperStyle}>
            <div style={Object.assign({}, pageContainerStyle)}>
              <div style={Object.assign({}, tableContainerStyle)}>
                <div
                  style={Object.assign({}, tableWrapperStyle, txtCenterStyle)}
                >
                  <PlayCircleOutline
                    style={Object.assign({}, playIconStyle, {
                      color: colors.whiteColor
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (template.Type == 'IMAGE') {
      card = (
        <div
          style={videoOverlayContainerStyle}
          onClick={() => this.props.handleTemplateClick(template)}
        >
          <img
            style={videoOverlayImgStyle}
            src={require('../../../../../assets/images/imageBg.png')}
          />
        </div>
      );
    } else if (template.Type == 'LINK') {
      card = (
        <div
          style={Object.assign({}, pageContainerStyle)}
          onClick={() => this.props.handleTemplateClick(template)}
        >
          <div style={leftImageContainerStyle}>
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <img
                  style={imgStyle}
                  src={require('../../../../../assets/images/link_icon.png')}
                />
              </div>
            </div>
          </div>
          <div style={rightTextContainerStyle}>
            <div style={tableContainerStyle}>
              <div
                style={Object.assign({}, tableWrapperStyle, {
                  textAlign: 'left'
                })}
              >
                <p style={txtStyle}>
                  Choose this page element to embed and show a Hyper link on the
                  page directly to the user
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (template.Type == 'AD_BUTTON') {
      card = (
        <div
          style={Object.assign({}, pageContainerStyle, btnPageContainerStyle)}
          onClick={() => this.props.handleTemplateClick(template)}
        >
          <div style={tableContainerStyle}>
            <div style={tableWrapperStyle}>
              <div style={topBtnContainerStyle}>
                <div style={btnLabelContainerStyle}>
                  <div style={btnLabelWrapperStyle}>
                    <div style={tableContainerStyle}>
                      <div style={tableWrapperStyle}>
                        <p style={btnLabelStyle}>Text for a button</p>
                      </div>
                    </div>
                  </div>
                  <div style={expandIconContainerStyle}>
                    <div style={tableContainerStyle}>
                      <div style={tableWrapperStyle}>
                        <KeyboardArrowRight style={expandIconStyle} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={bottomDescContainerStyle}>
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <p style={txtStyle}>
                      Connect another page with this button
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (template.Type == 'AD_BUTTON_2') {
      card = (
        <div
          style={Object.assign({}, pageContainerStyle, btnPageContainerStyle)}
          onClick={() => this.props.handleTemplateClick(template)}
        >
          <div style={tableContainerStyle}>
            <div style={tableWrapperStyle}>
              <div style={topBtnContainerStyle}>
                <div style={btnLabelContainerStyle}>
                  <div style={btnLabelWrapperStyle}>
                    <div style={tableContainerStyle}>
                      <div style={tableWrapperStyle}>
                        <p style={btnLabelStyle}>Text for a button</p>
                      </div>
                    </div>
                  </div>
                  <div style={expandIconContainerStyle}>
                    <div style={tableContainerStyle}>
                      <div style={tableWrapperStyle}>
                        <KeyboardArrowRight style={expandIconStyle} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={bottomDescContainerStyle}>
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <p style={txtStyle}>
                      Connect another page with this button
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (template.Type == 'H5P') {
      card = (
        <div
          style={Object.assign({}, pageContainerStyle)}
          onClick={() => this.props.handleTemplateClick(template)}
        >
          <div style={leftImageContainerStyle}>
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <img
                  style={imgStyle}
                  src={require('../../../../../assets/images/link_icon.png')}
                />
              </div>
            </div>
          </div>
          <div style={rightTextContainerStyle}>
            <div style={tableContainerStyle}>
              <div
                style={Object.assign({}, tableWrapperStyle, {
                  textAlign: 'left'
                })}
              >
                <p style={txtStyle}>
                  Choose this page element to embed H5P to the user
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return card;
  };

  render() {
    const { isDragging, connectDragSource, template } = this.props;
    const opacity = isDragging ? 0 : 1;

    const { mainContainerStyle } = styles;

    return (
      <div style={mainContainerStyle}>
        <div
          style={Object.assign(
            {},
            { width: 'calc(100% - 24px)', margin: '0 auto' },
            { opacity }
          )}
          className="dx_page"
        >
          {connectDragSource(this.renderPage(template))}
        </div>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    marginBottom: 24
  },
  txtCenterStyle: {
    textAlign: 'center'
  },
  marginLeftStyle: {
    marginLeft: 3
  },
  marginRightStyle: {
    marginRight: 3
  },
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
  pageContainerStyle: {
    height: 90,
    cursor: 'pointer'
  },
  leftImageContainerStyle: {
    display: 'inline-block',
    float: 'left',
    width: 72,
    height: 90
  },
  rightTextContainerStyle: {
    display: 'inline-block',
    float: 'left',
    width: 'calc(100% - 84px)',
    height: 90,
    paddingRight: 12
  },
  imgStyle: {
    display: 'block',
    width: 42,
    height: 48,
    margin: '0 auto'
  },
  txtStyle: {
    fontSize: fonts.h5,
    margin: 0
  },
  btnPageContainerStyle: {
    height: 78,
    paddingTop: 6,
    paddingBottom: 6
  },
  topBtnContainerStyle: {
    paddingLeft: 12,
    paddingRight: 12
  },
  btnLabelContainerStyle: {
    backgroundColor: colors.greyColor,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 9,
    paddingBottom: 9
  },
  btnLabelWrapperStyle: {
    flex: 1
  },
  btnLabelStyle: {
    fontSize: fonts.h5,
    paddingLeft: 6,
    margin: 0
  },
  expandIconContainerStyle: {
    flex: 1
  },
  expandIconStyle: {
    paddingRight: 6,
    fontSize: 18,
    float: 'right'
  },
  bottomDescContainerStyle: {
    marginTop: 6,
    paddingLeft: 12,
    paddingRight: 12
  },
  splashContainerStyle: {
    height: 120,
    cursor: 'pointer',
    color: colors.whiteColor
  },
  statusbarContainerStyle: {
    height: 24,
    display: 'flex',
    flexDirection: 'row'
  },
  leftStatusContainerStyle: {
    flex: 1
  },
  leftStatusWrapperStyle: {
    float: 'left',
    height: 24,
    display: 'flex'
  },
  midStatusContainerStyle: {
    flex: 1
  },
  rightStatusContainerStyle: {
    flex: 1
  },
  rightStatusWrapperStyle: {
    float: 'right',
    height: 24,
    display: 'flex',
    flexDirection: 'row'
  },
  iconContainerStyle: {
    flex: 1
  },
  statusbarIconStyle: {
    fontSize: 14,
    display: 'inline-block',
    marginTop: 6
  },
  statusbarLabelStyle: {
    fontSize: fonts.h5,
    display: 'inline-block',
    margin: 0
  },
  toolbarContainerStyle: {
    height: 24,
    display: 'flex',
    flexDirection: 'row'
  },
  leftToolbarContainerStyle: {
    flex: 1
  },
  leftToolbarWrapperStyle: {
    float: 'left'
  },
  rightToolbarContainerStyle: {
    flex: 1
  },
  rightToolbarWrapperStyle: {
    float: 'right'
  },
  splashContentContainerStyle: {
    height: 72
  },
  overlayContainerStyle: {
    position: 'relative',
    height: 120,
    width: '100%'
  },
  overlayWrapperStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'block',
    // background: 'rgba(0, 0, 0, .4)',
    zIndex: 99
  },
  overlayImgStyle: {
    height: 120,
    width: '100%'
  },
  playIconStyle: {
    fontSize: 40
  },
  videoOverlayContainerStyle: {
    position: 'relative',
    height: 90,
    width: '100%'
  },
  videoOverlayImgStyle: {
    height: 90,
    width: '100%',
    cursor: 'pointer'
  }
};

export default DragSource('template', itemSource, collect)(PageTemplate);

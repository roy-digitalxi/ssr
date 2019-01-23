import React, { Component } from 'react';

// Libraries
import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SignalCellular0Bar from '@material-ui/icons/SignalCellular0Bar';
import Wifi from '@material-ui/icons/Wifi';
import Bluetooth from '@material-ui/icons/Bluetooth';
import BatteryFull from '@material-ui/icons/BatteryFull';
import MoreVert from '@material-ui/icons/MoreVert';
import Search from '@material-ui/icons/Search';
import '../../../../assets/css/react-pdf/index.css';
import hexRgb from '../../helpers/hex2Rgb';

// styles
import '../../../../assets/css/quill/thumbnail.css';

// config
import config from '../../config';

// constants
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

// helpers
import * as helpers from '../../helpers';

class ThumbnailPhoneElement extends Component {
  state = {
    numPages: null
  };

  handleDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  handleLoadHtml = section => {
    const { isLoadHtml } = this.props;

    if (!isLoadHtml) {
      if (section.HtmlContent) return section.HtmlContent;
      else return '';
    } else {
      if (section.HtmlContent) return section.HtmlContent;
      if (section.Html && !section.IsSyncServer)
        this.props.handleLoadHtml(section.SectionGUID, section.Html);
      else return '';
    }
  };

  renderSection = section => {
    const {
      tableContainerStyle,
      tableWrapperStyle,
      // editor
      editorContainerStyle,
      loadingHtmlContainerStyle,
      loadingHtmlMsgStyle,
      // btn
      btnContainerStyle,
      contentContainerStyle,
      leftContentContainerStyle,
      btnLabelStyle,
      rightIconContainerStyle,
      expandIconStyle,
      // pdf
      pdfContainerStyle,
      // splash
      txtCenterStyle,
      marginLeftStyle,
      marginRightStyle,
      splashContainerStyle,
      statusbarContainerStyle,
      leftStatusContainerStyle,
      leftStatusWrapperStyle,
      midStatusContainerStyle,
      rightStatusContainerStyle,
      rightStatusWrapperStyle,
      iconContainerStyle,
      statusbarIconStyle,
      statusbarSubIconStyle,
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
      descContainerStyle,
      splashLableStyle,
      // video
      playIconStyle,
      videoOverlayContainerStyle,
      videoOverlayImgStyle,
      // img
      imgContainerStyle,
      imgStyle,
      // link
      linkContainerStyle,
      linkStyle,
      // ad btn
      mainContainerStyle,
      adBtnContainerStyle,
      adBtnOverlayImgStyle,
      // h5p
      h5pContainerStyle,

      mainContainerStyle2,
      overlayImgStyle2,
      mainWrapperStyle2,
      tableContainerStyle2,
      tableWrapperStyle2,
      contentContainerStyle2,
      leftContentContainerStyle2,
      rightIconContainerStyle2,
      overlayWrapperStyle2
    } = styles;

    const { isMin } = this.props;
    const width = isMin ? 112 : 268;
    const btnWidth = width - 12;

    let elem;
    switch (section.Type) {
      case 'EDITOR':
        elem = (
          <div style={editorContainerStyle}>
            <div
              style={{ lineHeight: 1, width }}
              dangerouslySetInnerHTML={{ __html: this.handleLoadHtml(section) }}
            />
            {section.Html && !section.HtmlContent ? (
              <div style={loadingHtmlContainerStyle}>
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <p style={loadingHtmlMsgStyle}>Loading..</p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
        break;
      // case 'BUTTON':
      //     elem = (
      //         <div style={btnContainerStyle}>
      //             <div style={contentContainerStyle}>
      //                 <div style={leftContentContainerStyle}>
      //                     <div style={tableContainerStyle}>
      //                         <div style={tableWrapperStyle}>
      //                             <p style={btnLabelStyle}>{section.BtnContent}</p>
      //                         </div>
      //                     </div>
      //                 </div>
      //                 <div style={rightIconContainerStyle}>
      //                     <div style={tableContainerStyle}>
      //                         <div style={tableWrapperStyle}>
      //                             <KeyboardArrowRight style={expandIconStyle} />
      //                         </div>
      //                     </div>
      //                 </div>
      //             </div>
      //         </div>
      //     );
      //     break;
      case 'SPLASH':
        const iconSize = this.props.splashSize == 'SMALL' ? 7 : 12;
        const marginTop = this.props.splashSize == 'SMALL' ? 2 : 4;
        const height = this.props.splashSize == 'SMALL' ? 60 : 90;
        const line = this.props.splashSize == 'SMALL' ? 12 : 24;
        const descWidth = this.props.splashSize == 'SMALL' ? 110 : 200;

        let { SplashOpacityColor, SplashOpacity } = section;
        SplashOpacityColor = hexRgb(SplashOpacityColor);
        SplashOpacity = (SplashOpacity / 100).toFixed(2);
        const splashOverLayColor = `rgba(${SplashOpacityColor.red}, ${
          SplashOpacityColor.green
        }, ${SplashOpacityColor.blue}, ${SplashOpacity})`;

        elem = (
          <div
            className="dx_thumbnail_elem_splash"
            style={Object.assign({}, overlayContainerStyle, {
              color: section.SplashColor,
              height
            })}
          >
            <img
              style={Object.assign({}, overlayImgStyle, { height })}
              src={
                section.SplashImg
                  ? `${config.picHost}${
                      section.SplashImg
                    }&OrgUrl=${helpers.getOrgUrl()}`
                  : require('../../../../assets/images/splashBg.png')
              }
            />
            <div
              style={Object.assign({}, overlayWrapperStyle, {
                backgroundColor: splashOverLayColor
              })}
            >
              <div style={Object.assign({}, splashContainerStyle, { height })}>
                <div
                  style={Object.assign({}, statusbarContainerStyle, {
                    height: line
                  })}
                >
                  <div style={leftStatusContainerStyle}>
                    <div
                      style={Object.assign({}, leftStatusWrapperStyle, {
                        height: line
                      })}
                    >
                      <div
                        style={Object.assign(
                          {},
                          marginLeftStyle,
                          iconContainerStyle
                        )}
                      >
                        <SignalCellular0Bar
                          style={Object.assign({}, statusbarIconStyle, {
                            fontSize: iconSize,
                            marginTop
                          })}
                        />
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
                            marginTop: this.props.splashSize == 'SMALL' ? 0 : 5
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
                        <Wifi
                          style={Object.assign({}, statusbarIconStyle, {
                            fontSize: iconSize,
                            marginTop
                          })}
                        />
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
                    <div
                      style={Object.assign({}, rightStatusWrapperStyle, {
                        height: line
                      })}
                    >
                      <div
                        style={Object.assign(
                          {},
                          marginRightStyle,
                          iconContainerStyle
                        )}
                      >
                        <Bluetooth
                          style={Object.assign({}, statusbarIconStyle, {
                            fontSize: iconSize,
                            marginTop
                          })}
                        />
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
                            marginTop: this.props.splashSize == 'SMALL' ? 0 : 5
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
                          style={Object.assign({}, statusbarIconStyle, {
                            fontSize: iconSize,
                            marginTop
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={Object.assign({}, toolbarContainerStyle, {
                    height: line
                  })}
                >
                  <div style={leftToolbarContainerStyle}>
                    <div style={leftToolbarWrapperStyle}>
                      <div style={tableContainerStyle}>
                        <div style={tableWrapperStyle}>
                          <KeyboardArrowLeft
                            style={Object.assign({}, statusbarSubIconStyle, {
                              fontSize: iconSize
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={rightToolbarContainerStyle}>
                    <div style={rightToolbarWrapperStyle}>
                      <div style={tableContainerStyle}>
                        <div style={tableWrapperStyle}>
                          <Search
                            style={Object.assign({}, statusbarSubIconStyle, {
                              fontSize: iconSize
                            })}
                          />
                          <MoreVert
                            style={Object.assign({}, statusbarSubIconStyle, {
                              fontSize: iconSize
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={splashContentContainerStyle}>
                  <div style={tableContainerStyle}>
                    <div style={tableWrapperStyle}>
                      <div
                        style={Object.assign({}, descContainerStyle, {
                          width: descWidth
                        })}
                      >
                        <div
                          style={{ lineHeight: 1 }}
                          dangerouslySetInnerHTML={{
                            __html: section.SplashContent
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case 'VIDEO':
        const videoHeight = this.props.videoSize == 'SMALL' ? 54 : 120;
        elem = (
          <div
            style={Object.assign({}, videoOverlayContainerStyle, {
              height: videoHeight
            })}
          >
            <div
              style={Object.assign({}, videoOverlayImgStyle, {
                height: videoHeight
              })}
            />
            <div style={overlayWrapperStyle}>
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
        );
        break;
      case 'IMAGE':
        const imgHeight = this.props.imgSize == 'SMALL' ? 48 : 90;
        let { ImgOpacityColor, ImgOpacity } = section;
        ImgOpacityColor = hexRgb(ImgOpacityColor);
        ImgOpacity = (ImgOpacity / 100).toFixed(2);
        const imgOverLayColor = `rgba(${ImgOpacityColor.red}, ${
          ImgOpacityColor.green
        }, ${ImgOpacityColor.blue}, ${ImgOpacity})`;

        elem = (
          <div style={imgContainerStyle}>
            <img
              style={Object.assign({}, imgStyle, { height: imgHeight })}
              src={
                section.Img
                  ? `${config.picHost}${
                      section.Img
                    }&OrgUrl=${helpers.getOrgUrl()}`
                  : require('../../../../assets/images/imageBg.png')
              }
            />
            <div
              style={Object.assign({}, overlayWrapperStyle, {
                backgroundColor: imgOverLayColor
              })}
            />
          </div>
        );
        break;
      case 'EMBED_PDF':
        elem = (
          <div
            style={Object.assign({}, pdfContainerStyle, {
              backgroundColor: section.PdfBgColor
            })}
          >
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <div
                  style={{ lineHeight: 1, width }}
                  dangerouslySetInnerHTML={{
                    __html: section.PdfLabel ? section.PdfLabel : ''
                  }}
                />
                {/* <span style={{ display: 'inline-block', float: 'right' }}>
                                    <KeyboardArrowRight
                                        style={Object.assign({}, expandIconStyle, { color: colors.blackColor })}
                                    />
                                </span> */}
              </div>
            </div>
          </div>
        );
        break;
      case 'LINK':
        elem = (
          <div
            style={Object.assign({}, linkContainerStyle, {
              backgroundColor: section.LinkBgColor
            })}
          >
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <div
                  style={{ lineHeight: 1, width }}
                  dangerouslySetInnerHTML={{
                    __html: section.LinkLabel ? section.LinkLabel : section.Link
                  }}
                />
              </div>
            </div>
          </div>
        );
        break;
      case 'AD_BUTTON':
        let { AdBtnImgOpacityColor, AdBtnImgOpacity } = section;
        AdBtnImgOpacityColor = hexRgb(AdBtnImgOpacityColor);
        AdBtnImgOpacity = (AdBtnImgOpacity / 100).toFixed(2);
        const adBtnOverLayColor = `rgba(${AdBtnImgOpacityColor.red}, ${
          AdBtnImgOpacityColor.green
        }, ${AdBtnImgOpacityColor.blue}, ${AdBtnImgOpacity})`;
        elem = (
          <div style={Object.assign({}, mainContainerStyle2)}>
            <img
              style={overlayImgStyle2}
              src={
                section.AdBtnImg
                  ? `${config.picHost}${section.AdBtnImg}`
                  : require('../../../../assets/images/demo.jpg')
              }
            />
            <div
              style={Object.assign({}, overlayWrapperStyle2, {
                backgroundColor: adBtnOverLayColor
              })}
            />
            <div style={mainWrapperStyle2}>
              <div
                style={Object.assign({}, contentContainerStyle2, {
                  minHeight: 36
                })}
              >
                <div style={leftContentContainerStyle2}>
                  <div style={tableContainerStyle2}>
                    <div style={tableWrapperStyle2}>
                      <div
                        style={Object.assign({}, btnLabelStyle, {
                          width: btnWidth
                        })}
                        dangerouslySetInnerHTML={{ __html: section.BtnContent }}
                      />
                    </div>
                  </div>
                </div>
                <div style={rightIconContainerStyle2}>
                  <div style={tableContainerStyle2}>
                    <div style={tableWrapperStyle2}>
                      <KeyboardArrowRight
                        style={Object.assign({}, expandIconStyle, {
                          color: section.AdBtnColor
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case 'AD_BUTTON_2':
        elem = (
          <div style={Object.assign({}, adBtnContainerStyle)}>
            <div
              style={Object.assign({}, contentContainerStyle, {
                backgroundColor: section.AdBtnBgColor,
                minHeight: 36
              })}
            >
              <div
                style={Object.assign(
                  {},
                  { padding: 4 },
                  leftContentContainerStyle
                )}
              >
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <div
                      style={Object.assign(
                        {},
                        { width: btnWidth },
                        btnLabelStyle
                      )}
                      dangerouslySetInnerHTML={{ __html: section.BtnContent }}
                    />
                  </div>
                </div>
              </div>
              <div style={rightIconContainerStyle}>
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <KeyboardArrowRight
                      style={Object.assign({}, expandIconStyle, {
                        color: section.AdBtnColor
                      })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        break;
      case 'H5P':
        elem = (
          <div
            style={Object.assign({}, h5pContainerStyle, {
              backgroundColor: section.H5pBgColor
            })}
          >
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <div
                  style={{ lineHeight: 1, width }}
                  dangerouslySetInnerHTML={{
                    __html: section.H5pLabel ? section.H5pLabel : section.H5p
                  }}
                />
              </div>
            </div>
          </div>
        );
        break;
      default:
        break;
    }
    return elem;
  };

  render() {
    const { section } = this.props;

    return (
      <div className="dx_thumbnail_elem">{this.renderSection(section)}</div>
    );
  }
}

const styles = {
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
  // editor
  editorContainerStyle: {
    position: 'relative',
    padding: 4,
    minHeight: 36,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  loadingHtmlContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    top: 0,
    left: 0,
    zIndex: 98
  },
  loadingHtmlMsgStyle: {
    color: colors.whiteColor,
    fontSize: fonts.h4,
    textAlign: 'center'
  },
  // btn
  btnContainerStyle: {
    margin: '0 auto',
    backgroundColor: colors.greyColor,
    minHeight: 18,
    borderTop: '1px solid',
    borderBottom: '1px solid',
    borderColor: colors.borderColor
  },
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%'
  },
  leftContentContainerStyle: {
    flex: 1
  },
  btnLabelStyle: {
    margin: 0,
    lineheight: 1,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  rightIconContainerStyle: {
    flex: '3px 0 0'
  },
  expandIconStyle: {
    paddingRight: 1,
    fontSize: 12,
    float: 'right'
  },
  // pdf
  pdfContainerStyle: {
    padding: 4,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  // splash
  splashContainerStyle: {},
  statusbarContainerStyle: {
    display: 'flex',
    flexDirection: 'row'
  },
  leftStatusContainerStyle: {
    flex: 1
  },
  leftStatusWrapperStyle: {
    float: 'left',
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
    display: 'flex',
    flexDirection: 'row'
  },
  iconContainerStyle: {
    flex: 1
  },
  statusbarIconStyle: {
    display: 'inline-block'
  },
  statusbarSubIconStyle: {},
  statusbarLabelStyle: {
    display: 'inline-block',
    margin: 0
  },
  toolbarContainerStyle: {
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
  splashContentContainerStyle: {},
  overlayContainerStyle: {
    position: 'relative',
    width: '100%',
    cursor: 'default'
  },
  overlayWrapperStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'block',
    zIndex: 2
  },
  overlayImgStyle: {
    width: '100%'
  },
  descContainerStyle: {
    margin: '0 auto'
  },
  splashLableStyle: {
    margin: 0
  },
  // video
  playIconStyle: {
    fontSize: 24
  },
  videoOverlayContainerStyle: {
    position: 'relative',
    // height: 54,
    width: '100%',
    border: '1px solid',
    borderColor: colors.whiteColor,
    boxSizing: 'border-box',
    marginTop: 1
  },
  videoOverlayImgStyle: {
    // height: 54,
    width: '100%',
    cursor: 'pointer',
    backgroundColor: colors.blackColor
  },
  // img
  imgContainerStyle: {
    position: 'relative'
  },
  imgStyle: {
    display: 'block',
    width: '100%'
  },
  // link
  linkContainerStyle: {
    padding: 4,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  linkStyle: {
    fontSize: fonts.h4,
    textDecoration: 'underline'
  },
  // ad btn
  mainContainerStyle: {
    position: 'relative',
    minHeight: 90,
    maxHeight: 360,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    cursor: 'default',
    width: 320,
    boxSizing: 'border-box',
    margin: '0 auto',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },
  adBtnContainerStyle: {
    position: 'relative',
    margin: '0 auto',
    minHeight: 18,
    borderTop: '1px solid',
    borderBottom: '1px solid',
    borderColor: colors.borderColor
  },
  adBtnOverlayImgStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1
  },
  // H5p
  h5pContainerStyle: {
    padding: 4,
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word'
  },

  mainContainerStyle2: {
    position: 'relative',
    minHeight: 18,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.greyColor,
    cursor: 'default',
    width: '100%',
    boxSizing: 'border-box',
    margin: '0 auto'
  },
  overlayImgStyle2: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    zIndex: 1
  },
  mainWrapperStyle2: {
    flex: 1
  },
  tableContainerStyle2: {
    position: 'relative',
    display: 'table',
    height: '100%',
    width: '100%',
    zIndex: 3
  },
  tableWrapperStyle2: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  contentContainerStyle2: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%'
  },
  leftContentContainerStyle2: {
    flex: 1,
    overflow: 'auto',
    padding: '3px 19px 3px 6px'
  },
  rightIconContainerStyle2: {
    width: 30,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-8px)',
    right: 0,
    zIndex: 4
  },
  overlayWrapperStyle2: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'block',
    zIndex: 2
  }
};

export default ThumbnailPhoneElement;

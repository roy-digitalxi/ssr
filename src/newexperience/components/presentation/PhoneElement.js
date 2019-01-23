import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

// Libraries
import {
  DragSource,
  DropTarget,
  ConnectDropTarget,
  ConnectDragSource,
  DropTargetMonitor,
  DropTargetConnector,
  DragSourceConnector,
  DragSourceMonitor
} from 'react-dnd';
import { XYCoord } from 'dnd-core';
import flow from 'lodash/flow';
import Delete from '@material-ui/icons/Delete';
import ContentCopy from '@material-ui/icons/ContentCopy';
import DragHandle from '@material-ui/icons/DragHandle';

// components
import DxEditor from './DxEditor';
import DxButtonConnector from './DxButtonConnector';
import DxPdfViewer from './DxPdfViewer';
import DxSplash from './DxSplash';
import DxVideoViewer from './DxVideoViewer';
import DxImageViewer from './DxImageViewer';
import DxLink from './DxLink';
import DxAdButtonConnector from './DxAdButtonConnector';
import DxAdButton2Connector from './DxAdButton2Connector';
import DxH5p from './DxH5p';

// constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import config from '../../../config';

const style = {
  borderTop: '1px dotted',
  borderBottom: '0.5px dotted',
  borderLeft: '1px dotted',
  borderRight: '1px dotted',
  borderColor: colors.blueBorderColor,
  boxSize: 'border-box',
  backgroundColor: colors.whiteColor,
  cursor: 'move'
};

const cardSource = {
  beginDrag(props) {
    return {
      index: props.index
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%
    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveCard(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

class PhoneElement extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    isDragging: PropTypes.bool.isRequired,
    moveCard: PropTypes.func.isRequired
  };

  state = {
    isHover: false
  };

  handleElemSelect = (e, elemType) => {
    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    this.props.handleSectionClickByElem(this.props.sectionGUID, elemType);
  };

  handleEnterHoverElem = () => {
    this.setState({
      isHover: true
    });
  };

  handleLeaveHoverElem = () => {
    this.setState({
      isHover: false
    });
  };

  renderSection = type => {
    const { activeElemType } = this.props;

    let renderSection;
    switch (type) {
      case 'EDITOR':
        renderSection = (
          <div onClick={e => this.handleElemSelect(e, 'TEXT')}>
            {!this.props.isActive ? (
              <div
                className="dx_section_placeholder_container"
                style={Object.assign(
                  {},
                  { minHeight: 96 },
                  styles.sectionStyle
                )}
                dangerouslySetInnerHTML={{ __html: this.props.htmlContent }}
              />
            ) : activeElemType == 'TEXT' ? (
              <DxEditor
                sectionGUID={this.props.sectionGUID}
                html={this.props.html}
                htmlContent={this.props.htmlContent}
                handleUpdateHtmlContent={html =>
                  this.props.handleUpdateHtmlContent(html)
                }
              />
            ) : (
              <div
                className="dx_section_placeholder_container"
                style={Object.assign(
                  {},
                  { minHeight: 96 },
                  styles.sectionStyle
                )}
                dangerouslySetInnerHTML={{ __html: this.props.htmlContent }}
              />
            )}
          </div>
        );
        break;
      case 'BUTTON':
        renderSection = (
          <DxButtonConnector
            sectionGUID={this.props.sectionGUID}
            btnContent={this.props.btnContent}
            dropdownOptionArr={this.props.dropdownOptionArr}
            defaultConnectorPage={this.props.defaultConnectorPage}
            handleBtnInputChange={e => this.props.handleBtnInputChange(e)}
            handleBtnConnectPageChange={pageGUID =>
              this.props.handleBtnConnectPageChange(pageGUID)
            }
          />
        );
        break;
      case 'SPLASH':
        renderSection = (
          <DxSplash
            sectionGUID={this.props.sectionGUID}
            isActive={this.props.isActive}
            activeElemType={this.props.activeElemType}
            currentPageTitle={this.props.currentPageTitle}
            splashContent={this.props.splashContent}
            splashImg={this.props.splashImg}
            splashColor={this.props.splashColor}
            splashOpacityColor={this.props.splashOpacityColor}
            splashOpacity={this.props.splashOpacity}
            handleDescInputChange={html =>
              this.props.handleDescInputChange(html)
            }
            handleElemSelect={(e, elemType) =>
              this.handleElemSelect(e, elemType)
            }
          />
        );
        break;
      case 'VIDEO':
        renderSection = (
          <div onClick={e => this.handleElemSelect(e, 'VIDEO')}>
            <DxVideoViewer
              videoUrl={this.props.videoUrl}
              handleVideoError={msg => this.props.handleVideoError(msg)}
              handleElemSelect={e => this.handleElemSelect(e, 'VIDEO')}
            />
          </div>
        );
        break;
      case 'IMAGE':
        renderSection = (
          <div onClick={e => this.handleElemSelect(e, 'IMAGE')}>
            <DxImageViewer
              img={this.props.img}
              imgOpacityColor={this.props.imgOpacityColor}
              imgOpacity={this.props.imgOpacity}
            />
          </div>
        );
        break;
      case 'EMBED_PDF':
        renderSection = (
          <DxPdfViewer
            sectionGUID={this.props.sectionGUID}
            isActive={this.props.isActive}
            activeElemType={this.props.activeElemType}
            pdf={this.props.pdf}
            pdfLabel={this.props.pdfLabel}
            pdfBgColor={this.props.pdfBgColor}
            handlePdfLabelInputChange={html =>
              this.props.handlePdfLabelInputChange(html)
            }
            handleElemSelect={(e, elemType) =>
              this.handleElemSelect(e, elemType)
            }
          />
        );
        break;
      case 'LINK':
        renderSection = (
          <DxLink
            sectionGUID={this.props.sectionGUID}
            isActive={this.props.isActive}
            activeElemType={this.props.activeElemType}
            link={this.props.link}
            linkLabel={this.props.linkLabel}
            linkBgColor={this.props.linkBgColor}
            handleLinkLabelInputChange={html =>
              this.props.handleLinkLabelInputChange(html)
            }
            handleElemSelect={(e, elemType) =>
              this.handleElemSelect(e, elemType)
            }
          />
        );
        break;
      case 'AD_BUTTON':
        renderSection = (
          <DxAdButtonConnector
            sectionGUID={this.props.sectionGUID}
            isActive={this.props.isActive}
            activeElemType={this.props.activeElemType}
            adBtnImg={this.props.adBtnImg}
            adBtnImgOpacityColor={this.props.adBtnImgOpacityColor}
            adBtnImgOpacity={this.props.adBtnImgOpacity}
            adBtnColor={this.props.adBtnColor}
            btnContent={this.props.btnContent}
            dropdownOptionArr={this.props.dropdownOptionArr}
            defaultConnectorPage={this.props.defaultConnectorPage}
            handleBtnInputChange={html => this.props.handleBtnInputChange(html)}
            handleBtnConnectPageChange={pageGUID =>
              this.props.handleBtnConnectPageChange(pageGUID)
            }
            handleElemSelect={(e, elemType) =>
              this.handleElemSelect(e, elemType)
            }
          />
        );
        break;
      case 'AD_BUTTON_2':
        renderSection = (
          <DxAdButton2Connector
            sectionGUID={this.props.sectionGUID}
            isActive={this.props.isActive}
            activeElemType={this.props.activeElemType}
            adBtnBgColor={this.props.adBtnBgColor}
            adBtnColor={this.props.adBtnColor}
            btnContent={this.props.btnContent}
            dropdownOptionArr={this.props.dropdownOptionArr}
            defaultConnectorPage={this.props.defaultConnectorPage}
            handleBtnInputChange={html => this.props.handleBtnInputChange(html)}
            handleBtnConnectPageChange={pageGUID =>
              this.props.handleBtnConnectPageChange(pageGUID)
            }
            handleElemSelect={(e, elemType) =>
              this.handleElemSelect(e, elemType)
            }
          />
        );
        break;
      case 'H5P':
        renderSection = (
          <DxH5p
            sectionGUID={this.props.sectionGUID}
            isActive={this.props.isActive}
            activeElemType={this.props.activeElemType}
            h5p={this.props.h5p}
            h5pLabel={this.props.h5pLabel}
            h5pBgColor={this.props.h5pBgColor}
            handleH5pLabelInputChange={html =>
              this.props.handleH5pLabelInputChange(html)
            }
            handleElemSelect={(e, elemType) =>
              this.handleElemSelect(e, elemType)
            }
          />
        );
        break;
      default:
        break;
    }

    return renderSection;
  };

  render() {
    const {
      isDragging,
      connectDragSource,
      connectDropTarget,

      type,
      isActive
    } = this.props;

    const { isHover } = this.state;

    // const opacity = isDragging ? 0.5 : 1;
    const opacity = 1;
    const {
      mainContainerStyle,
      tableContainerStyle,
      tableWrapperStyle,
      controlContainerStyle,
      controlWrapperStyle,

      contentContainerStyle,
      removeControlContainerStyle,
      copyControlContainerStyle,
      dragControlContainerStyle,
      controlIconStyle
    } = styles;

    return (
      <div
        style={Object.assign({}, mainContainerStyle, { ...style, opacity })}
        onMouseEnter={() => this.handleEnterHoverElem()}
        onMouseLeave={() => this.handleLeaveHoverElem()}
      >
        <div
          className="dx_float_active_side_tab"
          style={Object.assign({}, controlContainerStyle, {
            borderColor: isActive ? colors.activeBlueColor : 'transparent'
          })}
        >
          <div style={tableContainerStyle}>
            <div style={tableWrapperStyle}>
              {isActive || isHover ? (
                <div style={controlWrapperStyle}>
                  <div
                    className="dx_control_btn"
                    style={removeControlContainerStyle}
                    onClick={() =>
                      this.props.handleDeleteElem(this.props.sectionGUID)
                    }
                  >
                    <Delete style={controlIconStyle} />
                  </div>
                  {type != 'SPLASH' ? (
                    <div
                      className="dx_control_btn"
                      style={copyControlContainerStyle}
                      onClick={() =>
                        this.props.handleCloneElem(this.props.sectionGUID)
                      }
                    >
                      <ContentCopy style={controlIconStyle} />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {connectDragSource &&
          connectDropTarget &&
          connectDragSource(
            connectDropTarget(
              <div
                style={contentContainerStyle}
                // onClick={() => this.props.handleSectionClick(this.props.sectionGUID)}
              >
                {(isActive || isHover) && type != 'SPLASH' ? (
                  <div
                    className="dx_control_btn"
                    style={dragControlContainerStyle}
                  >
                    <DragHandle style={controlIconStyle} />
                  </div>
                ) : null}
                {this.renderSection(type)}
              </div>
            )
          )}
      </div>
    );
  }
}

const minHeight = 72;

const styles = {
  mainContainerStyle: {
    position: 'relative',
    minHeight: minHeight
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
  controlContainerStyle: {
    position: 'absolute',
    left: -42,
    width: 18,
    height: '100%',
    paddingRight: 30,
    borderRight: '4px solid',
    boxSizing: 'border-box'
  },

  controlWrapperStyle: {
    width: 18,
    height: 54,
    boxSizing: 'border-box'
  },
  contentContainerStyle: {
    minHeight: minHeight
  },
  removeControlContainerStyle: {
    width: 18,
    height: 18,
    boxSizing: 'border-box',
    cursor: 'pointer'
  },
  controlIconStyle: {
    color: colors.lightGreyColor,
    fontSize: fonts.h2
  },
  copyControlContainerStyle: {
    width: 18,
    height: 18,
    boxSizing: 'border-box',
    marginTop: 36,
    cursor: 'pointer'
  },
  dragControlContainerStyle: {
    position: 'absolute',
    left: -40,
    top: 'calc(50%)',
    width: 18,
    height: 18,
    boxSizing: 'border-box'
  },
  sectionStyle: {
    lineHeight: 1.42,
    cursor: 'pointer',
    fontFamily: 'Open Sans',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    padding: config.defaultElementPadding
  }
};

export default flow(
  DragSource('card', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget('card', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))
)(PhoneElement);

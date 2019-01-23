import React, { Component } from 'react';

// constants
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

// components
import DxModal from '../dxModal/DxModal';

// Libraries
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import ThumbnailPhoneElement from './ThumbnailPhoneElement';
import Fade from '@material-ui/core/Fade';
import Popover from '@material-ui/core/Popover';

const displayEditorSectionNumber = 3;

class DxPage extends Component {
  state = {
    anchorEl: null,
    isMenuOpen: false,
    isModalOpen: false
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

  handleRemovePagePagesClick = () => {
    this.setState({ isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleRemovePagePages = () => {
    this.handleCloseModal();
    this.props.handleRemovePagePages();
  };

  renderPhoneElementSection = () => {
    const { pages, isLoadHtml } = this.props;

    let page = this.findRootPage(pages);
    let sections = page.Sections;

    const { elemContainerStyle } = styles;

    if (!sections) {
      return null;
    }

    let sectionCounter = 0;
    let sectionArr = [];
    for (let i = 0; i < sections.length; i++) {
      let section = sections[i];
      let item = null;

      // Preview only loading 5 section EDITOR
      if (section.Type == 'EDITOR') {
        sectionCounter++;
      }
      if (sectionCounter <= displayEditorSectionNumber) {
        item = (
          <div className={'dx_show'} style={elemContainerStyle}>
            <ThumbnailPhoneElement
              key={i}
              isMin={false}
              section={section}
              pdfWidth={this.props.pdfWidth}
              isLoadHtml={isLoadHtml}
              splashSize="MEDIUM"
              videoSize="MEDIUM"
              imgSize="MEDIUM"
              handleLoadHtml={(sectionGUID, guid) =>
                this.props.handleLoadHtml(page.PageGUID, sectionGUID, guid)
              }
            />
          </div>
        );
      }
      // END
      sectionArr.push(item);
    }
    return sectionArr;
  };

  findRootPage = pages => {
    for (let i = 0; i < pages.length; i++) {
      let page = pages[i];
      if (page.IsRoot) {
        return page;
      }
    }
    return null;
    l;
  };

  findPageNumber = pages => {
    let pageNo = 0;
    for (let i = 0; i < pages.length; i++) {
      pageNo++;
    }
    return pageNo;
  };

  render() {
    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      topControlContainerStyle,
      pageNumberContainerStyle,
      pageNumberTitleStyle,
      contentContainerStyle,
      contentWrapperStyle,
      controlContainerStyle,
      pageNameContainerStyle,
      pageTitleContainerStyle,
      pageTitleStyle,
      pageEditContainerStyle,
      pageEditBurgerContainerStyle,
      editBurgerStyle
    } = styles;

    const { pages, displayPageNumber, isWithBottomBar } = this.props;

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    let page = this.findRootPage(pages);
    let pageNumber = this.findPageNumber(pages);

    return (
      <div style={mainContainerStyle}>
        {displayPageNumber ? (
          <div style={topControlContainerStyle}>
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <div style={pageNumberContainerStyle}>
                  <p style={pageNumberTitleStyle}>{pageNumber}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div style={contentContainerStyle}>
          <div style={contentWrapperStyle}>
            {this.renderPhoneElementSection()}
          </div>
        </div>
        {isWithBottomBar ? (
          <div style={controlContainerStyle} className="dx_card_bottom_bar">
            <div style={pageNameContainerStyle}>
              <div style={tableContainerStyle}>
                <div style={tableWrapperStyle}>
                  <div style={pageTitleContainerStyle}>
                    <p style={pageTitleStyle}>{page.Title}</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={pageEditContainerStyle}>
              <div style={pageEditBurgerContainerStyle}>
                {/* <DropdownMenu
                                        className="dx_card_template_bottom_bar_menu"
                                        isOpen={this.state.isMenuOpen}
                                        close={() => this.handleMenuClose()}
                                        toggle={
                                            <MoreHoriz
                                                onClick={() => this.handleToggleBurger()}
                                                style={editBurgerStyle} />
                                        }
                                        align='right'
                                        closeOnInsideClick={false}
                                    >
                                        
                                        
                                    </DropdownMenu> */}
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
                      onClick={() => this.props.handleEditPagePagesClick()}
                    >
                      Edit
                    </Button>
                  </div>
                  <div>
                    <Button onClick={() => this.handleRemovePagePagesClick()}>
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
          title="Confirm Delete Pages"
          hasBottomDiv={true}
          description="Do you want to proceed?"
          cancel={true}
          confirm={true}
          isDanger={true}
          handleConfirm={() => this.handleRemovePagePages()}
          onCloseModal={() => this.handleCloseModal()}
        />
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
    width: 276,
    position: 'relative',
    boxSizing: 'border-box'
  },
  topControlContainerStyle: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 48,
    width: 48,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 99
  },
  pageNumberContainerStyle: {
    textAlign: 'center'
  },
  pageNumberTitleStyle: {
    color: colors.whiteColor,
    fontSize: fonts.h3
  },
  contentContainerStyle: {
    height: 318,
    paddingTop: 6,
    paddingBottom: 6,
    backgroundColor: colors.whiteColor
  },
  contentWrapperStyle: {
    height: '100%',
    overflow: 'hidden'
  },
  elemContainerStyle: {
    width: '100%',
    backgroundColor: colors.whiteColor,
    overflow: 'hidden'
  },
  controlContainerStyle: {
    width: '100%',
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.whiteColor
  },
  pageNameContainerStyle: {
    flex: 1
  },
  pageTitleContainerStyle: {
    marginLeft: 6
  },
  pageTitleStyle: {
    margin: 0,
    fontSize: fonts.h3,
    width: 180,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  pageEditContainerStyle: {
    flex: '30px 0 0',
    position: 'relative'
  },
  pageEditBurgerContainerStyle: {
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
  }
};

export default DxPage;

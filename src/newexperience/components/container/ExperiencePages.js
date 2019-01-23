import React, { Component } from 'react';

// data
import ExperiencePageData from '../../../../../data/ExperiencePageData';

// components
import SearchBar from '../../../components/searchBar/SearchBar';
import PageTemplate from '../presentation/PageTemplate';
import PageTemplateTitle from '../presentation/PageTemplateTitle';
import PhoneTarget from '../presentation/PhoneTarget';
import PhoneElement from '../presentation/PhoneElement';
import PhoneToolbar from '../presentation/PhoneToolbar';
import PageCarousel from '../presentation/PageCarousel';
import DxModal from '../../../components/dxModal/DxModal';
import DxPreviewModal from '../../../components/dxModal/DxPreviewModal';
import GoogleWordViewer from '../presentation/GoogleWordViewer';

// Libraries
import Button from '@material-ui/core/Button';
import DropdownMenu from 'react-dd-menu';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Home from '@material-ui/icons/Home';
import Dropzone from 'react-dropzone';

import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// redux
import { connect } from 'react-redux';
import {
  dxExperienceUploadFile as dxExperienceUploadFileAction,
  dxExperienceUpdateFile as dxExperienceUpdateFileAction,
  dxExperiencePreview as dxExperiencePreviewAction,
  dxExperiencePreviewClose as dxExperiencePreviewCloseAction,
  dxExperiencePageTemplateFetch as dxExperiencePageTemplateFetchAction,
  dxExperiencePageSetRootPage as dxExperiencePageSetRootPageAction,
  dxExperiencePageCarouselMenuUpdate as dxExperiencePageCarouselMenuUpdateAction,
  dxExperiencePageCarouselActivePage as dxExperiencePageCarouselActivePageAction,
  dxExperienceUploadGoogleFile as dxExperienceUploadGoogleFileAction,
  dxExperiencePageDocPanelToggle as dxExperiencePageDocPanelToggleAction,
  dxExperiencePageAddElem as dxExperiencePageAddElemAction,
  dxExperiencePageDeleteElem as dxExperiencePageDeleteElemAction,
  dxExperiencePageCopyElem as dxExperiencePageCopyElemAction,
  dxExperiencePageShuffleElem as dxExperiencePageShuffleElemAction,
  dxExperiencePageSelectElem as dxExperiencePageSelectElemAction,
  dxExperiencePageSelectElemByType as dxExperiencePageSelectElemByTypeAction,
  dxExperiencePageUnSelectElemByType as dxExperiencePageUnSelectElemByTypeAction,
  dxExperiencePageUpdateElem as dxExperiencePageUpdateElemAction,
  dxExperiencePageSectionConnectPage as dxExperiencePageSectionConnectPageAction,
  dxExperiencePageDeletePage as dxExperiencePageDeletePageAction,
  dxExperienceViewHtmlFetch as dxExperienceViewHtmlFetchAction
} from '../../actions';
import {
  dxAlert as dxAlertAction,
  dxLoading as dxLoadingAction
} from '../../../actions';

// helpers
import {
  find_page_obj_by_guid,
  search_object_index_by_value
} from '../../../helpers';

// constants
import sizes from '../../../styles/sizes';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

class ExperiencePages extends Component {
  state = {
    activeTab: 0,
    modalType: null,
    isModalOpen: false,
    isDocDndPanelOpen: true,
    modalTitle: '',
    targetSectionGUID: null
  };

  componentDidMount() {
    this.props.dxExperiencePageTemplateFetchAction(
      ExperiencePageData.PageTemplates
    );
  }

  componentWillReceiveProps(nextProps) {
    // PREVIEW
    if (nextProps.IsPreview) {
      // CREATE
      if (nextProps.IsFilesUploaded && !this.props.IsFilesUploaded) {
        this.props.dxExperiencePreviewAction(this.props.Experience);
      }
      // UPDATE
      if (nextProps.IsFilesUpdated && !this.props.IsFilesUpdated) {
        this.props.dxExperiencePreviewAction(this.props.Experience);
      }
    }
  }

  handleErrorMsg = msg => {
    this.props.dxAlertAction(true, true, msg);
  };

  handleClickCate = activeTab => {
    this.setState({
      activeTab
    });
  };

  renderPhoneElement = () => {
    const { NewPage } = this.props.Experience;
    return this.renderPhoneElementSection(NewPage.Sections);
  };

  renderPhoneElementSection = sections => {
    const { Experience, ActiveElemType } = this.props;

    let sectionArr = [];
    if (sections) {
      for (let i = 0; i < sections.length; i++) {
        let section = sections[i];

        let readyToLoad = true;
        if (i > 0) {
          let preSection = sections[i - 1];
          if (
            preSection.Type == 'EDITOR' &&
            preSection.Html &&
            !preSection.HtmlContent
          ) {
            readyToLoad = false;
          }
        }
        let item = (
          <PhoneElement
            activeElemType={ActiveElemType}
            section={section}
            sectionGUID={section.SectionGUID}
            type={section.Type}
            isActive={section.IsActive}
            currentPageTitle={Experience.NewPage.Title}
            html={section.Html}
            htmlContent={this.handleLoadHtml(
              Experience.NewPage,
              section,
              readyToLoad
            )}
            btnContent={section.BtnContent}
            dropdownOptionArr={this.availablePageOptionList(
              Experience.Pages,
              Experience.NewPage.PageGUID,
              section.ConnectedPageGUID
            )}
            defaultConnectorPage={this.fetchConnectedPageInfo(
              Experience.Pages,
              section.ConnectedPageGUID
            )}
            pdf={section.Pdf}
            pdfLabel={section.PdfLabel}
            pdfBgColor={section.PdfBgColor}
            splashContent={section.SplashContent}
            splashImg={section.SplashImg}
            splashColor={section.SplashColor}
            splashOpacityColor={section.SplashOpacityColor}
            splashOpacity={section.SplashOpacity}
            videoUrl={section.VideoUrl}
            img={section.Img}
            imgOpacityColor={section.ImgOpacityColor}
            imgOpacity={section.ImgOpacity}
            link={section.Link}
            linkLabel={section.LinkLabel}
            linkBgColor={section.LinkBgColor}
            adBtnImg={section.AdBtnImg}
            adBtnImgOpacityColor={section.AdBtnImgOpacityColor}
            adBtnImgOpacity={section.AdBtnImgOpacity}
            adBtnColor={section.AdBtnColor}
            adBtnBgColor={section.AdBtnBgColor}
            h5p={section.H5p}
            h5pLabel={section.H5pLabel}
            h5pBgColor={section.H5pBgColor}
            key={section.SectionGUID}
            index={i}
            moveCard={this.handleMoveCard}
            // handleSectionClick={(sectionGUID) => this.handleSectionClick(sectionGUID)}
            handleSectionClickByElem={(sectionGUID, elemType) =>
              this.handleSectionClickByElem(sectionGUID, elemType)
            }
            handleUpdateHtmlContent={html =>
              this.handleUpdateHtmlContent(section.SectionGUID, html)
            }
            handleBtnInputChange={html =>
              this.handleUpdateBtnContent(section.SectionGUID, html)
            }
            handleBtnConnectPageChange={pageGUID =>
              this.handleBtnConnectPageChange(section.SectionGUID, pageGUID)
            }
            handleDescInputChange={html =>
              this.handleUpdateDescContent(section.SectionGUID, html)
            }
            handleDeleteElem={sectionGUID => this.handleDeleteElem(sectionGUID)}
            handleCloneElem={sectionGUID => this.handleCloneElem(sectionGUID)}
            handleLinkLabelInputChange={html =>
              this.handleUpdateLinkLabelContent(section.SectionGUID, html)
            }
            handlePdfLabelInputChange={html =>
              this.handleUpdatePdfLabelContent(section.SectionGUID, html)
            }
            handleH5pLabelInputChange={html =>
              this.handleUpdateH5pLabelContent(section.SectionGUID, html)
            }
            handleVideoError={msg => this.handleErrorMsg(msg)}
          />
        );
        sectionArr.push(item);
      }
    }
    return sectionArr;
  };

  handleLoadHtml = (page, section, readyToLoad) => {
    let isSyncServer = section.IsSyncServer;
    if (isSyncServer) {
      if (section.HtmlContent)
        return section.HtmlContent == null ? '' : section.HtmlContent;
      else return '';
    } else {
      if (section.HtmlContent)
        return section.HtmlContent == null ? '' : section.HtmlContent;
      if (section.Html) {
        // Sectional loading
        if (!readyToLoad) {
          return '';
        } else {
          return this.props.dxExperienceViewHtmlFetchAction(
            page.PageGUID,
            section.SectionGUID,
            section.Html
          );
        }
      } else return '';
    }
  };

  handleAddElem = template => {
    // Add section to new page
    this.props.dxExperiencePageAddElemAction(template.Type);
    // Auto scroll
    let dxPhoneArea = this.refs.dx_phone_area;
    if (template.Type == 'SPLASH') {
      if (dxPhoneArea) dxPhoneArea.scrollTop = 0;
    } else {
      setTimeout(() => {
        if (dxPhoneArea) dxPhoneArea.scrollTop = dxPhoneArea.scrollHeight;
      }, 100);
    }
  };

  handleMoveCard = (dragIndex, hoverIndex) => {
    // shuffle order of section
    this.props.dxExperiencePageShuffleElemAction(dragIndex, hoverIndex);
  };

  handleSectionClick = sectionGUID => {
    // version 1: select active section
    // this.props.dxExperiencePageSelectElemAction(sectionGUID);
  };

  handleSectionClickByElem = (sectionGUID, elemType) => {
    this.props.dxExperiencePageSelectElemByTypeAction(sectionGUID, elemType);
  };

  handleUnSectionClickByElem = e => {
    // // Prevent parent event
    // if (!e) var e = window.event;
    // e.cancelBubble = true;
    // if (e.stopPropagation) e.stopPropagation();
    // // Hide Properities bar
    // this.props.dxExperiencePageUnSelectElemByTypeAction();
  };

  handleUpdateHtmlContent = (sectionGUID, html) => {
    const {
      Experience: {
        NewPage: { PageGUID }
      }
    } = this.props;
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'EDITOR',
      html,
      PageGUID
    );
  };

  handleUpdateBtnContent = (sectionGUID, html) => {
    let value = html;
    this.props.dxExperiencePageUpdateElemAction(sectionGUID, 'BUTTON', value);
  };

  handleBtnConnectPageChange = (sectionGUID, pageGUID) => {
    const { Experience } = this.props;
    const { NewPage, Pages } = Experience;
    const targetPage = find_page_obj_by_guid(Pages, pageGUID);
    if (
      NewPage.ParentPageGUID &&
      NewPage.ParentPageGUID == targetPage.page.PageGUID
    ) {
      this.handleErrorMsg('Sorry, cannot support loop connection');
    } else {
      this.props.dxExperiencePageSectionConnectPageAction(
        sectionGUID,
        pageGUID
      );
    }
  };

  availablePageOptionList = (pages, currentpageGUID, targetPageGUID) => {
    let res = [];
    if (pages.length && targetPageGUID) {
      let cancelOption = {
        SectionGUID: '',
        Title: 'no connect'
      };
      res.push(cancelOption);
    }

    for (let i = 0; i < pages.length; i++) {
      if (
        pages[i].PageGUID != currentpageGUID &&
        !pages[i].IsRoot &&
        !pages[i].IsConnected
      ) {
        res.push(pages[i]);
      }
    }
    return res;
  };

  fetchConnectedPageInfo = (pages, targetPageGUID) => {
    if (!targetPageGUID) {
      return null;
    }
    for (let i = 0; i < pages.length; i++) {
      let page = pages[i];
      if (page.PageGUID == targetPageGUID) {
        return page;
      }
    }
    return null;
  };

  findActiveSectionGUID = () => {
    let sections = this.props.Experience.NewPage.Sections;
    let activePageSectionIndex = this.props.Experience.ActivePageSectionIndex;
    let sectionGUID = sections[activePageSectionIndex].SectionGUID;
    return sectionGUID;
  };

  handlePdfChange = file => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(sectionGUID, 'EMBED_PDF', file);
  };

  handleUpdatePdfLabelContent = (sectionGUID, html) => {
    let value = html;
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'EMBED_PDF_LABEL',
      value
    );
  };

  handlePdfBgColorChange = color => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'EMBED_PDF_BG_COLOR',
      color.color
    );
  };

  handleUpdateDescContent = (sectionGUID, html) => {
    let value = html;
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'SPLASH_CONTENT',
      value
    );
  };

  handleSplashImgChange = file => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'SPLASH_IMG',
      file
    );
  };

  handleSplashColorChange = color => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'SPLASH_COLOR',
      color.color
    );
  };

  handleSplashOpacityColorChange = color => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'SPLASH_OPACITY_COLOR',
      color.color
    );
  };

  handleSplashOpacityChange = opacity => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'SPLASH_OPACITY',
      opacity
    );
  };

  handleVideoInputChange = e => {
    let value = e.target.value;
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'VIDEO_URL',
      value
    );
  };

  handleVideoInsertClick = () => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(sectionGUID, 'VIDEO_CONFIRM');
  };

  handleImageChange = file => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(sectionGUID, 'IMAGE', file);
  };

  handleImageOpacityColorChange = color => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'IMAGE_OPACITY_COLOR',
      color.color
    );
  };

  handleImageOpacityChange = opacity => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'IMAGE_OPACITY',
      opacity
    );
  };

  handleLinkInputChange = e => {
    let value = e.target.value;
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(sectionGUID, 'LINK_URL', value);
  };

  handleLinkInsertClick = () => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(sectionGUID, 'LINK_CONFIRM');
  };

  handleUpdateLinkLabelContent = (sectionGUID, html) => {
    let value = html;
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'LINK_LABEL',
      value
    );
  };

  handleLinkBgColorChange = color => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'LINK_BG_COLOR',
      color.color
    );
  };

  handleAdBtnImageChange = file => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'AD_BTN_IMAGE',
      file
    );
  };

  handleAdBtnOpacityColorChange = color => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'AD_BTN_IMAGE_OPACITY_COLOR',
      color.color
    );
  };

  handleAdBtnOpacityChange = opacity => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'AD_BTN_IMAGE_OPACITY',
      opacity
    );
  };

  handleAdBtnColorChange = color => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'AD_BTN_COLOR',
      color.color
    );
  };

  handleAdBtnBgColorChange = color => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'AD_BTN_BG_COLOR',
      color.color
    );
  };

  handleH5pChange = file => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(sectionGUID, 'H5P', file);
  };

  handleUpdateH5pLabelContent = (sectionGUID, html) => {
    let value = html;
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'H5P_LABEL',
      value
    );
  };

  handleH5pBgColorChange = color => {
    let sectionGUID = this.findActiveSectionGUID();
    this.props.dxExperiencePageUpdateElemAction(
      sectionGUID,
      'H5P_BG_COLOR',
      color.color
    );
  };

  handleDeleteElem = sectionGUID => {
    this.setState({
      modalType: 'DELETE',
      isModalOpen: true,
      modalTitle: 'Confirm Delete Element',
      targetSectionGUID: sectionGUID
    });
  };

  handleCloneElem = sectionGUID => {
    this.setState({
      modalType: 'COPY',
      isModalOpen: true,
      modalTitle: 'Confirm Copy Element',
      targetSectionGUID: sectionGUID
    });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleConfirmModal = () => {
    const { modalType, targetSectionGUID } = this.state;

    this.handleCloseModal();
    if (modalType == 'DELETE') {
      this.props.dxExperiencePageDeleteElemAction(targetSectionGUID);
    } else if (modalType == 'COPY') {
      this.props.dxExperiencePageCopyElemAction(targetSectionGUID);
      // Auto scroll
      setTimeout(() => {
        let dxPhoneArea = this.refs.dx_phone_area;
        if (dxPhoneArea) dxPhoneArea.scrollTop = dxPhoneArea.scrollHeight;
      }, 0.1);
    } else if (modalType == 'ROOT') {
      this.props.dxExperiencePageSetRootPageAction();
    }
  };

  handleCarouselClick = open => {
    if (open) {
      this.props.dxExperiencePageCarouselMenuUpdateAction(
        !this.props.Experience.IsPageCarouselMenuOpen
      );
    } else {
      this.props.dxExperiencePageCarouselMenuUpdateAction(false);
    }
  };

  handleClickActiveCarouselPage = pageGUID => {
    this.props.dxExperiencePageCarouselActivePageAction(pageGUID);
  };

  handleConfirmDeleteCarouselPage = pageGUID => {
    this.props.dxExperiencePageDeletePageAction(pageGUID);
  };

  handleDropDoc = files => {
    if (files.length) {
      this.setState({
        isDocDndPanelOpen: false
      });
      this.props.dxExperienceUploadGoogleFileAction(files[0]);
    }
  };

  handleDocDndPanelToggle = () => {
    this.setState({
      isDocDndPanelOpen: !this.state.isDocDndPanelOpen
    });
  };

  renderDropZone = () => {
    const {
      tableContainerStyle,
      tableWrapperStyle,
      dropZoneContainerStyle,
      dropLabelStyle,
      dropSubLabelStyle,
      dropZoneStyle
    } = styles;
    return (
      <div>
        <ListItem button onClick={() => this.handleDocDndPanelToggle()}>
          <ListItemText primary="Open or add an existing document" />
          {this.state.isDocDndPanelOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse
          in={this.state.isDocDndPanelOpen}
          timeout="auto"
          unmountOnExit
        >
          <div style={Object.assign({}, { height: dndHeight })}>
            <div style={dropZoneContainerStyle}>
              <div style={tableContainerStyle}>
                <div style={tableWrapperStyle}>
                  <Dropzone
                    children={
                      <div style={tableContainerStyle}>
                        <div style={tableWrapperStyle}>
                          <p style={dropLabelStyle}>
                            Drag & Drop PDF, DOC files here
                          </p>
                          <p style={dropSubLabelStyle}>Browse & Upload</p>
                        </div>
                      </div>
                    }
                    style={dropZoneStyle}
                    onDrop={files => this.handleDropDoc(files)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    );
  };

  handleToggleCollapsible = (index, toggle) => {
    this.props.dxExperiencePageDocPanelToggleAction(index, toggle);
  };

  handleSetRootPage = () => {
    const { Experience } = this.props;
    if (Experience.NewPage.IsRoot) return;
    this.setState({
      modalType: 'ROOT',
      isModalOpen: true,
      modalTitle: 'Confirm Set Current Page as Root Page'
    });
  };

  handleTogglePreviewExperience = () => {
    const { TogglePreview, Experience } = this.props;

    if (!TogglePreview) {
      // Validate experience
      let { IsWarning, IsError, Message } = this.validateExperience(Experience);
      if (IsError) {
        this.props.dxAlertAction(true, IsError, Message);
        return;
      }
      // Save experience
      let experienceGUID = Experience.ExperienceGUID;
      // CREATE
      if (!experienceGUID)
        this.props.dxExperienceUploadFileAction(Experience, true);
      // UPDATE
      else this.props.dxExperienceUpdateFileAction(Experience, true);
    } else {
      this.props.dxExperiencePreviewCloseAction();
    }
  };

  validateExperience = experience => {
    let res = {
      IsWarning: false,
      IsError: true,
      Message: ''
    };
    const {
      // 1. experience
      Type,
      ExperienceTitle,
      // 2. card
      IsCardTemplateSaved,
      Card,
      CardTitle,
      // 3. pages
      IsPagesSaved,
      Pages
    } = experience;

    // 1. experience
    if (Type != 0 && Type != 1) {
      res.Message = 'Invalid type';
      return res;
    }
    if (!ExperienceTitle) {
      res.Message = 'Please enter title';
      return res;
    }
    if (!ExperienceTitle.trim()) {
      res.Message = 'Please enter title';
      return res;
    }
    if (ExperienceTitle.length > 255) {
      res.Message = 'Experience title cannot be more than 255 characters';
      return res;
    }
    // 2. card
    if (!IsCardTemplateSaved) {
      res.Message = 'Please create & save your card';
      return res;
    }
    let validateCardResponse = this.validateExperienceCard(Card, CardTitle);
    res.IsError = validateCardResponse.IsError;
    res.Message = validateCardResponse.Message;
    if (res.IsError) {
      return res;
    } else {
      res.IsError = true;
    }
    // 3. pages
    if (Type == 1) {
      // if (!IsPagesSaved) {
      //     res.Message = 'Please create & save your page(s)';
      //     return res;
      // }
      let validatePagesResponse = this.validateExperiencePages(Pages);
      res.IsWarning = validatePagesResponse.IsWarning;
      res.IsError = validatePagesResponse.IsError;
      res.Message = validatePagesResponse.Message;
      if (res.IsError) {
        return res;
      }
    }
    res.IsError = false;
    return res;
  };

  validateExperienceCard = (card, title) => {
    let res = {
      IsError: true,
      Message: ''
    };
    if (!card) {
      res.Message = 'Please select a card template';
      return res;
    }
    if (!title) {
      res.Message = 'Please enter card title';
      return res;
    }
    if (!title.trim()) {
      res.Message = 'Please enter card title';
      return res;
    }
    let imageIdx = search_object_index_by_value(card.Settings, 'IMAGE');
    if (imageIdx != null && !card.Settings[imageIdx].Default) {
      res.Message = 'Please select a image';
      return res;
    }
    if (card.Type == 'VIDEO' && card.Content == '') {
      res.Message = 'Please enter video url';
      return res;
    }
    res.IsError = false;
    res.Message = 'Card has been saved';
    return res;
  };

  validateExperiencePages = pages => {
    let res = {
      IsWarning: false,
      IsError: true,
      Message: ''
    };
    let displayPages = pages;
    let rootPage = this.findRootPageOrChildrenPages(displayPages, 'ROOT');
    let childrenPages = this.findRootPageOrChildrenPages(
      displayPages,
      'CHILDREN'
    );
    // Check Root page
    if (!rootPage.length || !rootPage[0].Sections.length) {
      res.Message = 'Root page cannot be empty';
      return res;
    }
    // Check page title
    let unconnectedTitle = this.findUntitledPages(displayPages);
    if (unconnectedTitle.length > 0) {
      res.Message = `Index ${unconnectedTitle[0].index +
        1} page title cannot be empty`;
      return res;
    }
    // Check sections
    // 1. EDITOR
    // 2. SPLASH
    let unconnectedSplashes = this.findUnconnectedElems(displayPages, 'SPLASH');
    if (unconnectedSplashes.length > 0) {
      res.Message = `${this.printUnconnectedElems(
        unconnectedSplashes,
        'SPLASH'
      )}`;
      return res;
    }
    // 3. EMBED_PDF
    let unconnectedPDFs = this.findUnconnectedElems(displayPages, 'EMBED_PDF');
    if (unconnectedPDFs.length > 0) {
      res.Message = `${this.printUnconnectedElems(unconnectedPDFs, 'PDF')}`;
      return res;
    }
    // 4. VIDEO
    let unconnectedVideos = this.findUnconnectedElems(displayPages, 'VIDEO');
    if (unconnectedVideos.length > 0) {
      res.Message = `${this.printUnconnectedElems(unconnectedVideos, 'VIDEO')}`;
      return res;
    }
    // 5. IMAGE
    let unconnectedImages = this.findUnconnectedElems(displayPages, 'IMAGE');
    if (unconnectedImages.length > 0) {
      res.Message = `${this.printUnconnectedElems(unconnectedImages, 'IMAGE')}`;
      return res;
    }
    // 6. BUTTON
    let unconnectedBtns = this.findUnconnectedElems(displayPages, 'BUTTON');
    if (unconnectedBtns.length > 0) {
      res.IsWarning = true;
      res.Message = `Confirm unconnected button(s)`;
      return res;
    }
    // 7. LINK
    let unconnectedLinks = this.findUnconnectedElems(displayPages, 'LINK');
    if (unconnectedLinks.length > 0) {
      res.Message = `${this.printUnconnectedElems(unconnectedLinks, 'LINK')}`;
      return res;
    }
    // 8. AD_BUTTON
    let unconnectedAdBtnsI = this.findUnconnectedElems(
      displayPages,
      'AD_BUTTON_IMG'
    );
    if (unconnectedAdBtnsI.length > 0) {
      res.Message = `${this.printUnconnectedElems(
        unconnectedAdBtnsI,
        'AD_BUTTON image'
      )}`;
      return res;
    }
    let unconnectedAdBtnsC = this.findUnconnectedElems(
      displayPages,
      'AD_BUTTON_CONNECT'
    );
    if (unconnectedAdBtnsC.length > 0) {
      res.IsWarning = true;
      res.Message = `Confirm unconnected button(s)`;
      return res;
    }
    // 9. AD_BUTTON_2
    let unconnectedAdBtn2s = this.findUnconnectedElems(
      displayPages,
      'AD_BUTTON_2_CONNECT'
    );
    if (unconnectedAdBtn2s.length > 0) {
      res.IsWarning = true;
      res.Message = `Confirm unconnected button(s)`;
      return res;
    }
    // Check unconnected pages
    let unconnectedPages = this.findUnconnectedPages(childrenPages);
    if (unconnectedPages.length > 0) {
      res.IsWarning = true;
      res.Message = `Confirm unconnected page(s)`;
      return res;
    }
    res.IsError = false;
    res.Message = 'Page(s) has been saved';
    return res;
  };

  findRootPageOrChildrenPages = (pages, type) => {
    let output = [];
    for (let i = 0; i < pages.length; i++) {
      let page = pages[i];
      if (type == 'ROOT') {
        if (page.IsRoot) {
          output.push(page);
        }
      } else if (type == 'CHILDREN') {
        if (!page.IsRoot) {
          output.push(page);
        }
      }
    }
    return output;
  };

  findUntitledPages = pages => {
    let output = [];
    for (let i = 0; i < pages.length; i++) {
      let page = pages[i];
      if (!page.Title) {
        output.push({
          page,
          index: i
        });
      }
      if (page.Title && !page.Title.trim()) {
        output.push({
          page,
          index: i
        });
      }
    }
    return output;
  };

  findUnconnectedPages = pages => {
    let output = [];
    for (let i = 0; i < pages.length; i++) {
      let page = pages[i];
      if (!page.IsConnected) {
        output.push(page);
      }
    }
    return output;
  };

  findUnconnectedElems = (pages, type) => {
    let output = [];
    for (let i = 0; i < pages.length; i++) {
      let page = pages[i];
      for (let j = 0; j < page.Sections.length; j++) {
        let section = page.Sections[j];
        if (type == 'BUTTON') {
          if (section.Type == 'BUTTON' && !section.ConnectedPageGUID) {
            output.push({
              page,
              section
            });
          }
        } else if (type == 'EMBED_PDF') {
          if (section.Type == 'EMBED_PDF' && !section.Pdf) {
            output.push({
              page,
              section
            });
          }
        } else if (type == 'SPLASH') {
          if (section.Type == 'SPLASH' && !section.SplashImg) {
            output.push({
              page,
              section
            });
          }
        } else if (type == 'VIDEO') {
          if (section.Type == 'VIDEO' && !section.VideoUrl) {
            output.push({
              page,
              section
            });
          }
        } else if (type == 'IMAGE') {
          if (section.Type == 'IMAGE' && !section.Img) {
            output.push({
              page,
              section
            });
          }
        } else if (type == 'LINK') {
          if (section.Type == 'LINK' && !section.Link) {
            output.push({
              page,
              section
            });
          }
          if (section.Type == 'LINK') {
            if (!section.LinkLabel) {
              output.push({
                page,
                section
              });
            } else {
              let tmpLinkLable = section.LinkLabel;
              tmpLinkLable = tmpLinkLable.replace(/<(.|\n)*?>/g, '').trim();
              if (!tmpLinkLable) {
                output.push({
                  page,
                  section
                });
              }
            }
          }
        } else if (type == 'AD_BUTTON_IMG') {
          if (section.Type == 'AD_BUTTON' && !section.AdBtnImg) {
            output.push({
              page,
              section
            });
          }
        } else if (type == 'AD_BUTTON_CONNECT') {
          if (section.Type == 'AD_BUTTON' && !section.ConnectedPageGUID) {
            output.push({
              page,
              section
            });
          }
        } else if (type == 'AD_BUTTON_2_CONNECT') {
          if (section.Type == 'AD_BUTTON_2' && !section.ConnectedPageGUID) {
            output.push({
              page,
              section
            });
          }
        }
      }
    }
    return output;
  };

  printUnconnectedElems = (arr, type) => {
    let output = '';
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i];
      let { page, section } = item;
      let { SectionGUID } = section;
      output += `${page.Title} - #${this.findSectionIndex(
        page.Sections,
        SectionGUID
      )}: ${type} is not connected, `;
    }
    output = output.replace(/,\s*$/, '');
    return output;
  };

  findSectionIndex = (sections, sectionGUID) => {
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].SectionGUID == sectionGUID) {
        return i + 1;
      }
    }
    return null;
  };

  render() {
    const { activeTab } = this.state;

    const { TogglePreview, GoogleDocuments, Experience } = this.props;

    const {
      mainContainerStyle,
      txtCenterStyle,
      tableContainerStyle,
      tableWrapperStyle,
      hiddenLeftContainerStyle,
      leftContainerStyle,
      leftDocContainerStyle,
      leftWrapperStyle,
      docContainerStyle,
      cateContainerStyle,
      optionBtnContainerStyle,
      btnStyle,
      itemContainerStyle,
      searchBarContainerStyle,
      templateContainerStyle,

      rightContainerStyle,
      toolbarContainerStyle,
      editPhoneContainerStyle,
      phoneContainerStyle,
      phoneWrapperStyle,
      pageNumContainerStyle,
      rootIndicatorContainerStyle,
      rootIndicatorStyle,
      pageNumStyle,
      controlContainerStyle,
      leftControlContainerStyle,
      leftBtnContainerStyle,
      rightControlContainerStyle,
      rightBtnContainerStyle,
      controlIconStyle,
      carouselContainerStyle,
      carouselWrapperStyle,
      carouselLabelContainerStyle,
      carouselLabelStyle,
      carouselIconStyle,
      carouselSlideContainerStyle,

      previewContainerStyle,
      previewStyle
    } = styles;

    const activeOptionBtnStyle = { backgroundColor: colors.lightBlueColor };
    let leftContainer =
      Experience.ActivePageTemplateOptionIndex == 0
        ? leftContainerStyle
        : leftDocContainerStyle;
    leftContainer = Experience.IsPageTemplateMenuOpen
      ? leftContainer
      : hiddenLeftContainerStyle;

    return (
      <div style={mainContainerStyle}>
        {/* <a onClick={() => console.log('check: ', this.props.Experience)}>click me</a> */}
        <div
          className={
            Experience.IsPageTemplateMenuOpen
              ? 'dx_scale_container active_expand'
              : 'dx_scale_container'
          }
          style={leftContainer}
        >
          <DropdownMenu
            isOpen={Experience.IsPageTemplateMenuOpen}
            close={() => {}}
            align="center"
            className="dx-layout-menu"
            closeOnInsideClick={false}
          >
            {Experience.ActivePageTemplateOptionIndex == 0 ? (
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
                      variant="New"
                      onClick={() => this.handleClickCate(1)}
                    >
                      New
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
                      variant="Test"
                      onClick={() => this.handleClickCate(2)}
                    >
                      Test
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
                      variant="Examples"
                      onClick={() => this.handleClickCate(3)}
                    >
                      Examples
                    </Button>
                  </div>
                </div>
                <div style={itemContainerStyle}>
                  <div style={searchBarContainerStyle}>
                    <SearchBar placeholder="search page elements" />
                  </div>
                  <div style={templateContainerStyle}>
                    {this.props.PageTemplates.map((template, index) => (
                      <div>
                        <PageTemplateTitle title={template.Title} />
                        <PageTemplate
                          handleDrop={template => this.handleAddElem(template)}
                          handleTemplateClick={template =>
                            this.handleAddElem(template)
                          }
                          key={template.PageTemplateGUID}
                          template={template}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={leftWrapperStyle}>
                <div style={docContainerStyle}>
                  {GoogleDocuments.map((doc, index) => (
                    <div key={index}>
                      <ListItem
                        button
                        onClick={() =>
                          this.handleToggleCollapsible(index, !doc.isOpen)
                        }
                      >
                        <ListItemText primary={doc.fileName} />
                        {doc.isOpen ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={doc.isOpen} timeout="auto" unmountOnExit>
                        <GoogleWordViewer fileID={doc.googleFileGUID} />
                      </Collapse>
                    </div>
                  ))}
                  {this.renderDropZone()}
                </div>
              </div>
            )}
          </DropdownMenu>
        </div>

        <div
          className={
            Experience.IsPageTemplateMenuOpen
              ? 'dx_scale_container'
              : 'dx_scale_container active_expand'
          }
          style={rightContainerStyle}
          // onClick={(e) => this.handleUnSectionClickByElem(e)}
        >
          <div
            style={tableContainerStyle}
            onClick={() => this.handleCarouselClick(false)}
          >
            <div style={Object.assign({}, txtCenterStyle, tableWrapperStyle)}>
              <div style={toolbarContainerStyle}>
                <div
                  className={
                    this.props.ActiveElemType
                      ? 'dx_fade_in_div'
                      : 'dx_fade_out_div'
                  }
                >
                  <PhoneToolbar
                    activePageSectionIndex={Experience.ActivePageSectionIndex}
                    newPage={Experience.NewPage}
                    activeElemType={this.props.ActiveElemType}
                    handleErrorMsg={msg => this.handleErrorMsg(msg)}
                    handlePdfChange={file => this.handlePdfChange(file)}
                    handlePdfBgColorChange={color =>
                      this.handlePdfBgColorChange(color)
                    }
                    handleSplashImgChange={file =>
                      this.handleSplashImgChange(file)
                    }
                    handleSplashColorChange={color =>
                      this.handleSplashColorChange(color)
                    }
                    handleSplashOpacityColorChange={color =>
                      this.handleSplashOpacityColorChange(color)
                    }
                    handleSplashOpacityChange={opacity =>
                      this.handleSplashOpacityChange(opacity)
                    }
                    handleVideoInputChange={e => this.handleVideoInputChange(e)}
                    handleVideoInsertClick={() => this.handleVideoInsertClick()}
                    handleImageChange={file => this.handleImageChange(file)}
                    handleImageOpacityColorChange={color =>
                      this.handleImageOpacityColorChange(color)
                    }
                    handleImageOpacityChange={opacity =>
                      this.handleImageOpacityChange(opacity)
                    }
                    handleLinkInputChange={e => this.handleLinkInputChange(e)}
                    handleLinkInsertClick={() => this.handleLinkInsertClick()}
                    handleLinkBgColorChange={color =>
                      this.handleLinkBgColorChange(color)
                    }
                    handleAdBtnImageChange={file =>
                      this.handleAdBtnImageChange(file)
                    }
                    handleAdBtnOpacityColorChange={color =>
                      this.handleAdBtnOpacityColorChange(color)
                    }
                    handleAdBtnOpacityChange={opacity =>
                      this.handleAdBtnOpacityChange(opacity)
                    }
                    handleAdBtnColorChange={color =>
                      this.handleAdBtnColorChange(color)
                    }
                    handleAdBtnBgColorChange={color =>
                      this.handleAdBtnBgColorChange(color)
                    }
                    handleH5pChange={file => this.handleH5pChange(file)}
                    handleH5pBgColorChange={color =>
                      this.handleH5pBgColorChange(color)
                    }
                  />
                </div>
              </div>
              <div style={editPhoneContainerStyle}>
                <div style={pageNumContainerStyle}>
                  <div style={tableContainerStyle}>
                    <div
                      style={Object.assign(
                        {},
                        txtCenterStyle,
                        tableWrapperStyle
                      )}
                    >
                      <p
                        className={
                          Experience.IsPageCarouselMenuOpen
                            ? 'dx_opacity_visible dx_flow'
                            : 'dx_opacity_hidden dx_flow'
                        }
                        style={pageNumStyle}
                      >
                        {Experience.NewPage.Title}
                      </p>
                      <div
                        style={rootIndicatorContainerStyle}
                        onClick={() => this.handleSetRootPage()}
                      >
                        <a className="dx_root_indicator dx_tool_tip">
                          <Home style={rootIndicatorStyle} />
                          <span class="dx_tool_tip_text">
                            {Experience.NewPage.IsRoot
                              ? 'Home page (default)'
                              : 'set this page as home page'}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={phoneContainerStyle} ref="dx_phone_area">
                  <div style={phoneWrapperStyle}>
                    {this.renderPhoneElement()}
                    <PhoneTarget />
                  </div>
                </div>
                <div style={pageNumContainerStyle}>
                  <div style={tableContainerStyle}>
                    <div
                      style={Object.assign(
                        {},
                        txtCenterStyle,
                        tableWrapperStyle
                      )}
                    >
                      <p
                        className={
                          !Experience.IsPageCarouselMenuOpen
                            ? 'dx_opacity_visible dx_flow'
                            : 'dx_opacity_hidden dx_flow'
                        }
                        style={pageNumStyle}
                      >
                        {Experience.NewPage.Title}
                      </p>
                    </div>
                  </div>
                </div>
                <div style={controlContainerStyle}>
                  <div style={leftControlContainerStyle}>
                    <div style={tableContainerStyle}>
                      <div
                        style={Object.assign(
                          {},
                          txtCenterStyle,
                          tableWrapperStyle
                        )}
                      >
                        <a
                          style={leftBtnContainerStyle}
                          className="dx_exp_view_mode dx_tool_tip"
                        >
                          <img
                            style={controlIconStyle}
                            src={require('../../../../../assets/images/build_on_icon.png')}
                          />
                          <span class="dx_tool_tip_text">EDITOR</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div style={rightControlContainerStyle}>
                    <div style={tableContainerStyle}>
                      <div
                        style={Object.assign(
                          {},
                          txtCenterStyle,
                          tableWrapperStyle
                        )}
                      >
                        <a
                          style={rightBtnContainerStyle}
                          className="dx_exp_view_mode dx_tool_tip"
                          onClick={() => this.handleTogglePreviewExperience()}
                        >
                          <img
                            style={controlIconStyle}
                            src={
                              TogglePreview
                                ? require('../../../../../assets/images/eye_on_icon.png')
                                : require('../../../../../assets/images/eye_off_icon.png')
                            }
                          />
                          <span class="dx_tool_tip_text">PREVIEW</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={Object.assign({}, carouselContainerStyle, {
              height: !Experience.IsPageCarouselMenuOpen
                ? carouselHeight
                : expandCarouselHeight
            })}
            className="dx_float_carousel_menu"
          >
            <div style={carouselWrapperStyle}>
              <div
                style={carouselLabelContainerStyle}
                onClick={() => this.handleCarouselClick(true)}
              >
                <span style={carouselLabelStyle}>
                  {Experience.NewPage.Title}
                  <KeyboardArrowDown
                    className={
                      !Experience.IsPageCarouselMenuOpen
                        ? 'dx_arrow_up_down active_up'
                        : 'dx_arrow_up_down'
                    }
                    style={carouselIconStyle}
                  />
                </span>
              </div>
              {Experience.IsPageCarouselMenuOpen ? (
                <div style={carouselSlideContainerStyle}>
                  <PageCarousel
                    experience={Experience}
                    handleClickActivePage={pageGUID =>
                      this.handleClickActiveCarouselPage(pageGUID)
                    }
                    handleConfirmDeleteCarouselPage={pageGUID =>
                      this.handleConfirmDeleteCarouselPage(pageGUID)
                    }
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <DxModal
          open={this.state.isModalOpen}
          title={this.state.modalTitle}
          hasBottomDiv={true}
          description="Do you want to proceed?"
          cancel={true}
          confirm={true}
          isDanger={this.state.modalType == 'DELETE' ? true : false}
          handleConfirm={() => this.handleConfirmModal()}
          onCloseModal={() => this.handleCloseModal()}
        />
        {TogglePreview ? (
          <DxPreviewModal
            open={TogglePreview}
            experienceGUID={Experience.ExperienceGUID}
            onCloseModal={() => this.handleTogglePreviewExperience()}
          />
        ) : null}
      </div>
    );
  }
}

const dndHeight = 600;
const carouselHeight = 48;
const expandCarouselHeight = 240;
const phoneHeight = 470;
const styles = {
  mainContainerStyle: {
    width: sizes.dxWidth,
    height: `calc(100vh - ${sizes.headerHeight})`,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  txtCenterStyle: {
    textAlign: 'center'
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
  hiddenLeftContainerStyle: {
    width: 0
  },
  leftContainerStyle: {
    flex: 1
  },
  leftDocContainerStyle: {
    flex: 2
  },
  leftWrapperStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  docContainerStyle: {
    width: '100%',
    height: `calc(100vh - ${sizes.headerHeight})`,
    borderTop: '0.5px solid',
    borderColor: colors.borderColor,
    boxSizing: 'border-box',
    overflowY: 'auto'
  },
  dropZoneContainerStyle: {
    width: 360,
    height: dndHeight,
    margin: '0 auto'
  },
  dropZoneStyle: {
    width: 360,
    height: 240,
    borderRadius: 12,
    border: '1px dotted',
    borderColor: colors.borderColor,
    cursor: 'pointer',
    textAlign: 'center'
  },
  dropLabelStyle: {
    margin: 0,
    fontSize: fonts.h3,
    color: colors.labelColor,
    marginBottom: 24
  },
  dropSubLabelStyle: {
    margin: 0,
    fontSize: fonts.h3,
    color: colors.blueColor
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
    paddingBottom: carouselHeight,
    position: 'relative'
  },
  toolbarContainerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 60,
    width: '100%',
    zIndex: 999
  },
  editPhoneContainerStyle: {
    margin: '0 auto'
  },
  phoneContainerStyle: {
    height: phoneHeight,
    backgroundColor: 'transparent',
    margin: '0 auto',
    overflowY: 'auto'
  },
  phoneWrapperStyle: {
    width: 320,
    height: phoneHeight,
    margin: '0 auto',
    backgroundColor: colors.lightBlueColor,
    textAlign: 'left',
    boxSizing: 'border-box'
  },
  pageNumContainerStyle: {
    position: 'relative',
    height: 24,
    width: 320,
    margin: '0 auto'
  },
  rootIndicatorContainerStyle: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 24,
    width: 24,
    cursor: 'pointer'
  },
  rootIndicatorStyle: {
    width: 24,
    color: colors.orangeColor
  },
  pageNumStyle: {
    width: 320 - 72,
    paddingLeft: 36,
    paddingRight: 36,
    textAlign: 'center',
    fontSize: fonts.h4,
    color: colors.lightGreyColor,
    margin: '0 auto',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  controlContainerStyle: {
    height: 48,
    width: 400,
    margin: '0 auto',
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row'
  },
  leftControlContainerStyle: {
    flex: 1
  },
  leftBtnContainerStyle: {
    height: 48,
    width: 48,
    margin: '0 auto',
    borderRadius: 6,
    display: 'block',
    cursor: 'pointer'
  },
  rightControlContainerStyle: {
    flex: 1
  },
  rightBtnContainerStyle: {
    height: 48,
    width: 48,
    margin: '0 auto',
    borderRadius: 6,
    display: 'block',
    cursor: 'pointer'
  },
  controlIconStyle: {
    display: 'block',
    width: 48,
    height: 48,
    borderRadius: 6
  },
  carouselContainerStyle: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: colors.blackColor,
    cursor: 'pointer',
    zIndex: 999
  },
  carouselWrapperStyle: {
    position: 'relative',
    height: '100%'
  },
  carouselLabelContainerStyle: {
    paddingTop: 12,
    paddingBottom: 12
  },
  carouselLabelStyle: {
    display: 'inline-block',
    maxWidth: 360,
    color: colors.whiteColor,
    fontSize: fonts.h4,
    position: 'relative',
    paddingRight: 24,
    paddingLeft: 18,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  carouselIconStyle: {
    color: colors.whiteColor,
    fontSize: 24,
    position: 'absolute',
    right: 0,
    top: -6
  },
  carouselSlideContainerStyle: {
    position: 'relative',
    height: 180,
    width: 'calc(100% - 60px)',
    margin: '0 auto'
  },

  previewContainerStyle: {
    backgroundColor: colors.blackColor,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100vh',
    width: '100vw',
    zIndex: 999
  },
  previewStyle: {
    marginTop: 24,
    height: phoneHeight,
    width: 318,
    border: 'none',
    outline: 'none'
  }
};

const stateToProps = state => {
  return {
    // PREVIEW
    TogglePreview: state.newexperience.TogglePreview,
    IsPreview: state.newexperience.IsPreview,
    IsFilesUploaded: state.newexperience.IsFilesUploaded,
    IsFilesUpdated: state.newexperience.IsFilesUpdated,

    PageTemplates: state.newexperience.PageTemplates,
    GoogleDocuments: state.newexperience.GoogleDocuments,
    Experience: state.newexperience.Experience,
    ActiveElemType: state.newexperience.ActiveElemType
  };
};

const dispatchToProps = {
  // PREVIEW
  dxExperienceUploadFileAction,
  dxExperienceUpdateFileAction,
  dxExperiencePreviewAction,
  dxExperiencePreviewCloseAction,

  // CREATE
  dxExperiencePageTemplateFetchAction,
  dxExperiencePageSetRootPageAction,

  dxExperiencePageCarouselMenuUpdateAction,
  dxExperiencePageCarouselActivePageAction,

  dxExperienceUploadGoogleFileAction,
  dxExperiencePageDocPanelToggleAction,
  dxExperiencePageAddElemAction,
  dxExperiencePageDeleteElemAction,
  dxExperiencePageCopyElemAction,
  dxExperiencePageShuffleElemAction,
  dxExperiencePageSelectElemAction,
  dxExperiencePageSelectElemByTypeAction,
  dxExperiencePageUnSelectElemByTypeAction,
  dxExperiencePageUpdateElemAction,
  dxExperiencePageSectionConnectPageAction,
  dxExperiencePageDeletePageAction,

  // UPDATE
  dxExperienceViewHtmlFetchAction,

  dxAlertAction,
  dxLoadingAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(DragDropContext(HTML5Backend)(ExperiencePages));

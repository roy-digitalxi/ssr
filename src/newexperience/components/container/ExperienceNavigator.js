import React, { Component } from 'react';

// components
import NavBar from '../../../components/navBar/NavBar';
import DxModal from '../../../components/dxModal/DxModal';

// helpers
import { search_object_index_by_value } from '../../../helpers';

// redux
import { connect } from 'react-redux';
import {
  // CREATE
  dxExperienceCreate as dxExperienceCreateAction,
  dxExperienceUploadFile as dxExperienceUploadFileAction,
  dxExperienceIndexUpdate as dxExperienceIndexUpdateAction,
  dxExperienceTitleUpdate as dxExperienceTitleUpdateAction,
  dxExperienceCardTemplateMenuUpdate as dxExperienceCardTemplateMenuUpdateAction,
  dxExperienceCardTemplateSave as dxExperienceCardTemplateSaveAction,
  dxExperiencePagePagesSave as dxExperiencePagePagesSaveAction,
  dxExperiencePageTemplateMenuUpdate as dxExperiencePageTemplateMenuUpdateAction,
  dxExperiencePageTemplateOptionSelect as dxExperiencePageTemplateOptionSelectAction,
  dxExperiencePageAddPage as dxExperiencePageAddPageAction,

  // UPDATE
  dxExperienceUpdateFile as dxExperienceUpdateFileAction,
  dxExperienceUpdate as dxExperienceUpdateAction
} from '../../actions';
import {
  dxAlert as dxAlertAction,
  dxLoading as dxLoadingAction
} from '../../../actions';

import { findWithAttr } from '../../../helpers';

class ExperienceNavigator extends Component {
  state = {
    isModalOpen: false,
    modalTitle: null,
    modalType: 'EXPERIENCE'
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.IsPreview) {
      // CREATE
      if (nextProps.IsFilesUploaded && !this.props.IsFilesUploaded) {
        this.props.dxExperienceCreateAction(this.props.Experience);
      }
      // UPDATE
      if (nextProps.IsFilesUpdated && !this.props.IsFilesUpdated) {
        this.props.dxExperienceUpdateAction(this.props.Experience);
      }
    }
    // EXIT
    if (nextProps.IsCompleted && !this.props.IsCompleted) {
      const { navArr } = this.props;
      let index = findWithAttr(navArr, 'type', 'EXPERIENCES');
      this.props.history.push(`/dashboard/${index}`);
    }
  }

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleGoback = () => {
    const { Experience } = this.props;

    if (Experience.Index == 0) {
      const { navArr } = this.props;
      let index = findWithAttr(navArr, 'type', 'EXPERIENCES');
      this.props.history.push(`/dashboard/${index}`);
    } else if (Experience.Index == 1) {
      this.props.dxExperienceIndexUpdateAction(0);
    } else if (Experience.Index == 2) {
      this.props.dxExperienceIndexUpdateAction(0);
    }
  };

  saveExperience = () => {
    const { Experience } = this.props;
    let experienceGUID = Experience.ExperienceGUID;
    // CREATE
    if (!experienceGUID)
      this.props.dxExperienceUploadFileAction(Experience, false);
    // UPDATE
    else this.props.dxExperienceUpdateFileAction(Experience, false);
  };

  handleSaveBtnClick = () => {
    let { Experience } = this.props;

    if (Experience.Index == 0) {
      let { IsWarning, IsError, Message } = this.validateExperience(Experience);
      if (IsWarning) {
        this.setState({
          isModalOpen: true,
          modalTitle: Message,
          modalType: 'EXPERIENCE'
        });
      } else {
        if (IsError) {
          this.props.dxAlertAction(true, IsError, Message);
          return;
        }
        this.saveExperience();
      }
    } else if (Experience.Index == 1) {
      let { IsError, Message } = this.validateExperienceCard(
        Experience.CardTemplate,
        Experience.CardTitle
      );
      this.props.dxAlertAction(true, IsError, Message);
      if (!IsError) this.props.dxExperienceCardTemplateSaveAction();
    } else if (Experience.Index == 2) {
      let { IsWarning, IsError, Message } = this.validateExperiencePages(
        Experience.Pages
      );
      if (IsWarning) {
        this.setState({
          isModalOpen: true,
          modalTitle: Message,
          modalType: 'EXPERIENCE_PAGE'
        });
      } else {
        this.props.dxAlertAction(true, IsError, Message);
        if (!IsError) this.props.dxExperiencePagePagesSaveAction();
      }
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
      if (!IsPagesSaved) {
        res.Message = 'Please create & save your page(s)';
        return res;
      }
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

  handleConfirmModal = () => {
    this.setState({
      isModalOpen: false
    });
    if (this.state.modalType == 'EXPERIENCE') {
      this.saveExperience();
    } else {
      this.props.dxExperiencePagePagesSaveAction();
    }
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

  handleCardTemplateMenuToggle = () => {
    let toggle = !this.props.Experience.IsCardTemplateMenuOpen;
    this.props.dxExperienceCardTemplateMenuUpdateAction(toggle);
  };

  handlePageTemplateMenuToggle = () => {
    let toggle = !this.props.Experience.IsPageTemplateMenuOpen;
    this.props.dxExperiencePageTemplateMenuUpdateAction(toggle);
  };

  handleSelectPageElemOption = val => {
    this.props.dxExperiencePageTemplateOptionSelectAction(val);
  };

  handleTitleChange = e => {
    const { Experience } = this.props;
    let content = e.target.value;
    if (Experience.Index == 0) {
      if (content && content.length > 255) {
        return;
      }
      this.props.dxExperienceTitleUpdateAction('EXPERIENCE', content);
    } else if (Experience.Index == 1) {
      this.props.dxExperienceTitleUpdateAction('CARD', content);
    } else if (Experience.Index == 2) {
      this.props.dxExperienceTitleUpdateAction('PAGE', content);
    }
  };

  handleAddNewPage = () => {
    this.props.dxExperiencePageAddPageAction();
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
    // 10. H5P
    let unconnectedH5ps = this.findUnconnectedElems(displayPages, 'H5P');
    if (unconnectedH5ps.length > 0) {
      res.Message = `${this.printUnconnectedElems(unconnectedH5ps, 'H5P')}`;
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
        } else if (type == 'H5P') {
          if (section.Type == 'H5P' && !section.H5p) {
            output.push({
              page,
              section
            });
          }
          if (section.Type == 'H5P') {
            if (!section.H5pLabel) {
              output.push({
                page,
                section
              });
            }
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
    return (
      <div>
        <NavBar
          isRoute={false}
          navType="EXPERIENCE"
          experience={this.props.Experience}
          handleGoback={() => this.handleGoback()}
          handleSaveBtnClick={() => this.handleSaveBtnClick()}
          handleInputChange={e => this.handleTitleChange(e)}
          handleCardTemplateMenu={() => this.handleCardTemplateMenuToggle()}
          handlePageTemplateMenu={() => this.handlePageTemplateMenuToggle()}
          handleSelectPageElemOption={val =>
            this.handleSelectPageElemOption(val)
          }
          handleAddNewPage={() => this.handleAddNewPage()}
        />
        <DxModal
          open={this.state.isModalOpen}
          title={this.state.modalTitle}
          hasBottomDiv={true}
          description="Do you want to proceed?"
          cancel={true}
          confirm={true}
          isDanger={false}
          handleConfirm={() => this.handleConfirmModal()}
          onCloseModal={() => this.handleCloseModal()}
        />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    navArr: state.root.navArr,
    history: state.root.history,
    IsPreview: state.newexperience.IsPreview,
    IsCompleted: state.newexperience.IsCompleted,
    IsFilesUploaded: state.newexperience.IsFilesUploaded,
    IsFilesUpdated: state.newexperience.IsFilesUpdated,
    Experience: state.newexperience.Experience
  };
};

const dispatchToProps = {
  // CREATE
  dxExperienceCreateAction,
  dxExperienceUploadFileAction,

  dxExperienceIndexUpdateAction,
  dxExperienceTitleUpdateAction,
  dxExperienceCardTemplateMenuUpdateAction,
  dxExperienceCardTemplateSaveAction,

  dxExperiencePagePagesSaveAction,
  dxExperiencePageTemplateMenuUpdateAction,
  dxExperiencePageTemplateOptionSelectAction,
  dxExperiencePageAddPageAction,

  // UPDATE
  dxExperienceUpdateFileAction,
  dxExperienceUpdateAction,

  dxAlertAction,
  dxLoadingAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(ExperienceNavigator);

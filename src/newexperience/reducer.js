import {
  // PREVIEW
  EXPERIENCE_PREVIEW__SUCCEEDED,
  EXPERIENCE_PREVIEW__FAILED,
  EXPERIENCE_PREVIEW_CLOSE_REQUESTED,

  // CREATE EXPERIENCE
  EXPERIENCE_INITIAL__SUCCEEDED,
  EXPERIENCE_CREATE__SUCCEEDED,
  EXPERIENCE_UPLOAD_FILE__SUCCEEDED,
  EXPERIENCE_UPLOAD_GOOGLE_FILE__SUCCEEDED,
  EXPERIENCE_TYPE__SUCCEEDED,
  EXPERIENCE_TYPE_UPDATE__SUCCEEDED,
  EXPERIENCE_INDEX_UPDATE__SUCCEEDED,
  EXPERIENCE_TITLE_UPDATE__SUCCEEDED,
  EXPERIENCE_CARD_TEMPLATE_TOGGLE__SUCCEEDED,
  EXPERIENCE_CARD_TEMPLATE_FETCH__SUCCEEDED,
  EXPERIENCE_CARD_TEMPLATE_SELECT__SUCCEEDED,
  EXPERIENCE_CARD_TEMPLATE_ELEM_SELECT__SUCCEEDED,
  EXPERIENCE_CARD_TEMPLATE_UPDATE_IMAGE__SUCCEEDED,
  EXPERIENCE_CARD_TEMPLATE_UPDATE_COLOR__SUCCEEDED,
  EXPERIENCE_CARD_TEMPLATE_UPDATE_OPACITY__SUCCEEDED,
  EXPERIENCE_CARD_TEMPLATE_UPDATE_CONTENT__SUCCEEDED,
  EXPERIENCE_CARD_TEMPLATE_SAVE__SUCCEEDED,
  EXPERIENCE_CARD_TEMPLATE_REMOVE__SUCCEEDED,
  EXPERIENCE_PAGE_PAGES_SAVE__SUCCEEDED,
  EXPERIENCE_PAGE_PAGES_REMOVE__SUCCEEDED,
  EXPERIENCE_PAGE_SET_ROOT__SUCCEEDED,
  EXPERIENCE_PAGE_DOC_PANEL_TOGGLE__SUCCEEDED,
  EXPERIENCE_PAGE_TEMPLATE_TOGGLE__SUCCEEDED,
  EXPERIENCE_PAGE_TEMPLATE_OPTION_SELECT__SUCCEEDED,
  EXPERIENCE_PAGE_TEMPLATE_FETCH__SUCCEEDED,
  EXPERIENCE_PAGE_CAROUSEL_TOGGLE__SUCCEEDED,
  EXPERIENCE_PAGE_CAROUSEL_ACTIVE__SUCCEEDED,
  EXPERIENCE_PAGE_ADD_PAGE__SUCCEEDED,
  EXPERIENCE_PAGE_DELETE_PAGE__SUCCEEDED,
  EXPERIENCE_PAGE_ADD_ELEM__SUCCEEDED,
  EXPERIENCE_PAGE_DELETE_ELEM__SUCCEEDED,
  EXPERIENCE_PAGE_COPY_ELEM__SUCCEEDED,
  EXPERIENCE_PAGE_SHUFFLE_ELEM__SUCCEEDED,
  EXPERIENCE_PAGE_SELECT_ELEM__SUCCEEDED,
  EXPERIENCE_PAGE_SELECT_ELEM_BY_TYPE__SUCCEEDED,
  EXPERIENCE_PAGE_UNSELECT_ELEM_BY_TYPE__SUCCEEDED,
  EXPERIENCE_PAGE_UPDATE_ELEM__SUCCEEDED,
  EXPERIENCE_PAGE_ELEM_CONNECT_PAGE__SUCCEEDED,

  // UPDATE EXPERIENCE
  EXPERIENCE_VIEW__SUCCEEDED,
  EXPERIENCE_VIEW_HTML_FETCH__SUCCEEDED,
  EXPERIENCE_UPDATE_FILE__SUCCEEDED,
  EXPERIENCE_UPDATE__SUCCEEDED
} from './constants';

// Function
Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};

// Libraries
const update = require('immutability-helper');

// helpers
import { search_object_index_by_value } from '../helpers';
import { uuid } from '../helpers/tools';

let templateCard = {
  CardGUID: null,
  Content: null, // card content
  Settings: [], // card settings
  Title: null, // display card title desc
  Type: null // card type
};
let templateNewPage = {
  PageGUID: null,
  ParentPageGUID: null,
  IsRoot: false, // root page
  IsSplash: false, // splash
  Title: '', // page title
  Sections: [], // page sections
  IsConnected: false // page connected
};
let templateNewSection = {
  SectionGUID: null,
  Type: null, // section type
  IsActive: false, // section active
  HtmlContent: '', // html content
  BtnContent: '', // btn label
  ConnectedPageGUID: null, // btn connect page guid
  Pdf: null, // pdf file path
  PdfLabel: null, // pdf label
  PdfFileName: null, // pdf file name
  PdfBgColor: '#ffffff', // pdf bg color
  SplashContent: `<p class="ql-align-center"><span style="color: rgb(255, 255, 255);">Splash image with page title</span></p>`, // splash content
  SplashImg: null, // splash img
  SplashColor: '#ffffff', // splash color
  SplashOpacityColor: '#000000', // splash opacity color
  SplashOpacity: 30, // splash opacity
  VideoInput: null, // video input
  VideoUrl: null, // video url
  Img: null, // img
  ImgOpacityColor: '#000000', // img opacity color
  ImgOpacity: 0, // img opacity
  LinkInput: null, // link input
  Link: null, // link
  LinkLabel: null, // link label
  LinkBgColor: '#ffffff', // link bg color
  AdBtnImg: null, // ad btn img
  AdBtnImgOpacityColor: '#000000', // ad btn img opacity color
  AdBtnImgOpacity: 40, // ad btn img opacity
  AdBtnColor: '#000000', // ad btn color
  AdBtnBgColor: '#ffffff', // ad btn bg color
  H5p: null, // h5p
  H5pLabel: null, // h5p label
  H5pFileName: null, // h5p file name
  H5pBgColor: '#ffffff', // h5p bg color
  Height: 0, // img height
  Width: 0, // img width
  PageGUID: null
};
const initialState = {
  IsPreview: false,
  TogglePreview: false,

  IsCompleted: false, // complete experience
  IsFilesUploaded: false, // upload html files
  IsFilesUpdated: false, // update html files
  CardTemplates: [], // card templates
  PageTemplates: [], // page templates
  GoogleDocuments: [], // google document arr

  ActiveCardTemplate: {}, // active card template
  ActiveElemType: null, // properties bar

  Experience: {
    ExperienceGUID: null,
    UpdateExperienceCardGUID: null,
    Type: '0', // with OR without page(s)
    Index: '0', // step

    IsCardTemplateMenuOpen: true, // card template menu
    IsCardTemplateSaved: false, // card saved
    CardTemplate: null, // card template
    Card: null, // card storage

    IsPageTemplateMenuOpen: true, // page template menu
    IsPagesSaved: false, // page saved
    ActivePageTemplateOptionIndex: 0, // page template menu option 0 OR 1

    IsPageCarouselMenuOpen: false, // page carousel menu

    ExperienceTitle: 'New Experience', // experience title
    CardTitle: 'Card 1', // experience card title

    Pages: [], // pages
    NewPage: Object.assign({}, templateNewPage), // current working page
    ActivePageSectionIndex: 0 // active section on a page
  }
};

const newexperienceReducer = (
  previousState = initialState,
  { type, payload }
) => {
  let updated = Object.assign({}, previousState);
  let tmpGoogleDocuments = Object.assign([], updated.GoogleDocuments);
  let tmpExperience = Object.assign({}, updated.Experience);
  let tmpCardTemplate = Object.assign({}, tmpExperience.CardTemplate);
  let tmpPages = Object.assign([], tmpExperience.Pages);
  let tmpNewPage = Object.assign({}, tmpExperience.NewPage);
  let tmpNewPageSections = Object.assign([], tmpNewPage.Sections);
  let tmpActiveCardTemplate = Object.assign({}, updated.ActiveCardTemplate);

  let tmpIsRootPage;
  let tmpConnectedPageGUID;
  let tmpConnectedPage;
  let tmpSettingIndex;
  let tmpPageGUID;
  let tmpPagesLength;
  let tmpSections;
  let tmpRootPage;
  let tmpUpdatePage;
  let tmpNewSection;
  let tmpCopySection;
  let tmpHoverIndex, tmpDragIndex;
  let tmpDragSection, tmpHoverSection;
  let tmpActiveSectionIndex;
  let tmpSectionIndex;
  let tmpUpdateSection;
  let tmpSearchCardTemplateSetting;
  let tmpDeletePageIndex;

  switch (type) {
    // PREVIEW EXPERIENCE
    case EXPERIENCE_PREVIEW__SUCCEEDED:
      updated.TogglePreview = true;
      updated.IsPreview = false;
      updated.IsFilesUploaded = false;
      updated.IsFilesUpdated = false;
      updated.Experience.ExperienceGUID = payload.experienceGUID;
      updated.Experience.UpdateExperienceCardGUID = payload.experienceCardGUID;
      updated.ActiveElemType = null;
      return updated;

    case EXPERIENCE_PREVIEW__FAILED:
      updated.IsPreview = false;
      updated.IsFilesUploaded = false;
      updated.IsFilesUpdated = false;
      return updated;

    case EXPERIENCE_PREVIEW_CLOSE_REQUESTED:
      updated.TogglePreview = false;
      updated.IsPreview = false;
      updated.IsFilesUploaded = false;
      updated.IsFilesUpdated = false;
      return updated;

    // CREATE EXPERIENCE
    case EXPERIENCE_INITIAL__SUCCEEDED:
      tmpExperience = {
        Type: '0',
        Index: '0',
        IsCardTemplateMenuOpen: true,
        IsCardTemplateSaved: false,
        CardTemplate: null,
        Card: null,
        IsPageTemplateMenuOpen: true,
        IsPagesSaved: false,
        ActivePageTemplateOptionIndex: 0,
        IsPageCarouselMenuOpen: false,
        ExperienceTitle: 'New Experience',
        CardTitle: 'Card 1',
        Pages: [],
        NewPage: Object.assign({}, templateNewPage),
        ActivePageSectionIndex: 0
      };
      updated.IsPreview = false;
      updated.TogglePreview = false;
      updated.Experience = tmpExperience;
      updated.IsCompleted = false;
      updated.IsFilesUploaded = false;
      updated.ActiveElemType = null;
      return updated;

    case EXPERIENCE_CREATE__SUCCEEDED:
      tmpExperience = {
        Type: '0',
        Index: '0',
        IsCardTemplateMenuOpen: true,
        IsCardTemplateSaved: false,
        CardTemplate: null,
        Card: null,
        IsPageTemplateMenuOpen: true,
        IsPagesSaved: false,
        ActivePageTemplateOptionIndex: 0,
        IsPageCarouselMenuOpen: false,
        ExperienceTitle: 'New Experience',
        CardTitle: 'Card 1',
        Pages: [],
        NewPage: Object.assign({}, templateNewPage),
        ActivePageSectionIndex: 0
      };
      updated.IsPreview = false;
      updated.TogglePreview = false;
      updated.Experience = tmpExperience;
      updated.IsCompleted = true;
      return updated;

    case EXPERIENCE_UPLOAD_FILE__SUCCEEDED:
      updated.IsFilesUploaded = true;
      updated.Experience = payload.experience;
      updated.IsPreview = payload.isPreview;
      return updated;

    case EXPERIENCE_UPLOAD_GOOGLE_FILE__SUCCEEDED:
      tmpGoogleDocuments.push({
        googleFileGUID: payload.googleFileGUID,
        fileName: payload.fileName,
        isOpen: true
      });
      deactive_collapsible_panel_by_index(
        tmpGoogleDocuments,
        tmpGoogleDocuments.length - 1
      );
      updated.GoogleDocuments = tmpGoogleDocuments;
      return updated;

    case EXPERIENCE_TYPE__SUCCEEDED:
      tmpExperience.Type = payload.experienceType;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_TYPE_UPDATE__SUCCEEDED:
      tmpExperience.Type = payload.experienceType;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_INDEX_UPDATE__SUCCEEDED:
      // Navigation
      if (payload.experienceIndex == 2 && !updated.Experience.Pages.length) {
        tmpNewPage.PageGUID = uuid();
        tmpNewPage.IsRoot = true;
        tmpNewPage.Title = 'Page 1';
        tmpExperience.NewPage = tmpNewPage;
        tmpPages.push(tmpNewPage);
        tmpExperience.Pages = tmpPages;
      }
      tmpExperience.IsPageCarouselMenuOpen = false;
      tmpExperience.Index = payload.experienceIndex;
      updated.Experience = tmpExperience;

      // Clear current properties bar
      updated.ActiveElemType = null;
      return updated;

    case EXPERIENCE_TITLE_UPDATE__SUCCEEDED:
      if (payload.type == 'EXPERIENCE') {
        tmpExperience.ExperienceTitle = payload.title;
      } else if (payload.type == 'CARD') {
        tmpExperience.CardTitle = payload.title;
      } else if (payload.type == 'PAGE') {
        // update arr of pages
        tmpPageGUID = updated.Experience.NewPage.PageGUID;
        tmpUpdatePage = find_page_by_guid(tmpPageGUID, tmpPages);
        tmpUpdatePage.page.Title = payload.title;
        tmpPages[tmpUpdatePage.index] = tmpUpdatePage.page;
        tmpExperience.Pages = tmpPages;

        // update new page
        tmpNewPage.Title = payload.title;
        tmpExperience.NewPage = tmpNewPage;
      }
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_CARD_TEMPLATE_TOGGLE__SUCCEEDED:
      tmpExperience.IsCardTemplateMenuOpen = payload.toggle;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_CARD_TEMPLATE_FETCH__SUCCEEDED:
      updated.CardTemplates = payload.templates;
      return updated;

    case EXPERIENCE_CARD_TEMPLATE_SELECT__SUCCEEDED:
      tmpCardTemplate = Object.assign({}, templateCard);
      tmpCardTemplate.CardGUID = uuid();

      // Applied customized text color
      // Applied align style
      tmpSearchCardTemplateSetting = payload.template.Settings.filter(
        item => item.Type == 'TEXT'
      );
      if (tmpSearchCardTemplateSetting.length) {
        if (
          payload.template.Type === 'BACKGROUND_TEXT' ||
          payload.template.Type === 'BACKGROUND_IMAGE_TEXT'
        ) {
          tmpCardTemplate.Content = `<p class="ql-align-center"><span style="color: ${
            tmpSearchCardTemplateSetting[0].Default
          };">${payload.template.Content}</span></p>`;
        } else {
          tmpCardTemplate.Content = `<p><span style="color: ${
            tmpSearchCardTemplateSetting[0].Default
          };">${payload.template.Content}</span></p>`;
        }
      } else {
        tmpCardTemplate.Content = payload.template.Content;
      }
      tmpCardTemplate.Settings = JSON.parse(
        JSON.stringify(payload.template.Settings)
      );
      tmpCardTemplate.Title = payload.template.Title;
      tmpCardTemplate.Type = payload.template.Type;

      tmpExperience.CardTemplate = tmpCardTemplate;
      updated.Experience = tmpExperience;
      updated.ActiveCardTemplate = tmpCardTemplate;
      updated.ActiveElemType = null;
      return updated;

    case EXPERIENCE_CARD_TEMPLATE_ELEM_SELECT__SUCCEEDED:
      updated.ActiveElemType = payload.elemType;
      return updated;

    case EXPERIENCE_CARD_TEMPLATE_UPDATE_IMAGE__SUCCEEDED:
      tmpCardTemplate.Settings[0].Default = payload.imgFile;
      tmpCardTemplate.Settings[0].Height = payload.height;
      tmpCardTemplate.Settings[0].Width = payload.width;
      tmpExperience.CardTemplate = tmpCardTemplate;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_CARD_TEMPLATE_UPDATE_COLOR__SUCCEEDED:
      tmpSettingIndex = search_object_index_by_value(
        tmpCardTemplate.Settings,
        payload.type
      );
      tmpCardTemplate.Settings[tmpSettingIndex].Default = payload.color;
      tmpExperience.CardTemplate = tmpCardTemplate;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_CARD_TEMPLATE_UPDATE_OPACITY__SUCCEEDED:
      tmpSettingIndex = search_object_index_by_value(
        tmpCardTemplate.Settings,
        'OPACITY'
      );
      tmpCardTemplate.Settings[tmpSettingIndex].Default = payload.opacity;
      tmpExperience.CardTemplate = tmpCardTemplate;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_CARD_TEMPLATE_UPDATE_CONTENT__SUCCEEDED:
      // Update card template
      tmpActiveCardTemplate.Content = payload.content;
      tmpExperience.CardTemplate = tmpActiveCardTemplate;
      updated.ActiveCardTemplate = tmpActiveCardTemplate;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_CARD_TEMPLATE_SAVE__SUCCEEDED:
      tmpExperience.Index = 0;
      tmpExperience.IsCardTemplateSaved = true;
      tmpExperience.Card = Object.assign({}, tmpCardTemplate);
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_CARD_TEMPLATE_REMOVE__SUCCEEDED:
      tmpExperience.IsCardTemplateSaved = false;
      tmpExperience.CardTemplate = null;
      tmpExperience.CardTitle = '';
      tmpExperience.Card = null;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_PAGE_PAGES_SAVE__SUCCEEDED:
      tmpExperience.Index = 0;
      tmpExperience.IsPagesSaved = true;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_PAGE_PAGES_REMOVE__SUCCEEDED:
      tmpExperience.IsPageTemplateMenuOpen = true;
      tmpExperience.IsPagesSaved = false;
      tmpExperience.ActivePageTemplateOptionIndex = 0;
      tmpExperience.IsPageCarouselMenuOpen = false;
      tmpExperience.Pages = [];
      tmpExperience.NewPage = Object.assign({}, templateNewPage);
      tmpExperience.ActivePageSectionIndex = 0;
      updated.Experience = tmpExperience;
      updated.ActiveElemType = null;
      return updated;

    case EXPERIENCE_PAGE_SET_ROOT__SUCCEEDED:
      // Unset root
      tmpRootPage = find_root_page(tmpPages);
      tmpUpdatePage = find_page_by_guid(tmpRootPage.PageGUID, tmpPages);
      tmpPages[tmpUpdatePage.index].IsRoot = false;
      // Set root
      tmpNewPage = find_page_by_guid(tmpNewPage.PageGUID, tmpPages);
      tmpPages[tmpNewPage.index].IsRoot = true;
      tmpPages[tmpNewPage.index].IsConnected = false;
      tmpPages[tmpNewPage.index].ParentPageGUID = null;
      tmpNewPage.page.IsRoot = true;
      tmpNewPage.page.IsConnected = false;
      tmpNewPage.page.ParentPageGUID = null;
      // Disconnect btn to target: new root page
      disconnect_button_connectors_by_root_page_guid(
        tmpPages,
        tmpNewPage.page.PageGUID
      );

      tmpExperience.Pages = tmpPages;
      tmpExperience.NewPage = tmpNewPage.page;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_PAGE_DOC_PANEL_TOGGLE__SUCCEEDED:
      tmpGoogleDocuments[payload.index].isOpen = payload.toggle;
      if (payload.toggle) {
        deactive_collapsible_panel_by_index(tmpGoogleDocuments, payload.index);
      }
      updated.GoogleDocuments = tmpGoogleDocuments;
      return updated;

    case EXPERIENCE_PAGE_TEMPLATE_TOGGLE__SUCCEEDED:
      tmpExperience.IsPageTemplateMenuOpen = payload.toggle;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_PAGE_TEMPLATE_OPTION_SELECT__SUCCEEDED:
      tmpExperience.ActivePageTemplateOptionIndex = payload.index;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_PAGE_TEMPLATE_FETCH__SUCCEEDED:
      updated.PageTemplates = payload.templates;
      return updated;

    case EXPERIENCE_PAGE_CAROUSEL_TOGGLE__SUCCEEDED:
      tmpExperience.IsPageCarouselMenuOpen = payload.toggle;
      updated.Experience = tmpExperience;
      updated.ActiveElemType = null;
      return updated;

    case EXPERIENCE_PAGE_CAROUSEL_ACTIVE__SUCCEEDED:
      tmpNewPage = find_page_by_guid(payload.pageGUID, tmpPages);
      tmpActiveSectionIndex = find_active_section_index(
        tmpNewPage.page.Sections
      );

      tmpExperience.NewPage = Object.assign({}, tmpNewPage.page);
      tmpExperience.ActivePageSectionIndex = tmpActiveSectionIndex;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_PAGE_ADD_PAGE__SUCCEEDED:
      tmpNewPage = Object.assign({}, templateNewPage);
      tmpNewPage.PageGUID = uuid();
      tmpNewPage.Title = `Page ${tmpPages.length + 1}`;
      tmpPages.push(tmpNewPage);

      tmpExperience.Pages = tmpPages;
      tmpExperience.NewPage = tmpNewPage;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_PAGE_DELETE_PAGE__SUCCEEDED:
      tmpNewPage = find_page_by_guid(payload.pageGUID, tmpPages);
      tmpDeletePageIndex = tmpNewPage.index;
      tmpIsRootPage = tmpNewPage.page.IsRoot;
      // Disconnect Parent Page if Button
      if (tmpNewPage.page.ParentPageGUID)
        disconnect_page_by_parent_page_guid(
          tmpNewPage.page.ParentPageGUID,
          tmpNewPage.page.PageGUID,
          tmpPages
        );
      // Disconnect Children Pages if Button
      tmpSections = tmpPages[tmpNewPage.index].Sections;
      disconnect_pages_by_sections(tmpSections, tmpPages);
      // Remove the target page
      tmpPages.splice(tmpDeletePageIndex, 1);
      // Total number of pages
      tmpPagesLength = tmpPages.length;
      if (!tmpPagesLength) {
        // check number of pages which existed and not deleted
        tmpNewPage = Object.assign({}, templateNewPage);
        tmpNewPage.IsRoot = true;
        tmpNewPage.PageGUID = uuid();
        tmpNewPage.Title = `Page ${tmpPagesLength + 1}`;
        tmpPages.push(tmpNewPage);
        tmpExperience.NewPage = tmpNewPage;
      } else {
        tmpPageGUID = find_previous_display_page_guid(tmpPages);
        tmpNewPage = find_page_by_guid(tmpPageGUID, tmpPages);
        // delete root page
        if (tmpIsRootPage) {
          tmpNewPage.page.IsRoot = true;
          tmpNewPage.page.ParentPageGUID = null;
          tmpNewPage.page.IsConnected = false;
        }
        tmpActiveSectionIndex = find_active_section_index(
          tmpNewPage.page.Sections
        );
        tmpExperience.ActivePageSectionIndex = tmpActiveSectionIndex;
        tmpExperience.NewPage = tmpNewPage.page;
      }

      tmpExperience.Pages = tmpPages;
      updated.Experience = tmpExperience;
      updated.ActiveElemType = null;
      return updated;

    case EXPERIENCE_PAGE_ADD_ELEM__SUCCEEDED:
      tmpUpdatePage = find_page_by_guid(tmpNewPage.PageGUID, tmpPages);
      if (!tmpUpdatePage.page.IsSplash || payload.type != 'SPLASH') {
        // only one splash per page
        tmpNewSection = Object.assign({}, templateNewSection);
        tmpNewSection.SectionGUID = uuid();
        tmpNewSection.PageGUID = tmpNewPage.PageGUID;
        tmpNewSection.Type = payload.type;
        tmpNewSection.IsActive = true;

        // default btn content
        if (payload.type == 'AD_BUTTON') {
          tmpNewSection.BtnContent = `<p><span style="color: rgb(255, 255, 255);">Text for a button</span></p>`;
          tmpNewSection.AdBtnColor = '#FFFFFF';
        } else if (payload.type == 'AD_BUTTON_2') {
          tmpNewSection.BtnContent = `<p><span style="color: rgb(0, 0, 0);">Text for a button</span></p>`;
        }

        // update new page
        deactive_other_sections(tmpNewSection.SectionGUID, tmpNewPageSections);
        if (payload.type == 'SPLASH') {
          // first elem of arr
          tmpNewPageSections.unshift(tmpNewSection);
        } else {
          tmpNewPageSections.push(tmpNewSection);
        }
        tmpActiveSectionIndex = find_active_section_index(tmpNewPageSections);
        tmpNewPage.Sections = tmpNewPageSections;
        if (payload.type == 'SPLASH') {
          tmpNewPage.IsSplash = true;
        }

        // update arr of pages
        tmpPages[tmpUpdatePage.index] = Object.assign({}, tmpNewPage);

        tmpExperience.Pages = tmpPages;
        tmpExperience.NewPage = tmpNewPage;
        tmpExperience.ActivePageSectionIndex = tmpActiveSectionIndex;
        updated.Experience = tmpExperience;
        updated.ActiveElemType = null;
      }
      return updated;

    case EXPERIENCE_PAGE_DELETE_ELEM__SUCCEEDED:
      tmpUpdatePage = find_page_by_guid(tmpNewPage.PageGUID, tmpPages);
      tmpSectionIndex = find_section_index_by_guid(
        tmpNewPage.Sections,
        payload.sectionGUID
      );

      // case: BUTTON
      if (
        (tmpNewPageSections[tmpSectionIndex].Type == 'BUTTON' ||
          tmpNewPageSections[tmpSectionIndex].Type == 'AD_BUTTON' ||
          tmpNewPageSections[tmpSectionIndex].Type == 'AD_BUTTON_2') &&
        tmpNewPageSections[tmpSectionIndex].ConnectedPageGUID != null
      ) {
        tmpConnectedPage = find_page_by_guid(
          tmpNewPageSections[tmpSectionIndex].ConnectedPageGUID,
          tmpPages
        );
        tmpConnectedPage.page.IsConnected = false;
        tmpConnectedPage.page.ParentPageGUID = null;
        tmpPages[tmpConnectedPage.index] = Object.assign(
          {},
          tmpConnectedPage.page
        );
      }
      // case: SPLASH
      if (tmpNewPageSections[tmpSectionIndex].Type == 'SPLASH') {
        tmpNewPage.IsSplash = false;
      }

      // update new page
      tmpNewPageSections.splice(tmpSectionIndex, 1);
      tmpNewPage.Sections = tmpNewPageSections;

      // update arr of pages
      tmpPages[tmpUpdatePage.index] = Object.assign({}, tmpNewPage);

      tmpExperience.Pages = tmpPages;
      tmpExperience.NewPage = tmpNewPage;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_PAGE_COPY_ELEM__SUCCEEDED:
      tmpUpdatePage = find_page_by_guid(tmpNewPage.PageGUID, tmpPages);
      tmpSectionIndex = find_section_index_by_guid(
        tmpNewPage.Sections,
        payload.sectionGUID
      );
      tmpCopySection = tmpUpdatePage.page.Sections[tmpSectionIndex];

      if (tmpCopySection.Type != 'SPLASH') {
        // only one splash per page
        tmpNewSection = Object.assign({}, tmpCopySection);
        tmpNewSection.SectionGUID = uuid();
        tmpNewSection.ConnectedPageGUID = null;
        tmpNewSection.IsActive = true;

        // update new page
        deactive_other_sections(tmpNewSection.SectionGUID, tmpNewPageSections);
        tmpNewPageSections.insert(tmpSectionIndex + 1, tmpNewSection); // insert after clone target
        tmpActiveSectionIndex = find_active_section_index(tmpNewPageSections);
        tmpNewPage.Sections = tmpNewPageSections;

        // update arr of pages
        tmpPages[tmpUpdatePage.index] = Object.assign({}, tmpNewPage);

        tmpExperience.Pages = tmpPages;
        tmpExperience.NewPage = tmpNewPage;
        tmpExperience.ActivePageSectionIndex = tmpActiveSectionIndex;
        updated.Experience = tmpExperience;
      }
      return updated;

    case EXPERIENCE_PAGE_SHUFFLE_ELEM__SUCCEEDED:
      tmpDragIndex = payload.dragIndex;
      tmpHoverIndex = payload.hoverIndex;

      tmpDragSection = tmpNewPage.Sections[tmpDragIndex];
      tmpHoverSection = tmpNewPage.Sections[tmpHoverIndex];
      if (tmpDragSection.Type != 'SPLASH' && tmpHoverSection.Type != 'SPLASH') {
        // update new page
        tmpNewPage = update(tmpNewPage, {
          Sections: {
            $splice: [[tmpDragIndex, 1], [tmpHoverIndex, 0, tmpDragSection]]
          }
        });
        tmpActiveSectionIndex = find_active_section_index(tmpNewPage.Sections);

        // update arr of pages
        tmpUpdatePage = find_page_by_guid(tmpNewPage.PageGUID, tmpPages);
        tmpPages[tmpUpdatePage.index] = Object.assign({}, tmpNewPage);

        tmpExperience.Pages = tmpPages;
        tmpExperience.NewPage = tmpNewPage;
        tmpExperience.ActivePageSectionIndex = tmpActiveSectionIndex;
        updated.Experience = tmpExperience;
      }
      return updated;

    case EXPERIENCE_PAGE_SELECT_ELEM__SUCCEEDED:
      deactive_other_sections(payload.sectionGUID, tmpNewPageSections);
      tmpActiveSectionIndex = find_active_section_index(tmpNewPageSections);

      tmpNewPage.Sections = tmpNewPageSections;
      tmpExperience.NewPage = tmpNewPage;
      tmpExperience.ActivePageSectionIndex = tmpActiveSectionIndex;
      updated.Experience = tmpExperience;
      updated.ActiveElemType = null;
      return updated;

    case EXPERIENCE_PAGE_SELECT_ELEM_BY_TYPE__SUCCEEDED:
      if (!tmpNewPageSections[updated.Experience.ActivePageSectionIndex]) {
        deactive_other_sections(payload.sectionGUID, tmpNewPageSections);
        tmpActiveSectionIndex = find_active_section_index(tmpNewPageSections);

        tmpNewPage.Sections = tmpNewPageSections;
        tmpExperience.NewPage = tmpNewPage;
        tmpExperience.ActivePageSectionIndex = tmpActiveSectionIndex;
        tmpExperience.IsPageCarouselMenuOpen = false;
        updated.Experience = tmpExperience;
        updated.ActiveElemType = null;
      } else {
        if (
          tmpNewPageSections[updated.Experience.ActivePageSectionIndex]
            .SectionGUID == payload.sectionGUID
        ) {
          deactive_other_sections(payload.sectionGUID, tmpNewPageSections);
          tmpActiveSectionIndex = find_active_section_index(tmpNewPageSections);

          tmpNewPage.Sections = tmpNewPageSections;
          tmpExperience.NewPage = tmpNewPage;
          tmpExperience.ActivePageSectionIndex = tmpActiveSectionIndex;
          tmpExperience.IsPageCarouselMenuOpen = false;
          updated.Experience = tmpExperience;
          updated.ActiveElemType = payload.elemType;
        } else {
          deactive_other_sections(payload.sectionGUID, tmpNewPageSections);
          tmpActiveSectionIndex = find_active_section_index(tmpNewPageSections);

          tmpNewPage.Sections = tmpNewPageSections;
          tmpExperience.NewPage = tmpNewPage;
          tmpExperience.ActivePageSectionIndex = tmpActiveSectionIndex;
          tmpExperience.IsPageCarouselMenuOpen = false;
          updated.Experience = tmpExperience;
          updated.ActiveElemType = null;
        }
      }
      return updated;

    case EXPERIENCE_PAGE_UNSELECT_ELEM_BY_TYPE__SUCCEEDED:
      updated.ActiveElemType = null;
      return updated;

    case EXPERIENCE_PAGE_UPDATE_ELEM__SUCCEEDED:
      tmpUpdatePage = Object.assign({}, tmpNewPage);
      if (payload.pageGUID) {
        tmpUpdatePage = find_page_by_guid(payload.pageGUID, tmpPages).page;
      }
      tmpUpdateSection = find_section_by_guid(
        tmpUpdatePage.Sections,
        payload.sectionGUID
      );

      if (
        tmpUpdateSection.Type == payload.type ||
        [
          'BUTTON',
          'SPLASH_CONTENT',
          'SPLASH_IMG',
          'SPLASH_COLOR',
          'SPLASH_OPACITY_COLOR',
          'SPLASH_OPACITY',
          'IMAGE_OPACITY_COLOR',
          'IMAGE_OPACITY',
          'VIDEO_URL',
          'VIDEO_CONFIRM',
          'EMBED_PDF_LABEL',
          'EMBED_PDF_BG_COLOR',
          'LINK_COLOR',
          'LINK_URL',
          'LINK_CONFIRM',
          'LINK_LABEL',
          'LINK_BG_COLOR',
          'AD_BTN_IMAGE',
          'AD_BTN_IMAGE_OPACITY_COLOR',
          'AD_BTN_IMAGE_OPACITY',
          'AD_BTN_COLOR',
          'AD_BTN_BG_COLOR',
          'H5P_LABEL',
          'H5P_BG_COLOR'
        ].indexOf(payload.type) != -1
      ) {
        switch (payload.type) {
          case 'EDITOR':
            tmpUpdateSection.HtmlContent = payload.content;
            break;
          case 'BUTTON':
            tmpUpdateSection.BtnContent = payload.content;
            break;
          case 'EMBED_PDF':
            tmpUpdateSection.Pdf = payload.content;
            tmpUpdateSection.PdfLabel = payload.fileName;
            tmpUpdateSection.PdfFileName = payload.fileName;
            break;
          case 'EMBED_PDF_LABEL':
            tmpUpdateSection.PdfLabel = payload.content;
            break;
          case 'EMBED_PDF_BG_COLOR':
            tmpUpdateSection.PdfBgColor = payload.content;
            break;
          case 'SPLASH_CONTENT':
            tmpUpdateSection.SplashContent = payload.content;
            break;
          case 'SPLASH_IMG':
            tmpUpdateSection.SplashImg = payload.content;
            tmpUpdateSection.Height = payload.height;
            tmpUpdateSection.Width = payload.width;
            break;
          case 'SPLASH_COLOR':
            tmpUpdateSection.SplashColor = payload.content;
            break;
          case 'SPLASH_OPACITY_COLOR':
            tmpUpdateSection.SplashOpacityColor = payload.content;
            break;
          case 'SPLASH_OPACITY':
            tmpUpdateSection.SplashOpacity = payload.content;
            break;
          case 'VIDEO_URL':
            tmpUpdateSection.VideoInput = payload.content;
            break;
          case 'VIDEO_CONFIRM':
            tmpUpdateSection.VideoUrl = tmpUpdateSection.VideoInput;
            break;
          case 'IMAGE':
            tmpUpdateSection.Img = payload.content;
            tmpUpdateSection.Height = payload.height;
            tmpUpdateSection.Width = payload.width;
            break;
          case 'IMAGE_OPACITY_COLOR':
            tmpUpdateSection.ImgOpacityColor = payload.content;
            break;
          case 'IMAGE_OPACITY':
            tmpUpdateSection.ImgOpacity = payload.content;
            break;
          case 'LINK_URL':
            tmpUpdateSection.LinkInput = payload.content;
            break;
          case 'LINK_CONFIRM':
            tmpUpdateSection.Link = tmpUpdateSection.LinkInput;
            tmpUpdateSection.LinkLabel = tmpUpdateSection.LinkInput;
            break;
          case 'LINK_LABEL':
            tmpUpdateSection.LinkLabel = payload.content;
            break;
          case 'LINK_BG_COLOR':
            tmpUpdateSection.LinkBgColor = payload.content;
            break;
          case 'AD_BTN_IMAGE':
            tmpUpdateSection.AdBtnImg = payload.content;
            tmpUpdateSection.Height = payload.height;
            tmpUpdateSection.Width = payload.width;
            break;
          case 'AD_BTN_IMAGE_OPACITY_COLOR':
            tmpUpdateSection.AdBtnImgOpacityColor = payload.content;
            break;
          case 'AD_BTN_IMAGE_OPACITY':
            tmpUpdateSection.AdBtnImgOpacity = payload.content;
            break;
          case 'AD_BTN_COLOR':
            tmpUpdateSection.AdBtnColor = payload.content;
            break;
          case 'AD_BTN_BG_COLOR':
            tmpUpdateSection.AdBtnBgColor = payload.content;
            break;
          case 'H5P':
            tmpUpdateSection.H5p = payload.content;
            tmpUpdateSection.H5pLabel = payload.fileName;
            tmpUpdateSection.H5pFileName = payload.fileName;
            break;
          case 'H5P_LABEL':
            tmpUpdateSection.H5pLabel = payload.content;
            break;
          case 'H5P_BG_COLOR':
            tmpUpdateSection.H5pBgColor = payload.content;
            break;
          default:
            break;
        }
        tmpExperience.NewPage = tmpUpdatePage;
        updated.Experience = tmpExperience;
      }
      return updated;

    case EXPERIENCE_PAGE_ELEM_CONNECT_PAGE__SUCCEEDED:
      tmpUpdateSection = find_section_by_guid(
        tmpNewPage.Sections,
        payload.sectionGUID
      );
      tmpConnectedPageGUID = tmpUpdateSection.ConnectedPageGUID;
      if (payload.pageGUID) {
        tmpUpdatePage = find_page_by_guid(payload.pageGUID, tmpPages);
        if (!tmpUpdatePage.page.IsRoot && !tmpUpdatePage.page.IsConnected) {
          // connect section
          tmpUpdateSection.ConnectedPageGUID = payload.pageGUID;
          // connect page
          tmpUpdatePage.page.ParentPageGUID = tmpNewPage.PageGUID;
          tmpUpdatePage.page.IsConnected = true;

          // disconnect page
          if (tmpConnectedPageGUID) {
            tmpConnectedPage = find_page_by_guid(
              tmpConnectedPageGUID,
              tmpPages
            );
            tmpConnectedPage.page.IsConnected = false;
            tmpConnectedPage.page.ParentPageGUID = null;
            tmpPages[tmpConnectedPage.index] = Object.assign(
              {},
              tmpConnectedPage.page
            );
          }

          // update arr of pages
          tmpPages[tmpUpdatePage.index] = Object.assign({}, tmpUpdatePage.page);
          tmpExperience.Pages = tmpPages;
          tmpExperience.NewPage = tmpNewPage;
          updated.Experience = tmpExperience;
        }
      } else {
        // disconnect page
        tmpUpdatePage = find_page_by_guid(
          tmpUpdateSection.ConnectedPageGUID,
          tmpPages
        );
        tmpUpdatePage.page.ParentPageGUID = null;
        tmpUpdatePage.page.IsConnected = false;
        // disconnect section
        tmpUpdateSection.ConnectedPageGUID = null;

        // update arr of pages
        tmpPages[tmpUpdatePage.index] = Object.assign({}, tmpUpdatePage.page);
        tmpExperience.Pages = tmpPages;
        tmpExperience.NewPage = tmpNewPage;
        updated.Experience = tmpExperience;
      }
      return updated;

    // UPDATE EXPERIENCE
    case EXPERIENCE_VIEW__SUCCEEDED:
      tmpExperience.ExperienceGUID = payload.experience.ExperienceGUID;
      tmpExperience.UpdateExperienceCardGUID =
        payload.experience.ExperienceCard.ExperienceCardGUID;
      tmpExperience.Type = payload.experience.ExperienceType;
      tmpExperience.IsCardTemplateSaved = true;
      tmpExperience.CardTemplate = payload.experience.ExperienceCard;
      tmpExperience.Card = payload.experience.ExperienceCard;
      tmpExperience.ExperienceTitle = payload.experience.ExperienceTitle;
      tmpExperience.IsPagesSaved = tmpExperience.Type == 0 ? false : true;
      tmpExperience.CardTitle = payload.experience.ExperienceCard.Title;
      tmpExperience.Pages = payload.experience.ExperiencePages;
      tmpExperience.NewPage = find_root_page(
        payload.experience.ExperiencePages
      );
      updated.Experience = tmpExperience;
      updated.IsFilesUpdated = false;
      updated.IsCompleted = false;

      // Version 2.0 change
      switch (payload.experience.ExperienceCard.Type) {
        case 'LEFT_IMAGE_TEXT':
          payload.experience.ExperienceCard.Title = 'Left Image with text';
          break;
        case 'RIGHT_IMAGE_TEXT':
          payload.experience.ExperienceCard.Title = 'Right Image with text';
          break;
        case 'BACKGROUND_TEXT':
          payload.experience.ExperienceCard.Title = 'Text with background';
          break;
        case 'BACKGROUND_IMAGE_TEXT':
          payload.experience.ExperienceCard.Title = 'Image with overlay text';
          break;
        case 'VIDEO':
          payload.experience.ExperienceCard.Title = 'Video';
          break;
        case 'IMAGE':
          payload.experience.ExperienceCard.Title = 'Image';
          break;
      }
      tmpActiveCardTemplate = payload.experience.ExperienceCard;
      updated.ActiveCardTemplate = tmpActiveCardTemplate;
      updated.IsPreview = false;
      updated.TogglePreview = false;
      updated.ActiveElemType = null;
      return updated;

    case EXPERIENCE_VIEW_HTML_FETCH__SUCCEEDED:
      tmpUpdatePage = find_page_by_guid(payload.pageGUID, tmpPages);
      tmpUpdateSection = find_section_by_guid(
        tmpUpdatePage.page.Sections,
        payload.sectionGUID
      );
      tmpUpdateSection.HtmlContent = payload.html;
      tmpUpdateSection.IsSyncServer = true;
      // update arr of pages
      tmpPages[tmpUpdatePage.index] = Object.assign({}, tmpUpdatePage.page);
      tmpExperience.Pages = tmpPages;
      updated.Experience = tmpExperience;
      return updated;

    case EXPERIENCE_UPDATE_FILE__SUCCEEDED:
      updated.IsFilesUpdated = true;
      updated.Experience = payload.experience;
      updated.IsPreview = payload.isPreview;
      return updated;

    case EXPERIENCE_UPDATE__SUCCEEDED:
      updated.IsCompleted = true;
      return updated;

    default:
      return previousState;
  }
};

const find_card_by_guid = (guid, cards) => {
  for (let i = 0; i < cards.length; i++) {
    if (guid == cards[i].CardGUID) {
      return {
        index: i,
        card: cards[i]
      };
    }
  }
  return {};
};
const find_page_by_guid = (guid, pages) => {
  for (let i = 0; i < pages.length; i++) {
    if (guid == pages[i].PageGUID) {
      return {
        index: i,
        page: pages[i]
      };
    }
  }
  return {};
};
const deactive_other_sections = (guid, sections) => {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].SectionGUID != guid) {
      sections[i].IsActive = false;
    } else {
      sections[i].IsActive = true;
    }
  }
};
const find_active_section_index = sections => {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].IsActive) {
      return i;
    }
  }
  return null;
};
const find_section_by_guid = (sections, targetSectionGUID) => {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].SectionGUID == targetSectionGUID) {
      return sections[i];
    }
  }
  return null;
};
const find_section_index_by_guid = (sections, targetSectionGUID) => {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].SectionGUID == targetSectionGUID) {
      return i;
    }
  }
  return null;
};
const find_previous_display_page_guid = pages => {
  for (let i = 0; i < pages.length; i++) {
    return pages[i].PageGUID;
  }
};
const disconnect_page_by_parent_page_guid = (
  parentPageGUID,
  pageGUID,
  pages
) => {
  for (let i = 0; i < pages.length; i++) {
    let page = pages[i];
    if (page.PageGUID == parentPageGUID) {
      for (let j = 0; j < page.Sections.length; j++) {
        let section = page.Sections[j];
        if (
          section.ConnectedPageGUID == pageGUID &&
          (section.Type == 'BUTTON' ||
            section.Type == 'AD_BUTTON' ||
            section.Type == 'AD_BUTTON_2')
        ) {
          pages[i].Sections[j].ConnectedPageGUID = null;
        }
      }
    }
  }
};
const disconnect_pages_by_sections = (sections, pages) => {
  for (let i = 0; i < sections.length; i++) {
    let section = sections[i];
    if (
      (section.Type == 'BUTTON' ||
        section.Type == 'AD_BUTTON' ||
        section.Type == 'AD_BUTTON_2') &&
      section.ConnectedPageGUID
    ) {
      let item = find_page_by_guid(section.ConnectedPageGUID, pages);
      item.page.IsConnected = false;
      item.page.ParentPageGUID = null;
      pages[item.index] = item.page;
    }
  }
};
const find_root_page = pages => {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].IsRoot) {
      return pages[i];
    }
  }
  return null;
};
const deactive_collapsible_panel_by_index = (arr, index) => {
  for (let i = 0; i < arr.length; i++) {
    if (i == index) {
      arr[i].isOpen = true;
    } else {
      arr[i].isOpen = false;
    }
  }
};
const disconnect_button_connectors_by_root_page_guid = (
  pages,
  rootPageGUID
) => {
  for (let i = 0; i < pages.length; i++) {
    let page = pages[i];
    if (!page.IsRoot) {
      for (let j = 0; j < page.Sections.length; j++) {
        let section = page.Sections[j];
        if (
          (section.Type == 'BUTTON' ||
            section.Type == 'AD_BUTTON' ||
            section.Type == 'AD_BUTTON_2') &&
          section.ConnectedPageGUID == rootPageGUID
        ) {
          pages[i].Sections[j].ConnectedPageGUID = null;
        }
      }
    }
  }
};

export default newexperienceReducer;

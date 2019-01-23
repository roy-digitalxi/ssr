import { all, call, put, takeEvery } from 'redux-saga/effects';

// Login
import {} from './login/sagas';

// Dashboard
import {
  dxDashboardNaviSaga,
  dxSearchBarToggleSaga,
  dxTabBarUpdateSaga,
  dxChannelSearchUpdateSaga,
  dxChannelFilterUpdateSaga,
  dxChannelFilterClearSaga,
  dxFetchStreamChannelLanguagesSaga,
  dxUpdateStreamChannelLanguageSaga,
  dxFetchChannelSaga,
  dxUpdateChannelSaga,
  dxDeleteChannelSaga,
  dxHtmlFetchSaga,
  dxExperienceSearchUpdateSaga,
  dxExperienceFilterUpdateSaga,
  dxExperienceFilterClearSaga,
  dxFetchExperienceSaga,
  dxFetchMoreExperienceSaga,
  dxDeleteExperienceSaga,
  dxStreamSearchBarToggleSaga,
  dxStreamTabBarUpdateSaga,
  dxFetchStreamChannelSaga,
  dxFetchMoreStreamChannelSaga,
  dxStreamChannelSearchUpdateSaga,
  dxStreamChannelTypeFilterUpdateSaga,
  dxStreamChannelClearFilterSaga,
  dxSelectStreamChannelSaga,
  dxCreateStreamSaga,
  dxRemoveStreamSaga,
  dxSelectFetchMoreExperienceSaga,
  dxSelectFetchMoreStreamSaga,
  dxSearchStreamSaga,
  dxUserSearchInfoSaga,
  dxUserSearchChannelSaga,
  dxUserSelectChannelSaga,
  dxUserSelectPageLimitSaga,
  dxUserSelectPageIndexSaga,
  dxUserUpdateNewUserSaga,
  dxUserNewUserSearchChannelSaga,
  dxUserNewUserCreateSaga,
  dxUserViewUserSaga,
  dxUserInputUpdateSaga,
  dxUserEditUserSearchChannelSaga,
  dxUserUpdateUserSaga,
  dxUserDeleteUserSaga,
  dxUserResetPasswordSaga,
  dxUserSelectedUserSearchChannelSaga,
  dxUserSelectedUserGrantAccessSaga,
  dxUserSelectedUserToggleLockSaga,
  dxUserSelectedUserDeleteSaga
} from './dashboard/sagas';

import {
  dxMemberSearchInfoSaga,
  dxMemberSelectPageIndexSaga,
  dxMemberUpdateNewMemberSaga,
  dxMemberNewMemberCreateSaga,
  dxMemberViewMemberSaga,
  dxMemberInputUpdateSaga,
  dxMemberUpdateMemberSaga,
  dxMemberDeleteMemberSaga,
  dxMemberResetPasswordSaga,
  dxMemberSelectedMemberGrantAccessSaga,
  dxMemberSelectedMemberToggleLockSaga,
  dxMemberSelectedMemberDeleteSaga
} from './member/sagas';

// NewExperience
import {
  // PREVIEW
  dxExperiencePreviewSaga,

  // CREATE EXPERIENCE
  dxExperienceInitalSaga,
  dxExperienceCreateSaga,
  dxExperienceUploadFileSaga,
  dxExperienceUploadGoogleFileSaga,
  dxExperienceTypeSaga,
  dxExperienceTypeUpdateSaga,
  dxExperienceIndexUpdateSaga,
  dxExperienceTitleUpdateSaga,
  dxExperienceCardTemplateMenuToggleSaga,
  dxExperienceCardTemplateFetchSaga,
  dxExperienceCardTemplateSelectSaga,
  dxExperienceCardTemplateElemSelectSaga,
  dxExperienceCardTemplateUpdateImageSaga,
  dxExperienceCardTemplateUpdateColorSaga,
  dxExperienceCardTemplateUpdateOpacitySaga,
  dxExperienceCardTemplateUpdateContentSaga,
  dxExperienceCardTemplateSaveSaga,
  dxExperienceCardTemplateRemoveSaga,
  dxExperiencePagePagesSaveSaga,
  dxExperiencePagePagesRemoveSaga,
  dxExperiencePageSetRootPageSaga,
  dxExperiencePageDocPanelToggleSaga,
  dxExperiencePageTemplateMenuToggleSaga,
  dxExperiencePageTemplateOptionSelectSaga,
  dxExperiencePageTemplateFetchSaga,
  dxExperiencePageCarouselMenuToggleSaga,
  dxExperiencePageCarouselPageActiveSaga,
  dxExperiencePageAddPageSaga,
  dxExperiencePageDeletePageSaga,
  dxExperiencePageAddElemSaga,
  dxExperiencePageDeleteElemSaga,
  dxExperiencePageCopyElemSaga,
  dxExperiencePageShuffleElemSaga,
  dxExperiencePageSelectElemSaga,
  dxExperiencePageSelectElemByTypeSaga,
  dxExperiencePageUnSelectElemByTypeSaga,
  dxExperiencePageUpdateElemSaga,
  dxExperiencePageElemConnectPageSaga,

  // UPDATE EXPERIENCE
  dxExperienceViewSaga,
  dxExperienceViewHtmlFetchSaga,
  dxExperienceUpdateFileSaga,
  dxExperienceUpdateSaga
} from './newexperience/sagas';

// NewChannel
import {
  dxChannelTypeSaga,
  dxChannelValUpdateSaga,
  dxChannelCodeValUpdateSaga,
  dxChannelCreateSaga,
  dxViewChannelSaga,
  dxChannelUpdateSaga,
  dxChannelLanguageListFetchSaga
} from './newchannel/sagas';

// Global
import {
  dxNavigateHistorySaga,
  dxAlertSaga,
  dxLoadingSaga,
  dxKeycloakRouteSaga
} from './globalSagas';

// Admin
import {
  dxAdminFetchOrgListSaga,
  dxAdminCreateOrgSaga,
  dxAdminViewOrgSaga,
  dxAdminUpdateOrgSaga,
  dxAdminUpdateOrgStatusSaga
} from './adminDashboard/sagas';

import dxLanguageSaga from './language/sagas';

export default function* rootSaga() {
  yield all([
    // Login

    // Dashboard
    dxDashboardNaviSaga(),
    dxSearchBarToggleSaga(),
    dxTabBarUpdateSaga(),

    // channel
    dxChannelSearchUpdateSaga(),
    dxChannelFilterUpdateSaga(),
    dxChannelFilterClearSaga(),
    dxFetchStreamChannelLanguagesSaga(),
    dxFetchChannelSaga(),
    dxUpdateChannelSaga(),
    dxViewChannelSaga(),

    // experience
    dxHtmlFetchSaga(),
    dxExperienceSearchUpdateSaga(),
    dxExperienceFilterUpdateSaga(),
    dxExperienceFilterClearSaga(),
    dxFetchExperienceSaga(),
    dxFetchMoreExperienceSaga(),
    dxDeleteExperienceSaga(),

    // stream
    dxStreamSearchBarToggleSaga(),
    dxStreamTabBarUpdateSaga(),
    dxFetchStreamChannelSaga(),
    dxFetchMoreStreamChannelSaga(),
    dxStreamChannelSearchUpdateSaga(),
    dxStreamChannelTypeFilterUpdateSaga(),
    dxStreamChannelClearFilterSaga(),
    dxSelectStreamChannelSaga(),
    dxCreateStreamSaga(),
    dxRemoveStreamSaga(),
    dxSelectFetchMoreExperienceSaga(),
    dxSelectFetchMoreStreamSaga(),
    dxSearchStreamSaga(),

    // PREVIEW
    dxExperiencePreviewSaga(),

    // CREATE EXPERIENCE
    dxExperienceInitalSaga(),
    dxExperienceCreateSaga(),
    dxExperienceUploadFileSaga(),
    dxExperienceUploadGoogleFileSaga(),
    dxExperienceTypeSaga(),
    dxExperienceTypeUpdateSaga(),
    dxExperienceIndexUpdateSaga(),
    dxExperienceTitleUpdateSaga(),

    dxExperienceCardTemplateMenuToggleSaga(),
    dxExperienceCardTemplateFetchSaga(),
    dxExperienceCardTemplateSelectSaga(),
    dxExperienceCardTemplateElemSelectSaga(),
    dxExperienceCardTemplateUpdateImageSaga(),
    dxExperienceCardTemplateUpdateColorSaga(),
    dxExperienceCardTemplateUpdateOpacitySaga(),
    dxExperienceCardTemplateUpdateContentSaga(),
    dxExperienceCardTemplateSaveSaga(),
    dxExperienceCardTemplateRemoveSaga(),

    dxExperiencePagePagesSaveSaga(),
    dxExperiencePagePagesRemoveSaga(),
    dxExperiencePageSetRootPageSaga(),
    dxExperiencePageDocPanelToggleSaga(),
    dxExperiencePageTemplateMenuToggleSaga(),
    dxExperiencePageTemplateOptionSelectSaga(),
    dxExperiencePageTemplateFetchSaga(),
    dxExperiencePageCarouselMenuToggleSaga(),
    dxExperiencePageCarouselPageActiveSaga(),
    dxExperiencePageAddPageSaga(),
    dxExperiencePageDeletePageSaga(),
    dxExperiencePageAddElemSaga(),
    dxExperiencePageDeleteElemSaga(),
    dxExperiencePageCopyElemSaga(),
    dxExperiencePageShuffleElemSaga(),
    dxExperiencePageSelectElemSaga(),
    dxExperiencePageSelectElemByTypeSaga(),
    dxExperiencePageUnSelectElemByTypeSaga(),
    dxExperiencePageUpdateElemSaga(),
    dxExperiencePageElemConnectPageSaga(),

    // UPDATE EXPERIENCE
    dxExperienceViewSaga(),
    dxExperienceViewHtmlFetchSaga(),
    dxExperienceUpdateFileSaga(),
    dxExperienceUpdateSaga(),
    dxChannelUpdateSaga(),
    dxDeleteChannelSaga(),

    // Channel
    dxChannelTypeSaga(),
    dxChannelValUpdateSaga(),
    dxChannelCodeValUpdateSaga(),
    dxChannelCreateSaga(),
    dxChannelLanguageListFetchSaga(),
    dxUpdateStreamChannelLanguageSaga(),

    // Global
    dxNavigateHistorySaga(),
    dxAlertSaga(),
    dxLoadingSaga(),
    dxKeycloakRouteSaga(),

    // Language
    dxLanguageSaga(),

    // User
    dxUserSearchInfoSaga(),
    dxUserSearchChannelSaga(),
    dxUserSelectChannelSaga(),
    dxUserSelectPageLimitSaga(),
    dxUserSelectPageIndexSaga(),
    dxUserUpdateNewUserSaga(),
    dxUserNewUserSearchChannelSaga(),
    dxUserNewUserCreateSaga(),
    dxUserViewUserSaga(),
    dxUserInputUpdateSaga(),
    dxUserEditUserSearchChannelSaga(),
    dxUserUpdateUserSaga(),
    dxUserDeleteUserSaga(),
    dxUserResetPasswordSaga(),
    dxUserSelectedUserSearchChannelSaga(),
    dxUserSelectedUserGrantAccessSaga(),
    dxUserSelectedUserToggleLockSaga(),
    dxUserSelectedUserDeleteSaga(),

    // Member
    dxMemberSearchInfoSaga(),
    dxMemberSelectPageIndexSaga(),
    dxMemberUpdateNewMemberSaga(),
    dxMemberNewMemberCreateSaga(),
    dxMemberViewMemberSaga(),
    dxMemberInputUpdateSaga(),
    dxMemberUpdateMemberSaga(),
    dxMemberDeleteMemberSaga(),
    dxMemberResetPasswordSaga(),
    dxMemberSelectedMemberGrantAccessSaga(),
    dxMemberSelectedMemberToggleLockSaga(),
    dxMemberSelectedMemberDeleteSaga(),

    // Admin
    dxAdminFetchOrgListSaga(),
    dxAdminCreateOrgSaga(),
    dxAdminViewOrgSaga(),
    dxAdminUpdateOrgSaga(),
    dxAdminUpdateOrgStatusSaga()
  ]);
}

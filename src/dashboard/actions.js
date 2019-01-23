import {
  DASHBOARD_NAVI_REQUESTED,
  SEARCH_BAR_TOGGLE_REQUESTED,
  TAB_BAR_UPDATE_REQUESTED,

  // CHANNEL
  CHANNEL_UPDATE_SEARCH_REQUESTED,
  CHANNEL_UPDATE_FILTER_REQUESTED,
  CHANNEL_CLEAR_FILTER_REQUESTED,
  CHANNEL_FETCH_REQUESTED,
  CHANNEL_UPDATE_STATUS_REQUESTED,
  CHANNEL_DELETE_REQUESTED,

  // EXPERIENCE
  HTML_FETCH_REQUESTED,
  EXPERIENCE_UPDATE_SEARCH_REQUESTED,
  EXPERIENCE_UPDATE_FILTER_REQUESTED,
  EXPERIENCE_CLEAR_FILTER_REQUESTED,
  EXPERIENCE_FETCH_REQUESTED,
  EXPERIENCE_FETCH_MORE_REQUESTED,
  EXPERIENCE_DELETE_REQUESTED,

  // STREAM
  STREAM_SEARCH_BAR_TOGGLE_REQUESTED,
  STREAM_TAB_BAR_UPDATE_REQUESTED,
  STREAM_CHANNEL_LANGUAGES_FETCH_REQUESTED,
  STREAM_CHANNEL_LANGUAGES_UPDATE_FILTER_REQUESTED,
  STREAM_CHANNEL_FETCH_REQUESTED,
  STREAM_FETCH_MORE_CHANNEL_REQUESTED,
  STREAM_CHANNEL_UPDATE_SEARCH_REQUESTED,
  STREAM_CHANNEL_UPDATE_FILTER_REQUESTED,
  STREAM_CHANNEL_CLEAR_FILTER_REQUESTED,
  STREAM_CHANNEL_SELECT_REQUESTED,
  STREAM_CREATE_REQUESTED,
  STREAM_REMOVE_REQUESTED,
  STREAM_FETCH_MORE_EXPERIENCE_REQUESTED,
  STREAM_FETCH_MORE_STREAM_REQUESTED,
  STREAM_UPDATE_SEARCH_REQUESTED,

  // USER
  USER_UPDATE_INFO_SEARCH_REQUESTED,
  USER_UPDATE_CHANNEL_SEARCH_REQUESTED,
  USER_UPDATE_CHANNEL_SELECT_REQUEST,
  USER_UPDATE_PAGE_LIMIT_SELECT_REQUEST,
  USER_UPDATE_PAGE_INDEX_REQUEST,
  USER_UPDATE_SELECT_MODE,
  USER_TOGGLE_INVITE_MODAL,
  USER_UPDATE_NEW_USER_REQUEST,
  USER_BLUR_NEW_USER_EMAIL,
  USER_ADD_NEW_USER_FORM,
  USER_DELETE_NEW_USER_FORM,
  USER_UPDATE_NEW_USER_CHANNEL_SEARCH_REQUESTED,
  USER_UPDATE_NEW_USER_CHANNEL_SELECT,
  USER_UPDATE_NEW_USER_CREATE_REQUESTED,
  USER_FETCH_USER_VIEW_REQUESTED,
  USER_UPDATE_USER_INPUT_REQUESTED,
  USER_UPDATE_USER_ENABLE,
  USER_UPDATE_EDIT_USER_CHANNEL_SEARCH_REQUESTED,
  USER_UPDATE_EDIT_USER_CHANNEL_SELECT,
  USER_UPDATE_USER_REQUESTED,
  USER_DELETE_USER_REQUESTED,
  USER_BLUR_USER_EMAIL,
  USER_TOGGLE_USER_PASSWORD_MODAL,
  USER_RESET_PASSWORD_REQUEST,
  USER_TOGGLE_USER_DELETE_MODAL,
  USER_TOGGLE_USER_SELECT,
  USER_TOGGLE_USER_SELECT_ALL,
  USER_TOGGLE_GRANT_ACCESS_MODAL,
  USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH_REQUESTED,
  USER_UPDATE_SELECTED_USER_CHANNEL_SELECT,
  USER_UPDATE_SELECTED_USER_GRANT_ACCESS_REQUESTED,
  USER_TOGGLE_REMOVE_ACCESS_MODAL,
  USER_TOGGLE_USERS_LOCK_MODAL,
  USER_TOGGLE_USERS_LOCK_REQUESTED,
  USER_TOGGLE_DELETE_USERS_MODAL,
  USER_TOGGLE_DELETE_USERS_REQUESTED
} from './constants';

export const dxDashboardNavi = index => {
  return {
    type: DASHBOARD_NAVI_REQUESTED,
    payload: {
      index
    }
  };
};

export const dxToggleSearchBar = toggle => {
  return {
    type: SEARCH_BAR_TOGGLE_REQUESTED,
    payload: {
      toggle
    }
  };
};

export const dxUpdateTabBar = index => {
  return {
    type: TAB_BAR_UPDATE_REQUESTED,
    payload: {
      index
    }
  };
};

export const dxUpdateChannelSearch = (
  val,
  channelTypeFilter,
  channelStatusFilter
) => {
  return {
    type: CHANNEL_UPDATE_SEARCH_REQUESTED,
    payload: {
      val,
      channelTypeFilter,
      channelStatusFilter
    }
  };
};

export const dxUpdateChannelFilter = (filterType, filter, val, otherFilter) => {
  return {
    type: CHANNEL_UPDATE_FILTER_REQUESTED,
    payload: {
      filterType,
      filter,
      val,
      otherFilter
    }
  };
};

export const dxClearChannelFilter = () => {
  return {
    type: CHANNEL_CLEAR_FILTER_REQUESTED,
    payload: {}
  };
};

export const dxFetchChannel = () => {
  return {
    type: CHANNEL_FETCH_REQUESTED,
    payload: {}
  };
};

export const dxUpdateChannel = channel => {
  return {
    type: CHANNEL_UPDATE_STATUS_REQUESTED,
    payload: {
      channel
    }
  };
};

export const dxDeleteChannel = channel => {
  return {
    type: CHANNEL_DELETE_REQUESTED,
    payload: {
      channel
    }
  };
};

export const dxHtmlFetch = (
  experienceGUID,
  pageGUID,
  sectionGUID,
  guid,
  experienceType
) => {
  return {
    type: HTML_FETCH_REQUESTED,
    payload: {
      experienceGUID,
      pageGUID,
      sectionGUID,
      guid,
      experienceType
    }
  };
};

export const dxUpdateExperienceSearch = (val, experienceType, filterType) => {
  return {
    type: EXPERIENCE_UPDATE_SEARCH_REQUESTED,
    payload: {
      val,
      experienceType,
      filterType
    }
  };
};

export const dxUpdateExperienceFilter = (
  experienceType,
  option,
  experienceSearchVal
) => {
  return {
    type: EXPERIENCE_UPDATE_FILTER_REQUESTED,
    payload: {
      experienceType,
      option,
      experienceSearchVal
    }
  };
};

export const dxClearExperienceFilter = experienceType => {
  return {
    type: EXPERIENCE_CLEAR_FILTER_REQUESTED,
    payload: {
      experienceType
    }
  };
};

export const dxFetchExperience = experienceType => {
  return {
    type: EXPERIENCE_FETCH_REQUESTED,
    payload: {
      experienceType
    }
  };
};

export const dxFetchMoreExperience = (
  experienceType,
  currentPageIndex,
  experienceSearch,
  filterType
) => {
  return {
    type: EXPERIENCE_FETCH_MORE_REQUESTED,
    payload: {
      experienceType,
      currentPageIndex,
      experienceSearch,
      filterType
    }
  };
};

export const dxDeleteExperience = (experienceGUID, experienceType) => {
  return {
    type: EXPERIENCE_DELETE_REQUESTED,
    payload: {
      experienceGUID,
      experienceType
    }
  };
};

export const dxToggleStreamSearchBar = toggle => {
  return {
    type: STREAM_SEARCH_BAR_TOGGLE_REQUESTED,
    payload: {
      toggle
    }
  };
};

export const dxUpdateStreamTabBar = (index, channel) => {
  return {
    type: STREAM_TAB_BAR_UPDATE_REQUESTED,
    payload: {
      index,
      channel
    }
  };
};

export const dxFetchStreamChannelLanguages = () => {
  return {
    type: STREAM_CHANNEL_LANGUAGES_FETCH_REQUESTED,
    payload: {}
  };
};

export const dxUpdateStreamChannelLanguageTypeFilter = (
  language,
  channelTypeFilterType,
  searchVal
) => {
  return {
    type: STREAM_CHANNEL_LANGUAGES_UPDATE_FILTER_REQUESTED,
    payload: {
      language,
      channelTypeFilterType,
      searchVal
    }
  };
};

export const dxFetchStreamChannel = () => {
  return {
    type: STREAM_CHANNEL_FETCH_REQUESTED,
    payload: {}
  };
};

export const dxFetchMoreStreamChannel = (
  channelLanguageGUID,
  channelTypeFilter,
  val,
  pageIndex
) => {
  return {
    type: STREAM_FETCH_MORE_CHANNEL_REQUESTED,
    payload: {
      channelLanguageGUID,
      channelTypeFilter,
      val,
      pageIndex
    }
  };
};

export const dxUpdateStreamChannelSearch = (
  channelLanguageGUID,
  channelTypeFilterType,
  searchVal
) => {
  return {
    type: STREAM_CHANNEL_UPDATE_SEARCH_REQUESTED,
    payload: {
      channelLanguageGUID,
      channelTypeFilterType,
      searchVal
    }
  };
};

export const dxUpdateStreamChannelTypeFilter = (
  channelLanguageGUID,
  channelTypeFilterType,
  searchVal
) => {
  return {
    type: STREAM_CHANNEL_UPDATE_FILTER_REQUESTED,
    payload: {
      channelLanguageGUID,
      channelTypeFilterType,
      searchVal
    }
  };
};

export const dxClearStreamChannelFilter = () => {
  return {
    type: STREAM_CHANNEL_CLEAR_FILTER_REQUESTED,
    payload: {}
  };
};

export const dxSelectStreamChannel = (channel, pageIndex) => {
  return {
    type: STREAM_CHANNEL_SELECT_REQUESTED,
    payload: {
      channel,
      pageIndex
    }
  };
};

export const dxCreateStream = (channel, experience) => {
  return {
    type: STREAM_CREATE_REQUESTED,
    payload: {
      channel,
      experience
    }
  };
};

export const dxRemoveStream = experienceStreamGUID => {
  return {
    type: STREAM_REMOVE_REQUESTED,
    payload: {
      experienceStreamGUID
    }
  };
};

export const dxStreamFetchMoreExperience = (
  channel,
  searchInput,
  pageIndex
) => {
  return {
    type: STREAM_FETCH_MORE_EXPERIENCE_REQUESTED,
    payload: {
      channel,
      searchInput,
      pageIndex
    }
  };
};

export const dxStreamFetchMoreStream = (channel, searchInput, pageIndex) => {
  return {
    type: STREAM_FETCH_MORE_STREAM_REQUESTED,
    payload: {
      channel,
      searchInput,
      pageIndex
    }
  };
};

export const dxUpdateStreamSearch = (channel, activeTabIndex, val) => {
  return {
    type: STREAM_UPDATE_SEARCH_REQUESTED,
    payload: {
      channel,
      activeTabIndex,
      val
    }
  };
};

export const dxUpdateUserInfoSearch = (
  searchVal,
  searchChannels,
  userPerPage
) => {
  return {
    type: USER_UPDATE_INFO_SEARCH_REQUESTED,
    payload: {
      searchVal,
      searchChannels,
      userPerPage
    }
  };
};

export const dxUpdateUserChannelSearch = searchVal => {
  return {
    type: USER_UPDATE_CHANNEL_SEARCH_REQUESTED,
    payload: {
      searchVal
    }
  };
};

export const dxUpdateUserChannelSelect = (searchVal, options, userPerPage) => {
  return {
    type: USER_UPDATE_CHANNEL_SELECT_REQUEST,
    payload: {
      searchVal,
      options,
      userPerPage
    }
  };
};

export const dxUpdateUserPageLimitSelect = (
  searchVal,
  searchChannels,
  pageLimit
) => {
  return {
    type: USER_UPDATE_PAGE_LIMIT_SELECT_REQUEST,
    payload: {
      searchVal,
      searchChannels,
      pageLimit
    }
  };
};

export const dxUpdateUserPageIndexSelect = (
  searchVal,
  searchChannels,
  userPerPage,
  pageIndex
) => {
  return {
    type: USER_UPDATE_PAGE_INDEX_REQUEST,
    payload: {
      searchVal,
      searchChannels,
      userPerPage,
      pageIndex
    }
  };
};

export const dxUpdateUserSelectMode = (user, toggle) => {
  return {
    type: USER_UPDATE_SELECT_MODE,
    payload: {
      user,
      toggle
    }
  };
};

export const dxToggleUserInviteModal = toggle => {
  return {
    type: USER_TOGGLE_INVITE_MODAL,
    payload: {
      toggle
    }
  };
};

export const dxUpdateUserNewUser = (index, type, value) => {
  return {
    type: USER_UPDATE_NEW_USER_REQUEST,
    payload: {
      index,
      type,
      value
    }
  };
};

export const dxBlurUserNewUser = (index, value) => {
  return {
    type: USER_BLUR_NEW_USER_EMAIL,
    payload: {
      index,
      value
    }
  };
};

export const dxAddNewUserForm = () => {
  return {
    type: USER_ADD_NEW_USER_FORM,
    payload: {}
  };
};

export const dxDeleteNewUserForm = index => {
  return {
    type: USER_DELETE_NEW_USER_FORM,
    payload: {
      index
    }
  };
};

export const dxUpdateUserNewUserChannelSearch = searchVal => {
  return {
    type: USER_UPDATE_NEW_USER_CHANNEL_SEARCH_REQUESTED,
    payload: {
      searchVal
    }
  };
};

export const dxUpdateUserNewUserChannelSelect = options => {
  return {
    type: USER_UPDATE_NEW_USER_CHANNEL_SELECT,
    payload: {
      options
    }
  };
};

export const dxUpdateUserNewUserCreate = (users, channels) => {
  return {
    type: USER_UPDATE_NEW_USER_CREATE_REQUESTED,
    payload: {
      users,
      channels
    }
  };
};

export const dxFetchUserView = (userGUID, toggle) => {
  return {
    type: USER_FETCH_USER_VIEW_REQUESTED,
    payload: {
      userGUID,
      toggle
    }
  };
};

export const dxUpdateUserInput = (userGUID, type, value) => {
  return {
    type: USER_UPDATE_USER_INPUT_REQUESTED,
    payload: {
      userGUID,
      type,
      value
    }
  };
};

export const dxUpdateUserEnable = toggle => {
  return {
    type: USER_UPDATE_USER_ENABLE,
    payload: {
      toggle
    }
  };
};

export const dxUpdateEditUserChannelSearch = searchVal => {
  return {
    type: USER_UPDATE_EDIT_USER_CHANNEL_SEARCH_REQUESTED,
    payload: {
      searchVal
    }
  };
};

export const dxUpdateEditUserChannelSelect = options => {
  return {
    type: USER_UPDATE_EDIT_USER_CHANNEL_SELECT,
    payload: {
      options
    }
  };
};

export const dxUpdateUser = user => {
  return {
    type: USER_UPDATE_USER_REQUESTED,
    payload: {
      user
    }
  };
};

export const dxDeleteUser = userGUID => {
  return {
    type: USER_DELETE_USER_REQUESTED,
    payload: {
      userGUID
    }
  };
};

export const dxBlurUserEmail = () => {
  return {
    type: USER_BLUR_USER_EMAIL,
    payload: {}
  };
};

export const dxResetUserPasswordModal = (userGUID, toggle) => {
  return {
    type: USER_TOGGLE_USER_PASSWORD_MODAL,
    payload: {
      userGUID,
      toggle
    }
  };
};

export const dxResetUserPassword = (userGUID, password) => {
  return {
    type: USER_RESET_PASSWORD_REQUEST,
    payload: {
      userGUID,
      password
    }
  };
};

export const dxResetUserDeleteModal = (userGUID, toggle) => {
  return {
    type: USER_TOGGLE_USER_DELETE_MODAL,
    payload: {
      userGUID,
      toggle
    }
  };
};

export const dxToggleUserSelect = (user, toggle) => {
  return {
    type: USER_TOGGLE_USER_SELECT,
    payload: {
      user,
      toggle
    }
  };
};

export const dxToggleUserSelectAll = () => {
  return {
    type: USER_TOGGLE_USER_SELECT_ALL,
    payload: {}
  };
};

export const dxToggleGrantAccessModal = toggle => {
  return {
    type: USER_TOGGLE_GRANT_ACCESS_MODAL,
    payload: {
      toggle
    }
  };
};

export const dxUpdateSelectedUserChannelSearch = searchVal => {
  return {
    type: USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH_REQUESTED,
    payload: {
      searchVal
    }
  };
};

export const dxUpdateUserSelectedUsersChannelSelect = options => {
  return {
    type: USER_UPDATE_SELECTED_USER_CHANNEL_SELECT,
    payload: {
      options
    }
  };
};

export const dxUpdateUserSelectedUsersGrantAccess = (
  users,
  channels,
  isGrant
) => {
  return {
    type: USER_UPDATE_SELECTED_USER_GRANT_ACCESS_REQUESTED,
    payload: {
      users,
      channels,
      isGrant
    }
  };
};

export const dxToggleRemoveAccessModal = toggle => {
  return {
    type: USER_TOGGLE_REMOVE_ACCESS_MODAL,
    payload: {
      toggle
    }
  };
};

export const dxToggleUsersLock = (users, toggle) => {
  return {
    type: USER_TOGGLE_USERS_LOCK_REQUESTED,
    payload: {
      users,
      toggle
    }
  };
};

export const dxoggleUsersLockModal = (toggle, type) => {
  return {
    type: USER_TOGGLE_USERS_LOCK_MODAL,
    payload: {
      toggle,
      type
    }
  };
};

export const dxToggleDeleteUsersModal = toggle => {
  return {
    type: USER_TOGGLE_DELETE_USERS_MODAL,
    payload: {
      toggle
    }
  };
};

export const dxDeleteUsers = users => {
  return {
    type: USER_TOGGLE_DELETE_USERS_REQUESTED,
    payload: {
      users
    }
  };
};

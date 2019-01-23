import {
  // MEMBER
  MEMBER_UPDATE_INFO_SEARCH_REQUESTED,
  MEMBER_UPDATE_PAGE_INDEX_REQUEST,
  MEMBER_UPDATE_SELECT_MODE,
  MEMBER_TOGGLE_INVITE_MODAL,
  MEMBER_UPDATE_NEW_MEMBER_REQUEST,
  MEMBER_BLUR_NEW_MEMBER_EMAIL,
  MEMBER_ADD_NEW_MEMBER_FORM,
  MEMBER_DELETE_NEW_MEMBER_FORM,
  MEMBER_UPDATE_NEW_MEMBER_ROLE_SELECT,
  MEMBER_UPDATE_NEW_MEMBER_CREATE_REQUESTED,
  MEMBER_FETCH_MEMBER_VIEW_REQUESTED,
  MEMBER_UPDATE_MEMBER_INPUT_REQUESTED,
  MEMBER_UPDATE_MEMBER_ENABLE,
  MEMBER_UPDATE_EDIT_MEMBER_ROLE_SELECT,
  MEMBER_UPDATE_MEMBER_REQUESTED,
  MEMBER_DELETE_MEMBER_REQUESTED,
  MEMBER_BLUR_MEMBER_EMAIL,
  MEMBER_TOGGLE_MEMBER_PASSWORD_MODAL,
  MEMBER_RESET_PASSWORD_REQUEST,
  MEMBER_TOGGLE_MEMBER_DELETE_MODAL,
  MEMBER_TOGGLE_MEMBER_SELECT,
  MEMBER_TOGGLE_MEMBER_SELECT_ALL,
  MEMBER_TOGGLE_GRANT_ACCESS_MODAL,
  MEMBER_UPDATE_SELECTED_MEMBER_ROLE_SELECT,
  MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS_REQUESTED,
  MEMBER_TOGGLE_REMOVE_ACCESS_MODAL,
  MEMBER_TOGGLE_MEMBERS_LOCK_MODAL,
  MEMBER_TOGGLE_MEMBERS_LOCK_REQUESTED,
  MEMBER_TOGGLE_DELETE_MEMBERS_MODAL,
  MEMBER_TOGGLE_DELETE_MEMBERS_REQUESTED
} from './constants';

export const dxUpdateUserInfoSearch = (searchVal, searchRoles, userPerPage) => {
  return {
    type: MEMBER_UPDATE_INFO_SEARCH_REQUESTED,
    payload: {
      searchVal,
      searchRoles,
      userPerPage
    }
  };
};

export const dxUpdateUserPageIndexSelect = (
  searchVal,
  searchRoles,
  userPerPage,
  pageIndex
) => {
  return {
    type: MEMBER_UPDATE_PAGE_INDEX_REQUEST,
    payload: {
      searchVal,
      searchRoles,
      userPerPage,
      pageIndex
    }
  };
};

export const dxUpdateUserSelectMode = (user, toggle) => {
  return {
    type: MEMBER_UPDATE_SELECT_MODE,
    payload: {
      user,
      toggle
    }
  };
};

export const dxToggleUserInviteModal = toggle => {
  return {
    type: MEMBER_TOGGLE_INVITE_MODAL,
    payload: {
      toggle
    }
  };
};

export const dxUpdateUserNewUser = (index, type, value) => {
  return {
    type: MEMBER_UPDATE_NEW_MEMBER_REQUEST,
    payload: {
      index,
      type,
      value
    }
  };
};

export const dxBlurUserNewUser = (index, value) => {
  return {
    type: MEMBER_BLUR_NEW_MEMBER_EMAIL,
    payload: {
      index,
      value
    }
  };
};

export const dxAddNewUserForm = () => {
  return {
    type: MEMBER_ADD_NEW_MEMBER_FORM,
    payload: {}
  };
};

export const dxDeleteNewUserForm = index => {
  return {
    type: MEMBER_DELETE_NEW_MEMBER_FORM,
    payload: {
      index
    }
  };
};

export const dxUpdateUserNewUserRoleSelect = options => {
  return {
    type: MEMBER_UPDATE_NEW_MEMBER_ROLE_SELECT,
    payload: {
      options
    }
  };
};

export const dxUpdateUserNewUserCreate = (users, roles) => {
  return {
    type: MEMBER_UPDATE_NEW_MEMBER_CREATE_REQUESTED,
    payload: {
      users,
      roles
    }
  };
};

export const dxFetchUserView = (userGUID, toggle) => {
  return {
    type: MEMBER_FETCH_MEMBER_VIEW_REQUESTED,
    payload: {
      userGUID,
      toggle
    }
  };
};

export const dxUpdateUserInput = (userGUID, type, value) => {
  return {
    type: MEMBER_UPDATE_MEMBER_INPUT_REQUESTED,
    payload: {
      userGUID,
      type,
      value
    }
  };
};

export const dxUpdateUserEnable = toggle => {
  return {
    type: MEMBER_UPDATE_MEMBER_ENABLE,
    payload: {
      toggle
    }
  };
};

export const dxUpdateEditUserRoleSelect = options => {
  return {
    type: MEMBER_UPDATE_EDIT_MEMBER_ROLE_SELECT,
    payload: {
      options
    }
  };
};

export const dxUpdateUser = user => {
  return {
    type: MEMBER_UPDATE_MEMBER_REQUESTED,
    payload: {
      user
    }
  };
};

export const dxDeleteUser = userGUID => {
  return {
    type: MEMBER_DELETE_MEMBER_REQUESTED,
    payload: {
      userGUID
    }
  };
};

export const dxBlurUserEmail = () => {
  return {
    type: MEMBER_BLUR_MEMBER_EMAIL,
    payload: {}
  };
};

export const dxResetUserPasswordModal = (userGUID, toggle) => {
  return {
    type: MEMBER_TOGGLE_MEMBER_PASSWORD_MODAL,
    payload: {
      userGUID,
      toggle
    }
  };
};

export const dxResetUserPassword = (userGUID, password) => {
  return {
    type: MEMBER_RESET_PASSWORD_REQUEST,
    payload: {
      userGUID,
      password
    }
  };
};

export const dxResetUserDeleteModal = (userGUID, toggle) => {
  return {
    type: MEMBER_TOGGLE_MEMBER_DELETE_MODAL,
    payload: {
      userGUID,
      toggle
    }
  };
};

export const dxToggleUserSelect = (user, toggle) => {
  return {
    type: MEMBER_TOGGLE_MEMBER_SELECT,
    payload: {
      user,
      toggle
    }
  };
};

export const dxToggleUserSelectAll = () => {
  return {
    type: MEMBER_TOGGLE_MEMBER_SELECT_ALL,
    payload: {}
  };
};

export const dxToggleGrantAccessModal = toggle => {
  return {
    type: MEMBER_TOGGLE_GRANT_ACCESS_MODAL,
    payload: {
      toggle
    }
  };
};

export const dxUpdateUserSelectedUsersRoleSelect = options => {
  return {
    type: MEMBER_UPDATE_SELECTED_MEMBER_ROLE_SELECT,
    payload: {
      options
    }
  };
};

export const dxUpdateUserSelectedUsersGrantAccess = (users, roles, isGrant) => {
  return {
    type: MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS_REQUESTED,
    payload: {
      users,
      roles,
      isGrant
    }
  };
};

export const dxToggleRemoveAccessModal = toggle => {
  return {
    type: MEMBER_TOGGLE_REMOVE_ACCESS_MODAL,
    payload: {
      toggle
    }
  };
};

export const dxToggleUsersLock = (users, toggle) => {
  return {
    type: MEMBER_TOGGLE_MEMBERS_LOCK_REQUESTED,
    payload: {
      users,
      toggle
    }
  };
};

export const dxoggleUsersLockModal = (toggle, type) => {
  return {
    type: MEMBER_TOGGLE_MEMBERS_LOCK_MODAL,
    payload: {
      toggle,
      type
    }
  };
};

export const dxToggleDeleteUsersModal = toggle => {
  return {
    type: MEMBER_TOGGLE_DELETE_MEMBERS_MODAL,
    payload: {
      toggle
    }
  };
};

export const dxDeleteUsers = users => {
  return {
    type: MEMBER_TOGGLE_DELETE_MEMBERS_REQUESTED,
    payload: {
      users
    }
  };
};

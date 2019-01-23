import {
  // user
  MEMBER_UPDATE_INFO_SEARCH_REQUESTED,
  MEMBER_UPDATE_INFO_SEARCH__SUCCEEDED,
  MEMBER_UPDATE_INFO_SEARCH__FAILED,
  MEMBER_UPDATE_PAGE_INDEX_REQUEST,
  MEMBER_UPDATE_PAGE_INDEX__SUCCEEDED,
  MEMBER_UPDATE_PAGE_INDEX__FAILED,
  MEMBER_UPDATE_SELECT_MODE,
  MEMBER_TOGGLE_INVITE_MODAL,
  MEMBER_UPDATE_NEW_MEMBER_REQUEST,
  MEMBER_UPDATE_NEW_MEMBER__SUCCEEDED,
  MEMBER_UPDATE_NEW_MEMBER__FAILED,
  MEMBER_BLUR_NEW_MEMBER_EMAIL,
  MEMBER_ADD_NEW_MEMBER_FORM,
  MEMBER_DELETE_NEW_MEMBER_FORM,
  MEMBER_UPDATE_NEW_MEMBER_CHANNEL_SEARCH_REQUESTED,
  MEMBER_UPDATE_NEW_MEMBER_CHANNEL_SEARCH__SUCCEEDED,
  MEMBER_UPDATE_NEW_MEMBER_CHANNEL_SEARCH__FAILED,
  MEMBER_UPDATE_NEW_MEMBER_ROLE_SELECT,
  MEMBER_UPDATE_NEW_MEMBER_CREATE_REQUESTED,
  MEMBER_UPDATE_NEW_MEMBER_CREATE__SUCCEEDED,
  MEMBER_UPDATE_NEW_MEMBER_CREATE__FAILED,
  MEMBER_FETCH_MEMBER_VIEW_REQUESTED,
  MEMBER_FETCH_MEMBER_VIEW__SUCCEEDED,
  MEMBER_FETCH_MEMBER_VIEW__FAILED,
  MEMBER_UPDATE_MEMBER_INPUT_REQUESTED,
  MEMBER_UPDATE_MEMBER_INPUT__SUCCEEDED,
  MEMBER_UPDATE_MEMBER_INPUT__FAILED,
  MEMBER_UPDATE_MEMBER_ENABLE,
  MEMBER_UPDATE_EDIT_MEMBER_ROLE_SELECT,
  MEMBER_UPDATE_MEMBER_REQUESTED,
  MEMBER_UPDATE_MEMBER__SUCCEEDED,
  MEMBER_UPDATE_MEMBER__FAILED,
  MEMBER_DELETE_MEMBER__SUCCEEDED,
  MEMBER_BLUR_MEMBER_EMAIL,
  MEMBER_TOGGLE_MEMBER_PASSWORD_MODAL,
  MEMBER_RESET_PASSWORD_REQUEST,
  MEMBER_RESET_PASSWORD__SUCCEEDED,
  MEMBER_RESET_PASSWORD__FAILED,
  MEMBER_TOGGLE_MEMBER_DELETE_MODAL,
  MEMBER_TOGGLE_MEMBER_SELECT,
  MEMBER_TOGGLE_MEMBER_SELECT_ALL,
  MEMBER_TOGGLE_GRANT_ACCESS_MODAL,
  MEMBER_UPDATE_SELECTED_MEMBER_ROLE_SELECT,
  MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS_REQUESTED,
  MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS__SUCCEEDED,
  MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS__FAILED,
  MEMBER_TOGGLE_REMOVE_ACCESS_MODAL,
  MEMBER_TOGGLE_MEMBERS_LOCK_MODAL,
  MEMBER_TOGGLE_MEMBERS_LOCK__SUCCEEDED,
  MEMBER_TOGGLE_DELETE_MEMBERS_MODAL,
  MEMBER_TOGGLE_DELETE_MEMBERS__SUCCEEDED
} from './constants';

// helpers
import { isValidEmail } from '../helpers';

const initialState = {
  IsSelectMode: false,
  UserRoles: [
    {
      label: 'Admin',
      value: 'ADMIN'
    },
    {
      label: 'Content',
      value: 'CONTENT'
    },
    {
      label: 'Publish',
      value: 'PUBLISH'
    },
    {
      label: 'User Manage',
      value: 'USER_MANAGE'
    },
    {
      label: 'Lanaguage',
      value: 'LANGUAGE'
    },
    {
      label: 'Analytics',
      value: 'ANALYTICS'
    }
  ],
  UserSelectedOptions: [],
  Users: [],
  UserSearchValue: null,
  UserPageNumber: 1,
  UserPageLimit: 5,
  UserTotalRecords: 0,

  IsUserInviteModalOpen: false,
  NewUsers: [
    {
      Email: '',
      FirstName: '',
      LastName: '',
      IsValidate: true,
      ErrorMsg: ''
    }
  ],
  NewUserSelectedOptions: [],

  IsUserModalOpen: false,
  User: null,
  EditUserSelectedOptions: [],

  IsUserPasswordModalOpen: false,
  PasswordUserGUID: null,

  IsUserDeleteModalOpen: false,
  DeleteUserGUID: null,

  IsGrantAccessModalOpen: false,
  SelectedUsers: [],
  SelectedUsersSelectedOptions: [],

  IsRemoveAccessModalOpen: false,

  IsUserLockModalOpen: false,
  UserLockModalType: null,

  IsUsersDeleteModalOpen: false
};

const NewUser = {
  Email: '',
  FirstName: '',
  LastName: '',
  IsValidate: true,
  ErrorMsg: ''
};

const memberReducer = (previousState = initialState, { type, payload }) => {
  let updated = Object.assign({}, previousState);
  let tmpUsers = Object.assign([], updated.Users);
  let tmpNewUsers = Object.assign([], updated.NewUsers);
  let tmpUser = Object.assign({}, updated.User);
  let tmpSelectedUsers = Object.assign([], updated.SelectedUsers);

  let tmpNewUser;
  let tmpIndex;
  let tmpRoles;

  switch (type) {
    case MEMBER_UPDATE_INFO_SEARCH_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case MEMBER_UPDATE_INFO_SEARCH__SUCCEEDED:
      updated.UserSearchValue = payload.searchVal;
      updated.UserSelectedOptions = payload.options;
      updated.UserPageLimit = payload.pageLimit;
      updated.Users = payload.users;
      updated.UserTotalRecords = payload.totalRecord;
      updated.UserPageNumber = 1;
      updated.IsFetching = false;

      return updated;

    case MEMBER_UPDATE_INFO_SEARCH__FAILED:
      updated.IsFetching = false;
      return updated;

    case MEMBER_UPDATE_PAGE_INDEX_REQUEST:
      updated.IsFetching = true;
      return updated;

    case MEMBER_UPDATE_PAGE_INDEX__SUCCEEDED:
      updated.UserPageNumber = payload.pageIndex + 1;
      updated.Users = payload.users;
      updated.UserTotalRecords = payload.totalRecord;
      updated.IsFetching = false;

      updated.SelectedUsers = [];
      updated.IsSelectMode = false;
      return updated;

    case MEMBER_UPDATE_PAGE_INDEX__FAILED:
      updated.IsFetching = false;
      return updated;

    case MEMBER_TOGGLE_INVITE_MODAL:
      updated.IsUserInviteModalOpen = payload.toggle;
      return updated;

    case MEMBER_UPDATE_NEW_MEMBER_REQUEST:
      if (payload.type == 'EMAIL') {
        updated.IsFetching = true;
      }
      return updated;

    case MEMBER_UPDATE_NEW_MEMBER__SUCCEEDED:
    case MEMBER_UPDATE_NEW_MEMBER__FAILED:
      tmpNewUser = tmpNewUsers[payload.index];
      if (payload.type == 'EMAIL') {
        tmpNewUser.Email = payload.value;
        tmpNewUser.IsValidate = payload.isValidate;
        tmpNewUser.ErrorMsg = payload.isValidate ? '' : 'Email already existed';
      } else if (payload.type == 'FIRST_NAME') {
        tmpNewUser.FirstName = payload.value;
      } else if (payload.type == 'LAST_NAME') {
        tmpNewUser.LastName = payload.value;
      }
      tmpNewUsers[payload.index] = tmpNewUser;
      updated.NewUsers = tmpNewUsers;
      updated.IsFetching = false;
      return updated;

    case MEMBER_BLUR_NEW_MEMBER_EMAIL:
      tmpNewUser = tmpNewUsers[payload.index];
      if (!isValidEmail(tmpNewUser.Email)) {
        tmpNewUser.IsValidate = false;
        tmpNewUser.ErrorMsg = 'Email is invalid';
      } else {
        if (tmpNewUser.IsValidate) {
          tmpNewUser.IsValidate = true;
          tmpNewUser.ErrorMsg = '';
        }
      }
      tmpNewUsers[payload.index] = tmpNewUser;
      updated.NewUsers = tmpNewUsers;
      return updated;

    case MEMBER_ADD_NEW_MEMBER_FORM:
      tmpNewUsers.push(Object.assign({}, NewUser));
      updated.NewUsers = tmpNewUsers;
      return updated;

    case MEMBER_DELETE_NEW_MEMBER_FORM:
      tmpNewUsers.splice(payload.index, 1);
      updated.NewUsers = tmpNewUsers;
      return updated;

    case MEMBER_UPDATE_NEW_MEMBER_CHANNEL_SEARCH_REQUESTED:
      return updated;

    case MEMBER_UPDATE_NEW_MEMBER_CHANNEL_SEARCH__SUCCEEDED:
      updated.NewUserChannels = payload.userChannels;
      return updated;

    case MEMBER_UPDATE_NEW_MEMBER_CHANNEL_SEARCH__FAILED:
      return updated;

    case MEMBER_UPDATE_NEW_MEMBER_ROLE_SELECT:
      updated.NewUserSelectedOptions = payload.options;
      return updated;

    case MEMBER_UPDATE_NEW_MEMBER_CREATE_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case MEMBER_UPDATE_NEW_MEMBER_CREATE__SUCCEEDED:
      updated.IsUserInviteModalOpen = false;
      tmpIndex = payload.users.length;
      payload.users = payload.users.concat(tmpUsers);
      payload.users.splice(updated.UserPageLimit, tmpIndex);
      updated.NewUsers = [Object.assign({}, NewUser)];
      updated.NewUserSelectedOptions = [];
      updated.IsFetching = false;
      updated.Users = payload.users;
      return updated;

    case MEMBER_UPDATE_NEW_MEMBER_CREATE__FAILED:
      updated.IsFetching = false;
      return updated;

    case MEMBER_FETCH_MEMBER_VIEW_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case MEMBER_FETCH_MEMBER_VIEW__SUCCEEDED:
      if (payload.toggle) {
        updated.IsFetching = false;
        updated.IsUserModalOpen = true;
        payload.user.IsValidate = true;
        payload.user.ErrorMsg = '';
        updated.User = payload.user;
        updated.EditUserSelectedOptions = payload.user.Roles;
      } else {
        updated.IsFetching = false;
        updated.IsUserModalOpen = false;
        updated.User = null;
      }
      return updated;

    case MEMBER_FETCH_MEMBER_VIEW__FAILED:
      updated.IsFetching = false;
      updated.IsUserModalOpen = false;
      return updated;

    case MEMBER_UPDATE_MEMBER_INPUT_REQUESTED:
      if (payload.type == 'EMAIL') {
        updated.IsFetching = true;
      }
      return updated;

    case MEMBER_UPDATE_MEMBER_INPUT__SUCCEEDED:
    case MEMBER_UPDATE_MEMBER_INPUT__FAILED:
      if (payload.type == 'EMAIL') {
        tmpUser.Email = payload.value;
        tmpUser.IsValidate = payload.isValidate;
        tmpUser.ErrorMsg = payload.isValidate ? '' : 'Email already existed';
      } else if (payload.type == 'FIRST_NAME') {
        tmpUser.FirstName = payload.value;
      } else if (payload.type == 'LAST_NAME') {
        tmpUser.LastName = payload.value;
      }
      updated.User = tmpUser;
      updated.IsFetching = false;
      return updated;

    case MEMBER_UPDATE_MEMBER_ENABLE:
      tmpUser.Enabled = payload.toggle;
      updated.User = tmpUser;
      return updated;

    case MEMBER_UPDATE_EDIT_MEMBER_ROLE_SELECT:
      tmpRoles = [];
      payload.options.forEach(role => {
        switch (role.value) {
          case 'ADMIN':
            tmpRoles.push('keycloakOrgAdmin');
            break;
          case 'CONTENT':
            tmpRoles.push('keycloakContentAdmin');
            break;
          case 'PUBLISH':
            tmpRoles.push('keycloakPublishAdmin');
            tmpRoles.push('keycloakChannelAdmin');
            break;
          case 'USER_MANAGE':
            tmpRoles.push('keycloakUserManageAdmin');
            break;
          case 'LANGUAGE':
            tmpRoles.push('keycloakLanguageAdmin');
            break;
          case 'ANALYTICS':
            tmpRoles.push('keycloakAnalyticsAdmin');
            break;
        }
      });
      updated.EditUserSelectedOptions = tmpRoles;
      return updated;

    case MEMBER_UPDATE_MEMBER_REQUESTED:
      updated.IsFetching = false;
      return updated;

    case MEMBER_UPDATE_MEMBER__SUCCEEDED:
      tmpUsers = tmpUsers.map(user => {
        if (user.UserGUID == payload.user.UserGUID) {
          return payload.user;
        } else {
          return user;
        }
      });
      updated.User = null;
      updated.EditUserSelectedOptions = [];
      updated.IsUserModalOpen = false;
      updated.Users = tmpUsers;
      updated.IsFetching = true;
      return updated;

    case MEMBER_UPDATE_MEMBER__FAILED:
      updated.IsFetching = false;
      return updated;

    case MEMBER_DELETE_MEMBER__SUCCEEDED:
      tmpUsers.forEach((user, index) => {
        if (user.UserGUID == payload.userGUID) {
          tmpIndex = index;
        }
      });
      tmpUsers.splice(tmpIndex, 1);
      updated.User = null;
      updated.EditUserSelectedOptions = [];
      updated.Users = tmpUsers;

      updated.IsUserModalOpen = false;
      updated.IsUserDeleteModalOpen = false;
      return updated;

    case MEMBER_BLUR_MEMBER_EMAIL:
      if (!isValidEmail(tmpUser.Email)) {
        tmpUser.IsValidate = false;
        tmpUser.ErrorMsg = 'Email is invalid';
      } else {
        if (tmpUser.IsValidate) {
          tmpUser.IsValidate = true;
          tmpUser.ErrorMsg = '';
        }
      }
      updated.User = tmpUser;
      return updated;

    case MEMBER_TOGGLE_MEMBER_PASSWORD_MODAL:
      if (payload.toggle) {
        updated.PasswordUserGUID = payload.userGUID;
        updated.IsUserPasswordModalOpen = true;
      } else {
        updated.PasswordUserGUID = null;
        updated.IsUserPasswordModalOpen = false;
      }
      return updated;

    case MEMBER_RESET_PASSWORD_REQUEST:
      updated.IsFetching = true;
      return updated;

    case MEMBER_RESET_PASSWORD__SUCCEEDED:
      updated.IsUserPasswordModalOpen = false;
      updated.IsFetching = false;
      return updated;

    case MEMBER_RESET_PASSWORD__FAILED:
      updated.IsFetching = false;
      return updated;

    case MEMBER_TOGGLE_MEMBER_DELETE_MODAL:
      if (payload.toggle) {
        updated.DeleteUserGUID = payload.userGUID;
        updated.IsUserDeleteModalOpen = true;
      } else {
        updated.DeleteUserGUID = null;
        updated.IsUserDeleteModalOpen = false;
      }
      return updated;

    case MEMBER_UPDATE_SELECT_MODE:
      if (payload.toggle) {
        tmpSelectedUsers.push(payload.user);
        tmpUsers.forEach(user => {
          if (user.UserGUID == payload.user.UserGUID) {
            user.IsSelected = true;
          }
        });
      } else {
        tmpSelectedUsers = [];
        tmpUsers.forEach(user => {
          user.IsSelected = false;
        });
      }
      updated.Users = tmpUsers;
      updated.SelectedUsers = tmpSelectedUsers;
      updated.IsSelectMode = payload.toggle;
      return updated;

    case MEMBER_TOGGLE_MEMBER_SELECT:
      if (payload.toggle) {
        tmpSelectedUsers.push(payload.user);
        tmpUsers.forEach(user => {
          if (user.UserGUID == payload.user.UserGUID) {
            user.IsSelected = true;
          }
        });
      } else {
        tmpUsers.forEach(user => {
          if (user.UserGUID == payload.user.UserGUID) {
            user.IsSelected = false;
          }
        });
        tmpSelectedUsers = tmpSelectedUsers.filter(
          user => user.UserGUID != payload.user.UserGUID
        );
        if (!tmpSelectedUsers.length) {
          updated.IsSelectMode = false;
        }
      }
      updated.Users = tmpUsers;
      updated.SelectedUsers = tmpSelectedUsers;
      return updated;

    case MEMBER_TOGGLE_MEMBER_SELECT_ALL:
      updated.Users.forEach(user => {
        user.IsSelected = true;
      });
      updated.SelectedUsers = updated.Users;
      return updated;

    case MEMBER_TOGGLE_GRANT_ACCESS_MODAL:
      updated.IsGrantAccessModalOpen = payload.toggle;
      return updated;

    case MEMBER_UPDATE_SELECTED_MEMBER_ROLE_SELECT:
      tmpRoles = [];
      payload.options.forEach(role => {
        switch (role.value) {
          case 'ADMIN':
            tmpRoles.push('keycloakOrgAdmin');
            break;
          case 'CONTENT':
            tmpRoles.push('keycloakContentAdmin');
            break;
          case 'PUBLISH':
            tmpRoles.push('keycloakPublishAdmin');
            tmpRoles.push('keycloakChannelAdmin');
            break;
          case 'USER_MANAGE':
            tmpRoles.push('keycloakUserManageAdmin');
            break;
          case 'LANGUAGE':
            tmpRoles.push('keycloakLanguageAdmin');
            break;
          case 'ANALYTICS':
            tmpRoles.push('keycloakAnalyticsAdmin');
            break;
        }
      });
      updated.SelectedUsersSelectedOptions = tmpRoles;
      return updated;

    case MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS__SUCCEEDED:
      payload.roles = payload.roles.map(role => {
        switch (role) {
          case 'keycloakOrgAdmin':
            return 'org-admin';
          case 'keycloakContentAdmin':
            return 'content-admin';
          case 'keycloakPublishAdmin':
            return 'publish-admin';
          case 'keycloakChannelAdmin':
            return 'channel-admin';
          case 'keycloakUserManageAdmin':
            return 'user-manage-admin';
          case 'keycloakLanguageAdmin':
            return 'language-admin';
          case 'keycloakAnalyticsAdmin':
            return 'analytics-admin';
        }
      });

      tmpUsers.forEach(user => {
        if (payload.users.indexOf(user.UserGUID) != -1) {
          payload.roles.forEach(role => {
            if (!payload.isGrant) {
              user.Roles = user.Roles.replace(role, '');
            } else {
              if (!user.Roles.includes(role)) user.Roles += ',' + role;
            }
          });
        }
      });
      updated.IsGrantAccessModalOpen = false;
      updated.IsRemoveAccessModalOpen = false;
      updated.Users = tmpUsers;
      updated.IsFetching = false;
      return updated;

    case MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS__FAILED:
      updated.IsFetching = false;
      return updated;

    case MEMBER_TOGGLE_REMOVE_ACCESS_MODAL:
      updated.IsRemoveAccessModalOpen = payload.toggle;
      return updated;

    case MEMBER_TOGGLE_MEMBERS_LOCK_MODAL:
      updated.IsUserLockModalOpen = payload.toggle;
      updated.UserLockModalType = payload.type;
      return updated;

    case MEMBER_TOGGLE_MEMBERS_LOCK__SUCCEEDED:
      updated.IsUserLockModalOpen = false;
      updated.UserLockModalType = null;
      return updated;

    case MEMBER_TOGGLE_DELETE_MEMBERS_MODAL:
      updated.IsUsersDeleteModalOpen = payload.toggle;
      return updated;

    case MEMBER_TOGGLE_DELETE_MEMBERS__SUCCEEDED:
      tmpUsers = tmpUsers.filter(user => {
        if (!payload.users.includes(user.UserGUID)) {
          return user;
        }
      });
      tmpUsers.forEach(user => {
        user.IsSelected = false;
      });
      updated.IsSelectMode = false;
      updated.Users = tmpUsers;
      updated.IsUsersDeleteModalOpen = false;
      return updated;

    default:
      return previousState;
  }
};

export default memberReducer;

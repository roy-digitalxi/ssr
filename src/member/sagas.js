import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import FormData from 'form-data';
import * as selectors from './Selectors';

// config
import config from '../config';

// helpers
import * as apiManager from '../helpers/apiManager';
import * as helpers from '../helpers/index';

import {
  MEMBER_UPDATE_INFO_SEARCH_REQUESTED,
  MEMBER_UPDATE_INFO_SEARCH__SUCCEEDED,
  MEMBER_UPDATE_INFO_SEARCH__FAILED,
  MEMBER_UPDATE_PAGE_INDEX_REQUEST,
  MEMBER_UPDATE_PAGE_INDEX__SUCCEEDED,
  MEMBER_UPDATE_PAGE_INDEX__FAILED,
  MEMBER_UPDATE_NEW_MEMBER_REQUEST,
  MEMBER_UPDATE_NEW_MEMBER__SUCCEEDED,
  MEMBER_UPDATE_NEW_MEMBER__FAILED,
  MEMBER_UPDATE_NEW_MEMBER_CREATE_REQUESTED,
  MEMBER_UPDATE_NEW_MEMBER_CREATE__SUCCEEDED,
  MEMBER_UPDATE_NEW_MEMBER_CREATE__FAILED,
  MEMBER_FETCH_MEMBER_VIEW_REQUESTED,
  MEMBER_FETCH_MEMBER_VIEW__SUCCEEDED,
  MEMBER_FETCH_MEMBER_VIEW__FAILED,
  MEMBER_UPDATE_MEMBER_INPUT_REQUESTED,
  MEMBER_UPDATE_MEMBER_INPUT__SUCCEEDED,
  MEMBER_UPDATE_MEMBER_INPUT__FAILED,
  MEMBER_UPDATE_MEMBER_REQUESTED,
  MEMBER_UPDATE_MEMBER__SUCCEEDED,
  MEMBER_UPDATE_MEMBER__FAILED,
  MEMBER_DELETE_MEMBER_REQUESTED,
  MEMBER_DELETE_MEMBER__SUCCEEDED,
  MEMBER_DELETE_MEMBER__FAILED,
  MEMBER_RESET_PASSWORD_REQUEST,
  MEMBER_RESET_PASSWORD__SUCCEEDED,
  MEMBER_RESET_PASSWORD__FAILED,
  MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS_REQUESTED,
  MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS__SUCCEEDED,
  MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS__FAILED,
  MEMBER_TOGGLE_MEMBERS_LOCK_REQUESTED,
  MEMBER_TOGGLE_MEMBERS_LOCK__SUCCEEDED,
  MEMBER_TOGGLE_MEMBERS_LOCK__FAILED,
  MEMBER_TOGGLE_DELETE_MEMBERS_REQUESTED,
  MEMBER_TOGGLE_DELETE_MEMBERS__SUCCEEDED,
  MEMBER_TOGGLE_DELETE_MEMBERS__FAILED
} from './constants';

import { dxKeycloakUpdate, dxKeycloakLogout } from '../actions';

// user info search
export const dxMemberSearchInfoUrl = (params, keycloak) => {
  const searchRoles = [];
  params.searchRoles.forEach(role => {
    switch (role.value) {
      case 'ADMIN':
        searchRoles.push('keycloakOrgAdmin');
        break;
      case 'CONTENT':
        searchRoles.push('keycloakContentAdmin');
        break;
      case 'PUBLISH':
        searchRoles.push('keycloakPublishAdmin');
        searchRoles.push('keycloakChannelAdmin');
        break;
      case 'USER_MANAGE':
        searchRoles.push('keycloakUserManageAdmin');
        break;
      case 'LANGUAGE':
        searchRoles.push('keycloakLanguageAdmin');
        break;
      case 'ANALYTICS':
        searchRoles.push('keycloakAnalyticsAdmin');
        break;
    }
  });
  let formattedParams = {
    IsTeamMember: '1',
    Limit: params.userPerPage.toString(),
    Offset: '0',
    Extra: {
      SearchType: 'FIRST_LAST_NAME_EMAIL',
      SearchField: params.searchVal,
      FilterType: 'ROLE_FILTER',
      FilterField: searchRoles
    }
  };
  return apiManager.dxApi(`/manage/user_list`, formattedParams, true, keycloak);
};
export function* dxMemberSearchInfo(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxMemberSearchInfoUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: MEMBER_UPDATE_INFO_SEARCH__FAILED,
        payload: {
          message: 'User search list api error'
        }
      });
    } else {
      yield put({
        type: MEMBER_UPDATE_INFO_SEARCH__SUCCEEDED,
        payload: {
          searchVal: action.payload.searchVal,
          options: action.payload.searchRoles,
          pageLimit: action.payload.userPerPage,
          users: Response.Users,
          totalRecord: Response.TotalRecord
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxMemberSearchInfoSaga() {
  yield takeEvery(MEMBER_UPDATE_INFO_SEARCH_REQUESTED, dxMemberSearchInfo);
}

// user page index select
export const dxMemberSelectPageIndexUrl = (params, keycloak) => {
  const searchRoles = [];
  params.searchRoles.forEach(role => {
    switch (role.value) {
      case 'ADMIN':
        searchRoles.push('keycloakOrgAdmin');
        break;
      case 'CONTENT':
        searchRoles.push('keycloakContentAdmin');
        break;
      case 'PUBLISH':
        searchRoles.push('keycloakPublishAdmin');
        searchRoles.push('keycloakChannelAdmin');
        break;
      case 'USER_MANAGE':
        searchRoles.push('keycloakUserManageAdmin');
        break;
      case 'LANGUAGE':
        searchRoles.push('keycloakLanguageAdmin');
        break;
      case 'ANALYTICS':
        searchRoles.push('keycloakAnalyticsAdmin');
        break;
    }
  });
  let formattedParams = {
    IsTeamMember: '1',
    Limit: params.userPerPage.toString(),
    Offset: (params.pageIndex * params.userPerPage).toString(),
    Extra: {
      SearchType: 'FIRST_LAST_NAME_EMAIL',
      SearchField: params.searchVal,
      FilterType: 'ROLE_FILTER',
      FilterField: searchRoles
    }
  };
  return apiManager.dxApi(`/manage/user_list`, formattedParams, true, keycloak);
};
export function* dxMemberSelectPageIndex(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxMemberSelectPageIndexUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: MEMBER_UPDATE_PAGE_INDEX__FAILED,
        payload: {
          message: 'User search list api error'
        }
      });
    } else {
      yield put({
        type: MEMBER_UPDATE_PAGE_INDEX__SUCCEEDED,
        payload: {
          pageIndex: action.payload.pageIndex,
          users: Response.Users,
          totalRecord: Response.TotalRecord
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxMemberSelectPageIndexSaga() {
  yield takeEvery(MEMBER_UPDATE_PAGE_INDEX_REQUEST, dxMemberSelectPageIndex);
}

// user new user update
export const dxMemberUpdateNewMemberUrl = (params, keycloak) => {
  let formattedParams = {
    Email: params.value
  };
  return apiManager.dxApi(
    `/manage/sync_email`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxMemberUpdateNewMember(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const { index, type, value } = action.payload;
    if (type == 'EMAIL' && helpers.isValidEmail(value)) {
      const response = yield call(
        dxMemberUpdateNewMemberUrl,
        action.payload,
        keycloak
      );

      if (response.isTokenRefreshed) {
        yield put(dxKeycloakUpdate(response.keycloak));
      }

      let { Confirmation, Response, Message } = response.data;
      if (Confirmation !== 'SUCCESS') {
        yield put({
          type: MEMBER_UPDATE_NEW_MEMBER__FAILED,
          payload: {
            index,
            type,
            value,
            isValidate: false
          }
        });
      } else {
        yield put({
          type: MEMBER_UPDATE_NEW_MEMBER__SUCCEEDED,
          payload: {
            index,
            type,
            value,
            isValidate: true
          }
        });
      }
    } else {
      yield put({
        type: MEMBER_UPDATE_NEW_MEMBER__SUCCEEDED,
        payload: {
          index,
          type,
          value,
          isValidate: true
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxMemberUpdateNewMemberSaga() {
  yield takeEvery(MEMBER_UPDATE_NEW_MEMBER_REQUEST, dxMemberUpdateNewMember);
}

// user new user create
export const dxMemberNewMemberCreateUrl = (params, keycloak) => {
  let formattedParams = {
    Users: params.users,
    IsTeamMember: '1',
    Roles: params.roles
  };
  return apiManager.dxApi(
    `/manage/create_user`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxMemberNewMemberCreate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxMemberNewMemberCreateUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: MEMBER_UPDATE_NEW_MEMBER_CREATE__FAILED,
        payload: {
          message: 'User create api error'
        }
      });
    } else {
      yield put({
        type: MEMBER_UPDATE_NEW_MEMBER_CREATE__SUCCEEDED,
        payload: {
          users: Response.Users,
          message: 'User invite(s) has been sent'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxMemberNewMemberCreateSaga() {
  yield takeEvery(
    MEMBER_UPDATE_NEW_MEMBER_CREATE_REQUESTED,
    dxMemberNewMemberCreate
  );
}

// user info search
export const dxMemberViewMemberUrl = (params, keycloak) => {
  let formattedParams = {
    IsTeamMember: '1',
    UserID: params.userGUID
  };
  return apiManager.dxApi(`/manage/view_user`, formattedParams, true, keycloak);
};
export function* dxMemberViewMember(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const { toggle } = action.payload;
    if (toggle) {
      const response = yield call(
        dxMemberViewMemberUrl,
        action.payload,
        keycloak
      );

      if (response.isTokenRefreshed) {
        yield put(dxKeycloakUpdate(response.keycloak));
      }

      let { Confirmation, Response, Message } = response.data;
      if (Confirmation !== 'SUCCESS') {
        yield put({
          type: MEMBER_FETCH_MEMBER_VIEW__FAILED,
          payload: {
            message: 'User view api error'
          }
        });
      } else {
        yield put({
          type: MEMBER_FETCH_MEMBER_VIEW__SUCCEEDED,
          payload: {
            user: Response.User,
            toggle
          }
        });
      }
    } else {
      yield put({
        type: MEMBER_FETCH_MEMBER_VIEW__SUCCEEDED,
        payload: {
          toggle
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxMemberViewMemberSaga() {
  yield takeEvery(MEMBER_FETCH_MEMBER_VIEW_REQUESTED, dxMemberViewMember);
}

// user input update
export const dxMemberInputUpdateUrl = (params, keycloak) => {
  let formattedParams = {
    UserID: params.userGUID,
    Email: params.value
  };
  return apiManager.dxApi(
    `/manage/sync_email`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxMemberInputUpdate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const { type, value } = action.payload;
    if (type == 'EMAIL' && helpers.isValidEmail(value)) {
      const response = yield call(
        dxMemberInputUpdateUrl,
        action.payload,
        keycloak
      );

      if (response.isTokenRefreshed) {
        yield put(dxKeycloakUpdate(response.keycloak));
      }

      let { Confirmation, Response, Message } = response.data;
      if (Confirmation !== 'SUCCESS') {
        yield put({
          type: MEMBER_UPDATE_MEMBER_INPUT__FAILED,
          payload: {
            type,
            value,
            isValidate: false
          }
        });
      } else {
        yield put({
          type: MEMBER_UPDATE_MEMBER_INPUT__SUCCEEDED,
          payload: {
            type,
            value,
            isValidate: true
          }
        });
      }
    } else {
      yield put({
        type: MEMBER_UPDATE_MEMBER_INPUT__SUCCEEDED,
        payload: {
          type,
          value,
          isValidate: true
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxMemberInputUpdateSaga() {
  yield takeEvery(MEMBER_UPDATE_MEMBER_INPUT_REQUESTED, dxMemberInputUpdate);
}

// user update user
export const dxMemberUpdateMemberUrl = (params, keycloak) => {
  return apiManager.dxApi(`/manage/update_user`, params.user, true, keycloak);
};
export function* dxMemberUpdateMember(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxMemberUpdateMemberUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: MEMBER_UPDATE_MEMBER__FAILED,
        payload: {
          message: 'User update api error'
        }
      });
    } else {
      yield put({
        type: MEMBER_UPDATE_MEMBER__SUCCEEDED,
        payload: {
          user: Response.User,
          message: 'User has been updated'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxMemberUpdateMemberSaga() {
  yield takeEvery(MEMBER_UPDATE_MEMBER_REQUESTED, dxMemberUpdateMember);
}

// user delete user
export const dxMemberDeleteMemberUrl = (params, keycloak) => {
  const formattedParams = {
    UserID: params.userGUID
  };
  return apiManager.dxApi(
    `/manage/delete_user`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxMemberDeleteMember(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxMemberDeleteMemberUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: MEMBER_DELETE_MEMBER__FAILED,
        payload: {
          message: 'User delete api error'
        }
      });
    } else {
      yield put({
        type: MEMBER_DELETE_MEMBER__SUCCEEDED,
        payload: {
          userGUID: action.payload.userGUID,
          message: 'User has been deleted'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxMemberDeleteMemberSaga() {
  yield takeEvery(MEMBER_DELETE_MEMBER_REQUESTED, dxMemberDeleteMember);
}

// user reset password
export const dxMemberResetPasswordUrl = (params, keycloak) => {
  const formattedParams = {
    UserID: params.userGUID,
    Password: params.password
  };
  return apiManager.dxApi(
    `/manage/reset_user_password`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxMemberResetPassword(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxMemberResetPasswordUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: MEMBER_RESET_PASSWORD__FAILED,
        payload: {
          message: 'User reset password api error'
        }
      });
    } else {
      yield put({
        type: MEMBER_RESET_PASSWORD__SUCCEEDED,
        payload: {
          message: 'email has been sent'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxMemberResetPasswordSaga() {
  yield takeEvery(MEMBER_RESET_PASSWORD_REQUEST, dxMemberResetPassword);
}

// user selected users grant access
export const dxMemberSelectedMemberGrantAccessUrl = (params, keycloak) => {
  let formattedParams = {
    Users: params.users,
    IsAdd: params.isGrant ? '1' : '0',
    Roles: params.roles
  };
  return apiManager.dxApi(
    `/manage/update_user_roles`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxMemberSelectedMemberGrantAccess(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxMemberSelectedMemberGrantAccessUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS__FAILED,
        payload: {
          message: 'User roles update api error'
        }
      });
    } else {
      yield put({
        type: MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS__SUCCEEDED,
        payload: {
          users: action.payload.users,
          roles: action.payload.roles,
          isGrant: action.payload.isGrant,
          message: 'User roles has been updated'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxMemberSelectedMemberGrantAccessSaga() {
  yield takeEvery(
    MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS_REQUESTED,
    dxMemberSelectedMemberGrantAccess
  );
}

// user selected users toggle lock
export const dxMemberSelectedMemberToggleLockUrl = (params, keycloak) => {
  let formattedParams = {
    Users: params.users,
    Enabled: params.toggle ? '0' : '1'
  };
  return apiManager.dxApi(
    `/manage/update_user_enabled`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxMemberSelectedMemberToggleLock(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxMemberSelectedMemberToggleLockUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: MEMBER_TOGGLE_MEMBERS_LOCK__FAILED,
        payload: {
          message: 'User update enable api error'
        }
      });
    } else {
      yield put({
        type: MEMBER_TOGGLE_MEMBERS_LOCK__SUCCEEDED,
        payload: {
          message: 'Users has been updated'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxMemberSelectedMemberToggleLockSaga() {
  yield takeEvery(
    MEMBER_TOGGLE_MEMBERS_LOCK_REQUESTED,
    dxMemberSelectedMemberToggleLock
  );
}

// user selected users delete
export const dxMemberSelectedMemberDeleteUrl = (params, keycloak) => {
  let formattedParams = {
    Users: params.users
  };
  return apiManager.dxApi(
    `/manage/delete_users`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxMemberSelectedMemberDelete(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxMemberSelectedMemberDeleteUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: MEMBER_TOGGLE_DELETE_MEMBERS__FAILED,
        payload: {
          message: 'User delete api error'
        }
      });
    } else {
      yield put({
        type: MEMBER_TOGGLE_DELETE_MEMBERS__SUCCEEDED,
        payload: {
          users: action.payload.users,
          message: 'Users has been deleted'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxMemberSelectedMemberDeleteSaga() {
  yield takeEvery(
    MEMBER_TOGGLE_DELETE_MEMBERS_REQUESTED,
    dxMemberSelectedMemberDelete
  );
}

import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import * as selectors from './Selectors';
import config from '../config';
import * as apiManager from '../helpers/apiManager';

import {
  ADMIN_FETCH_ORG_LIST_REQUESTED,
  ADMIN_FETCH_ORG_LIST__SUCCEEDED,
  ADMIN_FETCH_ORG_LIST__FAILED,
  ADMIN_CREATE_ORG_REQUESTED,
  ADMIN_CREATE_ORG__SUCCEEDED,
  ADMIN_CREATE_ORG__FAILED,
  ADMIN_VIEW_ORG_REQUESTED,
  ADMIN_VIEW_ORG__SUCCEEDED,
  ADMIN_VIEW_ORG__FAILED,
  ADMIN_UPDATE_ORG_REQUESTED,
  ADMIN_UPDATE_ORG__SUCCEEDED,
  ADMIN_UPDATE_ORG__FAILED,
  ADMIN_UPDATE_ORG_STATUS_REQUESTED,
  ADMIN_UPDATE_ORG_STATUS__SUCCEEDED,
  ADMIN_UPDATE_ORG_STATUS__FAILED
} from './constants';

import { dxKeycloakUpdate, dxKeycloakLogout } from '../actions';

// admin fetch org list
export const dxAdminFetchOrgListUrl = (params, keycloak) => {
  const formattedParams = {
    Limit: '-1',
    Offset: '0',
    Extra: {}
  };
  return apiManager.dxApi(`/admin/org_list`, formattedParams, true, keycloak);
};
export function* dxAdminFetchOrgList(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxAdminFetchOrgListUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: ADMIN_FETCH_ORG_LIST__FAILED,
        payload: {
          message: 'Admin org list api error'
        }
      });
    } else {
      yield put({
        type: ADMIN_FETCH_ORG_LIST__SUCCEEDED,
        payload: {
          totalRecord: Response.TotalRecord,
          orgs: Response.Orgs
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAdminAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxAdminFetchOrgListSaga() {
  yield takeEvery(ADMIN_FETCH_ORG_LIST_REQUESTED, dxAdminFetchOrgList);
}

// admin create org
export const dxAdminCreateOrgUrl = (params, keycloak) => {
  return apiManager.dxApi(`/admin/create_org`, params.org, true, keycloak);
};
export function* dxAdminCreateOrg(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxAdminCreateOrgUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: ADMIN_CREATE_ORG__FAILED,
        payload: {
          message: 'Admin create org api error'
        }
      });
    } else {
      yield put({
        type: ADMIN_CREATE_ORG__SUCCEEDED,
        payload: {
          org: Response.Org,
          message: 'Org has been created'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAdminAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxAdminCreateOrgSaga() {
  yield takeEvery(ADMIN_CREATE_ORG_REQUESTED, dxAdminCreateOrg);
}

// admin create org
export const dxAdminViewOrgUrl = (params, keycloak) => {
  const formattedParams = {
    OrgGUID: params.orgGUID
  };
  return apiManager.dxApi(`/admin/view_org`, formattedParams, true, keycloak);
};
export function* dxAdminViewOrg(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxAdminViewOrgUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: ADMIN_VIEW_ORG__FAILED,
        payload: {
          message: 'Admin view org api error'
        }
      });
    } else {
      yield put({
        type: ADMIN_VIEW_ORG__SUCCEEDED,
        payload: {
          org: Response.Org,
          type: action.payload.type
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAdminAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxAdminViewOrgSaga() {
  yield takeEvery(ADMIN_VIEW_ORG_REQUESTED, dxAdminViewOrg);
}

// admin update org
export const dxAdminUpdateOrgUrl = (params, keycloak) => {
  const formattedParams = {
    OrgGUID: params.org.OrgGUID,
    OrgName: params.org.OrgName
  };
  return apiManager.dxApi(`/admin/update_org`, formattedParams, true, keycloak);
};
export function* dxAdminUpdateOrg(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxAdminUpdateOrgUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: ADMIN_UPDATE_ORG__FAILED,
        payload: {
          message: 'Admin update org api error'
        }
      });
    } else {
      yield put({
        type: ADMIN_UPDATE_ORG__SUCCEEDED,
        payload: {
          org: Response.Org,
          message: 'Org has been updated'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAdminAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxAdminUpdateOrgSaga() {
  yield takeEvery(ADMIN_UPDATE_ORG_REQUESTED, dxAdminUpdateOrg);
}

// admin update org status
export const dxAdminUpdateOrgStatusUrl = (params, keycloak) => {
  const formattedParams = {
    OrgGUID: params.orgGUID,
    IsActive: params.toggle ? '1' : '0'
  };
  return apiManager.dxApi(
    `/admin/update_org_status`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxAdminUpdateOrgStatus(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxAdminUpdateOrgStatusUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: ADMIN_UPDATE_ORG_STATUS__FAILED,
        payload: {
          message: 'Admin update org status api error'
        }
      });
    } else {
      yield put({
        type: ADMIN_UPDATE_ORG_STATUS__SUCCEEDED,
        payload: {
          org: Response.Org,
          message: 'Org status has been updated'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAdminAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxAdminUpdateOrgStatusSaga() {
  yield takeEvery(ADMIN_UPDATE_ORG_STATUS_REQUESTED, dxAdminUpdateOrgStatus);
}

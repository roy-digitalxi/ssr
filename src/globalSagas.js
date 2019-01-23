import { all, call, put, takeEvery } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';

import * as apiManager from './helpers/apiManager';

import {
  NAVIGATE_HISTORY_REQUESTED,
  NAVIGATE_HISTORY__SUCCEEDED,
  NAVIGATE_HISTORY__FAILED,
  ALERT_REQUESTED,
  ALERT__SUCCEEDED,
  ALERT__FAILED,
  LOADING_REQUESTED,
  LOADING__SUCCEEDED,
  LOADING__FAILED,
  KEYCLOAK_ROUTE_REQUESTED,
  KEYCLOAK_ROUTE__SUCCESS,
  KEYCLOAK_ROUTE__FAILED
} from './constants';

import { dxKeycloakLogout } from './actions';

// Navigate history
export function* dxNavigateHistory(action) {
  try {
    yield put({
      type: NAVIGATE_HISTORY__SUCCEEDED,
      payload: {
        history: action.payload.history
      }
    });
  } catch (error) {
    yield put({
      type: NAVIGATE_HISTORY__FAILED,
      payload: error
    });
  }
}

export function* dxNavigateHistorySaga() {
  yield takeEvery(NAVIGATE_HISTORY_REQUESTED, dxNavigateHistory);
}

// Alert
export function* dxAlert(action) {
  try {
    yield put({
      type: ALERT__SUCCEEDED,
      payload: {
        isDisplay: action.payload.isDisplay,
        isError: action.payload.isError,
        message: action.payload.message
      }
    });
  } catch (error) {
    yield put({
      type: ALERT__FAILED,
      payload: error
    });
  }
}

export function* dxAlertSaga() {
  yield takeEvery(ALERT_REQUESTED, dxAlert);
}

// Loading
export function* dxLoading(action) {
  try {
    yield put({
      type: LOADING__SUCCEEDED,
      payload: {
        isLoading: action.payload.isLoading
      }
    });
  } catch (error) {
    yield put({
      type: LOADING__FAILED,
      payload: error
    });
  }
}

export function* dxLoadingSaga() {
  yield takeEvery(LOADING_REQUESTED, dxLoading);
}

// Keycloak route
export const dxKeycloakRouteUrl = payload => {
  const formattedParams = {
    OrgUrl: payload.orgUrl
  };
  return apiManager.dxApi(`/org/route`, formattedParams, true);
};

export function* dxKeycloakRoute(action) {
  try {
    const response = yield call(dxKeycloakRouteUrl, action.payload);
    let { Confirmation, Response, Message } = response.data;
    if (Confirmation == 'SUCCESS') {
      yield put({
        type: KEYCLOAK_ROUTE__SUCCESS,
        payload: {
          org: Response.Org
        }
      });
    } else {
      yield put({
        type: KEYCLOAK_ROUTE__FAILED,
        payload: {}
      });
    }
  } catch (error) {
    yield put(dxKeycloakLogout());
  }
}

export function* dxKeycloakRouteSaga() {
  yield takeEvery(KEYCLOAK_ROUTE_REQUESTED, dxKeycloakRoute);
}

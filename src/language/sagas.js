import { call, put, takeLatest, select } from 'redux-saga/effects';
import * as apiManager from '../helpers/apiManager';
import actions from './actions';
import * as constants from './constants';
import * as selectors from './Selectors';

import { dxKeycloakUpdate, dxKeycloakLogout } from '../actions';

// Api call languageList
export const languageApi = (payload, keycloak) => {
  return apiManager.dxApi('/language/list', payload, true, keycloak);
};

function* getLanguagesListSaga(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(languageApi, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    const { Confirmation, Response, Message } = response.data;
    if (Confirmation === 'SUCCESS') {
      yield put(actions.getLanguageListSuccess(Response.Languages));
    } else {
      yield put(actions.getLanguageListErrors(Message));
    }
  } catch (err) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

// Get Language

// Api call languageList
export const fetchLanguageApi = (payload, keycloak) => {
  return apiManager.dxApi('/language/view', payload, true, keycloak);
};

function* langugeViewSaga(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const { LanguageGUID } = action.payload;
    const data = {
      LanguageGUID
    };
    const response = yield call(fetchLanguageApi, data, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    const { Confirmation, Response, Message } = response.data;
    if (Confirmation === 'SUCCESS') {
      yield put(actions.languageViewSuccess(Response.Language));
    } else {
      yield put(actions.languageViewErrors(Message));
    }
  } catch (err) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

// Create saga

// Api call Add language
export const addLanguageApi = (payload, keycloak) => {
  return apiManager.dxApi('/language/create', payload, true, keycloak);
};

function* addLanguageSaga(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(addLanguageApi, action.payload.data, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    const { Confirmation, Response, Message } = response.data;
    if (Confirmation === 'SUCCESS') {
      yield put(actions.addLanguageSuccess(Response, Message));
    } else {
      yield put(actions.addLanguageErrors(Message));
    }
  } catch (err) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

// Update saga

// Api call Update
export const updateLanguageApi = (payload, keycloak) => {
  return apiManager.dxApi('/language/update', payload, true, keycloak);
};

function* updateLangugeSaga(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      updateLanguageApi,
      action.payload.data,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    const { Confirmation, Response, Message } = response.data;
    if (Confirmation === 'SUCCESS') {
      yield put(actions.updateLanguageSuccess(response.data, Message));
    } else {
      yield put(actions.updateLanguageErrors(Message));
    }
  } catch (err) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

// Api call IsActive
export const updateIsActiveApi = (payload, keycloak) => {
  const data = {
    LanguageGUID: payload.languageGUID,
    Status: payload.isActive ? '0' : '1'
  };
  return apiManager.dxApi('/language/update_status', data, true, keycloak);
};

function* updateIsActiveSaga(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(updateIsActiveApi, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    const { Confirmation, Response, Message } = response.data;
    if (Confirmation === 'SUCCESS') {
      yield put(actions.setIsActiveSuccess(action.payload, Message));
    } else {
      yield put(actions.setIsActiveErrors(Message));
    }
  } catch (err) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

// Api call IsDefault
export const updateIsDefaultApi = (payload, keycloak) => {
  const data = {
    LanguageGUID: payload
  };
  return apiManager.dxApi('/language/update_default', data, true, keycloak);
};

function* updateIsDefaultSaga(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(updateIsDefaultApi, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    const { Confirmation, Response, Message } = response.data;
    if (Confirmation === 'SUCCESS') {
      yield put(actions.setDefaultSuccess(action.payload, Message));
    } else {
      yield put(actions.setDefaultErrors(Message));
    }
  } catch (err) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export default function* dxLanguageSaga() {
  yield takeLatest(constants.GET_LANGUAGE_LIST_REQUEST, getLanguagesListSaga);
  yield takeLatest(
    constants.UPDATE_LANGUAGE_SET_ACTIVE_REQUEST,
    updateIsActiveSaga
  );
  yield takeLatest(
    constants.UPDATE_LANGUAGE_SET_DEFAULT_REQUEST,
    updateIsDefaultSaga
  );
  yield takeLatest(constants.ADD_LANGUAGE_REQUEST, addLanguageSaga);
  yield takeLatest(constants.UPDATE_LANGUAGE_REQUEST, updateLangugeSaga);
  yield takeLatest(constants.LANGUAGE_VIEW_REQUEST, langugeViewSaga);
}

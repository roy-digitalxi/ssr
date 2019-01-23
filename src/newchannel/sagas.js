import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import FormData from 'form-data';
import * as apiManager from '../helpers/apiManager';
import * as selectors from './Selectors';

import {
  CHANNEL_TYPE_REQUESTED,
  CHANNEL_TYPE__SUCCEEDED,
  CHANNEL_TYPE__FAILED,
  CHANNEL_VALUE_REQUESTED,
  CHANNEL_VALUE__SUCCEEDED,
  CHANNEL_VALUE__FAILED,
  CHANNEL_CODE_VALUE_REQUESTED,
  CHANNEL_CODE_VALUE__SUCCEEDED,
  CHANNEL_CODE_VALUE__FAILED,
  CHANNEL_CREATE_REQUESTED,
  CHANNEL_CREATE__SUCCEEDED,
  CHANNEL_CREATE__FAILED,
  CHANNEL_VIEW_REQUESTED,
  CHANNEL_VIEW__SUCCEEDED,
  CHANNEL_VIEW__FAILED,
  CHANNEL_UPDATE_REQUESTED,
  CHANNEL_UPDATE__SUCCEEDED,
  CHANNEL_UPDATE__FAILED,
  CHANNEL_FETCH_LANGUAGE_LIST_REQUESTED,
  CHANNEL_FETCH_LANGUAGE_LIST__SUCCEEDED,
  CHANNEL_FETCH_LANGUAGE_LIST__FAILED
} from './constants';

import { dxKeycloakUpdate, dxKeycloakLogout } from '../actions';

// Channel type request
export function* channelType(action) {
  try {
    yield put({
      type: CHANNEL_TYPE__SUCCEEDED,
      payload: {
        channelType: action.payload.channelType
      }
    });
  } catch (error) {
    yield put({
      type: CHANNEL_TYPE__FAILED,
      payload: error
    });
  }
}

export function* dxChannelTypeSaga() {
  yield takeEvery(CHANNEL_TYPE_REQUESTED, channelType);
}

//Channel Val update
export function* dxChannelValUpdate(action) {
  try {
    yield put({
      type: CHANNEL_VALUE__SUCCEEDED,
      payload: {
        type: action.payload.type,
        val: action.payload.val
      }
    });
  } catch (error) {
    yield put({
      type: CHANNEL_VALUE__FAILED,
      payload: error
    });
  }
}

export function* dxChannelValUpdateSaga() {
  yield takeEvery(CHANNEL_VALUE_REQUESTED, dxChannelValUpdate);
}

//Channel Code Val update
export const dxChannelSyncChannelCodeUrl = (payload, keycloak) => {
  const formattedParams = {
    ChannelCode: payload.val,
    ExperienceChannelGUID: payload.experienceChannelGUID
      ? payload.experienceChannelGUID
      : null
  };
  return apiManager.dxApi(
    `/channel/sync_channel_code`,
    formattedParams,
    true,
    keycloak
  );
};

export function* dxChannelCodeValUpdate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    if (action.payload.val) {
      const response = yield call(
        dxChannelSyncChannelCodeUrl,
        action.payload,
        keycloak
      );

      if (response.isTokenRefreshed) {
        yield put(dxKeycloakUpdate(response.keycloak));
      }

      let { Confirmation, Response, Message } = response.data;
      yield put({
        type: CHANNEL_CODE_VALUE__SUCCEEDED,
        payload: {
          type: action.payload.type,
          val: action.payload.val,
          available: Confirmation == 'SUCCESS' ? true : false
        }
      });
    } else {
      yield put({
        type: CHANNEL_CODE_VALUE__SUCCEEDED,
        payload: {
          type: action.payload.type,
          val: action.payload.val
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxChannelCodeValUpdateSaga() {
  yield takeEvery(CHANNEL_CODE_VALUE_REQUESTED, dxChannelCodeValUpdate);
}

// Channel create
export const dxChannelCreateUrl = (params, keycloak) => {
  const {
    ChannelType,
    ChannelColor,
    ChannelName,
    ChannelDescription,
    ChannelCode,
    ChannelLanguageGUID
  } = params.channel;
  const formattedParams = {
    ChannelType: ChannelType.toString(),
    ChannelColor: ChannelColor.trim(),
    ChannelName: ChannelName.trim(),
    ChannelDescription,
    ChannelCode: ChannelCode ? ChannelCode.trim() : null,
    ChannelLanguageGUID
  };
  return apiManager.dxApi(`/channel/create`, formattedParams, true, keycloak);
};

export function* dxChannelCreate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxChannelCreateUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation != 'SUCCESS') {
      yield put({
        type: CHANNEL_CREATE__FAILED,
        payload: {
          message: Message
        }
      });
    } else {
      yield put({
        type: CHANNEL_CREATE__SUCCEEDED,
        payload: {
          experience: Response,
          message: 'Channel has been created'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxChannelCreateSaga() {
  yield takeEvery(CHANNEL_CREATE_REQUESTED, dxChannelCreate);
}

// View Channel
export const dxViewChannelUrl = (params, keycloak) => {
  return apiManager.dxApi(
    `/channel/view`,
    { ExperienceChannelGUID: params.experienceChannelGUID },
    true,
    keycloak
  );
};

export function* dxViewChannel(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxViewChannelUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation != 'SUCCESS') {
      yield put({
        type: CHANNEL_VIEW__FAILED,
        payload: {
          message: 'Channel view api error'
        }
      });
    } else {
      yield put({
        type: CHANNEL_VIEW__SUCCEEDED,
        payload: {
          experienceChannel: Response
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxViewChannelSaga() {
  yield takeEvery(CHANNEL_VIEW_REQUESTED, dxViewChannel);
}

// Channel update
export const dxChannelUpdateUrl = (params, keycloak) => {
  const { experienceChannel } = params;
  const {
    ExperienceChannelGUID,
    ChannelName,
    ChannelDescription,
    ChannelColor,
    ChannelType,
    ChannelCode,
    ChannelLanguageGUID
  } = experienceChannel;
  let formattedParams;
  if (experienceChannel.ChannelType == '3') {
    formattedParams = {
      ExperienceChannelGUID,
      ChannelName: ChannelName.trim(),
      ChannelColor: ChannelColor.trim(),
      ChannelDescription
    };
  } else {
    formattedParams = {
      ExperienceChannelGUID,
      ChannelName: ChannelName.trim(),
      ChannelColor: ChannelColor.trim(),
      ChannelDescription,
      ChannelType: ChannelType.toString(),
      ChannelCode: ChannelCode ? ChannelCode.trim() : null,
      ChannelLanguageGUID
    };
  }
  return apiManager.dxApi(`/channel/update`, formattedParams, true, keycloak);
};

export function* dxChannelUpdate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxChannelUpdateUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation != 'SUCCESS') {
      yield put({
        type: CHANNEL_UPDATE__FAILED,
        payload: {
          message: Message
        }
      });
    } else {
      yield put({
        type: CHANNEL_UPDATE__SUCCEEDED,
        payload: {
          experience: Response,
          message: 'Channel has been updated'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxChannelUpdateSaga() {
  yield takeEvery(CHANNEL_UPDATE_REQUESTED, dxChannelUpdate);
}

// Channel Language list fetch
export const dxChannelLanguageListFetchUrl = (payload, keycloak) => {
  const formattedParams = {
    Limit: '-1',
    Offset: '0',
    Extra: {}
  };
  return apiManager.dxApi(`/language/list`, formattedParams, true, keycloak);
};

export function* dxChannelLanguageListFetch(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxChannelLanguageListFetchUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation != 'SUCCESS') {
      yield put({
        type: CHANNEL_FETCH_LANGUAGE_LIST__FAILED,
        payload: {
          message: Message
        }
      });
    } else {
      yield put({
        type: CHANNEL_FETCH_LANGUAGE_LIST__SUCCEEDED,
        payload: {
          languages: Response.Languages,
          message: ''
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxChannelLanguageListFetchSaga() {
  yield takeEvery(
    CHANNEL_FETCH_LANGUAGE_LIST_REQUESTED,
    dxChannelLanguageListFetch
  );
}

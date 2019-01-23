import { delay } from 'redux-saga';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import * as selectors from './Selectors';

// config
import config from '../config';

// helpers
import * as apiManager from '../helpers/apiManager';
import * as helpers from '../helpers/index';

import {
  DASHBOARD_NAVI_REQUESTED,
  DASHBOARD_NAVI__SUCCEEDED,
  DASHBOARD_NAVI__FAILED,
  SEARCH_BAR_TOGGLE_REQUESTED,
  SEARCH_BAR_TOGGLE__SUCCEEDED,
  SEARCH_BAR_TOGGLE__FAILED,
  TAB_BAR_UPDATE_REQUESTED,
  TAB_BAR_UPDATE__SUCCEEDED,
  TAB_BAR_UPDATE__FAILED,
  CHANNEL_UPDATE_SEARCH_REQUESTED,
  CHANNEL_UPDATE_SEARCH__SUCCEEDED,
  CHANNEL_UPDATE_SEARCH__FAILED,
  CHANNEL_UPDATE_FILTER_REQUESTED,
  CHANNEL_UPDATE_FILTER__SUCCEEDED,
  CHANNEL_UPDATE_FILTER__FAILED,
  CHANNEL_CLEAR_FILTER_REQUESTED,
  CHANNEL_CLEAR_FILTER__SUCCEEDED,
  CHANNEL_CLEAR_FILTER__FAILED,
  CHANNEL_FETCH_REQUESTED,
  CHANNEL_FETCH__SUCCEEDED,
  CHANNEL_FETCH__FAILED,
  CHANNEL_UPDATE_STATUS_REQUESTED,
  CHANNEL_UPDATE_STATUS__SUCCEEDED,
  CHANNEL_UPDATE_STATUS__FAILED,
  CHANNEL_DELETE_REQUESTED,
  CHANNEL_DELETE__SUCCEEDED,
  CHANNEL_DELETE__FAILED,
  HTML_FETCH_REQUESTED,
  HTML_FETCH__SUCCEEDED,
  HTML_FETCH__FAILED,
  EXPERIENCE_UPDATE_SEARCH_REQUESTED,
  EXPERIENCE_UPDATE_SEARCH__SUCCEEDED,
  EXPERIENCE_UPDATE_SEARCH__FAILED,
  EXPERIENCE_UPDATE_FILTER_REQUESTED,
  EXPERIENCE_UPDATE_FILTER__SUCCEEDED,
  EXPERIENCE_UPDATE_FILTER__FAILED,
  EXPERIENCE_CLEAR_FILTER_REQUESTED,
  EXPERIENCE_CLEAR_FILTER__SUCCEEDED,
  EXPERIENCE_CLEAR_FILTER__FAILED,
  EXPERIENCE_FETCH_REQUESTED,
  EXPERIENCE_FETCH__SUCCEEDED,
  EXPERIENCE_FETCH__FAILED,
  EXPERIENCE_FETCH_MORE_REQUESTED,
  EXPERIENCE_FETCH_MORE__SUCCEEDED,
  EXPERIENCE_FETCH_MORE__FAILED,
  EXPERIENCE_DELETE_REQUESTED,
  EXPERIENCE_DELETE__SUCCEEDED,
  EXPERIENCE_DELETE__FAILED,
  STREAM_SEARCH_BAR_TOGGLE_REQUESTED,
  STREAM_SEARCH_BAR_TOGGLE__SUCCEEDED,
  STREAM_SEARCH_BAR_TOGGLE__FAILED,
  STREAM_TAB_BAR_UPDATE_REQUESTED,
  STREAM_TAB_BAR_UPDATE__SUCCEEDED,
  STREAM_TAB_BAR_UPDATE__FAILED,
  STREAM_CHANNEL_LANGUAGES_FETCH_REQUESTED,
  STREAM_CHANNEL_LANGUAGES_FETCH__SUCCEEDED,
  STREAM_CHANNEL_LANGUAGES_FETCH__FAILED,
  STREAM_CHANNEL_LANGUAGES_UPDATE_FILTER_REQUESTED,
  STREAM_CHANNEL_LANGUAGES_UPDATE_FILTER__SUCCEEDED,
  STREAM_CHANNEL_LANGUAGES_UPDATE_FILTER__FAILED,
  STREAM_CHANNEL_FETCH_REQUESTED,
  STREAM_CHANNEL_FETCH__SUCCEEDED,
  STREAM_CHANNEL_FETCH__FAILED,
  STREAM_FETCH_MORE_CHANNEL_REQUESTED,
  STREAM_FETCH_MORE_CHANNEL__SUCCEEDED,
  STREAM_FETCH_MORE_CHANNEL__FAILED,
  STREAM_CHANNEL_UPDATE_SEARCH_REQUESTED,
  STREAM_CHANNEL_UPDATE_SEARCH__SUCCEEDED,
  STREAM_CHANNEL_UPDATE_SEARCH__FAILED,
  STREAM_CHANNEL_UPDATE_FILTER_REQUESTED,
  STREAM_CHANNEL_UPDATE_FILTER__SUCCEEDED,
  STREAM_CHANNEL_UPDATE_FILTER__FAILED,
  STREAM_CHANNEL_CLEAR_FILTER_REQUESTED,
  STREAM_CHANNEL_CLEAR_FILTER__SUCCEEDED,
  STREAM_CHANNEL_CLEAR_FILTER__FAILED,
  STREAM_CHANNEL_SELECT_REQUESTED,
  STREAM_CHANNEL_SELECT__SUCCEEDED,
  STREAM_CHANNEL_SELECT__FAILED,
  STREAM_CREATE_REQUESTED,
  STREAM_CREATE__SUCCEEDED,
  STREAM_CREATE__FAILED,
  STREAM_REMOVE_REQUESTED,
  STREAM_REMOVE__SUCCEEDED,
  STREAM_REMOVE__FAILED,
  STREAM_FETCH_MORE_EXPERIENCE_REQUESTED,
  STREAM_FETCH_MORE_EXPERIENCE__SUCCEEDED,
  STREAM_FETCH_MORE_EXPERIENCE__FAILED,
  STREAM_FETCH_MORE_STREAM_REQUESTED,
  STREAM_FETCH_MORE_STREAM__SUCCEEDED,
  STREAM_FETCH_MORE_STREAM__FAILED,
  STREAM_UPDATE_SEARCH_REQUESTED,
  STREAM_UPDATE_SEARCH__SUCCEEDED,
  STREAM_UPDATE_SEARCH__FAILED,
  USER_UPDATE_INFO_SEARCH_REQUESTED,
  USER_UPDATE_INFO_SEARCH__SUCCEEDED,
  USER_UPDATE_INFO_SEARCH__FAILED,
  USER_UPDATE_CHANNEL_SEARCH_REQUESTED,
  USER_UPDATE_CHANNEL_SEARCH__SUCCEEDED,
  USER_UPDATE_CHANNEL_SEARCH__FAILED,
  USER_UPDATE_CHANNEL_SELECT_REQUEST,
  USER_UPDATE_CHANNEL_SELECT__SUCCEEDED,
  USER_UPDATE_CHANNEL_SELECT__FAILED,
  USER_UPDATE_PAGE_LIMIT_SELECT_REQUEST,
  USER_UPDATE_PAGE_LIMIT_SELECT__SUCCEEDED,
  USER_UPDATE_PAGE_LIMIT_SELECT__FAILED,
  USER_UPDATE_PAGE_INDEX_REQUEST,
  USER_UPDATE_PAGE_INDEX__SUCCEEDED,
  USER_UPDATE_PAGE_INDEX__FAILED,
  USER_UPDATE_NEW_USER_REQUEST,
  USER_UPDATE_NEW_USER__SUCCEEDED,
  USER_UPDATE_NEW_USER__FAILED,
  USER_UPDATE_NEW_USER_CHANNEL_SEARCH_REQUESTED,
  USER_UPDATE_NEW_USER_CHANNEL_SEARCH__SUCCEEDED,
  USER_UPDATE_NEW_USER_CHANNEL_SEARCH__FAILED,
  USER_UPDATE_NEW_USER_CREATE_REQUESTED,
  USER_UPDATE_NEW_USER_CREATE__SUCCEEDED,
  USER_UPDATE_NEW_USER_CREATE__FAILED,
  USER_FETCH_USER_VIEW_REQUESTED,
  USER_FETCH_USER_VIEW__SUCCEEDED,
  USER_FETCH_USER_VIEW__FAILED,
  USER_UPDATE_USER_INPUT_REQUESTED,
  USER_UPDATE_USER_INPUT__SUCCEEDED,
  USER_UPDATE_USER_INPUT__FAILED,
  USER_UPDATE_EDIT_USER_CHANNEL_SEARCH_REQUESTED,
  USER_UPDATE_EDIT_USER_CHANNEL_SEARCH__SUCCEEDED,
  USER_UPDATE_EDIT_USER_CHANNEL_SEARCH__FAILED,
  USER_UPDATE_USER_REQUESTED,
  USER_UPDATE_USER__SUCCEEDED,
  USER_UPDATE_USER__FAILED,
  USER_DELETE_USER_REQUESTED,
  USER_DELETE_USER__SUCCEEDED,
  USER_DELETE_USER__FAILED,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD__SUCCEEDED,
  USER_RESET_PASSWORD__FAILED,
  USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH_REQUESTED,
  USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH__SUCCEEDED,
  USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH__FAILED,
  USER_UPDATE_SELECTED_USER_GRANT_ACCESS_REQUESTED,
  USER_UPDATE_SELECTED_USER_GRANT_ACCESS__SUCCEEDED,
  USER_UPDATE_SELECTED_USER_GRANT_ACCESS__FAILED,
  USER_TOGGLE_USERS_LOCK_REQUESTED,
  USER_TOGGLE_USERS_LOCK__SUCCEEDED,
  USER_TOGGLE_USERS_LOCK__FAILED,
  USER_TOGGLE_DELETE_USERS_REQUESTED,
  USER_TOGGLE_DELETE_USERS__SUCCEEDED,
  USER_TOGGLE_DELETE_USERS__FAILED
} from './constants';

import { dxKeycloakUpdate, dxKeycloakLogout } from '../actions';

// Dashboard navi
export function* dxDashboardNavi(action) {
  try {
    yield put({
      type: DASHBOARD_NAVI__SUCCEEDED,
      payload: {
        index: action.payload.index
      }
    });
  } catch (error) {
    yield put({
      type: DASHBOARD_NAVI__FAILED,
      payload: error
    });
  }
}

export function* dxDashboardNaviSaga() {
  yield takeEvery(DASHBOARD_NAVI_REQUESTED, dxDashboardNavi);
}

// Toggle search bar
export function* dxSearchBarToggle(action) {
  try {
    yield put({
      type: SEARCH_BAR_TOGGLE__SUCCEEDED,
      payload: {
        toggle: action.payload.toggle
      }
    });
  } catch (error) {
    yield put({
      type: SEARCH_BAR_TOGGLE__FAILED,
      payload: error
    });
  }
}

export function* dxSearchBarToggleSaga() {
  yield takeEvery(SEARCH_BAR_TOGGLE_REQUESTED, dxSearchBarToggle);
}

// Update tab bar index
export function* dxTabBarUpdate(action) {
  switch (action.payload.index.toString()) {
    case '0':
      action.payload.experienceType = 'ALL';
      break;
    case '1':
      action.payload.experienceType = 'CARD_ONLY';
      break;
    case '2':
      action.payload.experienceType = 'CARD_AND_PAGES';
      break;
    default:
      action.payload.experienceType = 'ALL';
      break;
  }
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxFetchExperienceUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: TAB_BAR_UPDATE__FAILED,
        payload: {
          message: 'Experience fetch api error'
        }
      });
    } else {
      yield put({
        type: TAB_BAR_UPDATE__SUCCEEDED,
        payload: {
          index: action.payload.index,
          experienceType: action.payload.experienceType,
          totalRecord: Response.TotalRecord,
          experiences: Response.Experiences
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxTabBarUpdateSaga() {
  yield takeEvery(TAB_BAR_UPDATE_REQUESTED, dxTabBarUpdate);
}

// Channel Search Update
export const dxChannelSearchUpdateUrl = (payload, keycloak) => {
  const formattedParams = {
    ChannelStatus: payload.channelStatusFilter,
    ChannelType: payload.channelTypeFilter,
    SearchType: 'CHANNEL_NAME',
    SearchField: payload.val
  };
  return apiManager.dxApi(
    `/channel/list`,
    {
      Limit: '-1',
      Offset: '0',
      Extra: formattedParams
    },
    true,
    keycloak
  );
};

export function* dxChannelSearchUpdate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxChannelSearchUpdateUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: CHANNEL_UPDATE_SEARCH__FAILED,
        payload: {
          message: 'Experience channel fetch api error'
        }
      });
    } else {
      yield put({
        type: CHANNEL_UPDATE_SEARCH__SUCCEEDED,
        payload: {
          val: action.payload.val,
          totalRecord: Response.TotalRecord,
          expereienceChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxChannelSearchUpdateSaga() {
  yield takeEvery(CHANNEL_UPDATE_SEARCH_REQUESTED, dxChannelSearchUpdate);
}

// Update channel filter
export const dxChannelFilterUpdateUrl = (payload, keycloak) => {
  const formattedParams = {
    ChannelStatus:
      payload.filterType == 'CHANNEL_STATUS'
        ? payload.filter
        : payload.otherFilter,
    ChannelType:
      payload.filterType == 'CHANNEL_TYPE'
        ? payload.filter
        : payload.otherFilter,
    SearchType: 'CHANNEL_NAME',
    SearchField: payload.val
  };
  return apiManager.dxApi(
    `/channel/list`,
    {
      Limit: '-1',
      Offset: '0',
      Extra: formattedParams
    },
    true,
    keycloak
  );
};
export function* dxChannelFilterUpdate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxChannelFilterUpdateUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: CHANNEL_UPDATE_FILTER__FAILED,
        payload: {
          message: 'Experience channel fetch api error'
        }
      });
    } else {
      yield put({
        type: CHANNEL_UPDATE_FILTER__SUCCEEDED,
        payload: {
          filterType: action.payload.filterType,
          filter: action.payload.filter,
          totalRecord: Response.TotalRecord,
          expereienceChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxChannelFilterUpdateSaga() {
  yield takeEvery(CHANNEL_UPDATE_FILTER_REQUESTED, dxChannelFilterUpdate);
}

// Clear channel filter
export const dxChannelFilterClearUrl = (payload, keycloak) => {
  return apiManager.dxApi(
    `/channel/list`,
    {
      Limit: '-1',
      Offset: '0',
      Extra: {
        ChannelStatus: ''
      }
    },
    true,
    keycloak
  );
};
export function* dxChannelFilterClear(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxChannelFilterClearUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: CHANNEL_CLEAR_FILTER__FAILED,
        payload: {
          message: 'Experience channel fetch api error'
        }
      });
    } else {
      yield put({
        type: CHANNEL_CLEAR_FILTER__SUCCEEDED,
        payload: {
          totalRecord: Response.TotalRecord,
          expereienceChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxChannelFilterClearSaga() {
  yield takeEvery(CHANNEL_CLEAR_FILTER_REQUESTED, dxChannelFilterClear);
}

// Fetch Channel
export const dxFetchChannelUrl = (params, keycloak) => {
  return apiManager.dxApi(
    `/channel/list`,
    {
      Limit: config.channelLimit.toString(),
      Offset: '0',
      Extra: {
        ChannelStatus: ''
      }
    },
    true,
    keycloak
  );
};

export function* dxFetchChannel(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxFetchChannelUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: CHANNEL_FETCH__FAILED,
        payload: {
          message: 'Experience channel fetch api error'
        }
      });
    } else {
      yield put({
        type: CHANNEL_FETCH__SUCCEEDED,
        payload: {
          totalRecord: Response.TotalRecord,
          expereienceChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxFetchChannelSaga() {
  yield takeEvery(CHANNEL_FETCH_REQUESTED, dxFetchChannel);
}

// Update Channel
export const dxUpdateChannelUrl = (params, keycloak) => {
  return apiManager.dxApi(`/channel/update`, params.channel, true, keycloak);
};

export function* dxUpdateChannel(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxUpdateChannelUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: CHANNEL_UPDATE_STATUS__FAILED,
        payload: {
          message: 'Experience channel status update api error'
        }
      });
    } else {
      yield put({
        type: CHANNEL_UPDATE_STATUS__SUCCEEDED,
        payload: {
          experienceChannel: Response.ExperienceChannel,
          message: 'Experience channel status has been updated'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxUpdateChannelSaga() {
  yield takeEvery(CHANNEL_UPDATE_STATUS_REQUESTED, dxUpdateChannel);
}

// Delete Channel
export const dxDeleteChannelUrl = (params, keycloak) => {
  const formattedParams = {
    ExperienceChannelGUID: params.channel.ExperienceChannelGUID
  };
  return apiManager.dxApi(`/channel/delete`, formattedParams, true, keycloak);
};

export function* dxDeleteChannel(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxDeleteChannelUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: CHANNEL_DELETE__FAILED,
        payload: {
          message: 'Experience channel delete api error'
        }
      });
    } else {
      yield put({
        type: CHANNEL_DELETE__SUCCEEDED,
        payload: {
          experienceChannel: action.payload.channel,
          message: 'Experience channel has been deleted'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxDeleteChannelSaga() {
  yield takeEvery(CHANNEL_DELETE_REQUESTED, dxDeleteChannel);
}

// Html loading
export const dxHtmlFetchUrl = (params, keycloak) => {
  let guid = params.guid;
  const realm = keycloak.realm;
  return apiManager.dxHtmlApi(`${config.fileHost}/${realm}/temp/${guid}.html`);
};

export function* dxHtmlFetch(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxHtmlFetchUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    const {
      experienceGUID,
      pageGUID,
      sectionGUID,
      experienceType
    } = action.payload;
    yield put({
      type: HTML_FETCH__SUCCEEDED,
      payload: {
        experienceGUID,
        pageGUID,
        sectionGUID,
        html: response,
        experienceType
      }
    });
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxHtmlFetchSaga() {
  yield takeEvery(HTML_FETCH_REQUESTED, dxHtmlFetch);
}

// Update experience search input
export const dxExperienceSearchUpdateUrl = (payload, keycloak) => {
  let searchParams = {};
  const { experienceType, filterType } = payload;
  if (
    experienceType == 'CARD_ONLY' ||
    experienceType == 'CARD_AND_PAGES' ||
    experienceType == 'ALL'
  ) {
    searchParams = {
      ExperienceType: experienceType,
      FilterType: filterType,
      SearchType: 'EXPERIENCE_TITLE',
      SearchField: payload.val
    };
  }
  return apiManager.dxApi(
    `/experience/list`,
    {
      Limit: config.experienceLimit.toString(),
      Offset: '0',
      Extra: searchParams
    },
    true,
    keycloak
  );
};
export function* dxExperienceSearchUpdate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxExperienceSearchUpdateUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    const { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: EXPERIENCE_UPDATE_SEARCH__FAILED,
        payload: {
          message: 'Experience fetch api error'
        }
      });
    } else {
      yield put({
        type: EXPERIENCE_UPDATE_SEARCH__SUCCEEDED,
        payload: {
          experienceType: action.payload.experienceType,
          val: action.payload.val,
          totalRecord: Response.TotalRecord,
          experiences: Response.Experiences
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxExperienceSearchUpdateSaga() {
  yield takeEvery(EXPERIENCE_UPDATE_SEARCH_REQUESTED, dxExperienceSearchUpdate);
}

// Update experience filter
export const dxExperienceFilterUpdateUrl = (payload, keycloak) => {
  let searchParams = {};
  if (
    payload.experienceType == 'CARD_ONLY' ||
    payload.experienceType == 'CARD_AND_PAGES' ||
    payload.experienceType == 'ALL'
  ) {
    searchParams = {
      ExperienceType: payload.experienceType,
      FilterType: payload.option,
      SearchType: 'EXPERIENCE_TITLE',
      SearchField: payload.experienceSearchVal
    };
  }
  return apiManager.dxApi(
    `/experience/list`,
    {
      Limit: config.experienceLimit.toString(),
      Offset: '0',
      Extra: searchParams
    },
    true,
    keycloak
  );
};
export function* dxExperienceFilterUpdate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxExperienceFilterUpdateUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: EXPERIENCE_UPDATE_FILTER__FAILED,
        payload: {
          message: 'Experience fetch api error'
        }
      });
    } else {
      yield put({
        type: EXPERIENCE_UPDATE_FILTER__SUCCEEDED,
        payload: {
          experienceType: action.payload.experienceType,
          option: action.payload.option,
          totalRecord: Response.TotalRecord,
          experiences: Response.Experiences
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxExperienceFilterUpdateSaga() {
  yield takeEvery(EXPERIENCE_UPDATE_FILTER_REQUESTED, dxExperienceFilterUpdate);
}

// Clear experience filter
export const dxExperienceFilterClearUrl = (payload, keycloak) => {
  const { experienceType } = payload;
  let searchParams = {};
  if (
    experienceType == 'CARD_ONLY' ||
    experienceType == 'CARD_AND_PAGES' ||
    experienceType == 'ALL'
  ) {
    searchParams = {
      ExperienceType: experienceType,
      FilterType: 'ALL',
      SearchType: 'EXPERIENCE_TITLE',
      SearchField: ''
    };
  }
  return apiManager.dxApi(
    `/experience/list`,
    {
      Limit: config.experienceLimit.toString(),
      Offset: '0',
      Extra: searchParams
    },
    true,
    keycloak
  );
};
export function* dxExperienceFilterClear(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxExperienceFilterClearUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    const { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: EXPERIENCE_CLEAR_FILTER__FAILED,
        payload: {
          message: 'Experience fetch api error'
        }
      });
    } else {
      yield put({
        type: EXPERIENCE_CLEAR_FILTER__SUCCEEDED,
        payload: {
          experienceType: action.payload.experienceType,
          totalRecord: Response.TotalRecord,
          experiences: Response.Experiences
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxExperienceFilterClearSaga() {
  yield takeEvery(EXPERIENCE_CLEAR_FILTER_REQUESTED, dxExperienceFilterClear);
}

// Fetch experience
export const dxFetchExperienceUrl = (payload, keycloak) => {
  let searchParams = {};
  if (
    payload.experienceType == 'CARD_ONLY' ||
    payload.experienceType == 'CARD_AND_PAGES' ||
    payload.experienceType == 'ALL'
  ) {
    searchParams = {
      ExperienceType: payload.experienceType,
      FilterType: 'ALL',
      SearchType: 'EXPERIENCE_TITLE',
      SearchField: ''
    };
  }
  return apiManager.dxApi(
    `/experience/list`,
    {
      Limit: config.experienceLimit.toString(),
      Offset: '0',
      Extra: searchParams
    },
    true,
    keycloak
  );
};

export function* dxFetchExperience(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxFetchExperienceUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: EXPERIENCE_FETCH__FAILED,
        payload: {
          message: 'Experience fetch api error'
        }
      });
    } else {
      yield put({
        type: EXPERIENCE_FETCH__SUCCEEDED,
        payload: {
          experienceType: action.payload.experienceType,
          totalRecord: Response.TotalRecord,
          experiences: Response.Experiences
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxFetchExperienceSaga() {
  yield takeEvery(EXPERIENCE_FETCH_REQUESTED, dxFetchExperience);
}

// Fetch more experience
export const dxFetchMoreExperienceUrl = (payload, keycloak) => {
  let searchParams = {};
  if (
    payload.experienceType == 'CARD_ONLY' ||
    payload.experienceType == 'CARD_AND_PAGES' ||
    payload.experienceType == 'ALL'
  ) {
    searchParams = {
      ExperienceType: payload.experienceType,
      FilterType: payload.filterType,
      SearchType: 'EXPERIENCE_TITLE',
      SearchField: payload.experienceSearch
    };
  }
  return apiManager.dxApi(
    `/experience/list`,
    {
      Limit: config.experienceLimit.toString(),
      Offset: (
        (payload.currentPageIndex + 1) *
        config.experienceLimit
      ).toString(),
      Extra: searchParams
    },
    true,
    keycloak
  );
};

export function* dxFetchMoreExperience(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxFetchMoreExperienceUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: EXPERIENCE_FETCH_MORE__FAILED,
        payload: {
          message: 'Experience fetch api error'
        }
      });
    } else {
      yield put({
        type: EXPERIENCE_FETCH_MORE__SUCCEEDED,
        payload: {
          experienceType: action.payload.experienceType,
          totalRecord: Response.TotalRecord,
          experiences: Response.Experiences
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxFetchMoreExperienceSaga() {
  yield takeEvery(EXPERIENCE_FETCH_MORE_REQUESTED, dxFetchMoreExperience);
}

// Delete experience
export const dxDeleteExperienceUrl = (params, keycloak) => {
  let formattedParams = {
    ExperienceGUID: params.experienceGUID
  };
  return apiManager.dxApi(
    `/experience/delete`,
    formattedParams,
    true,
    keycloak
  );
};

export function* dxDeleteExperience(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxDeleteExperienceUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: EXPERIENCE_DELETE__FAILED,
        payload: {
          message: 'Experience delete api error'
        }
      });
    } else {
      yield put({
        type: EXPERIENCE_DELETE__SUCCEEDED,
        payload: {
          experienceGUID: action.payload.experienceGUID,
          experienceType: action.payload.experienceType,
          message: 'Experience has been deleted'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxDeleteExperienceSaga() {
  yield takeEvery(EXPERIENCE_DELETE_REQUESTED, dxDeleteExperience);
}

// Stream toggle search bar
export function* dxStreamSearchBarToggle(action) {
  try {
    yield put({
      type: STREAM_SEARCH_BAR_TOGGLE__SUCCEEDED,
      payload: {
        toggle: action.payload.toggle
      }
    });
  } catch (error) {
    yield put({
      type: STREAM_SEARCH_BAR_TOGGLE__FAILED,
      payload: error
    });
  }
}

export function* dxStreamSearchBarToggleSaga() {
  yield takeEvery(STREAM_SEARCH_BAR_TOGGLE_REQUESTED, dxStreamSearchBarToggle);
}

// Stream update tab bar index
export const dxSelectLiveStreamChannelUrl = (params, keycloak) => {
  let formattedParams = {
    ExperienceChannelGUID: params.channel.ExperienceChannelGUID,
    Limit: config.experienceLimit.toString(),
    Offset: '0',
    Extra: {}
  };
  return apiManager.dxApi(
    `/stream/live_stream_list_by_channel_guid`,
    formattedParams,
    true,
    keycloak
  );
};

export function* dxStreamTabBarUpdate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    if (action.payload.index == '0') {
      const response = yield call(
        dxSelectStreamChannelUrl,
        action.payload,
        keycloak
      );

      if (response.isTokenRefreshed) {
        yield put(dxKeycloakUpdate(response.keycloak));
      }

      let { Confirmation, Response, Message } = response.data;
      if (Confirmation !== 'SUCCESS') {
        yield put({
          type: STREAM_TAB_BAR_UPDATE__FAILED,
          payload: {
            message: 'Experience stream list api error'
          }
        });
      } else {
        yield put({
          type: STREAM_TAB_BAR_UPDATE__SUCCEEDED,
          payload: {
            index: action.payload.index,
            experiences: Response.Experiences,
            totalRecord: Response.TotalRecord
          }
        });
      }
    } else {
      const response = yield call(
        dxSelectLiveStreamChannelUrl,
        action.payload,
        keycloak
      );

      if (response.isTokenRefreshed) {
        yield put(dxKeycloakUpdate(response.keycloak));
      }

      let { Confirmation, Response, Message } = response.data;
      if (Confirmation !== 'SUCCESS') {
        yield put({
          type: STREAM_TAB_BAR_UPDATE__FAILED,
          payload: {
            message: 'Experience stream list api error'
          }
        });
      } else {
        yield put({
          type: STREAM_TAB_BAR_UPDATE__SUCCEEDED,
          payload: {
            index: action.payload.index,
            experienceStreams: Response.ExperienceStreams,
            totalRecord: Response.TotalRecord
          }
        });
      }
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxStreamTabBarUpdateSaga() {
  yield takeEvery(STREAM_TAB_BAR_UPDATE_REQUESTED, dxStreamTabBarUpdate);
}

// Stream Fetch Channel Languages
export const dxFetchStreamChannelLanguagesUrl = (params, keycloak) => {
  return apiManager.dxApi(`/channel/language_list`, {}, true, keycloak);
};
export function* dxFetchStreamChannelLanguages(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxFetchStreamChannelLanguagesUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: STREAM_CHANNEL_LANGUAGES_FETCH__FAILED,
        payload: {
          message: 'Experience channel languages fetch api error'
        }
      });
    } else {
      yield put({
        type: STREAM_CHANNEL_LANGUAGES_FETCH__SUCCEEDED,
        payload: {
          totalRecord: Response.TotalRecord,
          languages: Response.Languages
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxFetchStreamChannelLanguagesSaga() {
  yield takeEvery(
    STREAM_CHANNEL_LANGUAGES_FETCH_REQUESTED,
    dxFetchStreamChannelLanguages
  );
}

// Stream Update Channel Language
export const dxUpdateStreamChannelLanguageUrl = (params, keycloak) => {
  const formattedParams = {
    ChannelStatus: 'ALL',
    ChannelType: params.channelTypeFilterType,
    SearchType: 'CHANNEL_NAME',
    SearchField: params.searchVal,
    ChannelLanguageGUID:
      params.language == 'ALL' ? null : params.language.LanguageGUID
  };
  return apiManager.dxApi(
    `/channel/list`,
    {
      Limit: config.channelLimit.toString(),
      Offset: '0',
      Extra: formattedParams
    },
    true,
    keycloak
  );
};
export function* dxUpdateStreamChannelLanguage(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxUpdateStreamChannelLanguageUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: STREAM_CHANNEL_LANGUAGES_UPDATE_FILTER__FAILED,
        payload: {
          message: 'Experience channel fetch api error'
        }
      });
    } else {
      yield put({
        type: STREAM_CHANNEL_LANGUAGES_UPDATE_FILTER__SUCCEEDED,
        payload: {
          language: action.payload.language,
          totalRecord: Response.TotalRecord,
          expereienceChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxUpdateStreamChannelLanguageSaga() {
  yield takeEvery(
    STREAM_CHANNEL_LANGUAGES_UPDATE_FILTER_REQUESTED,
    dxUpdateStreamChannelLanguage
  );
}

// Stream Fetch Active Channel
export const dxFetchStreamChannelUrl = (params, keycloak) => {
  const formattedParams = {
    ChannelStatus: 'ALL',
    ChannelType: 'ALL',
    SearchType: 'CHANNEL_NAME',
    SearchField: '',
    ChannelLanguageGUID: ''
  };
  return apiManager.dxApi(
    `/channel/list`,
    {
      Limit: config.channelLimit.toString(),
      Offset: '0',
      Extra: formattedParams
    },
    true,
    keycloak
  );
};
export function* dxFetchStreamChannel(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxFetchStreamChannelUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: STREAM_CHANNEL_FETCH__FAILED,
        payload: {
          message: 'Experience channel fetch api error'
        }
      });
    } else {
      yield put({
        type: STREAM_CHANNEL_FETCH__SUCCEEDED,
        payload: {
          totalRecord: Response.TotalRecord,
          expereienceChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxFetchStreamChannelSaga() {
  yield takeEvery(STREAM_CHANNEL_FETCH_REQUESTED, dxFetchStreamChannel);
}

// Stream Fetch Active Channel
export const dxFetchMoreStreamChannelUrl = (params, keycloak) => {
  const formattedParams = {
    ChannelStatus: 'ALL',
    ChannelType: params.channelTypeFilter,
    SearchType: 'CHANNEL_NAME',
    SearchField: params.val,
    ChannelLanguageGUID: params.channelLanguageGUID
  };
  return apiManager.dxApi(
    `/channel/list`,
    {
      Limit: config.channelLimit.toString(),
      Offset: ((params.pageIndex + 1) * config.channelLimit).toString(),
      Extra: formattedParams
    },
    true,
    keycloak
  );
};
export function* dxFetchMoreStreamChannel(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxFetchMoreStreamChannelUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: STREAM_FETCH_MORE_CHANNEL__FAILED,
        payload: {
          message: 'Experience channel fetch api error'
        }
      });
    } else {
      yield put({
        type: STREAM_FETCH_MORE_CHANNEL__SUCCEEDED,
        payload: {
          totalRecord: Response.TotalRecord,
          expereienceChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxFetchMoreStreamChannelSaga() {
  yield takeEvery(
    STREAM_FETCH_MORE_CHANNEL_REQUESTED,
    dxFetchMoreStreamChannel
  );
}

// Stream channel Search Update
export const dxStreamChannelSearchUpdateUrl = (payload, keycloak) => {
  const formattedParams = {
    ChannelStatus: 'ALL',
    ChannelType: payload.channelTypeFilterType,
    SearchType: 'CHANNEL_NAME',
    SearchField: payload.searchVal,
    ChannelLanguageGUID: payload.channelLanguageGUID
  };
  return apiManager.dxApi(
    `/channel/list`,
    {
      Limit: config.channelLimit.toString(),
      Offset: '0',
      Extra: formattedParams
    },
    true,
    keycloak
  );
};
export function* dxStreamChannelSearchUpdate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxStreamChannelSearchUpdateUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: STREAM_CHANNEL_UPDATE_SEARCH__FAILED,
        payload: {
          message: 'Experience channel fetch api error'
        }
      });
    } else {
      yield put({
        type: STREAM_CHANNEL_UPDATE_SEARCH__SUCCEEDED,
        payload: {
          val: action.payload.searchVal,
          totalRecord: Response.TotalRecord,
          expereienceChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}
export function* dxStreamChannelSearchUpdateSaga() {
  yield takeEvery(
    STREAM_CHANNEL_UPDATE_SEARCH_REQUESTED,
    dxStreamChannelSearchUpdate
  );
}

// Stream channel type filter Update
export const dxStreamChannelTypeFilterUpdateUrl = (payload, keycloak) => {
  const formattedParams = {
    ChannelStatus: 'ALL',
    ChannelType: payload.channelTypeFilterType,
    SearchType: 'CHANNEL_NAME',
    SearchField: payload.searchVal,
    ChannelLanguageGUID: payload.channelLanguageGUID
  };
  return apiManager.dxApi(
    `/channel/list`,
    {
      Limit: config.channelLimit.toString(),
      Offset: '0',
      Extra: formattedParams
    },
    true,
    keycloak
  );
};
export function* dxStreamChannelTypeFilterUpdate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxStreamChannelTypeFilterUpdateUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: STREAM_CHANNEL_UPDATE_FILTER__FAILED,
        payload: {
          message: 'Experience channel fetch api error'
        }
      });
    } else {
      yield put({
        type: STREAM_CHANNEL_UPDATE_FILTER__SUCCEEDED,
        payload: {
          channelTypeFilter: action.payload.channelTypeFilterType,
          totalRecord: Response.TotalRecord,
          expereienceChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}
export function* dxStreamChannelTypeFilterUpdateSaga() {
  yield takeEvery(
    STREAM_CHANNEL_UPDATE_FILTER_REQUESTED,
    dxStreamChannelTypeFilterUpdate
  );
}

// Stream Channel clear filter
export function* dxStreamChannelClearFilter(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxFetchChannelUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: STREAM_CHANNEL_CLEAR_FILTER__FAILED,
        payload: {
          message: 'Experience channel fetch api error'
        }
      });
    } else {
      yield put({
        type: STREAM_CHANNEL_CLEAR_FILTER__SUCCEEDED,
        payload: {
          totalRecord: Response.TotalRecord,
          expereienceChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxStreamChannelClearFilterSaga() {
  yield takeEvery(
    STREAM_CHANNEL_CLEAR_FILTER_REQUESTED,
    dxStreamChannelClearFilter
  );
}

// Stream channel select
export const dxSelectStreamChannelUrl = (params, keycloak) => {
  let formattedParams = {
    ExperienceChannelGUID: params.channel.ExperienceChannelGUID,
    Limit: config.experienceLimit.toString(),
    Offset: '0',
    Extra: {}
  };
  return apiManager.dxApi(
    `/stream/pending_stream_list_by_channel_guid`,
    formattedParams,
    true,
    keycloak
  );
};

export function* dxSelectStreamChannel(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxSelectStreamChannelUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: STREAM_CHANNEL_SELECT__FAILED,
        payload: {
          message: 'Experience stream list api error'
        }
      });
    } else {
      yield put({
        type: STREAM_CHANNEL_SELECT__SUCCEEDED,
        payload: {
          channel: action.payload.channel,
          experiences: Response.Experiences,
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

export function* dxSelectStreamChannelSaga() {
  yield takeEvery(STREAM_CHANNEL_SELECT_REQUESTED, dxSelectStreamChannel);
}

// Create Stream
export const dxCreateStreamUrl = (params, keycloak) => {
  let formattedParams = {
    ExperienceChannelGUID: params.channel.ExperienceChannelGUID,
    ExperienceGUID: params.experience.ExperienceGUID
  };
  return apiManager.dxApi(`/stream/create`, formattedParams, true, keycloak);
};

export function* dxCreateStream(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxCreateStreamUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: STREAM_CREATE__FAILED,
        payload: {
          message: 'Stream create api error'
        }
      });
    } else {
      yield put({
        type: STREAM_CREATE__SUCCEEDED,
        payload: {
          experience: action.payload.experience,
          experienceStream: Response.ExperienceStream,
          message: 'Stream has been created'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxCreateStreamSaga() {
  yield takeEvery(STREAM_CREATE_REQUESTED, dxCreateStream);
}

// Remove Stream
export const dxRemoveStreamUrl = (params, keycloak) => {
  let formattedParams = {
    ExperienceStreamGUID: params.experienceStreamGUID
  };
  return apiManager.dxApi(`/stream/delete`, formattedParams, true, keycloak);
};

export function* dxRemoveStream(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxRemoveStreamUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: STREAM_REMOVE__FAILED,
        payload: {
          message: 'Stream remove api error'
        }
      });
    } else {
      yield put({
        type: STREAM_REMOVE__SUCCEEDED,
        payload: {
          experienceStreamGUID: action.payload.experienceStreamGUID,
          experience: Response.Experience,
          message: 'Stream has been removed'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxRemoveStreamSaga() {
  yield takeEvery(STREAM_REMOVE_REQUESTED, dxRemoveStream);
}

// Stream fetch more pending experience
export const dxSelectFetchMoreExperienceUrl = (params, keycloak) => {
  let formattedParams = {
    ExperienceChannelGUID: params.channel.ExperienceChannelGUID,
    Limit: config.experienceLimit.toString(),
    Offset: ((params.pageIndex + 1) * config.experienceLimit).toString(),
    Extra: {
      SearchType: 'EXPERIENCE_NAME',
      SearchField: params.searchInput
    }
  };
  return apiManager.dxApi(
    `/stream/pending_stream_list_by_channel_guid`,
    formattedParams,
    true,
    keycloak
  );
};

export function* dxSelectFetchMoreExperience(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxSelectFetchMoreExperienceUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: STREAM_CHANNEL_SELECT__FAILED,
        payload: {
          message: 'Experience stream list api error'
        }
      });
    } else {
      yield put({
        type: STREAM_FETCH_MORE_EXPERIENCE__SUCCEEDED,
        payload: {
          channel: action.payload.channel,
          pageIndex: action.payload.pageIndex,
          experiences: Response.Experiences,
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

export function* dxSelectFetchMoreExperienceSaga() {
  yield takeEvery(
    STREAM_FETCH_MORE_EXPERIENCE_REQUESTED,
    dxSelectFetchMoreExperience
  );
}

// Stream fetch more live stream
export const dxSelectFetchMoreStreamUrl = (params, keycloak) => {
  let formattedParams = {
    ExperienceChannelGUID: params.channel.ExperienceChannelGUID,
    Limit: config.experienceLimit.toString(),
    Offset: ((params.pageIndex + 1) * config.experienceLimit).toString(),
    Extra: {
      SearchType: 'EXPERIENCE_NAME',
      SearchField: params.searchInput
    }
  };
  return apiManager.dxApi(
    `/stream/live_stream_list_by_channel_guid`,
    formattedParams,
    true,
    keycloak
  );
};

export function* dxSelectFetchMoreStream(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxSelectFetchMoreStreamUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: STREAM_FETCH_MORE_STREAM__FAILED,
        payload: {
          message: 'Experience stream list api error'
        }
      });
    } else {
      yield put({
        type: STREAM_FETCH_MORE_STREAM__SUCCEEDED,
        payload: {
          channel: action.payload.channel,
          pageIndex: action.payload.pageIndex,
          streams: Response.ExperienceStreams,
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

export function* dxSelectFetchMoreStreamSaga() {
  yield takeEvery(STREAM_FETCH_MORE_STREAM_REQUESTED, dxSelectFetchMoreStream);
}

// Stream experience / stream search
export const dxStreamSearchExperienceUrl = (params, keycloak) => {
  let formattedParams = {
    ExperienceChannelGUID: params.channel.ExperienceChannelGUID,
    Limit: config.experienceLimit.toString(),
    Offset: '0',
    Extra: {
      SearchType: 'EXPERIENCE_NAME',
      SearchField: params.val
    }
  };
  return apiManager.dxApi(
    `/stream/pending_stream_list_by_channel_guid`,
    formattedParams,
    true,
    keycloak
  );
};
export const dxStreamSearchStreamUrl = (params, keycloak) => {
  let formattedParams = {
    ExperienceChannelGUID: params.channel.ExperienceChannelGUID,
    Limit: config.experienceLimit.toString(),
    Offset: '0',
    Extra: {
      SearchType: 'EXPERIENCE_NAME',
      SearchField: params.val
    }
  };
  return apiManager.dxApi(
    `/stream/live_stream_list_by_channel_guid`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxSearchStream(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    if (action.payload.activeTabIndex == '0') {
      const response = yield call(
        dxStreamSearchExperienceUrl,
        action.payload,
        keycloak
      );

      if (response.isTokenRefreshed) {
        yield put(dxKeycloakUpdate(response.keycloak));
      }

      let { Confirmation, Response, Message } = response.data;
      if (Confirmation !== 'SUCCESS') {
        yield put({
          type: STREAM_UPDATE_SEARCH__FAILED,
          payload: {
            message: 'Experience stream list api error'
          }
        });
      } else {
        yield put({
          type: STREAM_UPDATE_SEARCH__SUCCEEDED,
          payload: {
            channel: action.payload.channel,
            activeTabIndex: action.payload.activeTabIndex,
            val: action.payload.val,
            experiences: Response.Experiences,
            totalRecord: Response.TotalRecord
          }
        });
      }
    } else if (action.payload.activeTabIndex == '1') {
      const response = yield call(
        dxStreamSearchStreamUrl,
        action.payload,
        keycloak
      );

      if (response.isTokenRefreshed) {
        yield put(dxKeycloakUpdate(response.keycloak));
      }

      let { Confirmation, Response, Message } = response.data;
      if (Confirmation !== 'SUCCESS') {
        yield put({
          type: STREAM_UPDATE_SEARCH__FAILED,
          payload: {
            message: 'Experience stream list api error'
          }
        });
      } else {
        yield put({
          type: STREAM_UPDATE_SEARCH__SUCCEEDED,
          payload: {
            channel: action.payload.channel,
            activeTabIndex: action.payload.activeTabIndex,
            val: action.payload.val,
            streams: Response.ExperienceStreams,
            totalRecord: Response.TotalRecord
          }
        });
      }
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxSearchStreamSaga() {
  yield takeEvery(STREAM_UPDATE_SEARCH_REQUESTED, dxSearchStream);
}

// user info search
export const dxUserSearchInfoUrl = (params, keycloak) => {
  const formattedFilterField = params.searchChannels.map(
    channel => channel.ExperienceChannelGUID
  );
  let formattedParams = {
    IsTeamMember: '0',
    Limit: params.userPerPage.toString(),
    Offset: '0',
    Extra: {
      SearchType: 'FIRST_LAST_NAME_EMAIL',
      SearchField: params.searchVal,
      FilterType: 'CHANNEL_FILTER',
      FilterField: formattedFilterField
    }
  };
  return apiManager.dxApi(`/manage/user_list`, formattedParams, true, keycloak);
};
export function* dxUserSearchInfo(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxUserSearchInfoUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_UPDATE_INFO_SEARCH__FAILED,
        payload: {
          message: 'User search list api error'
        }
      });
    } else {
      yield put({
        type: USER_UPDATE_INFO_SEARCH__SUCCEEDED,
        payload: {
          searchVal: action.payload.searchVal,
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

export function* dxUserSearchInfoSaga() {
  yield takeEvery(USER_UPDATE_INFO_SEARCH_REQUESTED, dxUserSearchInfo);
}

// user channel search
export const dxUserSearchChannelUrl = (params, keycloak) => {
  let formattedParams = {
    Limit: '-1',
    Offset: '0',
    Extra: {
      ChannelStatus: 'LIVE',
      ChannelType: 'PRIVATE',
      SearchType: 'CHANNEL_NAME',
      SearchField: params.searchVal,
      ChannelLanguageGUID: null
    }
  };
  return apiManager.dxApi(
    `/manage/channel_list`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxUserSearchChannel(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxUserSearchChannelUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_UPDATE_CHANNEL_SEARCH__FAILED,
        payload: {
          message: 'User search channel list api error'
        }
      });
    } else {
      yield put({
        type: USER_UPDATE_CHANNEL_SEARCH__SUCCEEDED,
        payload: {
          userChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxUserSearchChannelSaga() {
  yield takeEvery(USER_UPDATE_CHANNEL_SEARCH_REQUESTED, dxUserSearchChannel);
}

// user channel select
export const dxUserSelectChannelUrl = (params, keycloak) => {
  const formattedFilterField = params.options.map(
    channel => channel.ExperienceChannelGUID
  );
  let formattedParams = {
    IsTeamMember: '0',
    Limit: params.userPerPage.toString(),
    Offset: '0',
    Extra: {
      SearchType: 'FIRST_LAST_NAME_EMAIL',
      SearchField: params.searchVal,
      FilterType: 'CHANNEL_FILTER',
      FilterField: formattedFilterField
    }
  };
  return apiManager.dxApi(`/manage/user_list`, formattedParams, true, keycloak);
};
export function* dxUserSelectChannel(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxUserSelectChannelUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_UPDATE_CHANNEL_SELECT__FAILED,
        payload: {
          message: 'User search list api error'
        }
      });
    } else {
      yield put({
        type: USER_UPDATE_CHANNEL_SELECT__SUCCEEDED,
        payload: {
          options: action.payload.options,
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

export function* dxUserSelectChannelSaga() {
  yield takeEvery(USER_UPDATE_CHANNEL_SELECT_REQUEST, dxUserSelectChannel);
}

// user page limit select
export const dxUserSelectPageLimitUrl = (params, keycloak) => {
  const formattedFilterField = params.searchChannels.map(
    channel => channel.ExperienceChannelGUID
  );
  let formattedParams = {
    IsTeamMember: '0',
    Limit: params.pageLimit.toString(),
    Offset: '0',
    Extra: {
      SearchType: 'FIRST_LAST_NAME_EMAIL',
      SearchField: params.searchVal,
      FilterType: 'CHANNEL_FILTER',
      FilterField: formattedFilterField
    }
  };
  return apiManager.dxApi(`/manage/user_list`, formattedParams, true, keycloak);
};
export function* dxUserSelectPageLimit(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxUserSelectPageLimitUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_UPDATE_PAGE_LIMIT_SELECT__FAILED,
        payload: {
          message: 'User search list api error'
        }
      });
    } else {
      yield put({
        type: USER_UPDATE_PAGE_LIMIT_SELECT__SUCCEEDED,
        payload: {
          pageLimit: action.payload.pageLimit,
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

export function* dxUserSelectPageLimitSaga() {
  yield takeEvery(USER_UPDATE_PAGE_LIMIT_SELECT_REQUEST, dxUserSelectPageLimit);
}

// user page index select
export const dxUserSelectPageIndexUrl = (params, keycloak) => {
  const formattedFilterField = params.searchChannels.map(
    channel => channel.ExperienceChannelGUID
  );
  let formattedParams = {
    IsTeamMember: '0',
    Limit: params.userPerPage.toString(),
    Offset: (params.pageIndex * params.userPerPage).toString(),
    Extra: {
      SearchType: 'FIRST_LAST_NAME_EMAIL',
      SearchField: params.searchVal,
      FilterType: 'CHANNEL_FILTER',
      FilterField: formattedFilterField
    }
  };
  return apiManager.dxApi(`/manage/user_list`, formattedParams, true, keycloak);
};
export function* dxUserSelectPageIndex(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxUserSelectPageIndexUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_UPDATE_PAGE_INDEX__FAILED,
        payload: {
          message: 'User search list api error'
        }
      });
    } else {
      yield put({
        type: USER_UPDATE_PAGE_INDEX__SUCCEEDED,
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

export function* dxUserSelectPageIndexSaga() {
  yield takeEvery(USER_UPDATE_PAGE_INDEX_REQUEST, dxUserSelectPageIndex);
}

// user new user update
export const dxUserUpdateNewUserUrl = (params, keycloak) => {
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
export function* dxUserUpdateNewUser(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const { index, type, value } = action.payload;
    if (type == 'EMAIL' && helpers.isValidEmail(value)) {
      const response = yield call(
        dxUserUpdateNewUserUrl,
        action.payload,
        keycloak
      );

      if (response.isTokenRefreshed) {
        yield put(dxKeycloakUpdate(response.keycloak));
      }

      let { Confirmation, Response, Message } = response.data;
      if (Confirmation !== 'SUCCESS') {
        yield put({
          type: USER_UPDATE_NEW_USER__FAILED,
          payload: {
            index,
            type,
            value,
            isValidate: false
          }
        });
      } else {
        yield put({
          type: USER_UPDATE_NEW_USER__SUCCEEDED,
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
        type: USER_UPDATE_NEW_USER__SUCCEEDED,
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

export function* dxUserUpdateNewUserSaga() {
  yield takeEvery(USER_UPDATE_NEW_USER_REQUEST, dxUserUpdateNewUser);
}

// user new user channel search
export const dxUserNewUserSearchChannelUrl = (params, keycloak) => {
  let formattedParams = {
    Limit: '-1',
    Offset: '0',
    Extra: {
      ChannelStatus: 'LIVE',
      ChannelType: 'PRIVATE',
      SearchType: 'CHANNEL_NAME',
      SearchField: params.searchVal,
      ChannelLanguageGUID: null
    }
  };
  return apiManager.dxApi(
    `/manage/channel_list`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxUserNewUserSearchChannel(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxUserNewUserSearchChannelUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_UPDATE_NEW_USER_CHANNEL_SEARCH__FAILED,
        payload: {
          message: 'User search channel list api error'
        }
      });
    } else {
      yield put({
        type: USER_UPDATE_NEW_USER_CHANNEL_SEARCH__SUCCEEDED,
        payload: {
          userChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxUserNewUserSearchChannelSaga() {
  yield takeEvery(
    USER_UPDATE_NEW_USER_CHANNEL_SEARCH_REQUESTED,
    dxUserNewUserSearchChannel
  );
}

// user new user create
export const dxUserNewUserCreateUrl = (params, keycloak) => {
  let formattedParams = {
    Users: params.users,
    IsTeamMember: '0',
    Roles: ['keycloakUser'],
    Channels: params.channels
  };
  return apiManager.dxApi(
    `/manage/create_user`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxUserNewUserCreate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxUserNewUserCreateUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_UPDATE_NEW_USER_CREATE__FAILED,
        payload: {
          message: 'User create api error'
        }
      });
    } else {
      yield put({
        type: USER_UPDATE_NEW_USER_CREATE__SUCCEEDED,
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

export function* dxUserNewUserCreateSaga() {
  yield takeEvery(USER_UPDATE_NEW_USER_CREATE_REQUESTED, dxUserNewUserCreate);
}

// user info search
export const dxUserViewUserUrl = (params, keycloak) => {
  let formattedParams = {
    IsTeamMember: '0',
    UserID: params.userGUID
  };
  return apiManager.dxApi(`/manage/view_user`, formattedParams, true, keycloak);
};
export function* dxUserViewUser(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;

  try {
    const { toggle } = action.payload;
    if (toggle) {
      const response = yield call(dxUserViewUserUrl, action.payload, keycloak);

      if (response.isTokenRefreshed) {
        yield put(dxKeycloakUpdate(response.keycloak));
      }

      let { Confirmation, Response, Message } = response.data;
      if (Confirmation !== 'SUCCESS') {
        yield put({
          type: USER_FETCH_USER_VIEW__FAILED,
          payload: {
            message: 'User view api error'
          }
        });
      } else {
        yield put({
          type: USER_FETCH_USER_VIEW__SUCCEEDED,
          payload: {
            user: Response.User,
            toggle
          }
        });
      }
    } else {
      yield put({
        type: USER_FETCH_USER_VIEW__SUCCEEDED,
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

export function* dxUserViewUserSaga() {
  yield takeEvery(USER_FETCH_USER_VIEW_REQUESTED, dxUserViewUser);
}

// user input update
export const dxUserInputUpdateUrl = (params, keycloak) => {
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
export function* dxUserInputUpdate(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const { type, value } = action.payload;
    if (type == 'EMAIL' && helpers.isValidEmail(value)) {
      const response = yield call(
        dxUserInputUpdateUrl,
        action.payload,
        keycloak
      );

      if (response.isTokenRefreshed) {
        yield put(dxKeycloakUpdate(response.keycloak));
      }

      let { Confirmation, Response, Message } = response.data;
      if (Confirmation !== 'SUCCESS') {
        yield put({
          type: USER_UPDATE_USER_INPUT__FAILED,
          payload: {
            type,
            value,
            isValidate: false
          }
        });
      } else {
        yield put({
          type: USER_UPDATE_USER_INPUT__SUCCEEDED,
          payload: {
            type,
            value,
            isValidate: true
          }
        });
      }
    } else {
      yield put({
        type: USER_UPDATE_USER_INPUT__SUCCEEDED,
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

export function* dxUserInputUpdateSaga() {
  yield takeEvery(USER_UPDATE_USER_INPUT_REQUESTED, dxUserInputUpdate);
}

// user edit user channel search
export const dxUserEditUserSearchChannelUrl = (params, keycloak) => {
  let formattedParams = {
    Limit: '-1',
    Offset: '0',
    Extra: {
      ChannelStatus: 'LIVE',
      ChannelType: 'PRIVATE',
      SearchType: 'CHANNEL_NAME',
      SearchField: params.searchVal,
      ChannelLanguageGUID: null
    }
  };
  return apiManager.dxApi(
    `/manage/channel_list`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxUserEditUserSearchChannel(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxUserEditUserSearchChannelUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_UPDATE_EDIT_USER_CHANNEL_SEARCH__FAILED,
        payload: {
          message: 'User search channel list api error'
        }
      });
    } else {
      yield put({
        type: USER_UPDATE_EDIT_USER_CHANNEL_SEARCH__SUCCEEDED,
        payload: {
          userChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxUserEditUserSearchChannelSaga() {
  yield takeEvery(
    USER_UPDATE_EDIT_USER_CHANNEL_SEARCH_REQUESTED,
    dxUserEditUserSearchChannel
  );
}

// user update user
export const dxUserUpdateUserUrl = (params, keycloak) => {
  return apiManager.dxApi(`/manage/update_user`, params.user, true, keycloak);
};
export function* dxUserUpdateUser(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxUserUpdateUserUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_UPDATE_USER__FAILED,
        payload: {
          message: 'User update api error'
        }
      });
    } else {
      yield put({
        type: USER_UPDATE_USER__SUCCEEDED,
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

export function* dxUserUpdateUserSaga() {
  yield takeEvery(USER_UPDATE_USER_REQUESTED, dxUserUpdateUser);
}

// user delete user
export const dxUserDeleteUserUrl = (params, keycloak) => {
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
export function* dxUserDeleteUser(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(dxUserDeleteUserUrl, action.payload, keycloak);

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_DELETE_USER__FAILED,
        payload: {
          message: 'User delete api error'
        }
      });
    } else {
      yield put({
        type: USER_DELETE_USER__SUCCEEDED,
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

export function* dxUserDeleteUserSaga() {
  yield takeEvery(USER_DELETE_USER_REQUESTED, dxUserDeleteUser);
}

// user reset password
export const dxUserResetPasswordUrl = (params, keycloak) => {
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
export function* dxUserResetPassword(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxUserResetPasswordUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_RESET_PASSWORD__FAILED,
        payload: {
          message: 'User reset password api error'
        }
      });
    } else {
      yield put({
        type: USER_RESET_PASSWORD__SUCCEEDED,
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

export function* dxUserResetPasswordSaga() {
  yield takeEvery(USER_RESET_PASSWORD_REQUEST, dxUserResetPassword);
}

// user selected user channel search
export const dxUserSelectedUserSearchChannelUrl = (params, keycloak) => {
  let formattedParams = {
    Limit: '-1',
    Offset: '0',
    Extra: {
      ChannelStatus: 'LIVE',
      ChannelType: 'PRIVATE',
      SearchType: 'CHANNEL_NAME',
      SearchField: params.searchVal,
      ChannelLanguageGUID: null
    }
  };
  return apiManager.dxApi(
    `/manage/channel_list`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxUserSelectedUserSearchChannel(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxUserSelectedUserSearchChannelUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH__FAILED,
        payload: {
          message: 'User search channel list api error'
        }
      });
    } else {
      yield put({
        type: USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH__SUCCEEDED,
        payload: {
          userChannels: Response.ExperienceChannels
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxUserSelectedUserSearchChannelSaga() {
  yield takeEvery(
    USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH_REQUESTED,
    dxUserSelectedUserSearchChannel
  );
}

// user selected users grant access
export const dxUserSelectedUserGrantAccessUrl = (params, keycloak) => {
  let formattedParams = {
    Users: params.users,
    IsSubscribe: params.isGrant ? '1' : '0',
    Channels: params.channels
  };
  return apiManager.dxApi(
    `/manage/update_user_channel_subscribes`,
    formattedParams,
    true,
    keycloak
  );
};
export function* dxUserSelectedUserGrantAccess(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxUserSelectedUserGrantAccessUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH__FAILED,
        payload: {
          message: 'User update api error'
        }
      });
    } else {
      yield put({
        type: USER_UPDATE_SELECTED_USER_GRANT_ACCESS__SUCCEEDED,
        payload: {
          message: 'User channel subscribes has been updated'
        }
      });
    }
  } catch (error) {
    localStorage.removeItem('isAuthenticated');
    keycloak.logout();
    yield put(dxKeycloakLogout());
  }
}

export function* dxUserSelectedUserGrantAccessSaga() {
  yield takeEvery(
    USER_UPDATE_SELECTED_USER_GRANT_ACCESS_REQUESTED,
    dxUserSelectedUserGrantAccess
  );
}

// user selected users toggle lock
export const dxUserSelectedUserToggleLockUrl = (params, keycloak) => {
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
export function* dxUserSelectedUserToggleLock(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxUserSelectedUserToggleLockUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_TOGGLE_USERS_LOCK__FAILED,
        payload: {
          message: 'User update enable api error'
        }
      });
    } else {
      yield put({
        type: USER_TOGGLE_USERS_LOCK__SUCCEEDED,
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

export function* dxUserSelectedUserToggleLockSaga() {
  yield takeEvery(
    USER_TOGGLE_USERS_LOCK_REQUESTED,
    dxUserSelectedUserToggleLock
  );
}

// user selected users delete
export const dxUserSelectedUserDeleteUrl = (params, keycloak) => {
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
export function* dxUserSelectedUserDelete(action) {
  const root = yield select(selectors.root);
  const keycloak = root.keycloak;
  try {
    const response = yield call(
      dxUserSelectedUserDeleteUrl,
      action.payload,
      keycloak
    );

    if (response.isTokenRefreshed) {
      yield put(dxKeycloakUpdate(response.keycloak));
    }

    let { Confirmation, Response, Message } = response.data;
    if (Confirmation !== 'SUCCESS') {
      yield put({
        type: USER_TOGGLE_DELETE_USERS__FAILED,
        payload: {
          message: 'User delete api error'
        }
      });
    } else {
      yield put({
        type: USER_TOGGLE_DELETE_USERS__SUCCEEDED,
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

export function* dxUserSelectedUserDeleteSaga() {
  yield takeEvery(USER_TOGGLE_DELETE_USERS_REQUESTED, dxUserSelectedUserDelete);
}

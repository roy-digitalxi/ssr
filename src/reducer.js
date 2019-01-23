// Login
import {} from './login';

// Dashboard
import {
  EXPERIENCE_FETCH_MORE_REQUESTED,
  EXPERIENCE_FETCH_MORE__SUCCEEDED,
  EXPERIENCE_FETCH_MORE__FAILED,
  EXPERIENCE_FETCH__FAILED,
  EXPERIENCE_DELETE__SUCCEEDED,
  EXPERIENCE_DELETE__FAILED,
  CHANNEL_FETCH__FAILED,
  CHANNEL_UPDATE_STATUS__SUCCEEDED,
  CHANNEL_UPDATE_STATUS__FAILED,
  STREAM_CHANNEL_FETCH_REQUESTED,
  STREAM_CHANNEL_FETCH__SUCCEEDED,
  STREAM_CHANNEL_FETCH__FAILED,
  STREAM_FETCH_MORE_CHANNEL_REQUESTED,
  STREAM_FETCH_MORE_CHANNEL__SUCCEEDED,
  STREAM_FETCH_MORE_CHANNEL__FAILED,
  STREAM_CREATE__SUCCEEDED,
  STREAM_CREATE__FAILED,
  STREAM_REMOVE__SUCCEEDED,
  STREAM_REMOVE__FAILED,
  STREAM_FETCH_MORE_EXPERIENCE_REQUESTED,
  STREAM_FETCH_MORE_EXPERIENCE__SUCCEEDED,
  STREAM_FETCH_MORE_EXPERIENCE__FAILED,
  STREAM_FETCH_MORE_STREAM_REQUESTED,
  STREAM_FETCH_MORE_STREAM__SUCCEEDED,
  STREAM_FETCH_MORE_STREAM__FAILED,
  CHANNEL_DELETE__SUCCEEDED,
  CHANNEL_DELETE__FAILED,
  USER_UPDATE_NEW_USER_CREATE__SUCCEEDED,
  USER_UPDATE_NEW_USER_CREATE__FAILED,
  USER_UPDATE_USER__SUCCEEDED,
  USER_UPDATE_USER__FAILED,
  USER_DELETE_USER__SUCCEEDED,
  USER_DELETE_USER__FAILED,
  USER_RESET_PASSWORD__SUCCEEDED,
  USER_RESET_PASSWORD__FAILED,
  USER_UPDATE_SELECTED_USER_GRANT_ACCESS__SUCCEEDED,
  USER_UPDATE_SELECTED_USER_GRANT_ACCESS__FAILED,
  USER_TOGGLE_USERS_LOCK__SUCCEEDED,
  USER_TOGGLE_USERS_LOCK__FAILED,
  USER_TOGGLE_DELETE_USERS__SUCCEEDED,
  USER_TOGGLE_DELETE_USERS__FAILED
} from './dashboard';

// New experience
import {
  EXPERIENCE_PREVIEW__SUCCEEDED,
  EXPERIENCE_PREVIEW__FAILED,
  EXPERIENCE_VIEW_HTML_FETCH_REQUESTED,
  EXPERIENCE_VIEW_HTML_FETCH__SUCCEEDED,
  EXPERIENCE_VIEW_HTML_FETCH__FAILED,
  EXPERIENCE_UPLOAD_GOOGLE_FILE_REQUESTED,
  EXPERIENCE_UPLOAD_GOOGLE_FILE__SUCCEEDED,
  EXPERIENCE_UPLOAD_GOOGLE_FILE__FAILED,
  EXPERIENCE_UPLOAD_FILE_REQUESTED,
  EXPERIENCE_UPLOAD_FILE__SUCCEEDED,
  EXPERIENCE_UPLOAD_FILE__FAILED,
  EXPERIENCE_CARD_TEMPLATE_UPDATE_IMAGE_REQUESTED,
  EXPERIENCE_CARD_TEMPLATE_UPDATE_IMAGE__SUCCEEDED,
  EXPERIENCE_CARD_TEMPLATE_UPDATE_IMAGE__FAILED,
  EXPERIENCE_CREATE_REQUESTED,
  EXPERIENCE_CREATE__SUCCEEDED,
  EXPERIENCE_CREATE__FAILED,
  EXPERIENCE_UPDATE_FILE_REQUESTED,
  EXPERIENCE_UPDATE_FILE__SUCCEEDED,
  EXPERIENCE_UPDATE_FILE__FAILED,
  EXPERIENCE_PAGE_UPDATE_ELEM_REQUESTED,
  EXPERIENCE_PAGE_UPDATE_ELEM__SUCCEEDED,
  EXPERIENCE_PAGE_UPDATE_ELEM__FAILED,
  EXPERIENCE_UPDATE_REQUESTED,
  EXPERIENCE_UPDATE__SUCCEEDED,
  EXPERIENCE_UPDATE__FAILED,
  EXPERIENCE_VIEW_REQUESTED,
  EXPERIENCE_VIEW__SUCCEEDED,
  EXPERIENCE_VIEW__FAILED
} from './newexperience';

// New channel
import {
  CHANNEL_CREATE_REQUESTED,
  CHANNEL_CREATE__SUCCEEDED,
  CHANNEL_CREATE__FAILED,
  CHANNEL_UPDATE_REQUESTED,
  CHANNEL_UPDATE__SUCCEEDED,
  CHANNEL_UPDATE__FAILED
} from './newchannel';

// Language
import {
  ADD_LANGUAGE_SUCCESS,
  ADD_LANGUAGE_ERRORS,
  UPDATE_LANGUAGE_SUCCESS,
  UPDATE_LANGUAGE_ERRORS,
  UPDATE_LANGUAGE_SET_ACTIVE_SUCCESS,
  UPDATE_LANGUAGE_SET_ACTIVE_ERRORS,
  UPDATE_LANGUAGE_SET_DEFAULT_SUCCESS,
  UPDATE_LANGUAGE_SET_DEFAULT_ERRORS
} from './language';

// member
import {
  MEMBER_UPDATE_NEW_MEMBER_CREATE__SUCCEEDED,
  MEMBER_UPDATE_NEW_MEMBER_CREATE__FAILED,
  MEMBER_UPDATE_MEMBER__FAILED,
  MEMBER_UPDATE_MEMBER__SUCCEEDED,
  MEMBER_DELETE_MEMBER__SUCCEEDED,
  MEMBER_DELETE_MEMBER__FAILED,
  MEMBER_RESET_PASSWORD__SUCCEEDED,
  MEMBER_RESET_PASSWORD__FAILED,
  MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS__SUCCEEDED,
  MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS__FAILED,
  MEMBER_TOGGLE_MEMBERS_LOCK__SUCCEEDED,
  MEMBER_TOGGLE_MEMBERS_LOCK__FAILED,
  MEMBER_TOGGLE_DELETE_MEMBERS__FAILED,
  MEMBER_TOGGLE_DELETE_MEMBERS__SUCCEEDED
} from './member';

// Global
import {
  NAVIGATE_HISTORY__SUCCEEDED,
  NAVIGATE_HISTORY__FAILED,
  ALERT__SUCCEEDED,
  LOADING__SUCCEEDED,
  KEYCLOAK_ROUTE__SUCCESS,
  KEYCLOAK_ROUTE__FAILED,
  KEYCLOAK_ADMIN_LOGIN,
  KEYCLOAK_ADMIN_LOGOUT,
  KEYCLOAK_LOGIN,
  KEYCLOAK_LOGOUT,
  KEYCLOAK_UPDATE
} from './constants';

// Admin
import {
  ADMIN_CREATE_ORG__SUCCEEDED,
  ADMIN_CREATE_ORG__FAILED,
  ADMIN_UPDATE_ORG__SUCCEEDED,
  ADMIN_UPDATE_ORG__FAILED,
  ADMIN_UPDATE_ORG_STATUS__SUCCEEDED,
  ADMIN_UPDATE_ORG_STATUS__FAILED
} from './adminDashboard';

const initialState = {
  isKeycloakRoute: true,
  isKeycloakAuth: false,
  isAuthenticated: false,
  isAdminAuthenticated: false,
  keycloak: null,
  access: null,
  navArr: [],

  history: null,
  user: {},

  alertBar: {
    isDisplay: false,
    isError: false,
    message: ''
  },

  isLoading: false
};

const rootReducer = (previousState = initialState, { type, payload }) => {
  let updated = Object.assign({}, previousState);
  let tempAlertBar;

  switch (type) {
    case KEYCLOAK_ROUTE__FAILED:
      updated.isKeycloakRoute = false;
      return updated;

    case KEYCLOAK_ROUTE__SUCCESS:
      updated.isKeycloakRoute = true;
      return updated;

    case KEYCLOAK_ADMIN_LOGIN:
      updated.isKeycloakAuth = true;
      updated.isAdminAuthenticated = true;
      updated.isAuthenticated = false;
      updated.keycloak = payload.keycloak;
      return updated;

    case KEYCLOAK_ADMIN_LOGOUT:
      updated.isKeycloakAuth = false;
      updated.isAdminAuthenticated = false;
      updated.keycloak = null;
      return updated;

    case KEYCLOAK_LOGIN:
      updated.isKeycloakAuth = true;
      updated.isAdminAuthenticated = false;
      updated.isAuthenticated = true;
      updated.keycloak = payload.keycloak;
      updated.access = payload.access;
      updated.navArr = payload.navArr;
      return updated;

    case KEYCLOAK_LOGOUT:
      updated.isKeycloakAuth = false;
      updated.isAuthenticated = false;
      updated.keycloak = null;
      return updated;

    case KEYCLOAK_UPDATE:
      updated.keycloak = payload.keycloak;
      return updated;

    case NAVIGATE_HISTORY__SUCCEEDED:
      updated.history = payload.history;
      return updated;

    case ALERT__SUCCEEDED:
      tempAlertBar = Object.assign({}, payload);
      updated.alertBar = tempAlertBar;
      return updated;

    case LOADING__SUCCEEDED:
      updated.isLoading = payload.isLoading;
      return updated;

    case EXPERIENCE_VIEW_HTML_FETCH_REQUESTED:
    case EXPERIENCE_UPLOAD_GOOGLE_FILE_REQUESTED:
    case EXPERIENCE_UPLOAD_FILE_REQUESTED:
    case EXPERIENCE_UPDATE_FILE_REQUESTED:
    case EXPERIENCE_FETCH_MORE_REQUESTED:
    case STREAM_FETCH_MORE_EXPERIENCE_REQUESTED:
    case STREAM_FETCH_MORE_STREAM_REQUESTED:
      updated.isLoading = true;
      return updated;

    case EXPERIENCE_VIEW_HTML_FETCH__SUCCEEDED:
    case EXPERIENCE_UPLOAD_GOOGLE_FILE__SUCCEEDED:
    case EXPERIENCE_FETCH_MORE__SUCCEEDED:
    case STREAM_FETCH_MORE_EXPERIENCE__SUCCEEDED:
    case STREAM_FETCH_MORE_STREAM__SUCCEEDED:
      updated.isLoading = false;
      return updated;

    case EXPERIENCE_VIEW_HTML_FETCH__FAILED:
    case EXPERIENCE_UPLOAD_GOOGLE_FILE__FAILED:
    case EXPERIENCE_FETCH_MORE__FAILED:
      updated.isLoading = false;
      tempAlertBar = {
        isDisplay: true,
        isError: false,
        message: payload.message
      };
      updated.alertBar = tempAlertBar;
      return updated;

    case EXPERIENCE_PREVIEW__SUCCEEDED:
    case EXPERIENCE_CREATE__SUCCEEDED:
    case EXPERIENCE_UPDATE__SUCCEEDED:
      tempAlertBar = {
        isDisplay: true,
        isError: false,
        message: payload.message
      };
      updated.alertBar = tempAlertBar;
      updated.isLoading = false;
      return updated;

    case EXPERIENCE_CARD_TEMPLATE_UPDATE_IMAGE__SUCCEEDED:
    case EXPERIENCE_DELETE__SUCCEEDED:
    case CHANNEL_CREATE__SUCCEEDED:
    case CHANNEL_UPDATE_STATUS__SUCCEEDED:
    case CHANNEL_DELETE__SUCCEEDED:
    case CHANNEL_UPDATE__SUCCEEDED:
    case STREAM_CREATE__SUCCEEDED:
    case STREAM_REMOVE__SUCCEEDED:

    case ADD_LANGUAGE_SUCCESS:
    case UPDATE_LANGUAGE_SUCCESS:
    case UPDATE_LANGUAGE_SET_ACTIVE_SUCCESS:
    case UPDATE_LANGUAGE_SET_DEFAULT_SUCCESS:

    case USER_UPDATE_NEW_USER_CREATE__SUCCEEDED:
    case USER_UPDATE_USER__SUCCEEDED:
    case USER_DELETE_USER__SUCCEEDED:
    case USER_RESET_PASSWORD__SUCCEEDED:
    case USER_UPDATE_SELECTED_USER_GRANT_ACCESS__SUCCEEDED:
    case USER_TOGGLE_USERS_LOCK__SUCCEEDED:
    case USER_TOGGLE_DELETE_USERS__SUCCEEDED:

    case MEMBER_UPDATE_NEW_MEMBER_CREATE__SUCCEEDED:
    case MEMBER_UPDATE_MEMBER__SUCCEEDED:
    case MEMBER_DELETE_MEMBER__SUCCEEDED:
    case MEMBER_RESET_PASSWORD__SUCCEEDED:
    case MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS__SUCCEEDED:
    case MEMBER_TOGGLE_MEMBERS_LOCK__SUCCEEDED:
    case MEMBER_TOGGLE_DELETE_MEMBERS__SUCCEEDED:

    case ADMIN_CREATE_ORG__SUCCEEDED:
    case ADMIN_UPDATE_ORG__SUCCEEDED:
    case ADMIN_UPDATE_ORG_STATUS__SUCCEEDED:
      tempAlertBar = {
        isDisplay: true,
        isError: false,
        message: payload.message
      };
      updated.alertBar = tempAlertBar;
      return updated;

    case EXPERIENCE_CARD_TEMPLATE_UPDATE_IMAGE__FAILED:
    case EXPERIENCE_FETCH__FAILED:
    case EXPERIENCE_DELETE__FAILED:
    case EXPERIENCE_CREATE__FAILED:
    case EXPERIENCE_UPDATE__FAILED:
    case EXPERIENCE_VIEW__FAILED:
    case CHANNEL_FETCH__FAILED:
    case CHANNEL_CREATE__FAILED:
    case CHANNEL_UPDATE_STATUS__FAILED:
    case CHANNEL_DELETE__FAILED:
    case CHANNEL_UPDATE__FAILED:
    case STREAM_CHANNEL_FETCH__FAILED:
    case STREAM_CREATE__FAILED:
    case STREAM_REMOVE__FAILED:

    case ADD_LANGUAGE_ERRORS:
    case UPDATE_LANGUAGE_ERRORS:
    case UPDATE_LANGUAGE_SET_ACTIVE_ERRORS:
    case UPDATE_LANGUAGE_SET_DEFAULT_ERRORS:

    case USER_UPDATE_NEW_USER_CREATE__FAILED:
    case USER_UPDATE_USER__FAILED:
    case USER_DELETE_USER__FAILED:
    case USER_RESET_PASSWORD__FAILED:
    case USER_UPDATE_SELECTED_USER_GRANT_ACCESS__FAILED:
    case USER_TOGGLE_USERS_LOCK__FAILED:
    case USER_TOGGLE_DELETE_USERS__FAILED:

    case MEMBER_UPDATE_NEW_MEMBER_CREATE__FAILED:
    case MEMBER_UPDATE_MEMBER__FAILED:
    case MEMBER_DELETE_MEMBER__FAILED:
    case MEMBER_RESET_PASSWORD__FAILED:
    case MEMBER_UPDATE_SELECTED_MEMBER_GRANT_ACCESS__FAILED:
    case MEMBER_TOGGLE_MEMBERS_LOCK__FAILED:
    case MEMBER_TOGGLE_DELETE_MEMBERS__FAILED:

    case ADMIN_CREATE_ORG__FAILED:
    case ADMIN_UPDATE_ORG__FAILED:
    case ADMIN_UPDATE_ORG_STATUS__FAILED:
      tempAlertBar = {
        isDisplay: true,
        isError: true,
        message: payload.message
      };
      updated.alertBar = tempAlertBar;
      return updated;

    case EXPERIENCE_PAGE_UPDATE_ELEM__SUCCEEDED:
      if (
        payload.type == 'SPLASH_IMG' ||
        payload.type == 'IMAGE' ||
        payload.type == 'AD_BTN_IMAGE' ||
        payload.type == 'EMBED_PDF' ||
        payload.type == 'H5P'
      ) {
        tempAlertBar = {
          isDisplay: true,
          isError: false,
          message: payload.message
        };
        updated.alertBar = tempAlertBar;
      }
      return updated;

    case EXPERIENCE_PAGE_UPDATE_ELEM__FAILED:
      if (
        payload.type == 'SPLASH_IMG' ||
        payload.type == 'IMAGE' ||
        payload.type == 'AD_BTN_IMAGE'
      ) {
        tempAlertBar = {
          isDisplay: true,
          isError: true,
          message: payload.message
        };
        updated.alertBar = tempAlertBar;
      }
      return updated;

    default:
      return previousState;
  }
};

export default rootReducer;

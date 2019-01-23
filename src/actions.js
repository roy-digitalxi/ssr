import {
  NAVIGATE_HISTORY_REQUESTED,
  ALERT_REQUESTED,
  LOADING_REQUESTED,
  KEYCLOAK_ROUTE_REQUESTED,
  KEYCLOAK_ADMIN_LOGIN,
  KEYCLOAK_ADMIN_LOGOUT,
  KEYCLOAK_LOGIN,
  KEYCLOAK_LOGOUT,
  KEYCLOAK_UPDATE
} from './constants';

export const dxNavigateHistory = history => {
  return {
    type: NAVIGATE_HISTORY_REQUESTED,
    payload: {
      history
    }
  };
};

export const dxAlert = (isDisplay, isError, message) => {
  return {
    type: ALERT_REQUESTED,
    payload: {
      isDisplay,
      isError,
      message
    }
  };
};

export const dxLoading = isLoading => {
  return {
    type: LOADING_REQUESTED,
    payload: {
      isLoading
    }
  };
};

export const dxKeycloakRoute = orgUrl => {
  return {
    type: KEYCLOAK_ROUTE_REQUESTED,
    payload: {
      orgUrl
    }
  };
};

export const dxKeycloakAdminLogin = keycloak => {
  return {
    type: KEYCLOAK_ADMIN_LOGIN,
    payload: {
      keycloak
    }
  };
};

export const dxKeycloakAdminLogout = () => {
  return {
    type: KEYCLOAK_ADMIN_LOGOUT,
    payload: {}
  };
};

export const dxKeycloakLogin = (keycloak, access, navArr) => {
  return {
    type: KEYCLOAK_LOGIN,
    payload: {
      keycloak,
      access,
      navArr
    }
  };
};

export const dxKeycloakLogout = () => {
  return {
    type: KEYCLOAK_LOGOUT,
    payload: {}
  };
};

export const dxKeycloakUpdate = keycloak => {
  return {
    type: KEYCLOAK_UPDATE,
    payload: {
      keycloak
    }
  };
};

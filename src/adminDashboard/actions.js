import {
  ADMIN_FETCH_ORG_LIST_REQUESTED,
  ADMIN_TOGGLE_ORG_MODAL,
  ADMIN_UPDATE_ORG_INPUT,
  ADMIN_CREATE_ORG_REQUESTED,
  ADMIN_VIEW_ORG_REQUESTED,
  ADMIN_UPDATE_ORG_REQUESTED,
  ADMIN_UPDATE_ORG_STATUS_REQUESTED
} from './constants';

export const dxAdminFetchOrgList = () => {
  return {
    type: ADMIN_FETCH_ORG_LIST_REQUESTED,
    payload: {}
  };
};

export const dxAdminToggleOrgModal = (toggle, type) => {
  return {
    type: ADMIN_TOGGLE_ORG_MODAL,
    payload: {
      toggle,
      type
    }
  };
};

export const dxAdminUpdateOrgInput = (type, val) => {
  return {
    type: ADMIN_UPDATE_ORG_INPUT,
    payload: {
      type,
      val
    }
  };
};

export const dxAdminCreateOrg = org => {
  return {
    type: ADMIN_CREATE_ORG_REQUESTED,
    payload: {
      org
    }
  };
};

export const dxAdminViewOrg = (orgGUID, type) => {
  return {
    type: ADMIN_VIEW_ORG_REQUESTED,
    payload: {
      orgGUID,
      type
    }
  };
};

export const dxAdminUpdateOrg = org => {
  return {
    type: ADMIN_UPDATE_ORG_REQUESTED,
    payload: {
      org
    }
  };
};

export const dxAdminUpdateOrgStatus = (orgGUID, toggle) => {
  return {
    type: ADMIN_UPDATE_ORG_STATUS_REQUESTED,
    payload: {
      orgGUID,
      toggle
    }
  };
};

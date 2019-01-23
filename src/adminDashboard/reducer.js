import {
  ADMIN_TOGGLE_ORG_MODAL,
  ADMIN_UPDATE_ORG_INPUT,
  ADMIN_CREATE_ORG__SUCCEEDED,
  ADMIN_FETCH_ORG_LIST__SUCCEEDED,
  ADMIN_CREATE_ORG_REQUESTED,
  ADMIN_CREATE_ORG__FAILED,
  ADMIN_VIEW_ORG__SUCCEEDED,
  ADMIN_UPDATE_ORG__SUCCEEDED,
  ADMIN_UPDATE_ORG_STATUS__SUCCEEDED
} from './constants';

const initialState = {
  IsFetching: false,
  IsOrgModalOpen: false,
  ModalType: null,
  Orgs: [],
  TotalRecords: 0,
  Org: Object.assign({}, defaultOrg),
  EditOrg: null
};

const defaultOrg = {
  OrgName: null,
  Email: null,
  FirstName: null,
  LastName: null,
  Password: null,
  ConfirmPassword: null
};

const adminReducer = (previousState = initialState, { type, payload }) => {
  let updated = Object.assign({}, previousState);
  let tmpOrgs = Object.assign([], updated.Orgs);
  let tmpOrg = Object.assign({}, updated.Org);
  let tmpEditOrg = Object.assign({}, updated.EditOrg);

  let tmpFormattedOrgs = [];

  switch (type) {
    case ADMIN_TOGGLE_ORG_MODAL:
      updated.IsOrgModalOpen = payload.toggle;
      if (payload.toggle) {
        updated.ModalType = payload.type;
      } else {
        updated.ModalType = null;
      }
      return updated;

    case ADMIN_UPDATE_ORG_INPUT:
      if (updated.ModalType == 'CREATE') {
        if (payload.type == 'ORG_NAME') {
          tmpOrg.OrgName = payload.val;
        } else if (payload.type == 'EMAIL') {
          tmpOrg.Email = payload.val;
        } else if (payload.type == 'FIRST_NAME') {
          tmpOrg.FirstName = payload.val;
        } else if (payload.type == 'LAST_NAME') {
          tmpOrg.LastName = payload.val;
        } else if (payload.type == 'PASSWORD') {
          tmpOrg.Password = payload.val;
        } else if (payload.type == 'CONFIRM_PASSWORD') {
          tmpOrg.ConfirmPassword = payload.val;
        }
        updated.Org = tmpOrg;
      } else {
        if (payload.type == 'ORG_NAME') {
          tmpEditOrg.OrgName = payload.val;
          tmpEditOrg.OrgUrl = convertOrgNameToOrgUrl(payload.val.trim());
        }
        updated.EditOrg = tmpEditOrg;
      }
      return updated;

    case ADMIN_CREATE_ORG_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case ADMIN_CREATE_ORG__SUCCEEDED:
      tmpOrg = Object.assign({}, defaultOrg);
      updated.Org = tmpOrg;
      tmpOrgs.unshift(payload.org);
      updated.Orgs = tmpOrgs;
      updated.IsOrgModalOpen = false;
      updated.IsFetching = false;
      return updated;

    case ADMIN_CREATE_ORG__FAILED:
      updated.IsFetching = false;
      return updated;

    case ADMIN_FETCH_ORG_LIST__SUCCEEDED:
      updated.Orgs = payload.orgs;
      updated.TotalRecords = payload.totalRecords;
      return updated;

    case ADMIN_VIEW_ORG__SUCCEEDED:
      updated.IsOrgModalOpen = true;
      updated.EditOrg = payload.org;
      updated.ModalType = payload.type;
      return updated;

    case ADMIN_UPDATE_ORG__SUCCEEDED:
      tmpOrgs.forEach(org => {
        if (org.OrgGUID == payload.org.OrgGUID) {
          tmpFormattedOrgs.push(payload.org);
        } else {
          tmpFormattedOrgs.push(org);
        }
      });
      updated.IsOrgModalOpen = false;
      updated.EditOrg = null;
      updated.ModalType = null;
      updated.Orgs = tmpFormattedOrgs;
      return updated;

    case ADMIN_UPDATE_ORG_STATUS__SUCCEEDED:
      tmpOrgs.forEach(org => {
        if (org.OrgGUID == payload.org.OrgGUID) {
          tmpFormattedOrgs.push(payload.org);
        } else {
          tmpFormattedOrgs.push(org);
        }
      });
      updated.Orgs = tmpFormattedOrgs;
      return updated;

    default:
      return previousState;
  }
};

export default adminReducer;

const convertOrgNameToOrgUrl = orgName => {
  return orgName.replace(/\s/g, '.').trim();
};

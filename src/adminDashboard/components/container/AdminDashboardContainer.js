import React, { Component } from 'react';

// Libraries
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

// colors
import colors from '../../../styles/colors';

// redux
import { connect } from 'react-redux';
import {
  dxAdminToggleOrgModal as dxAdminToggleOrgModalAction,
  dxAdminUpdateOrgInput as dxAdminUpdateOrgInputAction,
  dxAdminCreateOrg as dxAdminCreateOrgAction,
  dxAdminFetchOrgList as dxAdminFetchOrgListAction,
  dxAdminViewOrg as dxAdminViewOrgAction,
  dxAdminUpdateOrg as dxAdminUpdateOrgAction,
  dxAdminUpdateOrgStatus as dxAdminUpdateOrgStatusAction
} from '../../actions';
import {
  dxAlert as dxAlertAction,
  dxKeycloakAdminLogout as dxKeycloakAdminLogoutAction
} from '../../../actions';

// constants
import fonts from '../../../styles/fonts';
import config from '../../../config';

// helpers
import * as helpers from '../../../helpers';

// components
import OrgInfo from '../presentation/OrgInfo';
import OrgModal from '../presentation/OrgModal';

class AdminDashboardContainer extends Component {
  componentDidMount() {
    this.props.dxAdminFetchOrgListAction();
  }

  handleCreateOrg = () => {
    this.props.dxAdminToggleOrgModalAction(true, 'CREATE');
  };

  handleCreateOrgConfirm = () => {
    const { Org } = this.props;

    const { isValidate, msg } = this.validateOrgToCreate(Org);
    if (!isValidate) {
      this.props.dxAlertAction(true, true, msg);
      return;
    }

    this.props.dxAdminCreateOrgAction(Org);
  };

  validateOrgToCreate = org => {
    const {
      OrgName,
      Email,
      FirstName,
      LastName,
      Password,
      ConfirmPassword
    } = org;

    let isValidate = true;
    let msg;
    if (!OrgName) {
      return {
        isValidate: false,
        msg: 'OrgName is required'
      };
    }
    if (!Email) {
      return {
        isValidate: false,
        msg: 'Email is required'
      };
    }
    if (!helpers.isValidEmail(Email)) {
      return {
        isValidate: false,
        msg: 'Email is invalid'
      };
    }
    if (!FirstName) {
      return {
        isValidate: false,
        msg: 'FirstName is required'
      };
    }
    if (!LastName) {
      return {
        isValidate: false,
        msg: 'LastName is required'
      };
    }
    if (!Password) {
      return {
        isValidate: false,
        msg: 'Password is required'
      };
    }
    if (Password.length < 6) {
      return {
        isValidate: false,
        msg: 'Password at least 6 characters'
      };
    }
    if (ConfirmPassword != Password) {
      return {
        isValidate: false,
        msg: 'Password dont match'
      };
    }

    return {
      isValidate,
      msg
    };
  };

  handleUpdateOrg = org => {
    this.props.dxAdminViewOrgAction(org.OrgGUID, 'UPDATE');
  };

  handleUpdateOrgConfirm = () => {
    const { EditOrg } = this.props;

    const { isValidate, msg } = this.validateOrgToUpdate(EditOrg);
    if (!isValidate) {
      this.props.dxAlertAction(true, true, msg);
      return;
    }

    this.props.dxAdminUpdateOrgAction(EditOrg);
  };

  validateOrgToUpdate = org => {
    const { OrgName, OrgUrl } = org;

    let isValidate = true;
    let msg;
    if (!OrgName) {
      return {
        isValidate: false,
        msg: 'OrgName is required'
      };
    }
    const match = OrgUrl.match(/\.{1}[\.+]/g);
    if (match && match.length) {
      return {
        isValidate: false,
        msg: 'OrgUrl is invalid'
      };
    }

    return {
      isValidate,
      msg
    };
  };

  handleToggleStatus = org => {
    this.props.dxAdminUpdateOrgStatusAction(org.OrgGUID, !org.IsActive);
  };

  render() {
    const {
      IsOrgModalOpen,
      IsFetching,
      ModalType,
      Orgs,
      Org,
      EditOrg
    } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      topContainerStyle,
      topWrapperStyle,
      fullBtnStyle,
      addBtnIconStyle,
      contentContainerStyle,
      headerContainerStyle,
      headerWrapperStyle,
      notFoundContainerStyle,
      notFoundLabelStyle,
      notFoundImgStyle
    } = styles;

    return (
      <div style={mainContainerStyle}>
        <div style={topContainerStyle}>
          <div style={topWrapperStyle}>
            <Button
              variant="Add a new member"
              style={fullBtnStyle}
              onClick={e => this.handleCreateOrg(e)}
            >
              <Add style={addBtnIconStyle} />
              Add Organization
            </Button>
          </div>
        </div>
        <div style={contentContainerStyle}>
          {Orgs.length ? (
            <div>
              <div style={headerContainerStyle}>
                <div style={headerWrapperStyle}>OrgName</div>
                <div style={headerWrapperStyle}>OrgUrl</div>
                <div style={headerWrapperStyle}>Realm</div>
                <div style={headerWrapperStyle}>Status</div>
                <div style={headerWrapperStyle} />
              </div>
              {Orgs.map(org => (
                <OrgInfo
                  org={org}
                  handleUpdateOrg={() => this.handleUpdateOrg(org)}
                  handleToggleStatus={() => this.handleToggleStatus(org)}
                />
              ))}
            </div>
          ) : (
            <div style={notFoundContainerStyle}>
              <div style={tableContainerStyle}>
                <div style={tableWrapperStyle}>
                  <img
                    style={notFoundImgStyle}
                    src={require('../../../../../assets/images/no_results_illustration.png')}
                  />
                  <p style={notFoundLabelStyle}>No results found</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {IsOrgModalOpen && (
          <OrgModal
            open={IsOrgModalOpen}
            isFetching={IsFetching}
            type={ModalType}
            org={ModalType == 'CREATE' ? Org : EditOrg}
            handleUpdateOrgInput={(type, value) =>
              this.props.dxAdminUpdateOrgInputAction(type, value)
            }
            handleCreateClick={() => this.handleCreateOrgConfirm()}
            handleUpdateClick={() => this.handleUpdateOrgConfirm()}
            handleCloseModal={() =>
              this.props.dxAdminToggleOrgModalAction(false)
            }
          />
        )}
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    keycloak: state.root.keycloak,

    IsOrgModalOpen: state.admin.IsOrgModalOpen,
    IsFetching: state.admin.IsFetching,
    ModalType: state.admin.ModalType,
    Orgs: state.admin.Orgs,
    Org: state.admin.Org,
    EditOrg: state.admin.EditOrg
  };
};

const dispatchToProps = {
  dxAlertAction,
  dxKeycloakAdminLogoutAction,

  dxAdminToggleOrgModalAction,
  dxAdminUpdateOrgInputAction,
  dxAdminCreateOrgAction,
  dxAdminFetchOrgListAction,
  dxAdminViewOrgAction,
  dxAdminUpdateOrgAction,
  dxAdminUpdateOrgStatusAction
};

const styles = {
  tableContainerStyle: {
    position: 'relative',
    display: 'table',
    height: '100%',
    width: '100%'
  },
  tableWrapperStyle: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center'
  },
  mainContainerStyle: {
    width: '100%',
    height: '100%'
  },
  topContainerStyle: {
    height: 42,
    paddingTop: 36,
    paddingBottom: 24
  },
  topWrapperStyle: {
    height: 42,
    width: 240,
    float: 'right'
  },
  fullBtnStyle: {
    float: 'right',
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'capitalize',
    height: 42,
    borderRadius: '24px'
  },
  addBtnIconStyle: {
    fontSize: '15px',
    paddingRight: 6
  },
  contentContainerStyle: {},
  headerContainerStyle: {
    display: 'flex',
    padding: 12,
    backgroundColor: colors.whiteColor,
    height: 48,
    borderBottom: '1px solid #d2d8de',
    alignItems: 'center'
  },
  headerWrapperStyle: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: fonts.h2,
    fontWeight: 'bold'
  },
  notFoundContainerStyle: {
    width: '100%',
    height: '100%'
  },
  notFoundImgStyle: {
    display: 'block',
    margin: '0 auto',
    marginBottom: 36
  },
  notFoundLabelStyle: {
    margin: 0,
    fontSize: '18px',
    color: colors.greyLabelColor,
    textAlign: 'center'
  }
};

export default connect(
  stateToProps,
  dispatchToProps
)(AdminDashboardContainer);

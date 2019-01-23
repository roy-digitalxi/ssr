import React, { Component } from 'react';

// Libraries
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import Edit from '@material-ui/icons/Edit';
import Select from 'react-select';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

// styles
import '../../../../../assets/css/modal/rrm.css';

class UserGrantAccessModal extends Component {
  state = {
    isConfirmModalOpen: false
  };

  preventParent = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  };

  handleCloseModal = event => {
    this.preventParent(event);
    this.props.handleCloseModal();
  };

  handleUpdateClick = event => {
    this.preventParent(event);
    this.props.handleUpdateClick();
  };

  render() {
    const {
      open,
      isGrant,
      isSearching,
      userRoles,
      userSelectedOptions
    } = this.props;

    const {
      mainContainerStyle,
      titleContainerStyle,
      iconContainerStyle,
      iconStyle,
      titleWrapperStyle,
      titleStyle,

      channelFilterContainerStyle,
      filterTitleContainerStyle,
      filterTitleStyle,
      filterSubTitleStyle,
      channelSearchWrapperStyle,

      actionBtnContainerStyle,
      btnContainerStyle,
      confirmBtnStyle
    } = styles;

    const customStyles = {
      control: (base, state) => ({
        ...base,
        height: '36px',
        'min-height': '36px',
        border: '1px solid #B2B2B2',
        paddingLeft: 12,
        whiteSpace: 'nowrap',
        overflowX: 'scroll',
        cursor: 'auto'
      })
    };

    let hasPublish;
    if (
      userSelectedOptions.indexOf('keycloakPublishAdmin') != -1 &&
      userSelectedOptions.indexOf('keycloakChannelAdmin') != -1
    ) {
      hasPublish = true;
    }
    const formattedRoles = [];
    if (hasPublish) {
      let item = {
        value: 'PUBLISH',
        label: 'Publish'
      };
      formattedRoles.push(item);
    }
    userSelectedOptions.forEach(role => {
      let item = {};
      switch (role) {
        case 'keycloakOrgAdmin':
          item.value = 'ADMIN';
          item.label = 'Admin';
          formattedRoles.push(item);
          break;
        case 'keycloakLanguageAdmin':
          item.value = 'LANGUAGE';
          item.label = 'Language';
          formattedRoles.push(item);
          break;
        case 'keycloakAnalyticsAdmin':
          item.value = 'ANALYTICS';
          item.label = 'Analytics';
          formattedRoles.push(item);
          break;
        case 'keycloakContentAdmin':
          item.value = 'CONTENT';
          item.label = 'Content';
          formattedRoles.push(item);
          break;
        case 'keycloakUserManageAdmin':
          item.value = 'USER_MANAGE';
          item.label = 'User Manage';
          formattedRoles.push(item);
          break;
      }
    });

    return (
      <Modal
        open={open}
        onClose={e => this.handleCloseModal(e)}
        center
        closeOnOverlayClick={false}
        classNames={{
          overlay: 'dx_overlay',
          modal: 'dx_user_invite_modal'
        }}
      >
        <div style={mainContainerStyle} onClick={e => this.preventParent(e)}>
          <div style={titleContainerStyle}>
            <div style={iconContainerStyle}>
              <Edit style={iconStyle} />
            </div>
            <div style={titleWrapperStyle}>
              <p style={titleStyle}>{isGrant ? 'Grant' : 'Remove'} access</p>
            </div>
          </div>
          <div style={channelFilterContainerStyle}>
            <div style={filterTitleContainerStyle}>
              <p style={filterTitleStyle}>Roles</p>
              <p style={filterSubTitleStyle}>
                Users will automatically {isGrant ? 'assigned with' : 'remove'}{' '}
                selected roles
              </p>
              <div style={channelSearchWrapperStyle}>
                <Select
                  styles={customStyles}
                  isMulti
                  options={userRoles}
                  value={formattedRoles}
                  isSearchable
                  placeholder="Search roles.."
                  onChange={this.props.handleSelectOption}
                />
              </div>
            </div>
          </div>
          <div style={actionBtnContainerStyle}>
            <div style={btnContainerStyle}>
              <Button
                disabled={isSearching}
                style={confirmBtnStyle}
                fullWidth
                variant="text"
                onClick={e => this.handleUpdateClick(e)}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const styles = {
  tableContainerStyle: {
    position: 'relative',
    display: 'table',
    height: '100%',
    width: '100%'
  },
  tableWrapperStyle: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  mainContainerStyle: {
    height: '100%',
    backgroundColor: colors.whiteColor,
    padding: 36
  },
  titleContainerStyle: {
    paddingTop: 30,
    paddingBottom: 30
  },
  iconContainerStyle: {
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    fontSize: 24
  },
  titleWrapperStyle: {
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: fonts.h1,
    margin: 0
  },
  channelFilterContainerStyle: {
    paddingBottom: 24
  },
  filterTitleContainerStyle: {
    paddingTop: 6,
    paddingBottom: 6
  },
  filterTitleStyle: {
    margin: 0,
    fontSize: fonts.h2,
    marginBottom: 3
  },
  filterSubTitleStyle: {
    margin: 0,
    fontSize: fonts.h4,
    color: colors.greyLabelColor
  },
  channelSearchWrapperStyle: {
    paddingTop: 12,
    paddingBottom: 12,
    height: 36
  },
  actionBtnContainerStyle: {
    height: 42,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnContainerStyle: {
    height: 42
  },
  confirmBtnStyle: {
    fontSize: fonts.h1,
    height: 42,
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'capitalize'
  }
};

export default UserGrantAccessModal;

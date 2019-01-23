import React, { Component } from 'react';

// constants
import sizes from '../../../styles/sizes';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

// libraries
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import SearchBar from 'material-ui-search-bar';
import Select from 'react-select';
import DropdownMenu from 'react-dd-menu';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

// redux
import { connect } from 'react-redux';
import {
  dxUpdateUserInfoSearch as dxUpdateUserInfoSearchAction,
  dxUpdateUserChannelSearch as dxUpdateUserChannelSearchAction,
  dxUpdateUserChannelSelect as dxUpdateUserChannelSelectAction,
  dxUpdateUserPageLimitSelect as dxUpdateUserPageLimitSelectAction,
  dxUpdateUserPageIndexSelect as dxUpdateUserPageIndexSelectAction,
  dxUpdateUserSelectMode as dxUpdateUserSelectModeAction,
  dxToggleUserInviteModal as dxToggleUserInviteModalAction,
  dxUpdateUserNewUser as dxUpdateUserNewUserAction,
  dxAddNewUserForm as dxAddNewUserFormAction,
  dxDeleteNewUserForm as dxDeleteNewUserFormAction,
  dxBlurUserNewUser as dxBlurUserNewUserAction,
  dxUpdateUserNewUserChannelSearch as dxUpdateUserNewUserChannelSearchAction,
  dxUpdateUserNewUserChannelSelect as dxUpdateUserNewUserChannelSelectAction,
  dxUpdateUserNewUserCreate as dxUpdateUserNewUserCreateAction,
  dxFetchUserView as dxFetchUserViewAction,
  dxUpdateUserInput as dxUpdateUserInputAction,
  dxUpdateUserEnable as dxUpdateUserEnableAction,
  dxUpdateEditUserChannelSearch as dxUpdateEditUserChannelSearchAction,
  dxUpdateEditUserChannelSelect as dxUpdateEditUserChannelSelectAction,
  dxUpdateUser as dxUpdateUserAction,
  dxDeleteUser as dxDeleteUserAction,
  dxBlurUserEmail as dxBlurUserEmailAction,
  dxResetUserPasswordModal as dxResetUserPasswordModalAction,
  dxResetUserPassword as dxResetUserPasswordAction,
  dxResetUserDeleteModal as dxResetUserDeleteModalAction,
  dxToggleUserSelect as dxToggleUserSelectAction,
  dxToggleUserSelectAll as dxToggleUserSelectAllAction,
  dxToggleGrantAccessModal as dxToggleGrantAccessModalAction,
  dxUpdateSelectedUserChannelSearch as dxUpdateSelectedUserChannelSearchAction,
  dxUpdateUserSelectedUsersChannelSelect as dxUpdateUserSelectedUsersChannelSelectAction,
  dxUpdateUserSelectedUsersGrantAccess as dxUpdateUserSelectedUsersGrantAccessAction,
  dxToggleRemoveAccessModal as dxToggleRemoveAccessModalAction,
  dxoggleUsersLockModal as dxoggleUsersLockModalAction,
  dxToggleUsersLock as dxToggleUsersLockAction,
  dxToggleDeleteUsersModal as dxToggleDeleteUsersModalAction,
  dxDeleteUsers as dxDeleteUsersAction
} from '../../actions';

import { dxAlert as dxAlertAction } from '../../../actions';

// components
import UserInfo from '../presentation/user/UserInfo';
import InviteModal from '../presentation/user/InviteModal';
import UserModal from '../presentation/user/UserModal';
import UserPasswordModal from '../presentation/user/UserPasswordModal';
import UserDeleteModal from '../presentation/user/UserDeleteModal';
import UserGrantAccessModal from '../presentation/user/UserGrantAccessModal';
import UserLockModal from '../presentation/user/UserLockModal';

// styles
import '../../../../../assets/css/react-select/index.css';
import '../../../../../assets/css/react-paginate/index.css';

// helpers
import * as helpers from '../../../helpers';

const themeStyles = () => ({});

class UserContainer extends Component {
  state = {
    isPaginationMenuOpen: false
  };

  componentDidMount() {
    const { UserSearchValue, UserSelectedOptions, UserPageLimit } = this.props;
    this.props.dxUpdateUserInfoSearchAction(
      UserSearchValue,
      UserSelectedOptions,
      UserPageLimit
    );
  }

  preventParent = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  };

  handleCreateUser = event => {
    this.preventParent(event);
    this.props.dxToggleUserInviteModalAction(true);
  };

  handleCloseModal = event => {
    this.props.dxToggleUserInviteModalAction(false);
  };

  handleBlurNewUserEmail = index => {
    this.props.dxBlurUserNewUserAction(index);
  };

  handleUpdateNewUser = (index, type, value) => {
    this.props.dxUpdateUserNewUserAction(index, type, value);
  };

  handleSearchUserInfo = searchVal => {
    const { UserSelectedOptions, UserPageLimit } = this.props;
    this.props.dxUpdateUserInfoSearchAction(
      searchVal,
      UserSelectedOptions,
      UserPageLimit
    );
  };

  handleSelectOption = selectedOption => {
    const { UserSearchValue, UserPageLimit } = this.props;
    this.props.dxUpdateUserChannelSelectAction(
      UserSearchValue,
      selectedOption,
      UserPageLimit
    );
  };

  handleSearchChannel = searchVal => {
    this.props.dxUpdateUserChannelSearchAction(searchVal);
  };

  handleTogglePageLimitMenu = () => {
    this.setState({
      isPaginationMenuOpen: !this.state.isPaginationMenuOpen
    });
  };

  handleClosePaginationMenu = () => {
    this.setState({
      isPaginationMenuOpen: false
    });
  };

  handleSelectPageLimitOption = pageLimit => {
    this.setState({ isPaginationMenuOpen: false });
    const { UserSearchValue, UserSelectedOptions } = this.props;
    this.props.dxUpdateUserPageLimitSelectAction(
      UserSearchValue,
      UserSelectedOptions,
      pageLimit
    );
  };

  handlePageClick = e => {
    const { UserSearchValue, UserSelectedOptions, UserPageLimit } = this.props;
    this.props.dxUpdateUserPageIndexSelectAction(
      UserSearchValue,
      UserSelectedOptions,
      UserPageLimit,
      e.selected
    );
  };

  dxUpdateUserNewUserChannelSearch = searchVal => {
    this.props.dxUpdateUserNewUserChannelSearchAction(searchVal);
  };

  handleModalCreateUser = () => {
    const { NewUsers, NewUserSelectedOptions } = this.props;

    const { isValidate, msg } = this.validateUsers(NewUsers);

    if (!isValidate) {
      this.props.dxAlertAction(true, true, msg);
      return;
    }

    const formattedUsers = NewUsers.map(user => {
      return {
        Email: user.Email,
        FirstName: user.FirstName,
        LastName: user.LastName
      };
    });
    const formattedChannels = NewUserSelectedOptions.map(channel => {
      return channel.ExperienceChannelGUID;
    });

    this.props.dxUpdateUserNewUserCreateAction(
      formattedUsers,
      formattedChannels
    );
  };

  validateUsers = users => {
    let isValidate = true;
    let msg = '';

    if (!users.length) {
      return {
        isValidate: false,
        msg: 'At least one user to create'
      };
    }

    users.forEach((user, index) => {
      const number = index + 1;
      if (!user.Email) {
        isValidate = false;
        msg += `#${number}: email is required; `;
      } else if (!helpers.isValidEmail(user.Email)) {
        isValidate = false;
        msg += `#${number}: email is invalid; `;
      } else if (!user.IsValidate) {
        isValidate = false;
        msg += `#${number}: ${user.ErrorMsg}; `;
      }
    });
    return {
      isValidate,
      msg
    };
  };

  handleUpdateUserModal = user => {
    this.props.dxFetchUserViewAction(user.UserGUID, true);
  };

  handleCloseUserModal = () => {
    this.props.dxFetchUserViewAction(null, false);
  };

  handleUpdateUser = (userGUID, type, value) => {
    this.props.dxUpdateUserInputAction(userGUID, type, value);
  };

  handleUpdateEditUserChannelSearch = searchVal => {
    this.props.dxUpdateEditUserChannelSearchAction(searchVal);
  };

  handleUpdateUserConfirm = () => {
    const { User, EditUserSelectedOptions } = this.props;
    User.Channels = EditUserSelectedOptions;

    const { isValidate, msg } = this.validateUser(User);

    if (!isValidate) {
      this.props.dxAlertAction(true, true, msg);
      return;
    }

    const formattedUserChannels = User.Channels.map(uc => {
      return uc.ExperienceChannelGUID;
    });
    const formattedUser = {
      UserID: User.UserGUID,
      Email: User.Email,
      FirstName: User.FirstName,
      LastName: User.LastName,
      Enabled: User.Enabled ? '1' : '0',
      IsTeamMember: '0',
      Roles: ['keycloakUser'],
      Channels: formattedUserChannels
    };
    this.props.dxUpdateUserAction(formattedUser);
  };

  validateUser = user => {
    let isValidate = true;
    let msg = '';
    if (!user.Email) {
      isValidate = false;
      msg += `email is required; `;
    } else if (!helpers.isValidEmail(user.Email)) {
      isValidate = false;
      msg += `email is invalid; `;
    } else if (!user.IsValidate) {
      isValidate = false;
      msg += `${user.ErrorMsg}; `;
    } else if (user.Channels.length) {
      user.Channels.forEach(ch => {
        if (!ch.ExperienceChannelGUID) {
          isValidate = false;
          msg += `ExperienceChannelGUID is required; `;
        }
      });
    }
    return {
      isValidate,
      msg
    };
  };

  handleUpdateUserConfirmDelete = () => {
    const { User } = this.props;
    this.props.dxDeleteUserAction(User.UserGUID);
  };

  handleBlurUserEmail = () => {
    this.props.dxBlurUserEmailAction();
  };

  handleResetUserPassword = user => {
    this.props.dxResetUserPasswordModalAction(user.UserGUID, true);
  };

  handleCloseUserPasswordModal = () => {
    this.props.dxResetUserPasswordModalAction(null, false);
  };

  handleConfirmResetPassword = pwd => {
    const { PasswordUserGUID } = this.props;
    this.props.dxResetUserPasswordAction(PasswordUserGUID, pwd);
  };

  handleDeleteUser = user => {
    this.props.dxResetUserDeleteModalAction(user.UserGUID, true);
  };

  handleCloseUserDeleteModal = () => {
    this.props.dxResetUserDeleteModalAction(null, false);
  };

  handleConfirmDeleteUser = () => {
    const { DeleteUserGUID } = this.props;
    this.props.dxDeleteUserAction(DeleteUserGUID);
  };

  // select mode
  handleSelectMode = user => {
    this.props.dxUpdateUserSelectModeAction(user, true);
  };

  handleToggleSelect = (user, toggle) => {
    this.props.dxToggleUserSelectAction(user, toggle);
  };

  handleCancelSelectMode = () => {
    this.props.dxUpdateUserSelectModeAction(null, false);
  };

  handleUpdateSelectedUserChannelSearch = searchVal => {
    this.props.dxUpdateSelectedUserChannelSearchAction(searchVal);
  };

  handleUpdateUserConfirmGrantAccess = () => {
    const { SelectedUsers, SelectedUsersSelectedOptions } = this.props;
    if (!SelectedUsersSelectedOptions.length) {
      this.props.dxAlertAction(
        true,
        true,
        'At least one channel to be selected'
      );
      return;
    }
    const formattedUsers = SelectedUsers.map(user => user.UserGUID);
    const formattedChannels = SelectedUsersSelectedOptions.map(
      suso => suso.ExperienceChannelGUID
    );

    this.props.dxUpdateUserSelectedUsersGrantAccessAction(
      formattedUsers,
      formattedChannels,
      true
    );
  };

  handleUpdateUserConfirmRemoveAccess = () => {
    const { SelectedUsers, SelectedUsersSelectedOptions } = this.props;
    if (!SelectedUsersSelectedOptions.length) {
      this.props.dxAlertAction(
        true,
        true,
        'At least one channel to be selected'
      );
      return;
    }
    const formattedUsers = SelectedUsers.map(user => user.UserGUID);
    const formattedChannels = SelectedUsersSelectedOptions.map(
      suso => suso.ExperienceChannelGUID
    );

    this.props.dxUpdateUserSelectedUsersGrantAccessAction(
      formattedUsers,
      formattedChannels,
      false
    );
  };

  handleToggleUsersLock = () => {
    const { SelectedUsers, UserLockModalType } = this.props;
    const formattedUsers = SelectedUsers.map(user => user.UserGUID);
    this.props.dxToggleUsersLockAction(
      formattedUsers,
      UserLockModalType == 'LOCK'
    );
  };

  handleConfirmDeleteUsers = () => {
    const { SelectedUsers } = this.props;
    const formattedUsers = SelectedUsers.map(user => user.UserGUID);
    this.props.dxDeleteUsersAction(formattedUsers);
  };

  render() {
    const {
      IsSelectMode,
      UserChannels,
      UserSelectedOptions,
      UserSearchValue,
      Users,

      UserTotalRecords,
      UserPageLimit,
      UserPageNumber,

      IsFetching,
      IsUserInviteModalOpen,
      NewUsers,

      NewUserChannels,
      NewUserSelectedOptions,

      IsUserModalOpen,
      User,
      EditUserChannels,
      EditUserSelectedOptions,

      IsUserPasswordModalOpen,

      IsUserDeleteModalOpen,

      SelectedUsers,
      IsGrantAccessModalOpen,
      SelectedUsersChannels,
      SelectedUsersSelectedOptions,

      IsRemoveAccessModalOpen,

      IsUserLockModalOpen,
      UserLockModalType,

      IsUsersDeleteModalOpen
    } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,

      topContainerStyle,
      topWrapperStyle,
      fullBtnStyle,
      addBtnIconStyle,

      filterContainerStyle,

      userSearchContainerStyle,
      userSearchBarStyle,

      channelSearchContainerStyle,
      channelSearchWrapperStyle,

      pagnationContainerStyle,
      paginationDropdownBtnStyle,
      expandIconStyle,
      paginationFilterOptionContainerStyle,
      paginationFilterOptionWrapperStyle,
      paginationFilterOptionTextContainerStyle,
      paginationFilterOptionTextStyle,

      optionContainerStyle,
      optionWrapperStyle,

      bottomContainerStyle,
      userListContainerStyle,
      userListPagnationContainerStyle,

      notFoundContainerStyle,
      notFoundLabelStyle,
      notFoundImgStyle
    } = styles;

    const customStyles = {
      control: (base, state) => ({
        ...base,
        height: '48px',
        width: '360px',
        'min-height': '34px',
        border: 'none',
        borderRadius: '24px',
        paddingLeft: 12,
        whiteSpace: 'nowrap',
        overflowX: 'scroll',
        cursor: 'auto'
      })
    };

    UserChannels.forEach(uc => {
      uc.value = uc.ExperienceChannelGUID;
      uc.label = uc.ChannelName;
    });

    Users.forEach(u => {
      if (u.Attributes && u.Attributes.length) {
        u.Attributes.forEach(attr => {
          if (attr.NAME == 'IsSelfRegistered' && attr.VALUE == '1') {
            u.IsSelfRegistered = true;
          }
        });
      }
    });

    return (
      <div style={mainContainerStyle}>
        <div style={topContainerStyle}>
          <div style={topWrapperStyle}>
            <Button
              variant="Add a new user"
              style={fullBtnStyle}
              onClick={e => this.handleCreateUser(e)}
            >
              <Add style={addBtnIconStyle} />
              Add User
            </Button>
          </div>
        </div>

        {!IsSelectMode ? (
          <div style={filterContainerStyle}>
            <div style={userSearchContainerStyle}>
              <SearchBar
                onClick={e => this.preventParent(e)}
                className="dx_user_search_bar"
                value={UserSearchValue}
                style={userSearchBarStyle}
                handleBlur={() => {}}
                placeholder={'Search by name, email..'}
                onChange={val => this.handleSearchUserInfo(val)}
              />
            </div>
            <div style={channelSearchContainerStyle}>
              <div
                style={channelSearchWrapperStyle}
                onClick={e => this.preventParent(e)}
              >
                <Select
                  styles={customStyles}
                  isMulti
                  value={UserSelectedOptions}
                  onChange={this.handleSelectOption}
                  options={UserChannels}
                  isSearchable
                  placeholder="Search channel.."
                  onInputChange={this.handleSearchChannel}
                />
              </div>
            </div>
            <div
              style={pagnationContainerStyle}
              onClick={e => this.preventParent(e)}
            >
              <DropdownMenu
                className="dx_page_limit_type_filter_menu"
                isOpen={this.state.isPaginationMenuOpen}
                close={this.handleClosePaginationMenu}
                toggle={
                  <Button
                    style={Object.assign(
                      {},
                      paginationDropdownBtnStyle,
                      !this.state.isPaginationMenuOpen
                        ? {
                            borderBottomLeftRadius: '24px',
                            borderBottomRightRadius: '24px'
                          }
                        : {
                            borderTop: '1px solid',
                            borderLeft: '1px solid',
                            borderRight: '1px solid',
                            borderColor: colors.borderColor
                          }
                    )}
                    onClick={() => this.handleTogglePageLimitMenu()}
                  >
                    #{UserPageLimit}
                    <ExpandMore style={expandIconStyle} />
                  </Button>
                }
                align={'center'}
                size={'md'}
              >
                <div
                  style={Object.assign(
                    {},
                    paginationFilterOptionContainerStyle
                  )}
                  onClick={() => this.handleSelectPageLimitOption('5')}
                >
                  <div style={paginationFilterOptionWrapperStyle}>
                    <div style={paginationFilterOptionTextContainerStyle}>
                      <div style={tableContainerStyle}>
                        <div style={tableWrapperStyle}>
                          <p style={paginationFilterOptionTextStyle}>5</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={Object.assign(
                    {},
                    paginationFilterOptionContainerStyle
                  )}
                  onClick={() => this.handleSelectPageLimitOption('10')}
                >
                  <div style={paginationFilterOptionWrapperStyle}>
                    <div style={paginationFilterOptionTextContainerStyle}>
                      <div style={tableContainerStyle}>
                        <div style={tableWrapperStyle}>
                          <p style={paginationFilterOptionTextStyle}>10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={Object.assign(
                    {},
                    paginationFilterOptionContainerStyle
                  )}
                  onClick={() => this.handleSelectPageLimitOption('15')}
                >
                  <div style={paginationFilterOptionWrapperStyle}>
                    <div style={paginationFilterOptionTextContainerStyle}>
                      <div style={tableContainerStyle}>
                        <div style={tableWrapperStyle}>
                          <p style={paginationFilterOptionTextStyle}>15</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style={Object.assign(
                    {},
                    paginationFilterOptionContainerStyle
                  )}
                  onClick={() => this.handleSelectPageLimitOption('20')}
                >
                  <div style={paginationFilterOptionWrapperStyle}>
                    <div style={paginationFilterOptionTextContainerStyle}>
                      <div style={tableContainerStyle}>
                        <div style={tableWrapperStyle}>
                          <p style={paginationFilterOptionTextStyle}>20</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <div
            style={filterContainerStyle}
            onClick={e => this.preventParent(e)}
          >
            <div style={optionContainerStyle}>
              <p style={optionWrapperStyle}>#{SelectedUsers.length}</p>
            </div>
            <div
              style={optionContainerStyle}
              onClick={() => this.props.dxToggleUserSelectAllAction()}
            >
              <p style={optionWrapperStyle}>select all</p>
            </div>
            <div
              style={optionContainerStyle}
              onClick={() => this.props.dxToggleGrantAccessModalAction(true)}
            >
              <p style={optionWrapperStyle}>grant access</p>
            </div>
            <div
              style={optionContainerStyle}
              onClick={() => this.props.dxToggleRemoveAccessModalAction(true)}
            >
              <p style={optionWrapperStyle}>remove access</p>
            </div>
            <div
              style={optionContainerStyle}
              onClick={() =>
                this.props.dxoggleUsersLockModalAction(true, 'LOCK')
              }
            >
              <p style={optionWrapperStyle}>lock</p>
            </div>
            <div
              style={optionContainerStyle}
              onClick={() =>
                this.props.dxoggleUsersLockModalAction(true, 'UNLOCK')
              }
            >
              <p style={optionWrapperStyle}>unlock</p>
            </div>
            <div
              style={optionContainerStyle}
              onClick={() => this.props.dxToggleDeleteUsersModalAction(true)}
            >
              <p style={optionWrapperStyle}>delete</p>
            </div>
            <div
              style={optionContainerStyle}
              onClick={() => this.handleCancelSelectMode()}
            >
              <p style={optionWrapperStyle}>cancel</p>
            </div>
          </div>
        )}

        <div style={bottomContainerStyle}>
          <div
            style={userListContainerStyle}
            onClick={e => this.preventParent(e)}
          >
            {Users.length ? (
              Users.map(user => (
                <UserInfo
                  selectMode={IsSelectMode}
                  userPicture={require('../../../../../assets/images/avatar.jpg')}
                  userName={user.FirstName + ' ' + user.LastName}
                  userEmail={user.Email}
                  userRegistrationDate={moment(user.CreatedTimestamp).format(
                    'YYYY-MM-DD HH:mm'
                  )}
                  isSelected={user.IsSelected}
                  invitationInfo={
                    user.IsSelfRegistered ? 'Self Reigstered' : 'Invited'
                  }
                  handleSelectMode={() => this.handleSelectMode(user)}
                  handleUpdateUser={() => this.handleUpdateUserModal(user)}
                  handleResetUserPassword={() =>
                    this.handleResetUserPassword(user)
                  }
                  handleDeleteUser={() => this.handleDeleteUser(user)}
                  handleToggleSelect={toggle =>
                    this.handleToggleSelect(user, toggle)
                  }
                />
              ))
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
          <div
            style={userListPagnationContainerStyle}
            onClick={e => this.preventParent(e)}
          >
            <div className="react-paginate">
              <ReactPaginate
                forcePage={UserPageNumber > 0 ? UserPageNumber - 1 : 0}
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={UserTotalRecords / UserPageLimit}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
          </div>
        </div>
        {IsUserInviteModalOpen && (
          <InviteModal
            open={IsUserInviteModalOpen}
            isSearching={IsFetching}
            newUsers={NewUsers}
            userChannels={NewUserChannels}
            userSelectedOptions={NewUserSelectedOptions}
            handleSearchChannel={this.dxUpdateUserNewUserChannelSearch}
            handleSelectOption={options =>
              this.props.dxUpdateUserNewUserChannelSelectAction(options)
            }
            handleBlurNewUserEmail={index => this.handleBlurNewUserEmail(index)}
            handleUpdateNewUser={(index, type, value) =>
              this.handleUpdateNewUser(index, type, value)
            }
            handleAddUserForm={() => this.props.dxAddNewUserFormAction()}
            handleDeleteUserForm={index =>
              this.props.dxDeleteNewUserFormAction(index)
            }
            handleConfirmClick={() => this.handleModalCreateUser()}
            handleCloseModal={() => this.handleCloseModal()}
          />
        )}
        {IsUserModalOpen && (
          <UserModal
            open={IsUserModalOpen}
            isSearching={IsFetching}
            user={User}
            userChannels={EditUserChannels}
            userSelectedOptions={EditUserSelectedOptions}
            handleUpdateUser={(type, value) =>
              this.handleUpdateUser(User.UserGUID, type, value)
            }
            handleChangeUserEnabled={toggle =>
              this.props.dxUpdateUserEnableAction(toggle)
            }
            handleSearchChannel={this.handleUpdateEditUserChannelSearch}
            handleSelectOption={options =>
              this.props.dxUpdateEditUserChannelSelectAction(options)
            }
            handleUpdateClick={() => this.handleUpdateUserConfirm()}
            handleDelteClick={() => this.handleUpdateUserConfirmDelete()}
            handleBlurUserEmail={() => this.handleBlurUserEmail()}
            handleCloseModal={() => this.handleCloseUserModal()}
          />
        )}
        {IsUserPasswordModalOpen && (
          <UserPasswordModal
            open={IsUserPasswordModalOpen}
            isFetching={IsFetching}
            handleErrorMsg={msg => this.props.dxAlertAction(true, true, msg)}
            handleConfirmResetPassword={pwd =>
              this.handleConfirmResetPassword(pwd)
            }
            handleCloseModal={() => this.handleCloseUserPasswordModal()}
          />
        )}
        {IsUserDeleteModalOpen && (
          <UserDeleteModal
            open={IsUserDeleteModalOpen}
            handleConfirmDeleteUser={() => this.handleConfirmDeleteUser()}
            handleCloseModal={() => this.handleCloseUserDeleteModal()}
          />
        )}
        {IsGrantAccessModalOpen && (
          <UserGrantAccessModal
            open={IsGrantAccessModalOpen}
            isGrant={true}
            isSearching={IsFetching}
            userChannels={SelectedUsersChannels}
            userSelectedOptions={SelectedUsersSelectedOptions}
            handleSearchChannel={this.handleUpdateSelectedUserChannelSearch}
            handleSelectOption={options =>
              this.props.dxUpdateUserSelectedUsersChannelSelectAction(options)
            }
            handleUpdateClick={() => this.handleUpdateUserConfirmGrantAccess()}
            handleCloseModal={() =>
              this.props.dxToggleGrantAccessModalAction(false)
            }
          />
        )}
        {IsRemoveAccessModalOpen && (
          <UserGrantAccessModal
            open={IsRemoveAccessModalOpen}
            isGrant={false}
            isSearching={IsFetching}
            userChannels={SelectedUsersChannels}
            userSelectedOptions={SelectedUsersSelectedOptions}
            handleSearchChannel={this.handleUpdateSelectedUserChannelSearch}
            handleSelectOption={options =>
              this.props.dxUpdateUserSelectedUsersChannelSelectAction(options)
            }
            handleUpdateClick={() => this.handleUpdateUserConfirmRemoveAccess()}
            handleCloseModal={() =>
              this.props.dxToggleRemoveAccessModalAction(false)
            }
          />
        )}
        {IsUserLockModalOpen && (
          <UserLockModal
            open={IsUserLockModalOpen}
            isLock={UserLockModalType == 'LOCK'}
            handleConfirm={() => this.handleToggleUsersLock()}
            handleCloseModal={() =>
              this.props.dxoggleUsersLockModalAction(false, null)
            }
          />
        )}
        {IsUsersDeleteModalOpen && (
          <UserDeleteModal
            open={IsUsersDeleteModalOpen}
            handleConfirmDeleteUser={() => this.handleConfirmDeleteUsers()}
            handleCloseModal={() =>
              this.props.dxToggleDeleteUsersModalAction(false)
            }
          />
        )}
      </div>
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
    verticalAlign: 'middle',
    textAlign: 'center'
  },

  mainContainerStyle: {
    height: `calc(100vh - ${sizes.headerHeight})`,
    width: '100%'
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

  filterContainerStyle: {
    height: 48,
    display: 'flex',
    paddingBottom: 24
  },

  // user filter
  userSearchContainerStyle: {
    flex: '360px 0 0'
  },
  userSearchBarStyle: {
    boxShadow: 'none',
    height: '100%',
    borderRadius: '24px',
    width: 240
  },

  // channel filter
  channelSearchContainerStyle: {
    flex: 1
  },
  channelSearchWrapperStyle: {
    width: 360
  },

  // pagnation filter
  pagnationContainerStyle: {
    flex: '60px 0 0'
  },
  paginationDropdownBtnStyle: {
    textTransform: 'none',
    fontSize: fonts.h5,
    backgroundColor: colors.whiteColor,
    borderTopLeftRadius: '24px',
    borderTopRightRadius: '24px',
    width: '60px',
    height: 48
  },
  expandIconStyle: {
    paddingLeft: 3,
    fontSize: '18px',
    color: colors.blackColor
  },

  paginationFilterOptionContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    height: 36,
    cursor: 'pointer',
    border: '1px solid',
    borderTop: 'none',
    borderColor: colors.borderColor,
    boxSizing: 'border-box'
  },
  paginationFilterOptionWrapperStyle: {
    display: 'inline-block',
    margin: '0 auto'
  },
  paginationFilterOptionTextContainerStyle: {
    float: 'left',
    height: 36,
    paddingLeft: 3
  },
  paginationFilterOptionTextStyle: {
    margin: 0,
    fontSize: fonts.h4,
    color: colors.blackColor
  },

  optionContainerStyle: {
    height: 48,
    paddingRight: 36,
    display: 'flex',
    alignItems: 'center'
  },
  optionWrapperStyle: {
    cursor: 'pointer',
    textDecoration: 'underline',
    textTransform: 'capitalize'
  },

  // bottom
  bottomContainerStyle: {
    height: `calc(100% - 174px)`
  },
  userListContainerStyle: {
    height: 'calc(100% - 60px)',
    overflowY: 'auto'
  },
  userListPagnationContainerStyle: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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

const stateToProps = state => {
  return {
    IsSelectMode: state.dashboard.IsSelectMode,
    UserTotalRecords: state.dashboard.UserTotalRecords,
    Users: state.dashboard.Users,
    UserChannels: state.dashboard.UserChannels,
    UserSelectedOptions: state.dashboard.UserSelectedOptions,
    UserPageLimit: state.dashboard.UserPageLimit,
    UserPageNumber: state.dashboard.UserPageNumber,
    UserSearchValue: state.dashboard.UserSearchValue,

    IsFetching: state.dashboard.IsFetching,
    IsUserInviteModalOpen: state.dashboard.IsUserInviteModalOpen,
    NewUsers: state.dashboard.NewUsers,
    NewUserChannels: state.dashboard.NewUserChannels,
    NewUserSelectedOptions: state.dashboard.NewUserSelectedOptions,

    IsUserModalOpen: state.dashboard.IsUserModalOpen,
    User: state.dashboard.User,
    EditUserChannels: state.dashboard.EditUserChannels,
    EditUserSelectedOptions: state.dashboard.EditUserSelectedOptions,

    IsUserPasswordModalOpen: state.dashboard.IsUserPasswordModalOpen,
    PasswordUserGUID: state.dashboard.PasswordUserGUID,

    IsUserDeleteModalOpen: state.dashboard.IsUserDeleteModalOpen,
    DeleteUserGUID: state.dashboard.DeleteUserGUID,
    SelectedUsers: state.dashboard.SelectedUsers,

    IsGrantAccessModalOpen: state.dashboard.IsGrantAccessModalOpen,
    SelectedUsersChannels: state.dashboard.SelectedUsersChannels,
    SelectedUsersSelectedOptions: state.dashboard.SelectedUsersSelectedOptions,

    IsRemoveAccessModalOpen: state.dashboard.IsRemoveAccessModalOpen,

    IsUserLockModalOpen: state.dashboard.IsUserLockModalOpen,
    UserLockModalType: state.dashboard.UserLockModalType,

    IsUsersDeleteModalOpen: state.dashboard.IsUsersDeleteModalOpen
  };
};

const dispatchToProps = {
  dxAlertAction,

  dxUpdateUserInfoSearchAction,
  dxUpdateUserChannelSearchAction,
  dxUpdateUserChannelSelectAction,
  dxUpdateUserPageLimitSelectAction,
  dxUpdateUserPageIndexSelectAction,
  dxUpdateUserSelectModeAction,
  dxToggleUserInviteModalAction,
  dxUpdateUserNewUserAction,
  dxBlurUserNewUserAction,
  dxAddNewUserFormAction,
  dxDeleteNewUserFormAction,
  dxUpdateUserNewUserChannelSearchAction,
  dxUpdateUserNewUserChannelSelectAction,
  dxUpdateUserNewUserCreateAction,
  dxFetchUserViewAction,
  dxUpdateUserInputAction,
  dxUpdateUserEnableAction,
  dxUpdateEditUserChannelSearchAction,
  dxUpdateEditUserChannelSelectAction,
  dxUpdateUserAction,
  dxDeleteUserAction,
  dxBlurUserEmailAction,
  dxResetUserPasswordModalAction,
  dxResetUserPasswordAction,
  dxResetUserDeleteModalAction,
  dxToggleUserSelectAction,
  dxToggleUserSelectAllAction,

  dxToggleGrantAccessModalAction,
  dxUpdateSelectedUserChannelSearchAction,
  dxUpdateUserSelectedUsersChannelSelectAction,
  dxUpdateUserSelectedUsersGrantAccessAction,

  dxToggleRemoveAccessModalAction,
  dxoggleUsersLockModalAction,
  dxToggleUsersLockAction,

  dxToggleDeleteUsersModalAction,
  dxDeleteUsersAction
};

export default withStyles(themeStyles)(
  connect(
    stateToProps,
    dispatchToProps
  )(UserContainer)
);

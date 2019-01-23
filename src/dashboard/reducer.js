import {
  DASHBOARD_NAVI__SUCCEEDED,
  SEARCH_BAR_TOGGLE__SUCCEEDED,

  // channel
  CHANNEL_UPDATE_SEARCH__SUCCEEDED,
  CHANNEL_UPDATE_FILTER__SUCCEEDED,
  CHANNEL_CLEAR_FILTER__SUCCEEDED,
  CHANNEL_FETCH__SUCCEEDED,
  CHANNEL_UPDATE_STATUS__SUCCEEDED,
  CHANNEL_DELETE__SUCCEEDED,
  // experience
  HTML_FETCH__SUCCEEDED,
  EXPERIENCE_FETCH__SUCCEEDED,
  TAB_BAR_UPDATE_REQUESTED,
  TAB_BAR_UPDATE__SUCCEEDED,
  TAB_BAR_UPDATE__FAILED,
  EXPERIENCE_UPDATE_SEARCH_REQUESTED,
  EXPERIENCE_UPDATE_SEARCH__SUCCEEDED,
  EXPERIENCE_UPDATE_SEARCH__FAILED,
  EXPERIENCE_UPDATE_FILTER_REQUESTED,
  EXPERIENCE_UPDATE_FILTER__SUCCEEDED,
  EXPERIENCE_UPDATE_FILTER__FAILED,
  EXPERIENCE_CLEAR_FILTER_REQUESTED,
  EXPERIENCE_CLEAR_FILTER__SUCCEEDED,
  EXPERIENCE_CLEAR_FILTER__FAILED,
  EXPERIENCE_FETCH_MORE_REQUESTED,
  EXPERIENCE_FETCH_MORE__SUCCEEDED,
  EXPERIENCE_FETCH_MORE__FAILED,
  EXPERIENCE_DELETE__SUCCEEDED,
  // stream
  STREAM_SEARCH_BAR_TOGGLE__SUCCEEDED,
  STREAM_TAB_BAR_UPDATE_REQUESTED,
  STREAM_TAB_BAR_UPDATE__SUCCEEDED,
  STREAM_TAB_BAR_UPDATE__FAILED,
  STREAM_CHANNEL_LANGUAGES_FETCH__SUCCEEDED,
  STREAM_CHANNEL_FETCH__SUCCEEDED,
  STREAM_FETCH_MORE_CHANNEL__SUCCEEDED,
  STREAM_CHANNEL_UPDATE_SEARCH_REQUESTED,
  STREAM_CHANNEL_UPDATE_SEARCH__SUCCEEDED,
  STREAM_CHANNEL_UPDATE_SEARCH__FAILED,
  STREAM_CHANNEL_UPDATE_FILTER_REQUESTED,
  STREAM_CHANNEL_UPDATE_FILTER__SUCCEEDED,
  STREAM_CHANNEL_UPDATE_FILTER__FAILED,
  STREAM_CHANNEL_CLEAR_FILTER__SUCCEEDED,
  STREAM_CHANNEL_SELECT__SUCCEEDED,
  STREAM_CREATE__SUCCEEDED,
  STREAM_REMOVE__SUCCEEDED,
  STREAM_FETCH_MORE_EXPERIENCE_REQUESTED,
  STREAM_FETCH_MORE_EXPERIENCE__SUCCEEDED,
  STREAM_FETCH_MORE_EXPERIENCE__FAILED,
  STREAM_FETCH_MORE_STREAM_REQUESTED,
  STREAM_FETCH_MORE_STREAM__SUCCEEDED,
  STREAM_FETCH_MORE_STREAM__FAILED,
  STREAM_UPDATE_SEARCH_REQUESTED,
  STREAM_UPDATE_SEARCH__SUCCEEDED,
  STREAM_UPDATE_SEARCH__FAILED,
  STREAM_CHANNEL_LANGUAGES_UPDATE_FILTER__SUCCEEDED,
  STREAM_CHANNEL_LANGUAGES_UPDATE_FILTER_REQUESTED,
  STREAM_CHANNEL_LANGUAGES_FETCH_REQUESTED,

  // user
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
  USER_UPDATE_SELECT_MODE,
  USER_TOGGLE_INVITE_MODAL,
  USER_UPDATE_NEW_USER_REQUEST,
  USER_UPDATE_NEW_USER__SUCCEEDED,
  USER_UPDATE_NEW_USER__FAILED,
  USER_BLUR_NEW_USER_EMAIL,
  USER_ADD_NEW_USER_FORM,
  USER_DELETE_NEW_USER_FORM,
  USER_UPDATE_NEW_USER_CHANNEL_SEARCH_REQUESTED,
  USER_UPDATE_NEW_USER_CHANNEL_SEARCH__SUCCEEDED,
  USER_UPDATE_NEW_USER_CHANNEL_SEARCH__FAILED,
  USER_UPDATE_NEW_USER_CHANNEL_SELECT,
  USER_UPDATE_NEW_USER_CREATE_REQUESTED,
  USER_UPDATE_NEW_USER_CREATE__SUCCEEDED,
  USER_UPDATE_NEW_USER_CREATE__FAILED,
  USER_FETCH_USER_VIEW_REQUESTED,
  USER_FETCH_USER_VIEW__SUCCEEDED,
  USER_FETCH_USER_VIEW__FAILED,
  USER_UPDATE_USER_INPUT_REQUESTED,
  USER_UPDATE_USER_INPUT__SUCCEEDED,
  USER_UPDATE_USER_INPUT__FAILED,
  USER_UPDATE_USER_ENABLE,
  USER_UPDATE_EDIT_USER_CHANNEL_SEARCH_REQUESTED,
  USER_UPDATE_EDIT_USER_CHANNEL_SEARCH__SUCCEEDED,
  USER_UPDATE_EDIT_USER_CHANNEL_SEARCH__FAILED,
  USER_UPDATE_EDIT_USER_CHANNEL_SELECT,
  USER_UPDATE_USER_REQUESTED,
  USER_UPDATE_USER__SUCCEEDED,
  USER_UPDATE_USER__FAILED,
  USER_DELETE_USER__SUCCEEDED,
  USER_BLUR_USER_EMAIL,
  USER_TOGGLE_USER_PASSWORD_MODAL,
  USER_RESET_PASSWORD_REQUEST,
  USER_RESET_PASSWORD__SUCCEEDED,
  USER_RESET_PASSWORD__FAILED,
  USER_TOGGLE_USER_DELETE_MODAL,
  USER_TOGGLE_USER_SELECT,
  USER_TOGGLE_USER_SELECT_ALL,
  USER_TOGGLE_GRANT_ACCESS_MODAL,
  USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH_REQUESTED,
  USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH__SUCCEEDED,
  USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH__FAILED,
  USER_UPDATE_SELECTED_USER_CHANNEL_SELECT,
  USER_UPDATE_SELECTED_USER_GRANT_ACCESS_REQUESTED,
  USER_UPDATE_SELECTED_USER_GRANT_ACCESS__SUCCEEDED,
  USER_UPDATE_SELECTED_USER_GRANT_ACCESS__FAILED,
  USER_TOGGLE_REMOVE_ACCESS_MODAL,
  USER_TOGGLE_USERS_LOCK_MODAL,
  USER_TOGGLE_USERS_LOCK__SUCCEEDED,
  USER_TOGGLE_DELETE_USERS_MODAL,
  USER_TOGGLE_DELETE_USERS__SUCCEEDED
} from './constants';

// helpers
import {
  find_experience_obj_by_guid,
  find_page_obj_by_guid,
  find_section_obj_by_guid,
  find_experience_channel_obj_by_guid,
  find_experience_stream_obj_by_guid,
  isValidEmail
} from '../helpers';

const initialState = {
  IsFetching: false,
  NaviIndex: 0,
  IsSearchActive: false,
  ActiveTabIndex: 0,

  // 1. experience
  ExperienceSearchInput: null,
  TotalExperienceRecord: 0,
  Experiences: [],
  CurrentExperiencesPageIndex: 0,
  CurrentExperiencesFilter: 'ALL',
  CurrentExperiencesFilterLabel: 'All',
  // CARD ONLY
  TotalCardOnlyExperienceRecord: 0,
  CardOnlyExperiences: [],
  CurrentCardOnlyExperiencesPageIndex: 0,
  CurrentCardOnlyExperiencesFilter: 'ALL',
  CurrentCardOnlyExperiencesFilterLabel: 'All',
  // CARD AND PAGES
  TotalCardAndPagesExperienceRecord: 0,
  CardAndPagesExperiences: [],
  CurrentCardAndPagesExperiencesPageIndex: 0,
  CurrentCardAndPagesExperiencesFilter: 'ALL',
  CurrentCardAndPagesExperiencesFilterLabel: 'All',

  // 2. channel
  ChannelSearchInput: null,
  TotalChannelRecord: 0,
  ExperienceChannels: [],
  ChannelTypeFilter: 'ALL',
  ChannelTypeFilterLabel: 'All channel',
  ChannelStatusFilter: 'ALL',
  ChannelStatusFilterLabel: 'All',

  // 3. stream
  IsStreamSearchActive: false,
  StreamActiveTabIndex: 0,

  Languages: [],
  StreamChannelLanguageGUID: null,
  StreamChannelLanguageFilterLabel: 'All language',
  IsLanguagesFetched: false,

  StreamChannelSearchInput: null,
  TotalStreamActiveChannelRecord: 0,
  StreamActiveChannels: [],
  StreamActiveChannelPageIndex: 0,
  StreamChannelTypeFilter: 'ALL',
  StreamChannelTypeFilterLabel: 'All channel',

  ExperienceStreamSearchInput: null,
  ExperiencePageIndex: 0,
  StreamExperiencePageIndex: 0,
  CurrentStreamChannel: {},
  TotalLiveExperienceStreamRecord: 0,
  LiveExperienceStreams: [],
  TotalPendingExperienceRecord: 0,
  PendingExperiences: [],

  IsSelectMode: false,
  UserChannels: [],
  UserSelectedOptions: [],
  Users: [],
  UserSearchValue: null,
  UserPageNumber: 1,
  UserPageLimit: 5,
  UserTotalRecords: 0,

  IsUserInviteModalOpen: false,
  NewUsers: [
    {
      Email: '',
      FirstName: '',
      LastName: '',
      IsValidate: true,
      ErrorMsg: ''
    }
  ],
  NewUserChannels: [],
  NewUserSelectedOptions: [],

  IsUserModalOpen: false,
  User: null,
  EditUserChannels: [],
  EditUserSelectedOptions: [],

  IsUserPasswordModalOpen: false,
  PasswordUserGUID: null,

  IsUserDeleteModalOpen: false,
  DeleteUserGUID: null,

  IsGrantAccessModalOpen: false,
  SelectedUsers: [],
  SelectedUsersChannels: [],
  SelectedUsersSelectedOptions: [],

  IsRemoveAccessModalOpen: false,

  IsUserLockModalOpen: false,
  UserLockModalType: null,

  IsUsersDeleteModalOpen: false
};

const NewUser = {
  Email: '',
  FirstName: '',
  LastName: '',
  IsValidate: true,
  ErrorMsg: ''
};

const dashboardReducer = (previousState = initialState, { type, payload }) => {
  let updated = Object.assign({}, previousState);
  let tmpExperiences = Object.assign([], updated.Experiences);
  let tmpCardOnlyExperiences = Object.assign([], updated.CardOnlyExperiences);
  let tmpCardAndPagesExperiences = Object.assign(
    [],
    updated.CardAndPagesExperiences
  );

  let tmpExperienceChannels = Object.assign([], updated.ExperienceChannels);
  let tmpStreamActiveChannels = Object.assign([], updated.StreamActiveChannels);
  let tmpCurrentStreamChannel = Object.assign({}, updated.CurrentStreamChannel);
  let tmpLiveExperienceStreams = Object.assign(
    [],
    updated.LiveExperienceStreams
  );
  let tmpPendingExperiences = Object.assign([], updated.PendingExperiences);

  let tmpLanguageLabel;
  let tmpFilterLabel;
  let tmpExperience;
  let tmpPage;
  let tmpSection;

  let tmpExperienceChannel;
  let tmpExperienceStream;

  let tmpUsers = Object.assign([], updated.Users);

  let tmpNewUsers = Object.assign([], updated.NewUsers);
  let tmpNewUser;
  let tmpUser = Object.assign({}, updated.User);
  let tmpIndex;

  let tmpSelectedUsers = Object.assign([], updated.SelectedUsers);

  switch (type) {
    // version 1.0
    // case HTML_FETCH__SUCCEEDED:
    //     if (payload.experienceType == 'CARD_ONLY') {
    //         tmpExperience = find_experience_obj_by_guid(updated.CardOnlyExperiences, payload.experienceGUID);
    //         tmpPage = find_page_obj_by_guid(tmpExperience.experience.ExperiencePages, payload.pageGUID);
    //         tmpSection = find_section_obj_by_guid(tmpPage.page.Sections, payload.sectionGUID);
    //         tmpPage.page.Sections[tmpSection.index].HtmlContent = payload.html;
    //         tmpCardOnlyExperiences[tmpExperience.index] = tmpExperience.experience;
    //         updated.CardOnlyExperiences = tmpCardOnlyExperiences;
    //     } else if (payload.experienceType == 'CARD_AND_PAGES') {
    //         tmpExperience = find_experience_obj_by_guid(updated.CardAndPagesExperiences, payload.experienceGUID);
    //         tmpPage = find_page_obj_by_guid(tmpExperience.experience.ExperiencePages, payload.pageGUID);
    //         tmpSection = find_section_obj_by_guid(tmpPage.page.Sections, payload.sectionGUID);
    //         tmpPage.page.Sections[tmpSection.index].HtmlContent = payload.html;
    //         tmpCardAndPagesExperiences[tmpExperience.index] = tmpExperience.experience;
    //         updated.CardAndPagesExperiences = tmpCardAndPagesExperiences;
    //     }
    //     return updated;

    // case EXPERIENCE_FETCH__SUCCEEDED:
    //     if (payload.experienceType == 'CARD_ONLY') {
    //         updated.TotalCardOnlyExperienceRecord = payload.totalRecord;
    //         updated.CardOnlyExperiences = payload.experiences;
    //     } else if (payload.experienceType == 'CARD_AND_PAGES') {
    //         updated.TotalCardAndPagesExperienceRecord = payload.totalRecord;
    //         updated.CardAndPagesExperiences = payload.experiences;
    //     } else if (payload.experienceType == 'ALL') {
    //         updated.TotalExperienceRecord = payload.totalRecord;
    //         updated.Experiences = payload.experiences;
    //     }
    //     return updated;

    case DASHBOARD_NAVI__SUCCEEDED:
      updated.NaviIndex = payload.index;
      return updated;

    case SEARCH_BAR_TOGGLE__SUCCEEDED:
      updated.IsSearchActive = payload.toggle;
      return updated;

    case TAB_BAR_UPDATE_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case TAB_BAR_UPDATE__SUCCEEDED:
      if (payload.experienceType == 'CARD_ONLY') {
        updated.TotalCardOnlyExperienceRecord = payload.totalRecord;
        updated.CardOnlyExperiences = payload.experiences;

        updated.CurrentCardOnlyExperiencesPageIndex = 0;
        updated.CurrentCardOnlyExperiencesFilter = 'ALL';
        updated.CurrentCardOnlyExperiencesFilterLabel = 'All';
      } else if (payload.experienceType == 'CARD_AND_PAGES') {
        updated.TotalCardAndPagesExperienceRecord = payload.totalRecord;
        updated.CardAndPagesExperiences = payload.experiences;

        updated.CurrentCardAndPagesExperiencesPageIndex = 0;
        updated.CurrentCardAndPagesExperiencesFilter = 'ALL';
        updated.CurrentCardAndPagesExperiencesFilterLabel = 'All';
      } else if (payload.experienceType == 'ALL') {
        updated.TotalExperienceRecord = payload.totalRecord;
        updated.Experiences = payload.experiences;

        updated.CurrentExperiencesPageIndex = 0;
        updated.CurrentExperiencesFilter = 'ALL';
        updated.CurrentExperiencesFilterLabel = 'All';
      }
      updated.ActiveTabIndex = payload.index;
      updated.ExperienceSearchInput = '';
      updated.IsFetching = false;
      return updated;

    case TAB_BAR_UPDATE__FAILED:
      updated.IsFetching = false;
      return updated;

    case EXPERIENCE_FETCH_MORE_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case EXPERIENCE_FETCH_MORE__SUCCEEDED:
      if (payload.experienceType == 'CARD_ONLY') {
        updated.TotalCardOnlyExperienceRecord = payload.totalRecord;
        tmpCardOnlyExperiences = [
          ...tmpCardOnlyExperiences,
          ...payload.experiences
        ];
        updated.CardOnlyExperiences = tmpCardOnlyExperiences;
        updated.CurrentCardOnlyExperiencesPageIndex =
          updated.CurrentCardOnlyExperiencesPageIndex + 1;
      } else if (payload.experienceType == 'CARD_AND_PAGES') {
        updated.TotalCardAndPagesExperienceRecord = payload.totalRecord;
        tmpCardAndPagesExperiences = [
          ...tmpCardAndPagesExperiences,
          ...payload.experiences
        ];
        updated.CardAndPagesExperiences = tmpCardAndPagesExperiences;
        updated.CurrentCardAndPagesExperiencesPageIndex =
          updated.CurrentCardAndPagesExperiencesPageIndex + 1;
      } else if (payload.experienceType == 'ALL') {
        updated.TotalExperienceRecord = payload.totalRecord;
        tmpExperiences = [...tmpExperiences, ...payload.experiences];
        updated.Experiences = tmpExperiences;
        updated.CurrentExperiencesPageIndex =
          updated.CurrentExperiencesPageIndex + 1;
      }
      updated.IsFetching = false;
      return updated;

    case EXPERIENCE_FETCH_MORE__FAILED:
      updated.IsFetching = false;
      return updated;

    case EXPERIENCE_UPDATE_SEARCH_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case EXPERIENCE_UPDATE_SEARCH__FAILED:
      updated.IsFetching = false;
      return updated;

    case EXPERIENCE_UPDATE_SEARCH__SUCCEEDED:
      if (payload.experienceType == 'ALL') {
        // ALL
        updated.CurrentExperiencesPageIndex = 0;
        updated.Experiences = payload.experiences;
        updated.TotalExperienceRecord = payload.totalRecord;
      } else if (payload.experienceType == 'CARD_ONLY') {
        // CARD_ONLY
        updated.CurrentCardOnlyExperiencesPageIndex = 0;
        updated.CardOnlyExperiences = payload.experiences;
        updated.TotalCardOnlyExperienceRecord = payload.totalRecord;
      } else if (payload.experienceType == 'CARD_AND_PAGES') {
        // CARD_AND_PAGES
        updated.CurrentCardAndPagesExperiencesPageIndex = 0;
        updated.CardAndPagesExperiences = payload.experiences;
        updated.TotalCardAndPagesExperienceRecord = payload.totalRecord;
      }
      updated.IsFetching = false;
      updated.ExperienceSearchInput = payload.val;
      return updated;

    case EXPERIENCE_UPDATE_FILTER_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case EXPERIENCE_UPDATE_FILTER__SUCCEEDED:
      if (payload.experienceType == 'CARD_ONLY') {
        if (payload.option == 'ALL') {
          tmpFilterLabel = 'All';
        } else if (payload.option == 'LIVE') {
          tmpFilterLabel = 'Live';
        } else if (payload.option == 'DRAFT') {
          tmpFilterLabel = 'Draft';
        }
        updated.TotalCardOnlyExperienceRecord = payload.totalRecord;
        updated.CardOnlyExperiences = payload.experiences;
        updated.CurrentCardOnlyExperiencesPageIndex = 0;
        updated.CurrentCardOnlyExperiencesFilter = payload.option;
        updated.CurrentCardOnlyExperiencesFilterLabel = tmpFilterLabel;
      } else if (payload.experienceType == 'CARD_AND_PAGES') {
        if (payload.option == 'ALL') {
          tmpFilterLabel = 'All';
        } else if (payload.option == 'LIVE') {
          tmpFilterLabel = 'Live';
        } else if (payload.option == 'DRAFT') {
          tmpFilterLabel = 'Draft';
        }
        updated.TotalCardAndPagesExperienceRecord = payload.totalRecord;
        updated.CardAndPagesExperiences = payload.experiences;
        updated.CurrentCardAndPagesExperiencesPageIndex = 0;
        updated.CurrentCardAndPagesExperiencesFilter = payload.option;
        updated.CurrentCardAndPagesExperiencesFilterLabel = tmpFilterLabel;
      } else if (payload.experienceType == 'ALL') {
        if (payload.option == 'ALL') {
          tmpFilterLabel = 'All';
        } else if (payload.option == 'LIVE') {
          tmpFilterLabel = 'Live';
        } else if (payload.option == 'DRAFT') {
          tmpFilterLabel = 'Draft';
        }
        updated.TotalExperienceRecord = payload.totalRecord;
        updated.Experiences = payload.experiences;
        updated.CurrentExperiencesPageIndex = 0;
        updated.CurrentExperiencesFilter = payload.option;
        updated.CurrentExperiencesFilterLabel = tmpFilterLabel;
      }
      updated.IsFetching = false;
      return updated;

    case EXPERIENCE_UPDATE_FILTER__FAILED:
      updated.IsFetching = false;
      return updated;

    case EXPERIENCE_CLEAR_FILTER_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case EXPERIENCE_CLEAR_FILTER__SUCCEEDED:
      updated.ExperienceSearchInput = '';
      if (payload.experienceType == 'ALL') {
        // all
        updated.CurrentExperiencesPageIndex = 0;
        updated.CurrentExperiencesFilter = 'ALL';
        updated.CurrentExperiencesFilterLabel = 'All';
        updated.Experiences = payload.experiences;
        updated.TotalExperienceRecord = payload.totalRecord;
      } else if (payload.experienceType == 'CARD_ONLY') {
        // card only
        updated.CurrentCardOnlyExperiencesPageIndex = 0;
        updated.CurrentCardOnlyExperiencesFilter = 'ALL';
        updated.CurrentCardOnlyExperiencesFilterLabel = 'All';
        updated.CardOnlyExperiences = payload.experiences;
        updated.TotalCardOnlyExperienceRecord = payload.totalRecord;
      } else if (payload.experienceType == 'CARD_AND_PAGES') {
        // card and pages
        updated.CurrentCardAndPagesExperiencesPageIndex = 0;
        updated.CurrentCardAndPagesExperiencesFilter = 'ALL';
        updated.CurrentCardAndPagesExperiencesFilterLabel = 'All';
        updated.CardAndPagesExperiences = payload.experiences;
        updated.TotalCardAndPagesExperienceRecord = payload.totalRecord;
      }
      updated.IsFetching = false;
      return updated;

    case EXPERIENCE_CLEAR_FILTER__FAILED:
      updated.IsFetching = false;
      return updated;

    case EXPERIENCE_DELETE__SUCCEEDED:
      if (payload.experienceType == 'CARD_ONLY') {
        tmpExperience = find_experience_obj_by_guid(
          updated.CardOnlyExperiences,
          payload.experienceGUID
        );
        tmpCardOnlyExperiences.splice(tmpExperience.index, 1);
        updated.CardOnlyExperiences = tmpCardOnlyExperiences;
        updated.TotalCardOnlyExperienceRecord =
          updated.TotalCardOnlyExperienceRecord - 1;
        updated.TotalExperienceRecord = updated.TotalExperienceRecord - 1;
      } else if (payload.experienceType == 'CARD_AND_PAGES') {
        tmpExperience = find_experience_obj_by_guid(
          updated.CardAndPagesExperiences,
          payload.experienceGUID
        );
        tmpCardAndPagesExperiences.splice(tmpExperience.index, 1);
        updated.CardAndPagesExperiences = tmpCardAndPagesExperiences;
        updated.TotalCardAndPagesExperienceRecord =
          updated.TotalCardAndPagesExperienceRecord - 1;
        updated.TotalExperienceRecord = updated.TotalExperienceRecord - 1;
      } else if (payload.experienceType == 'ALL') {
        tmpExperience = find_experience_obj_by_guid(
          updated.Experiences,
          payload.experienceGUID
        );
        tmpExperiences.splice(tmpExperience.index, 1);
        updated.Experiences = tmpExperiences;
        updated.TotalExperienceRecord = updated.TotalExperienceRecord - 1;
      }
      return updated;

    // version 1.0
    case CHANNEL_UPDATE_SEARCH__SUCCEEDED:
      updated.ChannelSearchInput = payload.val;
      updated.TotalChannelRecord = payload.totalRecord;
      updated.ExperienceChannels = payload.expereienceChannels;
      return updated;

    case CHANNEL_UPDATE_FILTER__SUCCEEDED:
      if (payload.filterType == 'CHANNEL_TYPE') {
        if (payload.filter == 'ALL') {
          tmpFilterLabel = 'All channel';
        } else if (payload.filter == 'PUBLIC') {
          tmpFilterLabel = 'Public channel';
        } else if (payload.filter == 'INVITATION') {
          tmpFilterLabel = 'Password channel';
        }
        updated.ChannelTypeFilter = payload.filter;
        updated.ChannelTypeFilterLabel = tmpFilterLabel;
      } else if (payload.filterType == 'CHANNEL_STATUS') {
        if (payload.filter == 'ALL') {
          tmpFilterLabel = 'All';
        } else if (payload.filter == 'LIVE') {
          tmpFilterLabel = 'Live';
        } else if (payload.filter == 'DRAFT') {
          tmpFilterLabel = 'Draft';
        }
        updated.ChannelStatusFilter = payload.filter;
        updated.ChannelStatusFilterLabel = tmpFilterLabel;
      }
      updated.TotalChannelRecord = payload.totalRecord;
      updated.ExperienceChannels = payload.expereienceChannels;
      return updated;

    case CHANNEL_CLEAR_FILTER__SUCCEEDED:
      updated.TotalChannelRecord = payload.totalRecord;
      updated.ExperienceChannels = payload.expereienceChannels;
      updated.ChannelSearchInput = '';
      updated.ChannelTypeFilter = 'ALL';
      updated.ChannelTypeFilterLabel = 'ALL channel';
      updated.ChannelStatusFilter = 'ALL';
      updated.ChannelStatusFilterLabel = 'All';
      return updated;

    case CHANNEL_FETCH__SUCCEEDED:
      updated.TotalChannelRecord = payload.totalRecord;
      updated.ExperienceChannels = payload.expereienceChannels;
      return updated;

    // version 2.0
    case CHANNEL_UPDATE_STATUS__SUCCEEDED:
      tmpExperienceChannel = find_experience_channel_obj_by_guid(
        tmpStreamActiveChannels,
        payload.experienceChannel.ExperienceChannelGUID
      );
      tmpStreamActiveChannels[tmpExperienceChannel.index] = Object.assign(
        {},
        payload.experienceChannel
      );
      updated.StreamActiveChannels = tmpStreamActiveChannels;
      return updated;

    case CHANNEL_DELETE__SUCCEEDED:
      tmpExperienceChannel = find_experience_channel_obj_by_guid(
        tmpStreamActiveChannels,
        payload.experienceChannel.ExperienceChannelGUID
      );
      tmpStreamActiveChannels.splice(tmpExperienceChannel.index, 1);
      updated.StreamActiveChannels = tmpStreamActiveChannels;
      updated.TotalStreamActiveChannelRecord =
        updated.TotalStreamActiveChannelRecord - 1;
      return updated;

    case STREAM_SEARCH_BAR_TOGGLE__SUCCEEDED:
      updated.IsStreamSearchActive = payload.toggle;
      return updated;

    case STREAM_CHANNEL_LANGUAGES_FETCH_REQUESTED:
      updated.IsLanguagesFetched = false;
      return updated;

    case STREAM_CHANNEL_LANGUAGES_FETCH__SUCCEEDED:
      updated.Languages = payload.languages;
      updated.IsLanguagesFetched = true;
      return updated;

    case STREAM_CHANNEL_FETCH__SUCCEEDED:
      updated.TotalStreamActiveChannelRecord = payload.totalRecord;
      updated.StreamActiveChannels = payload.expereienceChannels;

      updated.CurrentStreamChannel = {};
      updated.StreamActiveChannelPageIndex = 0;
      updated.StreamChannelSearchInput = null;
      updated.StreamChannelTypeFilter = 'ALL';
      updated.StreamChannelTypeFilterLabel = 'All channel';
      return updated;

    case STREAM_FETCH_MORE_CHANNEL__SUCCEEDED:
      tmpStreamActiveChannels = [
        ...tmpStreamActiveChannels,
        ...payload.expereienceChannels
      ];
      updated.StreamActiveChannelPageIndex =
        updated.StreamActiveChannelPageIndex + 1;
      updated.StreamActiveChannels = tmpStreamActiveChannels;
      updated.TotalStreamActiveChannelRecord = payload.totalRecord;
      return updated;

    case STREAM_CHANNEL_UPDATE_SEARCH_REQUESTED:
      updated.CurrentStreamChannel = {};
      updated.IsFetching = true;
      return updated;

    case STREAM_CHANNEL_UPDATE_SEARCH__SUCCEEDED:
      updated.StreamChannelSearchInput = payload.val;
      updated.StreamActiveChannels = payload.expereienceChannels;
      updated.TotalStreamActiveChannelRecord = payload.totalRecord;
      updated.StreamActiveChannelPageIndex = 0;
      updated.IsFetching = false;
      return updated;

    case STREAM_CHANNEL_UPDATE_SEARCH__FAILED:
      updated.IsFetching = false;
      return updated;

    case STREAM_CHANNEL_LANGUAGES_UPDATE_FILTER_REQUESTED:
      updated.CurrentStreamChannel = {};
      updated.IsFetching = true;
      return updated;

    case STREAM_CHANNEL_UPDATE_FILTER_REQUESTED:
      updated.CurrentStreamChannel = {};
      updated.IsFetching = true;
      return updated;

    case STREAM_CHANNEL_LANGUAGES_UPDATE_FILTER__SUCCEEDED:
      if (payload.language == 'ALL') {
        tmpLanguageLabel = 'All language';
      } else {
        tmpLanguageLabel = payload.language.Language;
      }
      updated.StreamChannelLanguageFilterLabel = tmpLanguageLabel;
      updated.StreamChannelLanguageGUID =
        payload.language == 'ALL' ? null : payload.language.LanguageGUID;
      updated.StreamActiveChannels = payload.expereienceChannels;
      updated.TotalStreamActiveChannelRecord = payload.totalRecord;
      updated.IsFetching = false;
      updated.StreamActiveChannelPageIndex = 0;
      return updated;

    case STREAM_CHANNEL_UPDATE_FILTER__SUCCEEDED:
      if (payload.channelTypeFilter == 'ALL') {
        tmpFilterLabel = 'All channel';
      } else if (payload.channelTypeFilter == 'PUBLIC') {
        tmpFilterLabel = 'Public channel';
      } else if (payload.channelTypeFilter == 'PRIVATE') {
        tmpFilterLabel = 'Private channel';
      } else if (payload.channelTypeFilter == 'INVITATION') {
        tmpFilterLabel = 'Password channel';
      }
      updated.StreamChannelTypeFilter = payload.channelTypeFilter;
      updated.StreamChannelTypeFilterLabel = tmpFilterLabel;
      updated.StreamActiveChannels = payload.expereienceChannels;
      updated.TotalStreamActiveChannelRecord = payload.totalRecord;
      updated.StreamActiveChannelPageIndex = 0;
      updated.IsFetching = false;
      return updated;

    case STREAM_CHANNEL_UPDATE_FILTER__FAILED:
      updated.IsFetching = false;
      return updated;

    case STREAM_CHANNEL_CLEAR_FILTER__SUCCEEDED:
      updated.CurrentStreamChannel = {};
      updated.StreamChannelSearchInput = '';
      updated.StreamChannelTypeFilter = 'ALL';
      updated.StreamChannelTypeFilterLabel = 'All channel';
      updated.StreamActiveChannels = payload.expereienceChannels;
      updated.TotalStreamActiveChannelRecord = payload.totalRecord;
      return updated;

    case STREAM_CHANNEL_SELECT__SUCCEEDED:
      updated.CurrentStreamChannel = Object.assign({}, payload.channel);

      updated.TotalPendingExperienceRecord = payload.totalRecord;
      updated.PendingExperiences = Object.assign([], payload.experiences);
      updated.StreamActiveTabIndex = 0;
      updated.ExperiencePageIndex = 0;
      updated.StreamExperiencePageIndex = 0;
      updated.ExperienceStreamSearchInput = '';
      return updated;

    case STREAM_TAB_BAR_UPDATE_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case STREAM_TAB_BAR_UPDATE__SUCCEEDED:
      if (payload.index == '0') {
        updated.TotalPendingExperienceRecord = payload.totalRecord;
        updated.PendingExperiences = payload.experiences;
        updated.StreamExperiencePageIndex = 0;
      } else {
        updated.TotalLiveExperienceStreamRecord = payload.totalRecord;
        updated.LiveExperienceStreams = payload.experienceStreams;
        updated.ExperiencePageIndex = 0;
      }
      updated.StreamActiveTabIndex = payload.index;
      updated.ExperienceStreamSearchInput = '';
      updated.IsFetching = false;
      return updated;

    case STREAM_TAB_BAR_UPDATE__FAILED:
      updated.IsFetching = false;
      return updated;

    case STREAM_CREATE__SUCCEEDED:
      // 1. update channel
      tmpExperienceChannel = find_experience_channel_obj_by_guid(
        tmpStreamActiveChannels,
        tmpCurrentStreamChannel.ExperienceChannelGUID
      );
      tmpCurrentStreamChannel.ExperienceStreams.push(payload.experienceStream);
      tmpStreamActiveChannels[tmpExperienceChannel.index] = Object.assign(
        {},
        tmpCurrentStreamChannel
      );
      // 2. update pending experience
      tmpExperience = find_experience_obj_by_guid(
        tmpPendingExperiences,
        payload.experience.ExperienceGUID
      );
      tmpPendingExperiences.splice(tmpExperience.index, 1);

      updated.StreamActiveChannels = tmpStreamActiveChannels;
      updated.PendingExperiences = tmpPendingExperiences;
      updated.TotalPendingExperienceRecord =
        updated.TotalPendingExperienceRecord - 1;
      return updated;

    case STREAM_REMOVE__SUCCEEDED:
      // 1. update channel
      tmpExperienceChannel = find_experience_channel_obj_by_guid(
        tmpStreamActiveChannels,
        tmpCurrentStreamChannel.ExperienceChannelGUID
      );
      tmpExperienceStream = find_experience_stream_obj_by_guid(
        tmpCurrentStreamChannel.ExperienceStreams,
        payload.experienceStreamGUID
      );
      tmpCurrentStreamChannel.ExperienceStreams.splice(
        tmpExperienceStream.index,
        1
      );
      tmpStreamActiveChannels[tmpExperienceChannel.index] = Object.assign(
        {},
        tmpCurrentStreamChannel
      );
      // 2. update live streamed experience
      tmpExperienceStream = find_experience_stream_obj_by_guid(
        tmpLiveExperienceStreams,
        payload.experienceStreamGUID
      );
      tmpLiveExperienceStreams.splice(tmpExperienceStream.index, 1);

      updated.StreamActiveChannels = tmpStreamActiveChannels;
      updated.LiveExperienceStreams = tmpLiveExperienceStreams;
      updated.TotalLiveExperienceStreamRecord =
        updated.TotalLiveExperienceStreamRecord - 1;
      return updated;

    case STREAM_FETCH_MORE_EXPERIENCE_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case STREAM_FETCH_MORE_EXPERIENCE__SUCCEEDED:
      tmpPendingExperiences = [
        ...tmpPendingExperiences,
        ...payload.experiences
      ];
      updated.PendingExperiences = tmpPendingExperiences;
      updated.ExperiencePageIndex = updated.ExperiencePageIndex + 1;
      updated.TotalPendingExperienceRecord = payload.totalRecord;
      updated.IsFetching = false;
      return updated;

    case STREAM_FETCH_MORE_EXPERIENCE__FAILED:
      updated.IsFetching = false;
      return updated;

    case STREAM_FETCH_MORE_STREAM_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case STREAM_FETCH_MORE_STREAM__SUCCEEDED:
      tmpLiveExperienceStreams = [
        ...tmpLiveExperienceStreams,
        ...payload.streams
      ];
      updated.LiveExperienceStreams = tmpLiveExperienceStreams;
      updated.StreamExperiencePageIndex = updated.StreamExperiencePageIndex + 1;
      updated.TotalLiveExperienceStreamRecord = payload.totalRecord;
      updated.IsFetching = false;
      return updated;

    case STREAM_FETCH_MORE_STREAM__FAILED:
      updated.IsFetching = false;
      return updated;

    case STREAM_UPDATE_SEARCH_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case STREAM_UPDATE_SEARCH__FAILED:
      updated.IsFetching = false;
      return updated;

    case STREAM_UPDATE_SEARCH__SUCCEEDED:
      if (payload.activeTabIndex == '0') {
        updated.PendingExperiences = payload.experiences;
        updated.ExperiencePageIndex = 0;
        updated.TotalPendingExperienceRecord = payload.totalRecord;
      } else if (payload.activeTabIndex == '1') {
        updated.LiveExperienceStreams = payload.streams;
        updated.StreamExperiencePageIndex = 0;
        updated.TotalLiveExperienceStreamRecord = payload.totalRecord;
      }
      updated.ExperienceStreamSearchInput = payload.val;
      updated.IsFetching = false;
      return updated;

    case USER_UPDATE_INFO_SEARCH_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case USER_UPDATE_INFO_SEARCH__SUCCEEDED:
      updated.UserSearchValue = payload.searchVal;
      updated.Users = payload.users;
      updated.UserTotalRecords = payload.totalRecord;
      updated.UserPageNumber = 1;
      updated.IsFetching = false;
      return updated;

    case USER_UPDATE_INFO_SEARCH__FAILED:
      updated.IsFetching = false;
      return updated;

    case USER_UPDATE_CHANNEL_SEARCH_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case USER_UPDATE_CHANNEL_SEARCH__SUCCEEDED:
      updated.UserChannels = payload.userChannels;
      updated.IsFetching = false;
      return updated;

    case USER_UPDATE_CHANNEL_SEARCH__FAILED:
      updated.IsFetching = false;
      return updated;

    case USER_UPDATE_CHANNEL_SELECT_REQUEST:
      updated.IsFetching = true;
      return updated;

    case USER_UPDATE_CHANNEL_SELECT__SUCCEEDED:
      updated.UserSelectedOptions = payload.options;
      updated.Users = payload.users;
      updated.UserTotalRecords = payload.totalRecord;
      updated.UserPageNumber = 1;
      updated.IsFetching = false;

      updated.SelectedUsers = [];
      updated.IsSelectMode = false;
      return updated;

    case USER_UPDATE_CHANNEL_SELECT__FAILED:
      updated.IsFetching = false;
      return updated;

    case USER_UPDATE_PAGE_LIMIT_SELECT_REQUEST:
      updated.IsFetching = true;
      return updated;

    case USER_UPDATE_PAGE_LIMIT_SELECT__SUCCEEDED:
      updated.UserPageLimit = payload.pageLimit;
      updated.Users = payload.users;
      updated.UserTotalRecords = payload.totalRecord;
      updated.UserPageNumber = 1;
      updated.IsFetching = false;

      updated.SelectedUsers = [];
      updated.IsSelectMode = false;
      return updated;

    case USER_UPDATE_PAGE_LIMIT_SELECT__FAILED:
      updated.IsFetching = false;
      return updated;

    case USER_UPDATE_PAGE_INDEX_REQUEST:
      updated.IsFetching = true;
      return updated;

    case USER_UPDATE_PAGE_INDEX__SUCCEEDED:
      updated.UserPageNumber = payload.pageIndex + 1;
      updated.Users = payload.users;
      updated.UserTotalRecords = payload.totalRecord;
      updated.IsFetching = false;

      updated.SelectedUsers = [];
      updated.IsSelectMode = false;
      return updated;

    case USER_UPDATE_PAGE_INDEX__FAILED:
      updated.IsFetching = false;
      return updated;

    case USER_TOGGLE_INVITE_MODAL:
      updated.IsUserInviteModalOpen = payload.toggle;
      return updated;

    case USER_UPDATE_NEW_USER_REQUEST:
      if (payload.type == 'EMAIL') {
        updated.IsFetching = true;
      }
      return updated;

    case USER_UPDATE_NEW_USER__SUCCEEDED:
    case USER_UPDATE_NEW_USER__FAILED:
      tmpNewUser = tmpNewUsers[payload.index];
      if (payload.type == 'EMAIL') {
        tmpNewUser.Email = payload.value;
        tmpNewUser.IsValidate = payload.isValidate;
        tmpNewUser.ErrorMsg = payload.isValidate ? '' : 'Email already existed';
      } else if (payload.type == 'FIRST_NAME') {
        tmpNewUser.FirstName = payload.value;
      } else if (payload.type == 'LAST_NAME') {
        tmpNewUser.LastName = payload.value;
      }
      tmpNewUsers[payload.index] = tmpNewUser;
      updated.NewUsers = tmpNewUsers;
      updated.IsFetching = false;
      return updated;

    case USER_BLUR_NEW_USER_EMAIL:
      tmpNewUser = tmpNewUsers[payload.index];
      if (!isValidEmail(tmpNewUser.Email)) {
        tmpNewUser.IsValidate = false;
        tmpNewUser.ErrorMsg = 'Email is invalid';
      } else {
        if (tmpNewUser.IsValidate) {
          tmpNewUser.IsValidate = true;
          tmpNewUser.ErrorMsg = '';
        }
      }
      tmpNewUsers[payload.index] = tmpNewUser;
      updated.NewUsers = tmpNewUsers;
      return updated;

    case USER_ADD_NEW_USER_FORM:
      tmpNewUsers.push(Object.assign({}, NewUser));
      updated.NewUsers = tmpNewUsers;
      return updated;

    case USER_DELETE_NEW_USER_FORM:
      tmpNewUsers.splice(payload.index, 1);
      updated.NewUsers = tmpNewUsers;
      return updated;

    case USER_UPDATE_NEW_USER_CHANNEL_SEARCH_REQUESTED:
      return updated;

    case USER_UPDATE_NEW_USER_CHANNEL_SEARCH__SUCCEEDED:
      updated.NewUserChannels = payload.userChannels;
      return updated;

    case USER_UPDATE_NEW_USER_CHANNEL_SEARCH__FAILED:
      return updated;

    case USER_UPDATE_NEW_USER_CHANNEL_SELECT:
      updated.NewUserSelectedOptions = payload.options;
      return updated;

    case USER_UPDATE_NEW_USER_CREATE_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case USER_UPDATE_NEW_USER_CREATE__SUCCEEDED:
      updated.IsUserInviteModalOpen = false;
      tmpIndex = payload.users.length;
      payload.users = payload.users.concat(tmpUsers);
      payload.users.splice(updated.UserPageLimit, tmpIndex);
      updated.NewUsers = [Object.assign({}, NewUser)];
      updated.NewUserChannels = [];
      updated.NewUserSelectedOptions = [];
      updated.IsFetching = false;
      updated.Users = payload.users;
      return updated;

    case USER_UPDATE_NEW_USER_CREATE__FAILED:
      updated.IsFetching = false;
      return updated;

    case USER_FETCH_USER_VIEW_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case USER_FETCH_USER_VIEW__SUCCEEDED:
      if (payload.toggle) {
        updated.IsFetching = false;
        updated.IsUserModalOpen = true;
        payload.user.IsValidate = true;
        payload.user.ErrorMsg = '';
        updated.User = payload.user;
        updated.EditUserChannels = [];
        updated.EditUserSelectedOptions = payload.user.ChannelSubscribes;
      } else {
        updated.IsFetching = false;
        updated.IsUserModalOpen = false;
        updated.User = null;
      }
      return updated;

    case USER_FETCH_USER_VIEW__FAILED:
      updated.IsFetching = false;
      updated.IsUserModalOpen = false;
      return updated;

    case USER_UPDATE_USER_INPUT_REQUESTED:
      if (payload.type == 'EMAIL') {
        updated.IsFetching = true;
      }
      return updated;

    case USER_UPDATE_USER_INPUT__SUCCEEDED:
    case USER_UPDATE_USER_INPUT__FAILED:
      if (payload.type == 'EMAIL') {
        tmpUser.Email = payload.value;
        tmpUser.IsValidate = payload.isValidate;
        tmpUser.ErrorMsg = payload.isValidate ? '' : 'Email already existed';
      } else if (payload.type == 'FIRST_NAME') {
        tmpUser.FirstName = payload.value;
      } else if (payload.type == 'LAST_NAME') {
        tmpUser.LastName = payload.value;
      }
      updated.User = tmpUser;
      updated.IsFetching = false;
      return updated;

    case USER_UPDATE_USER_ENABLE:
      tmpUser.Enabled = payload.toggle;
      updated.User = tmpUser;
      return updated;

    case USER_UPDATE_EDIT_USER_CHANNEL_SEARCH_REQUESTED:
      return updated;

    case USER_UPDATE_EDIT_USER_CHANNEL_SEARCH__SUCCEEDED:
      updated.EditUserChannels = payload.userChannels;
      return updated;

    case USER_UPDATE_EDIT_USER_CHANNEL_SEARCH__FAILED:
      return updated;

    case USER_UPDATE_EDIT_USER_CHANNEL_SELECT:
      updated.EditUserSelectedOptions = payload.options;
      return updated;

    case USER_UPDATE_USER_REQUESTED:
      updated.IsFetching = false;
      return updated;

    case USER_UPDATE_USER__SUCCEEDED:
      tmpUsers = tmpUsers.map(user => {
        if (user.UserGUID == payload.user.UserGUID) {
          return payload.user;
        } else {
          return user;
        }
      });
      updated.User = null;
      updated.EditUserChannels = [];
      updated.EditUserSelectedOptions = [];
      updated.IsUserModalOpen = false;
      updated.Users = tmpUsers;
      updated.IsFetching = true;
      return updated;

    case USER_UPDATE_USER__FAILED:
      updated.IsFetching = false;
      return updated;

    case USER_DELETE_USER__SUCCEEDED:
      tmpUsers.forEach((user, index) => {
        if (user.UserGUID == payload.userGUID) {
          tmpIndex = index;
        }
      });
      tmpUsers.splice(tmpIndex, 1);
      updated.User = null;
      updated.EditUserChannels = [];
      updated.EditUserSelectedOptions = [];
      updated.Users = tmpUsers;

      updated.IsUserModalOpen = false;
      updated.IsUserDeleteModalOpen = false;
      return updated;

    case USER_BLUR_USER_EMAIL:
      if (!isValidEmail(tmpUser.Email)) {
        tmpUser.IsValidate = false;
        tmpUser.ErrorMsg = 'Email is invalid';
      } else {
        if (tmpUser.IsValidate) {
          tmpUser.IsValidate = true;
          tmpUser.ErrorMsg = '';
        }
      }
      updated.User = tmpUser;
      return updated;

    case USER_TOGGLE_USER_PASSWORD_MODAL:
      if (payload.toggle) {
        updated.PasswordUserGUID = payload.userGUID;
        updated.IsUserPasswordModalOpen = true;
      } else {
        updated.PasswordUserGUID = null;
        updated.IsUserPasswordModalOpen = false;
      }
      return updated;

    case USER_RESET_PASSWORD_REQUEST:
      updated.IsFetching = true;
      return updated;

    case USER_RESET_PASSWORD__SUCCEEDED:
      updated.IsUserPasswordModalOpen = false;
      updated.IsFetching = false;
      return updated;

    case USER_RESET_PASSWORD__FAILED:
      updated.IsFetching = false;
      return updated;

    case USER_TOGGLE_USER_DELETE_MODAL:
      if (payload.toggle) {
        updated.DeleteUserGUID = payload.userGUID;
        updated.IsUserDeleteModalOpen = true;
      } else {
        updated.DeleteUserGUID = null;
        updated.IsUserDeleteModalOpen = false;
      }
      return updated;

    case USER_UPDATE_SELECT_MODE:
      if (payload.toggle) {
        tmpSelectedUsers.push(payload.user);
        tmpUsers.forEach(user => {
          if (user.UserGUID == payload.user.UserGUID) {
            user.IsSelected = true;
          }
        });
      } else {
        tmpSelectedUsers = [];
        tmpUsers.forEach(user => {
          user.IsSelected = false;
        });
      }
      updated.Users = tmpUsers;
      updated.SelectedUsers = tmpSelectedUsers;
      updated.IsSelectMode = payload.toggle;
      return updated;

    case USER_TOGGLE_USER_SELECT:
      if (payload.toggle) {
        tmpSelectedUsers.push(payload.user);
        tmpUsers.forEach(user => {
          if (user.UserGUID == payload.user.UserGUID) {
            user.IsSelected = true;
          }
        });
      } else {
        tmpUsers.forEach(user => {
          if (user.UserGUID == payload.user.UserGUID) {
            user.IsSelected = false;
          }
        });
        tmpSelectedUsers = tmpSelectedUsers.filter(
          user => user.UserGUID != payload.user.UserGUID
        );
        if (!tmpSelectedUsers.length) {
          updated.IsSelectMode = false;
        }
      }
      updated.Users = tmpUsers;
      updated.SelectedUsers = tmpSelectedUsers;
      return updated;

    case USER_TOGGLE_USER_SELECT_ALL:
      updated.Users.forEach(user => {
        user.IsSelected = true;
      });
      updated.SelectedUsers = updated.Users;
      return updated;

    case USER_TOGGLE_GRANT_ACCESS_MODAL:
      updated.IsGrantAccessModalOpen = payload.toggle;
      return updated;

    case USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH_REQUESTED:
      return updated;

    case USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH__SUCCEEDED:
      updated.SelectedUsersChannels = payload.userChannels;
      return updated;

    case USER_UPDATE_SELECTED_USER_CHANNEL_SEARCH__FAILED:
      return updated;

    case USER_UPDATE_SELECTED_USER_CHANNEL_SELECT:
      updated.SelectedUsersSelectedOptions = payload.options;
      return updated;

    case USER_UPDATE_SELECTED_USER_GRANT_ACCESS_REQUESTED:
      updated.IsFetching = true;
      return updated;

    case USER_UPDATE_SELECTED_USER_GRANT_ACCESS__SUCCEEDED:
      updated.IsGrantAccessModalOpen = false;
      updated.IsRemoveAccessModalOpen = false;
      updated.IsFetching = false;
      return updated;

    case USER_UPDATE_SELECTED_USER_GRANT_ACCESS__FAILED:
      updated.IsFetching = false;
      return updated;

    case USER_TOGGLE_REMOVE_ACCESS_MODAL:
      updated.IsRemoveAccessModalOpen = payload.toggle;
      return updated;

    case USER_TOGGLE_USERS_LOCK_MODAL:
      updated.IsUserLockModalOpen = payload.toggle;
      updated.UserLockModalType = payload.type;
      return updated;

    case USER_TOGGLE_USERS_LOCK__SUCCEEDED:
      updated.IsUserLockModalOpen = false;
      updated.UserLockModalType = null;
      return updated;

    case USER_TOGGLE_DELETE_USERS_MODAL:
      updated.IsUsersDeleteModalOpen = payload.toggle;
      return updated;

    case USER_TOGGLE_DELETE_USERS__SUCCEEDED:
      tmpUsers = tmpUsers.filter(user => {
        if (!payload.users.includes(user.UserGUID)) {
          return user;
        }
      });
      tmpUsers.forEach(user => {
        user.IsSelected = false;
      });
      updated.IsSelectMode = false;
      updated.Users = tmpUsers;
      updated.IsUsersDeleteModalOpen = false;
      return updated;

    default:
      return previousState;
  }
};

export default dashboardReducer;

import * as constants from './constants';

const INITIAL_STATE = {
  menuOpen: false,
  isModalOpen: false,
  modalName: null,
  menuID: null,
  languages: [],
  language: {},
  isLoading: false,
  currentPanelOpen: null,
  message: '',
  isLanguageFetched: false,
  isCompleted: false
};

export default (state = INITIAL_STATE, action) => {
  const tempLanguages = state.languages;
  switch (action.type) {
    case constants.GET_LANGUAGE_LIST_REQUEST:
      return {
        ...state,
        isLoading: true,
        isCompleted: false
      };

    case constants.GET_LANGUAGE_LIST_SUCCESS:
      return {
        ...state,
        languages: action.payload,
        isLoading: false,
        language: {}
      };

    case constants.LANGUAGE_VIEW_REQUEST:
      return {
        ...state,
        language: {},
        isLanguageFetched: false,
        isCompleted: false
      };

    case constants.LANGUAGE_VIEW_SUCCESS:
      return {
        ...state,
        language: action.payload,
        isLanguageFetched: true
      };

    case constants.UPDATE_LANGUAGE_SET_ACTIVE_SUCCESS:
      tempLanguages.forEach(lang => {
        if (lang.LanguageGUID === action.payload.data.languageGUID) {
          lang.IsActive = !action.payload.data.isActive;
        }
      });
      return {
        ...state,
        languages: tempLanguages,
        message: action.payload.msg
      };

    case constants.UPDATE_LANGUAGE_SET_ACTIVE_ERRORS:
      return {
        ...state,
        message: action.payload.error
      };

    case constants.UPDATE_LANGUAGE_SET_DEFAULT_SUCCESS:
      tempLanguages.forEach(lang => {
        if (lang.LanguageGUID === action.payload.languageGUID) {
          lang.IsDefault = true;
          lang.IsActive = true;
        } else {
          lang.IsDefault = false;
        }
      });
      return {
        ...state,
        languages: tempLanguages
      };

    case constants.ADD_LANGUAGE_SUCCESS:
      return {
        ...state,
        // languages: [...state.languages, action.payload.language],
        isCompleted: true
      };

    case constants.UPDATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        // languages: state.languages.map(
        //   language => (language.LanguageGUID === action.payload.language.LanguageGUID
        //     ? action.payload
        //     : language),
        // ),
        isCompleted: true
      };

    case constants.OPEN_CONFIRMATION_MODAL:
      return {
        ...state,
        isModalOpen: true,
        modalName: action.payload.modalName
      };

    case constants.CLOSE_CONFIRMATION_MODAL:
      return {
        ...state,
        isModalOpen: false,
        modalName: null
      };

    default:
      return state;
  }
};

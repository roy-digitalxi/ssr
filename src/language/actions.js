import * as constants from './constants';

export default {
  addLanguageRequest: data => ({
    type: constants.ADD_LANGUAGE_REQUEST,
    payload: {
      data
    }
  }),

  addLanguageSuccess: (language, message) => ({
    type: constants.ADD_LANGUAGE_SUCCESS,
    payload: {
      language,
      message
    }
  }),

  addLanguageErrors: message => ({
    type: constants.ADD_LANGUAGE_ERRORS,
    payload: {
      message
    }
  }),

  languageViewRequest: LanguageGUID => ({
    type: constants.LANGUAGE_VIEW_REQUEST,
    payload: { LanguageGUID }
  }),

  languageViewSuccess: language => ({
    type: constants.LANGUAGE_VIEW_SUCCESS,
    payload: language
  }),

  languageViewErrors: errors => ({
    type: constants.LANGUAGE_VIEW_ERRORS,
    payload: {
      errors
    }
  }),

  updateLanguageRequest: data => ({
    type: constants.UPDATE_LANGUAGE_REQUEST,
    payload: {
      data
    }
  }),

  updateLanguageSuccess: (language, message) => ({
    type: constants.UPDATE_LANGUAGE_SUCCESS,
    payload: {
      language,
      message
    }
  }),

  updateLanguageErrors: message => ({
    type: constants.UPDATE_LANGUAGE_ERRORS,
    payload: {
      message
    }
  }),

  getLanguageListRequest: data => ({
    type: constants.GET_LANGUAGE_LIST_REQUEST,
    payload: data
  }),

  getLanguageListSuccess: languages => ({
    type: constants.GET_LANGUAGE_LIST_SUCCESS,
    payload: languages
  }),

  getLanguageListErrors: errors => ({
    type: constants.GET_LANGUAGE_LIST_ERRORS,
    payload: {
      errors
    }
  }),

  setIsActiveRequest: (languageGUID, isActive) => ({
    type: constants.UPDATE_LANGUAGE_SET_ACTIVE_REQUEST,
    payload: {
      languageGUID,
      isActive
    }
  }),

  setIsActiveSuccess: (data, message) => ({
    type: constants.UPDATE_LANGUAGE_SET_ACTIVE_SUCCESS,
    payload: { data, message }
  }),

  setIsActiveErrors: message => ({
    type: constants.UPDATE_LANGUAGE_SET_ACTIVE_ERRORS,
    payload: {
      message
    }
  }),

  setDefaultRequest: languageGUID => ({
    type: constants.UPDATE_LANGUAGE_SET_DEFAULT_REQUEST,
    payload: languageGUID
  }),

  setDefaultSuccess: (languageGUID, message) => ({
    type: constants.UPDATE_LANGUAGE_SET_DEFAULT_SUCCESS,
    payload: {
      languageGUID,
      message
    }
  }),

  setDefaultErrors: message => ({
    type: constants.UPDATE_LANGUAGE_SET_DEFAULT_ERRORS,
    payload: {
      message
    }
  }),

  openConfirmationModal: modalName => ({
    type: constants.OPEN_CONFIRMATION_MODAL,
    payload: {
      modalName
    }
  }),

  closeConfirmationModal: () => ({
    type: constants.CLOSE_CONFIRMATION_MODAL,
    payload: {}
  })
};

import {
  CHANNEL_TYPE_REQUESTED,
  CHANNEL_VALUE_REQUESTED,
  CHANNEL_CODE_VALUE_REQUESTED,
  CHANNEL_CREATE_REQUESTED,
  CHANNEL_VIEW_REQUESTED,
  CHANNEL_UPDATE_REQUESTED,
  CHANNEL_FETCH_LANGUAGE_LIST_REQUESTED,
  CHANNEL_SELECT_LANGUAGE_REQUESTED
} from './constants';

export const dxChannelType = channelType => {
  return {
    type: CHANNEL_TYPE_REQUESTED,
    payload: {
      channelType
    }
  };
};

export const dxChannelValueUpdate = (type, val, experienceChannelGUID) => {
  return {
    type: CHANNEL_VALUE_REQUESTED,
    payload: {
      type,
      val,
      experienceChannelGUID
    }
  };
};

export const dxChannelCodeValueUpdate = (val, experienceChannelGUID) => {
  return {
    type: CHANNEL_CODE_VALUE_REQUESTED,
    payload: {
      val,
      experienceChannelGUID
    }
  };
};

export const dxChannelCreate = channel => {
  return {
    type: CHANNEL_CREATE_REQUESTED,
    payload: {
      channel
    }
  };
};

export const dxChannelView = experienceChannelGUID => {
  return {
    type: CHANNEL_VIEW_REQUESTED,
    payload: {
      experienceChannelGUID
    }
  };
};

export const dxChannelUpdate = experienceChannel => {
  return {
    type: CHANNEL_UPDATE_REQUESTED,
    payload: {
      experienceChannel
    }
  };
};

export const dxChannelFetchChannelLanguageList = () => {
  return {
    type: CHANNEL_FETCH_LANGUAGE_LIST_REQUESTED,
    payload: {}
  };
};

export const dxChannelSelectLanguage = channelLanguage => {
  return {
    type: CHANNEL_SELECT_LANGUAGE_REQUESTED,
    payload: {
      channelLanguage
    }
  };
};

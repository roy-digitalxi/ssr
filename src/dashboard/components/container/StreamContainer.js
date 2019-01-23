import React, { Component } from 'react';

// libraries
import SearchBar from 'material-ui-search-bar';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Lock from '@material-ui/icons/Lock';
import Language from '@material-ui/icons/Language';
import Fingerprint from '@material-ui/icons/Fingerprint';
import DropdownMenu from 'react-dd-menu';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import Slide from 'react-reveal/Slide';
import InfiniteScroll from 'react-infinite-scroller';

// constants
import sizes from '../../../styles/sizes';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

// component
import ChannelStream from '../presentation/streams/ChannelStream';
import ChannelTab from '../presentation/streams/ChannelTab';
import DxModal from '../../../components/dxModal/DxModal';
import DxSearchBar from '../../../components/searchBar/SearchBar';
import TabBar from '../../../components/tabBar/TabBar';
import NewChannelModal from '../presentation/channel/NewChannelModal';
import PendingExperienceContainer from './PendingExperienceContainer';
import LiveStreamExperienceContainer from './LiveStreamExperienceContainer';

// redux
import { connect } from 'react-redux';
import {
  dxToggleStreamSearchBar as dxToggleStreamSearchBarAction,
  dxUpdateStreamTabBar as dxUpdateStreamTabBarAction,
  dxFetchStreamChannelLanguages as dxFetchStreamChannelLanguagesAction,
  dxUpdateStreamChannelLanguageTypeFilter as dxUpdateStreamChannelLanguageTypeFilterAction,
  dxFetchStreamChannel as dxFetchStreamChannelAction,
  dxFetchMoreStreamChannel as dxFetchMoreStreamChannelAction,
  dxUpdateStreamChannelSearch as dxUpdateStreamChannelSearchAction,
  dxUpdateStreamChannelTypeFilter as dxUpdateStreamChannelTypeFilterAction,
  dxClearStreamChannelFilter as dxClearStreamChannelFilterAction,
  dxSelectStreamChannel as dxSelectStreamChannelAction,
  dxCreateStream as dxCreateStreamAction,
  dxRemoveStream as dxRemoveStreamAction,
  dxUpdateChannel as dxUpdateChannelAction,
  dxDeleteChannel as dxDeleteChannelAction,
  dxStreamFetchMoreExperience as dxStreamFetchMoreExperienceAction,
  dxStreamFetchMoreStream as dxStreamFetchMoreStreamAction,
  dxUpdateStreamSearch as dxUpdateStreamSearchAction
} from '../../actions';

// styles
import '../../../../../assets/css/material-ui-search-bar/index.css';

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
    position: 'relative',
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
  targetWrapperStyle: {},
  targetLabelStyle: {
    margin: 0,
    fontSize: fonts.h2
  },
  dropdownWrapperStyle: {},
  dropdownBtnStyle: {
    padding: 0,
    textTransform: 'none',
    fontSize: fonts.h2
  },
  expandIconStyle: {
    paddingLeft: 3,
    fontSize: '18px',
    color: colors.blackColor
  },
  dropdownOptionBtnStyle: {
    width: '100%',
    padding: 0,
    textTransform: 'none'
  },
  dropdownMobileBtnStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderBottom: '0.25px solid #D9DDE2',
    paddingLeft: 12,
    paddingRight: 24
  },
  dropdownWebBtnStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  dropdownBtnImgStyle: {
    flex: 1,
    alignSelf: 'center'
  },
  dropdownBtnTextStyle: {
    flex: 8,
    flexDirection: 'column',
    textAlign: 'left',
    marginLeft: 6
  },
  imgStyle: {
    height: 42,
    width: 24
  },
  mobileOptionTopLabelStyle: {
    marginTop: 12,
    marginBottom: 6,
    fontSize: fonts.h3
  },
  mobileOptionBottomLabelStyle: {
    marginTop: 0,
    marginBottom: 12,
    color: colors.lightGreyColor,
    fontSize: fonts.h4
  },
  webOptionTopLabelStyle: {
    marginTop: 0,
    marginBottom: 6,
    fontSize: fonts.h3
  },
  webOptionBottomLabelStyle: {
    margin: 0,
    color: colors.lightGreyColor,
    fontSize: fonts.h4
  },

  comingSoonWrapperStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 32,
    marginLeft: 12
  },
  comingSoonStyle: {
    alignSelf: 'flex-end',
    background: colors.blackColor,
    width: 90,
    padding: 6
  },
  comingSoonLabelStyle: {
    margin: 0,
    fontSize: fonts.h4,
    color: colors.whiteColor
  },

  middleContainerstyle: {
    height: 48,
    display: 'flex'
  },
  middleWrapperStyle: {
    flex: '360px 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  channelLabelWrapperStyle: {
    height: 36
  },
  channelLabelStyle: {
    color: colors.labelColor,
    fontSize: fonts.h3,
    margin: 0
  },
  capitalChannelLabelStyle: {
    fontSize: fonts.h1,
    fontWeight: 'bold'
  },
  channelFilterContainerStyle: {},
  channelDropdownWrapperStyle: {},
  channelDropdownBtnStyle: {
    textTransform: 'none',
    fontSize: fonts.h5,
    backgroundColor: colors.whiteColor,
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    width: '120px'
  },
  channelFilterOptionContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    height: 36,
    cursor: 'pointer',
    border: '1px solid',
    borderTop: 'none',
    borderColor: colors.borderColor,
    boxSizing: 'border-box'
  },
  channelFilterOptionWrapperStyle: {
    display: 'inline-block',
    margin: '0 auto'
  },
  channelFilterOptionIconContainerStyle: {
    float: 'left',
    width: 14,
    height: 36,
    position: 'relative'
  },
  channelFilterOptionIconStyle: {
    position: 'absolute',
    top: 9,
    left: 0,
    width: 14,
    height: 14
  },
  channelFilterOptionTextContainerStyle: {
    float: 'left',
    height: 36,
    paddingLeft: 3
  },
  channelFilterOptionTextStyle: {
    margin: 0,
    fontSize: fonts.h4,
    color: colors.blackColor
  },
  totalChannelWrapperStyle: {
    paddingRight: 6,
    display: 'flex'
  },
  totalNumberStyle: {
    margin: 0,
    fontSize: fonts.h3,
    color: colors.lightGreyColor
  },
  totalLabelstyle: {
    margin: 0,
    fontSize: fonts.h3,
    color: colors.lightGreyColor,
    marginLeft: 3
  },
  clearFilterContainerStyle: {
    paddingLeft: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearFilterStyle: {
    fontSize: fonts.h3,
    color: colors.labelColor,
    textDecoration: 'underline',
    cursor: 'pointer'
  },

  bottomContainerStyle: {
    marginTop: 6,
    height: `calc(100% - 210px)`,
    position: 'relative',
    display: 'flex'
  },
  leftContainerStyle: {
    height: '100%',
    flex: '360px 0 0'
  },
  titleContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },

  leftWrapperStyle: {
    background: colors.whiteColor
  },
  channelSearchContainerStyle: {
    paddingBottom: 12
  },
  channelSearchWrapperStyle: {
    position: 'relative',
    width: 360,
    height: 600,
    overflowY: 'auto'
  },

  searchBarWrapperStyle: {
    borderBottom: '1px solid #D9DDE2',
    height: 48
  },
  searchBarStyle: {
    boxShadow: 'none',
    paddingLeft: 6,
    height: '100%'
  },

  tipsWrapperStyle: {
    height: 114,
    padding: '12px 12px 0px 12px'
  },
  tipsHeaderStyle: {
    marginBottom: 12,
    marginTop: 0,
    fontSize: fonts.h4
  },
  tipsLabelStyle: {
    fontSize: fonts.h4,
    margin: 0,
    textAlign: 'justify'
  },
  clickHereLinkStyle: {
    color: colors.blueColor,
    cursor: 'pointer'
  },

  rightContainerStyle: {
    height: '100%',
    flex: '852px 0 0',
    paddingLeft: 48
  },
  streamsContainerStyle: {
    height: '100%'
  },
  streamsWrapperStyle: {
    height: '100%'
  },
  currentChannleContainerStyle: {
    backgroundColor: colors.whiteColor,
    padding: 12,
    height: 78,
    marginBottom: 24
  },
  currentChannelNameStyle: {
    margin: 0,
    fontSize: fonts.h1
  },
  currentChannelDescriptionWrapperStyle: {
    height: 42
  },
  currentChannelDescriptionStyle: {
    margin: 0,
    marginTop: 12,
    color: colors.lightGreyColor,
    fontSize: fonts.h3
  },
  streamContentContainerStyle: {
    marginTop: 24
  },
  liveStreamLabelContainerStyle: {
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  liveStreamLabelStyle: {
    margin: 0,
    color: colors.labelColor,
    fontSize: fonts.h3
  },
  liveStreamNumberStyle: {
    margin: 0,
    paddingLeft: 12,
    color: colors.labelColor,
    fontSize: fonts.h3
  },
  liveStreamWrapperStyle: {
    overflowY: 'auto',
    height: 'calc(100% - 212px)',
    marginBottom: 18
  },
  readyToStreamLabelWrapperStyle: {
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  readyToStreamLabelStyle: {
    margin: 0,
    color: colors.labelColor,
    fontSize: fonts.h3
  },
  readyToStreamNumberStyle: {
    margin: 0,
    paddingLeft: 12,
    color: colors.labelColor,
    fontSize: fonts.h3
  },
  readyToStreamWrapperStyle: {
    overflowY: 'auto',
    height: 'calc(100% - 212px)'
  },

  liveMsgContainerStyle: {
    height: 'calc(100% - 212px)',
    marginBottom: 18
  },
  liveMsgWrapperStyle: {
    height: 72,
    marginBottom: 106,
    border: '1px dotted',
    borderColor: colors.blueBorderColor,
    backgroundColor: colors.whiteColor
  },
  liveMsgStyle: {
    color: colors.greyLabelColor,
    fontSize: fonts.h3,
    margin: 0
  },
  goLabelStyle: {
    color: colors.greenColor,
    fontWeight: 'bold'
  },
  sectionLabelStyle: {
    color: colors.blackColor,
    fontWeight: 'bold'
  },
  pendingMsgContainerStyle: {
    height: 'calc(100% - 212px)'
  },
  pendingMsgWrapperStyle: {
    height: 72,
    marginBottom: 24,
    border: '1px dotted',
    borderColor: colors.blueBorderColor,
    backgroundColor: colors.whiteColor
  },
  pendingMsgStyle: {
    color: colors.greyLabelColor,
    fontSize: fonts.h3,
    margin: 0
  },
  channelMsgContainerStyle: {
    height: 48
  },
  channelMsgStyle: {
    fontSize: fonts.h3,
    color: colors.labelColor
  },

  modalSearchContainerStyle: {
    marginBottom: 18
  },
  modalChannelTabListContainerStyle: {
    maxHeight: 240,
    overflowY: 'auto'
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

  streamTabBarContainerStyle: {
    height: 42,
    width: '100%'
  },
  tabBarContainerStyle: {
    paddingLeft: 24,
    paddingRight: 24,
    height: 42
  },
  tabLabelStyle: {
    margin: 0,
    fontSize: fonts.h3
  }
};

class StreamContainer extends Component {
  state = {
    newChannelModalOpen: false,
    isLanguageMenuOpen: false,
    isChannelMenuOpen: false,
    isModalOpen: false,

    targetChannel: null,

    modalType: 'CREATE',
    modalTitle: '',
    modalDesc: '',
    isContentModal: false,
    modalContent: null,
    isModalDanger: false,
    targetExperience: {},
    targetExperienceStream: {}
  };

  componentDidMount() {
    this.props.dxFetchStreamChannelLanguagesAction();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.IsLanguagesFetched && nextProps.IsLanguagesFetched) {
      this.props.dxFetchStreamChannelAction();
    }
  }

  preventParent = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  };

  handleCreateChannel = e => {
    this.preventParent(e);
    this.setState({
      newChannelModalOpen: true
    });
  };

  handleCloseChannelModal = () => {
    this.setState({
      newChannelModalOpen: false
    });
  };

  handleNavigateToNewchannel = val => {
    this.setState({
      newChannelModalOpen: false
    });
    this.props.history.push(`/new_channel/` + val);
  };

  handleLoadMoreChannel = () => {
    const {
      StreamChannelLanguageGUID,
      StreamChannelSearchInput,
      StreamChannelTypeFilter,
      StreamActiveChannelPageIndex
    } = this.props;
    this.props.dxFetchMoreStreamChannelAction(
      StreamChannelLanguageGUID,
      StreamChannelTypeFilter,
      StreamChannelSearchInput,
      StreamActiveChannelPageIndex
    );
  };

  handleSearchChannel = searchValue => {
    const { StreamChannelLanguageGUID, StreamChannelTypeFilter } = this.props;
    this.props.dxUpdateStreamChannelSearchAction(
      StreamChannelLanguageGUID,
      StreamChannelTypeFilter,
      searchValue
    );
  };

  handleSelectOption = option => {
    const {
      StreamChannelLanguageGUID,
      StreamChannelTypeFilter,
      StreamChannelSearchInput
    } = this.props;
    if (StreamChannelTypeFilter != option) {
      this.props.dxUpdateStreamChannelTypeFilterAction(
        StreamChannelLanguageGUID,
        option,
        StreamChannelSearchInput
      );
    }
  };

  handleClearFilter = () => {
    this.props.dxClearStreamChannelFilterAction();
  };

  handleToggleLanguageMenu = () => {
    this.setState({
      isLanguageMenuOpen: !this.state.isLanguageMenuOpen
    });
  };

  handleSelectLanOption = language => {
    const {
      StreamChannelLanguageGUID,
      StreamChannelTypeFilter,
      StreamChannelSearchInput
    } = this.props;
    let languageGUID;
    if (language == 'ALL') {
      languageGUID = null;
    } else {
      languageGUID = language.LanguageGUID;
    }
    if (StreamChannelLanguageGUID != languageGUID) {
      this.props.dxUpdateStreamChannelLanguageTypeFilterAction(
        language,
        StreamChannelTypeFilter,
        StreamChannelSearchInput
      );
    }
  };

  handleCloseLanguageMenu = () => {
    this.setState({ isLanguageMenuOpen: false });
  };

  handleToggleChannelMenu = () => {
    this.setState({
      isChannelMenuOpen: !this.state.isChannelMenuOpen
    });
  };

  handleCloseChannelMenu = () => {
    this.setState({ isChannelMenuOpen: false });
  };

  handleSelectChannel = channel => {
    const { ExperiencePageIndex } = this.props;
    this.props.dxSelectStreamChannelAction(channel, ExperiencePageIndex);
  };

  handleConfirmModal = () => {
    const { modalType } = this.state;
    if (modalType == 'CREATE') {
      this.handleConfirmLiveStream();
    } else if (modalType == 'REMOVE') {
      this.handleConfirmRemoveLiveStream();
    } else if (modalType == 'VIEW') {
      this.handleCloseModal();
    } else if (modalType == 'UPDATE_CHANNEL') {
      this.handleConfirmToggleChannel();
    } else if (modalType == 'DELETE_CHANNEL') {
      this.handleConfirmDeleteChannel();
    }
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleGoLiveStream = experience => {
    this.setState({
      isModalOpen: true,
      modalType: 'CREATE',
      modalTitle: 'Confirm Stream Experience',
      modalDesc: 'Do you want to proceed?',
      isContentModal: false,
      isModalDanger: false,
      targetExperience: experience
    });
  };

  handleConfirmLiveStream = () => {
    const { targetExperience } = this.state;

    const { CurrentStreamChannel } = this.props;

    this.setState({ isModalOpen: false });
    this.props.dxCreateStreamAction(CurrentStreamChannel, targetExperience);
  };

  handleRemoveStream = experienceStream => {
    this.setState({
      isModalOpen: true,
      modalType: 'REMOVE',
      modalTitle: 'Confirm Remove Stream',
      modalDesc: 'Do you want to proceed?',
      isContentModal: false,
      isModalDanger: true,
      targetExperienceStream: experienceStream
    });
  };

  handleConfirmRemoveLiveStream = () => {
    const { targetExperienceStream } = this.state;

    this.setState({ isModalOpen: false });
    this.props.dxRemoveStreamAction(
      targetExperienceStream.ExperienceStreamGUID
    );
  };

  handleClickOtherStreamHyper = experience => {
    const { modalChannelTabListContainerStyle } = styles;

    const content = (
      <div>
        <div style={modalChannelTabListContainerStyle}>
          {experience.ExperienceStreams.map((experienceStream, index) => (
            <ChannelTab
              channelName={experienceStream.ChannelName}
              channelColor={experienceStream.ChannelColor}
            />
          ))}
        </div>
      </div>
    );
    this.setState({
      isModalOpen: true,
      modalType: 'VIEW',
      modalTitle: experience.ExperienceTitle,
      modalDesc: `Currently streamed in ${
        experience.ExperienceStreams.length
      } channels`,
      isContentModal: true,
      modalContent: content,
      isModalDanger: false,
      targetExperience: experience
    });
  };

  handleEditChannel = channel => {
    this.props.history.push(`/edit_channel/` + channel.ExperienceChannelGUID);
  };

  handleDeleteChannel = channel => {
    this.setState({
      isModalOpen: true,
      modalType: 'DELETE_CHANNEL',
      modalTitle: 'Delete',
      modalDesc: `Confirm delete channel`,
      isContentModal: true,
      modalContent: '',
      isModalDanger: true,
      targetChannel: channel
    });
  };

  handleConfirmDeleteChannel = () => {
    const { targetChannel } = this.state;
    this.setState({ isModalOpen: false });
    this.props.dxDeleteChannelAction(targetChannel);
  };

  handleActiveChannel = channel => {
    const { ExperienceStreams } = channel;

    if (!ExperienceStreams.length) {
      this.setState({
        isModalOpen: true,
        modalType: 'UPDATE_CHANNEL',
        isContentModal: false,
        modalTitle: 'Confirm Go Live channel',
        modalDesc: 'No stream found in this channel. Do you want to proceed?',
        targetChannel: channel
      });
      return;
    }
    this.props.dxUpdateChannelAction({
      ExperienceChannelGUID: channel.ExperienceChannelGUID,
      ChannelStatus: 'LIVE',
      ChannelLanguageGUID: channel.ChannelLanguageGUID
    });
  };

  handleDeactiveChannel = channel => {
    const { ExperienceStreams } = channel;

    if (ExperienceStreams.length) {
      this.setState({
        isModalOpen: true,
        modalType: 'UPDATE_CHANNEL',
        isContentModal: false,
        modalTitle: 'Confirm Draft channel',
        modalDesc: 'Streams found in this channel. Do you want to proceed?',
        targetChannel: channel
      });
      return;
    }
    this.props.dxUpdateChannelAction({
      ExperienceChannelGUID: channel.ExperienceChannelGUID,
      ChannelStatus: 'DRAFT',
      ChannelLanguageGUID: channel.ChannelLanguageGUID
    });
  };

  handleConfirmToggleChannel = () => {
    const { targetChannel } = this.state;

    this.setState({ isModalOpen: false });
    this.props.dxUpdateChannelAction({
      ExperienceChannelGUID: targetChannel.ExperienceChannelGUID,
      ChannelStatus: targetChannel.ChannelStatus == 'LIVE' ? 'DRAFT' : 'LIVE',
      ChannelLanguageGUID: targetChannel.ChannelLanguageGUID
    });
  };

  renderActiveChannelList = () => {
    const { CurrentStreamChannel, StreamActiveChannels } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      channelMsgContainerStyle,
      channelMsgStyle
    } = styles;

    if (!StreamActiveChannels.length) {
      return (
        <div style={channelMsgContainerStyle}>
          <div style={tableContainerStyle}>
            <div style={tableWrapperStyle}>
              <p style={channelMsgStyle}>No channels found</p>
            </div>
          </div>
        </div>
      );
    }

    let list = StreamActiveChannels.map((channel, index) => (
      <ChannelStream
        channel={channel}
        active={
          CurrentStreamChannel.ExperienceChannelGUID ==
          channel.ExperienceChannelGUID
            ? true
            : false
        }
        handleSelectChannel={() => this.handleSelectChannel(channel)}
        handleEditChannel={() => this.handleEditChannel(channel)}
        handleDeleteChannel={() => this.handleDeleteChannel(channel)}
        handleActiveChannel={() => this.handleActiveChannel(channel)}
        handleDeactiveChannel={() => this.handleDeactiveChannel(channel)}
      />
    ));
    return list;
  };

  handleActiveSearchBar = e => {
    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    this.props.dxToggleStreamSearchBarAction(true);
  };

  handleDeactiveSearchBar = () => {
    this.props.dxToggleStreamSearchBarAction(false);
  };

  handleChangeTab = activeTab => {
    const {
      StreamActiveTabIndex,
      IsFetching,
      CurrentStreamChannel
    } = this.props;
    if (!IsFetching && StreamActiveTabIndex != activeTab) {
      this.props.dxUpdateStreamTabBarAction(activeTab, CurrentStreamChannel);
    }
  };

  handleLoadMoreExperience = () => {
    const {
      IsFetching,
      CurrentStreamChannel,
      ExperienceStreamSearchInput,
      ExperiencePageIndex
    } = this.props;
    if (!IsFetching)
      this.props.dxStreamFetchMoreExperienceAction(
        CurrentStreamChannel,
        ExperienceStreamSearchInput,
        ExperiencePageIndex
      );
  };

  handleLoadMoreStream = () => {
    const {
      IsFetching,
      CurrentStreamChannel,
      ExperienceStreamSearchInput,
      StreamExperiencePageIndex
    } = this.props;
    if (!IsFetching)
      this.props.dxStreamFetchMoreStreamAction(
        CurrentStreamChannel,
        ExperienceStreamSearchInput,
        StreamExperiencePageIndex
      );
  };

  handleSearchInputChange = val => {
    const {
      IsFetching,
      CurrentStreamChannel,
      StreamActiveTabIndex
    } = this.props;
    if (!IsFetching)
      this.props.dxUpdateStreamSearchAction(
        CurrentStreamChannel,
        StreamActiveTabIndex,
        val
      );
  };

  render() {
    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      topContainerStyle,
      topWrapperStyle,
      targetWrapperStyle,
      targetLabelStyle,
      dropdownWrapperStyle,
      dropdownBtnStyle,
      expandIconStyle,
      dropdownOptionBtnStyle,
      dropdownMobileBtnStyle,
      dropdownWebBtnStyle,
      dropdownBtnImgStyle,
      dropdownBtnTextStyle,
      imgStyle,
      mobileOptionTopLabelStyle,
      mobileOptionBottomLabelStyle,
      comingSoonWrapperStyle,
      comingSoonStyle,
      comingSoonLabelStyle,
      webOptionTopLabelStyle,
      webOptionBottomLabelStyle,

      middleContainerstyle,
      middleWrapperStyle,
      channelLabelWrapperStyle,

      channelFilterContainerStyle,
      channelDropdownWrapperStyle,
      channelDropdownBtnStyle,
      channelFilterOptionContainerStyle,
      channelFilterOptionWrapperStyle,
      channelFilterOptionIconContainerStyle,
      channelFilterOptionIconStyle,
      channelFilterOptionTextContainerStyle,
      channelFilterOptionTextStyle,

      totalChannelWrapperStyle,
      totalNumberStyle,
      channelLabelStyle,
      capitalChannelLabelStyle,
      totalLabelstyle,

      clearFilterContainerStyle,
      clearFilterStyle,

      bottomContainerStyle,
      leftContainerStyle,
      titleContainerStyle,
      leftWrapperStyle,
      channelSearchContainerStyle,
      channelSearchWrapperStyle,
      searchBarWrapperStyle,
      searchBarStyle,
      tipsWrapperStyle,
      tipsHeaderStyle,
      tipsLabelStyle,
      clickHereLinkStyle,

      rightContainerStyle,
      streamsContainerStyle,
      streamsWrapperStyle,
      streamTabBarContainerStyle,

      currentChannleContainerStyle,
      currentChannelNameStyle,
      currentChannelDescriptionWrapperStyle,
      currentChannelDescriptionStyle,

      streamContentContainerStyle,
      liveStreamLabelStyle,
      liveStreamNumberStyle,
      liveStreamWrapperStyle,
      liveStreamLabelContainerStyle,
      readyToStreamLabelWrapperStyle,
      readyToStreamLabelStyle,
      readyToStreamNumberStyle,
      readyToStreamWrapperStyle,

      liveMsgContainerStyle,
      liveMsgWrapperStyle,
      liveMsgStyle,
      goLabelStyle,
      sectionLabelStyle,
      pendingMsgContainerStyle,
      pendingMsgWrapperStyle,
      pendingMsgStyle,

      fullBtnStyle,
      addBtnIconStyle,

      tabBarContainerStyle,
      tabLabelStyle
    } = styles;

    const {
      CurrentStreamChannel,
      TotalLiveExperienceStreamRecord,
      LiveExperienceStreams,
      TotalPendingExperienceRecord,
      PendingExperiences,

      Languages,
      StreamChannelLanguageFilterLabel,

      StreamChannelSearchInput,
      TotalStreamActiveChannelRecord,
      StreamChannelTypeFilterLabel
    } = this.props;

    return (
      <div style={mainContainerStyle}>
        <div style={topContainerStyle}>
          <div style={topWrapperStyle}>
            <Button
              variant="Add a new channel"
              style={fullBtnStyle}
              onClick={e => this.handleCreateChannel(e)}
            >
              <Add style={addBtnIconStyle} />
              Add Channel
            </Button>
          </div>
        </div>

        <div style={bottomContainerStyle}>
          <div style={leftContainerStyle}>
            <div style={titleContainerStyle}>
              {/* title label */}
              <div
                style={channelLabelWrapperStyle}
                onClick={e => this.preventParent(e)}
              >
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <p style={channelLabelStyle}>
                      <span style={capitalChannelLabelStyle}>
                        {TotalStreamActiveChannelRecord}
                      </span>{' '}
                      Channel(s)
                    </p>
                  </div>
                </div>
              </div>

              {/* language filter */}
              <div
                style={channelFilterContainerStyle}
                onClick={e => this.preventParent(e)}
              >
                <div style={channelDropdownWrapperStyle}>
                  <DropdownMenu
                    className="dx_channel_type_filter_menu"
                    isOpen={this.state.isLanguageMenuOpen}
                    close={this.handleCloseLanguageMenu}
                    toggle={
                      <Button
                        style={Object.assign(
                          {},
                          channelDropdownBtnStyle,
                          !this.state.isLanguageMenuOpen
                            ? {
                                borderBottomLeftRadius: '12px',
                                borderBottomRightRadius: '12px'
                              }
                            : {
                                borderTop: '1px solid',
                                borderLeft: '1px solid',
                                borderRight: '1px solid',
                                borderColor: colors.borderColor
                              }
                        )}
                        onClick={() => this.handleToggleLanguageMenu()}
                      >
                        {StreamChannelLanguageFilterLabel}
                        <ExpandMore style={expandIconStyle} />
                      </Button>
                    }
                    align={'center'}
                    size={'md'}
                  >
                    <div
                      style={Object.assign(
                        {},
                        channelFilterOptionContainerStyle
                      )}
                      onClick={() => this.handleSelectLanOption('ALL')}
                    >
                      <div style={channelFilterOptionWrapperStyle}>
                        <div style={channelFilterOptionTextContainerStyle}>
                          <div style={tableContainerStyle}>
                            <div style={tableWrapperStyle}>
                              <p style={channelFilterOptionTextStyle}>
                                All language
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {Languages.length
                      ? Languages.map((lan, idx) => (
                          <div
                            style={Object.assign(
                              {},
                              channelFilterOptionContainerStyle,
                              idx == Languages.length
                                ? {
                                    borderBottomLeftRadius: '12px',
                                    borderBottomRightRadius: '12px'
                                  }
                                : null
                            )}
                            onClick={() => this.handleSelectLanOption(lan)}
                          >
                            <div style={channelFilterOptionWrapperStyle}>
                              <div
                                style={channelFilterOptionTextContainerStyle}
                              >
                                <div style={tableContainerStyle}>
                                  <div style={tableWrapperStyle}>
                                    <p style={channelFilterOptionTextStyle}>
                                      {lan.Language}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      : null}
                  </DropdownMenu>
                </div>
              </div>

              {/* channel filter */}
              <div
                style={channelFilterContainerStyle}
                onClick={e => this.preventParent(e)}
              >
                <div style={channelDropdownWrapperStyle}>
                  <DropdownMenu
                    className="dx_channel_type_filter_menu"
                    isOpen={this.state.isChannelMenuOpen}
                    close={this.handleCloseChannelMenu}
                    toggle={
                      <Button
                        style={Object.assign(
                          {},
                          channelDropdownBtnStyle,
                          !this.state.isChannelMenuOpen
                            ? {
                                borderBottomLeftRadius: '12px',
                                borderBottomRightRadius: '12px'
                              }
                            : {
                                borderTop: '1px solid',
                                borderLeft: '1px solid',
                                borderRight: '1px solid',
                                borderColor: colors.borderColor
                              }
                        )}
                        onClick={() => this.handleToggleChannelMenu()}
                      >
                        {StreamChannelTypeFilterLabel}
                        <ExpandMore style={expandIconStyle} />
                      </Button>
                    }
                    align={'center'}
                    size={'md'}
                  >
                    <div
                      style={Object.assign(
                        {},
                        channelFilterOptionContainerStyle
                      )}
                      onClick={() => this.handleSelectOption('ALL')}
                    >
                      <div style={channelFilterOptionWrapperStyle}>
                        <div style={channelFilterOptionTextContainerStyle}>
                          <div style={tableContainerStyle}>
                            <div style={tableWrapperStyle}>
                              <p style={channelFilterOptionTextStyle}>
                                All channel
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={Object.assign(
                        {},
                        channelFilterOptionContainerStyle
                      )}
                      onClick={() => this.handleSelectOption('PUBLIC')}
                    >
                      <div style={channelFilterOptionWrapperStyle}>
                        <div style={channelFilterOptionIconContainerStyle}>
                          <Language style={channelFilterOptionIconStyle} />
                        </div>
                        <div style={channelFilterOptionTextContainerStyle}>
                          <div style={tableContainerStyle}>
                            <div style={tableWrapperStyle}>
                              <p style={channelFilterOptionTextStyle}>
                                Public channel
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={Object.assign(
                        {},
                        channelFilterOptionContainerStyle
                      )}
                      onClick={() => this.handleSelectOption('PRIVATE')}
                    >
                      <div style={channelFilterOptionWrapperStyle}>
                        <div style={channelFilterOptionIconContainerStyle}>
                          <Lock style={channelFilterOptionIconStyle} />
                        </div>
                        <div style={channelFilterOptionTextContainerStyle}>
                          <div style={tableContainerStyle}>
                            <div style={tableWrapperStyle}>
                              <p style={channelFilterOptionTextStyle}>
                                Private channel
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={Object.assign(
                        {},
                        channelFilterOptionContainerStyle,
                        {
                          borderBottomLeftRadius: '12px',
                          borderBottomRightRadius: '12px'
                        }
                      )}
                      onClick={() => this.handleSelectOption('INVITATION')}
                    >
                      <div style={channelFilterOptionWrapperStyle}>
                        <div style={channelFilterOptionIconContainerStyle}>
                          <Fingerprint style={channelFilterOptionIconStyle} />
                        </div>
                        <div style={channelFilterOptionTextContainerStyle}>
                          <div style={tableContainerStyle}>
                            <div style={tableWrapperStyle}>
                              <p style={channelFilterOptionTextStyle}>
                                Password channel
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DropdownMenu>
                </div>
              </div>
            </div>
            <div style={leftWrapperStyle} onClick={e => this.preventParent(e)}>
              <div style={channelSearchContainerStyle}>
                <div style={searchBarWrapperStyle}>
                  <SearchBar
                    className="dx_stream_search_bar"
                    value={StreamChannelSearchInput}
                    style={searchBarStyle}
                    placeholder={'Search channel'}
                    onChange={val => this.handleSearchChannel(val)}
                  />
                </div>
                <div style={channelSearchWrapperStyle}>
                  <InfiniteScroll
                    pageStart={0}
                    loadMore={() => this.handleLoadMoreChannel()}
                    hasMore={
                      TotalStreamActiveChannelRecord >
                      this.props.StreamActiveChannels.length
                        ? true
                        : false
                    }
                    loader={null}
                    useWindow={false}
                  >
                    {this.renderActiveChannelList()}
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          </div>

          <div style={rightContainerStyle}>
            <div style={streamsContainerStyle}>
              {CurrentStreamChannel.ExperienceChannelGUID ? (
                <div style={streamsWrapperStyle}>
                  <div style={streamTabBarContainerStyle}>
                    <div className="dx_search_input_menu_tabs_wrapper">
                      <div
                        className={
                          this.props.IsStreamSearchActive
                            ? 'dx_search_bar dx_active'
                            : 'dx_search_bar'
                        }
                        style={Object.assign(
                          {},
                          this.props.IsStreamSearchActive
                            ? { width: 300 }
                            : { width: 36 }
                        )}
                        onClick={e => this.handleActiveSearchBar(e)}
                      >
                        <DxSearchBar
                          placeholder="search for content"
                          content={this.props.ExperienceStreamSearchInput}
                          isSearchActive={this.props.IsStreamSearchActive}
                          handleSearchInputChange={val =>
                            this.handleSearchInputChange(val)
                          }
                          handleDeactiveSearchBar={() =>
                            this.handleDeactiveSearchBar()
                          }
                        />
                      </div>
                      <div
                        className="dx_search_menu_tabs"
                        onClick={e => this.preventParent(e)}
                      >
                        <div style={tabBarContainerStyle}>
                          <TabBar
                            activeTab={this.props.StreamActiveTabIndex}
                            onChange={activeTab =>
                              this.handleChangeTab(activeTab)
                            }
                          >
                            <div key="0" style={tableContainerStyle}>
                              <div style={tableWrapperStyle}>
                                <p style={tabLabelStyle}>READY TO STREAM</p>
                              </div>
                            </div>
                            <div key="1" style={tableContainerStyle}>
                              <div style={tableWrapperStyle}>
                                <p style={tabLabelStyle}>LIVE STREAM</p>
                              </div>
                            </div>
                          </TabBar>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tab container */}
                  {this.props.StreamActiveTabIndex == '0' ? (
                    <Slide right>
                      <div onClick={e => this.preventParent(e)}>
                        <PendingExperienceContainer
                          pendingExperiences={PendingExperiences}
                          totalPendingExperienceRecord={
                            TotalPendingExperienceRecord
                          }
                          handleGoLiveStream={experience =>
                            this.handleGoLiveStream(experience)
                          }
                          handleClickOtherStreamHyper={experience =>
                            this.handleClickOtherStreamHyper(experience)
                          }
                          handleLoadMoreExperience={() =>
                            this.handleLoadMoreExperience()
                          }
                        />
                      </div>
                    </Slide>
                  ) : null}
                  {this.props.StreamActiveTabIndex == '1' ? (
                    <Slide right>
                      <div onClick={e => this.preventParent(e)}>
                        <LiveStreamExperienceContainer
                          liveExperienceStreams={LiveExperienceStreams}
                          totalLiveExperienceStreamRecord={
                            TotalLiveExperienceStreamRecord
                          }
                          pendingExperiences={PendingExperiences}
                          handleRemoveStream={stream =>
                            this.handleRemoveStream(stream)
                          }
                          handleLoadMoreStream={() =>
                            this.handleLoadMoreStream()
                          }
                        />
                      </div>
                    </Slide>
                  ) : null}
                </div>
              ) : (
                <div style={currentChannleContainerStyle}>
                  <div style={tableContainerStyle}>
                    <div style={tableWrapperStyle}>
                      <p style={currentChannelNameStyle}>
                        Please select a channel to stream
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <NewChannelModal
          open={this.state.newChannelModalOpen}
          onCloseModal={() => this.handleCloseChannelModal()}
          navigateToNewchannel={val => this.handleNavigateToNewchannel(val)}
        />
        <DxModal
          open={this.state.isModalOpen}
          title={this.state.modalTitle}
          hasBottomDiv={true}
          description={this.state.modalDesc}
          cancel={true}
          confirm={true}
          isContent={this.state.isContentModal}
          content={this.state.modalContent}
          isDanger={this.state.isModalDanger}
          handleConfirm={() => this.handleConfirmModal()}
          onCloseModal={() => this.handleCloseModal()}
        />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    history: state.root.history,
    navArr: state.root.navArr,

    IsFetching: state.dashboard.IsFetching,
    IsStreamSearchActive: state.dashboard.IsStreamSearchActive,
    StreamActiveTabIndex: state.dashboard.StreamActiveTabIndex,

    ExperiencePageIndex: state.dashboard.ExperiencePageIndex,
    StreamExperiencePageIndex: state.dashboard.StreamExperiencePageIndex,

    CurrentStreamChannel: state.dashboard.CurrentStreamChannel,
    TotalLiveExperienceStreamRecord:
      state.dashboard.TotalLiveExperienceStreamRecord,
    LiveExperienceStreams: state.dashboard.LiveExperienceStreams,
    TotalPendingExperienceRecord: state.dashboard.TotalPendingExperienceRecord,
    PendingExperiences: state.dashboard.PendingExperiences,

    ExperienceStreamSearchInput: state.dashboard.ExperienceStreamSearchInput,

    IsLanguagesFetched: state.dashboard.IsLanguagesFetched,
    Languages: state.dashboard.Languages,
    StreamChannelLanguageGUID: state.dashboard.StreamChannelLanguageGUID,
    StreamChannelLanguageFilterLabel:
      state.dashboard.StreamChannelLanguageFilterLabel,

    StreamChannelSearchInput: state.dashboard.StreamChannelSearchInput,
    StreamActiveChannels: state.dashboard.StreamActiveChannels,
    TotalStreamActiveChannelRecord:
      state.dashboard.TotalStreamActiveChannelRecord,
    StreamActiveChannelPageIndex: state.dashboard.StreamActiveChannelPageIndex,
    StreamChannelTypeFilter: state.dashboard.StreamChannelTypeFilter,
    StreamChannelTypeFilterLabel: state.dashboard.StreamChannelTypeFilterLabel
  };
};

const dispatchToProps = {
  dxToggleStreamSearchBarAction,
  dxUpdateStreamTabBarAction,

  dxFetchStreamChannelLanguagesAction,
  dxUpdateStreamChannelLanguageTypeFilterAction,

  dxFetchStreamChannelAction,
  dxFetchMoreStreamChannelAction,
  dxUpdateStreamChannelSearchAction,
  dxUpdateStreamChannelTypeFilterAction,
  dxClearStreamChannelFilterAction,
  dxSelectStreamChannelAction,
  dxCreateStreamAction,
  dxRemoveStreamAction,

  dxUpdateChannelAction,
  dxStreamFetchMoreExperienceAction,
  dxStreamFetchMoreStreamAction,
  dxUpdateStreamSearchAction,

  dxDeleteChannelAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(StreamContainer);

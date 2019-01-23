import React, { Component } from 'react';

//component
import NewChannelModal from '../presentation/channel/NewChannelModal.js';

// libraries
import Button from '@material-ui/core/Button';

// redux
import { connect } from 'react-redux';
import {
  dxUpdateChannelSearch as dxUpdateChannelSearchAction,
  dxUpdateChannelFilter as dxUpdateChannelFilterAction,
  dxClearChannelFilter as dxClearChannelFilterAction,
  dxFetchChannel as dxFetchChannelAction,
  dxUpdateChannel as dxUpdateChannelAction
} from '../../actions';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';
import sizes from '../../../styles/sizes';

// components
import ChannelList from '../presentation/channel/ChannelList';
import DxModal from '../../../components/dxModal/DxModal';

class ChannelContainer extends Component {
  state = {
    newChannelModalOpen: false,
    isModalOpen: false,
    modalType: 'LIVE',
    modalTitle: '',
    modalDesc: '',
    targetChannel: null
  };

  componentDidMount() {
    this.props.dxFetchChannelAction();
  }

  handleCreateChannel = () => {
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

  handleEditChannel = channel => {
    this.props.history.push(`/edit_channel/` + channel.ExperienceChannelGUID);
  };

  handleActiveChannel = channel => {
    const { ExperienceStreams } = channel;
    if (!ExperienceStreams.length) {
      this.setState({
        isModalOpen: true,
        modalType: 'LIVE',
        modalTitle: 'Confirm Go Live channel',
        modalDesc: 'No stream found in this channel. Do you want to proceed?',
        targetChannel: channel
      });
      return;
    }
    this.props.dxUpdateChannelAction({
      ExperienceChannelGUID: channel.ExperienceChannelGUID,
      ChannelStatus: 'LIVE'
    });
  };

  handleDeactiveChannel = channel => {
    const { ExperienceStreams } = channel;
    if (ExperienceStreams.length) {
      this.setState({
        isModalOpen: true,
        modalType: 'DRAFT',
        modalTitle: 'Confirm Draft channel',
        modalDesc: 'Streams found in this channel. Do you want to proceed?',
        targetChannel: channel
      });
      return;
    }
    this.props.dxUpdateChannelAction({
      ExperienceChannelGUID: channel.ExperienceChannelGUID,
      ChannelStatus: 'DRAFT'
    });
  };

  handleConfirmToggleChannel = () => {
    const { modalType, targetChannel } = this.state;

    this.setState({ isModalOpen: false });
    this.props.dxUpdateChannelAction({
      ExperienceChannelGUID: targetChannel.ExperienceChannelGUID,
      ChannelStatus: modalType
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  handleSearchInputChange = val => {
    const { ChannelTypeFilter, ChannelStatusFilter } = this.props;
    this.props.dxUpdateChannelSearchAction(
      val,
      ChannelTypeFilter,
      ChannelStatusFilter
    );
  };

  handleSelectFilter = (type, option) => {
    const {
      ChannelSearchInput,
      ChannelTypeFilter,
      ChannelStatusFilter
    } = this.props;
    this.props.dxUpdateChannelFilterAction(
      type,
      option,
      ChannelSearchInput,
      type == 'CHANNEL_TYPE' ? ChannelStatusFilter : ChannelTypeFilter
    );
  };

  handleClearFilter = () => {
    this.props.dxClearChannelFilterAction();
  };

  render() {
    const {
      ChannelSearchInput,
      ExperienceChannels,
      TotalChannelRecord,
      ChannelTypeFilter,
      ChannelTypeFilterLabel,
      ChannelStatusFilter,
      ChannelStatusFilterLabel
    } = this.props;

    const {
      mainContainerStyle,
      channelListContainerStyle,

      mainWrapperStyle,
      tableContainerStyle,
      tableWrapperStyle,

      btnWrapperStyle,
      fullBtnStyle,
      topLabelStyle,
      middleLabelStyle,
      bottomLabelStyle,
      imgStyle
    } = styles;

    return (
      <div style={mainContainerStyle}>
        {!TotalChannelRecord &&
        !ChannelSearchInput &&
        ChannelTypeFilter == 'ALL' &&
        ChannelStatusFilter == 'ALL' ? (
          <div style={mainWrapperStyle}>
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <p style={topLabelStyle}> Reach your audience via channel.</p>
                <div>
                  <img
                    style={imgStyle}
                    src={require('../../../../../assets/images/channelPage.png')}
                  />
                </div>
                <p style={middleLabelStyle}>
                  {' '}
                  Let's create a channel to stream your experience(s)
                </p>
                <div style={btnWrapperStyle}>
                  <Button
                    variant="Add a new channel"
                    style={fullBtnStyle}
                    onClick={() => this.handleCreateChannel()}
                  >
                    Create A Channel
                  </Button>
                </div>
                <p style={bottomLabelStyle}>
                  {' '}
                  Your audience can subscribe and follow channel(s). Channel(s)
                  improve content discoverablity.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div style={channelListContainerStyle}>
            <ChannelList
              experienceChannels={ExperienceChannels}
              channelNumber={TotalChannelRecord}
              searchInputValue={ChannelSearchInput}
              channelTypeFilter={ChannelTypeFilter}
              channelTypeFilterLabel={ChannelTypeFilterLabel}
              channelStatusFilter={ChannelStatusFilter}
              channelStatusFilterLabel={ChannelStatusFilterLabel}
              handleAddChannelClick={() => this.handleCreateChannel()}
              handleEditChannel={channel => this.handleEditChannel(channel)}
              handleActiveChannel={channel => this.handleActiveChannel(channel)}
              handleDeactiveChannel={channel =>
                this.handleDeactiveChannel(channel)
              }
              handleSearchInputChange={val => this.handleSearchInputChange(val)}
              handleSelectFilter={(type, option) =>
                this.handleSelectFilter(type, option)
              }
              handleClearFilter={() => this.handleClearFilter()}
            />
          </div>
        )}
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
          isDanger={true}
          handleConfirm={() => this.handleConfirmToggleChannel()}
          onCloseModal={() => this.handleCloseModal()}
        />
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    display: 'flex',
    flexDirection: 'row'
  },
  channelListContainerStyle: {},
  mainWrapperStyle: {
    height: `calc(100vh - ${sizes.headerHeight})`,
    width: '100%',
    flex: 1
  },
  tableContainerStyle: {
    position: 'relative',
    display: 'table',
    width: '100%',
    height: `calc(100vh - ${sizes.headerHeight})`
  },
  tableWrapperStyle: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center'
  },
  btnWrapperStyle: {
    marginTop: '3px',
    marginBottom: '30px'
  },
  fullBtnStyle: {
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'none'
  },
  topLabelStyle: {
    fontSize: fonts.h1,
    color: colors.lightGreyColor
  },
  middleLabelStyle: {
    fontSize: fonts.h1,
    color: colors.lightGreyColor
  },
  bottomLabelStyle: {
    fontSize: fonts.h4,
    color: colors.lightGreyColor
  },
  imgStyle: {
    display: 'block',
    height: '132px',
    width: '144px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
};

const stateToProps = state => {
  return {
    history: state.root.history,

    ChannelSearchInput: state.dashboard.ChannelSearchInput,
    ExperienceChannels: state.dashboard.ExperienceChannels,
    TotalChannelRecord: state.dashboard.TotalChannelRecord,

    ChannelTypeFilter: state.dashboard.ChannelTypeFilter,
    ChannelTypeFilterLabel: state.dashboard.ChannelTypeFilterLabel,
    ChannelStatusFilter: state.dashboard.ChannelStatusFilter,
    ChannelStatusFilterLabel: state.dashboard.ChannelStatusFilterLabel
  };
};

const dispatchToProps = {
  dxUpdateChannelSearchAction,
  dxUpdateChannelFilterAction,
  dxClearChannelFilterAction,
  dxFetchChannelAction,
  dxUpdateChannelAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(ChannelContainer);

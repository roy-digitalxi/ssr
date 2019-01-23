import React, { Component } from 'react';

// components
import NavBar from '../../../components/navBar/NavBar';

// redux
import { connect } from 'react-redux';
import {
  dxChannelCreate as dxChannelCreateAction,
  dxChannelUpdate as dxChannelUpdateAction
} from '../../actions';
import {
  dxAlert as dxAlertAction,
  dxLoading as dxLoadingAction
} from '../../../actions';

import { findWithAttr } from '../../../helpers';

class ChannelNavigator extends Component {
  componentWillReceiveProps(nextProps) {
    // EXIT
    if (nextProps.IsCompleted && !this.props.IsCompleted) {
      const { navArr } = this.props;
      let index = findWithAttr(navArr, 'type', 'STREAMS');
      this.props.history.push(`/dashboard/${index}`);
    }
  }

  handleGoback = () => {
    const { navArr } = this.props;
    let index = findWithAttr(navArr, 'type', 'STREAMS');
    this.props.history.push(`/dashboard/${index}`);
  };

  handleSaveChannel = () => {
    const { Channel } = this.props;

    const { ExperienceChannelGUID } = Channel;

    let { IsError, Message } = this.validateChannel(Channel);
    if (IsError) this.props.dxAlertAction(true, IsError, Message);
    if (!IsError) {
      if (!ExperienceChannelGUID)
        this.props.dxChannelCreateAction(this.props.Channel);
      else this.props.dxChannelUpdateAction(this.props.Channel);
    }
  };

  validateChannel = channel => {
    let res = {
      IsError: true,
      Message: ''
    };
    if (
      channel.ChannelType != '0' &&
      channel.ChannelType != '1' &&
      channel.ChannelType != '2' &&
      channel.ChannelType != '3'
    ) {
      res.Message = 'Please select channel type';
      return res;
    }
    if (channel.ChannelType == '2' && !channel.ChannelCode) {
      res.Message = 'Please enter your promo code';
      return res;
    }
    if (channel.ChannelType == '2' && channel.ChannelCode) {
      if (!channel.ChannelCode.trim()) {
        res.Message = 'Please enter your promo code';
        return res;
      }
      if (channel.ChannelCode.length > 255) {
        res.Message = 'Promo code cannot be more than 255 characters';
        return res;
      }
    }
    if (!channel.ChannelColor) {
      res.Message = 'Please select channel color';
      return res;
    }
    if (!channel.ChannelName) {
      res.Message = 'Please enter your channel name';
      return res;
    }
    if (!channel.ChannelName.trim()) {
      res.Message = 'Please enter your channel name';
      return res;
    }
    if (channel.ChannelName.length > 255) {
      res.Message = 'Channel name cannot be more than 255 characters';
      return res;
    }
    if (!channel.ChannelLanguageGUID) {
      res.Message = 'Please select language';
      return res;
    }
    res.IsError = false;
    res.Message = '';
    return res;
  };

  render() {
    return (
      <NavBar
        isRoute={false}
        navType="CHANNEL"
        handleGoback={() => this.handleGoback()}
        handleSaveBtnClick={() => this.handleSaveChannel()}
      />
    );
  }
}

const stateToProps = state => {
  return {
    navArr: state.root.navArr,
    history: state.root.history,
    IsCompleted: state.newchannel.IsCompleted,
    Channel: state.newchannel.Channel
  };
};

const dispatchToProps = {
  dxChannelCreateAction,
  dxChannelUpdateAction,

  dxAlertAction,
  dxLoadingAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(ChannelNavigator);

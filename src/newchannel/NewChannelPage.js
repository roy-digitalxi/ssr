import React, { Component } from 'react';
import Helmet from 'react-helmet';

// component
import NewChannel from './components/layout/NewChannel';

// redux
import { connect } from 'react-redux';
import { dxNavigateHistory as dxNavigateHistoryAction } from '../actions';
import {
  dxChannelType as dxChannelTypeAction,
  dxChannelView as dxChannelViewAction,
  dxChannelFetchChannelLanguageList as dxChannelFetchChannelLanguageListAction
} from './actions';

export class NewChannelPage extends Component {
  componentDidMount() {
    const history = this.props.history;
    this.props.dxNavigateHistoryAction(history);
    // Fetch language list
    this.props.dxChannelFetchChannelLanguageListAction();
  }

  componentWillReceiveProps(nextProps) {
    const param = this.props.match.params.param;
    const url = this.props.match.url;
    let isNewChannel = url.match(/new_channel/i);
    let isEditChannel = url.match(/edit_channel/i);

    if (
      !this.props.IsChannelLanguagesFetched &&
      nextProps.IsChannelLanguagesFetched
    ) {
      if (isNewChannel) {
        this.props.dxChannelTypeAction(param);
      }
      if (isEditChannel) {
        this.props.dxChannelViewAction(param);
      }
    }
  }

  render() {
    return (
      <div>
        <Helmet title="Channel" />
        <NewChannel />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    IsChannelLanguagesFetched: state.newchannel.IsChannelLanguagesFetched
  };
};

const dispatchToProps = {
  dxNavigateHistoryAction,
  dxChannelTypeAction,
  dxChannelViewAction,
  dxChannelFetchChannelLanguageListAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(NewChannelPage);

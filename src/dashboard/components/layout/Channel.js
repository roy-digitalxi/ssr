import React, { Component } from 'react';

// components
import ChannelContainer from '../container/ChannelContainer';

// Libraries
import Slide from 'react-reveal/Slide';

class Channel extends Component {
  render() {
    const { active } = this.props;

    if (!active) {
      return null;
    }

    return (
      <Slide right>
        <ChannelContainer />
      </Slide>
    );
  }
}

export default Channel;

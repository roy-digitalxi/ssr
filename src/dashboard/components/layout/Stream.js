import React, { Component } from 'react';

// components
import StreamContainer from '../container/StreamContainer';

// libraries
import Slide from 'react-reveal/Slide';

class Stream extends Component {
  render() {
    const { active } = this.props;

    if (!active) {
      return null;
    }

    return (
      <Slide right>
        <StreamContainer />
      </Slide>
    );
  }
}

export default Stream;

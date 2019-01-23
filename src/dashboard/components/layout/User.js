import React, { Component } from 'react';

// components
import UserContainer from '../container/UserContainer';

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
        <UserContainer />
      </Slide>
    );
  }
}

export default Stream;

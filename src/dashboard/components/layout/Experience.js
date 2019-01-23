import React, { Component } from 'react';

// components
import ExperienceContainer from '../container/ExperienceContainer';

// Libraries
import Slide from 'react-reveal/Slide';

class Experience extends Component {
  render() {
    const { active } = this.props;

    if (!active) {
      return null;
    }

    return (
      <Slide right>
        <ExperienceContainer />
      </Slide>
    );
  }
}

export default Experience;

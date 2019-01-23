import React, { Component } from 'react';

// components
import LanguageContainer from '../container/LanguageContainer';

// Libraries
import Slide from 'react-reveal/Slide';

class Language extends Component {
  render() {
    const { active } = this.props;

    if (!active) {
      return null;
    }

    return (
      <Slide right>
        <LanguageContainer />
      </Slide>
    );
  }
}

export default Language;

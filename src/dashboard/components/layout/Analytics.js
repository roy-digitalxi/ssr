import React, { Component } from 'react';

// components
import AnalyticsContainer from '../container/AnalyticsContainer';

// Libraries
import Slide from 'react-reveal/Slide';

class Analytics extends Component {
  render() {
    const { active } = this.props;

    if (!active) {
      return null;
    }

    return (
      <Slide right>
        <AnalyticsContainer />
      </Slide>
    );
  }
}

export default Analytics;

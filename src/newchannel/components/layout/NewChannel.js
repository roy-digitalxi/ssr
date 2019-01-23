import React, { Component } from 'react';

// components
import ChannelNavigator from '../container/ChannelNavigator';
import ChannelPanel from '../container/ChannelPanel';

// constants
import sizes from '../../../styles/sizes';

class NewChannel extends Component {
  render() {
    const { mainContainerStyle } = styles;

    return (
      <div>
        <ChannelNavigator />
        <div style={mainContainerStyle}>
          <ChannelPanel />
        </div>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    height: `calc(100vh - ${sizes.headerHeight})`,
    width: '100%',
    minWidth: sizes.dxWidth
  }
};

export default NewChannel;

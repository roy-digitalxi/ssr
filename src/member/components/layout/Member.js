import React, { Component } from 'react';

// components
import MemberNavigator from '../container/MemberNavigator';
import MemberContainer from '../container/MemberContainer';

// constants
import sizes from '../../../styles/sizes';

class Member extends Component {
  render() {
    const { mainContainerStyle } = styles;

    return (
      <div>
        <MemberNavigator />
        <div style={mainContainerStyle}>
          <MemberContainer />
        </div>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    height: `calc(100vh - ${sizes.headerHeight})`,
    width: sizes.dxWidth,
    margin: '0 auto'
  }
};

export default Member;

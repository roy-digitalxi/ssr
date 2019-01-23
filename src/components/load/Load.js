import React, { Component } from 'react';

// constans
import colors from '../../styles/colors';

// Libraries
import { RingLoader } from 'react-spinners';

class Load extends Component {
  render() {
    return <RingLoader color={colors.blueColor} loading={this.props.loading} />;
  }
}

export default Load;

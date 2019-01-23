import React, { Component } from 'react';

// Libraries
import { FadeLoader } from 'react-spinners';

// constants
import colors from '../../styles/colors';

class Loading extends Component {
  render() {
    const { isLoading } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      spinnerContainerStyle
    } = styles;

    return isLoading ? (
      <div style={mainContainerStyle}>
        <div style={tableContainerStyle}>
          <div style={tableWrapperStyle}>
            <div style={spinnerContainerStyle}>
              <FadeLoader color={colors.blueColor} loading={true} />
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

const spinnerSize = 60;
const styles = {
  tableContainerStyle: {
    position: 'relative',
    display: 'table',
    width: '100%',
    height: `100vh`
  },
  tableWrapperStyle: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center'
  },
  mainContainerStyle: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 999,
    width: '100%',
    height: `100vh`,
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  spinnerContainerStyle: {
    width: spinnerSize,
    height: spinnerSize,
    margin: '0 auto'
  }
};

export default Loading;

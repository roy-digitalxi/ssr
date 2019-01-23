import React, { Component } from 'react';

// constants
import fonts from '../../../../styles/fonts';
import colors from '../../../../styles/colors';

class ChannelTab extends Component {
  render() {
    const { channelName, channelColor } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      channelTitleStyle
    } = styles;

    return (
      <div className="dx_card" style={mainContainerStyle}>
        <div style={tableContainerStyle}>
          <div style={tableWrapperStyle}>
            <p
              style={Object.assign({}, channelTitleStyle, {
                color: channelColor
              })}
            >
              {channelName}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  tableContainerStyle: {
    position: 'relative',
    display: 'table',
    height: '100%',
    width: '100%'
  },
  tableWrapperStyle: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  mainContainerStyle: {
    backgroundColor: colors.whiteColor,
    width: 240,
    marginBottom: 6
  },
  channelTitleStyle: {
    margin: 0,
    padding: 12,
    fontSize: fonts.h3
  }
};

export default ChannelTab;

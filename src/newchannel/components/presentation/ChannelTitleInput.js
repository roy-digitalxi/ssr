import React, { Component } from 'react';

// Libraries
import Textarea from 'react-textarea-autosize';

// constants
import fonts from '../../../styles/fonts';

class ChannelTitleInput extends Component {
  render() {
    const {
      mainContainerStyle,
      characterCounterStyle,
      titleInputStyle
    } = styles;

    const { channelName, color } = this.props;

    return (
      <div style={mainContainerStyle}>
        <Textarea
          disabled={this.props.isDisabled}
          className="dx_input"
          maxLength="50"
          style={Object.assign({}, titleInputStyle, { color })}
          placeholder={''}
          value={channelName}
          onChange={e => this.props.handleTitleCharacterChange(e.target.value)}
        />
        <p style={characterCounterStyle}>
          {channelName ? channelName.length : 0}/50
        </p>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {},
  characterCounterStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 0
  },
  titleInputStyle: {
    minHeight: 36,
    width: '100%',
    fontSize: fonts.h3,
    border: 'none',
    outlineStyle: 'none'
  }
};

export default ChannelTitleInput;

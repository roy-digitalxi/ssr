import React, { Component } from 'react';

// Libraries
import Textarea from 'react-textarea-autosize';

// constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

class ChannelDescInput extends Component {
  render() {
    const { textAreaStyle, characterCounterStyle } = styles;

    const { description } = this.props;

    return (
      <div>
        <Textarea
          className="dx_input"
          maxLength="1000"
          style={Object.assign({}, textAreaStyle)}
          placeholder={''}
          value={description}
          onChange={e =>
            this.props.handleDescriptionCharacterChange(e.target.value)
          }
        />
        <p style={characterCounterStyle}>
          {description ? description.length : 0}/1000
        </p>
      </div>
    );
  }
}

const styles = {
  textAreaStyle: {
    minHeight: 72,
    width: '100%',
    fontSize: fonts.h3,
    backgroundColor: colors.whiteColor,
    border: 'none',
    outlineStyle: 'none',
    maxHeight: 84,
    overflowY: 'auto'
  },
  characterCounterStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 0
  }
};

export default ChannelDescInput;

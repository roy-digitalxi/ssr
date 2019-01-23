import React, { Component } from 'react';

// Libraries
import Textarea from 'react-textarea-autosize';

// constants
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

class DxInput extends Component {
  handleKeyPress = (e, enableEnter) => {
    if (enableEnter && e.key == 'Enter') {
      this.props.handleKeyPress();
    }
  };

  handleInputClick = () => {
    let { enableClick, hyperValue } = this.props;

    if (enableClick && hyperValue) {
      const regex = /(http(s?))\:\/\//gi;
      if (!regex.test(hyperValue)) {
        hyperValue = `http://${hyperValue}`;
      }
      window.open(hyperValue, '_blank');
    }
  };

  render() {
    const {
      multiLine,
      enableEnter,
      placeholder,
      isDark,
      isTransparent,
      color,
      textCenter,
      width,
      maxHeight,
      marginTop,
      disabled,
      value,
      textColor,
      isUnderline,
      isPointer,
      isRounded,
      isFullWidth
    } = this.props;

    const extra = {};
    extra.width = width ? `${width}` : '120px';
    extra.maxHeight = maxHeight ? maxHeight : '360px';
    if (isDark) {
      extra.backgroundColor = colors.lightBlueColor;
    } else {
      extra.backgroundColor = colors.whiteColor;
    }
    if (isTransparent) {
      extra.backgroundColor = 'transparent';
    }
    if (textCenter) {
      extra.textAlign = 'center';
    } else {
      extra.paddingLeft = 12;
      extra.paddingRight = 12;
    }
    if (marginTop) {
      extra.marginTop = marginTop;
    }
    if (textColor) {
      extra.color = textColor;
    }
    if (isUnderline) {
      extra.textDecoration = 'underline';
    }
    if (isPointer) {
      extra.cursor = 'pointer';
    }
    if (isRounded) {
      extra.borderRadius = '18px';
    }
    if (isFullWidth) {
      extra.width = 'calc(100% - 24px)';
    }

    if (multiLine) {
      return (
        <Textarea
          className="dx_input"
          style={Object.assign({}, styles.textareaStyle, { color }, extra)}
          placeholder={placeholder}
          value={value != null ? value : ''}
          onChange={e => this.props.handleValChange(e)}
        />
      );
    }

    return (
      <input
        className="dx_input"
        style={Object.assign({}, styles.inputStyle, extra)}
        type="text"
        placeholder={placeholder}
        disabled={disabled ? true : false}
        value={value != null ? value : ''}
        onChange={e => this.props.handleValChange(e)}
        onKeyPress={e => this.handleKeyPress(e, enableEnter)}
        onDoubleClick={() => this.handleInputClick()}
      />
    );
  }
}

const styles = {
  inputStyle: {
    height: 28,
    border: 'none',
    fontSize: fonts.h2
  },

  textareaStyle: {
    minHeight: 36,
    width: 264,
    paddingBottom: 12,
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: fonts.h3
  }
};

export default DxInput;

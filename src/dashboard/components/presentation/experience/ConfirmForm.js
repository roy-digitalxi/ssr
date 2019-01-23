import React, { Component } from 'react';

// components
import DxInput from '../../../../components/dxInput/DxInput';

class ConfirmForm extends Component {
  render() {
    return (
      <DxInput
        enableEnter={true}
        placeholder="Type here.."
        handleValChange={e => this.props.handleInputChange(e.target.value)}
        isDark={true}
        disabled={false}
        value={this.props.value}
        isRounded={false}
        isFullWidth={true}
        handleKeyPress={() => this.props.handleConfirmPress()}
      />
    );
  }
}

const styles = {};

export default ConfirmForm;

import React, { Component } from 'react';

// Libraries
import Alert from 'react-s-alert';
import '../../../public/css/alertbar/react-s-alert.css';
import PropTypes from 'prop-types';

class AlertBar extends Component {
  static propTypes = {
    isDisplay: PropTypes.bool,
    isError: PropTypes.bool,
    message: PropTypes.string,
    handleAlertBarClose: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    let { isDisplay, isError, message } = nextProps.alertBar;

    if (!isDisplay) {
      return;
    }
    if (isError) {
      Alert.error(`<p>${message}</p>`);
    } else {
      Alert.success(`<p>${message}</p>`);
    }
  }

  render() {
    return (
      <Alert
        position="bottom"
        stack={{ limit: 1 }}
        timeout={1000}
        effect="jelly"
        html={true}
        onClose={() => this.props.handleAlertBarClose()}
      />
    );
  }
}

export default AlertBar;

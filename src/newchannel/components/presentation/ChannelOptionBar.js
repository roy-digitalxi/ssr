import React, { Component } from 'react';

// Libraries
import Button from '@material-ui/core/Button';
import DropdownMenu from 'react-dd-menu';
import Lock from '@material-ui/icons/Lock';
import Fingerprint from '@material-ui/icons/Fingerprint';

// components
import DxInput from '../../../components/dxInput/DxInput';

// constants
import colors from '../../../styles/colors';

// styles
import '../../../../../assets/css/dd-menu/dd_menu.css';

class ChannelOptionBar extends Component {
  state = {
    isTypeMenuOpen: false
  };

  handleToggleTypeSelect = () => {
    this.setState({
      isTypeMenuOpen: !this.state.isTypeMenuOpen
    });
  };

  handleCloseTypeSelect = () => {
    this.setState({ isTypeMenuOpen: false });
  };

  render() {
    const {
      outlineBtnStyle,
      optionBtnStyle,
      lockStyle,
      privateChannelLabel
    } = styles;

    const { channelType } = this.props;

    let channelLabel;
    switch (channelType.toString()) {
      case '0':
        channelLabel = 'Public Channel';
        break;
      case '1':
        channelLabel = 'Private Channel - Invite only';
        break;
      case '2':
        channelLabel = 'Invitation Channel - Invite only';
        break;
      default:
        break;
    }

    return (
      <div>
        <DropdownMenu
          className="dx_channel_option_drop_menu"
          isOpen={this.state.isTypeMenuOpen}
          close={() => this.handleCloseTypeSelect()}
          toggle={
            <div>
              <DxInput
                placeholder="type"
                width="226px"
                disabled={true}
                value={channelLabel}
                isRounded={true}
              />
              <Button
                style={outlineBtnStyle}
                onClick={() => this.handleToggleTypeSelect()}
              >
                EDIT
              </Button>
            </div>
          }
          align="left"
        >
          <div onClick={() => this.props.handleClickOption(0)}>
            <Button style={optionBtnStyle} className="dx-lower-case">
              Public Channel
            </Button>
          </div>
          <div onClick={() => this.props.handleClickOption(1)}>
            <Button style={optionBtnStyle} className="dx-lower-case">
              <p style={privateChannelLabel}>
                Private Channel - Invite only
                <Lock style={lockStyle} />
              </p>
            </Button>
          </div>
          <div onClick={() => this.props.handleClickOption(2)}>
            <Button style={optionBtnStyle} className="dx-lower-case">
              <p style={privateChannelLabel}>
                Invitation Channel - Invite only
                <Fingerprint style={lockStyle} />
              </p>
            </Button>
          </div>
        </DropdownMenu>
      </div>
    );
  }
}

const styles = {
  outlineBtnStyle: {
    color: colors.blueColor
  },
  optionBtnStyle: {
    width: 250,
    justifyContent: 'flex-start'
  },
  lockStyle: {
    height: '14px',
    position: 'relative'
  },
  privateChannelLabel: {
    margin: 0
  }
};

export default ChannelOptionBar;

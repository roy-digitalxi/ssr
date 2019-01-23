import React, { Component } from 'react';

// styles
import '../../../../../../assets/css/dd-menu/dd_StreamMenu.css';

// Libraries
import IconButton from '@material-ui/core/IconButton';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import DropdownMenu from 'react-dd-menu';
import Button from '@material-ui/core/Button';

// constants
import fonts from '../../../../styles/fonts';
import colors from '../../../../styles/colors';

class LiveStream extends Component {
  state = {
    isMenuOpen: false
  };

  handleToggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  };

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  handleToggleImport = () => {
    this.setState({
      isImportOpen: !this.state.isImportOpen
    });
  };

  handleCloseImport = () => {
    this.setState({ isImportOpen: false });
  };

  render() {
    const {
      tableContainerStyle,
      tableWrapperStyle,
      liveStreamWrapperStyle,
      expTitleStyle,
      liveInfoWrapperStyle,
      liveInfoIconStyle,
      importContainerStyle,
      removeBtnStyle
    } = styles;

    return (
      <div style={liveStreamWrapperStyle}>
        <div style={tableContainerStyle}>
          <div style={tableWrapperStyle}>
            <p style={expTitleStyle}>{this.props.streamTitle}</p>
          </div>
        </div>
        <div style={liveInfoWrapperStyle}>
          <DropdownMenu
            className="dx_live_stream_dd"
            isOpen={this.state.isImportOpen}
            close={this.handleCloseImport}
            toggle={
              <div>
                <IconButton
                  style={liveInfoIconStyle}
                  onClick={() => this.handleToggleImport()}
                >
                  <MoreHoriz />
                </IconButton>
              </div>
            }
            align={'right'}
          >
            <div style={importContainerStyle}>
              <Button
                style={removeBtnStyle}
                onClick={() => this.props.handleRemoveStream()}
                variant="Remove experience stream"
              >
                Remove
              </Button>
            </div>
          </DropdownMenu>
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
  liveStreamWrapperStyle: {
    backgroundColor: colors.whiteColor,
    marginBottom: 6,
    padding: 12,
    fontSize: fonts.h4,
    display: 'flex',
    justifyContent: 'space-between',
    height: 24
  },
  expTitleStyle: {
    marginTop: 0,
    marginLeft: 6,
    marginBottom: 0,
    fontSize: fonts.h3,
    width: 600,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textAlign: 'left'
  },
  liveInfoWrapperStyle: {
    alignSelf: 'center',
    margin: 0,
    float: 'right'
  },
  liveInfoIconStyle: {
    height: 24,
    width: 24
  },
  importContainerStyle: {
    textAlign: 'left'
  },
  removeBtnStyle: {}
};
export default LiveStream;

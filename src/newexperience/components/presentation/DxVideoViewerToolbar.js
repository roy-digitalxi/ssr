import React, { Component } from 'react';

// Libraries
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import Button from '@material-ui/core/Button';

// components
import DxInput from '../../../components/dxInput/DxInput';

// constants
import colors from '../../../styles/colors';

class DxVideoViewerToolbar extends Component {
  state = {
    isOpen: false
  };

  handleVideoInsertClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
    this.props.handleVideoInsertClick();
  };

  render() {
    const { activeElemType, videoInput } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      iconContainerStyle,
      iconStyle,
      videoInputContainerStyle,
      videoInputWrapperStyle,
      videoInputBtnStyle
    } = styles;

    return (
      // VIDEO
      <div
        className={
          activeElemType === 'VIDEO' ? 'dx_show_toolbar' : 'dx_hidden_toolbar'
        }
      >
        <div style={tableContainerStyle}>
          <div style={tableWrapperStyle}>
            <div style={mainContainerStyle}>
              {this.state.isOpen ? (
                <div style={videoInputContainerStyle}>
                  <div style={videoInputWrapperStyle}>
                    <DxInput
                      enableEnter={true}
                      placeholder="Embed video url"
                      handleValChange={e =>
                        this.props.handleVideoInputChange(e)
                      }
                      isDark={true}
                      width="144px"
                      disabled={false}
                      value={videoInput}
                      handleKeyPress={() => this.handleVideoInsertClick()}
                      isRounded={true}
                    />
                  </div>
                  <Button
                    style={videoInputBtnStyle}
                    onClick={() => this.handleVideoInsertClick()}
                    variant="Enter video url"
                  >
                    Confirm
                  </Button>
                </div>
              ) : (
                <div
                  style={iconContainerStyle}
                  onClick={() => this.setState({ isOpen: !this.state.isOpen })}
                >
                  <VideoLibrary style={iconStyle} />
                </div>
              )}
            </div>
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
    height: 36,
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 6
  },
  iconContainerStyle: {
    width: 36,
    height: 36,
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    cursor: 'pointer'
  },
  iconStyle: {
    color: colors.lightGreyColor,
    fontSize: 30
  },
  videoInputContainerStyle: {
    display: 'flex',
    flexDirection: 'row'
  },
  videoInputWrapperStyle: {
    flex: 4,
    marginTop: 3
  },
  videoInputBtnStyle: {
    flex: 1,
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'capitalize',
    marginLeft: 6
  }
};

export default DxVideoViewerToolbar;

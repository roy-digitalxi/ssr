import React, { Component } from 'react';

// Libraries
import ReactPlayer from 'react-player';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

class DxVideoViewer extends Component {
  handleVideoError = e => {
    this.props.handleVideoError('The supported link: youtube, vimeo');
  };

  render() {
    const {
      mainContainerStyle,
      mainWrapperStyle,
      descContainerStyle,
      tableContainerStyle,
      tableWrapperStyle,
      infoLabelStyle
    } = styles;

    const { videoUrl } = this.props;

    return (
      <div style={mainContainerStyle}>
        {videoUrl ? (
          <div style={mainWrapperStyle}>
            <ReactPlayer
              config={{
                facebook: {
                  appId: '868742783317382'
                }
              }}
              width={320}
              height={180}
              url={videoUrl}
              controls={true}
              onBuffer={() => this.props.handleElemSelect()}
              onPlay={() => this.props.handleElemSelect()}
              onPause={() => this.props.handleElemSelect()}
              onError={e => this.handleVideoError(e)}
            />
          </div>
        ) : (
          <div style={descContainerStyle}>
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <p style={infoLabelStyle}>Please select a VIDEO..</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    backgroundColor: colors.greyColor
  },
  mainWrapperStyle: {
    height: 180
  },
  descContainerStyle: {
    height: 72
  },
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
  infoLabelStyle: {
    fontSize: fonts.h2,
    color: colors.greyLabelColor,
    margin: 0,
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: fonts.h3
  }
};

export default DxVideoViewer;

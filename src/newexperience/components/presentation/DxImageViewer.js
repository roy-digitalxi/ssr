import React, { Component } from 'react';

// config
import config from '../../../config';

// Libraries
import hexRgb from '../../../helpers/hex2Rgb';

// helpers
import * as helpers from '../../../helpers';

class DxImageViewer extends Component {
  render() {
    let { imgOpacityColor, imgOpacity } = this.props;

    const { mainContainerStyle, imgStyle, overlayWrapperStyle } = styles;

    imgOpacityColor = hexRgb(imgOpacityColor);
    imgOpacity = (imgOpacity / 100).toFixed(2);
    const overLayColor = `rgba(${imgOpacityColor.red}, ${
      imgOpacityColor.green
    }, ${imgOpacityColor.blue}, ${imgOpacity})`;

    return (
      <div style={mainContainerStyle}>
        <div
          style={Object.assign({}, overlayWrapperStyle, {
            backgroundColor: overLayColor
          })}
        />
        <img
          style={imgStyle}
          src={
            this.props.img
              ? `${config.picHost}${
                  this.props.img
                }&OrgUrl=${helpers.getOrgUrl()}`
              : require('../../../../../assets/images/imageBg.png')
          }
        />
      </div>
    );
  }
}

const padding = 0;

const styles = {
  mainContainerStyle: {
    width: 320,
    height: 160,
    cursor: 'default',
    position: 'relative'
  },
  imgStyle: {
    display: 'block',
    width: 320 - 2 * padding,
    height: 160 - 2 * padding,
    padding: padding
  },
  overlayWrapperStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    display: 'block',
    zIndex: 1
  }
};

export default DxImageViewer;

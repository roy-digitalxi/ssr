import React, { Component } from 'react';

// Libraries
import Home from '@material-ui/icons/Home';
import Cancel from '@material-ui/icons/Cancel';

// components
import ThumbnailPhoneElement from '../../../components/dxPage/ThumbnailPhoneElement';

// constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

class ThumbnailPage extends Component {
  renderPhoneElementSection = () => {
    const { Sections } = this.props.page;
    const { elemContainerStyle } = styles;

    if (!Sections) {
      return null;
    }

    let section = Sections.map((section, i) => {
      return (
        <div className={'dx_show'} style={elemContainerStyle}>
          <ThumbnailPhoneElement
            key={i}
            isMin={true}
            section={section}
            pdfWidth={120}
            isLoadHtml={false}
            splashSize="SMALL"
            videoSize="SMALL"
            imgSize="SMALL"
          />
        </div>
      );
    });
    return section;
  };

  render() {
    const {
      mainContainerStyle,
      rootIndicatorContainerStyle,
      rootIndicatorWrapperStyle,
      rootIndicatorStyle,
      closeContainerStyle,
      closeIconStyle,
      contentContainerStyle,
      titleContainerStyle,
      titleStyle
    } = styles;

    const { active, title, isRoot } = this.props;

    return (
      <div
        style={mainContainerStyle}
        onClick={() => this.props.handleClickActivePage()}
      >
        {isRoot ? (
          <div style={rootIndicatorContainerStyle}>
            <div style={rootIndicatorWrapperStyle}>
              <Home style={rootIndicatorStyle} />
            </div>
          </div>
        ) : null}
        <div
          className="dx_hover_btn"
          style={closeContainerStyle}
          onClick={() => this.props.handleDeletePage()}
        >
          <Cancel style={closeIconStyle} />
        </div>
        <div style={contentContainerStyle}>
          {this.renderPhoneElementSection()}
        </div>
        <div style={titleContainerStyle}>
          <p
            style={Object.assign({}, titleStyle, {
              color: active ? colors.greenColor : colors.whiteColor
            })}
          >
            {title}
          </p>
        </div>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    position: 'relative',
    height: 156,
    width: 120,
    margin: '0 auto',
    paddingTop: 24,
    cursor: 'pointer'
  },
  rootIndicatorContainerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 24,
    width: '100%'
  },
  rootIndicatorWrapperStyle: {
    width: 24,
    margin: '0 auto',
    cursor: 'pointer'
  },
  rootIndicatorStyle: {
    width: 24,
    color: colors.orangeColor
  },
  closeContainerStyle: {
    position: 'absolute',
    right: -9,
    top: 15,
    width: 18,
    height: 18,
    zIndex: 99,
    borderRadius: '50%',
    cursor: 'pointer',
    backgroundColor: colors.whiteColor
  },
  closeIconStyle: {
    position: 'absolute',
    right: -3,
    top: -3,
    display: 'block',
    height: 24,
    width: 24,
    color: colors.redColor
  },
  contentContainerStyle: {
    backgroundColor: colors.whiteColor,
    height: 156,
    width: 120,
    overflow: 'hidden'
  },
  elemContainerStyle: {
    maxHeight: 156,
    width: 120,
    overflow: 'hidden'
  },
  titleContainerStyle: {
    width: 120
  },
  titleStyle: {
    fontSize: fonts.h5,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 0,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  }
};

export default ThumbnailPage;

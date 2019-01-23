import React, { Component } from 'react';

// libraries
import Masonry from 'react-masonry-component';
import Card from '@material-ui/core/Card';

const masonryOptions = {
  columnWidth: 10,
  fitWidth: true,
  transitionDuration: '0.8s',
  originTop: true,
  percentPosition: true,
  originLeft: true
};

class WidgetTemplate extends React.Component {
  render() {
    const { mainContainerStyle } = styles;

    const widgets = this.props.widgetElements.map(function(element) {
      return (
        <div
          style={{
            marginBottom: element.marginBottom,
            marginRight: 12,
            height: element.height,
            width: element.width
          }}
        >
          <Card
            style={{
              height: '100%',
              width: '100%',
              background: element.background,
              color: element.color,
              padding: 0,
              boxShadow: '0 2px 4px 0 #DFE6EEX'
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: element.headerFontSize,
                textAlign: element.headerAlign,
                marginTop: element.headerMarginTop,
                marginLeft: element.headerMarginLeft
              }}
            >
              {element.header}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: element.numberSize,
                textAlign: 'center',
                marginTop: element.contentMarginTop
              }}
            >
              {element.number}
            </p>
          </Card>
        </div>
      );
    });

    return (
      <Masonry
        options={masonryOptions}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
        style={mainContainerStyle}
      >
        {widgets}
      </Masonry>
    );
  }
}

const styles = {
  mainContainerStyle: {
    height: '100%'
  }
};

export default WidgetTemplate;

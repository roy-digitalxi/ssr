import React, { Component } from 'react';

// Libraries
import { DropTarget } from 'react-dnd';

// constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem()
  };
}

class Target extends Component {
  render() {
    const { connectDropTarget, hovered, item } = this.props;
    const backgroundColor = hovered
      ? colors.blueBorderColor
      : colors.lightBlueColor;
    const color = hovered ? colors.whiteColor : colors.blackColor;
    const {
      mainContainerStyle,
      tableContainerStyle,
      tableWrapperStyle,
      labelStyle
    } = styles;

    return connectDropTarget(
      <div
        className="target"
        style={Object.assign({}, mainContainerStyle, {
          backgroundColor: backgroundColor
        })}
      >
        <div style={tableContainerStyle}>
          <div style={tableWrapperStyle}>
            <p style={Object.assign({}, labelStyle, { color })}>
              Drag & drop elements
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    border: '1px dotted',
    borderColor: colors.blueBorderColor,
    boxSize: 'border-box',
    height: 60
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
  labelStyle: {
    fontSize: fonts.h3,
    margin: 0,
    textAlign: 'center'
  }
};

export default DropTarget('template', {}, collect)(Target);

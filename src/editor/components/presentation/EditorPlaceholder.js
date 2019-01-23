import React, { Component } from 'react';

import Button from '@material-ui/core/Button';

class EditorPlaceholder extends Component {
  handleUpdateActiveIndex = activeIndex => {
    this.props.handleUpdateActiveIndex(activeIndex);
  };

  render() {
    const { activeIndex, content } = this.props;
    console.log('content: ', content);
    return (
      <Button
        style={{
          backgroundColor: 'grey',
          textTransform: 'none',
          marginBottom: 10
        }}
        onClick={() => this.handleUpdateActiveIndex(activeIndex)}
      >
        {content.map(
          item => item.currentToolbarIndex === activeIndex && item.editorHtml
        )}
      </Button>
    );
  }
}

export default EditorPlaceholder;

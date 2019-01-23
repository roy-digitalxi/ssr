import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import Loading from '../../../components/loading/Loading';
import EditorPlaceholder from '../presentation/EditorPlaceholder';
import EditorToolbar from '../presentation/EditorToolbar';
import Editor from '../presentation/Editor';

// Libraries
import { withStyles } from '@material-ui/core/styles';

// redux
import { connect } from 'react-redux';
import actions from '../../actions';

// Constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import sizes from '../../../styles/sizes';

const themeStyles = theme => ({
  root: {
    width: 600,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 600
  }
});

const styles = {};

class EditorContainer extends Component {
  state = {
    content: []
  };

  handleUpdateActiveIndex = activeIndex => {
    this.props.updateCurrent(activeIndex);
  };

  handleHtmlUpdate = (html, currentIndex) => {
    const { content } = this.state;

    const result = content.filter(data => {
      if (data.currentToolbarIndex === currentIndex) {
        data.editorHtml = html;
        data.currentToolbarIndex = currentIndex;
        return data;
      }
    });

    if (!result.length) {
      this.setState({
        content: [
          ...this.state.content,
          {
            editorHtml: html,
            currentToolbarIndex: currentIndex
          }
        ]
      });
    }
  };

  render() {
    const { editors, currentActiveIndex, isClear } = this.props;
    const { content } = this.state;

    return (
      <div style={{ marginTop: 60, minHeight: 'calc(100vh - 60px)' }}>
        <h3 style={{ textAlign: 'center', marginTop: 48 }}>Editor Container</h3>
        <hr style={{ marginBottom: 36 }} />
        {!isClear &&
          editors.map((editor, index) => (
            <div key={index} style={{ marginBottom: 24 }}>
              <EditorPlaceholder
                activeIndex={index}
                content={content}
                handleUpdateActiveIndex={activeIndex =>
                  this.handleUpdateActiveIndex(activeIndex)
                }
              />
              <EditorToolbar
                activeIndex={index}
                currentActiveIndex={currentActiveIndex}
              />
              <Editor
                activeIndex={index}
                currentActiveIndex={currentActiveIndex}
                handleHtmlUpdate={(html, currentIndex) =>
                  this.handleHtmlUpdate(html, currentIndex)
                }
              />
            </div>
          ))}
      </div>
    );
  }
}

const stateToProps = state => ({
  currentActiveIndex: state.editor.currentIndex
});

const dispatchToProps = dispatch => ({
  updateCurrent: index => dispatch(actions.updateCurrent(index))
});

export default connect(
  stateToProps,
  dispatchToProps
)(withStyles(themeStyles)(EditorContainer));

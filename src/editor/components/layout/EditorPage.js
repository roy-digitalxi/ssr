import React, { Component } from 'react';
import Helmet from 'react-helmet';

// Redux
import { connect } from 'react-redux';
import actions from '../../actions';

// Components
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import EditorContainer from '../container/EditorContainer';

// Constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import sizes from '../../../styles/sizes';

export class EditorPage extends Component {
  state = {
    editors: [0, 1, 2, 3],
    isClear: false
  };

  handleCreateEditor = () => {
    this.setState({
      editors: this.state.editors.concat(this.state.editors.length + 1),
      isClear: false
    });
  };

  handleClearEditor = () => {
    this.setState(prevState => ({
      isClear: !prevState.isClear
    }));
  };

  handleContent = content => {
    this.setState(prevState => ({
      isClear: !prevState.isClear
    }));
  };
  render() {
    const { mainContainerStyle, btnStyle, btnStyle1, buttonContainer } = styles;

    const { isClear } = this.state;

    return (
      <div style={mainContainerStyle}>
        <div style={buttonContainer}>
          <Button
            style={btnStyle}
            variant="create language"
            onClick={this.handleCreateEditor}
          >
            <Add style={{ marginRight: 5 }} /> Add new Editor
          </Button>
          <Button
            style={btnStyle1}
            variant="create language"
            onClick={this.handleClearEditor}
          >
            Clear Editors
          </Button>
        </div>
        <EditorContainer editors={this.state.editors} isClear={isClear} />
      </div>
    );
  }
}

const stateToProps = state => ({});

const dispatchToProps = dispatch => ({});

const styles = {
  mainContainerStyle: {
    minHeight: `100vh`,
    width: '100%',
    maxWidth: 1260,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'scroll',
    marginBottom: 48
  },
  buttonContainer: {
    position: 'absolute',
    top: 30,
    right: 30,
    display: 'flex',
    flexDirection: 'row'
  },
  btnStyle: {
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    marginRight: 20
  },
  btnStyle1: {
    backgroundColor: colors.blueColor,
    color: colors.whiteColor
  }
};

export default connect(
  stateToProps,
  dispatchToProps
)(EditorPage);

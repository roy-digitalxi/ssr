import React, { Component } from 'react';

// Components
import EditLanguageContainer from '../container/EditLanguageContainer';
import Button from '@material-ui/core/Button';
import NavigateBefore from '@material-ui/icons/NavigateBefore';

// constants
import sizes from '../../../styles/sizes';
import colors from '../../../styles/colors';

// Redux
import { connect } from 'react-redux';
import actions from '../../actions';

import { findWithAttr } from '../../../helpers';

class EditLanguagePage extends Component {
  handleGoBack = () => {
    const { navArr } = this.props;
    let index = findWithAttr(navArr, 'type', 'LANGUAGES');
    this.props.history.push(`/dashboard/${index}`);
  };

  render() {
    const { mainContainerStyle, btnStyle, headerContainerStyle } = styles;

    return (
      <div style={mainContainerStyle}>
        <div style={headerContainerStyle}>
          <h3>EDIT LANGUAGE</h3>
          <Button
            style={btnStyle}
            variant="create language"
            onClick={this.handleGoBack}
          >
            <NavigateBefore /> Go Back
          </Button>
        </div>
        <EditLanguageContainer
          history={this.props.history}
          languageGUID={this.props.history.location.pathname.replace(
            '/edit_language/',
            ''
          )}
        />
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    height: `100vh`,
    width: '100%',
    maxWidth: 1260,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainerStyle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 0
  },
  btnStyle: {
    position: 'absolute',
    top: 8,
    left: 30
  }
};

const stateToProps = state => ({
  navArr: state.root.navArr
});

const dispatchToProps = dispatch => ({});

export default connect(
  stateToProps,
  dispatchToProps
)(EditLanguagePage);

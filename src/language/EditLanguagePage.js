import React, { Component } from 'react';
import Helmet from 'react-helmet';

// Redux
import { connect } from 'react-redux';
import actions from './actions';

// Components
import EditLanguage from './components/layout/EditLanguage';

export class LanguagePage extends Component {
  handleMenuClose = () => {
    const { menuOpen } = this.props;
    if (menuOpen) {
      this.props.menuToggle(false, null);
    }
  };

  render() {
    return (
      <div onClick={this.handleMenuClose}>
        <Helmet title="Language" />
        <EditLanguage history={this.props.history} />
      </div>
    );
  }
}

const stateToProps = state => ({
  menuOpen: state.languages.menuOpen
});

const dispatchToProps = dispatch => ({
  getLanguageListRequest: data =>
    dispatch(actions.getLanguageListRequest(data)),
  setIsActiveRequest: (languageGUID, isActive) =>
    dispatch(actions.setIsActiveRequest(languageGUID, isActive)),
  setDefaultRequest: languageGUID =>
    dispatch(actions.setDefaultRequest(languageGUID)),
  menuToggle: (toggle, menuID) => dispatch(actions.menuToggle(toggle, menuID))
});

export default connect(
  stateToProps,
  dispatchToProps
)(LanguagePage);

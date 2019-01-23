import React, { Component } from 'react';
import Helmet from 'react-helmet';

// component
import NewExperience from './components/layout/NewExperience';

// redux
import { connect } from 'react-redux';
import { dxNavigateHistory as dxNavigateHistoryAction } from '../actions';
import {
  // CREATE EXPERIENCE
  dxExperienceInitial as dxExperienceInitialAction,
  dxExperienceType as dxExperienceTypeAction,

  // UPDATE EXPERIENCE
  dxExperienceView as dxExperienceViewAction
} from './actions';

export class NewExperiencePage extends Component {
  componentDidMount() {
    const history = this.props.history;
    const param = this.props.match.params.param;
    const url = this.props.match.url;

    let isNewExp = url.match(/new_experience/i);
    let isEditExp = url.match(/edit_experience/i);

    this.props.dxNavigateHistoryAction(history);

    if (isNewExp) {
      this.props.dxExperienceInitialAction();
      this.props.dxExperienceTypeAction(param);
    }
    if (isEditExp) {
      this.props.dxExperienceViewAction(param);
    }
  }

  render() {
    return (
      <div>
        <Helmet title="Experience" />
        <NewExperience />
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = {
  dxNavigateHistoryAction,

  dxExperienceInitialAction,
  dxExperienceTypeAction,

  dxExperienceViewAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(NewExperiencePage);

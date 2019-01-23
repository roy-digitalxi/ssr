import React, { Component } from 'react';

// Libraries
import SwipeableViews from 'react-swipeable-views';

// redux
import { connect } from 'react-redux';
import {
  dxExperienceIndexUpdate as dxExperienceIndexUpdateAction,
  dxExperienceCardTemplateRemove as dxExperienceCardTemplateRemoveAction
} from '../../actions';
import { dxAlert as dxAlertAction } from '../../../actions';

// constants
import sizes from '../../../styles/sizes';

// components
import ExperiencePanel from './ExperiencePanel';
import ExperienceCard from './ExperienceCard';
import ExperiencePages from './ExperiencePages';

class ExperienceControl extends Component {
  handleChangeProgressIndex = index => {
    this.props.dxExperienceIndexUpdateAction(index);
  };

  handleRemoveCardTemplateClick = () => {
    this.props.dxExperienceCardTemplateRemoveAction();
    this.props.dxAlertAction(true, false, 'Card has been removed');
  };

  render() {
    const { conentWrapperStyle } = styles;

    const { ExperienceIndex } = this.props;

    return (
      <SwipeableViews
        axis="x"
        index={ExperienceIndex}
        style={conentWrapperStyle}
      >
        {ExperienceIndex == 0 ? (
          <ExperiencePanel
            handleCreateCard={() => this.handleChangeProgressIndex(1)}
            handleCreatePages={() => this.handleChangeProgressIndex(2)}
            handleEditCardTemplateClick={() =>
              this.handleChangeProgressIndex(1)
            }
            handleRemoveCardTemplateClick={() =>
              this.handleRemoveCardTemplateClick()
            }
          />
        ) : null}
        {ExperienceIndex == 1 ? <ExperienceCard /> : null}
        {ExperienceIndex == 2 ? <ExperiencePages /> : null}
      </SwipeableViews>
    );
  }
}

const styles = {
  conentWrapperStyle: {
    width: sizes.dxWidth,
    margin: '0 auto'
  }
};

const stateToProps = state => {
  return {
    ExperienceIndex: state.newexperience.Experience.Index
  };
};

const dispatchToProps = {
  dxExperienceIndexUpdateAction,
  dxExperienceCardTemplateRemoveAction,

  dxAlertAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(ExperienceControl);

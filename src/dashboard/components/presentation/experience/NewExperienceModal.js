import React, { Component } from 'react';

// Libraries
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

// constants
import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';

// styles
import '../../../../../../assets/css/modal/rrm.css';

class NewExperienceModal extends Component {
  state = {
    value: '0'
  };

  preventParent = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleCloseModal = () => {
    this.props.onCloseModal();
  };

  handleCreateExperience = () => {
    this.props.navigateToNewexperience(this.state.value);
  };

  render() {
    const {
      mainContainerStyle,
      titleStyle,
      contentContainerStyle,
      txtStyle,
      labelStyle,
      descContainerStyle,
      imgStyle,
      tableContainerStyle,
      tableWrapperStyle,
      subLabelStyle,
      btnContainerStyle,
      btnStyle
    } = styles;
    const { open } = this.props;
    return (
      <Modal
        open={open}
        onClose={() => this.handleCloseModal()}
        center
        classNames={{
          overlay: 'custom-overlay',
          modal: 'custom-modal'
        }}
      >
        <div style={mainContainerStyle} onClick={e => this.preventParent(e)}>
          <p style={titleStyle}>Create & design awesome content</p>
          <div style={contentContainerStyle}>
            <p style={txtStyle}>Select one and click continue</p>
            <FormControl component="fieldset" required>
              <RadioGroup
                aria-label="gender"
                name="gender"
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="0"
                  control={<Radio style={{ color: colors.blackColor }} />}
                  label={<p style={labelStyle}>Cover only</p>}
                />
                <div style={descContainerStyle}>
                  <img
                    src={require('../../../../../../assets/images/card_only.png')}
                    style={imgStyle}
                  />
                  <div style={tableContainerStyle}>
                    <div style={tableWrapperStyle}>
                      <span style={subLabelStyle}>
                        Use this experience when sharing brief updates, news or
                        announcements to your audience.
                      </span>
                    </div>
                  </div>
                </div>
                <FormControlLabel
                  value="1"
                  control={<Radio style={{ color: colors.blackColor }} />}
                  label={<p style={labelStyle}>Cover + page(s)</p>}
                />
                <div style={descContainerStyle}>
                  <img
                    src={require('../../../../../../assets/images/card_exp.png')}
                    style={imgStyle}
                  />
                  <div style={tableContainerStyle}>
                    <div style={tableWrapperStyle}>
                      <span style={subLabelStyle}>
                        Use this experience to create complex user interactions
                        with multiple pages.
                      </span>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </FormControl>
          </div>
          <div style={btnContainerStyle}>
            <Button
              onClick={() => this.handleCreateExperience()}
              style={btnStyle}
              variant="Create new experience"
            >
              Continue
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

const styles = {
  mainContainerStyle: {},
  titleStyle: {
    textAlign: 'center',
    color: colors.labelColor,
    fontSize: fonts.h2
  },
  contentContainerStyle: {
    marginTop: 36,
    paddingLeft: 24,
    paddingRight: 24
  },
  txtStyle: {
    color: colors.labelColor,
    fontSize: fonts.h2,
    marginBottom: 3
  },
  labelStyle: {
    fontWeight: 'bold',
    fontSize: fonts.h2
  },
  descContainerStyle: {
    display: 'flex'
  },
  imgStyle: {
    display: 'block',
    paddingLeft: 30,
    paddingRight: 12
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
  subLabelStyle: {
    color: colors.lightGreyColor,
    fontSize: fonts.h4
  },
  btnContainerStyle: {
    marginTop: 72,
    textAlign: 'center'
  },
  btnStyle: {
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'capitalize'
  }
};

export default NewExperienceModal;

import React, { Component } from 'react';

// styles
import '../../../../../../assets/css/dd-menu/dd_menu.css';

// libraries
import SearchBar from 'material-ui-search-bar';
import Button from '@material-ui/core/Button';

// constants
import fonts from '../../../../styles/fonts';
import colors from '../../../../styles/colors';

// component
import RestrictUserTemplate from './RestrictUserTemplate';
import ModalTemplate from '../ModalTemplate';

class ErrorMessageTemplate extends Component {
  state = {
    isModalOpen: false,
    errorMessage: this.props.messagePlaceholder
  };

  onOpenModal = () => {
    this.setState({ isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleConfirm = data => {
    this.setState({
      isModalOpen: false,
      errorMessage: data
    });

    console.log(data);
  };

  render() {
    const {
      invitationLabelStyle,
      invitationEditBtnStyle,
      invitaionContainerStyle
    } = styles;

    return (
      <div style={invitaionContainerStyle}>
        <p style={invitationLabelStyle}>{this.state.errorMessage}</p>
        <Button style={invitationEditBtnStyle} onClick={this.onOpenModal}>
          Edit
        </Button>
        <ModalTemplate
          open={this.state.isModalOpen}
          title="Enter your error message"
          cancel={true}
          confirm={true}
          handleConfirm={this.handleConfirm}
          onCloseModal={() => this.handleCloseModal()}
          inputText={true}
        />
      </div>
    );
  }
}

const styles = {
  invitationLabelStyle: {
    marginLeft: 18,
    fontSize: fonts.h2,
    fontWeight: '500',
    marginTop: 0,
    marginBottom: 0,
    fontFamily: 'avenir',
    width: 'calc(100% - 152px)',
    paddingRight: 12
  },
  invitationEditBtnStyle: {
    background: colors.blueColor,
    color: colors.whiteColor,
    height: 40,
    width: 120,
    marginLeft: 0,
    textTransform: 'none',
    fontSize: fonts.h3
  },
  invitaionContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'auto',
    background: 'white',
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    fontSize: fonts.h4,
    marginLeft: 48,
    height: 36,
    boxShadow: '0 1px 1px 0 #CED5DB'
  }
};

export default ErrorMessageTemplate;

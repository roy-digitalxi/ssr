import React, { Component } from 'react';

// Libraries
import Modal from 'react-responsive-modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

// styles
import '../../../../../assets/css/modal/rrm.css';

class ModalTemplate extends Component {
  state = {
    textFieldValue: ''
  };

  handleCloseModal = () => {
    this.props.onCloseModal();
  };

  handleTextFieldChange = input => {
    this.setState({
      textFieldValue: input.target.value
    });
  };

  handleConfirm = () => {
    this.props.handleConfirm(this.state.textFieldValue);
  };

  render() {
    const { open, title, description, cancel, confirm, inputText } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      titleContainerStyle,
      titleStyle,
      contentContainerStyle,
      contentStyle,
      btnContainerStyle,
      controlContainerStyle,
      btnWrapperStyle,
      cancelBtnStyle,
      confirmBtnStyle,

      inputAreaStyle
    } = styles;

    return (
      <Modal
        open={open}
        onClose={() => this.handleCloseModal()}
        center
        classNames={{
          overlay: 'dx_overlay',
          modal: 'dx_modal'
        }}
      >
        <div style={mainContainerStyle}>
          <div style={titleContainerStyle}>
            <p style={titleStyle}>{title}</p>
          </div>
          <div style={contentContainerStyle}>
            {inputText ? (
              <TextField
                style={inputAreaStyle}
                placeholder="Type your error message here"
                multiline={true}
                rows={3}
                rowsMax={3}
                underlineShow={false}
                InputProps={{
                  disableUnderline: true
                }}
                value={this.state.textFieldValue}
                onChange={this.handleTextFieldChange}
              />
            ) : null}
          </div>
          <div style={btnContainerStyle}>
            <div style={controlContainerStyle}>
              {cancel ? (
                <div style={btnWrapperStyle}>
                  <div style={tableContainerStyle}>
                    <div style={tableWrapperStyle}>
                      <Button
                        style={cancelBtnStyle}
                        variant="cancel modal"
                        onClick={() => this.handleCloseModal()}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}
              {confirm ? (
                <div style={btnWrapperStyle}>
                  <div style={tableContainerStyle}>
                    <div style={tableWrapperStyle}>
                      <Button
                        style={confirmBtnStyle}
                        variant="confirm modal"
                        onClick={() => this.handleConfirm()}
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

const styles = {
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
  mainContainerStyle: {
    height: '100%'
  },
  titleContainerStyle: {
    borderBottom: '1px solid',
    borderColor: colors.borderColor,
    height: 54
  },
  titleStyle: {
    fontSize: fonts.h1,
    fontWeight: 'bold',
    margin: 0,
    paddingTop: 15,
    paddingLeft: 18
  },
  contentContainerStyle: {
    height: 'calc(100% - 126px)',
    width: '100%'
  },
  // contentStyle: {
  //     fontSize: fonts.h1,
  //     margin: 0,
  //     padding: 18,
  // },
  btnContainerStyle: {
    borderTop: '1px solid',
    borderColor: colors.borderColor,
    height: 72
  },
  controlContainerStyle: {
    float: 'right',
    height: '100%',
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 12,
    paddingRight: 12
  },
  btnWrapperStyle: {
    marginLeft: 6,
    marginRight: 6,
    height: '100%'
  },
  cancelBtnStyle: {
    border: '1px solid',
    borderColor: colors.borderColor,
    color: colors.blackColor,
    textTransform: 'capitalize'
  },
  confirmBtnStyle: {
    backgroundColor: colors.redColor,
    color: colors.whiteColor,
    textTransform: 'capitalize'
  },
  inputAreaStyle: {
    width: '95%',
    margin: '12px 12px 12px 12px',
    paddingLeft: 6
  }
};

export default ModalTemplate;

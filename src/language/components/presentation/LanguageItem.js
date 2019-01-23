import React, { Component } from 'react';
import PropTypes from 'prop-types';

// COmponents
import DxModal from '../../../components/dxModal/DxModal';

// Library
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Close from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';

class LanguageItem extends Component {
  static propTypes = {
    handleSetActive: PropTypes.func,
    handleSetDefault: PropTypes.func,
    handleUpdateLanguage: PropTypes.func,
    language: PropTypes.object,
    handleToggleMenu: PropTypes.func,
    menuID: PropTypes.string
  };

  state = {
    anchorEl: null,
    isModalOpen: false,
    modalType: null
  };

  handleClick = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();

    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleModalOpen = type => {
    this.setState({
      isModalOpen: true,
      modalType: type,
      anchorEl: null
    });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
      modalType: null,
      anchorEl: null
    });
  };

  handleSetActive = (languageGUID, isActive) => {
    this.props.handleSetActive(languageGUID, isActive);
    this.handleCloseModal();
  };

  handleSetDefault = languageGUID => {
    this.props.handleSetDefault(languageGUID);
    this.handleCloseModal();
  };

  handleUpdateLanguage = languageGUID => {
    this.setState({
      isModalOpen: false,
      modalType: null,
      anchorEl: null
    });
    this.props.handleUpdateLanguage(languageGUID);
  };

  render() {
    const { language } = this.props;

    const { anchorEl, isModalOpen, modalType } = this.state;
    const open = Boolean(anchorEl);

    const langActive = language.IsActive ? 'Deactive' : 'Active';

    return (
      <React.Fragment>
        <TableRow>
          <TableCell component="th" scope="row">
            {language.Language} ({language.LanguageCode})
          </TableCell>
          <TableCell numeric>
            {language.IsActive ? <Check /> : <Close />}
          </TableCell>
          <TableCell numeric>
            {language.IsDefault ? <Check /> : <Close />}
          </TableCell>
          <TableCell numeric>
            <IconButton
              style={styles.editBurgerStyle}
              aria-owns={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              onClick={e => this.handleClick(e)}
            >
              <MoreHoriz />
            </IconButton>
            <Popover
              style={{ marginTop: 6 }}
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              TransitionComponent={Fade}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <div style={styles.menuList}>
                <Button
                  style={styles.menuListButton}
                  onClick={() => this.handleModalOpen('IsDefault')}
                >
                  Default
                </Button>
              </div>
              <div style={styles.menuList}>
                <Button
                  style={styles.menuListButton}
                  onClick={() => this.handleModalOpen('IsActive')}
                >
                  {langActive}
                </Button>
              </div>
              <div style={styles.menuList}>
                <Button
                  style={styles.menuListButton}
                  onClick={() =>
                    this.handleUpdateLanguage(language.LanguageGUID)
                  }
                >
                  Update
                </Button>
              </div>
            </Popover>
          </TableCell>
        </TableRow>
        <DxModal
          open={isModalOpen}
          title={
            modalType === 'IsActive'
              ? `Confirm ${langActive} Language`
              : `Confirm Default Language`
          }
          hasBottomDiv={true}
          description="Do you want to proceed?"
          cancel={true}
          confirm={true}
          isDanger={true}
          handleConfirm={
            modalType === 'IsActive'
              ? () =>
                  this.handleSetActive(language.LanguageGUID, language.IsActive)
              : () => this.handleSetDefault(language.LanguageGUID)
          }
          onCloseModal={this.handleCloseModal}
        />
      </React.Fragment>
    );
  }
}

const styles = {
  editBurgerStyle: {
    cursor: 'pointer',
    fontSize: 12,
    width: 24,
    height: 24
  },
  drop_down_menu: {
    position: 'absolute'
  },
  menuList: {
    width: '100%'
  },
  menuListButton: {
    width: '100%'
  }
};

export default LanguageItem;

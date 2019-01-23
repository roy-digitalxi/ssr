import React, { Component } from 'react';

// styles
import '../../../../assets/css/react-dd-menu.css';
import '../../../../assets/css/ui-material/ui-material.css';

// Libraries
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Fade from '@material-ui/core/Fade';
import Popover from '@material-ui/core/Popover';

// constants
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import sizes from '../../styles/sizes';

// components
import DxInput from '../dxInput/DxInput';

// router
import { Link } from 'react-router-dom';

const themeStyles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 770
  }
});

class AdminNavBar extends Component {
  state = {
    anchorEl: null
  };

  preventParent = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  };

  handleClick = event => {
    this.preventParent(event);
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = event => {
    this.preventParent(event);
    this.setState({ anchorEl: null });
  };

  handleLogoutClick = event => {
    this.preventParent(event);
    this.props.handleLogoutClick(event);
  };

  render() {
    const { mainContainerStyle, mainWrapperStyle, btnContainerStyle } = styles;

    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <AppBar position="static" style={mainContainerStyle}>
        <div style={mainWrapperStyle}>
          <div style={btnContainerStyle}>
            <Button
              aria-owns={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <span>SA</span>
              <ExpandMore />
            </Button>
            <Popover
              style={{ marginTop: 12 }}
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
              <Button
                style={{ width: '100%' }}
                onClick={e => this.handleLogoutClick(e)}
              >
                logout
              </Button>
            </Popover>
          </div>
        </div>
      </AppBar>
    );
  }
}

const styles = {
  mainContainerStyle: {
    background: colors.whiteColor,
    color: colors.blackColor,
    minWidth: sizes.dxWidth,
    position: 'relative',
    zIndex: 10
  },
  mainWrapperStyle: {
    height: sizes.headerHeight,
    width: '100%',
    maxWidth: sizes.dxWidth,
    display: 'flex',
    flexDirection: 'row',
    margin: '0 auto',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  btnContainerStyle: {
    height: sizes.headerHeight,
    paddingRight: 12,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
};

export default withStyles(themeStyles)(AdminNavBar);

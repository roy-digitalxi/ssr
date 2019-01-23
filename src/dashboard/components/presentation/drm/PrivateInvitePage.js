import React, { Component } from 'react';

// styles
import '../../../../../../assets/css/dd-menu/dd_menu.css';

// libraries
import Button from '@material-ui/core/Button';
import DropdownMenu from 'react-dd-menu';
import ExpandMore from '@material-ui/icons/ExpandMore';

// constants
import fonts from '../../../../styles/fonts';
import colors from '../../../../styles/colors';

// component
import RestrictUserTemplate from './RestrictUserTemplate';
import ErrorMessageTemplate from './ErrorMessageTemplate';
import SearchBarTemplate from './SearchBarTemplate';

class PrivateInvitePage extends Component {
  state = {
    isMenuOpen: false
  };

  handleToggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  };

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  render() {
    const {
      mainContainerStyle,

      channelDetailsContainerStyle,
      channelDetailsWrapperStyle,
      safeguardLabelStyle,

      domainContainerStyle,
      domainWrapperStyle,
      emailLabelStyle,
      emailContentStyle,
      inviteCodeContainerStyle,
      inviteCodeLabelStyle,
      channelNameStyle,
      channelCodeStyle,
      imgStyle,

      addInviteCodeBtnStyle,

      memberListContainerStyle,
      memberListHeaderContainerStyle,
      memberLabelStyle,
      searchUserWrapperStyle,
      searchUserStyle,

      dropdownContainerStyle,
      expandIconStyle,
      dropdownBtnStyle,
      dropdownLabelStyle
    } = styles;

    return (
      <div style={mainContainerStyle}>
        <div style={channelDetailsContainerStyle}>
          <p style={channelDetailsWrapperStyle}>
            Enable invite codes for channels
          </p>
          <p style={safeguardLabelStyle}>
            By enabling this safeguard, users are required to enter a specific
            invite code (set by you) before accessing the channel’s content
          </p>
        </div>
        <div style={domainContainerStyle}>
          <div style={domainWrapperStyle}>
            <p style={emailLabelStyle}>Channel - Invite codes</p>
            <p style={emailContentStyle}>
              Allow only user(s) with the following invite codes to access the
              channel
            </p>
            <div style={inviteCodeContainerStyle}>
              <div style={inviteCodeLabelStyle}>
                <p style={channelNameStyle}>#generic</p>
                <p style={channelCodeStyle}>demo_1</p>
                {/* <img style={imgStyle}
                                    src={require('../../../../../../assets/images/close_button.png')}
                                />  */}
              </div>
              <div style={inviteCodeLabelStyle}>
                <p style={channelNameStyle}>#diabetes_channel</p>
                <p style={channelCodeStyle}>diabetes101</p>
                {/* <img style={imgStyle}
                                    src={require('../../../../../../assets/images/close_button.png')}
                                />  */}
              </div>
            </div>
          </div>
          <Button style={addInviteCodeBtnStyle}>+ Add Invite Code</Button>
        </div>
        <ErrorMessageTemplate messagePlaceholder="Show this error message when the user tries to enter a wrong invite code" />
        <div style={memberListHeaderContainerStyle}>
          <p style={memberLabelStyle}>Audit trail (2)</p>
          <div style={dropdownContainerStyle}>
            <DropdownMenu
              isOpen={this.state.isMenuOpen}
              close={this.handleCloseMenu}
              toggle={
                <div>
                  <Button
                    style={dropdownBtnStyle}
                    onClick={() => this.handleToggleMenu()}
                  >
                    <p style={dropdownLabelStyle}>#generic</p>
                    <ExpandMore style={expandIconStyle} />
                  </Button>
                </div>
              }
              align={'center'}
              size={'sm'}
            >
              <div>
                <p>#generic</p>
              </div>
            </DropdownMenu>
          </div>
          <div style={searchUserWrapperStyle}>
            <SearchBarTemplate />
          </div>
        </div>
        <div style={memberListContainerStyle}>
          <RestrictUserTemplate
            userPicture={require('../../../../../../assets/images/dhan.png')}
            userName={'Dhaneswar Pandian'}
            userEmail={'dhan@digitalxi.com'}
            userRegistrationDate={'10 May 2018'}
            userRegistrationInfo={'Error invite code: errr'}
            btnLabel={'Allow'}
            btnBackground={colors.whiteColor}
            btnTextColor={'#1B2A36'}
          />
          <RestrictUserTemplate
            userPicture={require('../../../../../../assets/images/roy.png')}
            userName={'Roy'}
            userEmail={'roy@digitalxi.com'}
            userRegistrationDate={'10 September 2011'}
            userRegistrationInfo={'Success'}
            btnLabel={'Allow'}
            btnBackground={colors.whiteColor}
            btnTextColor={'#1B2A36'}
          />
        </div>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    height: '100%',
    width: '100%'
  },
  clickHereLinkStyle: {
    color: colors.blueColor
  },
  channelDetailsContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    background: 'white',
    marginTop: 0,
    marginBottom: 18,
    paddingTop: 18,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 6,
    fontSize: fonts.h4,
    marginLeft: 48,
    height: 72,
    boxShadow: '0 1px 1px 0 #CED5DB'
  },
  channelDetailsWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 0,
    marginBottom: 12,
    fontSize: fonts.h2,
    fontWeight: '500',
    fontFamily: 'avenir'
  },
  domainContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 'auto',
    background: 'white',
    marginTop: 0,
    marginBottom: 30,
    paddingTop: 18,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 18,
    fontSize: fonts.h4,
    marginLeft: 48,
    height: 96,
    boxShadow: '0 1px 1px 0 #CED5DB'
  },
  domainWrapperStyle: {
    marginLeft: 18,
    marginTop: 0,
    marginBottom: 0,
    width: 'calc(100% - 152px)',
    paddingRight: 12,
    height: '100%'
  },
  emailLabelStyle: {
    marginTop: 0,
    marginBottom: 12,
    fontSize: fonts.h2,
    fontWeight: '500',
    fontFamily: 'avenir'
  },
  emailContentStyle: {
    marginTop: 0,
    marginBottom: 6,
    color: colors.lightGreyColor,
    fontSize: fonts.h3,
    fontFamily: 'avenir',
    fontWeight: '500'
  },
  addInviteCodeBtnStyle: {
    background: colors.blueColor,
    color: colors.whiteColor,
    height: 40,
    width: 132,
    marginLeft: 0,
    fontSize: fonts.h3,
    textTransform: 'none',
    paddingLeft: 3,
    paddingRight: 3
    // fontWeight: 300
  },

  memberListContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'space-between',
    width: 'auto',
    background: 'white',
    marginLeft: 48,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    fontSize: fonts.h4,
    overflowY: 'scroll',
    minHeight: 0,
    maxHeight: 'calc(100% - 456px)',
    boxShadow: '0 1px 1px 0 #CED5DB'
  },
  memberListHeaderContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'auto',
    paddingTop: 12,
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    borderWidth: 0.25,
    borderColor: '#d2d8de',
    borderStyle: 'solid',
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0,
    marginLeft: 48,
    marginTop: 24,
    background: colors.whiteColor,
    height: 48,
    boxShadow: '0 1px 1px 0 #CED5DB'
  },
  memberLabelStyle: {
    marginLeft: 18,
    fontSize: fonts.h1,
    fontFamily: 'avenir',
    fontWeight: '500',
    marginTop: 0,
    marginBottom: 0,
    width: 106
  },
  searchUserWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: 276,
    height: 36,
    marginRight: 36
  },
  safeguardLabelStyle: {
    margin: 0,
    fontSize: fonts.h3,
    fontWeight: '500',
    color: colors.lightGreyColor,
    fontFamily: 'avenir'
  },
  inviteCodeContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'scroll',
    //background:'yellow',
    height: 36,
    paddingTop: 12
  },
  inviteCodeLabelStyle: {
    height: 28,
    display: 'flex',
    marginRight: 12
  },
  channelNameStyle: {
    background: colors.blackColor,
    color: colors.whiteColor,
    margin: 0,
    padding: '0px 12px 0px 12px',
    lineHeight: 2,
    fontSize: fonts.h3
  },
  channelCodeStyle: {
    background: colors.lightBlueColor,
    color: colors.blackColor,
    margin: 0,
    lineHeight: 2,
    padding: '0px 12px 0px 12px',
    fontSize: fonts.h3
  },
  dropdownLabelStyle: {
    color: colors.whiteColor,
    margin: 0,
    width: 'calc(100% - 32px)',
    textAlign: 'center'
  },
  expandIconStyle: {
    color: colors.whiteColor,
    width: 32
  },
  dropdownContainerStyle: {
    height: 30,
    width: 138
  },
  dropdownBtnStyle: {
    padding: 0,
    textTransform: 'none',
    fontSize: fonts.h3,
    fontWeight: 300,
    background: colors.blackColor,
    color: colors.whiteColor,
    height: 30,
    width: 138
  },
  imgStyle: {
    position: 'relative',
    right: 9,
    top: -9,
    height: 18,
    width: 18
  }
};

export default PrivateInvitePage;

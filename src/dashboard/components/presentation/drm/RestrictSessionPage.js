import React, { Component } from 'react';

// styles
import '../../../../../../assets/css/dd-menu/dd_menu.css';

// constants
import fonts from '../../../../styles/fonts';
import colors from '../../../../styles/colors';

// component
import RestrictUserTemplate from './RestrictUserTemplate';
import ModalTemplate from '../ModalTemplate';
import ErrorMessageTemplate from './ErrorMessageTemplate';
import SearchBarTemplate from './SearchBarTemplate';

class RestrictSessionPage extends Component {
  render() {
    const {
      mainContainerStyle,

      channelDetailsContainerStyle,
      channelDetailsWrapperStyle,
      safeguardLabelStyle,

      memberListContainerStyle,
      memberListHeaderContainerStyle,
      memberLabelStyle,
      searchUserWrapperStyle
    } = styles;

    return (
      <div style={mainContainerStyle}>
        <div style={channelDetailsContainerStyle}>
          <p style={channelDetailsWrapperStyle}>
            Restrict users to have a maximum number of sessions
          </p>
          <p style={safeguardLabelStyle}>
            Enable this safeguard to protect your digital assest against user ID
            and password sharing between your members
          </p>
        </div>
        <ErrorMessageTemplate messagePlaceholder="Show this error message when the user exceeds maximum number of sessions" />
        <div style={memberListHeaderContainerStyle}>
          <p style={memberLabelStyle}>Restricted user list (5)</p>
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
            userRegistrationInfo={'3rd session'}
            btnLabel={'Allow'}
            btnBackground={colors.whiteColor}
            btnTextColor={'#1B2A36'}
          />
          <RestrictUserTemplate
            userPicture={require('../../../../../../assets/images/roy.png')}
            userName={'Roy He'}
            userEmail={'roy@digitalxi.com'}
            userRegistrationDate={'10 September 2011'}
            userRegistrationInfo={'4th session'}
            btnLabel={'Allow'}
            btnBackground={colors.whiteColor}
            btnTextColor={'#1B2A36'}
          />
          <RestrictUserTemplate
            userPicture={require('../../../../../../assets/images/vejey.jpeg')}
            userName={'Vejey Gandier'}
            userEmail={'vejey@digitalxi.com'}
            userRegistrationDate={'29 June 2018'}
            userRegistrationInfo={'5th session'}
            btnLabel={'Allow'}
            btnBackground={colors.whiteColor}
            btnTextColor={'#1B2A36'}
          />
          <RestrictUserTemplate
            userPicture={require('../../../../../../assets/images/paul.jpeg')}
            userName={'Paul Aiello'}
            userEmail={'paul@digitalxi.com'}
            userRegistrationDate={'09 November 2017'}
            userRegistrationInfo={'10th session'}
            btnLabel={'Allow'}
            btnBackground={colors.whiteColor}
            btnTextColor={'#1B2A36'}
          />
          <RestrictUserTemplate
            userPicture={require('../../../../../../assets/images/roy.png')}
            userName={'Roy'}
            userEmail={'roy@digitalxi.com'}
            userRegistrationDate={'10 September 2011'}
            userRegistrationInfo={'11th session'}
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
    marginBottom: 12,
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
    maxHeight: 'calc(100% - 262px)',
    boxShadow: '0 1px 1px 0 #CED5DB'
  },
  memberListHeaderContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'auto',
    marginTop: 15,
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
    marginBottom: 0
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

  removeBtnStyle: {
    textTransform: 'none',
    width: 126,
    background: 'red',
    color: 'white'
  }
};

export default RestrictSessionPage;

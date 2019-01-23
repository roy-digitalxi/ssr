import React, { Component } from 'react';

// Libraries
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

// constants
import fonts from '../../../../styles/fonts';
import colors from '../../../../styles/colors';

class RestrictUserTemplate extends Component {
  render() {
    const {
      memberInfoWrapperStyle,
      userAvatarStyle,
      userNameWrapperStyle,
      userNameStyle,
      userEmailStyle,
      userRegisterWrapperStyle,
      userRegisterDateStyle,
      sessionNumberStyle,
      btnContainerStyle
    } = styles;

    return (
      <div style={memberInfoWrapperStyle}>
        <Avatar
          alt="Roy He"
          style={userAvatarStyle}
          src={this.props.userPicture}
        />
        <div style={userNameWrapperStyle}>
          <p style={userNameStyle}>{this.props.userName}</p>
          <p style={userEmailStyle}>{this.props.userEmail}</p>
        </div>
        <div style={userRegisterWrapperStyle}>
          <p style={userRegisterDateStyle}>{this.props.userRegistrationDate}</p>
          <p style={sessionNumberStyle}>{this.props.userRegistrationInfo}</p>
        </div>
        <div style={btnContainerStyle}>
          <Button
            style={{
              backgroundColor: this.props.btnBackground,
              color: this.props.btnTextColor,
              textTransform: 'none',
              width: 126,
              border: this.props.btnBorder,
              fontSize: fonts.h3,
              fontFamily: 'avenir',
              fontWeight: 500
            }}
            variant="outlined"
          >
            {this.props.btnLabel}
          </Button>
        </div>
      </div>
    );
  }
}

const styles = {
  memberInfoWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 'auto',
    padding: 12,
    borderWidth: 0.25,
    borderColor: '#d2d8de',
    borderStyle: 'solid',
    borderLeft: 0,
    borderRight: 0,
    borderTop: 0
  },
  userAvatarStyle: {
    marginLeft: 18,
    marginRight: 12,
    width: 40
  },
  userNameWrapperStyle: {
    width: 180
  },
  userNameStyle: {
    margin: 0,
    fontSize: fonts.h3
  },
  userEmailStyle: {
    marginTop: 3,
    marginBottom: 0,
    color: colors.lightGreyColor,
    fontSize: fonts.h4
  },
  userRegisterWrapperStyle: {
    marginLeft: 6,
    width: 180
  },
  userRegisterDateStyle: {
    margin: 0,
    fontSize: fonts.h3
  },
  sessionNumberStyle: {
    marginTop: 3,
    marginBottom: 0,
    color: colors.lightGreyColor,
    fontSize: fonts.h4
  },
  btnContainerStyle: {
    width: 168,
    marginRight: 20,
    display: 'flex',
    justifyContent: 'flex-end'
  }
};
export default RestrictUserTemplate;

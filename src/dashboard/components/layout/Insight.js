import React, { Component } from 'react';

// libraries
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Add from '@material-ui/icons/Add';
import Apps from '@material-ui/icons/Apps';

// constants
import sizes from '../../../styles/sizes';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

//component
import WidgetTemplate from '../presentation/insights/WidgetTemplate';

class Insight extends Component {
  state = {
    widgetElements: [
      {
        header: 'ENGAGEMENT',
        width: 460,
        height: 250,
        background: 'linear-gradient(90deg, #DA4453 0%, #89216B 100%)',
        marginBottom: 12,
        headerMarginTop: 21,
        headerMarginLeft: 27,
        headerFontSize: 14,
        contentMarginTop: 0,
        color: 'white'
      },
      {
        header: 'DIABETES',
        width: 220,
        height: 119,
        background: '#FFFFFF',
        marginBottom: 12,
        headerFontSize: 14,
        headerMarginTop: 20,
        headerMarginLeft: 12,
        contentMarginTop: 0
      },
      {
        header: 'TOP PERFORMING CHANNELS',
        width: 220,
        height: 250,
        background: 'linear-gradient(90deg, #fe8c00 0%, #f83600 100%)',
        color: 'white',
        marginBottom: 12,
        headerFontSize: 18,
        headerMarginTop: 18,
        headerMarginLeft: 21,
        contentMarginTop: 0
      },
      {
        header: 'HYPERTENSION',
        width: 220,
        height: 119,
        background: '#FFFFFF',
        marginBottom: 12,
        headerFontSize: 14,
        headerMarginTop: 20,
        headerMarginLeft: 12,
        contentMarginTop: 0
      },
      {
        header: 'LEADERBOARD',
        width: 300,
        height: 250,
        background: 'linear-gradient(90deg, #302b63 0%, #24243e 100%)',
        headerFontSize: 18,
        headerMarginTop: 21,
        headerMarginLeft: 18,
        contentMarginTop: 0,
        marginBottom: 12,
        color: 'white'
      },
      {
        header: 'ENGAGEMENT',
        number: '110,145',
        width: 220,
        height: 115,
        background: 'linear-gradient(90deg, #56CCF2 0%, #2F80ED 100%)',
        marginBottom: 12,
        headerFontSize: 12,
        numberSize: 24,
        headerMarginTop: 21,
        headerMarginLeft: 15,
        contentMarginTop: 27,
        color: 'white'
      },
      {
        header: 'TRENDING CHANNELS',
        number: 'AUDIENCE',
        width: 220,
        height: 250,
        background: '#FFFFFF',
        headerFontSize: 18,
        headerMarginTop: 18,
        headerMarginLeft: 21,
        contentMarginTop: 22,
        marginBottom: 12
      },
      {
        header: 'CHANNELS',
        number: '13',
        width: 140,
        height: 58,
        background: '#ffffff',
        marginBottom: 12,
        headerFontSize: 12,
        numberSize: 24,
        headerAlign: 'left',
        headerMarginTop: 6,
        headerMarginLeft: 6,
        contentMarginTop: 0
      },
      {
        header: 'DISCOVERY',
        number: '201',
        width: 220,
        height: 115,
        background: '#FFFFFF',
        headerFontSize: 12,
        numberSize: 24,
        headerMarginTop: 21,
        headerMarginLeft: 15,
        contentMarginTop: 27,
        marginBottom: 12
      },
      {
        header: 'LIVE EXPERIENCES',
        number: '201',
        width: 140,
        height: 58,
        background: 'linear-gradient(90deg, #FFE000 0%, #799F0C 100%)',
        marginBottom: 12,
        headerFontSize: 12,
        numberSize: 24,
        textAlign: 'left',
        headerMarginTop: 6,
        headerMarginLeft: 6,
        contentMarginTop: 0,
        color: '#ffffff'
      },
      {
        header: 'Real Time',
        number: '21',
        width: 140,
        height: 110,
        background: 'linear-gradient(90deg, #FF4D43 0%, #FF1E71 100%)',
        color: 'white',
        headerFontSize: 14,
        numberSize: 24,
        headerAlign: 'center',
        headerMarginTop: 18,
        contentMarginTop: 12,
        marginBottom: 12
      }
    ]
  };

  handleRemoveWidget = () => {
    this.setState({
      widgetElements: this.state.widgetElements.splice(1, 10)
    });
  };

  render() {
    const {
      mainContainerStyle,
      mainWrapperStyle,

      topContainerStyle,
      imgStyle,
      headerStyle,
      headerLabelStyle,
      dateBtnStyle,
      dateIconStyle,

      addWidgetContainerStyle,
      addBtnStyle,
      addIconStyle,
      arrangeLabelStyle,
      arrangeWrapperStyle,
      arrangeIconStyle,

      widgetContainerStyle
    } = styles;

    return (
      <div style={mainContainerStyle}>
        <div style={mainWrapperStyle}>
          <div style={topContainerStyle}>
            <img
              style={imgStyle}
              src={require('../../../../../assets/images/analysisLogo.png')}
            />
            <p style={headerStyle}>
              Reports<p style={headerLabelStyle}>for</p>
            </p>
            <Button style={dateBtnStyle} variant="extendedFab">
              12.12 - 19.12
              <ExpandMore
                style={dateIconStyle}
                onClick={() => this.handleRemoveElement()}
              />
            </Button>
          </div>
          <div style={addWidgetContainerStyle}>
            <Button
              style={addBtnStyle}
              variant="extendedFab"
              onClick={() => this.handleRemoveWidget()}
            >
              <Add style={addIconStyle} />
              Add widget
            </Button>
            <div style={arrangeWrapperStyle}>
              <Apps style={arrangeIconStyle} />
              <p style={arrangeLabelStyle}>Arrange</p>
            </div>
          </div>
          <div style={widgetContainerStyle}>
            <WidgetTemplate widgetElements={this.state.widgetElements} />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    width: sizes.dxWidth,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row'
  },
  mainWrapperStyle: {
    height: `calc(100vh - ${sizes.headerHeight})`,
    flex: 1,
    width: '100%'
  },
  topContainerStyle: {
    height: 32,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 120,
    marginRight: 120,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  addWidgetContainerStyle: {
    marginLeft: 120,
    marginRight: 120,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    marginBottom: 32
  },
  dateBtnStyle: {
    borderRadius: 25,
    height: 30,
    width: 140,
    paddingLeft: 6,
    paddingRight: 0,
    paddinRight: 0,
    paddingTop: 3,
    paddingBottom: 3,
    border: '1px solid #979797',
    fontFamily: 'avenir',
    fontSize: fonts.h1,
    fontWeight: 300,
    textAlign: 'center'
  },
  dateIconStyle: {
    marginLeft: 6,
    color: colors.lightGreyColor
  },
  addIconStyle: {
    marginRight: 6,
    color: colors.blueColor,
    height: 27,
    width: 17,
    fontSize: 20
  },
  headerStyle: {
    margin: 0,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 300,
    fontFamily: 'avenir',
    display: 'flex',
    alignItems: 'center',
    marginRight: 12,
    marginLeft: 12
  },
  addBtnStyle: {
    borderRadius: 25,
    height: 30,
    width: 140,
    paddingLeft: 0,
    paddingRight: 0,
    paddinRight: 0,
    paddingTop: 3,
    paddingBottom: 3,
    boxShadow: '0 1px 3px 0 rgba(0,0,0,0.5)',
    background: colors.whiteColor,
    color: '#818E98',
    textAlign: 'center',
    fontSize: fonts.h2,
    fontFamily: 'avenir',
    fontWeight: 300,
    textTransform: 'none'
  },
  arrangeLabelStyle: {
    fontFamily: 'avenir',
    fontSize: fonts.h3,
    fontWeight: 500,
    color: '#CED5DB',
    margin: 0,
    paddingRight: 20
  },
  arrangeWrapperStyle: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  arrangeIconStyle: {
    color: '#CED5DB',
    height: 18,
    width: 18,
    marginRight: 3
  },
  imgStyle: {
    display: 'block',
    width: 30,
    height: 18
  },
  headerLabelStyle: {
    color: '#818E98',
    fontSize: 24,
    fontWeight: 300,
    fontFamily: 'avenir',
    marginLeft: 12
  },
  masonContainerStyle: {
    height: 560
  },
  widgetContainerStyle: {
    marginLeft: 120,
    // width:'100%',
    maxHeight: `calc(100% - 154px)`,
    overflowX: 'hidden',
    marginRight: 120
  }
};

export default Insight;

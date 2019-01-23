import React, { Component } from 'react';

// Libraries
import InfiniteScroll from 'react-infinite-scroller';

// Component
import LiveStream from '../presentation/streams/LiveStream';

// constants
import sizes from '../../../styles/sizes';
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';

class LiveStreamExperienceContainer extends Component {
  render() {
    const {
      liveExperienceStreams,
      totalLiveExperienceStreamRecord,
      pendingExperiences
    } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      streamContentContainerStyle,
      liveStreamLabelStyle,
      liveStreamNumberStyle,
      liveStreamWrapperStyle,
      liveStreamLabelContainerStyle,
      liveMsgContainerStyle,
      liveMsgWrapperStyle,
      liveMsgStyle,
      goLabelStyle,
      sectionLabelStyle,
      loadingBtnContainerStyle,
      loadingBtnStyle
    } = styles;

    return (
      <div>
        <div style={streamContentContainerStyle}>
          <div style={liveStreamLabelContainerStyle}>
            <span style={liveStreamLabelStyle}>Total:</span>
            <span style={liveStreamNumberStyle}>
              {totalLiveExperienceStreamRecord}
            </span>
          </div>
          {liveExperienceStreams.length ? (
            <div style={liveStreamWrapperStyle}>
              <InfiniteScroll
                pageStart={0}
                loadMore={() => this.props.handleLoadMoreStream()}
                hasMore={
                  totalLiveExperienceStreamRecord > liveExperienceStreams.length
                    ? true
                    : false
                }
                loader={null}
                useWindow={false}
              >
                {liveExperienceStreams.map((stream, index) => (
                  <LiveStream
                    streamTitle={stream.ExperienceTitle}
                    handleRemoveStream={() =>
                      this.props.handleRemoveStream(stream)
                    }
                  />
                ))}
              </InfiniteScroll>
            </div>
          ) : (
            <div style={liveMsgContainerStyle}>
              <div style={liveMsgWrapperStyle}>
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    {pendingExperiences.length ? (
                      <p style={liveMsgStyle}>
                        Click the green{' '}
                        <span style={goLabelStyle}>Go Live</span> button in the
                        below{' '}
                        <span style={sectionLabelStyle}>READY TO STREAM</span>{' '}
                        section
                      </p>
                    ) : (
                      <p style={liveMsgStyle}>
                        There are no ready to stream experience(s) found
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* {
                    totalLiveExperienceStreamRecord > liveExperienceStreams.length ?
                        <div style={loadingBtnContainerStyle}>
                            <a style={loadingBtnStyle}
                                className="dx_glowing_btn"
                                onClick={() => this.props.handleLoadMoreStream()}
                            >Load more</a>
                        </div>
                        :
                        null
                } */}
      </div>
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
    verticalAlign: 'middle',
    textAlign: 'center'
  },
  mainContainerStyle: {
    height: `calc(100vh - ${sizes.headerHeight})`,
    position: 'relative',
    width: '100%'
  },
  topContainerStyle: {
    height: 42,
    paddingTop: 36,
    paddingBottom: 24
  },
  topWrapperStyle: {
    height: 42,
    width: 240,
    float: 'right'
  },
  targetWrapperStyle: {},
  targetLabelStyle: {
    margin: 0,
    fontSize: fonts.h2
  },
  dropdownWrapperStyle: {},
  dropdownBtnStyle: {
    padding: 0,
    textTransform: 'none',
    fontSize: fonts.h2
  },
  expandIconStyle: {
    paddingLeft: 3,
    fontSize: '18px',
    color: colors.blackColor
  },
  dropdownOptionBtnStyle: {
    width: '100%',
    padding: 0,
    textTransform: 'none'
  },
  dropdownMobileBtnStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderBottom: '0.25px solid #D9DDE2',
    paddingLeft: 12,
    paddingRight: 24
  },
  dropdownWebBtnStyle: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  dropdownBtnImgStyle: {
    flex: 1,
    alignSelf: 'center'
  },
  dropdownBtnTextStyle: {
    flex: 8,
    flexDirection: 'column',
    textAlign: 'left',
    marginLeft: 6
  },
  imgStyle: {
    height: 42,
    width: 24
  },
  mobileOptionTopLabelStyle: {
    marginTop: 12,
    marginBottom: 6,
    fontSize: fonts.h3
  },
  mobileOptionBottomLabelStyle: {
    marginTop: 0,
    marginBottom: 12,
    color: colors.lightGreyColor,
    fontSize: fonts.h4
  },
  webOptionTopLabelStyle: {
    marginTop: 0,
    marginBottom: 6,
    fontSize: fonts.h3
  },
  webOptionBottomLabelStyle: {
    margin: 0,
    color: colors.lightGreyColor,
    fontSize: fonts.h4
  },

  comingSoonWrapperStyle: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 32,
    marginLeft: 12
  },
  comingSoonStyle: {
    alignSelf: 'flex-end',
    background: colors.blackColor,
    width: 90,
    padding: 6
  },
  comingSoonLabelStyle: {
    margin: 0,
    fontSize: fonts.h4,
    color: colors.whiteColor
  },

  middleContainerstyle: {
    height: 48,
    display: 'flex',
    border: '1px solid red'
  },
  middleWrapperStyle: {
    flex: '320px 0 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  channelLabelWrapperStyle: {
    height: 36
  },
  channelLabelStyle: {
    color: colors.labelColor,
    fontSize: fonts.h3,
    margin: 0
  },
  capitalChannelLabelStyle: {
    fontSize: fonts.h1,
    fontWeight: 'bold'
  },
  channelFilterContainerStyle: {},
  channelDropdownWrapperStyle: {},
  channelDropdownBtnStyle: {
    textTransform: 'none',
    fontSize: fonts.h4,
    backgroundColor: colors.whiteColor,
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    width: '156px'
  },
  channelFilterOptionContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    height: 36,
    cursor: 'pointer',
    border: '1px solid',
    borderTop: 'none',
    borderColor: colors.borderColor,
    boxSizing: 'border-box'
  },
  channelFilterOptionWrapperStyle: {
    display: 'inline-block',
    margin: '0 auto'
  },
  channelFilterOptionIconContainerStyle: {
    float: 'left',
    width: 14,
    height: 36,
    position: 'relative'
  },
  channelFilterOptionIconStyle: {
    position: 'absolute',
    top: 9,
    left: 0,
    width: 14,
    height: 14
  },
  channelFilterOptionTextContainerStyle: {
    float: 'left',
    height: 36,
    paddingLeft: 3
  },
  channelFilterOptionTextStyle: {
    margin: 0,
    fontSize: fonts.h4,
    color: colors.blackColor
  },
  totalChannelWrapperStyle: {
    paddingRight: 6,
    display: 'flex'
  },
  totalNumberStyle: {
    margin: 0,
    fontSize: fonts.h3,
    color: colors.lightGreyColor
  },
  totalLabelstyle: {
    margin: 0,
    fontSize: fonts.h3,
    color: colors.lightGreyColor,
    marginLeft: 3
  },
  clearFilterContainerStyle: {
    paddingLeft: 48,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  clearFilterStyle: {
    fontSize: fonts.h3,
    color: colors.labelColor,
    textDecoration: 'underline',
    cursor: 'pointer'
  },

  bottomContainerStyle: {
    marginTop: 6,
    height: `calc(100% - 210px)`,
    position: 'relative',
    display: 'flex'
  },
  leftContainerStyle: {
    height: '100%',
    flex: '320px 0 0'
  },
  titleContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12
  },
  leftWrapperStyle: {
    background: colors.whiteColor
  },
  channelSearchContainerStyle: {
    height: '100%'
  },
  searchBarWrapperStyle: {
    borderBottom: '1px solid #D9DDE2',
    height: 48
  },
  searchBarStyle: {
    boxShadow: 'none',
    paddingLeft: 6,
    height: '100%'
  },
  channelInfoWrapperStyle: {
    height: 'calc(100% - 48px)',
    flexDirection: 'column',
    overflowY: 'scroll'
  },
  tipsWrapperStyle: {
    height: 114,
    padding: '12px 12px 0px 12px'
  },
  tipsHeaderStyle: {
    marginBottom: 12,
    marginTop: 0,
    fontSize: fonts.h4
  },
  tipsLabelStyle: {
    fontSize: fonts.h4,
    margin: 0,
    textAlign: 'justify'
  },
  clickHereLinkStyle: {
    color: colors.blueColor,
    cursor: 'pointer'
  },

  rightContainerStyle: {
    height: '100%',
    flex: '892px 0 0',
    paddingLeft: 48
  },
  streamsContainerStyle: {
    height: '100%'
  },
  streamsWrapperStyle: {
    height: '100%'
  },
  currentChannleContainerStyle: {
    backgroundColor: colors.whiteColor,
    padding: 12,
    height: 78,
    marginBottom: 24
  },
  currentChannelNameStyle: {
    margin: 0,
    fontSize: fonts.h1
  },
  currentChannelDescriptionWrapperStyle: {
    height: 42,
    overflowY: 'scroll'
  },
  currentChannelDescriptionStyle: {
    margin: 0,
    marginTop: 12,
    color: colors.lightGreyColor,
    fontSize: fonts.h3
  },
  streamContentContainerStyle: {
    marginTop: 24
  },
  liveStreamLabelContainerStyle: {
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  liveStreamLabelStyle: {
    margin: 0,
    color: colors.labelColor,
    fontSize: fonts.h3
  },
  liveStreamNumberStyle: {
    margin: 0,
    paddingLeft: 12,
    color: colors.labelColor,
    fontSize: fonts.h3
  },
  liveStreamWrapperStyle: {
    height: 613 - 36,
    overflowY: 'auto',
    paddingBottom: 36
  },
  readyToStreamLabelWrapperStyle: {
    marginBottom: 12,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  readyToStreamLabelStyle: {
    margin: 0,
    color: colors.labelColor,
    fontSize: fonts.h3
  },
  readyToStreamNumberStyle: {
    margin: 0,
    paddingLeft: 12,
    color: colors.labelColor,
    fontSize: fonts.h3
  },
  readyToStreamWrapperStyle: {
    overflowY: 'auto',
    height: 'calc(100% - 212px)'
  },

  liveMsgContainerStyle: {
    height: 'calc(100% - 212px)',
    marginBottom: 18
  },
  liveMsgWrapperStyle: {
    height: 72,
    marginBottom: 106,
    border: '1px dotted',
    borderColor: colors.blueBorderColor,
    backgroundColor: colors.whiteColor
  },
  liveMsgStyle: {
    color: colors.greyLabelColor,
    fontSize: fonts.h3,
    margin: 0
  },
  goLabelStyle: {
    color: colors.greenColor,
    fontWeight: 'bold'
  },
  sectionLabelStyle: {
    color: colors.blackColor,
    fontWeight: 'bold'
  },
  pendingMsgContainerStyle: {
    height: 'calc(100% - 212px)'
  },
  pendingMsgWrapperStyle: {
    height: 72,
    marginBottom: 24,
    border: '1px dotted',
    borderColor: colors.blueBorderColor,
    backgroundColor: colors.whiteColor
  },
  pendingMsgStyle: {
    color: colors.greyLabelColor,
    fontSize: fonts.h3,
    margin: 0
  },
  channelMsgContainerStyle: {
    height: 48
  },
  channelMsgStyle: {
    fontSize: fonts.h3,
    color: colors.labelColor
  },

  modalSearchContainerStyle: {
    marginBottom: 18
  },
  modalChannelTabListContainerStyle: {},

  fullBtnStyle: {
    float: 'right',
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'capitalize',
    height: 42,
    borderRadius: '24px'
  },
  addBtnIconStyle: {
    fontSize: '15px',
    paddingRight: 6
  },

  streamTabBarContainerStyle: {
    height: 42,
    width: '100%'
  },
  tabBarContainerStyle: {
    paddingLeft: 24,
    paddingRight: 24,
    height: 42
  },
  tabLabelStyle: {
    margin: 0,
    fontSize: fonts.h3
  },
  loadingBtnContainerStyle: {
    marginTop: 12,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingBtnStyle: {
    padding: '6px 24px',
    borderRadius: '15px',
    color: colors.whiteColor,
    fontSize: fonts.h3
  }
};

export default LiveStreamExperienceContainer;

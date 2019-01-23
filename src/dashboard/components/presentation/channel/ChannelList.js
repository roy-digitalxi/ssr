import React, { Component } from 'react';

// Libraries
import Button from '@material-ui/core/Button';
import DropdownMenu from 'react-dd-menu';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Language from '@material-ui/icons/Language';
import Fingerprint from '@material-ui/icons/Fingerprint';
import Edit from '@material-ui/icons/Edit';
import FlashOn from '@material-ui/icons/FlashOn';

// constants
import colors from '../../../../styles/colors';
import fonts from '../../../../styles/fonts';
import sizes from '../../../../styles/sizes';

// components
import ChannelListInfo from './ChannelListInfo';
import SearchBar from '../../../../components/searchBar/SearchBar';

class ChannelList extends Component {
  state = {
    isMenuOpen: false,
    isChannelTypeMenuOpen: false,
    isChannelStatusMenuOpen: false
  };

  handleToggleMenu = () => {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  };

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  handleToggleImport = () => {
    this.setState({
      isImportOpen: !this.state.isImportOpen
    });
  };

  handleCloseImport = () => {
    this.setState({ isImportOpen: false });
  };

  handleToggleChannelTypeMenu = () => {
    this.setState({
      isChannelTypeMenuOpen: !this.state.isChannelTypeMenuOpen
    });
  };

  handleCloseChannelTypeMenu = () => {
    this.setState({ isChannelTypeMenuOpen: false });
  };

  handleToggleChannelStatusMenu = () => {
    this.setState({
      isChannelStatusMenuOpen: !this.state.isChannelStatusMenuOpen
    });
  };

  handleCloseChannelStatusMenu = () => {
    this.setState({ isChannelStatusMenuOpen: false });
  };

  handleSelectFilter = (type, option) => {
    const { channelTypeFilter, channelStatusFilter } = this.props;

    if (type == 'CHANNEL_TYPE') {
      if (option != channelTypeFilter) {
        this.props.handleSelectFilter(type, option);
      }
    } else if (type == 'CHANNEL_STATUS') {
      if (option != channelStatusFilter) {
        this.props.handleSelectFilter(type, option);
      }
    }
  };

  render() {
    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      mainWrapperStyle,
      topContainerStyle,
      searchBarWrapperSrtyle,

      channelTypeFilterContainerStyle,
      channelTypeFilterLabelContainerStyle,
      channelTypeFilterLabelStyle,
      channelTypeDropdownWrapperStyle,
      channelTypeDropdownBtnStyle,
      channelTypeFilterOptionContainerStyle,
      channelTypeFilterOptionWrapperStyle,
      channelTypeFilterOptionIconContainerStyle,
      channelTypeFilterOptionIconStyle,
      channelTypeFilterOptionTextContainerStyle,
      channelTypeFilterOptionTextStyle,

      channelStatusFilterContainerStyle,
      channelStatusFilterLabelContainerStyle,
      channelStatusFilterLabelStyle,
      channelStatusDropdownWrapperStyle,
      channelStatusDropdownBtnStyle,
      channelStatusFilterOptionContainerStyle,
      channelStatusFilterOptionWrapperStyle,
      channelStatusFilterOptionIconContainerStyle,
      channelStatusFilterOptionIconStyle,
      channelStatusFilterOptionTextContainerStyle,

      channelListInfoContainerStyle,
      channelListInfoWrapperStyle,
      channelListButtonStyle,
      fullBtnStyle,
      channelNumberStyle,
      capitalChannelNumberStyle,
      channelClearFilterStyle,
      dropdownBtnStyle,
      menuItemStyle,
      expandIconStyle,
      channelListContainer
    } = styles;

    const {
      experienceChannels,
      channelNumber,

      searchInputValue,
      channelTypeFilter,
      channelTypeFilterLabel,
      channelStatusFilter,
      channelStatusFilterLabel
    } = this.props;

    return (
      <div style={mainContainerStyle}>
        <div style={mainWrapperStyle}>
          <div style={topContainerStyle}>
            <div style={searchBarWrapperSrtyle}>
              <SearchBar
                isShort={false}
                placeholder="search channel(s)"
                content={searchInputValue}
                handleSearchInputChange={val =>
                  this.props.handleSearchInputChange(val)
                }
              />
            </div>
            <div style={channelTypeFilterContainerStyle}>
              <div style={channelTypeFilterLabelContainerStyle}>
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <p style={channelTypeFilterLabelStyle}>Type</p>
                  </div>
                </div>
              </div>
              <div style={channelTypeDropdownWrapperStyle}>
                <DropdownMenu
                  className="dx_channel_type_filter_menu"
                  isOpen={this.state.isChannelTypeMenuOpen}
                  close={this.handleCloseChannelTypeMenu}
                  toggle={
                    <Button
                      style={Object.assign(
                        {},
                        channelTypeDropdownBtnStyle,
                        !this.state.isChannelTypeMenuOpen
                          ? {
                              borderBottomLeftRadius: '12px',
                              borderBottomRightRadius: '12px'
                            }
                          : {
                              borderTop: '1px solid',
                              borderLeft: '1px solid',
                              borderRight: '1px solid',
                              borderColor: colors.borderColor
                            }
                      )}
                      onClick={() => this.handleToggleChannelTypeMenu()}
                    >
                      {channelTypeFilterLabel}
                      <ExpandMore style={expandIconStyle} />
                    </Button>
                  }
                  align={'center'}
                  size={'md'}
                >
                  <div
                    style={Object.assign(
                      {},
                      channelTypeFilterOptionContainerStyle
                    )}
                    onClick={() =>
                      this.handleSelectFilter('CHANNEL_TYPE', 'ALL')
                    }
                  >
                    <div style={channelTypeFilterOptionWrapperStyle}>
                      <div style={channelTypeFilterOptionTextContainerStyle}>
                        <div style={tableContainerStyle}>
                          <div style={tableWrapperStyle}>
                            <p style={channelTypeFilterOptionTextStyle}>
                              All channel
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={Object.assign(
                      {},
                      channelTypeFilterOptionContainerStyle
                    )}
                    onClick={() =>
                      this.handleSelectFilter('CHANNEL_TYPE', 'PUBLIC')
                    }
                  >
                    <div style={channelTypeFilterOptionWrapperStyle}>
                      <div style={channelTypeFilterOptionIconContainerStyle}>
                        <Language style={channelTypeFilterOptionIconStyle} />
                      </div>
                      <div style={channelTypeFilterOptionTextContainerStyle}>
                        <div style={tableContainerStyle}>
                          <div style={tableWrapperStyle}>
                            <p style={channelTypeFilterOptionTextStyle}>
                              Public channel
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={Object.assign(
                      {},
                      channelTypeFilterOptionContainerStyle,
                      {
                        borderBottomLeftRadius: '12px',
                        borderBottomRightRadius: '12px'
                      }
                    )}
                    onClick={() =>
                      this.handleSelectFilter('CHANNEL_TYPE', 'INVITATION')
                    }
                  >
                    <div style={channelTypeFilterOptionWrapperStyle}>
                      <div style={channelTypeFilterOptionIconContainerStyle}>
                        <Fingerprint style={channelTypeFilterOptionIconStyle} />
                      </div>
                      <div style={channelTypeFilterOptionTextContainerStyle}>
                        <div style={tableContainerStyle}>
                          <div style={tableWrapperStyle}>
                            <p style={channelTypeFilterOptionTextStyle}>
                              Password channel
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenu>
              </div>
            </div>
            <div style={channelStatusFilterContainerStyle}>
              <div style={channelStatusFilterLabelContainerStyle}>
                <div style={tableContainerStyle}>
                  <div style={tableWrapperStyle}>
                    <p style={channelStatusFilterLabelStyle}>Status</p>
                  </div>
                </div>
              </div>
              <div style={channelStatusDropdownWrapperStyle}>
                <DropdownMenu
                  className="dx_channel_filter_menu"
                  isOpen={this.state.isChannelStatusMenuOpen}
                  close={this.handleCloseChannelStatusMenu}
                  toggle={
                    <Button
                      style={Object.assign(
                        {},
                        channelStatusDropdownBtnStyle,
                        !this.state.isChannelStatusMenuOpen
                          ? {
                              borderBottomLeftRadius: '12px',
                              borderBottomRightRadius: '12px'
                            }
                          : {
                              borderTop: '1px solid',
                              borderLeft: '1px solid',
                              borderRight: '1px solid',
                              borderColor: colors.borderColor
                            }
                      )}
                      onClick={() => this.handleToggleChannelStatusMenu()}
                    >
                      {channelStatusFilterLabel}
                      <ExpandMore style={expandIconStyle} />
                    </Button>
                  }
                  align={'center'}
                  size={'md'}
                >
                  <div
                    style={Object.assign(
                      {},
                      channelStatusFilterOptionContainerStyle
                    )}
                    onClick={() =>
                      this.handleSelectFilter('CHANNEL_STATUS', 'ALL')
                    }
                  >
                    <div style={channelStatusFilterOptionWrapperStyle}>
                      <div style={channelStatusFilterOptionTextContainerStyle}>
                        <div style={tableContainerStyle}>
                          <div style={tableWrapperStyle}>
                            <p style={channelTypeFilterOptionTextStyle}>All</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={Object.assign(
                      {},
                      channelStatusFilterOptionContainerStyle
                    )}
                    onClick={() =>
                      this.handleSelectFilter('CHANNEL_STATUS', 'LIVE')
                    }
                  >
                    <div style={channelStatusFilterOptionWrapperStyle}>
                      <div style={channelStatusFilterOptionIconContainerStyle}>
                        <FlashOn
                          style={Object.assign(
                            {},
                            channelStatusFilterOptionIconStyle,
                            { color: colors.greenColor }
                          )}
                        />
                      </div>
                      <div style={channelStatusFilterOptionTextContainerStyle}>
                        <div style={tableContainerStyle}>
                          <div style={tableWrapperStyle}>
                            <p style={channelTypeFilterOptionTextStyle}>Live</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={Object.assign(
                      {},
                      channelStatusFilterOptionContainerStyle,
                      {
                        borderBottomLeftRadius: '12px',
                        borderBottomRightRadius: '12px'
                      }
                    )}
                    onClick={() =>
                      this.handleSelectFilter('CHANNEL_STATUS', 'DRAFT')
                    }
                  >
                    <div style={channelStatusFilterOptionWrapperStyle}>
                      <div style={channelStatusFilterOptionIconContainerStyle}>
                        <Edit style={channelStatusFilterOptionIconStyle} />
                      </div>
                      <div style={channelStatusFilterOptionTextContainerStyle}>
                        <div style={tableContainerStyle}>
                          <div style={tableWrapperStyle}>
                            <p style={channelTypeFilterOptionTextStyle}>
                              Draft
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenu>
              </div>
            </div>
            <div style={channelListButtonStyle}>
              <Button
                variant="Add a new channel"
                style={fullBtnStyle}
                onClick={() => this.props.handleAddChannelClick()}
              >
                Add Channel
              </Button>
            </div>
          </div>

          <div style={channelListInfoContainerStyle}>
            <div style={channelListInfoWrapperStyle}>
              <p style={channelNumberStyle}>
                <span style={capitalChannelNumberStyle}>{channelNumber}</span>{' '}
                Channel(s)
              </p>
              {searchInputValue ||
              channelTypeFilter != 'ALL' ||
              channelStatusFilter != 'ALL' ? (
                <a
                  style={channelClearFilterStyle}
                  onClick={() => this.props.handleClearFilter()}
                >
                  Clear Filter
                </a>
              ) : null}
              {/* <DropdownMenu
                                isOpen={this.state.isMenuOpen}
                                close={this.handleCloseMenu}
                                toggle={
                                    <div>
                                        <Button style={dropdownBtnStyle} onClick={() => this.handleToggleMenu()}>All<ExpandMore style={expandIconStyle} /></Button>
                                    </div>
                                }
                                align={'right'}
                                size={'sm'}
                            >
                                <div>
                                    <p style={menuItemStyle}>First option</p>
                                </div>
                                <div>
                                    <p style={menuItemStyle}>Second option</p>
                                </div>
                            </DropdownMenu> */}
            </div>
          </div>

          <div style={channelListContainer}>
            {experienceChannels.map((channel, index) => (
              <ChannelListInfo
                key={index}
                backgroundColor={channel.ChannelColor}
                channelType={channel.ChannelType}
                channelLabel={channel.ChannelName}
                isLive={channel.ChannelStatus == 'LIVE' ? true : false}
                handleEditChannel={() => this.props.handleEditChannel(channel)}
                handleActiveChannel={() =>
                  this.props.handleActiveChannel(channel)
                }
                handleDeactiveChannel={() =>
                  this.props.handleDeactiveChannel(channel)
                }
              />
            ))}
          </div>
        </div>
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
    verticalAlign: 'middle'
  },
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
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 36,
    paddingBottom: 48
  },
  searchBarWrapperSrtyle: {
    flex: 1
  },

  expandIconStyle: {
    paddingLeft: 3,
    fontSize: '18px',
    color: colors.blackColor
  },
  channelTypeFilterContainerStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  channelTypeFilterLabelContainerStyle: {
    flex: '60px 0 0'
  },
  channelTypeFilterLabelStyle: {
    margin: 0,
    fontSize: fonts.h3,
    color: colors.labelColor,
    textAlign: 'center'
  },
  channelTypeDropdownWrapperStyle: {
    flex: 1
  },
  channelTypeDropdownBtnStyle: {
    textTransform: 'none',
    fontSize: fonts.h4,
    backgroundColor: colors.whiteColor,
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    width: '156px'
  },
  channelTypeFilterOptionContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    height: 36,
    cursor: 'pointer',
    border: '1px solid',
    borderTop: 'none',
    borderColor: colors.borderColor,
    boxSizing: 'border-box'
  },
  channelTypeFilterOptionWrapperStyle: {
    display: 'inline-block',
    margin: '0 auto'
  },
  channelTypeFilterOptionIconContainerStyle: {
    float: 'left',
    width: 14,
    height: 36,
    position: 'relative'
  },
  channelTypeFilterOptionIconStyle: {
    position: 'absolute',
    top: 9,
    left: 0,
    width: 14,
    height: 14
  },
  channelTypeFilterOptionTextContainerStyle: {
    float: 'left',
    height: 36,
    paddingLeft: 3
  },
  channelTypeFilterOptionTextStyle: {
    margin: 0,
    fontSize: fonts.h4,
    color: colors.blackColor,
    textAlign: 'center'
  },

  channelStatusFilterContainerStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  channelStatusFilterLabelContainerStyle: {
    flex: '60px 0 0'
  },
  channelStatusFilterLabelStyle: {
    margin: 0,
    fontSize: fonts.h3,
    color: colors.labelColor,
    textAlign: 'center'
  },
  channelStatusDropdownWrapperStyle: {
    flex: 1
  },
  channelStatusDropdownBtnStyle: {
    textTransform: 'none',
    fontSize: fonts.h4,
    backgroundColor: colors.whiteColor,
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    width: '130px'
  },
  channelStatusFilterOptionContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    height: 36,
    cursor: 'pointer',
    border: '1px solid',
    borderTop: 'none',
    borderColor: colors.borderColor,
    boxSizing: 'border-box'
  },
  channelStatusFilterOptionWrapperStyle: {
    display: 'inline-block',
    margin: '0 auto'
  },
  channelStatusFilterOptionIconContainerStyle: {
    float: 'left',
    width: 14,
    height: 36,
    position: 'relative'
  },
  channelStatusFilterOptionIconStyle: {
    position: 'absolute',
    top: 9,
    left: 0,
    width: 14,
    height: 14
  },
  channelStatusFilterOptionTextContainerStyle: {
    float: 'left',
    height: 36,
    paddingLeft: 3
  },
  channelStatusFilterOptionTextStyle: {
    margin: 0,
    fontSize: fonts.h4,
    color: colors.blackColor
  },

  channelListInfoContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 54
  },
  channelListInfoWrapperStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 240,
    borderBottom: '1px solid',
    borderColor: colors.borderColor
  },
  channelListButtonStyle: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  questionMarkLabelStyle: {
    margin: '0px 12px 0px 15px',
    color: colors.lightGreyColor
  },
  fullBtnStyle: {
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'none'
  },
  dropdownBtnStyle: {
    padding: 0,
    textTransform: 'none',
    fontSize: fonts.h2,
    color: colors.labelColor
  },
  channelNumberStyle: {
    fontSize: fonts.h3,
    color: colors.labelColor
  },
  capitalChannelNumberStyle: {
    fontSize: fonts.h1,
    fontWeight: 'bold'
  },
  channelClearFilterStyle: {
    paddingLeft: 48,
    fontSize: fonts.h3,
    color: colors.labelColor,
    textDecoration: 'underline',
    cursor: 'pointer'
  },
  channelListContainer: {
    overflowY: 'scroll',
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 36
  },
  menuItemStyle: {
    margin: 0,
    paddingTop: 9,
    paddingBottom: 9,
    textAlign: 'center',
    borderBottom: '1px solid',
    borderColor: colors.borderColor
  },
  textFieldStyle: {
    height: 30
  },
  serachIconStyle: {
    height: 18,
    width: 18,
    marginRight: 9,
    color: colors.lightGreyColor
  }
};

export default ChannelList;

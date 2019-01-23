import React, { Component } from 'react';

// component
import ExperienceList from '../presentation/experience/ExperienceList';
import NewExperienceModal from '../presentation/experience/NewExperienceModal';
import SearchBar from '../../../components/searchBar/SearchBar';
import TabBar from '../../../components/tabBar/TabBar';
import DxModal from '../../../components/dxModal/DxModal';
import ConfirmForm from '../presentation/experience/ConfirmForm';

import AllExperienceContainer from './AllExperienceContainer';
import CardOnlyExperienceContainer from './CardOnlyExperienceContainer';
import CardAndPagesExperienceContainer from './CardAndPagesExperienceContainer';

// Libraries
import Button from '@material-ui/core/Button';
import DropdownMenu from 'react-dd-menu';
import Edit from '@material-ui/icons/Edit';
import FlashOn from '@material-ui/icons/FlashOn';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Add from '@material-ui/icons/Add';
import Slide from 'react-reveal/Slide';
import InfiniteScroll from 'react-infinite-scroller';

// redux
import { connect } from 'react-redux';
import {
  dxToggleSearchBar as dxToggleSearchBarAction,
  dxUpdateTabBar as dxUpdateTabBarAction,
  dxFetchMoreExperience as dxFetchMoreExperienceAction,
  dxUpdateExperienceSearch as dxUpdateExperienceSearchAction,
  dxUpdateExperienceFilter as dxUpdateExperienceFilterAction,
  dxClearExperienceFilter as dxClearExperienceFilterAction,
  dxDeleteExperience as dxDeleteExperienceAction
} from '../../actions';
import { dxAlert as dxAlertAction } from '../../../actions';

// constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import sizes from '../../../styles/sizes';

const styles = {
  tableContainerStyle: {
    position: 'relative',
    display: 'table',
    width: '100%',
    height: `calc(100vh - ${sizes.headerHeight})`
  },
  tableContainerStyleV2: {
    display: 'table',
    width: '100%',
    height: `100%`
  },
  tableWrapperStyle: {
    display: 'table-cell',
    verticalAlign: 'middle',
    textAlign: 'center'
  },
  tableWrapperStyleV2: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  newContentContainerStyle: {
    height: `calc(100vh - ${sizes.headerHeight})`,
    width: '100%'
  },
  imgStyle: {
    display: 'block',
    width: 200,
    height: 140,
    margin: '0 auto',
    marginBottom: 36
  },
  labelStyle: {
    fontSize: fonts.h1,
    color: colors.lightGreyColor,
    marginBottom: 36
  },

  mainContainerStyle: {
    overFlowY: 'auto'
  },
  topBarContainerStyle: {
    paddingTop: 36,
    paddingBottom: 36,
    width: '100%'
  },
  topBarWrapperStyle: {
    display: 'flex',
    flexDirection: 'row'
  },
  searchContainerStyle: {
    flex: 2
  },
  tabBarContainerStyle: {
    paddingLeft: 12,
    paddingRight: 24,
    height: 42
  },
  midLabelContainerStyle: {
    flex: '360px 0 0'
  },
  midLabelWrapperStyle: {
    width: 120
  },
  midLabelStyle: {
    color: colors.labelColor,
    margin: 0,
    fontSize: fonts.h3
  },
  capitalMidLabelStyle: {
    fontSize: fonts.h1,
    fontWeight: 'bold'
  },
  clearFilterContainerStyle: {
    paddingLeft: 24,
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
  addBtnContainerStyle: {
    flex: '240px 0 0'
  },
  newAddBtnStyle: {
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'capitalize',
    height: 42,
    borderRadius: '24px'
  },
  addBtnStyle: {
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'capitalize',
    height: 42,
    borderRadius: '24px',
    float: 'right'
  },
  addBtnIconStyle: {
    fontSize: '15px',
    paddingRight: 6
  },
  experienceListContainerStyle: {
    position: 'relative',
    marginBottom: 90
  },
  topSubBarContainerStyle: {
    display: 'flex',
    flexDirection: 'row'
  },
  experienceSortContainerStyle: {
    flex: '180px 0 0'
  },
  experienceNumberContainerStyle: {
    height: 54,
    display: 'flex',
    flexDirection: 'row'
  },
  experienceTypeIndicatorStyle: {
    flex: '36px 0 0',
    height: 54
  },
  experienceNumberWrapperStyle: {
    flex: 1,
    marginLeft: 12,
    borderBottom: '1px solid',
    borderColor: colors.borderColor
  },
  experienceNumberStyle: {
    color: colors.labelColor,
    fontSize: fonts.h3,
    margin: 0
  },
  capitalExperienceNumberStyle: {
    fontSize: fonts.h1,
    fontWeight: 'bold'
  },
  experienceListWrapperStyle: {
    marginTop: 48
  },

  experienceFilterContainerStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },
  experienceFilterWrapperStyle: {
    height: 42,
    width: 130
  },
  expandIconStyle: {
    paddingLeft: 3,
    fontSize: '18px',
    color: colors.blackColor
  },
  experienceDropdownBtnStyle: {
    textTransform: 'none',
    fontSize: fonts.h4,
    backgroundColor: colors.whiteColor,
    borderTopLeftRadius: '12px',
    borderTopRightRadius: '12px',
    width: '130px'
  },
  experienceFilterOptionContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    height: 36,
    cursor: 'pointer',
    border: '1px solid',
    borderTop: 'none',
    borderColor: colors.borderColor,
    boxSizing: 'border-box'
  },
  experienceFilterOptionWrapperStyle: {
    display: 'inline-block',
    margin: '0 auto'
  },
  experienceFilterOptionIconContainerStyle: {
    float: 'left',
    width: 14,
    height: 36,
    position: 'relative'
  },
  experienceFilterOptionIconStyle: {
    position: 'absolute',
    top: 9,
    left: 0,
    width: 14,
    height: 14
  },
  experienceFilterOptionTextContainerStyle: {
    float: 'left',
    height: 36,
    paddingLeft: 3
  },
  experienceFilterOptionTextStyle: {
    margin: 0,
    fontSize: fonts.h4,
    color: colors.blackColor
  },

  confirmModalTitleContainerStyle: {
    marginTop: 60
  },
  confirmModalTitleStyle: {
    margin: 0,
    fontSize: fonts.h1,
    textAlign: 'justify'
  },
  confirmModalHighlightTitleStyle: {
    color: colors.redColor
  },

  loadingBtnContainerStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingBtnStyle: {
    padding: '6px 24px',
    borderRadius: '15px',
    color: colors.whiteColor,
    fontSize: fonts.h3
  },
  tabLabelStyle: {
    margin: 0,
    fontSize: fonts.h3
  }
};

class ExperienceContainer extends Component {
  state = {
    newExperienceModalOpen: false,
    isModalOpen: false,
    modalType: 'DELETE',
    modalTitle: '',
    modalDesc: '',
    isContentModal: false,
    isModalDanger: true,
    targetExperienceGUID: null,
    confirmInput: null,

    isExperienceMenuOpen: false
  };

  componentDidMount() {
    this.props.dxUpdateTabBarAction(0);
  }

  preventParent = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  };

  handleCreateExperience = e => {
    this.preventParent(e);
    this.setState({
      newExperienceModalOpen: true
    });
  };

  handleCloseExperienceModal = () => {
    this.setState({
      newExperienceModalOpen: false
    });
  };

  handleNavigateToNewexperience = val => {
    this.setState({
      newExperienceModalOpen: false
    });
    this.props.history.push(`/new_experience/${val}`);
  };

  handleConfirmFormChange = val => {
    this.setState({
      confirmInput: val
    });
  };

  handleEditExperience = (experienceGUID, confirmToEdit) => {
    if (!confirmToEdit) {
      this.setState({
        isModalOpen: true,
        modalType: 'CONFIRM_EDIT',
        modalDesc: null,
        isContentModal: true,
        isModalDanger: false,
        targetExperienceGUID: experienceGUID,
        confirmInput: null
      });
      return;
    }
    this.props.history.push(`/edit_experience/${experienceGUID}`);
  };

  handleConfirmModal = () => {
    const { modalType, targetExperienceGUID, confirmInput } = this.state;
    if (modalType == 'DELETE') {
      this.handleConfirmDeleteExperience();
    } else if (modalType == 'CONFIRM_EDIT' || modalType == 'CONFIRM_DELETE') {
      if (confirmInput && confirmInput.toUpperCase() == 'LIVE EDIT') {
        if (modalType == 'CONFIRM_EDIT')
          this.props.history.push(`/edit_experience/${targetExperienceGUID}`);
        if (modalType == 'CONFIRM_DELETE') this.handleConfirmDeleteExperience();
      } else {
        this.props.dxAlertAction(
          true,
          true,
          'Please type "LIVE EDIT" in the below text box'
        );
      }
    }
  };

  handleRemoveExperience = (experienceGUID, confirmToRemove) => {
    if (!confirmToRemove) {
      this.setState({
        isModalOpen: true,
        modalType: 'CONFIRM_DELETE',
        modalDesc: null,
        isContentModal: true,
        isModalDanger: false,
        targetExperienceGUID: experienceGUID,
        confirmInput: null
      });
      return;
    }
    this.setState({
      isModalOpen: true,
      modalType: 'DELETE',
      modalTitle: 'Confirm Delete Experience',
      modalDesc: 'Do you want to proceed?',
      isContentModal: false,
      isModalDanger: true,
      targetExperienceGUID: experienceGUID
    });
  };

  handleConfirmDeleteExperience = () => {
    this.setState({
      isModalOpen: false
    });
    const { ActiveTabIndex } = this.props;
    const { targetExperienceGUID } = this.state;
    let experienceType;
    if (ActiveTabIndex == 0) {
      experienceType = 'ALL';
    } else if (ActiveTabIndex == 1) {
      experienceType = 'CARD_ONLY';
    } else if (ActiveTabIndex == 2) {
      experienceType = 'CARD_AND_PAGES';
    }
    this.props.dxDeleteExperienceAction(targetExperienceGUID, experienceType);
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false
    });
  };

  handleActiveSearchBar = e => {
    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();

    this.props.dxToggleSearchBarAction(true);
  };

  handleDeactiveSearchBar = () => {
    this.props.dxToggleSearchBarAction(false);
  };

  handleChangeTab = activeTab => {
    this.props.dxUpdateTabBarAction(activeTab);
  };

  handleSearchInputChange = val => {
    const {
      IsFetching,
      ActiveTabIndex,

      CurrentExperiencesFilter,
      CurrentCardOnlyExperiencesFilter,
      CurrentCardAndPagesExperiencesFilter
    } = this.props;

    let experienceType;
    let filterType;
    if (ActiveTabIndex == 0) {
      experienceType = 'ALL';
      filterType = CurrentExperiencesFilter;
    } else if (ActiveTabIndex == 1) {
      experienceType = 'CARD_ONLY';
      filterType = CurrentCardOnlyExperiencesFilter;
    } else if (ActiveTabIndex == 2) {
      experienceType = 'CARD_AND_PAGES';
      filterType = CurrentCardAndPagesExperiencesFilter;
    }
    if (!IsFetching)
      this.props.dxUpdateExperienceSearchAction(
        val,
        experienceType,
        filterType
      );
  };

  handleLoadMoreExperience = experienceType => {
    const {
      IsFetching,
      ExperienceSearchInput,

      CurrentExperiencesPageIndex,
      CurrentCardOnlyExperiencesPageIndex,
      CurrentCardAndPagesExperiencesPageIndex,

      CurrentExperiencesFilter,
      CurrentCardOnlyExperiencesFilter,
      CurrentCardAndPagesExperiencesFilter
    } = this.props;

    let pageIndex = 0;
    let filterType = 'ALL';
    switch (experienceType) {
      case 'ALL':
        pageIndex = CurrentExperiencesPageIndex;
        filterType = CurrentExperiencesFilter;
        break;
      case 'CARD_ONLY':
        pageIndex = CurrentCardOnlyExperiencesPageIndex;
        filterType = CurrentCardOnlyExperiencesFilter;
        break;
      case 'CARD_AND_PAGES':
        pageIndex = CurrentCardAndPagesExperiencesPageIndex;
        filterType = CurrentCardAndPagesExperiencesFilter;
        break;
      default:
        pageIndex = CurrentExperiencesPageIndex;
        filterType = CurrentExperiencesFilter;
        break;
    }
    if (!IsFetching)
      this.props.dxFetchMoreExperienceAction(
        experienceType,
        pageIndex,
        ExperienceSearchInput,
        filterType
      );
  };

  handleToggleExperienceMenu = () => {
    this.setState({
      isExperienceMenuOpen: !this.state.isExperienceMenuOpen
    });
  };

  handleCloseExperienceMenu = () => {
    this.setState({ isExperienceMenuOpen: false });
  };

  handleSelectFilter = option => {
    const {
      IsFetching,
      ActiveTabIndex,
      ExperienceSearchInput,
      CurrentExperiencesFilter,
      CurrentCardOnlyExperiencesFilter,
      CurrentCardAndPagesExperiencesFilter
    } = this.props;
    if (IsFetching) return;
    if (ActiveTabIndex == 0) {
      if (option != CurrentExperiencesFilter) {
        this.props.dxUpdateExperienceFilterAction(
          'ALL',
          option,
          ExperienceSearchInput
        );
      }
    } else if (ActiveTabIndex == 1) {
      if (option != CurrentCardOnlyExperiencesFilter) {
        this.props.dxUpdateExperienceFilterAction(
          'CARD_ONLY',
          option,
          ExperienceSearchInput
        );
      }
    } else if (ActiveTabIndex == 2) {
      if (option != CurrentCardAndPagesExperiencesFilter) {
        this.props.dxUpdateExperienceFilterAction(
          'CARD_AND_PAGES',
          option,
          ExperienceSearchInput
        );
      }
    }
  };

  handleClearFilter = () => {
    const { IsFetching, ActiveTabIndex } = this.props;
    if (IsFetching) return;
    let experieneType;
    if (ActiveTabIndex == 0) {
      experieneType = 'ALL';
    } else if (ActiveTabIndex == 1) {
      experieneType = 'CARD_ONLY';
    } else if (ActiveTabIndex == 2) {
      experieneType = 'CARD_AND_PAGES';
    }
    this.props.dxClearExperienceFilterAction(experieneType);
  };

  render() {
    const {
      ActiveTabIndex,
      ExperienceSearchInput,

      Experiences,
      CardOnlyExperiences,
      CardAndPagesExperiences,

      TotalExperienceRecord,
      TotalCardOnlyExperienceRecord,
      TotalCardAndPagesExperienceRecord,

      CurrentExperiencesFilter,
      CurrentExperiencesFilterLabel,

      CurrentCardOnlyExperiencesFilter,
      CurrentCardOnlyExperiencesFilterLabel,

      CurrentCardAndPagesExperiencesFilter,
      CurrentCardAndPagesExperiencesFilterLabel
    } = this.props;

    const {
      tableContainerStyle,
      tableContainerStyleV2,
      tableWrapperStyle,
      tableWrapperStyleV2,
      newContentContainerStyle,
      imgStyle,
      labelStyle,
      newAddBtnStyle,
      addBtnStyle,
      addBtnIconStyle,

      mainContainerStyle,
      topBarContainerStyle,
      topBarWrapperStyle,
      searchContainerStyle,
      midLabelContainerStyle,
      midLabelWrapperStyle,
      midLabelStyle,
      capitalMidLabelStyle,
      clearFilterContainerStyle,
      clearFilterStyle,
      addBtnContainerStyle,
      experienceListContainerStyle,
      topSubBarContainerStyle,
      experienceSortContainerStyle,
      experienceNumberContainerStyle,
      experienceTypeIndicatorStyle,
      experienceNumberWrapperStyle,
      experienceNumberStyle,
      capitalExperienceNumberStyle,
      experienceListWrapperStyle,

      expandIconStyle,
      experienceFilterContainerStyle,
      experienceFilterWrapperStyle,
      experienceDropdownBtnStyle,
      experienceFilterOptionContainerStyle,
      experienceFilterOptionWrapperStyle,
      experienceFilterOptionIconContainerStyle,
      experienceFilterOptionIconStyle,
      experienceFilterOptionTextContainerStyle,
      experienceFilterOptionTextStyle,

      confirmModalTitleContainerStyle,
      confirmModalTitleStyle,
      confirmModalHighlightTitleStyle,

      loadingBtnContainerStyle,
      loadingBtnStyle,

      tabBarContainerStyle,
      tabLabelStyle
    } = styles;

    let filterLabel;
    let filterType;
    if (ActiveTabIndex == 0) {
      filterLabel = CurrentExperiencesFilterLabel;
      filterType = CurrentExperiencesFilter;
    } else if (ActiveTabIndex == 1) {
      filterLabel = CurrentCardOnlyExperiencesFilterLabel;
      filterType = CurrentCardOnlyExperiencesFilter;
    } else if (ActiveTabIndex == 2) {
      filterLabel = CurrentCardAndPagesExperiencesFilterLabel;
      filterType = CurrentCardAndPagesExperiencesFilter;
    }

    return (
      <div>
        {ActiveTabIndex == 0 &&
        !TotalExperienceRecord &&
        !ExperienceSearchInput &&
        filterType == 'ALL' ? (
          <div style={newContentContainerStyle}>
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <img
                  style={imgStyle}
                  src={require('../../../../../assets/images/experience.png')}
                />
                <p style={labelStyle}>
                  Let's create an amzing experiences for your audience!
                </p>
                <Button
                  onClick={e => this.handleCreateExperience(e)}
                  style={newAddBtnStyle}
                  variant="Add new experience"
                >
                  Create an experience
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div style={mainContainerStyle}>
            <div style={topBarContainerStyle}>
              <div style={topBarWrapperStyle}>
                <div style={searchContainerStyle}>
                  <div className="dx_search_input_menu_tabs_wrapper">
                    <div
                      className={
                        this.props.IsSearchActive
                          ? 'dx_search_bar dx_active'
                          : 'dx_search_bar'
                      }
                      style={Object.assign(
                        {},
                        this.props.IsSearchActive
                          ? { width: 300 }
                          : { width: 36 }
                      )}
                      onClick={e => this.handleActiveSearchBar(e)}
                    >
                      <SearchBar
                        placeholder="search for card(s) and page(s)"
                        content={ExperienceSearchInput}
                        isSearchActive={this.props.IsSearchActive}
                        handleSearchInputChange={val =>
                          this.handleSearchInputChange(val)
                        }
                        handleDeactiveSearchBar={() =>
                          this.handleDeactiveSearchBar()
                        }
                      />
                    </div>
                    <div className="dx_search_menu_tabs">
                      <div style={tabBarContainerStyle}>
                        <TabBar
                          activeTab={this.props.ActiveTabIndex}
                          onChange={activeTab =>
                            this.handleChangeTab(activeTab)
                          }
                        >
                          <div key="0" style={tableContainerStyleV2}>
                            <div style={tableWrapperStyleV2}>
                              <p style={tabLabelStyle}>ALL</p>
                            </div>
                          </div>
                          <div key="1" style={tableContainerStyleV2}>
                            <div style={tableWrapperStyleV2}>
                              <p style={tabLabelStyle}>COVER</p>
                            </div>
                          </div>
                          <div key="2" style={tableContainerStyleV2}>
                            <div style={tableWrapperStyleV2}>
                              <p style={tabLabelStyle}>COVER + PAGES</p>
                            </div>
                          </div>
                        </TabBar>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={midLabelContainerStyle}>
                  <div style={experienceFilterContainerStyle}>
                    <div
                      style={experienceFilterWrapperStyle}
                      onClick={e => this.preventParent(e)}
                    >
                      <div style={tableContainerStyleV2}>
                        <div style={tableWrapperStyleV2}>
                          <DropdownMenu
                            className="dx_channel_filter_menu"
                            isOpen={this.state.isExperienceMenuOpen}
                            close={this.handleCloseExperienceMenu}
                            toggle={
                              <Button
                                style={Object.assign(
                                  {},
                                  experienceDropdownBtnStyle,
                                  !this.state.isExperienceMenuOpen
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
                                onClick={() =>
                                  this.handleToggleExperienceMenu()
                                }
                              >
                                {filterLabel}
                                <ExpandMore style={expandIconStyle} />
                              </Button>
                            }
                            align={'center'}
                            size={'md'}
                          >
                            <div
                              style={Object.assign(
                                {},
                                experienceFilterOptionContainerStyle
                              )}
                              onClick={() => this.handleSelectFilter('ALL')}
                            >
                              <div style={experienceFilterOptionWrapperStyle}>
                                <div
                                  style={
                                    experienceFilterOptionTextContainerStyle
                                  }
                                >
                                  <div style={tableContainerStyleV2}>
                                    <div style={tableWrapperStyleV2}>
                                      <p
                                        style={experienceFilterOptionTextStyle}
                                      >
                                        All
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              style={Object.assign(
                                {},
                                experienceFilterOptionContainerStyle
                              )}
                              onClick={() => this.handleSelectFilter('LIVE')}
                            >
                              <div style={experienceFilterOptionWrapperStyle}>
                                <div
                                  style={
                                    experienceFilterOptionIconContainerStyle
                                  }
                                >
                                  <FlashOn
                                    style={Object.assign(
                                      {},
                                      experienceFilterOptionIconStyle,
                                      { color: colors.greenColor }
                                    )}
                                  />
                                </div>
                                <div
                                  style={
                                    experienceFilterOptionTextContainerStyle
                                  }
                                >
                                  <div style={tableContainerStyleV2}>
                                    <div style={tableWrapperStyleV2}>
                                      <p
                                        style={experienceFilterOptionTextStyle}
                                      >
                                        Live
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              style={Object.assign(
                                {},
                                experienceFilterOptionContainerStyle,
                                {
                                  borderBottomLeftRadius: '12px',
                                  borderBottomRightRadius: '12px'
                                }
                              )}
                              onClick={() => this.handleSelectFilter('DRAFT')}
                            >
                              <div style={experienceFilterOptionWrapperStyle}>
                                <div
                                  style={
                                    experienceFilterOptionIconContainerStyle
                                  }
                                >
                                  <Edit
                                    style={experienceFilterOptionIconStyle}
                                  />
                                </div>
                                <div
                                  style={
                                    experienceFilterOptionTextContainerStyle
                                  }
                                >
                                  <div style={tableContainerStyleV2}>
                                    <div style={tableWrapperStyleV2}>
                                      <p
                                        style={experienceFilterOptionTextStyle}
                                      >
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
                    </div>
                    {ExperienceSearchInput || filterType != 'ALL' ? (
                      <div
                        style={clearFilterContainerStyle}
                        onClick={e => this.preventParent(e)}
                      >
                        <a
                          style={clearFilterStyle}
                          onClick={() => this.handleClearFilter()}
                        >
                          Clear Filter
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div style={addBtnContainerStyle}>
                  <Button
                    onClick={e => this.handleCreateExperience(e)}
                    style={addBtnStyle}
                    variant="Add new experience"
                  >
                    <Add style={addBtnIconStyle} />
                    Add Content&nbsp;
                  </Button>
                </div>
              </div>
            </div>

            {/* Tab container */}
            {this.props.ActiveTabIndex == 0 ? (
              <Slide right>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={() => this.handleLoadMoreExperience('ALL')}
                  hasMore={
                    TotalExperienceRecord > Experiences.length ? true : false
                  }
                  loader={null}
                >
                  <AllExperienceContainer
                    handleEditExperience={(experienceGUID, confirmToEdit) =>
                      this.handleEditExperience(experienceGUID, confirmToEdit)
                    }
                    handleRemoveExperience={(experienceGUID, confirmToRemove) =>
                      this.handleRemoveExperience(
                        experienceGUID,
                        confirmToRemove
                      )
                    }
                  />
                </InfiniteScroll>
              </Slide>
            ) : null}
            {this.props.ActiveTabIndex == 1 ? (
              <Slide right>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={() => this.handleLoadMoreExperience('CARD_ONLY')}
                  hasMore={
                    TotalCardOnlyExperienceRecord > CardOnlyExperiences.length
                      ? true
                      : false
                  }
                  loader={null}
                >
                  <CardOnlyExperienceContainer
                    handleEditExperience={(experienceGUID, confirmToEdit) =>
                      this.handleEditExperience(experienceGUID, confirmToEdit)
                    }
                    handleRemoveExperience={(experienceGUID, confirmToRemove) =>
                      this.handleRemoveExperience(
                        experienceGUID,
                        confirmToRemove
                      )
                    }
                  />
                </InfiniteScroll>
              </Slide>
            ) : null}
            {this.props.ActiveTabIndex == 2 ? (
              <Slide right>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={() =>
                    this.handleLoadMoreExperience('CARD_AND_PAGES')
                  }
                  hasMore={
                    TotalCardAndPagesExperienceRecord >
                    CardAndPagesExperiences.length
                      ? true
                      : false
                  }
                  loader={null}
                >
                  <CardAndPagesExperienceContainer
                    handleEditExperience={(experienceGUID, confirmToEdit) =>
                      this.handleEditExperience(experienceGUID, confirmToEdit)
                    }
                    handleRemoveExperience={(experienceGUID, confirmToRemove) =>
                      this.handleRemoveExperience(
                        experienceGUID,
                        confirmToRemove
                      )
                    }
                  />
                </InfiniteScroll>
              </Slide>
            ) : null}
          </div>
        )}

        <NewExperienceModal
          open={this.state.newExperienceModalOpen}
          onCloseModal={() => this.handleCloseExperienceModal()}
          navigateToNewexperience={val =>
            this.handleNavigateToNewexperience(val)
          }
        />
        <DxModal
          open={this.state.isModalOpen}
          hasBottomDiv={this.state.modalType == 'DELETE' ? true : false}
          userCustomTitle={this.state.modalType != 'DELETE' ? true : false}
          title={this.state.modalTitle}
          customTitle={
            <div style={confirmModalTitleContainerStyle}>
              <p style={confirmModalTitleStyle}>
                You are going to EDIT a LIVE experience. To avoid accidental
                edits, please type "
                <span style={confirmModalHighlightTitleStyle}>LIVE EDIT</span>"
                in the below text box and Press "EDIT"
              </p>
            </div>
          }
          description={this.state.modalDesc}
          cancel={true}
          confirm={true}
          isContent={this.state.isContentModal}
          content={
            <ConfirmForm
              value={this.state.confirmInput}
              handleInputChange={val => this.handleConfirmFormChange(val)}
              handleConfirmPress={() => this.handleConfirmModal()}
            />
          }
          isDanger={this.state.isModalDanger}
          handleConfirm={() => this.handleConfirmModal()}
          onCloseModal={() => this.handleCloseModal()}
        />
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    dashboard: state.dashboard,

    history: state.root.history,
    IsFetching: state.dashboard.IsFetching,
    IsSearchActive: state.dashboard.IsSearchActive,
    ActiveTabIndex: state.dashboard.ActiveTabIndex,

    Experiences: state.dashboard.Experiences,
    CardOnlyExperiences: state.dashboard.CardOnlyExperiences,
    CardAndPagesExperiences: state.dashboard.CardAndPagesExperiences,

    ExperienceSearchInput: state.dashboard.ExperienceSearchInput,

    TotalExperienceRecord: state.dashboard.TotalExperienceRecord,
    TotalCardOnlyExperienceRecord:
      state.dashboard.TotalCardOnlyExperienceRecord,
    TotalCardAndPagesExperienceRecord:
      state.dashboard.TotalCardAndPagesExperienceRecord,

    CurrentExperiencesPageIndex: state.dashboard.CurrentExperiencesPageIndex,
    CurrentExperiencesFilter: state.dashboard.CurrentExperiencesFilter,
    CurrentExperiencesFilterLabel:
      state.dashboard.CurrentExperiencesFilterLabel,

    CurrentCardOnlyExperiencesPageIndex:
      state.dashboard.CurrentCardOnlyExperiencesPageIndex,
    CurrentCardOnlyExperiencesFilter:
      state.dashboard.CurrentCardOnlyExperiencesFilter,
    CurrentCardOnlyExperiencesFilterLabel:
      state.dashboard.CurrentCardOnlyExperiencesFilterLabel,

    CurrentCardAndPagesExperiencesPageIndex:
      state.dashboard.CurrentCardAndPagesExperiencesPageIndex,
    CurrentCardAndPagesExperiencesFilter:
      state.dashboard.CurrentCardAndPagesExperiencesFilter,
    CurrentCardAndPagesExperiencesFilterLabel:
      state.dashboard.CurrentCardAndPagesExperiencesFilterLabel
  };
};

const dispatchToProps = {
  dxToggleSearchBarAction,

  dxUpdateTabBarAction,
  dxFetchMoreExperienceAction,

  dxUpdateExperienceSearchAction,
  dxUpdateExperienceFilterAction,
  dxClearExperienceFilterAction,
  dxDeleteExperienceAction,

  dxAlertAction
};

export default connect(
  stateToProps,
  dispatchToProps
)(ExperienceContainer);

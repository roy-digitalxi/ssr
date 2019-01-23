import React, { Component } from 'react';

// Component
import ExperienceList from '../presentation/experience/ExperienceList';

// redux
import { connect } from 'react-redux';
import {} from '../../actions';
import {} from '../../../actions';

// constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import sizes from '../../../styles/sizes';

class CardOnlyExperienceContainer extends Component {
  render() {
    const { TotalCardOnlyExperienceRecord, CardOnlyExperiences } = this.props;

    const {
      tableContainerStyleV2,
      tableWrapperStyleV2,

      experienceListContainerStyle,
      topSubBarContainerStyle,
      experienceSortContainerStyle,
      experienceNumberContainerStyle,
      experienceNumberWrapperStyle,
      experienceNumberStyle,
      capitalExperienceNumberStyle,
      experienceListWrapperStyle,

      loadingBtnContainerStyle,
      loadingBtnStyle
    } = styles;

    return (
      <div style={experienceListContainerStyle}>
        <div style={topSubBarContainerStyle}>
          <div style={experienceSortContainerStyle}>
            <div style={experienceNumberContainerStyle}>
              <div style={experienceNumberWrapperStyle}>
                <div style={tableContainerStyleV2}>
                  <div style={tableWrapperStyleV2}>
                    <p style={experienceNumberStyle}>
                      <span style={capitalExperienceNumberStyle}>
                        {TotalCardOnlyExperienceRecord}
                      </span>{' '}
                      Journey(s)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={experienceListWrapperStyle}>
          <ExperienceList
            isCardOnly={true}
            experiences={CardOnlyExperiences}
            handleEditExperience={(experienceGUID, confirmToEdit) =>
              this.props.handleEditExperience(experienceGUID, confirmToEdit)
            }
            handleRemoveExperience={(experienceGUID, confirmToRemove) =>
              this.props.handleRemoveExperience(experienceGUID, confirmToRemove)
            }
            handleErrorMsg={msg => {}}
          />
          {/* {
                        CardOnlyExperiences &&
                            TotalCardOnlyExperienceRecord > CardOnlyExperiences.length ?
                            <div style={loadingBtnContainerStyle}>
                                <a style={loadingBtnStyle}
                                    className="dx_glowing_btn"
                                    onClick={() => this.props.handleLoadMoreExperience()}
                                >Load more</a>
                            </div>
                            :
                            null
                    } */}
        </div>
      </div>
    );
  }
}

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
    paddingBottom: 48,
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
    paddingLeft: 24,
    paddingRight: 24,
    height: 42
  },
  midLabelContainerStyle: {
    flex: '240px 0 0',
    border: '1px solid red'
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
    flex: '240px 0 0',
    border: '1px solid green'
  },
  addBtnStyle: {
    backgroundColor: colors.blueColor,
    color: colors.whiteColor,
    textTransform: 'capitalize',
    height: 42,
    borderRadius: '24px'
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
    flex: 1
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
    flex: 1
  },
  experienceFilterWrapperStyle: {
    height: 54,
    paddingLeft: 120
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

const stateToProps = state => {
  return {
    TotalCardOnlyExperienceRecord:
      state.dashboard.TotalCardOnlyExperienceRecord,
    CardOnlyExperiences: state.dashboard.CardOnlyExperiences,
    CurrentCardOnlyExperiencesPageIndex:
      state.dashboard.CurrentCardOnlyExperiencesPageIndex,
    CurrentCardOnlyExperiencesFilter:
      state.dashboard.CurrentCardOnlyExperiencesFilter,
    CurrentCardOnlyExperiencesFilterLabel:
      state.dashboard.CurrentCardOnlyExperiencesFilterLabel
  };
};

const dispatchToProps = {};

export default connect(
  stateToProps,
  dispatchToProps
)(CardOnlyExperienceContainer);

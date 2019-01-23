import React, { Component } from 'react';

// Libraries
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import FlashOn from '@material-ui/icons/FlashOn';
import FilterNone from '@material-ui/icons/FilterNone';

// constatnt
import fonts from '../../../../styles/fonts';
import colors from '../../../../styles/colors';

// components
import ExperienceCase from './ExperienceCase';

class ExperienceList extends Component {
  render() {
    const { isCardOnly, experiences } = this.props;

    const {
      expTableContainerStyle,
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      experienceContainerStyle,
      experienceWrapperStyle,
      statusContainerStyle,
      descContainerStyle,
      descCardTypeContainerStyle,
      descCardTypeWrapperStyle,
      descCardTypeStyle,
      descPageDetailContainerStyle,
      descPageDetailIconStyle,
      descPageDetailStyle,
      statusWrapperStyle,
      statusLabelContainerStyle,
      flashonIconStyle,
      editIconStyle,

      newExperienceContainerStyle,
      newExperienceWrapperStyle,
      imgStyle,
      iconContainerStyle,
      addIconStyle,
      newExperienceLabelContainerStyle,
      newExperienceLabelStyle,

      notFoundContainerStyle,
      notFoundImgStyle,
      notFoundLabelStyle
    } = styles;

    return (
      <div style={mainContainerStyle}>
        {experiences.map(experience => (
          <div style={Object.assign({}, experienceContainerStyle)}>
            <div style={experienceWrapperStyle}>
              <ExperienceCase
                experience={experience}
                handleLoadHtml={(pageGUID, sectionGUID, guid) =>
                  this.props.handleLoadHtml(
                    experience.ExperienceGUID,
                    pageGUID,
                    sectionGUID,
                    guid
                  )
                }
                handleEditExperience={() =>
                  this.props.handleEditExperience(
                    experience.ExperienceGUID,
                    experience.ExperienceStreamList.length ? false : true
                  )
                }
                handleRemoveExperience={() =>
                  this.props.handleRemoveExperience(
                    experience.ExperienceGUID,
                    experience.ExperienceStreamList.length ? false : true
                  )
                }
                handleErrorMsg={msg => this.props.handleErrorMsg(msg)}
              />
            </div>
            <div style={statusContainerStyle}>
              <div style={descContainerStyle}>
                <div style={descCardTypeContainerStyle}>
                  <div style={descCardTypeWrapperStyle}>
                    <p style={descCardTypeStyle}>
                      {experience.ExperienceType == '0'
                        ? 'card'
                        : 'card + page'}
                    </p>
                  </div>
                </div>
                {experience.ExperienceType == '1' ? (
                  <div style={descPageDetailContainerStyle}>
                    <FilterNone style={descPageDetailIconStyle} />
                    <span style={descPageDetailStyle}>
                      {experience.ExperiencePageNumber}
                    </span>
                  </div>
                ) : null}
              </div>
              <div style={statusWrapperStyle}>
                <div style={statusLabelContainerStyle}>
                  {experience.ExperienceStreamList.length ? (
                    <FlashOn style={flashonIconStyle} />
                  ) : (
                    <Edit style={editIconStyle} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {!experiences.length ? (
          <div style={notFoundContainerStyle}>
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <img
                  style={notFoundImgStyle}
                  src={require('../../../../../../assets/images/no_results_illustration.png')}
                />
                <p style={notFoundLabelStyle}>No results found</p>
              </div>
            </div>
          </div>
        ) : null}
        {/* <div style={newExperienceContainerStyle}>
                    <div style={expTableContainerStyle}>
                        <div style={tableWrapperStyle}>
                            <div
                                style={newExperienceWrapperStyle}
                                onClick={() => this.props.handleCreateExpClick()}
                            >
                                <div style={Object.assign({}, tableContainerStyle, { height: newExpSize })}>
                                    <div style={tableWrapperStyle}>
                                        <img
                                            style={imgStyle}
                                            src={require('../../../../../../assets/images/card_exp.png')} />
                                    </div>
                                </div>
                                <div style={iconContainerStyle}>
                                    <Add style={addIconStyle} />
                                </div>
                                <div style={newExperienceLabelContainerStyle}>
                                    <p style={newExperienceLabelStyle}>ADD EXPERIENCE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
      </div>
    );
  }
}

const newExpSize = 72;
const styles = {
  expTableContainerStyle: {
    position: 'relative',
    display: 'table',
    width: '100%'
  },
  tableContainerStyle: {
    position: 'relative',
    display: 'table',
    width: '100%',
    height: '100%'
  },
  tableWrapperStyle: {
    display: 'table-cell',
    verticalAlign: 'middle'
  },
  mainContainerStyle: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  experienceContainerStyle: {
    flex: '276px 0 0',
    marginRight: 36,
    marginBottom: 36
  },
  experienceWrapperStyle: {
    width: 276,
    marginBottom: 24,
    cursor: 'pointer'
  },
  statusContainerStyle: {
    height: 18,
    display: 'flex',
    flexDirection: 'row'
  },
  descContainerStyle: {
    flex: 1,
    height: 18,
    display: 'flex',
    flexDirection: 'row'
  },
  descCardTypeContainerStyle: {
    flex: 1,
    height: 18
  },
  descCardTypeWrapperStyle: {
    display: 'inline-block',
    borderRadius: '9px',
    backgroundColor: colors.darkGreyColor
  },
  descCardTypeStyle: {
    margin: 0,
    padding: '3px 12px',
    color: colors.whiteColor,
    fontSize: fonts.h4
  },
  descPageDetailContainerStyle: {
    flex: 1,
    height: 18,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  descPageDetailIconStyle: {
    fontSize: '18px',
    color: colors.greyLabelColor
  },
  descPageDetailStyle: {
    margin: 0,
    paddingLeft: 3,
    fontSize: fonts.h3,
    color: colors.greyLabelColor
  },

  statusWrapperStyle: {
    height: 18,
    flex: '24px 0 0'
  },
  statusLabelContainerStyle: {
    width: 24,
    height: 18,
    backgroundColor: colors.whiteColor,
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flashonIconStyle: {
    color: colors.greenColor,
    fontSize: '14px'
  },
  editIconStyle: {
    color: colors.greyLabelColor,
    fontSize: '14px'
  },
  newExperienceContainerStyle: {
    flex: '276px 0 0'
  },
  newExperienceWrapperStyle: {
    position: 'relative',
    width: 120,
    height: newExpSize,
    borderRadius: 12,
    backgroundColor: colors.whiteColor,
    border: '1px dotted',
    borderColor: colors.blueBorderColor,
    cursor: 'pointer',
    margin: '0 auto'
  },
  imgStyle: {
    display: 'block',
    width: 90,
    height: 60,
    margin: '0 auto'
  },
  iconContainerStyle: {
    position: 'absolute',
    right: -9,
    bottom: -9
  },
  addIconStyle: {
    fontSize: 18,
    color: colors.blueColor
  },
  newExperienceLabelContainerStyle: {
    height: 18
  },
  newExperienceLabelStyle: {
    margin: 0,
    marginTop: 6,
    fontSize: fonts.h4,
    textAlign: 'center'
  },

  notFoundContainerStyle: {
    width: '100%'
  },
  notFoundImgStyle: {
    display: 'block',
    margin: '0 auto',
    marginBottom: 36
  },
  notFoundLabelStyle: {
    margin: 0,
    fontSize: '18px',
    color: colors.greyLabelColor,
    textAlign: 'center'
  }
};

export default ExperienceList;

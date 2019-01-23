import React, { Component } from 'react';
import PropTypes from 'prop-types';

//Components
import LanguageItem from '../../../language/components/presentation/LanguageItem';
import Loading from '../../../components/loading/Loading';

// Libraries
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';

// redux
import { connect } from 'react-redux';
import actions from '../../../language/actions';

// Constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import sizes from '../../../styles/sizes';

const themeStyles = theme => ({
  root: {
    width: 1260,
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 1260
  }
});

class LanguageContainer extends Component {
  static propTypes = {
    getLanguageListRequest: PropTypes.func,
    menuToggle: PropTypes.func,
    languages: PropTypes.array,
    languageGUID: PropTypes.func,
    isLoading: PropTypes.bool,
    menuOpen: PropTypes.bool,
    menuID: PropTypes.string
  };

  componentDidMount = () => {
    const data = {
      Limit: '-1',
      Offset: '0'
    };
    this.props.getLanguageListRequest(data);
  };

  preventParent = event => {
    // Prevent parent event
    if (!event) var event = window.event;
    event.cancelBubble = true;
    if (event.stopPropagation) event.stopPropagation();
  };

  handleCreateLanguage = () => {
    this.props.history.push('/add_language');
  };

  handleSetDefault = languageGUID => {
    this.props.setDefaultRequest(languageGUID);
  };

  handleSetActive = (languageGUID, isActive) => {
    this.props.setIsActiveRequest(languageGUID, isActive);
  };

  handleUpdateLanguage = languageGUID => {
    this.props.history.push(`/edit_language/${languageGUID}`);
  };

  renderLanguages = languages => {
    const { menuOpen, menuID } = this.props;

    return languages.map(language => (
      <LanguageItem
        key={language.LanguageGUID}
        language={language}
        handleSetDefault={languageGUID => this.handleSetDefault(languageGUID)}
        handleSetActive={(languageGUID, isActive) =>
          this.handleSetActive(languageGUID, isActive)
        }
        handleUpdateLanguage={languageGUID =>
          this.handleUpdateLanguage(languageGUID)
        }
        menuOpen={menuOpen}
        menuID={menuID}
        handleToggleMenu={(toggle, languageGUID) =>
          this.handleToggleMenu(toggle, languageGUID)
        }
      />
    ));
  };

  render() {
    const {
      mainContainerStyle,

      topContainerStyle,
      topWrapperStyle,
      fullBtnStyle,
      addBtnIconStyle,

      languageListContainerStyle
    } = styles;

    const {
      classes,
      languages: { languages, isLoading }
    } = this.props;

    return (
      <div style={mainContainerStyle} onClick={e => this.preventParent(e)}>
        <div style={topContainerStyle}>
          <div style={topWrapperStyle}>
            <Button
              variant="create language"
              style={fullBtnStyle}
              onClick={() => this.handleCreateLanguage()}
            >
              <Add style={addBtnIconStyle} />
              Add new language
            </Button>
          </div>
        </div>

        <Paper className={classes.root} style={languageListContainerStyle}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Language</TableCell>
                <TableCell numeric>IsActive</TableCell>
                <TableCell numeric>IsDefault</TableCell>
                <TableCell numeric>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <Loading isLoading={isLoading} />
              ) : (
                this.renderLanguages(languages)
              )}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    height: `calc(100vh - ${sizes.headerHeight})`,
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

  languageListContainerStyle: {
    margin: '0 auto'
  }
};

const stateToProps = state => ({
  history: state.root.history,
  languages: state.languages,
  menuOpen: state.languages.menuOpen,
  menuID: state.languages.menuID,
  message: state.languages.message
});

const dispatchToProps = dispatch => ({
  getLanguageListRequest: data =>
    dispatch(actions.getLanguageListRequest(data)),
  setIsActiveRequest: (languageGUID, isActive) =>
    dispatch(actions.setIsActiveRequest(languageGUID, isActive)),
  setDefaultRequest: languageGUID =>
    dispatch(actions.setDefaultRequest(languageGUID))
});

export default connect(
  stateToProps,
  dispatchToProps
)(withStyles(themeStyles)(LanguageContainer));

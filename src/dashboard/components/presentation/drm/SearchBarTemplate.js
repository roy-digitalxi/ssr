import React, { Component } from 'react';

// libraries
import SearchBar from 'material-ui-search-bar';
import { withStyles } from '@material-ui/core/styles';

const themeStyles = () => ({
  yourIconButtonStyle: {
    height: 36
  }
});

class SearchBarTemplate extends Component {
  render() {
    const { classes } = this.props;

    const { searchUserStyle } = styles;

    return (
      <SearchBar
        style={searchUserStyle}
        placeholder={'Search a user'}
        classes={{ iconButton: classes.yourIconButtonStyle }}
      />
    );
  }
}

const styles = {
  searchUserStyle: {
    width: '100%',
    boxShadow: 'none',
    borderWidth: 1,
    borderColor: '#d2d8de',
    borderStyle: 'solid',
    paddingLeft: 6,
    height: '100%'
  }
};

export default withStyles(themeStyles)(SearchBarTemplate);

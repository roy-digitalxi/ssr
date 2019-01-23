import React, { Component } from 'react';

// constants
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

// Libraries
import Search from '@material-ui/icons/Search';
import Close from '@material-ui/icons/Close';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

class SearchBar extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isSearchActive) {
      this.searchInput.focus();
    }
  }

  handleValueChange = event => {
    let val = event.target.value;
    this.props.handleSearchInputChange(val);
  };

  handleClearContent = () => {
    this.props.handleSearchInputChange('');
    setTimeout(() => {
      this.searchInput.blur();
      setTimeout(() => {
        this.props.handleDeactiveSearchBar();
      }, 100);
    }, 100);
  };

  handleFocusInput = () => {
    this.searchInput.focus();
  };

  render() {
    const { placeholder, content } = this.props;

    const {
      searchBarConatinerStyle,
      searchIconStyle,
      searchBarWrapperStyle,
      closeBtnWrapperStyle,
      searchBarStyle,
      closeBtnStyle
    } = styles;

    return (
      <div style={searchBarConatinerStyle}>
        <Search
          style={searchIconStyle}
          onClick={() => this.handleFocusInput()}
        />
        <div style={searchBarWrapperStyle}>
          <input
            className="dx_search_input"
            ref={input => (this.searchInput = input)}
            placeholder={placeholder}
            style={searchBarStyle}
            value={content}
            onChange={event => this.handleValueChange(event)}
          />
          {content && this.props.isSearchActive ? (
            <InputAdornment style={closeBtnWrapperStyle} position="end">
              <IconButton
                aria-label="Empty search field"
                style={closeBtnStyle}
                onClick={() => this.handleClearContent()}
              >
                <Close />
              </IconButton>
            </InputAdornment>
          ) : null}
        </div>
      </div>
    );
  }
}

const styles = {
  searchBarConatinerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: 36
  },
  searchIconStyle: {
    marginTop: 6,
    height: 36,
    width: 36,
    cursor: 'pointer',
    color: colors.lightGreyColor
  },
  searchBarWrapperStyle: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    height: '100%',
    paddingLeft: 12
  },
  searchBarStyle: {
    display: 'block',
    height: 32,
    width: 'calc(100% - 24px)',
    fontSize: fonts.h3,
    // paddingRight: 24,
    paddingLeft: 0
  },
  closeBtnWrapperStyle: {
    position: 'absolute',
    right: -6,
    top: 0,
    zIndex: 99
  },
  closeBtnStyle: {
    color: colors.lightGreyColor,
    width: 36,
    height: 36
  }
};

export default SearchBar;

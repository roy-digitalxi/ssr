import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

// constants
import sizes from '../../../styles/sizes';
import colors from '../../../styles/colors';

class LanguageInput extends Component {
  static propTypes = {};

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { classes, label } = this.props;

    return (
      <TextField
        id="outlined-name"
        label={label}
        name={label}
        className={classes.textField}
        // value={this.state.name}
        onChange={this.handleInputChange}
        margin="normal"
        variant="outlined"
      />
    );
  }
}

const styles = {};

const rootStyles = theme => ({
  textField: {
    marginRight: theme.spacing.unit,
    marginTop: 0,
    marginBottom: 0
  }
});

export default withStyles(rootStyles)(LanguageInput);

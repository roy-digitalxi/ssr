import React, { Component } from 'react';

// Libraries
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import DropdownList from 'react-widgets/lib/DropdownList';
import 'react-widgets/dist/css/react-widgets.css';
import '../../../../../assets/css/react-widget/index.css';

// components
import DxInput from '../../../components/dxInput/DxInput';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

class DxButtonConnector extends Component {
  handleBtnConnectPageChange = page => {
    this.props.handleBtnConnectPageChange(page.PageGUID);
  };

  render() {
    const { dropdownOptionArr, defaultConnectorPage } = this.props;

    const {
      mainContainerStyle,
      mainWrapperStyle,
      tableContainerStyle,
      tableWrapperStyle,
      contentContainerStyle,
      leftContentContainerStyle,
      rightIconContainerStyle,
      expandIconStyle,

      connectorListContainerStyle,
      connectorListWrapperStyle,
      connectorLabelContainerStyle,
      connectorLabelStyle,
      connectorDropdownContainerStyle,
      connectorDropdownStyle
    } = styles;

    return (
      <div style={mainContainerStyle}>
        <div style={mainWrapperStyle}>
          <div style={contentContainerStyle}>
            <div style={leftContentContainerStyle}>
              <div style={tableContainerStyle}>
                <div style={tableWrapperStyle}>
                  <DxInput
                    multiLine={true}
                    placeholder="Text for a button"
                    handleValChange={e => this.props.handleBtnInputChange(e)}
                    width="264px"
                    maxHeight="360px"
                    marginTop="18px"
                    isTransparent={true}
                    disabled={false}
                    value={this.props.btnContent}
                    isRounded={true}
                  />
                </div>
              </div>
            </div>
            <div style={rightIconContainerStyle}>
              <div style={tableContainerStyle}>
                <div style={tableWrapperStyle}>
                  <KeyboardArrowRight style={expandIconStyle} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={connectorListContainerStyle}>
          <div style={tableContainerStyle}>
            <div style={tableWrapperStyle}>
              <div style={connectorListWrapperStyle}>
                <div style={connectorLabelContainerStyle}>
                  <p style={connectorLabelStyle}>Connect another page</p>
                </div>
                <div style={connectorDropdownContainerStyle}>
                  <DropdownList
                    placeholder="select a page"
                    style={connectorDropdownStyle}
                    data={dropdownOptionArr}
                    value={defaultConnectorPage ? defaultConnectorPage : null}
                    textField="Title"
                    onChange={page => this.handleBtnConnectPageChange(page)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    position: 'relative',
    minHeight: 72,
    maxHeight: 360,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: colors.greyColor,
    cursor: 'default',
    width: 320,
    boxSizing: 'border-box',
    margin: '0 auto'
  },
  mainWrapperStyle: {
    flex: 1
  },
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
  contentContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%'
  },
  leftContentContainerStyle: {
    flex: 1
  },
  rightIconContainerStyle: {
    flex: '18px 0 0'
  },
  expandIconStyle: {
    paddingRight: 6,
    fontSize: 24,
    float: 'right'
  },
  connectorListContainerStyle: {
    position: 'absolute',
    top: 0,
    right: -204,
    width: 180,
    height: '100%'
  },
  connectorListWrapperStyle: {
    height: 72,
    backgroundColor: colors.lightBlueColor
  },
  connectorLabelContainerStyle: {
    padding: 12,
    paddingBottom: 9
  },
  connectorLabelStyle: {
    margin: 0,
    fontSize: fonts.h3
  },
  connectorDropdownContainerStyle: {
    paddingLeft: 9,
    paddingRight: 18
  },
  connectorDropdownStyle: {
    height: 24
  }
};

export default DxButtonConnector;

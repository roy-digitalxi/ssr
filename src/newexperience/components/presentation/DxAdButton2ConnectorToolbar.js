import React, { Component } from 'react';

// Libraries
import ColorPicker from 'rc-color-picker';
import '../../../../../assets/css/rc-color-picker/rc-color-picker.css';

// Components
import DxTextEditorToolbar from './DxTextEditorToolbar';

// config
import config from '../../../config';

class DxAdButton2ConnectorToolbar extends Component {
  render() {
    const { activeElemType, bgColor, color, sectionGUID } = this.props;

    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      optionContainerStyle
    } = styles;

    return (
      <div className={activeElemType ? 'dx_show_toolbar' : 'dx_hidden_toolbar'}>
        <div style={tableContainerStyle}>
          <div style={tableWrapperStyle}>
            <div style={mainContainerStyle}>
              {/* BACKGROUND_COLOR */}
              <div
                className={
                  activeElemType == 'BACKGROUND_COLOR' ? 'dx_show' : 'dx_hidden'
                }
                style={optionContainerStyle}
              >
                <ColorPicker
                  animation="slide-up"
                  color={bgColor}
                  onChange={colors => this.props.handleBgColorChange(colors)}
                />
              </div>
              {/* TOOL */}
              <div
                className={activeElemType == 'TOOL' ? 'dx_show' : 'dx_hidden'}
                style={optionContainerStyle}
              >
                <ColorPicker
                  animation="slide-up"
                  color={color}
                  onChange={colors => this.props.handleColorChange(colors)}
                />
              </div>
              {/* TEXT */}
              {activeElemType == 'TEXT' ? (
                <div
                  className={activeElemType == 'TEXT' ? 'dx_show' : 'dx_hidden'}
                >
                  <DxTextEditorToolbar sectionGUID={sectionGUID} />
                </div>
              ) : null}
            </div>
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
    height: 36,
    display: 'flex',
    flexDirection: 'row'
  },
  optionContainerStyle: {
    width: 36,
    height: 36,
    marginLeft: 6,
    marginRight: 6,
    boxShadow:
      '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  }
};

export default DxAdButton2ConnectorToolbar;

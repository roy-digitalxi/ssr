import React, { Component } from 'react';

// constants
import colors from '../../../styles/colors';

class DxTextEditorToolbar extends Component {
  render() {
    const {
      tableContainerStyle,
      tableWrapperStyle,
      toolDivisionStyle
    } = styles;

    return (
      <div>
        <div
          id={'toolbar-' + this.props.sectionGUID}
          style={{ textAlign: 'left', marginLeft: 6 }}
        >
          <span class="ql-formats">
            <select class="ql-font">
              <option value="Open_Sans" selected>
                Open Sans
              </option>
              <option value="Roboto">Roboto</option>
              <option value="Lato">Lato</option>
              <option value="Raleway">Raleway</option>
              <option value="Ubuntu">Ubuntu</option>
              <option value="Monoton">Monoton</option>
            </select>
          </span>
          <span class="ql-formats">
            <select class="ql-size">
              <option value="12px" selected>
                12
              </option>
              <option value="16px">16</option>
              <option value="20px">20</option>
              <option value="24px">24</option>
              <option value="28px">28</option>
            </select>
          </span>
          <span class="ql-formats">
            <span style={toolDivisionStyle} />
          </span>
          <span class="ql-formats dx_tool_bar_color">
            <select className="ql-color" />
          </span>
          <span class="ql-formats">
            <select className="ql-align" />
          </span>
          <span class="ql-formats">
            <span style={toolDivisionStyle} />
          </span>
          <span class="ql-formats dx_tool_bar_font">
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
          </span>
          <span class="ql-formats">
            <span style={toolDivisionStyle} />
          </span>
          <span class="ql-formats">
            <button className="ql-clean" />
          </span>
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
  toolDivisionStyle: {
    display: 'inline-block',
    height: 36,
    borderRight: '1px solid',
    borderColor: colors.toolbarBorderColor
  }
};

export default DxTextEditorToolbar;

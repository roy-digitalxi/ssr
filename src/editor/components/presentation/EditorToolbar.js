import React, { Component } from 'react';

// Constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import sizes from '../../../styles/sizes';

class EditorToolbar extends Component {
  state = {
    editorHtml: ''
  };

  handleChange = html => {
    this.setState({ editorHtml: html });
    this.props.handleHtmlUpdate(this.state.editorHtml, this.props.activeIndex);
  };

  render() {
    const { activeIndex, currentActiveIndex } = this.props;

    return (
      <div>
        {activeIndex === currentActiveIndex ? (
          <div style={styles.tableContainerStyle}>
            <div style={styles.tableWrapperStyle}>
              <div
                id={'toolbar-' + activeIndex}
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
                    <option value="12px">12</option>
                    <option value="16px" selected>
                      16
                    </option>
                    <option value="20px">20</option>
                    <option value="24px">24</option>
                    <option value="28px">28</option>
                  </select>
                </span>
                <span class="ql-formats">
                  <span style={styles.toolDivisionStyle} />
                </span>
                <span class="ql-formats dx_tool_bar_color dx_tool_tip">
                  <select className="ql-color" />
                  {/* <span class="dx_tool_tip_text dx_color_tip">Text</span> */}
                </span>
                <span class="ql-formats">
                  <select className="ql-align" />
                </span>
                <span class="ql-formats">
                  <span style={styles.toolDivisionStyle} />
                </span>
                <span class="ql-formats dx_tool_bar_font">
                  <button className="ql-bold" />
                  <button className="ql-italic" />
                  <button className="ql-underline" />
                </span>
                <span class="ql-formats">
                  <span style={styles.toolDivisionStyle} />
                </span>
                <span class="ql-formats dx_tool_bar_bgcolor dx_tool_tip">
                  <select className="ql-background" />
                  {/* <span class="dx_tool_tip_text dx_bg_color_tip">Background</span> */}
                </span>
                <span class="ql-formats">
                  <button className="ql-clean" />
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p>i am not render toolbar</p>
        )}
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
    height: 48,
    borderRight: '1px solid',
    borderColor: colors.toolbarBorderColor
  }
};

export default EditorToolbar;

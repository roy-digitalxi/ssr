import React, { Component } from 'react';

// Libraries
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import '../../../../../assets/css/quill/index.css';

// constants
import colors from '../../../styles/colors';
import fonts from '../../../styles/fonts';

// Quill setup
const Quill = ReactQuill.Quill;
var Font = Quill.import('formats/font');
var Size = Quill.import('attributors/style/size');
Font.whitelist = [
  'Open_Sans',
  'Roboto',
  'Lato',
  'Raleway',
  'Ubuntu',
  'Monoton'
];
Size.whitelist = ['12px', '16px', '20px', '24px', '28px'];
Quill.register(Font, true);
Quill.register(Size, true);

const formats = [
  'header',
  'font',
  'background',
  'color',
  'code',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'script',
  'align',
  'direction',
  'link',
  'image',
  'code-block',
  'formula',
  'video'
];

class DxEditor extends Component {
  constructor(props) {
    super(props);
    this.modules = {
      // toolbar: [
      //     ['bold', 'italic', 'underline'],                 // toggled buttons
      //     [{ 'size': Size.whitelist }],                    // custom dropdown
      //     [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
      //     [{ 'font': Font.whitelist }],                    // font family
      //     [{ 'align': [] }],                               // text align
      //     ['clean'],                                       // remove formatting
      // ]
      toolbar: {
        container: '#toolbar-' + this.props.sectionGUID
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.props.handleUpdateHtmlContent(html.toString());
  }

  render() {
    const {
      tableContainerStyle,
      tableWrapperStyle,
      mainContainerStyle,
      loadingHtmlContainerStyle,
      loadingHtmlMsgStyle
    } = styles;

    return (
      <div style={mainContainerStyle}>
        <ReactQuill
          theme={'snow'}
          onChange={this.handleChange}
          modules={this.modules}
          formats={formats}
          defaultValue={this.props.htmlContent}
          value={this.props.htmlContent}
          placeholder={this.props.placeholder}
        />
        {this.props.html && !this.props.htmlContent ? (
          <div style={loadingHtmlContainerStyle}>
            <div style={tableContainerStyle}>
              <div style={tableWrapperStyle}>
                <p style={loadingHtmlMsgStyle}>Loading..</p>
              </div>
            </div>
          </div>
        ) : null}
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
    width: 320,
    boxSizing: 'border-box',
    margin: '0 auto',
    cursor: 'default',
    position: 'relative'
  },
  loadingHtmlContainerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    top: 0,
    left: 0,
    zIndex: 98
  },
  loadingHtmlMsgStyle: {
    color: colors.whiteColor,
    fontSize: fonts.h4,
    textAlign: 'center'
  }
};

export default DxEditor;

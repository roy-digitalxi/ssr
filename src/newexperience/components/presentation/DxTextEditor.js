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
  'color',
  'code',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'align'
];

class DxTextEditor extends Component {
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
    const { limitWord } = this.props;

    if (!html) {
      this.props.handleUpdateHtmlContent('');
      return;
    }

    let tempHtml = html.toString();
    tempHtml = tempHtml.replace(/<(.|\n)*?>/g, '');

    if (!tempHtml) {
      this.props.handleUpdateHtmlContent(html.toString());
      return;
    }

    let current = tempHtml.length;
    if (limitWord >= current) {
      this.props.handleUpdateHtmlContent(html.toString());
      return;
    } else {
      this.props.handleUpdateHtmlContent(this.props.htmlContent);
      return;
    }
  }

  handleOptionClick = e => {
    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    this.props.handleElemSelect(e);
  };

  render() {
    const { largeEditor, editorHeight, editorWidth } = this.props;

    const { mainContainerStyle } = styles;

    return (
      <div
        style={Object.assign({}, mainContainerStyle, { width: editorWidth })}
        onClick={e => this.handleOptionClick(e)}
      >
        <ReactQuill
          className={largeEditor ? 'ql-text-editor-2' : 'ql-text-editor'}
          theme={'snow'}
          onChange={this.handleChange}
          modules={this.modules}
          formats={formats}
          defaultValue={this.props.htmlContent}
          value={this.props.htmlContent}
          placeholder={this.props.placeholder}
        />
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
    boxSizing: 'border-box',
    cursor: 'default',
    position: 'relative',
    overFlowY: 'auto'
  },
  counterContainerStyle: {
    position: 'absolute',
    right: 0,
    bottom: -10,
    height: 10,
    width: 24,
    borderRadius: '6px',
    zIndex: 1000,
    backgroundColor: colors.blackColor
  },
  counterStyle: {
    textAlign: 'center',
    margin: 0,
    fontSize: '8px',
    color: colors.whiteColor,
    marginTop: 1
  }
};

export default DxTextEditor;

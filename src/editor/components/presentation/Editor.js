import React, { Component } from 'react';

// Constants
import fonts from '../../../styles/fonts';
import colors from '../../../styles/colors';
import sizes from '../../../styles/sizes';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';

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

class Editor extends Component {
  state = {
    editorHtml: ''
  };

  modules = {
    // toolbar: [
    //     ['bold', 'italic', 'underline'],                 // toggled buttons
    //     [{ 'size': Size.whitelist }],                    // custom dropdown
    //     [{ 'color': [] }, { 'background': [] }],         // dropdown with defaults
    //     [{ 'font': Font.whitelist }],                    // font family
    //     [{ 'align': [] }],                               // text align
    //     ['clean'],                                       // remove formatting
    // ]
    toolbar: {
      container: '#toolbar-' + this.props.activeIndex
    }
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
          <ReactQuill
            theme={'snow'}
            onChange={this.handleChange}
            value={this.state.editorHtml}
            modules={this.modules}
            formats={formats}
            bounds={'.app'}
            placeholder={this.props.placeholder}
          />
        ) : (
          <p>i am not render editor</p>
        )}
      </div>
    );
  }
}

export default Editor;

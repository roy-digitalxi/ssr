import React, { Component } from 'react';

// config
import config from '../../../config';

// Libraries
import { Document, Page } from 'react-pdf';
import '../../../../../assets/css/react-pdf/index.css';

class DxPdfViewer extends Component {
  state = {
    numPages: null
  };

  handleDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { mainContainerStyle } = styles;

    const { numPages } = this.state;
    return (
      <div style={mainContainerStyle}>
        <Document
          loading="Loading PDF.."
          file={
            this.props.pdf
              ? config.fileHost + '/' + this.props.pdf + '.pdf'
              : null
          }
          onLoadSuccess={this.handleDocumentLoadSuccess}
          noData="Please select a PDF.."
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={320}
            />
          ))}
        </Document>
      </div>
    );
  }
}

const styles = {
  mainContainerStyle: {
    width: 320,
    margin: '0 auto',
    cursor: 'default'
  }
};

export default DxPdfViewer;

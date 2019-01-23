import React, { Component } from 'react';

// components
import DxEditorToolbar from './DxEditorToolbar';
import DxPdfViewerToolbar from './DxPdfViewerToolbar';
import DxSplashToolbar from './DxSplashToolbar';
import DxVideoViewerToolbar from './DxVideoViewerToolbar';
import DxImageViewerToolbar from './DxImageViewerToolbar';
import DxLinkToolbar from './DxLinkToolbar';
import DxAdButtonConnectorToolbar from './DxAdButtonConnectorToolbar';
import DxAdButton2ConnectorToolbar from './DxAdButton2ConnectorToolbar';
import DxH5pToolbar from './DxH5pToolbar';

class PhoneToolbar extends Component {
  handleOptionClick = e => {
    // Prevent parent event
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  };

  renderOptions = () => {
    let { newPage, activePageSectionIndex, activeElemType } = this.props;

    const { tableContainerStyle, tableWrapperStyle } = styles;

    if (!newPage.Sections) {
      return;
    }

    if (!newPage.Sections.length) {
      return;
    }

    const section = newPage.Sections[activePageSectionIndex];
    if (!section) {
      return;
    }

    if (!activeElemType) {
      return;
    }

    if (section.Type == 'EDITOR') {
      return (
        <DxEditorToolbar
          sectionGUID={section.SectionGUID}
          activeElemType={this.props.activeElemType}
        />
      );
    } else if (section.Type == 'BUTTON') {
      return null;
    } else if (section.Type == 'SPLASH') {
      return (
        <DxSplashToolbar
          sectionGUID={section.SectionGUID}
          activeElemType={this.props.activeElemType}
          imgFile={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].SplashImg
              : null
          }
          color={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].SplashColor
              : '#ffffff'
          }
          splashOpacityColor={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].SplashOpacityColor
              : '#000000'
          }
          splashOpacity={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].SplashOpacity
              : 40
          }
          handleImgChange={file => this.props.handleSplashImgChange(file)}
          handleColorChange={color => this.props.handleSplashColorChange(color)}
          handleOpacityColorChange={opacityColor =>
            this.props.handleSplashOpacityColorChange(opacityColor)
          }
          handleOpacityChange={opacity =>
            this.props.handleSplashOpacityChange(opacity)
          }
          handleImgError={msg => this.props.handleErrorMsg(msg)}
        />
      );
    } else if (section.Type == 'VIDEO') {
      return (
        <DxVideoViewerToolbar
          activeElemType={this.props.activeElemType}
          videoInput={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].VideoInput
              : null
          }
          handleVideoInputChange={e => this.props.handleVideoInputChange(e)}
          handleVideoInsertClick={() => this.props.handleVideoInsertClick()}
        />
      );
    } else if (section.Type == 'IMAGE') {
      return (
        <DxImageViewerToolbar
          activeElemType={this.props.activeElemType}
          imgFile={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].Img
              : null
          }
          imgOpacityColor={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].ImgOpacityColor
              : '#000000'
          }
          imgOpacity={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].ImgOpacity
              : 40
          }
          handleImgChange={file => this.props.handleImageChange(file)}
          handleOpacityColorChange={opacityColor =>
            this.props.handleImageOpacityColorChange(opacityColor)
          }
          handleOpacityChange={opacity =>
            this.props.handleImageOpacityChange(opacity)
          }
          handleImgError={msg => this.props.handleErrorMsg(msg)}
        />
      );
    } else if (section.Type == 'EMBED_PDF') {
      return (
        <DxPdfViewerToolbar
          sectionGUID={section.SectionGUID}
          activeElemType={this.props.activeElemType}
          pdfFileName={section.PdfFileName}
          pdfBgColor={section.PdfBgColor}
          handlePdfChange={file => this.props.handlePdfChange(file)}
          handleBgColorChange={color =>
            this.props.handlePdfBgColorChange(color)
          }
          handlePdfError={msg => this.props.handleErrorMsg(msg)}
        />
      );
    } else if (section.Type == 'LINK') {
      return (
        <DxLinkToolbar
          sectionGUID={section.SectionGUID}
          activeElemType={this.props.activeElemType}
          color={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].LinkColor
              : '#000000'
          }
          linkInput={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].LinkInput
              : null
          }
          link={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].Link
              : null
          }
          linkBgColor={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].LinkBgColor
              : null
          }
          handleLinkInputChange={e => this.props.handleLinkInputChange(e)}
          handleLinkInsertClick={() => this.props.handleLinkInsertClick()}
          handleBgColorChange={color =>
            this.props.handleLinkBgColorChange(color)
          }
        />
      );
    } else if (section.Type == 'AD_BUTTON') {
      return (
        <DxAdButtonConnectorToolbar
          sectionGUID={section.SectionGUID}
          activeElemType={this.props.activeElemType}
          imgFile={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].AdBtnImg
              : null
          }
          imgOpacityColor={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].AdBtnImgOpacityColor
              : '#000000'
          }
          imgOpacity={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].AdBtnImgOpacity
              : 0
          }
          color={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].AdBtnColor
              : '#000000'
          }
          handleImgChange={file => this.props.handleAdBtnImageChange(file)}
          handleColorChange={color => this.props.handleAdBtnColorChange(color)}
          handleOpacityColorChange={opacityColor =>
            this.props.handleAdBtnOpacityColorChange(opacityColor)
          }
          handleOpacityChange={opacity =>
            this.props.handleAdBtnOpacityChange(opacity)
          }
          handleImgError={msg => this.props.handleErrorMsg(msg)}
        />
      );
    } else if (section.Type == 'AD_BUTTON_2') {
      return (
        <DxAdButton2ConnectorToolbar
          sectionGUID={section.SectionGUID}
          activeElemType={this.props.activeElemType}
          color={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].AdBtnColor
              : '#000000'
          }
          bgColor={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].AdBtnBgColor
              : '#ffffff'
          }
          handleColorChange={color => this.props.handleAdBtnColorChange(color)}
          handleBgColorChange={color =>
            this.props.handleAdBtnBgColorChange(color)
          }
        />
      );
    } else if (section.Type == 'H5P') {
      return (
        <DxH5pToolbar
          sectionGUID={section.SectionGUID}
          activeElemType={this.props.activeElemType}
          h5p={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].H5p
              : null
          }
          h5pFileName={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].H5pFileName
              : null
          }
          h5pBgColor={
            newPage.Sections[activePageSectionIndex]
              ? newPage.Sections[activePageSectionIndex].H5pBgColor
              : null
          }
          handleH5pChange={file => this.props.handleH5pChange(file)}
          handleH5pInputChange={e => this.props.handleH5pInputChange(e)}
          handleBgColorChange={color =>
            this.props.handleH5pBgColorChange(color)
          }
          handleH5pError={msg => this.props.handleErrorMsg(msg)}
        />
      );
    } else {
      return (
        <div
          className={
            newPage.PageGUID == section.PageGUID && section.IsActive
              ? 'dx_show_toolbar'
              : 'dx_hidden_toolbar'
          }
        >
          other tools here
        </div>
      );
    }
  };

  render() {
    const { mainContainerStyle } = styles;

    return (
      <div style={mainContainerStyle} onClick={e => this.handleOptionClick(e)}>
        {this.renderOptions()}
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
    height: 60
  }
};

const sort_section_by_index = (a, b) => {
  if (a.Index < b.Index) return -1;
  if (a.Index > b.Index) return 1;
  return 0;
};

export default PhoneToolbar;
